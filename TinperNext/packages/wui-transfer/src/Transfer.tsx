import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';
import {DragDropContext, DropResult, DragStart} from 'react-beautiful-dnd';
import {getNid, WebUI} from "../../wui-core/src/index"
import List from './list';
import Operation from './operation';
import Search from './search';
import {move, reorder} from './utils';
import {getLangInfo} from "../../wui-locale/src/tool";
import i18n from './i18n';
import { TransferProps, TransferState, TransferKeyType, TransferItem, SplitedDataSource } from './iTransfer'
import { WithConfigConsumer } from '../../wui-provider/src/context';

// function noop() {
// }

const defaultProps: TransferProps = {
    dataSource: [],
    targetKeys: [],
    render: (item) => item.title || '',
    showSearch: false,
    locale: 'zh-cn',
    showCheckbox: true,
    draggable: false,
    appendToBottom: false,
    renderOperation: () => '', // 自定义操作
    operations: ['rightAll', 'rightOne', 'leftAll', 'leftOne'],
    // fieldid: ''
};

// export const propTypes = {
//     prefixCls: PropTypes.string,
//     dataSource: PropTypes.array,
//     render: PropTypes.func,
//     targetKeys: PropTypes.array,
//     onChange: PropTypes.func,
//     onScroll: PropTypes.func,
//     height: PropTypes.number,
//     listStyle: PropTypes.object,
//     className: PropTypes.string,
//     titles: PropTypes.array,
//     operations: PropTypes.array,
//     showSearch: PropTypes.bool,
//     filterOption: PropTypes.func,
//     searchPlaceholder: PropTypes.string,
//     notFoundContent: PropTypes.node,
//     body: PropTypes.func,
//     footer: PropTypes.func,
//     rowKey: PropTypes.func,
//     lazy: PropTypes.object,
//     showCheckbox: PropTypes.bool,
//     draggable: PropTypes.bool,
//     appendToBottom: PropTypes.bool,
//     renderOperation: PropTypes.func,
//     onSelectChange: PropTypes.func,
//     selectedKeys: PropTypes.array,
//     fieldid: PropTypes.string
// };

// const defaultTitles = ['可选列表', '已选列表'];
@WithConfigConsumer({name: "transfer"})
@WebUI({name: "transfer", defaultProps})
class Transfer extends React.Component<TransferProps, TransferState> {
	static defaultProps = defaultProps;
	static List = List;
	static Operation = Operation;
	static Search = Search;
	cacheTargetKeys: TransferKeyType[]
	splitedDataSource: SplitedDataSource | null = null
	allSourceKeys: TransferKeyType[] = []

	constructor(props: TransferProps) {
	    super(props);
	    const {selectedKeys = [], targetKeys = []} = props;
	    this.state = {
	        leftFilter: '',
	        rightFilter: '',
	        sourceSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) === -1),
	        targetSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) > -1),
	        leftDataSource: [],
	        rightDataSource: [],
	        droppableId: '',
	        draggingItemId: ''
	    };
	    this.cacheTargetKeys = [...targetKeys];
	}

	componentDidMount() {
	    this.splitDataSource();
	}

	UNSAFE_componentWillReceiveProps(nextProps: TransferProps) {
	    const {sourceSelectedKeys, targetSelectedKeys} = this.state;
	    if (nextProps.targetKeys !== this.props.targetKeys ||
			nextProps.dataSource !== this.props.dataSource ||
			nextProps.targetKeys !== this.cacheTargetKeys) {
	        // clear cached splited dataSource
	        this.splitedDataSource = null;

	        const {dataSource, targetKeys = []} = nextProps;
	        const existInDateSourcekey = (key: TransferKeyType) => {
	            return dataSource.filter(item => item.key === key).length;
	        }
	        // clear key nolonger existed
	        // clear checkedKeys according to targetKeys
	        this.setState({
	            sourceSelectedKeys: sourceSelectedKeys.filter(existInDateSourcekey)
	                .filter(data => targetKeys.filter(key => key === data).length === 0),
	            targetSelectedKeys: targetSelectedKeys.filter(existInDateSourcekey)
	                .filter(data => targetKeys.filter(key => key === data).length > 0),
	        });
	        // 异步加载时 || 动态改变targetKeys时
	        if (this.props.dataSource.length === 0 || !this.props.draggable) {
	            this.splitDataSource(targetKeys, dataSource);
	        }
	    }
	    if (nextProps.selectedKeys) {
	        const targetKeys = nextProps.targetKeys;
	        this.setState({
	            sourceSelectedKeys: nextProps.selectedKeys.filter(key => targetKeys.indexOf(key) === -1),
	            targetSelectedKeys: nextProps.selectedKeys.filter(key => targetKeys.indexOf(key) > -1),
	        });
	    }
	}

	/**
	 * 给dataSource里的数据值指定唯一 key 值
	 */
	addUniqueKey = (dataSource: TransferItem[]) => {
	    const {rowKey} = this.props;
	    if (rowKey) {
	        dataSource.forEach(record => {
	            record.key = rowKey(record);
	        });
	    }
	    return dataSource;
	}

	/**
	 * @param {*} newTargetKeys 更新后的targetKeys
	 * @param {*} newDataSource droppable为true时，通过 leftDataSource.concat(rightDataSource) 得到的newDataSource。droppable为false，异步加载数据源时，从nextProps中获取的dataSource
	 */
	splitDataSource(newTargetKeys?:TransferKeyType[], newDataSource?: any, droppable?: boolean) {
	    // targetKeys：展示在右边列表的数据集
	    if (this.splitedDataSource) {
	        return this.splitedDataSource;
	    }
	    let targetKeys = newTargetKeys || this.props.targetKeys;
	    let leftDataSource = []
	    let rightDataSource = []
	    if (droppable) {
	        // 从自定义顺序的dataSource中分离出leftDataSource和rightDataSource（拖拽场景调用）
	        // 异步加载数据源时/移除已选时
	        let sourceDataSource = this.props.dataSource;
	        newDataSource = this.addUniqueKey(newDataSource);
	        sourceDataSource = this.addUniqueKey(sourceDataSource);
	        leftDataSource = sourceDataSource.filter(({key}) => targetKeys.indexOf(key) === -1);
	        rightDataSource = targetKeys.map(key => {
	            return newDataSource.find((data: TransferItem) => data.key === key)
	        })
	    } else {
	        // 从源dataSource中分离出leftDataSource和rightDataSource（点击按钮穿梭时调用）
	        // 异步加载数据源时/移除已选时
	        let dataSource = newDataSource || this.props.dataSource;

	        dataSource = this.addUniqueKey(dataSource);
	        this.allSourceKeys = dataSource.map((data: TransferItem) => data.key);

	        leftDataSource = dataSource.filter((data: TransferItem) => targetKeys.indexOf(data.key) === -1);
	        // const rightDataSource = dataSource.filter(({key}) => targetKeys.indexOf(key) > -1);
	        // 右侧数据源根据传入的targetKeys进行排序
	        let tempIndex = -1;
	        targetKeys.forEach((key) => {
	            tempIndex = this.allSourceKeys.indexOf(key);
	            rightDataSource.push(dataSource[tempIndex]);
	        })
	    }

	    this.splitedDataSource = {
	        leftDataSource,
	        rightDataSource,
	    };
	    this.setState({
	        leftDataSource,
	        rightDataSource,
	    })

	    return this.splitedDataSource;
	}

	getMoveKeys = (direction: string) => {
	    const {sourceSelectedKeys, targetSelectedKeys, leftDataSource, rightDataSource} = this.state;
	    let moveKeys: TransferKeyType[] = [];
	    switch (direction) {
	        case 'right':
	            moveKeys = sourceSelectedKeys;
	            break;
	        case 'left':
	            moveKeys = targetSelectedKeys;
	            break;
	        case 'allLeft':
	            rightDataSource.forEach(data => {
	                if (data && !data.disabled) moveKeys.push(data.key);
	            });
	            break;
	        default: leftDataSource.forEach(data => {
	            if (data && !data.disabled) moveKeys.push(data.key);
	        });
	    }

	    return moveKeys;
	}

	moveTo = (direction: string, insertIndex?: number) => {
	    const {targetKeys = [], onChange, appendToBottom} = this.props;
	    const {leftDataSource, rightDataSource, droppableId} = this.state;
	    const moveKeys = this.getMoveKeys(direction);
	    // let temp = appendToBottom ? targetKeys.concat(moveKeys) : moveKeys.concat(targetKeys); // 在这里
	    let temp = []
	    if (appendToBottom) { // to right
	        temp = targetKeys.concat(moveKeys)
	    } else if (insertIndex) { // to right
	        targetKeys.splice(insertIndex, 0, ...moveKeys)
	        temp = targetKeys
	    } else {
	        temp = moveKeys.concat(targetKeys);
	    }
	    // move items to target box
	    const newTargetKeys = direction.toLowerCase().indexOf('right') !== -1
	        ? temp
	        : targetKeys.filter(targetKey => moveKeys.indexOf(targetKey) === -1);

	    // empty checked keys
	    const oppositeDirection = direction.toLowerCase().indexOf('right') !== -1 ? 'left' : 'right';
	    this.setState({
	        [this.getSelectedKeysName(oppositeDirection) as string]: []
	    } as Record<'sourceSelectedKeys' | 'targetSelectedKeys', never[]>);
	    this.handleSelectChange(oppositeDirection, []);

	    if (onChange) {
	        onChange(newTargetKeys, direction, moveKeys);
	    }
	    // 区分拖拽穿梭还是点击穿梭
	    let newDataSource = leftDataSource.concat(rightDataSource);
	    droppableId ? this.splitDataSource(newTargetKeys, newDataSource, true) : this.splitDataSource(newTargetKeys);
	}

	moveToLeft = () => this.moveTo('left');
	moveToRight = (insertIndex?: number) => this.moveTo('right', insertIndex);
	allMoveToLeft = () => this.moveTo('allLeft');
	allMoveToRight = () => this.moveTo('allRight');

	/**
	 * List中的item选中/未选中状态改变时触发
	 * @param {*} direction 'left' or 'right'
	 * @param {*} holder 更新后的'sourceSelectedKeys' or 'targetSelectedKeys'
	 */
	handleSelectChange(direction: string, holder: TransferKeyType[]) {
	    // onSelectChange：当选中的item发生改变时的回调 参数(sourceSelectedKeys, targetSelectedKeys)
	    const {sourceSelectedKeys, targetSelectedKeys} = this.state;
	    const onSelectChange = this.props.onSelectChange;
	    if (!onSelectChange) {
	        return;
	    }

	    if (direction === 'left') {
	        onSelectChange(holder, targetSelectedKeys);
	    } else {
	        onSelectChange(sourceSelectedKeys, holder);
	    }
	}

	handleSelectAll = (direction: string, filteredDataSource: TransferItem[], checkAll: boolean) => {
	    const holder = checkAll ? [] : filteredDataSource.map(item => item.key);
	    this.handleSelectChange(direction, holder);

	    if (!this.props.selectedKeys) {
	        this.setState({
	            [this.getSelectedKeysName(direction)]: holder,
	        } as Record<'sourceSelectedKeys' | 'targetSelectedKeys', TransferKeyType[]>);
	    }
	}

	/**
	 * 左侧列表全选事件
	 * @param filteredDataSource dataSource中刨去设置为disabled的部分
	 * @param checkAll 是否是全选状态 true：全选
	 */
	handleLeftSelectAll = (filteredDataSource: TransferItem[], checkAll: boolean) => {
	    this.handleSelectAll('left', filteredDataSource, checkAll)
	}
	handleRightSelectAll = (filteredDataSource: TransferItem[], checkAll: boolean) => (
	    this.handleSelectAll('right', filteredDataSource, checkAll)
	)

	/**
	 * 搜索框值更改事件
	 * @param direction 'left' or 'right'
	 * @param value 输入的值
	 */
	handleFilter = (direction: string, value: string) => {
	    this.setState({
	        // add filter
	        [`${direction}Filter`]: value,
	    } as Record<'leftFilter' | 'rightFilter', string>);
	    this.props.onSearchChange?.(direction, value);
	}

	handleLeftFilter = (v: string) => this.handleFilter('left', v)
	handleRightFilter = (v: string) => this.handleFilter('right', v)

	/**
	 * 清空搜索框内容
	 * @param direction 'left' or 'right'
	 */
	handleClear = (direction: string) => {
	    this.setState({
	        [`${direction}Filter`]: '',
	    } as Record<'leftFilter' | 'rightFilter', string>);
	}

	handleLeftClear = () => this.handleClear('left')
	handleRightClear = () => this.handleClear('right')

	/**
	 * 点击list item，选中或取消选中
	 * @param direction 'left' or 'right'
	 * @param selectedItem 选中的item的信息，和dataSource数据源中的item信息一致
	 * @param checked 是否已勾选，true：已勾选 false：未勾选
	 */
	handleSelect = (direction: string, selectedItem: Partial<TransferItem>, checked?: boolean) => {
	    const {sourceSelectedKeys, targetSelectedKeys} = this.state;
	    const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
	    const index = holder.indexOf(selectedItem.key as string);
	    if (checked) { // 已勾选
	        holder.splice(index, 1);
	    } else if (index === -1) { // 未勾选
	        holder.push(selectedItem.key as string);
	    }
	    this.handleSelectChange(direction, holder);

	    if (!this.props.selectedKeys) {
	        this.setState({
	            [this.getSelectedKeysName(direction)]: holder,
	        } as Record<'sourceSelectedKeys' | 'targetSelectedKeys', string[]>);
	    }
	}

	handleLeftSelect = (selectedItem: Partial<TransferItem>, checked?: boolean) => this.handleSelect('left', selectedItem, checked);
	handleRightSelect = (selectedItem: Partial<TransferItem>, checked?: boolean) => this.handleSelect('right', selectedItem, checked);

	handleLeftScroll = (e: React.UIEvent<HTMLElement>) => this.handleScroll('left', e); // 左侧的list发生滚动事件
	handleRightScroll = (e: React.UIEvent<HTMLElement>) => this.handleScroll('right', e); // 右侧的list发生滚动事件

	handleScroll = (direction: string, e: React.UIEvent<HTMLElement>) => {
	    const {onScroll} = this.props;
	    onScroll && onScroll(direction, e)
	};

	getTitles = (local: { lang?: string; langMap: Record<string, any>; }) => {
	    if (this.props.titles) {
	        return this.props.titles;
	    }
	    // ========无用代码=========
	    // if (this.context &&
	    // 	this.context.antLocale &&
	    // 	this.context.antLocale.Transfer
	    // ) {
	    //     return this.context.antLocale.Transfer.titles || [];
	    // }
	    return [local.langMap.source, local.langMap.target];
	}

	getSelectedKeysName(direction: string) {
	    return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
	}

	id2List = {
	    droppable1: 'leftDataSource',
	    droppable2: 'rightDataSource'
	};

	getList = (id: string) => this.state[this.id2List[id]];

	/**
	 * 拖拽结束时触发
	 */
	onDragEnd = (result: typeof DropResult) => {
	    this.setState({
	        draggingItemId: ''
	    })
	    const {source, destination, draggableId} = result;
	    let {targetKeys, onChange} = this.props;
	    let sourceIndex = source ? source.index : ''; // 初始位置 // 这里可能要将''改成0
	    let disIndex = destination ? destination.index : ''; // 移动后的位置

	    // case1：拖拽到列表之外
	    if (!destination) {
	        return;
	    }

	    if (destination.droppableId === 'droppable1') {
	        // case2：在左侧列表中拖拽
	        if (source.droppableId === destination.droppableId) return;
	        // case3：从右往左拖拽（移除已选）
	        this.moveToLeft();
	        return;
	    }

	    // case4：在右侧列表中拖拽改变items顺序
	    if (source.droppableId === destination.droppableId) {
	        const items = reorder(
	            this.getList(source.droppableId),
	            targetKeys,
	            sourceIndex as number,
	            disIndex as number
	        );
	        this.setState({
	            rightDataSource: items.dataArr as TransferItem[],
	            sourceSelectedKeys: [],
	            targetSelectedKeys: []
	        });
	        if (onChange) {
	            onChange(items.targetKeyArr as TransferKeyType[], "", draggableId);
	        }
	    } else { // case5：从左往右拖拽（添加已选）
	        if (this.state.sourceSelectedKeys.length > 1) {
	            return this.moveToRight(destination.index)
	        }
	        const result = move( // 一次移动的方法
	            this.getList(source.droppableId),
	            this.getList(destination.droppableId),
	            source,
	            destination,
	            targetKeys
	        )
	        if (onChange) { // onChange事件
	            onChange(result.newTargetKeys as TransferKeyType[], "", draggableId);
	        }
	        this.setState({
	            leftDataSource: result.droppable1 as TransferItem[],
	            rightDataSource: result.droppable2 as TransferItem[],
	            sourceSelectedKeys: [],
	            targetSelectedKeys: []
	        })
	    }
	};

	/**
	 * 拖拽开始时触发
	 */
	onDragStart = (result: typeof DragStart) => {
	    let selectedItem: Partial<TransferItem> = {};
	    const {source} = result;
	    selectedItem.key = result.draggableId;
	    if (source.droppableId === 'droppable1') { // leftMenu
	        this.handleLeftSelect(selectedItem);
	    } else if (source.droppableId === 'droppable2') { // rightMenu
	        this.handleRightSelect(selectedItem);
	    }
	    this.setState({
	        droppableId: source.droppableId,
	        draggingItemId: result.draggableId
	    })
	}

	render() {
	    const {
	        clsPrefix, operations, showSearch, notFoundContent, fieldid,
	        searchPlaceholder, body, footer, listStyle, className = '', locale,
	        filterOption, render, lazy, showCheckbox, draggable, renderOperation, children,
	        style, disabled, dir: direction
	    } = this.props;
	    const {
	        leftFilter,
	        rightFilter,
	        sourceSelectedKeys,
	        targetSelectedKeys,
	        leftDataSource,
	        rightDataSource,
	        droppableId,
	        draggingItemId
	    } = this.state;
	    const local: {
			lang: string;
			langMap: Record<string, any>;
		} = getLangInfo(locale, i18n, 'transfer');
	    // const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
	    const leftActive = targetSelectedKeys.length > 0 && !disabled;
	    const rightActive = sourceSelectedKeys.length > 0 && !disabled;
	    const allLeftActive = !disabled && rightDataSource.filter(data => data && !data.disabled).length > 0;
	    const allRightActive = !disabled && leftDataSource.filter(data => data && !data.disabled).length > 0;

	    const cls = classNames(className, clsPrefix, {
	        [`${clsPrefix}-rtl`]: direction === 'rtl'
	    });

	    const titles = this.getTitles(local);
	    let adapterNid = getNid(this.props) // 适配nid、uitype
	    const fieldidProps = fieldid ? { fieldid } : {};
	    const selectAllLabels = this.props.selectAllLabels || [];
	    return (
	        <div className={cls} {...adapterNid} {...fieldidProps} style={style}>
	            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
	                <List
	                    titleText={titles[0]} // 左侧标题
	                    dataSource={leftDataSource} // 左侧数据源
	                    filter={leftFilter} // 搜索框中输入的内容
	                    filterOption={filterOption} // 搜索过滤方法 参数(inputValue, option)
	                    style={listStyle} // 自定义的columns的样式表
	                    checkedKeys={sourceSelectedKeys} // 左侧已勾选的item的keys
	                    handleFilter={this.handleLeftFilter} // 左侧搜索框值更改事件
	                    handleClear={this.handleLeftClear} // 清空左侧搜索框内容
	                    handleSelect={this.handleLeftSelect} // 点击左侧列表中的item，改变选中或取消选中状态
	                    handleSelectAll={this.handleLeftSelectAll} // 点击左侧全选
	                    handleScroll={this.handleLeftScroll}
	                    render={render}
	                    showSearch={showSearch} // 是否显示搜索框
	                    searchPlaceholder={searchPlaceholder || local.langMap.searchPlaceholder} // 搜索框placeholder
	                    notFoundContent={notFoundContent || local.langMap.notFoundContent} // 当没有相关内容的显示内容
	                    body={body}
	                    footer={footer}
	                    prefixCls={`${clsPrefix}-list`}
	                    lazy={lazy}
	                    showCheckbox={showCheckbox}
	                    draggable={draggable}
	                    id={'1'}
	                    droppableId={droppableId}
	                    draggingItemId={draggingItemId}
	                    fieldid={fieldid ? `${fieldid}_transfer-input-search_left` : ''}
	                    direction="left"
	                    renderList={children}
	                    disabled={disabled}
	                    selectAllLabel={selectAllLabels[0]}
	                />
	                {!draggable ?
	                    <Operation
	                        dir={direction}
	                        rightActive={rightActive}
	                        operations={operations}
	                        moveToRight={this.moveToRight}
	                        leftActive={leftActive}
	                        moveToLeft={this.moveToLeft}
	                        allLeftActive={allLeftActive}
	                        allMoveToLeft={this.allMoveToLeft}
	                        allRightActive={allRightActive}
	                        allMoveToRight={this.allMoveToRight} // TODO: 这两个API在改功能的时候可以补上
	                        className={`${clsPrefix}-operation`}
	                        renderOperation={renderOperation}
	                        fieldid={fieldid}
	                    />
	                    : ''
	                }
	                <List
	                    titleText={titles[1]} // 右侧标题
	                    dataSource={rightDataSource} // 右侧数据源
	                    filter={rightFilter} // 搜索框中输入的内容
	                    filterOption={filterOption} // 搜索过滤方法 参数(inputValue, option)
	                    style={listStyle} // 自定义的columns的样式表
	                    checkedKeys={targetSelectedKeys} // 右侧已勾选的item的keys
	                    handleFilter={this.handleRightFilter} // 右侧搜索框值更改事件
	                    handleClear={this.handleRightClear} // 清空右侧搜索框内容
	                    handleSelect={this.handleRightSelect} // 点击右侧列表中的item，改变选中或取消选中状态
	                    handleSelectAll={this.handleRightSelectAll} // 点击右侧全选
	                    handleScroll={this.handleRightScroll}
	                    render={render}
	                    showSearch={showSearch} // 是否显示搜索框
	                    searchPlaceholder={searchPlaceholder || local.langMap.searchPlaceholder} // 搜索框placeholder
	                    notFoundContent={notFoundContent || local.langMap.notFoundContent} // 当没有相关内容的显示内容
	                    body={body}
	                    footer={footer}
	                    prefixCls={`${clsPrefix}-list`}
	                    lazy={lazy}
	                    showCheckbox={showCheckbox}
	                    draggable={draggable}
	                    id={'2'}
	                    fieldid={fieldid ? `${fieldid}_transfer-input-search_right` : ''}
	                    direction="right"
	                    renderList={children}
	                    disabled={disabled}
	                    selectAllLabel={selectAllLabels[1]}
	                />
	            </DragDropContext>
	        </div>
	    );
	}
}

// Transfer.propTypes = propTypes;

export default Transfer as React.ComponentClass<Partial<TransferProps>>;
