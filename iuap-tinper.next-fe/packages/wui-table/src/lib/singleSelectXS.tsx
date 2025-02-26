import React, {Component} from "react";
import { TableProps, ISingleSelectState } from '../iTable';
import RadioWrapper from '../../../wui-radio/src';
import { TableInterface } from "../index";


export default function singleSelect(Table: React.ComponentClass<Partial<TableProps>> | TableInterface, _Radio: typeof RadioWrapper) {
    return class SingleSelect extends Component<TableProps, ISingleSelectState> {
        constructor(props: TableProps) {
		    super(props);
        }
        render() {
		    return <Table {...this.props} selectType={'radio'}></Table>
        }
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
