/**
 * @title Checkbox.Group在form中使用
 * @description `value` 参数设置默认值，`onChange`设置值改变的回调。
 */

import {Button, Checkbox, Form} from '@tinper/next-ui';
import React, {Component} from 'react';
const CheckboxGroup = Checkbox.Group;
class Demo4 extends Component<{form: any}, {value: string[]}> {

    constructor(props: {form: any}) {
	    super(props);
	    this.state = {
	        value: ['3', '4']
	    }
    }

	change = (value: Array<string>) => {
	    this.setState({
	        value
	    })
	}
	click = () => {
	    this.props.form.validateFields((_error: null | string, values: Record<string, string[]>) => {
	        console.log(values)
	    })
	}

	render() {
	    const {getFieldProps} = this.props.form;
	    return (
	        <div className="demo-checkbox">
	            <CheckboxGroup
	                {
	                    ...getFieldProps('name', {
	                        initialValue: ['2', '3'],
	                        onChange: this.change
	                    })
	                }
	            >
	                <Checkbox value='1'>
						1
	                </Checkbox>
	                <Checkbox value='2'>
						2
	                </Checkbox>
	                <Checkbox value='3'>
						3
	                </Checkbox>
	                <Checkbox value='4'>
						4
	                </Checkbox>
	                <Checkbox value='5'>
						5
	                </Checkbox>
	            </CheckboxGroup>
	            <Button style={{marginTop: '10px'}} colors="secondary" onClick={this.click}>submit</Button>
	        </div>
	    )
	}
}

export default Form.createForm()(Demo4);
