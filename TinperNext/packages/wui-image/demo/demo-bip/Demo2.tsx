/**
 *
 * @title 图片列表查看(包含fieldid)
 * @description 图片列表查看。 img 的 data-original 写高清大图地址。src写缩略图地址
 *
 */

import { Image } from '@tinper/next-ui'
import React, { Component } from 'react';

class Demo2 extends Component {

    render() {
        const imgSrcList = [
            'http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg',
            'http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-2-min.jpg',
            'http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-3-min.jpg',
            'http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-4-min.jpg',
            'http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg',
        ]
        return (
            <div className='demo'>
                <Image fieldid="root">
                    <div>
                        {
                            imgSrcList.map((src, index) =>
                                <img key={index} fieldid={`demo${index}`} data-original={src} src={src} alt="Picture" />
                            )
                        }
                    </div>
                </Image>
                <br />
                <div>在TinperNext 4.6.0版本中，Image组件简化了工具栏，如果需要显示全部的工具栏，可以设置showAllToolbar</div>
                <br />
                <Image fieldid="root" showAllToolbar>
                    <div>
                        {
                            imgSrcList.map((src, index) =>
                                <img key={index} fieldid={`demo${index}`} data-original={src} src={src} alt="Picture" />
                            )
                        }
                    </div>
                </Image>
            </div>

        )
    }
}

export default Demo2;
