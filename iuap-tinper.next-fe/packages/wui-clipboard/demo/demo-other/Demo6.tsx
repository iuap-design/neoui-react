/**
 *
 * @title 异步复制
 * @description 其实是点击的回调，传回callback实现复制
 *
 */

import {Clipboard} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo6 extends Component {
    success = () => {
        console.log('复制成功')
    }
    asyncCopy = (callback: any) => {
        setTimeout(() => {
            // 异步获取的文本直接传给callback就完成了复制
            callback('复制异步获取的文本')
            if (callback('复制异步获取的文本')) {
                if (this.success instanceof Function) this.success();
            } else {
                console.log('复制失败')
            }
        }, 1000)
    }
    render() {
        return (
            <Clipboard action="copy" asyncCopy={this.asyncCopy}>
            </Clipboard>
        )
    }
}

export default Demo6;
