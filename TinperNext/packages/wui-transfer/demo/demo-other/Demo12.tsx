/**
 *
 * @title 树穿梭框
 * @description 使用 Tree 组件作为自定义渲染列表
 *
 */

import React, { ReactElement, useState } from 'react';
import { Transfer, Tree, TransferProps } from '@tinper/next-ui';
// import type { TransferDirection, TransferItem } from 'antd/es/transfer';

interface TreeTransferProps extends Partial<TransferProps> {
  dataSource: typeof treeData & TransferProps['dataSource'];
  targetKeys: string[];
}

const treeData = [
    { key: '0-0', title: '曹操' },
    {
        key: '0-1',
        title: '刘备',
        children: [
            { key: '0-1-0', title: '关飞' },
            { key: '0-1-1', title: '诸葛亮' },
            { key: '0-1-1', title: '张飞' },
        ],
    },
    { key: '0-2', title: '孙策' },
];

// 选中数据设置disabled 状态
const generateTree = (treeNodes: TreeTransferProps['dataSource'] = [], checkedKeys: string[]): any =>
    treeNodes.map(({ children, ...props }) => ({
        ...props,
        disableCheckbox: checkedKeys.includes(props.key as string),
        children: generateTree(children!, checkedKeys),
    }));

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }: TreeTransferProps) => {

    const transferDataSource: TransferProps['dataSource'] = [];
    function flatten(list: TreeTransferProps['dataSource'] = []) {
        list.forEach((item: any) => {
            transferDataSource.push(item);
            flatten(item.children);
        });
    }
    flatten(dataSource);

    return (
        <Transfer
            {...restProps}
            targetKeys={targetKeys}
            dataSource={transferDataSource}
            className="tree-transfer"
        >
            {({ direction, onItemSelect, checkedKeys = [] }) => {
                if (direction === 'left') {
                    const treeCheckedKeys: string[] = [...checkedKeys as string[], ...targetKeys];
                    return (
                        <div>
                            <Tree
                                checkable
                                checkStrictly
                                defaultExpandAll
                                checkedKeys={treeCheckedKeys}
                                treeData={generateTree(dataSource, targetKeys)}
                                onCheck={(_, {checked, node}) => {
                                    const { props: {eventKey, title, disabled} } = node as ReactElement;
                                    const item = {key: eventKey, title, disabled}
                                    onItemSelect!(item, checked);
                                }}
                                onSelect={(_, { node, selected }) => {
                                    const { props: {eventKey, title, disabled} } = node as ReactElement;
                                    const item = {key: eventKey, title, disabled}
                                    onItemSelect!(item, selected);
                                }}
                            />
                        </div>
                    );
                }
                return null;
            }}
        </Transfer>
    );
};

const App: React.FC = () => {
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const onChange = (keys: string[]) => {
        setTargetKeys([...keys]);
    };
    return <TreeTransfer
        dataSource={treeData}
        targetKeys={targetKeys}
        onChange={onChange}
    />;
};

export default App;
