/**
 *
 * @title 全表格编辑
 * @parent 编辑 Editor
 * @description 以行内编辑形式对全表数据进行编辑
 * @type bip
 * demo0505
 */
import {Button, TableProps, Icon, Input, Select, Table, Tooltip, TreeSelect} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;
const {TreeNode} = TreeSelect;
interface StringEditCellProp {
    value: string;
    editable?: boolean;
    isEdited?:boolean;
    required?: boolean;
    colName?: string;
    onChange?: (value?: string) => void;
    throwError?: (flag?: boolean) => void;
}
interface StringEditCellState {
    value: string;
}
class StringEditCell extends Component<StringEditCellProp, StringEditCellState> {
    constructor(props: StringEditCellProp | Readonly<StringEditCellProp>, _context: any) {
        super(props);
        this.state = {
            value: props.value
        };
    }


    UNSAFE_componentWillReceiveProps(nextProps: StringEditCellProp) {
        if (!nextProps.editable) {
            this.setState({value: nextProps.value});
        }
    }

	handleChange = (value: string) => {
	    const {onChange, throwError} = this.props;
	    if (value === "") {
	        throwError && throwError(true);
	    } else {
	        throwError && throwError(false);
	    }
	    this.setState({value});
	    onChange && onChange(value);
	};

	render() {
	    const {editable, required, colName, isEdited} = this.props;
	    const {value} = this.state;
	    let cls = "editable-cell-input-wrapper";
	    if (required) cls += " required";
	    if (value === "") cls += " verify-cell";
	    if (isEdited) cls += " edited";
	    return editable ? (
	        <div className="editable-cell">
	            <div className={cls}>
	                <Input className={!value ? "error" : undefined} value={value} onChange={this.handleChange}/>
	                <span className="error">
	                    {value === "" ? (
	                        <Tooltip
	                            inverse
	                            className="u-editable-table-tp"
	                            placement="bottom"
	                            overlay={<div className="tp-content">{"请输入" + colName}</div>}
	                        >
	                            <Icon className="uf-exc-t required-icon"/>
	                        </Tooltip>
	                    ) : null}
	                </span>
	            </div>
	        </div>
	    ) : (
	        value || " "
	    );
	}
}

const SELECT_SOURCE = ["男", "女"];

class SelectEditCell extends Component<StringEditCellProp, StringEditCellState> {
    constructor(props: StringEditCellProp | Readonly<StringEditCellProp>, _context: any) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: StringEditCellProp) {
        if (!nextProps.editable) {
            this.setState({value: nextProps.value});
        }
    }

	handleSelect = (value: string) => {
	    this.setState({value});
	    this.props.onChange && this.props.onChange(value);
	};

	render() {
	    const {editable, isEdited} = this.props;
	    const {value} = this.state;
	    let cls = "editable-cell-input-wrapper";
	    if (isEdited) cls += " edited";
	    return editable ? (
	        <div className="editable-cell">
	            <div className={cls}>
	                <Select value={value} onSelect={this.handleSelect}>
	                    {SELECT_SOURCE.map((item, index) => (
	                        <Option key={index} value={item}>
	                            {item}
	                        </Option>
	                    ))}
	                </Select>
	            </div>
	        </div>
	    ) : (
	        value || " "
	    );
	}
}

const treeData = [
    {
        code: "org1",
        children: [
            {
                code: "bj",
                entityType: "mainEntity",
                name: "北京总部-简",
                pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                refcode: "bj",
                refpk: "5305416e-e7b4-4051-90bd-12d12942295b",
                id: "5305416e-e7b4-4051-90bd-12d12942295b",
                isLeaf: "true",
                refname: "北京总部-简"
            },
            {
                code: "xd",
                entityType: "mainEntity",
                name: "新道-简",
                pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                refcode: "xd",
                refpk: "b691afff-ea83-4a3f-affa-beb2be9cba52",
                id: "b691afff-ea83-4a3f-affa-beb2be9cba52",
                isLeaf: "true",
                refname: "新道-简"
            },
            {
                code: "yy3",
                entityType: "mainEntity",
                name: "test3",
                pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                refcode: "yy3",
                refpk: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
                id: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
                isLeaf: "true",
                refname: "test3"
            },
            {
                code: "yy1",
                entityType: "mainEntity",
                name: "test1",
                pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                refcode: "yy1",
                refpk: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
                id: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
                isLeaf: "true",
                refname: "test1"
            },
            {
                code: "dept2",
                children: [
                    {
                        code: "cs",
                        entityType: "subEntity",
                        organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        name: "测试部-简",
                        pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                        refcode: "cs",
                        refpk: "cc43a66a-438d-4106-937f-bec44406f771",
                        id: "cc43a66a-438d-4106-937f-bec44406f771",
                        isLeaf: "true",
                        refname: "测试部-简"
                    },
                    {
                        code: "qd",
                        entityType: "subEntity",
                        organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        name: "前端部-简",
                        pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                        refcode: "qd",
                        refpk: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
                        id: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
                        isLeaf: "true",
                        refname: "前端部-简"
                    }
                ],
                entityType: "subEntity",
                organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                name: "生产处",
                refcode: "dept2",
                refpk: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                id: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                refname: "生产处"
            },
            {
                code: "dept1",
                children: [
                    {
                        code: "dept1_2",
                        entityType: "subEntity",
                        organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        name: "财务二科",
                        pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                        refcode: "dept1_2",
                        refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
                        id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
                        isLeaf: "true",
                        refname: "财务二科"
                    },
                    {
                        code: "dept1_1",
                        entityType: "subEntity",
                        organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        name: "财务一科",
                        pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                        refcode: "dept1_1",
                        refpk: "9711d912-3184-4063-90c5-1facc727813c",
                        id: "9711d912-3184-4063-90c5-1facc727813c",
                        isLeaf: "true",
                        refname: "财务一科"
                    }
                ],
                entityType: "subEntity",
                organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                name: "财务处",
                refcode: "dept1",
                refpk: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                id: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                refname: "财务处"
            }
        ],
        entityType: "mainEntity",
        name: "用友集团",
        refcode: "org1",
        refpk: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
        id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
        refname: "用友集团"
    }
]

function renderTreeNode(data: Record<string, any>[]) {
    return data.map((item: Record<string, any>) => {
        if (item.children) {
            return <TreeNode value={item.code} data-params={item} title={item.name} key={item.id}>
                {renderTreeNode(item.children)}
            </TreeNode>

        }
        return <TreeNode value={item.code} data-params={item} title={item.name} key={item.id}></TreeNode>
    })
}
interface TreeSelectEditCellProp {
    isEdited?: boolean;
    value: Record<string, any>;
    editable?: boolean;
    colName?: string;
    onChange?: (value?: string) => void;
    throwError?: (flag?: boolean) => void;
}
interface TreeStringEditCellState {
    value: Record<string, any>;
}

class TreeSelectEditCell extends Component<TreeSelectEditCellProp, TreeStringEditCellState> {
    constructor(props: TreeSelectEditCellProp | Readonly<TreeSelectEditCellProp>, _context: any) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: TreeSelectEditCellProp) {
        if (!nextProps.editable) {
            this.setState({value: nextProps.value});
        }
    }

	handleSelect = (_values: any, node: Record<string, any>) => {
	    this.setState({value: node['data-params']});
	    this.props.onChange && this.props.onChange(node['data-params']);
	};

	render() {
	    const {editable, isEdited} = this.props;
	    const {value} = this.state;
	    let cls = "editable-cell-input-wrapper";
	    if (isEdited) cls += " edited";
	    return editable ? (
	        <div className="editable-cell">
	            <div className={cls}>
	                <TreeSelect
	                    showSearch
	                    value={this.state.value.code}
	                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	                    placeholder="请选择"
	                    treeDefaultExpandAll
	                    onSelect={this.handleSelect}
	                >
	                    {renderTreeNode(treeData)}
	                </TreeSelect>
	            </div>
	        </div>
	    ) : (
	        value.name || " "
	    );
	}
}

let dataSource: Record<string, any>[] = [
    {
        a: "ASVAL_201903280005",
        b: "小张",
        c: "男",
        d: {
            code: "dept1_2",
            entityType: "subEntity",
            organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
            name: "财务二科",
            pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
            refcode: "dept1_2",
            refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
            id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
            isLeaf: "true",
            refname: "财务二科"
        },
        key: "1"
    },
    {
        a: "ASVAL_201903200004",
        b: "小明",
        c: "男",
        d: {
            code: "dept1_2",
            entityType: "subEntity",
            organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
            name: "财务二科",
            pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
            refcode: "dept1_2",
            refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
            id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
            isLeaf: "true",
            refname: "财务二科"
        },
        key: "2"
    },
    {
        a: "ASVAL_201903120002",
        b: "小红",
        c: "女",
        d: {
            code: "dept1_1",
            entityType: "subEntity",
            organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
            name: "财务一科",
            pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
            refcode: "dept1_1",
            refpk: "9711d912-3184-4063-90c5-1facc727813c",
            id: "9711d912-3184-4063-90c5-1facc727813c",
            isLeaf: "true",
            refname: "财务一科"
        },
        key: "3"
    }
];
interface Demo0503State {
    isEditingAll:boolean;
    dataSource: Record<string, any>[];
    currentIndex: number|null;
    errorEditFlag: boolean;
}
class Demo0505 extends Component <{}, Demo0503State> {
    columns: TableProps['columns'];
    dataBuffer: Record<string, any>[];
    constructor(props: {} | Readonly<{}>, _context: any) {
        super(props);
        this.columns = [
            {
                title: "员工编号",
                dataIndex: "a",
                key: "a"
            },
            {
                title: "名字",
                dataIndex: "b",
                key: "b",
                render: (text: string, record: Record<string, any>, index: number) => (
                    <StringEditCell
                        colName={"名字"}
                        editable={this.state.isEditingAll}
                        isEdited={record.isEdited.b || false}
                        required
                        value={text}
                        onChange={this.onCellChange(index, "b")}
                        throwError={this.throwError}
                    />
                )
            },
            {
                title: "性别",
                dataIndex: "c",
                key: "c",
                width: 100,
                render: (text: string, record: Record<string, any>, index: number) => (
                    <SelectEditCell
                        editable={this.state.isEditingAll}
                        isEdited={record.isEdited.c || false}
                        value={text}
                        onChange={this.onCellChange(index, "c")}
                    />
                )
            },
            {
                title: "部门",
                dataIndex: "d",
                key: "d",
                width: 215,
                render: (_text: string, record: Record<string, any>, index: number) => (
                    <TreeSelectEditCell
                        colName={"部门"}
                        editable={this.state.isEditingAll}
                        isEdited={record.isEdited.d || false}
                        value={record.d}
                        onChange={this.onCellChange(index, "d")}
                    />
                )
            },
            // 只是用来占位占宽度的
            {
                key: "placeholder"
            }
        ];

        // 用于记录数据是否被修改
        dataSource.forEach(item => (item.isEdited = {}));
        this.state = {
            dataSource: dataSource,
            isEditingAll: false,
            currentIndex: null,
            errorEditFlag: false
        };

        // 用于记录编辑前数据
        this.dataBuffer = [];
    }

	edit = () => {
	    this.dataBuffer = [];
	    // 最好使用深复制
	    this.state.dataSource.forEach((item: Record<string, any>, _index: number) => {
	        this.dataBuffer.push({...item});
	    });
	    this.setState({isEditingAll: true});
	};

	abortEdit = () => {
	    let originData = [...this.state.dataSource];
	    originData.forEach(item => (item.isEdited = {}));
	    this.setState({
	        isEditingAll: false,
	        dataSource: originData
	    });
	};

	commitChange = () => {
	    if (this.state.errorEditFlag) return;
	    const newData = this.dataBuffer.map((item: Record<string, any>) => {
	        return Object.assign({}, item, {isEdited: {}});
	    });
	    this.setState({isEditingAll: false, dataSource: newData});
	};

	onCellChange = (index: string | number, key: string) => (value: string) => {
	    this.dataBuffer[index][key] = value;
	    this.dataBuffer[index].isEdited[key] = true;
	};

	throwError = (isError: boolean) => {
	    if (isError !== this.state.errorEditFlag)
	        this.setState({errorEditFlag: isError});
	};

	render() {
	    const {dataSource, isEditingAll} = this.state;
	    const columns = this.columns;
	    return (
	        <div className="demo0505 u-editable-table">
	            <div className="toolbar-btns">
	                {isEditingAll ? (
	                    <React.Fragment>
	                        <Button colors="primary" onClick={this.commitChange}>
								确认
	                        </Button>
	                        <Button
	                            bordered
	                            onClick={this.abortEdit}
	                        >
								取消
	                        </Button>
	                    </React.Fragment>
	                ) : (
	                    <Button colors="secondary" onClick={this.edit}>
							编辑全表
	                    </Button>
	                )}
	            </div>
	            <Table data={dataSource} columns={columns}/>
	        </div>
	    );
	}
}

export default Demo0505;
