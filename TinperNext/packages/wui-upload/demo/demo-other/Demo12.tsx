/**
 * @title iconRender
 * @description 自定义显示icon。
 */

import {Button, Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';

const demo12props = {
    action: '/upload.do',
    onChange(info: any) {
        if (info.file.status !== 'uploading') {
            console.log(info.file);
            console.log(info.fileList);
        }
    },
    onRemove(val: Record<string, any>) {
        console.log('点击移除事件回调', val)
    },
    defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
    }, {
        uid: -2,
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
    }],
    iconRender() {
        return <Icon type="uf-pc" />
    }
};

class Demo12 extends Component {
    render() {
        return (
            <Upload {...demo12props}>
                <Button type="primary" shape="border">
                    <Icon type="uf-upload"/> 点击上传
                </Button>
            </Upload>
        )
    }
}

export default Demo12;
