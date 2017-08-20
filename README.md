# Nativescript-swipe-layout

[![npm](https://img.shields.io/npm/v/nativescript-swipe-layout.svg)](https://www.npmjs.com/package/nativescript-swipe-layout)
[![npm](https://img.shields.io/npm/dt/nativescript-swipe-layout.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-swipe-layout)

[![NPM](https://nodei.co/npm/nativescript-swipe-layout.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nativescript-swipe-layout/)

Simple swipeable layout, which allow you to drag it, detect swipe events, and perform swipe animations. 

Developed with :heart: by the team NativeBaguette 🥖

<p align="center"><img src="https://raw.githubusercontent.com/rhanb/nativescript-swipe-layout/master/screenshots/demo.gif" width="208" height="368" /></p>



## Installation

```javascript
tns plugin add nativescript-swipe-layout
```

## Usage 

## NativeScript with Angular

Here is an example of how you can use this plugin to build a tinder like stack of cards. Here, the plugin [nativescript-cardview](https://github.com/bradmartin/nativescript-cardview) is used.

### XML
#### app.component.html
   
```xml
<ActionBar title="swipe-layout" icon="" class="action-bar">
</ActionBar>
<GridLayout rows="*, auto" columns="*" backgroundColor="#77849F">
    <SwipeLayout *ngFor="let card of cards" row="0" colSpan="3" col="0" (loaded)="swipeLayoutLoaded($event)" (swipeDown)="swipeDownCallback($event)" (swipeUp)="swipeUpCallback($event)" [animationState]="swipeLayoutAnimated" [gestureMode]="gestureMode">
        <CardView width="300" height="300" backgroundColor="white" margin="10" elevation="40" radius="5">
            <GridLayout rows="200, auto" columns="*">
                <image [src]="card.img" stretch="aspectFill" colSpan="3" row="0"></image>
                <label [text]="card.test" class="info" textWrap="true" row="1" colSpan="3" class="p-20"></label>
            </GridLayout>
        </CardView>
    </SwipeLayout>
    <GridLayout row="1" rows="*" columns="auto, auto, auto">
        <Button (tap)="like()" row="0" col="0" class="p-20" class="btn btn-primary p-20" text="LIKE">
                </Button>
        <Button text="SUPER" (tap)="super()" row="0" col="1" class="btn p-20" backgroundColor="#5BD6BB" color="white"></Button>
        <Button text="DECLINE" (tap)="decline()" row="0" col="2" class="btn p-20" backgroundColor="#B33A3A" color="white"></Button>
    </GridLayout>
</GridLayout>
```
### Component
#### app.component.ts

```typescript
import { Component, ElementRef, ViewChild } from "@angular/core";
.
. // other imports
.
registerElement("CardView", () => CardView);
registerElement('SwipeLayout', () => SwipeLayout);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    private _swipeLayouts: Array<SwipeLayout>;
    private currentSwipeLayout: SwipeLayout;
    public swipeLayoutAnimated: ANIMATION_STATE;
    public gestureMode: GESTURE_MODE;

    public cards: Array<any> = [{ // dumb cards
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    },
    {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }, {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }, {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }, {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }, {
        img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
        test: "Batman is pretty cool right?"
    }]

    constructor(private fonticon: TNSFontIconService) {
        this._swipeLayouts = new Array();
        this.swipeLayoutAnimated = ANIMATION_STATE.ON_EVENTS; // Will animate only on swipe down and up events
        this.gestureMode = GESTURE_MODE.DRAG; // Cards will be draggable
    }

    swipeLayoutLoaded(event) {
        this._swipeLayouts.push(<SwipeLayout>event.object); // Since it's an Array everytime a SwipeLayout load we add it
    }

    ngAfterViewInit(): void {
        this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
    }

    private next() {
        this._swipeLayouts.pop();
        this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
    }
    
    swipeLeftCallback(swipeLeftEvent: SwipeLeftEventData) { // never called (not binded to the XML)
        console.log('swipeLeft');
        this.next();
    }

    swipeRightCallback(swipeRightEvent: SwipeRightEventData) { // never called (not binded to the XML)
        console.log('swipeRight');
        this.next();
    }
    
    swipeUpCallback(swipeUpEvent: SwipeUpEventData) { // called once the swipe up animation is done
        console.log('swipeUp');
        this.next();
    }
    
    swipeDownCallback(swipeDownEvent: SwipeDownEventData) { // called once the swipe down animation is done
        console.log('swipeDown');
        this.next();
    }

    decline() { // red button  on tap callback
        let that = this;
        this.currentSwipeLayout.animateSwipeRight().then(() => {
            that.next();
            console.log('swipeLeft done');
        });
    }


    like() { // blue button on tap callback
        let that = this;
        this.currentSwipeLayout.animateSwipeLeft().then(() => {
            that.next();
            console.log('swipeRight done');
        });
    }

    super() { // green button on tap callback
        let that = this;
        this.currentSwipeLayout.animateSwipeUp().then(() => {
            that.next();
            console.log("swipeUp done");
        });
    }
}
```

## API

Further reading [here](https://github.com/rhanb/nativescript-swipe-layout/blob/master/API.MD).

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `swipeRight` | `function` | `null` | Callback called when the layout is swiped to the right and the swipe animation is done. |
| `swipeLeft` | `function` | `null` | Callback called when the layout is swiped to the left and the swipe animation is done.  |
| `swipeUp` | `function` | `null` | Callback called when the layout is swiped up and the swipe animation is done.  |
| `swipeDown` | `function` | `null` | Callback called when the layout is swiped down and the swipe animation is done.  |
| `animationState` | `ANIMATION_STATE` | `ANIMATION_STATE.ALWAYS` | Enable to perform animation when swipe events are fired, not at all or only on swipe events with a callback  |
| `gestureMode` | `GESTURE_MODE` | `GESTURE_MODE.SWIPE` | Allow to choose between the `drag` behavior or the `swipe` behavior |

### Methods

| Method | Return | Parameters | Description | 
| --- | --- | --- | --- | 
| `animateSwipeRight` | `Promise<void>`| None | Method to manually start the swipe right animation. |
| `animateSwipeLeft` | `Promise<void>`| None | Method to manually start the swipe left animation |
| `animateSwipeUp` | `Promise<void>`| None | Method to manually start the swipe up animation |
| `animateSwipeDown` | `Promise<void>`| None | Method to manually start the swipe down animation |
| `swipe` | `Promise<void>`| (swipeEvent: SwipeEventData) | Method to manually start the swipe animation but has a parameter. From the direction given, will perform the right animation |

All the method abose can be override, you can customise the animations as you want. If you wan't to override the animation which is performed on a swipe event you'll have to override the `swipe` method, since it's the one which is called when the event is fired :fire: 


## NativeBaguette 🥖

[<img alt="Rachid Al Kayat" src="https://avatars1.githubusercontent.com/u/10686043?v=3&s=400" width="117">](https://github.com/rkhayyat) | [<img alt="Jean-Baptiste Aniel" src="https://avatars1.githubusercontent.com/u/9477179?v=3&u=bb0e7ce0e5afcfb810e2741921d6e6012423b60f&s=400" width="117">](https://github.com/rhanbIT) | [<img alt="triniwiz" src="https://avatars1.githubusercontent.com/u/6695919?v=3&s=400" width="117">](https://github.com/triniwiz) | [<img alt="BradMartin" src="https://avatars1.githubusercontent.com/u/6006148?v=3&s=400" width="117">](https://github.com/bradmartin) | [<img alt="JenLooper" src="https://avatars1.githubusercontent.com/u/1450004?v=3&s=400" width="117">](https://github.com/jlooper) |
:---: |:---: |:---: |:---: |:---: |
[rkhayyat](https://github.com/rkhayyat) |[rhanb](https://github.com/rhanbIT) |[triniwiz](https://github.com/triniwiz) |[bradmartin](https://github.com/bradmartin) |[jlooper](https://github.com/jlooper) |

