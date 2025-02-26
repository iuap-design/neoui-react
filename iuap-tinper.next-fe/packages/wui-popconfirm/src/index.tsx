/* eslint-disable camelcase */
import classNames from 'classnames'
// import PropTypes from 'prop-types'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import KeyCode from 'rc-util/lib/KeyCode'
import React, {useContext} from 'react'
import Button from '../../wui-button/src'
import {prefix} from '../../wui-core/src/index'
import {cloneElement, getRenderPropValue, getTransitionName} from '../../wui-core/src/utils/createAntdUtils'
import Icon from '../../wui-icon/src'
import {getLangInfo} from '../../wui-locale/src/tool'
import {ConfigContext} from '../../wui-provider/src/context'
import Tooltip from '../../wui-tooltip/src'
// import {propTypes as popconfirmPropTypes} from '../../wui-tooltip/src/index'
import i18n from './i18n.js'
import {PopconfirmProps} from './iPopconfirm'
import {ButtonType} from './../../wui-button/src/iButton'
import { useConfigContext } from '../../wui-provider/src/context'

const defaultProps: PopconfirmProps = {
    placement: 'top',
    trigger: 'click',
    okType: 'primary',
    icon: <Icon type='uf-i-c' />,
    showCancel: true,
    disabled: false,
    keyboard: false
    // locale:'zh-cn',
}

const convertLegacyProps = (type: ButtonType) => {
    if (type === 'danger') {
        return {danger: true}
    }
    return {type}
}

const Popconfirm = React.forwardRef<HTMLElement | null, PopconfirmProps>(
    (props, ref: React.RefObject<HTMLDivElement>) => {
        const {defaultVisible, defaultOpen, open, onRootClose, onClose, dir} = props
        const [visible, setVisible] = useMergedState(undefined, {
            value: props.visible ?? open,
            defaultValue: !!(defaultVisible ?? defaultOpen) // 即默认undefined转为false
        })
        const {dir: rtlDirection = 'ltr'} = dir ? {dir} : useConfigContext()
        const context = useContext(ConfigContext) // 接受provider控制

        const settingVisible = (value: boolean, e?: React.MouseEvent | React.KeyboardEvent) => {
            setVisible(value)
            !value && onRootClose?.()
            props.onVisibleChange?.(value, e)
        }

        const onConfirm = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
            e.stopPropagation()
            settingVisible(false, e)
            props.onConfirm ? props.onConfirm.call(this, e) : onClose?.call(this, e)
        }

        const onCancel = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
            e.stopPropagation()
            settingVisible(false, e)
            props.onCancel?.call(this, e)
        }

        const onKeyDown = (e: React.KeyboardEvent) => {
            if (!props.keyboard) {
                return
            }
            if (e.keyCode === KeyCode.ESC && visible) {
                settingVisible(false, e)
            }
            if (e.keyCode === KeyCode.Y && e.altKey && visible) {
                onConfirm(e)
            }
            if (e.keyCode === KeyCode.N && e.altKey && visible) {
                onCancel(e)
            }
        }

        const onVisibleChange = (value: boolean) => {
            const {disabled} = props
            if (disabled) {
                return
            }
            settingVisible(value)
        }
        // TODO:// 多语
        let {locale} = props
        locale = locale || context.locale || 'zh-cn'
        const local = getLangInfo(locale, i18n, 'popconfirm')
        const renderOverlay = (prefixCls: string, popconfirmLocale: Record<string, any> = {}) => {
            const {
                id,
                fieldid,
                okButtonProps,
                cancelButtonProps,
                showCancel,
                title,
                content,
                description,
                cancelText,
                cancel_btn,
                close_btn,
                okText,
                okType,
                icon
            } = props
            const contentText = content ? content : description
            return (
                <div className={classNames(`${prefixCls}-inner-content`)}>
                    <div className={`${prefixCls}-message`}>
                        {icon}
                        {title ? <div className={`${prefixCls}-message-title`}>{title}</div> : undefined}
                        <div className={`${prefixCls}-message-content`}>{getRenderPropValue(contentText)}</div>
                    </div>
                    <div className={`${prefixCls}-buttons`}>
                        {showCancel === false ? null : cancel_btn ? (
                            cloneElement(cancel_btn, {
                                id: id ? id + '_cancel' : undefined,
                                fieldid: fieldid ? fieldid + '_cancel' : undefined,
                                ...cancel_btn.props,
                                onClick: onCancel
                            })
                        ) : (
                            <Button
                                id={id ? id + '_cancel' : undefined}
                                fieldid={fieldid ? fieldid + '_cancel' : undefined}
                                onClick={onCancel}
                                size='small'
                                colors='secondary'
                                {...cancelButtonProps}
                            >
                                {cancelText || popconfirmLocale?.cancelText || local.langMap.cancel}
                            </Button>
                        )}
                        {close_btn ? (
                            cloneElement(close_btn, {
                                id: id ? id + '_ok' : undefined,
                                fieldid: fieldid ? fieldid + '_ok' : undefined,
                                ...close_btn.props,
                                onClick: onConfirm
                            })
                        ) : (
                            <Button
                                id={id ? id + '_ok' : undefined}
                                fieldid={fieldid ? fieldid + '_ok' : undefined}
                                onClick={onConfirm}
                                {...convertLegacyProps(okType!)}
                                size='small'
                                {...okButtonProps}
                            >
                                {okText || popconfirmLocale?.okText || local.langMap.ok}
                            </Button>
                        )}
                    </div>
                </div>
            )
        }

        const {
            clsPrefix: customizePrefixCls,
            transitionName,
            placement = defaultProps.placement,
            children,
            overlayClassName,
            title,
            content,
            color,
            ...restProps
        } = props
        const prefixCls = `${prefix}-popover`
        const prefixClsConfirm = `${prefix}-popconfirm`
        const overlayClassNames = classNames(prefixClsConfirm, overlayClassName, color ? `${prefixCls}-${color}` : '')

        const overlay = renderOverlay(prefixCls)
        const rootPrefixCls = prefix
        return (
            <Tooltip
                {...restProps}
                prefixCls={prefixCls}
                placement={placement!}
                onVisibleChange={onVisibleChange}
                visible={visible}
                overlay={overlay}
                overlayClassName={overlayClassNames}
                ref={ref}
                dir={rtlDirection}
                transitionName={getTransitionName(rootPrefixCls, 'zoom-big', transitionName)}
            >
                {cloneElement(children as any, {
                    onKeyDown: (e: React.KeyboardEvent<any>) => {
                        if (React.isValidElement(children)) {
                            children?.props.onKeyDown?.(e)
                        }
                        onKeyDown(e)
                    }
                })}
            </Tooltip>
        )
    }
)

Popconfirm.defaultProps = defaultProps

export default Popconfirm
