/*
 * @Author: Mr.mjc
 * @Date: 2022-07-05 14:09:58
 * @LastEditors: MJC
 * @LastEditTime: 2023-12-06 18:34:16
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/lib/sum.tsx
 */
import objectPath from 'object-path';
// import PropTypes from 'prop-types';
import React from "react";
import {DicimalFormater, normalize} from "./utils";
// import {getLangInfo} from "../../../wui-locale/src/tool";
// import i18n from "./i18n";
import { TableProps, ColumnType, ColumnsType } from '../iTable';
import { DefaultRecordType } from '../interface';
import {WithConfigConsumer} from "../../../wui-provider/src/context";
import { TableInterface } from "../index";
import sumX from './sumX';

export default sumX;

export function sum(Table: React.ComponentClass<Partial<TableProps>> | TableInterface, precision = 2) {
    class SumTable extends React.Component<TableProps, {}> {
        // 无状态
        constructor(props: TableProps<DefaultRecordType>,) {
            super(props);
        }

        // static propTypes = {
        //     columns: PropTypes.any,
        //     sort: PropTypes.any,
        //     data: PropTypes.any,
        //     onDropBorder: PropTypes.func,
        //     _onDataChange: PropTypes.func,
        //     fieldid: PropTypes.string,
        //     locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        // }


		getNodeItem = (array: DefaultRecordType[], newArray: DefaultRecordType[]) => {
		    array.forEach((da:DefaultRecordType) => {
		        if (da.children) {
		            this.getNodeItem(da.children, newArray);
		        } else {
		            newArray.push(da);
		        }
		    });
		}

		/**
		 * 获取当前的表格类型。
		 *
		 */
		getTableType = (columns: any) => {
		    // const {columns} = this.props;
		    let type = "array";
		    columns.find((da: any) => {
		        if (da.children) {
		            type = "tree";
		            return type;
		        }
		    })
		    return type;
		}

		toThousands(num: number | string) {
		    let source = String(num || 0).split(".");// 按小数点分成2部分
		    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");// 只将整数部分进行都好分割
		    return source.join(".");// 再将小数部分合并进来
		}

		addSumData = () => {
		    let {data = [], columns, children} = this.props;
		    if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		        columns = normalize(children)
		    }
		    let sumdata = {}, newColumns:ColumnsType<DefaultRecordType> = [];
		    if (!Array.isArray(columns)) {
		        // console.log("columns type is error !");
		        return data;
		    }
		    let type = this.getTableType(columns);
		    if (type == 'tree') {
		        this.getNodeItem(columns, newColumns);
		    } else {
		        newColumns = columns;
		    }
		    // 返回一个新的数据
		    // newData = data.slice();
		    // let locale = getLangInfo(this.props.locale, i18n)
		    newColumns.forEach((column: Required<ColumnType<DefaultRecordType>>, _index: number) => {
		        sumdata[column.dataIndex] = "";
		        // eslint-disable-next-line dot-notation
		        sumdata['key'] = `table_sum`; // 没有key会导致hover状态与固定列不同步
		        if (column.sumCol) {
		            let count = 0;
		            data.forEach(da => {

		                // let _num = parseFloat(da[column.key]);
		                let colDataIndex = column.key || column.dataIndex
		                let _num = parseFloat(objectPath.has(da, colDataIndex) ? objectPath.get(da, colDataIndex) : objectPath.get(da, [colDataIndex]))
		                // 排查字段值为NAN情况
		                if (!isNaN(_num)) {
		                // if (_num == _num) {
		                    count += _num;
		                }
		            })
		            let sum = DicimalFormater(count, precision);
		            if (column.sumThousandth) {
		                sum = this.toThousands(sum)
		            }
		            sumdata[column.dataIndex] = sum;
		            if (column.sumRender && typeof column.sumRender == 'function') {
		                sumdata[column.dataIndex] = column.sumRender(sum)
		            }

		        }
		    })
		    return sumdata
		}

		_onDataChange = (data: DefaultRecordType[]) => {
		    this.setState({data})
		    this.props._onDataChange && this.props._onDataChange(data)
		}

		render() {
		    return (
		        <Table
		            {...this.props}
		            columns={this.props.columns}
		            showSum={['subtotal']}
		            sumdata={this.addSumData()}
		            sumPrecision={precision}
		            _onDataChange={this._onDataChange}
		        />
		    );
		}
    }
    return WithConfigConsumer()(SumTable) as React.ComponentClass<Partial<TableProps>> | TableInterface
}
