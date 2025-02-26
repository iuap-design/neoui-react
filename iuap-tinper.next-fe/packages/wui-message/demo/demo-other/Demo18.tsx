/**
 *
 * @title 多位置的message并存及destroyWithKey使用
 * @description 只能通过key的方式销毁
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const onClickBottom = function() {
    // Message.destroy();
    Message.create({content: '单据提交成功。', duration: 10, transition: false, position: 'bottom', color: "light"});
};
const onClickTop = function() {
    // Message.destroy();
    Message.create({content: '单据提交成功。', duration: 10, transition: false, position: 'top', color: "light"});
};
const onClickBottomLeft = function() {
    Message.destroy(123);
    Message.create({content: '单据提交成功。', duration: 100, transition: false, destroyWithKey: true, key: 123, position: 'bottomLeft', color: "light"});
};
const onClickTopLeft = function() {
    // Message.destroy();
    Message.create({content: '单据提交成功。', duration: 10, transition: false, position: 'topLeft', color: "light"});
};
const onClickBottomRight = function() {
    // Message.destroy();
    Message.create({content: '单据提交成功。', duration: 10, transition: false, position: 'bottomRight', color: "light"});
};
const onClickTopRight = function() {
    Message.create({content: '单据提交成功。', duration: 10, transition: false, position: 'topRight', color: "light"});
};
const onDestroy = function() {
    Message.destroy();
};
const onDestroyAll = function() {
    Message.destroy(123);
    Message.destroy();
};

class Demo18 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    shape="border"
                    onClick={onClickTop}>
					消息上
                </Button>
                <Button
                    shape="border"
                    onClick={onClickBottom}>
					消息下
                </Button>
                <Button
                    shape="border"
                    onClick={onClickBottomLeft}>
					消息左下
                </Button>
                <Button
                    shape="border"
                    onClick={onClickTopLeft}>
					消息左上
                </Button>
                <Button
                    shape="border"
                    onClick={onClickBottomRight}>
					消息右下
                </Button>
                <Button
                    shape="border"
                    onClick={onClickTopRight}>
					消息右上
                </Button>
                <Button
                    shape="border"
                    onClick={onDestroy}>
					销毁不含destroyWithKey的message
                </Button>
                <Button
                    shape="border"
                    onClick={onDestroyAll}>
					销毁所有
                </Button>
            </div>
        )
    }
}


export default Demo18;
