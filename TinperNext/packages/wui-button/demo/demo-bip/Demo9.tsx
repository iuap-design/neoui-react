/**
 *
 * @title 禁用状态
 * @description 按钮不可用状态。
 * @type bip
 */

import {Button} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo extends Component {
    render() {
        return (
            <div className="demoPadding">
                <Button disabled>默认按钮</Button>
                <Button disabled uirunmode="design" colors="primary">主要按钮</Button>
                <Button disabled colors="secondary">次按钮</Button>
                <Button disabled colors="dark">页面次按钮</Button>
                <Button disabled type="plainText">文本按钮</Button>
                <br/>
                <br/>
                <Button disabled bordered>默认按钮</Button>
                <Button disabled bordered colors="primary">主要按钮</Button>
            </div>
        )
    }
}

export default Demo;
