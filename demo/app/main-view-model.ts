import { Observable, EventData } from 'tns-core-modules/data/observable';
import { SwipeCard } from 'nativescript-swipe-card';
import { SwipeLeftEvent } from "nativescript-swipe-card/swipe-card.common";

export class HelloWorldModel extends Observable {
  public message: string;
  private _card: SwipeCard;

  constructor() {
    super();
    console.log('constructor');
    
  }

  public cardLoaded(event: EventData) {
    this._card = <SwipeCard>event.object;
    console.log('cardLoaded');
  }

  public swipeLeft(event: SwipeLeftEvent) {
    console.log('swipeLeft');
  }
}