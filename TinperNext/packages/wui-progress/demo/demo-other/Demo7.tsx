/**
 *
 * @title 自定义文字格式
 * @description format 属性指定格式。
 *
 */
import {Progress} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo7 extends Component {
    render() {
        return (
            <div>
                <Progress type="circle" percent={75} format={percent => `${percent} Days`}/>
                <Progress type="circle" percent={100} format={() => 'Done'}/>
            </div>
        )
    }
}

export default Demo7
