/**
 *
 * @title 圆角/方角边缘
 * @description 通过设定 strokeLinecap="square|round" 可以调整进度条边缘的形状。
 *
 */
import {Progress} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo10 extends Component {
    render() {
        return (
            <div>
                <Progress strokeLinecap="square" percent={75}/>
                <Progress strokeLinecap="square" type="circle" percent={75}/>
                <Progress strokeLinecap="square" type="dashboard" percent={75}/>
            </div>
        )
    }
}

export default Demo10
