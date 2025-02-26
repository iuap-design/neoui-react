/**
 *
 * @title 动态增减嵌套字段
 * @description 嵌套表单字段需要对 field 进行拓展，将 field.name 应用于控制字段。
 */
import React from 'react'
import { Button, Form, Input, Space, Icon, Select } from '@tinper/next-ui';
const { Option } = Select;
const sights = ['tianjinfan', 'Great Wall'];
const App = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    const onSelect = (v: string) => {
        console.log(v);
    }

    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="users">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                                key={key}
                                style={{
                                    display: 'flex',
                                    marginBottom: 8,
                                }}
                                align="baseline"
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'first']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing first name',
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{
                                            width: 130,
                                        }}
                                        onSelect={onSelect}
                                    >
                                        {sights.map((item) => (
                                            <Option key={item} value={item}>
                                                {item}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'last']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing last name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Last Name" />
                                </Form.Item>
                                <Icon type="uf-reduce-c-o" onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<Icon type="uf-plus" />}>
                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
          Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default App;