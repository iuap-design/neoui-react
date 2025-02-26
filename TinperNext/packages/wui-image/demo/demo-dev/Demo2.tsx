/**
 *
 * @title 图片列表查看(包含fieldid)
 * @description 图片列表查看。 img 的 data-original 写高清大图地址。src写缩略图地址
 *
 */

import {Image} from '@tinper/next-ui'
import React, {Component} from 'react';

class Demo2 extends Component {

    render() {
        return (
            <div className='demo'>
                <Image fieldid="root"
                >
                    <div>
                        <img
                            fieldid="demo1"
                            data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg"
                            src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg'
                            alt="Picture" />
                        <img
                            fieldid="demo2"
                            data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-4-min.jpg"
                            src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-2-min.jpg'
                            alt="Picture" />
                        <img
                            fieldid="demo3"
                            data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-3-min.jpg"
                            src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-3-min.jpg'
                            alt="Picture" />
                        <img
                            fieldid="demo4"
                            data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-2-min.jpg"
                            src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-4-min.jpg'
                            alt="Picture" />
                        <img
                            fieldid="demo5"
                            data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg"
                            src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg'
                            alt="Picture" />
                    </div>
                </Image>
            </div>

        )
    }
}

export default Demo2;
