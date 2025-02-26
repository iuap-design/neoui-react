import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import WebUI from '@utils/UpdatePrefixs'
import { Popover } from '@tinper/m'
import { FormItemWrapperProps } from './iFormItemWrapper'
import { useIcon } from '@hooks/UseIcon';
import { useConfig } from '@components/config-provider/src/index';
import QuestionMarkCircle from '@tinper/m-icons/lib/cjs/QuestionMarkCircle'

const defaultProps = {
  splitLine: true,
  singleLine: true,
  wrapMode: 'word'
}
const FormItemWrapper: React.FC<FormItemWrapperProps> = (props) => {
  const {
    splitLine,
    singleLine,
    required,
    labelIcon,
    showExtraLabelIcon,
    showLabel = true,
    label,
    subLabel,
    labelCls,
    labelStyle,
    contentCls,
    contentStyle = {},
    wrapStyle = {},
    error,
    errorText,
    errorCls,
    children,
    onClick,
    className,
    clsPrefix,
    style,
    readOnly,
    readOnlyContent,
    showIcon = true,
    rightIcon,
    rightIconCls,
    tips,
    fieldid,
    disabled,
    wrapMode = 'word',
    ...others
  } = props;
  const { locale } = useConfig()
  const _clsPrefix = `${clsPrefix}-form-item-wrapper`

  const labelRef = useRef<HTMLDivElement>(null)
  const labelAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (labelRef.current && labelAreaRef.current) {
      // 获取元素
      const element = labelRef.current;

      // 获取元素的实际高度
      const height = element.offsetHeight;

      // 获取元素的行高
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);

      // 计算元素能容纳的行数
      const numberOfLines = Math.floor(height / lineHeight);

      // 判断文本是否超过一行
      if (numberOfLines > 1) {
        labelAreaRef.current.classList.add(`${_clsPrefix}-label-multiline`);
      } else {
        labelAreaRef.current.classList.remove(`${_clsPrefix}-label-multiline`);
      }
    }
  }, [labelRef, labelAreaRef])

  const WRAPPER_CLS = {
    LABEL: `${_clsPrefix}-label ${_clsPrefix}-label-${wrapMode}`,
    CONTENT: showLabel
      ? `${_clsPrefix}-content`
      : `${_clsPrefix}-content-no-label`,
    ICON: `${_clsPrefix}-righticon`,
    ERROR: `${_clsPrefix}-error`,
  };

  const _singleLine =
    typeof singleLine === 'boolean' ? singleLine : singleLine === 'true';

  const cls = classnames(_clsPrefix, className, {
    'single-line': _singleLine,
    'multiple-line': !_singleLine,
    [`${_clsPrefix}-split`]: splitLine,
    [`${_clsPrefix}-readonly`]: readOnly,
    [`${_clsPrefix}-disabled`]: disabled,
  });
  const _errorCls = classnames(WRAPPER_CLS.ERROR, { hidden: !error }, errorCls);
  const _labelCls = classnames(WRAPPER_CLS.LABEL, labelCls, { [`${_clsPrefix}-label-extra-icon`]: showExtraLabelIcon, });
  const _contentCls = classnames(WRAPPER_CLS.CONTENT, contentCls);
  const _rightIconCls = classnames(WRAPPER_CLS.ICON, rightIconCls);
  const getContent = () => {
    let content = children;
    if (readOnly && readOnlyContent) {
      content =
        typeof readOnlyContent === 'string' ? (
          <span
            fieldid={fieldid + '_content'}
            className="readonly-value"
          >
            {readOnlyContent}
          </span>
        ) : (
          readOnlyContent
        );
    }
    return content;
  };

  return (
    <div
      className={`${_clsPrefix}-box`}
      {...others}
      fieldid={`${fieldid}_form-item-wrapper-box`}
    >
      <div
        className={cls}
        style={{ ...style, ...wrapStyle }}
        onClick={onClick}
        fieldid={`${fieldid}_form-item-wrapper-box-content`}
      >
        {showLabel && label && (
          <div
            className={_labelCls}
            fieldid={`${fieldid}_form-item-wrapper-label-style`}
            ref={labelAreaRef}
            style={labelStyle}
          >
            {showExtraLabelIcon !== false ? useIcon({ icon: labelIcon }) : null}
            <div
              className={`${_clsPrefix}-label-main`}
              fieldid={`${fieldid}_form-item-wrapper-label-main`}
              ref={labelRef}
            >
              {label}
              {subLabel && (
                <span
                  className={`${_clsPrefix}-label-sub`}
                  fieldid={`${fieldid}_form-item-wrapper-label-sub`}
                >
                  {subLabel}
                </span>
              )}
              {required && readOnly !== true && (
                <span
                  className="required"
                  fieldid={`${fieldid}_form-item-wrapper-box-required`}
                >
                  *
                </span>
              )}
            </div>
            {tips && (
              <Popover content={tips} mode='dark' trigger='click'>
                <span
                  className={`${_clsPrefix}-label-tips`}
                  fieldid={`${fieldid}_form-item-wrapper-label-tips`}
                  onClick={e => {
                    e.preventDefault()
                  }}
                >
                  <QuestionMarkCircle />
                </span>
              </Popover>
            )}
            {tips && (
              <span
                className={`${_clsPrefix}-label-tips`}
                fieldid={`${fieldid}_form-item-wrapper-label-tips`}
              >
                {/* <Icon type="arcquestion-mark-circle" /> */}
              </span>
            )}
          </div>
        )}
        <div
          className={_contentCls}
          style={contentStyle}
          fieldid={`${fieldid}_form-item-wrapper-content`}
        >
          {getContent()}
        </div>
        {showIcon && rightIcon && (
          <span
            className={_rightIconCls}
            fieldid={`${fieldid}_form-item-wrapper-box-icon`}
          >
            {readOnly ? null : rightIcon}
          </span>
        )}
      </div>
      <div
        className={_errorCls}
        fieldid={`${fieldid}_form-item-wrapper-box-error`}
      >
        {errorText || locale.FormItemWrapper.errorText}
      </div>
    </div>
  );
}

export default WebUI({ defaultProps })(FormItemWrapper)
