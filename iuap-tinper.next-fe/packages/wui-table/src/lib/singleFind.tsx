/*
 * @Author: Mr.mjc
 * @Date: 2022-06-15 17:39:30
 * @LastEditors: MJC
 * @LastEditTime: 2024-12-05 14:14:59
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/lib/singleFind.tsx
 */
// import PropTypes from 'prop-types';
import React, {Component} from "react";
import {prefix} from "../../../wui-core/src/index"
import Icon from "../../../wui-icon/src/index"
import Input from "../../../wui-input/src/index"
import Message from "../../../wui-message/src/index"
import Popover from "../../../wui-popover/src/index"
import {getValueByRowKey} from './util';
import {getItemKey, normalize} from './utils';
import { TableProps, ISingleFindState, ColumnType, InputValueType } from '../iTable';
import { Key, DefaultRecordType } from '../interface';
import { TableInterface } from "../index";
import i18n from "./i18n";
import {getLangInfo} from "../../../wui-locale/src/tool";
import {ConfigContext} from '../../../wui-provider/src/context';
import { ConfigConsumerProps } from "../../../wui-provider/src/iProvider";

/**
 * 参数：prefixCls，默认bee-table,用于设置图标的样式
 * @param {*} Table
 */

export default function singleFind(Table: React.ComponentClass<Partial<TableProps>> | TableInterface) {
    return class SingleFindTable extends Component<TableProps, ISingleFindState> {
		static contextType = ConfigContext;
		inputValue: InputValueType;
		filterKey: string | number;
		hasMatch: boolean;
		searchKey: string | number;
		msg: boolean;
		findIndexs: number[];
		findRowKeys: Key[];
		scrollIndex: number;
		currentDom: HTMLElement | null | EventTarget | undefined;
		findCurrentRowKey: string | Key;
		context!: ConfigConsumerProps;
		constructor(props: TableProps) {
		    super(props);
		    let {columns, children} = props
		    if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		        columns = normalize(children)
		    }
		    let flatColumns = this._toFlatColumn(columns, -1);
		    this.state = {
		        data: this.props.data,
		        columns: columns,
		        flatColumns: flatColumns,
		        inputValue: {},
		        currentIndex: this.props.currentIndex || -1,
		        showTop: false,
		    };
		    this.inputValue = {} // 保存input value
		    this.filterKey = '' // 当前操作的key
		    this.hasMatch = false // 是否查询到匹配的行
		    this.searchKey = '' // 搜索的key
		    this.msg = false // 是否提示信息
		    this.findIndexs = [] // 当前找到的行下标的集合
		    this.findRowKeys = [] // 当前找到的行key的集合
		    this.findCurrentRowKey = '' // 当前找到的聚焦行key
		    this.scrollIndex = 0 // 当前滚动到的行在找到所有行的下标，默认为第一个
		}

		// static propTypes = {
		//     columns: PropTypes.any,
		//     data: PropTypes.any,
		//     onDropBorder: PropTypes.func,
		//     rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		//     lazyLoad: PropTypes.any,
		//     _onDataChange: PropTypes.func,
		// }

		static defaultProps = {
		    prefixCls: `${prefix}-table`,
		    rowKey: 'key'
		};

		UNSAFE_componentWillReceiveProps(nextProps: TableProps) {
		    let {columns, children, data} = nextProps
		    if (columns !== this.props.columns || children !== this.props.children) {
		        if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		            columns = normalize(children)
		        }
		        let flatColumns = this._toFlatColumn(columns, -1);
		        this.setState({
		            columns: columns,
		            flatColumns
		        });
		    }

		    if (data !== this.state.data) {
		        this.setState({
		            data: data,
		        }, () => {
		            if (this.searchKey) {
		                this.msg = false;
						const column = this.state.flatColumns.find((column: ColumnType) => column.dataIndex == this.searchKey) as ColumnType;
		                column && this.search(column)
		            }
		        });
		    }

		}

		// 获取每行的唯一键
		getRowKey = (record: DefaultRecordType, index: number) => {
		    return getValueByRowKey(this.props.rowKey, record, index);
		}
		/**
		 *column扁平化处理，适应多表头避免递归操作
		 *
		 */
		_toFlatColumn = (columns: ColumnType[], parentIndex: number = -1, flatColumns:ColumnType[] = []): ColumnType[] => {
		    const that = this;
		    let children = [];
		    flatColumns = flatColumns || [];
		    // const flatColumns = that.state;
		    columns.forEach((item) => {
		        item.parentIndex = parentIndex;
		        children = item.children as ColumnType[];
		        flatColumns.push(item);
		        if (children) {
		            // item.children = [];
		            that._toFlatColumn(children, flatColumns.length - 1, flatColumns);
		        }
		    });
		    return flatColumns;
		}

		renderColumnsDropdown = (columns: ColumnType[]) => {
		    let tempColumns = [],
		        rsColumns = [];
		    tempColumns = columns.map(originColumn => {
		        let column = Object.assign({}, originColumn);
		        return this.findColumn(column);
		    });
		    rsColumns = this._flatToColumn(tempColumns);
		    return rsColumns;
		};

		change = (v: string) => {
		    this.inputValue[this.filterKey] = v;
		    this.setState({
		        inputValue: this.inputValue
		    })
		}
		/**
		 * 查询判断条件
		 * */
		searchCondition = (item: DefaultRecordType) => {
		    const {searchKey} = this;
		    const {inputValue} = this.state;
		    const filterStr = inputValue[searchKey];
		    if (filterStr && ((getItemKey(item, searchKey) === 0 ? "0" : getItemKey(item, searchKey)) || {}).toString().toLowerCase().includes(filterStr.toLowerCase())) {
		        return true;
		    }
		    return false;
		}

		search = (column: ColumnType) => {
		    this.hasMatch = false;
		    this.findIndexs = []; // 置空
		    this.findRowKeys = [] // 置空
			const {searchKey} = this
		    if (this.msg) { // 自身查询事件，更新searchKey
		        this.searchKey = this.filterKey;
		    }
			const { searchCondition: columnSearchCondition } = column;
		    let propsLocale = this.props.locale || this.context.locale
		    let locale = getLangInfo(propsLocale, i18n, 'table');
		    let {data, inputValue} = this.state;
		    data.forEach((item, index) => {
		        if (columnSearchCondition && typeof columnSearchCondition === "function") {
                    if (columnSearchCondition(item, column, inputValue[searchKey])) {
						let findRowKey = this.getRowKey(item, index);
						this.findRowKeys.push(findRowKey)
						this.hasMatch = true
						this.findIndexs.push(index);
					}
                } else {
					if (this.searchCondition(item)) {
						let findRowKey = this.getRowKey(item, index);
						this.findRowKeys.push(findRowKey)
						this.hasMatch = true
						this.findIndexs.push(index);
					}
				}
		    })
		    if (this.hasMatch === false && this.msg) {
		        Message.destroy();
		        Message.create({
		            content: locale.langMap.searchNoRow || '未搜索到匹配的行！',
		            color: 'danger'
		        });
		        this.findRowKeys = [];
		        this.findCurrentRowKey = '';
		        this.setState({
		            currentIndex: -1
		        })
		    }
		    if (this.findIndexs.length && !this.props.lazyLoad) {
		        let currentIndex = this.findIndexs[0]
		        this.findCurrentRowKey = this.findRowKeys[0]
		        this.scrollIndex = 0;
		        this.setState({
		            currentIndex
		        })
		    }
		}

		getSearch = (v: string) => {
		    if (!this.findIndexs.length || !this.findRowKeys.length) return;
		    let len = this.findIndexs.length
		    let propsLocale = this.props.locale || this.context.locale
		    let locale = getLangInfo(propsLocale, i18n, 'table');
		    if (v === 'next') { // 下一个
		        if (this.scrollIndex >= len - 1) {
		            Message.destroy();
		            Message.create({
		                content: locale.langMap.alreadyLastRow || '已经是匹配的最后一行！',
		                color: 'danger'
		            });
		        } else {
		            this.scrollIndex += 1;
		            let currentIndex = this.findIndexs[this.scrollIndex];
		            this.findCurrentRowKey = this.findRowKeys[this.scrollIndex]
		            this.setState({
		                currentIndex
		            })
		        }
		    } else {
		        if (this.scrollIndex <= 0) {
		            Message.destroy();
		            Message.create({
		                content: locale.langMap.alreadyFirstRow || '已经是匹配的第一行！',
		                color: 'danger'
		            });
		        } else {
		            this.scrollIndex -= 1;
		            let currentIndex = this.findIndexs[this.scrollIndex];
		            this.findCurrentRowKey = this.findRowKeys[this.scrollIndex]
		            this.setState({
		                currentIndex
		            })
		        }
		    }

		}


		click = (e: React.MouseEvent<HTMLElement>, column: ColumnType) => {
		    this.msg = true;
		    this.currentDom = e.target;
		    this.filterKey = column.dataIndex || '';
		    this.setState({
		        showTop: true
		    })
		}

		clsClick = () => {
		    // this.currentDom?.click()
		    this.currentDom && (this.currentDom as HTMLElement).click()
		}

		showTop = () => {
		    this.setState({
		        showTop: true
		    })
		}

		onVisibleChangeTop = (visible: boolean) => {
		    if (!visible) {
		        this.filterKey = ''
		    }
		    this.setState({
		        showTop: visible
		    })
		}

		findColumn = (column: ColumnType) => {
		    if (column.dataIndex === 'checkbox' || column.dataIndex === 'radio' || column.singleFind === false) {
		        return column;
		    }
		    const { fieldid, dir: direction = 'ltr' } = this.props;
		    let fieldidAttr = fieldid ? { fieldid: `${fieldid}_single_find_icon` } : {}
		    let directionAttr = direction === 'rtl' ? { dir: direction } : {}
		    let content = this.filterKey === column.dataIndex ? (
		        <div className={`${prefix}-table-column-single-find-popover`}>
		            <Input
		                type="search"
		                value={this.state.inputValue[column.dataIndex]}
		                onChange={this.change}
		                onScroll={(e) => e.stopPropagation()}
		                { ...directionAttr }
		                onSearch={() => this.search(column)}/>
		            <Icon
		                type="uf-shangyitiao-copy"
		                { ...directionAttr }
		                onClick={() => {
		                    this.getSearch('prev')
		                }}/>
		            <Icon
		                type="uf-xiayitiao-copy"
		                { ...directionAttr }
		                onClick={() => {
		                    this.getSearch('next')
		                }}/>
		            <Icon
		                type="uf-close"
		                { ...directionAttr }
		                onClick={this.clsClick}/>
		        </div>
		    ) : null
		    let isActive = (column.dataIndex === this.searchKey && this.hasMatch) || (this.state.showTop && this.filterKey === column.dataIndex)
		    let wrapClassName =
				isActive ?
				    `${prefix}-table-column-single-find ${prefix}-table-column-single-find-active` :
				    `${prefix}-table-column-single-find`;
		    let findButton = <div className={`${wrapClassName} ${prefix}-table-title-icon`}>
				    <Popover
				        rootClose
		            	placement="top"
		            	arrowPointAtCenter
				        content={content}
				        trigger="click"
				        show={this.state.showTop}
		            { ...directionAttr }
				        onVisibleChange={this.onVisibleChangeTop}>
				        <i
				            className={isActive ? `uf uf-biaotoudingweiyidingweinormal` : `uf uf-biaodansousuo`}
		                	{ ...fieldidAttr }
				            onClick={
				                (e) => {
				                    this.click(e, column)
				                }
				            }/>
				    </Popover>
		        </div>;
		   column._originTitle = column._originTitle || column.title;
		    column.title =
				<>
				    {typeof column.title === 'string' ?
				        <span className={`${prefix}-table-title-text-span`} title={column.title}>
				            {column.title}
				        </span> : column.title
				    }
				    {/* {column._hasSingleFind ? null : findButton} */}
				</>
		    column.innerHeaderIcon = column.innerHeaderIcon || {}
		    column.innerHeaderIcon.findButton = findButton
		    // column._hasSingleFind = column._hasSingleFind || true;
		    return column;
		};

		_flatToColumn(flatColumns: ColumnType[]) {
		    const colLen = flatColumns.length;
		    let parentIndex, rsColumns = [];
		    // 每次渲染需要将父类的children置空，避免重复
		    flatColumns.forEach(item => {
		        if (item.children) {
		            item.children = [];
		        }
		    })
		    for (let i = colLen - 1; i >= 0; i--) {
		        parentIndex = flatColumns[i].parentIndex;
		        if ((parentIndex || parentIndex == 0) && parentIndex >= 0) {
		            // @ts-ignore
		            flatColumns[parentIndex].children.unshift(flatColumns[i]);
		        }
		    }
		    rsColumns = flatColumns.filter(item => {
		        return item.parentIndex == -1
		    })
		    return rsColumns;
		}

		// 列宽度拖拽后需要更新sort组件的state.columns数据（否则点了排序后被拖拽的列宽度会被还原）
		handleDropBorder = (event:React.MouseEvent<HTMLElement>, newWidth: number, newColumn: ColumnType, newColumns: ColumnType[]) => {
		    const {
		        onDropBorder
		    } = this.props;
		    let flatColumn = this.state.flatColumns.find((column: ColumnType) => column.dataIndex == newColumn.dataIndex) as ColumnType;
		    flatColumn.width = newWidth;
		    this.setState({
		        flatColumns: this.state.flatColumns
		    });
		    typeof onDropBorder == 'function' && onDropBorder(event, newWidth, newColumn, newColumns);
		}

		_onDataChange = (data: DefaultRecordType[]) => {
		    this.setState({data})
		    this.props._onDataChange && this.props._onDataChange(data)
		}

		render() {
		    let columns = this.renderColumnsDropdown(this.state.flatColumns.concat());
		    // let currentFindRowKey = [this.findRowKeys[this.scrollIndex || 0]]
		    return <Table
		        {...this.props}
		        columns={columns}
		        data={this.state.data}
		        // findRowKeys={currentFindRowKey}
		        findRowKeys={this.findRowKeys}
		        findCurrentRowKey={this.findCurrentRowKey}
		        currentIndex={this.state.currentIndex}
		        _onDataChange={this._onDataChange}
		        onDropBorder={this.handleDropBorder}
		    />;
		}
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
