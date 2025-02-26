/**
 *
 * @title 通过ESC按键关闭弹窗
 * @description 通过设置keyboard属性，控制ESC按键能否关闭弹窗
 * demo10
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const dark = function() {
    Message.destroy();
    Message.create({
        content: '通过ESC按键可以关闭弹窗',
        onEscapeKeyUp: () => alert('通过ESC关闭弹窗的回调'),
        color: "dark",
        duration: 300,
        keyboard: true
    });
};
const light = function() {
    Message.destroy();
    Message.create({content: '通过ESC按键无法关闭弹窗', color: "dark", duration: 300, keyboard: false});
};

class Demo1 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    colors="dark"
                    onClick={dark}>
					通过ESC按键可以关闭弹窗
                </Button>
                <Button
                    shape="border"
                    onClick={light}>
					通过ESC按键无法关闭弹窗
                </Button>
            </div>
        )
    }
}


export default Demo1;
