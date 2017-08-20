import { SwipeLayoutBase, gestureModeProperty } from './swipe-layout.common';
import { GestureTypes } from "tns-core-modules/ui/gestures/gestures";
import { GESTURE_MODE } from "./swipe-layout.enums";

declare var CGRectMake, UIView;


export class SwipeLayout extends SwipeLayoutBase {

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

    public initNativeView() {

    }

    public onUnloaded() {
        super.onUnloaded();
    }

    public disposeNativeView() {

    }

    [gestureModeProperty.setNative](gestureModevalue: GESTURE_MODE) {
        super.setGestureMode(gestureModevalue);
    }

}
