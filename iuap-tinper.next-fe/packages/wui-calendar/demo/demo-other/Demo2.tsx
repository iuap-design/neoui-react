/**
 *
 * @title 选择日历
 * @description 一个通用的日历面板，支持年/月切换。
 *
 */

import {Calendar} from "@tinper/next-ui";
import React, {Component} from 'react';
import {Moment} from "moment"

function onSelect(value: Moment) {
    console.log('onSelect', value);
}

class Demo2 extends Component<{}, {type: string}> {

    constructor(props: {}, context: {}) {
        super(props, context);

        this.state = {
            type: 'month',
        }
    }

    onTypeChange(type: string) {
        this.setState({
            type,
        });
    }

    onChange(value: Moment) {
        console.log('onChange', value)
    }

    render() {
        return (
            <div>
                <Calendar
                    style={{margin: 10}}
                    fullscreen
                    onSelect={onSelect}
                    type={this.state.type}
                    onPanelChange={this.onTypeChange.bind(this)}
                    onChange={this.onChange.bind(this)}
                />
            </div>
        )
    }
}

export default Demo2
