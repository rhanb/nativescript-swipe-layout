import { SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import { Point } from "tns-core-modules/ui/content-view/content-view";
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
    constructor(initDeltaValue: Point, lastDeltaValue: Point, width: number, height: number);
    build(): PanDirection;
}
