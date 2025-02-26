import React from 'react'
import emptyImage from '@assets/empty.svg'
import busyImage from '@assets/busy.svg'
import blankImage from '@assets/blank.svg'
import { useConfig } from '@components/config-provider/src/index';
import { EmptyProps } from './iEmpty'
import { withNativeProps } from '@utils/NativeProps'
import classNames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'

const Empty: React.FC<EmptyProps> = (props) => {

  const { locale } = useConfig()
  const { mode= 'noData', message, style, fieldid = '', image, imageStyle, clsPrefix, className } = props
  const _clsPrefix = `${clsPrefix}-empty`
  const data = [
    { value: 'noData', text: locale.Empty.noData, src: emptyImage },
    { value: 'noCollect', text: locale.Empty.noCollect, src: blankImage },
    { value: 'noResult', text: locale.Empty.noResult, src: busyImage }
  ]
  let msg
  let src
  data.filter((item) => {
    if (item.value === mode) {
      msg = item.text
      src = image || item.src
    }
  })
  const imageNode =
    typeof src === 'string' ? (
      <img
        className={`${_clsPrefix}-image`}
        style={imageStyle}
        src={src}
        alt='empty'
        fieldid={`${fieldid}_image`}
      />
    ) : (
      src
    )
  const description = message == '' ? '' : message || msg
  return withNativeProps(
    props,
    <div className={classNames(_clsPrefix)} fieldid={fieldid} style={style}>
      <div className={`${_clsPrefix}-image-container`}>{imageNode}</div>
      {description && (
        <div className={classNames(`${_clsPrefix}-description`)} fieldid={`${fieldid}_description`}>
          {description}
        </div>
      )}
    </div>
  )
}

export default WebUI({})(Empty)
