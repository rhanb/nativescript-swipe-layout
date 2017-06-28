import { Observable, EventData } from "tns-core-modules/data/observable/observable";

export class HelloWorldModel extends Observable {
  public message: string;

  constructor() {
    super();
  }

  public cardLoaded (args: EventData) {
    console.dir("cardLoaded");
  }
}