import { NativeProps } from '@utils/NativeProps'

export interface SafeAreaProps extends NativeProps {
  position: 'top' | 'bottom',
  fieldid?: string,
  clsPrefix?: string,
}
