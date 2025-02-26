/**
 *
 * @title resizable属性用法
 * @description resizable属性为true的时候，可以通过拖拽边角调整下拉框大小。默认范围是window，也可以通过getPopupContainer指定父级容器，作为拖拽范围
 *
 */
import { Select } from '@tinper/next-ui';
import React, { Component } from 'react';

const Option = Select.Option;
const longTitle = 'this is a very long option---this is a very long option----this is a very long option---'

let ComponentChildren = Array.from({length: 500}, (_v, i) =>(<Option key={i + 1}>{i + 1 + longTitle }</Option>));

class Demo21 extends Component {
    getPopupContainer = () =>{
        return document.getElementById('myContainer')!
    }

    render() {
        return (
            <div id='myContainer' style={{ height: 400, background: '#ccc', width: 900}}>
                <Select
                    resizable
                    showSearch
                    style={{ width: 300 }}
                    placeholder="下拉框位置对齐bottomLeft时,请拖动右下角"
                    allowClear
                    virtual={true}
                    placement={'bottomLeft'}
                    getPopupContainer={this.getPopupContainer}
                >
                    {ComponentChildren}
                </Select>
                <Select
                    resizable="vertical"
                    showSearch
                    style={{ width: 300, marginLeft: 200}}
                    placeholder="仅支持纵向拖拽"
                    allowClear
                    virtual={true}
                    placement={'bottomRight'}
                    getPopupContainer={this.getPopupContainer}
                >
                    {ComponentChildren}
                </Select>
                <div style={{ height: 300 }}></div>
                <Select
                    resizable="horizontal"
                    showSearch
                    style={{ width: 300 }}
                    placeholder="仅支持横向拖拽"
                    allowClear
                    virtual={true}
                    placement={'topLeft'}
                    getPopupContainer={this.getPopupContainer}
                >
                    {ComponentChildren}
                </Select>
                <Select
                    resizable
                    showSearch
                    style={{ width: 300, marginLeft: 200}}
                    placeholder="下拉框位置对齐topRight时,请拖动左上角"
                    allowClear
                    virtual={true}
                    placement={'topRight'}
                    getPopupContainer={this.getPopupContainer}
                >
                    {ComponentChildren}
                </Select>
            </div>)
    }
}

export default Demo21