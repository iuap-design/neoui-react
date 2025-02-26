/**
 * @title 按钮样式
 * @description Button-按钮样式
 */
import React from 'react';
import { Button } from '@tinper/m';
import { HeartFill } from '@tinper/m-icons';
import { styles } from './demoStyles'

export default function Demo2() {
  const heartFillIcon = <HeartFill style={{ fill: '#fff' }} />
  const buttonRadiusStyle1 = { '--border-radius': '0.4rem' }
  const buttonRadiusStyle2 = { '--border-radius': '50%', padding: '0.22rem' }
  return (
    <>
      <h3>按钮尺寸</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }} >
        <Button fieldid='btn_lg' size='large' mode="primary">大按钮</Button>
        <Button fieldid='btn_md' size='middle' mode="primary">中按钮</Button>
        <Button fieldid='btn_sm' size='small' mode="primary">小按钮</Button>
      </div>
      <h3>按钮形状</h3>
      <div style={styles.block} >
        <Button fieldid='btn_shape1' size='middle' mode="primary">中按钮</Button>
        <Button fieldid='btn_shape2' size='middle' mode="primary" style={buttonRadiusStyle1}>中按钮</Button>
        <Button fieldid='btn_shape3' size='middle' mode="primary" style={{padding: '0.22rem'}} icon={heartFillIcon}></Button>
        <Button fieldid='btn_shape4' size='middle' mode="primary" style={buttonRadiusStyle2} icon={heartFillIcon}></Button>
      </div>
      <h3>按钮圆角</h3>
      <div style={styles.block} >
        <Button fieldid='btn_shape_default' mode="primary" shape='default'>default</Button>
        <Button fieldid='btn_shape_rounded' mode="primary" shape='rounded'>rounded</Button>
        <Button fieldid='btn_shape_rectangular' mode="primary" shape='rectangular'>rectangular</Button>
      </div>
    </>
  )
}
