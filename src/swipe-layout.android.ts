import { SwipeLayoutBase, gestureModeProperty } from './swipe-layout.common';
import { GESTURE_MODE } from "./swipe-layout.enums";

declare var android;

export class SwipeLayout extends SwipeLayoutBase {
    private _androidViewId: number;

    get android(): any {
        return this.nativeView;
    }


    public createNativeView() {
        return new android.widget.LinearLayout(this._context)
    }

    public initNativeView() {
        this._androidViewId = android.view.View.generateViewId();
        this.nativeView.setId(this._androidViewId);
      }

    [gestureModeProperty.setNative](gestureModevalue: GESTURE_MODE) {
        super.setGestureMode(gestureModevalue);
    }
}
