import { Page, EventData } from "@nativescript/core";
import { SwipeLeftEventData } from "nativescript-swipe-layout";
import { HelloWorldModel } from "./main-view-model";

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();
}

export function cardLoaded(args: EventData) {
  console.log("cardLoaded", args.object);
}

export function swipeLeft(event: SwipeLeftEventData) {
  console.log("swipeLeft", event);
}
