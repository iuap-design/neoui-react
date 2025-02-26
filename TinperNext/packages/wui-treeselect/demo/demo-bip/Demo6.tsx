/**
 *
 * @title 大数据场景下的滚动加载
 * @description virtual属性为true的时候即开启动态加载数据模式。virtual属性本身的默认值也是true，无需特别设置，即可在大数据场景下使用动态加载。
 *
 */
import {Button, TreeSelect, TreeSelectProps} from '@tinper/next-ui';
import React, {Component} from 'react';
type GlobalDataType = GlobalDataType1[]
type GlobalDataType1 = {
    title?: string;
    name?: string;
    value?: string;
    key: string;
    isLeaf?: boolean;
    children?: GlobalDataType;
}
const x = 500;
const y = 1;
const z = 1;
const treeData: GlobalDataType = [];

const generateData = (_level: number, _preKey?: string, _tns?: GlobalDataType) => {

    const preKey = _preKey || '0';
    const tns = _tns || treeData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({title: key, key, value: key});
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
generateData(z);

class Demo6 extends Component<{}, {value?: string; virtual: boolean}> {
	state = {
	    value: undefined,
	    virtual: true // virtual属性默认值也是true
	}

	onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {
	    this.setState({value});
	}
	onSelect: TreeSelectProps['onSelect'] = (value: string, _option: Record<string, any>) => {
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
	            <TreeSelect
	                showSearch
	                treeData={treeData}
	                style={{width: 300}}
	                value={this.state.value}
	                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	                placeholder="请选择"
	                allowClear
	                onChange={this.onChange}
	                onSelect={this.onSelect}
	                virtual={virtual}
	            />
	        </div>)
	}
}

export default Demo6
