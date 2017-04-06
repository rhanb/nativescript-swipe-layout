import { Observable } from 'data/observable';
import { CustomComponent } from './ui/custom-component';
export declare class Common extends Observable {
    message: string;
    constructor();
    greet(): string;
}
export declare class Utils {
    static SUCCESS_MSG(): string;
}
export declare class YourPluginUI extends CustomComponent {
}
