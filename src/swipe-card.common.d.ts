import { ContentView, EventData } from "tns-core-modules/ui/content-view";
export declare enum Directions {
    LEFT = 0,
    RIGHT = 1,
    UP = 2,
    DOWN = 3,
}
export declare class SwipeEvent implements EventData {
    eventName: string;
    object: SwipeCardBase;
    direction: Directions;
}
export declare class SwipeLeftEvent implements SwipeEvent {
    eventName: string;
    object: SwipeCardBase;
    direction: Directions.LEFT;
}
export declare class SwipeRightEvent implements SwipeEvent {
    eventName: string;
    object: SwipeCardBase;
    direction: Directions.RIGHT;
}
export declare class SwipeUpEvent implements SwipeEvent {
    eventName: string;
    object: SwipeCardBase;
    direction: Directions.UP;
}
export declare class SwipeDownEvent implements SwipeEvent {
    eventName: string;
    object: SwipeCardBase;
    direction: Directions.DOWN;
}
export declare class SwipeCardBase extends ContentView {
    swipeLeftEvent: any;
    static swipeLeftEvent: string;
    static swipeRightEvent: string;
    static swipeUpEvent: string;
    static swipeDownEvent: string;
    constructor();
}
