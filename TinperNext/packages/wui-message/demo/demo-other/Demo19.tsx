/**
 *
 * @title containerKey的使用
 * @description 使用containerKey分组后， 相同挂载点(getPopupContainer)的message相互之间不会互相影响
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const onClickBottomLeft = function() {
    Message.create({content: '单据提交成功。', duration: 100, transition: false, position: 'bottomLeft', color: "light", getPopupContainer: document.querySelector('.demos-wui-message')!});
};
const onClickBottomLeft1 = function() {
    Message.create({content: '单据提交成功。', duration: 100, transition: false, wrapperStyle: {bottom: '600px'}, destroyWithKey: true, position: 'bottomLeft', color: "light", containerKey: '123', getPopupContainer: document.querySelector('#tinperDemo')!});
};
const onClickBottomLeft2 = function() {
    Message.create({content: '单据提交成功。', duration: 100, transition: false, wrapperStyle: {bottom: '600px'}, destroyWithKey: true, position: 'bottomLeft', color: "light", containerKey: '123', getPopupContainer: document.querySelector('.demos-wui-message')!});
};

class Demo19 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    shape="border"
                    onClick={onClickBottomLeft}>
					消息左下
                </Button>
                <Button
                    shape="border"
                    onClick={onClickBottomLeft1}>
					消息左下分组
                </Button>
                <Button
                    shape="border"
                    onClick={onClickBottomLeft2}>
					消息左下分组
                </Button>
            </div>
        )
    }
}


export default Demo19;
