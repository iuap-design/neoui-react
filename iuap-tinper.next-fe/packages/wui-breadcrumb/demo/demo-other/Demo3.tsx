/**
 * @title 图标加文字
 * @description 图标放在文字前面。
 */

import {Breadcrumb, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo3 extends Component {
    render() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
                    <Icon type="uf-home"></Icon>
                    <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
                    <Icon type="uf-building-o"/>
                    <span>Library</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <Icon type="uf-files-o"/>
                    <span>Data</span>
                </Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}

export default Demo3;
