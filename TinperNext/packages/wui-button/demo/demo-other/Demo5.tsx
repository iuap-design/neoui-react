/**
 *
 * @title 不同样式、形态的按钮
 * @description
 * @type other
 * demo5
 */

import {Button} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo5 extends Component {

    render() {
        return (
            <div className="demoPadding">
                <Button shape="icon" icon='uf-search' colors="info"/>
                <Button shape="round" colors="info">round</Button>
                <Button shape="squared" colors="info">squared</Button>
                <Button shape="pillRight" colors="info">pillRight</Button>
                <Button shape="pillLeft" colors="info">pillLeft</Button>
                <div className="divider"></div>
                <Button colors="primary" disabled>新增</Button>
                <Button colors="dark" disabled>保存并新增</Button>
                <Button shape="border" disabled>取消</Button>
                <Button type="text" disabled>打印</Button>
                <Button type="text" disabled>text</Button>
                <Button type="link" disabled>link</Button>
                <div className="divider"></div>
                <span style={{backgroundColor: '#ddd', padding: 2, display: 'inline-block'}}>
                    <Button colors="success" ghost>ghost</Button>
                    <Button type="default" ghost>ghost</Button>
                    <Button type="dashed" ghost>ghost</Button>
                </span>
                <Button type="dashed">dashed</Button>
                <Button type="default">default</Button>
                <Button type="text">text</Button>
                <Button type="link">link</Button>
                <div className="divider"></div>
                <Button shape="block" colors="dark" icon='uf-search'>dark</Button>
                <div className="divider"></div>
                <Button colors="dark" icon='uf-search' block bordered>dark</Button>
                <div className="divider"></div>
                <Button colors="dark" icon='uf-search' loading block>dark</Button>
            </div>
        )
    }
}

export default Demo5;
