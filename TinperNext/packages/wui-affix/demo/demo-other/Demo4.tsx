/**
 *
 * @title 导航吸顶效果
 * @description 结合Navbar使用示例
 *
 */

import {Affix, Breadcrumb} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo4 extends Component {

	onChange = () => {
	    console.log('触发固定或者固定取消时的回调函数');
	}

	render() {
	    return (
	        <div className="outer-box" id="outer-box">
	            <Affix zIndex={2001} onChange={this.onChange}>
	                <Breadcrumb>
	                    <Breadcrumb.Item href="#">
							Home
	                    </Breadcrumb.Item>
	                    <Breadcrumb.Item>
							Library
	                    </Breadcrumb.Item>
	                    <Breadcrumb.Item active>
							Data
	                    </Breadcrumb.Item>
	                </Breadcrumb>
	            </Affix>
	            <p>问世间、情为何物，只教生死相许？天南地北双飞客，老翅几回寒暑。欢乐趣，离别苦， 就中更有痴儿女。君应有语，渺万里层云，千山暮雪，只影向谁去？横汾路，寂寞当年箫鼓，荒烟依旧平楚。招魂楚些何嗟及，
					山鬼暗谛风雨。天也妒，未信与，莺几燕子俱黄土。千秋万古，为留待骚人，狂歌痛饮，来访雁丘处。</p>
	        </div>
	    );
	}

}


export default Demo4;
