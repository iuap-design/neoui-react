
/**
 *
 * @title 单个图片查看
 * @description 单个图片查看
 *
 */
import { Image } from '@tinper/next-ui'
import React, { Component } from 'react';

class Demo1 extends Component<{}, {}> {

    render() {
        const src = "http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg";
        return (
            <div className='demo'>
                <Image>
                    <img data-original={src} src={src} alt="Picture" />
                </Image>
            </div>
        )
    }
}

export default Demo1
