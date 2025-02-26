/**
 * This source code is quoted from rc-dropdown.
 * homepage: https://github.com/react-component/dropdown
 */
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import Trigger, { TriggerProps } from 'rc-trigger';
import React, { ReactElement, ReactNode } from 'react';
// import omit from 'omit.js';
import ReactDOM from 'react-dom';
import {cssUtil, getClsPrefix, requestAnimationFrame, WebUI, getNid, prefix} from "../../wui-core/src/index";
import Icon from '../../wui-icon/src/index';
import placements from './placement';
import { DropDownProps, DropDownState } from './iDropdown';
import { MenuProps } from '../../wui-menu/src/iMenu';
import Menu from '../../wui-menu/src';
import { WithConfigConsumer } from '../../wui-provider/src/context';

const menuClsPrefix = getClsPrefix("menu");

// const propTypes = {
//     animation: PropTypes.any, // 暂不抛出使用， 将动画名称前添加 clsPrefix- 前缀
//     align: PropTypes.object, // 暂不抛出使用， 由placement 接受 转换使用
//     children: PropTypes.element,
//     clsPrefix: PropTypes.string,
//     disabled: PropTypes.bool,
//     hideAction: PropTypes.array,
//     getPopupContainer: PropTypes.func,
//     minOverlayWidthMatchTrigger: PropTypes.bool,
//     overlayClassName: PropTypes.string,
//     overlayStyle: PropTypes.object,
//     overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
//     onVisibleChange: PropTypes.func,
//     placement: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     showAction: PropTypes.array,
//     transitionName: PropTypes.string, // 动画名称，目前支持slide-up 可自定义enter appear leave动画
//     trigger: PropTypes.array,
//     visible: PropTypes.bool,
//     getDocument: PropTypes.func,
//     delay: PropTypes.number,
//     delayShow: PropTypes.number,
//     delayHide: PropTypes.number,
//     overlayMaxHeight: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
//     matchNode: PropTypes.any,
// };

export const DropdownDefaultProps: DropDownProps = {
    children: <span />,
    disabled: false,
    trigger: ['hover'],
    showAction: [],
    hideAction: [],
    minOverlayWidthMatchTrigger: true,
    overlayClassName: '',
    overlayStyle: {},
    overlay: '暂无数据',
    placement: 'bottomLeft',
    defaultVisible: false,
    overlayMaxHeight: false,
    destroyPopupOnHide: false,
    transitionName: 'slide-up',
};

const rtlPlacementMap: Record<string, string> = {
    topLeft: 'bottomRight',
    topRight: 'bottomLeft',
    bottomLeft: 'topRight',
    bottomRight: 'topLeft',
}

const defaultPopupOffset = [0, 5];

interface TriggerRef extends React.Component<TriggerProps, any>{
	getPopupDomNode: () => React.ReactNode & HTMLElement
}

const jadgeState = function(props: DropDownProps) {
    if ('visible' in props) {
        return props.visible;
    }
    return props.defaultVisible;
}

@WithConfigConsumer({name: "dropdown"})
@WebUI({name: "dropdown", defaultProps: DropdownDefaultProps})
class Dropdown extends React.Component<DropDownProps, DropDownState> {

    // 声明defaultProps 组件才会真正含有默认值，兼容必须api,例如overlay, placement
    static defaultProps = DropdownDefaultProps
    triggerRef: TriggerRef | null;
    constructor(props: DropDownProps) {
	    super(props);
	    this.state = {
	        visible: jadgeState(props)!,
	        popupAlign: null,
	    };
	    this.triggerRef = null;
    }

    static getDerivedStateFromProps(props: DropDownProps, state: DropDownState) {
	    if (props.visible !== undefined && props.visible !== state.visible) {
	        return {
	            ...state,
	            visible: props.visible,
	        }
	    }
	    return null;
    }

    onClick = (e: React.MouseEvent<HTMLUListElement>) => {
        const { children } = this.props;
        const {overlayMenu} = this.getOverlayNodeFromChildren(children)
        let overlayNode = (this.getOverlayNode() || overlayMenu) as React.ReactElement;
        // let overlayNode = typeof overlay === 'function' ? overlay() : overlayMenu ? overlayMenu : overlay;
        const overlayProps = (overlayNode && React.isValidElement(overlayNode) ? overlayNode.props : {multiple: undefined}) as Partial<MenuProps>;
        const { multiple } = overlayProps;
        // do no call onVisibleChange, if you need click to hide, use onClick and control visible
        // menu菜单multiple模式下点击不收起弹框
        if (!('visible' in this.props) && !multiple) {
            this.setState({
                visible: false,
            });
        }
        if (overlayProps.onClick) {
            overlayProps.onClick(e as any);
        }
    }

    onVisibleChange = (visible: boolean) => {
        const props = this.props;
        if (props.disabled) return;
        if (!('visible' in props)) {
            this.setState({
                visible,
            });
        }
        props.onVisibleChange && props.onVisibleChange(visible);
    }
	getOverlayNodeFromChildren = (children: ReactNode) => {
	    let overlayNode: ReactElement | null = null;
	    if (Array.isArray(children)) {
	        const childs: ReactNode[] = children.reduce((preChilds, child) => {
	            if (!overlayNode && child?.props?.clsPrefix === `${prefix}-menu`) {
	                overlayNode = child;
	                return preChilds
	            }
	            if (child) {
	                return [...preChilds, child];
	            }
	            return preChilds
	        }, [])
	        return {childs: childs[0], overlayMenu: overlayNode}
	    }
	    return {childs: children}
	}
	getOverlayNode = () => {
	    const {overlay} = this.props;
	    let overlayNode = overlay;
	    if (typeof overlay === 'function') {
	        overlayNode = overlay();
	    } else if (React.isValidElement(overlay)) {
		  	overlayNode = overlay;
	    } else if (typeof overlay === 'object' && (overlay as MenuProps).items) {
	        overlayNode = <Menu {...overlay}></Menu>
	    }
	    return overlayNode
	}

	addPopupOffset = (elements: React.ReactElement[]) => {
	    if (Array.isArray(elements)) {
	        return elements.map(ele=>{
	            if (ele?.props?.clsPrefix === menuClsPrefix) {
	                return React.cloneElement(ele, { popupOffset: defaultPopupOffset, });
	            }
	            return ele
	        })
	    } else {
	        return elements
	    }
	};

    getMenuElement = () => {
        const {clsPrefix, minOverlayWidthMatchTrigger, delayHide, delayShow, delay, children} = this.props;
        const {overlayMenu} = this.getOverlayNodeFromChildren(children)

        let overlayNode = (this.getOverlayNode() || overlayMenu) as React.ReactElement;
        overlayNode = React.Children.only(
            typeof overlayNode === 'string' ? <span>{overlayNode}</span> : overlayNode,
        );
        /** 外部传入不确定类型，需要any类型 */
        if ((overlayNode as (React.ReactElement | any)).type?.defaultProps?.clsPrefix !== menuClsPrefix) {
            return React.cloneElement(overlayNode, {
                className: classNames({[`${clsPrefix}-menu-match-trigger`]: minOverlayWidthMatchTrigger}, overlayNode.props.className),
                children: this.addPopupOffset(overlayNode.props.children),
                onClick: this.onClick
            });
        }
        const { subMenuCloseDelay, subMenuOpenDelay } = overlayNode.props;
        return React.cloneElement(overlayNode, {
            mode: 'dropdown',
            onClick: this.onClick,
            selectIcon: <Icon type="uf-correct-2"/>,
            className: classNames({[`${clsPrefix}-menu-match-trigger`]: minOverlayWidthMatchTrigger}, overlayNode.props.className),
            subMenuCloseDelay: subMenuCloseDelay ?? (delayHide && delayHide / 1000) ?? (delay && delay / 1000),
            subMenuOpenDelay: subMenuOpenDelay ?? (delayShow && delayShow / 1000) ?? (delay && delay / 1000),
            popupOffset: defaultPopupOffset,
        });
    }

    getPopupDomNode = () => {
        return this.triggerRef && this.triggerRef.getPopupDomNode();
    }

	// 根据placement 和 overlayMaxHeight 获取popupAlign 的值
	getpopupAlign = () => {
	    const {dir, placement = dir === 'rtl' ? 'bottomRight' : 'bottomLeft'} = this.props;
	    // let popupAlign = null;
	    // if (overlayMaxHeight) {
	    //     popupAlign = typeof placement === 'object' ? {...placements.bottomLeftNoAdjustY, ...placement} : {...placements.bottomLeftNoAdjustY, ...placements[`${placement}NoAdjustY`]};
	    // } else {
	    //     popupAlign = typeof placement === 'object' ? {...placements.bottomLeft, ...placement} : {...placements.bottomLeft, ...placements[placement]};
	    // }
	    let placementFinal = dir === 'rtl' && placement === "bottomLeft" ? 'bottomRight' : placement;
	    return typeof placementFinal === 'object' ? {...(dir === 'rtl' ? placements.bottomRight : placements.bottomLeft), ...placementFinal} : {...(dir === 'rtl' ? placements.bottomRight : placements.bottomLeft), ...placements[placementFinal]};
	}

	afterVisibleChange = (visible: boolean) => {
	    const {overlayMaxHeight, minOverlayWidthMatchTrigger, overlayStyle = {}, matchNode, dropdownStyle} = this.props;
	    if (visible) {
	        // 此处调整为先计算popupAlign，后在下一次渲染时集中更新popupStyles
	        // 同时解决getPopupDomNode返回为null的问题
	        // 原因: 触发此方法时，cssMotion中的visible还未更新，故destroy后visible变为true时，获取到的是null
	        const overlayNode = this.getPopupDomNode() as HTMLElement;
	        const rootNode: HTMLElement = ReactDOM.findDOMNode(this) as HTMLElement;
	        let align = this.getpopupAlign();
	        requestAnimationFrame(() => {
	            const rootRect = rootNode.getBoundingClientRect();
	            let matchWidth = rootRect.width;
	            const popupStyles: Record<string, string> = {};
	            // align设置 x 轴以左边开始位移，则 x 轴位移需要加上左边按钮宽度。其他以用户设置的align(placement)为准
	            if (matchNode && align.points[0].indexOf('l') > 0) {
	                matchWidth = matchNode.offsetWidth;
	                const offsetX = rootRect.width - matchWidth;
	                align = {...align, offset: [offsetX + align!.offset![0], align!.offset![1]]}
	            }
	            if (!this.state.popupAlign || JSON.stringify(align) !== JSON.stringify(this.state.popupAlign)) {
	                this.setState({popupAlign: {...align}});
	            }
	            // style优先级：overlayStyle > minOverlayWidthMatchTrigger
	            if (minOverlayWidthMatchTrigger && matchWidth > overlayNode.offsetWidth && !overlayStyle.minWidth) {
	                popupStyles['min-width'] = `${matchWidth}px`
	            }
	            if (dropdownStyle) {
	                let styleObj = {
	                    minWidth: matchWidth
	                }
	                Object.assign(popupStyles, dropdownStyle(styleObj))
	            }
	            // style优先级：overlayStyle > overlayMaxHeight
	            if (overlayMaxHeight && !overlayStyle.maxHeight) {
	                if (typeof overlayMaxHeight === 'number') {
	                    popupStyles['max-height'] = `${overlayMaxHeight}px`;
	                    popupStyles.overflow = 'auto';
	                } else {
	                    const maxHeight = Math.max(document.body.clientHeight - rootRect.bottom, rootRect.top) - 20;
	                    popupStyles['max-height'] = `${maxHeight}px`;
	                    popupStyles.overflow = 'auto';
	                }
	            }
	            Object.keys(popupStyles).forEach(key => {
	                overlayNode.style[key as any] = `${popupStyles[key]}`
	            })
	        })
	    }
	}

	getPopupContainerDom = (dom: HTMLElement) => {
	    const {getPopupContainer} = this.props;
	    if (typeof getPopupContainer === 'function') {
	        return getPopupContainer(dom)
	    } else {
	        return cssUtil.parentsUntil(dom);
	    }
	}

	render() {
	    const {
	        clsPrefix,
	        children,
	        transitionName,
	        // animation,
	        // align,
	        getDocument,
	        showAction,
	        hideAction,
	        overlayClassName,
	        overlayStyle,
	        trigger,
	        disabled,
	        delay,
	        delayShow,
	        delayHide,
	        destroyPopupOnHide,
	        dir,
	        getPopupContainer,
	        ...props
	    } = this.props;
	    const { popupAlign } = this.state;
	    let adapterNid = getNid(this.props)
	    const {childs} = this.getOverlayNodeFromChildren(children)

	    const _placement = dir === 'rtl' ? rtlPlacementMap[props.placement as string] : props.placement

	    return (<Trigger
	        {...props}
	        prefixCls={clsPrefix}
	        ref={(ref: TriggerRef | null) => this.triggerRef = ref}
	        popupClassName={overlayClassName}
	        popupStyle={overlayStyle}
	        builtinPlacements={placements}
	        action={trigger}
	        showAction={showAction}
	        hideAction={hideAction}
	        popupAlign={popupAlign || placements[_placement as string]}
	        popupTransitionName={transitionName}
	        // popupAnimation={animation} // 取消使用animation 全部使用transitionName
	        popupVisible={disabled ? false : this.state.visible}
	        afterPopupVisibleChange={this.afterVisibleChange}
	        popup={this.getMenuElement()}
	        // stretch='minWidth'
	        onPopupVisibleChange={this.onVisibleChange}
	        getPopupContainer={this.getPopupContainerDom}
	        getDocument={getDocument}
	        mouseEnterDelay={(delayShow && delayShow / 1000) ?? (delay && delay / 1000)}
	        mouseLeaveDelay={(delayHide && delayHide / 1000) ?? (delay && delay / 1000)}
	        autoDestroy={destroyPopupOnHide}
	        {...adapterNid}
	    >
	        {
	            props.uirunmode === "design" && props.uitype !== "Dropdown.Button"
	                ? <span className={`${clsPrefix}-wrap`} {...adapterNid} > {childs} </span>
	                : React.isValidElement(childs) ? React.cloneElement(childs as React.ReactElement, {
	                    className: classNames(`${clsPrefix}-trigger`, childs?.props.className),
	                }) : childs as any
	        }
	    </Trigger>)
	}
}

// Dropdown.propTypes = propTypes;

export default Dropdown;
