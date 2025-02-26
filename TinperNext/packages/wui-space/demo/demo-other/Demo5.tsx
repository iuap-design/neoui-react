/**
 *
 * @title 间距大小
 * @description 间距预设大、中、小三种大小
 *
 */
import {Button, Radio, Space} from '@tinper/next-ui';
import React, {useState} from 'react';

function SpaceSize() {
    const [size, setSize] = useState('small');

    return (
        <>
            <Radio.Group
                defaultValue={'small'}
                value={size}
                onChange={(e: string) => setSize(e)}
            >
                <Radio value="small">Small</Radio>
                <Radio value="middle">Middle</Radio>
                <Radio value="large">Large</Radio>
            </Radio.Group>
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

export default SpaceSize
