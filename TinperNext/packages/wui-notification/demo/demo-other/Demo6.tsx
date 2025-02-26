/**
 *
 * @title 自定义关闭按钮
 * @description 自定义关闭按钮的样式和文字
 *
 */

import {Button, Notification, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

let newNotification: any = null;
Notification.newInstance({placement: 'bottomRight'}, n => newNotification = n);


class Demo6 extends Component {

    simpleFn() {
        newNotification!.notice({
            message: '事例1',
            color: 'successlight',
            description: <span>这是一个自定义关闭按钮事例</span>,
            onClose() {
                console.log('simple close');
            },
            btn: <Button shape="round" colors="info">destory</Button>
        });
    }

    simpleFn1() {
        newNotification!.notice({
            message: '事例2',
            color: 'successlight',
            description: <span>这是另一个自定义关闭按钮事例</span>,
            onClose() {
                console.log('simple close');
            },
            btn: <span style={{color: '#0065FF'}}>destory<Icon type="uf-bumen"/></span>
        });
    }

    render() {

        return (
            <div className="demoPadding">
                <Button colors="secondary" onClick={this.simpleFn}>关闭按钮1</Button>
                <Button colors="secondary" onClick={this.simpleFn1}>关闭按钮2</Button>
            </div>
        )
    }
}

export default Demo6;
