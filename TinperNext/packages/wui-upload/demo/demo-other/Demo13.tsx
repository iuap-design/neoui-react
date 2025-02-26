/**
 * @title 缩略图是否img标签显示
 * @description isImageUrl方法内置，当fileList内，不存在url或者类型不符合规定，不显示Img标签图，内置Icon图标显示。
 */

import {Button, Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';

const demo3props = {
    action: '/upload.do',
    listType: 'picture',
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
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.xlsx', // url可以为base64编码，传非图片文件时可通过base64显示缩略图（xlsx，zip等）
        // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
    showUploadList: {
        showDownloadIcon: true,
        showRemoveIcon: true,
    }
};

class Demo13 extends Component {
    handleDownload = (file: any) => {
        console.log('Demo3', file)
        window.open(file.url)
    };

    render() {
        return (
            <div>
                <Upload {...demo3props} onDownload={this.handleDownload} locale={'zh-cn'}>
                    <Button type="primary" shape="border">
                        <Icon type="uf-upload"/> 上传
                    </Button>
                </Upload>
            </div>
        )
    }
}

export default Demo13;
