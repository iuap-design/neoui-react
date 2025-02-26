/**
 *
 * @title 不同size及多语
 * @description 不同尺寸的取色板
 *
 */
import {ColorPicker, ConfigProvider} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo0 extends Component<{}, {value: string}> {
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
            <ConfigProvider locale='en-us'>
                <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: 'repeat(1, minmax(200px, 1fr))'}}>
                    <ColorPicker
                        size='xs'
                        label='颜色'
                        placeholder='请输入十六进制色值'
                        value={this.state.value}
                        onChange={this.handleChange}
                        locale='vi-vn'
                    />
                    <ColorPicker
                        size='sm'
                        label='颜色'
                        placeholder='请输入十六进制色值'
                        value={this.state.value}
                        onChange={this.handleChange}
                        locale='zh-tw'
                    />
                    <ColorPicker
                        label='颜色'
                        placeholder='请输入十六进制色值'
                        value={this.state.value}
                        onChange={this.handleChange}
                        locale='zh'
                    />
                    <ColorPicker
                        size='nm'
                        label='颜色'
                        placeholder='请输入十六进制色值'
                        value={this.state.value}
                        onChange={this.handleChange}
                        locale='en'
                    />
                    <ColorPicker
                        size='lg'
                        label='颜色'
                        placeholder='请输入十六进制色值'
                        value={this.state.value}
                        onChange={this.handleChange}
                        locale='en-us'
                    />
                </div>
            </ConfigProvider>
        );
    }
}

export default Demo0;
