import { AnyObject } from "./iTree";

export default function createStore(initialState: AnyObject) {
    let state = initialState;
    const listeners: Function[] = [];

    function setState(partial: AnyObject) {
        state = {...state, ...partial};
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }

    function getState() {
        return state;
    }

    function subscribe(listener: Function) {
        listeners.push(listener);

        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }

    return {
        setState,
        getState,
        subscribe,
    };
}
