/**
 * @title 竖方向Radio
 * @description 可以通过style来设置radio样式
 */

import {Radio, RadioGroupProps} from '@tinper/next-ui'
import React, {Component} from 'react'


class Demo3 extends Component <{}, {selectedValue:RadioGroupProps['value'] | undefined}> {
    constructor(props:{}) {
        super(props);
        this.state = {
            selectedValue: '1'
        };
    }

    handleChange: RadioGroupProps['onChange'] = (value) => {
        this.setState({selectedValue: value as RadioGroupProps['value']});
    }

    render() {
        const radioStyle = {
            display: 'block',
            marginBottom: 12
        };
        return (
            <div className="demo3">
                <Radio.Group
                    name="team"
                    value={this.state.selectedValue}
                    onChange={this.handleChange.bind(this)}>
                    <Radio style={radioStyle} value="1">苹果</Radio>
                    <Radio style={radioStyle} value="2">香蕉</Radio>
                    <Radio style={radioStyle} value="3">葡萄</Radio>
                    <Radio style={radioStyle} value="4">菠萝</Radio>
                    <Radio style={radioStyle} value="5">梨</Radio>
                    <Radio style={radioStyle} value="6">石榴</Radio>
                </Radio.Group>
            </div>
        )
    }
}

export default Demo3;
