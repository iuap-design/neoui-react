/**
* This source code is quoted from rc-tabs.
* homepage: https://github.com/react-component/tabs
*/
import React from 'react';
// import PropTypes from 'prop-types';
import classnames from 'classnames';
import { setTransform, isTransformSupported, getLeft, getTop, getActiveIndex, requestAnimationFrame } from './utils';
import { InkTabBarNodeProps } from './iTabs'

function getChildrenNode(elem: any) {
    let selectValue: any = null
    const dep = (options: any) => {
        if (options?.length === 0) {
            return
        }
        for (let i = 0; i < (options as any)?.length; i++) {
            if (options[i]?.classList?.value?.includes('wui-tabs-text-content')) {
                selectValue = options![i];
                break
            }
            if (options![i]?.childNodes?.length) {
                dep(options![i]?.childNodes)
            }
        }
    }
    dep(elem.childNodes)
    return selectValue;
}

function componentDidUpdate(component: any, init?: boolean) {
    const { styles, panels, activeKey, dir: direction, type, dragable, clsPrefix, items } = component?.props;
    const rootNode = component?.props.getRef('root');
    const wrapNode = component.props.getRef('nav') || rootNode;
    const inkBarNode = component.props.getRef('inkBar');
    // const activeTab = component.props.getRef('activeTab');
    let activeTab = null;
    const inkBarNodeStyle = inkBarNode.style;
    const tabBarPosition = component.props.tabBarPosition;
    // const activeIndex = getActiveIndex(panels, activeKey);
    let activeIndex = -1
    if (items && items?.length > 0) {
        items?.map((item: {key: string, tab: any, children: any}, index: number) => {
            if (item?.key === activeKey) {
                activeIndex = index
            }
        })
    } else {
        activeIndex = getActiveIndex(panels, activeKey);
    }
    if (dragable) { // 拖拽时让tabs的状态跟个改变
        let curNum = 0
        if (items && items?.length > 0) {
            items?.forEach((item: Record<string, unknown>, index: number) => {
                if (component.props.activeKey == item.key) {
                    curNum = index
                }
            })
        } else {
            component.props.panels?.forEach((item: Record<string, unknown>, index: number) => {
                if (component.props.activeKey == item.key) {
                    curNum = index
                }
            })
        }
        activeTab = wrapNode.querySelectorAll(`.${clsPrefix}-tab`)[curNum];
    } else {
        activeTab = component.props.getRef('activeTab');
    }
    // const activeTab = document.querySelectorAll('.wui-tabs-tab')[panels.findIndex((item,index) => {return })];
    if (init) {
    // prevent mount animation
        inkBarNodeStyle.display = 'none';
    }
    if (activeTab && (type == 'simple' || type == 'trangle' || type == 'fill-line')) { // 只有line、trangle类型的tabs存在下划线或小三角元素，其他tabs类型不存在此元素不需要计算
        const tabNode = getChildrenNode(activeTab) || activeTab;
        const transformSupported = isTransformSupported(inkBarNodeStyle);

        // Reset current style
        // 场景：当页签（可能不是tinper页签）包裹line或者trangle类型页签（tinper页签,并且是三个页签拼凑成一个页签使用，用第一个页签头，内部两个页签添加内容）时，切换父级页签时会给不显示的页签父级添加display：none时，之后在resize页面会进行从新计算，因display为none取到的值都为0，计算不准所以这里如果宽度为0不做计算保持原值
        if (tabNode?.offsetWidth === 0 && type !== 'fill-line') return
        setTransform(inkBarNodeStyle, '');
        inkBarNodeStyle.width = '';
        inkBarNodeStyle.height = '';
        inkBarNodeStyle.left = '';
        inkBarNodeStyle.top = '';
        inkBarNodeStyle.bottom = '';
        inkBarNodeStyle.right = '';
        if (tabBarPosition === 'left' || tabBarPosition === 'right') {
            let top = getTop(tabNode, wrapNode);

            // let height = tabNode.offsetHeight;
            let height = tabNode.offsetHeight == 0 ? parseFloat(tabNode.getAttribute('tabheight')) : tabNode.offsetHeight
            tabNode.setAttribute('tabheight', height)
            // tabNode.style.height = height + 'px'
            if (styles.inkBar && styles.inkBar.height !== undefined) {
                height = parseFloat(styles.inkBar.height);
                if (height) {
                    top += (tabNode.offsetHeight - height) / 2;
                }
            }
            if (transformSupported) {
                setTransform(inkBarNodeStyle, `translate3d(0,${top}px,0)`);
                inkBarNodeStyle.top = '3px';
            } else {
                inkBarNodeStyle.top = `${top}px`;
            }
            inkBarNodeStyle.height = `${parseFloat(getComputedStyle(tabNode).height)}px`;
        } else {
            // const isFirstTab = tabNode.previousSibling === null
            // const isSimpleTabs = type === 'simple'
            const isTrangleTabs = type === 'trangle'
            const tabBarNodeWidth = isTrangleTabs ? 12 : 24
            let left = getLeft(tabNode, wrapNode);
            if (getChildrenNode(activeTab)) {
                left = tabNode.getBoundingClientRect().x - wrapNode.getBoundingClientRect().x
            }
            let width = tabNode.offsetWidth == 0 ? parseFloat(tabNode.getAttribute('tabwidth')) : tabNode.offsetWidth
            tabNode.setAttribute('tabwidth', isNaN(width) ? 60 : width) // offsetwidth计算的宽度四舍五入，会存在零点几的误差，设置宽度属性会有误差，设置标识属性
            // let leftOffset = parseInt(String(width - tabBarNodeWidth)) / 2 // simple类型tabs加padding-left，偏移量正常
            let leftOffset = 0
            if (type == 'simple' || type == 'fill-line') {
                // if (width - 16 <= 70) { // tabs头宽度小于70时，偏移量为左padding值
                //     leftOffset = 8
                //     inkBarNodeStyle.width = (width - 16) + 'px'
                // } else { // tabs头宽度最大为70
                //     leftOffset = parseInt(String(width - 70)) / 2
                //     inkBarNodeStyle.width = 70 + 'px'
                // }
                if (width - 24 - 16 < 26) { // 下横线宽度最小值为26
                    // leftOffset = 20
                    leftOffset = parseInt(String(width - 26)) / 2
                    inkBarNodeStyle.width = 26 + 'px'
                } else if (width - 24 - 16 >= 26 && width - 24 - 16 <= 82) {
                    leftOffset = 20
                    inkBarNodeStyle.width = width - 24 - 16 + 'px'
                } else { // 下横线宽度最大值为82
                    leftOffset = parseInt(String(width - 82)) / 2
                    inkBarNodeStyle.width = 82 + 'px'
                }
            } else {
                leftOffset = parseInt(String(width - tabBarNodeWidth)) / 2
            }
            // let leftOffset = (isFirstTab && isSimpleTabs) ? 0 : parseInt(width - tabBarNodeWidth) / 2 // simple类型的tabs的第一个tab没有padding-left，偏移量也是0
            // If tabNode'width width equal to wrapNode'width when tabBarPosition is top or bottom
            // It means no css working, then ink bar should not have width until css is loaded
            // Fix https://github.com/ant-design/ant-design/issues/7564
            if (width === rootNode.offsetWidth) {
                width = 0;
            } else if (styles.inkBar && styles.inkBar.width !== undefined) {
                width = parseFloat(styles.inkBar.width);
                if (width) {
                    left += (tabNode.offsetWidth - width) / 2;
                }
            }
            // if (isFirstTab && isSimpleTabs) {
            //   left = (width - getStyle(tabNode, 'padding-right') - tabBarNodeWidth) / 2
            // }
            // use 3d gpu to optimize render
            if (transformSupported) {
                setTransform(inkBarNodeStyle, `translate3d(${direction === 'rtl' ? -(left + leftOffset) : (left + leftOffset)}px,0,0)`);
            } else {
                inkBarNodeStyle[direction === 'rtl' ? "right" : "left"] = `${left + leftOffset}px`;
            }
        }
    }
    inkBarNodeStyle.display = activeIndex !== -1 ? 'block' : 'none';
}

const defaultProps = {
    clsPrefix: '',
    inkBarAnimated: true,
    styles: {},
    saveRef: () => {
    },
};
export default class InkTabBarNode extends React.Component<InkTabBarNodeProps> {
    timeout: any;
    static defaultProps = defaultProps
    componentDidMount() {
        this.timeout = setTimeout(() => {
            componentDidUpdate(this, true);
        }, 0);
    }

    componentDidUpdate() {
        requestAnimationFrame(() => componentDidUpdate(this))
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const {clsPrefix, styles, inkBarAnimated} = this.props;
        const className = `${clsPrefix}-ink-bar`;
        const classes = classnames({
            [className]: true,
            [
            inkBarAnimated ?
          `${className}-animated` :
          `${className}-no-animated`
            ]: true,
        });
        return (
            <div
                // @ts-ignore
                style={styles.inkBar}
                className={classes}
                key="inkBar"
                ref={this.props.saveRef!('inkBar')}
            />
        );
    }
}

// InkTabBarNode.propTypes = {
//     clsPrefix: PropTypes.string,
//     styles: PropTypes.object,
//     inkBarAnimated: PropTypes.bool,
//     saveRef: PropTypes.func,
//     direction: PropTypes.string,
// };

// InkTabBarNode.defaultProps = {
//     clsPrefix: '',
//     inkBarAnimated: true,
//     styles: {},
//     saveRef: () => {
//     },
// };
