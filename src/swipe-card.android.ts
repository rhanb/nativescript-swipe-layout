import { Common } from './swipe-card.common';
import { View } from "tns-core-modules/ui/content-view/content-view";

declare var android: any;

export class SwipeCard extends Common {
    get android(): any {
        return this.nativeView;
    }


    public createNativeView() {
        return this.nativeView;
    }

    public initNativeView() {}
}
