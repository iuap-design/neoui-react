/**
 *
 * @title 可控制的提醒
 * @description 通过设置duration:6来设置时间，null为自动控制
 *
 */

import {Button, Notification} from '@tinper/next-ui';
import React, {Component} from 'react';

let newNotification: any = null;
Notification.newInstance({placement: 'bottomRight'}, n => newNotification = n);

class Demo3 extends Component {
    constructor(props: {}) {
        super(props);
        this.manualClose = this.manualClose.bind(this);
    }

    closableFn() {
        newNotification!.notice({
            color: 'successlight',
            description: <span>只可以自动关闭的提示</span>,
            onClose() {
                console.log('closable close');
            },
            duration: 6,
            closable: false
        });
    }

    close(key: number) {
        newNotification!.removeNotice(key);
    }

    manualClose() {
        const key = Date.now();
        newNotification!.notice({
            color: 'successlight',
            description: <div>
                <span style={{paddingBottom: 20, display: 'block'}}>只可以点击关闭的提示</span>
                <Button onClick={this.close.bind(this, key)} size="sm" colors="primary"
                    style={{position: 'absolute', right: 15, bottom: 15}}>知道了</Button>
            </div>,
            key,
            duration: null,
            closable: false
        });
    }

    render() {
        return (
            <div className="demoPadding">
                <Button colors="primary" onClick={this.closableFn}>自动关闭</Button>
                <Button colors="primary" onClick={this.manualClose}>手动关闭</Button>
            </div>
        )
    }
}

export default Demo3;
