/**
 * @title 状态标签
 * @description 组件状态
 */

import React, { Component } from 'react';
import { Tag, Icon } from '@tinper/m';
import { styles } from './demoStyles'
import Signature from '@tinper/m-icons/lib/cjs/Signature'
import './demo.less'

export default function Demo0() {
  return (
    <>
      <h3 style={styles.title}>展示型标签</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Tag fieldid="tagDemo21" color="primary" fill="solid" label="primary"/>
        <Tag fieldid="tagDemo22" color="success" fill="solid" label="success"/>
        <Tag fieldid="tagDemo23" color="warning" fill="solid" label="warning"/>
        <Tag fieldid="tagDemo24" color="danger" fill="solid" label="danger"/>
        <Tag color="message" fill="solid" label="message"/>
        <Tag color="invalid" fill="solid" label="invalid"/>
        <Tag color="start" fill="solid" label="start"/>
        <Tag fieldid="tagDemo25" color="#ff5aff" fill="solid" label="#ff5aff"/>
      </div>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Tag fieldid="tagDemo25" color="primary" fill="outline" label="标签"/>
        <Tag fieldid="tagDemo27" color="success" fill="outline" label="标签"/>
        <Tag fieldid="tagDemo28" color="warning" fill="outline" label="标签"/>
        <Tag fieldid="tagDemo29" color="danger" fill="outline" label="标签"/>
        <Tag color="message" fill="outline" label="标签"/>
        <Tag color="invalid" fill="outline" label="标签"/>
        <Tag color="start" fill="outline" label="标签"/>
        <Tag fieldid="tagDemo210" color="#ff5aff" fill="outline" label="ff5aff"/>
      </div>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Tag fieldid="tagDemo211" color="primary" fill="none" label="标签"/>
        <Tag fieldid="tagDemo212" color="success" fill="none" label="标签"/>
        <Tag fieldid="tagDemo213" color="warning" fill="none" label="标签"/>
        <Tag fieldid="tagDemo214" color="danger" fill="none" label="标签"/>
        <Tag color="message" fill="none" label="标签"/>
        <Tag color="invalid" fill="none" label="标签"/>
        <Tag color="start" fill="none" label="标签"/>
        <Tag fieldid="tagDemo215" color="#ff5aff" fill="none" label="ff5aff"/>
      </div>
      <div style={{ ...styles.signatureBlock, flexWrap: 'wrap'}}>
        <Tag color="info" fill="signature" />
        <Tag color="success" fill="signature" />
        <Tag color="warning" fill="signature" />
        <Tag color="danger" fill="signature" />
        <Tag color="invalid" fill="signature" />
        <Tag color="start" fill="signature" />
      </div>
    </>
  )
}
