/**
 * @title 不同颜色的radio
 * @description `color`参数控制背景色
 * @type other
 * demo2
 */

import {Radio, RadioGroupProps} from '@tinper/next-ui'
import React, {Component} from 'react'


class Demo2 extends Component <{}, {selectedValue: RadioGroupProps['value'] | undefined}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedValue: '3'
        };
    }

    handleChange: RadioGroupProps['onChange'] = (value, _e) => {
        this.setState({selectedValue: value as Required<RadioGroupProps>['value']});
    }

    render() {
        return (
            <Radio.Group
                name="color"
                value={this.state.selectedValue}
                onChange={this.handleChange}>
                <Radio color="primary" value="1">苹果</Radio>
                <Radio color="success" value="2">香蕉</Radio>
                <Radio color="info" value="3">葡萄</Radio>
                <Radio color="warning" value="4">菠萝</Radio>
                <Radio color="danger" value="5">梨</Radio>
                <Radio color="dark" value="6">石榴</Radio>
            </Radio.Group>
        )
    }
}

export default Demo2;
