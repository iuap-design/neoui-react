/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
import warning from 'warning';

let warned:any = {};

export default function deprecated(validator:Function, reason:string) {
    return function validate(
        props:any, propName:string, componentName:string, location:any, propFullName:string, ...args:any[]
    ) {
        const componentNameSafe = componentName || '<<anonymous>>';
        const propFullNameSafe = propFullName || propName;

        if (props[propName] != null) {
            const messageKey = `${componentName}.${propName}`;

            warning(warned[messageKey],
                `The ${location} \`${propFullNameSafe}\` of ` +
				`\`${componentNameSafe}\` is deprecated. ${reason}.`
            );

            warned[messageKey] = true;
        }

        return validator(
            props, propName, componentName, location, propFullName, ...args
        );
    };
}

/* eslint-disable no-underscore-dangle */
function _resetWarned() {
    warned = {};
}

deprecated._resetWarned = _resetWarned;
/* eslint-enable no-underscore-dangle */
