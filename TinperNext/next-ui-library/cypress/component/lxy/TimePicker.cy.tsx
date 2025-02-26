import React from 'react'
import moment from 'moment'
import {TimePicker, TimePickerProps} from '@tinper/next-ui'
import {prefix} from '../../../../packages/wui-core/src'
import DisabledDemo from './TimePicker_disabled'

Cypress.config({
    viewportWidth: 500,
    viewportHeight: 600
})

const style = {marginLeft: 20, marginTop: 10, marginBottom: 480, width: '80%'}
const time = moment().set({hour: 10, minute: 20, second: 30})

const List = (props: TimePickerProps) => (
    <>
        <TimePicker style={style} value={time} {...props} />
        <TimePicker style={{...style, marginBottom: 10}} value={time} disabled {...props} />
    </>
)

const TimePickerSizeDemo = (props: Partial<TimePickerProps>) => {
    return (
        <>
            <TimePicker size='xs' placeholder='我是xs' {...props} />
            <TimePicker size='sm' value='2023-05-24 20:23:12' allowClear {...props} />
            <TimePicker size='md' style={{marginTop: '20px'}} {...props} />
            <TimePicker size='nm' {...props} />
            <TimePicker size='lg' {...props} />
            <TimePicker size='default' value='2023-05-24 20:23:12' allowClear {...props} />
            <TimePicker value='2023-05-24 20:23:12' {...props} />
        </>
    )
}

describe('TimePicker_input', () => {
    // 默认态、禁用输入框、只读，仅输入框/placeholder/有值
    it('should mount basic picker input', () => {
        cy.mount(<List />)
        cy.wait(1000)
        cy.compareSnapshot('basic_input')
    })

    // 默认态、禁用输入框、只读，仅输入框/placeholder/有值
    it('should mount picker input.size', () => {
        cy.mount(<TimePickerSizeDemo />)
        cy.compareSnapshot('basic_input_size')
        cy.mount(<TimePickerSizeDemo disabled />)
        cy.compareSnapshot('basic_input_disabled_size')

        cy.mount(<TimePickerSizeDemo bordered='bottom' />)
        cy.compareSnapshot('basic_timepicker_border_bottom')
        cy.mount(<TimePickerSizeDemo bordered='bottom' disabled />)
        cy.compareSnapshot('basic_timepicker_disabled_border_bottom')
    })

    // hover\disabled态，显示清空图标，且可正常清空
    // TODO：mouserover模拟hover失败
    it('should mount clear icon', () => {
        cy.mount(<List />)
        cy.get(`.uf-time-c-o`).eq(0).trigger('mouseover', {force: true})
        cy.wait(300)
        cy.compareSnapshot('hover_show_clearIcon')
        cy.get(`.uf-time-c-o`).eq(1).trigger('mouseover', {force: true})
        cy.wait(300)
        cy.compareSnapshot('hover_disabled_clearIcon')
    })

    // 点击清空按钮
    it('should clear value and display placeholder', () => {
        cy.mount(<List />)
        cy.get(`.uf-close-c`).eq(0).click()
        cy.wait(300)
        cy.compareSnapshot('click_clear_value')
        // cy.get(`.uf-close-c`).eq(1).click()
        // cy.wait(300)
        // cy.compareSnapshot('click_disabled_clear_value')
    })
})

describe('TimePicker_panel', () => {
    // 默认态，仅打开面板/有值
    it('should mount basic picker panel', () => {
        cy.mount(<List open />)
        cy.wait(500)
        cy.compareSnapshot('basic_panel')
    })

    // hover日期
    // TODO：mouserover模拟hover失败
    it('should mount time with hover style', () => {
        cy.mount(<List open />)
        cy.wait(300)
        cy.get(`.${prefix}-time-picker-panel-select`)
            .eq(0)
            .children('ul')
            .first()
            .children('li')
            .eq(9)
            .trigger('mouseover')
        cy.wait(100)
        cy.compareSnapshot('hover_hour')
        cy.get(`.${prefix}-time-picker-panel-select`).eq(0).children('ul').first().children('li').eq(10).click()
        cy.wait(300)
        cy.compareSnapshot('click_hour')
    })
})

describe('TimePicker_panel_disabled', () => {
    // 禁用日期
    it('should mount disabled time panel', () => {
        cy.mount(<DisabledDemo />)
        cy.wait(200)
        cy.compareSnapshot('disabled_time_panel')
    })

    // hover 禁用日期
    // TODO：mouseover模拟hover失败
    it('should mount disabled time with hover style', () => {
        cy.mount(<DisabledDemo />)
        cy.wait(300)
        cy.get(`.${prefix}-time-picker-panel-select`)
            .eq(0)
            .children('ul')
            .first()
            .children('li')
            .eq(5)
            .trigger('mouseover')
        cy.wait(300)
        cy.compareSnapshot(`hover_disabeld_hour`)
    })

    // click disabled time
    it('should mount disabled time with click style', () => {
        cy.mount(<DisabledDemo />)
        cy.wait(300)
        cy.get(`.${prefix}-time-picker-panel-select`).eq(0).children('ul').first().children('li').eq(5).click()
        cy.compareSnapshot('click_disabled_hour')
    })
})

// 多语
describe('TimePicker_locale', () => {
    // 默认态，仅打开面板/有值
    it('should mount basic picker panel', () => {
        cy.mount(<TimePicker style={style} value={time} use12Hours format='h:mm:ss a' locale='en' />)
        cy.get(`.${prefix}-time-picker-input`).eq(0).click()
        cy.wait(300)
        cy.get(`.${prefix}-time-picker-input`).eq(0).blur() // 避免focus光标影响
        cy.compareSnapshot('basic_locale_en_panel')
    })
    // 默认态，仅打开面板/有值
    it('should mount basic picker panel', () => {
        cy.mount(<TimePicker style={style} value={time} use12Hours format='h:mm:ss a' locale='zh-tw' />)
        cy.get(`.${prefix}-time-picker-input`).eq(0).click()
        cy.wait(300)
        cy.get(`.${prefix}-time-picker-input`).eq(0).blur() // 避免focus光标影响
        cy.compareSnapshot('basic_locale_zh-tw_panel')
    })
})

// format转showTime
describe('TimePicker_format2showTime', () => {
    // 默认态，仅打开面板/有值
    it('should mount picker panel match format', () => {
        cy.mount(<TimePicker style={style} open value={time} format='h:mm a' />)
        cy.wait(400)
        cy.compareSnapshot('format_showTime')
    })
})

// panel 位置
describe('panel_position', () => {
    it('should mount timepicker panel placement right', () => {
        cy.mount(
            <>
                <div style={{width: 400, height: 400}}>
                    {/* 输入框在右上角 */}
                    <TimePicker style={{marginLeft: 300, width: 100}} open value={time} />
                </div>
                <div style={{width: 400, height: 400}}>
                    {/* 输入框在下边 */}
                    <TimePicker style={{marginLeft: 200, marginTop: 500}} open value={time} />
                </div>
            </>
        )
        cy.wait(400)
        cy.compareSnapshot('date_panel_placement')
    })

})
