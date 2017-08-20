import { Observable, EventData } from 'tns-core-modules/data/observable';
import { SwipeLayout } from 'nativescript-swipe-layout';
import { SwipeLeftEvent } from "nativescript-swipe-layout";

export class HelloWorldModel extends Observable {
  public message: string;
  private _swipeLayout: SwipeLayout;

  constructor() {
    super();
    console.log('constructor');
    
  }

  public cardLoaded(event: EventData) {
    this._swipeLayout = <SwipeLayout>event.object;
    console.log('cardLoaded');
  }

  public swipeLeft(event: SwipeLeftEvent) {
    console.log('swipeLeft');
  }
}