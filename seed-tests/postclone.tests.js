var exec = require('child_process').exec; // TODO: do we need it?
var ncp = require('ncp').ncp;

describe('postclone', function() {

    beforeAll(function(done) {
        // clone the seed files
        ncp("../", "./seed-copy", {
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
                done();
                // TODO: ?
                return console.error(err);
            }

            done();
        });
    });

    it('should not return error', function(done) {
        // TODO: test
        done();
    });
});