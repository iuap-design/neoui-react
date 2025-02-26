/**
 *
 * @title 单个图片查看
 * @description 单个图片查看
 *
 */
import {Image} from '@tinper/next-ui'
import React, {Component} from 'react';

class Demo1 extends Component<{}, {}> {

    render() {
	    return (
	        <div className='demo'>
	            <Image>
	                <div>
	                    <img
	                        data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg"
	                        src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg'
	                        alt="Picture"/>
	                </div>
	            </Image>
	        </div>
	    )
    }
}

export default Demo1
