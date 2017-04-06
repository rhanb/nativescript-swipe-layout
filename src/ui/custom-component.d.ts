import { GridLayout } from 'ui/layouts/grid-layout';
import { Property } from 'ui/core/dependency-observable';
export declare class CustomComponent extends GridLayout {
    static messageProperty: Property;
    message: string;
    constructor();
}
