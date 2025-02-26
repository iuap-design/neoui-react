/**
 * @title 下划线模式
 * @description 设置bordered='bottom'
 */

import {ColorPicker} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo9 extends Component<{}, {value: string}> {
    state = {
        value: '#E14C46'
    };

    handleChange = (v: {class: string; rgba: string; hex: string}) => {
        console.log('选择的色彩信息 ：', v);
        this.setState({
            value: v.hex || ''
        });
    };

    render() {
        return (
            <>
                <ColorPicker
                    bordered={false}
                    align='center'
                    placeholder='无边框'
                    value={this.state.value}
                    onChange={this.handleChange}
                    label='颜色'
                    required={true}
                    disabledAlpha={true}
                />
                <ColorPicker
                    bordered='bottom'
                    placeholder='请输入十六进制色值'
                    value={this.state.value}
                    onChange={this.handleChange}
                    label='颜色'
                    required={true}
                    disabledAlpha={true}
                />
            </>
        );
    }
}

export default Demo9;
