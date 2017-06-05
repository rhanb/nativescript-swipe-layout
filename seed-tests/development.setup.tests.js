var testUtils = require("./tests.utils");
var copySeedDir = testUtils.copySeedDir;
var SEED_LOCATION = testUtils.SEED_LOCATION;
var SEED_COPY_LOCATION = testUtils.SEED_COPY_LOCATION;
var DEFAULT_PLUGIN_NAME = testUtils.DEFAULT_PLUGIN_NAME;
var callDevelopmentSetup = testUtils.callDevelopmentSetup;
var getNpmLinks = testUtils.getNpmLinks;
var removeNpmLink = testUtils.removeNpmLink;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000; // 60 secs

describe('development.setup', function() {

    beforeEach(function(done) {
        // fresh copy
        copySeedDir(SEED_LOCATION, SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            // clear existing link
            removeNpmLink(DEFAULT_PLUGIN_NAME, function() {
                done();
            });
        });
    });

    it('should create an npm link to the src folder', function(done) {
        callDevelopmentSetup(SEED_COPY_LOCATION, function(err) {
            if (err) {
                done.fail(err);
            }

            getNpmLinks(function(links) {
                var expectedLink = links.filter(function(item) {
                    return item.startsWith(DEFAULT_PLUGIN_NAME + "@1.0.0") && item.endsWith(SEED_COPY_LOCATION + "/src");
                });
                expect(expectedLink.length).toEqual(1);
                done();
            });
        });
    });
});