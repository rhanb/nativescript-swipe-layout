import { SwipeDirection, Screen } from "@nativescript/core";
import { Point } from "@nativescript/core/ui/core/view";

export class PanDirection {
  public swipeDirection: SwipeDirection;
  public isSwipe: boolean = false;

  constructor(swipe: boolean) {
    this.isSwipe = swipe;
  }
}

export class PanDirectionBuilder {
  containerWidth: number;
  containerHeight: number;
  initPanDelta: Point;
  lastPanDelta: Point;

  constructor(
    initDeltaValue: Point,
    lastDeltaValue: Point,
    width: number,
    height: number
  ) {
    this.initPanDelta = initDeltaValue;
    this.lastPanDelta = lastDeltaValue;
    this.containerWidth = width;
    this.containerHeight = height;
  }

  public build(): PanDirection {
    let panDirection: PanDirection = new PanDirection(false);
    let XDistance = Math.abs(this.lastPanDelta.x - this.initPanDelta.x),
      initYDistance = this.initPanDelta.y - this.lastPanDelta.y,
      YDistance = Math.abs(initYDistance);
    panDirection.isSwipe =
      XDistance > Screen.mainScreen.widthDIPs / 4 ||
      YDistance > Screen.mainScreen.heightDIPs / 6;
    if (panDirection.isSwipe) {
      let goingHorizontaly = XDistance > YDistance;
      if (goingHorizontaly) {
        let goingLeft = this.lastPanDelta.x < this.initPanDelta.x;
        if (!goingLeft) {
          panDirection.swipeDirection = SwipeDirection.right;
        } else {
          panDirection.swipeDirection = SwipeDirection.left;
        }
      } else {
        let goingUp = initYDistance > 0;
        if (goingUp) {
          panDirection.swipeDirection = SwipeDirection.up;
        } else {
          panDirection.swipeDirection = SwipeDirection.down;
        }
      }
    }
    return panDirection;
  }
}
