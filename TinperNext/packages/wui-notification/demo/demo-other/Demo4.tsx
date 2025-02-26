/**
 *
 * @title 设置getPopupContainer容器示例
 * @description 在DidMount里初始化notification，传入getPopupContainer
 *
 */

import {Button, Notification} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo1 extends Component {
	notification: any | null = null;
	componentDidMount() {
	    Notification.newInstance({
	        placement: 'bottomRight',
	        getPopupContainer: () => document.getElementById('container')!
	    }, n => this.notification = n);
	}

	simpleFn = () => {
	    this.notification!.notice({
	        color: 'successlight',
	        description: <span>这是一个提示</span>,
	        duration: 0,
	        onClose() {
	            console.log('simple close');
	        },
	    });
	}

	render() {

	    return (
	        <div className="demoPadding" id='container'>
	            <Button colors="secondary" onClick={this.simpleFn}>simple show</Button>
	        </div>
	    )
	}
}

export default Demo1;
