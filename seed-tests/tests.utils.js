var exec = require('child_process').exec;
var rimraf = require('rimraf');
var ncp = require('ncp').ncp;
var fs = require('fs');
var async = require("async");

const SEED_COPY_LOCATION = "seed-copy";

exports.findInFiles = function findInFiles(string, dir, callback) {
    var _resultsCount = 0;
    var _excludedPaths = ["node_modules", "src/scripts/postclone", "/seed-tests/", ".git"];

    function _findInFiles(string, dir, callback) {
        fs.readdir(dir, function(err, entries) {
            entries = entries.filter(function(entry) {
                var fullEntry = dir + '/' + entry;
                var shouldBeIncluded = true;
                _excludedPaths.forEach(function callback(currentValue) {
                    shouldBeIncluded = fullEntry.indexOf(currentValue) === -1 && shouldBeIncluded;
                });

                return shouldBeIncluded;
            });
            async.eachSeries(entries, function(entry, foreachCallback) {
                entry = dir + '/' + entry;
                fs.stat(entry, function(err, stat) {
                    if (stat && stat.isDirectory()) {
                        _findInFiles(string, entry, foreachCallback);
                    } else {
                        fs.readFile(entry, 'utf-8', function(err, contents) {
                            if (contents.indexOf(string) > -1) {
                                _resultsCount++;
                            }

                            foreachCallback();
                        });
                    }
                });
            }, function(err) {
                callback();
            });
        });
    };

    _findInFiles(string, dir, function() {
        callback(_resultsCount);
    });
};

exports.copySeedDir = function copySeedDir(seedLocation, copyLocation, callback) {
    rimraf.sync(copyLocation);
    console.log(copyLocation + ' folder successfully deleted.');

    ncp(seedLocation, copyLocation, {
        filter: function(fileName) {
            if (fileName.indexOf("seed-tests/" + SEED_COPY_LOCATION) > -1 ||
                fileName.indexOf("demo/node_modules") > -1 ||
                fileName.indexOf("src/node_modules") > -1 ||
                fileName.indexOf("demo/platforms") > -1) {
                return false;
            }

            return true;
        }
    }, function(err) {
        if (!err) {
            console.log(copyLocation + ' folder successfully created.');
        }
        callback(err);
    });
};

exports.callPostclone = function callPostclone(pluginLocation, githubUsername, pluginName, initGit, callback) {
    console.log("cd " + pluginLocation + "/src && npm run postclone -- gitHubUsername=" + githubUsername + " pluginName=" + pluginName + " initGit=" + initGit);
    exec("cd " + pluginLocation + "/src && npm run postclone -- gitHubUsername=" + githubUsername + " pluginName=" + pluginName + " initGit=" + initGit, function(error, stdout, stderr) {
        callback(error, stdout, stderr);
    });
};