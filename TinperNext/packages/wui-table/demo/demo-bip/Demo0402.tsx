/**
 *
 * @title 多列表头
 * @parent 列渲染 Custom Render
 * @description columns[n] 可以内嵌 children，以渲染分组表头。
 * @type bip
 * 自定义表头高度需要传headerHeight，注：修改th的padding top和bottom置为0，否则会有影响
 * 多列表头拖拽的时候,原则只拖拽叶子节点的表头。
 * demo0402
 */

import {Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";

const {dragColumn} = Table;


const columns: TableProps['columns'] = [
    {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: 100,
        fixed: "left"
    },
    {
        title: "个人信息",
        width: 600,
        dataIndex: 'info',
        key: 'info',
        children: [
            {
                title: "年龄",
                dataIndex: "age",
                key: "age",
                width: 200
            },
            {
                title: "地址",
                dataIndex: 'adds',
                key: 'adds',
                children: [
                    {
                        title: "街道",
                        dataIndex: "street",
                        key: "street",
                        width: 200
                    },
                    {
                        title: "单元",
                        dataIndex: 'dy',
                        key: 'dy',
                        children: [
                            {
                                title: "楼号",
                                dataIndex: "building",
                                key: "building",
                                width: 100
                            },
                            {
                                title: "门户",
                                dataIndex: "number",
                                key: "number",
                                width: 100
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: "公司信息",
        width: 400,
        dataIndex: 'comi',
        key: 'comi',
        children: [
            {
                title: "公司地址",
                dataIndex: "companyAddress",
                key: "companyAddress",
                width: 200,
            },
            {
                title: "公司名称",
                dataIndex: "companyName",
                key: "companyName",
                width: 200,
            }
        ]
    },
    {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        width: 60,
        fixed: "right"
    }
];

const data: TableProps['data'] = [];
for (let i = 0; i < 20; i++) {
    data.push({
        key: i,
        name: "John Brown",
        age: i + 1,
        street: "Lake Park",
        building: "C",
        number: 2035,
        companyAddress: "北清路 68 号",
        companyName: "用友",
        gender: "男"
    });
}

const DragColumnTable = dragColumn(Table);

class Demo12 extends Component {
    render() {
        return (
            <DragColumnTable
                className={'demo32'}
                columns={columns}
                data={data}
                bordered
                dragborder={true}
                onDropBorder={(e: React.MouseEvent<HTMLElement>, width: number) => {
                    console.log(width + "--调整列宽后触发事件", e.target);
                }}
                scroll={{y: 240}}
            />
        );
    }
}

export default Demo12;
