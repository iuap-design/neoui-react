/**
 *
 * @title treeSelect 使用JSON数据
 * @description 使用 treeData 把 JSON 数据直接生成树结构。
 *
 */
import {TreeSelect, TreeSelectProps} from '@tinper/next-ui';
import React, {Component} from 'react';


const treeData = [{
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
    }, {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
    }],
}, {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
}];


class Demo2 extends Component<{}, {value?: string | string[]}> {
	state = {
	    value: undefined,
	}
	onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {
	    this.setState({value});
	}

	render() {
	    return (
	        <div className="demo2">
	            <TreeSelect
	                allowClear
	                style={{width: 300}}
	                value={this.state.value}
	                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	                treeData={treeData}
	                placeholder="Please select"
	                treeDefaultExpandAll
	                onChange={this.onChange}
	                getPopupContainer={() => document.querySelector('.demo2')!}
	            />
	        </div>
	    )
	}
}

export default Demo2
