/*
 * @Author: Mr.mjc
 * @Date: 2022-06-15 17:39:30
 * @LastEditors: MJC
 * @LastEditTime: 2023-07-19 10:28:51
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/lib/dragColumn.tsx
 */
import PropTypes from "prop-types";
import React, {Component} from "react";
import {prefix} from "../../../wui-core/src/index";
import { TableProps, IDragColumnState, ColumnType, DropType } from '../iTable';
import { DefaultRecordType } from '../interface';
import { TableInterface } from "../index";
import cacheTarget from './cache';
import { normalize } from '../lib/utils'

/**
 * 参数: 列拖拽
 * @param {*} Table
 */

export default function dragColumn(Table: React.ComponentClass<Partial<TableProps>> | TableInterface) {

    return class DragColumn extends Component<TableProps, IDragColumnState> {

		static propTypes = {
		    columns: PropTypes.any,
		    data: PropTypes.any,
		    onDragEnd: PropTypes.func,
		    dragborder: PropTypes.bool,
		    draggable: PropTypes.bool,
		}

		constructor(props: TableProps) {
		    super(props);
		    let { cacheId, columns, children } = props;
		    if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		        columns = normalize(children)
		    }
		    if (cacheId && typeof cacheId === 'string') {
		        columns = cacheTarget.get(cacheId, columns)
		    }
		    this.state = {
		        columns: this.setColumOrderByIndex(columns)
		    };
		}

		UNSAFE_componentWillReceiveProps(nextProps: TableProps) {
		    if (nextProps.columns != this.props.columns) {
		        let { cacheId, columns, children } = nextProps;
		        if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		            columns = normalize(children)
		        }
		        if (cacheId && typeof cacheId === 'string') {
		            columns = cacheTarget.get(cacheId, columns)
		        }
		        this.setState({
		            columns: this.setColumOrderByIndex(columns)
		        })
		    }
		}

		setColumOrderByIndex = (_column: ColumnType[]): ColumnType[] => {
		    const column = _column.map((da, i) => {
		        return Object.assign({}, da, {
		            dragIndex: i,
		            drgHover: false
		        })
		    });
		    return column;
		}

		// 拖拽交互列后触发
		onDragEnd = (event: React.DragEvent<HTMLElement>, data: DropType<DefaultRecordType>) => {
		    let {dragSource = {}, dragTarget = {}} = data;
		    const { cacheId } = this.props;
		    let {columns} = this.state;
		    let sourceIndex = -1, targetIndex = -1;

		    sourceIndex = columns.findIndex((da) => da.key == dragSource.key);
		    targetIndex = columns.findIndex((da) => da.key == dragTarget.key);
		    // 向前移动
		    if (targetIndex < sourceIndex) {
		        targetIndex = targetIndex + 1;
		    }
		    columns.splice(
		        targetIndex,
		        0,
		        columns.splice(sourceIndex, 1)[0]
		    );
		    let sortedColumns:ColumnType[] = [];
		    columns.forEach((da) => {
		        sortedColumns.push(Object.assign({}, da));
		    });
		    if (cacheId && typeof cacheId === 'string') {
		        cacheTarget.set(cacheId, sortedColumns)
		    }
		    this.setState({
		        columns: sortedColumns
		    });
		    if (this.props.onDragEnd) {
		        this.props.onDragEnd(event, data, sortedColumns);
		    }
		}

		render() {
		    const {
		        data,
		        dragborder,
		        draggable,
		        className,
		        ...others
		    } = this.props;
		    return (
		        <Table
		            {...others}
		            columns={this.state.columns}
		            data={data}
		            className={`${className} ${prefix}-table-drag-border`}
		            onDragEnd={this.onDragEnd}
		            draggable={draggable}
		            dragborder={dragborder}
		        />)
		}
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
