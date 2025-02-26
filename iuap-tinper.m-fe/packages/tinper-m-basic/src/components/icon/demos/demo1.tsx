/**
 * @title 按需使用
 * @description 图标使用
 */
import React, { Component } from 'react'
import Heart from '@tinper/m-icons/lib/cjs/Heart'
import { styles } from './demoStyles'
export default class Demo1 extends Component {
  render () {
    return (
      <>
        <h3 style={styles.title}>基础用法</h3>
        <div style={styles.block} >
          <Heart fieldid='icon_import1' style={{ width: '0.48rem', height: '0.48rem' }} onClick={() => console.log('icon click')} />
        </div>
        <h3 style={styles.title}>图标颜色</h3>
        <div style={styles.block} >
          <Heart fieldid='icon_import2' style={{ color: '#EE2233', width: '0.48rem', height: '0.48rem' }} />
          <Heart fieldid='icon_import3' style={{ color: '#F59E0D', width: '0.48rem', height: '0.48rem' }} />
          <Heart fieldid='icon_import4' style={{ color: '#3B82F6', width: '0.48rem', height: '0.48rem' }} />
        </div>
        <h3 style={styles.title}>图标大小</h3>
        <div style={styles.block} >
          <Heart fieldid='icon_import5' style={{ width: '0.32rem', height: '0.32rem' }} />
          <Heart fieldid='icon_import6' style={{ width: '0.48rem', height: '0.48rem' }}/>
          <Heart fieldid='icon_import7' style={{ width: '0.64rem', height: '0.64rem' }}/>
        </div>
      </>

    )
  }
}
