/**
 * @title 点击上传
 * @description 通过定义props，来自定义上传文件和服务地址等信息。在onChange方法的参数info，是上传返回的回调参数。常用的是上传的状态。
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
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
    },
};

class Demo1 extends Component {
    render() {
        return (
            <Upload {...props}>
                <Button shape="border">
                    <Icon type="uf-upload"/> 点击上传
                </Button>
            </Upload>
        )
    }
}

export default Demo1;
