import React, {Component} from "react";
import { TableProps, IBigDataXState } from '../iTable';
import { TableInterface } from "../index";
export default function bigDataXS(Table: React.ComponentClass<Partial<TableProps>> | TableInterface) {
    return class BigDataX extends Component<TableProps, IBigDataXState> {
        constructor(props: TableProps) {
		    super(props);
        }
        render() {
            return <Table {...this.props} isBigData={true}></Table>
        }
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}