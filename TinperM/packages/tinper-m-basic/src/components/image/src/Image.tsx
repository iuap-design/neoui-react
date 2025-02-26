import React, { useState } from 'react';
import classNames from 'classnames';
import WebUI from '@utils/UpdatePrefixs'
import { ImageProps } from './iImage'
import DotLoading from '@common/dot-loading/src'
import failIcon from '@assets/imageFail.svg'
import { useIsomorphicUpdateLayoutEffect } from 'tne-fw-fe/hooks';
import placeholderIcon from '@assets/imagePlaceholder.svg'
enum ImageLoadState {
  loading,
  Loaded = 1,
  error
}

const defaultProps = {
  fit: 'fill',
  lazy: false,
  draggable: false,
}

function Image (props: ImageProps) {
  const [loadState, setLoadState] = useState(ImageLoadState.loading)

  const {
    src, alt, width, height, fit, placeholder, fallback, lazy, fieldid = '',
    clsPrefix, className, style, draggable,
    onError, onClick, onLoad, onContainerClick
  } = props

  // src变化时重置状态
  useIsomorphicUpdateLayoutEffect(() => {
    setLoadState(ImageLoadState.loading)
  }, [src])

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoadState(ImageLoadState.error)
    onError?.(event)
  }

  const handleLoaded = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log('ImageLoadState.Loaded)')
    setLoadState(ImageLoadState.Loaded)
    onLoad?.(event)
  }

  const _onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClick?.(event)
  }

  const _onContainerClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onContainerClick?.(event)
  }

  const renderPlaceholder = () => {
    switch (loadState) {
    case ImageLoadState.error:
      return fallback || <img src={failIcon} />
    case ImageLoadState.Loaded:
      return null
    case src && ImageLoadState.loading:
      return placeholder || <DotLoading/>
    default:
      return placeholder || <img src={placeholderIcon} />
    }
  }
  const _clsPrefix = `${clsPrefix}-image`
  const imageCls = classNames(_clsPrefix, className, {
    [`${_clsPrefix}-error`]: loadState === ImageLoadState.error,
    [`${_clsPrefix}-loaded`]: loadState === ImageLoadState.Loaded,
    [`${_clsPrefix}-loading`]: loadState === ImageLoadState.loading
  })

  const sty: React.CSSProperties = { ...style }

  const img = (
    <img
      fieldid={`${fieldid}_img`}
      src={src}
      alt={alt}
      draggable={draggable}
      style={{ width: '100%', height: '100%', objectFit: fit }}
      loading={lazy ? 'lazy' : 'eager'}
      onClick={_onClick}
      onError={handleError}
      onLoad={handleLoaded}
    />
  )

  return <div className={imageCls}
    fieldid={fieldid}
    style={{ width: width, height: height, ...sty }}
    onClick={_onContainerClick}
  >
    <div className={`${_clsPrefix}-placeholder`}
      style={{ width: '100%', height: '100%', zIndex: loadState === ImageLoadState.Loaded ? -1 : 2 }}
    >
      {renderPlaceholder()}
    </div>
    {loadState === ImageLoadState.error
      ? null
      : img
    }
  </div>
}

export default WebUI({ name: 'image', defaultProps })(Image)

