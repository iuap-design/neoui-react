import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmModal from './ConfirmModal'
import {destroyFns} from './Modal';
import { ModalConfirmProps } from './iModal';
import {globalConfig} from "../../wui-provider/src";

let modalCurrentConfig: ModalConfirmProps;
export default function confirm(config: ModalConfirmProps) {
    const globalLocale = globalConfig().getGlobalLocale();
    const globalDirection = globalConfig().getGlobalDirection();
    if (globalLocale) {
        config.locale ??= globalLocale;
    }

    const div = document.createDocumentFragment();
    document.body.appendChild(div);
    function render(props: ModalConfirmProps) {
        ReactDOM.render(<ConfirmModal {...props} draggable={false}/>, div);
    }
    function destroy(...args: any[]) {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        const triggerCancel = args.some(param => param && param.triggerCancel);
        if (config.onCancel && triggerCancel) {
            config.onCancel(...args);
        }
        for (let i = 0; i < destroyFns.length; i++) {
            const fn = destroyFns[i];
            /* eslint-disable */
            if (fn === close) {
                destroyFns.splice(i, 1);
                break;
            }
        }
    }
    // 在react 16 + 的版本中 调用过程中 args 实际为[]
    function close(...args: any[]) {
        destroy(...args);
    }

    function update(newConfig: ModalConfirmProps) {
        modalCurrentConfig = {
            ...modalCurrentConfig,
            ...newConfig,
        };
        render(modalCurrentConfig);
    }
    modalCurrentConfig = {...config, dir: globalDirection, close, show: true};

    render(modalCurrentConfig);

    destroyFns.push(close);

    return {
        destroy: close,
        update,
    };
}
