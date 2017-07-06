import { SwipeCardBase, SwipeDownEvent, SwipeUpEvent, SwipeLeftEvent, SwipeRightEvent } from './swipe-card.common';
import { GestureTypes, SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import { screen } from "tns-core-modules/platform";

declare var CGRectMake, UIView;


export class SwipeCard extends SwipeCardBase {

    constructor() {
        super();
        this.nativeView = new UIView(CGRectMake(0, 0, 0, 0));
    }


    get ios(): any {
        return this.nativeView;
    }

    public onLoaded() {
        super.onLoaded();
    }

    public onUnloaded() {
        super.onUnloaded();
    }

    public disposeNativeView() { }
}
