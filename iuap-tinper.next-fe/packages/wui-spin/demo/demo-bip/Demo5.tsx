/**
 *
 * @title 不同尺寸的Spin
 * @description 通过设置`size`属性，来控制Spin图标的大小
 * @type bip
 */

import {Spin} from '@tinper/next-ui';
import React, {Component} from 'react';

interface SpinState {
	show: boolean;
}
class Demo5 extends Component<{}, SpinState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            show: true
        }
    }


    render() {
        return (
            <div className="demo5">
                <Spin size="sm" getPopupContainer={this} spinning={this.state.show} loadingType="rotate"/>
                <Spin getPopupContainer={this} spinning={this.state.show} loadingType="rotate"/>
                <Spin size="lg" getPopupContainer={this} spinning={this.state.show} loadingType="rotate"/>
            </div>
        )
    }
}


export default Demo5;
