/* eslint-disable no-unused-vars */
import * as React from 'react';
import { mount } from 'cypress/react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      compareSnapshot(email: string): any
    }
  }
}
declare module 'react'{
    // @ts-expect-error: Unreachable code error
    // eslint-disable-next-line no-undef
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T>, React.HTMLAttributes<T>{
        clsPrefix?: string;
        uitype?: string;
        nid?: string;
        fieldid?: string;
        disabled?: boolean | undefined;
    }
    // eslint-disable-next-line no-undef
    interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T>{
        fieldid?: string;
    }
}
// declare cy{

// }

