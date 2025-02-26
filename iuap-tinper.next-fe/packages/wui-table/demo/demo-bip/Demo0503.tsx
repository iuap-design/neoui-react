/**
 *
 * @title 弹框（表单）编辑
 * @parent 编辑 Editor
 * @description 以弹框形式以对行进行编辑的表格
 * @type bip
 * demo0503
 */

import {Button, Form, Icon, Input, Modal, Select, Table, Tooltip, TreeSelect, TableProps} from "@tinper/next-ui";
import React, {Component, PureComponent} from "react";
const Option = Select.Option;
const {TreeNode} = TreeSelect;

function handleFormValueChange(WarpCompProps: { onChange: Function; throwError: Function; }, field: { value: string; }, _allFields: Object) {
    const {onChange, throwError} = WarpCompProps;
    if (field.value === "") return throwError && throwError(true);
    throwError && throwError(false);
    onChange && onChange(field.value);
}

function PureStringEditCell(props: { form?: any; colName?: string; value?: string; required?: boolean; }) {
    const {getFieldProps, getFieldError} = props.form;
    const {value, required} = props;
    let cls = "editable-cell";
    if (required) cls += " required";
    return (
        <div className={cls}>
            <Input
                {...getFieldProps("value", {
                    initialValue: value,
                    validateTrigger: "onBlur",
                    rules: [
                        {
                            required: true,
                            message: (
                                <Tooltip
                                    inverse
                                    className="u-editable-table-tp"
                                    placement="bottom"
                                    overlay={
                                        <div className="tp-content">
                                            {"请输入" + props.colName}
                                        </div>
                                    }
                                >
                                    <Icon className="uf-exc-t required-icon"/>
                                </Tooltip>
                            )
                        }
                    ]
                })}
            />
            <span className="error">{getFieldError("value")}</span>
        </div>
    );
}

const StringEditCell = Form.createForm({
    onValuesChange: handleFormValueChange
})(PureStringEditCell);


const SELECT_SOURCE = ["男", "女"];

class SelectEditCell extends PureComponent<{ onChange: Function; value: string }, {}> {
    constructor(props: { onChange: Function; value: string; } | Readonly<{ onChange: Function; value: string; }>, _context: any) {
        super(props);
    }

    handleSelect = (value: string) => {
        this.props.onChange && this.props.onChange(value);
    };

    render() {
	    return (
	        <div className="editable-cell">
	            <Select value={this.props.value} onSelect={this.handleSelect}>
	                {SELECT_SOURCE.map((item, index) => (
	                    <Option key={index} value={item}>
	                        {item}
	                    </Option>
	                ))}
	            </Select>
	        </div>
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
    return data.map(item => {
        if (item.children) {
            return <TreeNode value={item.code} data-params={item} title={item.name} key={item.id}>
                {renderTreeNode(item.children)}
            </TreeNode>

        }
        return <TreeNode value={item.code} data-params={item} title={item.name} key={item.id}></TreeNode>
    })
}

class TreeSelectEditCell extends PureComponent<{ onChange: Function; value: typeof treeData[0]; colName: string }> {
    constructor(props:{ onChange: Function; value: typeof treeData[0]; colName: string }, _context: any) {
        super(props);
    }

    handleSelect = (_values: any, node: Record<string, any>) => {
	    const {onChange} = this.props
	    onChange && onChange(node['data-params']);
    };

    render() {
	    const {value} = this.props;
	    return (
	        <div className="editable-cell">
	            <TreeSelect
	                showSearch
	                value={value.code}
	                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	                placeholder="请选择"
	                treeDefaultExpandAll
	                onSelect={this.handleSelect}
	            >
	                {renderTreeNode(treeData)}
	            </TreeSelect>
	        </div>
	    );
    }
}
interface PropsType {
    data?: Record<string, any>;
    onSubmit: Function;
    onHide: ()=>void;
    currentIndex?: number | null;
    show: boolean;
    columns: Record<string, any>[];
}
class EditModal extends Component<PropsType, { data?: Record<string, any>; errorEditFlag: boolean }> {
    renderElm: Record<string, any>;
    constructor(props: PropsType | Readonly<PropsType>, _context: any) {
        super(props);
        this.state = {
            data: this.props.data,
            errorEditFlag: false
        };

        // 属性名对应 columns 属性中的 key 值
        this.renderElm = {
            b: (record: Record<string, any>, _index: number) => (
                <StringEditCell
                    colName={"名字"}
                    required={true}
                    value={record.b}
                    onChange={this.onFieldChange("b")}
                    throwError={this.throwError}
                />
            ),

            c: (record: Record<string, any>, _index: number) => (
                <SelectEditCell
                    value={record.c}
                    onChange={this.onFieldChange("c")}
                />
            ),
            d: (record: Record<string, any>, _index: number) => (
                <TreeSelectEditCell
                    colName={"部门"}
                    value={record.d}
                    onChange={this.onFieldChange("d")}
                />
            )
        }
    }

	onFieldChange = (field: string) => (value: string) => {
	    let data = {...this.state.data};
	    data[field] = value;
	    this.setState({data});
	}

	submitChange = () => {
	    if (this.state.errorEditFlag) return;
	    const {onSubmit, onHide, currentIndex} = this.props;
	    onSubmit && onSubmit(this.state.data, currentIndex);
	    onHide && onHide();
	}

	throwError = (isError: boolean) => {
	    if (isError !== this.state.errorEditFlag)
	        this.setState({errorEditFlag: isError});
	};

	render() {
	    const {show, onHide, columns, currentIndex} = this.props;
	    const {data} = this.state;
	    return (
	        <Modal
	            show={show}
	            onHide={onHide}
	            className="demo0503-m-b"
	        >
	            <Modal.Header closeButton>
	                <Modal.Title>编辑行</Modal.Title>
	            </Modal.Header>
	            <Modal.Body>
	                <Form labelCol={{span: 4}} wrapperCol={{span: 8}}>
	                    {
	                        columns.map((item, _index) => {
	                            return (
	                                <Form.Item label={item.title} name={item.key} key={item.key}>
	                                    {this.renderElm[item.key] &&
											this.renderElm[item.key](
											    data,
											    currentIndex
											)}
	                                    {!this.renderElm[item.key] && (
	                                        <div className="editable-cell">
	                                            <Input
	                                                defaultValue={data?.[item.dataIndex]}
	                                                disabled={true}
	                                            />
	                                        </div>
	                                    )}
	                                </Form.Item>
	                            );
	                        })
	                    }
	                </Form>
	            </Modal.Body>
	            <Modal.Footer style={{textAlign: "right"}}>
	                <Button
	                    style={{marginRight: 8}}
	                    bordered
	                    onClick={onHide}
	                >
						取消
	                </Button>
	                <Button colors="primary" onClick={this.submitChange}>
						确认
	                </Button>
	            </Modal.Footer>
	        </Modal>
	    );
	}
}

let dataSource: TableProps['data'] = [
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
interface StateType {
    dataSource: TableProps['data'];
    isEditing: boolean;
    currentIndex?: number | null
}
class Demo0503 extends Component<{}, StateType> {
    columns: TableProps['columns'];
    constructor(props: {}, _context: any) {
        super(props);
        // 编辑态下每个单元格对应的编辑模式组件写在 EditModal 组件中，以 key 值对应
        this.columns = [
            {
                title: "员工编号",
                dataIndex: "a",
                key: "a"
            },
            {
                title: "名字",
                dataIndex: "b",
                key: "b"
            },
            {
                title: "性别",
                dataIndex: "c",
                key: "c",
                width: 100
            },
            {
                title: "部门",
                dataIndex: "d",
                key: "d",
                width: 215,
                render: (_text:string, record: Record<string, any>, _index:number) => record.d.name
            }
        ];

        this.state = {
            dataSource: dataSource,
            isEditing: false,
            currentIndex: null
        };
    }

	edit = () => {
	    if (this.state.currentIndex === null) return;
	    this.setState({isEditing: true});
	};

	abortEdit = () => {
	    this.setState({isEditing: false});
	};

    commitChange = (editedRowData: Record<string, any>, rowIndex: number) => {
	    console.log(editedRowData)
	    console.log(rowIndex)
	    let dataSource = [...this.state.dataSource];
	    dataSource[rowIndex] = editedRowData;
	    this.setState({dataSource});
    };

    handleRowHover = (index: number, _record: Record<string, any>) => {
	    this.setState({currentIndex: index});
    };

    hideEditModal = () => {
	    this.setState({isEditing: false});
    }

	renderRowHover = () => {
	    return (
	        <div className="opt-btns">
	            <Button size="sm" onClick={this.edit}>
					编辑
	            </Button>
	        </div>
	    )
	};


	render() {
	    const {dataSource, isEditing, currentIndex} = this.state;
	    const columns = this.columns;
	    return (
	        <div className="demo0503 u-editable-table">
	            <Table
	                data={dataSource}
	                columns={columns}
	                onRowHover={this.handleRowHover}
	                hoverContent={this.renderRowHover}
	            />
	            {
	                isEditing ? (
	                    <EditModal
	                        show={isEditing}
	                        onHide={this.hideEditModal}
	                        columns={columns}
	                        data={typeof currentIndex === 'number' ? dataSource[currentIndex] : undefined}
	                        onSubmit={this.commitChange}
	                        currentIndex={currentIndex}
	                    />
	                ) : null
	            }
	        </div>
	    );
	}
}

export default Demo0503;
