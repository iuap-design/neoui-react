/**
 * @title 按钮状态
 * @description Button-按钮状态
 */
import React from 'react';
import { Button } from '@tinper/m';
import { styles } from './demoStyles'
import { Sync } from '@tinper/m-icons'

export default function Demo1() {
  const customLoadingIcon = <Sync />
  return (
    <>
      <h3>按钮禁用状态</h3>
      <div style={styles.block} >
        <Button fieldid='btn_primary_disabled' size='middle' disabled mode="primary" onClick={() => console.log('click button')}>填充按钮</Button>
        <Button fieldid='btn_default_disabled' size='middle' disabled mode="default">边框按钮</Button>
        <Button fieldid='btn_text_disabled' size='middle' disabled mode="text">文字按钮</Button>
      </div>
      <h3>加载状态</h3>
      <div style={styles.block} >
        <Button fieldid='btn_loading1' size='middle' mode="primary" loading></Button>
        <Button fieldid='btn_loading2' size='middle' mode="primary" loading loadingIcon={customLoadingIcon}></Button>
        <Button fieldid='btn_loading3' size='middle' mode="primary" loading loadingText='加载中'></Button>
      </div>
    </>
  )
}
