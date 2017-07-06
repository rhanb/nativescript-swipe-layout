import { ContentView, EventData } from "tns-core-modules/ui/content-view";
import { GestureTypes, SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import { screen } from "tns-core-modules/platform";
import { Property } from "tns-core-modules/ui/core/properties/properties";



export enum Directions {
    LEFT,
    RIGHT,
    UP,
    DOWN
}
export class SwipeEvent implements EventData {
    eventName: string;
    object: SwipeCardBase;
    direction: Directions;
}

export class SwipeLeftEvent implements SwipeEvent {
    eventName: string = SwipeCardBase.swipeLeftEvent;
    object: SwipeCardBase
    direction: Directions = Directions.LEFT;
}
export class SwipeRightEvent implements SwipeEvent {
    eventName: string = SwipeCardBase.swipeRightEvent;
    object: SwipeCardBase
    direction: Directions = Directions.RIGHT;
}
export class SwipeUpEvent implements SwipeEvent {
    eventName: string = SwipeCardBase.swipeUpEvent;
    object: SwipeCardBase;
    direction: Directions = Directions.UP;
}
export class SwipeDownEvent implements SwipeEvent {
    eventName: string = SwipeCardBase.swipeDownEvent;
    object: SwipeCardBase;
    direction: Directions = Directions.DOWN;
}


export class SwipeCardBase extends ContentView {
    swipeLeftEvent: any;

    public static swipeLeftEvent: string = "swipeLeft";
    public static swipeRightEvent: string = "swipeRight";
    public static swipeUpEvent: string = "swipeUp";
    public static swipeDownEvent: string = "swipeDown";


    constructor() {
        super();
        let that = new WeakRef(this);
        this.on(GestureTypes.swipe, (args: SwipeGestureEventData) => {
            let originX = that.get().originX, originY = that.get().originY;
            let width = that.get().getMeasuredWidth(), height = that.get().getMeasuredHeight();
            let xSwipe = originX, ySwipe = originY;
            let eventData: any;
            switch (args.direction) {
                case SwipeDirection.down:
                    ySwipe = screen.mainScreen.heightDIPs + height;
                    eventData = new SwipeDownEvent();
                    break;
                case SwipeDirection.up:
                    ySwipe = - height;
                    eventData = new SwipeUpEvent();
                    break;
                case SwipeDirection.left:
                    xSwipe = - width;
                    eventData = new SwipeLeftEvent();
                    break;
                case SwipeDirection.right:
                    xSwipe = screen.mainScreen.widthDIPs + width;
                    eventData = new SwipeRightEvent();
                    break;
            }
            eventData.object = that.get();
            that.get().animate({
                translate: {
                    x: xSwipe,
                    y: ySwipe
                }
            }).then(() => {
                that.get().animate({
                    translate: {
                        x: originX,
                        y: originY
                    }
                }).then(() => {
                    console.log('before notify');
                    console.dir(eventData);
                    that.get().notify(eventData);
                    console.log('after notify');
                });
            });
        });
    }

}