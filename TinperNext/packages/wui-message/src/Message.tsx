import classnames from 'classnames';
import React, { CSSProperties } from 'react';
import warning from 'warning';
import {getChildrenText, prefix} from "../../wui-core/src/index"
import { OrNull } from '../../wui-core/src/utils/type';
import Notification from '../../wui-notification/src';
import { Color, Content, NewInstanceCb } from '../../wui-notification/src/iNotification';
import { ApiType, InstanceObject, InstancesObject, MessageProps, ThenableArgument } from './iMessage';
import { Key } from '../../wui-core/src/iCore';

let defaultDuration = 1.5;
let newDuration: number | undefined;
let defaultTop = 180;
let defaultBottom = 48;
let bottom = 90;
let padding = 30;
let width = 227;

let messageInstance: Partial<InstancesObject> = {};
let key = 1;
let maxCount: number;
let clsPrefix = `${prefix}-message`;
const noop = () => {
};
let notificationStyleCopy: OrNull<CSSProperties> = {};
let messageStyleCopy: OrNull<CSSProperties> = {};
const positionType = ['topRight', 'bottomRight', 'top', 'bottom', 'topLeft', 'bottomLeft', ''];
let defaultStyle: OrNull<CSSProperties> = {};
const hasInstance = (instance: InstanceObject | null | undefined, container?: Element) => {
    if (!instance) {
        return false
    }
    if (!container) {
        return instance && instance.container === document.body
    } else {
        return instance && instance.container === container
    }
}
const setInstance = (key: string, value: InstanceObject, container: Element = document.body) => {
    messageInstance[key] = {...value, container }
}
const hasDefaultContainer = (dom: Element | null): boolean => {
    if (['BODY', null].includes((dom as HTMLElement)?.nodeName || null)) {
        return true
    } else if (getComputedStyle(dom as Element).display === 'none' || getComputedStyle(dom as Element).visibility === 'hidden') {
        return false
    } else {
        return hasDefaultContainer((dom as HTMLElement).parentElement)
    }
}
const findPopupContainer = () => {
    const containers = document.querySelectorAll('div[tinper-next-role=container');
    if (!containers || !containers.length) {
        return document.body
    }
    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        if (hasDefaultContainer(container)) {
            return container
        }
    }
    return document.body
}
const getPositionObj = () => {
    // 兼容左侧 菜单场景
    const container = document.querySelector('div[tinper-next-role=modal-container]')?.getBoundingClientRect?.();
    const transformX = container ? `translateX( -50%)translateX(${container.x / 2}px)` : `translateX( -50%)`;
    return {
        "top": {
            messageStyle: {},
            notificationStyle: {
                top: defaultTop,
                left: '50%',
                transform: transformX,
                maxHeight: `calc( 100% - ${defaultTop}px )`,
                // 移除 overflow auto 会对 box-shadow影响
                overflow: 'auto'
            },
            transitionName: 'top'
        },
        "bottom": {
            messageStyle: {},
            notificationStyle: {
                bottom: defaultBottom,
                left: '50%',
                transform: transformX
            },
            transitionName: 'bottom'
        },
        "topRight": {
            messageStyle: {
                width: width
            },
            notificationStyle: {
                top: padding,
                right: padding,
                width: width,
                maxHeight: `calc( 100% - ${defaultTop}px )`,
                // 移除 overflow auto 会对 box-shadow影响
                overflow: 'auto'
            },
            transitionName: 'right'
        },
        "bottomRight": {
            messageStyle: {
                width: width
            },
            notificationStyle: {
                bottom: bottom,
                right: padding,
                width: width
            },
            transitionName: 'right'
        },
        "topLeft": {
            messageStyle: {
                width: width
            },
            notificationStyle: {
                top: padding,
                left: padding,
                width: width,
                transform: `translateX(${container ? container.x : 0}px)`,
                maxHeight: `calc( 100% - ${defaultTop}px )`,
                // 移除 overflow auto 会对 box-shadow影响
                overflow: 'auto'

            },
            transitionName: 'left'
        },
        "bottomLeft": {
            messageStyle: {
                width: width
            },
            notificationStyle: {
                bottom: bottom,
                left: padding,
                width: width,
                transform: `translateX(${container ? container.x : 0}px)`
            },
            transitionName: 'left'
        }
    }
}

// function getMessageInstance(position: PositionType = 'top', callback: NewInstanceCb, keyboard: boolean | undefined, onEscapeKeyUp: ((e?: KeyboardEvent) => void) | undefined, fieldid: string | undefined) {
function getMessageInstance(callback: NewInstanceCb, obj: MessageProps) {
    // keyboard: boolean | undefined, onEscapeKeyUp: ((e?: KeyboardEvent) => void) | undefined, fieldid: string | undefined
    const {keyboard, onEscapeKeyUp, fieldid, position = 'top', wrapperClassName, className, containerKey, getPopupContainer, ...otherProps} = obj;
    if (hasInstance(messageInstance[containerKey || position], getPopupContainer as Element)) {
        callback(messageInstance[containerKey || position] as InstanceObject);
        return;
    }
    switch (position) {
        case 'top':
            (notificationStyleCopy as CSSProperties).top = defaultTop;
            break;
        case 'bottom':
            (notificationStyleCopy as CSSProperties).bottom = defaultBottom;
            break;
        case 'bottomRight':
            (notificationStyleCopy as CSSProperties).bottom = bottom;
            break;
        case 'bottomLeft':
            (notificationStyleCopy as CSSProperties).bottom = bottom;
            break;
        default:
            break;
    }
    if (position !== 'top' && position !== 'bottom') {
        (messageStyleCopy as CSSProperties).width = width;
    }
    const positionObj = getPositionObj()
    const style = JSON.stringify(notificationStyleCopy) == "{}" ? positionObj[position].notificationStyle : notificationStyleCopy;
    let instanceObj: MessageProps = {
        clsPrefix,
        fieldid,
        transitionName: `${clsPrefix}-${positionObj[position].transitionName}`,
        style: Object.assign({}, style, defaultStyle), // 覆盖原来的样式
        position: position,
        maxCount,
        className: wrapperClassName,
        getPopupContainer,
        ...otherProps
    }
    if (typeof keyboard === 'boolean') {
        instanceObj.keyboard = keyboard;
    }
    if (typeof onEscapeKeyUp === 'function') {
        instanceObj.onEscapeKeyUp = onEscapeKeyUp;
    }
    Notification.newInstance(instanceObj, instance => {
        setInstance(containerKey || position, instance, getPopupContainer as Element)
        callback(instance);
    }, true);
}


function notice(propsTransfer: MessageProps & {color: Color; position: string}) {
    const { content, duration: durationArg, color, onClose, position, style, innerStyle, wrapperStyle, keyboard, onEscapeKeyUp, showIcon, icon, fieldid, containerKey, getPopupContainer, ...otherPorps } = propsTransfer;
    const { wrapperClassName, transition, innerStyle: _innerStyle, wrapperStyle: _wrapperStyle, showIcon: _showIcon, destroyWithKey, ...otherPropsTransfer } = propsTransfer
    if (positionType.findIndex((item) => item === position) < 0) {
        warning(
            false,
            'Failed prop type: Invalid prop `position` supplied to `Message`, expected one of ["top","bottom","topRight","topLeft","bottomRight","bottomLeft"].',
        );
        return
    }
    const positionObj = getPositionObj()
    let duration = durationArg !== undefined ? durationArg : defaultDuration;
    notificationStyleCopy = Object.assign({}, positionObj[position].notificationStyle);
    messageStyleCopy = Object.assign({}, positionObj[position].messageStyle);

    let iconType = ({
        info: 'uf uf-xingzhuangbeifen',
        success: 'uf uf-chenggongtishi',
        danger: 'uf uf-exc-c-2',
        error: 'uf uf-exc-c-2',
        warning: 'uf uf-exc-t',
        light: 'uf uf-notification',
        dark: 'uf uf-notification',
        news: 'uf uf-bell',
        infolight: 'uf uf-xingzhuangbeifen',
        successlight: 'uf uf-chenggongtishi',
        dangerlight: 'uf uf-exc-c-2',
        warninglight: 'uf uf-exc-t',
    })[color];

    let positionStyle = JSON.stringify(messageStyleCopy) == "{}" ? positionObj[position].messageStyle : messageStyleCopy;
    defaultStyle = Object.assign({}, positionStyle, style, wrapperStyle);
    const object1 = {
        containerKey,
        position,
        keyboard,
        className: wrapperClassName,
        onEscapeKeyUp,
        getPopupContainer,
        fieldid: fieldid ? `${fieldid}_alert` : undefined,
        ...otherPorps
    }
    const closePromise = new Promise((resolve) => {
        const callback = () => {
            if (typeof onClose === 'function') {
                onClose();
            }
            return resolve(true);
        };
        getMessageInstance(instance => {
            instance.notice({
                ...otherPropsTransfer,
                key: propsTransfer.key || key++,
                duration,
                color: color,
                style: Object.assign({}, positionStyle, style, innerStyle),
                fieldid: fieldid ? `${fieldid}_alert` : undefined,
                content: (
                    <div>
                        {
                            showIcon ? (
                                <div className={`${clsPrefix}-notice-description-icon`}>
                                    <i fieldid={ fieldid ? `${fieldid}_alert_${color}` : undefined} className={classnames(icon ? `${icon}` : iconType)}/>
                                </div>
                            ) : null
                        }
                        <div className={`${clsPrefix}-notice-description-content`}>{content}</div>
                    </div> as Content
                ),
                onClose: callback
            });
        }, object1)
    })
    return (function() {
        let target = propsTransfer.key || key++;
        const result = () => {
            if (hasInstance(messageInstance[containerKey || position], getPopupContainer as Element)) {
                messageInstance[containerKey || position]!.removeNotice(target);
            }
        };
        result.then = (filled: ThenableArgument, rejected: ThenableArgument) => closePromise.then(filled, rejected);
        result.promise = closePromise;
        return result;
    }());
}

function isArgsProps(content: any) {
    return (
        Object.prototype.toString.call(content) === '[object Object]' &&
		!!content.content
    );
}

const api: ApiType = {
    create(obj: MessageProps) {
        obj.duration = obj.duration !== undefined ? obj.duration : newDuration; // 如果在config方法里设置了duration,则作为全局默认值处理，当前实例配置优先级最高
        let getPopupContainer = obj.container || obj.getPopupContainer || obj.getContainer;
        if (typeof getPopupContainer === 'object' && (getPopupContainer as HTMLElement)?.nodeType === 1 && typeof (getPopupContainer as HTMLElement)?.nodeName === 'string') {
            getPopupContainer = getPopupContainer as HTMLElement;
        } else if (typeof getPopupContainer === 'function') {
	        getPopupContainer = (getPopupContainer as (node?: HTMLElement) => HTMLElement)()
	    } else {
            getPopupContainer = findPopupContainer();
	    }
        const destroyWithKey = !!obj.destroyWithKey && (obj.key === 0 ? true : !!obj.key);
        const content = obj.message || obj.content || '';
        const duration = typeof obj.duration == 'undefined' ? defaultDuration : obj.duration;
        const {
            transition = true,
            color = 'light',
            position = "top",
            style = {},
            innerStyle = {},
            wrapperStyle = {},
            fieldid,
            showIcon = true,
            icon = '',
            onClose = noop,
            onClick = noop
        } = obj
        const objTransfer: MessageProps & {color: Color; position: string} = {
            ...obj,
            transition,
            content,
            duration,
            color,
            onClose,
            onClick,
            position,
            style,
            innerStyle,
            wrapperStyle,
            showIcon,
            destroyWithKey,
            icon,
            getPopupContainer,
            fieldid
        };
        return notice(objTransfer);
    },
    config(options: MessageProps & {top: number; defaultBottom: number; bottom: number; width: number;}) {
        if (options.top !== undefined) {
            defaultTop = options.top;
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration as number;
            newDuration = defaultDuration;
        }
        if (options.clsPrefix !== undefined) {
            clsPrefix = options.clsPrefix;
        }
        if (options.defaultBottom !== undefined) {
            defaultBottom = options.defaultBottom;
        }
        if (options.bottom !== undefined) {
            bottom = options.bottom;
        }
        if (options.width !== undefined) {
            width = options.width;
        }
        if (options.maxCount !== undefined) {
            maxCount = options.maxCount;
        }
    },
    destroy(messageKey: Key) {
        if (Object.values(messageInstance).length) {
            if (messageKey) {
                const keyInstance = Object.values(messageInstance).find(instance => instance && instance.isKeyInNotices(messageKey))
                if (keyInstance) {
                    const {removeNotice} = keyInstance;
                    removeNotice(messageKey)
                }
            } else {
                Object.entries(messageInstance).forEach(([containerKey, instance]) => {
                    if (!instance) return;
                    const {destroy} = instance;
                    const hasPositionMessage = destroy();
                    if (!hasPositionMessage) {
                        messageInstance[containerKey] = null;
                    }
                })
            }
            defaultDuration = 1.5;
            newDuration = undefined;
            defaultTop = 180;
            defaultBottom = 48;
            bottom = 90;
            padding = 30;
            width = 227;
            notificationStyleCopy = null;
            messageStyleCopy = null;
            defaultStyle = null;
        }
    }
};
['success', 'info', 'warning', 'error', 'loading', 'infolight', 'successlight', 'dangerlight', 'warninglight'].forEach(type => {
    api[type] = (config: MessageProps) => {
        let {content, message, duration, onClose, ...otherProps} = config;
        content = message || content;
        if (typeof config === "string") content = config;

        if (React.isValidElement(config)) { // 多语问题兼容 Message.error(<span>测试文本</span>)
            content = getChildrenText(config)
        }

        if (isArgsProps(content)) {
            return api.create({...content as MessageProps, color: type as Color});
        }
        if (typeof duration === 'function') {
            onClose = duration;
            duration = undefined;
        }
        return api.create({content, duration, color: (type as Color) === 'error' ? 'danger' : (type as Color), onClose, ...otherProps});
    };
})
api.warn = api.warning
export default api;
