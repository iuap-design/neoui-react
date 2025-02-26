/**
 * @title Radio 兼容ant design的用法
 * @description onChange事件的回调参数不同
 */

import {Radio, RadioGroupProps} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo6 extends Component <{}, {value:RadioGroupProps['value'] | undefined}> {
    constructor(props:{}) {
        super(props);
        this.state = {
            value: '1'
        }
    }

	handleChange: RadioGroupProps['onChange'] = (event) => {
	    this.setState({
	        value: (event as React.ChangeEvent<HTMLInputElement>).target.value
	    })
	}

	render() {
	    const {value} = this.state
	    return (
	        <Radio.Group
	            antd={true}
	            name="nations"
	            value={value}
	            onChange={this.handleChange}
	        >
	            <Radio value="1">中国</Radio>
	            <Radio value="2">美国</Radio>
	            <Radio value="3">日本</Radio>
	            <Radio value="4">土库曼斯坦</Radio>
	            <Radio value="5">巴西</Radio>
	            <Radio value="6">澳大利亚</Radio>
	        </Radio.Group>
	    )
	}
}

export default Demo6;
