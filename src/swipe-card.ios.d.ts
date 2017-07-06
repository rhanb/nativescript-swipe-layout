import { SwipeCardBase } from './swipe-card.common';
export declare class SwipeCard extends SwipeCardBase {
    constructor();
    readonly ios: any;
    onLoaded(): void;
    onUnloaded(): void;
    disposeNativeView(): void;
}
