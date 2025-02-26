import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Select from './Select';
import type {RCComboboxProps, SelectHandler, RCSelectOption, RCSelectType, AmpmType} from './iRCTimePicker';

const formatOption = (option: number, disabledOptions: number[]) => {
    let value = `${option}`;
    if (option < 10) {
        value = `0${option}`;
    }

    let disabled = false;
    if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
        disabled = true;
    }

    return {
        value,
        disabled
    };
};

const _MIN_COLUMN_WIDTH = 48 // UE标准：时分秒am列最小宽度

class Combobox extends Component<RCComboboxProps, {columnWidth: number}> {
    constructor(props: RCComboboxProps) {
        super(props);
        this.state = {
            columnWidth: _MIN_COLUMN_WIDTH // 新增宽度状态 added by: gx
        };
    }

    /* static propTypes = {
        format: PropTypes.string,
        defaultOpenValue: PropTypes.object,
        prefixCls: PropTypes.string,
        value: PropTypes.object,
        onChange: PropTypes.func,
        onAmPmChange: PropTypes.func,
        showHour: PropTypes.bool,
        showMinute: PropTypes.bool,
        showSecond: PropTypes.bool,
        hourOptions: PropTypes.array,
        minuteOptions: PropTypes.array,
        secondOptions: PropTypes.array,
        disabledHours: PropTypes.func,
        disabledMinutes: PropTypes.func,
        disabledSeconds: PropTypes.func,
        onCurrentSelectPanelChange: PropTypes.func,
        use12Hours: PropTypes.bool,
        isAM: PropTypes.bool,
        width: PropTypes.number
    }; */

    componentDidMount() {
        // 根据Input的宽度计算每一个列的基本宽度 added by: gx
        const {showHour, showMinute, showSecond, use12Hours, width} = this.props;
        const columnNum = [showHour, showMinute, showSecond, use12Hours].filter(val => val).length;
        const baseWidth = width && parseInt((width / columnNum) + '') >= _MIN_COLUMN_WIDTH ? parseInt((width / columnNum) + '') : _MIN_COLUMN_WIDTH; // TODOS: 最后一列的宽度，用总宽度减去其他列的宽度计算,最小宽带应不小于_MIN_COLUMN_WIDTH_，否则会遮挡数字
        const baseMaxWidth = baseWidth < 48 ? baseWidth : 48; // TODOS: 最大宽度限制，防止日期框特别宽的情况下，面板特别大
        this.setState({
            columnWidth: baseMaxWidth
        });
    }

    onItemChange: SelectHandler = (type, itemValue) => {
        const {onChange, defaultOpenValue, use12Hours, value: propValue, isAM, onAmPmChange} = this.props;
        const value = (propValue || defaultOpenValue).clone();

        if (type === 'hour') {
            if (use12Hours) {
                if (isAM) {
                    value.hour(+itemValue % 12);
                } else {
                    value.hour((+itemValue % 12) + 12);
                }
            } else {
                value.hour(+itemValue);
            }
        } else if (type === 'minute') {
            value.minute(+itemValue);
        } else if (type === 'ampm') {
            const ampm = itemValue.toUpperCase() as AmpmType;
            if (use12Hours) {
                if (ampm === 'PM' && value.hour() < 12) {
                    value.hour((value.hour() % 12) + 12);
                }

                if (ampm === 'AM') {
                    if (value.hour() >= 12) {
                        value.hour(value.hour() - 12);
                    }
                }
            }
            onAmPmChange?.(ampm);
        } else {
            value.second(+itemValue);
        }
        onChange(value);
    };

    onEnterSelectPanel = (range: RCSelectType) => {
        const {onCurrentSelectPanelChange} = this.props;
        onCurrentSelectPanelChange(range);
    };

    getHourSelect(hour: number) {
        const {prefixCls, hourOptions, disabledHours, showHour, use12Hours} = this.props;
        const {columnWidth} = this.state;
        if (!showHour) {
            return null;
        }
        const disabledOptions = disabledHours();
        let hourOptionsAdj;
        let hourAdj;
        if (use12Hours) {
            hourOptionsAdj = [12].concat(hourOptions.filter(h => h < 12 && h > 0));
            hourAdj = hour % 12 || 12;
        } else {
            hourOptionsAdj = hourOptions;
            hourAdj = hour;
        }

        return (
            <Select
                prefixCls={prefixCls}
                width={columnWidth} // 将计算出的宽度，赋予每一个列的Select组件 added by: gx
                options={hourOptionsAdj.map(option => formatOption(option, disabledOptions))}
                selectedIndex={hourOptionsAdj.indexOf(hourAdj)}
                type='hour'
                onSelect={this.onItemChange}
                onMouseEnter={() => this.onEnterSelectPanel('hour')}
            />
        );
    }

    getMinuteSelect(minute: number) {
        const {prefixCls, minuteOptions, disabledMinutes, defaultOpenValue, showMinute, value: propValue} = this.props;
        const {columnWidth} = this.state;
        if (!showMinute) {
            return null;
        }
        const value = propValue || defaultOpenValue;
        const disabledOptions = disabledMinutes(value.hour());

        return (
            <Select
                prefixCls={prefixCls}
                width={columnWidth}
                options={minuteOptions.map(option => formatOption(option, disabledOptions))}
                selectedIndex={minuteOptions.indexOf(minute)}
                type='minute'
                onSelect={this.onItemChange}
                onMouseEnter={() => this.onEnterSelectPanel('minute')}
            />
        );
    }

    getSecondSelect(second: number) {
        const {prefixCls, secondOptions, disabledSeconds, showSecond, defaultOpenValue, value: propValue} = this.props;
        const {columnWidth} = this.state;
        if (!showSecond) {
            return null;
        }
        const value = propValue || defaultOpenValue;
        const disabledOptions = disabledSeconds(value.hour(), value.minute());

        return (
            <Select
                prefixCls={prefixCls}
                width={columnWidth}
                options={secondOptions.map(option => formatOption(option, disabledOptions))}
                selectedIndex={secondOptions.indexOf(second)}
                type='second'
                onSelect={this.onItemChange}
                onMouseEnter={() => this.onEnterSelectPanel('second')}
            />
        );
    }

    getAMPMSelect() {
        const {prefixCls, use12Hours, format, isAM} = this.props;
        if (!use12Hours) {
            return null;
        }

        const aMPMOptions: RCSelectOption[] = ['am', 'pm'] // If format has A char, then we should uppercase AM/PM
            .map(c => (format.match(/\sA/) ? c.toUpperCase() : c))
            .map(c => ({value: c}));

        const selected = isAM ? 0 : 1;
        const {columnWidth} = this.state;
        return (
            <Select
                prefixCls={prefixCls}
                width={columnWidth}
                options={aMPMOptions}
                selectedIndex={selected}
                type='ampm'
                onSelect={this.onItemChange}
                onMouseEnter={() => this.onEnterSelectPanel('ampm')}
            />
        );
    }

    render() {
        const {prefixCls, defaultOpenValue, value: propValue, dir} = this.props;
        const value = propValue || defaultOpenValue;
        return (
            <div className={`${prefixCls}-combobox ${dir === 'rtl' ? `${prefixCls}-combobox-rtl` : ""}`}>
                {this.getHourSelect(value.hour())}
                {this.getMinuteSelect(value.minute())}
                {this.getSecondSelect(value.second())}
                {this.getAMPMSelect()}
            </div>
        );
    }
}

export default Combobox;
