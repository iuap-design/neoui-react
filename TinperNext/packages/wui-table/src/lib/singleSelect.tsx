// import PropTypes from 'prop-types';
import React, {Component} from "react";
import {prefix} from "../../../wui-core/src/index"
import {ObjectAssign, getValueByRowKey} from './util';
import { TableProps, ISingleSelectState } from '../iTable';
import { DefaultRecordType } from '../interface';
import { ColumnType } from '../iTable';
import RadioWrapper from '../../../wui-radio/src';
import { TableInterface } from "../index";
import TreeUtils from "../../../wui-core/src/TreeUtils";
// import Radio from '../../../wui-radio/src';
// const { Group } = Radio;
import { columnType, defaultDragHandleColumn } from '../constant';
import ColumnGroup from '../ColumnGroup';
import Column from '../Column';

import singleSelectXS from './singleSelectXS'

export default singleSelectXS;

/**
 * 参数: 单选表头
 * @param {*} Table
 * @param {*} Radio
 */

export function singleSelect(Table: React.ComponentClass<Partial<TableProps>> | TableInterface, Radio: typeof RadioWrapper) {

    return class SingleSelect extends Component<TableProps, ISingleSelectState> {
        // static propTypes = {
        //     autoCheckedByClickRows: PropTypes.bool, // 行点击时，是否自动勾选单选框
        //     getSelectedDataFunc: PropTypes.func,
        //     onRowClick: PropTypes.func,
        //     autoSelect: PropTypes.bool,
        //     multiSelectConfig: PropTypes.object,
        //     data: PropTypes.any,
        //     columns: PropTypes.any,
        //     selectedRowIndex: PropTypes.number,
        //     rowSelection: PropTypes.any,
        //     // fieldid: PropTypes.string
        // };
        static defaultProps = {
            prefixCls: `${prefix}-table-single-select`,
            rowKey: 'key',
            getSelectedDataFunc: () => {
            },
            // selectedRowIndex: false,
            autoCheckedByClickRows: true
        }

        isOld: boolean;

        constructor(props: TableProps) {
		    super(props);
		    let {rowSelection, data, selectedRowIndex} = props;
		    this.isOld = rowSelection === undefined;
		    if (this.isOld) { // 旧版数据
		        let selectedRowKeys = typeof selectedRowIndex === 'number' && data[selectedRowIndex] ? [this.getRowKey(data[selectedRowIndex], selectedRowIndex)] : []
		        this.state = {
		            isControlled: selectedRowIndex !== undefined,
		            data: ObjectAssign(props.data) as DefaultRecordType[],
		            selectedRowKeys
		        }
		    } else { // 新版
		        rowSelection = rowSelection == null ? {} : rowSelection;
		        const {selectedRowKeys, defaultSelectedRowKeys = []} = rowSelection;
		        let _selectedRowKeys = selectedRowKeys || defaultSelectedRowKeys;
		        let oldSelectedRowKeys = typeof selectedRowIndex === 'number' && data[selectedRowIndex] ? [this.getRowKey(data[selectedRowIndex], selectedRowIndex)] : []
		        // 可控： 存在selectedRowKeys或者存在selectedRowIndex
		        this.state = {
		            isControlled: selectedRowKeys !== undefined || selectedRowIndex !== undefined,
		            selectedRowKeys: _selectedRowKeys.length ? [_selectedRowKeys[0]] : oldSelectedRowKeys,
		            data: data,
		        }
		    }
        }

        UNSAFE_componentWillReceiveProps(nextProps: TableProps) {
		    if ('data' in nextProps) {
		        this.setState({
		            data: ObjectAssign(nextProps.data) as DefaultRecordType[],
		        })
		    }
		    if ('selectedRowIndex' in nextProps) {
		        const { selectedRowIndex, data, rowSelection } = nextProps;
		        this.isOld = rowSelection === undefined;
		        if (this.isOld) {
		            let selectedRowKeys = typeof selectedRowIndex === 'number' && data[selectedRowIndex] ? [this.getRowKey(data[selectedRowIndex], selectedRowIndex)] : []
		            this.setState({
		                isControlled: selectedRowIndex !== undefined,
		                selectedRowKeys
		            })
		        }
		    }

		    if ('rowSelection' in nextProps) {
		        let {rowSelection, data, selectedRowIndex} = nextProps;
		        rowSelection = rowSelection == null ? {} : rowSelection;
		        const {selectedRowKeys, defaultSelectedRowKeys = []} = rowSelection;
		        let _selectedRowKeys = selectedRowKeys || defaultSelectedRowKeys;
		        let oldSelectedRowKeys = typeof selectedRowIndex === 'number' && data[selectedRowIndex] ? [this.getRowKey(data[selectedRowIndex], selectedRowIndex)] : []
		        let newSelectedRowKeys = _selectedRowKeys.length ? [_selectedRowKeys[0]] : oldSelectedRowKeys;
		        if (selectedRowKeys !== undefined || selectedRowIndex !== undefined && newSelectedRowKeys.toString() !== this.state.selectedRowKeys.toString()) { // 受控的情况下才更新
		            this.setState({
		                isControlled: selectedRowKeys !== undefined || selectedRowIndex !== undefined,
		                selectedRowKeys: newSelectedRowKeys,
		            })
		        }
		    }
        }

        onRadioChange = (record: DefaultRecordType, index: number, event: React.MouseEvent<HTMLElement>) => {
            let { data, selectedRowKeys, isControlled } = this.state;
            let { rowKey, rowSelection, getSelectedDataFunc, antd } = this.props;
            const {onSelect = undefined, onChange = undefined } = rowSelection == null ? {} : rowSelection;
            let checkedRowKey = this.getRowKey(record, index);
            let matchResults =
        		TreeUtils.findWithPropName(data, (row: DefaultRecordType, i: number) => {
        		    return (typeof rowKey == 'function') ? rowKey(row, i) : row[rowKey];
        		}, checkedRowKey, true, true);
            let matchRecord = matchResults.length > 0 ? matchResults[0] : null;
            if (!matchRecord) return;
            let _selectedRowKeys = this.getRowKey(matchRecord, index);
            if (selectedRowKeys[0] === _selectedRowKeys) {
                if (!isControlled) { // 非受控
                    this.setState({selectedRowKeys: []});
                }
                getSelectedDataFunc && getSelectedDataFunc();
                // antd没有单选取消事件，tinper有，且tinper受控的话需要对外返回事件
                if (!antd) {
                    onSelect && onSelect(record, false, [record], event)
                	onChange && onChange([], []);
                }
            } else {
                if (!isControlled) { // 非受控
                    this.setState({selectedRowKeys: [_selectedRowKeys]});
                }
                getSelectedDataFunc && getSelectedDataFunc(record, index, event);
                onSelect && onSelect(record, true, [record], event)
                onChange && onChange([checkedRowKey], [record]);
            }
        }

        // 获取每行的唯一键
        getRowKey(record: DefaultRecordType, index: number) {
            return getValueByRowKey(this.props.rowKey, record, index);
        }

        getDefaultColumns = (columns: ColumnType<DefaultRecordType>[]) => {
            let {selectedRowKeys} = this.state;
            const {rowSelection = {}, children} = this.props;
            const {columnTitle, columnWidth, fixed, renderCell, getCheckboxProps} = rowSelection;
            let _defaultColumns: ColumnType<DefaultRecordType>[] = [{
                className: `${prefix}-table-single-column`,
                title: columnTitle || '',
                key: "radio",
                dataIndex: "radio",
                fixed: typeof fixed === 'boolean' ? !!fixed : 'left',
                width: columnWidth || 40,
                render: renderCell && typeof renderCell === 'function' ? (text: any, record: DefaultRecordType, index: number) => renderCell(text, record, index) : (_text: any, record: DefaultRecordType, index: number) => {
                    let _getCheckboxProps = getCheckboxProps && typeof getCheckboxProps === 'function' ? {...getCheckboxProps(record)} : {}
                    return <RadioWrapper.Group
                        Component='div'
                        className="table-radio"
                        name="table-radio"
                        value={selectedRowKeys[0]}
                        onClick={(_v: string | boolean | number, e: React.MouseEvent<HTMLElement>) => this.onRadioChange(record, index, e)}
                        // onChange={(_v: string | boolean | number, e: React.MouseEvent<HTMLElement>) => this.onRadioChange(record, index, e)}
                        style={{width: '14px', height: '14px', display: 'block'}}>
                        <Radio value={this.getRowKey(record, index)} {..._getCheckboxProps}/>
                    </RadioWrapper.Group>
                }
            }]
            if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
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
                if (_columnType === columnType.SINGLESELECT) { // 单选
                    column = {
                        ..._defaultColumns[0],
                        ...column
                    }
                }
                columns.push(column);
            });
            return columns;
        }

        // 实现行点击时触发单选框勾选的需求
        onRowClick = (record: DefaultRecordType, index: number, event: any) => {
            let {autoCheckedByClickRows, onRowClick} = this.props;
            if (autoCheckedByClickRows) {
                if (event.target?.tagName !== 'INPUT' && event?.target?.name !== 'table-radio') {
                    this.onRadioChange(record, index, event);
                }
            }
            onRowClick && onRowClick(record, index, event);
        }

        getRowClassName = (record: DefaultRecordType, index: number) => {
            let {selectedRowKeys} = this.state;
            if (selectedRowKeys[0] === this.getRowKey(record, index)) {
                return 'selected';
            } else {
                return '';
            }
        }

        render() {
		    const {columns, expandIconColumnIndex} = this.props;
		    const {data} = this.state;
		    return <Table
		        {...this.props}
		        columns={this.getDefaultColumns(columns)}
		        data={data}
		        onRowClick={this.onRowClick}
		        rowClassName={this.getRowClassName}
		        expandIconColumnIndex={expandIconColumnIndex ? expandIconColumnIndex + 1 : 1}
                selectType={false}
		    />
        }
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
