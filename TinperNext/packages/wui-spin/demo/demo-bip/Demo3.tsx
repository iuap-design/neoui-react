/**
 *
 * @title 容器
 * @description 通过document对象的方法，指定`getPopupContainer`属性。
 * @type bip
 */

import {Spin} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo4 extends Component {

	getElement = () => {
	    return document.querySelector('#demo4')
	}

	render() {
	    return (
	        <>
	            <div className="demo4" id="demo4">
	                <Spin getPopupContainer={this.getElement} spinning={true}/>
	            </div>
	        </>
	    )
	}
}


export default Demo4;
