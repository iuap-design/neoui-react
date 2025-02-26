/**
 *
 * @title 基础按钮
 * @description 基础的按钮用法。
 *
 */

import {Button, Icon} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo1 extends Component {

    open() {
        alert("onClick");
    }

    render() {
        return (
            <div className="demoPadding">
                <Button>默认按钮</Button>
                <Button colors="primary" onClick={this.open}>主要按钮</Button>
                <Button colors="success">成功按钮</Button>
                <Button colors="info">信息按钮</Button>
                <Button colors="warning">警告按钮</Button>
                <Button colors="danger">危险按钮</Button>
                <Button colors="secondary">次按钮</Button>
                <Button colors="dark">页面次按钮</Button>
                <br/>
                <br/>
                <Button bordered>默认按钮</Button>
                <Button bordered colors="primary" onClick={this.open}>主要按钮</Button>
                <Button bordered colors="success">成功按钮</Button>
                <Button bordered colors="info">信息按钮</Button>
                <Button bordered colors="warning">警告按钮</Button>
                <Button bordered colors="danger">危险按钮</Button>
                <br/>
                <br/>
                <Button shape={"icon"} icon={<Icon type="uf-search"/>}/>
                <Button shape={"icon"} icon={<Icon type="uf-pencil"/>} colors="primary"/>
                <Button shape={"icon"} icon={<Icon type="uf-correct-2"/>} colors="success"/>
                <Button shape={"icon"} icon={<Icon type="uf-xiaoxi"/>} colors="info"/>
                <Button shape={"icon"} icon={<Icon type="uf-exc-t"/>} colors="warning"/>
                <Button shape={"icon"} icon={<Icon type="uf-del"/>} colors="danger"/>
                <Button shape={"icon"} icon={<Icon type="uf-repeat"/>} colors="dark"/>
            </div>
        )
    }
}

export default Demo1;
