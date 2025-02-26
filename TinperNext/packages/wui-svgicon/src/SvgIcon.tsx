import classNames from 'classnames';
import omit from "omit.js";
import React, {Component} from 'react';
import {WebUI, getNid} from "../../wui-core/src/index";
import { SvgIconProps } from './iSvgIcon';

// const propTypes = {
//     className: PropTypes.string,
//     type: PropTypes.string,
//     component: PropTypes.func,
//     viewBox: PropTypes.string,
//     fieldid: PropTypes.string,
// };
const defaultProps = {
    viewBox: "0 0 1024 1024",
    clsPrefix: 'u-svgicon',
};

@WebUI({name: "svgicon", defaultProps})
class SvgIcon extends Component<SvgIconProps> {

    render() {
        const {
            className,
            type, // 图标类型
            component,
            viewBox,
            clsPrefix,
            children,
            fieldid,
            fontFamily
        } = this.props;

        const Component = component;

        const classString = classNames({
            [`${clsPrefix}`]: true,
        })
        let adapterNid = getNid(this.props)
        const renderInnerNode = () => {
            // component > type
            if (Component) {
                return <i {...omit(this.props, ["clsPrefix", "component"])} {...adapterNid}>
                    <Component>{children}</Component>
                </i>;
            }

            return (
                <svg className={classNames(className, classString)} fieldid={fieldid} aria-hidden="true" viewBox={viewBox} {...adapterNid}>
                    {/* <use xlinkHref={`#uftype-${type}`}></use> */}
                    <use xlinkHref={fontFamily ? `#${fontFamily}` : `#uftype-${type}`}></use>
                </svg>
            )
        };
        return (
            renderInnerNode()
        )
    }
}

// SvgIcon.propTypes = propTypes;
export default SvgIcon;
