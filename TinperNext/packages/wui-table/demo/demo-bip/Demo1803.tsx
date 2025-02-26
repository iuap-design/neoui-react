/**
 *
 * @title JSX 风格
 * @description 支持列属性columnType，`rowdrag`为拖拽列，可自定义拖拽列的属性
 * @type bip
 * demo1803
 */


import {Table, Space, Tag, Checkbox, TableProps} from "@tinper/next-ui";
import React, {Component} from 'react';
type DefaultRecordType = Record<string, any>;

const {Column, ColumnGroup, multiSelect} = Table;
let MultiSelectTable = multiSelect(Table, Checkbox);

const data: TableProps['data'] = [
    {
	  key: '1',
	  name: '喜洋洋',
	  sex: '男',
	  age: 24,
	  address: '羊村',
	  tags: ['wisdom', 'brave'],
    },
    {
	  key: '2',
	  name: '美羊羊',
	  sex: '女',
	  age: 18,
	  address: '羊村',
	  tags: ['nice'],
    },
    {
	  key: '3',
	  name: '灰太狼',
	  sex: '男',
	  age: 26,
	  address: '羊村外',
	  tags: ['cool', 'handsome'],
    },
];


class Demo12 extends Component<{}, {data: TableProps['data'], selectedRowKeys?: TableProps['selectedRowKeys']}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: data
        };
    }

    render() {
        let rowSelection = {
	        selectedRowKeys: this.state.selectedRowKeys,
	        getCheckboxProps: (record: DefaultRecordType) => ({
	            disabled: record.key == '3', // Column configuration not to be checked
	            name: record.b,
	        }),
	        onChange: (selectedRowKeys: TableProps['selectedRowKeys'], selectedRows: TableProps['data']) => {
	            console.log('selectedRowKeys', selectedRowKeys, 'selectedRows', selectedRows)
	            this.setState({
	                selectedRowKeys
	            })
	        },
	        onSelectAll: (check: boolean, selectedRows: TableProps['data'], changeRows: TableProps['data']) => {
	            console.log('check', check, 'selectedRows', selectedRows, 'changeRows', changeRows)
	        }
	    }
	    return (
            <MultiSelectTable
                bordered
                data={this.state.data}
                rowSelection={rowSelection}
                autoCheckedByClickRows={false}
                rowDraggAble={true}
                useDragHandle={true}
            >
                <Column columnType="rowdrag" fixed='left'/>
                <Column columnType="multiselect"/>
                <ColumnGroup title="个人信息">
                    <Column title="姓名" dataIndex="name" key="name" />
                    <Column title="性别" dataIndex="sex" key="sex" />
                </ColumnGroup>
                <Column title="年龄" dataIndex="age" key="age" />
                <Column title="地址" dataIndex="address" key="address" />
                <Column
                    title="标签"
                    dataIndex="tags"
                    key="tags"
                    render={(tags) => (
                        <>
                            {tags.map((tag: React.Key) => (
                                <Tag colors="blue" key={tag}>
                                    {tag}
                                </Tag>
                            ))}
                        </>
                    )}
                />
                <Column
                    title="操作"
                    key="e"
                    render={(_, record) => (
                        <Space size="middle">
                            <a>Invite {record.lastName}</a>
                            <a>Delete</a>
                        </Space>
                    )}
                />
            </MultiSelectTable>
	    );
    }
}

export default Demo12;
