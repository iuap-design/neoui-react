import React from 'react';
import {Form, Button, Input, Modal, Upload, Icon, Rate, DatePicker, TimePicker, Select, InputNumber, Radio, Checkbox, Switch, Slider} from '../../../../packages/index';
import {prefix} from "../../../../packages/wui-core/src/index"
import type {FormLayout, ValidateStatus, FormLabelAlign} from '../../../../packages/wui-form/src/iForm'

Cypress.config({
  viewportWidth: 600,
  viewportHeight: 600,
}) 

const {useState} = React;
const {Option} = Select;
const {RangePicker} = DatePicker;

const layoutArr: Array<FormLayout> = ['horizontal', 'inline', 'vertical'];
const validateStatusArr: Array<ValidateStatus> = ['success', 'warning', 'error', 'validating'];
const labelAlignArr: Array<FormLabelAlign> = ['left', 'right'];
const prefixCls = `${prefix}-form`

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 8
    }
};

const list = [
    {
        name: 'fileda',
        label: 'Field A',
        placeholder: '请输入Field A',
        rules: [{
            required: true,
            message: '请输入Field A' 
        }]
    },
    {
        name: 'filedb',
        label: 'Field A',
        placeholder: '请输入Field A',
        rules: [{
            required: true,
            message: '请输入Field A' 
        }]
    }
]

const sizeArr: any = ['xs', 'sm', 'md', 'nm', 'lg', 'default', 'small', 'middle', 'large'];
const FormSizeDemo = (props: any) => {
    let comps: JSX.Element[] = [];
    sizeArr.forEach((size: any) => {
        comps.push(
            <>
                <FormDefault size={size} {...props} />
                <FormDefault size={size} disabled {...props} />
            </>
        );
    });
    return <>{comps}</>;
};


describe('form.cy.tsx-default', () => {
    it('should mount', () => {
        cy.mount((<FormDefault />));
        cy.compareSnapshot('default');

        cy.mount((<FormSizeDemo />));
        cy.compareSnapshot('basic_form_size');
        
        cy.mount(<FormSizeDemo bordered='bottom' />)
        cy.compareSnapshot('basic_form_border_bottom')
        cy.mount(<FormSizeDemo bordered='bottom' disabled/>)
        cy.compareSnapshot('basic_form_disabled_border_bottom')
    });
})

describe('form.cy.tsx-labelCol', () => {
    it('should mount', () => {
        cy.mount((<>
        <FormDefault {...formItemLayout} />
        <FormDefault itemProps={{extra: 'this is a message'}} />
        <FormDefault itemProps={{colon: true}} />
        <FormDefault itemProps={formItemLayout} />
        </>));
        cy.compareSnapshot('labelCol-wrapperCol-extra-colon');
    });
})

describe('form.cy.tsx-layout', () => {
    it('should mount layout', () => {

        cy.mount((<>
            {
                layoutArr.map(item => {
                    return (<FormDefault layout={item} />);
                })
            }
        </>));
        cy.compareSnapshot('layout');

    });
})

describe('form.cy.tsx-labelAlign', () => {
    it('should mount labelAlign', () => {

        cy.mount((<div>
            {
              labelAlignArr.map(item => {
                return (<FormDefault {...formItemLayout} itemProps={{labelAlign: item}} />);
                })  
            }
        </div>))
        cy.compareSnapshot(`labelAlign`);
        
    });
})

describe('form.cy.tsx-validateStatus', () => {
    it('should mount', () => {

        cy.mount((<Form {...formItemLayout}>
           {
            validateStatusArr.map(item => {
                return (
                    <Form.Item name={item} label={item} validateStatus={item}>
                        <Input />
                    </Form.Item>
                )
            })
           } 
           {
             validateStatusArr.map(item => {
                 return (
                     <Form.Item name={`${item}-back`} label={item} validateStatus={item} hasFeedback>
                         <Input />
                     </Form.Item>
                 )
             })
            } 
        </Form>));
        cy.wait(500)
        cy.compareSnapshot('validateStatus-hasFeedback');

    });
})

describe('form.cy.tsx-required', () => {

    it('should mount required upload', () => {

        cy.mount((<FormValidate style={{marginTop: 50}} />));
        cy.wait(300);
        cy.compareSnapshot('required-1');

    });
    it('should mount required upload', () => {

        cy.mount((<FormValidate style={{marginTop: 50}} />));
        cy.wait(300);
        cy.get('button').eq(0).click();
        cy.compareSnapshot('required-2-click');
    });
    it('should mount required upload', () => {

        cy.mount((<FormValidate style={{marginTop: 50}} />));
        cy.wait(300);
        cy.get('button').eq(0).click();
        cy.get('form > div').eq(2).find(`.${prefixCls}-item-control-input`).trigger('mouseover');
        cy.wait(500);
        cy.compareSnapshot('required-3-mouseover');

    });
    it('should mount required upload', () => {

        cy.mount((<FormValidate style={{marginTop: 50}} />));
        cy.wait(300);
        cy.get('button').eq(0).click();
        cy.get('form > div').eq(2).find(`.${prefixCls}-item-control-input`).trigger('mouseover');
        cy.wait(500);
        cy.get('form > div').eq(6).find(`.${prefixCls}-item-control-input`).trigger('mouseover');
        cy.wait(500);
        cy.compareSnapshot('required-4-mouseover');

    });
    it('should mount required upload', () => {

        cy.mount((<FormValidate style={{marginTop: 50}} />));
        cy.wait(300);
        cy.get('button').eq(0).click();
        cy.get('form > div').eq(2).find(`.${prefixCls}-item-control-input`).trigger('mouseover');
        cy.wait(500);
        cy.get('form > div').eq(6).find(`.${prefixCls}-item-control-input`).trigger('mouseover');
        cy.wait(500);
        cy.get('input').eq(2).type('123456', {force: true});
        cy.get('input').eq(2).blur();
        // cy.get('button').click();
        cy.compareSnapshot('required-5-blur');

    });

    it('should mount ValidateForm', () => {

        cy.mount((<ValidateForm />));
        cy.compareSnapshot('ValidateForm-0');

    });
    it('should mount ValidateForm', () => {

        cy.mount((<ValidateForm />));
        cy.get('form > div:last').find('button').click();
        cy.compareSnapshot('ValidateForm-1');

    });
})

describe('form.cy.tsx-modalSet', () => {
    it('should mount modalSet', () => {

        cy.mount((<ModalForm />));
        cy.compareSnapshot('modalSet-0');

    });
    it('should mount modalSet', () => {

        cy.mount((<ModalForm />));
        cy.get('button').click();
        cy.compareSnapshot('modalSet-1');

    });
})

describe('form.cy.tsx-HookForm', () => {
    it('should mount HookForm', () => {

        cy.mount((<HookForm />));
        cy.wait(300);
        cy.compareSnapshot('HookForm-0-default');

    });
    it('should mount HookForm', () => {

        cy.mount((<HookForm />));
        cy.wait(300);
        cy.get('button').eq(0).click();
        cy.compareSnapshot('HookForm-1-validate');

    });
    it('should mount HookForm', () => {

        cy.mount((<HookForm />));
        cy.wait(300);
        cy.get('button').eq(0).click();
        cy.get('button').eq(2).click();
        cy.compareSnapshot('HookForm-2-fill');

    });
    it('should mount HookForm', () => {

        cy.mount((<HookForm />));
        cy.wait(300);
        cy.get('button').eq(0).click();
        cy.get('button').eq(2).click();
        cy.get('button').eq(1).click();
        cy.compareSnapshot('HookForm-3-reset');

    });
})

function FormDefault (props: any) {
    const [form] = Form.useForm();
    const {itemRequired, itemProps, ...others} = props;
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
        }
        catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };
    return (<Form form={form} {...others}>
            {
                list.map(item => {
                    const {name, label, placeholder, rules} = item;
                    return (<Form.Item name={name} label={label} rules={itemRequired ? rules : undefined} {...itemProps}>
                            <Input placeholder={placeholder}/>
                        </Form.Item>
                        )
                })
            }
            <Form.Item label=' '>
                <Button type='primary' onClick={onCheck}>
					提交
                </Button>
            </Form.Item>
        </Form>);
}

function FormValidate (props: any) {
    const [form] = Form.useForm();
    const {itemRequired, itemProps, ...others} = props;
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
        }
        catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    return (<Form form={form} {...others} {...formItemLayout} initialValues={{ username: '小花狗不见了', 'demo2-date': '2022-08-11' }}>
            <Form.Item label='用户名' name='username'>
                <Input placeholder='请输入用户名' readOnly/>
            </Form.Item>
            <Form.Item label='日期' name='demo2-date' rules={[
                {
                    required: true,
                    message: <span>请输入日期</span>
                }
            ]}>
                <DatePicker placeholder='请输入日期' disabled/>
            </Form.Item>
            <Form.Item label='邮箱' name='demo2-email' rules={[
                {
                    required: true,
                    message: <span>请输入邮箱</span>
                }
            ]}>
                <Input placeholder='请输入邮箱' />
            </Form.Item>
            <Form.Item label='住址' name='address' tooltip={{ title: '自定义图标', icon: <Icon title='' type="uf-earth"/> }}>
                <Input placeholder='请输入地址'/>
            </Form.Item>
            <Form.Item label='inputNumber' name='input-number' rules={[{ required: true, message: '请输入' }]}>
                <InputNumber min={1} max={10}/>
            </Form.Item>
            <Form.Item name='select' label='国家' rules={[{ required: true, message: '请选择' }]}>
                <Select placeholder='请选择'>
                    <Select.Option value='usa'>U.S.A</Select.Option>
                    <Select.Option value='china'>China</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name='upload'
                label='Upload'
                rules={[
                    {
                        required: true,
                        message: <span>请选择文件</span>
                    }
                ]}
            >
                <Upload listType='picture-card'>
                    <Icon type="uf-plus" style={{ fontSize: '22px' }}/>
                    <p>上传</p>
                </Upload>
            </Form.Item>
            <Form.Item label=' '>
                <Button type='primary' onClick={onCheck}>
					提交
                </Button>
                <Button style={{marginLeft: 10}} onClick={onReset}>
					重置
                </Button>
            </Form.Item>
        </Form>);
}

function ModalForm (_props: any) {
    const [form] = Form.useForm();
    const [showModal, setShowModal] = React.useState(false);
    const close = () => {
        setShowModal(false);
    };
    const open = () => {
        form.setFieldsValue({
            content: 'Jazz'
        });
        setShowModal(true);
    };
    return (<div>
            <Button bordered onClick={open}>
                     打开模态框
            </Button>
            <Modal size='md' visible={showModal} onCancel={close} onOk={close}>
                <Form form={form} name='help-form'> 
                    <Form.Item name='content' label={'姓名'} rules={[
                        {
                            required: true,
                            message: "请输入姓名"
                        },
                    ]}>
                        <Input placeholder={'请输入姓名'} autoComplete='off' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    // }
};

function HookForm (_props: any) {
    const [form] = Form.useForm();
    const onGenderChange = (value: any) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ hobby: '玩具总动员!' });
                return;
            case 'female':
                form.setFieldsValue({ hobby: '冰雪奇缘!' });
                return;
            default:
                break;
        }
    };
    const onFinish = (values: any) => {
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFill = () => {
        form.setFieldsValue({
            hobby: '飞屋环游记!',
            gender: 'male',
            date: '2022-02-02 11:11:11',
            range: ['2011-01-01', '3033-03-03']
        });
    };
    return (<Form form={form} {...formItemLayout} name='control-ref-hook' onFinish={onFinish}>
            <Form.Item label='爱好' name='hobby' colon rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label='性别' name='gender' colon rules={[{ required: true }]}>
                <Select onChange={onGenderChange} allowClear>
                    <Option value='male'>男</Option>
                    <Option value='female'>女</Option>
                </Select>
            </Form.Item>

            <Form.Item name='date' label='DatePicker' rules={[
            {
                required: true,
                message: 'Please select your date!'
            }
        ]}>
                <DatePicker showTime format='YYYY-MM-DD HH:mm:ss'/>
            </Form.Item>

            <Form.Item name='range' label='RangePicker' rules={[
            {
                required: true,
                message: 'Please select your RangePicker!',
                type: 'array'
            }
        ]}>
                <RangePicker />
            </Form.Item>

            <Form.Item label=' '>
                <Button type='primary' htmlType='submit'>
					Submit
                </Button>
                <Button htmlType='button' onClick={onReset}>
					Reset
                </Button>
                <Button type='link' htmlType='button' onClick={onFill}>
					Fill form
                </Button>
            </Form.Item>
        </Form>);
};

function ValidateForm (_props: any) {
    const [isDatePicker, setIsDatePicker] = useState<boolean>();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const onFinishFailed = ({ values, errorFields, outOfDate }: any) => {
        console.log('Received error values of form: ', values, errorFields, outOfDate);
    };
    const onValuesChange = (changedValues: any, allValues: any) => {
        console.log('Received values change of form: ', changedValues, allValues);
        setIsDatePicker(changedValues.select === 'china');
    };
    return (<Form name='validate_other' {...formItemLayout} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={onValuesChange} initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            'radio-button': 'a',
            rate: 3.5,
            time: '12:20:25',
            date: '2021-05-15'
        }}>
            <Form.Item label='Plain Text'>
                <span>China</span>
            </Form.Item>

            <Form.Item name='input' label='input text' initialValue='小猪佩奇开心的一天'>
                <Input />
            </Form.Item>

            <Form.Item label='InputNumber' name='input-number' rules={[{ required: true, message: 'Please select your country!' }]}>
                <InputNumber min={1} max={10}/>
            </Form.Item>

            <Form.Item name='switch' label='Switch' valuePropName='checked'>
                <Switch enterKeyDown={false}/>
            </Form.Item>

            <Form.Item name='slider' label='Slider'>
                <Slider marks={{
            0: 'A',
            20: 'B',
            40: 'C',
            60: 'D',
            80: 'E',
            100: 'F'
        }}/>
            </Form.Item>

            <Form.Item name='radio-group' label='Radio.Group'>
                <Radio.Group>
                    <Radio value='a'>item 1</Radio>
                    <Radio value='b'>item 2</Radio>
                    <Radio value='c'>item 3</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name='radio-button' label='Radio.Button' rules={[{ required: true, message: 'Please pick an item!' }]}>
                <Radio.Group>
                    <Radio.Button value='a'>item 1</Radio.Button>
                    <Radio.Button value='b'>item 2</Radio.Button>
                    <Radio.Button value='c'>item 3</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item name='checkbox-group' label='Checkbox.Group'>
                <Checkbox.Group>
                    <Checkbox value='A' style={{ lineHeight: '32px' }}>
						A
                    </Checkbox>
                    <Checkbox value='B' style={{ lineHeight: '32px' }} disabled>
						B
                    </Checkbox>
                    <Checkbox value='C' style={{ lineHeight: '32px' }}>
						C
                    </Checkbox>
                    <Checkbox value='D' style={{ lineHeight: '32px' }}>
						D
                    </Checkbox>
                    <Checkbox value='E' style={{ lineHeight: '32px' }}>
						E
                    </Checkbox>
                    <Checkbox value='F' style={{ lineHeight: '32px' }}>
						F
                    </Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item name='rate' label='Rate'>
                <Rate />
            </Form.Item>

            <Form.Item name='time' label='TimePicker'>
                <TimePicker />
            </Form.Item>

            <Form.Item name='select-multiple' label='Select[multiple]' rules={[
            {
                required: true,
                message: 'Please select your favourite colors!',
                type: 'array'
            }
        ]}>
                <Select mode='multiple' placeholder='Please select favourite colors'>
                    <Option value='red'>Red</Option>
                    <Option value='green'>Green</Option>
                    <Option value='blue'>Blue</Option>
                </Select>
            </Form.Item>

            <Form.Item name='select' label='Select' rules={[{ required: true, message: 'Please select your country!' }]}>
                <Select placeholder='Please select a country'>
                    <Option value='usa'>U.S.A</Option>
                    <Option value='china'>China</Option>
                </Select>
            </Form.Item>

            <Form.Item name='date' label='DatePicker' rules={[
            {
                required: true,
                message: 'Please select your date!'
            }
        ]}>
                {isDatePicker ? <DatePicker /> : <Input disabled/>}
            </Form.Item>

            <Form.Item name='range' label='RangePicker' rules={[
            {
                required: true,
                message: 'Please select your RangePicker!',
                type: 'array'
            }
        ]}>
                <RangePicker />
            </Form.Item>

            <Form.Item name='upload' label='Upload' valuePropName='fileList' rules={[
            {
                required: true,
                message: 'Please select your file!'
            }
        ]}>
                <Upload listType='picture-card'>
                    <Icon type="uf-plus" style={{ fontSize: '22px' }}/>
                    <p>上传</p>
                </Upload>
            </Form.Item>

            <Form.Item label='Dragger'>
                <Form.Item name='dragger' valuePropName='fileList' noStyle>
                    <Upload.Dragger name='files' action='/upload.do'>
                        <p className='ant-upload-text'>
							Click or drag file to this area to upload
                        </p>
                        <p className='ant-upload-hint'>
							Support for a single or bulk upload.
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>

            <Form.Item label=' '>
                <Button type='primary' htmlType='submit'>
					Submit
                </Button>
            </Form.Item>
        </Form>);
};