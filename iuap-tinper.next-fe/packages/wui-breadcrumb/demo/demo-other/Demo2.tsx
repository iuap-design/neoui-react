/**
 * @title 图标
 * @description 使用Icon图标组件。
 */

import {Breadcrumb, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo2 extends Component {
    render() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
                    <Icon type="uf-home"/>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Icon type="uf-building-o"/>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <Icon type="uf-files-o"/>
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

export default Demo2;
