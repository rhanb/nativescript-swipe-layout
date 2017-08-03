# Nativescript-swipe-layout

[![npm](https://img.shields.io/npm/v/nativescript-swipe-layout.svg)](https://www.npmjs.com/package/nativescript-swipe-layout)
[![npm](https://img.shields.io/npm/dt/nativescript-swipe-layout.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-swipe-layout)

[![NPM](https://nodei.co/npm/nativescript-swipe-layout.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nativescript-swipe-layout/)

Simple swipeable layout, which allow you to drag it, detect swipe events, and perform swipe animations. 

Developed with :heart: by the team NativeBaguette 🥖

## Installation

```javascript
tns plugin add nativescript-swipe-layout
```

## Usage 

## Angular NativeScript

### XML
   
```xml
<GridLayout rows="*, auto" columns="*" backgroundColor="#77849F">
    <SwipeLayout height="300" width="300" row="0" colSpan="3" col="0" (loaded)="swipeLayoutLoaded($event)"          		(swipeLeft)="swipeLeft($event)"
(swipeRight)="swipeRight($event)" 
(swipeDown)="swipeDown($event)" 
(swipeUp)="swipeUp($event)">
        <CardView backgroundColor="white" margin="10" elevation="40" radius="5">
            <GridLayout rows="200, auto" columns="*">
                <image src="https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg" stretch="aspectFill" colSpan="3" row="0">		   </image>
                <label text="Batman wants to be friends?" class="info" textWrap="true" row="1" colSpan="3" class="p-20">		</label>
            </GridLayout>
        </CardView>
    </SwipeLayout>
    <GridLayout row="1" rows="*" columns="auto, auto, auto">
        <Button (tap)="comeHere()" row="0" col="0" class="p-20" class="btn btn-primary p-20" text="LIKE"></Button>
        <Button text="SUPER" (tap)="super()" row="0" col="1" class="btn p-20" backgroundColor="#5BD6BB" color="white"</Button>
        <Button text="DECLINE" (tap)="goAway()" row="0" col="2" class="btn p-20" backgroundColor="#B33A3A" color="white">	 </Button>
    </GridLayout>
</GridLayout>
```
### Component

```typescript
import { Component, ElementRef, ViewChild } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { SwipeLayout,  SwipeLeftEventData, SwipeDownEventData, SwipeUpEventData, SwipeRightEventData } from 'nativescript-swipe-layout';
import { CardView } from 'nativescript-cardview';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

registerElement("CardView", () => CardView);
registerElement('SwipeLayout', () => SwipeLayout);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    private _cardLayout: SwipeLayout;

    constructor(private fonticon: TNSFontIconService) { }

    swipeLayoutLoaded(event) {
        console.log('cardLayoutLoaded');
        this._cardLayout = <SwipeLayout>event.object;
    }

    swipeLeft(swipeLeftEvent: SwipeLeftEventData) {
        console.log('swipeLeft');
    }

    swipeRight(swipeRightEvent: SwipeRightEventData) {
        console.log('swipeRight');
    }
    swipeUp(swipeUpEvent: SwipeUpEventData) {
        console.log('swipeUp');
    }
    swipeDown(swipeDownEvent: SwipeDownEventData) {
        console.log('swipeDown');
    }

    goAway() {
        this._cardLayout.swipeRight().then(() => {
            console.log('swipeRight done');
        });
    }


    comeHere() {
        this._cardLayout.swipeLeft().then(() => {
            console.log('swipeLeft done');
        });
    }

    super () {
        this._cardLayout.swipeUp().then(() => {
            console.log("swipeUp done");
        });
    }
}
```

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `swipeRight` | `function` | `null` | Callback called when the layout is swiped to the right and the swipe animation is done. |
| `swipeLeft` | `function` | `null` | Callback called when the layout is swiped to the left and the swipe animation is done.  |
| `swipeUp` | `function` | `null` | Callback called when the layout is swiped up and the swipe animation is done.  |
| `swipeDown` | `function` | `null` | Callback called when the layout is swiped down and the swipe animation is done.  |

### Methods

| Method | Return | Description |
| --- | --- | --- | 
| `swipeRight` | `Promise<void>`| Method to manually start the swipe right animation |
| `swipeLeft` | `Promise<void>`| Method to manually start the swipe left animation |
| `swipeUp` | `Promise<void>`| Method to manually start the swipe up animation |
| `swipeDown` | `Promise<void>`| Method to manually start the swipe down animation |

## NativeBaguette 🥖

[<img alt="Rachid Al Kayat" src="https://avatars1.githubusercontent.com/u/10686043?v=3&s=400" width="117">](https://github.com/rkhayyat) | [<img alt="Jean-Baptiste Aniel" src="https://avatars1.githubusercontent.com/u/9477179?v=3&u=bb0e7ce0e5afcfb810e2741921d6e6012423b60f&s=400" width="117">](https://github.com/rhanbIT) | [<img alt="triniwiz" src="https://avatars1.githubusercontent.com/u/6695919?v=3&s=400" width="117">](https://github.com/triniwiz) | [<img alt="BradMartin" src="https://avatars1.githubusercontent.com/u/6006148?v=3&s=400" width="117">](https://github.com/bradmartin) | [<img alt="JenLooper" src="https://avatars1.githubusercontent.com/u/1450004?v=3&s=400" width="117">](https://github.com/jlooper) |
:---: |:---: |:---: |:---: |:---: |
[rkhayyat](https://github.com/rkhayyat) |[rhanb](https://github.com/rhanbIT) |[triniwiz](https://github.com/triniwiz) |[bradmartin](https://github.com/bradmartin) |[jlooper](https://github.com/jlooper) |

