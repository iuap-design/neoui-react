/**
 *
 * @title 基础空状态
 * @description 空状态时的展示占位图。
 *
 */

import {Empty} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo1 extends Component {
    render() {
        return (
            <div style={{display: 'flex'}}>
                <Empty fieldid='demo_1' />
                <Empty image="not-found" fieldid='demo_1' />
                <Empty image="no-visualize-data" fieldid='demo_1' />
                <Empty image="no-collect" fieldid='demo_1' />
                <Empty image="no-data" fieldid='demo_1' />
                <Empty image="no-search" fieldid='demo_1' />
                <Empty image="no-network" fieldid='demo_1' />
            </div>
        )
    }
}

export default Demo1;
