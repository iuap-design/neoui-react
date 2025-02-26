/**
 * @title 可拖拽列表
 * @description dragable属性，实现可拖拽列表。
 */

import {Button, Icon, Upload} from '@tinper/next-ui';
import React, {Component} from 'react';
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const demo3props = {
    action: '/upload.do',
    // listType: 'picture',
    showUploadList: {
        showDownloadIcon: true,
        showRemoveIcon: true,
    },
    // itemRender(originNode, file) {
    //     // <DraggableUploadListItem originNode={originNode} file={file} />
    //     return DraggableUploadListItem(originNode, file)
    // }
};
class Demo15 extends Component<{}, any> {
    constructor(props: {}) {
        super(props)
        this.state = {
            fileList: [{
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
            }, {
                uid: -3,
                name: 'ttt.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // url可以为base64编码，传非图片文件时可通过base64显示缩略图（xlsx，zip等）
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, {
                uid: -4,
                name: 'yyy.png',
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

    onDragEnd = (result: any) => {
        // console.log('拖拽的目标', result)
        let { source, destination } = result
        let originArr = this.state.fileList
        // console.log('originArr--------', originArr)
        // originArr.splice(originArr.findIndex((item, index)=>index == source.index),1)
        if (destination != null) {
            let delArr = originArr.splice(source.index, 1)
            originArr.splice(destination.index, 0, delArr[0])
            // originArr.reverse()
        }

        //  console.log('AAAAAAAAA',delArr)
        // console.log('整合后的数据', originArr)
        this.setState({
            defaultFileList: originArr
        })
    }
    // onChange = (info) => {
    //     if (info.file.status !== 'uploading') {
    //         let obj = {
    //             uid: -3,
    //             name: info.file.name,
    //             status: 'done',
    //             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    //         }
    //         let neaFileList = this.state.defaultFileList
    //         neaFileList.push(obj)
    //         this.setState({
    //             fileList: neaFileList
    //         })
    //     }
    //     let obj = {
    //         uid: -3,
    //         name: info.file.name,
    //         status: 'uploading',
    //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //         percent: 55
    //     }
    //     let neaFileList = this.state.fileList
    //     neaFileList.push(obj)
    //     this.setState({
    //         fileList: neaFileList
    //     })
    //     console.log('-----------', this.state.fileList)
    // }

    render() {
        return (
            <div>
                <Upload {...demo3props} onDownload={this.handleDownload} locale={'zh-cn'} onDrag={this.onDragEnd} defaultFileList={this.state.fileList} dragable={true}>
                    <Button type="primary" shape="border">
                        <Icon type="uf-upload"/> 上传
                    </Button>
                </Upload>
            </div>
        )
    }
}

export default Demo15;
