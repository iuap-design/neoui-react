import React from 'react'
import { Icon } from '@tinper/m'

interface UseIconProps {
  icon: string | React.ReactNode
  size?: 'sm'| 'md' | 'lg' | 'md'
  color?: 'string'
  fieldid?: string
  onClick?: () => void
}

/**
 * useIcon 传入string时使用tinperM的icon组件进行展示
 * @param props
 * @returns React.ReactNode
 */
export function useIcon(props: UseIconProps) {
  const { icon, size = 'sm', color, fieldid, onClick } = props
  // 如果icon传入的是字符串，则使用Icon组件进行展示
  return (typeof icon === 'string'
    ? <Icon type={icon} size={size} color={color} onClick={onClick} fieldid={fieldid} />
    : icon)
}
