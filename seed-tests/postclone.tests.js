var exec = require('child_process').exec; // TODO: do we need it?
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var fs = require('fs');
var glob = require("glob");
var async = require("async");

const SEED_LOCATION = "../";
const SEED_COPY_LOCATION = "seed-copy";
const TEST_PLUGIN_NAME = "SampleSeedPlugin";
var _srcReadmeContent = "";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // 30 secs


describe('postclone', function() {

    // TODO: extract helper functions for readability
    beforeAll(function(done) {
        rimraf.sync(SEED_COPY_LOCATION);
        console.log('Seed copy folder successfully deleted.');

        // clone the seed files
        ncp(SEED_LOCATION, SEED_COPY_LOCATION, {
            filter: function(fileName) {
                if (fileName.indexOf("seed-tests/seed-copy") > -1 ||
                    fileName.indexOf("demo/node_modules") > -1 ||
                    fileName.indexOf("src/node_modules") > -1 ||
                    fileName.indexOf("demo/platforms") > -1) {
                    return false;
                }

                return true;
            }
        }, function(err) {
            if (err) {
                done.fail(err);
            }


            _srcReadmeContent = fs.readFileSync(SEED_LOCATION + "/src/README.md");
            console.log('Seed copy folder successfully created.');
            exec("cd " + SEED_COPY_LOCATION + "/src && npm run postclone -- gitHubUsername=Toti pluginName=" + TEST_PLUGIN_NAME + " initGit=no", function(error, stdout, stderr) {
                expect(error).toBeNull();
                done();
            });
        });
    });

    it('should delete the seed screenshots folder', function() {
        expect(fs.existsSync(SEED_COPY_LOCATION + "/screenshots")).toBeFalsy();
    });

    it('should replace the seed README with the plugin one', function() {
        expect(fs.existsSync(SEED_COPY_LOCATION + "/README.md")).toBeTruthy();
        expect(fs.existsSync(SEED_COPY_LOCATION + "/src/README.md")).toBeFalsy();

        var readmeContent = fs.readFileSync(SEED_COPY_LOCATION + "/README.md");
        expect(_srcReadmeContent).toEqual(readmeContent);
    });

    it('should rename each yourplugin file', function(done) {
        glob(SEED_COPY_LOCATION + "/**/yourplugin*.*", function(er, files) {
            expect(files.length).toEqual(0);
            done();
        });
    });

    it('should rename each yourplugin file with the new plugin name', function(done) {
        glob(SEED_COPY_LOCATION + "/**/" + TEST_PLUGIN_NAME + "*.*", function(er, files) {
            expect(files.length).toBeGreaterThan(0);
            done();
        });
    });

    it('should replace each yourplugin string', function(done) {
        findInFiles("yourplugin", SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toEqual(0);
            done();
        });
    });


    function findInFiles(string, dir, callback) {
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
                                    console.log(entry);
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
    }
});