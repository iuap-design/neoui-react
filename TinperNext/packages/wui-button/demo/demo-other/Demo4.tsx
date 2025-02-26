/**
 *
 * @title 按钮尺寸
 * @description 按钮有小、中、大三种尺寸。通过设置 size 为 sm、md、lg 分别把按钮设为小、中、大尺寸。若不设置 size，则尺寸为大。
 *
 */

import {Button} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo4 extends Component {

    render() {
        return (
            <div className="demoPadding">
                <Button size="sm" colors="primary">按钮</Button>
                <Button size="md" colors="primary">按钮</Button>
                <Button colors="primary">默认</Button>
                <br/>
                <br/>
                <Button size="sm" colors="primary" icon='uf-search'>小按钮</Button>
                <Button size="md" colors="primary" icon='uf-search'>中按钮</Button>
                <Button colors="primary" icon='uf-search'>默认</Button>
                <br/>
                <br/>
                <Button size="sm" colors="primary" icon='uf-search' loading>小按钮</Button>
                <Button size="md" colors="primary" icon='uf-search' loading>中按钮</Button>
                <Button colors="primary" icon='uf-search' loading>默认</Button>
                <br/>
                <br/>
                <Button colors="dark" size="sm" icon='uf-del'/>
                <Button colors="dark" size="md" icon='uf-del'/>
                <Button colors="dark" icon='uf-del'/>
            </div>
        )
    }
}

export default Demo4;
