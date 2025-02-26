/**
 *
 * @title 指定modal和form连用
 * @description 打开modal给form赋值
 *
 */

import { Modal} from '@tinper/next-ui';
import React from 'react';
import {Button, Form, Input} from '@tinper/next-ui'
import {useState} from 'react'

const Demo25 = () => {
    const [form] = Form.useForm()
    const [showModal, setShowModal] = useState(false);
    const close = () => {
        setShowModal(false)
    }

    const open = () => {
        form.setFieldsValue({
            content: '3ddsd'
        })
        setShowModal(true)
        // this.setState({
        //     showModal: true
        // });
    }

    return (
        <div>
            <Button
                bordered
                className="demo-margin"
                onClick={open}>
                     打开模态框
            </Button>
            <Modal
                size='md'
                visible={showModal}
                onCancel={close}
                onOk={close}
            >
                <Form form={form} name='help-form' >
                    <Form.Item
                        name='content'
                        colon={false}
                        label={'fff'}
                        rules={[
                            {
                                required: true,
                                message: "lang.template"
                            },
                        ]}
                    >
                        <Input
                            placeholder={
                                'ddd'
                            }
                            autoComplete='off'
                            fieldid='fieldid_help_content'
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
    // }
}

export default Demo25;
