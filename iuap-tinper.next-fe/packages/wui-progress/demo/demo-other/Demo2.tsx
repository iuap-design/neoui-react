/**
 *
 * @title 进度圈
 * @description 圈形的进度。
 *
 */
import {Progress} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo2 extends Component {
    render() {
        return (
            <div>
                <Progress type="circle" percent={75}/>
                <Progress type="circle" percent={70} status="exception"/>
                <Progress type="circle" percent={100}/>
                {/* <Progress type="circle" percent={100} strokeWidth={40} width={400}	 /> */}
            </div>
        )
    }
}

export default Demo2
