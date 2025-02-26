/**
 *
 * @title 内部卡片布局
 * @description 放在普通卡片内部，展示多层级结构的信息
 *
 */

import {Card} from "@tinper/next-ui";
import React, {Component} from 'react';


class Demo5 extends Component {

    render() {
        return (
            <Card title="外部卡片">
                <Card type="inner" title="标题1" extra={<a>更多</a>}>
					Inner Card content
                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="标题2"
                    extra={<a>更多</a>}
                >
					Inner Card content
                </Card>
            </Card>
        )
    }
}


export default Demo5;
