/**
 *
 * @title split
 * @description 自定义间隔符号。
 *
 */
import {Button, Space} from '@tinper/next-ui';
import React from 'react';

function SpaceCustomizeSize() {
    return (
        <Space split={'-'}>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="link">Link</Button>
        </Space>
    );
}

export default SpaceCustomizeSize
