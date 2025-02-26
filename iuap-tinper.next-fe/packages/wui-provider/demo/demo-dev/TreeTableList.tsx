import React, {useMemo, useState} from 'react';

import { Layout, Tree, TableProps, Button, Space} from '@tinper/next-ui';
import textMultiLangMap from './langMap';
const TreeNode = Tree.TreeNode;
import MergeTable from './MergeTable';

type DefaultRecordType = Record<string, any>;
interface ILayProps {
    direction: 'rtl' | 'ltr',
    editModal: ()=>void,
    confirm: ()=>void
}


function LayoutWrapper(props:ILayProps) {
    const {direction } = props;
    const [selectedRowKeys, setselectedRowKeys] = useState([])
    const x = 6;
    const y = 5;
    const z = 2;
    const gData:any = [];
    const generateData = (_level:number, _preKey:string, _tns:any) => {
        const preKey = _preKey || '0';
        const tns = _tns || gData;
        const children = [];
        for (let i = 0; i < x; i++) {
            const key = `${preKey}-${i}`;
            tns.push({ title: key, key });
            if (i < y) {
                children.push(key);
            }
        }
        if (_level < 0) {
            return tns;
        }
        const level = _level - 1;
        children.forEach((key, index) => {
            tns[index].children = [];
            return generateData(level, key, tns[index].children);
        });
    };
    generateData(z, '0', gData);
    const loop = (data:any) => data.map((item:any) => {
        if (item.children) {
            return (<TreeNode key={item.key} title={item.key}>
                {loop(item.children)}
            </TreeNode>);
        }
        return <TreeNode key={item.key} title={item.key} isLeaf={true}/>;
    });

    const columns: TableProps['columns'] = [
        {
            title: textMultiLangMap[direction]?.billNo,
            dataIndex: "num",
            key: "num",
            width: 150,
            fixed: "left"
        },
        {
            title: textMultiLangMap[direction]?.billDate,
            dataIndex: "date",
            key: "date",
            width: 200,
        },
        {
            title: textMultiLangMap[direction]?.billType,
            dataIndex: "type",
            key: "type",
            width: 200
        },
        {
            title: textMultiLangMap[direction]?.supplier,
            dataIndex: "supplier",
            key: "supplier",
            width: 100
        },
        {
            title: textMultiLangMap[direction]?.contact,
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: textMultiLangMap[direction]?.warehouse,
            dataIndex: "warehouse",
            key: "warehouse",
            width: 80,
        },
        {
            title: textMultiLangMap[direction]?.total,
            dataIndex: "total",
            key: "total",
            width: 100,
            sumCol: true,
            sumThousandth: true,
            sumPrecision: 3,
            totalRender: 1000,
            fixed: "right",
        },
        {
            title: textMultiLangMap[direction]?.money,
            dataIndex: "money",
            key: "money",
            width: 100,
            sumCol: true,
            sumThousandth: true,
            sumPrecision: 4,
            fixed: "right",
            totalRender: (column: any, data: any) => {
                console.log('column', column, 'data', data)
                return <span className="cc">90000</span>
            },
        }
    ];

    const getData = (direction: 'rtl' | 'ltr') => {
	    const data: TableProps['data'] = [];
	    for (let i = 0; i < 5; i++) {
	        data.push({
	            key: i,
	            num: "NU039100" + i,
	            date: "2019-03-01",
	            type: textMultiLangMap[direction]?.billTypeValue,
	            supplier: "gys" + i,
	            contact: "Tom",
	            warehouse: textMultiLangMap[direction]?.warehouseValue,
	            total: i + Math.floor(Math.random() * 10),
	            money: 2000 * Math.floor(Math.random() * 10)
	        });
	    }
	    return data;
    }

    let rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys: never[], _selectedRows: DefaultRecordType[]) => {
            setselectedRowKeys(selectedRowKeys)
        }
    }
    const tableData = useMemo(()=>{
        return getData(direction);
    }, [direction])

    const getHoverContent = ()=>{
	    return <Space>
	        <Button colors="dark" onClick={props.confirm} size="small">Delete</Button>
	        <Button colors="dark" onClick={props.editModal} size="small">Edit</Button>

	    </Space>
    }
    return <Layout.Spliter defaultSize={250} mode='mixed' style={{height: 400}} collapsible>
        <div>
            <Tree checkable focusable showLine blockNode={false} multiple className="demo2 myCls" >
	            {loop(gData)}
	        </Tree>

        </div>
        <div><MergeTable
            fillSpace={false}
            isSingleFind
            isDragColumn={true}
            showRowNum
            columns={columns}
            data={tableData}
            // isFilterColumn
            isSingleFilter
            bordered
            scroll={{y: 200}}
            sumPrecision={2}
            rowSelection={rowSelection}
            rowKey={"key"}
            isFilterColumn
            sumClassName="abc"
            footerClassName="foot_table"
            showSum={['total']}
            hoverContent={getHoverContent}
            pagination={{
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30", "50", "80"],
                defaultPageSize: 50,
                defaultActivePage: 1,
                total: tableData.length
            }}
        /></div>
    </Layout.Spliter>
}

export default LayoutWrapper;