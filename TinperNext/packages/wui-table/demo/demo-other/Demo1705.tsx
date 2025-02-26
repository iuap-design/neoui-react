/**
 *
 * @title 框选
 * @description 可跨行跨列拖拽框选、按shift实现跨行列框选
 * @type other
 * demo1705
 */

import {Switch, Table, TableProps} from '@tinper/next-ui';
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;
type Key = string | number;


const renderContent = (value: any, _row: DefaultRecordType, index: number) => {
    const obj: DefaultRecordType = {
        children: value,
        props: {},
    };
    if (index === 4) {
        obj.props.colSpan = 0;
    }
    return obj;
};

const columns: TableProps['columns'] = [{
    title: '姓名',
    key: "name",
    dataIndex: 'name',
    render: (text: any, _record: DefaultRecordType, index: number) => {
        if (index < 4) {
            return <a href="javascript:void(0);">{text}</a>;
        }
        return {
            children: <a href="javascript:void(0);">{text}</a>,
            props: {
                colSpan: 1,
            },
        };
    },
}, {
    title: '年龄',
    key: "age",
    dataIndex: 'age',
    render: (text: any, _record: DefaultRecordType, index: number) => {
        if (index < 4 || index > 4) {
            return text;
        }
        return {
            children: text,
            props: {
                colSpan: 3,
            },
        };
    },
}, {
    title: '座机',
    key: "tel",
    dataIndex: 'tel',
    render: (text: any, _record: DefaultRecordType, index: number) => {
        const obj: DefaultRecordType = {
            children: text,
            props: {},
        };
        if (index === 2) {
            obj.props.rowSpan = 2;
        }
        if (index === 3) {
            obj.props.rowSpan = 0;
        }
        if (index === 4) {
            obj.props.colSpan = 0;
        }
        return obj;
    },
}, {
    title: '手机号',
    // colSpan: 0,
    key: "phone",
    dataIndex: 'phone',
    render: renderContent,
}, {
    title: '家庭住址',
    key: "address",
    dataIndex: 'address',
    render: (text: any, _record: DefaultRecordType, _index: number) => {
        return text;
    },
}];

const data: TableProps['data'] = [{
    key: 'key1',
    name: '小红',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: '北京海淀',
}, {
    key: 'key2',
    name: '小明',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: '河北张家口',
}, {
    key: 'key3',
    name: '张三',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '浙江杭州',
}, {
    key: 'key4',
    name: '李四',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '广州深圳',
}, {
    key: 'key5',
    name: '王五',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '北京昌平',
}, {
    key: 'key6',
    name: '赵六',
    age: 28,
    tel: '0575-2209908',
    phone: 18900010002,
    address: '北京东城',
}];

class Demo1705 extends Component<{}, {openSelectCells: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            openSelectCells: true
        }
    }

	onChange = () => {
	    const openSelectCells = this.state.openSelectCells;
	    this.setState({
	        openSelectCells: !openSelectCells
	    })
	}

    popMenu = (rowKeys: Key[], colkeys :Key[]) => {
        console.log('rowKeys', rowKeys, 'colkeys', colkeys)
        return [
            {
                key: 'handle1',
                text: '操作1',
            },
            {
                key: 'handle2',
                text: '操作2',
            }
        ]
    }

    onPopMenuClick = (type: string, rowKeys: Key[], colkeys: Key[]) => {
        console.log('type', type, 'rowKeys', rowKeys, 'colkeys', colkeys)
    }

    render() {
	    return (
	        <div>
                <div style={{ paddingBottom: '15px' }}>开启单元格框选: <Switch onClick={this.onChange} checked={this.state.openSelectCells} style={{marginBottom: '8px'}}></Switch></div>
	            <Table columns={columns} data={data} bordered openSelectCells={this.state.openSelectCells} popMenu={this.popMenu} onPopMenuClick={this.onPopMenuClick}/>
	        </div>

	    );
    }
}


export default Demo1705;
