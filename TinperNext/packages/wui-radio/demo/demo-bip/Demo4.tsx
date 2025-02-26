/**
 * @title Radio.Button 基本使用
 * @description `selectedValue`参数设置被选中的radio值，`onChange`设置值改变的回调
 */

import {Radio, RadioGroupProps} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo4 extends Component <{}, {selectedValue:RadioGroupProps['value'] | undefined;selectedValue2:RadioGroupProps['value'] | undefined}> {
    constructor(props:{}) {
        super(props);
        this.state = {
            selectedValue: 'orange',
            selectedValue2: 'apple'
        };
    }

    handleChange: RadioGroupProps['onChange'] = (value) => {
        this.setState({selectedValue: value as RadioGroupProps['value']});
    }

    handleChange2: RadioGroupProps['onChange'] = (value) => {
        this.setState({selectedValue2: value as RadioGroupProps['value']});
    }

    render() {
        return (
            <div>
                <Radio.Group
                    name="fruit"
                    value={this.state.selectedValue}
                    onChange={this.handleChange}>
                    <Radio.Button value="apple">apple</Radio.Button>
                    <Radio.Button value="banana">banana</Radio.Button>
                    <Radio.Button value="orange">orange</Radio.Button>
                </Radio.Group>

                <div style={{marginTop: 16}}>
                    <Radio.Group
                        value={this.state.selectedValue2}
                        onChange={this.handleChange2}>
                        <Radio.Button value="apple">apple</Radio.Button>
                        <Radio.Button value="banana" disabled>banana</Radio.Button>
                        <Radio.Button value="orange">orange</Radio.Button>
                    </Radio.Group>
                </div>

                <div style={{marginTop: 16}}>
                    <Radio.Group value="apple" disabled>
                        <Radio.Button value="apple">apple</Radio.Button>
                        <Radio.Button value="banana">banana</Radio.Button>
                        <Radio.Button value="orange">orange</Radio.Button>
                    </Radio.Group>
                </div>
            </div>

        )
    }
}

export default Demo4;
