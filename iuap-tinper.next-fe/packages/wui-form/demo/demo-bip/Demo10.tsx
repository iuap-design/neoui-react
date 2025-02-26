/**
 *
 * @title 动态增减表单项
 * @description 动态增加、减少表单项。add 方法参数可用于设置初始值。
 */
import { Button, Form, Input, Icon } from '@tinper/next-ui';
import React from 'react'
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};

const App = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
            <Form.List
                name="names"
                rules={[
                    {
                        validator: async(_, names) => {
                            if (!names || names.length < 2) {
                                return Promise.reject(new Error('At least 2 passengers'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Passengers' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input passenger's name or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder="passenger name"
                                        style={{
                                            width: '60%',
                                        }}
                                    />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <Icon
                                        type="uf-reduce-c-o"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{
                                    width: '60%',
                                }}
                                icon={<Icon type="uf-plus" />}
                            >
                Add field
                            </Button>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add('The head item', 0);
                                }}
                                style={{
                                    width: '60%',
                                    marginTop: '20px',
                                }}
                                icon={<Icon type="uf-plus" />}
                            >
                Add field at head
                            </Button>
                            <Form.ErrorList errors={errors} />
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