/**
 * @title 下划线模式
 * @description 设置bordered='bottom'
 */

import { InputNumber, Select } from '@tinper/next-ui';
import React, { Component } from 'react';

const InputNumberGroup = InputNumber.InputNumberGroup;
const Option = Select.Option;

class Demo19 extends Component<{}, {value?: [number, number]}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: undefined
        };
    }

    handleChange = (value: [number, number]) => {
        console.log(value);
        this.setState({
            value
        });
    };

    render() {
        return (
            <div className='demo19'>
                <InputNumber bordered={false} placeholder='无边框' requiredStyle/>

                <br />
                <InputNumber bordered='bottom' align='center' defaultValue={666} requiredStyle />

                <br />

                <InputNumberGroup
                    requiredStyle
                    iconStyle='double'
                    min={10}
                    max={12}
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder={['请输入最小值', '请输入最大值']}
                />

                <InputNumberGroup
                    iconStyle='double'
                    bordered='bottom'
                    requiredStyle
                    min={10}
                    max={12}
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder={['请输入最小值', '请输入最大值']}
                />

                <br />

                <InputNumberGroup
                    iconStyle='double'
                    bordered='bottom'
                    requiredStyle
                    disabled
                    min={10}
                    max={12}
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder={['请输入最小值', '请输入最大值']}
                />

                <br />

                <InputNumber
                    requiredStyle
                    iconStyle='one'
                    bordered='bottom'
                    size='lg'
                    min={-9999}
                    max={99999}
                    addonBefore='https'
                    addonAfter={
                        <Select defaultValue={'com'} size='lg' bordered={false}>
                            <Option value={'com'}>com</Option>
                            <Option value={'cn'}>cn</Option>
                        </Select>
                    }
                />
            </div>
        );
    }
}

export default Demo19;
