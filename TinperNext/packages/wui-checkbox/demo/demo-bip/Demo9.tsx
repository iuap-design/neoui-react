/**
 * @title 只读状态的复选框
 * @description 设置readOnly属性，checkbox的状态不能改变。CheckboxGroup下的Checkbox的readOnly属性无效，使用父节点的readOnly。
 */


import {Checkbox} from "@tinper/next-ui";
import React, {Component} from 'react';

const CheckboxGroup = Checkbox.Group;

class Demo9 extends Component<{}, {value: Array<string>}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: ['2', '4']
        }
    }

    onChange = (value: Array<string>) => {
        // 不会执行
        this.setState({
            value
        })
    }

    render() {
        return (
            <div className="demo-checkbox">
                <div>
                    <CheckboxGroup style={{ display: 'inline-block' }} value={this.state.value} readOnly onChange={this.onChange}>
                        <Checkbox value='1'>1</Checkbox>
                        <Checkbox value='2'>2</Checkbox>
                        <Checkbox readOnly={false} value='3'>3</Checkbox>
                        <Checkbox value='4'>4</Checkbox>
                        <Checkbox value='5'>5</Checkbox>
                    </CheckboxGroup>
                </div>
                <div>
                    <span>单独Checkbox：</span>
                    <Checkbox readOnly checked>6</Checkbox>
                </div>
            </div>
        )
    }
}

export default Demo9;
