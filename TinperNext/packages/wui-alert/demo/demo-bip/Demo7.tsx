/**
 * @title 带边框的alert
 * @description 带边框的alert
 * @type other
 */

import React from 'react';
import { Alert } from '@tinper/next-ui';

const Demo7: React.FC = () => (
    <Alert
        message="带边框的alert"
        type="success"
        bordered
        showIcon
        closable
    />
);

export default Demo7;

