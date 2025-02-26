/**
 *
 * @title 错误警告
 * @description 一般只展示警告信息的提示和状态码，没有详细的内容和footer
 */

import React from 'react';
import { Button, ErrorMessage } from '@tinper/next-ui';

const Demo3 = () => {
    const onClick = () => {
        ErrorMessage.destroy();
        ErrorMessage.create({
            message: '因参数不合法导致查询失败,请检查参数查询条件是否填写完整',
            level: 1
        });
    }
    return (
        <div className="paddingDemo">
            <Button shape="border" onClick={onClick}>消息</Button>
        </div>
    )
}

export default Demo3;