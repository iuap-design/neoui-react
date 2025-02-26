/**
 *
 * @title 使用内置主题
 * @description 通过全局配置提供了除默认样式外的四种内置主题，开箱即用
 *
 */

import React, {Component} from 'react';
import {ConfigProvider, Radio, Switch, Row, Button, Steps, Checkbox, Input} from "@tinper/next-ui";

const {Step} = Steps;


 interface ProviderState {
     theme: string;
     current: number;
     dark: boolean;
 }

class Demo4 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            theme: 'default',
            current: 2,
            dark: false
        }
    }

     handleThemeChange = (theme: string) => {
         this.setState({
             theme
         })
     };

     change = (dark: boolean) => {
         this.setState({
             dark
         })
     }

     stepsChange = (current: number) => {
         this.setState({
             current
         })
     }

     render() {
         const {theme, dark} = this.state;
         let componentTheme: string | string[] = theme;
         if (dark) {
             componentTheme = ['dark', theme]
         }
         return (
             <>
                 <div style={{marginBottom: 20}}>
                     <div style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
                        暗色：<Switch defaultValue={dark} onChange={this.change} />
                     </div>
                     <Radio.Group
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
                 <div className="demo1" id="built-in-config" tinper-next-role={'container'} style={{position: 'relative', padding: 20}}>
                     <ConfigProvider theme={componentTheme} getThemeContainer={() => document.querySelector('#built-in-config')}>
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
                             <Input style={{width: 300}} placeholder={' Please enter content...'} />
                         </Row>


                         <Row>
                             <Steps onChange={this.stepsChange} current={this.state.current} type='number'>
                                 <Step title="已完成已完成已完" description="这是一段描述啊啊"/>
                                 <Step title="进行中已完成已完成" description="这是一段描述啊啊啊啊"/>
                                 <Step title="未开始已完成已完成已完成" description="这是一段描述啊"/>
                                 <Step title="未开始" description="这是一段描述"/>
                             </Steps>
                         </Row>
                     </ConfigProvider>
                 </div>
             </>
         )
     }
}

export default Demo4;
