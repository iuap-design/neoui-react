/**
 * @title 自定义上传列表项
 * @description itemRender属性，列表项自定义。
 */

import {Button, Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';

const demo3props = {
    action: '/upload.do',
    // listType: 'picture',
    showUploadList: {
        showDownloadIcon: true,
        showRemoveIcon: true,
    },
    itemRender(originNode: any, file: any) {
        return DraggableUploadListItem(originNode, file)
    }
};

const DraggableUploadListItem = (originNode: any, file: any) => {
    return (
        <div className="test" key={file.uid}>
            {file.status === 'error' ? originNode.props.children : originNode}
        </div>
    );
};
class Demo14 extends Component<{}, any> {
    constructor(props: {}) {
        super(props)
        this.state = {
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
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // url可以为base64编码，传非图片文件时可通过base64显示缩略图（xlsx，zip等）
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    }
    handleDownload = (file: any) => {
        // console.log('Demo3', file)
        window.open(file.url)
    };

    render() {
        return (
            <div>
                <Upload {...demo3props} onDownload={this.handleDownload} locale={'zh-cn'} defaultFileList={this.state.defaultFileList}>
                    <Button type="primary" shape="border">
                        <Icon type="uf-upload"/> 上传
                    </Button>
                </Upload>
            </div>
        )
    }
}

export default Demo14;
