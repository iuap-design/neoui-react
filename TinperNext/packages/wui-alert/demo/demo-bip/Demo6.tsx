/**
 * @title 自定义icon
 * @description 配置自定义 icon
 * @type other
 */

import React from 'react';
import { Alert, Button, Icon, Space } from '@tinper/next-ui';

const Demo6: React.FC = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
            message="自定义图标"
            type="success"
            showIcon
            icon={
                <Icon type="uf-hanshu" />
            }
            action={
                <Button size="small" type="text">
            UNDO
                </Button>
            }
            closable
        />
        <Alert
            message="自定义图标"
            showIcon
            icon={
                <Icon type="uf-hanshu" />
            }
            description="左侧图标为自定义图标"
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

export default Demo6;

