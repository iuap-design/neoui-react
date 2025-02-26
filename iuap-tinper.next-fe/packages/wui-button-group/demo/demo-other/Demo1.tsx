/**
 *
 * @title 默认按钮组
 * @description 基础按钮组
 *
 */

import {Button, ButtonGroup, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo1 extends Component {
    render() {
        return (
            <div>
                <ButtonGroup style={{margin: 10}}>
                    <Button isText shape='border'>按钮1</Button>
                    <Button shape='border'>按钮2</Button>
                    <Button shape='border'>按钮3</Button>
                    <Button shape='border'>按钮4</Button>
                </ButtonGroup>
                <ButtonGroup separated style={{margin: 10}}>
                    <Button colors="primary">新增</Button>
                    <Button colors="primary">修改</Button>
                    <Button colors="primary">删除</Button>
                </ButtonGroup>
                <ButtonGroup style={{margin: 10}}>
                    <Button colors="primary"><Icon type='uf-navmenu'/></Button>
                    <Button colors="primary"><Icon type='uf-file'/></Button>
                    <Button colors="primary"><Icon type='uf-pencil'/></Button>
                    <Button colors="primary"><Icon type='uf-del'/></Button>
                </ButtonGroup>
                <br/>
                <br/>
                <ButtonGroup style={{margin: 10}}>
                    <Button>新增</Button>
                    <Button>修改</Button>
                    <Button>删除</Button>
                </ButtonGroup>
            </div>

        )
    }
}

export default Demo1;
