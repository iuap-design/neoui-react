/**
 *
 * @title 文字按钮
 * @description 没有边框和背景色的按钮。
 * @type bip
 */

import {Button} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo extends Component {

    open() {
        alert("onClick");
    }

    render() {
        return (
            <div className="demoPadding">
                <Button type="text">文字按钮</Button>
                <Button ghost type="text">文字按钮反转颜色色</Button>
                <Button disabled bordered type="text">文字按钮</Button>
            </div>
        )
    }
}

export default Demo;
