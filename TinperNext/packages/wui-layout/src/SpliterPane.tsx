import React from 'react';
import { PaneProps, PaneState } from './iLayout';
import classNames from 'classnames';
import { WebUI } from "../../wui-core/src/index";
// import Prefixer from 'inline-style-prefixer';
// import stylePropType from 'react-style-proptype';

@WebUI({name: "spliter-pane"})
class Pane extends React.Component<PaneProps, PaneState> {
    constructor(props: PaneProps) {
        super(props);
        this.state = { size: props.size };
    }

    render() {
        const {
            children,
            className,
            clsPrefix,
            direction,
            style,
        } = this.props;
        const { size } = this.state;
        const classes = classNames(clsPrefix, className);

        const PaneStyle: React.CSSProperties = {
            flex: 1,
            position: 'relative',
            outline: 'none',
            ...style
        };

        if (size !== undefined) {
            if (direction === 'vertical' || typeof direction === undefined) {
                PaneStyle.width = size;
                PaneStyle.overflow = size ? 'auto' : 'unset';
            } else if (direction === 'horizontal') {
                PaneStyle.height = size;
                PaneStyle.display = 'flex';
            }
            PaneStyle.flex = 'none';
        }
        // const menuClsPrefix = getClsPrefix("spliter");
        // if (primary === 'first') {
        //     if (className === `${menuClsPrefix}-second`) {
        //         PaneStyle.marginLeft = -7
        //     }
        // } else {
        //     if (className === `${menuClsPrefix}-first`) {
        //         PaneStyle.marginRight = -7
        //     }
        // }
        return (
            <div className={classes}
                style={PaneStyle}
            >
                {children}
            </div>
        );
    }
}

export default Pane;
