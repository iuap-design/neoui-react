/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
const EVENT_NAME_MAP:Record<string, any> = {
    transitionend: {
        transition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'mozTransitionEnd',
        OTransition: 'oTransitionEnd',
        msTransition: 'MSTransitionEnd',
    },

    animationend: {
        animation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        OAnimation: 'oAnimationEnd',
        msAnimation: 'MSAnimationEnd',
    },
};

const endEvents:any[] = [];

function detectEvents() {
    const testEl = document.createElement('div');
    const style = testEl.style;

    if (!('AnimationEvent' in window)) {
        delete EVENT_NAME_MAP.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
        delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (const baseEventName in EVENT_NAME_MAP) {
        if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
            const baseEvents = EVENT_NAME_MAP[baseEventName];
            for (const styleName in baseEvents) {
                if (styleName in style) {
                    endEvents.push(baseEvents[styleName]);
                    break;
                }
            }
        }
    }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    detectEvents();
}

function addEventListener(node:Element, eventName:string, eventListener:any) {
    node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node:Element, eventName:string, eventListener:any) {
    node.removeEventListener(eventName, eventListener, false);
}

const TransitionEvents = {
    addEndEventListener(node:Element, eventListener:Function) {
        if (endEvents.length === 0) {
            window.setTimeout(eventListener, 0);
            return;
        }
        endEvents.forEach((endEvent) => {
            addEventListener(node, endEvent, eventListener);
        });
    },

    endEvents,

    removeEndEventListener(node:Element, eventListener:any) {
        if (endEvents.length === 0) {
            return;
        }
        endEvents.forEach((endEvent) => {
            removeEventListener(node, endEvent, eventListener);
        });
    },
    // 阻止事件默认行为
    preventDefault(event:Event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 阻止事件冒泡
    stopPropagation(event:Event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

export default TransitionEvents;
