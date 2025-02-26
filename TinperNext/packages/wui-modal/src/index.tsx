import React from 'react';
import {Warning} from "../../wui-core/src";
import Icon from '../../wui-icon/src';
import {WithConfigConsumer} from "../../wui-provider/src/context";
import confirm from './confirm';
import { ModalConfirmProps, ModalRootProps } from "./iModal";
import Modal, {destroyFns} from './Modal';

const {isShouldUpdate} = Warning;

function isUndefined(value: any) {
    return value === undefined
}

@WithConfigConsumer()
class ModalWrapper extends React.Component<ModalRootProps> {

    static Body = Modal.Body;
    static Header = Modal.Header;
    static Title = Modal.Title;
    static Footer = Modal.Footer;

    render() {
        const {
            visible,
            show,
            backdrop,
            mask,
            onShow,
            onHide,
            className,
            dialogClassName,
            onBackdropClick,
            onMaskClick,
            maskClassName,
            backdropClassName,
            backdropStyle,
            maskStyle,
            container,
            getContainer,
            getPopupContainer,
            backdropClosable,
            maskClosable,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
            ...others
        } = this.props;
        isShouldUpdate("Modal", this.props);
        // 兼容旧属性
        const callOnShow = (dom: HTMLDivElement | null) => {
            onEnter && onEnter();
            onEntering && onEntering();
            onEntered && onEntered();
            onShow && onShow(dom);
        }
        const callOnHide = () => {
            onExit && onExit();
            onExiting && onExiting();
            onExited && onExited();
            onHide && onHide();
        }
        const extral = {
            show: isUndefined(visible) ? show : visible,
            backdrop: isUndefined(mask) ? backdrop : mask,
            onShow: callOnShow,
            onHide: callOnHide,
            dialogClassName: isUndefined(className) ? dialogClassName : className,
            backdropStyle: isUndefined(maskStyle) ? backdropStyle : maskStyle,
            maskClassName: isUndefined(maskClassName) ? backdropClassName : maskClassName,
            onMaskClick: isUndefined(onBackdropClick) ? onMaskClick : onBackdropClick,
            container: isUndefined(getPopupContainer) ? (isUndefined(getContainer) ? container : getContainer) : getPopupContainer, // 统一getPopupContainer替换，getPopupContainer 属性优先于 getContainer 和 container
            backdropClosable: isUndefined(maskClosable) ? backdropClosable : maskClosable,
        }
        return <Modal {...extral} {...others} />
    }
    static info = function(props: ModalConfirmProps) {
        const config: ModalConfirmProps = {
            type: 'info',
            icon: <Icon type="uf-i-c"/>,
            okCancel: false,
            ...props,
        };
        return confirm(config);
    };;
    static success = function(props: ModalConfirmProps) {
        const config: ModalConfirmProps = {
            type: 'success',
            icon: <Icon type="uf-correct"/>,
            okCancel: false,
            ...props,
        };
        return confirm(config);
    };;
    static error = function(props: ModalConfirmProps) {
        const config: ModalConfirmProps = {
            type: 'error',
            icon: <Icon type="uf-exc-c"/>,
            okCancel: false,
            ...props,
        };
        return confirm(config);
    };
    static warning = function(props: ModalConfirmProps) {
        const config: ModalConfirmProps = {
            type: 'warning',
            icon: <Icon type="uf-exc-t"/>,
            okCancel: false,
            ...props,
        };
        return confirm(config);
    };
    static confirm = function(props: ModalConfirmProps) {
        const config: ModalConfirmProps = {
            type: 'confirm',
            okCancel: true,
            ...props,
        };
        return confirm(config);
    };
    static destroyAll = function() {
        while (destroyFns.length) {
            const close = destroyFns.pop();
            if (close) {
                close();
            }
        }
    };
}

ModalWrapper.info = function(props) {
    const config: ModalConfirmProps = {
        type: 'info',
        icon: <Icon type="uf-i-c"/>,
        okCancel: false,
        ...props,
    };
    return confirm(config);
};

ModalWrapper.success = function(props) {
    const config: ModalConfirmProps = {
        type: 'success',
        icon: <Icon type="uf-correct"/>,
        okCancel: false,
        ...props,
    };
    return confirm(config);
};

ModalWrapper.error = function(props) {
    const config: ModalConfirmProps = {
        type: 'error',
        icon: <Icon type="uf-exc-c"/>,
        okCancel: false,
        ...props,
    };
    return confirm(config);
};

ModalWrapper.warning = function(props) {
    const config: ModalConfirmProps = {
        type: 'warning',
        icon: <Icon type="uf-exc-t"/>,
        okCancel: false,
        ...props,
    };
    return confirm(config);
};

ModalWrapper.confirm = function(props) {
    const config: ModalConfirmProps = {
        type: 'confirm',
        okCancel: true,
        ...props,
    };
    return confirm(config);
};

ModalWrapper.destroyAll = function() {
    while (destroyFns.length) {
        const close = destroyFns.pop();
        if (close) {
            close();
        }
    }
};

ModalWrapper.Body = Modal.Body;
ModalWrapper.Header = Modal.Header;
ModalWrapper.Title = Modal.Title;
ModalWrapper.Footer = Modal.Footer;

export default ModalWrapper;
