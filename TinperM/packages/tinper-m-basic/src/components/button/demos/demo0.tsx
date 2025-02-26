/**
 * @title 基础用法
 * @description Button-按钮类型
 */
import React from 'react';
import { Button } from '@tinper/m';
import { styles } from './demoStyles'
import { Heart, HeartFill } from '@tinper/m-icons'
import buttonBgUrl from './button_bg.png'

// icon传入string时，需要引入组件库js配合使用，否则无法展示图标
import '@tinper/m-icons/lib/iconfont/iconfont.js'


export default function Demo0() {
  // @tinper-m-icons发包后，从依赖中引用图标
  const heartIcon = <Heart style={{ width: '0.32rem', height: '0.32rem' }} />
  const heartFillIcon = <HeartFill style={{ width: '0.32rem', height: '0.32rem', fill: '#fff' }} />

  return (
    <>
      <h3>基础按钮</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }} >
        <Button fieldid='btn_fill' size='middle' mode="primary" onClick={() => console.log('click button')} >填充按钮</Button>
        <Button fieldid='btn_border' size='middle' mode="default">边框按钮</Button>
        <Button fieldid='btn_text' size='middle' mode="text">文字按钮</Button>

        <Button fieldid='btn_info' size='middle' mode="info">信息</Button>
        <Button fieldid='btn_success' size='middle' mode="sucess">成功</Button>
        <Button fieldid='btn_warning' size='middle' mode="warning">警告</Button>
        <Button fieldid='btn_danger' size='middle' mode="danger">失败</Button>
      </div>

      <h3>图标按钮</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Button fieldid='btn_icon1' size='middle' mode="default" icon='archeart'>图标按钮</Button>
        <Button fieldid='btn_icon2' size='middle' mode="default" icon={heartIcon}></Button>

        <Button fieldid='btn_icon3' size='middle' mode="primary" icon={heartFillIcon}>收藏</Button>
        <Button fieldid='btn_icon4' size='middle' mode="primary" icon={heartFillIcon}></Button>
      </div>

      <h3>图标位置</h3>
      <div style={{ ...styles.block, alignItems: 'center' }}>
        <Button fieldid='btn_icon_right' size='middle' mode="primary" icon={heartFillIcon} iconPosition='right'>收藏</Button>
        <Button fieldid='btn_icon_top' size='middle' mode="primary" icon={heartFillIcon} iconPosition='top'>收藏</Button>
        <Button fieldid='btn_icon_bottom' size='middle' mode="primary" icon={heartFillIcon} iconPosition='bottom'>收藏</Button>
      </div>

      <h3>幽灵按钮</h3>
      <div style={{ ...styles.block, background: `url(${buttonBgUrl}) right`, height: '3rem', paddingLeft: '0.32rem' }}>
        <Button fieldid='btn_ghost1' size='middle' mode="ghost" >获取体验</Button>
      </div>

      <h3>通栏按钮</h3>
      <div style={styles.block}>
        <Button fieldid='btn_block' block size='middle' mode="primary">通栏按钮</Button>
      </div>

    </>
  )
}
