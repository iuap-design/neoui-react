import React, { useState } from 'react';
import { DatePicker, Input } from '@tinper/m';
import type { TimePickerProps } from './iTimePicker';
import { mergeProps } from '@utils/WithDefaultProps';
import { useConfig } from '@components/config-provider/src';
import Calendar from '@tinper/m-icons/lib/cjs/Calendar';
import { usePropsValue } from '@hooks/UsePropsValue';
import { formatDate, toDate } from '@components/date-picker/src/DatePickerUtils';
import { withNativeProps } from '@utils/NativeProps';
import { isNil } from 'lodash';
import { useRenderLabel } from '@components/date-time-picker/src/UseRenderLabel';

const defaultProps = {
  disabled: false,
  readOnly: false,
  use12Hours: false,
  subuitype: 'HH:mm:ss',
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  showClear: true
}

type MergeTimePickerProps = TimePickerProps & typeof defaultProps;

function TimePicker(props: TimePickerProps) {
  const { locale } = useConfig();
  const p = mergeProps(defaultProps, props) ;
  const {
    clsPrefix,
    placeholder = locale.TimePicker.placeholder,
    popTitle = locale.TimePicker.popTitle,
  } = p;
  const classPrefix = `${clsPrefix}-time-picker`;
  const [visible, setVisible] = useState(false);

  const [value, setValue] = usePropsValue({
    value: isNil(p.value) ? p.value : toDate(p.value),
    defaultValue: p.defaultValue === undefined ? null : toDate(p.defaultValue),
    // onChange: (val) => {
    //   p.onOk?.(val);
    // },
  });

  const renderLabel = useRenderLabel()

  const handleConfirm = (date: Date  | null) => {
    setVisible(false);
    setValue(date);
    p.onOk?.(date);
  };

  const handleCancel = () => {
    setVisible(false);
    p.onDismiss?.();
  };

  const handleDismiss = () => {
    setVisible(false);
    setValue(null);
    p.onClearReturn?.();
  };

  const filterValue = {
    hour: (h: number, { date }: { date: Date }) => h % p.hourStep === 0,
    minute: (m: number, { date }: { date: Date }) => m % p.minuteStep === 0,
    second: (s: number, { date }: { date: Date }) => s % p.secondStep === 0,
  };

  const precision = p.subuitype === 'HH:mm' ? 'minute' : 'second';

  const renderInput = (date: Date | string | null) => (
    <div
      className={classPrefix}
      onClick={() => setVisible(p.disabled ? false : !visible)}
    >
      <Input
        placeholder={placeholder}
        disabled={p.disabled}
        readOnly={true}
        fieldid={p.fieldid}
        value={date ? formatDate(date, p.subuitype, 'time', props.format) : ''}
        suffix={
          <Calendar
            style={{
              width: '0.44rem',
              height: '0.44rem',
            }}
          />
        }
        className={`${clsPrefix}-time-picker-input`}
      />
    </div>
  );

  if (p.disabled || p.readOnly) return withNativeProps(p, renderInput(value));

  return withNativeProps(p, (
    <div className={classPrefix}>
      <DatePicker
        title={popTitle}
        visible={visible}
        value={value}
        renderLabel={renderLabel}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onDismiss={handleDismiss}
        onClose={() => setVisible(false)}
        type="time"
        use12hours={p.use12Hours}
        filter={filterValue}
        precision={precision}
        fieldid={p.fieldid}
        disabled={p.disabled || p.readOnly}
        showClear={p.showClear}
        popupStyle={p.popupStyle}
        popupClassName={p.popupClassName}
        getContainer={p.getContainer}
      >
        {renderInput}
      </DatePicker>
    </div>
  ))
}

export default TimePicker
