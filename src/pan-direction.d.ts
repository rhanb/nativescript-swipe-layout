import { SwipeDirection } from "@nativescript/core";
import { Point } from "@nativescript/core/ui/core/view";

export declare class PanDirection {
  swipeDirection: SwipeDirection;
  isSwipe: boolean;
  constructor(swipe: boolean);
}
export declare class PanDirectionBuilder {
  containerWidth: number;
  containerHeight: number;
  initPanDelta: Point;
  lastPanDelta: Point;
  constructor(
    initDeltaValue: Point,
    lastDeltaValue: Point,
    width: number,
    height: number
  );
  build(): PanDirection;
}
