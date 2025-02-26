/**
 *
 * @title 基础实例
 * @description 高度达到默认值时显示backtop
 *
 */
import {BackTop} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo1 extends Component {
    render() {
        return (
            <div>
                <p>让我掉下眼泪的</p>
                <p>不止昨夜的酒</p>
                <p>让我依依不舍的</p>
                <p>不止你的温柔</p>
                <p>雨路还要走多久</p>
                <p>你攥着我的手</p>
                <p>让我感到为难的</p>
                <p>是挣扎的自由</p>
                <p>分别总是在九月</p>
                <p>回忆是思念的愁</p>
                <p>深秋嫩绿的垂柳</p>
                <p>亲吻着我额头</p>
                <p>在那座阴雨的小城里</p>
                <p>我从未忘记你</p>
                <BackTop visibilityHeight={200} />
            </div>
        )
    }
}

export default Demo1;
