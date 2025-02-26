/**
 *
 * @title provider嵌套
 * @description provider可多层嵌套，每层管理自己需要的配置
 *
 */

import { ConfigProvider, DatePicker, Row } from "@tinper/next-ui";
import moment from 'moment';
import React, { Component } from 'react';

const {RangePicker} = DatePicker;

class Demo9 extends Component {
    render() {
        return (
            <div className="demo1" tinper-next-role={'container'} style={{position: 'relative'}} id='part-demo'>
                <ConfigProvider locale="en_US">
                    <ConfigProvider >
                        <Row>
                         日期：<DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                            />
                        </Row>
                        <Row>
                         范围：<RangePicker
                                showToday
                                format="YYYY-MM"
                            />
                        </Row>
                    </ConfigProvider>
                </ConfigProvider>
            </div>
        )
    }
}

export default Demo9;
