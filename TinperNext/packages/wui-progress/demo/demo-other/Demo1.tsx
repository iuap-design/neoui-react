/**
 *
 * @title 进度条
 * @description 标准的进度条。
 *
 */
import {Progress} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo1 extends Component {
    render() {
        return (
            <div>
                <Progress fieldid="demo" percent={30} showInfo={false}/>
                <Progress percent={50} status="active"/>
                {/* <Progress percent={50} status="active" strokeWidth={40}	 /> */}
                <Progress percent={30} steps={5} tipsContent={['111', '222', '333', '444', '55555555555']} />
                <Progress percent={80} steps={5} strokeColor={['grey', 'yellow', 'red']}/>
                <Progress percent={70} status="exception"/>
                <Progress percent={100}/>
                <Progress percent={100} strokeWidth={20}/>
                {/* <Progress percent={50} showInfo={false} /> */}
            </div>
        )
    }
}

export default Demo1
