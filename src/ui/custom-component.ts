import { GridLayout } from 'ui/layouts/grid-layout';
import { isAndroid } from 'platform';
import { View, Property } from 'ui/core/view';

let builder = require('ui/builder');

export class CustomComponent extends GridLayout {
    constructor() {
        super();

        let innerComponent = builder.load(__dirname + '/custom-component.xml') as View;
        innerComponent.bindingContext = this;

        this.addChild(innerComponent);
    }
}

export const messageProperty = new Property<CustomComponent, string>({ name: "message", defaultValue: "" });
messageProperty.register(CustomComponent);