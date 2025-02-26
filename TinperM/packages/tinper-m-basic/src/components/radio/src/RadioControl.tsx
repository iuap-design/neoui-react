import React, { useState, useEffect } from 'react';
import { clone } from 'lodash';
import { Popup, Empty, Button } from '@tinper/m';
import Wrapper from '@components/form-item-wrapper/src';
import classnames from 'classnames';
import WebUI from '@utils/UpdatePrefixs';
import { RadioControlProps, dataType } from './iRadio'
import { useConfig } from '@components/config-provider/src'
import { SelectedIcon } from './CircleSelectedIcon';
import { CheckIcon } from './CheckIcon'
import ArrowIosRight from '@tinper/m-icons/lib/cjs/ArrowIosRight'

import './Radio.less'

// 转换state中存储的已选择数据的结构
const getValueFromDataType: (data: {
  [key: string]: dataType;
}) => [string[], dataType[]] = (data) => {
  const _selectedValue: string[] = [];
  const _selectedData: dataType[] = [];
  Object.keys(data).forEach((item) => {
    const _value = data[item];
    _value && _selectedValue.push(_value.value);
    _value && _selectedData.push(_value);
  });
  return [_selectedValue, _selectedData];
};

const defaultProps = { mode: 'list' };

function RadioControl(props: RadioControlProps) {
  const {
    dataSource, value, clsPrefix, disabled, onChange, multiple: isMultiple, onClick,
    onSelect, itemsStyle, fieldid, title, readOnly, placeholder, mode = 'list', multiple,
    showCloseButton, className, contentStyle
  } = props;
  let initialData = {};
  if (props.mandatorySelection && !isMultiple && dataSource && dataSource.length > 0 && value === undefined) {
    for (let i = 0; i < dataSource.length; i++) {
      if (!dataSource[i].disabled) {
        initialData = { ...dataSource[i] };
        break;
      }
    }
  }
  const [open, setOpen] = useState(false);
  const [_checkedData, setCheckedData] = useState({});
  const [_checkedDataTemp, setCheckedDataTemp] = useState({});

  const _clsPrefix = `${clsPrefix}-radio-control`;
  const { locale } = useConfig();

  const prevDataSourceRef = React.useRef<any[] | null>(null);
  const prevValueRef = React.useRef<any[] | null>(null);

  useEffect(() => {
    if (JSON.stringify(prevDataSourceRef.current) !== JSON.stringify(props.dataSource) || prevValueRef.current !== props.value) {
      prevDataSourceRef.current = props.dataSource;
      prevValueRef.current = props.value;
      let newValue = value;
      if (!newValue || newValue.length === 0) {
        newValue = [''];
      }
      const checkedDataObj: { [key: string]: dataType } = {};
      dataSource?.forEach((item) => {
        if (newValue?.includes(item.value)) {
          checkedDataObj[item.value] = item;
        }
      });
      if (!isMultiple && props.mandatorySelection && checkedDataObj && value === undefined) {
        const a = initialData['value'];
        if (a !== undefined) setCheckedData({ [a]: initialData });
        setCheckedDataTemp(checkedDataObj);
      } else {
        setCheckedData(checkedDataObj);
        setCheckedDataTemp(checkedDataObj);
      }
    }
  }, [props.dataSource, props.value]);

  useEffect(() => {
    const withCheckedValue = props.value && value;
    let clearMultiple = false;
    let clearSingle = false;
    let newMultiple = false;
    let newSingle = false;

    if (withCheckedValue) {
      // 多选置空
      clearMultiple = props.value?.length !== 0 && value?.length === 0;
      // 单选置空
      clearSingle = props.value?.length !== 0 && props.value?.[0] !== '' && value.length !== 0 && value[0] === '';
      // 多选新值
      newMultiple = props.value?.length === 0 && value.length !== 0;
      // 单选新值
      newSingle = props.value?.length !== 0 && props.value?.[0] === '' && value.length !== 0 && value[0] !== '';
    }

    if (clearMultiple || clearSingle) {
      setCheckedData({});
      setCheckedDataTemp({});
    }

    if (newMultiple || newSingle) {
      let newValue = value;
      if (!newValue || newValue.length === 0) {
        newValue = [''];
      }
      const checkedDataObj: { [key: string]: dataType } = {};
      dataSource?.forEach((item) => {
        if (newValue?.includes(item.value)) {
          checkedDataObj[item.value] = item;
        }
      });
      setCheckedData(checkedDataObj);
      setCheckedDataTemp(checkedDataObj);
    }
  }, [value, props.value, dataSource])

  const onClickItem = (
    data: dataType,
    e?: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    canMultiple?: boolean
  ) => {
    e?.stopPropagation();
    if (disabled) {
      return;
    }
    let currentData: { [key: string]: dataType } = canMultiple
      ? clone(_checkedDataTemp)
      : clone(_checkedData);
    if (isMultiple) {
      if (currentData[data.value]) {
        delete currentData[data.value];
      } else {
        currentData = { ...currentData, [data.value]: data };
      }
    } else {
      if (currentData[data.value]) {
        !props.mandatorySelection && delete currentData[data.value];
      } else {
        currentData = { [data.value]: data };
      }
    }
    if (canMultiple) {
      setCheckedDataTemp(currentData);
    } else {
      setCheckedData(currentData);
    }
    onClick?.(data);
    onSelect?.(data);
    const _valueArr = getValueFromDataType(currentData);
    !canMultiple && onChange && onChange(_valueArr[0], _valueArr[1]);
  };

  const onConfirm = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onCloseModal(e, true);
    const valueArr = getValueFromDataType(_checkedDataTemp);
    setCheckedData(_checkedDataTemp);
    onChange?.(valueArr[0], valueArr[1]);
  };

  const onReset = () => {
    const res: { [key: string]: dataType } = {};
    setCheckedDataTemp(res);
  };

  const renderRadioList = (selectData?: dataType[]) => {
    if (!selectData || !Array.isArray(selectData)) return null;
    const TextString = {
      confirm: locale.Common.confirm,
      reset: locale.Radio.reset,
    };
    const _selectedValue = getValueFromDataType(_checkedDataTemp)[0];
    const _list = selectData.map((item, index) => {
      const _checked = _selectedValue.includes(item.value);
      const cls = classnames(`${_clsPrefix}-list-content-item`,
        { [`${_clsPrefix}-list-disabled`]: disabled || item.disabled, },
        { [`${_clsPrefix}-list-checked`]: _checked });
      const onClickWrapper = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>
      ) => {
        e?.stopPropagation();
        if (item.disabled) return;
        if (isMultiple) {
          onClickItem(item, e, true);
        } else {
          onClickItem(item, e);
          onCloseModal(e);
        }
      };
      const listItem = (
        <div className={`${_clsPrefix}-item`}
          style={{ display: 'inline-flex', alignItems: 'center' }}
          fieldid={fieldid ? fieldid + '_radio_control_item_' + index : undefined}
        >
          <div className={`${_clsPrefix}-icon-wrapper`}>
            {_checked ? (
              isMultiple ? (
                <SelectedIcon
                  className={`${_clsPrefix}-icon ${_clsPrefix}-icon-selected`}
                />
              ) : (
                <CheckIcon
                  className={`${_clsPrefix}-icon ${_clsPrefix}-icon-selected`}
                  iconColor="var(--color-bg-selector-selected)"
                />
              )
            ) : null}</div>
          {item.text}
        </div>
      );
      return (
        <Wrapper
          className={cls}
          showLabel={false}
          key={index}
          labelStyle={{ fontSize: '0.3rem' }}
          onClick={onClickWrapper}
          singleLine
          style={itemsStyle}
        >
          {listItem}
        </Wrapper>
      );
    });

    const selectListContent = classnames(`${_clsPrefix}-list`, { [`${_clsPrefix}-list-multiple`]: isMultiple && !title })

    return (
      <div className={selectListContent}>
        <div className={`${_clsPrefix}-list-content`}>
          {_list.length > 0 ? _list : <Empty />}
        </div>
        {isMultiple ? (
          <div className={`${_clsPrefix}-list-footer`} fieldid={fieldid ? fieldid + '_radio_control_list_footer' : undefined}>
            <Button
              mode="default"
              onClick={onReset}
              className={`${_clsPrefix}-list-footer-reset`}
              fieldid={fieldid ? `${fieldid}_radio_control_list_footer_reset` : undefined}
            >
              {TextString.reset}
            </Button>
            <Button
              mode="primary"
              onClick={onConfirm}
              className={`${_clsPrefix}-list-footer-confirm`}
              fieldid={fieldid ? `${fieldid}_radio_control_list_footer_confirm` : undefined}
            >
              {TextString.confirm}
            </Button>
          </div>
        ) : null}
      </div>
    );
  };

  const renderSelection = (selectData?: dataType[], selectedValue?: string[]) => {
      if (!selectData || !Array.isArray(selectData)) return null;
    const _selectedValue =
      selectedValue ?? getValueFromDataType(_checkedData)[0];
    return selectData.map((item, index) => {
      const cls = classnames(
        `${_clsPrefix}-tag`,
        { [`${_clsPrefix}-tag-active`]: _selectedValue.includes(item.value) },
        {
          [`${_clsPrefix}-tag-disabled`]:
            readOnly || disabled || item.disabled,
        }
      );
      return (
        <div
          className={cls}
          key={index}
          onClick={() => {
            !(readOnly || item.disabled) && onClickItem(item);
          }}
          style={itemsStyle}
          title={item.text}
          fieldid={fieldid ? fieldid + '_radio_control_tag_' + index : undefined}
        >
          <div className={`${_clsPrefix}-tag-text`}>{item.text}</div>
        </div>
      );
    });
  };

  const getDisplayFromProps = (dataSource?: dataType[], value?: string[]) => {
    if (!value || value.length === 0) return null;
    const res: string[] = [];
    dataSource?.forEach((item) => {
      if (value.includes(item.value)) {
        res.push(item.text);
      }
    });
    return res.join(',');
  };

  const renderContent = (
    dataSource?: dataType[],
    value?: string[],
  ) => {
    const displayValue = getValueFromDataType(_checkedData)[1]
      .map((item) => item.text)
      .join('，');
    const propsDisplayValue = getDisplayFromProps(dataSource, value);
    const fontCls = classnames(`${_clsPrefix}-items-selected-value`, {
      [`${_clsPrefix}-items-selected-value-read-only`]: readOnly,
      [`${_clsPrefix}-items-selected-value-disabled`]: !readOnly && disabled,
    });
    return (
      <>
        <span className={fontCls}>{propsDisplayValue || displayValue}</span>
      </>
    );
  };

  const onOpenModal = () => {
    setOpen(true);
    setCheckedDataTemp(_checkedData);
  };

  const onCloseModal = (
    e?: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    change?: boolean
  ) => {
    e?.stopPropagation();
    if (change) {
      setOpen(false);
      setCheckedData(_checkedDataTemp);
    } else {
      setOpen(false);
    }
  };

  const onClickIcon = (e: { stopPropagation: () => void; }) => {
    e?.stopPropagation();
    onOpenModal();
  };

  const renderPlaceHolder = () => {
    const hasValue = value?.length;
    const isEdit = !disabled && !readOnly;
    return !hasValue &&
      isEdit &&
      mode === 'list' &&
      placeholder &&
      !Object.keys(_checkedData).length ? (
      <div className="placeholder">{placeholder}</div>
    ) : null;
  };

  let radioArr: any;
  switch (mode) {
    case 'tag': {
      radioArr = renderSelection(dataSource, value);
      break;
    }
    case 'list': {
      radioArr = renderContent(dataSource, value);
      break;
    }
    default: {
      radioArr = renderSelection(dataSource, value);
      break;
    }
  }
  const cls = classnames(className, _clsPrefix, {
    [`${_clsPrefix}-tag-wrapper`]: mode === 'tag',
    [`${_clsPrefix}-list-wrapper`]: mode === 'list',
  });

  return (
    <>
      <Popup
        visible={open}
        onMaskClick={onCloseModal}
        className={classnames('radio-popup', isMultiple ? 'radio-popup-multiple' : '')}
        popupTitle={props.title}
        onClose={() => setOpen(false)}
        showCloseButton={multiple ? true : showCloseButton}
        fieldid={fieldid ? fieldid + '_radio_control' : undefined}
        safeAreaBottom={props.safeAreaBottom}
        getContainer={props.getContainer}
      >
        {renderRadioList(dataSource)}
      </Popup>
      <div
        className={cls}
        fieldid={fieldid}
        onClick={
          !(disabled || readOnly || mode === 'tag')
            ? onClickIcon
            : undefined
        }
        style={{ ...props.style }}
      >
        <div className={`${_clsPrefix}-items`} style={contentStyle} fieldid={fieldid ? fieldid + '_radio_control_items' : undefined}>
          {renderPlaceHolder()}
          {radioArr}
        </div>
        {
          !disabled &&
          !readOnly &&
          mode === 'list' && (
            <div className={`${_clsPrefix}-icon-right-wrapper`}>
              <ArrowIosRight
                fieldid={fieldid ? fieldid + '_radio_control_icon_right' : undefined}
                style={{ width: '0.44rem', height: '0.44rem' }}
                className={`${_clsPrefix}-icon-right`}
              />
            </div>
          )
        }
      </div>
    </>
  );
}

export default WebUI({ defaultProps })(RadioControl)
