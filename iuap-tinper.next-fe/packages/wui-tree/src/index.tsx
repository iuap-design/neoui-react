// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {WebUI} from "../../wui-core/src/index"
import animation from './openAnimation';
import RcTree from './Tree';
import TreeNode from './TreeNode';
import { TreeProps, TreeData } from './iTree';
import { isLazyLoad, filterTreeData } from './util';

// const TreeProps = {
//     showLine: PropTypes.bool,
//     className: PropTypes.string,
//     /** 是否支持多选 */
//     multiple: PropTypes.bool,
//     /** 是否自动展开父节点 */
//     autoExpandParent: PropTypes.bool,
//     /** checkable状态下节点选择完全受控（父子节点选中状态不再关联）*/
//     checkStrictly: PropTypes.bool,
//     /** 是否支持选中 */
//     checkable: PropTypes.bool,
//     /** 默认展开所有树节点 */
//     defaultExpandAll: PropTypes.bool,
//     /** 默认展开指定的树节点 */
//     defaultExpandedKeys: PropTypes.array,
//     /** （受控）展开指定的树节点 */
//     expandedKeys: PropTypes.array,
//     /** （受控）选中复选框的树节点 */
//     checkedKeys: PropTypes.oneOfType([
//         PropTypes.array,
//         PropTypes.object
//     ]),
//     /** 默认选中复选框的树节点 */
//     defaultCheckedKeys: PropTypes.array,
//     /** （受控）设置选中的树节点 */
//     selectedKeys: PropTypes.array,
//     /** 默认选中的树节点 */
//     defaultSelectedKeys: PropTypes.array,
//     /** 展开/收起节点时触发 */
//     onExpand: PropTypes.func,
//     /** 点击复选框触发 */
//     onCheck: PropTypes.func,
//     /** 点击树节点触发 */
//     onSelect: PropTypes.func,
//     /** filter some AntTreeNodes as you need. it should return true */
//     filterAntTreeNode: PropTypes.func,
//     /** 异步加载数据 */
//     loadData: PropTypes.func,
//     /** 响应右键点击 */
//     onRightClick: PropTypes.func,
//     /** 设置节点可拖拽（IE>8）*/
//     draggable: PropTypes.bool,
//     /** 开始拖拽时调用 */
//     onDragStart: PropTypes.func,
//     /** dragenter 触发时调用 */
//     onDragEnter: PropTypes.func,
//     /** dragover 触发时调用 */
//     onDragOver: PropTypes.func,
//     /** dragleave 触发时调用 */
//     onDragLeave: PropTypes.func,
//     /** drop 触发时调用 */
//     onDrop: PropTypes.func,
//     style: PropTypes.object,
//     clsPrefix: PropTypes.string,
//     filterTreeNode: PropTypes.func
// }

interface TreeState {
    treeData?: TreeData[],
    filterValue?: string,
    originTreeData?: TreeData[]
}

const defaultProps = {
    clsPrefix: 'wui-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
}
function isUndefined(value: any) {
    return value === undefined
}
@WebUI({name: "tree", defaultProps})
class Tree extends Component<TreeProps, TreeState> {
    static defaultProps = {...defaultProps}
    constructor(props: TreeProps) {
        super(props)
        this.state = {
            treeData: props.treeData,
            filterValue: undefined,
            originTreeData: props.treeData,
        }
    }

    static getDerivedStateFromProps(nextProps: TreeProps, prevState: TreeState) {
        if ('filterValue' in nextProps
            && 'treeData' in nextProps
            && nextProps.treeData
            && nextProps.filterValue !== undefined
            // filterValue改变或者用户treeData发生改变
            && (nextProps.filterValue !== prevState.filterValue || prevState.originTreeData !== nextProps.treeData)) {
            const treeData = filterTreeData(nextProps.treeData, nextProps.filterValue as string, nextProps)
            return {
                treeData,
                filterValue: nextProps.filterValue as string,
                originTreeData: nextProps.treeData
            }
        }
        if ('treeData' in nextProps && nextProps.treeData !== prevState.originTreeData) {
            return {
                ...prevState,
                treeData: nextProps.treeData,
                originTreeData: nextProps.treeData
            }
        }
        return null;
    }

    render() {
        // const props = this.props;
        const {
            rootClassName,
            className,
            rootStyle,
            style,
            virtual,
            lazyLoad,
            children,
            ...props
        } = this.props;
        const { treeData } = this.state;
        const extral = {
            className: isUndefined(className) ? rootClassName : className,
            style: isUndefined(style) ? rootStyle : style,
            lazyLoad: isUndefined(lazyLoad) ? isUndefined(virtual) ? isLazyLoad(treeData) : virtual : lazyLoad,
            // openIcon: 'switcherIcon', // 自定义展开节点图标的名称 (switcherIcon为自定义树节点的展开/折叠图标) -- 未兼容
            // closeIcon: 'switcherIcon', // 自定义关闭节点图标的名称 -- 未兼容

        }
        let checkable = props.checkable;
        return (
            <RcTree
                {...extral}
                {...props}
                checkable={checkable ? (<span className={`${props.clsPrefix}-checkbox-inner`}/>) : checkable}
                treeData={treeData}
            >
                {children}
            </RcTree>
        );
    }
}

export type TreeType = typeof Tree
type TreeNodeType = typeof TreeNode

export interface TreeInterface extends TreeType {
    TreeNode: TreeNodeType
}

const TreeWrapper = Tree as TreeInterface
TreeWrapper.TreeNode = TreeNode
export default TreeWrapper
