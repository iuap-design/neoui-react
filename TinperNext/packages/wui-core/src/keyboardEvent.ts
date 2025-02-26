import type { KeyboardEvent } from 'react';
import KeyCode from './keyCode';

export const stopKeyEventBubbles = (event: KeyboardEvent<HTMLInputElement>) => {
    const { LEFT, RIGHT, UP, DOWN, ENTER, ESC } = KeyCode;
    if ([LEFT, RIGHT, UP, DOWN, ENTER, ESC].includes(event.keyCode)) {
        // event.nativeEvent.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        event.stopPropagation();
    }
}