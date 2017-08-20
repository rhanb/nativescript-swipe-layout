export enum ANIMATION_STATE {
    ALWAYS, // Will always animate on swipes event
    ON_EVENTS, // Will animate on swipes event listened on the app side
    NEVER // Will never animate on swipes event
}

export enum GESTURE_MODE {
    DRAG, // Will allow to drag layout
    SWIPE // Will only trigger swipe events
}