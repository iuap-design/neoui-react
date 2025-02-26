/**
 * @title ImageViewer
 * @description ImageViewer 图片查看器
 */

import React, { Component, useState, useRef } from 'react';
import { Button, ImageViewer } from '@tinper/m';
import { styles } from '@components/button/demos/demoStyles';
import image1 from './viewer1.jpg';
import image2 from './viewer2.jpg';
import image3 from './viewer3.jpg';

import './demo1.less'

const demoImages = [image1, image2, image3]

export default function Demo0() {
  const [visible, setVisible] = useState(false)
  const [multiVisible, setMultiVisible] = useState(false)
  const renderFooter = (image: string, index: number) => (
    <div className="footer">
      <div
        className="footerButton"
        onClick={() => {
          console.log('Loading...')
        }}
      >
          查看原图
      </div>
    </div>
  )
  const ref = useRef(null)

  return (
    <>
      <h3 style={styles.title}>基础样式</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Button
          fieldid="imageViewerDemoBtn1"
          mode="default"
          size='middle'
          onClick={() => {
            setVisible(true)
          }}
        >
          显示图片
        </Button>
        <ImageViewer
          fieldid="imageViewerDemo1"
          image={image1}
          visible={visible}
          maxZoom={12}
          onClose={() => {
            setVisible(false)
          }}
        />
      </div>

      <h3 style={styles.title}>多张图片预览</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Button
          fieldid="imageViewerDemoBtn2"
          mode="default"
          size='middle'
          onClick={() => {
            ref.current?.swipeTo(1)
            setMultiVisible(true)
          }}
        >
          显示图片
        </Button>
        <ImageViewer.Multi
          fieldid="imageViewerDemo2"
          ref={ref}
          images={demoImages}
          visible={multiVisible}
          defaultIndex={3}
          onClose={() => {
            setMultiVisible(false)
          }}
          renderFooter={renderFooter}
          onIndexChange={(index: number) => {
            console.log('onIndexChange index', index)
          }}
        />
      </div>

      <h3 style={styles.title}>指令式调用</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Button
          fieldid="imageViewerDemoBtn3"
          mode="default"
          size='middle'
          onClick={() => {
            ImageViewer.Multi.show({ images: demoImages, fieldid: 'imageViewerDemo3' })
          }}
        >
          显示图片
        </Button>
      </div>

      <h3 style={styles.title}>手动控制关闭</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Button
          fieldid="imageViewerDemoBtn4"
          mode="default"
          size='middle'
          onClick={() => {
            const handler = ImageViewer.show({ image: image1, fieldid: 'imageViewerDemo4' })
            setTimeout(() => {
              handler.close()
            }, 3000)
          }}
        >
          显示图片
        </Button>
      </div>

      <h3 style={styles.title}>自定义底部额外内容</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Button
          fieldid="imageViewerDemoBtn5"
          mode="default"
          size='middle'
          onClick={() => {
            ImageViewer.Multi.show({ images: demoImages, renderFooter, fieldid: 'imageViewerDemo5' })
          }}
        >
          显示图片
        </Button>
      </div>
    </>
  )
}
