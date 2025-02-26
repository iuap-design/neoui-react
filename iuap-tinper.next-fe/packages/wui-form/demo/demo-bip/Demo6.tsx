/**
 *
 * @title 多种表单元素示例
 * @description
 */

import {
    Cascader,
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    TimePicker,
    Icon,
    Upload
} from '@tinper/next-ui';
import React, {useState} from 'react';

const {Option} = Select;
const {RangePicker} = DatePicker;
const {InputNumberGroup} = InputNumber;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8}
};

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

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const Demo6 = () => {
    const [isDatePicker, setIsDatePicker] = useState<any>();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const onFinishFailed = ({values, errorFields, outOfDate}: any) => {
        console.log('Received error values of form: ', values, errorFields, outOfDate);
    };

    const onValuesChange = (changedValues: any, allValues: any) => {
        console.log('Received values change of form: ', changedValues, allValues);
        setIsDatePicker(changedValues.select === 'china');
    };

    return (
        <Form
            name='validate_other'
            {...formItemLayout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            initialValues={{
                'input-number': 3,
                'input-number-group': [111, 122],
                'checkbox-group': ['A', 'B'],
                'radio-button': 'a',
                rate: 3.5,
                time: '12:20:25',
                date: '2021-05-15'
            }}
        >
            <Form.Item label='Plain Text'>
                <span>China</span>
            </Form.Item>

            <Form.Item label='所属城市' name='city' required>
                <Cascader
                    defaultValue={defaultOptions}
                    options={options}
                    placeholder='请选择'
                    separator=' > '
                    requiredStyle
                    bordered='bottom'
                    // multiple
                />
            </Form.Item>

            <Form.Item required name='input' label='input text' initialValue='小猪佩奇开心的一天'>
                <Input requiredStyle bordered='bottom' />
            </Form.Item>

            <Form.Item
                required
                label='InputNumber'
                name='input-number'
                rules={[{required: true, message: 'Please select your country!'}]}
            >
                <InputNumber min={1} max={10} requiredStyle bordered='bottom' />
            </Form.Item>

            <Form.Item
                required
                label='InputNumberGroup'
                name='input-number-group'
                validateTrigger='onChange'
                rules={[
                    {
                        min: 100,
                        max: 200
                    }
                ]}
            >
                <InputNumberGroup placeholder={['请输入最小值', '请输入最大值']} requiredStyle bordered='bottom' />
            </Form.Item>

            <Form.Item required name='switch' label='Switch' valuePropName='checked'>
                <Switch
                    enterKeyDown={false}
                    onClick={(_b, e) => {
                        e!.preventDefault();
                    }}
                />
            </Form.Item>

            <Form.Item required name='slider' label='Slider'>
                <Slider
                    marks={{
                        0: 'A',
                        20: 'B',
                        40: 'C',
                        60: 'D',
                        80: 'E',
                        100: 'F'
                    }}
                />
            </Form.Item>

            <Form.Item required name='radio-group' label='Radio.Group'>
                <Radio.Group>
                    <Radio value='a'>item 1</Radio>
                    <Radio value='b'>item 2</Radio>
                    <Radio value='c'>item 3</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name='radio-button'
                label='Radio.Button'
                rules={[{required: true, message: 'Please pick an item!'}]}
            >
                <Radio.Group>
                    <Radio.Button value='a'>item 1</Radio.Button>
                    <Radio.Button value='b'>item 2</Radio.Button>
                    <Radio.Button value='c'>item 3</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item required name='checkbox-group' label='Checkbox.Group'>
                <Checkbox.Group>
                    <Checkbox value='A' style={{lineHeight: '32px'}}>
                        A
                    </Checkbox>
                    <Checkbox value='B' style={{lineHeight: '32px'}} disabled>
                        B
                    </Checkbox>
                    <Checkbox value='C' style={{lineHeight: '32px'}}>
                        C
                    </Checkbox>
                    <Checkbox value='D' style={{lineHeight: '32px'}}>
                        D
                    </Checkbox>
                    <Checkbox value='E' style={{lineHeight: '32px'}}>
                        E
                    </Checkbox>
                    <Checkbox value='F' style={{lineHeight: '32px'}}>
                        F
                    </Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item required name='rate' label='Rate'>
                <Rate />
            </Form.Item>

            <Form.Item required name='time' label='TimePicker'>
                <TimePicker requiredStyle bordered='bottom' />
            </Form.Item>

            <Form.Item
                required
                name='select-multiple'
                label='Select[multiple]'
                rules={[
                    {
                        required: true,
                        message: 'Please select your favourite colors!',
                        type: 'array'
                    }
                ]}
            >
                <Select mode='multiple' placeholder='Please select favourite colors' maxTagCount='auto' requiredStyle bordered='bottom' >
                    <Option value='red'>Red</Option>
                    <Option value='green'>Green</Option>
                    <Option value='blue'>Blue</Option>
                    <Option value='red1'>Red1</Option>
                    <Option value='green1'>Green1</Option>
                    <Option value='blue1'>Blue1</Option>
                    <Option value='red2'>Red2</Option>
                    <Option value='green2'>Green2</Option>
                    <Option value='blue2'>Blue2</Option>
                    <Option value='red3'>Red3</Option>
                    <Option value='green3'>Green3</Option>
                    <Option value='blue3'>Blue3</Option>
                    <Option value='red4'>Red4</Option>
                    <Option value='green4'>Green4</Option>
                    <Option value='blue4'>Blue4</Option>
                </Select>
            </Form.Item>

            <Form.Item required name='select' label='Select' rules={[{required: true, message: 'Please select your country!'}]}>
                <Select placeholder='Please select a country' allowClear requiredStyle bordered='bottom' >
                    <Option value='usa'>U.S.A</Option>
                    <Option value='china'>China</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name='date'
                label={isDatePicker ? 'DatePicker' : 'Input.disabled'}
                rules={[
                    {
                        required: true,
                        message: 'Please select your date!'
                    }
                ]}
            >
                {isDatePicker ? <DatePicker requiredStyle bordered='bottom' /> : <Input disabled requiredStyle bordered='bottom' />}
            </Form.Item>

            <Form.Item
                required
                name='range'
                label='RangePicker'
                rules={[
                    {
                        required: true,
                        message: 'Please select your RangePicker!',
                        type: 'array'
                    }
                ]}
            >
                <RangePicker requiredStyle bordered='bottom' />
            </Form.Item>

            <Form.Item
                name='upload'
                label='Upload'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                rules={[
                    {
                        required: true,
                        message: 'Please select your file!'
                    }
                ]}
            >
                <Upload listType='picture-card'>
                    <Icon type='uf-plus' style={{fontSize: '22px'}} />
                    <p>上传</p>
                </Upload>
            </Form.Item>

            <Form.Item label='Dragger'>
                <Form.Item name='dragger' valuePropName='fileList' getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name='files' action='/upload.do'>
                        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                        <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>

            <Form.Item label=' '>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Demo6;
