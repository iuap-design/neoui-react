/**
 * @title 红色填充的 Checkbox
 * @description `inverse` 参数设置选中为红色填充。
 * @type other
 * demo7
 */


import {Checkbox} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo7 extends Component <{}, {checkedFlag: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            checkedFlag: false
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e: boolean) {
        console.log(e);
        this.setState({checkedFlag: e});
    }

    render() {
        return (
            <div className="demo-checkbox">
                <Checkbox
                    disabled
                    inverse
                    checked={true}>
					禁用
                </Checkbox>
                <Checkbox
                    inverse
                    checked={this.state.checkedFlag}
                    onChange={this.onChange}>
					全选
                </Checkbox>
                <Checkbox
                    inverse
                    indeterminate
                    checked={false}
                >
					半选
                </Checkbox>
            </div>
        )
    }
}

export default Demo7;
