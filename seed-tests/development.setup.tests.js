var testUtils = require("./tests.utils");
var constants = require("./tests.constants");
var copySeedDir = testUtils.copySeedDir;
var callDevelopmentSetup = testUtils.callDevelopmentSetup;
var getNpmLinks = testUtils.getNpmLinks;
var removeNpmLink = testUtils.removeNpmLink;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000; // 60 secs

describe('development.setup', function() {

    beforeEach(function(done) {
        // fresh copy
        copySeedDir(constants.SEED_LOCATION, constants.SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            // clear existing link
            removeNpmLink(constants.DEFAULT_PLUGIN_NAME, function() {
                done();
            });
        });
    });

    it('should create an npm link to the src folder', function(done) {
        callDevelopmentSetup(constants.SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            getNpmLinks(function(links) {
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