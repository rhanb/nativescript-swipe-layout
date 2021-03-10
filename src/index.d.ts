import {
  ContentView,
  EventData,
  Property,
  SwipeDirection,
} from "@nativescript/core";

export declare enum ANIMATION_STATE {
  ALWAYS = 0,
  ON_EVENTS = 1,
  NEVER = 2,
}
export declare enum GESTURE_MODE {
  DRAG = 0,
  SWIPE = 1,
}

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

export declare class SwipeLayoutBase extends ContentView {
  swipeLeftEvent: string;
  swipeRightEvent: string;
  swipeUpEvent: string;
  swipeDownEvent: string;
  animationState: ANIMATION_STATE;
  gestureMode: GESTURE_MODE;
  animationDuration: number;
  constructor();
  animateSwipeLeft(): Promise<void>;
  animateSwipeRight(): Promise<void>;
  animateSwipeUp(): Promise<void>;
  animateSwipeDown(): Promise<void>;
  swipe(eventData): Promise<void>;
}

export declare class SwipeLayout extends SwipeLayoutBase {
  constructor();
  readonly ios: any;
  readonly android: any;
  createNativeView(): any;
  onLoaded(): void;
  initNativeView(): void;
  onUnloaded(): void;
  disposeNativeView(): void;
}
