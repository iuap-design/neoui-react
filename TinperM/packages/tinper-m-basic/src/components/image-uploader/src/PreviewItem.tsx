import React, { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import classNames from 'classnames'
import Image from '@components/image/src/index'
import Loading from '@components/loading/src/index'
import InforCircle from '@tinper/m-icons/lib/cjs/InforCircle'
import { PreviewItemProps } from './iImageUploader'

const PreviewItem: FC<PreviewItemProps> = props => {
  const { url, file, deletable, deleteIcon, onDelete, imageFit, preCls, fieldid } = props
  const src = useMemo(() => {
    if (url) {
      return url
    }
    if (file) {
      return URL.createObjectURL(file)
    }
    return ''
  }, [url, file])

  useEffect(() => () => {
    if (file) URL.revokeObjectURL(src)
  }, [src, file])

  function renderLoading() {
    return (
      props.status === 'pending' && (
        <div className={`${preCls}-cell-mask`}>
          <span className={`${preCls}-cell-loading`} fieldid={fieldid ? fieldid + '_item_cell_loading' : undefined}>
            <Loading color='white' type='spinloading' size='0.56rem' />
          </span>
        </div>
      )
    )
  }

  function renderDelete() {
    return (
      deletable && (
        <span className={`${preCls}-cell-delete`} onClick={onDelete} fieldid={fieldid ? fieldid + '_item_cell_delete' : undefined}>
          {deleteIcon}
        </span>
      )
    )
  }

  return (
    <div fieldid={fieldid ? fieldid + '_item_cell_wrapper' : undefined} className={classNames(
      `${preCls}-cell-wrapper`,
      props.status === 'fail' && `${preCls}-cell-wrapper-fail`
    )}>
      <div
        className={classNames(
          `${preCls}-cell`,
          props.status === 'fail' && `${preCls}-cell-fail`
        )}
      >
        <Image
          className={`${preCls}-cell-image`}
          fieldid={fieldid ? fieldid + '_item_image' : undefined}
          src={src}
          fit={imageFit}
          onClick={props.onClick}
        />
        {renderLoading()}
      </div>
      {
        props.status === 'fail' ? (
          <div className={`${preCls}-cell-fail-mask-wrapper`} fieldid={fieldid ? fieldid + '_item_cell_fail_mask_wrapper' : undefined}>
            <div className={`${preCls}-cell-fail-mask`} />
            <InforCircle className={`${preCls}-cell-fail-icon`} style={{ width: '0.48rem', height: '0.48rem' }} />
          </div>
        ) : null
      }
      {renderDelete()}
    </div>

  )
}

export default PreviewItem
