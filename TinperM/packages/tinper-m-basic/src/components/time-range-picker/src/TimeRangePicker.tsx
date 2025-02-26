import React, { CSSProperties, useState } from 'react';
import { DatePicker, Input } from '@tinper/m';
import type { TimeRangePickerProps } from './iTimeRangePicker';
import { mergeProps } from '@utils/WithDefaultProps';
import { useConfig } from '@components/config-provider/src';
import { formatDate, Precision, toDate } from '@components/date-picker/src/DatePickerUtils';
import { max, min } from 'date-fns';
import { usePropsValue } from '@hooks/UsePropsValue';
import { withNativeProps } from '@utils/NativeProps';
import { RangeDate } from '@components/date-picker/src/iDatePicker';
import { useRenderLabel } from '@components/date-time-picker/src/UseRenderLabel';


const defaultProps = {
  mode: 'day',
  fieldid: '',
  disabled: false,
  readOnly: false,
  use12Hours: false,
  showClear: true
};

function TimeRangePicker(props: TimeRangePickerProps) {
  const { locale } = useConfig();
  const p = mergeProps(defaultProps, props);
  const {
    clsPrefix,
    placeholder = locale.TimeRangePicker.placeholder,
    popTitle = locale.TimeRangePicker.popTitle,
  } = p;
  const classPrefix = `${clsPrefix}-time-range-picker`;
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<'lower' | 'upper'>('lower')
  const [value, setValue] = usePropsValue({
    value: p.value ? [toDate(p.value[0]), toDate(p.value[1])] : p.value,
    defaultValue: p.defaultValue ? [toDate(p.defaultValue[0]), toDate(p.defaultValue[1])] : p.defaultValue,
    onChange: (val) => {
      if (val?.[0] == undefined && val?.[1] == undefined) return
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

  const handleConfirm = (range: RangeDate) => {
    setVisible(false);

    setValue(range);
  };

  const handleCancel = () => {
    setVisible(false);
    p.onDismiss?.();
  };

  const handleDismiss = () => {
    setVisible(false);
    setValue([]);
    p.onClearReturn?.();
  };

  const renderRangeInput = (dateRange?: RangeDate) => {
    const dateRangeVal = dateRange ?? [];
    let start = dateRangeVal[0];
    let end = dateRangeVal[1];
    if (start && end ) {
      start =  min([start, end]);
      end = max([start, end]);
    }

    const startDateStr = (start && formatDate(start, p.mode, dateMode)) ?? undefined;
    const endDateStr = (end && formatDate(end, p.mode, dateMode)) ?? undefined;

    const [startPlaceholder, endPlaceholder] = placeholder.split('-');
    const tagProperty: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      gap: '0.38rem',
      cursor: p.disabled ? 'not-allowed' : 'pointer',
      boxSizing: 'border-box'
    };
    return (
      <div
        style={containerProperty}
        onClick={() => setVisible(p.disabled ? false : !visible)}
      >
        <Input
          disabled={p.disabled}
          readOnly={p.readOnly}
          className={`${clsPrefix}-time-range-picker-input`}
          fieldid={p.fieldid}

        />
        <div style={tagProperty} className={`${clsPrefix}-time-range-picker-input-inner`} >
          <Label label={startDateStr} onClick={() => setActive('lower')} placeholder={startPlaceholder} disabled={p.disabled} />
          <span style={sperateProperty} className={`${clsPrefix}-time-range-picker-connector`}>-</span>
          <Label label={endDateStr} onClick={() => setActive('upper')} placeholder={endPlaceholder} disabled={p.disabled} />
        </div>
      </div>
    );
  };

  if (p.disabled || p.readOnly) return withNativeProps(p, renderRangeInput(value));

  return withNativeProps(p, (
    <div className={classPrefix}>
      <DatePicker
        minuteStep={p.minuteStep}
        filter={p.filter}
        title={popTitle}
        visible={visible}
        value={value}
        renderLabel={renderLabel}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onDismiss={handleDismiss}
        onClose={() => setVisible(false)}
        min={p.minDate}
        max={p.maxDate}
        type={dateMode}
        precision={precision as Precision}
        use12hours={p.use12Hours}
        fieldid={p.fieldid}
        clsPrefix={p.clsPrefix}
        disabled={p.disabled || p.readOnly}
        range
        active={active}
        onActiveChange={setActive}
        showClear={p.showClear}
        popupStyle={p.popupStyle}
        popupClassName={p.popupClassName}
        getContainer={p.getContainer}
      >
        { renderRangeInput }
      </DatePicker>
    </div>)
  );
}

const Label = ({
  label,
  placeholder,
  disabled,
  onClick
}: {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onClick?: () => void
}) => {
  const style: CSSProperties = {
    width: '2.96rem',
    height: '0.56rem',
    background: 'var(--mui-color-border)',
    borderRadius: '0.08rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 400,
    fontSize: '0.26rem',
    color: disabled ? 'var(--mui-color-text-secondary)' : 'var(--mui-color-title-text)',
    textWrap: 'nowrap'
  };
  if (!label) style.color = 'var(--mui-color-weak)';
  return <span style={style} onClick={onClick}>{label ?? placeholder}</span>;
};

const containerProperty: CSSProperties = { position: 'relative' };



const sperateProperty: CSSProperties = { color: 'var(--mui-color-weak)' };

export default TimeRangePicker
