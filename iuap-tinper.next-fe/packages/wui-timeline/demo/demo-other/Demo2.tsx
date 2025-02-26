/**
 *
 * @title 定制化颜色Timeline
 * @description 设置圆环的颜色[success,info,danger,warning,news]
 *
 */
import {Timeline, Radio} from '@tinper/next-ui';
import React, {Component} from 'react';

interface TimelineState {
	mode: 'left' | 'right' | 'alternate';
}
class Demo2 extends Component<{}, TimelineState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            mode: 'left',
        }
    }

    onChange = (e: any) => {
        this.setState({
            mode: e.target.value
        })
    }

    render() {
        const {mode} = this.state;
        return (
            <>
                <Radio.Group
                    onChange={this.onChange}
                    value={mode}
                    antd
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <Radio value="left">Left</Radio>
                    <Radio value="right">Right</Radio>
                    <Radio value="alternate">Alternate</Radio>
                </Radio.Group>
                <Timeline mode={mode}>
                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item color="info">Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item color="danger">
                        <p style={{marginTop: 0}}>Solve initial network problems 1</p>
                        <p>Solve initial network problems 2</p>
                        <p>Solve initial network problems 3 2015-09-01</p>
                    </Timeline.Item>
                    <Timeline.Item>
                        <p style={{marginTop: 0}}>Technical testing 1</p>
                        <p>Technical testing 2</p>
                        <p>Technical testing 3 2015-09-01</p>
                    </Timeline.Item>
                </Timeline>
            </>
        )
    }
}


export default Demo2;
