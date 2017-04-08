var MypluginVesy = require("nativescript-myplugin-vesy").MypluginVesy;
var mypluginVesy = new MypluginVesy();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("greet function", function() {
  it("exists", function() {
    expect(mypluginVesy.greet).toBeDefined();
  });

  it("returns a string", function() {
    expect(mypluginVesy.greet()).toEqual("Hello, NS");
  });
});