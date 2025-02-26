/**
 *
 * @title 自定义空数据展示
 * @description 可使用emptyText自定义空数据展示内容
 *
 */

import { Empty, List } from '@tinper/next-ui';
import React, { Component } from 'react';


class Demo extends Component {

    render() {
        return (
            <>
                <List />
                <List emptyText={<Empty description={"自定义空数据展示内容"} />} />
            </>
        )
    }
}

export default Demo;
