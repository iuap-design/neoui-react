import { useConfig } from '@components/config-provider/src'
import { generateColumnsExtend, useColumnsExtend } from '@components/picker-view/src/ColumnsExtend'
import { PickerActions, PickerRef } from '@components/picker/src/iPicker'
import { defaultRenderLabel } from '@components/picker/src/PickerUtils'
import { usePropsValue } from '@hooks/UsePropsValue'
import { Button, PickerViewProps, Popup, SafeArea } from '@tinper/m'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import { useMemoizedFn } from 'tne-fw-fe/hooks'
import classNames from 'classnames'
import React, { FC, forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import { PickerProps, PickerValue, } from './index'

const defaultProps = {
  defaultValue: [],
  closeOnMaskClick: true,
  renderLabel: defaultRenderLabel,
  destroyOnClose: false,
  forceRender: false,
  clsPrefix: 'mui'
}
const PickerFactory = (View: FC<PickerViewProps>) =>
  memo(forwardRef<PickerRef, PickerProps>((p, ref) => {
    const { locale } = useConfig()
    const props = mergeProps(
      defaultProps,
      {
        confirmText: locale.Common.confirm,
        cancelText: locale.Common.cancel,
        clearAndReturnText: locale.DateTimePicker.clearAndReturn
      },
      p
    )



    const { fieldid = '', clsPrefix: _clsPrefix } = props
    const clsPrefix = `${_clsPrefix}-picker`
    const [visible, setVisible] = usePropsValue({
      value: props.visible,
      defaultValue: false,
      onChange: v => {
        if (v === false) {
          props.onClose?.()
        }
      },
    })
    const actions: PickerActions = {
      toggle: () => {
        setVisible(v => !v)
      },
      open: () => {
        setVisible(true)
      },
      close: () => {
        setVisible(false)
      },
    }

    useImperativeHandle(ref, () => actions)
    const [value, setValue] = usePropsValue({
      ...props,
      onChange: val => {
        const extend = generateColumnsExtend(props.columns, val)
        props.onConfirm?.(val, extend)
      },
    })

    const extend = useColumnsExtend(props.columns, value)

    const [innerValue, setInnerValue] = useState<PickerValue[]>(value)
    useEffect(() => {
      if (innerValue !== value) {
        setInnerValue(value)
      }
    }, [visible, value])
    // useEffect(() => {
    //   if (!visible) {
    //     setInnerValue(value)
    //   }
    // }, [value])

    const onChange = useMemoizedFn((val, ext) => {
      setInnerValue(val)
      if (visible) {
        props.onSelect?.(val, ext)
      }
    })



    const PickerHeader = () =>
      (
        <div className={`${clsPrefix}-header-title`}>{props.title}</div>

      )

    const PickerFooter = () =>


      (
        <div className={`${clsPrefix}-footer`}>
          {props.showClear && <Button
            onClick={() => {
              setVisible(false)
              setValue([])
              props.onDismiss?.()

            }}
            role="button"
            fieldid={`${fieldid}-clear-cancel`}
            size='middle'
            className="clear-return-button"
            mode="text"
          >
            {props.clearAndReturnText}
          </Button>}
          <div className={`${clsPrefix}-footer-buttons`}>
            <Button
              size='middle'
              mode="default"

              onClick={() => {
                props.onCancel?.()
                setVisible(false)
              }}
              role="button"
              fieldid={`${fieldid}-cancel`}
            >
              {props.cancelText}
            </Button>
            <Button
              onClick={() => {
                if (props.loading) return
                setValue(innerValue, true)
                setVisible(false)
              }}
              role="button"
              size='middle'
              mode="primary"
              fieldid={`${fieldid}-confirm`}
              disabled={props.loading || props.disableSubmit}

            >
              {props.confirmText}
            </Button>
          </div>
        </div>
      )


    const pickerElement = withNativeProps(
      props,
      <div className={clsPrefix} fieldid={fieldid}>
        <div className={`${clsPrefix}-header`}>
          <PickerHeader />
        </div>
        <div className={`${clsPrefix}-body`}>
          <View
            loading={props.loading}
            loadingContent={props.loadingContent}
            columns={props.columns}
            renderLabel={props.renderLabel}
            value={innerValue}
            mouseWheel={props.mouseWheel}
            onChange={onChange}
          />
        </div>
        <PickerFooter />
      </div>
    )

    const popupElement = (
      <Popup
        style={props.popupStyle}
        className={classNames(`${clsPrefix}-popup`, props.popupClassName)}
        visible={visible}
        position='bottom'
        fieldid={fieldid}
        hideTitleOnNoClose
        onMaskClick={() => {
          if (!props.closeOnMaskClick) return
          props.onCancel?.()
          setVisible(false)
        }}
        getContainer={props.getContainer}
        showCloseButton
        onClose={() => {
          setVisible(false)
        }}
        destroyOnClose={props.destroyOnClose}
        afterShow={props.afterShow}
        afterClose={props.afterClose}
        onClick={props.onClick}
        forceRender={props.forceRender}
        stopPropagation={props.stopPropagation}
      >
        {pickerElement}
        <SafeArea position='bottom' />
      </Popup>
    )

    return (
      <>
        {popupElement}
        {props.children?.(extend.items, actions)}
      </>
    )
  }))


PickerFactory.displayName = 'PickerFactory'
export default PickerFactory
