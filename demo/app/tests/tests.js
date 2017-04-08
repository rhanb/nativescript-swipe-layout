var YourPlugin = require("nativescript-yourplugin").YourPlugin;
var yourPlugin = new YourPlugin();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("greet function", function() {
  it("exists", function() {
    expect(yourPlugin.greet).toBeDefined();
  });

  it("returns a string", function() {
    expect(yourPlugin.greet()).toEqual("Hello, NS");
  });
});