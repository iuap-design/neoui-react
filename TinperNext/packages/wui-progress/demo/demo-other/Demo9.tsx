/**
 *
 * @title 分段进度条
 * @description 标准的进度条。
 *
 */
import {Progress, Tooltip} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo9 extends Component {
    render() {
        return (
            <div>
                <Tooltip overlay="3 done / 3 in progress / 4 to do">
                    <Progress percent={60} successPercent={30}/>
                    <Progress percent={60} success={{percent: 30, strokeColor: 'yellow'}}/>
                </Tooltip>

                <Tooltip overlay="3 done / 3 in progress / 4 to do">
                    <Progress percent={60} successPercent={30} type="circle"/>
                    <Progress percent={60} success={{percent: 30, strokeColor: 'yellow'}} type="circle"/>
                </Tooltip>

                <Tooltip overlay="3 done / 3 in progress / 4 to do">
                    <Progress percent={60} successPercent={30} type="dashboard"/>
                </Tooltip>
            </div>
        )
    }
}

export default Demo9
