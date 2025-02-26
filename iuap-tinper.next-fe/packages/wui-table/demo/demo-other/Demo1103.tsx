/**
 *
 * @title 自定义表格标题、表尾、选中行颜色
 * @parent 扩展行 Expanded Row
 * @description 可根据业务场景设置不同的`title`和`footer`。选中行颜色可用rowClassName作为选择器自定义css样式。
 * @type other
 * demo1103
 */

import {Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;


const columns: TableProps['columns'] = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 150, className: "rowClassName"},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
    {title: "性别", dataIndex: "c", key: "c", width: 100},
    {title: "部门", dataIndex: "d", key: "d", width: 100}
];

const data: TableProps['data'] = [
    {a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1"},
    {a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2"},
    {a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3"}
];
interface Demo26State {
    data: TableProps['data'];
    selectedRowIndex: number;
}
class Demo26 extends Component<{}, Demo26State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            data: data,
            selectedRowIndex: 0
        }
    }

    render() {
        return (
            <Table
                columns={columns}
                data={data}
                rowClassName={(_record: DefaultRecordType, index: number, _indent: number) => {
                    if (this.state.selectedRowIndex == index) {
                        return 'selected';
                    } else {
                        return '';
                    }
                }}
                onRowClick={(_record: DefaultRecordType, index: number, _event?: React.MouseEvent<HTMLElement>) => {
                    this.setState({
                        selectedRowIndex: index
                    });
                }}
                title={() => <div>员工信息统计表</div>}
                footer={() => <div>合计: 共{data.length}条数据</div>}
            />
        );
    }
}

export default Demo26;
