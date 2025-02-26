/**
 * @title 只读状态的单选框
 * @description 设置readOnly属性，radio的状态不能改变。RadioGroup下的Radio的readOnly属性无效，使用父节点的readOnly。
 * @type other
 * demo8
 */

import {Radio, RadioGroupProps} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo8 extends Component <{}, {value: RadioGroupProps['value']}> {
    constructor(props:{}) {
        super(props);
        this.state = {
            value: '2'
        };
    }

    handleChange: RadioGroupProps['onChange'] = (value) => {
        this.setState({value: value as RadioGroupProps['value']});
    }
    render() {
        return (
            <>
                <div>
                    <Radio.Group
                        name="fruits"
                        value={this.state.value}
                        readOnly
                        onChange={this.handleChange.bind(this)}>
                        <Radio value="1">苹果</Radio>
                        <Radio value="2">香蕉</Radio>
                        <Radio readOnly={false} value="3">葡萄</Radio>
                    </Radio.Group>
                </div>
                <div>
                    <span>单独Radio：</span>
                    <Radio readOnly checked value="4">菠萝</Radio>
                </div>
            </>
        )
    }
}

export default Demo8;
