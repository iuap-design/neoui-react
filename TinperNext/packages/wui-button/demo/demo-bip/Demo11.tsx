/**
 *
 * @title 按钮尺寸
 * @description 按钮有小、中、大三种尺寸。通过设置 size 为 sm、md、lg 分别把按钮设为小、中、大尺寸。若不设置 size，则尺寸为大。
 * @type bip
 */

import {Button} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo extends Component {

    render() {
        return (
            <div className="demoPadding">
                <Button size="sm" colors="primary">小按钮</Button>
                <Button size="md" colors="primary">中按钮</Button>
                <Button colors="primary">默认</Button>
                <br/>
                <br/>
                <Button size="sm" colors="primary" icon='uf-plus'>小按钮</Button>
                <Button size="md" colors="primary" icon='uf-plus'>中按钮</Button>
                <Button colors="primary" icon='uf-plus'>默认</Button>
            </div>
        )
    }
}

export default Demo;
