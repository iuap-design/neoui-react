/**
 * @title 受控的 Checkbox
 * @description `checked` 参数设置是否选中，`disabled`设置是否可用。
 */

import {Button, Checkbox} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo3 extends Component<{}, {checked: boolean, disabled: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            checked: false,
            disabled: false
        }
    }

	changeCheck = () => {
	    this.setState({checked: !this.state.checked});
	}
	changeDisabled = () => {
	    this.setState({disabled: !this.state.disabled});
	}

	render() {
	    const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled' : 'Enabled'}`;
	    return (
	        <div className="demo-checkbox">
	            <p>
	                <Button
	                    colors="secondary"
	                    onClick={this.changeCheck.bind(this)}
	                    style={{marginRight: "8px"}}
	                >
	                    {!this.state.checked ? 'Check' : 'Uncheck'}
	                </Button>
	                <Button
	                    colors="secondary"
	                    onClick={this.changeDisabled.bind(this)}
	                >
	                    {!this.state.disabled ? 'Disable' : 'Enable'}
	                </Button>
	            </p>
	            <p>
	                <Checkbox
	                    checked={this.state.checked}
	                    disabled={this.state.disabled}
	                    onChange={this.changeCheck}
	                >
	                    {label}
	                </Checkbox>
	            </p>
	        </div>
	    )
	}
}

export default Demo3;
