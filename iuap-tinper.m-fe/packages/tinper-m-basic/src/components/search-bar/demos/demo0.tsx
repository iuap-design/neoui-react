/**
 * @title 搜索栏
 * @description SearchBar-搜索栏
 * @compact true
 */
import React, { useState, useRef } from 'react'
import { SearchBar } from '@tinper/m'
import IconScanning from '@tinper/m-icons/lib/cjs/IconScanning'
import PlusCircle from '@tinper/m-icons/lib/cjs/PlusCircle'
import './demo.less'

export default function Demo0() {
  const [value, setValue] = useState('')
  const searchRef = useRef<any>()
  return (<>
    <h3>基础用法</h3>
    <SearchBar
      fieldid='search'
      clearable
      onLeftIconClick={() => console.log('left icon click')}
      rightIcon={null}
    />
    <h3>获取焦点后显示取消按钮</h3>
    <SearchBar
      fieldid='search1'
      showCancelButton
      onLeftIconClick={() => console.log('left icon click')}
      rightIcon={null}
    />
    <h3>取消按钮长显</h3>
    <SearchBar
      fieldid='search2'
      showCancelButton={() => true}
      onLeftIconClick={() => console.log('left icon click')}
      rightIcon={null}
    />
    <h3>事件监听和Ref</h3>
    <SearchBar
      fieldid='search3'
      ref={searchRef}
      onLeftIconClick={() => console.log('left icon click')}
      value={value}
      onChange={(value) => setValue(value)}
      onSubmit={value => console.log('search value: ', value)}
      rightIcon={null}
    />
    <h3>自定义颜色</h3>
    <SearchBar
      fieldid='search4'
      style={{ '--background': '#EEE', '--background-input': '#FFF' }}
      onLeftIconClick={() => console.log('left icon click')}
      rightIcon={null}
    /><br />
    <SearchBar
      fieldid='search5'
      style={{ '--background': 'linear-gradient(270deg, #FF0000 0%, #882AEC 100%)', '--background-input': '#FFF' }}
      onLeftIconClick={() => console.log('left icon click')}
      rightIcon={null}
    />

    <h3>自定义样式</h3>
    <SearchBar
      fieldid='search6'
      style={{ '--background': '#FFF', '--background-input': '#FFF' }}
      onLeftIconClick={() => console.log('left icon click')}
      rightIcon={null}
    />

    <h3>自定义图标</h3>
    <SearchBar
      fieldid='search7'
      leftIcon={<IconScanning onClick={() => console.log('left icon click')} />}
      rightIcon={null}
    /><br />
    <SearchBar
      fieldid='search8'
      leftIcon={null}
      rightIcon={null}
    />

    <h3>搜索框形状</h3>
    <SearchBar
      fieldid='search9'
      style={{ '--border-radius-input': '0.32rem' }}
      rightIcon={null}
    />

    <h3>自定义配置图标</h3>
    <SearchBar
      fieldid='search10'
      onLeftIconClick={() => console.log('click left icon')}
      onRightIconClick={() => console.log('click right icon')}
      isRightIn={false}
    /><br />
    <SearchBar
      fieldid='search11'
      onLeftIconClick={() => console.log('click left icon')}
      rightIcon={<>
        <IconScanning onClick={() => console.log('scanning icon click')} />
        <PlusCircle style={{ marginLeft: '0.24rem' }} onClick={() => console.log('pluscircle icon click')} />
      </>}
    />
  </>
  )
}
