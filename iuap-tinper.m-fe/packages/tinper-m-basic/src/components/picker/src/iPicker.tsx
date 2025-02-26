import { PickerColumn, PickerColumnItem, PickerValue, PickerValueExtend } from '@tinper/m';
import { CSSProperties, ReactNode } from 'react';
import { PopupProps } from '@components/popup/src';
import { NativeProps } from '@utils/NativeProps';

export type PickerActions = {
  open: () => void
  close: () => void
  toggle: () => void
}
export type PickerRef = PickerActions


export type PickerProps = {
  columns: PickerColumn[] | ((value: PickerValue[]) => PickerColumn[])
  value?: PickerValue[]
  defaultValue?: PickerValue[]
  loading?: boolean
  loadingContent?: ReactNode
  onSelect?: (value: PickerValue[], extend: PickerValueExtend) => void
  onConfirm?: (value: PickerValue[], extend: PickerValueExtend) => void
  onCancel?: () => void
  onClose?: () => void
  closeOnMaskClick?: boolean
  visible?: boolean
  title?: ReactNode
  confirmText?: ReactNode
  cancelText?: ReactNode
  clearAndReturnText?: ReactNode
  disableSubmit?: boolean

  children?: (
    items: (PickerColumnItem | null)[],
    actions: PickerActions
  ) => ReactNode
  renderLabel?: (item: PickerColumnItem) => ReactNode
  mouseWheel?: boolean
  popupClassName?: string
  popupStyle?: CSSProperties
  showClear?: boolean
  onDismiss?: () => void
  fieldid?: string;
  clsPrefix?: string;

} & Pick<
  PopupProps,
  | 'getContainer'
  | 'afterShow'
  | 'afterClose'
  | 'onClick'
  | 'stopPropagation'
  | 'forceRender'
  | 'destroyOnClose'
> &
  NativeProps<
    | '--header-button-font-size'
    | '--title-font-size'
    | '--item-font-size'
    | '--item-height'

    | '--panel-border-radius'
    | '--panel-bg-color'
    | '--panel-border-style'
    | '--cell-border-color'
    | '--cell-bg-color-selected'
    | '--button-confirm-color-text'
    | '--button-cancel-color-text'
    | '--cell-text-color'
    | '--cell-selected-text-color'
    | '--title-text-color'
    | '--cell-font-size'
    | '--cell-selected-font-size'
    | '--cell-font-weight'
    | '--cell-selected-font-weight'
    | '--title-font-weight'
    | '--title-height'
  >


