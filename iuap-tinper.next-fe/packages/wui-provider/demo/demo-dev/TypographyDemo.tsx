/**
 *
 * @title Typography基本使用示例
 * @description 示例包含ellipsis基础配置
 *
 */

import React, { useState } from 'react';
import {
    Typography,
    Button,
    Switch,
    Input,
    Form,
    Space,
    Select
} from '@tinper/next-ui';
const { Option } = Select;
const defaultTextAr = `التصميم هو خطة أو مواصفات لبناء كائن أو نظام أو لتنفيذ نشاط أو عملية. والتصميم هو خطة أو مواصفات لبناء كائن أو نظام أو لتنفيذ نشاط أو عملية. والتصميم هو خطة أو مواصفات لبناء كائن أو نظام أو لتنفيذ نشاط أو عملية. والتصميم هو خطة أو مواصفات لبناء كائن أو نظام أو لتنفيذ نشاط أو عملية.`;
const defaultTextEN = `A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process. A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process`;
const defaultConfig: any = {
    ellipsisStr: '...',
    ellipsis: true,
    showPopover: false,
    direction: 'end',
    expandable: true
};

type PropsType = {
    dir:'ltr' | 'rtl'
}
const Demo2 = ({dir}:PropsType) => {
    const [config, setConfig] = useState({...defaultConfig});
    const [rows, setRows] = useState(1);
    const [text, setText] = useState(dir === 'rtl' ? defaultTextAr : defaultTextEN);
    const { ellipsis, ellipsisStr, showPopover, expandable, suffix, direction } = config;
    const onValuesChange = (_: any, allValues: any) => {
        setConfig({...allValues});
    }
    const onExpand = (isExpand: boolean) => {
        console.log('isExpand', isExpand)
    }
    return (
        <div>
            <Space align="start" size={120}>
                <Form
                    onValuesChange={onValuesChange}
                    style={{ width: '400px', }}
                    labelCol={{ span: 6, }}
                    wrapperCol={{ span: 18, }}
                    size="small"
                    initialValues={{
                        ...defaultConfig
                    }}
                >
                    <Form.Item label="超出省略" name="ellipsis" valuePropName='checked'>
                        <Switch />
                    </Form.Item>
                    <Form.Item label="省略位置" name="direction">
                        <Select
                            defaultValue="end"
                        >
                            <Option value="end">尾部</Option>
                            <Option value="start">头部</Option>
                            <Option value="middle">中间</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="展开/折叠" name="expandable" valuePropName='checked'>
                        <Switch />
                    </Form.Item>
                    <Form.Item label="显示气泡弹框" name="showPopover" valuePropName='checked'>
                        <Switch />
                    </Form.Item>
                    <Form.Item label="省略号" name="ellipsisStr">
                        <Input />
                    </Form.Item>
                    <Form.Item label="suffix" name="suffix">
                        <Input />
                    </Form.Item>
                    <Form.Item label="省略展示">
                        <Space size={8}>
                            <Button onClick={() => setRows(Math.max(1, rows - 1))}> row- </Button>
                            <Button onClick={() => setRows(rows + 1)}> row+ </Button>
                            <span>{rows}行</span>
                        </Space>
                    </Form.Item>
                    <Form.Item label="文字操作">
                        <Button onClick={() => setText(text + (dir === 'rtl' ? defaultTextAr : defaultTextEN))} type="primary">
                            addText
                        </Button>
                    </Form.Item>
                </Form>
            </Space>

            <div style={{ position: 'relative' }}>
                <Typography.Paragraph
                    ellipsis={
                        ellipsis
                            ? {
                                rows: rows,
                                expandable,
                                suffix,
                                ellipsisStr,
                                wrapper: "div",
                                showPopover,
                                direction,
                                defaultExpanded: true,
                                onExpand: onExpand
                            }
                            : false
                    }
                >
                    {text}
                </Typography.Paragraph>
            </div>
        </div>
    );
};

export default Demo2;