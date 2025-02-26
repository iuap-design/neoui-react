/**
 * @title 头部导航类型
 * @description 导航栏
 * @compact true
 */
import React from 'react'
import { NavBar, Toast } from '@tinper/m'
import Close from '@tinper/m-icons/lib/cjs/Close'
import ArrowIosRight from '@tinper/m-icons/lib/cjs/ArrowIosRight'
import Bell from '@tinper/m-icons/lib/cjs/Bell'
import Plus from '@tinper/m-icons/lib/cjs/Plus'
import MoreHorizontal from '@tinper/m-icons/lib/cjs/MoreHorizontal'
import bgPic from './bg.png'
import './demo.less'
const iconStyle = {
  width: '0.44rem',
  height: '0.44rem'
}

export default function Demo0 () {
  const transparentStyle = { background: 'transparent' }
  const pictureStyle = {
    background: `url(${bgPic})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: '#fff'
  }
  const customBgStyle = {
    background: '#ee2233',
    color: '#fff'
  }

  const onBack = () => {
    console.log('click back')
    // window.history.back()
  }

  const onClickTitle = (e) => {
    const textWidth = e.target?.offsetWidth
    const parentWidth = e.target?.parentNode?.offsetWidth
    if (textWidth > parentWidth) {
      Toast.show({
        content: e.target?.innerText,
        className: 'toast_for_navbar_long_title',
      })
    }
  }

  return (<>
    <h3>基础用法</h3>
    <NavBar
      fieldid='basic_navbar'
      onBack={onBack}
    >
      标题
    </NavBar>

    <h3>返回按钮显示文字</h3>
    <NavBar
      fieldid='navbar_back_icon_text'
      back='返回'
      onBack={onBack}
    >
      标题
    </NavBar>

    <h3>返回按钮不显示图标</h3>
    <NavBar
      fieldid='navbar_back_icon'
      backArrow={null}
      back={<span className='icon-text'>返回</span>}
      onBack={onBack}
    >
      标题
    </NavBar>

    <h3>自定义返回按钮图标</h3>
    <NavBar
      fieldid='navbar_custom_back_icon'
      backArrow={<Close fieldid='navbar_custom_back_icon_back_icon' style={iconStyle} />}
      back={<span className='icon-text'>返回</span>}
      onBack={onBack}
    >
      标题
    </NavBar>

    <h3>自定义左侧区域</h3>
    <NavBar
      fieldid='navbar_custom_left'
      backArrow={<Close fieldid='navbar_custom_left_back_icon' style={iconStyle} />}
      back={<span className='icon-text'>返回</span>}
      onBack={onBack}
      left={<span className='icon-text'>关闭</span>}
    >
      标题
    </NavBar>

    <h3>自定义右侧区域</h3>
    <NavBar
      fieldid='navbar_right_icons'
      onBack={onBack}
      right={
        <>
        <Bell style={{ ...iconStyle, marginRight: '0.46rem' }} onClick={() => console.log('click right1')} />
        <Plus style={iconStyle} onClick={() => console.log('click right2')} />
        </>
      }
    >
      标题
    </NavBar>

    <h3>标题超长</h3>
    <NavBar fieldid='navbar_long_title'>
      <span onClick={onClickTitle} style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        我是标题我的文字非常非常非常非常非常非常非常非常长的长
      </span>
    </NavBar>

    <h3>副标题</h3>
    <NavBar
      fieldid='navbar_sub_title'
      right={<MoreHorizontal style={iconStyle} />}
    >
      <div>
        <div>标题</div>
        <div className='demo_navbar_subtitle' style={{ justifyContent: 'center' }}>此处是小字示意</div>
      </div>
    </NavBar>

    <h3>标题区域自适应</h3>
    <NavBar
      fieldid='navbar_adaptive'
      onBack={onBack}
    >
      {'标题(2/6)'}
    </NavBar>

    <h3>标题左对齐</h3>
    <NavBar
      fieldid='navbar_left'
      titleAlign='left'
    >
      <div style={{textAlign: 'left'}}>
        <div>已发货</div>
        <div className='demo_navbar_subtitle'>
          {'已签收 [苹果运动手表Apple watch等4种]'}
          <ArrowIosRight style={{ width: '0.2rem', height: '0.2rem' }}/>
        </div>
      </div>
    </NavBar>

    <h3>背景透明</h3>
    <NavBar
      fieldid='navbar_transparent'
      right={<>
        <Bell style={{ ...iconStyle, marginRight: '0.46rem' }} />
        <Plus style={iconStyle} />
      </>}
      style={transparentStyle}
    >
      标题
    </NavBar>

    <h3>背景图片</h3>
    <NavBar fieldid='navbar_bg_img' style={pictureStyle} >
      标题
    </NavBar>

    <h3>自定义背景色</h3>
    <NavBar
      fieldid='navbar_bg_color'
      style={customBgStyle}
      back='返回'
      backArrow={null}
    >
      标题
    </NavBar>

    <h3>毛玻璃效果</h3>
    <NavBar
      fieldid='navbar_bg_blur'
      blur
      style={{ ...pictureStyle }}
    >
      标题
    </NavBar>
  </>
  )
}
