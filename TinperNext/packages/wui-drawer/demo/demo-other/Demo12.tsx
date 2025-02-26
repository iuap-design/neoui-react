/**
 *
 * @title Drawer fieldid示例
 * @description fieldid示例
 *
 */

import {Button, DatePicker, Drawer, Form, Input, DrawerProps} from '@tinper/next-ui';
import React, {Component} from 'react';

 interface DrawerState12 {
    placement: string;
    showDrawer: boolean;
    title: string;
    overflow: string;
}

class Demo12 extends Component<{form: any}, DrawerState12> {
    constructor(props: {form: any}) {
        super(props);
        this.state = {
            placement: 'right',
            showDrawer: false,
            title: '表单',
            overflow: 'auto'
        };
        this.fPopDrawer = this.fPopDrawer.bind(this);
        this.fCloseDrawer = this.fCloseDrawer.bind(this);
    }

    fPopDrawer() {
        this.setState({
            showDrawer: true,
            overflow: 'auto'
        })
        document.body.style.overflow = 'hidden'
    }

    fCloseDrawer() {
        this.setState({
            showDrawer: false,
            overflow: 'hidden'
        })
        document.body.style.overflow = 'auto'
    }

     submit = (e: React.MouseEvent) => {
         e.preventDefault();
         this.props.form.validateFields((err: any, values: any) => {
             if (err) {
                 console.log('校验失败', values);
             } else {
                 console.log('提交成功', values)
             }
         });
     }

     render() {
         let {placement, showDrawer, title} = this.state;
         //  const {getFieldProps, getFieldError} = this.props.form;
         const layout = {
             labelCol: {span: 6},
             wrapperCol: {span: 16}
         }
         let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.container') // 为了示例中drawer覆盖区域在导航栏下面
         return (
             <div className="demoPadding">
                 <div className="btnc">
                     <Button colors="primary" onClick={this.fPopDrawer}>打开</Button>
                 </div>
                 <Drawer style={{position: 'fixed'}} getPopupContainer={container as DrawerProps['container']} zIndex={1000} mask={true}
                     className='demo3' title={title} visible={showDrawer} placement={placement}
                     onClose={this.fCloseDrawer} closable={true} fieldid={'drawer'} width={400}>
                     <Form {...layout}>
                         <Form.Item
                             label="用户名"
                             name="username"
                             rules={[
                                 {
                                     required: true,
                                     message: (
                                         <div>
                                             <span>请输入用户名</span>
                                         </div>
                                     )
                                 }
                             ]}
                         >
                             <Input placeholder="请输入用户名"/>
                         </Form.Item>
                         <Form.Item
                             label="密码"
                             name="password"
                             rules={[
                                 {
                                     required: true,
                                     message: (
                                         <div>
                                             <span>请输入密码</span>
                                         </div>
                                     )
                                 }
                             ]}
                         >
                             <Input placeholder="请输入密码" type="password"/>
                         </Form.Item>
                         <Form.Item label="密码"
                             name="prefix"
                             rules={[
                                 {
                                     required: true,
                                     message: (
                                         <div>
                                             <span>请输入内容</span>
                                         </div>
                                     )
                                 }
                             ]}>
                             <Input
                                 className="demo9-input"
                                 prefix='前缀'
                                 suffix='后缀'
                             />
                         </Form.Item>
                         <Form.Item
                             label="日期"
                             name="date"
                             rules={[
                                 {
                                     required: true,
                                     message: (
                                         <div>
                                             <span>请输入日期</span>
                                         </div>
                                     )
                                 }
                             ]}>
                             <DatePicker/>
                         </Form.Item>
                         <Form.Item style={{paddingLeft: "72px"}}>
                             <Button colors="secondary" style={{marginRight: "8px"}}>
                                 取消
                             </Button>
                             <Button colors="primary" htmlType="submit" className="login">
                                 登录
                             </Button>
                         </Form.Item>
                     </Form>
                 </Drawer>
             </div>
         )
     }
}

export default Form.createForm()(Demo12);
