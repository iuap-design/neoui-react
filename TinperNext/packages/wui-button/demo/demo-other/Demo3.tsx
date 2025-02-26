/**
 *
 * @title 图标按钮
 * @description 当需要在 Button 内嵌入图标时，可以在 Button 内使用 Icon 组件。
 *
 */

import {Button, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo3 extends Component {

    render() {
        return (
            <div className="demo3 demoPadding">
                <Button colors="primary" icon={<Icon type='uf-pencil'/>}></Button>
                <Button colors="primary" icon={<Icon type='uf-del'/>}></Button>
                <Button colors="primary" icon={<Icon type='uf-search'/>}></Button>
                <Button colors="primary" icon={<Icon type="uf-plus"/>}>新增</Button>
                <Button colors="primary">Upload<Icon type='uf-cloud-up' className={"el-icon--right"}/></Button>
            </div>
        )
    }
}

export default Demo3;
