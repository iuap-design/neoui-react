/**
 *
 * @title 自定义尺寸
 * @description 自定义间距大小。
 *
 */
import {Button, Slider, Space} from '@tinper/next-ui';
import React, {useState} from 'react';

function SpaceCustomizeSize() {

    const [size, setSize] = useState(8);

    return (
        <>
            <Slider value={size} onChange={(value: number) => setSize(value)}/>
            <br/>
            <br/>
            <Space size={size}>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="link">Link</Button>
            </Space>
        </>
    );
}

export default SpaceCustomizeSize
