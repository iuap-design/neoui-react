/**
 *
 * @title 额外的页头页脚
 * @description 在浮层中加入额外的页脚，以满足定制面板的需求。
 */

import {Col, DatePicker, Row} from '@tinper/next-ui';
import React, {Component} from 'react';

const {RangePicker} = DatePicker;

class Demo9 extends Component {
    renderExtra = () =>
        React.createElement(
            'ul',
            null,
            Array(2)
                .fill(null)
                .map((item, i) => {
                    console.log(item, i);
                    return React.createElement('li', {key: i}, `自定义 line${i + 1}`);
                })
        );

    render() {
        return (
            <div className='demo9'>
                <Row gutter={[10, 10]}>
                    <Col md={6}>
                        <DatePicker
                            renderExtraHeader={this.renderExtra}
                            renderExtraFooter={this.renderExtra}
                            placeholder='选择日期'
                        />
                    </Col>

                    <Col md={6}>
                        <DatePicker
                            renderExtraHeader={this.renderExtra}
                            renderExtraFooter={this.renderExtra}
                            showTime
                            placeholder='选择日期时间'
                        />
                    </Col>

                    <Col md={6}>
                        <DatePicker
                            picker='month'
                            renderExtraHeader={this.renderExtra}
                            renderExtraFooter={this.renderExtra}
                            placeholder='选择月'
                        />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            picker='year'
                            renderExtraHeader={this.renderExtra}
                            renderExtraFooter={this.renderExtra}
                            placeholder='选择年份'
                        />
                    </Col>

                    <Col md={6}>
                        <RangePicker
                            renderExtraHeader={this.renderExtra}
                            renderExtraFooter={this.renderExtra}
                            placeholder='开始 - 结束' // 兼容老版本string，推荐Array
                            // placeholder={['开始', '结束']}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            renderExtraHeader={this.renderExtra}
                            renderExtraFooter={this.renderExtra}
                            showTime
                            placeholder={['开始日期时间', '结束日期时间']}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Demo9;
