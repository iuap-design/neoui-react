/**
 * @title 自定义`Upload`
 * @description 自定义上传文件的数量，且最近上传的文件会替代老文件。
 */

import {Button, Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo5 extends Component<{}, {fileList: any}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            }],
        };
    }

    handleChange(info: any) {
        let fileList = info.fileList;

        //  自定义上传数量，只显示最近上传的文件
        fileList = fileList.slice(-2);

        // 读取返回数据，并显示成文件链接形式
        fileList = fileList.map((file: any) => {
            if (file.response) {
                // 组件会显示文件链接为超链接形式
                file.url = file.response.url;
            }
            return file;
        });

        // 通过从服务器返回的结果，过滤上传成功的文件
        fileList = fileList.filter((file: any) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });

        this.setState({fileList});
    }

    render() {
        const props = {
            action: '/upload.do',
            onChange: this.handleChange.bind(this),
            multiple: true,
            mergeFiles: true
        };
        return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button shape="border">
                    <Icon type="uf-upload"/> 点击上传
                </Button>
            </Upload>
        );
    }
}

export default Demo5;
