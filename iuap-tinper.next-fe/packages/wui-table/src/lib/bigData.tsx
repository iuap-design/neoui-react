// @ts-nocheck
import PropTypes from "prop-types";
import React, {Component} from "react";
import bigDataXS from "./bigDataXS";
import {convertListToTree} from "./utils";

const defaultHeight = 30;// 缺省的默认行高
const defaultLoadCount = 26;// 缺省的每次加载行个数
// const rowDiff = 2; // 行差值
let treeTypeIndex = 0;
export default bigDataXS;// 新重构版的bigDataX
export function bigDataOld(Table) {// 暂时保留旧版本的bigData，旧版仅ncc在用
    // console.warn('旧版bigData，建议使用bigDataX');
    return class BigData extends Component {
		static defaultProps = {
		    data: [],
		    loadBuffer: 20,
		    rowKey: "key",
		    onExpand() {
		    },
		    scroll: {},
		    currentIndex: -1,
		    isTree: null
		};
		static propTypes = {
		    loadBuffer: PropTypes.number,
		    height: PropTypes.number,
		    scroll: PropTypes.any,
		    expandedRowKeys: PropTypes.string,
		    rowKey: PropTypes.string,
		    nextContext: PropTypes.any,
		    currentIndex: PropTypes.number,
		    isTree: PropTypes.bool,
		    data: PropTypes.any,
		    onExpandedRowsChange: PropTypes.func,
		};

		constructor(props) {
		    super(props);
		    this.state = {
		        scrollLeft: 0,
		        scrollTop: 0
		    };
		    // 每行默认高度
		    const rowHeight = this.props.height ? this.props.height : defaultHeight;
		    // 默认可视区域高度
		    const scrollY = this.props.scroll.y ? parseInt(this.props.scroll.y) : 0;
		    // 计算出显示到可视区域的行数
		    this.rowsInView = scrollY ? Math.floor(scrollY / rowHeight) : 20;
		    this.currentIndex = 0;
		    // 一次加载的数据行数（包含缓存的数据行）
		    this.loadCount = props.loadBuffer ? this.rowsInView + props.loadBuffer * 2 : defaultLoadCount;
		    this.cachedRowHeight = []; // 缓存每行的高度
		    this.cachedRowParentIndex = [];
		    this.expandChildRowKeys = [];
		    this.firstLevelKey = [];
		    this.keys = [];
		    this.lastScrollTop = 0;
		    this.currentScrollTop = 0;
		    this.startIndex = this.currentIndex; // 数据开始位置
		    this.endIndex = this.currentIndex + this.loadCount; // 数据结束位置
		    this.setRowHeight = this.setRowHeight.bind(this);
		    this.setRowParentIndex = this.setRowParentIndex.bind(this);
		    this.expandedRowKeys = props.expandedRowKeys || [];
		    this.flatTreeKeysMap = {}; // 树表，扁平结构数据的 Map 映射，方便获取各节点信息
		    this.flatTreeData = []; // 深度遍历处理后的data数组
		    this.treeData = []; // 树表的data数据
		}

		UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		    const props = this.props;
		    const {currentIndex, expandedRowKeys: newExpandedKeys, data: newData} = nextProps;
		    const that = this, dataLen = newData.length;
		    if ('isTree' in nextProps || 'data' in nextProps) {
		        that.treeType = that.checkIsTreeType(nextProps.isTree, nextProps.data);
		    }
		    // 可视滚动区域变化时
		    if ('scroll' in nextProps && nextProps.scroll.y !== props.scroll.y) {
		        // 每行默认高度
		        const rowHeight = nextProps.height ? nextProps.height : defaultHeight;
		        // 默认可视区域高度
		        const scrollY = nextProps.scroll.y ? parseInt(nextProps.scroll.y) : 0;
		        // 显示在可视区域的行数
		        that.rowsInView = scrollY ? Math.floor(scrollY / rowHeight) : 20;
		        // 一次加载的数据行数（包含缓存的数据行）
		        that.loadCount = props.loadBuffer ? that.rowsInView + props.loadBuffer * 2 : defaultLoadCount; // 一次加载多少数据
		        that.currentIndex = 0;
		        that.startIndex = that.currentIndex; // 数据开始位置
		        that.endIndex = that.currentIndex + that.loadCount; // 数据结束位置

		    }
		    if ('data' in nextProps) {
		        // fix: 滚动加载场景中,数据动态改变下占位计算错误的问题(26 Jun)
		        if (newData.toString() !== props.data.toString()) {
		            that.cachedRowHeight = []; // 缓存每行的高度
		            that.cachedRowParentIndex = [];
		            that.computeCachedRowParentIndex(newData, that.treeType);
		            // fix：切换数据源，startIndex、endIndex错误
		            if (that.state.scrollTop <= 0) { // 增加scrollTop 判断，ncc场景下滚动条不在最上层， 会出现空白，因为重置了currentIndex没有重置滚动条
		                that.currentIndex = 0;
		                that.startIndex = that.currentIndex; // 数据开始位置
		                that.endIndex = that.currentIndex + that.loadCount;
		            }
		        }
		        that.treeData = [];
		        that.flatTreeData = [];
		        // if(newData.length>0){
		        //   that.endIndex = that.currentIndex - nextProps.loadBuffer + that.loadCount; //数据结束位置
		        // }
		        if (that.treeType) {
		            that.getTreeData(newExpandedKeys, newData);
		        }
		    }
		    // 如果传currentIndex，会判断该条数据是否在可视区域，如果没有的话，则重新计算startIndex和endIndex
		    if (currentIndex != -1 && currentIndex !== this.currentIndex) {
		        that.setStartAndEndIndex(currentIndex, dataLen);
		    }
		}

		UNSAFE_componentWillMount() {
		    const {isTree, expandedRowKeys, data} = this.props;
		    const isTreeType = this.checkIsTreeType(isTree, data);
		    // 设置data中每个元素的parentIndex
		    this.computeCachedRowParentIndex(data, isTreeType);
		    // 如果是树表，递归data
		    if (isTreeType) {
		        this.treeType = isTreeType;
		        this.getTreeData(expandedRowKeys, data);
		    }
		}

		/**
		 * 如果是树形表，需要对传入的 data 进行处理
		 * @param expandedKeys: nextProps 中传入的新 expandedRowKeys 属性值
		 * @param newData: nextProps 中传入的新 data 属性值
		 */
		getTreeData = (expandedKeys, newData) => {
		    let {startIndex, endIndex} = this;
		    this.cacheExpandedKeys = expandedKeys && new Set(expandedKeys);
		    // 深递归 data，截取可视区 data 数组，再将扁平结构转换成嵌套结构
		    let sliceTreeList = [];
		    let flatTreeData = this.deepTraversal(newData);
		    this.flatTreeData = flatTreeData;
		    sliceTreeList = flatTreeData.slice(startIndex, endIndex);
		    this.handleTreeListChange(sliceTreeList);

		    this.cacheExpandedKeys = expandedKeys && null;
		}

		/**
		 * 深度遍历树形 data，把数据拍平，变为一维数组
		 * @param {*} data
		 * @param {*} parentKey 标识父节点
		 */
		deepTraversal = (treeData, parentKey = null) => {
		    const that = this;
		    let {cacheExpandedKeys, expandedRowKeys = [], flatTreeKeysMap} = that,
		        expandedKeysSet = cacheExpandedKeys ? cacheExpandedKeys : new Set(expandedRowKeys),
		        flatTreeData = [],
		        dataCopy = treeData;
		    if (Array.isArray(dataCopy)) {
		        for (let i = 0, l = dataCopy.length; i < l; i++) {
		            let {children, ...props} = dataCopy[i],
		                key = this.getRowKey(dataCopy[i], i), // bugfix生成key字段，否则树无法展开
		                dataCopyI = new Object(),
		                _isLeaf = !((children && children.length > 0)),
		                // 如果父节点是收起状态，则子节点的展开状态无意义。（一级节点或根节点直接判断自身状态即可）
		                isExpanded = (parentKey === null || expandedKeysSet.has(parentKey)) ? expandedKeysSet.has(key) : false;
		            dataCopyI = Object.assign(dataCopyI, {
		                key,
		                isExpanded,
		                parentKey: parentKey,
		                _isLeaf,
		                index: flatTreeData.length
		            }, {...props});

		            flatTreeData.push(dataCopyI); // 取每项数据放入一个新数组
		            flatTreeKeysMap[key] = dataCopyI;

		            // 优化递归逻辑，如果当前节点是收起状态，则不遍历其子节点
		            if (Array.isArray(children) && children.length > 0 && isExpanded) {
		                flatTreeData = flatTreeData.concat(this.deepTraversal(children, key));
		            }
		        }
		    }
		    return flatTreeData;
		}

		/**
		 * 将截取后的 List 数组转换为 Tree 结构，并更新 state
		 */
		handleTreeListChange = (treeList, startIndex, endIndex) => {
		    // 属性配置设置
		    let attr = {
		        id: 'key',
		        parendId: 'parentKey',
		        rootId: null,
		        _isLeaf: '_isLeaf'
		    };
		    let treeData = convertListToTree(treeList, attr, this.flatTreeKeysMap);

		    this.startIndex = typeof (startIndex) !== "undefined" ? startIndex : this.startIndex;
		    this.endIndex = typeof (endIndex) !== "undefined" ? endIndex : this.endIndex;

		    this.treeData = treeData;
		}

		/**
		 *设置data中每个元素的parentIndex
		 *
		 */
		computeCachedRowParentIndex = (data, isTreeType) => {
		    let treeTypeIndex = 0;
		    if (isTreeType) {
		        data.forEach((item, index) => {
		            this.firstLevelKey[index] = this.getRowKey(item, index);
		            this.cachedRowParentIndex[treeTypeIndex] = index;
		            // 保存所有的keys跟小标对应起来
		            this.keys[treeTypeIndex] = this.getRowKey(item, index);
		            treeTypeIndex++;
		            if (item.children) {
		                this.getData(item.children, index);
		            }
		        });
		    }
		};

		// 为外部定位currentIndex提供支持，以确保currentIndex行显示在可视区域
		setStartAndEndIndex(currentIndex, dataLen) {
		    const that = this;
		    if (currentIndex < 0) currentIndex = 0;
		    if (currentIndex + 1 >= dataLen) currentIndex = dataLen;// 确保当前索引不超过记录总数索引
		    let newScrollTop = this.state.scrollTop;
		    if (currentIndex >= that.endIndex) {// 新位置超过原来底部
		        that.endIndex = currentIndex; // 数据底部位置
		        that.startIndex = that.endIndex - that.loadCount; // 数据结束位置
		        that.currentIndex = this.endIndex - this.rowsInView;
		        // 重新设定scrollTop值
		        newScrollTop = that.getSumHeight(0, that.currentIndex);
		    } else if (currentIndex <= that.startIndex) {// 新位置超过原来顶部
		        that.currentIndex = currentIndex;
		        that.startIndex = currentIndex;
		        that.endIndex = currentIndex + that.loadCount;
		        // 重新设定scrollTop值
		        newScrollTop = that.getSumHeight(0, that.currentIndex);
		    }
		    if (newScrollTop !== this.state.scrollTop) {
		        this.setState({scrollTop: newScrollTop})
		    }
		}

		// 获取每行的唯一键
		getRowKey(record, index) {
		    const rowKey = this.props.rowKey;
		    const key =
				typeof rowKey === "function" ? rowKey(record, index) : record[rowKey];

		    return key;
		}

		/**
		 *判断是否是树形结构
		 *
		 */
		checkIsTreeType(isTree, data) {
		    if (typeof isTree == 'boolean') return isTree;
		    const len = (data || []).length;
		    // 看是否有children属性，有则为树形结构
		    for (let i = 0; i < len; i++) {
		        if (data[i].children !== undefined) {
		            return true;
		        }
		    }
		    return false;
		}

		getData(data, parentIndex) {
		    data.forEach((subItem, subIndex) => {
		        this.cachedRowParentIndex[treeTypeIndex] = parentIndex;
		        this.keys[treeTypeIndex] = this.getRowKey(subItem, subIndex);
		        treeTypeIndex++;
		        if (subItem.children) {
		            this.getData(subItem.children, parentIndex);
		        }
		    });
		}

		componentWillUnmount() {
		    this.cachedRowHeight = [];
		    this.cachedRowParentIndex = [];
		}

		/**
		 *获取数据区高度
		 *
		 *
		 **/
		getContentHeight() {
		    if (!this.props.data) return 0;
		    return this.getSumHeight(0, this.props.data.length);
		}

		// 计算总行高
		getSumHeight(start, end) {
		    const {height} = this.props;
		    let rowHeight = height ? height : defaultHeight;
		    let sumHeight = 0,
		        currentKey,
		        currentRowHeight = rowHeight;

		    for (let i = start; i < end; i++) {
		        if (this.cachedRowHeight[i] == undefined) {
		            if (this.treeType) {
		                // currentKey = this.keys[i];
		                currentKey = this.flatTreeData[i] && this.flatTreeData[i].key;
		                currentRowHeight = 0;
		                if (
		                    this.flatTreeKeysMap.hasOwnProperty(currentKey)
		                ) {
		                    currentRowHeight = rowHeight;
		                }
		            }
		            sumHeight += currentRowHeight;
		        } else {
		            sumHeight += this.cachedRowHeight[i];
		        }
		    }
		    return sumHeight;
		}

		// 表格尺寸变化时，重新计算滚动及显示位置
		handleResize = () => {
		    this.handleScrollY(this.state.scrollTop, this.treeType);
		}
		/**
		 *@description  根据返回的scrollTop计算当前的索引。此处做了两次缓存一个是根据上一次的currentIndex计算当前currentIndex。另一个是根据当前内容区的数据是否在缓存中如果在则不重新render页面
		 *@param 最新一次滚动的scrollTop
		 *@param treeType是否是树状表
		 *@param callback表体滚动过程中触发的回调
		 */
		handleScrollY = (nextScrollTop, treeType, callback) => {
		    // 树表逻辑
		    // 关键点是动态的获取startIndex和endIndex
		    // 法子一：子节点也看成普通tr，最开始需要设置一共有多少行，哪行显示哪行不显示如何确定
		    // 动态取start = current+buffer对应的父节点、end = start+loadCount+row的height为0的行数 展开节点的下一个节点作为end值，
		    const that = this;
		    const {data, height, scroll = {}, loadBuffer} = that.props;
		    const rowHeight = height ? height : defaultHeight;
		    const {
		        currentIndex = 0,
		        loadCount,
		        // scrollTop,
		        // currentScrollTop,
		        flatTreeData
		    } = that;
		    let {endIndex, startIndex} = that;
		    const {needRender} = that.state;
		    that.setState({scrollTop: nextScrollTop});
		    const viewHeight = parseInt(scroll.y);
		    that.treeType = treeType;
		    let index = 0;
		    let temp = nextScrollTop;
		    let currentKey;
		    while (temp > 0) {
		        let currentRowHeight = this.cachedRowHeight[index];
		        if (currentRowHeight === undefined) {
		            if (this.treeType) {
		                // currentKey = this.keys[index];
		                currentKey = this.flatTreeData[index].key;
		                currentRowHeight = 0;
		                if (
		                    this.flatTreeKeysMap.hasOwnProperty(currentKey)
		                ) {
		                    currentRowHeight = rowHeight;
		                }
		            } else {
		                currentRowHeight = rowHeight;
		            }
		        }
		        temp -= currentRowHeight;
		        if (temp > 0) {
		            index += 1;
		        }
		    }
		    // console.log('currentIndex****',index);
		    const isOrder = index - currentIndex > 0;
		    if (index < 0) index = 0;
		    // 如果之前的索引和下一次的不一样则重置索引和滚动的位置
		    if (currentIndex !== index) {
		        that.currentIndex = index;
		        let rowsInView = 0; // 可视区域显示多少行
		        let rowsHeight = 0; // 可视区域内容高度
		        let tempIndex = index;
		        // 如果可视区域中需要展示的数据已经在缓存中则不重现render。
		        if (viewHeight) {
		            // 有时滚动过快时this.cachedRowHeight[rowsInView + index]为undifined

		            while (
		                rowsHeight < viewHeight &&
						tempIndex < this.cachedRowHeight.length
		            ) {
		                if (this.cachedRowHeight[tempIndex]) {
		                    rowsHeight += this.cachedRowHeight[tempIndex];
		                    // if (
		                    //   (treeType &&
		                    //     that.cachedRowParentIndex[tempIndex] !== tempIndex) ||
		                    //   !treeType
		                    // ) {
		                    rowsInView++;
		                    // }
		                }
		                tempIndex++;
		            }
		            // if (treeType) {
		            //   const treeIndex = index;
		            //   index = that.cachedRowParentIndex[treeIndex];
		            //   if (index === undefined) {
		            //     // console.log('index is undefined********'+treeIndex);
		            //     index = this.getParentIndex(treeIndex);
		            //     // console.log("getParentIndex****"+index);
		            //   }
		            // }
		            // console.log('parentIndex*********',index);
		            // 如果rowsInView 小于 缓存的数据则重新render
		            // 向下滚动 下临界值超出缓存的endIndex则重新渲染
		            if (rowsInView + index > endIndex - loadBuffer && isOrder) {
		                startIndex = index - loadBuffer > 0 ? index - loadBuffer : 0;
		                // endIndex = startIndex + rowsInView + loadBuffer*2;
		                endIndex = startIndex + loadCount;
		                if (treeType && endIndex > flatTreeData.length || !treeType && endIndex > data.length) {
		                    endIndex = treeType ? flatTreeData.length : data.length;
		                }
		                if (endIndex > this.endIndex) {
		                    this.startIndex = startIndex;
		                    this.endIndex = endIndex;
		                    if (treeType) {
		                        this.handleTreeListChange(flatTreeData.slice(startIndex, endIndex), startIndex, endIndex)
		                    }
		                    this.setState({needRender: !needRender});
		                    callback && callback(parseInt(currentIndex + rowsInView));
		                }
		            }
		            // 向上滚动，当前的index是否已经加载（currentIndex），若干上临界值小于startIndex则重新渲染
		            if (!isOrder && index < startIndex + loadBuffer) {
		                startIndex = index - loadBuffer;
		                if (startIndex < 0) {
		                    startIndex = 0;
		                }
		                if (startIndex < this.startIndex) {
		                    this.startIndex = startIndex;
		                    this.endIndex = this.startIndex + loadCount;
		                    if (treeType) {
		                        this.handleTreeListChange(flatTreeData.slice(startIndex, this.endIndex), startIndex, this.endIndex)
		                    }
		                    this.setState({needRender: !needRender});
		                    callback && callback(parseInt(currentIndex + rowsInView));// 返回可视区域的最后一条数据索引
		                }
		                // console.log(
		                //   "**index**" + index,
		                //   "**startIndex**" + this.startIndex,
		                //   "**endIndex**" + this.endIndex
		                // );
		            }
		        }
		    }
		};

		setRowHeight(height, index) {
		    this.cachedRowHeight[index] = height;
		}

		setRowParentIndex(parentIndex, index) {
		    // this.cachedRowParentIndex[index] = parentIndex;
		}

		/**
		 *
		 *根据当前行号获取该行的父节点行号
		 * @param {*} currentIndex 当前行号
		 */
		getParentIndex(targetIndex) {
		    const {data} = this.props;
		    let parentIndex = -1;
		    parentIndex = this.getIndex(data, -1, targetIndex);
		    if (parentIndex < 0) {
		        // 小于0说明没有展开的子节点
		        parentIndex = targetIndex;
		    }
		    return parentIndex;
		}

		getIndex(data, index, targetIndex) {
		    const parentIndex = index;
		    for (let i = 0; i < data.length; i++) {
		        index++;
		        if (targetIndex <= index) {
		            break;
		        }
		        if (data[i].children) {
		            this.getIndex(data[i].children, index, targetIndex);
		        }
		    }
		    return parentIndex;
		}

		onExpand = (expandState, record, index) => {
		    const that = this;
		    let {expandedRowKeys = []} = that;
		    const {needRender} = that.state;
		    const {data} = that.props;
		    const rowKey = that.getRowKey(record, index);
		    // 记录展开子表行的key
		    // 展开
		    if (record.children) {
		        if (expandState) {
		            record.children.forEach((item, index) => {
		                that.expandChildRowKeys.push(rowKey);
		            });

		        } else {
		            // 收起
		            record.children.forEach((item, index) => {
		                that.expandChildRowKeys.splice(
		                    that.expandChildRowKeys.findIndex(
		                        fitem => fitem.key === item.key
		                    ),
		                    1
		                );
		            });
		        }
		    }
		    // 滚动加载expandedRowKeys自己维护，否则有展开不全的问题
		    if (!that.props.expandedRowKeys) {
		        if (expandState) {
		            expandedRowKeys.push(rowKey);
		            this.setState({needRender: !needRender});
		        } else {
		            let index = -1;
		            expandedRowKeys.forEach((r, i) => {
		                if (r === rowKey) {
		                    index = i;
		                }
		            });
		            if (index !== -1) {
		                expandedRowKeys.splice(index, 1);
		                this.setState({needRender: !needRender});
		            }
		        }
		    }

		    // expandState为true时，记录下
		    that.props.onExpand && that.props.onExpand(expandState, record);

		    if (this.treeType) {
		        // 收起和展开时，缓存 expandedKeys
		        that.cacheExpandedKeys = new Set(expandedRowKeys);
		        // 重新递归数据
		        let flatTreeData = that.deepTraversal(data);
		        let sliceTreeList = flatTreeData.slice(that.startIndex, that.endIndex);
		        that.flatTreeData = flatTreeData;
		        that.handleTreeListChange(sliceTreeList);
		        that.cacheExpandedKeys = null;
		    }
		};


		render() {
		    const {data} = this.props;
		    const {scrollTop} = this.state;
		    let {endIndex, startIndex, treeData, treeType, flatTreeData} = this;
		    let expandedRowKeys = this.props.expandedRowKeys ? this.props.expandedRowKeys : this.expandedRowKeys;
		    if (startIndex < 0) {
		        startIndex = 0;
		    }
		    if (endIndex < 0) {
		        endIndex = 0;
		    }
		    // 树表类型时
		    if (treeType && endIndex > flatTreeData.length || !treeType && endIndex > data.length) {
		        endIndex = treeType ? flatTreeData.length : data.length;
		    }
		    const lazyLoad = {
		        startIndex: startIndex,
		        endIndex: endIndex,
		        startParentIndex: startIndex // 为树状节点做准备
		    };
		    if (treeType) {
		        lazyLoad.preHeight = this.getSumHeight(0, startIndex);
		        lazyLoad.sufHeight = this.getSumHeight(endIndex, flatTreeData.length);
		    } else {
		        lazyLoad.preHeight = this.getSumHeight(0, startIndex);
		        lazyLoad.sufHeight = this.getSumHeight(endIndex, data.length);
		    }
		    // console.log("AAA--->startIndex:"+startIndex+"--->endIndex:"+endIndex+"--->currentIndex:"+this.currentIndex+"-->scrollTop:"+scrollTop);
		    // console.log('*******expandedRowKeys*****'+expandedRowKeys);
		    const dataSource = (treeType && Array.isArray(treeData) && treeData.length > 0) ? treeData : data.slice(startIndex, endIndex);
		    return (
		        <Table
		            {...this.props}
		            data={dataSource}
		            lazyLoad={lazyLoad}
		            ref={el => this.table = el}
		            handleScrollY={this.handleScrollY}
		            scrollTop={scrollTop}
		            setRowHeight={this.setRowHeight}
		            setRowParentIndex={this.setRowParentIndex}
		            onResize={this.handleResize}
		            onExpand={this.onExpand}
		            onExpandedRowsChange={this.props.onExpandedRowsChange}
		            expandedRowKeys={expandedRowKeys}
		            //   className={'lazy-table'}
		        />
		    );
		}
    };
}
