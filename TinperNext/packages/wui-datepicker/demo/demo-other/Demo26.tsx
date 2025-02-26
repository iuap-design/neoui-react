/**
 * @title 下划线模式
 * @description 设置bordered='bottom'
 */

import {Button, DatePicker, Row, Col} from '@tinper/next-ui';
import moment from 'moment';
import React, {Component} from 'react';

const {RangePicker} = DatePicker;

type ModeType = 'date' | 'month' | 'year';

const modeArr: [ModeType, ModeType][] = [
    ['date', 'date'],
    ['month', 'month'],
    ['year', 'year']
];

interface DemoState {
    index: number;
    mode: [ModeType, ModeType];
}

class Demo5 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            index: 1,
            mode: modeArr[0]
        };
    }

    changeMode = () => {
        this.setState({
            index: this.state.index + 1,
            mode: modeArr[(this.state.index + 1) % 3]
        });
    };

    render() {
        return (
            <div className='demo26'>
                <Row className='demo26-item' gutter={[10, 10]}>
                    <Col md={6}>
                        <DatePicker bordered={false} placeholder='无边框' value={'2022-11-11'} />
                    </Col>

                    <Col md={6}>
                        <DatePicker
	                requiredStyle
	                placeholder='选择日期' value={'2022-11-11'} />
                    </Col>

                    <Col md={6}>
                        <DatePicker
                            disabled
	                requiredStyle
	                placeholder='选择日期' value={'2022-11-11'} />
                    </Col>

                    <Col md={6}>
                        <DatePicker
	                requiredStyle
	                bordered='bottom' placeholder='选择日期' value={'2022-11-11'} />
                    </Col>

                    <Col md={6}>
                        <DatePicker
                            disabled
	                requiredStyle
	                bordered='bottom' placeholder='选择日期' value={'2022-11-11'} />
                    </Col>

                    <Col md={6}>
                        <RangePicker
                            requiredStyle
                            bordered={false}
                            placeholder='无边框'
                            locale='zh-cn'
                            showToday
                            disabled={[true, false]}
                            value={[moment(), moment().add(1, 'days')]}
                            mode={this.state.mode}
                            format='YYYY-MM-DD HH:mm:ss'
                            showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                        />
                    </Col>

                    <Col md={6}>
                        <RangePicker
                            requiredStyle
                            bordered='bottom'
                            locale='zh-cn'
                            showToday
                            placeholder={['开始', '结束']}
                            disabled={[true, false]}
                            value={[moment(), moment().add(1, 'days')]}
                            mode={this.state.mode}
                            format='YYYY-MM-DD HH:mm:ss'
                            showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            requiredStyle
                            bordered='bottom'
                            locale='zh-cn'
                            showToday
                            placeholder={['开始', '结束']}
                            disabled
                            value={[moment(), moment().add(1, 'days')]}
                            mode={this.state.mode}
                            format='YYYY-MM-DD HH:mm:ss'
                            showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            requiredStyle
                            disabled
                            locale='zh-cn'
                            showToday
                            placeholder={['开始', '结束']}
                            value={[moment(), moment().add(1, 'days')]}
                            mode={this.state.mode}
                            format='YYYY-MM-DD HH:mm:ss'
                            showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                        />
                    </Col>
                    <Col md={4}>
                        <Button onClick={this.changeMode}>点击切换不同mode</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Demo5;
