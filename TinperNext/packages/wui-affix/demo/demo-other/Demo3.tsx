/**
 *
 * @title horizontal Affix
 * @description 基本的Affix，水平滚动affix距离左侧位置确定
 *
 */


import {Affix, Button} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo3 extends Component {
    render() {
        // 请注意，这个container是为了适应tinperbee官网的布局特意设定，其他没有意外不需要传container，默认body
        let container = document.getElementsByClassName('page-container u-container example')[0] ? document.getElementsByClassName('page-container u-container example')[0] : document.getElementById('tinperBeeDemo');

        return (
            <div style={{height: 400}} id="outer-box3">
                <label> 基本的Affix，水平滚动affix距离左侧位置确定 `zIndex={2001} horizontal offsetTop=450 ` </label>
                <div style={{width: 200, margin: '300px 0 0 100px'}}>
                    <Affix container={container} zIndex={2001} horizontal={true} offsetTop={450}>
                        <Button colors="primary">450px to affix top</Button>
                    </Affix>
                </div>
            </div>
        )
    }
}

export default Demo3;
