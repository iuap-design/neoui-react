/**
 *
 * @title  自定义状态标签
 * @description 可以通过color属性控制标签的颜色【以下几种是常用的业务标签类型】
 * @type bip
 */

import {Tag} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo6 extends Component {

    render() {
        return (
            <div className="demoPadding">
                <Tag size="sm" color="half-blue">待审核</Tag>
                <Tag size="sm" color="half-green">已审核</Tag>
                <Tag size="sm" color="half-dark">已作废</Tag>
                <Tag size="sm" color="half-yellow">已暂存</Tag>
                <Tag size="sm" color="half-red">已标错</Tag>
                <Tag size="sm" bordered color="#6366F1">机动调整1</Tag>
                <Tag size="sm" bordered color="#F97316">机动调整2</Tag>
                <Tag size="sm" bordered color="#EC4899">机动调整3</Tag>
                <Tag size="sm" bordered color="#84CC16">机动调整4</Tag>
            </div>
        )
    }
}

export default Demo6;
