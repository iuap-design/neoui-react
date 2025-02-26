import { Table, Button } from "../../../../packages";
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;

const columns: any = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 150, className: "rowClassName"},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
    {title: "性别", dataIndex: "c", key: "c", width: 100},
    {title: "部门", dataIndex: "d", key: "d", width: 100}
];

const data: any = [
    {a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1"},
    {a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2"},
    {a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3"}
];
class Demo1 extends Component<any, any> {
	currentIndex: number | undefined;
	currentRecord: DefaultRecordType | undefined;
	constructor(props: any) {
	    super(props);
	    this.state = {
	        data: data,
	        selectedRowIndex: 0
	    }
	}

	handleClick = () => {
	    console.log('这是第', this.currentIndex, '行');
	    console.log('内容：', this.currentRecord);
	}

	onRowHover = (index: number, record: DefaultRecordType) => {
	    this.currentIndex = index;
	    this.currentRecord = record;
	}

	getHoverContent = () => {
	    return <div className="opt-btns"><Button size="sm" onClick={this.handleClick}>一些操作</Button></div>
	}

	render() {
	    return (
	        <Table
	            columns={columns}
	            data={data}
	            height={40}
	            headerHeight={40}
	            hoverContent={this.getHoverContent}
	            onRowHover={this.onRowHover}
	            onRowClick={(_record: DefaultRecordType, index: number, _event?: React.MouseEvent<HTMLElement>) => {
	                this.setState({
	                    selectedRowIndex: index
	                });
                }}
                {...this.props}
	        />


	    );
	}
}

export default Demo1;