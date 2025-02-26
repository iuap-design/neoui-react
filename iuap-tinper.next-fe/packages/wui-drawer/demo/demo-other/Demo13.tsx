/**
 *
 * @title 指定Drawer和form连用
 * @description 打开Drawer给form赋值
 *
 */

import React from 'react';
import {Button, Form, Input, Drawer} from '@tinper/next-ui'
import {useState} from 'react'

const Demo13 = () => {
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
    }

    return (
        <div>
            <Button
                className="demo-margin"
                type={'primary'}
                onClick={open}>
                     打开
            </Button>
            <Drawer style={{position: 'fixed'}} zIndex={1000} mask={true}
                className='demo3' visible={showModal} placement={'right'}
                onClose={close} closable={true} fieldid={'drawer'}>
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
            </Drawer>
        </div>
    )
    // }
}

export default Demo13;
