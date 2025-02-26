import classNames from 'classnames';
import React from 'react';
import { getNid } from "../../wui-core/src/index";
import Icon from '../../wui-icon/src';
import { Color, MappingColor, NoticeProps } from './iNotification';
import { usePauseableTimer } from './utils';

function noop() {
}
const defaultProps = {
    onEnd: noop,
    onClose: noop,
    duration: 4.5,
    closable: true,
    color: "light"
}

class Notice extends React.Component<NoticeProps> {
    static defaultProps = defaultProps;
    closeTimer: any = null;

    componentDidMount() {
        if (this.props.duration) {
            this.closeTimer = usePauseableTimer({stopCb: this.props.onClose, duration: this.props.duration * 1000})
            this.closeTimer.start();
        }
    }

    componentWillUnmount() {
        this.closeTimer?.clear();
    }

    close = () => {
        if (!this.props.duration) { // 不自动关闭场景，要能close按钮关闭
            this.props.onClose?.();
        } else {
            this.closeTimer?.stop();
        }
    }

    notifiClick = (e: React.MouseEvent) => {
        this.props.onClick?.(e);
    }

    // 鼠标滑入暂停
    pauseTimer = () => {
        this.closeTimer?.pause();
    }

    // 鼠标离开重启计时器
    resumeTimer = () => {
        this.closeTimer?.resume();
    }

    render() {
        const {
            closable,
            clsPrefix,
            className,
            style,
            children,
            color,
            title,
            message,
            fieldid,
            // eslint-disable-next-line no-unused-vars
            content,
            // eslint-disable-next-line no-unused-vars
            onEnd,
            // eslint-disable-next-line no-unused-vars
            onClose,
            // eslint-disable-next-line no-unused-vars
            duration,
            icon,
            closeIcon,
            btn,
            getPopupContainer,
            ...others
        } = this.props;
        const componentClass = `${clsPrefix}-notice`;
        const classes = {
            [`${componentClass}`]: 1,
            [`${componentClass}-closable`]: closable,
            [className ?? ""]: !!className,
        };
        let iconType = ({
            info: 'uf uf-i-c',
            success: 'uf uf-yiwancheng',
            danger: 'uf uf-exc-c',
            error: 'uf uf-exc-c',
            warning: 'uf uf-exc-t',
            light: 'uf',
            dark: 'uf',
            news: 'uf uf-bell',
            infolight: 'uf uf-i-c',
            successlight: 'uf uf-yiwancheng',
            dangerlight: 'uf uf-exc-c',
            warninglight: 'uf uf-exc-t',
        })[color as Color];
        // bip:强制转成light风格
        const mapping: MappingColor = {
            success: "successlight",
            info: "infolight",
            danger: "dangerlight",
            error: "dangerlight",
            warning: "warninglight",
        }
        let _color = '';
        if (color) {
            let tempColor = color in mapping ? mapping[color] : color;
            classes[`${componentClass}-${tempColor}`] = true;
            _color = color || '';
        }
        let adapterNid = getNid(this.props)
        return (
            <div className={classNames(classes)} style={style} onClick={this.notifiClick} onMouseEnter={this.pauseTimer} onMouseLeave={this.resumeTimer} {...others} {...adapterNid}>
                <div className={`${componentClass}-content`}>
                    {(title || message) && (<div className={`${componentClass}-title`}>{icon ? icon : <i className={iconType}></i>}{title || message}</div>)}
                    <div className={`${componentClass}-description`}>
                        {children}
                    </div>
                    {btn ?
                        <div className={`${componentClass}-btn`} onClick={this.close}>
                            {btn}
                        </div> : null}
                </div>
                {closable ?
                    <a fieldid={fieldid ? `${fieldid}_${_color}_close` : undefined} tabIndex={0} onClick={this.close} className={`${componentClass}-close`}>
                        <span className={`${componentClass}-close-x`}>{closeIcon ? closeIcon : <Icon type="uf-close"/>}</span>
                    </a> : null
                }
            </div>
        );
    }
}

// Notice.propTypes = propTypes;
// Notice.defaultProps = defaultProps;

export default Notice;
