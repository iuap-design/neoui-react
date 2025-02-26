/**
 *
 * @title 不同颜色的提醒
 * @description 默认提供两种颜色，一黑一白。
 * @type other
 * demo2
 */

import {Button, Notification} from '@tinper/next-ui';
import React, {Component} from 'react';


let newNotification: any = null;
Notification.newInstance({placement: 'bottomRight'}, n => newNotification = n);

class Demo2 extends Component {

    simpleLight() {
        Notification.success({
            message: '通知',
            description: '明天下午李总召开会议，请您参加',
            duration: 0,
            key: '13'
        })
    }

    simpleLight1() {
        Notification.error({
            message: '通知',
            description: '明天下午李总召开会议，请您参加',
            duration: undefined,
            key: '12'
        })
    }

    simpleLight2() {
        Notification.warning({
            message: '通知',
            description: '明天下午李总召开会议，请您参加',
            duration: undefined
        })
    }

    simpleLight3() {
        Notification.info({
            message: '通知',
            description: '明天下午李总召开会议，请您参加',
            duration: undefined
        })
    }

    simpleDark() {
        newNotification!.notice({
            color: "dark",
            message: '邮箱',
            description: '您收到一封邮件'
        });
    }

    closeHnadle() {
        Notification.close('12')
    }

    destroyHnadle() {
        Notification.destroy()
    }

    render() {
        return (
            <div className="demoPadding">
                <Button colors="secondary" onClick={this.simpleLight}>success</Button>
                <Button colors="secondary" onClick={this.simpleLight1}>error</Button>
                <Button colors="secondary" onClick={this.simpleLight2}>warning</Button>
                <Button colors="secondary" onClick={this.simpleLight3}>info</Button>
                <Button colors="dark" onClick={this.simpleDark}>dark</Button>
                <Button onClick={this.closeHnadle}>close</Button>
                <Button onClick={this.destroyHnadle}>destroy</Button>
            </div>
        )
    }
}

export default Demo2;
