import { SwipeLayoutBase } from './swipe-layout.common';
export declare class SwipeLayout extends SwipeLayoutBase {
    constructor();
    readonly ios: any;
    onLoaded(): void;
    initNativeView(): void;
    onUnloaded(): void;
    disposeNativeView(): void;
}
