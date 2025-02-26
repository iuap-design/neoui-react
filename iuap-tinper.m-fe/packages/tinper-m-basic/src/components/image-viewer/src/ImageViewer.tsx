import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from 'react'
import Mask from '../../mask/src/index'
import { SafeArea } from '@tinper/m'
import { renderToContainer } from '@utils/RenderToContainer'
import { Slide } from './Slide'
import { Slides, SlidesRef } from './Slides'

import classnames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'
import { ImageViewerProps } from './iImageViewer'
import { MultiImageViewerProps } from './iMultiImageViewer'

const defaultProps = {
  maxZoom: 3,
  getContainer: null,
  visible: false,
}

const multiDefaultProps = {
  ...defaultProps,
  defaultIndex: 0,
}

export type MultiImageViewerRef = SlidesRef

function ImageView (props: ImageViewerProps) {

  const {
    clsPrefix,
    style,
    className,
    fieldid,
    visible,
    afterClose,
    image,
    onClose,
    maxZoom,
    renderFooter,
  } = props

  const _clsPrefix = `${clsPrefix}-image-viewer`

  const cls = classnames(_clsPrefix, className)


  const sty: React.CSSProperties = { ...style }

  const node = (
    <Mask
      visible={visible}
      disableBodyScroll={false}
      opacity='thick'
      afterClose={afterClose}
      destroyOnClose
      className={`${_clsPrefix}-mask`}
      fieldid={fieldid ? `${fieldid}_mask` : undefined}
    >
      <div
        className={`${cls} ${_clsPrefix}-content`}
        style={sty}
        fieldid={fieldid}
      >
        {image && (
          <Slide
            fieldid={fieldid ? `${fieldid}_slide` : undefined}
            clsPrefix={_clsPrefix}
            image={image}
            onTap={onClose}
            maxZoom={maxZoom}
          />
        )}
      </div>
      {image && (
        <div className={`${_clsPrefix}-footer`}>
          {renderFooter?.(image)}
          <SafeArea position='bottom'
            fieldid={`${fieldid}_safe_area`}
          />
        </div>
      )}
    </Mask>)

  return renderToContainer(props.getContainer, node)
}

const MultiImageView = forwardRef<
  MultiImageViewerRef,
  MultiImageViewerProps
  >((props, ref) => {

    const {
      clsPrefix,
      style,
      className,
      fieldid,
      visible,
      afterClose,
      images,
      onClose,
      maxZoom,
      renderFooter,
      getContainer
    } = props

    const _clsPrefix = `${clsPrefix}-image-viewer`

    const cls = classnames(_clsPrefix, className)


    const sty: React.CSSProperties = { ...style }

    const [index, setIndex] = useState(props.defaultIndex)

    const slidesRef = useRef<SlidesRef>(null)

    useImperativeHandle(ref, () => ({
      swipeTo: (index: number, immediate?: boolean) => {
        setIndex(index)
        slidesRef.current?.swipeTo(index, immediate)
      },
    }))

    const onSlideChange = useCallback(
      (newIndex: number) => {
        if (newIndex === index) return
        setIndex(newIndex)
        props.onIndexChange?.(newIndex)
      },
      [props.onIndexChange, index]
    )

    const node = (
      <Mask
        visible={visible}
        disableBodyScroll={false}
        opacity='thick'
        afterClose={afterClose}
        destroyOnClose
        className={`${cls}`}
        fieldid={fieldid ? `${fieldid}_mask` : undefined}
      >
        <div
          className={`${_clsPrefix}-content`}
          style={sty}
          fieldid={fieldid}
        >
          {images && (
            <Slides
              fieldid={fieldid ? `${fieldid}_slides` : undefined}
              clsPrefix={_clsPrefix}
              ref={slidesRef}
              defaultIndex={index}
              onIndexChange={onSlideChange}
              images={images}
              onTap={onClose}
              maxZoom={maxZoom}
            />
          )}
        </div>
        {images && (
          <div className={`${_clsPrefix}-footer`}>
            {renderFooter?.(images[index], index)}
            <SafeArea position='bottom' />
          </div>
        )}
      </Mask>
    )

    return renderToContainer(getContainer, node)
  });

MultiImageView.displayName = MultiImageView;

export const ImageViewer = WebUI({ name: 'imageViewer', defaultProps })(ImageView);
export const MultiImageViewer = WebUI({ name: 'multiImageViewer', defaultProps: multiDefaultProps })(MultiImageView);
