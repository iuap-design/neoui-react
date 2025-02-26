/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
export default function isRequiredForA11y(validator:Function) {
    return function validate(
        props:any, propName:string, componentName:string, location:any, propFullName:string, ...args:any[]
    ) {
        const componentNameSafe = componentName || '<<anonymous>>';
        const propFullNameSafe = propFullName || propName;

        if (props[propName] == null) {
            return new Error(
                `The ${location} \`${propFullNameSafe}\` is required to make ` +
				`\`${componentNameSafe}\` accessible for users of assistive ` +
				'technologies such as screen readers.'
            );
        }

        return validator(
            props, propName, componentName, location, propFullName, ...args
        );
    };
}
