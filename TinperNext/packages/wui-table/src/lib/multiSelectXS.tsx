import React, {Component} from "react";
import { TableProps, IMultiSelectXState } from '../iTable';
import CheckboxW from '../../../wui-checkbox/src';
import { TableInterface } from "../index";

export default function multiSelectX(Table: React.ComponentClass<Partial<TableProps>> | TableInterface, _Checkbox: typeof CheckboxW) {
    return class MultiSelect extends Component<TableProps, IMultiSelectXState> {
        constructor(props: TableProps) {
		    super(props);
        }
        render() {
            return <Table {...this.props} selectType={'checkbox'}></Table>
        }
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
