// import PropTypes from "prop-types";
import React, {Component} from 'react';
import Button from '../../wui-button/src';
import Icon from '../../wui-icon/src';
import {getLangInfo} from "../../wui-locale/src/tool";
import i18n from './i18n';
import { ModalConfirmProps, ModalConfirmState, ModalType } from "./iModal";
import Modal from './Modal';
import {prefix} from "../../wui-core/src/index";

const defaultProps = {
    onOk: () => {
    },
    onCancel: () => {
    },
    draggable: true,
    show: false,
    locale: 'zh-cn',
};

const iconTypes = {
    success: 'uf-chenggongtishi',
    info: 'uf-xingzhuangbeifen',
    warning: 'uf-exc-t',
    error: 'uf-exc-c-2',
    default: 'uf-xingzhuangbeifen'
}

class AlertDialog extends Component<ModalConfirmProps, ModalConfirmState> {
    static defaultProps = defaultProps;
    constructor(props: ModalConfirmProps) {
        super(props);
        this.state = {
            show: true,
            okLoading: false
        }
    }

    /* eslint-disable */
    UNSAFE_componentWillReceiveProps(nextProps: ModalConfirmProps) {
        const {show} = nextProps;
        if (typeof show === 'boolean') {
            this.setState({
                show
            })
        }
    }

	closeModal = () => {
	    this.setState({
	        show: false,
	        okLoading: false
	    })
	}

	handleOK = () => {
	    const {onOk} = this.props
	    const res: boolean | void | Promise<boolean> = onOk && onOk instanceof Function && onOk()
	    if (!res || !res.then) {
	        return this.closeModal()
	    } else {
	        this.setState({okLoading: true})
	        res.then(() => {
	            this.closeModal()
	        }, (error) => {
	            this.setState({okLoading: false})
	            console.error(error)
	        })
	    }
	}

	render() {
	    const {okLoading} = this.state
	    let {
	        close, title, keyword, content, onCancel, type, zIndex, locale, okType, fieldid, width, footer, footerProps,
	        okText = '', cancelText = '', getPopupContainer, className = '', okButtonProps = {}, cancelButtonProps = {}, 
			afterClose, bodyStyle, centered, keyboard, style, onOk, autoFocus, icon, dir, draggable
	    } = this.props;
	    const iconType = type as Exclude<ModalType, 'confirm'>  in iconTypes ? iconTypes[type as Exclude<ModalType, 'confirm'>] : iconTypes.default
	    const isConfirmType = type as ModalType & 'confirm' === 'confirm'
		const modalIcon = type === 'confirm' && icon !== undefined ? icon : <Icon fieldid={fieldid ? `${fieldid}_modal_icon` : undefined} type={iconType} 
			className= {`ac-confirm-body-title-icon ${isConfirmType ? 'confirm-type' : ''}`}>
		</Icon>
	    const keywordTitleHack = title || keyword
	    const local = getLangInfo(locale, i18n, 'modal');

		const isDraggable =  draggable === true;
	    // 按钮组
	    return (
			<Modal
				show={this.state.show}
				wrapClassName={`ac-confirm ${className}`}
				onHide={close}
				container={getPopupContainer}
				draggable={isDraggable}
				width={width || 420}
				header={null}
				fieldid={fieldid}
				zIndex={zIndex || 1700}
				footer={footer}
				afterClose = {afterClose}
				bodyStyle = {bodyStyle}
				centered = {centered}
				keyboard = {keyboard} 
				style = {style}
				onOk={onOk}
				onCancel={onCancel}
				dir={dir}
				autoFocus={autoFocus}
				footerProps={{className: 'ac-confirm-footer', ...footerProps}}
			>
				<Modal.Body fieldid={fieldid ? `${fieldid}_modal_body` : undefined} className='ac-confirm-body'>
					<span className='ac-confirm-body-title'>
						{modalIcon}
						<span className='ac-confirm-body-title-keyword'>{keywordTitleHack}</span>
					</span>
					{content && <span fieldid={fieldid ? `${fieldid}_modal_tips` : undefined} className='ac-confirm-body-content'>{content}</span>}
				</Modal.Body>

				{(footer || footer === null) ? null : <Modal.Footer className='ac-confirm-footer'>
					<Button className={`${prefix}-modal-cancel-button`} fieldid={fieldid ? `${fieldid}_modal_footer_cancel` : undefined} colors="secondary" onClick={() => {
						this.setState({
							show: false
						})
						onCancel && onCancel()
					}}
					{...cancelButtonProps}>
						{cancelText || local.langMap.cancel}
					</Button>
					<Button className={`${prefix}-modal-ok-button`} colors={okType || "primary"} disabled={okLoading}
						fieldid={fieldid ? `${fieldid}_modal_footer_ok` : undefined}
						onClick={this.handleOK}
						{...okButtonProps}
					>
						{okText || local.langMap.ok}
					</Button>
				</Modal.Footer>}
			</Modal>
	    )
	}
}

// AlertDialog.propTypes = propTypes;
// AlertDialog.defaultProps = defaultProps;
export default AlertDialog;
