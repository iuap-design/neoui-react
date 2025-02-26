/**
 * @title 操作项
 * @description 可以在右上角自定义操作项。
 * @type other
 */

import React from 'react';
import { Alert, Button, Space } from '@tinper/next-ui';

const Demo5: React.FC = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
            message="Success Tips"
            type="success"
            showIcon
            action={
                <Button size="small" type="text">
           UNDO
                </Button>
            }
            closable
        />
        <Alert
            message="Error Text"
            showIcon
            description="Error Description Error Description Error Description Error Description"
            type="danger"
            action={
                <Button size="small" danger>
           Detail
                </Button>
            }
        />
        <Alert
            message="Warning Text"
            type="warning"
            action={
                <Space>
                    <Button size="small" colors="warning" type="ghost">
             Done
                    </Button>
                </Space>
            }
            closable
        />
        <Alert
            message="Info Text"
            showIcon
            description="Info Description Info Description Info Description Info Description"
            type="info"
            action={
                <Space direction="vertical">
                    <Button size="small" type="primary">
             Accept
                    </Button>
                    <Button size="small" danger type="ghost">
             Decline
                    </Button>
                </Space>
            }
            closable
        />
    </Space>
);

export default Demo5;

