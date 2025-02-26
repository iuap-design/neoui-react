import React from 'react'
import classNames from 'classnames'
import { Action, DialogProps } from './iDialog'
import { DialogActionButton } from './DialogActionButton'
import { Image, CenterPopup } from '@tinper/m'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  visible: false,
  actions: [] as Action[],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  getContainer: null,
}

function Dialog(props: DialogProps) {
  const {
    clsPrefix,
    fieldid,
    visible,
    afterClose,
    afterShow,
    image,
    bodyClassName,
    bodyStyle,
    header,
    title,
    content,
    footer,
    actions = [],
    onAction,
    closeOnAction,
    onClose,
    closeOnMaskClick,
    maskStyle,
    maskClassName,
    getContainer = null,
    stopPropagation = ['click'],
    disableBodyScroll,
    destroyOnClose,
    forceRender,
    className,
    style
  } = props;
  const _clsPrefix = clsPrefix + '-dialog';

  const element = (
    <div>
      {!!image && (
        <div className={`${_clsPrefix}-image-container`} fieldid={fieldid ? fieldid + '_dialog_image_container' : undefined}>
          <Image src={image} alt='dialog header image' width='100%' fieldid={fieldid ? fieldid + '_dialog_image' : undefined} />
        </div>
      )}
      {!!header && (
        <div className={`${_clsPrefix}-header`} fieldid={fieldid ? fieldid + '_dialog_header' : undefined}>
          <div className={`${_clsPrefix}-header-center`}>
            <div className={`${_clsPrefix}-header-center-c`}>{header}</div>
          </div>
        </div>
      )}
      {!!title && <div className={`${_clsPrefix}-title`} title={typeof title == 'string' ? title : undefined} fieldid={fieldid ? fieldid + '_dialog_title' : undefined}>{title}</div>}
      <div
        className={classNames(
          `${_clsPrefix}-content`,
          !content && `${_clsPrefix}-content-empty`
        )}
        style={props.testStyle}
        fieldid={fieldid ? fieldid + '_dialog_content' : undefined}
      >
        {typeof content === 'string' ? (
          <div className={`${_clsPrefix}-content-center`}>
            <div className={`${_clsPrefix}-content-center-c`}>{content}</div>
          </div>
        ) : (
          content
        )}
      </div>
      <div className={`${_clsPrefix}-footer`} fieldid={fieldid ? fieldid + '_dialog_footer' : undefined}>
        <div
          className={`${_clsPrefix}-footer-custom`}
          style={{ display: footer ? 'block' : 'none' }}
          fieldid={fieldid ? fieldid + '_dialog_footer_custom' : undefined}
        >{footer}</div>
        {!footer && actions.map((row, index) => {
          const actions = Array.isArray(row) ? row : [row]
          return (
            <div className={`${_clsPrefix}-action-row`} key={index}>
              {actions.map((action, i) => (
                <DialogActionButton
                  fieldid={fieldid ? fieldid + '_dialog_action_' + index + '_' + i : undefined}
                  clsPrefix={clsPrefix}
                  key={action.key}
                  action={action}
                  onAction={async () => {
                    await Promise.all([
                      action.onClick?.(),
                      onAction?.(action, index),
                    ])
                    if (closeOnAction) {
                      onClose?.()
                    }
                  }}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <CenterPopup
      className={classNames(`${_clsPrefix}`, className)}
      style={style}
      clsPrefix={clsPrefix}
      afterClose={afterClose}
      afterShow={afterShow}
      onMaskClick={
        closeOnMaskClick
          ? () => {
            onClose?.()
          }
          : undefined
      }
      visible={visible}
      getContainer={getContainer}
      bodyStyle={bodyStyle}
      bodyClassName={classNames(
        `${_clsPrefix}-body`,
        image && `${_clsPrefix}-with-image`,
        bodyClassName,
        content && `${_clsPrefix}-with-content`
      )}
      maskStyle={maskStyle}
      maskClassName={maskClassName}
      stopPropagation={stopPropagation}
      disableBodyScroll={disableBodyScroll}
      destroyOnClose={destroyOnClose}
      forceRender={forceRender}
      role='dialog'
      aria-label={props['aria-label']}
      fieldid={fieldid ? fieldid + '_dialog' : undefined}
    >
      {element}
    </CenterPopup>
  )
}

export default WebUI({ defaultProps })(Dialog)
