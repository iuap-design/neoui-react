import React from 'react';
import { ResizerProps } from './iLayout';
import classNames from 'classnames';
import { WebUI } from "../../wui-core/src/index";
// import Prefixer from 'inline-style-prefixer';
// import stylePropType from 'react-style-proptype';

@WebUI({name: "spliter-resizer"})
class Resizer extends React.Component<ResizerProps> {
    render() {
        const {
            className,
            onClick,
            onDoubleClick,
            onMouseDown,
            onTouchEnd,
            onTouchStart,
            clsPrefix,
            direction,
            style = {},
            trigger,
            fixeNail,
            resizerable,
            primary,
            resizerClassName,
            collapsed
        } = this.props;
        const classes = classNames(clsPrefix, direction, className, resizerClassName);
        const classesLine = classNames(clsPrefix, {
            [`${clsPrefix}-line-not-allowed`]: !resizerable,
            [`${clsPrefix}-line-collapsed`]: !!collapsed
        },
        `${clsPrefix}-line`,
        `${clsPrefix}-line-${primary}`
        );

        return (
            <div className={classes} >
                <span
                    className={classesLine}
                    style={style}
                    onMouseDown={onMouseDown}
                    onTouchStart={event => {
                        event.preventDefault();
                        onTouchStart && onTouchStart(event);
                    }}
                    onTouchEnd={event => {
                        event.preventDefault();
                        onTouchEnd && onTouchEnd(event);
                    }}
                    onClick={event => {
                        if (onClick) {
                            event.preventDefault();
                            onClick(event);
                        }
                    }}
                    onDoubleClick={event => {
                        if (onDoubleClick) {
                            event.preventDefault();
                            onDoubleClick(event);
                        }
                    }}
                />
                {trigger && React.cloneElement(trigger)}
                {fixeNail && React.cloneElement(fixeNail)}
            </div>
        );
    }
}

export default Resizer;
