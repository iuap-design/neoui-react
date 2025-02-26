/**
 * @title 红色填充的 Radio
 * @description `inverse` 参数设置选中为红色填充。
 * @type other
 * demo5
 */

import {Radio, RadioGroupProps} from '@tinper/next-ui'
import React, {Component} from 'react'


class Demo1 extends Component <{}, {selectedValue: RadioGroupProps['value'] | undefined}> {
    constructor(props:{}) {
        super(props);
        this.state = {
            selectedValue: '1'
        };
    }

    handleChange: RadioGroupProps['onChange'] = (value) => {
        this.setState({selectedValue: value as RadioGroupProps['value']});
        console.log(value)
    }

    render() {
        return (
            <Radio.Group
                name="fruits"
                value={this.state.selectedValue}
                onChange={this.handleChange.bind(this)}>
                <Radio value="1" inverse>苹果</Radio>
                <Radio value="2" inverse>香蕉</Radio>
                <Radio value="3" inverse>葡萄</Radio>
            </Radio.Group>
        )
    }
}

export default Demo1;
