var YourPlugin = require("nativescript-yourplugin").YourPlugin;
var yourPlugin = new YourPlugin();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("functionname", function() {
  it("exists", function() {
    expect(yourPlugin.functionname).toBeDefined();
  });

  it("returns a promise", function() {
    expect(yourPlugin.functionname()).toEqual(jasmine.any(Promise));
  });
});