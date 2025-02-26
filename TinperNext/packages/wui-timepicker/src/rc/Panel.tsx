import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
// import PropTypes from 'prop-types';
import Combobox from './Combobox';
import type { Moment } from 'moment';
import type { AmpmType, RCPanelProps, RCPanelState, RCSelectType } from './iRCTimePicker';
import Button from './../../../wui-button/src';

// function noop() {}

function generateOptions(length: number, disabledOptions: number[], hideDisabledOptions: boolean, step = 1) {
    const arr = [];
    for (let value = 0; value < length; value += +step) {
        if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
            arr.push(value);
        }
    }
    return arr;
}

function toNearestValidTime(time: Moment, hourOptions: number[], minuteOptions: number[], secondOptions: number[]) {
    const hour = hourOptions.slice().sort((a, b) => Math.abs(time.hour() - a) - Math.abs(time.hour() - b))[0];
    const minute = minuteOptions.slice().sort((a, b) => Math.abs(time.minute() - a) - Math.abs(time.minute() - b))[0];
    const second = secondOptions.slice().sort((a, b) => Math.abs(time.second() - a) - Math.abs(time.second() - b))[0];
    return moment(`${hour}:${minute}:${second}`, 'HH:mm:ss');
}

class Panel extends Component<RCPanelProps, RCPanelState> {
    static defaultProps = {
        prefixCls: 'rc-time-picker-panel',
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
        defaultOpenValue: moment(),
        use12Hours: false
        // inputReadOnly: false
    };

    constructor(props: RCPanelProps) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: RCPanelProps) {
        const value = nextProps.value;
        if (value) {
            this.setState({
                value
            });
        }
    }

    onChange = (newValue: Moment) => {
        const { onChange } = this.props;
        this.setState({ value: newValue });
        onChange?.(newValue);
    };

    onAmPmChange = (ampm: AmpmType) => {
        const { onAmPmChange } = this.props;
        onAmPmChange?.(ampm);
    };

    onCurrentSelectPanelChange = (currentSelectPanel: RCSelectType) => {
        this.setState({ currentSelectPanel });
    };

    disabledHours = () => {
        const { use12Hours, disabledHours } = this.props;
        let disabledOptions = disabledHours();
        if (use12Hours && Array.isArray(disabledOptions)) {
            if (this.isAM()) {
                disabledOptions = disabledOptions.filter(h => h < 12).map(h => (h === 0 ? 12 : h));
            } else {
                disabledOptions = disabledOptions.map(h => (h === 12 ? 12 : h - 12));
            }
        }
        return disabledOptions;
    };

    /* // https://github.com/ant-design/ant-design/issues/5829
    close() {
        const {onEsc} = this.props;
        onEsc();
    } */

    isAM() {
        const { defaultOpenValue } = this.props;
        const { value } = this.state;
        const realValue = value || defaultOpenValue;
        return realValue.hour() >= 0 && realValue.hour() < 12;
    }

    handleNowClick = () => {
        const { onOpenChange } = this.props;
        this.onChange(moment());
        onOpenChange?.(false);
    };

    handleOkClick = () => {
        const { onOpenChange } = this.props;
        onOpenChange?.(false);
    };

    renderNowNode = () => {
        const { prefixCls, locale, fieldid } = this.props;
        let { now, ok } = (locale && (locale.langMap || locale[locale.lang])) || {};

        return (
            <div className={classNames(`${prefixCls}-footer`)} fieldid={fieldid ? `${fieldid}_footer` : undefined} >
                <span className={classNames(`${prefixCls}-now`)} fieldid={fieldid ? `${fieldid}_now` : undefined} onClick={this.handleNowClick}>
                    {now}
                </span>
                <Button type='primary' className={classNames(`${prefixCls}-ok`)} fieldid={fieldid ? `${fieldid}_ok` : undefined} onClick={this.handleOkClick}>
                    {ok}
                </Button>
            </div>
        );
    };

    render() {
        const {
            prefixCls,
            fieldid,
            className,
            disabledMinutes,
            disabledSeconds,
            hideDisabledOptions,
            showHour,
            showMinute,
            showSecond,
            showNow,
            format,
            defaultOpenValue,
            renderExtraFooter,
            onClick,
            use12Hours,
            hourStep,
            minuteStep,
            secondStep,
            width,
            dir
        } = this.props;
        const { value } = this.state;
        const disabledHourOptions = this.disabledHours();
        const disabledMinuteOptions = disabledMinutes(value ? value.hour() : null);
        const disabledSecondOptions = disabledSeconds(value ? value.hour() : null, value ? value.minute() : null);
        const hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions, hourStep);
        const minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions, minuteStep);
        const secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions, secondStep);

        const validDefaultOpenValue = toNearestValidTime(defaultOpenValue, hourOptions, minuteOptions, secondOptions);

        return (
            <div
                className={classNames({
                    [`${prefixCls}-inner`]: true,
                    [`${className}`]: !!className
                })}
                fieldid={fieldid ? `${fieldid}_inner` : undefined}
                onClick={onClick}
            >
                <Combobox
                    prefixCls={prefixCls}
                    value={value}
                    defaultOpenValue={validDefaultOpenValue}
                    format={format}
                    onChange={this.onChange}
                    onAmPmChange={this.onAmPmChange}
                    showHour={showHour}
                    showMinute={showMinute}
                    showSecond={showSecond}
                    hourOptions={hourOptions}
                    minuteOptions={minuteOptions}
                    secondOptions={secondOptions}
                    disabledHours={this.disabledHours}
                    disabledMinutes={disabledMinutes}
                    disabledSeconds={disabledSeconds}
                    onCurrentSelectPanelChange={this.onCurrentSelectPanelChange}
                    use12Hours={use12Hours}
                    isAM={this.isAM()}
                    width={width}
                    dir={dir}
                />
                {showNow ? this.renderNowNode() : null}
                {renderExtraFooter?.(this)}
            </div>
        );
    }
}

export default Panel;
