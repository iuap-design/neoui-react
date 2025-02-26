/**
 * @title Icon使用
 * @description Icon使用
 */
import React, { Component } from 'react'
import { Icon } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import { styles } from './demoStyles'
export default class Demo2 extends Component {
  render () {
    return (
      <>
        <h3 style={styles.title}>基础用法</h3>
        <div style={styles.block} >
          <Icon fieldid='icon_1' type='archeart' onClick={() => console.log('icon click')} />
        </div>
        <h3 style={styles.title}>图标颜色</h3>
        <div style={styles.block} >
          <Icon fieldid='icon_2' type='archeart' color='#EE2233'/>
          <Icon fieldid='icon_3' type='archeart' color='#F59E0D'/>
          <Icon fieldid='icon_4' type='archeart' color='#3B82F6'/>
        </div>
        <h3 style={styles.title}>图标大小</h3>
        <div style={styles.block} >
          <Icon fieldid='icon_5' type='archeart' size='sm'/>
          <Icon fieldid='icon_6' type='archeart' size='md'/>
          <Icon fieldid='icon_7' type='archeart' size='lg'/>
        </div>
      </>

    )
  }
}
