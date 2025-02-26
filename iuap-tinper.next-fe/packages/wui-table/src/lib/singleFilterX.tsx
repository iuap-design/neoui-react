/**
 * 重构单列过滤旧版高级组件入口
 * */
import React, {Component} from "react";
import { TableProps, ISingleFilterState} from '../iTable';
import { TableInterface } from "../index";


export default function singleFilter(Table: React.ComponentClass<Partial<TableProps>> | TableInterface) {
    return class SingleFilterTable extends Component<TableProps, ISingleFilterState> {
        constructor(props: TableProps) {
		    super(props);
        }
        render() {
		    return <Table {...this.props} singleFilter={true}/>;
        }
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
