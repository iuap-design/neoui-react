/**
 *
 * @title 大数据场景下的滚动加载
 * @description virtual属性为true的时候即开启动态加载数据模式。virtual属性本身的默认值也是true，无需特别设置，即可在大数据场景下使用动态加载。
 *
 */
import {Button, Select} from '@tinper/next-ui';
import React, {Component} from 'react';

const Option = Select.Option;

const ComponentChildren: React.ReactNode[] = [];
for (let i = 0; i < 1000; i++) {
    ComponentChildren.push(<Option key={i + 1}>{i + 1}</Option>);
}

class Demo14 extends Component {
	state = {
	    value: undefined,
	    virtual: true // virtual属性默认值也是true
	}

	onChange = (value: string) => {
	    this.setState({value});
	}
	onSelect = (value: string) => {
	    console.log('--value--' + value);
	}
	onChangeVirtual = () => {
	    this.setState({
	        virtual: !this.state.virtual
	    })
	}

	render() {
	    const {virtual} = this.state
	    return (
	        <div>
	            <Button
	                style={{marginRight: 20}}
	                onClick={this.onChangeVirtual}
	            >
					切换virtual为{virtual ? "false" : "true"}
	            </Button>
	            <Select
	                showSearch
	                style={{width: 300}}
	                value={this.state.value}
	                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	                placeholder="请选择"
	                allowClear
	                onChange={this.onChange}
	                onSelect={this.onSelect}
	                virtual={virtual}
	                fieldid='demo14'
	            >
	                {ComponentChildren}
	            </Select>
	        </div>)
	}
}

export default Demo14
