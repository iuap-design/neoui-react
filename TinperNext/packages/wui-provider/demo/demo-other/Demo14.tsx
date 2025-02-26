/**
 *
 * @title 全局配置direction支持rtl方向改变，用于阿拉伯语等多语展示
 * @description 默认是ltr，可以设置rtl
 * @iframe true
 * @demoCode demo-dev/Demo13
 */

import React, {Component} from 'react';


class Demo14 extends Component<{}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <iframe frameBorder={0} style={{width: '100%', height: '830px', overflow: 'hidden'}} src={`${top?.location.origin}${(top?.location.pathname.includes('/ucf-wh') || top?.location.origin.includes('localhost')) ? '/iuap-yondesign/ucf-wh' : ''}/demos/index.html#/wui-provider/dev/demo13`} />
        )
    }
}

export default Demo14;
