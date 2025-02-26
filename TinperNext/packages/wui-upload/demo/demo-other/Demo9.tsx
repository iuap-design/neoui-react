/**
 * @title 自定义上传
 * @description 通过定义customRequest，来自定义上传行为，onProgress及progress分别控制进度条状态及样式。
 * @type other
 */


import {Button, Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';

const props = {
    name: 'file',
    action: 'www.baidu.com',
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
    progress: {
        strokeColor: {
            "0%": "#108ee9",
            "100%": "#87d068"
        },
        strokeWidth: 2,
        //  format: (percent) => `hh%`
    }
};

class Demo9 extends Component {
	doImgUpload = (v1: any) => {
	    let {onProgress} = v1 // file, onSuccess等都可以通过此参数获取
	    onProgress({percent: Math.round(51 / 100 * 100).toFixed(2)})
	    // 这里自定义接口，在接口的成功回调里执行onSuccess(ret) (ret为接口返回的数据)，这里调用onSuccess可改变status为done，控制进度条隐藏，接口返回的数据在onCheng的回调中字段为response
	}

	render() {
	    return (
	        <Upload
	            {...props}
	            customRequest={this.doImgUpload}
	        >
	            <Button shape="border">
	                <Icon type="uf-upload"/> 点击上传
	            </Button>
	        </Upload>
	    )
	}
}

export default Demo9;
