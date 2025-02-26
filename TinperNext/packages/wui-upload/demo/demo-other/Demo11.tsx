/**
 * @title fieldid 示例
 * @description upload组件设置fieldid属性。
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
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
    showUploadList: {
        showDownloadIcon: true,
        showRemoveIcon: true,
        removeIcon: <Icon type="uf-book" />,
    },
    fieldid: "upload",
    uploadClassName: 'testClass'
};

class Demo11 extends Component {
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

export default Demo11;
