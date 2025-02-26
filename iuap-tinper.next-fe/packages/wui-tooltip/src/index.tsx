import classNames from 'classnames';
import omit from 'omit.js';
import React, { useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import RcTooltip from 'rc-tooltip';
import type { AlignType } from 'rc-trigger/lib/interface';
// import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import useEffect from 'rc-util/lib/hooks/useEffect';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { CSSProperties, ReactElement } from 'react';
import { Warning, cssUtil, getNid, prefix } from './../../wui-core/src/index';
import { cloneElement, isValidElement } from './../../wui-core/src/utils/createAntdUtils';
import type { TooltipProps } from './iTooltip';
import { useConfigContext } from '../../wui-provider/src/context';
import getPlacements from './placements';
import Resizable from 're-resizable';

const {isShouldUpdate} = Warning;
const defaultGetPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefix}-${suffixCls}` : prefix;
};

export const configContext = React.createContext({
    // We provide a default function for Context without provider
    getPrefixCls: defaultGetPrefixCls,

    renderEmpty: null
});

const DEFAULT_PLACEMENT = 'top';

const presetColorTypes = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
];

const splitObject = (obj: Record<string, any>, keys: (string | number)[]): {picked: Record<string, any>; omitted: Record<string, any>} => {
    const picked: Record<string, any> = {};
    const omitted = {...obj};
    keys.forEach(key => {
        if (obj && key in obj) {
            picked[key] = obj[key];
            delete omitted[key];
        }
    });
    return {picked, omitted};
};
const presetColorRegex = new RegExp(`^(${presetColorTypes.join('|')})(-inverse)?$`);

// Fix Tooltip won't hide at disabled button
// mouse events don't trigger at disabled button in Chrome
// https://github.com/react-component/tooltip/issues/18
function getDisabledCompatibleChildren(element: ReactElement | any/** 兼容ant自定义的__ANT_BUTTON等需要any类型 */, prefixCls: string) {
    const elementType = element.type;
    if (
        (elementType.__ANT_BUTTON === true ||
            elementType.__ANT_SWITCH === true ||
            elementType.__ANT_CHECKBOX === true ||
            elementType.defaultProps?.clsPrefix === `${prefix}-button` /** 解决用户传入Button组件时获取element.type为reactNode而非 'button' 问题，保证Button组件与原生button表现一致 */ ||
            element.props.htmlType === 'button' ||
            elementType === 'button') &&
        element.props.disabled
    ) {
        // Pick some layout related style properties up to span
        // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
        const {picked, omitted} = splitObject(element.props.style, [
            'position',
            'left',
            'right',
            'top',
            'bottom',
            'float',
            'display',
            'margin', // child位置等不应调整
            'zIndex'
        ]);
        const spanStyle: CSSProperties = {
            display: 'inline-block', // default inline-block is important
            ...picked,
            cursor: 'not-allowed',
            width: element.props.block ? '100%' : undefined
        };
        const buttonStyle = {
            ...omitted,
            pointerEvents: 'none'
        };
        const child = cloneElement(element, {
            style: buttonStyle,
            // className: undefined // child的class归child，不能移除用户传入的参数
        });
        return (
            <span
                style={spanStyle}
                className={classNames(/* element.props.className, */ `${prefixCls}-disabled-compatible-wrapper`)}
            >
                {child}
            </span>
        );
    }
    // 兼容联合使用tooltip (Cascader TreeSelect Select Dropdown 已兼容)
    if (
        ['AutoComplete', 'TimePickerWrapper'].includes(element.type.name) ||
        (element.type.displayName && element.type.displayName?.indexOf('DatePicker') !== -1)
    ) {
        return <span>{element}</span>;
    }
    return element;
}

let contentStyle = {width: 0, height: 0};
let contentStyleCopy = {width: 0, height: 0};
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref: any) => {
    const {getPrefixCls} = React.useContext(configContext);
    const {getPopupContainer: getContextPopupContainer, dir: direction, defaultVisible, defaultOpen, show, open, onHide, onOpenChange, builtinPlacements, arrowPointAtCenter, autoAdjustOverflow, title, overlay, fieldid, hideArrow = false, resizable, resizeStyle} = props
    const overlayRef = useRef(null);
    let childRef = useRef(null)
    let arrowDom = useRef(null)
    let tooltipKey = new Date().getTime().toString();

    const [visible, setVisible] = useMergedState(false, {
        value: typeof show !== 'undefined' ? show : props.visible ?? open,
        defaultValue: defaultVisible ?? defaultOpen
    });
    const {dir} = direction ? {dir: direction} : useConfigContext();

    const isNoTitle = () => {
        const {title, overlay} = props;
        return !title && !overlay && title !== 0; // overlay for old version compatibility
    };

    const [autoHeightStyle, setAutoHeightStyle] = useState({});
    // const [placementVal, setPlacementVal] = useState(props.placement);
    const onVisibleChange = (vis: boolean) => {
        setVisible(isNoTitle() ? false : vis);

        if (!isNoTitle()) {
            props.onVisibleChange ? props.onVisibleChange?.(vis) : onOpenChange?.(vis)
        }
        if (!vis) {
            onHide?.(vis);
        }
        if (vis && props.autoAdjustOverflowHeight) {
            const rootNode: HTMLElement = document.querySelector(`[domkey="tooltip${tooltipKey}"]`) as any;
            const rect = rootNode?.getBoundingClientRect();
            let placement = props.placement || 'top'
            let maxHeight = 0
            if (placement.indexOf('top') >= 0) {
                setTimeout(() => {
                    let overlayNode = overlayRef.current as any
                    if (rect.top - 10 > document.body.clientHeight - rect.bottom - 10 || rect.top - 10 > (overlayNode?.parentNode as Element)?.getBoundingClientRect().height) {
                        maxHeight = rect.top - 10
                        setAutoHeightStyle({maxHeight: maxHeight, overflow: 'auto'})
                        // setPlacementVal(props.placement)
                    } else {
                        maxHeight = document.body.clientHeight - rect.bottom - 10
                        setAutoHeightStyle({maxHeight: maxHeight, overflow: 'auto'})
                        // setPlacementVal(placement.replace(new RegExp('top', 'g'), 'bottom') as any)
                        // setPlacementVal(placement.split('top').join('bottom') as any)
                    }
                }, 100)
            } else if (placement.indexOf('bottom') >= 0) {
                setTimeout(() => {
                    let overlayNode = overlayRef.current as any
                    if (document.body.clientHeight - rect.bottom - 10 > rect.top - 10 || document.body.clientHeight - rect.bottom - 10 > (overlayNode?.parentNode as Element)?.getBoundingClientRect().height) {
                        maxHeight = document.body.clientHeight - rect.bottom - 10
                        setAutoHeightStyle({maxHeight: maxHeight, overflow: 'auto'})
                        // setPlacementVal(props.placement)
                    } else {
                        maxHeight = rect.top - 10
                        setAutoHeightStyle({maxHeight: maxHeight, overflow: 'auto'})
                        // setPlacementVal(placement.replace(new RegExp('bottom', 'g'), 'top') as any)
                        // setPlacementVal(placement.split('top').join('bottom') as any)
                    }
                }, 0)
            }
        }
    };

    const tooltipPlacements = React.useMemo(() => {
        return (
            builtinPlacements ||
            getPlacements({
                arrowPointAtCenter: arrowPointAtCenter,
                autoAdjustOverflow,
                arrowWidth: !hideArrow ? 16 : 0
            })
        );
    }, [arrowPointAtCenter, hideArrow, builtinPlacements]);

    const [resizeStates, setResizeStates] = useState({
        maxHeight: window.innerHeight,
        maxWidth: window.innerWidth,
        resizeClass: '',
        enable: null as any,
    });
    let initArrowContentStyle: Record<string, any> = {};
    if (props?.color) {
        initArrowContentStyle.background = props?.color;
    }
    const [arrowContentStyle, setArrowContentStyle] = useState(initArrowContentStyle);

    const onPopupAlign = (domNode: HTMLElement, align: AlignType) => {
        const {prefixCls: customizePrefixCls, isCenterArrow} = props;
        const placements = tooltipPlacements;
        // 当前返回的位置
        const placement = Object.keys(placements).filter(
            key => (placements[key] as AlignType).points?.[0] === align.points?.[0] && (placements[key] as AlignType).points?.[1] === align.points?.[1]
        )[0];
        if (!placement) {
            return;
        }
        // 根据当前坐标设置动画点
        const rect = domNode.getBoundingClientRect();
        const transformOrigin = {
            top: '50%',
            left: '50%'
        };
        if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
            transformOrigin.top = `${rect.height - Number(align.offset?.[1])}px`;
        } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
            transformOrigin.top = `${-align.offset![1]}px`;
        }
        if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
            transformOrigin.left = `${rect.width - Number(align.offset![0])}px`;
        } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
            transformOrigin.left = `${-align.offset![0]}px`;
        }
        // domNode.style.transformOrigin = `${dir === 'rtl' ? -transformOrigin.left : transformOrigin.left} ${transformOrigin.top}`;
        domNode.style.transformOrigin = `${dir === 'rtl' ? transformOrigin.left : transformOrigin.left} ${transformOrigin.top}`;

        const prefixClsCopy = getPrefixCls('tooltip', customizePrefixCls);
        if (prefixClsCopy.includes('tooltip')) {
            let childClientRect: any = document.querySelector(`[domkey="tooltip${tooltipKey}"]`)?.getBoundingClientRect()
            let tcDom = domNode?.getBoundingClientRect()
            let windowW = document.documentElement.clientWidth || document.body.clientWidth
            if (parentsHaveClass(domNode, `${prefixClsCopy}-placement-bottomLeft`) || parentsHaveClass(domNode, `${prefixClsCopy}-placement-topLeft`)) {
                if (childClientRect?.x + childClientRect?.width / 2 < tcDom?.width / 2 || isCenterArrow) {
                    setArrowContentStyle({
                        ...arrowContentStyle,
                        left: childClientRect?.x - tcDom?.x + childClientRect?.width / 2 - 5,
                        top: 0,
                        bottom: 0
                    });
                }
            } else if (parentsHaveClass(domNode, `${prefixClsCopy}-placement-bottomRight`) || parentsHaveClass(domNode, `${prefixClsCopy}-placement-topRight`)) {
                if (windowW - childClientRect?.right + childClientRect?.width / 2 < tcDom?.width / 2 || isCenterArrow) {
                    setArrowContentStyle({
                        ...arrowContentStyle,
                        right: tcDom?.right - childClientRect?.right + childClientRect?.width / 2 - 5,
                        top: 0,
                        bottom: 0
                    });
                }
            } else if (parentsHaveClass(domNode, `${prefixClsCopy}-placement-bottom`) || parentsHaveClass(domNode, `${prefixClsCopy}-placement-top`)) {
                if (childClientRect?.x + childClientRect?.width / 2 < tcDom?.width / 2 || isCenterArrow) {
                    setArrowContentStyle({
                        ...arrowContentStyle,
                        left: childClientRect?.x - tcDom?.x + childClientRect?.width / 2 - 5,
                        top: 0,
                        bottom: 0
                    });
                } else if (windowW - childClientRect?.right + childClientRect?.width / 2 < tcDom?.width / 2 || isCenterArrow) {
                    setArrowContentStyle({
                        ...arrowContentStyle,
                        right: tcDom?.right - childClientRect?.right + childClientRect?.width / 2 - 5,
                        top: 0,
                        bottom: 0
                    });
                }
            }
        }
        // ---------- 15.2.0新增逻辑 -------------
        if (!resizable) return
        const {prefixCls} = props;
        let maxHeight, maxWidth, resizeClass, enable;
        const resizebox = domNode as HTMLElement;
        const {bottom, top, left, right} = resizebox.getBoundingClientRect();
        const boundsRect = typeof getPopupContainer === 'function' && getPopupContainer(null as any)?.getBoundingClientRect();
        if (parentsHaveClass(resizebox, `${prefixCls}-placement-bottomRight`)) {
            maxWidth = boundsRect ? right - boundsRect.left : right;
            maxHeight = boundsRect ? boundsRect.bottom - top : window.innerHeight - top;
            if (resizable === 'horizontal') {
                enable = { left: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { bottom: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { bottom: true, left: true, bottomLeft: true};
                resizeClass = 'resizable-bottomRight';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-topRight`)) {
            maxWidth = boundsRect ? right - boundsRect.left : right;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { left: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { top: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { top: true, left: true, topLeft: true};
                resizeClass = 'resizable-topRight';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-topLeft`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { right: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { top: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { top: true, right: true, topRight: true};
                resizeClass = 'resizable-topLeft';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-left`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { left: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { top: true, bottom: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { left: true, top: true, bottom: true, topLeft: true, bottomLeft: true};
                resizeClass = 'resizable-left';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-leftTop`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { left: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { bottom: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { left: true, bottom: true, bottomLeft: true};
                resizeClass = 'resizable-leftTop';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-leftBottom`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { left: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { top: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { left: true, top: true, topLeft: true};
                resizeClass = 'resizable-leftBottom';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-right`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { right: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { top: true, bottom: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { right: true, top: true, bottom: true, topRight: true, bottomRight: true};
                resizeClass = 'resizable-right';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-rightTop`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { right: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { bottom: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { right: true, bottom: true, bottomRight: true};
                resizeClass = 'resizable-rightTop';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-rightBottom`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { right: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { top: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { right: true, top: true, topRight: true};
                resizeClass = 'resizable-rightBottom';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-top`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { right: true, left: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { top: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { top: true, left: true, right: true, topRight: true, topLeft: true};
                resizeClass = 'resizable-top';
            }
        } else if (parentsHaveClass(resizebox, `${prefixCls}-placement-bottom`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            if (resizable === 'horizontal') {
                enable = { right: true, left: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { bottom: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { bottom: true, left: true, right: true, bottomRight: true, bottomLeft: true};
                resizeClass = 'resizable-bottom';
            }
        } else { // 默认下拉框位置是bottomLeft
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? boundsRect.bottom - top : window.innerHeight - top;
            if (resizable === 'horizontal') {
                enable = { right: true };
                resizeClass = 'resizable-horizontal';
            } else if (resizable === 'vertical') {
                enable = { bottom: true };
                resizeClass = 'resizable-vertical';
            } else {
                enable = { bottom: true, right: true, bottomRight: true};
                resizeClass = 'resizable-bottomLeft';
            }
        }
        // setEnable(enable)
        setResizeStates({maxHeight, maxWidth, resizeClass, enable});
    };

    const getOverlay = React.useMemo(() => {
        if (title === 0) {
            return title;
        }
        let resizableClass = classNames({
            [`${props.prefixCls}-resize`]: true,
            [`${resizeStates.resizeClass}`]: true
        });
        return (
            resizable ?
                <Resizable
                    // className={`${props.prefixCls}-resize`}
                    className={resizableClass}
                    onResize={props.onResize}
                    onResizeStart={props.onResizeStart}
                    onResizeStop={props.onResizeStop}
                    // minWidth={resizeStates.minWidth}
                    // maxWidth={resizeStates.maxWidth}
                    // maxHeight={resizeStates.maxHeight}
                    // onMouseEnter={onResize}
                    enable={resizeStates.enable}
                    {...resizeStyle}
                >
                    <div fieldid={fieldid} ref={overlayRef as React.LegacyRef<HTMLDivElement>}>
                        {overlay || title || ''}
                    </div>
                </Resizable> :
                <div fieldid={fieldid} ref={overlayRef as React.LegacyRef<HTMLDivElement>}>
                    {overlay || title || ''}
                </div>
        );
    }, [overlay, title, fieldid, resizeStates]);

    const parentsHaveClass = (element: HTMLElement, className: string): boolean => {
        if (element?.nodeName === 'BODY') {
            return false
        }
        if (element?.classList?.contains(className)) {
            return true
        }
        const parent = element.parentElement as HTMLElement;
        return parentsHaveClass(parent, className)
    }

    // const popoverClick = (e: any) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    // }

    const {
        prefixCls: customizePrefixCls,
        delay = 0,
        inverse = false,
        mouseEnterDelay,
        mouseLeaveDelay,
        openClassName,
        getTooltipContainer,
        overlayClassName,
        color,
        overlayInnerStyle,
        children,
        onMouseLeave,
        onMouseOut,
        container,
        getPopupContainer,
        maskClosable = false,
        rootClose
    } = props;
    const prefixCls = getPrefixCls('tooltip', customizePrefixCls);

    let tempVisible = visible;
    // Hide tooltip when there is no title
    if (!('visible' in props) && !('open' in props) && isNoTitle()) {
        tempVisible = false;
    }

    const child = getDisabledCompatibleChildren(
        isValidElement(children) ? children : <span>{children}</span>,
        prefixCls
    );
    const childProps = child.props;
    const childDataId = `${prefixCls}-${(Math.random().toString(36).substring(2, 18) + Date.now())
        .toString()
        .substring(0, 10)}`;
    const childCls = classNames(childProps.className, {
        [openClassName || `${prefixCls}-open`]: true
    });

    let colorName = inverse ? 'inverse' : color;
    const customOverlayClassName = classNames(overlayClassName, {
        [`${prefixCls}-hide-arrow`]: hideArrow,
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-${colorName}`]: inverse ? true : color && presetColorRegex.test(color),
        [`${props.prefixCls}-type-resizable`]: resizable,
        [`${prefixCls}-has-color`]: color
    });

    let formattedOverlayInnerStyle = overlayInnerStyle;
    // let initArrowContentStyle: Record<string, any> = {};

    if (color) {
        initArrowContentStyle.background = color;
    }
    if (color && !presetColorRegex.test(color)) {
        formattedOverlayInnerStyle = {...overlayInnerStyle, background: color};
    }

    // const [arrowContentStyle, setArrowContentStyle] = useState(initArrowContentStyle);

    const timer = delay ? delay / 1000 : mouseEnterDelay;
    const mouseLeaveDelayTimer = delay ? delay / 1000 : mouseLeaveDelay;
    const onMouseLeaveCallback = onMouseOut ? onMouseOut : onMouseLeave || function e() {};
    const maskClosableFlag = typeof rootClose != 'undefined' ? rootClose : maskClosable;
    let getPopupContainerDom = container
        ? () => container
        : getPopupContainer || getTooltipContainer || getContextPopupContainer;

    const getPopupContainerDomFn = (dom: HTMLElement) => {
        if (typeof getPopupContainerDom === 'function') {
            return (getPopupContainerDom as (n: HTMLElement) => HTMLElement)?.(dom);
        } else {
            return cssUtil.parentsUntil(dom);
        }
    };

    useEffect(() => {
        isShouldUpdate('Tooltips', props);
    }, [props.container]);

    const halfContentMaxWidth = 100; // 内容最大宽度的一半，取自css样式

    const autoSize = {};
    const initPlacementsMap = tooltipPlacements;
    const [placementsMap, setPlacementsMap] = useState(initPlacementsMap);
    const [autoSizeStyle, setAutoSizeStyle] = useState(autoSize);
    const rtlPositionMap:{[key: string]:string} = {
        "top": "top",
        "bottom": "bottom",
        topLeft: "topRight",
        topRight: "topLeft",
        leftTop: "rightTop",
        rightTop: "leftTop",
        left: "right",
        "right": "left",
        leftBottom: "rightBottom",
        rightBottom: "leftBottom",
        bottomLeft: "bottomRight",
        bottomRight: "bottomLeft"
    }

    useLayoutEffect(() => {
        if (tempVisible && props.overlayMaxHeight) {
            interface PositionType {
                [position: string]: number;
            }
            // const placement = dir === 'rtl' && props.placement ? rtlPositionMap[props.placement] : (props.placement || 'top')
            const placement = (props.placement || 'top')

            const ARROW_SPACE = 10;
            const bodyStyle: DOMRect = document.body.getBoundingClientRect();

            const childEle = document.querySelector(`[date-for-${prefixCls}="${childDataId}"]`);
            if (!childEle) return;

            const childStyle = childEle?.getBoundingClientRect();
            contentStyle = overlayRef.current && (overlayRef.current as Element).getBoundingClientRect() || contentStyleCopy; // 更新最原始数据contentStyleCopy，防止两个弹层数据相互影响
            // availableSpace：child上下左右弹窗可用空间
            const availableSpace: PositionType = {
                left: childStyle.left - ARROW_SPACE,
                right: bodyStyle.width - childStyle.right - ARROW_SPACE,
                top: childStyle.top - ARROW_SPACE,
                bottom: bodyStyle.height - childStyle.bottom - ARROW_SPACE
            };


            /**
             * 计算max-height和overflow-y
             */
            if (placement.indexOf('top') >= 0 || placement.indexOf('bottom') >= 0) {
                // 弹窗位于child上下
                Object.assign(autoSize, {
                    maxHeight: Math.max(availableSpace.top, availableSpace.bottom) + 'px',
                    height:
                        contentStyle.height > Math.max(availableSpace.top, availableSpace.bottom)
                            ? Math.max(availableSpace.top, availableSpace.bottom) + 'px'
                            : undefined,
                    overflowY:
                        contentStyle.height > Math.max(availableSpace.top, availableSpace.bottom) ? 'scroll' : undefined
                });
            } else if (placement === 'left' || placement === 'right') {
                // 弹窗位于child左右center
                Object.assign(autoSize, {
                    maxHeight: bodyStyle.height + 'px',
                    height: contentStyle.height > bodyStyle.height ? bodyStyle.height + 'px' : undefined,
                    overflowY: contentStyle.height > bodyStyle.height ? 'scroll' : undefined
                });

                // 箭头边界位置处理（左右弹出）
                if (childStyle.height / 2 + availableSpace.top <= bodyStyle.height) {
                    setArrowContentStyle({
                        ...arrowContentStyle,
                        left: 0,
                        right: 0,
                        top: '50%'
                    });
                } else if (childStyle.height / 2 + availableSpace.bottom <= bodyStyle.height) {
                    setArrowContentStyle({
                        ...arrowContentStyle,
                        left: 0,
                        right: 0,
                        bottom: '50%'
                    });
                }
            } else if (placement.indexOf('Top') >= 0) {
                // 弹窗位于child左上、右上
                Object.assign(autoSize, {
                    maxHeight: bodyStyle.height - childStyle.top + 'px',
                    height:
                        contentStyle.height > bodyStyle.height - childStyle.top
                            ? bodyStyle.height - childStyle.top + 'px'
                            : undefined,
                    overflowY: contentStyle.height > bodyStyle.height - childStyle.top ? 'scroll' : undefined
                });
            } else if (placement.indexOf('Bottom') >= 0) {
                // 弹窗位于child左下、右下
                Object.assign(autoSize, {
                    maxHeight: childStyle.bottom + 'px',
                    height: contentStyle.height > childStyle.bottom ? childStyle.bottom + 'px' : undefined,
                    overflowY: contentStyle.height > childStyle.bottom ? 'scroll' : undefined
                });
            }

            /**
             * 计算max-width和overflow-x
             */
            if (placement === 'top' || placement === 'bottom') {
                // 弹窗位于child上下center
                Object.assign(autoSize, {
                    maxWidth: bodyStyle.width + 'px',
                    width: contentStyle.width > bodyStyle.width ? bodyStyle.width + 'px' : undefined,
                    overflowX: contentStyle.width > bodyStyle.width ? 'scroll' : undefined
                });

                // 箭头边界位置处理（上下弹出）
                if (childStyle.width / 2 + availableSpace.right <= halfContentMaxWidth) {
                    setArrowContentStyle({
                        ...arrowContentStyle,
                        top: 0,
                        bottom: 0,
                        // [props.dir === 'rtl' ? "right" : "left"]: childStyle.width / 2 + availableSpace.right + ARROW_SPACE
                        [ "left"]: childStyle.width / 2 + availableSpace.right + ARROW_SPACE
                    });
                } else if (childStyle.width / 2 + availableSpace.left <= halfContentMaxWidth) {
                    setArrowContentStyle({
                        ...arrowContentStyle,
                        top: 0,
                        bottom: 0,
                        ["right"]: childStyle.width / 2 + availableSpace.left + ARROW_SPACE
                    });
                }
            } else if (placement.indexOf('left') >= 0 || placement.indexOf('right') >= 0) {
                // 弹窗位于child左右
                Object.assign(autoSize, {
                    maxWidth: Math.max(availableSpace.left, availableSpace.right) + 'px',
                    width:
                        contentStyle.width > Math.max(availableSpace.left, availableSpace.right)
                            ? Math.max(availableSpace.left, availableSpace.right) + 'px'
                            : undefined,
                    overflowX:
                        contentStyle.width > Math.max(availableSpace.left, availableSpace.right) ? 'scroll' : undefined
                });
            } else if (placement.indexOf('Left') >= 0) {
                // 弹窗位于child上左、下左
                Object.assign(autoSize, {
                    maxWidth: bodyStyle.width - childStyle.left + 'px',
                    width:
                        contentStyle.width > bodyStyle.width - childStyle.left
                            ? bodyStyle.width - childStyle.left + 'px'
                            : undefined,
                    overflowX: contentStyle.width > bodyStyle.width - childStyle.left ? 'scroll' : undefined
                });
            } else if (placement.indexOf('Right') >= 0) {
                // 弹窗位于child上右、下右
                Object.assign(autoSize, {
                    maxWidth: childStyle.right + 'px',
                    width: contentStyle.width > childStyle.right ? childStyle.right + 'px' : undefined,
                    overflowX: contentStyle.width > childStyle.right ? 'scroll' : undefined
                });
            }

            setAutoSizeStyle(autoSize);

            // 修正RcTooltip左右自适应非选择较大可用区域bug
            let disableLeftAdjustX =
                contentStyle.width > availableSpace.left &&
                availableSpace.left > availableSpace.right &&
                placement.indexOf('left') >= 0;
            let disableRightAdjustX =
                contentStyle.width > availableSpace.right &&
                availableSpace.left < availableSpace.right &&
                placement.indexOf('right') >= 0;
            if (disableLeftAdjustX || disableRightAdjustX) {
                initPlacementsMap[placement].overflow!.adjustX = 0;
                setPlacementsMap(initPlacementsMap);
            }

            // 修正RcTooltip上下自适应非选择较大可用区域bug
            let disableTopAdjustY =
                contentStyle.height > availableSpace.top &&
                availableSpace.top > availableSpace.bottom &&
                placement.indexOf('top') >= 0;
            let disableBottomAdjustY =
                contentStyle.height > availableSpace.bottom &&
                availableSpace.top < availableSpace.bottom &&
                placement.indexOf('bottom') >= 0;
            if (disableTopAdjustY || disableBottomAdjustY) {
                initPlacementsMap[placement].overflow!.adjustY = 0;
                setPlacementsMap(initPlacementsMap);
            }
        }
    }, [
        props.placement,
        props.builtinPlacements,
        props.arrowPointAtCenter,
        props.autoAdjustOverflow,
        props.title,
        props.overlay,
        props.overlayMaxHeight,
        tempVisible,
        dir
    ]);

    formattedOverlayInnerStyle = {
        maxHeight: '100vh',
        ...autoSizeStyle,
        ...formattedOverlayInnerStyle,
        ...autoHeightStyle
    };

    const isEdge = !!(
        arrowContentStyle?.top ||
        arrowContentStyle?.bottom ||
        arrowContentStyle?.left ||
        arrowContentStyle?.right
    );
    let adapterNid = getNid(props) // 适配nid、uitype

    const placement = dir === 'rtl' && props.placement ? rtlPositionMap[props.placement] : props.placement


    return (
        <RcTooltip
            {...omit(props, [
                'onOpenChange',
                'mouseEnterDelay',
                'mouseLeaveDelay',
                'inverse',
                'onMouseLeave',
                'maskClosable',
                'rootClose',
                'hideArrow',
                'overlayMaxHeight'
            ])}
            placement={placement}
            // placement={placementVal}
            overlayStyle={{
                ...(color ? {[`--${prefixCls}-custom-color`]: color} : {}), // 用户自定义color作为变量传给css
                ...props.style,
                ...props.overlayStyle
            }}
            prefixCls={prefixCls}
            onMouseLeave={onMouseLeaveCallback}
            maskClosable={maskClosableFlag}
            mouseEnterDelay={timer}
            mouseLeaveDelay={mouseLeaveDelayTimer}
            overlayClassName={customOverlayClassName + (isEdge ? ` ${prefixCls}-isEdge` : '')}
            getTooltipContainer={getPopupContainerDomFn}
            ref={ref}
            builtinPlacements={placementsMap}
            overlay={getOverlay}
            visible={tempVisible}
            onVisibleChange={onVisibleChange}
            onPopupAlign={onPopupAlign}
            overlayInnerStyle={formattedOverlayInnerStyle}
            arrowContent={
                !hideArrow ? resizable ? null : <span ref={arrowDom} className={`${prefixCls}-arrow-content`} style={arrowContentStyle} /> : null
            }
            motion={{
                motionDeadline: 10
            }}
        >
            {tempVisible
                ? cloneElement(child, {
                    className: childCls,
                    [`date-for-${prefixCls}`]: childDataId,
                    ref: props.autoAdjustOverflowHeight ? childRef : child?.ref,
                    domkey: `tooltip${tooltipKey}`,
                    ...adapterNid
                })
                : cloneElement(child, {
                    [`date-for-${prefixCls}`]: childDataId,
                    ref: props.autoAdjustOverflowHeight ? childRef : child?.ref,
                    domkey: `tooltip${tooltipKey}`,
                    ...adapterNid
                })}
        </RcTooltip>
    );
});

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
    placement: DEFAULT_PLACEMENT, // 气泡框位置
    trigger: 'hover', // 触发行为，可选 hover | focus | click | contextMenu，可使用数组设置多个触发行为
    mouseEnterDelay: 0.5,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false, // 箭头是否指向目标元素中心, dmeo中自行填加吧
    autoAdjustOverflow: true, // 气泡被遮挡时自动调整位置
    overlayMaxHeight: false, // 内容溢出时设置max-height和overflow:scroll
    destroyTooltipOnHide: true, // 关闭后是否销毁 Tooltip
    hideArrow: false, // 是否显示箭头
    autoAdjustOverflowHeight: false
};

export default Tooltip;
