/**
 *
 * @title 小型进度条
 * @description 适合放在较狭窄的区域内。
 *
 */
import {Progress} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo3 extends Component {
    render() {
        return (
            <div style={{width: 170}}>
                <Progress percent={30} size="small"/>
                <Progress percent={50} size="small" status="active"/>
                <Progress percent={70} size="small" status="exception"/>
                <Progress percent={100} size="small"/>
            </div>
        )
    }
}

export default Demo3
