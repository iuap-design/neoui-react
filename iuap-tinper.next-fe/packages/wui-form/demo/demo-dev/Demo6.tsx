/**
 *
 * @title 表单hidden属性
 * @description 验证hidden属性
 */
import { Form, Input, Button, Space } from "@tinper/next-ui";
import React from "react";

const Demo6 = () => {
    const [hidden, setHidden] = React.useState<boolean|'visible'|'destroy'>(false);
    const [itemHidden, setItemHidden] = React.useState<boolean|'visible'|'destroy'>(false);
    const [form] = Form.useForm();
    return (
        <>
            <Space style={{
                marginBottom: 10
            }}>
                <Button onClick={()=>setHidden(true)} >设置表单半隐藏</Button>
                <Button onClick={()=>setHidden('destroy')} >设置表单全隐藏</Button>
                <Button onClick={()=>setHidden('visible')} >设置表单visible</Button>
                <Button onClick={()=>setHidden(false)} >设置表单false</Button>
                <Button onClick={()=>{
                    console.log(form.getFieldsValue());
                    form.validateFields().then(
                        (values: any) => {
                            console.log('validateFields---values ', values)
                        },
                        (err: any) => {
                            console.log('validateFields---errors ', err)
                        });
                }} >表单校验</Button>
                <Button onClick={()=>form.resetFields()} >表单重置</Button>
            </Space>
            <Space style={{
                marginBottom: 10
            }}>
                <Button onClick={()=>setItemHidden(true)} >设置表单项半隐藏</Button>
                <Button onClick={()=>setItemHidden('destroy')} >设置表单项全隐藏</Button>
                <Button onClick={()=>setItemHidden('visible')} >设置表单项visible</Button>
                <Button onClick={()=>setItemHidden(false)} >设置表单项false</Button>
            </Space>
            <Form hidden={hidden} labelCol={{span: 4}} wrapperCol={{span: 8}} form={form}>
                <Form.Item label="姓名" name="name" rules={[{required: true}]} hidden={itemHidden}>
                    <Input />
                </Form.Item>
                <Form.Item label="年龄" name="age" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
            </Form>
        </>

    )
};

export default Demo6;
