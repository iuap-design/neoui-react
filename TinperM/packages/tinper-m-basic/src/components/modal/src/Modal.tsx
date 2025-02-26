import React from 'react'
import classNames from 'classnames'
import { ModalActionButton } from './ModalActionButton'
import { Image, CenterPopup } from '@tinper/m'
import { ModalProps, Action } from './iModal'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  visible: false,
  actions: [] as Action[],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  showCloseButton: false,
  getContainer: null,
}

function Modal(props: ModalProps) {
  const {
    clsPrefix,
    fieldid,
    bodyClassName,
    actions = [],
    image,
    bodyStyle,
    showCloseButton,
    closeOnMaskClick,
    onClose,
    header,
    title,
    content,
    footer,
    onAction,
    closeOnAction,
    stopPropagation = ['click'],
    visible,
    maskStyle,
    maskClassName,
    getContainer = null,
    afterClose,
    afterShow,
    destroyOnClose,
    disableBodyScroll,
    className,
    style,
    forceRender
  } = props;
  const _clsPrefix = clsPrefix + '-modal';

  const element = (
    <div>
      {!!image && (
        <div className={`${_clsPrefix}-image-container`} fieldid={fieldid ? fieldid + '_modal_image_container' : undefined}>
          <Image src={image} alt='modal header image' width='100%' fieldid={fieldid ? fieldid + '_modal_image' : undefined}/>
        </div>
      )}
      {!!header && (
        <div className={`${_clsPrefix}-header`} fieldid={fieldid ? fieldid + '_modal_header' : undefined}>
          <div className={`${_clsPrefix}-header-center`}>
            <div className={`${_clsPrefix}-header-center-c`}>{header}</div>
          </div>
        </div>
      )}
      {!!title && <div className={`${_clsPrefix}-title`} title={typeof title == 'string' ? title : undefined}  fieldid={fieldid ? fieldid + '_modal_title' : undefined}>{title}</div>}
      <div className={`${_clsPrefix}-content`} fieldid={fieldid ? fieldid + '_modal_content' : undefined}>
        {typeof content === 'string' ? (
          <div className={`${_clsPrefix}-content-center`}>
            <div className={`${_clsPrefix}-content-center-c`}>{content}</div>
          </div>
        ) : (
          content
        )}
      </div>
      <div className={classNames(
        `${_clsPrefix}-footer`,
        actions.length === 0 && `${_clsPrefix}-footer-empty`
      )} fieldid={fieldid ? fieldid + '_modal_footer' : undefined}>
        <div className={classNames(
          `${_clsPrefix}-footer-custom`,
          actions.length === 0 && `${_clsPrefix}-footer-empty-custom`
        )} fieldid={fieldid ? fieldid + '_modal_footer_custom' : undefined} style={{ display: footer ? 'block' : 'none' }}>{footer}</div>
        {!footer && actions.map((action, index) => (
          <ModalActionButton
            fieldid={fieldid ? fieldid + '_modal_action' + index : undefined}
            key={action.key}
            clsPrefix={clsPrefix}
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
    </div>
  )

  return (
    <CenterPopup
      className={classNames(`${_clsPrefix}`, className)}
      clsPrefix={clsPrefix}
      style={style}
      afterClose={afterClose}
      afterShow={afterShow}
      showCloseButton={showCloseButton}
      closeOnMaskClick={closeOnMaskClick}
      onClose={onClose}
      visible={visible}
      getContainer={getContainer}
      bodyStyle={bodyStyle}
      bodyClassName={classNames(
        `${_clsPrefix}-body`,
        props.image && `${_clsPrefix}-with-image`,
        bodyClassName,
        content && `${_clsPrefix}-with-content`
      )}
      maskStyle={maskStyle}
      maskClassName={maskClassName}
      stopPropagation={stopPropagation}
      disableBodyScroll={disableBodyScroll}
      destroyOnClose={destroyOnClose}
      forceRender={forceRender}
      fieldid={fieldid ? fieldid + '_modal' : undefined}
    >
      {element}
    </CenterPopup>
  )
}

export default WebUI({ defaultProps })(Modal)
