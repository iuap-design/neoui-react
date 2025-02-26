import * as React from 'react';

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
