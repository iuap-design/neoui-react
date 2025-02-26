import removeEventListener from 'dom-helpers/events/off';
import addEventListener from 'dom-helpers/events/on';
import React from 'react';
import {AddEventLReturn} from './IUtils';

export default function(node: Element | Document, event: string, handler: (e: React.KeyboardEvent) => void, capture?: boolean): AddEventLReturn {
    addEventListener(node, event, handler, capture);

    return {
        remove() {
            removeEventListener(node, event, handler, capture);
        }
    };
}
