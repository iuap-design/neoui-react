/**
 * @title 全选
 * @description `indeterminate` 参数设置部分选中状态。
 */

import {Checkbox} from "@tinper/next-ui";
import React, {Component} from 'react';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['1', '2', '3', '4', '5'];
const defaultCheckedList = ['2', '3'];

class Demo7 extends Component<{}, {checkedList: Array<string>, indeterminate: boolean, checkAll: boolean}> {
	test: Checkbox | null = null;
	constructor(props: {}) {
	    super(props);
	    this.state = {
	        checkedList: defaultCheckedList,
	        indeterminate: true,
	        checkAll: false
	    }
	    this.onChange = this.onChange.bind(this);
	}

	onCheckAllChange = (e: boolean) => {
	    console.log(e);
	    this.setState({
	        checkedList: e ? plainOptions.concat() : [],
	        indeterminate: false,
	        checkAll: e,
	    });
	}

	onChange(checkedList: Array<string>) {
	    console.log(checkedList)
	    this.setState({
	        checkedList: checkedList,
	        indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
	        checkAll: checkedList.length === plainOptions.length
	    });
	}
	render() {
	    return (
	        <div className="demo-checkbox">
	            <Checkbox
	                ref={ref => this.test = ref}
	                indeterminate={this.state.indeterminate}
	                onChange={this.onCheckAllChange}
	                checked={this.state.checkAll}>
					全选
	            </Checkbox>
	            <br/>
	            <CheckboxGroup value={this.state.checkedList} onChange={this.onChange}>
	                <Checkbox value='1'>1</Checkbox>
	                <Checkbox value='2'>2</Checkbox>
	                <Checkbox value='3'>3</Checkbox>
	                <Checkbox value='4'>4</Checkbox>
	                <Checkbox value='5'>5</Checkbox>
	            </CheckboxGroup>
	        </div>
	    )
	}
}

export default Demo7;
