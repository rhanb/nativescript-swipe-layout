import { ContentView, EventData } from "tns-core-modules/ui/content-view";
import { GestureTypes, SwipeGestureEventData, SwipeDirection, PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { screen } from "tns-core-modules/platform";
import { Property } from "tns-core-modules/ui/core/properties/properties";
import { AnimationCurve } from "tns-core-modules/ui/enums";


/*
* Describe a swipe event
*/
export class SwipeEventData implements EventData {
    eventName: string;
    object: SwipeCardBase;
    direction: SwipeDirection;
    originX: number;
    originY: number;
    destinationX: number;
    destinationY: number;
    constructor(originXValue: number,
        originYValue: number,
        destinationXValue?: number,
        destinationYValue?: number) {
        this.originX = originXValue;
        this.originY = originYValue;
        if (destinationYValue) {
            this.destinationY = destinationYValue;
        } else {
            this.destinationY = this.originY;
        }
        if (destinationXValue) {
            this.destinationX = destinationXValue;
        } else {
            this.destinationX = this.originX;
        }

    }
}

export class SwipeLeftEventData extends SwipeEventData {
    eventName: string = SwipeCardBase.swipeLeftEvent;
    direction: SwipeDirection = SwipeDirection.left;
}
export class SwipeRightEventData extends SwipeEventData {
    eventName: string = SwipeCardBase.swipeRightEvent;
    direction: SwipeDirection = SwipeDirection.right;
}
export class SwipeUpEventData extends SwipeEventData {
    eventName: string = SwipeCardBase.swipeUpEvent;
    direction: SwipeDirection = SwipeDirection.up;
}
export class SwipeDownEventData extends SwipeEventData {
    eventName: string = SwipeCardBase.swipeDownEvent;
    direction: SwipeDirection = SwipeDirection.down;
}


export class SwipeCardBase extends ContentView {
    public static swipeLeftEvent: string = "swipeLeft";
    public static swipeRightEvent: string = "swipeRight";
    public static swipeUpEvent: string = "swipeUp";
    public static swipeDownEvent: string = "swipeDown";
    public prevDeltaX: number;
    public prevDeltaY: number;
    public swiping: boolean = false;
    public panning: boolean = false;
    public initOriginX: number;
    public initOriginY: number;
    private static animationDuration: number = 500;

    constructor() {
        super();
        let that = this;
        this.initOriginX = this.originX;
        this.initOriginY = this.originY;

        this.on(GestureTypes.swipe, (args: SwipeGestureEventData) => {
            let eventData = that.getEventData(args.direction);
            that._cancelAllAnimations();
            if (!that.swiping) {
                that.swiping = true;
            }
            that.animate({
                translate: {
                    x: eventData.destinationX,
                    y: eventData.destinationY
                },
                duration: SwipeCardBase.animationDuration,
                curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
            }).then(() => {
                that.animate({
                    translate: {
                        x: that.initOriginX,
                        y: that.initOriginY
                    },
                    duration: SwipeCardBase.animationDuration,
                    curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
                }).then(() => {
                    that.notify(eventData);
                    that.swiping = false;
                });
            });
        });
        this.on(GestureTypes.pan, (args: PanGestureEventData) => {
            if (!that.panning) {
                that.panning = true;
            }
            if (args.state === 2) { // currently paning
                that.translateX += args.deltaX - that.prevDeltaX;
                that.translateY += args.deltaY - that.prevDeltaY;

                that.prevDeltaX = args.deltaX;
                that.prevDeltaY = args.deltaY;

            } else { 
                if (args.state === 1) {
                    that.prevDeltaX = 0;
                    that.prevDeltaY = 0;
                } else {
                    if (args.state === 3) { // Stop paning
                        if (!that.swiping) {
                            that._cancelAllAnimations();
                            that.animate({
                                translate: { x: that.initOriginX, y: that.initOriginY },
                                duration: 100,
                                curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
                            }).then(() => {
                                that.panning = false;
                            });
                        }
                    }
                }

            }
        });
    }
    private getEventData(direction: SwipeDirection): SwipeEventData {
        let width = this.getMeasuredWidth(), height = this.getMeasuredHeight();
        let eventData: SwipeEventData;
        switch (direction) {
            case SwipeDirection.down:
                eventData = new SwipeDownEventData(this.originX, this.originY, this.initOriginX, screen.mainScreen.heightDIPs + height);
                break;
            case SwipeDirection.up:
                eventData = new SwipeUpEventData(this.originX, this.originY, this.initOriginX, - height);
                break;
            case SwipeDirection.left:
                eventData = new SwipeLeftEventData(this.originX, this.originY, -width, this.initOriginY);
                break;
            case SwipeDirection.right:
                eventData = new SwipeRightEventData(this.originX, this.originY, screen.mainScreen.widthDIPs + width, this.initOriginY);
                break;
        }
        return eventData;
    }


    public swipeLeft(): Promise<void> {
        return this.swipe(- this.getMeasuredWidth(), this.initOriginY);
    }

    public swipeRight(): Promise<void> {
        return this.swipe(screen.mainScreen.widthDIPs + this.getMeasuredWidth(), this.initOriginY);
    }

    public swipeUp(): Promise<void> {
        return this.swipe(this.initOriginX, - this.getMeasuredHeight());
    }

    public swipeDown(): Promise<void> {
        return this.swipe(this.initOriginX, screen.mainScreen.heightDIPs + this.getMeasuredHeight());
    }

    private swipe(x, y): Promise<void> {
        let that = this;
        return this.animate({
            translate: {
                x: x,
                y: y
            },
            duration: SwipeCardBase.animationDuration,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        }).then(function () {
            that.animate({
                translate: {
                    x: that.initOriginX,
                    y: that.initOriginY
                },
                duration: SwipeCardBase.animationDuration,
                curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
            })
        })
    }
}