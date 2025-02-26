/**
 *
 * @title 表格穿梭框
 * @description 使用 Table 组件作为自定义渲染列表
 *
 */

import {Transfer, TransferProps, Table, TableProps, Tag, Checkbox} from '@tinper/next-ui';
import React, { Key } from 'react';

const { multiSelect } = Table;

let MultiSelectTable = multiSelect(Table, Checkbox);

function getMockData(start: number, end: number) {
    const mockData: TransferProps['dataSource'] = [];
    const targetKeys = [];
    for (let i = start; i < end; i++) {
        const item = {
            key: i.toString(),
            title: `content${i + 1}`,
            tag: `tag-${i + 1}`,
            description: `description of content${i + 1}`,
            disabled: i % 3 < 1,
            chosen: Math.random() * 2 > 1,
        }
        mockData.push(item);
        if (item.chosen) targetKeys.push(item.key);
    }

    return {mockData, targetKeys};
}

const { mockData, targetKeys } = getMockData(0, 50);

const tableColumns = [
    {
        dataIndex: 'title',
        title: 'Name',
        width: 100,
    },
    {
        dataIndex: 'tag',
        title: 'Tag',
        width: 100,
        render: (tag: string) => <Tag>{tag}</Tag>,
    },
    {
        dataIndex: 'description',
        title: 'Description',
    },
];

interface TableTransferProps extends Partial<TransferProps> {
    leftColumns: TableProps['columns'];
    rightColumns: TableProps['columns'];
  }

class Demo11 extends React.Component {
    state = {
        targetKeys: targetKeys
    }

    handleChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
	    this.setState({targetKeys: nextTargetKeys});

	    console.log('targetKeys: ', nextTargetKeys);
	    console.log('direction: ', direction);
	    console.log('moveKeys: ', moveKeys);
    }

    render() {
        const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: TableTransferProps) => (
            <Transfer {...restProps}>
                {({
                    onItemSelect,
                    onItemSelectAll,
                    direction,
                    dataSource = [],
                    checkedKeys,
                }) => {
                    const columns = direction === 'left' ? leftColumns : rightColumns;

                    const rowSelection = {
                        getCheckboxProps: (item: typeof mockData[1]) => ({ disabled: item.disabled }),
                        onSelectAll(selected: boolean, selectedRows: TransferProps['dataSource']) {
                            const filteredDataSource = selectedRows.filter(item => !item.disabled);
                            const checkAll = !selected; // 全选checkbox 当前的状态
                            onItemSelectAll!(filteredDataSource, checkAll);
                        },
                        onSelect(item: typeof mockData[1]) {
                            onItemSelect!(item);
                        },
                        selectedRowKeys: checkedKeys as Key[],
                    };

                    return (
                        <MultiSelectTable
                            rowSelection={rowSelection}
                            columns={columns}
                            data={dataSource}
                            size="small"
                            scroll={{ y: 399 }}
                            rowKey={item => item.key}
                        />
                    );
                }}
            </Transfer>
        );
        return (
            <TableTransfer
                dataSource={mockData}
                targetKeys={this.state.targetKeys}
                showSearch
                onChange={this.handleChange}
                filterOption={(inputValue, item) => {
                    return item.title!.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                }}
                leftColumns={tableColumns}
                rightColumns={tableColumns}
                listStyle={{ width: '45%', height: '500px'}}
            />
        )
    }
}

export default Demo11;
