/**
 * @title 图片状态
 * @description 组件状态
 */

import React from 'react'
import { Image } from '@tinper/m'
import { styles } from './demoStyles'
import demoImage from './image-demo.png'

const loadingImage = 'https://upload.wikimedia.org/wikipedia/commons/9/9a/%E6%9A%82%E6%97%A0%E5%9B%BE%E7%89%87.svg'

export default function Demo() {

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <h3>加载默认提示</h3>
          <div style={styles.block}>
            <Image fieldid="imageDemo11" src={loadingImage} width='2rem' height='2rem' style={{ borderRadius: 10 }}/>
          </div>
        </div>

        <div>
          <h3>失败默认提示</h3>
          <div style={styles.block}>
            <Image fieldid="imageDemo12" src="/404" width='2rem' height='2rem' style={{ borderRadius: 10 }}/>
          </div>
        </div>

        <div>
          <h3>缺省图</h3>
          <div style={styles.block}>
            <Image fieldid="imageDemo12" width='2rem' height='2rem' style={{ borderRadius: 10 }}/>
          </div>
        </div>
      </div>

      <h3>懒加载</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Image fieldid="imageDemo13" lazy src={demoImage} width={178} height={100}/>
      </div>
    </div>
  )
}
