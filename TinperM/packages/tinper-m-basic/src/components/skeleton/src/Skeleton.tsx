import React from 'react'
import { withNativeProps } from '@utils/NativeProps'
import classNames from 'classnames'
import { generateIntArray } from '@utils/GenerateIntArray'
import { mergeProps } from '@utils/WithDefaultProps';
import { SkeletonProps, SkeletonTitleProps, SkeletonParagraphProps } from './iSkeleton'
import WebUI from '@utils/UpdatePrefixs';

export const Skeleton: React.FC<SkeletonProps> = props => {
  const { clsPrefix, fieldid, animated } = props
  const classPrefix = `${clsPrefix}-skeleton`;
  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, { [`${classPrefix}-animated`]: animated, })}
      fieldid={fieldid}
    />
  )
}
export const SkeletonTitle: React.FC<SkeletonTitleProps> = props => {
  const { clsPrefix='mui', fieldid } = props
  const classPrefix = `${clsPrefix}-skeleton`;
  return withNativeProps(
    props,
    <Skeleton animated={props.animated} className={`${classPrefix}-title`} fieldid={`${fieldid}_title`}/>
  )
}

const defaultSkeletonParagraphProps = { lineCount: 3 }

export const SkeletonParagraph: React.FC<SkeletonParagraphProps> = p => {
  const props = mergeProps(defaultSkeletonParagraphProps, p)
  const { clsPrefix='mui', fieldid, animated } = props
  const classPrefix = `${clsPrefix}-skeleton`;
  const keys = generateIntArray(1, props.lineCount)
  const node = (
    <div className={`${classPrefix}-paragraph`} fieldid={`${fieldid}_paragraph`}>
      {keys.map(key => (
        <Skeleton
          key={key}
          animated={animated}
          className={`${classPrefix}-paragraph-line`}
          fieldid={`${fieldid}_paragraph_line_${key}`}
        />
      ))}
    </div>
  )
  return withNativeProps(props, node)
}

export default WebUI({})(Skeleton)
