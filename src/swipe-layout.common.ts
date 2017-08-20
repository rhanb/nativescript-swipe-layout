import { ContentView, EventData, Point } from "tns-core-modules/ui/content-view";
import { GestureTypes, SwipeGestureEventData, SwipeDirection, PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { screen } from "tns-core-modules/platform";
import { Property } from "tns-core-modules/ui/core/properties/properties";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { SwipeEventData, SwipeDownEventData, SwipeUpEventData, SwipeLeftEventData, SwipeRightEventData } from "./swipe-event-data";
import { GESTURE_MODE, ANIMATION_STATE } from "./swipe-layout.enums";
import { PanDirectionBuilder, PanDirection } from "./pan-direction";



export class SwipeLayoutBase extends ContentView {

    public swipeLeftEvent: string = "swipeLeft";
    public swipeRightEvent: string = "swipeRight";
    public swipeUpEvent: string = "swipeUp";
    public swipeDownEvent: string = "swipeDown";

    public animationState: ANIMATION_STATE;
    public gestureMode: GESTURE_MODE;
    public animationDuration: number = 500;

    private prevDelta: Point = <Point>{
        x: 0,
        y: 0
    };
    private initDelta: Point = <Point>{
        x: 0,
        y: 0
    }

    private isCurrentlyAnimated: boolean = false;

    private initOriginX: number;
    private initOriginY: number;


    constructor() {
        super();

        this.initOriginX = this.originX;
        this.initOriginY = this.originY;

        this.animationState = ANIMATION_STATE.ALWAYS;
        this.gestureMode = GESTURE_MODE.SWIPE;

    }

    private swipeGestureHandler(swipeGestureEventDataValue: SwipeGestureEventData) {
        this.commonHandler(swipeGestureEventDataValue.direction);
    }

    private commonHandler(swipeDirection: SwipeDirection) {
        let eventData = this.getEventData(swipeDirection);
        if (eventData.animated) {
            let that = this;
            this.swipe(eventData).then((value) => {
                that.notify(eventData);
            }).catch((reason) => {
                throw new Error(reason);
            });
        } else {
            this.centerBack().then(() => {
                this.notify(eventData);
            });
        }
    }


    private centerBack(): Promise<void> {
        let that = this;
        return this.animate({
            translate: {
                x: that.initOriginX,
                y: that.initOriginY
            },
            duration: that.animationDuration,
        });
    }

    public setGestureMode(gestureModevalue: GESTURE_MODE) {
        if (gestureModevalue === GESTURE_MODE.DRAG) {
            this.removeEventListener("swipe");
            this.on(GestureTypes.pan, this.panGestureHandler, this);
        } else {
            this.removeEventListener("pan");
            this.on(GestureTypes.swipe, this.swipeGestureHandler, this);
        }
    }

    private panGestureHandler(panGestureEventDataValue: PanGestureEventData) {
        switch (panGestureEventDataValue.state) {
            case 1:
                this.initPaning();
                break;
            case 2:
                this.paningHandler(panGestureEventDataValue);
                break;
            case 3:
                this.dismissPaning(panGestureEventDataValue);
                break;

        }
    }

    private initPaning() {
        this.initDelta.x = this.initDelta.y = this.prevDelta.x = this.prevDelta.y = 0;
    }

    private paningHandler(panGestureEventDataValue: PanGestureEventData) {
        this.translateX += panGestureEventDataValue.deltaX - this.prevDelta.x;
        this.translateY += panGestureEventDataValue.deltaY - this.prevDelta.y;

        this.prevDelta.x = panGestureEventDataValue.deltaX;
        this.prevDelta.y = panGestureEventDataValue.deltaY;
    }

    private dismissPaning(panGestureEventDataValue: PanGestureEventData) {
        let currentLocation: Point = this.getLocationOnScreen();

        let directionBuilder: PanDirectionBuilder = new PanDirectionBuilder(this.initDelta, currentLocation, this.effectiveWidth, this.effectiveHeight);

        let panDirection: PanDirection = directionBuilder.build();
        if (panDirection.isSwipe) {
            this.commonHandler(panDirection.swipeDirection);
        } else {
            this._cancelAllAnimations();
            let that = this;
            this.centerBack();
        }
    }




    private getEventData(direction: SwipeDirection): SwipeEventData {
        let width = this.getMeasuredWidth(), height = this.getMeasuredHeight();
        let eventData: SwipeEventData;
        let shouldBeAnimated: boolean;
        switch (direction) {
            case SwipeDirection.down:
                shouldBeAnimated = (this.animationState === ANIMATION_STATE.ON_EVENTS && this.hasSwipeDownListener()) || this.animationState === ANIMATION_STATE.ALWAYS;
                eventData = new SwipeDownEventData(this.originX, this.originY, this.initOriginX, height + height / 2, shouldBeAnimated);
                break;
            case SwipeDirection.up:
                shouldBeAnimated = (this.animationState === ANIMATION_STATE.ON_EVENTS && this.hasSwipeUpListener()) || this.animationState === ANIMATION_STATE.ALWAYS;
                eventData = new SwipeUpEventData(this.originX, this.originY, this.initOriginX, - height / 2, shouldBeAnimated);
                break;
            case SwipeDirection.left:
                shouldBeAnimated = (this.animationState === ANIMATION_STATE.ON_EVENTS && this.hasSwipeLeftListener()) || this.animationState === ANIMATION_STATE.ALWAYS;
                eventData = new SwipeLeftEventData(this.originX, this.originY, - width / 2, this.initOriginY, shouldBeAnimated);
                break;
            case SwipeDirection.right:
                shouldBeAnimated = (this.animationState === ANIMATION_STATE.ON_EVENTS && this.hasSwipeRightListener()) || this.animationState === ANIMATION_STATE.ALWAYS;
                eventData = new SwipeRightEventData(this.originX, this.originY, width + width / 2, this.initOriginY, shouldBeAnimated);
                break;
        }
        return eventData;
    }

    private hasSwipeLeftListener(): boolean {
        return this.hasListeners('swipeLeft');
    }

    private hasSwipeRightListener(): boolean {
        return this.hasListeners('swipeRight');
    }

    private hasSwipeUpListener(): boolean {
        return this.hasListeners('swipeUp');
    }

    private hasSwipeDownListener(): boolean {
        return this.hasListeners('swipeDown');
    }

    public animateSwipeLeft(): Promise<void> {
        return this.swipe(this.getEventData(SwipeDirection.left));
    }

    public animateSwipeRight(): Promise<void> {
        return this.swipe(this.getEventData(SwipeDirection.right));
    }

    public animateSwipeUp(): Promise<void> {
        return this.swipe(this.getEventData(SwipeDirection.up));
    }

    public animateSwipeDown(): Promise<void> {
        return this.swipe(this.getEventData(SwipeDirection.down));
    }

    public swipe(eventData: SwipeEventData): Promise<void> {
        let that = this;
        this._cancelAllAnimations();
        return this.animate({
            translate: {
                x: eventData.destinationX,
                y: eventData.destinationY
            },
            duration: that.animationDuration,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    }
}

export const animationStateProperty = new Property<SwipeLayoutBase, ANIMATION_STATE>({
    name: "animationState"
});

animationStateProperty.register(SwipeLayoutBase);

export const gestureModeProperty = new Property<SwipeLayoutBase, GESTURE_MODE>({
    name: "gestureMode"
});

gestureModeProperty.register(SwipeLayoutBase);



