/**
 * @title 自定义场景
 * @description 自定义场景
 * @compact true
 */
import React, { FC, useRef, useState } from 'react'
import type { ImageUploadItem, ImageUploaderRef } from '@tinper/m'
import { ImageUploader, Button, Space, Icon } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import './demo.less'
import { mockUpload } from './utils'
import image1 from './viewer1.jpg';

// 自定义大小
const CustomeSize: FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: image1,
    },
  ])

  return (
    <ImageUploader
      fieldid='iul5'
      style={{ '--cell-size': '90px' }}
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
    />
  )
}

// 自定义列数
// columns 属性存在时，不支持自定义 --cell-size 属性，详见 FAQ。
const CustomeColumns: FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: image1,
    },
    {
      url: image1,
    },
  ])

  return (
    <ImageUploader
      fieldid='iul6'
      columns={5}
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
    />
  )
}

// 自定义上传按钮
const CustomUploadButton: FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: image1,
    },
  ])

  return (
    <ImageUploader fieldid='iul7' value={fileList} onChange={setFileList} upload={mockUpload}>
      <div
        style={{
          width: '1.26rem',
          height: '1.26rem',
          borderRadius: '50%',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#999999',
        }}
      >
        <Icon type='arcimage-Fill' style={{ fontSize: 32 }} />
      </div>
    </ImageUploader>
  )
}

// 手动调起相册
const ManualOpenPhoto: FC = () => {
  const input = useRef<ImageUploaderRef>(null)
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: image1,
    },
  ])

  const onOpen = () => {
    const nativeInput = input.current?.nativeElement
    if (nativeInput) {
      nativeInput.click()
    }
  }

  return (
    <Space direction='vertical'>
      <ImageUploader
        fieldid='iul8'
        ref={input}
        value={fileList}
        onChange={setFileList}
        upload={mockUpload}
      />
      <Button onClick={onOpen}>手动调起相册</Button>
    </Space>
  )
}

export default () => {
  return (
    <>
      <h3>自定义大小</h3>
      <div className="image-uploader-demo-wrapper">
        <CustomeSize />
      </div>

      <h3>自定义列数</h3>
      <div className="image-uploader-demo-wrapper">
        <CustomeColumns />
      </div>

      <h3>自定义上传按钮</h3>
      <div className="image-uploader-demo-wrapper">
        <CustomUploadButton />
      </div>

      <h3>手动调起相册</h3>
      <div className="image-uploader-demo-wrapper">
        <ManualOpenPhoto />
      </div>
    </>
  )
}
