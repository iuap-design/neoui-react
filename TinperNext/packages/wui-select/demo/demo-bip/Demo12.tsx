/**
 * @title 无边框样式
 * @description bordered为false时没有边框
 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

class Demo12 extends Component {
    render() {
        return (
            <div>
                <Select defaultValue="derrick" style={{width: 120}} bordered={false}>
                    <Option value="derrick">Derrick</Option>
                    <Option value="nichole">Nichole</Option>
                    <Option value="michie">Michie</Option>
                </Select>
                <Select defaultValue="julie" style={{width: 120}} disabled bordered={false}>
                    <Option value="julie">Julie</Option>
                </Select>
            </div>
        );
    }
}

export default Demo12;
