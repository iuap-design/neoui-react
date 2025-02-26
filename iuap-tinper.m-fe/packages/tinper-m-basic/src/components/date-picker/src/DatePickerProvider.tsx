import React, { createContext, PropsWithChildren, useContext } from 'react';
import type { DatePickerProps, RangeDate } from '@components/date-picker/src/iDatePicker';

type DatePickerProviderProps = {
  classPrefix: string,
  rangeInputValue: RangeDate,
  active: 'lower' | 'upper',
  setRangeValue: (val: RangeDate) => void,
  onActiveChange: (val: 'lower' | 'upper') => void,
} & Pick<DatePickerProps, 'precision' | 'type' | 'range'>

const PickerContext = createContext<DatePickerProviderProps | null>(null)

export const DatePickerProvider = (props: PropsWithChildren<DatePickerProviderProps>) => (
  <PickerContext.Provider value={props}>
    {props.children}
  </PickerContext.Provider>

);

export const useDatePicker = () => {
  const object = useContext(PickerContext)
  if (!object) { throw new Error('useDatePicker must be used within a Provider') }
  return object;
}

