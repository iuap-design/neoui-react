/**
 *
 * @title 基础按钮
 * @description 基础的按钮用法。
 * @type bip
 */

import {Button} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo1 extends Component {
    open() {
        alert("onClick");
    }

    render() {
        return (
            <div className="demoPadding">
                <Button>默认按钮</Button>
                <Button colors="primary" onClick={this.open}>主要按钮</Button>
                <Button colors="secondary">次按钮</Button>
                <Button colors="dark">页面次按钮</Button>
                <Button type="plainText">文本按钮</Button>
            </div>
        )
    }
}

export default Demo1;
