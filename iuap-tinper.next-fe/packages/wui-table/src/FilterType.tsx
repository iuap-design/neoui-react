/*
 * @Author: Mr.mjc
 * @Date: 2022-06-27 19:02:37
 * @LastEditors: MJC
 * @LastEditTime: 2024-09-10 16:53:26
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/FilterType.tsx
 */
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import omit from "omit.js"
import DatePicker from '../../wui-datepicker/src';
import TimePicker from '../../wui-timepicker/src';
// import zhCN from '../../wui-datepicker/src/locale/zh_CN';
import InputNumber from '../../wui-input-number/src';
import Input from '../../wui-input/src';
import Select from '../../wui-select/src';
import Switch from '../../wui-switch/src/index'
import FilterDropDown from './FilterDropDown';
import { IFilterTypeProps, IFilterTypeState } from './iTable';
import { InputNumberDefaultProps } from '../../wui-input-number/src/iInputNumber';
import { InputProps } from '../../wui-input/src/iInput';
import { SelectProps } from '../../wui-select/src/iSelect';
import { DatePickerProps, RangePickerProps } from '../../wui-datepicker/src/iPicker';
import { TimePickerProps } from '../../wui-timepicker/src/iTimePicker';
import { SwitchProps } from '../../wui-switch/src/iSwitch';

// @ts-ignore
const {RangePicker, YearPicker, MonthPicker, WeekPicker} = DatePicker;

// const propTypes = {
//     filterDropdown: PropTypes.string,
//     filterDropdownType: PropTypes.string,
//     onFilterClear: PropTypes.func,
//     onFilterChange: PropTypes.func,
//     onChange: PropTypes.func,
//     onSelectDropdown: PropTypes.func,
//     filterInputNumberOptions: PropTypes.any,
//     filterDropdownIncludeKeys: PropTypes.string,
//     locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     rendertype: PropTypes.string,
//     // Switch: PropTypes.bool, //哪里的用处？
//     dataIndex: PropTypes.number,
//     format: PropTypes.any,
// };

class FilterType extends Component<IFilterTypeProps, IFilterTypeState> {
	static defaultProps: { filterDropdown: 'show'; };
	controlValue: string;
	controlCondition: string;
	constructor(props:IFilterTypeProps) {
	    super(props);
	    this.state = {
	        value: "",
	        text: "",
	        selectValue: "",
	        dateValue: "",
	        open: false,
	        condition: props.filterDropdownType == 'string' ? 'LIKE' : 'EQ',
	        number: 0,
	        timeOpen: false
	    }
	    const { filterDropdownOptions } = props;
	    this.controlValue = filterDropdownOptions?.value || '';
	    this.controlCondition = filterDropdownOptions?.conditionValue || (props.filterDropdownType == 'string' ? 'LIKE' : 'EQ');
	}

	UNSAFE_componentWillReceiveProps(nextProps: Readonly<IFilterTypeProps>): void {
	    const { filterDropdownOptions } = nextProps;
	    if (filterDropdownOptions?.value != this.props.filterDropdownOptions?.value) {
	        this.controlValue = filterDropdownOptions?.value || '';
	    }
	    if (filterDropdownOptions?.conditionValue != this.props.filterDropdownOptions?.conditionValue) {
	        this.controlCondition = filterDropdownOptions?.conditionValue || (nextProps.filterDropdownType == 'string' ? 'LIKE' : 'EQ')
	    }
	}


	/**
	 * 清除过滤条件
	 *
	 */
	clearFilter = () => {
	    let {onFilterClear, dataIndex} = this.props;
	    if (this.state.value !== "") {
	        this.setState({
	            value: "", // 清空值
	            condition: this.props.filterDropdownType == 'string' ? 'LIKE' : 'EQ'// 切回默认查询条件
	        }, () => {
	            // 调用清除方法参数为当前字段的field
	            onFilterClear && dataIndex && onFilterClear(dataIndex);
	        });
	    }
	}

	/**
	 * 设置输入文本的值
	 *
	 */
	changeText = (val: string) => {
	    // let {onFilterChange, dataIndex} = this.props;
	    let {onFilterChange, dataIndex, filterDropdownOptions} = this.props;
	    const { onChange } = filterDropdownOptions || {};
	    if (onChange) {
	        this.controlValue = val;
	        onChange && onChange(dataIndex, this.controlValue, this.controlCondition);
	    } else {
	        this.setState({
	            value: val
	        }, () => {
	            onFilterChange && onFilterChange(dataIndex, val, this.state.condition);
	        });
	    }
	}

	/**
	 * 输入框回车执行回调
	 *
	 */
	changeTextCall = (e: React.KeyboardEvent<HTMLInputElement>) => {
	    let {onFilterChange, dataIndex, filterDropdownOptions} = this.props;
	    const { onChange } = filterDropdownOptions || {};
	    if (e.keyCode == 13) {
	        // (e.target as HTMLInputElement).value !== "" && onFilterChange && onFilterChange(dataIndex, (e.target as HTMLInputElement).value, this.state.condition);
	        if (onChange) {
	            this.controlValue = (e.target as HTMLInputElement).value;
	            onChange && onChange(dataIndex, this.controlValue, this.controlCondition);
	        } else {
	            (e.target as HTMLInputElement).value !== "" && onFilterChange && onFilterChange(dataIndex, (e.target as HTMLInputElement).value, this.state.condition);
	        }
	    }
	}
	/**
	 * 更改修改值
	 *
	 */
	// changeValue = () => {
	//     this.setState({
	//         value: ""
	//     });
	// }
	/**
	 * 下拉条件的回调
	 *
	 * @param {*} key 字段
	 * @param {*} value 值1,2,3...6
	 */
	onSelectDropdown = (item: Record<string, any>) => {
	    let {onFilterChange, dataIndex, filterDropdownOptions} = this.props;
	    const { onChange } = filterDropdownOptions || {};
	    if (onChange) {
	        this.controlCondition = item.key;
	        onChange && onChange(dataIndex, this.controlValue, this.controlCondition);
	    } else {
	        this.setState({
	            condition: item.key
	        }, () => {
	            this.state.value !== "" && onFilterChange && onFilterChange(dataIndex, this.state.value, this.state.condition);
	        });
	    }
	}

	/**
	 * 修改数值型的值
	 *
	 */
	changeNumber = (value: string) => {
	    let {onFilterChange, dataIndex, filterDropdownOptions} = this.props;
	    const { onChange } = filterDropdownOptions || {};
	    if (onChange) {
	        this.controlValue = value;
	        onChange && onChange(dataIndex, this.controlValue, this.controlCondition);
	    } else {
	        this.setState({
	            value
	        }, () => {
	            onFilterChange && onFilterChange(dataIndex, value, this.state.condition);
	        });
	    }

	}
	// // 清除数值
	// clearNumber = () => {
	//     let {onChange} = this.props;
	//     onChange && onChange("");
	//     this.setState({
	//         value: ""
	//     });
	// }

	// // 失去焦点后执行函数
	// changeTextCallBlur = (val: string) => {
	//     let {onChange} = this.props;
	//     onChange && onChange(val);
	// }
	// 设置下拉值
	changeSelect = (value: string) => {
	    let {onFilterChange, dataIndex, filterDropdownOptions} = this.props;
	    const { onChange } = filterDropdownOptions || {};
	    if (onChange) {
	        this.controlValue = value;
	        onChange && onChange(dataIndex, this.controlValue, this.controlCondition);
	    } else {
	        if (onFilterChange) {
	            onFilterChange(dataIndex, value, this.state.condition);
	            this.setState({
	                value
	            });
	        }
	    }

	}
	// 清除下拉值
	// clearSelectValue = () => {
	//     this.setState({
	//         selectValue: ""
	//     }, () => {
	//         this.changeSelect("");
	//     });
	// }
	// 清除日期值
	// clearDateValue = () => {
	//     this.setState({
	//         dateValue: ""
	//     }, () => {
	//         this.changeDate("");
	//     });
	// }
	// 设置日期值
	changeDate = (value: any) => {
	    let {onFilterChange, dataIndex, filterDropdownOptions} = this.props;
	    const { onChange } = filterDropdownOptions || {};
	    if (onChange) {
	        this.controlValue = value;
	        onChange && onChange(dataIndex, this.controlValue, this.controlCondition);
	        this.setState({
	            open: false
	        });
	    } else {
	        if (onFilterChange) {
	            onFilterChange(dataIndex, value, this.state.condition);
	            this.setState({
	                value,
	                open: false
	            });
	        }
	    }
	}
	// 设置时间值
	// @ts-ignore 函数参数校验
	changeTime = (time: any, timeString: string) => {
	    let {onFilterChange, dataIndex, filterDropdownOptions} = this.props;

	    const { onChange } = filterDropdownOptions || {};
	    if (onChange) {
	        this.controlValue = timeString;
	        onChange && onChange(dataIndex, this.controlValue, this.controlCondition);
	        this.setState({
	            timeOpen: false
	        });
	    } else {
	        if (onFilterChange) {
	            onFilterChange(dataIndex, timeString, this.state.condition);
	            this.setState({
	                value: timeString,
	                timeOpen: false
	            });
	        }
	    }

	}
	// 组件渲染
	/**
	 * 根据不同的类型生成对应的组件类型包含一些参数的适应
	 *
	 * @param {*} rendertype 参数类型，包括['text','dropdown','date','dateyear','datemonth','dateweek',daterange','number']
	 * @returns
	 */
	renderControl = (rendertype: string) => {
	    let {
	        filterDropdownOptions,
	        filterInputNumberOptions,
	        filterDropdownIncludeKeys,
	        dataIndex,
	        filterDropdown,
	        filterDropdownType,
	        format,
	        className,
	        onChange,
	        onSelectDropdown,
	        clsPrefix,
	        locale,
	        fieldid,
	        dir: direction
	    } = this.props;
	    const showTime = true;
	    let fieldIdAttr = fieldid === undefined ? {} : {fieldid: `${fieldid}-${rendertype}`};
	    switch (rendertype) {
	    case 'text':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <Input
	                value={this.state.value}
	                className={className}
	                onKeyDown={this.changeTextCall}
	                dir={direction}
	                {...fieldIdAttr}
	                {...filterDropdownOptions as Partial<InputProps>}
	                    onChange={this.changeText}
	                // onBlur={this.changeTextCallBlur}
	            />
	            <FilterDropDown
	                locale={locale}
	                dir={direction}
	                dataIndex={dataIndex}
	                dataText={this.state.value}
	                onSelectDropdown={this.onSelectDropdown}
	                onClickClear={this.clearFilter}
	                isShowClear={this.state.value}
	                isShowCondition={filterDropdown}
	                filterDropdownType={filterDropdownType}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	                    {...fieldIdAttr}
	            />
	        </div>
	    case 'number':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <InputNumber
	                className={className}
	                value={this.state.value}
	                iconStyle="one"
	                    dir={direction}
	                    {...fieldIdAttr}
	                {...filterDropdownOptions as Partial<InputNumberDefaultProps>}
	                {...(filterInputNumberOptions as Partial<InputNumberDefaultProps>)}
	                    onChange={this.changeNumber}
	            />
	            <FilterDropDown
	                locale={locale}
	                dir={direction}
	                dataIndex={dataIndex}
	                dataText={this.state.value}
	                onSelectDropdown={this.onSelectDropdown}
	                onClickClear={this.clearFilter}
	                isShowClear={Number(this.state.value) != 0}
	                isShowCondition={filterDropdown}
	                filterDropdownType={filterDropdownType}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	                    {...fieldIdAttr}
	            />
	        </div>
	    case 'dropdown':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <Select
	                    {...this.props}
	                    locale={this.props.locale as string}
	                    dataIndex={this.props.dataIndex as number}
	                    size="md"
	                    dir={direction}
	                value={this.state.value}
	                // onChange={this.changeSelect}
	                    {...fieldIdAttr}
	                    {...filterDropdownOptions as Partial<SelectProps>}
	                    onChange={this.changeSelect}
	            /><FilterDropDown
	                locale={locale}
	                    dir={direction}
	                dataIndex={dataIndex}
	                dataText={this.state.value}
	                onSelectDropdown={this.onSelectDropdown}
	                onClickClear={this.clearFilter}
	                isShowCondition={filterDropdown}
	                isShowClear={this.state.value}
	                filterDropdownType={filterDropdownType}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	                    {...fieldIdAttr}
	            />
	            </div>
	    case 'date':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <DatePicker
	                {...this.props}
	                value={this.state.value}
	                open={this.state.open}
	                format={format}
	                locale={locale as string}
	                    dir={direction}
	                    {...fieldIdAttr}
	                {...filterDropdownOptions as Partial<DatePickerProps>}
	                    onChange={this.changeDate}
	            /><FilterDropDown
	                locale={locale}
	                dir={direction}
	                dataIndex={dataIndex}
	                dataText={this.state.value}
	                onSelectDropdown={this.onSelectDropdown}
	                onClickClear={this.clearFilter}
	                isShowCondition={filterDropdown}
	                isShowClear={this.state.value}
	                filterDropdownType={filterDropdownType}
	                    {...fieldIdAttr}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	            />
	        </div>
	    case 'dateyear':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <YearPicker
	                {...this.props}
	                value={this.state.value}
	                open={this.state.open}
	                format={format}
	                locale={locale as string}
	                    dir={direction}
	                    {...fieldIdAttr}
	                {...filterDropdownOptions as Partial<DatePickerProps>}
	                    onChange={this.changeDate}
	            /><FilterDropDown
	                locale={locale}
	                    dir={direction}
	                dataIndex={dataIndex}
	                dataText={this.state.value}
	                onSelectDropdown={this.onSelectDropdown}
	                onClickClear={this.clearFilter}
	                isShowCondition={filterDropdown}
	                isShowClear={this.state.value}
	                filterDropdownType={filterDropdownType}
	                    {...fieldIdAttr}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	            />
	        </div>
	    case 'datemonth':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <MonthPicker
	                {...this.props}
	                value={this.state.value}
	                open={this.state.open}
	                format={format}
	                locale={locale as string}
	                    direction={direction}
	                    {...fieldIdAttr}
	                {...filterDropdownOptions as Partial<DatePickerProps>}
	                    onChange={this.changeDate}
	            /><FilterDropDown
	                locale={locale}
	                    dir={direction}
	                dataIndex={dataIndex}
	                dataText={this.state.value}
	                onSelectDropdown={this.onSelectDropdown}
	                onClickClear={this.clearFilter}
	                isShowCondition={filterDropdown}
	                isShowClear={this.state.value}
	                filterDropdownType={filterDropdownType}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	                    {...fieldIdAttr}
	            />
	        </div>
	    case 'dateweek':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <WeekPicker
	                {...this.props}
	                value={this.state.value}
	                open={this.state.open}
	                format={format}
	                locale={locale as string}
	                    direction={direction}
	                    {...fieldIdAttr}
	                {...filterDropdownOptions as Partial<DatePickerProps>}
	                    onChange={this.changeDate}
	            /><FilterDropDown
	                locale={locale}
	                    dir={direction}
	                dataIndex={dataIndex}
	                dataText={this.state.value}
	                onSelectDropdown={this.onSelectDropdown}
	                onClickClear={this.clearFilter}
	                isShowCondition={filterDropdown}
	                isShowClear={this.state.value}
	                filterDropdownType={filterDropdownType}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	                    {...fieldIdAttr}
	            />
	        </div>
	    case 'daterange':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <RangePicker
	                {...this.props}
	                value={this.state.value}
	                open={this.state.open}
	                format={format}
	                showTime={showTime as any}
	                locale={locale as string}
	                    direction={direction}
	                placeholder={'开始 ~ 结束'}
	                dateInputPlaceholder={['开始', '结束']}
	                allowClear
	                    {...fieldIdAttr}
	                {...filterDropdownOptions as Partial<RangePickerProps>}
	                    onChange={this.changeDate}
	            /><FilterDropDown
	                locale={locale}
	                    dir={direction}
	                dataIndex={dataIndex}
	                dataText={this.state.value}
	                onSelectDropdown={this.onSelectDropdown}
	                onClickClear={this.clearFilter}
	                isShowCondition={filterDropdown}
	                isShowClear={this.state.value}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	                    {...fieldIdAttr}
	            />
	        </div>
	    case 'time':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <TimePicker
	                {...omit(this.props, ['clsPrefix'])}
	                value={this.state.value}
	                // open={this.state.timeOpen}
	                // onOpen={() => this.setState({timeOpen: true})}
	                format={format}
	                locale={locale as string}
	                    dir={direction}
	                    {...fieldIdAttr}
	                {...filterDropdownOptions as Partial<TimePickerProps>}
	                    onChange={this.changeTime}
	            /><FilterDropDown
	                locale={locale}
	                    dir={direction}
	                dataIndex={dataIndex}
	                dataText={this.state.value}
	                onSelectDropdown={this.onSelectDropdown}
	                onClickClear={this.clearFilter}
	                isShowCondition={filterDropdown}
	                isShowClear={this.state.value}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	                    {...fieldIdAttr}
	            />
	        </div>
	    case 'bool':
	        return <div className={`${clsPrefix} filter-wrap`}>
	            <Switch
	                className={className}
	                onChange={onChange}
	                    dir={direction}
	                    {...fieldIdAttr}
	                {...filterDropdownOptions as Partial<SwitchProps>}

	            />
	            <FilterDropDown locale={locale}
	                    dir={direction}
	                onSelectDropdown={onSelectDropdown}
	                filterDropdownIncludeKeys={filterDropdownIncludeKeys}
	                    conditionValue={filterDropdownOptions?.conditionValue || this.controlCondition}
	                    {...fieldIdAttr}
	            />
	        </div>
	    default:
	        return <div></div>;
	    }

	}

	render() {
	    let {rendertype} = this.props;
	    return (
	        <div data-filter-type='filterContext'>{this.renderControl(rendertype)}</div>
	    );
	}
}

// FilterType.propTypes = propTypes;
// FilterType.defaultProps = {
//     filterDropdown: 'show'
// }
export default FilterType;
