import React from 'react'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import classNames from 'classnames'
import Popup from '../../popup/src/index'
import SafeArea from '../../safe-area/src/index'
import { renderImperatively } from '@utils/RenderImperatively'
import { ActionSheetProps } from './iActionSheet'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  visible: false,
  actions: [],
  cancelText: '',
  closeOnAction: false,
  closeOnMaskClick: true,
  safeArea: true,
  destroyOnClose: false,
  forceRender: false,
}

const ActionSheet: React.FC<ActionSheetProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { styles, fieldid, clsPrefix } = props

  const _clsPrefix = `${clsPrefix}-action-sheet`

  return (
    <Popup
      visible={props.visible}
      onMaskClick={() => {
        props.onMaskClick?.()
        if (props.closeOnMaskClick) {
          props.onClose?.()
        }
      }}
      fieldid={fieldid ? fieldid + '_action_sheet' : undefined}
      afterClose={props.afterClose}
      className={classNames(`${_clsPrefix}-popup`, props.popupClassName)}
      style={props.popupStyle}
      getContainer={props.getContainer}
      destroyOnClose={props.destroyOnClose}
      forceRender={props.forceRender}
      bodyStyle={styles?.body}
      maskStyle={styles?.mask}
    >
      {withNativeProps(
        props,
        <div className={_clsPrefix} fieldid={fieldid ? fieldid + '_action_sheet' : undefined}>
          {props.extra && (
            <div className={`${_clsPrefix}-extra`} fieldid={fieldid ? fieldid + '_action_sheet_extra' : undefined}>{props.extra}</div>
          )}
          <div className={`${_clsPrefix}-button-list`} fieldid={fieldid ? fieldid + '_action_sheet_button_list' : undefined}>
            {props.actions.map((action, index) => (
              <div
                key={action.key}
                className={classNames(
                  `${_clsPrefix}-button-item-wrapper`,
                  action.className && action.className
                )}
                style={{ ...action.style }}
              >
                <a
                  className={classNames(
                    'mui-plain-anchor',
                    `${_clsPrefix}-button-item`,
                    {
                      [`${_clsPrefix}-button-item-danger`]: action.danger,
                      [`${_clsPrefix}-button-item-disabled`]: action.disabled,
                      [`${_clsPrefix}-button-item-bold`]: action.bold,
                    }
                  )}
                  fieldid={action.fieldid ? action.fieldid + '_action_sheet' : (fieldid ? fieldid + '_action_sheet_button_item_' + index : undefined)}
                  onClick={() => {
                    action.onClick?.()
                    props.onAction?.(action, index)
                    if (props.closeOnAction) {
                      props.onClose?.()
                    }
                  }}
                  role='option'
                  aria-disabled={action.disabled}
                >
                  <div className={`${_clsPrefix}-button-item-name`} fieldid={action.fieldid ? action.fieldid + '_action_sheet_name' : (fieldid ? fieldid + '_action_sheet_button_item_name_' + index : undefined)}>
                    {action.text}
                  </div>
                  {action.description && (
                    <div className={`${_clsPrefix}-button-item-description`} fieldid={action.fieldid ? action.fieldid + '_action_sheet_description' : (fieldid ? fieldid + '_action_sheet_button_item_description_' + index : undefined)}>
                      {action.description}
                    </div>
                  )}
                </a>
              </div>
            ))}
          </div>

          {props.cancelText && (
            <div
              className={`${_clsPrefix}-cancel`}
              fieldid={fieldid ? fieldid + '_action_sheet_cancel' : undefined}
              role='option'
              aria-label={props.cancelText}
            >
              <div className={`${_clsPrefix}-button-item-wrapper`}>
                <a
                  className={classNames(
                    'mui-plain-anchor',
                    `${_clsPrefix}-button-item`
                  )}
                  onClick={props.onClose}
                >
                  <div className={`${_clsPrefix}-button-item-name`}>
                    {props.cancelText}
                  </div>
                </a>
              </div>
            </div>
          )}

          {props.safeArea && <SafeArea position='bottom' />}
        </div>
      )}
    </Popup>
  )
}

export type ActionSheetShowHandler = {
  close: () => void
}

export function showActionSheet(
  props: Omit<ActionSheetProps, 'visible' | 'destroyOnClose' | 'forceRender'>
) {
  return renderImperatively(
    <ActionSheet {...props} />
  ) as ActionSheetShowHandler
}

export default WebUI({ defaultProps })(ActionSheet)