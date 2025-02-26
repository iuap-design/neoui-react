/**
 * @title fieldid的使用，以及子节点不传value的情况
 * @description fieldid生成在Select最外层dom，下拉箭头（showArrow设置为true），选项上。如果Option不传value，那么传进来的key作为value使用。
 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

let options = [
    {
        key: "vision",
        label: "幻视"
    },
    {
        key: "shang-chi",
        label: "尚气"
    },
    {
        key: "peter",
        label: "彼得"
    }
];

class Demo15 extends Component {
    render() {
        return (
            <div>
                <Select
                    onChange={(a, b) => console.log(a, b)}
                    style={{width: 120}}
                    fieldid="rogers"
                >
                    <Option title="1" key="hill">希尔</Option>
                    <Option title="2" key="kate">凯特</Option>
                    <Option title="3" key="monica">莫妮卡</Option>
                </Select>
                <Select
                    defaultValue="vision"
                    onChange={(c, d) => console.log(c, d)}
                    style={{width: 120, marginLeft: 10}}
                    options={options}
                    fieldid="kazi"
                />
            </div>
        );
    }
}

export default Demo15;
