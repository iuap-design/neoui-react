import React from 'react'
import moment from 'moment'
import {DatePicker, DatePickerProps, RangePickerProps} from '@tinper/next-ui'
import {prefix} from '../../../../packages/wui-core/src'
import DisabledDemo from './DatePicker_disableDate'
import Ranges from './RangePicker_ranges'

const {RangePicker} = DatePicker

Cypress.config({
    viewportWidth: 600,
    viewportHeight: 600
})

type pickerArrType = DatePickerProps['picker'][]
type ListProps = DatePickerProps & {pickers?: pickerArrType}

const pickerArr: pickerArrType = ['date', 'week', 'month', 'quarter', 'halfYear', 'year']
const style = {marginLeft: 20, marginTop: 10, marginBottom: 300, width: '80%'}

const DatePickerSizeDemo = (props: Partial<DatePickerProps>) => {
    return (
        <>
            <DatePicker size='xs' placeholder='我是xs' {...props} />
            <DatePicker size='sm'  value='2023-05-24 20:23:12' allowClear {...props} />
            <DatePicker size='md' style={{marginTop: '20px'}} {...props} />
            <DatePicker size='nm' {...props} />
            <DatePicker size='lg' {...props} />
            <DatePicker size='default' {...props} />
            <DatePicker value='2023-05-24 20:23:12' {...props} />
        </>
    )
}

// 打开面板，输入框失去焦点
const openPanelAndBlur = () => {
    cy.get(`.${prefix}-picker-input`).eq(0).children('input').click() // 确认面板打开
    cy.wait(400)
    cy.get(`.${prefix}-picker-input`).eq(0).children('input').blur() // blur避免光标闪烁导致每次截图不一样
}

const List = (props: ListProps) => {
    const {pickers = pickerArr, ...others} = props
    return (
        <>
            <DatePicker {...others} showTime placeholder='date.showTime' />
            <DatePicker {...others} showToday placeholder='date.showToday' />
            {pickers.map(picker => (
                <DatePicker {...others} picker={picker} placeholder={picker} />
            ))}
        </>
    )
}

const DatePickerPanel = (props: ListProps) => (
    <>
        <List {...props} style={style} open defaultPickerValue={moment('2022-11-23')} />
        <List {...props} style={style} open defaultValue={moment('2022-11-23')} />
        <List {...props} style={style} open value={moment('2022-11-23')} />
    </>
)

describe('DatePicker_input', () => {
    const DatePickerInput = () => (
        <>
            <List style={{...style, marginBottom: 10}} value={moment('2022-11-23')} />
            <List style={{...style, marginBottom: 10}} value={moment('2022-11-23')} disabled />
            <List style={{...style, marginBottom: 10}} value={moment('2022-11-23')} inputReadOnly />
        </>
    )

    // 默认态、禁用输入框、只读，仅输入框/placeholder/有值
    it('should mount basic picker input', () => {
        cy.mount(<DatePickerInput />)
        cy.wait(1000)
        cy.compareSnapshot('basic_input')
    })

    // 默认态、禁用输入框、只读，仅输入框/placeholder/有值
    it('should mount picker input.size', () => {
        cy.mount(<DatePickerSizeDemo />)
        cy.compareSnapshot('basic_input_size')
        cy.mount(<DatePickerSizeDemo disabled />)
        cy.compareSnapshot('basic_input_disabled_size')
        cy.mount(<DatePickerSizeDemo inputReadOnly />)
        cy.compareSnapshot('basic_input_readonly_size')
        cy.mount(<DatePickerSizeDemo bordered='bottom' />)
        cy.compareSnapshot('basic_input_border_bottom')
        cy.mount(<DatePickerSizeDemo bordered='bottom' disabled />)
        cy.compareSnapshot('basic_input_disabled_border_bottom')
    })

    // hover\disabled\readonly态，显示清空图标，且可正常清空
    it('should mount clear icon', () => {
        cy.mount(<DatePickerInput />)
        Array((pickerArr.length + 2) * 3)
            .fill(0)
            .map((_item, i) => {
                cy.get(`.${prefix}-picker-suffix`).eq(i).realHover()
                cy.wait(300)
                cy.compareWithOptions('input_hover' + i, {
                    capture: 'runner',
                    clip: {x: 800, y: 80, width: 600, height: 800}
                })
            })
        cy.wait(500)
        cy.compareSnapshot('hover_show_clearIcon')
    })

    // 点击清空按钮
    it('should clear value and display placeholder', () => {
        cy.mount(<DatePickerInput />)
        Array(pickerArr.length + 1)
            .fill(0)
            .map((_item, i) => {
                cy.get(`.${prefix}-picker-clear`).eq(i).click({force: true})
            })
        cy.wait(500)
        cy.compareSnapshot('click_clear_value')
    })
})

describe('DatePicker_panel', () => {
    // 默认态，仅打开面板/有值
    it('should mount basic picker panel', () => {
        cy.mount(<DatePickerPanel />)
        cy.wait(1000)
        cy.compareSnapshot('basic_panel')
    })

    // hover日期
    it('should mount date with hover style', () => {
        cy.mount(<DatePickerPanel />)
        cy.wait(1000)
        Array(pickerArr.length + 2)
            .fill(0)
            .map((_item, i) => {
                cy.get(`[title="2022-11-15"]`).eq(i).realHover()
                cy.wait(300)
                cy.viewport(600, 3000);
                cy.compareWithOptions('hover_date_in_view' + i, {
                    capture: 'runner',
                    clip: {x: 900, y: -100, width: 600, height: 800}
                })
            })
        Array(pickerArr.length + 2)
            .fill(0)
            .map((_item, i) => {
                cy.get(`[title="2022-12-08"]`).eq(i).realHover()
                cy.wait(300)
                cy.viewport(600, 3000);
                cy.compareWithOptions('hover_date_not_in_view' + i, {
                    capture: 'runner',
                    clip: {x: 900, y: -100, width: 600, height: 800}
                })
            })
    })

    // click date.showTime
    it('should mount date.showTime with click style', () => {
        cy.mount(
            <DatePicker style={style} open defaultValue={moment('2022-11-23')} showTime placeholder='date.showTime' />
        )
        cy.get(`[title="2022-11-15"]`).eq(0).click()
        cy.wait(200)
        cy.compareSnapshot('click_date.showTime_in_view')

        cy.get(`[title="2022-10-31"]`).eq(0).click()
        cy.wait(200)
        cy.compareSnapshot('click_date.showTime_not_in_view')

        cy.get(`.${prefix}-picker-time-panel-column`).eq(0).contains('05').click()
        cy.wait(200)
        cy.compareSnapshot('click_date.showTime_hour')
    })

    // click date.showToday
    it('should mount date.showToday in view with click style', () => {
        cy.mount(
            <DatePicker style={style} open defaultValue={moment('2022-11-23')} showToday placeholder='date.showToday' />
        )
        cy.wait(400)
        cy.get(`[title="2022-11-15"]`).eq(0).click()
        cy.compareSnapshot('click_date.showToday_in_view')
    })

    // click date.showToday not in view
    it('should mount date.showToday not in view with click style', () => {
        cy.mount(
            <DatePicker isHeaderSelect={false} style={style} open defaultValue={moment('2022-11-23')} showToday placeholder='date.showToday' />
        )
        cy.wait(400)
        cy.get(`[title="2022-10-31"]`).eq(0).click()
        cy.get(`.${prefix}-picker-input`).eq(0).click()
        cy.wait(300)
        cy.get(`.${prefix}-picker-input input`).blur()
        cy.compareSnapshot('click_date.showToday_not_in_view')
    })

    // // click week
    // it('should mount week in view with click style', () => {
    //     cy.mount(<DatePicker style={style} picker='week' open defaultValue={moment('2022-11-23')} placeholder='week' />)
    //     cy.wait(400)
    //     cy.get(`[title="2022-11-15"]`).eq(0).click()
    //     cy.compareSnapshot('click_week_in_view')
    // })

    // click week not in view
    it('should mount week not in view with click style', () => {
        cy.mount(<DatePicker style={style} picker='week' open defaultValue={moment('2022-11-23')} placeholder='week' />)
        cy.wait(400)
        cy.get(`[title="2022-10-31"]`).eq(0).click()
        cy.compareSnapshot('click_week_not_in_view')
    })

    // click month
    it('should mount month with click style', () => {
        cy.mount(
            <DatePicker style={style} picker='month' open defaultValue={moment('2022-11-23')} placeholder='month' />
        )
        cy.wait(400)
        cy.get(`[title="2022-10"]`).eq(0).click()
        cy.compareSnapshot('click_month')
    })

    // click quarter
    it('should mount quarter with click style', () => {
        cy.mount(
            <DatePicker style={style} picker='quarter' open defaultValue={moment('2022-11-23')} placeholder='quarter' />
        )
        cy.wait(400)
        cy.get(`[title="2022-Q2"]`).eq(0).click()
        cy.compareSnapshot('click_quarter')
    })

    // click year
    it('should mount year in view with click style', () => {
        cy.mount(<DatePicker style={style} picker='year' open defaultValue={moment('2022-11-23')} placeholder='year' />)
        cy.wait(400)
        cy.get(`[title="2025"]`).eq(0).click()
        cy.compareSnapshot('click_year_in_view')
    })

    // click year not in view
    it('should mount year not in view with click style', () => {
        cy.mount(<DatePicker style={style} picker='year' open defaultValue={moment('2022-11-23')} placeholder='year' />)
        cy.wait(400)
        cy.get(`[title="2019"]`).eq(0).click()
        cy.compareSnapshot('click_year_not_in_view')
    })
})

describe('DatePicker_panel_disabled', () => {
    // 禁用日期
    it('should mount disabled date panel', () => {
        cy.mount(<DisabledDemo />)
        cy.wait(200)
        cy.compareSnapshot('disabled_date_panel')
    })

    // hover 禁用日期
    it('should mount disabled date with hover style', () => {
        cy.mount(<DisabledDemo />)
        cy.wait(600)

        cy.get(`[title="2022-09-15"]`).eq(0).realHover()
        cy.wait(300)
        cy.compareWithOptions('hover_disabeld_date', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 600, height: 3000}
        })

        cy.get(`[title="2022-09-15"]`).eq(1).realHover()
        cy.wait(300)
        cy.compareWithOptions('hover_disabeld_date.showTime', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 600, height: 3000}
        })

        cy.get(`[title="2022-09-15"]`).eq(2).realHover()
        cy.wait(300)
        cy.compareWithOptions('hover_disabeld_week', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 600, height: 800}
        })

        cy.get(`[title="2022-06"]`).eq(0).realHover()
        cy.wait(300)
        cy.compareWithOptions('hover_disabeld_month', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 600, height: 800}
        })

        cy.get(`[title="2022-Q2"]`).eq(0).realHover()
        cy.wait(300)
        cy.compareWithOptions('hover_disabeld_quarter', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 600, height: 800}
        })

        cy.get(`[title="2025"]`).eq(0).realHover()
        cy.wait(300)
        cy.compareWithOptions('hover_disabeld_year', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 600, height: 800}
        })
    })

    // click disabled date & date.showTime & week & month & quarter & year
    it('should mount disabled date.showTime with click style', () => {
        cy.mount(<DisabledDemo />)
        cy.wait(300)
        cy.get(`[title="2022-09-15"]`).eq(0).click()
        cy.get(`.${prefix}-picker-input`).eq(0).children('input').click()
        cy.wait(400)
        cy.get(`.${prefix}-picker-input`).eq(0).children('input').blur() // blur避免光标闪烁导致每次截图不一样
        cy.compareSnapshot('click_disabled_date')

        cy.get(`.${prefix}-picker-input`).eq(1).click()
        cy.wait(300)
        cy.get(`[title="2022-09-15"]`).eq(1).click()
        cy.get(`.${prefix}-picker-input`).eq(1).children('input').click()
        cy.wait(400)
        cy.get(`.${prefix}-picker-input`).eq(1).children('input').blur() // blur避免光标闪烁导致每次截图不一样
        cy.compareSnapshot('click_disabled_date.showTime')

        cy.get(`.${prefix}-picker-input`).eq(2).click()
        cy.wait(300)
        cy.get(`[title="2022-09-15"]`).eq(2).click()
        cy.get(`.${prefix}-picker-input`).eq(2).children('input').click()
        cy.wait(400)
        cy.get(`.${prefix}-picker-input`).eq(2).children('input').blur() // blur避免光标闪烁导致每次截图不一样
        cy.wait(300)
        cy.compareSnapshot('click_disabled_week')

        cy.get(`.${prefix}-picker-input`).eq(3).click()
        cy.wait(300)
        cy.get(`[title="2022-10"]`).eq(0).click()
        cy.get(`.${prefix}-picker-input`).eq(3).children('input').click()
        cy.wait(400)
        cy.get(`.${prefix}-picker-input`).eq(3).children('input').blur() // blur避免光标闪烁导致每次截图不一样
        cy.compareSnapshot('click_disabled_month')

        cy.get(`.${prefix}-picker-input`).eq(4).click()
        cy.wait(300)
        cy.get(`[title="2022-Q2"]`).eq(0).click()
        cy.get(`.${prefix}-picker-input`).eq(4).children('input').click()
        cy.wait(400)
        cy.get(`.${prefix}-picker-input`).eq(4).children('input').blur() // blur避免光标闪烁导致每次截图不一样
        cy.compareSnapshot('click_disabled_quarter')

        cy.get(`.${prefix}-picker-input`).eq(5).click()
        cy.wait(300)
        cy.get(`[title="2025"]`).eq(0).click()
        cy.get(`.${prefix}-picker-input`).eq(5).children('input').click()
        cy.wait(400)
        cy.get(`.${prefix}-picker-input`).eq(5).children('input').blur() // blur避免光标闪烁导致每次截图不一样
        cy.compareSnapshot('click_disabled_year')
    })
})

// 多语
describe('DatePicker_locale', () => {
    // 默认态，仅打开面板/有值
    xit('should mount basic picker panel', () => {
        cy.mount(<List style={style} open value={moment('2022-11-23')} locale='en' />)
        cy.wait(600)
        cy.compareSnapshot('basic_locale_en_panel')

        cy.mount(<List style={style} open value={moment('2022-11-23')} locale='zh-tw' />)
        cy.wait(600)
        cy.compareSnapshot('basic_locale_zh-tw_panel')
    })
})

type RangeListProps = RangePickerProps & {pickers?: pickerArrType}
const RangeList = (props: RangeListProps) => {
    const {pickers = pickerArr, ...others} = props
    return (
        <>
            <RangePicker {...others} showTime placeholder='range.showTime' />
            {pickers.map(picker => (
                <RangePicker {...others} picker={picker} placeholder={picker} />
            ))}
        </>
    )
}
const rangeValue = [moment('2022-10-23'), moment('2022-11-23')] as RangePickerProps['value']

describe('RangePicker_input', () => {
    const RangePickerInput = () => (
        <>
            <RangeList style={{...style, marginBottom: 10}} value={rangeValue} />
            <RangeList style={{...style, marginBottom: 10}} value={rangeValue} disabled />
        </>
    )

    // 默认态、禁用输入框，仅输入框/placeholder/有值
    it('should mount basic rangepicker input', () => {
        cy.mount(<RangePickerInput />)
        cy.wait(1000)
        cy.compareSnapshot('basic_range_input')
    })

    // 默认态、禁用输入框、只读，仅输入框/placeholder/有值
    it('should mount rangepicker input.size', () => {
        cy.mount(<DatePickerSizeDemo picker='range' />)
        cy.compareSnapshot('basic_range_input_size')
        cy.mount(<DatePickerSizeDemo picker='range' disabled />)
        cy.compareSnapshot('basic_range_input_disabled_size')
        cy.mount(<DatePickerSizeDemo picker='range' inputReadOnly />)
        cy.compareSnapshot('basic_range_input_readonly_size')
        cy.mount(<DatePickerSizeDemo picker='range' bordered='bottom' />)
        cy.compareSnapshot('basic_range_input_border_bottom')
        cy.mount(<DatePickerSizeDemo picker='range' bordered='bottom' disabled/>)
        cy.compareSnapshot('basic_range_input_disabled_border_bottom')
    })

    // hover\disabled态，显示清空图标，且可正常清空
    it('should mount clear icon', () => {
        cy.mount(<RangePickerInput />)
        Array((pickerArr.length + 1) * 2)
            .fill(0)
            .map((_item, i) => {
                cy.get(`.${prefix}-picker-suffix`).eq(i).realHover()
                cy.wait(300)
                cy.compareWithOptions('hover_range_show_clearIcon' + i, {
                    capture: 'runner',
                    clip: {x: 800, y: 80, width: 600, height: 800}
                })
            })
    })

    // 点击清空按钮
    xit('should clear value and display placeholder', () => {
        cy.mount(<RangePickerInput />)
        Array(pickerArr.length)
            .fill(0)
            .map((_item, i) => {
                cy.get(`.${prefix}-picker-clear`).eq(i).click({force: true})
            })
        cy.wait(500)
        cy.compareSnapshot('click_range_clear_value')
    })
})

describe('RangePicker_panel', () => {
    // 默认态，仅打开面板/有值
    it('should mount basic picker panel', () => {
        cy.mount(<RangeList style={style} open value={rangeValue} />)
        cy.compareSnapshot('basic_range_panel')
    })

    // hover日期
    xit('should mount date with hover style', () => {
        cy.mount(<RangeList style={style} open value={rangeValue} />)
        cy.wait(1000)
        Array(pickerArr.length)
            .fill(0)
            .map((_item, i) => {
                cy.get(`[title="2022-11-15"]`).eq(i).realHover()
                cy.compareWithOptions('hover_range_date_in_view' + i, {
                    capture: 'runner',
                    clip: {x: 800, y: 80, width: 600, height: 3000}
                })
            })
        Array(pickerArr.length)
            .fill(0)
            .map((_item, i) => {
                cy.get(`[title="2022-12-08"]`).eq(i).realHover()
                cy.compareWithOptions('hover_range_date_in_view' + i, {
                    capture: 'runner',
                    clip: {x: 800, y: 80, width: 600, height: 800}
                })
            })
    })

    // click range.showTime
    it('should mount range.showTime with click style', () => {
        cy.mount(
            <RangePicker
                style={style}
                value={rangeValue as RangePickerProps['value']}
                showTime
                open
                placeholder='range.showTime'
            />
        )
        cy.wait(400)
        cy.get(`[title="2022-10-24"]`).eq(0).click()
        cy.wait(300)
        cy.compareSnapshot('click_range_date.showTime_in_view')

        cy.get(`.${prefix}-picker-ok`).eq(0).click()
        cy.get(`[title="2022-11-06"]`).eq(0).click()
        cy.wait(300)
        cy.compareSnapshot('click_range_date.showTime_not_in_view')

        cy.get(`.${prefix}-picker-time-panel-column`).eq(0).children(`li`).eq(9).click()
        cy.get(`.${prefix}-picker-input`).eq(1).children('input').click()
        cy.wait(300)
        cy.get(`.${prefix}-picker-input`).eq(1).children('input').blur()  // blur避免光标闪烁导致截图失败
        cy.compareSnapshot('click_range_date.showTime_showHour')
    })

    // click week
    it('should mount week in view with click style', () => {
        cy.mount(
            <RangePicker
                style={style}
                picker='week'
                open
                value={rangeValue as RangePickerProps['value']}
                placeholder='week'
            />
        )
        cy.wait(400)
        cy.get(`[title="2022-10-25"]`).eq(0).click()
        openPanelAndBlur()
        cy.compareSnapshot('click_range_week_in_view')
    })

    // click week not in view
    it('should mount week not in view with click style', () => {
        cy.mount(
            <RangePicker
                style={style}
                picker='week'
                open
                value={rangeValue as RangePickerProps['value']}
                placeholder='week'
            />
        )
        cy.wait(400)
        cy.get(`[title="2022-09-30"]`).eq(0).click()
        openPanelAndBlur()
        cy.compareSnapshot('click_range_week_not_in_view')
    })

    // click month
    it('should mount month with click style', () => {
        cy.mount(
            <RangePicker
                style={style}
                picker='month'
                open
                value={rangeValue as RangePickerProps['value']}
                placeholder='month'
            />
        )
        cy.wait(400)
        cy.get(`[title="2022-10"]`).eq(0).click()
        openPanelAndBlur()
        cy.compareSnapshot('click_range_month')
    })

    // click quarter
    it('should mount quarter with click style', () => {
        cy.mount(
            <RangePicker
                style={style}
                picker='quarter'
                open
                value={rangeValue as RangePickerProps['value']}
                placeholder='quarter'
            />
        )
        cy.wait(400)
        cy.get(`[title="2022-Q2"]`).eq(0).click()
        openPanelAndBlur()
        cy.compareSnapshot('click_range_quarter')
    })

    // click year
    it('should mount year with click style', () => {
        cy.mount(
            <RangePicker
                style={style}
                picker='year'
                open
                value={rangeValue as RangePickerProps['value']}
                placeholder='year'
            />
        )
        cy.wait(400)
        cy.get(`[title="2025"]`).eq(0).click()
        openPanelAndBlur()
        cy.compareSnapshot('click_range_year_in_view')
    })

    // click year not in view
    it('should mount year  not in view with click style', () => {
        cy.mount(
            <RangePicker
                style={style}
                picker='year'
                open
                value={rangeValue as RangePickerProps['value']}
                placeholder='year'
            />
        )
        cy.wait(400)
        cy.get(`[title="2019"]`).eq(0).click()
        openPanelAndBlur()
        cy.compareSnapshot('click_range_year_not_in_view')
    })
})

// ranges 快捷键
describe('RangePicker_ranges', () => {
    // 默认态，仅打开面板/有值
    it('should mount picker ranges', () => {
        cy.mount(<Ranges />)
        cy.wait(500)
        cy.compareSnapshot('basic_range_ranges')
    })

    // click disabled date & date.showTime & week & month & quarter & year
    it('should mount ranges style while click', () => {
        cy.mount(<Ranges />)
        cy.wait(300)
        cy.get(`.${prefix}-picker-input`).eq(0).click()
        cy.wait(300)
        cy.contains(`至未来`).eq(0).click()
        cy.get(`.${prefix}-picker-input`).eq(0).click() // 点击重新打开面板
        cy.wait(300)
        cy.get(`.${prefix}-picker-input`).eq(0).children('input').blur()  // blur避免光标闪烁导致截图失败
        cy.compareSnapshot('click_ranges_empty')

        cy.wait(300)
        cy.get(`.${prefix}-picker-input`).eq(1).click()
        cy.wait(300)
        cy.contains(`去年`).eq(0).click()
        cy.get(`.${prefix}-picker-input`).eq(0).click() // 点击重新打开面板
        cy.wait(300)
        cy.get(`.${prefix}-picker-input`).eq(0).children('input').blur()  // blur避免光标闪烁导致截图失败
        cy.compareSnapshot('click_ranges_lastYear')
    })
})

// panel 位置
describe('panel_position', () => {
    it('should render datepicker width dropdownAlign right', () => {
        cy.mount(
            <div style={{width: 400, height: 400}}>
                {/* 输入框在右上角 */}
                <DatePicker style={{marginLeft: 300, width: 100}} open dropdownAlign='topLeft' value={'2022-10-23'} />
            </div>
        )
        cy.wait(400)
        cy.compareSnapshot('date_panel_dropdownAlign')
    })

    it('should mount datepicker panel placement right', () => {
        cy.mount(
            <>
                <div style={{width: 400, height: 400}}>
                    {/* 输入框在右上角 */}
                    <DatePicker style={{marginLeft: 300, width: 100}} open value={'2022-10-23'} />
                </div>
                <div style={{width: 400, height: 400}}>
                    {/* 输入框在下边 */}
                    <DatePicker style={{marginLeft: 200, marginTop: 350}} open value={'2022-10-23'} />
                </div>
            </>
        )
        cy.wait(600)
        cy.compareSnapshot('date_panel_placement')
    })

    it('should render datepicker width dropdownAlign right', () => {
        cy.mount(
            <div style={{width: 600, height: 400}}>
                {/* 输入框在右上角 */}
                <RangePicker
                    style={{marginLeft: 300, width: 100}}
                    open
                    dropdownAlign='topLeft'
                    value={['2022-10-23', '2022-11-23']}
                />
            </div>
        )
        cy.wait(400)
        cy.compareSnapshot('range_panel_dropdownAlign')
    })

    it('should mount rangepicker panel placement right', () => {
        cy.mount(
            <>
                <div style={{width: 600, height: 400}}>
                    {/* 输入框在右上角 */}
                    <RangePicker style={{marginLeft: 300, width: 100}} open value={['2022-10-23', '2022-11-23']} />
                </div>
                <div style={{width: 600, height: 400}}>
                    {/* 输入框在下边 */}
                    <RangePicker style={{marginLeft: 200, marginTop: 350}} open value={['2022-10-23', '2022-11-23']} />
                </div>
            </>
        )
        cy.wait(800)
        cy.compareSnapshot('range_panel_placement')
    })
})
