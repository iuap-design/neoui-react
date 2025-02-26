/**
 *
 * @title 日历填充(单选状态)
 * @description  充满一个外层box空间。
 *
 */

import { Calendar } from "@tinper/next-ui";
import { Moment } from "moment";
import React, { Component } from 'react';

function onSelect(value: Moment) {
    console.log('onSelect', value);
}
interface DemoState {
    height: string,
}
class Demo20 extends Component<{}, DemoState> {

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            height: '700px'
        }
    }
    componentDidMount(): void {
        let body = document.body;
        window.onresize = () => {
            console.log(body.clientHeight)
            this.setState({
                height: body.clientHeight + 'px'
            })
        }
    }
    render() {
        const { height } = this.state;
        return (
            <div style={{ height, minHeight: "600px" }}>
                <Calendar
                    onSelect={onSelect}
                    style={{maxHeight: "100%"}}
                    fullscreen
                    fillSpace
                    allowLunar
                />
            </div>
        )
    }
}

export default Demo20
