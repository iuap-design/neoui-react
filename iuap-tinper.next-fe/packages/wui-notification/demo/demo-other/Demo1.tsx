/**
 *
 * @title 默认提醒
 * @description
 *
 */

import {Button, Notification} from '@tinper/next-ui';
import React, {Component} from 'react';

let newNotification: any = null;
Notification.newInstance({placement: 'bottomRight', transition: false}, n => newNotification = n);


class Demo1 extends Component {

    simpleFn() {
        newNotification!.notice({
            color: 'successlight',
            description: <span>这是一个提示</span>,
            onClose() {
                console.log('simple close');
            },
            onClick() {
                console.log('simple click')
            }
        });
    }

    render() {

        return (
            <div className="demoPadding">
                <Button colors="secondary" onClick={this.simpleFn}>simple show</Button>
            </div>
        )
    }
}

export default Demo1;
