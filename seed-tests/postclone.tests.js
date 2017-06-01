var exec = require('child_process').exec; // TODO: do we need it?
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var fs = require('fs');
var glob = require("glob");
var async = require("async");

const SEED_LOCATION = "../";
const SEED_COPY_LOCATION = "seed-copy";
const SEED_COPY_NEW_GIT_REPO_LOCATION = "seed-copy-new-git-repo";
const TEST_PLUGIN_NAME = "ThePlugin";
const TEST_GITHUB_USERNAME = "TheGitHubUser";
var _srcReadmeContent = "";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // 30 secs


describe('postclone', function() {

    beforeAll(function(done) {
        copySeedDir(SEED_LOCATION, SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            _srcReadmeContent = fs.readFileSync(SEED_LOCATION + "/src/README.md");
            callPostclone(SEED_COPY_LOCATION, TEST_GITHUB_USERNAME, TEST_PLUGIN_NAME, "n", function(error) {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
        });
    });

    it('should not init new git repo', function(done) {
        exec("cd " + SEED_COPY_LOCATION + " && git config --get remote.origin.url", function(error, stdout, stderr) {
            expect(stdout).toEqual("git@github.com:NativeScript/nativescript-plugin-seed.git\n");
            done();
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

    it('should replace each YourPlugin string', function(done) {
        findInFiles("YourPlugin", SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toEqual(0);
            done();
        });
    });

    it('should replace each yourPlugin string', function(done) {
        findInFiles("yourPlugin", SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toEqual(0);
            done();
        });
    });

    it('should replace each YourName string', function(done) {
        findInFiles("YourName", SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toEqual(0);
            done();
        });
    });

    it('should replace each YourName string with the test github username', function(done) {
        findInFiles(TEST_GITHUB_USERNAME, SEED_COPY_LOCATION, function(resultsCount) {
            // plugin author in the package json
            expect(resultsCount).toEqual(1);
            done();
        });
    });

    it('should replace each YourName string with the test github username', function(done) {
        findInFiles(TEST_PLUGIN_NAME, SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toBeGreaterThan(0);
            done();
        });
    });

    it('should replace each YourName string with the test github username', function(done) {
        findInFiles("nativescript-" + TEST_PLUGIN_NAME, SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toBeGreaterThan(0);
            done();
        });
    });

    it('should init new git repo', function(done) {
        copySeedDir(SEED_LOCATION, SEED_COPY_NEW_GIT_REPO_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            callPostclone(SEED_COPY_NEW_GIT_REPO_LOCATION, TEST_GITHUB_USERNAME, TEST_PLUGIN_NAME, "y", function(error) {
                if (err) {
                    done.fail(err);
                } else {
                    exec("cd " + SEED_COPY_NEW_GIT_REPO_LOCATION + " && git config --get remote.origin.url", function(error, stdout, stderr) {
                        expect(stdout).toEqual("");
                        done();
                    });
                }
            });
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

    function copySeedDir(seedLocation, copyLocation, callback) {
        rimraf.sync(copyLocation);
        console.log(copyLocation + ' folder successfully deleted.');

        ncp(seedLocation, copyLocation, {
            filter: function(fileName) {
                if (fileName.indexOf("seed-tests/" + SEED_COPY_LOCATION) > -1 ||
                    fileName.indexOf("seed-tests/" + SEED_COPY_NEW_GIT_REPO_LOCATION) > -1 ||
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

    function callPostclone(pluginLocation, githubUsername, pluginName, initGit, callback) {
        exec("cd " + pluginLocation + "/src && npm run postclone -- gitHubUsername=" + githubUsername + " pluginName=" + pluginName + " initGit=" + initGit, function(error, stdout, stderr) {
            callback(error, stdout, stderr);
        });
    };
});