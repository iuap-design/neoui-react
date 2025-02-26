/**
 * This source code is quoted from rc-tree-select.
 * homepage: https://github.com/react-component/tree-select
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Resizable, {ResizeCallback} from 're-resizable';
import classNames from 'classnames';
import omit from 'omit.js';
// import PropTypes from 'prop-types';
import RcTreeSelect, {SHOW_ALL, SHOW_CHILD, SHOW_PARENT, TreeNode} from 'rc-tree-select';
import warning from 'warning';
import {getLangInfo} from "../../wui-locale/src/tool";
import i18n from './i18n';
import {cssUtil, Warning, WebUI, setComponentClass, setComponentSize, getNid} from "../../wui-core/src/index"
import {WithConfigConsumer} from "../../wui-provider/src/context";
import Icon from '../../wui-icon/src';
import Divider from '../../wui-divider/src';
import { TreeSelectProps, TreeSelectRef, TreeDataOption, TreeNodeType, TreeSelectState } from './iTreeSelect'

const defaultProps = {
    // transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    size: 'md',
    showSearch: false,
    // notFoundContent: "无匹配结果",
    locale: "zh-cn",
    onSearch: () => {},
    fieldid: '',
    showCheckedStrategy: SHOW_ALL,
    defaultOpen: false,
    showArrow: true
};
const {isShouldUpdate} = Warning;

interface EnableProps {
    bottom?: boolean,
    top?: boolean,
    left?: boolean,
    right?: boolean,
    bottomLeft?: boolean,
    topLeft?: boolean,
    topRight?: boolean,
    bottomRight?: boolean
}

@WithConfigConsumer()
@WebUI({name: "select", defaultProps})
class TreeSelect extends Component<TreeSelectProps, TreeSelectState> {
	static TreeNode: TreeNodeType;
	static SHOW_ALL = SHOW_ALL;
	static SHOW_PARENT = SHOW_PARENT;
	static SHOW_CHILD = SHOW_CHILD;
	static defaultProps = {...defaultProps};
	footerHeight: number = 0;
	footer: HTMLElement | null | undefined;

	constructor(props: TreeSelectProps) {
	    super(props);
	    this.state = {
	        listHeight: props.listHeight || 200,
	        minWidth: 0,
	        maxHeight: window.innerHeight,
	        maxWidth: window.innerWidth,
	        resizeClass: undefined,
	        enable: undefined,
	    }

	    warning(
	        props.multiple !== false || !props.treeCheckable,
	        'TreeSelect',
	        '`multiple` will alway be `true` when `treeCheckable` is true',
	    );

	    // this.state = { // 如果使用value来标记Option，再打开这个状态
	    // 	valuesArr: []
	    // }
	}

	componentDidMount() {
	    // if (this.props.fieldid) {
	    // 	this.setState({
	    // 		valuesArr: this.modifyValues(this.props)
	    // 	})
	    // }
	    const { fieldid, clsPrefix, defaultOpen, open } = this.props
	    if (fieldid) {
	        const wrapper = document.getElementsByClassName(`${clsPrefix}-tree-${fieldid}`)
	        if (wrapper.length) {
	            wrapper[0].setAttribute('fieldid', fieldid)
	        }
	        if (defaultOpen || open) { // 如果一上来就是打开的话，给选项加上fieldid
	            this.addTreeNodesFieldId(true)
	        }
	    }
	}

	// componentWillReceiveProps(nextProps) {
	// 	if (this.props.fieldid) {
	// 		this.setState({
	// 			valuesArr: this.modifyValues(nextProps)
	// 		})
	// 	}
	// }

	// loopTreeData = (data) => { // 处理传treeData的情况
	//     let res = []
	//     for (let i = 0; i < data.length; i++) {
	//         data[i] = data[i] || {}
	//         res = res.concat(data[i].value)
	//         if (data[i].children) {
	//             res = res.concat(this.loopTreeData(data[i].children))
	//         }
	//     }
	//     return res
	// }

	// loopChildren = children => { // 处理传children的情况
	//     if (!Array.isArray(children)) {
	//         children = [children]
	//     }
	//     let res = []
	//     for (let i = 0; i < children.length; i++) {
	//         const value = children[i]?.props?.value
	//         if (value) {
	//             res.push(value)
	//         }
	//         const childrenArr = children[i]?.props?.children
	//         if (childrenArr) {
	//             res = res.concat(this.loopChildren(childrenArr))
	//         }
	//     }
	//     return res
	// }

	// modifyValues(props) {
	//     const { treeData, children } = props
	//     return treeData ? this.loopTreeData(treeData) : this.loopChildren(children)
	// }

	rcTreeSelect: TreeSelectRef | null = null;

	// focus() {
	//     this.rcTreeSelect?.focus();
	// }

	// blur() {
	//     this.rcTreeSelect?.blur();
	// }

	saveTreeSelect: React.Ref<TreeSelectRef> = (node: TreeSelectRef) => {
	    this.rcTreeSelect = node;
	};

	getChildren = () => {
	    const {children, treeData, loadData} = this.props
	    if (loadData) return false // 如果是动态加载对树选择组件，默认有子组件
	    if (children) {
	        let res = true
	        React.Children.forEach(children, (child: React.ReactElement) => {
	            if (child.props.children && child.props.children.length) {
	                res = false
	            }
	        })
	        return res
	    }
	    if (treeData && treeData.length) {
	        let key = 'children'
	        const {fieldNames} = this.props
	        if (fieldNames && fieldNames[key]) {
	            key = fieldNames[key]
	        }
	        return !treeData.find((data: TreeDataOption) => data[key] && data[key].length)
	    }
	    return true
	}

	getDropdownClassName = () => {
	    const isNoChildren = this.getChildren()
	    const {dropdownClassName, fieldid, clsPrefix, popupClassName} = this.props;
	    let extraDropdownClassName = ''
	    if (fieldid) {
	        extraDropdownClassName = `${clsPrefix}-${fieldid}-dropdown`
	    }
	    const treeSelectPrefixCls = 'tree-select';
	    return classNames(dropdownClassName || popupClassName, `${treeSelectPrefixCls}-dropdown`, `${isNoChildren ? 'no-padding-left' : ''}`, `${extraDropdownClassName}`);
	}
	// (props: any) => HTMLElement;
	getPopupContainerDom = (dom: HTMLElement) => {
	    const {getPopupContainer} = this.props;
	    if (typeof getPopupContainer === 'function') {
	        return getPopupContainer(dom)
	    } else {
	        return cssUtil.parentsUntil(dom);
	    }
	}

	renderSwitcherIcon = (fieldid: string | undefined, icon: React.ReactElement | undefined) => {
	    if (fieldid) {
	        if (icon) {
	            return React.cloneElement(icon, {
	                fieldid: `${fieldid}_treeselect_switcher`
	            })
	        } else { // 如果传了fieldid却没有传switcherIcon，生成一个span
	            return <span
	                fieldid={`${fieldid}_treeselect_switcher`}
	                style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}
	            />
	        }
	    } else {
	        return icon || null // 不传fieldid和icon的什么都不需要传，用本身的样式交互即可
	    }
	}

	addTreeNodesFieldId = (modify: boolean, isDropdownVisibleChange?: boolean) => {
	    if (modify) { // 下拉框被显示出来当时候，或者tree展开收起时，处理treenode的fieldid
	        setTimeout(() => {
	            const { fieldid, clsPrefix } = this.props
	            // const { valuesArr } = this.state
	            const wrapper = document.getElementsByClassName(`${clsPrefix}-${fieldid}-dropdown`)
	            if (!wrapper.length) return
	            const treeNodes = wrapper[0].querySelectorAll(`.${clsPrefix}-tree-list .${clsPrefix}-tree-treenode`)
	            for (let i = 0; i < treeNodes.length; i++) {
	                treeNodes[i].setAttribute('fieldid', `${fieldid}_option_${i}`) // 先和Select一样，用index，如果不合适，再用value
	                // dom[i].setAttribute('fieldid', `${fieldid}_option_${valuesArr[i]}`)
	            }
	        }, 0);
	    }
	    if (isDropdownVisibleChange) {
	        const { onDropdownVisibleChange } = this.props
	        onDropdownVisibleChange && onDropdownVisibleChange(modify)
	    }
	}

	handleTreeExpand = (expandedKeys: string[]) => { // 当tree展开收起时，处理feildid
	    // this.modifyValues(this.props)
	    if (this.props.onTreeExpand) {
	        this.props.onTreeExpand(expandedKeys)
	    }
	    this.addTreeNodesFieldId(true)
	}

	parentsHaveClass(element: HTMLElement, className: string): boolean {
	    const parent = element.parentElement as HTMLElement;
	    if (parent.nodeName === 'BODY') {
	        return false
	    }
	    if (parent.classList.contains(className)) {
	        return true
	    }
	    return this.parentsHaveClass(parent, className)
	}

	// 仅纵向或者仅横向拖拽
	getResizeBoxEnable = (oldEnable: EnableProps, resizable: boolean | 'vertical' | 'horizontal') =>{
	    let {top = false, left = false, bottom = false, right = false} = oldEnable;
	    // 返回两项，其中有一项没传默认为false
	    if (resizable === "vertical") {
	        return { bottom, top };
	    }
	    if (resizable === "horizontal") {
	        return { left, right };
	    }
	    return oldEnable
	}

	onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
	    let {minWidth, maxHeight, maxWidth, resizeClass, enable} = this.state;
	    const {clsPrefix, getPopupContainer, resizable} = this.props;
	    const resizebox = e.currentTarget as HTMLElement;
	    const rootNode = ReactDOM.findDOMNode(this) as HTMLElement; // treeseelct输入框
	    const {bottom, top, left, right} = resizebox.getBoundingClientRect();
	    const boundsRect = typeof getPopupContainer === 'function' && getPopupContainer()?.getBoundingClientRect();
	    this.footerHeight = this.footer?.offsetHeight ? this.footer?.offsetHeight : 0;
	    minWidth = rootNode.offsetWidth - 2; // 2px 为下拉框的border
	    if (this.parentsHaveClass(resizebox, `${clsPrefix}-dropdown-placement-bottomRight`)) {
	        maxWidth = boundsRect ? right - boundsRect.left : right;
	        maxHeight = boundsRect ? boundsRect.bottom - top : window.innerHeight - top;
	        enable = { bottom: true, left: true, bottomLeft: true};
	        resizeClass = 'resizable-bottomLeft';
	    } else if (this.parentsHaveClass(resizebox, `${clsPrefix}-dropdown-placement-topRight`)) {
	        maxWidth = boundsRect ? right - boundsRect.left : right;
	        maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
	        enable = { top: true, left: true, topLeft: true};
	        resizeClass = 'resizable-topLeft';
	    } else if (this.parentsHaveClass(resizebox, `${clsPrefix}-dropdown-placement-topLeft`)) {
	        maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
	        maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
	        enable = { top: true, right: true, topRight: true};
	        resizeClass = 'resizable-topRight';
	    } else { // 默认下拉框位置是bottomLeft
	        maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
	        maxHeight = boundsRect ? boundsRect.bottom - top : window.innerHeight - top;
	        enable = { bottom: true, right: true, bottomRight: true};
	        resizeClass = 'resizable-bottomRight';
	    }
	    // 仅纵向、横向拖拽
	    if (resizable === 'vertical' || resizable === "horizontal") {
	        enable = this.getResizeBoxEnable(enable, resizable)
	    }
	    maxHeight -= 8; // 减去dropdown的padding
	    this.setState({minWidth, maxHeight, maxWidth, resizeClass, enable});
	};

	onResize: ResizeCallback = (event, direction, elementRef, delta) => {
	    const {onResize} = this.props;
	    this.setState({listHeight: elementRef.offsetHeight - (this.footerHeight as number) - 8}) // 8px 为底部的padding
	    typeof onResize === "function" && onResize(event, direction, elementRef, delta);
	};
	onResizeStop: ResizeCallback = (event, direction, elementRef, delta) => {
	    const {onResizeStop} = this.props;
	    this.setState({listHeight: elementRef.offsetHeight - (this.footerHeight as number) - 8})
	    typeof onResizeStop === "function" && onResizeStop(event, direction, elementRef, delta);
	};

	resizableDropdown = (node: React.ReactElement) => {
	    const {dropdownRender, clsPrefix, listHeight} = this.props;
	    let {minWidth, maxHeight, maxWidth, enable, resizeClass} = this.state;
	    const Footer = ({ children, height, style, ...otherProps }: any) => {
	        this.footerHeight = height ? height : this.footerHeight;
	        return <footer
	            {...otherProps}
	            style={{position: children && this.footerHeight ? 'absolute' : 'relative', height, ...style}}
	            ref={ref => this.footer = ref}
	            className={`${clsPrefix}-tree-resizebox-footer`}
	        >
	            <Divider style={{ margin: '8px 0' }}/>
	            {children as React.ReactElement}
	        </footer>
	    };
	    return <Resizable
	        className={classNames([`${clsPrefix}-tree-resizebox`], resizeClass)}
	        style={{ paddingBottom: this.footerHeight ? `${this.footerHeight}px` : 0 }}
	        minHeight={listHeight || 200}
	        minWidth={minWidth}
	        maxHeight={maxHeight}
	        maxWidth={maxWidth}
	        enable={enable}
	        onResize={this.onResize}
	        onResizeStart={this.props.onResizeStart}
	        onResizeStop={this.onResizeStop}
	        onMouseEnter={this.onMouseEnter}
	        handleWrapperClass={'resize-handle'}
	        handleClasses={{
	            top: `${clsPrefix}-resizebox-handle-top`,
	            right: `${clsPrefix}-resizebox-handle-right`,
	            bottom: `${clsPrefix}-resizebox-handle-bottom`,
	            left: `${clsPrefix}-resizebox-handle-left`,
	        }}
	    >
	       {typeof dropdownRender === "function" ? dropdownRender(node, Footer) : node}
	    </Resizable>
	}

	render() {
	    const {
	        clsPrefix,
	        className,
	        size,
	        notFoundContent,
	        dropdownStyle,
	        suffixIcon,
	        switcherIcon,
	        requiredStyle,
	        align,
	        bordered = true,
	        fieldid,
	        onTreeExpand,
	        onDropdownVisibleChange,
	        resizable,
	        dropdownRender,
	        dropdownMatchSelectWidth,
	        listHeight,
	        showCheckedStrategy,
	        popupClassName,
	        locale,
	        ...restProps
	    } = this.props;
	    isShouldUpdate("TreeSelect", this.props);
	    const rest = omit(restProps, ['inputIcon', 'removeIcon', 'clearIcon']);
	    const fieldidClassName = fieldid ? `${clsPrefix}-tree-${fieldid}` : '';
	    const local = getLangInfo(locale, i18n, 'treeSelect');

	    const cls = classNames(
					`${clsPrefix}-tree-select`,
	        size && `${clsPrefix}-${setComponentSize(size, {defaultIsMd: true})}`,
	        {
					    ...setComponentClass({clsPrefix, bordered, align, requiredStyle}),
	            // [`${clsPrefix}-borderless`]: !bordered,  // 逻辑错误，bordered	=== undefined / null时均会无边框
	        },
	        className,
	        fieldidClassName
	    );
	    // showSearch: single - false, multiple - true
	    let {showSearch} = restProps;
	    if (!('showSearch' in restProps)) {
	        showSearch = !!(restProps.multiple || restProps.treeCheckable);
	    }
	    let mergedNotFound = notFoundContent;
	    if (notFoundContent === undefined) { // 优先显示传了notFoundContent的内容
	        mergedNotFound = local.langMap.notFoundContent;
	    }
	    let checkable = rest.treeCheckable;
	    if (checkable) {
	        checkable = <span className={`${clsPrefix}-tree-checkbox-inner`}/>;
	    }

	    let inputIcon = (suffixIcon &&
			(React.isValidElement(suffixIcon)
			    ? React.cloneElement(suffixIcon)
			    : suffixIcon)) || <Icon type="uf-arrow-down" className={`${clsPrefix}-arrow-icon`}/>;

	    if (fieldid) {
	        inputIcon = React.cloneElement(inputIcon as React.ReactElement, {
	            fieldid: `${fieldid}_suffix_icon`
	        })
	    }
	    const removeIcon = <Icon type="uf-close" className={`${clsPrefix}-remove-icon`}/>;

	    const clearIcon = (
	        <Icon type="uf-close-c"/>
	    );
	    let switcherIconProp = {
	        switcherIcon: this.renderSwitcherIcon(fieldid, switcherIcon)
	    }
	    const onTreeExpandProp = fieldid ?
	        { onTreeExpand: this.handleTreeExpand } :
	        { onTreeExpand } // 没有传fieldid用传来的onTreeExpand
	    const dropdownVisibleChangeProp = fieldid ?
	        { onDropdownVisibleChange: (open: boolean) => this.addTreeNodesFieldId(open, true) } :
	        { onDropdownVisibleChange: this.props.onDropdownVisibleChange } // 没有传fieldid用传来的onDropdownVisibleChange
	    const fieldidProp = fieldid ? { fieldid } : {}
	    let adapterNid = getNid(this.props)
	    return (
	        <RcTreeSelect
	            inputIcon={inputIcon}
	            showCheckedStrategy={showCheckedStrategy}
	            removeIcon={removeIcon}
	            clearIcon={clearIcon}
	            {...restProps}
	            {...switcherIconProp}
	            showSearch={showSearch}
	            getPopupContainer={this.getPopupContainerDom}
	            dropdownClassName={this.getDropdownClassName()}
	            prefixCls={clsPrefix}
	            className={cls}
	            dropdownStyle={resizable ? dropdownStyle : {maxHeight: '100vh', overflow: 'auto', ...dropdownStyle}}
	            dropdownRender={resizable ? this.resizableDropdown : dropdownRender}
	            dropdownMatchSelectWidth={resizable ? false : dropdownMatchSelectWidth}
	            listHeight={resizable ? this.state.listHeight : listHeight}
	            listItemHeight={28}
	            notFoundContent={mergedNotFound}
	            treeCheckable={checkable}
	            ref={this.saveTreeSelect}
	            {...dropdownVisibleChangeProp}
	            {...onTreeExpandProp}
	            {...fieldidProp}
	            {...adapterNid}
	        />
	    )
	}

}

// TreeSelect.propTypes = propTypes;
TreeSelect.TreeNode = TreeNode;
export default TreeSelect;
