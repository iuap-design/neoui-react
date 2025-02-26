import React, { useState } from 'react';
import { DatePicker, Input } from '@tinper/m';
import type { DateTimePickerProps } from './iDateTimePicker';
import { mergeProps } from '@utils/WithDefaultProps';
import WebUI from '@utils/UpdatePrefixs';
import { useConfig } from '@components/config-provider/src';
import Calendar from '@tinper/m-icons/lib/cjs/Calendar';
import { formatDate, Precision, toDate } from '@components/date-picker/src/DatePickerUtils';
import { usePropsValue } from '@hooks/UsePropsValue';
import { withNativeProps } from '@utils/NativeProps';
import { isNil } from 'lodash';
import { useRenderLabel } from '@components/date-time-picker/src/UseRenderLabel';

const defaultProps = {
  mode: 'day',
  fieldid: '',
  disabled: false,
  readOnly: false,
  use12Hours: false,
};

function DateTimePicker(props: DateTimePickerProps) {
  const { locale } = useConfig();
  const p = mergeProps(defaultProps, props);
  const {
    clsPrefix,
    placeholder = locale.DateTimePicker.placeholder,
    popTitle = locale.DateTimePicker.popTitle,
  } = p;
  const classPrefix = `${clsPrefix}-date-time-picker`;
  const [visible, setVisible] = useState(false);
  const [value, setValue] = usePropsValue({
    value: isNil(p.value) ? p.value : toDate(p.value),
    defaultValue: p.defaultValue === undefined ? null : toDate(p.defaultValue),
    onChange: (val) => {
      p.onOk?.(val);
    },
  });


  const renderLabel = useRenderLabel()

  let precision = p.mode;

  const dateMode = ['time', 'hms'].includes(p.mode) ? 'time' : 'date';
  if (dateMode === 'time') {
    precision = 'minute';
    if (p.mode === 'hms') {
      precision = 'second';
    }
  }

  const handleConfirm = (date: Date  | null) => {
    setVisible(false);
    setValue(date);
    p.onChange?.(date)
    // p.onOk?.(date);
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
        value={formatDate(date, p.mode, 'date', props.format )}
        suffix={
          <Calendar
            style={{ width: '0.44rem', height: '0.44rem' }}
          />
        }
        className={`${clsPrefix}-date-time-picker-input`}
      />
    </div>
  );

  if (p.disabled || p.readOnly) return withNativeProps(p, renderInput(value));

  return withNativeProps(
    p,
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
        min={p.minDate ?? undefined}
        max={p.maxDate ?? undefined}
        type={dateMode}
        precision={precision as Precision}
        use12hours={p.use12Hours}
        fieldid={p.fieldid}
        clsPrefix={p.clsPrefix}
        showClear
        disabled={p.disabled || p.readOnly}
        range={false}
        minuteStep={props.minuteStep}
        getContainer={p.getContainer}
      >
        {renderInput}
      </DatePicker>
    </div>
  );
}

export default WebUI({})(DateTimePicker);
