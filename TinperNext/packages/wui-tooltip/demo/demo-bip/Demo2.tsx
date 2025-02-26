/**
 * @title 延时显示Tooltip
 * @description `delay`参数设置延时显示和隐藏，以下示例为 鼠标悬停两秒后显示
 */


import {Button, Tooltip} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo2 extends Component {
    render() {
        let tip = (
            <div>
				这是一个很强的提醒
            </div>
        )

        return (
            <div className="demo-tooltip">
                <Tooltip arrowPointAtCenter delay={2000} inverse overlay={tip}>
                    <Button colors="primary">
						延时显示
                    </Button>
                </Tooltip>
            </div>
        )
    }
}

export default Demo2;
