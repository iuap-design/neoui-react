/**
 * @title Checkbox.Group基本使用
 * @description 方便的从数组生成 Checkbox 组。
 */

import {Checkbox} from "@tinper/next-ui";
import React, {Component} from 'react';


const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange'},
];
const optionsWithDisabled = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange', disabled: false},
];

class Demo4 extends Component {
    constructor(props: {}) {
        super(props);
    }

    onChange(checkedValues: Array<string>) {
        console.log('checked = ', checkedValues);
    }

    render() {
        return (
            <div className="demo-checkbox">
                <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={this.onChange}/>

                <Checkbox.Group options={options} defaultValue={['Pear']} onChange={this.onChange}/>

                <Checkbox.Group
                    options={optionsWithDisabled}
                    disabled
                    defaultValue={['Apple']}
                    onChange={this.onChange}
                    name="sun"
                />
            </div>
        )
    }
}

export default Demo4;
