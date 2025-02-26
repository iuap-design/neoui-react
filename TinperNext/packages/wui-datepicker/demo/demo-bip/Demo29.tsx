/**
 *
 * @title 改变结束时间收起面板
 * @description atOnceFinish属性控制结束， showTime为true时生效，当开始结束时间都存在时，直接改变结束时间点击确定按钮，则直接收起面板
 */

import {Col, DatePicker, Row} from '@tinper/next-ui';
import React, {Component} from 'react';

const {RangePicker} = DatePicker;

class Demo29 extends Component {
    render() {
        return (
            <div className='demo29'>
                <Row gutter={[10, 10]}>
                    <Col md={6}>
                        <RangePicker
                            showTime
                            placeholder={['开始日期时间', '结束日期时间']}
                            atOnceFinish={true}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Demo29;
