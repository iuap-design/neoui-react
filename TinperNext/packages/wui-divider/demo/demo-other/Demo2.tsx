/**
 *
 * @title 垂直分割线
 * @description 设置type="vertical"，垂直分割，实线虚线两种类型，可在中间加入文字
 */

import {Divider} from '@tinper/next-ui';
import React, {Component} from "react";

class Demo2 extends Component {

    render() {
        return (
            <>
				Text
                <Divider type="vertical"/>
                <a href="https://yondesign.yonyou.com/">Link</a>
                <Divider type="vertical"/>
                <a href="https://yondesign.yonyou.com/">Link</a>
            </>
        );
    }
}

export default Demo2;
