/**
 *
 * @title 不同显示位置的消息提醒
 * @description 一个页面的message只能设置一种显示位置，我们一共提供六种位置选择（查看每种示例，都需刷新后再看）
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';

const positionList = ['top', 'bottom', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft']

const handleClick = function(position: any) {
    Message.destroy();
    Message.create({content: '审批单据提交成功，你可以在审批中心关注单据审批状态。', position, color: 'successlight'});
};

class Demo4 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                {
                    positionList.map(position =>
                        <Button
                            colors="secondary"
                            key={position}
                            onClick={() => handleClick(position)}
                        >
                            {position}
                        </Button>
                    )
                }
            </div>
        )
    }
}

export default Demo4;
