import { GridLayout } from 'ui/layouts/grid-layout';
import { Property } from 'ui/core/dependency-observable';
import { PropertyMetadata } from 'ui/core/proxy';
import { isAndroid } from 'platform';
import viewModule = require('ui/core/view');

let builder = require('ui/builder');

export class CustomComponent extends GridLayout {
    public static messageProperty = new Property("message", "BusyIndicator", new PropertyMetadata("test"));

    get message() {
        return this._getValue(CustomComponent.messageProperty);
    }

    set message(value: string) {
        this._setValue(CustomComponent.messageProperty, value);
    }

    constructor() {
        super();

        let innerComponent = builder.load(__dirname + '/custom-component.xml') as viewModule.View;
        innerComponent.bindingContext = this;

        this.addChild(innerComponent);
    }
}