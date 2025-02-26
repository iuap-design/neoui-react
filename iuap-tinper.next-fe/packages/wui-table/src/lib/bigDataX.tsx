/*
 * @Author: Mr.mjc
 * @Date: 2022-06-15 17:39:30
 * @LastEditors: MJC
 * @LastEditTime: 2024-08-20 19:50:52
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/lib/bigDataX.tsx
 */
// import PropTypes from "prop-types";
import React, {Component} from "react";
import Table from '../IsSticky';
import {arrayMoveTo, checkIsTreeType, getValueByRowKey, arrayTreeMoveTo} from "./util";
import {convertListToTree, mergeObjectsWithNonEnumerableProps} from "./utils";
import { Key, DefaultRecordType } from '../interface';
import { TableProps, IBigDataXState } from '../iTable';
import { TableInterface } from "../index";
// @ts-ignore
const DEFAULT_ROW_HEIGHT = (Table && Table.defaultProps && Table.defaultProps.height) || 35;// 缺省的默认行高

// 确保索引不超出数据范围
function validIndex(totalCount: number, currentIndex: number) {
    let cursorIndex = currentIndex || 0;
    if (currentIndex < 0) cursorIndex = 0; // 确保不小于0
    if (currentIndex > totalCount - 1) cursorIndex = totalCount - 1; // 确保不超出总数据行
    return cursorIndex;
}

/**
 * 获取数据开始和结束的索引位置
 * @param totalCount      数据总行数
 * @param showCount       可视区域显示的总行数
 * @param hiddenCount     单个缓冲区隐藏的行数
 * @param currentIndex     可视区域显示的首行索引(游标)
 * @return {Array}
 */
function computeIndex(totalCount: number, showCount: number, hiddenCount: number, currentIndex: number) {
    let screenCount = showCount + hiddenCount * 2;// 渲染的总行数
    let startIndex = 0, endIndex = 0;
    let cursorIndex = validIndex(totalCount, currentIndex);
    if (totalCount <= screenCount) { // 总数不足或刚好一屏
        startIndex = 0;
        endIndex = totalCount > 1 ? totalCount - 1 : 1;// 注意只有1行的场景
    } else {// 总数超过一屏
        if (cursorIndex == 0) {// 等于总数据顶边界
            startIndex = 0;
            endIndex = screenCount - 1;
        } else if (cursorIndex == totalCount - 1) {// 等于总数据底边界
            endIndex = totalCount - 1;
            startIndex = endIndex - screenCount;
        } else {
            startIndex = cursorIndex - (hiddenCount - 1);
            if (startIndex < 0) startIndex = 0; // 注意上行有计算出为负值的情况
            endIndex = startIndex + (screenCount - 1);
        }
        if (endIndex < 0) endIndex = 0;// 确保结束位置区间不越界
        // 如果结束位置超过总记录数，则把超过的部分在开始位置往前移动
        if (endIndex > totalCount - 1) {
            startIndex = startIndex - (endIndex - (totalCount - 1));
            endIndex = totalCount - 1;
        }
        if (startIndex < 0) startIndex = 0;// 确保开始位置区间不越界

    }
    return {screenCount, startIndex, endIndex};
}

// 获取每行默认高度
function getDefaultRowHeight(nextProps: TableProps) {
    const rowHeight = nextProps.height ? nextProps.height : DEFAULT_ROW_HEIGHT;
    return rowHeight;
}

// 获取显示在可视区域的行数
function getShowCount(nextProps: TableProps) {
    const scrollY = nextProps.scroll && nextProps.scroll.y ? parseInt(nextProps.scroll.y + '') : 0; // 默认可视区域高度
    const rowHeight = getDefaultRowHeight(nextProps); // 默认每行高度
    const showCount = scrollY && rowHeight ? Math.floor(scrollY / rowHeight) : 20;
    return showCount;
}

// 新重构版bigData
export default function bigDataX(Table: React.ComponentClass<Partial<TableProps>> | TableInterface) {
    return class BigDataX extends Component<TableProps, IBigDataXState> {
		static defaultProps = {
		    data: [],
		    loadBuffer: 50, // 单个缓冲区大小，缓冲区有前后两个区，所以总缓冲区是x2
		    rowKey: "key",
		    onExpand() {
		    },
		    scroll: {},
		    currentIndex: -1,
		    isTree: null,
		    height: null
		};
		currentIndex: number;
		expandedRowKeys: Key[];
		cachedRowHeight: Record<Key, number>;
		flatTreeKeysMap: Record<Key, any>;
		flatTreeData: DefaultRecordType[];
		// static propTypes = {
		//     loadBuffer: PropTypes.number,
		//     height: PropTypes.number,
		//     scroll: PropTypes.any,
		//     expandedRowKeys: PropTypes.string,
		//     rowKey: PropTypes.string,
		//     currentIndex: PropTypes.number,
		//     isTree: PropTypes.bool,
		//     data: PropTypes.any,
		//     onExpandedRowsChange: PropTypes.func,
		//     onExpand: PropTypes.func,
		//     onDropRow: PropTypes.func,
		//     onDragRowStart: PropTypes.func,
		// };

		constructor(props: TableProps) {
		    super(props);
		    this.state = {
		        needRender: false,
		        scrollTop: 0,
		        showCount: getShowCount(props),
		        treeType: checkIsTreeType(props.isTree, props.data),
		    };
		    this.currentIndex = 0;
		    this.cachedRowHeight = {}; // 缓存每行的高度
		    this.expandedRowKeys = props.expandedRowKeys || [];// 缓存展开的行键值
		    this.flatTreeKeysMap = {}; // 树表，扁平结构数据的 Map 映射，方便获取各节点信息
		    this.flatTreeData = []; // 深度遍历处理后的data数组，拉平的数据，包含展开的子集行（未展开的不包含）
		    if (this.state.treeType) {
		        let deep = this.deepTraversal(props.data, null, this.expandedRowKeys);
		        this.flatTreeKeysMap = deep.flatTreeKeysMap;
		        this.flatTreeData = deep.flatTreeData;
		    }
		}

		UNSAFE_componentWillReceiveProps(nextProps: TableProps) {
		    const props = this.props;
		    const {expandedRowKeys: newExpandedKeys, data: newData} = nextProps;
		    const that = this, dataLen = newData.length;
		    let {treeType} = this.state;
		    if ('expandedRowKeys' in nextProps) {
		        this.expandedRowKeys = newExpandedKeys || [];
		    }
		    if ('isTree' in nextProps || 'data' in nextProps) {
		        treeType = checkIsTreeType(nextProps.isTree, nextProps.data);
		        this.setState({treeType})
		    }
		    if ('height' in nextProps && nextProps.height !== props.height) {
		        that.cachedRowHeight = {}; // 清除缓存每行的高度
		    }
		    // 可视滚动区域变化时
		    if ('scroll' in nextProps && nextProps.scroll.y !== props.scroll.y) {
		        that.cachedRowHeight = {}; // 清除缓存每行的高度
		        that.currentIndex = 0;
		        // 显示在可视区域的行数
		        this.setState({showCount: getShowCount(nextProps), scrollTop: 0});
		    }
		    if ('data' in nextProps) {
		        // fix: 滚动加载场景中,数据动态改变下占位计算错误的问题(26 Jun)
		        if (newData.toString() !== props.data.toString()) {
		            that.cachedRowHeight = {}; // 清除缓存每行的高度
		            if (that.state.scrollTop <= 0) { // 增加scrollTop 判断，ncc场景下滚动条不在最上层，数据变更时 会出现空白，因为重置了currentIndex没有重置滚动条
		                that.currentIndex = 0;
		            }
		        }
		        this.flatTreeKeysMap = {}; // 树表，扁平结构数据的 Map 映射，方便获取各节点信息
		        this.flatTreeData = []; // 深度遍历处理后的data数组
		        if (treeType) {
		            let deep = this.deepTraversal(newData, null, this.expandedRowKeys);
		            this.flatTreeKeysMap = deep.flatTreeKeysMap;
		            this.flatTreeData = deep.flatTreeData;
		        }
		    }
		    // 为外部定位currentIndex提供支持，以确保currentIndex行显示在可视区域
		    if ('currentIndex' in nextProps) {
		        // 如果传currentIndex，会判断该条数据是否在可视区域，如果没有的话，则重新计算startIndex和endIndex
		        if (nextProps.currentIndex !== -1) {
		            let totalCount = this.state.treeType ? this.flatTreeData.length : dataLen;
		            this.currentIndex = validIndex(totalCount, nextProps.currentIndex as number);
		            let newScrollTop = that.getSumHeight(0, this.currentIndex, this.state.treeType); // 重新设定scrollTop值
		            if (newScrollTop !== this.state.scrollTop) {
		                this.setState({scrollTop: newScrollTop})
		            }
		        }
		    }
		}

		/**
		 * 深度遍历树形 data，把数据拍平，变为一维数组
		 * @param {*} treeData
		 * @param {*} parentKey 标识父节点
		 * @param {*} arrData 排平后的数组数据
		 * @param {*} keyMap key与数据的关系
		 */
		deepTraversal = (treeData: DefaultRecordType[], parentKey: any = null, expandedKeys: Key[] = [], arrData?:DefaultRecordType[], keyMap?:Record<Key, any>) => {
			let {isEmptyHiddenIcon} = this.props
		    let flatTreeData = arrData || [], flatTreeKeysMap = keyMap || {},
		        dataCopy = treeData;
		    if (Array.isArray(dataCopy)) {
		        for (let i = 0, l = dataCopy.length; i < l; i++) {
		            let {children} = dataCopy[i],
		                key = this.getRowKey(dataCopy[i], i), // bugfix生成key字段，否则树无法展开
		                // _isLeaf = !(children),
						_isLeaf = !(children ? children.length > 0 ? true : !isEmptyHiddenIcon : false),
		                // 如果父节点是收起状态，则子节点的展开状态无意义。（一级节点或根节点直接判断自身状态即可）
		                isExpanded = expandedKeys.includes(key);
		            // console.log('props', props, 'dataCopyTargrt', dataCopyTargrt)
		            // let dataCopyI = Object.assign({
		            //     key,
		            //     isExpanded,
		            //     parentKey: parentKey,
		            //     _isLeaf, // 是否叶子节点
		            //     index: flatTreeData.length
		            // }, dataCopyTargrt);
		            let dataCopyI = mergeObjectsWithNonEnumerableProps({
		                key,
		                isExpanded,
		                _innerParentKey: parentKey,
		                _isLeaf, // 是否叶子节点
		                index: flatTreeData.length
		            }, dataCopy[i]);
		            delete dataCopyI.children;
		            // if(dataCopyI.children && Array.isArray(dataCopyI.children) && dataCopyI.children.length > 0){
		            // 	delete dataCopyI.children;
		            // }
		            flatTreeData.push(dataCopyI); // 取每项数据放入一个新数组
		            flatTreeKeysMap[key] = dataCopyI;

		            // 优化递归逻辑，如果当前节点是收起状态，则不遍历其子节点
		            if (Array.isArray(children) && children.length > 0 && isExpanded) {
		                this.deepTraversal(children, key, expandedKeys, flatTreeData, flatTreeKeysMap);
		            }
		        }
		    }
		    // console.log('flatTreeData', flatTreeData, 'flatTreeKeysMap', flatTreeKeysMap)
		    return {flatTreeData, flatTreeKeysMap};
		}

		/**
		 * 将截取后的 List 数组转换为 Tree 结构
		 */
		getTreeDataFromList = (treeList: DefaultRecordType[]) => {
		    // 属性配置设置
		    let attr = {id: 'key', parendId: '_innerParentKey', rootId: null, _isLeaf: '_isLeaf'};
		    let treeData = convertListToTree(treeList, attr, this.flatTreeKeysMap);
		    return treeData;
		}

		// 获取每行的唯一键
		getRowKey(record: DefaultRecordType, index: number) {
		    return getValueByRowKey(this.props.rowKey, record, index);
		}


		componentWillUnmount() {
		    this.cachedRowHeight = {}; // 缓存每行的高度
		    this.expandedRowKeys = [];// 缓存展开的行键值
		    this.flatTreeKeysMap = {}; // 树表，扁平结构数据的 Map 映射，方便获取各节点信息
		    this.flatTreeData = []; // 拉平的树表数据
		}

		// 获取当前索引行的高度
		getRowHeightByIndex = (isTreeType: boolean, index: number, defaultRowHeight: number): number => {
		    let {height, data} = this.props;
		    let currentRowHeight = height;
		    if (!height) {// 如果没有指定固定行高（即动态行高）
		        let records = isTreeType ? this.flatTreeData : data;
		        let record = records[index];
		        let key = this.getRowKey(record, index);
		        let cacheRowH = this.cachedRowHeight[key];
		        if (cacheRowH !== undefined && !!cacheRowH) {
		            currentRowHeight = cacheRowH;// 缓存中存在则使用缓存的行高
		        } else {
		            currentRowHeight = defaultRowHeight;// 如果缓存行高也不存在则使用默认行高
		        }
		    }
		    return currentRowHeight as number;
		}

		// 计算总行高
		getSumHeight(start:number, end: number, isTreeType: boolean) {
		    let defaultRowHeight = getDefaultRowHeight(this.props);
		    let sumHeight = 0;
		    for (let index = start; index < end; index++) {
		        let currentRowHeight = this.getRowHeightByIndex(isTreeType, index, defaultRowHeight);// 获取行高
		        sumHeight += currentRowHeight;
		    }
		    return sumHeight;
		}

		// 表格尺寸变化时，重新计算滚动及显示位置
		handleResize = () => {
		    let {scrollTop, treeType} = this.state;
		    this.handleScrollY(scrollTop, treeType);
		}
		/**
		 *@description  根据返回的scrollTop计算当前的索引。此处做了两次缓存一个是根据上一次的currentIndex计算当前currentIndex。另一个是根据当前内容区的数据是否在缓存中如果在则不重新render页面
		 *@param 最新一次滚动的scrollTop
		 *@param treeType是否是树状表
		 *@param callback表体滚动过程中触发的回调
		 */
		handleScrollY = (nextScrollTop: number, _treeType: boolean, callback?: (nextScrollTop?: number) => void) => {
		    const defaultRowHeight = getDefaultRowHeight(this.props);
		    let tempScrollTop = nextScrollTop;
		    let {data} = this.props;
		    const { treeType } = this.state;
		    let records = treeType ? this.flatTreeData : data;
		    let index = 0; // 滚动后的位置索引
		    while (tempScrollTop > 0 && index < records.length) {
		        let currentRowHeight = this.getRowHeightByIndex(treeType, index, defaultRowHeight);// 获取行高
		        tempScrollTop -= currentRowHeight;
		        if (tempScrollTop > -1) {// 确保scrollTop存在小数误差1px的情况也能正确取值
		            index += 1;
		        }
		    }
		    // console.log('AAA-->newIndex****',index);
		    // 如果之前的索引和下一次的不一样则更新索引和滚动的位置
		    if (this.currentIndex !== index) {
		        this.currentIndex = index;
		    }
		    this.setState({scrollTop: nextScrollTop});
		    callback && callback(nextScrollTop)
		};

		setRowHeight = (height: number, _index: number = 0, rowKey: Key) => {
		    this.cachedRowHeight[rowKey] = height;
		}

		onExpand = (expandState: boolean, record: DefaultRecordType, index: number) => {
		    const that = this;
		    let {treeType, needRender} = this.state;
		    const {data, onExpand} = this.props;
		    const rowKey = this.getRowKey(record, index);

		    // 滚动加载expandedRowKeys自己维护，否则有展开不全的问题
		    if (!this.props.expandedRowKeys) {
		        if (expandState) { // 展开
		            this.expandedRowKeys.push(rowKey); // 追加折叠行key
		            this.setState({needRender: !needRender});
		        } else { // 折叠
		            this.expandedRowKeys = this.expandedRowKeys.filter((val) => val != rowKey); // 移除折叠行key
		            this.setState({needRender: !needRender});
		        }
		    }

		    // expandState为true时，记录下
		    onExpand && onExpand(expandState, record, index);

		    if (treeType) {
		        // 重新递归数据
		        let deep = this.deepTraversal(data, null, this.expandedRowKeys);
		        that.flatTreeData = deep.flatTreeData;
		        that.flatTreeKeysMap = deep.flatTreeKeysMap;
		    }

		    // 展开/折叠由于行数据变化所以得清除缓存的行高
		    this.cachedRowHeight = {};
		};

		onExpandedAll = (expanded: boolean) => {
		    let {needRender} = this.state;
		    let { onExpandAll } = this.props
		    if (expanded) {
		        this.expandedRowKeys = []
		        this.setState({needRender: !needRender});
		    } else {
		        let rows = [...(this.props.data || [])];
		        let expandedRowKeys: Key[] = [];
		        for (let i = 0; i < rows.length; i++) {
		            const row = rows[i];
		            expandedRowKeys.push(this.getRowKey(row, i));
		            rows = rows.concat(row[this.props.childrenColumnName] || []);
		        }
		        this.expandedRowKeys = expandedRowKeys
		        // this.expandedRowKeys = [2, 4]
		        this.setState({needRender: !needRender});
		    }
		    if (onExpandAll) {
		        onExpandAll(expanded, this.expandedRowKeys)
		    }
		}

		// 行拖拽-大数据表格下的实现
		__onRowDragStart = (options: DefaultRecordType) => {
		    let {dragStartKey} = options;
		    let {data} = this.props, currentIndex, record;
		    data.forEach((da, i) => {
		        // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
		        let trKey = da.key ? da.key : this.getRowKey(da, i);
		        if (trKey == dragStartKey) {
		            currentIndex = i;
		            record = da;
		        }
		    });
		    this.props.onDragRowStart && this.props.onDragRowStart(record, currentIndex);
		}

		__onRowDrop = (options: DefaultRecordType) => {
		    let {dragEnterKey, dataIndex, e} = options;
		    let {data} = this.props, currentIndex, record;
		    data.forEach((da, i) => {
		        // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
		        let trKey = da.key ? da.key : this.getRowKey(da, i);
		        if (trKey == dragEnterKey) {
		            currentIndex = i;
		            record = da;
		        }
		    });
		    this.props.onRowDrop && this.props.onRowDrop(record, currentIndex, dataIndex, e);
		}

		// 行拖拽-大数据表格下的实现
		__onRowDragDrop = (options: DefaultRecordType) => {
		    let { childrenColumnName = 'children', rowKey } = this.props;
		    let {dragTargetKey, dragTargetIndex, dropTargetKey, dropTargetIndex, event, treeType} = options;
		    let {data} = this.props, record: DefaultRecordType | undefined, dropRecord: DefaultRecordType | undefined;
		    // for (let i = 0; i < data.length; i++) {
		    //     let da = data[i];
		    //     // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
		    //     let trKey = da.key ? da.key : this.getRowKey(da, i);
		    //     if (trKey == dragTargetKey) {
		    //         record = da;
		    //         break; // 匹配到后则退出减少性能开销
		    //     }
		    // }
		    let getDroptarget = (dragTargetKey: Key, data: DefaultRecordType[]) => {
	            for (let i = 0; i < data.length; i++) {
	                let da = data[i];
	                let currentKey = this.getRowKey(da, i) || da.key
	                if (record && dropRecord) {
	                    break ;
	                }
	                if (currentKey == dragTargetKey) {
	                    record = da;
	                    // break; // 匹配到后则退出减少性能开销
	                }
	                if (currentKey == dropTargetKey) {
	                    dropRecord = da;
	                }
	                if (da[childrenColumnName] && Array.isArray(da[childrenColumnName]) && da[childrenColumnName].length) {
	                    getDroptarget(dragTargetKey, da[this.props.childrenColumnName])
	                }

	            }
	        }
	        getDroptarget(dragTargetKey, data)
		    if (dragTargetIndex > -1) {
		        // data = arrayMoveTo(data, dragTargetIndex, dropTargetIndex);
		        if (treeType) { // 树形数据
	                data = arrayTreeMoveTo(data, dragTargetKey, dropTargetKey, childrenColumnName, rowKey, this.expandedRowKeys);
	            } else {
	                data = arrayMoveTo(data, dragTargetIndex, dropTargetIndex);
	            }
		        this.props.onDropRow && this.props.onDropRow(data, record, dropTargetIndex, dropRecord, dropTargetIndex, event);
		        this.setState({needRender: !this.state.needRender});
		    } else {
		        this.props.onDropRow && this.props.onDropRow(data, record, dropTargetIndex, dropRecord, dropTargetIndex, event);
		    }
		}


		render() {
		    let {data, loadBuffer} = this.props;
		    loadBuffer = loadBuffer <= 0 ? 50 : loadBuffer;
		    let realData = data;
		    const {scrollTop, showCount, treeType} = this.state;
		    let expandedRowKeys = this.props.expandedRowKeys ? this.props.expandedRowKeys : this.expandedRowKeys;
		    let totalCount = treeType ? this.flatTreeData.length : realData.length;
		    let buffer = computeIndex(totalCount, showCount, loadBuffer, this.currentIndex);// 计算出缓冲区各索引值

		    const lazyLoad = {
		        startIndex: buffer.startIndex,
		        endIndex: buffer.endIndex,
		        startParentIndex: buffer.startIndex, // 为树状节点做准备
		        preHeight: 0,
		        sufHeight: 0,
		        TreeType: treeType,
		        flatTreeKeysMap: this.flatTreeKeysMap
		    };
		    lazyLoad.preHeight = this.getSumHeight(0, lazyLoad.startIndex, treeType);
		    lazyLoad.sufHeight = this.getSumHeight(lazyLoad.endIndex, totalCount - 1, treeType);
		    // console.log("AAA--->总数据："+totalCount+"渲染总行数："+buffer.screenCount+"缓冲区行数："+hiddenCount+"可视区域行数："+showCount);
		    // console.log("AAA--->startIndex:"+buffer.startIndex+"--->endIndex:"+buffer.endIndex+"--->currentIndex:"+this.currentIndex+"-->scrollTop:"+scrollTop);
		    // let dataSource = []; // 存放截取需要显示的数据
		    // if (treeType) {
		    //     let realFlatTreeData = this.flatTreeData;
		    //     let sliceTreeList = realFlatTreeData.slice(buffer.startIndex, buffer.endIndex + 1);// 从拉平的数据中截取
		    //     dataSource = this.getTreeDataFromList(sliceTreeList);// 将截取的list数据重新组织成tree结构
		    // } else {
		    //     dataSource = realData.slice(buffer.startIndex, buffer.endIndex + 1);
		    // }
		    // dataSource = showSum ? dataSource.concat(data.slice(-1)) : dataSource;
		    return (
		        <Table
		            {...this.props}
		            // data={dataSource}
		            originData={data}
		            lazyLoad={lazyLoad}
		            handleScrollY={this.handleScrollY}
		            scrollTop={scrollTop}
		            setRowHeight={this.setRowHeight}
		            // setRowParentIndex={this.setRowParentIndex}
		            onResize={this.handleResize}
		            onExpand={this.onExpand}
		            onExpandedRowsChange={this.props.onExpandedRowsChange}
		            expandedRowKeys={expandedRowKeys}
		            onRowDragStart={this.__onRowDragStart}
		            onRowDragDrop={this.__onRowDragDrop}
		            onRowDrop={this.__onRowDrop}
		            //   className={'lazy-table'}
		            onExpandAll={this.onExpandedAll}
		            data={treeType ? this.flatTreeData : realData}
		        />
		    );
		}
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
