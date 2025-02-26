import React from 'react'
import type { FC, ReactNode, ReactElement } from 'react'
import classNames from 'classnames'
import { mergeProps } from '@utils/WithDefaultProps'
import { withNativeProps } from '@utils/NativeProps'
import { useConfig } from '../../config-provider/src'
import type { ImageRecord } from '.'
import './ErrorBlock.less'
import { ErrorBlockProps } from './iErrorBlock'

const defaultProps = { status: 'default' }

export function createErrorBlock(imageRecord: ImageRecord) {
  const ErrorBlock: React.FC<ErrorBlockProps> = p => {
    const props = mergeProps(defaultProps, p)
    const { clsPrefix='mui', fieldid } = props
    const classPrefix = `${clsPrefix}-error-block`
    const { locale } = useConfig()
    const contentPack = locale.ErrorBlock[props.status]
    const desc =
      'description' in props ? props.description : contentPack.description
    const title = 'title' in props ? props.title : contentPack.title

    const image: ReactNode = props.image ?? imageRecord[props.status]
    const imageNode =
      typeof image === 'string' ? (
        <img src={image} alt='error block image' />
      ) : (
        image
      )

    return withNativeProps(
      props,
      <div
        className={classNames(classPrefix, { [`${classPrefix}-full-page`]: props.fullPage, })}
        fieldid={fieldid}
      >
        <div className={`${classPrefix}-image`} fieldid={`${fieldid}_image`}>{imageNode}</div>
        <div className={`${classPrefix}-description`} fieldid={`${fieldid}_description`}>
          {![undefined, null].includes(title as null) && (
            <div className={`${classPrefix}-description-title`} fieldid={`${fieldid}_description_title`}>{title}</div>
          )}

          {![undefined, null].includes(desc as null) && (
            <div className={`${classPrefix}-description-subtitle`} fieldid={`${fieldid}_description_subtitle`}>{desc}</div>
          )}
        </div>

        {props.children && (
          <div className={`${classPrefix}-content`} fieldid={`${fieldid}_content`}>{props.children}</div>
        )}
      </div>
    )
  }
  return ErrorBlock
}
