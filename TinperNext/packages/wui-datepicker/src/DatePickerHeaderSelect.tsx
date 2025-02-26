import moment from 'moment';
import React, { Component } from 'react';
import Icon from '../../wui-icon/src';
import { _PREFIX_CLS } from './DatePicker';

class DatePickerHeaderSelect extends Component<any, any> {
    changeYear?: number;
    yearUl?: HTMLDivElement | null;
    monthUl?: HTMLDivElement | null;
    headerNode?: any;
    constructor(props: any) {
        super(props);
        this.state = {
            diffValue: [0, 0],
            selectYear: new Date().getFullYear(),
            selectMonth: new Date().getMonth() + 1,
            maskShow: false,
            activeYearNum: 0,
            activeMonthNum: 0,
            currentYear: 0,
            currentMonth: 0
        };
        this.changeYear = new Date().getFullYear();
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        let {picker} = this.props;
        if ('value' in nextProps && !('valueLeft' in nextProps) && nextProps.value != '') {
            if (!picker || picker === 'date' || picker === 'week') {
                if (nextProps.value == '' || nextProps.value == undefined) {
                    this.setState({
                        selectYear: new Date().getFullYear(),
                        selectMonth: new Date().getMonth() + 1
                    });
                } else {
                    let dateArr = nextProps?.value?.split(/\s+/);
                    if (parseInt(dateArr[1]) === 12) {
                        this.setState({
                            selectYear: parseInt(dateArr[0]) + 1,
                            selectMonth: 1
                        });
                        this.changeYear = parseInt(dateArr[0]) + 1;
                    } else {
                        this.setState({
                            selectYear: parseInt(dateArr[0]),
                            selectMonth: parseInt(dateArr[1]) + 1
                        });
                        this.changeYear = parseInt(dateArr[0]);
                    }
                }
            } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
                this.setState({
                    selectYear: parseInt(nextProps.value),
                    selectMonth: 0
                });
            } else if (picker === 'year') {
                this.setState({
                    selectYear: parseInt(nextProps.value),
                    selectMonth: 0
                });
            }
        }
        if ('valueLeft' in nextProps && !('value' in nextProps) && nextProps.valueLeft != '') {
            if (!picker || picker === 'date' || picker === 'week') {
                if (nextProps.valueLeft == '' || nextProps.valueLeft == undefined) {
                    this.setState({
                        selectYear: new Date().getFullYear(),
                        selectMonth: new Date().getMonth() + 1
                    });
                } else {
                    let dateArr = nextProps?.valueLeft?.split(/\s+/);
                    if (parseInt(dateArr[1]) === 1) {
                        this.setState({
                            selectYear: parseInt(dateArr[0]) - 1,
                            selectMonth: 12
                        });
                    } else {
                        this.setState({
                            selectYear: parseInt(dateArr[0]),
                            selectMonth: parseInt(dateArr[1]) - 1
                        });
                    }
                }
            } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
                this.setState({
                    selectYear: parseInt(nextProps.valueLeft),
                    selectMonth: 0
                });
            } else if (picker === 'year') {
                this.setState({
                    selectYear: parseInt(nextProps.valueLeft),
                    selectMonth: 0
                });
            }
        }
    }

    inputBlur = (val: boolean) => {
        this.setState({
            maskShow: val
        });
    };

    cascaderChange = (val: any, flag: string) => {
        // 选择cascader之后，联动日历面板
        let {picker, getDiffValueHandle, position} = this.props
        let differenceYear = 0
        let differenceMonth = 0
        if (!picker || picker === 'date' || picker === 'week') {
            differenceYear = parseInt(val[0]) - this.state.currentYear
            differenceMonth = parseInt(val[1]) - parseInt(this.state.currentMonth)
            if (flag && flag === 'monthFlag') {
                differenceYear = 0
            } else if (flag && flag === 'yearFlag') {
                differenceMonth = 0
            }
            this.setState(
                {
                    selectYear: parseInt(val[0]),
                    selectMonth: parseInt(val[1])
                },
                () => {
                    getDiffValueHandle?.({
                        value: [differenceYear, differenceMonth],
                        val: parseInt(val[0]) + '年' + ' ' + parseInt(val[1]) + '月',
                        ismask: this.state.maskShow,
                        position,
                        flag
                    })
                }
            )
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            differenceYear = parseInt(val[0]) - this.state.currentYear
            differenceMonth = 0
            this.setState(
                {
                    selectYear: parseInt(val[0])
                },
                () => {
                    getDiffValueHandle?.({
                        value: [differenceYear, differenceMonth],
                        val: parseInt(val[0]) + '年',
                        ismask: this.state.maskShow,
                        position
                    })
                }
            )
        } else if (picker === 'year') {
            let currentYear = parseInt(this.state.currentYear)
            differenceYear = (parseInt(val[0].slice(0, 4)) - currentYear) / 10
            differenceMonth = 0
            this.setState(
                {
                    selectYear: parseInt(val[0])
                },
                () => {
                    getDiffValueHandle?.({
                        value: [differenceYear, differenceMonth],
                        val: val[0],
                        ismask: this.state.maskShow,
                        position
                    })
                }
            )
        }
        this.setState({
            diffValue: [differenceYear, differenceMonth] // 联动选择值之后让日历面板跳转到相应的年月，传入@tinper/rc-picker
        })
    }

    // 点击年份
    onChangeYear = (val: string, index: number) => {
        let {picker} = this.props;
        if (!picker || picker === 'date' || picker === 'week') {
            this.setState({
                selectYear: parseInt(val),
                currentYear: parseInt(val)
            });
            this.changeYear = parseInt(val);
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            this.setState({
                maskShow: false,
                selectYear: parseInt(val)
            });
        } else if (picker === 'year') {
            this.setState({
                maskShow: false,
                selectYear: val
            });
        }
        this.setState({
            activeYearNum: index
        });
        let newArr = [val, this.state.selectMonth];
        this.cascaderChange(newArr, 'yearFlag');
    };
    // 点击月份
    // @ts-ignore
    onChangeMonth = (monthValue: string, index: number) => {
        let {picker} = this.props;
        this.setState({
            maskShow: false,
            selectMonth: index + 1,
            activeMonthNum: index
        });
        let newArr = null;
        if (!picker || picker === 'date' || picker === 'week') {
            let headernode = parseInt(
                this.headerNode?.parentNode.parentNode.querySelector(`.${_PREFIX_CLS}-year-btn`)?.textContent
            );
            newArr = [headernode, index + 1];
        } else {
            newArr = [this.changeYear, index + 1];
        }
        this.cascaderChange(newArr, 'monthFlag');
    };

    clickValue = (e: any) => {
        let {picker, onPanelshow, lang, position, hiddenHandleSelect, defaultValue} = this.props;
        this.setState({maskShow: !this.state.maskShow});
        let options = this.getOptions();
        const parentNode = e.target.parentNode.parentNode
        let currentYear = parseInt(
            parentNode.querySelector(`.${_PREFIX_CLS}-year-btn`)?.textContent
        );
        let currentMonth = parentNode.querySelector(`.${_PREFIX_CLS}-month-btn`)?.textContent;
        options.map((item, index) => {
            if (picker === 'year') {
                // picker为年时以10年为单位
                let currentYearRang =
                    parentNode.querySelector(`.${_PREFIX_CLS}-decade-btn`).textContent;
                if (item.label === currentYearRang) {
                    this.setState({
                        activeYearNum: index
                    });
                }
            } else {
                if (parseInt(item.label) === currentYear) {
                    this.setState({
                        activeYearNum: index
                    });
                }
            }
        });
        moment.locale(lang.lang);
        let monthArr = lang.langMap?.monthsShort || moment.localeData().monthsShort();

        // @ts-ignore
        monthArr.map((item: any, index: number) => {
            if (currentMonth === item) {
                this.setState({
                    activeMonthNum: index
                });
            }
        });
        setTimeout(() => {
            // 每次面板展开选中项在面板中间
            let liDom = document.querySelectorAll(`.${_PREFIX_CLS}-header-select-year li`)[0]
            let liHeight = liDom?.getBoundingClientRect()?.height
            if (this.yearUl) this.yearUl.scrollTop = (this.state.activeYearNum - 2) * liHeight;
            if (this.monthUl) {
                this.monthUl.scrollTop = (this.state.activeMonthNum - 2) * liHeight;
            }
        }, 0);
        onPanelshow && onPanelshow(this.state.maskShow, position);
        // 添加默认值是计算selectYear、selectMonth
        if (defaultValue && position === 'left') {
            this.setState({
                selectYear: moment(defaultValue[0])?.year(),
                selectMonth: moment(defaultValue[0])?.month() + 1
            });
        }
        if (defaultValue && position === 'right') {
            this.setState({
                selectYear: moment(defaultValue[1])?.year(),
                selectMonth: moment(defaultValue[1])?.month() + 1
            });
        }
        if (!picker || picker === 'date' || picker === 'week') {
            monthArr.find((item: any, index: number) => {
                if (currentMonth === item) {
                    currentMonth = index + 1
                }
            }); // bugfix QDJCJS-14150 英文环境下，期间选择月，选不上; 字符串Jul ==> 7
            this.setState({
                currentYear,
                currentMonth
            });
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            this.setState({
                currentYear: currentYear
            });
        } else if (picker === 'year') {
            let currentYearRang = parentNode.querySelector(
                `.${_PREFIX_CLS}-decade-btn`
            ).textContent;
            this.setState({
                currentYear: currentYearRang
            });
        }
        // rangpicker 下拉不同时展开
        if (this.state.maskShow) {
            hiddenHandleSelect?.(position);
        }
    };
    headerSelect = () => {
        let {picker, lang, fieldid, position} = this.props;
        let options = this.getOptions();
        moment.locale(lang.lang);
        let monthData = lang.langMap?.monthsShort || moment.localeData().monthsShort();
        let node = (
            <div className={`${_PREFIX_CLS}-header-select`}>
                <div className={`${_PREFIX_CLS}-header-select-year`} ref={el => (this.yearUl = el)}>
                    <ul>
                        {options.map((item, index) => {
                            return (
                                <li
                                    className={
                                        this.state.activeYearNum == index
                                            ? `${_PREFIX_CLS}-header-select-year-active`
                                            : undefined
                                    }
                                    key={item.value + index}
                                    {...(fieldid ? {fieldid: `${fieldid}_year_${parseInt(item.label)}`} : {})}
                                    onClick={this.onChangeYear.bind(this, item.label, index)}
                                >
                                    {lang.lang === 'zh-cn' || lang.lang === 'zh-tw'
                                        ? picker != 'year'
                                            ? this.state.activeYearNum == index
                                                ? parseInt(item.label) + ' 年'
                                                : parseInt(item.label)
                                            : item.label
                                        : picker != 'year'
                                            ? parseInt(item.label)
                                            : item.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {options[0]?.children && (
                    <div className={`${_PREFIX_CLS}-header-select-month`} ref={el => (this.monthUl = el)}>
                        <ul>
                            {Array.isArray(monthData) && monthData?.map((item: string, index: number) => {
                                return (
                                    <li
                                        className={
                                            this.state.activeMonthNum == index
                                                ? `${_PREFIX_CLS}-header-select-month-active`
                                                : undefined
                                        }
                                        key={item + index}
                                        {...(fieldid ? {fieldid: `${fieldid}_month_${index + 1}`} : {})}
                                        onClick={this.onChangeMonth.bind(this, item, index)}
                                    >
                                        {lang.lang === 'zh-cn' || lang.lang === 'zh-tw' ? parseInt(item) : item}
                                        {lang.lang === 'zh-cn' || lang.lang === 'zh-tw'
                                            ? this.state.activeMonthNum == index
                                                ? ' 月'
                                                : ''
                                            : ''}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        );
        let iconNode = (
            <div className={`${_PREFIX_CLS}-header-select-icon`}>
                {this.state.maskShow ? <Icon type='uf-gridcaretarrowup' /> : <Icon type='uf-gridcaretdown' />}
            </div>
        );
        return (
            <>
                {iconNode}
                <div className={`${_PREFIX_CLS}-header-select-box`}>
                    {this.state.maskShow && node}
                    <div
                        ref={el => (this.headerNode = el)}
                        style={{background: 'transparent', height: '100%'}}
                        onClick={this.clickValue}
                        {...(fieldid ? {fieldid: `${fieldid}_${position}-header-select`} : {})}
                    >
                        {' '}
                    </div>
                </div>
            </>
        );
    };

    getOptions = () => {
        // 获取下拉的数据
        let {picker} = this.props;
        let nowDate = new Date();
        let currentYear: number = nowDate.getFullYear();
        let options: {label: string; value: string; children?: any}[] = [];
        let childrenOptions = [];
        for (let i = 1; i < 13; i++) {
            let obj = {label: i + '月', value: i + '月'};
            childrenOptions.push(obj);
        }
        if (!picker || picker === 'date' || picker === 'week') {
            for (let i = currentYear - 200; i < currentYear + 200; i++) {
                let obj = {label: i + '年', value: i + '年', children: childrenOptions};
                options.push(obj);
            }
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            for (let i = currentYear - 200; i < currentYear + 200; i++) {
                let obj = {label: i + '年', value: i + '年'};
                options.push(obj);
            }
        } else if (picker === 'year') {
            for (let i = currentYear - 200; i < currentYear + 200; i++) {
                if (i % 10 === 0) {
                    let obj = {label: i + '-' + (i + 9), value: i + '-' + (i + 9)};
                    options.push(obj);
                }
            }
        }
        return options;
    };

    render() {
        const domCom = this.headerSelect();
        return domCom;
    }
}

export default DatePickerHeaderSelect;
