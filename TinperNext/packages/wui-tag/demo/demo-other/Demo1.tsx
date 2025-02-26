/**
 *
 * @title 默认标签
 * @description 默认提供两种形式的标签，主要用于信息标注。
 *
 */
import {Icon, Tag} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo1 extends Component {
    render() {
        return (
            <div className="demoPadding">
                <Tag>默认</Tag>
                <Tag color="light" bordered>边框标签</Tag>
                <Tag icon={<Icon type="uf-piechart"/>} bordered>自定义icon</Tag>
            </div>
        )
    }
}

export default Demo1;
