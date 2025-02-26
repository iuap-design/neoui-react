import PropTypes from 'prop-types';
import React, {Children, cloneElement, ReactNodeArray} from 'react';
import Button from '../../wui-button/src';
import {prefix, WebUI, delayEvent} from "../../wui-core/src/index";
import {getLangInfo} from "../../wui-locale/src/tool";
import i18n from './i18n';

import Body from './ModalBody';
import ModalDialog from './ModalDialog';
import Footer from './ModalFooter';
import Header from './ModalHeader';
import ModalPortal from "./ModalPortal";
import Title from './ModalTitle';

import classNames from 'classnames';
import { ModalProps, ModalState, ModalContext, ModalHeaderProps } from './iModal';

const defaultProps = {
    backdrop: true,
    backdropClosable: false,
    dialogComponentClass: ModalDialog,
    destroyOnClose: true,
    draggable: false,
    resizable: false,
    clsPrefix: `${prefix}-modal`,
    className: '',
    needScroll: false,
    bodyStyle: {},
    bodyClassName: '',
    style: {},
    size: '',
    footer: undefined,
    footerProps: {},
    enforceFocus: false,
    closable: true,
    closeIcon: null,
    zIndex: null,
    cancelButtonProps: {},
    okButtonProps: {},
    okType: 'primary',
    locale: 'zh-cn',
    onOk: () => {
    },
    onCancel: () => {
    },
    maximize: false,
    onMaximize: () => {
    },
    showPosition: {x: null, y: null},
};


const ModalFunc = () => {
};

export const destroyFns: ((...args: any[]) => void)[] = [];

const childContextTypes = {
    $modal: PropTypes.shape({
        handleHide: PropTypes.func,
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        handleMaximize: PropTypes.func,
        isMaximize: PropTypes.func,
    }),
};

@WebUI({name: "modal", defaultProps})
class Modal extends React.Component<ModalProps, ModalState> {
	headerProps : Partial<ModalHeaderProps> = {};
	dragCtrlId: number = new Date().getTime();
    static defaultProps = defaultProps;
    static childContextTypes = childContextTypes;
    static Body = Body;
    static Header = Header;
    static Title = Title;
    static Footer = Footer;
    static TRANSITION_DURATION = 200000;
    static BACKDROP_TRANSITION_DURATION = 10000;
    constructor(props: ModalProps, context: ModalContext) {
        super(props, context);
        this.state = {
            style: {},
            show: props.show,
            isMaximize: props.isMaximize,
        };
    }

	static info = ModalFunc;
	static success = ModalFunc;
	static error = ModalFunc;
	static warn = ModalFunc;
	static warning = ModalFunc;
	static confirm = ModalFunc;
	static destroyAll = () => {
	    return
	};
    _modal: ModalPortal | null = null;
    getChildContext() {
	    return {
	        $modal: {
	            onCancel: this.onCancel,
	            onOk: this.onOk,
	            handleHide: this.handleHide,
	            handleMaximize: this.handleMaximize,
	            isMaximize: () => this.state.isMaximize,
	        },
	    };
    }

    /* eslint-disable */
	UNSAFE_componentWillReceiveProps(nextProps: ModalProps) {
		const {show, isMaximize} = nextProps;
		if ('show' in nextProps) {
	        this.setState({show});
		}
	    if (isMaximize !== undefined) { // QDJCJS-25244 修复props更新后窗口最大化状态丢失的问题
	        this.setState({isMaximize});
		}
	}

	handleMaximize = (isMaximize : boolean) => {
		// 没有设置isMaximize时，进行放大缩小操作，设置了isMaximize只能通过onMaximize回调函数放大缩小
		if(this.props.isMaximize === undefined){
			this.setState({
				isMaximize
			})
		}
		//不再在header里处理onMaximize回调，这里统一处理
		const onMaximize  = this.headerProps.onMaximize || this.props.onMaximize;
		onMaximize && onMaximize(isMaximize);
	}
	onOk = (event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
	    this.props?.onOk?.(event);
	}
	onCancel = async() => {
        return delayEvent(this.props.onCancel, this.handleHide)
	}
	handleHide = () => {
	    // Modal组件不销毁, 重置状态
	    this.setState({show: false, isMaximize: false})
	}
	_onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
	    const {backdropClosable, onMaskClick} = this.props;
	    typeof onMaskClick == 'function' && onMaskClick(e);
	    if (!backdropClosable) return;// 点击遮罩不允许关闭窗口
	    this.handleHide();
	}

	createHeader = () => {
	    const {title, closable = true, closeIcon = null, header, locale, maximize, onMaximize, renderMaximizeButton, fieldid, id, draggable} = this.props;
	    const local = getLangInfo(locale, i18n, 'modal');
	    if (header === null) return null
	    const renderCloseButton = closeIcon ? () => closeIcon : null;

	    return <Header
	        closeButton={closable}
	        maximize={maximize}
	        onMaximize={onMaximize}
            id={id}
            draggable={draggable}
	        renderCloseButton={renderCloseButton}
            renderMaximizeButton={renderMaximizeButton}
			dragCtrlId={draggable ? this.dragCtrlId : undefined}
            fieldid={fieldid ? `${fieldid}_modal_header` : undefined}
	    >
            {title !== null ? <Title fieldid={fieldid ? `${fieldid}_modal_title` : undefined}>{title === undefined ? local.langMap.title : title}</Title> : <>&nbsp;</>}
	    </Header>
	}

	createBody = (children: React.ReactNodeArray | undefined = []) => {
	    const { fieldid } = this.props

	    if (!children) return <Body/>;
	    const {bodyClassName} = this.props;
	    const bodyChildDom = children.filter((child: React.ReactElement) => {
	        const clsPrefix = child && child.props && child.props.clsPrefix ? child.props.clsPrefix : ''
	        return !clsPrefix.includes('-header') && !clsPrefix.includes('-footer')
	    })
	    // 如果children中含有不是header和footer的dom，而没有传Body组件，则这些非header和footer的dom结构，作为body
	    const bodyStyle = this.getBodyStyle()
	    return <Body style={bodyStyle} fieldid={fieldid ? `${fieldid}_modal_body` :undefined} className={bodyClassName}>
	        {bodyChildDom}
	    </Body>
	}

	createFooter = () => {
	    const {cancelButtonProps, cancelText, okButtonProps, okText, okType, locale, fieldid, footerProps} = this.props
	    const onOkCallback: React.MouseEventHandler<HTMLButtonElement> | undefined = (event: React.MouseEvent<HTMLButtonElement>) => this.onOk(event)
	    const onCancelCallback = () => {
	        this.onCancel();
	    }
	    const local = getLangInfo(locale, i18n, 'modal');
	    return (<Footer {...footerProps} fieldid={fieldid ? `${fieldid}_modal_footer` : undefined}>
	        <Button
			    className={`${prefix}-modal-cancel-button`}
	            colors="secondary"
                fieldid={fieldid ? `${fieldid}_modal_footer_cancel` : undefined}
	            style={{marginRight: 8}}
	            {...cancelButtonProps}
	            onClick={onCancelCallback}
	        >
	            {cancelText || local.langMap.cancel}
	        </Button>
	        <Button
			    className={`${prefix}-modal-ok-button`}
	            colors={okType || 'primary'}
                fieldid={fieldid ? `${fieldid}_modal_footer_ok` : undefined}
	            {...okButtonProps}
	            onClick={onOkCallback}
	        >
	            {okText || local.langMap.ok}
	        </Button>
	    </Footer>)
	}

	getDomNodeFromChildren = (children: React.ReactNodeArray, className: string, excludClassNames?: string[]) => {
	    if (!children) return;
	    //  将 非标准类的内容 放置body 显示区域
	    if (excludClassNames?.length) {
	        // 兼容 不包含 标准 body情况
	        if (children.every((child: React.ReactElement) => {
	            const clsPrefix = child && child.props && child.props.clsPrefix ? child.props.clsPrefix : ''
	            return !clsPrefix.includes(className)
	        })) {
	            return null;
	        }
	        return children.filter((child: React.ReactElement) => {
	            const clsPrefix = child && child.props && child.props.clsPrefix ? child.props.clsPrefix : ''
	            if (excludClassNames.every(className => !clsPrefix.includes(className))) {
	                return true;
	            }
	            return false;
	        })
	    }
	    return children.find((child: React.ReactElement) => {
	        const clsPrefix = child && child.props && child.props.clsPrefix ? child.props.clsPrefix : ''
	        if (!clsPrefix) return false;
	        return clsPrefix.includes(className)
	    })
	}

	createModalContent = (children: React.ReactNodeArray | undefined = []) => { // 优先渲染手动创建的Header，Body，Footer
	    const {footer: renderFooter, footerProps} = this.props
	    return <>
	        {this.getDomNodeFromChildren(children, `${prefix}-modal-header`) || this.createHeader()}
	        {this.getDomNodeFromChildren(children, `${prefix}-modal-body`, [`${prefix}-modal-header`, `${prefix}-modal-footer`]) || this.createBody(children)}
	        {this.getDomNodeFromChildren(children, `${prefix}-modal-footer`) || (renderFooter ?
	            <Footer {...footerProps}>{renderFooter}</Footer> : renderFooter === null ? null : this.createFooter())}
	    </>
	}

	getBodyStyle = () => {
	    let {bodyStyle = {}} = this.props
	    if (bodyStyle.height) {
	        bodyStyle = {
	            ...bodyStyle,
	            flex: 'none' // 如果给modal的body传高度height的话，取消flex: 1的样式设置
	        }
	    }
	    return bodyStyle
	}

	render() {
	    let {
	        backdrop,
	        backdropClosable,
	        renderBackdrop,
	        show,
	        onEscapeKeyUp,
	        dialogComponentClass: Dialog,
	        wrapClassName,
	        dialogClassName,
	        clsPrefix,
	        style = {},
	        size,
	        width,
	        height,
	        children, // Just in case this get added to BaseModal propTypes.
	        onShow,
	        onHide,
	        afterClose,
	        maskClassName,
	        containerClassName,
	        containerStyle,
	        draggable,
	        resizeClassName,
	        bounds,
	        container,
	        onStart,
	        onStop,
	        bodyStyle,
            bodyClassName = '',
	        zIndex,
	        destroyOnClose,
	        centered,
	        resizable,
	        onResizeStart,
	        onResize,
	        onResizeStop,
	        onMaskClick,
	        enforceFocus,
	        onMaximize,
	        maximize,
	        keyboard,
	        onKeyUp,
	        showPosition,
            fieldid,
            id,
            footerProps,
            title,
            okButtonProps,
            okText,
            cancelText,
            okType,
            cancelButtonProps,
            closable,
            closeIcon,
            onOk,
            minHeight,
			isMaximize: isMax,//解决和ModalDialog里的isMaximize重名冲突
			autoFocus,
			forceRender,
	        ...otherProps
	    } = this.props;
		maximize = this.headerProps.maximize || maximize; // 这里处理是否显示最大化图标和最大化dom
	    const maximizeDOM = typeof maximize === 'object' && (maximize as HTMLElement) ?.nodeType === 1 && typeof  (maximize as HTMLElement)?.nodeName === 'string' ? maximize 
		: typeof maximize === "function" ? (maximize as () => HTMLElement)() : document.querySelector('div[tinper-next-role=modal-container]') as HTMLElement || null;
		const {isMaximize} = this.state;

        children = Children.map(children, (child: React.ReactElement) => {
            const clsPrefix = child && child.props && child.props.clsPrefix ? child.props.clsPrefix : ''
            if (clsPrefix && clsPrefix.includes(`${prefix}-modal-header`)) {
                const headerProps: Partial<ModalHeaderProps> = {};
                // 通过 modal根组件传入id的方式 为 children 中header传入id属性
                if (id) {
                    headerProps.id = id;
                }
                if (draggable) {
					headerProps.dragCtrlId = this.dragCtrlId;
                    const headerDraggable = child.props.headerDraggable;
                    headerProps.draggable = headerDraggable ?? draggable;
                }
                if (child.props.maximize === undefined) {
                    headerProps.maximize = maximize;
                }
				this.headerProps = child.props;
                return cloneElement(child, headerProps);
            } else if ( bodyStyle && clsPrefix && clsPrefix.includes(`${prefix}-modal-body`)) {
                const bodyCompClassName = child.props.className || '';
                const bodyCompStyle = child.props.style || {};
                if (bodyStyle.height) {
	                bodyStyle = this.getBodyStyle()
                }
                return cloneElement(child, {
                    style: {...bodyCompStyle, ...bodyStyle},
                    className: `${bodyClassName} ${bodyCompClassName}`.trim()
                });
            } else if ( clsPrefix && clsPrefix.includes(`${prefix}-modal-footer`)) {
                const props = child.props;
                const {className: className1, ...otherP} = props;
                const {className: className2, ...otherFooterP} = footerProps || {};
                const className = classNames(className1, className2);
                return cloneElement(child, {
                    className,
                    ...otherFooterP,
                    ...otherP,
                });
            }
            return child
        }) 

	    // 非百分比的情况则按px单位处理
	    if (parseInt(width as string) > -1 && !(typeof width == 'string' && width.endsWith('%'))) width = parseInt(width as string) + 'px';
	    if (parseInt(height as string) > -1 && !(typeof height == 'string' && height.endsWith('%'))) height = parseInt(height as string) + 'px';
        let _showPosition: {x: number | null; y: number | null} = {x: null, y: null};
        if (!isNaN(parseInt(showPosition?.x as string)) ) {
            _showPosition.x = parseInt(showPosition?.x as string);
        }
        if (!isNaN(parseInt(showPosition?.y as string))) {
            _showPosition.y = parseInt(showPosition?.y as string);
        }
	    let styleRes = {...this.state.style, ...style/* , ...topPosStyle*/};
	    const contentStyle: React.CSSProperties = {} // 目前给content的样式只有高度
	    if (width) contentStyle.width = width;
	    if (height) contentStyle.height = height;

	    return (
	        <ModalPortal
	            ref={c => {
	                this._modal = c;
	            }}
	            show={this.state.show}
	            destroyOnClose={destroyOnClose}
	            onHide={() => {
	                onHide && onHide();
	                afterClose && afterClose()
	            }}
	            onShow={onShow}
	            onEscapeKeyUp={onEscapeKeyUp}
	            className={containerClassName}
	            style={containerStyle}
	            container={container}
                fieldid={fieldid}
	            enforceFocus={enforceFocus}
	            keyboard={keyboard}
	            onKeyUp={onKeyUp}
	            backdrop={backdrop}
	            clsPrefix={clsPrefix}
				autoFocus={autoFocus}
				forceRender={forceRender}
	        >
	            <ModalDialog
	                style={styleRes}
	                show={this.state.show}
	                centered={centered}
	                backdrop={backdrop}
	                renderBackdrop={renderBackdrop}
	                contentStyle={contentStyle}
	                zIndex={zIndex}
	                wrapClassName={wrapClassName}
	                dialogClassName={dialogClassName}
	                maskClassName={maskClassName}
	                // className={classNames(/*inClassName,*/ className, backdropClassName)}
	                onMaskClick={this._onMaskClick}
	                // onMouseDown={e => this.dialogMouseDownTarget = e.target}
	                size={size}
	                destroyOnClose={destroyOnClose}
	                draggable={draggable}
	                bounds={bounds}
	                resizable={resizable}
	                resizeClassName={resizeClassName}
	                onResizeStart={onResizeStart}
	                onResize={onResize}
	                onResizeStop={onResizeStop}
	                isMaximize={isMaximize}
	                minHeight={minHeight}
					dragCtrlId={this.dragCtrlId}
	                maximizeDOM={maximizeDOM}
	                showPosition={_showPosition}
	                id={id}
	                {...otherProps}
	            >
	                {this.createModalContent(children as ReactNodeArray)}
	            </ModalDialog>
	        </ModalPortal>
	    );
	}
}

export default Modal;
