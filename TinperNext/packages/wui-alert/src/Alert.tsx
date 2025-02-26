import classNames from 'classnames'
import omit from 'omit.js'
// import PropTypes from 'prop-types'
import React from 'react'
import {WebUI, prefix, Warning, getNid} from '../../wui-core/src/index'
import Icon from '../../wui-icon/src'
import type {AlertProps} from './iAlert'

const _PREFIX_CLS = `${prefix}-alert`
const {isShouldUpdate} = Warning;

/* const propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fieldid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onDismiss: PropTypes.func,
    closable: PropTypes.bool,
    showIcon: PropTypes.bool,
    message: PropTypes.string,
    description: PropTypes.string,
    closeLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    dark: PropTypes.bool,
    colors: PropTypes.string
} */

const defaultProps = {
    closeLabel: <Icon type='uf-close' />,
    closable: true,
    showIcon: true,
    dark: false,
    bordered: false
}

@WebUI({name: 'alert', defaultProps})
class Alert extends React.Component<AlertProps> {
    componentWillUnmount() {
	    const {afterClose} = this.props;
	    afterClose && afterClose()
    }
    /**
     * 渲染右上角关闭alert按钮
     */
    renderDismissButton = (onDismiss: AlertProps['onDismiss'], props: AlertProps) => {
        const {id, fieldid, colors, closeLabel, closeText, closeIcon, type} = props
        return (
            <div
                className={classNames('close', `${_PREFIX_CLS}-close`)}
                onClick={onDismiss}
                id={id ? `${id}_alert_${colors || type}_close` : undefined}
                fieldid={fieldid ? `${fieldid}_alert_${colors || type}_close` : undefined}
            >
                {closeIcon ?? (closeText || closeLabel)}
            </div>
        )
    }
    /**
     * 只有 message和description都没有的时候才会去渲染children
     * @returns string
     */
    renderCurrentChildren = () => {
        const {message, description} = this.props
        const renderMessage = () =>
            message ? <div className={classNames('message', `${_PREFIX_CLS}-message`)}>{message}</div> : null
        const renderDescription = () =>
            description ? <div className={classNames('description', `${_PREFIX_CLS}-description`)}>{description}</div> : null
        const renderChildren = () => !message && !description && this.props.children
        return (
            <div className={classNames('content', `${_PREFIX_CLS}-content`)}>
                {renderMessage()}
                {renderDescription()}
                {renderChildren()}
            </div>
        )
    }
    renderActions = () => {
        const { action } = this.props
        if (!action) return null
        return (
            <div className={classNames(`${_PREFIX_CLS}-action`)}>
                {action}
            </div>
        )
    }

    render() {
        const {onDismiss, onClose, colors = 'warning', type, className, clsPrefix, dark, closable, showIcon, icon, bordered, ...others} = this.props
        const {id, fieldid} = this.props
        isShouldUpdate("Alert", this.props);
        const iconType: Record<string, string> = {
            info: 'uf-xingzhuangbeifen',
            success: 'uf-chenggongtishi',
            danger: 'uf-exc-c-2',
            warning: 'uf-exc-t'
        }
        const typeMap = {
            error: "danger",
            danger: "danger",
            info: "info",
            warning: "warning",
            success: "success",
        }
        const cls = type && typeMap[type] ? typeMap[type] : colors;
        let clsObj = [`${clsPrefix}`, `${clsPrefix}-${cls}`, bordered === true ? `${clsPrefix}-bordered` : '', dark ? 'dark' : '']
        let adapterNid = getNid(this.props)

        return (
            <div
                {...omit(others, ['closeLabel', 'closeText', 'message', 'description'])}
                role='alert'
                className={classNames(className, clsObj)}
                {...adapterNid}
            >
                {showIcon ? (
                    icon ? icon :
                        <Icon
                            className={classNames('show-icon', `${_PREFIX_CLS}-show-icon`)}
                            type={iconType[type || colors]}
                            id={id ? `${id}_alert_${type || colors}` : undefined}
                            fieldid={fieldid ? `${fieldid}_alert_${type || colors}` : undefined}
                        />
                ) : null}
                {this.renderCurrentChildren()}
                {this.renderActions()}
                {closable && this.renderDismissButton(onDismiss || onClose, this.props)}
            </div>
        )
    }
}

// Alert.propTypes = propTypes
export default Alert
