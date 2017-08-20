import { SwipeLayoutBase, gestureModeProperty } from './swipe-layout.common';
import { GESTURE_MODE } from "./swipe-layout.enums";

export class SwipeLayout extends SwipeLayoutBase {
    get android(): any {
        return this.nativeView;
    }


    public createNativeView() {
        return this.nativeView;
    }

    public initNativeView() {}

    public onLoaded() {
        super.onLoaded();
    }

    public onUnloaded() {
        super.onUnloaded();
    }

    public disposeNativeView() { }

    [gestureModeProperty.setNative](gestureModevalue: GESTURE_MODE) {
        super.setGestureMode(gestureModevalue);
    }
}
