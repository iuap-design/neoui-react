/**
 * @title 自定义 关闭按钮
 * @description 配置自定义 关闭按钮
 * @type other
 */

import React from 'react';
import { Alert, Icon, Space } from '@tinper/next-ui';

const Demo8: React.FC = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
            message="自定义图标"
            type="success"
            showIcon
            closeIcon={
                <Icon type="uf-hanshu" />
            }
            closable
        />
        <Alert
            message="自定义图标"
            showIcon
            closeText={
                <Icon type="uf-quanshan" />
            }
            closable
        />
    </Space>
);

export default Demo8;

