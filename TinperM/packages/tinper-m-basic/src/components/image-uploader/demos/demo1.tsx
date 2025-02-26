/**
 * @title 基础用法
 * @description 基础用法
 * @compact true
 */
import React, { useState } from 'react'
import type { FC } from 'react'
import { ImageUploader, Space, Toast, Dialog } from '@tinper/m'
import type { ImageUploadItem } from '@tinper/m'
import { mockUpload, mockUploadFail } from './utils'
import './demo.less'
import image1 from './viewer1.jpg';

// 基础用法
const Basic: FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: image1,
    },
  ])
  return (
    <ImageUploader
      fieldid='iul0'
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
    />
  )
}

// 上传状态
const UploadStatus: FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: image1,
    },
  ])

  return (
    <ImageUploader
      fieldid='iul1'
      value={fileList}
      onChange={setFileList}
      upload={mockUploadFail as any}
    />
  )
}

// 限制上传大小
const LimitSize: FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: image1,
    },
  ])

  function beforeUpload(file: File) {
    if (file.size > 1024 * 1024) {
      Toast.show('请选择小于 1M 的图片')
      return null
    }
    return file
  }

  return (
    <ImageUploader
      fieldid='iul2'
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
      beforeUpload={beforeUpload}
    />
  )
}

// 限制图片数量
const LimitCount: FC = () => {
  const maxCount = 3
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: image1,
    },
  ])

  return (
    <ImageUploader
      fieldid='iul3'
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
      multiple
      maxCount={3}
      showUpload={fileList.length < maxCount}
      onCountExceed={exceed => {
        Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
      }}
    />
  )
}

// 删除图片确认
const DeleteImage: FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: image1,
    },
  ])

  return (
    <ImageUploader
      fieldid='iul4'
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
      onDelete={() => {
        return Dialog.confirm({
          content: '是否确认删除',
        })
      }}
    />
  )
}

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <div className="image-uploader-demo-wrapper">
        <Basic />
      </div>

      <h3>上传状态</h3>
      <div className="image-uploader-demo-wrapper">
        <Space direction='vertical'>
          <UploadStatus />
          <div style={{ color: '--mui-color-weak' }}>尝试上传几张图片，可以看到上传中和失败的效果</div>
        </Space>
      </div>

      <h3>限制上传大小</h3>
      <div className="image-uploader-demo-wrapper">
        <Space direction='vertical'>
          <LimitSize />
          <div style={{ color: '--mui-color-weak' }}>当用户选择的文件超过 1M 时，跳过上传并提示用户</div>
        </Space>
      </div>

      <h3>限制图片数量</h3>
      <div className="image-uploader-demo-wrapper">
        <Space direction='vertical'>
          <LimitCount />
          <div style={{ color: '--mui-color-weak' }}>限制用户最多上传 3 张图片，当达到最大数量时隐藏掉上传按钮</div>
        </Space>
      </div>

      <h3>删除图片确认</h3>
      <div className="image-uploader-demo-wrapper">
        <Space direction='vertical'>
          <DeleteImage />
          <div style={{ color: '--mui-color-weak' }}>当用户删除图片时，进行确认，确认后可删除图片</div>
        </Space>
      </div>
    </>
  )
}
