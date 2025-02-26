/**
 * @title 照片墙
 * @description 设置 `listType = picture-card`，支持图片预览。
 */

import {Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';

const demo4props = {
    action: '/upload.do',
    listType: 'picture-card',
    defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
        thumbUrl: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
    }, {
        uid: -2,
        name: 'zzz.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
    onPreview(val: Record<string, any>) {
        console.log('预览', val)
    },
    // preventDefaultPreview:true//阻止默认预览
    showUploadList: {
        showRemoveIcon: true,
    }
};

class Demo4 extends Component {
    render() {
        return (
            <div>
                <Upload {...demo4props}>
                    <Icon type="uf-plus" style={{fontSize: '22px'}}/>
                    <p>上传</p>
                </Upload>
            </div>
        )
    }
}

export default Demo4;
