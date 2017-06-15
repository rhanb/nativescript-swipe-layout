import { Observable } from 'tns-core-modules/data/observable';
import { SwipeCard } from 'nativescript-swipe-card';

export class HelloWorldModel extends Observable {
  public message: string;
  private swipeCard: SwipeCard;

  constructor() {
    super();
    this.swipeCard = new SwipeCard();
    this.message = this.swipeCard.message;
  }
}