import { Common } from './swipe-card.common';
import { GesturesObserver, GestureTypes, SwipeGestureEventData, GestureEventData, TouchGestureEventData, PanGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import { screen } from "tns-core-modules/platform";

declare var CGRectMake;


export class SwipeCard extends Common {

    constructor() {
        super();
        this.nativeView = new UIView(CGRectMake(0, 0, 0, 0));
        let that = new WeakRef(this);
        this.on(GestureTypes.swipe, (args: SwipeGestureEventData) => {
            let originalPos = that.get().getLocationOnScreen();
            let width = that.get().getMeasuredWidth(), height = that.get().getMeasuredHeight();
            let xSwipe = originalPos.x, ySwipe = originalPos.y;
            switch (args.direction) {
                case SwipeDirection.down:
                    ySwipe = screen.mainScreen.heightDIPs + height;
                    break;
                case SwipeDirection.up:
                    ySwipe = - height;
                    break;
                case SwipeDirection.left:
                    xSwipe = - width;
                    break;
                case SwipeDirection.right:
                    xSwipe = screen.mainScreen.widthDIPs + width;
                    break;
            }
            that.get().animate({
                translate: {
                    x: xSwipe,
                    y: ySwipe
                }
            }).then(() => {
                that.get().animate({
                    translate: {
                        x: originalPos.x,
                        y: originalPos.y
                    }
                });
            });
        });
    }


    get ios(): any {
        return this.nativeView
    }

    public onLoaded() {
        super.onLoaded();
    }

    public onUnloaded() {
        super.onUnloaded();
    }

    public disposeNativeView() { }
}
