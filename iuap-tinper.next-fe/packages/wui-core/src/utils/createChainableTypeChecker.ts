/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Mostly taken from ReactPropTypes.

/* This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */

export default function createChainableTypeChecker(validate:Function) {
    function checkType(
        isRequired:boolean,
        props:any,
        propName:string,
        componentName:string,
        location:any,
        propFullName:string,
        ...args:any[]
    ) {
        const componentNameSafe = componentName || '<<anonymous>>';
        const propFullNameSafe = propFullName || propName;

        if (props[propName] == null) {
            if (isRequired) {
                return new Error(
                    `Required ${location} \`${propFullNameSafe}\` was not specified ` +
					`in \`${componentNameSafe}\`.`
                );
            }

            return null;
        }

        return validate(
            props,
            propName,
            componentNameSafe,
            location,
            propFullNameSafe,
            ...args
        );
    }

    const chainedCheckType = checkType.bind(null, false);
    // chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
}
