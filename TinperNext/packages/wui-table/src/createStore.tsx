import { DefaultRecordType } from './interface';
export default function createStore(initialState: DefaultRecordType) {
    let state = initialState;
    const listeners: Array<() => void> = [];

    function setState(partial: DefaultRecordType) {
        state = {...state, ...partial};
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }

    function getState() {
        return state;
    }

    function subscribe(listener:() => void) {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        };
    }

    // function unsubscribe(listener:() => void) {
    //     const index = listeners.indexOf(listener);
    //     if (index !== -1) {
    //         listeners.splice(index, 1);
    //     }
    // }

    return {
        setState,
        getState,
        subscribe,
        // unsubscribe
    };
}
