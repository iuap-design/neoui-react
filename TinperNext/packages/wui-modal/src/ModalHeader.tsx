import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../wui-icon/src';
import {prefix, WebUI, getNid} from "../../wui-core/src/index"
import { ModalHeaderProps, ModalContext } from './iModal';

const defaultProps = {
    'aria-label': 'Close',
    closeButton: false,
    clsPrefix: `${prefix}-modal-header`
};

const contextTypes = {
    $modal: PropTypes.shape({
        onCancel: PropTypes.func,
        handleHide: PropTypes.func,
        handleMaximize: PropTypes.func,
        isMaximize: PropTypes.func,
    }),
};

@WebUI({name: "modal-header", defaultProps})
class ModalHeader extends React.Component<ModalHeaderProps> {
    static defaultProps = defaultProps;
    static contextTypes = contextTypes;
    context!: ModalContext;
	// 点击右上角关闭
	_onCancelClick = async() => {
	    const modal = this.context && this.context.$modal;
	    if (!modal) {
	        return
	    }
	    modal.onCancel();
	}
	_onMaximize = () => {
	    const modal = this.context && this.context.$modal;
	    if (!modal) {
	        return
	    }
	    const isMaximize = modal.isMaximize();
	    modal.handleMaximize(!isMaximize);// 只处理放大缩小状态，不再处理是否显示最大化图标和最大化dom
	}

	render() {
	    const {
	        'aria-label': label,
	        /* eslint-disable */
            renderMaximizeButton,
	        closeButton,
	        className,
            draggable,
	        clsPrefix,
	        children,
	        renderCloseButton,
	        closeButtonProps,
	        /* eslint-disable */
	        onMaximize,
            fieldid,
            id,
            dragCtrlId,
	        maximize,
	        ...props
	    } = this.props;

	    let isMaximize = false;
	    const modal = this.context?.$modal;
	    if (modal) {
	        isMaximize = modal.isMaximize();
	    }
	    const classes: {[key: string]: boolean} = {};
	    classes[`${clsPrefix}`] = true;
	    classes[`${clsPrefix}-dnd-handle`] = !!draggable;
	    classes[`${clsPrefix}-handle-${dragCtrlId}`] = !!draggable;

    const closeBtnDom = (
      <button
        {...closeButtonProps}
        type="button"
        className="close dnd-cancel"
        fieldid={fieldid ? `${fieldid}_close` : undefined}
        // 原测试脚本 id规范
        id={id ? `modalkey_${id}close` : undefined}
        aria-label={label}
        onClick={this._onCancelClick}
      >
        {renderCloseButton ? renderCloseButton() :
            <Icon aria-hidden="true" type='uf-close'/>
        }
      </button>
    )
    const maximizButton = maximize ? (
        <button
        {...closeButtonProps}
        type="button"
        className="close dnd-cancel maximize"
        fieldid={fieldid ? isMaximize ? `${fieldid}_max` : `${fieldid}_min` : undefined}
        onClick={this._onMaximize}
      >
        {renderMaximizeButton ? renderMaximizeButton(isMaximize) :
            <Icon className="maximize-icon" type={isMaximize ?'uf-zuixiaohua' : 'uf-zuidahua'}/> }
      </button>
    ) : null;
    let adapterNid = getNid(this.props)
    return (
      <div
        fieldid={fieldid}
        {...props}
        className={classNames(className, classes)}
        {...adapterNid}
      >
            {closeButton && closeBtnDom}
            {maximizButton && maximizButton}
            {children}
	        </div>
	    );
	}
}

ModalHeader.contextTypes = contextTypes;

export default ModalHeader as React.ComponentClass<Partial<ModalHeaderProps>>;
