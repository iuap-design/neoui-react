/**
 * @title 基础用法
 * @description 组件类型
 */

import React from 'react'
import { Image, Tag } from '@tinper/m'
import { styles } from './demoStyles';
import demoImage from './image-demo.png'

export default function Demo() {
  const style1 = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
  const style2 = { background: '#D8D8D8', }
  return (
    <>
      <h3>基础用法</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Image src={demoImage} fieldid="imageDemo1" width={'100%'} height={140} draggable/>
      </div>

      <h3>填充模式</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <div style={style1}>
          <Image width={100} fieldid="imageDemo2"
            height={100} style={style2} src={demoImage} fit='contain'/>
          <span>contain</span>
        </div>
        <div style={style1}>
          <Image width={100} fieldid="imageDemo3"
            height={100} style={style2} src={demoImage} fit='cover'/>
          <span>cover</span>
        </div>
        <div style={style1}>
          <Image width={100} fieldid="imageDemo4"
            height={100} style={style2} src={demoImage} fit='fill'/>
          <span>fill</span>
        </div>
        <div style={style1}>
          <Image width={100} fieldid="imageDemo5"
            height={100} style={style2} src={demoImage} fit='none'/>
          <span>none</span>
        </div>
        <div style={style1}>
          <Image width={100} fieldid="imageDemo6"
            height={100} style={style2} src={demoImage} fit='scale-down'/>
          <span>scale-down</span>
        </div>
      </div>


      <h3>图片形状</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Image
          fieldid="imageDemo7"
          src={demoImage}
          width={100}
          height={100}
          fit='cover'
          style={{ borderRadius: 0 }}
        />
        <Image
          fieldid="imageDemo8"
          src={demoImage}
          width={100}
          height={100}
          fit='cover'
          style={{ borderRadius: 14 }}
        />
        <Image
          fieldid="imageDemo9"
          src={demoImage}
          width={100}
          height={100}
          fit='cover'
          style={{ borderRadius: 50 }}
        />
      </div>

    </>
  )
}
