/**
 *
 * @title 只读
 * @description 只读，无法进行鼠标交互。
 *
 */

import {Rate} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo5 extends Component {
    render() {
        return (
            <Rate defaultValue={4} disabled/>
        )
    }
}

export default Demo5;
