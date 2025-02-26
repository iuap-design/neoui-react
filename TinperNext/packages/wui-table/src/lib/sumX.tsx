import React from "react";
import { TableProps } from '../iTable';
import { DefaultRecordType } from '../interface';
import {WithConfigConsumer} from "../../../wui-provider/src/context";
import { TableInterface } from "../index";

// showSum: 'subtotal'(小计) - 默认/ 'total'(合计) / true(小计合计) / , // 默认为展示小计，不影响原来逻辑
export const defaultProps = {
    showSum: ['subtotal']
}

export default function sum(Table: React.ComponentClass<Partial<TableProps>> | TableInterface, precision = 2) {
    class SumTable extends React.Component<TableProps, {}> {
        static defaultProps = {...defaultProps};
        constructor(props: TableProps<DefaultRecordType>,) {
            super(props);
        }

        render() {
		    return (
		        <Table
                    sumPrecision={precision}
                    showSum={this.props.showSum}
		            {...this.props}
		        />
		    );
        }
    }
    return WithConfigConsumer()(SumTable) as React.ComponentClass<Partial<TableProps>> | TableInterface
}
