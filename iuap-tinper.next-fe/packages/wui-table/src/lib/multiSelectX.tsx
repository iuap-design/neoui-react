// import PropTypes from 'prop-types';
import React, {Component} from "react";
import {prefix} from "../../../wui-core/src/index"
import TreeUtils from "../../../wui-core/src/TreeUtils";
import Dropdown from "../../../wui-dropdown/src";
import Icon from "../../../wui-icon/src";
import Menu from "../../../wui-menu/src";
import { SelectInfo } from 'rc-menu/lib/interface';
import {getValueByRowKey} from './util';
import { TableProps, IMultiSelectXState } from '../iTable';
import { DefaultRecordType, Key, MenuSelectionsType } from '../interface';
import { ColumnType } from '../iTable';
import { columnType, defaultDragHandleColumn } from '../constant';
import ColumnGroup from '../ColumnGroup';
import Column from '../Column';
import CheckboxW from '../../../wui-checkbox/src';
import { TableInterface } from "../index";
import multiSelectXS from './multiSelectXS'

const {Item} = Menu;
/**
 * 参数: 过滤表头
 * @param {*} Table
 * @param {*} Checkbox
 * @param {*} Popover
 * @param {*} Icon
 */

export default multiSelectXS;

interface CheckStatus {checkedAll?:boolean, indeterminate?: boolean}

export function multiSelectX(Table: React.ComponentClass<Partial<TableProps>> | TableInterface, Checkbox: typeof CheckboxW) {
    return class MultiSelect extends Component<TableProps, IMultiSelectXState> {
        // static propTypes = {
        //     autoCheckedByClickRows: PropTypes.bool, // 行点击时，是否自动勾选复选框
        //     getSelectedDataFunc: PropTypes.func,
        //     onRowClick: PropTypes.func,
        //     autoSelect: PropTypes.bool,
        //     multiSelectConfig: PropTypes.object,
        //     data: PropTypes.any,
        //     columns: PropTypes.any,
        //     rowSelection: PropTypes.any,
        //     expandIconColumnIndex: PropTypes.number,
        //     rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        //     _onDataChange: PropTypes.func,
        //     // fieldid: PropTypes.string
        // };
        static defaultProps = {
            prefixCls: prefix + "-table-mult-select",
            rowKey: 'key',
            getSelectedDataFunc: () => {
            },
            autoSelect: false,
            autoCheckedByClickRows: true,
            multiSelectConfig: {},
            rowSelection: undefined,
        }
        isOld: boolean;

        constructor(props: TableProps) {
		    super(props);
            let {rowSelection, data} = props;
            this.isOld = rowSelection === undefined; // 保存是否是旧版_check的变量，方便比对，减少不必要的遍历操作
            // this.originKeys = this.getOldDataKey(data) //缓存一份初始key的集合,防止外部一些空setstate等操作
            if (this.isOld) { // 旧版数据
                let {_selectedRowKeys, arr, _disableKeys} = this.cleartOldData(data);
                this.state = {
                    isControlled: false,
                    selectedRowKeys: _selectedRowKeys,
                    data: arr,
                    disableKeys: _disableKeys// 兼容旧版的disabled,保持数据统一要去掉改属性，用该数组缓存需要禁选项的key
                }
            } else { // 新版
                rowSelection = rowSelection == null ? {} : rowSelection;
                const {selectedRowKeys, defaultSelectedRowKeys = []} = rowSelection;
                let _selectedRowKeys = selectedRowKeys || defaultSelectedRowKeys;
                this.state = {
                    isControlled: selectedRowKeys !== undefined, // selectedRowKeys === undefined 是非受控，其他是受控
                    selectedRowKeys: _selectedRowKeys,
                    data: data,
                    disableKeys: [] // antd的禁选由getCheckboxProps判断
                }
            }
        }

        UNSAFE_componentWillReceiveProps(nextProps: TableProps) {
            if ('data' in nextProps) {
                let {rowSelection, data} = nextProps;
                this.isOld = rowSelection === undefined; // 保存是否是旧版_check的变量，方便比对，减少不必要的遍历操作
                // 1,行内编辑，data变化，select未变化，重置data
                // 2,排序引发的变化，外部setState空数据，不应影响排序和选中
                // 3, 排序引发data变化data === this.state.data
                // 4，外部传入的data每次map，会导致每次data的引用地址变化，data !== this.state.data为true

                // if(data !== this.state.data && this.getOldDataKey(data).toString() !== this.originKeys.toString()) { // 行编辑只改变了数据，未改变顺序
                if (data !== this.state.data) {
                    // this.originKeys = this.getOldDataKey(data); // 重置
                    if (this.isOld) { // 旧版数据
                        let {_selectedRowKeys, arr, _disableKeys} = this.cleartOldData(data);
                        this.setState({
                            isControlled: false,
                            selectedRowKeys: _selectedRowKeys,
                            data: arr,
                            disableKeys: _disableKeys// 兼容旧版的disabled,保持数据统一要去掉改属性，用该数组缓存需要禁选项的key
                        })
                    } else { // 新版
                        rowSelection = rowSelection == null ? {} : rowSelection;
                        const {selectedRowKeys, defaultSelectedRowKeys = []} = rowSelection;
                        let _selectedRowKeys = selectedRowKeys || defaultSelectedRowKeys;
                        this.setState({
                            isControlled: selectedRowKeys !== undefined, // selectedRowKeys === undefined 是非受控，其他是受控
                            selectedRowKeys: _selectedRowKeys,
                            data: data,
                            disableKeys: [] // antd的禁选由getCheckboxProps判断
                        })
                    }
                }

            }
            if ('rowSelection' in nextProps) {
                let {rowSelection} = nextProps;
                rowSelection = rowSelection == null ? {} : rowSelection;
                const {selectedRowKeys, defaultSelectedRowKeys = []} = rowSelection;
                let _selectedRowKeys = selectedRowKeys || defaultSelectedRowKeys;
                if (selectedRowKeys !== undefined && (_selectedRowKeys.toString() !== this.state.selectedRowKeys.toString())) { // 受控的情况下才更新
                    this.setState({
                        isControlled: selectedRowKeys !== undefined, // selectedRowKeys === undefined 是非受控，其他是受控
                        selectedRowKeys: _selectedRowKeys
                    })
                }
            }
        }

        cleartOldData = (data: DefaultRecordType[]) => {
            let selectRowKeys: Key[] = [];
            let disableKeys: Key[] = [];
            let {arr, _selectedRowKeys, _disableKeys} = this.clearOldTreeData(data, selectRowKeys, disableKeys);
            return {_selectedRowKeys, arr, _disableKeys};
        }

        clearOldTreeData = (arr: DefaultRecordType[], selectRowKeys: Key[], disableKeys: Key[]) => {
            (arr || []).forEach((item, index) => {
                if (item.hasOwnProperty('_checked')) {
                    if (item._checked) {
                        let checkedRowKey = this.getRowKey(item, index);
                        selectRowKeys.push(checkedRowKey)
                    }
                    // delete item._checked
                }
                if (item.hasOwnProperty('_disabled')) {
                    if (item._disabled) {
                        let checkedRowKey = this.getRowKey(item, index);
                        disableKeys.push(checkedRowKey)
                    }
                    // delete item._disabled
                }
                if (item.children && Array.isArray(item.children)) {
                    this.clearOldTreeData(item.children, selectRowKeys, disableKeys)
                }
            })
            return {arr, _selectedRowKeys: selectRowKeys, _disableKeys: disableKeys};
        }

        /**
		 * 获取选中、未选、半选状态
		 * @param {*} data
		 */
        getCheckedOrIndeter(data: DefaultRecordType[]): CheckStatus {
            let obj: CheckStatus = {};
            let CheckStatus = this.checkAllSelected(data);
            if (!CheckStatus) {
                obj.checkedAll = false;
                obj.indeterminate = false;
                return obj;
            }
            if (CheckStatus == 'indeter') {
                obj.indeterminate = true;
                obj.checkedAll = false;
            } else if (CheckStatus == 'all') {
                obj.checkedAll = true;
                obj.indeterminate = false;
            }
            return obj;
        }

        /**
		 * 重写：判断数据是否全部选中
		 * @return "all"-全选，false-未选 ，"indeter"-半选
		 */
        checkAllSelected = (data: DefaultRecordType[]) => {
            if (!Array.isArray(data)) return false;
            if (data.length == 0) return false;
            let {selectedRowKeys, disableKeys} = this.state;
            let {rowSelection} = this.props;
            rowSelection = rowSelection == null ? {} : rowSelection;
            const {getCheckboxProps} = rowSelection;
            // selectedRowKeys可能未包含该展示数据的key
            // let count = (selectedRowKeys || []).length;
            let allKeys: Key[] = []; // 目前所有数据的key集合
            let disabledCount = 0;
            let length = 0;
            let getTree = (arr: DefaultRecordType[]) => {
                arr.forEach((item: DefaultRecordType, index: number) => {
                    length++;
                    let checkedRowKey = this.getRowKey(item, index);
                    allKeys.push(checkedRowKey)
                    let isDisable = (getCheckboxProps && typeof getCheckboxProps === 'function' && getCheckboxProps(item, index).disabled) || disableKeys.includes(checkedRowKey) || false
                    if (isDisable && !selectedRowKeys.includes(checkedRowKey)) { // 禁选并且初始化选中的没有该禁选项
                        disabledCount++;
                    }
                    if (item.children && Array.isArray(item.children)) {
                        getTree(item.children);
                    }
                })
            }
            getTree(data);
            let count = (selectedRowKeys || []).filter(item => allKeys.includes(item)).length; // 排除selectedRowKeys不在本数据中包含的值
            if (length == count + disabledCount && count > 0) {
                return "all";
            }
            return count == 0 ? false : "indeter";
        }
        // 点击全选
        onAllCheckChange = (check: boolean) => {
            let {data, isControlled, disableKeys, selectedRowKeys: preSelectedRowKeys} = this.state;
            let {rowSelection, getSelectedDataFunc} = this.props;
            rowSelection = rowSelection == null ? {} : rowSelection;
            const {onChange, onSelectAll, getCheckboxProps} = rowSelection;
            let selectedRowKeys: Key[] = []; // 选择key集合
            let selectedRows: DefaultRecordType[] = []; // 选择数据的集合
            let changeRows: DefaultRecordType[] = []; // 改变选择状态数据的集合
            let handledData = data.concat(); // 旧版整理后数据的集合
            let getData = (data: DefaultRecordType[], check: boolean, handledData: DefaultRecordType[]) => {
                data.forEach((item, index) => {
                    let checkedRowKey = this.getRowKey(item, index);
                    let isDisable = (getCheckboxProps && typeof getCheckboxProps === 'function' && getCheckboxProps(item, index).disabled) || disableKeys.includes(checkedRowKey) || false; // 是否可点击(兼容_disabled)
                    if (check) { // 全选
                        if (!isDisable || (isDisable && preSelectedRowKeys.includes(checkedRowKey))) { // 可选的情况或者禁选但是初始化已选有该条数据的情况
                            selectedRowKeys.push(checkedRowKey)
                            selectedRows.push(item);
                            if (!preSelectedRowKeys.includes(checkedRowKey)) { // 最初没有选择该条数据
                                changeRows.push(item)
                            }
                            handledData[index]._checked = true;
                            handledData[index]._disabled = isDisable;
                        } else {
                            handledData[index]._checked = false;
                            handledData[index]._disabled = isDisable;
                        }
                    } else { // 取消全选
                        if (isDisable && preSelectedRowKeys.includes(checkedRowKey)) { // 禁选并且该数据初始化已经处于选择状态（取消不了）
                            selectedRowKeys.push(checkedRowKey);
                            selectedRows.push(item);
                            handledData[index]._checked = true;
                            handledData[index]._disabled = isDisable;
                        } else {
                            if (preSelectedRowKeys.includes(checkedRowKey)) { // 改变的是不禁选的并且原来已选择的
                                changeRows.push(item)
                            }
                            handledData[index]._checked = false;
                            handledData[index]._disabled = isDisable;
                        }
                    }
                    if (item.children && Array.isArray(item.children)) {
                        getData(item.children, check, handledData[index].children)
                    }
                })
            }

            getData(data, check, handledData);
            if (!isControlled) { // 非受控
                this.setState({
                    selectedRowKeys
                })
                this.props._onDataChange && this.props._onDataChange(data)
            }

            onChange && onChange(selectedRowKeys, selectedRows)
            onSelectAll && onSelectAll(check, selectedRows, changeRows)
            getSelectedDataFunc && getSelectedDataFunc(selectedRows, undefined, undefined, handledData);
        }

        /**
		 * @description: 获取老版数据选择过后全部的数据状态,需要递归
		 * @param {*}
		 * @return {*}
		 */
        getCheckedData = (selectedRowKeys: Key[] = [], disableKeys: Key[] = [], data: DefaultRecordType[] = []) => {
            let _data = data.concat()
            let setTreeData = (arr: DefaultRecordType[] = []) => {
                arr.forEach((item: DefaultRecordType, index: number) => {
                    let checkedRowKey = this.getRowKey(item, index);
                    item._checked = selectedRowKeys.includes(checkedRowKey);
                    item._disabled = disableKeys.includes(checkedRowKey);
                    if (item.children && Array.isArray(item.children)) {
                        setTreeData(item.children)
                    }
                })
            }
            setTreeData(_data);
            return _data;
        }

        /**
		 * 遍历树节点和它的子孙节点，设置selectedRowKeys
		 */
        setTree = (node: DefaultRecordType, index: number, flag: boolean, autoSelect: boolean) => {
            let _keys: Key[] = []
            let selectedRowKeys: Key[] = _keys.concat((this.state.selectedRowKeys) || [])
            let setTreeNodeFlag = (node: DefaultRecordType, index: number, flag: boolean) => {
                let checkedRowKey = this.getRowKey(node, index);
                if (flag) { // 选中
                    selectedRowKeys.push(checkedRowKey);
                } else {
                    selectedRowKeys = selectedRowKeys.filter(item => item !== checkedRowKey);
                }
                if (node.children && Array.isArray(node.children) && autoSelect) {
                    node.children.forEach((item:DefaultRecordType, i: number) => {
                        setTreeNodeFlag(item, i, flag);
                    })
                }
            }

            setTreeNodeFlag(node, index, flag)
            let selectedRows = this.getSelectedRows(selectedRowKeys);
            let changeRows = this.getChangeRows(selectedRowKeys)
            return {selectedRows, selectedRowKeys, changeRows}
        }


        /**
		 * 获取已选的数据
		 */
        getSelectedRows = (selectedRowKeys: Key[]) => {
            const {data} = this.state;
            let selectedRowArr: DefaultRecordType[] = [];
            let selectedRows = this.getTreeSelectData(data, selectedRowKeys, selectedRowArr)
            return selectedRows
        }

        /**
		 * tree数据遍历，获取已选数据
		 */
        getTreeSelectData = (data: DefaultRecordType[], selectedRowKeys: Key[], selectedRowArr: DefaultRecordType[]) => {
            data.forEach((item, index) => {
                let checkedRowKey = this.getRowKey(item, index);
                if (selectedRowKeys.includes(checkedRowKey)) {
                    selectedRowArr.push(item)
                }
                if (item.children && Array.isArray(item.children)) {
                    this.getTreeSelectData(item.children, selectedRowKeys, selectedRowArr)
                }
            })
            return selectedRowArr;
        }

        /**
		 * 全选时候获取改变的数据
		 */
        getChangeRows = (selectedRowKeys: Key[]) => {
            const {selectedRowKeys: preSelectedRowKeys} = this.state;
            let changRowKeys = this.getArrDifference(selectedRowKeys, preSelectedRowKeys);
            let changeRows = this.getSelectedRows(changRowKeys)
            return changeRows
        }

        getArrDifference = (arr1: Key[], arr2: Key[]) => {
            return arr1.concat(arr2).filter(function(v, _i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
            });
        }

        // 获取每行的唯一键
        getRowKey(record: DefaultRecordType, index: number) {
            return getValueByRowKey(this.props.rowKey, record, index);
        }

        // 点击单行勾选
        onCheckboxChange = (_text: any, record: DefaultRecordType, index: number) => (check: boolean, e: React.MouseEvent<HTMLElement>) => {
            let {rowKey, autoSelect = true, rowSelection, getSelectedDataFunc} = this.props;
            rowSelection = rowSelection == null ? {} : rowSelection;
            const {onChange, onSelect} = rowSelection;
            let {data, isControlled, disableKeys} = this.state;
            // 当前选中行的唯一键值
            let checkedRowKey = this.getRowKey(record, index);
            if (!checkedRowKey && checkedRowKey !== 0 && checkedRowKey !== '0') return
            // 从数据(含树形数据)中匹配出当前勾选的行对象
            let matchResults =
        		TreeUtils.findWithPropName(data, (row: DefaultRecordType, i: number) => {
        		    return (typeof rowKey == 'function') ? rowKey(row, i) : row[rowKey];
        		}, checkedRowKey, true, true);
            let matchRecord = matchResults.length > 0 ? matchResults[0] : null;
            if (!matchRecord) return;

            // 设置当前勾选行对象的选中状态
            let {selectedRows, selectedRowKeys} = this.setTree(matchRecord, index, check, autoSelect);

            let checkedData = this.getCheckedData(selectedRowKeys, disableKeys, data);

            if (!isControlled) { // 非受控
                this.setState({
                    selectedRowKeys
                })
                this.props._onDataChange && this.props._onDataChange(data)
            }

            onChange && onChange(selectedRowKeys, selectedRows)
            onSelect && onSelect(matchRecord, check, selectedRows, e)
            getSelectedDataFunc && getSelectedDataFunc(selectedRows, record, index, checkedData); // record需要带_checked
        };


        onSelect = ({key}: SelectInfo) => {
            // const { onSelectionSelect } = this.props;
            // onSelectionSelect && onSelectionSelect(item, key, selectKeys)
            const {data} = this.state;
            const {rowSelection = {}} = this.props;
            const {selections} = rowSelection;
            let list = this.changeableRowKeys(data);
            if (selections && Array.isArray(selections)) {
                const _index = selections.findIndex((el: DefaultRecordType) => el.key == key) as number
                const onSelect = selections[_index].onSelect
                _index > -1 && onSelect && onSelect(list)
            }
        }

        changeableRowKeys = (data: DefaultRecordType[]): Key[] => {
            let list: Key[] = [];
            this.getChangeableRowKeys(data, list)
            return list;
        }

        getChangeableRowKeys = (data: DefaultRecordType[], list:Key[] = []) => {
            data.filter(v => !v.disabled).forEach((record, index) => {
                let _key: Key = this.getRowKey(record, index)
                list.push(_key)
                if (record.children && Array.isArray(record.children)) {
                    this.getChangeableRowKeys(record.children, list)
                }
            })
        }


        checkAllClick = (data:DefaultRecordType[], getCheckboxProps:((record?:DefaultRecordType, index?: number) => Record<string, any>) | undefined, disableKeys: Key[]) => {
            let dataLength = 0;
            let disabledCount = 0;
            let checkFun = (data: DefaultRecordType[]) => {
                data.forEach((item: DefaultRecordType, index: number) => {
                    let checkedRowKey = this.getRowKey(item, index);
                    dataLength++;
                    let isDisable = (getCheckboxProps && typeof getCheckboxProps === 'function' && getCheckboxProps(item, index).disabled) || disableKeys.includes(checkedRowKey) || false
                    if (isDisable) {
                        disabledCount++;
                    }
                    if (item.children && Array.isArray(item.children)) {
                        checkFun(item.children)
                    }
                })
            }
            checkFun(data)
            return {dataLength, disabledCount}
        }


        getDefaultColumns = (columns: ColumnType<DefaultRecordType>[]) => {
            let {multiSelectConfig, rowSelection = {}, children} = this.props;
            rowSelection = rowSelection == null ? {} : rowSelection;
            const {
                columnTitle,
                columnWidth,
                fixed,
                hideSelectAll,
                renderCell,
                selections,
                getCheckboxProps
            } = rowSelection;
            let {data, selectedRowKeys, disableKeys} = this.state;
            let {checkedAll, indeterminate} = this.getCheckedOrIndeter(data);
            let {dataLength, disabledCount} = this.checkAllClick(data, getCheckboxProps, disableKeys)
            const menu = (
                <Menu onSelect={this.onSelect}>
                    {
                        ((selections || []) as MenuSelectionsType[]).map((data: MenuSelectionsType) => {
                            return <Item key={data.key}>{data.text}</Item>
                        })
                    }
                </Menu>
            )

            const selectionsView = <Dropdown trigger={['click']} overlay={menu} transitionName='slide-up'>
                <Icon type="uf-anglearrowdown"/>
            </Dropdown>

            let title = columnTitle ? columnTitle : hideSelectAll ? null : (
                <>
                    <Checkbox
                        className="table-checkbox"
                        checked={!!checkedAll}
                        indeterminate={indeterminate}
                        {...multiSelectConfig}
                        // {...fieldidAttr}
                        disabled={disabledCount == dataLength}
                        onChange={this.onAllCheckChange}
                    />
                    {selections && Array.isArray(selections) ? selectionsView : null}
                </>
            )

            let _defaultColumns: ColumnType<DefaultRecordType>[] = [{
                className: `${prefix}-table-multiSelect-column`,
                title: title,
                key: "checkbox",
                dataIndex: "checkbox",
                fixed: typeof fixed === 'boolean' ? !!fixed : 'left',
                width: columnWidth || 40,
                render:
        			renderCell && typeof renderCell === 'function' ?
        			    (text, record, index) => renderCell(text, record, index) :
        			    (text, record, index) => {
        			        let _getCheckboxProps = getCheckboxProps && typeof getCheckboxProps === 'function' ? {...getCheckboxProps(record, index)} : {}
        			        let checkedRowKey = this.getRowKey(record, index);
        			        let _checked = selectedRowKeys.includes(checkedRowKey);
        			        // let _disabled = disableKeys.includes(checkedRowKey); //兼容旧版的_disabled
        			        // let recordFieldidAttr = fieldid ? {fieldid} : {}
        			        return <Checkbox
        			            key={index}
        			            className="table-checkbox"
        			            {...multiSelectConfig}
        			            {..._getCheckboxProps}
        			            // {...recordFieldidAttr}
        			            disabled={this.isOld ? disableKeys.includes(checkedRowKey) : _getCheckboxProps.disabled}
        			            checked={_checked}
        			            onChange={this.onCheckboxChange(text, record, index)}
        			        />
        			    }
            }]
            // columns === undefined && children 说明是jsx的形式生成的
            if (columns === undefined && children && Array.isArray(children)) {
                return this.normalize(children, _defaultColumns)
            } else {
                return _defaultColumns.concat(columns);
            }
        }

        normalize = (elements: React.ReactElement[], _defaultColumns: ColumnType<DefaultRecordType>[]) => {
            const columns:ColumnType<DefaultRecordType>[] = [];
            React.Children.forEach(elements, element => {
                if (!(element && (element.type === Column || element.type === ColumnGroup))) return;
                let column = {...element.props};
                let _columnType = column.columnType || columnType.DEFAULTTYPE;
                if (element.key) {
                    column.key = element.key;
                }
                if (element.type === ColumnGroup) {
                    column.children = this.normalize(column.children, _defaultColumns);
                }
                if (_columnType === columnType.ROWDRAG) { // 拖拽行
                    column = {
                        ...defaultDragHandleColumn,
                        ...column
                    }
                }
                if (_columnType === columnType.MULTISELECT) { // 多选
                    column = {
                        ..._defaultColumns[0],
                        ...column
                    }
                }
                columns.push(column);
            });
            return columns;
        }

        // 实现行点击时触发多选框勾选的需求
        onRowClick = (record: DefaultRecordType, index: number, event: React.MouseEvent<HTMLElement>) => {
            let {autoCheckedByClickRows, onRowClick} = this.props;
            let {rowSelection} = this.props;
            rowSelection = rowSelection == null ? {} : rowSelection;
            const {getCheckboxProps} = rowSelection;
            if (autoCheckedByClickRows) {
                let isDisable = (getCheckboxProps && typeof getCheckboxProps === 'function' && getCheckboxProps(record, index).disabled) || record._disabled || false; // 是否可点击
                if (isDisable) return;// disabled只控制checkbox不可用，不能影响onRowClick的回调
                let checkedRowKey = this.getRowKey(record, index);
                let check = this.state.selectedRowKeys.includes(checkedRowKey);
                this.onCheckboxChange('', record, index)(!check, event);
            }
            onRowClick && onRowClick(record, index, event);
        }

        _onDataChange = (data:DefaultRecordType[]) => {
            this.setState({data})
            this.props._onDataChange && this.props._onDataChange(data)
        }
        render() {
		    const {columns, expandIconColumnIndex} = this.props;
		    const {data} = this.state;
		    return <Table {...this.props}
            			  columns={this.getDefaultColumns(columns)}
            			  data={data}
            			  onRowClick={this.onRowClick}
            			  expandIconColumnIndex={expandIconColumnIndex ? expandIconColumnIndex + 1 : 1}
            			  selectedRowKeys={this.state.selectedRowKeys}
            			  _onDataChange={this._onDataChange}
                selectType={false}
		    />
        }
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
