import React from 'react'
import classnames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'
import { NavBarProps } from './iNavBar'
import { useIcon } from '@hooks/UseIcon';
import ArrowIosLeft from '@tinper/m-icons/lib/cjs/ArrowIosLeft'

const navBarIconStyle = {
  width: '0.44rem',
  height: '0.44rem'
}

const defaultProps = {
  titleAlign: 'center',
  mode: 'light'
}

function NavBar (props: NavBarProps) {
  const {
    fieldid,
    back,
    backArrow,
    onBack,
    children,
    titleAlign,
    clsPrefix,
    style,
    blur,
    className,
    left,
    right
  } = props

  const defaultBackArrow = <ArrowIosLeft fieldid={`${fieldid}_back_icon`} style={navBarIconStyle} />
  const _clsPrefix = `${clsPrefix}-navbar`
  const navCls = classnames(
    `${_clsPrefix}-align-${titleAlign}`,
    _clsPrefix,
    className
  )

  const navContentCls = classnames(
    `${_clsPrefix}-content`,
    { [`${_clsPrefix}-content-blur`]: blur }
  )

  const backIcon = useIcon({
    icon: (backArrow === true || backArrow === undefined) ? defaultBackArrow : backArrow,
    fieldid: `${fieldid}_back_icon`
  })

  // 导航栏左侧区域
  const Left = () =>  <div className={`${_clsPrefix}-left`}>
    {(back !== null) && <div className={`${_clsPrefix}-back`} onClick={onBack}>
      {backIcon}
      {back}
    </div>}
    <div className={`${_clsPrefix}-custom-left`}>{left}</div>
  </div>

  // 导航栏标题区域
  const Title = () => {
    if (typeof children === 'string') {
      // 兼容flex容器中文本省略失效的问题
      return <div className={`${_clsPrefix}-title`}>
        <span className={`${_clsPrefix}-title-text`}>{children}</span>
      </div>
    } else {
      return <div className={`${_clsPrefix}-title`}>
        {children}
      </div>
    }
  }

  // 导航栏右侧区域
  const Right = () => <>
    <div className={`${_clsPrefix}-right`}>
      <div className={`${_clsPrefix}-custom-right`}>{right}</div>
    </div>
  </>

  return <div className={navCls} style={style} fieldid={fieldid}>
    <div className={navContentCls}>
      {Left()}
      {Title()}
      {Right()}
    </div>
  </div>
}

export default WebUI({ defaultProps })(NavBar)
