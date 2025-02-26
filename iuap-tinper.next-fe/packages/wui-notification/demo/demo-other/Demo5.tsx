/**
 *
 * @title 自定义图标
 * @description 通过icon设置自定义图标，closeIcon设置自定义关闭图标
 *
 */

import {Button, Notification, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

let newNotification: any = null;
Notification.newInstance({placement: 'bottomRight'}, n => newNotification = n);


class Demo5 extends Component {

    simpleFn() {
        newNotification!.notice({
            message: '数据分析',
            color: 'successlight',
            description: <span>这是一个自定义图标提示</span>,
            icon: <Icon type="uf-qingfenxi"/>,
            onClose() {
                console.log('simple close');
            },
        });
    }

    simpleFn2() {
        newNotification!.notice({
            color: 'successlight',
            description: <span>自定义关闭图标</span>,
            closeIcon: <Icon type="uf-appzhankai"/>,
            onClose() {
                console.log('simple close');
            },
        });
    }

    render() {

        return (
            <div className="demoPadding">
                <Button colors="secondary" onClick={this.simpleFn}>自定义图标</Button>
                <Button colors="secondary" onClick={this.simpleFn2}>自定义关闭图标</Button>
            </div>
        )
    }
}

export default Demo5;
