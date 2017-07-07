import { Component, ElementRef, ViewChild } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { SwipeCard } from './src';
import { SwipeLeftEventData, SwipeDownEventData, SwipeUpEventData, SwipeRightEventData } from "./src/swipe-card.common";
import { CardView } from 'nativescript-cardview';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

registerElement("CardView", () => CardView);
registerElement('SwipeCard', () => SwipeCard);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    private _card: SwipeCard;

    constructor(private fonticon: TNSFontIconService) { }

    tabLoaded(event) {
        console.log('cardLoaded');
        this._card = <SwipeCard>event.object;
    }

    swipeLeft(swipeLeftEvent: SwipeLeftEventData) {
        console.log('swipeLeft');
    }

    swipeRight(swipeRightEvent: SwipeRightEventData) {
        console.log('swipeRight');
    }
    swipeUp(swipeUpEvent: SwipeUpEventData) {
        console.log('swipeUp');
    }
    swipeDown(swipeDownEvent: SwipeDownEventData) {
        console.log('swipeDown');
    }

    goAway() {
        console.log('goAway');
        this._card.swipeRight().then(() => {
            console.log('swipeLeft done');
        });
    }


    comeHere() {
        console.log('comehere');
        this._card.swipeLeft().then(() => {
            console.log('swipeRight done');
        });
    }

    super () {
        this._card.swipeUp().then(() => {
            console.log("swipeUp done");
        });
    }
}


