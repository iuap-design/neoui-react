/**
 *
 * @title 使用内置主题
 * @description 通过全局配置提供了除默认样式外的四种内置主题，开箱即用
 *
 */

import React, {Component} from 'react';
import {ConfigProvider, Radio, Switch, Row, Button, Steps, Checkbox } from "@tinper/next-ui";

const {Step} = Steps;


interface ProviderState {
	theme: string;
	theme2: string;
	current: number;
}

class Demo4 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            theme: 'default',
            theme2: 'default',
            current: 2,
        }
    }

	handleThemeChange = (value: string) => {
	    this.setState({
	        theme: value
	    })
	};

	handleThemeChange2 = (value: string) => {
	    this.setState({
	        theme2: value
	    })
	};

	stepsChange = (value: number) => {
	    this.setState({
	        current: value
	    })
	}

	render() {
	    const {theme, theme2} = this.state;
	    return (
	        <div className="demo1" tinper-next-role={'container'} style={{position: 'relative'}}>
	            <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
	                主题1：<Radio.Group
	                    style={{marginRight: 20}}
	                    selectedValue={theme}
	                    onChange={this.handleThemeChange}>
	                    <Radio.Button value={'default'}>默认</Radio.Button>
	                    <Radio.Button value={'red'}>红色</Radio.Button>
	                    <Radio.Button value={'blue'}>蓝色</Radio.Button>
	                    <Radio.Button value={'green'}>绿色</Radio.Button>
	                    <Radio.Button value={'yellow'}>黄色</Radio.Button>
	                </Radio.Group>
	            </div>

	            <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
					主题2：<Radio.Group
	                    style={{marginRight: 20}}
	                    selectedValue={theme2}
	                    onChange={this.handleThemeChange2}>
	                    <Radio.Button value={'default'}>默认</Radio.Button>
	                    <Radio.Button value={'red'}>红色</Radio.Button>
	                    <Radio.Button value={'blue'}>蓝色</Radio.Button>
	                    <Radio.Button value={'green'}>绿色</Radio.Button>
	                    <Radio.Button value={'yellow'}>黄色</Radio.Button>
	                </Radio.Group>
	            </div>

	            <ConfigProvider theme={theme} getThemeContainer={() => document.querySelector('#demo6-div-1')}>
	                <div id="demo6-div-1">
	                    <p>主题1：</p>
	                    <Row>
	                        <Button type={'primary'}>按钮</Button>
	                        <Button style={{marginLeft: 10}} type={'primary'} bordered>按钮</Button>
	                        <Switch style={{marginLeft: 10}} defaultChecked />
	                        <Checkbox style={{marginLeft: 10}} defaultChecked>primary</Checkbox>
	                        <Checkbox defaultChecked inverse>primary</Checkbox>
	                        <Radio style={{marginLeft: 10}} checked>primary</Radio>
	                        <Radio style={{marginLeft: 10}} checked inverse>primary</Radio>
	                    </Row>

	                    <Row>
	                        <Steps onChange={this.stepsChange} current={this.state.current} type='number'>
	                            <Step title="已完成已完成已完" description="这是一段描述啊啊"/>
	                            <Step title="进行中已完成已完成" description="这是一段描述啊啊啊啊"/>
	                            <Step title="未开始已完成已完成已完成" description="这是一段描述啊"/>
	                            <Step title="未开始" description="这是一段描述"/>
	                        </Steps>
	                    </Row>
	                    <p>主题2：</p>
	                    <ConfigProvider theme={theme2} getThemeContainer={() => document.querySelector('#demo6-div-2')}>
	                        <div id="demo6-div-2">
	                            <Row>
	                                <Button type={'primary'}>按钮</Button>
	                                <Button style={{marginLeft: 10}} type={'primary'} bordered>按钮</Button>
	                                <Switch style={{marginLeft: 10}} defaultChecked />
	                                <Checkbox style={{marginLeft: 10}} defaultChecked>primary</Checkbox>
	                                <Checkbox defaultChecked inverse>primary</Checkbox>
	                                <Radio style={{marginLeft: 10}} checked>primary</Radio>
	                                <Radio style={{marginLeft: 10}} checked inverse>primary</Radio>
	                            </Row>


	                            <Row>
	                                <Steps onChange={this.stepsChange} current={this.state.current} type='number'>
	                                    <Step title="已完成已完成已完" description="这是一段描述啊啊"/>
	                                    <Step title="进行中已完成已完成" description="这是一段描述啊啊啊啊"/>
	                                    <Step title="未开始已完成已完成已完成" description="这是一段描述啊"/>
	                                    <Step title="未开始" description="这是一段描述"/>
	                                </Steps>
	                            </Row>
	                        </div>
	                    </ConfigProvider>
	                </div>
	            </ConfigProvider>
	        </div>
	    )
	}
}

export default Demo4;
