import { SwipeLayoutBase, gestureModeProperty } from "./swipe-layout.common";
import { GESTURE_MODE } from "./swipe-layout.enums";

declare const CGRectMake;

export class SwipeLayout extends SwipeLayoutBase {
  constructor() {
    super();
    this.nativeView = new UIView(CGRectMake(0, 0, 0, 0));
  }

  // @ts-ignore
  get ios(): any {
    return this.nativeView;
  }
  // end @ts-ignore

  public onLoaded() {
    super.onLoaded();
  }

  public initNativeView() {}

  public onUnloaded() {
    super.onUnloaded();
  }

  public disposeNativeView() {}

  [gestureModeProperty.setNative](gestureModevalue: GESTURE_MODE) {
    super.setGestureMode(gestureModevalue);
  }
}
