/**
 * @title 上传文件夹
 * @description 通过定义directory，支持上传文件夹。
 * @type other
 */


import {Button, Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';

const props = {
    name: 'file',
    action: '/upload.do',
    headers: {
        authorization: 'authorization-text', // 示例代码
    },
    onChange(info: any) {
        console.log('tiantian', info)
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
    },
    directory: true
};

class Demo10 extends Component {
    render() {
        return (
            <Upload
                {...props}
            >
                <Button shape="border">
                    <Icon type="uf-upload"/> 点击上传
                </Button>
            </Upload>
        )
    }
}

export default Demo10;
