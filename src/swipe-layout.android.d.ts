import { SwipeLayoutBase } from './swipe-layout.common';
export declare class SwipeLayout extends SwipeLayoutBase {
    readonly android: any;
    createNativeView(): any;
    initNativeView(): void;
    onLoaded(): void;
    onUnloaded(): void;
    disposeNativeView(): void;
}
