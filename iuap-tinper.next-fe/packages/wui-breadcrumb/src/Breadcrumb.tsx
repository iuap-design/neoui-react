import classnames from 'classnames';
// import PropTypes from 'prop-types';
import omit from 'omit.js';
import React, { isValidElement, ReactElement } from 'react';
import {WebUI, fillSpace as fillSpaceFunc, getNid} from "../../wui-core/src/index"
import Dropdown from '../../wui-dropdown/src/index';
import Menu from '../../wui-menu/src/index';
import BreadcrumbItem from './BreadcrumbItem';
import { BreadcrumbProps, BreadcrumbState } from './iBreadcrumb';

const { Item, SubMenu } = Menu;

// export const propTypes = {
//     className: PropTypes.string,
//     clsPrefix: PropTypes.string,
//     onClick: PropTypes.func,
//     separator: PropTypes.node,
//     style: PropTypes.object,
//     fieldid: PropTypes.string,
// }
/**
 * 获取需要隐藏节点的开始和结束下标
 * overflowWidth 需要隐藏的宽度
 * itemWidthArr 每个节点宽度的集合
 * _index 开始隐藏节点的下表
*/
const getOverflowItemsIndex = (overflowWidth: number, itemWidthArr: number[], _index: number = 0, maxWidth:number) => {
    const rangeArr = [0];
    itemWidthArr = itemWidthArr.slice(_index);
    itemWidthArr.forEach((w, index) => {
        rangeArr.push(w + rangeArr[index]);
    });
    let _nextIndex = 0
    if (24 + itemWidthArr[itemWidthArr.length - 1] > maxWidth) { // 如果父级宽度非常小时需全部收起，之前逻辑存在问题， 24为收起图标的宽度
        _nextIndex = rangeArr?.length
    } else {
        _nextIndex = rangeArr.findIndex(num => num > overflowWidth + 38 + 5); // 5像素误差
    }
    // const _nextIndex = rangeArr.findIndex(num => num > overflowWidth + 38 + 5); // 5像素误差
    return _nextIndex ? [_index, _nextIndex] : [];
}

export const defaultProps = {
    separator: '/',
    fillSpace: false,
}

@WebUI({name: "breadcrumb", defaultProps})
class Breadcrumb extends React.Component<BreadcrumbProps, BreadcrumbState> {
    static Item: typeof BreadcrumbItem;
    // 所有孩子节点宽度总和
    allChildNodesWidth: number = 0;
    // 所有孩子节点宽度
    childNodesWidthArr: number[] = [];
    // 需要隐藏节点下标数组
    overflowIndex: number[] = [];
    myRef: HTMLOListElement | null = null;
    constructor(props: BreadcrumbProps) {
        super(props);
        this.state = {
            fillSpaceStyle: {},
            activeKey: props.activeKey
        }
    }

    componentDidMount() {
        if (this.props.fillSpace) {
            this.setWidthByfillSpace(true);
            window.addEventListener('resize', this.setWidthByfillSpace);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: BreadcrumbProps) {
        // 当children 发生改变 重置this.overflowIndex
        if (nextProps.children !== this.props.children && nextProps.fillSpace) {
            let allChildNodesWidth = 0;
            const childNodes = Array.prototype.slice.call(this.myRef?.childNodes);
            childNodes?.forEach((childNode: any) => {
                const width = childNode.offsetWidth;
                allChildNodesWidth += width
            })
            if (allChildNodesWidth != 0) {
                this.overflowIndex = [];
            }
        }
        if ('activeKey' in nextProps && this.props.activeKey != nextProps.activeKey) {
            this.setState({
                activeKey: nextProps.activeKey
            })
        }
    }

    componentDidUpdate(prevProps: BreadcrumbProps) {
        if (prevProps.children !== this.props.children && this.props.fillSpace) {
            this.setWidthByfillSpace(true);
        }
    }

    componentWillUnmount() {
        if (this.props.fillSpace) {
            window.removeEventListener('resize', this.setWidthByfillSpace);
        }
    }


    setWidthByfillSpace = (flag: any) => {
        const { fillSpace } = this.props;
        fillSpaceFunc(this.myRef!, undefined, (_element, _parent, _noPaddingMaxW) => {
            // 当fillSpace 小于 父节点宽度，则最大展示区宽度以父节点为准
            // let maxWidth: number = typeof fillSpace === 'number' && fillSpace < _noPaddingMaxW ?  fillSpace : _noPaddingMaxW;
            let maxWidth: number = 0;
            if (typeof fillSpace === 'number') {
                if (isNaN(_noPaddingMaxW)) {
                    maxWidth = fillSpace
                } else {
                    if (fillSpace < _noPaddingMaxW) {
                        maxWidth = fillSpace
                    } else {
                        maxWidth = _noPaddingMaxW
                    }
                }
            } else {
                maxWidth = _noPaddingMaxW
            }
            this.getAllChildNodesWidth(maxWidth, flag)
        })
    }

    /**
     * 根据面包屑节点和展示宽度计算overflowIndex
     * @params
     * maxWidth 面包屑可展示最大宽度
     * flag 是否重新计算节点宽度(当面包屑孩子节点发生变化为true)
    */
    getAllChildNodesWidth = (maxWidth: number, flag?: boolean) => {
        if (flag && typeof flag === 'boolean') {
            // 重置数据
            this.childNodesWidthArr = [];
            this.allChildNodesWidth = 0;
            const childNodes = Array.prototype.slice.call(this.myRef?.childNodes);
            childNodes.forEach((childNode: any) => {
                const width = childNode.offsetWidth;
                this.childNodesWidthArr.push(width)
                this.allChildNodesWidth += width
            })
        }
        maxWidth = isNaN(maxWidth) ? 0 : maxWidth

        // 内容宽度需去除元素padding,_noPaddingMaxW包含padding
        let elementPaddingLeft: string | number = getComputedStyle(this.myRef!, null).paddingLeft;
        elementPaddingLeft = elementPaddingLeft.match(/\d+/) ? Number(elementPaddingLeft.match(/\d+/)![0]) : 0;
        // 留5px 像素误差
        if (this.allChildNodesWidth + 5 > maxWidth - elementPaddingLeft * 2) {
            const widthRange = this.allChildNodesWidth - (maxWidth - elementPaddingLeft * 2);
            this.overflowIndex = getOverflowItemsIndex(widthRange, this.childNodesWidthArr, 0, maxWidth);
        } else {
            if (this.allChildNodesWidth !== 0) {
                this.overflowIndex = []
            }
        }
        this.setState({
            fillSpaceStyle: { maxWidth: `${maxWidth}px` },
        })

    }

    onItemClick = (e: React.MouseEvent, key: string) => {
        let {onClick} = this.props
        // this.setState({
        //     activeKey: v
        // })
        onClick && onClick(e, key)
    }

    onItemStrClick = (e: React.MouseEvent) => {
        let {onClick} = this.props
        onClick && onClick(e)
    }

    onSelect = (v: any) => {
        let {onClick} = this.props
        onClick && onClick(v.domEvent, v.key)
    }


    renderChilren = () => {
        const { children, separator, fillSpace, clsPrefix } = this.props;
        let {activeKey} = this.state
        let childNodes: any[] = []
        React.Children.forEach(children, (item: React.ReactChild) => {
            // 兼容item 为null 或字符串情况
            if (!item) return;
            // @ts-ignore
            const {key: itemKey} = item;
            if (typeof item === 'string') {
                childNodes.push(<li onClick={this.onItemStrClick}>{item}</li>)
                return <li onClick={this.onItemStrClick}>{item}</li>
            }
            if (isValidElement(item) && item.props && 'separator' in (item as ReactElement).props) {
                let childrenProps1 = {onItemClick: this.onItemClick, keyValue: itemKey, isActiveKey: activeKey === itemKey, activeKey}
                childNodes.push(React.cloneElement(item, childrenProps1))
                return item
            }
            let childrenProps = {'separator': separator, onItemClick: this.onItemClick, keyValue: itemKey, isActiveKey: activeKey === itemKey, activeKey}
            // if (!this.props.onClick) {
            //     childrenProps = {'separator': separator, keyValue: itemKey, isActiveKey: activeKey === itemKey, activeKey, ref: this.childrenRef}
            // }
            // console.log('=====item3', React.cloneElement(item as React.ReactElement, childrenProps))
            childNodes.push(React.cloneElement(item as React.ReactElement, childrenProps))
            return React.cloneElement(item as React.ReactElement, childrenProps)
        });
        // console.log('childrenNodes', childNodeArr)
        // fillSpace为true且有需要隐藏的overflowIndex，则隐藏，下拉展示
        if (fillSpace && childNodes && this.overflowIndex.length > 0) {
            const omitItems = childNodes.slice(...this.overflowIndex);
            // console.log('menuItem', omitItems, childNodeArr, this.overflowIndex)
            const dropdownMenu = (
                <Menu onSelect={this.onSelect}>
                    {
                        omitItems.map(item => {
                            // 兼容item 使用下拉内容情况
                            if (item && 'overlay' in item.props) {
                                return (<SubMenu title={item.props.children} key={item.key}>
                                    {item.props.overlay.props.children}
                                </SubMenu>)
                            }
                            return (<Item key={item.key}>{item.props.children}</Item>)
                        })
                    }
                </Menu>
            )
            const overflowNode = (
                <Dropdown key="dropdown" overlayClassName={`${clsPrefix}-dropdown`} className={`${clsPrefix}-overflow`} overlay={dropdownMenu}>
                    <BreadcrumbItem separator={separator} key="overflow">
                        ···
                    </BreadcrumbItem>
                </Dropdown>
            )
            childNodes?.splice(this.overflowIndex[0], this.overflowIndex[1] - this.overflowIndex[0], overflowNode)
        }
        return childNodes ? [...childNodes] : null;
    }


    render() {
        const {className, clsPrefix, separator, children, style = {}, ...others} = this.props;
        const { fillSpaceStyle } = this.state;
        const childNodes = this.renderChilren();
        let adapterNid = getNid(this.props)
        return (
            <ol
                {...omit(others, ['fillSpace', 'onClick'])}
                ref={ref => this.myRef = ref}
                className={classnames(className, clsPrefix)}
                style={{...fillSpaceStyle, ...style}}
                {...adapterNid}
            >
                {childNodes}
            </ol>
        );
    }
}

// Breadcrumb.propTypes = propTypes;
Breadcrumb.Item = BreadcrumbItem;
export default Breadcrumb;
