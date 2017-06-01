var exec = require('child_process').exec; // TODO: do we need it?
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
const SEED_LOCATION = "../";
const SEED_COPY_LOCATION = "seed-copy";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
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

            console.log('Seed copy folder successfully created.');
            exec("cd " + SEED_COPY_LOCATION + "/src && npm run postclone -- gitHubUsername=Toti pluginName=Plugina initGit=no", function(error, stdout, stderr) {
                console.log(arguments);
                expect(error).toBeNull();
                done();
            });
        });
    });

    it('should not return error', function(done) {
        // TODO: test
        done();
    });
});