/**
 *
 * @title 自定义Timeline节点
 * @description 将icon或者其他自定义元素设置成节点.
 *
 */
import {Icon, Timeline} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo4 extends Component {
    render() {
        return (
            <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon type="uf-time-c-o" style={{fontSize: '16px'}}/>} color="danger">Technical
					testing 2015-09-01</Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
        )
    }
}

export default Demo4;


