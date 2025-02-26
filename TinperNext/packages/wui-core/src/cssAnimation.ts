/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
import classes from 'component-classes';
import Event from './Event';

const isCssAnimationSupported = Event.endEvents.length !== 0;

const capitalPrefixes = ['Webkit',
    'Moz',
    'O',
    // ms is special .... !
    'ms'];
const prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];

function getStyleProperty(node:any, name:string) {
    const style = window.getComputedStyle(node);

    let ret = '';
    for (let i = 0; i < prefixes.length; i++) {
        ret = style.getPropertyValue(prefixes[i] + name);
        if (ret) {
            break;
        }
    }
    return (ret);
}

function fixBrowserByTimeout(node:any) {
    if (isCssAnimationSupported) {
        const transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
        const transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
        const animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
        const animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
        const time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
        // sometimes, browser bug
        node.rcEndAnimTimeout = setTimeout(() => {
            node.rcEndAnimTimeout = null;
            if (node.rcEndListener) {
                node.rcEndListener();
            }
        }, (time) * 1000 + 200);
    }
}

function clearBrowserBugTimeout(node:any) {
    if (node.rcEndAnimTimeout) {
        clearTimeout(node.rcEndAnimTimeout);
        node.rcEndAnimTimeout = null;
    }
}

const cssAnimation = (node:any, transitionName:any, endCallback:any) => {
    const nameIsObj = typeof transitionName === 'object';
    const className = nameIsObj ? transitionName.name : transitionName;
    const activeClassName = nameIsObj ? transitionName.active : `${transitionName}-active`;
    let end:Function|undefined = endCallback;
    let start:Function|undefined;
    let active:Function|undefined;
    const nodeClasses = classes(node);

    if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
        end = endCallback.end;
        start = endCallback.start;
        active = endCallback.active;
    }

    if (node.rcEndListener) {
        node.rcEndListener();
    }

    node.rcEndListener = (e:any) => {
        if (e && e.target !== node) {
            return;
        }

        if (node.rcAnimTimeout) {
            clearTimeout(node.rcAnimTimeout);
            node.rcAnimTimeout = null;
        }

        clearBrowserBugTimeout(node);

        nodeClasses.remove(className);
        nodeClasses.remove(activeClassName);

        Event.removeEndEventListener(node, node.rcEndListener);
        node.rcEndListener = null;

        // Usually this optional end is used for informing an owner of
        // a leave animation and telling it to remove the child.
        if (end) {
            end();
        }
    };

    Event.addEndEventListener(node, node.rcEndListener);

    if (start) {
        start();
    }
    nodeClasses.add(className);

    node.rcAnimTimeout = setTimeout(() => {
        node.rcAnimTimeout = null;
        nodeClasses.add(activeClassName);
        if (active) {
            setTimeout(active, 0);
        }
        fixBrowserByTimeout(node);
        // 30ms for firefox
    }, 30);

    return {
        stop() {
            if (node.rcEndListener) {
                node.rcEndListener();
            }
        },
    };
};

cssAnimation.style = (node:any, style:any, callback:Function) => {
    if (node.rcEndListener) {
        node.rcEndListener();
    }

    node.rcEndListener = (e:any) => {
        if (e && e.target !== node) {
            return;
        }

        if (node.rcAnimTimeout) {
            clearTimeout(node.rcAnimTimeout);
            node.rcAnimTimeout = null;
        }

        clearBrowserBugTimeout(node);

        Event.removeEndEventListener(node, node.rcEndListener);
        node.rcEndListener = null;

        // Usually this optional callback is used for informing an owner of
        // a leave animation and telling it to remove the child.
        if (callback) {
            callback();
        }
    };

    Event.addEndEventListener(node, node.rcEndListener);

    node.rcAnimTimeout = setTimeout(() => {
        for (const s in style) {
            if (style.hasOwnProperty(s)) {
                node.style[s] = style[s];
            }
        }
        node.rcAnimTimeout = null;
        fixBrowserByTimeout(node);
    }, 0);
};

cssAnimation.setTransition = (node:any, p:string, value:any) => {
    let property = p;
    let v = value;
    if (value === undefined) {
        v = property;
        property = '';
    }
    property = property || '';
    capitalPrefixes.forEach((prefix) => {
        node.style[`${prefix}Transition${property}`] = v;
    });
};

cssAnimation.isCssAnimationSupported = isCssAnimationSupported;

export default cssAnimation;
