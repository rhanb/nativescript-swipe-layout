import { Observable, EventData } from "@nativescript/core";
import { SwipeLayout, SwipeLeftEventData } from "nativescript-swipe-layout";

export class HelloWorldModel extends Observable {
  public message: string;
  private _swipeLayout: SwipeLayout;

  constructor() {
    super();
    console.log("constructor");
  }

  public cardLoaded(event: EventData) {
    this._swipeLayout = <SwipeLayout>event.object;
    console.log("cardLoaded");
  }

  public swipeLeft(event: SwipeLeftEventData) {
    console.log("swipeLeft", event);
  }
}
