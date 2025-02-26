// import { FieldTypes, MetaTypes, UIObject, TypeProps } from '../../wui-core/src/maniProps';
const { FieldTypes, MetaTypes, UIObject, TypeProps } = require('../../wui-core/src/maniProps.ts');

module.exports = {
    name: "表格",
    code: "Table",
    label: "表格",
    icon: "ynfcomponent ynfc-Table",
    type: TypeProps.TableControls,
    UIObject: UIObject.Controls,
    props: [
        {
            name: "表格类型",
            code: "tableType",
            type: MetaTypes.Select,
            options: [
                { label: "普通表格", value: "normal" },
                { label: "树形表格", value: "tree" },
            ],
            defaultValue: "normal",
            isRequired: true,
            isShow: true,
            description: "表格类型",
        },
        {
            name: "表格列",
            code: "columns",
            type: FieldTypes.array,
            isRequired: true,
            isShow: true,
            description: "表格列",
            defaultValue: [
                {
                    title: "列1",
                    dataIndex: "col1",
                    key: "col1",
                    width: 100,
                },
                {
                    title: "列2",
                    dataIndex: "col2",
                    key: "col2",
                    width: 100,
                },
                {
                    title: "列3",
                    dataIndex: "col3",
                    key: "col3",
                    width: 100,
                },
            ],
        },
        {
            name: "表格数据",
            code: "dataSource",
            type: FieldTypes.array,
            isRequired: true,
            isShow: true,
            description: "表格数据",
            defaultValue: [
                {
                    col1: "1",
                    col2: "2",
                    col3: "3",
                },
                {
                    col1: "1",
                    col2: "2",
                    col3: "3",
                },
                {
                    col1: "1",
                    col2: "2",
                    col3: "3",
                },
            ],
        },
        {
            name: "是否显示分页",
            code: "pagination",
            type: MetaTypes.Bool,
            isRequired: true,
            isShow: true,
            description: "是否显示分页",
            defaultValue: true,
        },
        {
            name: "是否显示表头",
            code: "showHeader",
            type: MetaTypes.Bool,
            isRequired: true,
            isShow: true,
            description: "是否显示表头",
            defaultValue: true,
        },
        {
            name: "是否显示边框",
            code: "bordered",
            type: MetaTypes.Bool,
            isRequired: true
        }
    ]
}