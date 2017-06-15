var SwipeCard = require("nativescript-swipe-card").SwipeCard;
var swipeCard = new SwipeCard();

describe("greet function", function() {
    it("exists", function() {
        expect(swipeCard.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(swipeCard.greet()).toEqual("Hello, NS");
    });
});