var exec = require('child_process').exec;
var fs = require('fs');
var glob = require("glob");
var testUtils = require("./tests.utils");
var constants = require("./tests.constants");

var findInFiles = testUtils.findInFiles;
var copySeedDir = testUtils.copySeedDir;
var callPostclone = testUtils.callPostclone;

var _srcReadmeContent = "";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000; // 60 secs


describe('postclone', function() {

    // keep before 'should not init new git repo' 
    // in order to avoid getting new files in the git repo
    it('should init new git repo', function(done) {
        copySeedDir(constants.SEED_LOCATION, constants.SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            callPostclone(constants.SEED_COPY_LOCATION, constants.TEST_GITHUB_USERNAME, constants.TEST_PLUGIN_NAME, "y", function(error) {
                if (error) {
                    done.fail(error);
                } else {
                    exec("cd " + constants.SEED_COPY_LOCATION + "/src && git config --get remote.origin.url", function(error, stdout, stderr) {
                        expect(stdout).toEqual("");
                        done();
                    });
                }
            });
        });
    });

    it('should not init new git repo', function(done) {
        copySeedDir(constants.SEED_LOCATION, constants.SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            _srcReadmeContent = fs.readFileSync(constants.SEED_LOCATION + "/src/README.md");
            callPostclone(constants.SEED_COPY_LOCATION, constants.TEST_GITHUB_USERNAME, constants.TEST_PLUGIN_NAME, "n", function(error) {
                if (err) {
                    done.fail(err);
                } else {
                    exec("cd " + constants.SEED_COPY_LOCATION + " && git config --get remote.origin.url", function(error, stdout, stderr) {
                        expect(stdout).toEqual("git@github.com:NativeScript/nativescript-plugin-seed.git\n");
                        done();
                    });
                }
            });
        });
    });

    it('should delete the seed screenshots folder', function() {
        expect(fs.existsSync(constants.SEED_COPY_LOCATION + "/screenshots")).toBeFalsy();
    });

    it('should delete the seed tests folder', function() {
        expect(fs.existsSync(constants.SEED_COPY_LOCATION + "/seed-tests")).toBeFalsy();
    });

    it('should replace the seed README with the plugin one', function() {
        expect(fs.existsSync(constants.SEED_COPY_LOCATION + "/README.md")).toBeTruthy();
        expect(fs.existsSync(constants.SEED_COPY_LOCATION + "/src/README.md")).toBeFalsy();

        var readmeContent = fs.readFileSync(constants.SEED_COPY_LOCATION + "/README.md");
        expect(_srcReadmeContent).toEqual(readmeContent);
    });

    it('should rename each yourplugin file', function(done) {
        glob(constants.SEED_COPY_LOCATION + "/**/yourplugin*.*", function(er, files) {
            expect(files.length).toEqual(0);
            done();
        });
    });

    it('should rename each yourplugin file with the new plugin name', function(done) {
        glob(constants.SEED_COPY_LOCATION + "/**/" + constants.TEST_PLUGIN_NAME + "*.*", function(er, files) {
            expect(files.length).toBeGreaterThan(0);
            done();
        });
    });

    it('should replace each yourplugin string', function(done) {
        findInFiles("yourplugin", constants.SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toEqual(0);
            done();
        });
    });

    it('should replace each YourPlugin string', function(done) {
        findInFiles("YourPlugin", constants.SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toEqual(0);
            done();
        });
    });

    it('should replace each yourPlugin string', function(done) {
        findInFiles("yourPlugin", constants.SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toEqual(0);
            done();
        });
    });

    it('should replace each YourName string', function(done) {
        findInFiles("YourName", constants.SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toEqual(0);
            done();
        });
    });

    it('should replace each YourName string with the test github username', function(done) {
        findInFiles(constants.TEST_GITHUB_USERNAME, constants.SEED_COPY_LOCATION, function(resultsCount) {
            // plugin author in the package json
            expect(resultsCount).toEqual(1);
            done();
        });
    });

    it('should replace each YourPlugin string with ThePlugin', function(done) {
        findInFiles(constants.TEST_PLUGIN_NAME, constants.SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toBeGreaterThan(0);
            done();
        });
    });

    it('should replace each nativescript-YourPlugin string with nativescript-ThePlugin', function(done) {
        findInFiles("nativescript-" + constants.TEST_PLUGIN_NAME, constants.SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toBeGreaterThan(0);
            done();
        });
    });
});