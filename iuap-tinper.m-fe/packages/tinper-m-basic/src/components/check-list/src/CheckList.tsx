import React from 'react';
import { List } from '@tinper/m'
import Checkmark from '@tinper/m-icons/lib/cjs/Checkmark'
import { withNativeProps } from '@utils/NativeProps'
import { usePropsValue } from '@utils/UsePropsValue'
import { mergeProps } from '@utils/WithDefaultProps'
import { CheckListContext } from './context'
import { CheckListProps, CheckListValue } from './Types'


const defaultProps = {
  multiple: false,
  defaultValue: [],
  activeIcon: <Checkmark style={{ width: '0.44rem', height: '0.44rem' }}/>,
  clsPrefix: 'mui',
  extraAlign: 'right',
  deselectable: true
};

export const CheckList = (p: CheckListProps) => {
  const iconStyle = { color: p?.style?.['--checkicon-color'] }
  defaultProps.activeIcon = p.multiple ? <Checkmark  {...iconStyle} /> : <Checkmark style={{ width: '0.44rem', height: '0.44rem' }} {...iconStyle} />
  const props = mergeProps(defaultProps, p)

  const classPrefix = `${props.clsPrefix}-check-list`

  const [value, setValue] = usePropsValue(props)


  function check(val: CheckListValue) {
    if (props.multiple) {
      setValue([...value, val])
    } else {
      setValue([val])
    }
  }

  function uncheck(val: CheckListValue) {
    setValue(value.filter(item => item !== val))
  }

  const { activeIcon, fieldid, extra, disabled, readOnly, extraAlign, clsPrefix } =
    props;

  return (
    <CheckListContext.Provider
      value={{
        value,
        check,
        uncheck,
        activeIcon,
        extra,
        extraAlign,
        disabled,
        readOnly,
        clsPrefix,
        deselectable: props.deselectable,
        multiple: props.multiple
      }}
    >
      {withNativeProps(
        props,
        <List fieldid={fieldid} mode={props.mode} className={classPrefix}>
          {props.children}
        </List>
      )}
    </CheckListContext.Provider>
  );
}
