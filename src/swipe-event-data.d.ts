import { SwipeDirection, EventData } from "@nativescript/core";
import { SwipeLayoutBase } from "./swipe-layout.common";

export declare class SwipeEventData implements EventData {
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
  );
}
export declare class SwipeLeftEventData extends SwipeEventData {
  eventName: string;
  direction: SwipeDirection;
}
export declare class SwipeRightEventData extends SwipeEventData {
  eventName: string;
  direction: SwipeDirection;
}
export declare class SwipeUpEventData extends SwipeEventData {
  eventName: string;
  direction: SwipeDirection;
}
export declare class SwipeDownEventData extends SwipeEventData {
  eventName: string;
  direction: SwipeDirection;
}
