/* eslint-disable react/prop-types */
import React, {ChangeEventHandler, Component, KeyboardEventHandler} from 'react';
import moment from 'moment';
// import PropTypes from 'prop-types';
import type {FocusEventHandler} from 'react';
import type { RCInputProps, RCInputState } from './iRCTimePicker';

class Input extends Component<RCInputProps, RCInputState> {

    static defaultProps = {
        placeholder: '请选择时间',
        inputReadOnly: false
    };

    constructor(props: RCInputProps) {
        super(props);
        this.state = {
            str: '',
            valueString: '',
            invalid: false
        };
    }

    private refInput!: HTMLInputElement;

    componentDidMount() {
        const {focusOnOpen, handleInputWidthChange} = this.props;
        if (focusOnOpen) {
            // Wait one frame for the panel to be positioned before focusing
            const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
            requestAnimationFrame(() => {
                this.refInput?.focus();
                this.refInput?.select();
            }); // 这个属性似乎没有暴露出去
        }
        const inputWidth = parseInt(this.refInput.getBoundingClientRect().width + '');
        handleInputWidthChange?.(inputWidth); // 获取Input的宽度，传给父组件 added by: gx
    }

    UNSAFE_componentWillReceiveProps(nextProps: RCInputProps) {
        const {locale, value, format = 'HH:mm:ss'} = nextProps;
        if (locale) {
            moment.locale(locale.lang);
        }
        this.setState({
            str: (value && value.format(format)) || '',
            invalid: false // 从panel点击过来，获得值，Invalid就是false了
        });
    }

    onInputChange: ChangeEventHandler<HTMLInputElement> = event => {
        let str = (event.target as HTMLInputElement).value;

        this.setState({
            str
        });
        const {
            format,
            hourOptions,
            minuteOptions,
            secondOptions,
            disabledHours,
            disabledMinutes,
            disabledSeconds,
            onChange,
            allowEmpty,
            value: originalValue
            // setValueString
        } = this.props;
        if (str) {
            this.setState({valueString: str});
            const value = this.getProtoValue(); // 获取原值
            const parsed = moment(str, format, true); // 现在的时间值对象
            if (!parsed.isValid()) {
                this.setState({
                    invalid: true
                });
                return;
            }
            value.hour(parsed.hour()).minute(parsed.minute()).second(parsed.second());

            // if time value not allowed, response warning.
            if (
                hourOptions.indexOf(value.hour()) < 0 ||
                minuteOptions.indexOf(value.minute()) < 0 || // 输入的不在提供的时间范围内
                secondOptions.indexOf(value.second()) < 0
            ) {
                this.setState({
                    invalid: true
                });
                return;
            }
            // setValueString && setValueString(str);
            // if time value is disabled, response warning.
            const disabledHourOptions = disabledHours();
            const disabledMinuteOptions = disabledMinutes(value.hour());
            const disabledSecondOptions = disabledSeconds(value.hour(), value.minute());
            if (
                (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0) ||
                (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0) || // 输入的在禁止的范围内
                (disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0)
            ) {
                this.setState({
                    invalid: true
                });
                return;
            }

            if (originalValue) {
                if (
                    originalValue.hour() !== value.hour() ||
                    originalValue.minute() !== value.minute() || // 如果和原来的值不同了
                    originalValue.second() !== value.second()
                ) {
                    // keep other fields for rc-calendar
                    const changedValue = originalValue.clone();
                    changedValue.hour(value.hour());
                    changedValue.minute(value.minute());
                    changedValue.second(value.second());
                    onChange(changedValue); // 重新设置value
                }
            } else {
                onChange(value); // 没有的话，直接当成value
            }
        } else if (allowEmpty) {
            this.setState({valueString: ''});
            onChange(null); // 允许为空
        } else {
            this.setState({
                invalid: true, // 不合法又不允许为空，就非法
                valueString: ''
            });
            return;
        }

        this.setState({
            invalid: false
        });
    };

    onKeyDown: KeyboardEventHandler = e => {
        const {onEsc, onKeyDown} = this.props;
        if (e.keyCode === 27 || e.keyCode === 13) {
            onEsc?.(); // 快捷键关闭
        }

        onKeyDown?.(e);
    };

    getProtoValue() {
        const {value, defaultOpenValue} = this.props;
        return ((value && moment(value)) || defaultOpenValue).clone();
    }

    onBlur: FocusEventHandler<HTMLInputElement> = e => {
        let {
            showHour,
            showMinute,
            showSecond,
            hourOptions,
            minuteOptions,
            secondOptions,
            disabledHours,
            disabledMinutes,
            disabledSeconds,
            format,
            onBlur,
            blurHandle
        } = this.props;
        let str = e.target.value || this.state.valueString;
        if (!str) {
            this.setState({
                invalid: true,
                str: ''
            });
            // onBlur?.(null);
            blurHandle?.()
            return;
        }
        const strArr = str.split(':');
        const getMaxHour = (str: string) => {
            if (isNaN(+str)) {
                return '00';
            }
            if (+str > 23) {
                return 23;
            } else {
                return str.length === 1 ? '0' + str : str;
            }
        };
        const getMaxMinSec = (str: string) => {
            if (isNaN(+str)) {
                return '00';
            }
            if (+str > 59) {
                return 59;
            } else {
                return str.length === 1 ? '0' + str : str;
            }
        };
        if (strArr.length === 1) {
            switch (str.length) {
                case 1:
                    if (showHour) {
                        str = getMaxHour(str) + ':00:00';
                    } else if (showMinute) {
                        str = '00:' + getMaxMinSec(str) + ':00';
                    } else if (showSecond) {
                        str = '00:00:' + getMaxMinSec(str);
                    }
                    break;
                case 2:
                    if (showHour) {
                        str = getMaxHour(str) + ':00:00';
                    } else if (showMinute) {
                        str = '00:' + getMaxMinSec(str) + ':00';
                    } else if (showSecond) {
                        str = '00:00:' + getMaxMinSec(str);
                    }
                    break;
                case 3:
                    if (showHour) {
                        str =
                            str.substring(0, 2) + ':' + (showMinute ? getMaxMinSec(str.substring(2, 3)) : '00') + ':00';
                    } else if (showMinute) {
                        str =
                            '00:' +
                            getMaxMinSec(str.substring(0, 2)) +
                            ':' +
                            (showSecond ? getMaxMinSec(str.substring(2, 3)) : '00');
                    } else if (showSecond) {
                        str = '00:00:' + getMaxMinSec(str.substring(0, 2));
                    }
                    break;
                case 4:
                    if (showHour) {
                        str =
                            str.substring(0, 2) + ':' + (showMinute ? getMaxMinSec(str.substring(2, 4)) : '00') + ':00';
                    } else if (showMinute) {
                        str =
                            '00:' +
                            getMaxMinSec(str.substring(0, 2)) +
                            ':' +
                            (showSecond ? getMaxMinSec(str.substring(2, 4)) : '00');
                    } else if (showSecond) {
                        str = '00:00:' + getMaxMinSec(str.substring(0, 2));
                    }
                    break;
                case 5:
                    if (showHour) {
                        str =
                            getMaxHour(str.substring(0, 2)) +
                            ':' +
                            (showMinute ? getMaxMinSec(str.substring(2, 4)) : '00') +
                            ':' +
                            (showSecond ? getMaxMinSec(str.substring(4, 5)) : '00');
                    } else if (showMinute) {
                        str =
                            '00:' +
                            getMaxMinSec(str.substring(0, 2)) +
                            ':' +
                            (showSecond ? getMaxMinSec(str.substring(2, 4)) : '00');
                    } else if (showSecond) {
                        str = '00:00:' + getMaxMinSec(str.substring(0, 2));
                    }
                    break;
                case 6:
                    if (showHour) {
                        str =
                            getMaxHour(str.substring(0, 2)) +
                            ':' +
                            (showMinute ? getMaxMinSec(str.substring(2, 4)) : '00') +
                            ':' +
                            (showSecond ? getMaxMinSec(str.substring(4, 6)) : '00');
                    } else if (showMinute) {
                        str =
                            '00:' +
                            getMaxMinSec(str.substring(0, 2)) +
                            ':' +
                            (showSecond ? getMaxMinSec(str.substring(2, 4)) : '00');
                    } else if (showSecond) {
                        str = '00:00:' + getMaxMinSec(str.substring(0, 2));
                    }
                    break;
                default:
                    this.setState({
                        invalid: true,
                        str: ''
                    });
                    // onBlur?.(null);
                    blurHandle?.()
                    return
            }
        }
        const date = moment(str, 'HH:mm:ss');
        const value = this.getProtoValue(); // 获取原值
        value.hour(date.hour()).minute(date.minute()).second(date.second());
        // if time value not allowed, response warning.
        if (
            hourOptions.indexOf(date.hour()) < 0 ||
            minuteOptions.indexOf(date.minute()) < 0 || // 输入的不在提供的时间范围内
            secondOptions.indexOf(date.second()) < 0
        ) {
            this.setState({
                str: '',
                invalid: true
            });
            // onBlur?.(null);
            blurHandle?.()
            return;
        }
        // if time value is disabled, response warning.
        const disabledHourOptions = disabledHours();
        const disabledMinuteOptions = disabledMinutes(date.hour());
        const disabledSecondOptions = disabledSeconds(date.hour(), date.minute());
        if (
            (disabledHourOptions && disabledHourOptions.indexOf(date.hour()) >= 0) ||
            (disabledMinuteOptions && disabledMinuteOptions.indexOf(date.minute()) >= 0) || // 输入的在禁止的范围内
            (disabledSecondOptions && disabledSecondOptions.indexOf(date.second()) >= 0)
        ) {
            this.setState({
                str: '',
                invalid: true
            });
            // onBlur?.(null);
            blurHandle?.()
            return;
        }
        this.setState({
            str: date.format(format),
            invalid: false
        });
        onBlur?.(date);
    }

    getInput() {
        const {autoComplete, autoFocus, prefixCls, placeholder, readOnly, onFocus, disabled, name, id, fieldid, format} = this.props;
        const {invalid, str} = this.state;
        const invalidClass = invalid ? `${prefixCls}-input-invalid` : ''; // 红色警告边框
        let newStr = str
        if (format && format.includes(' a')) {
            if (typeof newStr === 'string') {
                let newWord = newStr.split(" ")
                if (newWord[1]) {
                    let toSpa = newWord[1].toLowerCase()
                    newStr = newWord[0] + ' ' + toSpa
                }
            }
        } else if (format && format.includes(' A')) {
            if (typeof newStr === 'string') {
                let newWord = newStr.split(" ")
                if (newWord[1]) {
                    let toSpa = newWord[1].toUpperCase()
                    newStr = newWord[0] + ' ' + toSpa
                }
            }
        }

        return (
            <input
                name={name}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                className={`${prefixCls}-input ${invalidClass}`}
                disabled={disabled}
                ref={ref => {
                    this.refInput = ref as HTMLInputElement;
                }}
                id={id}
                fieldid={fieldid ? fieldid + '_input' : undefined}
                onKeyDown={this.onKeyDown}
                onFocus={onFocus}
                onBlur={this.onBlur}
                value={newStr}
                title={newStr}
                placeholder={placeholder}
                onChange={this.onInputChange}
                readOnly={!!readOnly} // 将之前Header组件的input逻辑放到这里  added by: gx
            />
        );
    }

    render() {
        const {prefixCls} = this.props;
        return <div className={`${prefixCls}-input-wrap`}>{this.getInput()}</div>;
    }
}

export default Input;
