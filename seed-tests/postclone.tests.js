var exec = require('child_process').exec;
var fs = require('fs');
var glob = require("glob");
var testUtils = require("./tests.utils");
var findInFiles = testUtils.findInFiles;
var copySeedDir = testUtils.copySeedDir;
var callPostclone = testUtils.callPostclone;
var SEED_LOCATION = testUtils.SEED_LOCATION;
var SEED_COPY_LOCATION = testUtils.SEED_COPY_LOCATION;

const TEST_PLUGIN_NAME = "ThePlugin";
const TEST_GITHUB_USERNAME = "TheGitHubUser";
var _srcReadmeContent = "";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000; // 60 secs


describe('postclone', function() {

    // keep before 'should not init new git repo' 
    // in order to avoid getting new files in the git repo
    it('should init new git repo', function(done) {
        copySeedDir(SEED_LOCATION, SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            callPostclone(SEED_COPY_LOCATION, TEST_GITHUB_USERNAME, TEST_PLUGIN_NAME, "y", function(error) {
                if (error) {
                    done.fail(error);
                } else {
                    exec("cd " + SEED_COPY_LOCATION + "/src && git config --get remote.origin.url", function(error, stdout, stderr) {
                        expect(stdout).toEqual("");
                        done();
                    });
                }
            });
        });
    });

    it('should not init new git repo', function(done) {
        copySeedDir(SEED_LOCATION, SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            _srcReadmeContent = fs.readFileSync(SEED_LOCATION + "/src/README.md");
            callPostclone(SEED_COPY_LOCATION, TEST_GITHUB_USERNAME, TEST_PLUGIN_NAME, "n", function(error) {
                if (err) {
                    done.fail(err);
                } else {
                    exec("cd " + SEED_COPY_LOCATION + " && git config --get remote.origin.url", function(error, stdout, stderr) {
                        expect(stdout).toEqual("git@github.com:NativeScript/nativescript-plugin-seed.git\n");
                        done();
                    });
                }
            });
        });
    });

    it('should delete the seed screenshots folder', function() {
        expect(fs.existsSync(SEED_COPY_LOCATION + "/screenshots")).toBeFalsy();
    });

    it('should delete the seed tests folder', function() {
        expect(fs.existsSync(SEED_COPY_LOCATION + "/seed-tests")).toBeFalsy();
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

    it('should replace each YourPlugin string with ThePlugin', function(done) {
        findInFiles(TEST_PLUGIN_NAME, SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toBeGreaterThan(0);
            done();
        });
    });

    it('should replace each nativescript-YourPlugin string with nativescript-ThePlugin', function(done) {
        findInFiles("nativescript-" + TEST_PLUGIN_NAME, SEED_COPY_LOCATION, function(resultsCount) {
            expect(resultsCount).toBeGreaterThan(0);
            done();
        });
    });
});