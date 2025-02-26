/**
 * @title 裁剪
 * @description 上传前裁剪图片。
 */

import {Button, Icon, Upload, Modal, Message} from '@tinper/next-ui';
import React, {Component} from 'react';
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface DemoState {
    avatarImg?: any;
    imageUrl?: any;
    imageType?: string;
    cropperShow: boolean;
    fileName?: string;
    uploadProps: any;
    defaultFileList: any;
}

class Demo16 extends Component<{}, DemoState> {
    cropper: any;
    constructor(props: {}) {
        super(props)
        this.state = {
            avatarImg: '',
            imageUrl: '',
            imageType: '',
            cropperShow: false,
            fileName: '',
            uploadProps: {
                action: '/upload.do',
                listType: 'picture',
                onChange(info: any) {
                    if (info.file.status !== 'uploading') {
                        console.log(info.file);
                        console.log(info.fileList);
                    }
                },
                beforeUpload: this.beforeUpload,
                showUploadList: {
                    showDownloadIcon: false,
                    showRemoveIcon: true,
                }
            },
            defaultFileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
            }, {
                uid: -2,
                name: 'yyy.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    }

    beforeUpload = (file: any) => {
        if (file.type !== 'image/jpeg' && file.type !== "image/png") {
            Message.destroy();
            Message.create({content: '请对图片文件进行裁剪', color: "warning"})
            return
        }
        this.setState({
            cropperShow: true,
            fileName: file.name
        })
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            this.setState({
                avatarImg: e.target?.result,
                imageUrl: e.target?.result,
                imageType: file.type,
            })
        }
        return false
    }

    dataURLtoFile = (dataurl: string) => { // 将base64转换为文件
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)![1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], this.state.fileName!, {
            type: mime
        });
    }

    cropImage = () => {
        // console.log('cropper=======', this.cropper)
        if (this.cropper?.getCroppedCanvas() === 'null') {
            return false
        }
        // console.log('url', this.cropper.getCroppedCanvas().toDataURL())
        // this.props.getCropData(this.cropper.getCroppedCanvas().toDataURL())
        this.setState({
            cropperShow: false
        })
        // 注：这部分手动加了条fileList内容，用的时候拿到file文件传入后台进行上传，成功后拿到返回的值在添加到fileList内
        let newFile = this.dataURLtoFile(this.cropper.getCroppedCanvas().toDataURL())
        let obj = {
            uid: -3,
            name: newFile.name,
            status: 'done',
            url: this.cropper.getCroppedCanvas().toDataURL(), // 获取的地址
            percent: 55
        }
        // console.log('新file=========', this.dataURLtoFile(this.cropper.getCroppedCanvas().toDataURL()))
        let neaFileList = this.state.defaultFileList
        neaFileList.push(obj)
        this.setState({
            defaultFileList: neaFileList
        })
    }
    cropImagecanel = () => {
        this.setState({
            cropperShow: false
        })
    }

    onRemove = (file: any) => {
        let fileListArr = this.state.defaultFileList
        let newFileList = fileListArr.filter((item: any) => {
            return item.name != file.name
        })
        // console.log('删除后', newFileList)
        this.setState({
            defaultFileList: newFileList
        })
    }

    onCropperInit = (cropper: React.ReactNode) => {
        this.cropper = cropper
    }

    render() {
        return (
            <>
                <Modal show={this.state.cropperShow} maskClosable={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>裁剪</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Cropper
                        // ref={(el) => {this.cropper = el}}
                            onInitialized={this.onCropperInit.bind(this)}
                            src={this.state.imageUrl}
                            aspectRation={1}
                            guides={false}
                            // crop={onCrop}
                            // background={false}
                            // minContainerWidth={170}
                            // minContainerHeight={170}
                            // zoomable={false}
                            style={{height: 400, width: '100%'}}
                        >
                        </Cropper>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.cropImagecanel} colors="secondary" style={{ marginRight: 8 }}>取消</Button>
                        <Button onClick={this.cropImage} colors='primary'>确认</Button>
                    </Modal.Footer>
                    {/* <div>
                        <Button onClick={this.cropImage}>确认</Button>
                    </div> */}
                </Modal>
                <Upload {...this.state.uploadProps} fileList={this.state.defaultFileList} onRemove={this.onRemove}>
                    <Button type="primary" shape="border">
                        <Icon type="uf-upload"/> 点击上传
                    </Button>
                </Upload>
                {/* <img src={this.state.cropperAfter} /> */}
            </>
        )
    }
}

export default Demo16;
