/**
 *
 * @title 垂直间距
 * @description 相邻组件垂直间距。
 *
 */
import {Button, Radio, Space} from '@tinper/next-ui';
import React, {useState} from 'react';

function SpaceVertical() {
    const [direction, setDirection] = useState('vertical');
    return (
        <>
            <Radio.Group
                defaultValue={'vertical'}
                value={direction}
                onChange={(e: string) => setDirection(e)}
            >
                <Radio value="vertical">vertical</Radio>
                <Radio value="horizontal">horizontal</Radio>
            </Radio.Group>
            <br/>
            <br/>
            <Space direction={direction}>
                <Button>按钮1</Button>
                <Button>按钮2</Button>
                <Button>按钮3</Button>
                <Button>按钮4</Button>
            </Space>
        </>
    );
}

export default SpaceVertical;
