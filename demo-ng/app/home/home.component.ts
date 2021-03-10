import { Component, OnInit, AfterViewInit } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { CardView } from "nativescript-cardview";
import {
  SwipeLayout,
  ANIMATION_STATE,
  GESTURE_MODE,
  SwipeLeftEventData,
  SwipeRightEventData,
  SwipeUpEventData,
  SwipeDownEventData,
} from "nativescript-swipe-layout";
import { ANIMATION_PROPERTIES } from "@nativescript/core/ui/animation/keyframe-animation";

registerElement("CardView", () => CardView);
registerElement("SwipeLayout", () => SwipeLayout);

@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
})
export class HomeComponent implements AfterViewInit {
  private _swipeLayouts: Array<SwipeLayout>;
  private currentSwipeLayout: SwipeLayout;
  public swipeLayoutAnimated: ANIMATION_STATE;
  public gestureMode: GESTURE_MODE;

  public cards: Array<any> = [
    {
      img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
      test: "Batman is pretty cool right?",
    },
    {
      img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
      test: "Batman is pretty cool right?",
    },
    {
      img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
      test: "Batman is pretty cool right?",
    },
    {
      img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
      test: "Batman is pretty cool right?",
    },
    {
      img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
      test: "Batman is pretty cool right?",
    },
    {
      img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
      test: "Batman is pretty cool right?",
    },
  ];

  constructor() {
    this._swipeLayouts = new Array();
    console.log(JSON.stringify(ANIMATION_STATE));
    this.swipeLayoutAnimated = 1;
    this.gestureMode = 0;
  }

  swipeLayoutLoaded(event) {
    this._swipeLayouts.push(<SwipeLayout>event.object);
  }

  ngAfterViewInit(): void {
    this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
  }

  swipeLeftCallback(swipeLeftEvent: SwipeLeftEventData) {
    console.log("swipeLeft");
    this.next();
  }

  private next() {
    this._swipeLayouts.pop();
    this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
  }

  swipeRightCallback(swipeRightEvent: SwipeRightEventData) {
    console.log("swipeRight");
    this.next();
  }
  swipeUpCallback(swipeUpEvent: SwipeUpEventData) {
    console.log("swipeUp");
    this.next();
  }
  swipeDownCallback(swipeDownEvent: SwipeDownEventData) {
    console.log("swipeDown");
    this.next();
  }

  goAway() {
    let that = this;
    this.currentSwipeLayout.animateSwipeRight().then(() => {
      that.next();
      console.log("swipeLeft done");
    });
  }

  comeHere() {
    let that = this;
    this.currentSwipeLayout.animateSwipeLeft().then(() => {
      that.next();
      console.log("swipeRight done");
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
