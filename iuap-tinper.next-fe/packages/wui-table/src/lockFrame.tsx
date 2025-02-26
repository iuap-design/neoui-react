
// function useEvent(callback: any) {
//     const fnRef: any = {
//         current: null
//     }
//     fnRef.current = callback;

//     const memoFn = ((...args: any) => fnRef.current?.(...args)) as any;

//     return memoFn;
// }

/** Lock frame, when frame pass reset the lock. */
function useTimeoutLock(defaultState?: any) {
    const frameRef: any = {
        current: defaultState || null
    }
    const timeoutRef: any = {
        current: null
    }

    function cleanUp() {
        window.clearTimeout(timeoutRef.current);
    }

    function setState(newState: any) {
        frameRef.current = newState;
        cleanUp();

        timeoutRef.current = window.setTimeout(() => {
            frameRef.current = null;
            timeoutRef.current = undefined;
        }, 100);
    }

    function getState() {
        return frameRef.current;
    }

    cleanUp();

    return {setState, getState};
}

export {useTimeoutLock}
