/**
 * @title 限制文件类型
 * @description 自定义上传文件的类型。关键参数accept:image/* 所有图片格式  accept:image/png,image/gif  限制个别文件类型
 */

import {Button, Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';

const demo7props = {
    name: 'file',
    action: '/upload.do',
    accept: "image/*",
    // accept:"image/png,image/gif", //限制个别图片类型
    size: 300,
    headers: {
        authorization: 'authorization-text',
    }
};

class Demo7 extends Component {
    render() {
        return (
            <Upload {...demo7props}>
                <Button shape="border">
                    <Icon type="uf-upload"/> 点击上传
                </Button>
            </Upload>
        )
    }
}

export default Demo7;
