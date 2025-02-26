/**
 *
 * @title 单据提示类场景示例
 * @description message组件常用在网络请求成功、失败、出现警告时使用。对于删除操作等需要强提示的场景可使用Modal组件。
 *
 */

import {Button, Form, Message} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo7 extends Component {
    showMessage() {
        Message.destroy();
        console.log(Message);
        Message.warning({
            content: "warning",
            duration: 0,
            onClose: () => {
                console.log("close");
            },
            onClick: () => {
                console.log('onClick, waring')
            }
        })
        Message.info({
            content: "info",
            duration: 0,
            onClose: () => {
                console.log("close");
            },
            onClick: () => {
                console.log('onClick, info')
            }
        })
        Message.success({
            content: "success",
            duration: 0,
            onClose: () => {
                console.log("close");
            },
            onClick: () => {
                console.log('onClick, success')
            }
        })
        Message.error({
            content: "error",
            duration: 0,
            onClose: () => {
                console.log("close");
            },
            onClick: () => {
                console.log('onClick, error')
            }
        })
    }

    render() {
        return (
            <Button onClick={this.showMessage}>测试api</Button>
        )
    }
}

export default Form.createForm()(Demo7);
