import { SwipeCardBase } from './swipe-card.common';
export declare class SwipeCard extends SwipeCardBase {
    readonly android: any;
    createNativeView(): any;
    initNativeView(): void;
    readonly ios: any;
    onLoaded(): void;
    onUnloaded(): void;
    disposeNativeView(): void;
    
}
