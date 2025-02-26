import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';
import {WebUI} from "../../wui-core/src/index";
import { ContainerProps } from './iLayout';

// const propTypes = {
//     /**
// 	 * Adds `container-fluid` class.
// 	 */
//     fluid: PropTypes.bool,
//     /**
// 	 * You can use a custom element for this component
// 	 */
//     componentClass: PropTypes.oneOfType([
//         PropTypes.element,
//         PropTypes.string
//     ])
// };

const defaultProps = {
    componentClass: 'div',
    fluid: false
};

@WebUI({name: "container", defaultProps})
class Con extends React.Component<ContainerProps> {
    render() {
        const {fluid, componentClass = 'div', clsPrefix, className, ...others} =
			this.props;
        const Component = componentClass;

        let classes = classNames(
	        {
                [`${clsPrefix}`]: !fluid,
                [`${clsPrefix}-fluid`]: fluid
	        },
	        className,
	    );

        return (
            <Component
                {...others}
                className={classes}
            >
                {this.props.children}
            </Component>
        );
    }
}

// Con.propTypes = propTypes;

export default Con;
