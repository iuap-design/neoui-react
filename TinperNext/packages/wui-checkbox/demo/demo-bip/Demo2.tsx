/**
 * @title 不同颜色的 Checkbox
 * @description `colors`参数控制背景色
 * @type other
 * demo2
 */

import {Checkbox} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo2 extends Component {
    render() {
        return (
            <div className="demo-checkbox">
                <Checkbox colors="primary">primary</Checkbox>
                <Checkbox colors="success">success</Checkbox>
                <Checkbox colors="info">info</Checkbox>
                <Checkbox colors="danger">danger</Checkbox>
                <Checkbox colors="warning">warning</Checkbox>
                <Checkbox colors="dark">dark</Checkbox>
            </div>
        )
    }
}

export default Demo2;
