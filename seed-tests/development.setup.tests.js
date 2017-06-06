var testUtils = require("./tests.utils");
var constants = require("./tests.constants");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000; // 60 secs

describe('development.setup', function() {

    beforeEach(function(done) {
        // fresh copy
        testUtils.copySeedDir(constants.SEED_LOCATION, constants.SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            // clear existing link
            testUtils.removeNpmLink(constants.DEFAULT_PLUGIN_NAME, function() {
                done();
            });
        });
    });

    it('should create an npm link to the src folder', function(done) {
        testUtils.callDevelopmentSetup(constants.SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            testUtils.getNpmLinks(function(links) {
                var expectedLink = links.filter(function(item) {
                    return item.startsWith(constants.DEFAULT_PLUGIN_NAME + "@1.0.0") && item.endsWith(constants.SEED_COPY_LOCATION + "/src");
                });
                expect(expectedLink.length).toEqual(1);
                done();
            });
        });
    });

    // TODO: check demo package.json for plugin dependency with "../src"
    // TODO: check if the plugin is linked in the node_modules
    // TODO: call second time after npm i
});