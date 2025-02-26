/**
 * @title 限制文件大小
 * @description 限制自定义上传文件的大小。选中文件后触发beforeUpload回调，通过true/false来确定是否继续上传【file.size/1024*100 单位 KB、file.size/1024 单位 M 】
 */

import {Button, Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';

const demo8props = {
    name: 'file',
    action: '/upload.do',
    accept: "image/*",
    size: 300,
    headers: {
        authorization: 'authorization-text',
    },
    beforeUpload(file: any) {
        let maxsize = 3000;
        return !((file.size / 1024 * 100) >= maxsize);
    },
};

class Demo8 extends Component {
    render() {
        return (
            <Upload {...demo8props}>
                <Button shape="border">
                    <Icon type="uf-upload"/> 点击上传
                </Button>
            </Upload>
        )
    }
}

export default Demo8;
