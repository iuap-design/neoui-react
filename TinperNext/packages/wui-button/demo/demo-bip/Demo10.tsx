/**
 *
 * @title 图标按钮
 * @description 当需要在 Button 内嵌入图标时，可以在 Button 内使用 Icon 组件。
 * @type bip
 */

import {Button, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo extends Component {

    render() {
        return (
            <div className="demo3 demoPadding">
                <Button type="primary" icon={<Icon type="uf-plus"/>}>新增</Button>
                <Button type="primary" icon={<Icon type="uf-save" />}>新增<Icon style={{marginLeft: 5}} type="uf-anglearrowdown" /></Button>
                <Button icon={<Icon type="uf-print" />}>打印<Icon style={{marginLeft: 5}} type="uf-anglearrowdown" /></Button>
                <Button type="plainText" icon={<Icon type="uf-print" />}>打印<Icon style={{marginLeft: 5}} type="uf-anglearrowdown" /></Button>
            </div>
        )
    }
}

export default Demo;
