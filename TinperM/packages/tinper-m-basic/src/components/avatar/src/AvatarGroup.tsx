import React, { useMemo, useRef } from 'react'
import classNames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'
import { useConfig } from '@components/config-provider/src/index';
import { AvatarGroupProps } from './iAvatarGroup'
import Avatar from './Avatar'
import './AvatarGroup.less'
import MoreHorizontal from '@tinper/m-icons/lib/cjs/MoreHorizontal'
const defaultProps = {
  maxContent: '',
  maxContentType: '',
  max: 3,
  gap: '-8',
  level: 'left',
}
const replaceNumWithSpan = (str, overCounts) => {
  const replacement = `<span class='max-text-number'>${overCounts}</span>`;
  return str.replace(/\${num}/g, replacement);
};

const AvatarGroup= (props: AvatarGroupProps) => {
  const { locale } = useConfig()
  const { className, style, clsPrefix, children, max, maxContent, maxContentType, gap, level } = props


  const classPrefix = `${clsPrefix}-avatar-group`
  const avatarGroupRef = useRef(null)
  const cls = classNames(classPrefix, className)

  const avatarGapStyle = useMemo(() => {
    return {
      ...style,
      '--avatar-gap': `${gap}px`
    }
  }, [gap, style])
  const childrenArray = React.Children.toArray(children).slice(0, Number(max));

  const showChildren = (level === 'left')
  ? childrenArray
  : childrenArray.map((child, index) => {
    // 计算 z-index，依次递减
    const zIndex = children?.length - index;

    // 克隆 child，并添加样式
    return React.cloneElement(child, {
      style: {
        ...child.props.style, // 保留原有的样式
        zIndex: zIndex, // 设置 z-index
      },
    });
  });

  const overMax = Number(children?.length) > Number(max)

  const renderMaxContent = () => {
    let content
    const overCounts = Number(children?.length) - Number(max)
    const customContent = typeof maxContent === 'function' ? maxContent?.(overCounts) : maxContent
    const _onClick = (e) => props.onMaxContentClick?.(e, avatarGroupRef.current, children)
    switch (maxContentType) {
      case 'text':
        content = <span onClick={_onClick} className='max-text' dangerouslySetInnerHTML={{ __html: (customContent || replaceNumWithSpan(locale.Avatar.maxText, overCounts)) }} />
        break
      case 'textAvatar':
        content = <Avatar onClick={_onClick} className='max-avatar' >{customContent || `+${overCounts}`}</Avatar>
        break
      default:
        content = <Avatar onClick={_onClick} className='max-avatar' >{customContent || <MoreHorizontal style={{height: '0.48rem', width: '0.48rem'}}/>}</Avatar>
    }
    return content
  }

  return (
      <div className={cls} style={avatarGapStyle} ref={avatarGroupRef}>
        {showChildren}
        {overMax && renderMaxContent()}
      </div>
  )
}

AvatarGroup.displayName = 'MuiAvatarGroup'

export default WebUI({ defaultProps })(AvatarGroup)
