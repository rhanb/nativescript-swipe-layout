/*
 * Describe a swipe event
 */
import { EventData, SwipeDirection } from "@nativescript/core";
import { SwipeLayoutBase } from "./swipe-layout.common";

export class SwipeEventData implements EventData {
  eventName: string;
  object: SwipeLayoutBase;
  direction: SwipeDirection;
  originX: number;
  originY: number;
  destinationX: number;
  destinationY: number;
  animated: boolean;
  constructor(
    originXValue: number,
    originYValue: number,
    destinationXValue?: number,
    destinationYValue?: number,
    animated?: boolean
  ) {
    this.originX = originXValue;
    this.originY = originYValue;
    this.animated = animated;

    // optionnal parameter test
    if (destinationYValue) {
      this.destinationY = destinationYValue;
    } else {
      this.destinationY = this.originY;
    }

    // optionnal parameter test
    if (destinationXValue) {
      this.destinationX = destinationXValue;
    } else {
      this.destinationX = this.originX;
    }
  }
}

export class SwipeLeftEventData extends SwipeEventData {
  eventName: string = "swipeLeft";
  direction: SwipeDirection = SwipeDirection.left;
}

export class SwipeRightEventData extends SwipeEventData {
  eventName: string = "swipeRight";
  direction: SwipeDirection = SwipeDirection.right;
}

export class SwipeUpEventData extends SwipeEventData {
  eventName: string = "swipeUp";
  direction: SwipeDirection = SwipeDirection.up;
}

export class SwipeDownEventData extends SwipeEventData {
  eventName: string = "swipeDown";
  direction: SwipeDirection = SwipeDirection.down;
}
