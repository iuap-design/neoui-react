/**
 *
 * @title 基本form校验
 * @description 登录示例
 */
import {Button, DatePicker, Form, Input, InputNumber, Cascader} from '@tinper/next-ui';
import moment from 'moment';
import React, {Component} from 'react';

const {RangePicker} = DatePicker;

const options = [
    {
        label: '基础组件',
        value: 'jczj',
        children: [
            {
                label: '导航',
                value: 'dh',
                children: [
                    {
                        label: '面包屑',
                        value: 'mbx'
                    },
                    {
                        label: '分页',
                        value: 'fy'
                    },
                    {
                        label: '标签',
                        value: 'bq'
                    },
                    {
                        label: '菜单',
                        value: 'cd'
                    }
                ]
            },
            {
                label: '反馈',
                value: 'fk',
                children: [
                    {
                        label: '模态框',
                        value: 'mtk'
                    },
                    {
                        label: '通知',
                        value: 'tz'
                    }
                ]
            },
            {
                label: '表单',
                value: 'bd'
            }
        ]
    },
    {
        label: '应用组件',
        value: 'yyzj',
        children: [
            {
                label: '参照',
                value: 'ref',
                children: [
                    {
                        label: '树参照',
                        value: 'reftree'
                    },
                    {
                        label: '表参照',
                        value: 'reftable'
                    },
                    {
                        label: '穿梭参照',
                        value: 'reftransfer'
                    }
                ]
            }
        ]
    }
];

const defaultOptions = ['jczj', 'dh', 'cd'];

const Demo2 = Form.createForm()(
    class Demo2 extends Component {
        form: React.RefObject<any>;

        constructor(props: {}) {
            super(props);
            this.form = React.createRef();
        }

        handleSubmit = () => {
            this.form.current.validateFields(['username', 'city', 'demo2-email', 'inputNumber']).then((values: any) => {
                console.log('validateFields--- ', values);
            });
            console.log('getFieldsValue--- ', this.form.current.getFieldsValue());
        };

        render() {
            const layout = {
                labelCol: {span: 4},
                wrapperCol: {span: 12}
            };
            return (
                <div className='demo2'>
                    <Form
                        ref={this.form}
                        {...layout}
                        initialValues={{username: '小花狗不见了', prefix: '猜猜我是谁', 'demo2-date': '2022-08-11'}}
                    >
                        <Form.Item label='用户名' name='username'>
                            <Input placeholder='请输入用户名' readOnly />
                        </Form.Item>
                        <Form.Item
                            label='所属城市'
                            name='city'
                            required
                            rules={[
                                {
                                    required: true,
                                    message: <span>所属城市不能为空</span>
                                }
                            ]}
                        >
                            <Cascader
                                defaultValue={defaultOptions}
                                options={options}
                                placeholder='请选择'
                                separator=' > '
                                // multiple
                            />
                        </Form.Item>

                        <Form.Item
                            label='幸运数字'
                            name='inputNumber'
                            rules={[
                                {
                                    required: true,
                                    message: <span>幸运数字不能为空</span>
                                }
                            ]}
                        >
                            <InputNumber placeholder='请输入幸运数字' />
                        </Form.Item>

                        <Form.Item label='邮箱' name='demo2-email'>
                            <Input placeholder='请输入邮箱' type='email' />
                        </Form.Item>

                        <Form.Item
                            label='密码'
                            name='demo2-password'
                            rules={[
                                {
                                    required: true,
                                    message: <span>请输入密码</span>
                                }
                            ]}
                        >
                            <Input placeholder='请输入密码' type='password' />
                        </Form.Item>
                        <Form.Item
                            label='密码'
                            name='prefix'
                            rules={[
                                {
                                    required: true,
                                    message: <span>请输入内容</span>
                                }
                            ]}
                        >
                            <Input className='demo2-input' disabled prefix='前缀' suffix='后缀' />
                        </Form.Item>

                        <Form.Item
                            label='日期'
                            name='demo2-date'
                            rules={[
                                {
                                    required: true,
                                    message: <span>请输入日期</span>
                                }
                            ]}
                        >
                            <DatePicker placeholder='请输入日期' disabled />
                        </Form.Item>

                        <Form.Item
                            name='range'
                            label='日期范围'
                            rules={[{required: true, message: '不允许为空'}]}
                            getValueFromEvent={(...args) => {
                                console.log(' args ----------', args);
                                return args[2];
                            }}
                            getValueProps={value => {
                                return value && value[0] && value[1]
                                    ? {value: [moment(value[0]), moment(value[1])]}
                                    : {value: undefined};
                            }}
                        >
                            <RangePicker allowClear placeholder={['放假日期', '开学日期']} />
                        </Form.Item>

                        <Form.Item label=' '>
                            <Button colors='secondary' style={{marginRight: '8px'}}>
                                取消
                            </Button>
                            <Button colors='primary' style={{marginRight: '8px'}} htmlType='submit'>
                                html提交
                            </Button>
                            <Button colors='primary' onClick={this.handleSubmit}>
                                click提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            );
        }
    }
);
export default Demo2;
