import { Table } from "../../../../packages";
import React, {Component} from "react";

const renderContent = (value: any, _row: any, index: number) => {
    const obj: any = {
        children: value,
        props: {},
    };
    if (index === 4) {
        obj.props.colSpan = 0;
    }
    return obj;
};

const columns1: any = [{
    title: '姓名',
    key: "name",
    dataIndex: 'name',
    render: (text: any, _record: any, index: number) => {
        if (index < 4) {
            return <a href="javascript:void(0);">{text}</a>;
        }
        return {
            children: <a href="javascript:void(0);">{text}</a>,
            props: {
                colSpan: 5,
            },
        };
    },
}, {
    title: '年龄',
    key: "age",
    dataIndex: 'age',
    render: renderContent,
}, {
    title: '联系方式',
    colSpan: 2,
    key: "tel",
    dataIndex: 'tel',
    render: renderContent
}, {
    title: '手机号',
    colSpan: 0,
    key: "phone",
    dataIndex: 'phone',
    render: renderContent,
}, {
    title: '家庭住址',
    key: "address",
    dataIndex: 'address',
    render: renderContent,
}];
const data: any = [{
    key: '1',
    name: '小红',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: '北京海淀',
}, {
    key: '2',
    name: '小明',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: '河北张家口',
}, {
    key: '3',
    name: '张三',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '浙江杭州',
}, {
    key: '4',
    name: '李四',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '广州深圳',
}, {
    key: '5',
    name: '王五',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '北京昌平',
}];

class Demo15 extends Component<any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            colFlag: false
        }
    }

	onChange = () => {
	    const colFlag = this.state.colFlag;
	    this.setState({
	        colFlag: !colFlag
	    })
	}

	render() {
	    return (
	        <div>
	            <Table columns={columns1} data={data} bordered {...this.props} />
	        </div>

	    );
	}
}


export default Demo15;