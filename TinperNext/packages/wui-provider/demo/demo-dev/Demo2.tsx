/**
 *
 * @title 使用自定义主题
 * @description registerTheme方法注册主题之后，通过theme属性使主题生效
 *
 */

import React, {Component} from 'react';
import {ConfigProvider, Radio, Switch, Row, Button, Steps, Checkbox } from "@tinper/next-ui";

const {Step} = Steps;

const brown = '{"global":[{"property":"--wui-primary-color","value":"rgb(109,76,65)"},{"property":"--wui-primary-color-hover","value":"rgb(93, 64, 55)"},{"property":"--wui-primary-color-active","value":"rgb(78, 52, 46)"},{"property":"--wui-primary-color-light","value":"rgba(109,76,65, .1)"}]}'
const pink = ":root{ --wui-primary-color-hover:rgba(255,205,210,100);--wui-primary-color-active:rgba(255,205,210,100);--wui-primary-color:rgba(255,205,210,100);}"

 interface ProviderState {
     theme: string;
     current: number;
 }

class Demo7 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            theme: 'pink',
            current: 2,
        }
        ConfigProvider.registerTheme('pink', pink)
        ConfigProvider.registerTheme('brown', brown)
    }

     handleThemeChange = (value: string) => {
         this.setState({
             theme: value
         })
     };

     stepsChange = (value: number) => {
         this.setState({
             current: value
         })
     }

     render() {
         const {theme} = this.state;
         return (
             <div className="demo1" tinper-next-role={'container'} style={{position: 'relative'}}>
                 <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                     <Radio.Group
                         style={{marginRight: 20}}
                         selectedValue={theme}
                         onChange={this.handleThemeChange}>
                         <Radio.Button value={'pink'}>粉色</Radio.Button>
                         <Radio.Button value={'brown'}>棕色</Radio.Button>
                     </Radio.Group>
                 </div>

                 <ConfigProvider theme={theme}>
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
	            </ConfigProvider>
             </div>
         )
     }
}

export default Demo7;
