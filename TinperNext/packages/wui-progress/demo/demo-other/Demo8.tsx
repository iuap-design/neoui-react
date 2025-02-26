/**
 *
 * @title 仪表盘
 * @description 通过设置 type=dashboard，可以很方便地实现仪表盘样式的进度条。
 *
 */
import {Progress} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo8 extends Component {
    render() {
        return (
            <div>
                <Progress type="dashboard" percent={75}/>
                {/* <Progress type="dashboard" percent={75} gapDegree={180} gapPosition={"top"} width={600} /> */}

            </div>
        )
    }
}

export default Demo8
