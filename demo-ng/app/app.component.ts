import { Component, ElementRef, ViewChild } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { SwipeCard } from './src';
import { SwipeLeftEvent, SwipeDownEvent, SwipeUpEvent, SwipeRightEvent } from "./src/swipe-card.common";


registerElement('SwipeCard', () => SwipeCard);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {

    constructor() { }

    tabLoaded(event) {
        console.log('cardLoaded');
    }

    swipeLeft(swipeLeftEvent: SwipeLeftEvent) {
        console.log('swipeLeft');
    }

    swipeRight(swipeRightEvent: SwipeRightEvent) {
        console.log('swipeRight');
    }
    swipeUp(swipeUpEvent: SwipeUpEvent) {
        console.log('swipeUp');
    }
    swipeDown(swipeDownEvent: SwipeDownEvent) {
        console.log('swipeDown');
    }
}

