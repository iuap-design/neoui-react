import React from 'react'
import {findDOMNode} from 'react-dom'
import Icon from '../../wui-icon/src'
import classnames from 'classnames';
import type {CalendarHeaderSelectProps, CalendarHeaderSelectState} from './iCalendar';
import generate from './Generate';
const {generateM, getDisplayYear} = generate;
class CalendarHeaderSelect extends React.Component<CalendarHeaderSelectProps, CalendarHeaderSelectState> {
    yearUl?: HTMLDivElement | null;
    monthUl?: HTMLDivElement | null;
    dateUl?: HTMLDivElement | null;
    constructor(props: CalendarHeaderSelectProps) {
        super(props)
        this.state = {
            maskShow: false,
            activeYearNum: 0,
            activeMonthNum: 0,
            activeDateNum: props.value.date() - 1,
            dateDom: null
        }
    }

    mounted: any;
    componentDidMount() {
	    this.mounted = true;
	    document.addEventListener('click', this.onDocumentClick)
    }

    componentWillUnmount() {
	    this.mounted = false;
	    document.removeEventListener('click', this.onDocumentClick)
    }

    // 判断n是否在root内
    contains(root: any, n: any) {
	    let node: any = n;
	    while (node) {
	        if (node === root) return true;
	        node = node.parentNode
	    }
	    return false;
    }
    // 点击contextmenu以外的地方将其关闭
	onDocumentClick = (event: any) => {
	    if (this.mounted === false) return;// 解决IE下报错findDOMNode
	    let target = event.target;
	    let contextDom = findDOMNode(this);
	    if (!this.contains(contextDom, target)) {
	        this.setState({
	            maskShow: false
	        })
	    }
	}

    onChangeYear = (val: string, index: number) => {
        let {value} = this.props
        this.setState({
            activeYearNum: index
        })
        let newValue = generateM()(value).set('year', parseInt(val))
        this.props.setSelectValue(newValue)
    }
    // 点击月份
    // @ts-ignore
    onChangeMonth = (monthValue: string, index: number) => {
        let {value, type} = this.props
        if (type === 'hour' || type === 'week') {
            this.setState({
                activeMonthNum: index
            })
        } else {
            this.setState({
                maskShow: false,
                activeMonthNum: index
            })
        }
        let newValue = generateM()(value).set('month', index)
        this.props.setSelectValue(newValue)
        // 计算日维度下拉天数
        this.getDateSelect(this.state.activeYearNum, index + 1)
    }
    // 点击日
    onChangeDate = (index: number) => {
        let {value} = this.props
        this.setState({
            maskShow: false,
            activeDateNum: index
        })
        let newValue = generateM()(value).set('date', index + 1)
        this.props.setSelectValue(newValue)
    }
    clickValue = () => {
        let {value, type, localeData} = this.props
        this.setState({maskShow: !this.state.maskShow})
        let currentYear = value.year()
        let currentMonth = value.month() + 1
        let options = this.getOptions()
        options.map((item, index) => {
            if (parseInt(item.value) === currentYear) {
                this.setState({
                    activeYearNum: index,
                })
            }
        })
        // let monthArr = this.state.monthData
        generateM().locale('zh-cn')
        let monthArr = localeData.monthsShort
        // let monthArr = [1, 2, 3, 4, 5, 6]
        // @ts-ignore
        monthArr.map((item: any, index: number) => {
            if (currentMonth === parseInt(item)) {
                this.setState({
                    activeMonthNum: index
                })
            }
        })
        setTimeout(() => {
            // 每次面板展开选中项在面板中间
            if (this.yearUl) {
                this.yearUl.scrollTop = (this.state.activeYearNum - 2) * 34
            }
            if (this.monthUl) {
                this.monthUl.scrollTop = (this.state.activeMonthNum - 2) * 34
            }
        }, 0)
        if (type && (type === 'hour' || type === 'week')) {
            let currentDate = value.date()
            this.setState({
                activeDateNum: currentDate - 1
            })
            this.getDateSelect(currentYear, currentMonth)
            setTimeout(() => {
                if (this.dateUl) {
                    this.dateUl.scrollTop = (this.state.activeDateNum - 2) * 34
                }
            }, 0)
        }
    }

    // 判断是否是闰年
    isRunYear = (year: number) => {
        let flag = false
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            flag = true
        }
        return flag
    }

    getDateSelect = (year: number, month: number) => {
        let {lang, prefixCls} = this.props
        let dateNum = 31
        if (month === 4 || month === 6 || month === 9 || month === 11) {
            dateNum = 30
        }
        if (month === 2) {
            if (this.isRunYear(year)) {
                dateNum = 29
            } else {
                dateNum = 28
            }
        }
        let node = (
            <div className={`${prefixCls}-header-select-date`} ref={el => (this.dateUl = el)}>
                <ul>
                    {[...new Array(dateNum)].map((_item, index: number) => {
                        return (
                            <li
                                className={
                                    this.state.activeDateNum == index
                                        ? `${prefixCls}-header-select-date-active`
                                        : undefined
                                }
                                key={index}
                                onClick={this.onChangeDate.bind(this, index)}
                            >
                                {index + 1}
                                {lang === 'zh-cn' || lang === 'zh-tw'
                                    ? this.state.activeDateNum == index
                                        ? ' 日'
                                        : ''
                                    : ''}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
        this.setState({
            dateDom: node
        })
    }

    headerSelect = () => {
        let {lang, prefixCls, type, localeData} = this.props
        let options: {label: string; value: string; children?: any}[] = this.getOptions()
        generateM().locale('zh-cn')
        let monthData = localeData.monthsShort;
        let node = (
            <div className={`${prefixCls}-header-select`}>
                <div className={`${prefixCls}-header-select-year`} ref={el => (this.yearUl = el)}>
                    <ul>
                        {options.map((item, index) => {
                            return (
                                <li
                                    className={
                                        this.state.activeYearNum == index
                                            ? `${prefixCls}-header-select-year-active`
                                            : undefined
                                    }
                                    key={item.value + index}
                                    onClick={this.onChangeYear.bind(this, item.value, index)}
                                >
                                    {lang === 'zh-cn' || lang === 'zh-tw'
                                        ? this.state.activeYearNum == index
                                            ? parseInt(item.label) + ' 年'
                                            : parseInt(item.label)
                                        : parseInt(item.label)}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {options[0]?.children && (
                    <div className={`${prefixCls}-header-select-month`} ref={el => (this.monthUl = el)}>
                        <ul>
                            {(monthData as string[]).map((item: string, index: number) => {
                                return (
                                    <li
                                        className={
                                            this.state.activeMonthNum == index
                                                ? `${prefixCls}-header-select-month-active`
                                                : undefined
                                        }
                                        key={item + index}
                                        onClick={this.onChangeMonth.bind(this, item, index)}
                                    >
                                        {lang === 'zh-cn' || lang === 'zh-tw' ? parseInt(item) : item}
                                        {lang === 'zh-cn' || lang === 'zh-tw'
                                            ? this.state.activeMonthNum == index
                                                ? ' 月'
                                                : ''
                                            : ''}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
                {
                    (type === 'hour' || type === 'week') && (this.state.dateDom)
                }
            </div>
        )
        let iconNode = (
            <div className={`${prefixCls}-header-select-icon`}>
                {this.state.maskShow ? <Icon type="uf-gridcaretarrowup" /> : <Icon type="uf-gridcaretdown" />}
            </div>
        )
        let boxClass = classnames({
            [`${prefixCls}-header-select-box`]: true,
            [`${prefixCls}-header-select-hour`]: type === 'hour' || type === 'week'
        })
        return (
            <div className={boxClass}>
                {this.state.maskShow && node}
                <div style={{background: 'transparent', height: '100%'}} onClick={this.clickValue}>
                    {' '}
                </div>{iconNode}
            </div>)
    }

    getOptions = () => {
        // 获取cascader的options
        let nowDate = new Date()
        let currentYear: number = nowDate.getFullYear()
        let options = []
        let childrenOptions = []
        let showCurrentYear = getDisplayYear(generateM()());

        for (let i = 1; i < 13; i++) {
            let obj = {label: i + '月', value: i + '月'}
            childrenOptions.push(obj)
        }
        for (let i = currentYear - 200; i < currentYear + 200; i++) {

            let obj = {label: i - currentYear + showCurrentYear + '年', value: i + '年', children: childrenOptions}
            options.push(obj)
        }
        return options
    }
    render() {
        let dom = this.headerSelect()
        return (dom)
    }
}

export default CalendarHeaderSelect