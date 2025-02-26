/**
 * @title 响应式尺寸
 * @description 头像大小可以根据屏幕大小自动调整
 */

import {Avatar, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo5 extends Component {
    render() {
        return (
            <Avatar
                size={{xs: 24, sm: 32, md: 40, lg: 64}}
                icon={<Icon type="uf-caven"/>}
            />
        )
    }
}

export default Demo5;
