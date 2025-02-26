/**
 * @title 动态切换用法
 * @description: ConfigProvider
 */
import React, { useState } from 'react'
import { ConfigProvider, Empty, Button } from '@tinper/m';
import fr from './fr'

const titleStyle = { color: '#7D888D', fontSize: '0.28rem', padding: '16px 12px' }

const Demo = () => {
  ConfigProvider.registerLang('fr-fr', fr)
  const [disabled, setDisabled] = useState(false)

  const changeToZHCN = () => {
    ConfigProvider.setTinpermLocaleConfig('zh-CN')
    setDisabled(false)
  }

  const changeToCustom = () => {
    ConfigProvider.setTinpermLocaleConfig('fr-fr')
    setDisabled(true)
  }

  return (
    <div style={{ height: '100%' }}>
      <div style={titleStyle}>设置全局默认值</div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button fieldid='button_cn' size='middle' onClick={changeToZHCN} disabled={!disabled}>切换中文</Button>
        <Button fieldid='button_fr' size='middle' onClick={changeToCustom} disabled={disabled}>切换法语</Button>
      </div>
      <div style={{ paddingTop: '20px' }}>
        <ConfigProvider>
          <Empty style={{ background: 'var(--mui-color-background)', height: '4rem' }} fieldid={'empty_1'} />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default Demo;
