/**
 *
 * @title 容器
 * @description 指定`getPopupContainer`属性为`this`，可显示在该组件的上面。
 * @type bip
 */

import {Spin} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo2 extends Component {
    render() {
        return (
            <div className="demo2">
                <Spin getPopupContainer={this} spinning={true}>
                </Spin>
            </div>
        )
    }
}

export default Demo2;
