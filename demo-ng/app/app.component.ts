import { Component, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import {
    SwipeLayout,
    SwipeLeftEventData,
    SwipeDownEventData,
    SwipeUpEventData,
    SwipeRightEventData
} from 'nativescript-swipe-layout';
import { ANIMATION_STATE, GESTURE_MODE } from 'nativescript-swipe-layout/swipe-layout.enums';
import { CardView } from 'nativescript-cardview';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { AnimationCurve } from "tns-core-modules/ui/enums/enums";

registerElement("CardView", () => CardView);
registerElement('SwipeLayout', () => SwipeLayout);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements AfterViewInit {

    private _swipeLayouts: Array<SwipeLayout>;
    private currentSwipeLayout: SwipeLayout;
    public swipeLayoutAnimated: ANIMATION_STATE;
    public gestureMode: GESTURE_MODE;
    

    public cards: Array<any> = [{
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    },
    {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }, {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }, {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }, {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }, {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }]

    constructor(private fonticon: TNSFontIconService) {
        this._swipeLayouts = new Array();
        this.swipeLayoutAnimated = ANIMATION_STATE.ON_EVENTS;
        this.gestureMode = GESTURE_MODE.DRAG;
    }

    swipeLayoutLoaded(event) {
        this._swipeLayouts.push(<SwipeLayout>event.object);
    }

    ngAfterViewInit(): void {
        this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
    }


    swipeLeftCallback(swipeLeftEvent: SwipeLeftEventData) {
        console.log('swipeLeft');
        this.next();
    }

    private next() {
        this._swipeLayouts.pop();
        this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
    }

    swipeRightCallback(swipeRightEvent: SwipeRightEventData) {
        console.log('swipeRight');
        this.next();
    }
    swipeUpCallback(swipeUpEvent: SwipeUpEventData) {
        console.log('swipeUp');
        this.next();
    }
    swipeDownCallback(swipeDownEvent: SwipeDownEventData) {
        console.log('swipeDown');
        this.next();
    }

    goAway() {
        let that = this;
        this.currentSwipeLayout.animateSwipeRight().then(() => {
            that.next();
            console.log('swipeLeft done');
        });
    }


    comeHere() {
        let that = this;
        this.currentSwipeLayout.animateSwipeLeft().then(() => {
            that.next();
            console.log('swipeRight done');
        });
    }

    super() {
        let that = this;
        this.currentSwipeLayout.animateSwipeUp().then(() => {
            that.next();
            console.log("swipeUp done");
        });
    }
}


