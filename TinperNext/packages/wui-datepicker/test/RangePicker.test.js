/**RangePicker.tsx */
import moment from 'moment'
import React from 'react'
import KeyCode from 'rc-util/lib/KeyCode'
import DatePicker from '../src'
import ConfigProvider from '../../wui-provider/src'
import Icon from './../../wui-icon/src'
import {_PREFIX_CLS} from '../src/DatePicker'
import {prefix} from './../../wui-core/src'
import {mount, shallow} from '../../../next-ui-library/test/common/mount'
import {attrsTest, eventsTest, testCustomeText, testCustomStyle} from '../../../next-ui-library/test/common/index'
import {actWait, sleep} from '../../../next-ui-library/test/common/utils'
import {render, screen, fireEvent, waitFor} from "@testing-library/react";

const {RangePicker} = DatePicker

const currentYear = moment().year()

// * 默认
describe('RangePicker default config: ', () => {
    it('should render default RangePicker component correctly', () => {
        const wrapper = mount(<RangePicker />)
        expect(wrapper.hasClass(_PREFIX_CLS)).toBe(true)
        expect(wrapper.hasClass(`${_PREFIX_CLS}-range`)).toBe(true)
    })
})

// * 样式
describe('RangePicker styles: ', () => {
    it('the root class should beggin with prefix `wui-`', async () => {
        const wrapper = mount(<RangePicker open value={['2020-10-12', '2030-10-11']} />)
        await sleep(100)
        // const rootDom = wrapper.find('div').first()
        // expect(rootDom.getDOMNode().className).toContain('wui-')
        expect(screen.getAllByText('2020年')[0].className.includes('wui-')).toEqual(true)
    })
    testCustomStyle({
        title: 'component: RangePicker, <test prop:: style> & width is number',
        Component: RangePicker,
        attrs: {
            style: {color: 'red', width: 300}
        },
        selector: `.${_PREFIX_CLS}`,
        verifyStyle: {color: 'red', width: '300px'}
    })
    testCustomStyle({
        title: 'component: RangePicker, <test prop:: style> & width is string',
        Component: RangePicker,
        attrs: {
            style: {width: '300px'}
        },
        selector: `.${_PREFIX_CLS}`,
        verifyStyle: {width: '300px'}
    })
    attrsTest({
        title: 'component: RangePicker, <test prop:: className>',
        Component: RangePicker,
        attrs: {
            className: 'my-picker'
        },
        selector: `.${_PREFIX_CLS}`,
        classnames: ['my-picker']
    })
    // attrsTest({
    //     title: 'component: RangePicker, <test prop:: popupClassName>',
    //     Component: RangePicker,
    //     attrs: {
    //         open: true,
    //         popupClassName: 'my-picker-popup'
    //     },
    //     selector: `.${_PREFIX_CLS}-dropdown`,
    //     classnames: ['my-picker-popup']
    // })
    it('component: RangePicker, <test prop:: popupClassName>', async () => {
        const wrapper = mount(<RangePicker open popupClassName="my-picker-popup" />)
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass('my-picker-popup')).toEqual(true)
    })
})

// * input 输入框用例
describe('RangePicker input: ', () => {
    testCustomeText({
        title: 'Comment: RangePicker, <test prop:: separator>',
        Component: RangePicker,
        attrs: {
            separator: '至'
        },
        selector: `.${_PREFIX_CLS}-range-separator`,
        text: '至'
    })

    eventsTest({
        title: 'component: RangePicker, <test prop:: iconClick>',
        Component: RangePicker,
        propFuncName: 'iconClick',
        dependentProps: {},
        selector: `.${_PREFIX_CLS}-suffix .${prefix}-icon.uf-calendar`,
        eventName: 'click',
        eventArgs: []
    })

    // QDJCJS-10139 增加接收placeholder更新
    it('should render `placeholder` correctly, <test prop:: placeholder>', () => {
        let placeholder = ['start date', 'end date']
        let wrapper = mount(<RangePicker />)
        wrapper.setProps({placeholder: placeholder})
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').prop('placeholder')).toEqual('start date')
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').prop('placeholder')).toEqual('end date')

        // placeholder = '开始 - 结束'
        // wrapper = mount(<RangePicker />)
        // wrapper.setProps({placeholder: placeholder})
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').prop('placeholder')).toEqual('开始')
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').prop('placeholder')).toEqual('结束')

        // placeholder = {start: '开始', end: '结束'} // 不支持的格式
        // wrapper = mount(<RangePicker />)
        // wrapper.setProps({placeholder})
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').prop('placeholder')).toEqual('')
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').prop('placeholder')).toEqual('')
    })

    it('should render `placeholder` correctly, <test prop:: dateInputPlaceholder>', () => {
        let dateInputPlaceholder = ['start date', 'end date']
        let wrapper = mount(<RangePicker />)
        wrapper.setProps({dateInputPlaceholder: dateInputPlaceholder})
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').prop('placeholder')).toEqual('start date')
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').prop('placeholder')).toEqual('end date')

        // dateInputPlaceholder = '开始 - 结束'
        // wrapper = mount(<RangePicker />)
        // wrapper.setProps({dateInputPlaceholder: dateInputPlaceholder})
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').prop('placeholder')).toEqual('开始')
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').prop('placeholder')).toEqual('结束')
    })
    it('should render `placeholder` correctly, <test prop:: dateInputPlaceholder other>', () => {
        let dateInputPlaceholder = '开始 - 结束'
        let wrapper = mount(<RangePicker />)
        wrapper.setProps({dateInputPlaceholder: dateInputPlaceholder})
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').prop('placeholder')).toEqual('开始')
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').prop('placeholder')).toEqual('结束')
    })

    it('should render `value` correctly, <test prop:: value>', () => {
        const format = 'YYYY-MM-DD'
        let value = ['2021-11-22', '2022-01-01']
        const wrapper = mount(<RangePicker value={value} />)
        expect(wrapper.find('input').at(0).value).toEqual(value[0])
        expect(wrapper.find('input').at(1).value).toEqual(value[1])
        wrapper.unmount()

        // value = ['2022-10-14', '2022-13-14'] // 非法字符串
        // wrapper.setProps({value, format})
        // expect(wrapper.find('input').at(0).value).toEqual(value[0])
        // expect(wrapper.find('input').at(1).value).toEqual('')
        // wrapper.unmount()

        // value = [moment('2021-11-22'), moment('2022-01-01')]
        // wrapper.setProps({value, format})
        // expect(wrapper.find('input').at(0).value).toEqual(value[0].format(format))
        // expect(wrapper.find('input').at(1).value).toEqual(value[1].format(format))
    })
    it('should render `value` correctly, <test prop:: value other>', () => {
        const format = 'YYYY-MM-DD'
        let value = ['2021-11-22', '2022-01-01']
        const wrapper = mount(<RangePicker value={[moment('2021-11-22'), moment('2022-01-01')]} format={format} />)
        expect(wrapper.find('input').at(0).value).toEqual(value[0])
        expect(wrapper.find('input').at(1).value).toEqual(value[1])
    })

    it('should render `defaultValue` correctly, <test prop:: defaultValue>', () => {
        const format = 'YYYY-MM-DD'
        let defaultValue = ['2021-02-02', '2022-03-03']
        const wrapper = mount(<RangePicker defaultValue={defaultValue} />)
        expect(wrapper.find('input').at(0).value).toEqual(defaultValue[0])
        expect(wrapper.find('input').at(1).value).toEqual(defaultValue[1])
        wrapper.unmount()

        // defaultValue = [moment('2021-04-22'), moment('2022-05-01')]
        // wrapper.setProps({defaultValue, format})
        // expect(wrapper.find('input').at(0).value).toEqual(defaultValue[0].format(format))
        // expect(wrapper.find('input').at(1).value).toEqual(defaultValue[1].format(format))
        // wrapper.unmount()

        // let value = ['2021-11-22', '2022-01-01']
        // wrapper.setProps({value, defaultValue})
        // expect(wrapper.find('input').at(0).value).toEqual(value[0])
        // expect(wrapper.find('input').at(1).value).toEqual(value[1])
        // wrapper.unmount()

        // value = [moment('2021-11-22'), moment('2022-01-01')]
        // wrapper.setProps({value, defaultValue, format})
        // expect(wrapper.find('input').at(0).value).toEqual(value[0].format(format))
        // expect(wrapper.find('input').at(1).value).toEqual(value[1].format(format))
    })
    it('should render `defaultValue` correctly, <test prop:: defaultValue other>', () => {
        const format = 'YYYY-MM-DD'
        let defaultValue = [moment('2021-04-22'), moment('2022-05-01')]
        const wrapper = mount(<RangePicker defaultValue={defaultValue} format={format} />)
        expect(wrapper.find('input').at(0).value).toEqual('2021-04-22')
        expect(wrapper.find('input').at(1).value).toEqual('2022-05-01')
        wrapper.unmount()
    })

    it('should render `format` correctly, <test prop:: format>', () => {
        let format = 'YYYY年MM月DD'
        let value = ['2021-11-22', '2022-01-01']
        const wrapper = mount(<RangePicker value={value} format={format} />)
        // QDJCJS-9387修复用户的format参数未接收问题
        // wrapper.setProps({format: format})
        expect(wrapper.find('input').at(0).value).toEqual('2021年11月22')
        expect(wrapper.find('input').at(1).value).toEqual('2022年01月01')
        wrapper.unmount()

        // value = [moment('2021-11-22'), moment('2022-01-01')]
        // wrapper.setProps({value, format})
        // expect(wrapper.find('input').at(0).value).toEqual(value[0].format(format))
        // expect(wrapper.find('input').at(1).value).toEqual(value[1].format(format))
        // wrapper.unmount()

        // format = ['YYYY/M/D', 'YYYY年MM月DD']
        // wrapper.setProps({format})
        // expect(wrapper.find('input').at(0).value).toEqual(value[0].format(format[0]))
        // expect(wrapper.find('input').at(1).value).toEqual(value[1].format(format[0]))
    })

    it('should render `format` correctly, <test prop:: format type other>', async () => {
        let format = ['YYYY/M/D', 'YYYY年MM月DD日']
        let value = ['2021/11/22', '2022年01月01日']
        const wrapper = mount(<RangePicker value={value} format={format} />)
        await sleep(100)
        expect(wrapper.find('input').at(0).value).toEqual('2021/11/22')
        expect(wrapper.find('input').at(1).value).toEqual('2022年01月01日')
    })

    it('should render disabled component when `disabled` set to true, <test prop:: disabled>', () => {
        const mockFn = jest.fn()
        const wrapper = mount(<RangePicker disabled onOpenChange={mockFn} />)
        // expect(wrapper.find(RangePicker).prop('disabled')).toBeTruthy()
        wrapper.simulate('focus')
        expect(mockFn).not.toHaveBeenCalled()
        expect(wrapper.find(`.${_PREFIX_CLS}-range`).hasClass(`${_PREFIX_CLS}-disabled`)).toBe(true)
    })

    // QDJCJS-6852 【DatePicker重构】增加默认值allowClear=true
    it('allowClear test, <test prop:: allowClear>', () => {
        // allowClear = false 时任何情况clear按钮都不存在
        let wrapper = mount(<RangePicker allowClear={false} />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-clear`)).toEqual(false)
        wrapper = mount(<RangePicker allowClear={false} value={['2021-10-10', '2022-03-10']} />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-clear`)).toEqual(false)

        // allowClear默认为true时
        // input框为空时不存在clear按钮
        wrapper = mount(<RangePicker />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-clear`)).toEqual(false)
        // input框不为空时存在clear按钮
        wrapper = mount(<RangePicker value={['2021-10-10', '2022-03-10']} />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-clear`)).toEqual(true)
    })
})

// * Panel 用例
describe('RangePicker Panel: ', () => {
    ;['time', 'date', 'week', 'month', 'quarter', 'year'].forEach(item => {
        it('should render picker correct when `picker` set to `time`|| `date`|| `week` || `month` || `quarter` || `year`, <test prop:: picker>', async () => {
            const wrapper = mount(<RangePicker open />)
            await sleep(100)
            expect(wrapper.find(`.${_PREFIX_CLS}-date-range-wrapper`)).toHaveLength(1)
            wrapper.setProps({picker: item})
            wrapper.update()
            expect(wrapper.find(`.${_PREFIX_CLS}-${item}-range-wrapper`)).toHaveLength(1)
        })
    })
    it('should show panel when `open` set to true', () => {
        const wrapper = mount(<RangePicker />)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(0)
        wrapper.unmount()
        // wrapper.setProps({open: true})
        // expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(1)
        // wrapper.unmount()
        // wrapper.setProps({open: false})
        // expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(0)
    })
    it('should show panel when `open` set to true dropDoen show', async () => {
        const wrapper = mount(<RangePicker open />)
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(1)
        wrapper.unmount()
    })

    it('should show hot button [today] when `showToday` set to true', () => {
        const today = moment().format('YYYY-MM-DD')
        const wrapper = mount(<RangePicker open />)
        expect(wrapper.find(`.${_PREFIX_CLS}-today-btn`)).toHaveLength(0)
        // wrapper.setProps({showToday: true})
        // expect(wrapper.find(`.${_PREFIX_CLS}-today-btn`)).toHaveLength(2)

        // wrapper.find(`.${_PREFIX_CLS}-today-btn`).at(0).simulate('click')
        // expect(wrapper.find('input').at(0).props().value).toBe(today)
        // expect(wrapper.find(`.${_PREFIX_CLS}-cell-today`).at(0).hasClass(`${_PREFIX_CLS}-cell-selected`)).toBe(false)

        // wrapper.find(`.${_PREFIX_CLS}-today-btn`).at(1).simulate('click')
        // expect(wrapper.find('input').at(1).props().value).toBe(today)
        // expect(wrapper.find(`.${_PREFIX_CLS}-cell-today`).at(0).hasClass(`${_PREFIX_CLS}-cell-selected`)).toBe(true)

        // wrapper.setProps({showToday: false})
        // expect(wrapper.find(`.${_PREFIX_CLS}-today-btn`)).toHaveLength(0)
    })

    it('should show hot button [today] when `showToday` set to true other', async() => {
        const today = moment().format('YYYY-MM-DD')
        const wrapper = mount(<RangePicker open showToday={true} />)
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-today-btn`)).toHaveLength(2)

        wrapper.find(`.${_PREFIX_CLS}-today-btn`).at(0).simulate('click')
        expect(wrapper.find('input').at(0).props().value).toBe(today)
        expect(wrapper.find(`.${_PREFIX_CLS}-cell-today`).at(0).hasClass(`${_PREFIX_CLS}-cell-selected`)).toBe(false)

        wrapper.find(`.${_PREFIX_CLS}-today-btn`).at(1).simulate('click')
        expect(wrapper.find('input').at(1).props().value).toBe(today)
        expect(wrapper.find(`.${_PREFIX_CLS}-cell-today`).at(0).hasClass(`${_PREFIX_CLS}-cell-selected`)).toBe(true)
    })

    it('should show time panel when `showTime` set to true', async () => {
        const today = moment().format('YYYY-MM-DD')
        const wrapper = mount(<RangePicker open showTime />)
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-datetime-panel`)).toHaveLength(1)

        wrapper.setProps({value: today})
        wrapper.find(`.${_PREFIX_CLS}-cell-today`).at(0).simulate('click')
        for (let i = 0; i < 3; i++) {
            wrapper
                .find(`.${_PREFIX_CLS}-time-panel-column`)
                .at(i)
                .find(`.${_PREFIX_CLS}-time-panel-cell`)
                .at(i * 5 + 3)
                .simulate('click')
        }
        wrapper.find(`.${_PREFIX_CLS}-ok`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-input-active input`).at(0).value).toEqual(
            `${today} 03:08:13`
        )
    })

    it('should disable time cell when `disabledTime` set true', async () => {
        function range(start, end) {
            const result = []
            for (let i = start; i < end; i++) {
                result.push(i)
            }
            return result
        }

        function disabledRangeTime(_, type) {
            if (type === 'start') {
                return {
                    disabledHours: () => range(0, 60).splice(4, 20),
                    disabledMinutes: () => range(30, 60),
                    disabledSeconds: () => [55, 56]
                }
            }
            return {
                disabledHours: () => range(0, 60).splice(20, 4),
                disabledMinutes: () => range(0, 31),
                disabledSeconds: () => [55, 56]
            }
        }

        const today = moment().format('YYYY-MM-DD')
        const wrapper = mount(<RangePicker open showTime disabledTime={disabledRangeTime} />)
        await sleep(100)
        wrapper.setProps({value: today})
        wrapper.find(`.${_PREFIX_CLS}-cell-today`).at(0).simulate('click')
        // 小时
        expect(
            wrapper
                .find(`.${_PREFIX_CLS}-time-panel-column`)
                .at(0)
                .find(`.${_PREFIX_CLS}-time-panel-cell`)
                .at(3)
                .hasClass(`${_PREFIX_CLS}-time-panel-cell-disabled`)
        ).toBe(false)
        expect(
            wrapper
                .find(`.${_PREFIX_CLS}-time-panel-column`)
                .at(0)
                .find(`.${_PREFIX_CLS}-time-panel-cell`)
                .at(4)
                .hasClass(`${_PREFIX_CLS}-time-panel-cell-disabled`)
        ).toBe(true)
        // 分钟
        expect(
            wrapper
                .find(`.${_PREFIX_CLS}-time-panel-column`)
                .at(1)
                .find(`.${_PREFIX_CLS}-time-panel-cell`)
                .at(29)
                .hasClass(`${_PREFIX_CLS}-time-panel-cell-disabled`)
        ).toBe(false)
        expect(
            wrapper
                .find(`.${_PREFIX_CLS}-time-panel-column`)
                .at(1)
                .find(`.${_PREFIX_CLS}-time-panel-cell`)
                .at(30)
                .hasClass(`${_PREFIX_CLS}-time-panel-cell-disabled`)
        ).toBe(true)
        // 秒
        expect(
            wrapper
                .find(`.${_PREFIX_CLS}-time-panel-column`)
                .at(2)
                .find(`.${_PREFIX_CLS}-time-panel-cell`)
                .at(57)
                .hasClass(`${_PREFIX_CLS}-time-panel-cell-disabled`)
        ).toBe(false)
        expect(
            wrapper
                .find(`.${_PREFIX_CLS}-time-panel-column`)
                .at(2)
                .find(`.${_PREFIX_CLS}-time-panel-cell`)
                .at(56)
                .hasClass(`${_PREFIX_CLS}-time-panel-cell-disabled`)
        ).toBe(true)
    })

    it('should render  proper language with `locale`, <test prop:: locale>', async () => {
        // const wrapper = mount(<RangePicker open value={['2021-10-10', '2022-03-10']} />)
        // await sleep(100)
        let {baseElement} = render(<RangePicker open value={['2021-10-10', '2022-03-10']} />)
        // expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-month-btn`)[0].innerHTML).toEqual('10月11月')
        await waitFor(() => {
                expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-month-btn`)[0].textContent).toEqual('10月')
                expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-month-btn`)[1].textContent).toEqual('3月')
                // expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-content`)[0].querySelector('thead th')[1].textContent).toEqual('二')
            })
        // expect(wrapper.find(`.${_PREFIX_CLS}-month-btn`).at(0).textContent).toEqual('10月11月')
        // expect(wrapper.find(`.${_PREFIX_CLS}-content`).at(0).find('thead th').at(1).text()).toEqual('二')

        // wrapper.setProps({locale: 'en'})
        // expect(wrapper.find(`.${_PREFIX_CLS}-month-btn`).text()).toEqual('OctNov')
        // expect(wrapper.find(`.${_PREFIX_CLS}-content`).at(0).find('thead th').at(1).text()).toEqual('Mo')

        // wrapper.setProps({locale: ''})
        // expect(wrapper.find(`.${_PREFIX_CLS}-month-btn`).text()).toEqual('10月11月')
        // expect(wrapper.find(`.${_PREFIX_CLS}-content`).at(0).find('thead th').at(1).text()).toEqual('二')
    })
    it('should render  proper language with `locale`, <test prop:: locale en>', async () => {
        // const wrapper = mount(<RangePicker open value={['2021-10-10', '2022-03-10']} />)
        // await sleep(100)
        let {baseElement} = render(<RangePicker locale="en" open value={['2021-10-10', '2022-03-10']} />)
        // expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-month-btn`)[0].innerHTML).toEqual('10月11月')
        await waitFor(() => {
                expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-month-btn`)[0].textContent).toEqual('Oct')
                expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-month-btn`)[1].textContent).toEqual('Mar')
                // expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-content`)[0].querySelector('thead th')[1].textContent).toEqual('Mo')
            })
    })

    it('should render panel defaultValue with `defaultPickerValue`, <test prop:: defaultPickerValue>', async () => {
        // const wrapper = mount(<RangePicker open defaultPickerValue={[moment('2021-12-10'), moment('2022-03-10')]} />)
        // expect(wrapper.find(`.${_PREFIX_CLS}-year-btn`).text()).toEqual('2021年2022年')
        // expect(wrapper.find(`.${_PREFIX_CLS}-month-btn`).text()).toEqual('12月1月')
        let {baseElement} = render(<RangePicker open defaultPickerValue={[moment('2021-12-10'), moment('2022-03-10')]} />)
        // expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-month-btn`)[0].innerHTML).toEqual('10月11月')
        await waitFor(() => {
                expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-year-btn`)[0].textContent).toEqual('2021年')
                expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-month-btn`)[0].textContent).toEqual('12月')
                expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-year-btn`)[1].textContent).toEqual('2022年')
                expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-month-btn`)[1].textContent).toEqual('4月')
                // expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-content`)[0].querySelector('thead th')[1].textContent).toEqual('二')
            })
    })

    it('should render panel defaultValue with `defaultPickerValue`, <test prop:: defaultPickerValue>, <test prop:: showTime>, <test prop:: use12Hours>', async () => {
        const wrapper = mount(<RangePicker open showTime use12Hours={false} />)
        await sleep(1000)
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(0).find('li')).toHaveLength(24)
        wrapper.setProps({use12Hours: true})
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(0).find('li')).toHaveLength(12)
    })

    it('should allow start date or end date empty when it’s `allowEmpty` set to true, <test prop:: allowEmpty>', () => {
        const today = moment().format('YYYY-MM-DD')
        const nextMonthDate = moment().add(1, 'months').startOf('month').add(15, 'days').format('YYYY-MM-DD')
        const wrapper = mount(<RangePicker />)
        // 默认start、end均不允许为空
        wrapper.setProps({open: true})
        wrapper.find(`[title='${today}']`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).value).toEqual(today)
        wrapper.setProps({open: false})
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).value).toEqual('')
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).value).toEqual('')

        // 允许start date为空
        wrapper.setProps({open: true, allowEmpty: [true, false]})
        wrapper.find(`[title='${nextMonthDate}']`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).value).toEqual(
            nextMonthDate
        )
        wrapper.setProps({open: false})
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).value).toEqual(
            nextMonthDate
        )

        // 允许end date为空
        wrapper.setProps({open: true, allowEmpty: [false, true]})
        wrapper.find(`[title='${today}']`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).value).toEqual(today)
        wrapper.setProps({open: false})
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).value).toEqual(today)
    })

    it('ranges test, <test prop:: ranges>, <test prop:: activePresetKey>, <test prop:: presets>, <test prop:: onPresetChange>', async () => {
        const today = moment().format('YYYY-MM-DD')
        const presetChangeFn = jest.fn()
        let ranges = {
            本日: () => [moment().startOf('day'), moment().endOf('day')],
            本周: () => [moment().startOf('week'), moment().endOf('week')],
            本月: [moment().startOf('month'), moment().endOf('month')],
            本季度: [moment().startOf('quarter'), moment().endOf('quarter')],
            本年: [moment().startOf('year'), moment().endOf('year')]
        }
        let wrapper = mount(<RangePicker open onPresetChange={presetChangeFn} />)
        await sleep(100)
        wrapper.setProps({ranges, activePresetKey: '本月'})
        // 本日
        wrapper.find(`.${_PREFIX_CLS}-preset span`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).value).toEqual(today)
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).value).toEqual(today)
        expect(presetChangeFn).toHaveBeenCalledTimes(1)

        // 本季度
        wrapper.find(`.${_PREFIX_CLS}-preset span`).at(3).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).value).toEqual(
            moment().startOf('quarter').format('YYYY-MM-DD')
        )
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).value).toEqual(
            moment().endOf('quarter').format('YYYY-MM-DD')
        )
        expect(presetChangeFn).toHaveBeenCalledTimes(2)
        wrapper.unmount()

        ranges = [
            {
                label: '本日',
                key: 'currentDay',
                value: [moment().startOf('day'), moment().endOf('day')]
            },
            {
                label: '本周',
                key: 'currentWeek',
                value: [moment().startOf('week'), moment().endOf('week')]
            },
            {
                label: '本季度',
                key: 'currentQuarter',
                value: [moment().startOf('quarter'), moment().endOf('quarter')]
            }
        ]
        wrapper = mount(<RangePicker open presets={ranges} onPresetChange={presetChangeFn} activePresetKey='本周' />)
        await sleep(100)
        // 本日
        wrapper.find(`.${_PREFIX_CLS}-preset span`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).value).toEqual(today)
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).value).toEqual(today)
        // 本季度
        wrapper.find(`.${_PREFIX_CLS}-preset span`).at(2).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).value).toEqual(
            moment().startOf('quarter').format('YYYY-MM-DD')
        )
        // expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).value).toEqual(
        //     moment().endOf('quarter').format('YYYY-MM-DD')
        // )
    })

    it('showRangeLabel test, <test prop:: showRangeLabel>', async () => {
        const today = moment().format('YYYY-MM-DD')
        const ranges = {
            今天: () => [moment().startOf('day'), moment().endOf('day')],
            本周: () => [moment().startOf('week'), moment().endOf('week')]
        }
        let wrapper = mount(<RangePicker open showRangeLabel ranges={ranges} />)
        await sleep(2000)
        wrapper.find(`.${_PREFIX_CLS}-preset span`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).value).toEqual(
            '今天(' + today + ')'
        )
        expect(wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).value).toEqual(
            '今天(' + today + ')'
        )
    })

    it('should render panel on correct node with `getCalendarContainer`, <test prop:: getCalendarContainer>', async () => {
        const wrapper = mount(
            <div id='popupContainer'>
                <RangePicker open getCalendarContainer={() => document.getElementById('popupContainer')} />
            </div>
        )
        await sleep(100)
        expect(wrapper.find('#popupContainer').exists(`.${_PREFIX_CLS}-dropdown`)).toBeTruthy()
    })

    it('should render custom date cell correct with `dateCellRender`, <test prop:: dateCellRender>', async () => {
        const render = (currentDate, today) => {
            if (currentDate.format('YYYY-MM-DD') === moment('2021-10-06').format('YYYY-MM-DD')) {
                return <Icon type='uf-star' />
            } else {
                return currentDate.get('date')
            }
        }
        // 兼容 dateCellRender
        const wrapper = mount(<DatePicker open dateCellRender={render} value='2021-10-10' />)
        // let {baseElement} = render(<DatePicker open dateCellRender={render} value='2021-10-10' />)
        // await waitFor(() => {
        //     expect(baseElement.querySelector(`.${_PREFIX_CLS}-cell[title='2021-10-06'] i`).classList.contains('uf-start')).toEqual(true)
        // })
        await actWait()
        expect(
            wrapper.find(`.${_PREFIX_CLS}-cell[title='2021-10-06'] i`).hasClass('uf-star')
        ).toEqual(true)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-cell[title='2021-10-07']`).find('uf-star').exists()
        ).toEqual(false)
    })

    it('should have custom Icon when `clearIcon` or `suffixIcon` is provided, <test prop:: clearIcon>, <test prop:: suffixIcon>', () => {
        const wrapper = shallow(
            <RangePicker clearIcon={() => <Icon type='uf-bell-o' />} suffixIcon={<Icon type='uf-cart' />} />
        )
        expect(wrapper.find('.uf-bell-o')).toBeTruthy()
        expect(wrapper.find('.uf-cart')).toBeTruthy()
        wrapper.setProps({renderIcon: <Icon type='uf-qq' />, suffixIcon: null})
        expect(wrapper.find('.uf-qq')).toBeTruthy()
    })
    it('should have custom Icon when `closeIcon` or `renderIcon` is provided, <test prop:: closeIcon>, <test prop:: renderIcon>', () => {
        const wrapper = shallow(
            <RangePicker closeIcon={() => <Icon type='uf-bell-o' />} renderIcon={<Icon type='uf-cart' />} />
        )
        expect(wrapper.find('.uf-bell-o')).toBeTruthy()
        expect(wrapper.find('.uf-cart')).toBeTruthy()
    })
    it('renderExtraHeader test, <test prop:: renderExtraHeader>, <test prop:: renderFooter>', async () => {
        const renderExtraHeader = () =>
            React.createElement(
                'ul',
                null,
                Array(2)
                    .fill(null)
                    .map((item, i) => {
                        return React.createElement('li', {key: i}, `自定义header line${i + 1}`)
                    })
            )
        // showTime: false
        let wrapper = mount(<RangePicker renderExtraHeader={renderExtraHeader} placeholder='开始 - 结束' open />)
        await sleep(2000)
        expect(wrapper.find(`.${_PREFIX_CLS}-header-extra`).find('ul').find('li').at(0).text()).toEqual('自定义header line1')
        expect(wrapper.find(`.${_PREFIX_CLS}-header-extra`).find('ul').find('li').at(1).text()).toEqual('自定义header line2')
    })
    it('renderExtraFooter test, <test prop:: renderExtraFooter>, <test prop:: renderFooter>', async () => {
        const renderExtraFooter = () =>
            React.createElement(
                'ul',
                null,
                Array(2)
                    .fill(null)
                    .map((item, i) => {
                        return React.createElement('li', {key: i}, `自定义footer line${i + 1}`)
                    })
            )
        // showTime: false
        let wrapper = mount(<RangePicker renderExtraFooter={renderExtraFooter} placeholder='开始 - 结束' open />)
        await sleep(2000)
        expect(wrapper.find(`.${_PREFIX_CLS}-footer`).find('ul').find('li').at(0).text()).toEqual('自定义footer line1')
        expect(wrapper.find(`.${_PREFIX_CLS}-footer`).find('ul').find('li').at(1).text()).toEqual('自定义footer line2')

        // showTime: true
        wrapper = mount(<RangePicker renderFooter={renderExtraFooter} placeholder='开始 - 结束' open showTime />)
        expect(wrapper.find(`.${_PREFIX_CLS}-footer`).find('ul').find('li').at(0).text()).toEqual('自定义footer line1')
        expect(wrapper.find(`.${_PREFIX_CLS}-footer`).find('ul').find('li').at(1).text()).toEqual('自定义footer line2')
    })

    // xit("should allow start time and end time exchange when it's `order` set to true & `picker` set to 'time', <test prop:: order>", () => {
    //     // TODO 默认用例错误
    //     const wrapper = mount(<RangePicker picker='time' />)
    //     wrapper.setProps({
    //         open: true
    //     })
    //     // 默认start大于end时交换order
    //     for (let i = 0; i < 3; i++) {
    //         wrapper
    //             .find(`.${_PREFIX_CLS}-time-panel-column`)
    //             .at(i)
    //             .find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
    //             .at(5)
    //             .simulate('click')
    //     }
    //     wrapper.find(`.${_PREFIX_CLS}-ok`).at(0).simulate('click')
    //     expect(wrapper.render().find(`.${_PREFIX_CLS}-input input`).get(0).attribs).toHaveProperty('value', `05:05:05`)
    //     wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).simulate('focus')
    //     for (let i = 0; i < 3; i++) {
    //         wrapper
    //             .find(`.${_PREFIX_CLS}-time-panel-column`)
    //             .at(i)
    //             .find(`.${_PREFIX_CLS}-time-panel-cell`)
    //             .at(3)
    //             .simulate('click')
    //     }
    //     wrapper.find(`.${_PREFIX_CLS}-ok`).at(0).simulate('click')
    //     expect(wrapper.render().find(`.${_PREFIX_CLS}-input input`).get(0).attribs).toHaveProperty('value', `03:03:03`)
    //     expect(wrapper.render().find(`.${_PREFIX_CLS}-input input`).get(1).attribs).toHaveProperty('value', `05:05:05`)

    //     // order为false时，不交换位置
    //     wrapper.setProps({order: false})
    //     // 默认start大于end时交换order
    //     for (let i = 0; i < 3; i++) {
    //         wrapper
    //             .find(`.${_PREFIX_CLS}-time-panel-column`)
    //             .at(i)
    //             .find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
    //             .at(5)
    //             .simulate('click')
    //     }
    //     wrapper.find(`.${_PREFIX_CLS}-ok`).at(0).simulate('click')
    //     wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).simulate('focus')
    //     for (let i = 0; i < 3; i++) {
    //         wrapper
    //             .find(`.${_PREFIX_CLS}-time-panel-column`)
    //             .at(i)
    //             .find(`.${_PREFIX_CLS}-time-panel-cell`)
    //             .at(3)
    //             .simulate('click')
    //     }
    //     wrapper.find(`.${_PREFIX_CLS}-ok`).at(0).simulate('click')
    //     expect(wrapper.render().find(`.${_PREFIX_CLS}-input input`).get(0).attribs).toHaveProperty('value', `05:05:05`)
    //     expect(wrapper.render().find(`.${_PREFIX_CLS}-input input`).get(1).attribs).toHaveProperty('value', `03:03:03`)
    // })
})

// * Events Panel用例
// TODO: 样式、方法、值；输入的内容显示到input，区分picker、format、触发方式如picker-cell，ok button
describe('RangePicker Panel Events: ', () => {
    it('should render correct values and execute `onChange` callback when `showTime` not exists and range selected, <test prop:: antd>', async () => {
        const changeFn = jest.fn()
        const format = 'YYYY-MM-DD'
        const today = moment(),
            todayFmt = today.format(format)
        const nextMonthDate = moment().add(1, 'months').startOf('month').add(15, 'days'),
            nextMonthDateFmt = nextMonthDate.format(format)
        const inRangeDate = moment().add(1, 'months').startOf('month').add(5, 'days'),
            inRangeDateFmt = inRangeDate.format(format)
        const wrapper = mount(<RangePicker open onChange={changeFn} />)
        await sleep(100)
        wrapper.find(`[title='${todayFmt}']`).at(0).simulate('click')
        wrapper.find(`[title='${nextMonthDateFmt}']`).at(0).simulate('click')
        // expect(wrapper.find(`[title='${todayFmt}']`).at(0).hasClass(`${_PREFIX_CLS}-cell-range-start`)).toBeTruthy()
        // expect(wrapper.find(`[title='${nextMonthDateFmt}']`).hasClass(`${_PREFIX_CLS}-cell-range-end`)).toBeTruthy()
        // expect(
        //     wrapper.find(`[title='${inRangeDateFmt}']`).at(0).hasClass(`${_PREFIX_CLS}-cell-in-range`)
        // ).toBeTruthy()
        // expect(changeFn).toHaveBeenCalledTimes(1)

        // wrapper.setProps({antd: true})
        // wrapper.find(`[title='${todayFmt}']`).at(0).simulate('click')
        // wrapper.find(`[title='${nextMonthDateFmt}']`).at(0).simulate('click')
        // expect(changeFn).toHaveBeenCalledTimes(2)

        // todo 回调参数不匹配，组件点击返回moment与mock的moment不同时触发，无法严格一致
        // expect(changeFn).toHaveBeenCalledWith(
        //   [today, nextMonthDate],
        //   [todayFmt, nextMonthDateFmt]
        // )
    })

    it('should render correct value and execute `onPanelChange` callback when both halfYear selected, <test prop:: onSelect>, <test prop:: onPanelChange>', async () => {
        const panelChangeFn = jest.fn(),
            selectFn = jest.fn()
        let wrapper = mount(
            <RangePicker
                picker='halfYear'
                open
                locale='zh-cn'
                onPanelChange={panelChangeFn}
                onSelect={selectFn}
            />
        )
        await sleep(100)
        wrapper.find("[title='上半年']").at(0).simulate('click')
        expect(selectFn).toHaveBeenCalledTimes(1)
        wrapper.find("[title='下半年']").at(0).simulate('click')
        expect(selectFn).toHaveBeenCalledTimes(2)
        expect(panelChangeFn).toHaveBeenCalledTimes(1)
    })

    it('should render correct values and execute `onCalendarChange` callback when start or end date selected, <test prop:: onCalendarChange>', async () => {
        const calendarChangeFn = jest.fn()
        const format = 'YYYY-MM-DD'
        const today = moment(moment().format(format)),
            todayFmt = today.format(format)
        const nextMonthDate = moment().add(1, 'months').startOf('month').add(15, 'days'),
            nextMonthDateFmt = nextMonthDate.format(format)
        const wrapper = mount(<RangePicker open onCalendarChange={calendarChangeFn} />)
        await sleep(100)
        wrapper.find(`[title='${todayFmt}']`).at(0).simulate('click')
        expect(calendarChangeFn).toHaveBeenCalledTimes(1)
        // todo 回调参数不匹配，组件点击返回moment与mock的moment不同时触发，无法严格一致
        // expect(calendarChangeFn).toHaveBeenCalledWith(
        //   [today, null],
        //   [todayFmt, ''],
        //   { range: 'start' }
        // )
        wrapper.find(`[title='${nextMonthDateFmt}']`).simulate('click')
        expect(calendarChangeFn).toHaveBeenCalledTimes(2)
        // todo 回调参数不匹配
        // expect(calendarChangeFn).toHaveBeenCalledWith(
        //   [today, nextMonthDate],
        //   [todayFmt, nextMonthDateFmt],
        //   { range: 'end' }
        // )
    })
})

describe('mode test', () => {
    ;['time', 'date', 'week', 'month', 'quarter', 'year', 'decade'].forEach(item => {
        it('mode test, <test prop:: mode>', async () => {
            let wrapper = mount(<RangePicker open />)
            await sleep(100)
            wrapper.setProps({mode: item})
            expect(wrapper.exists(`.${_PREFIX_CLS}-${item}-panel`)).toEqual(true)
        })
    })
})

describe('fieldid, <test prop:: fieldid>', () => {
    it('@fieldid,"***_start_input"', () => {
        let wrapper = mount(<RangePicker  fieldid='fieldid-id' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').instance().getAttribute('fieldid')).toEqual(
            'fieldid-id_start_input'
        )
        // wrapper = mount(<RangePicker fieldid='fieldid-id' />)
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').instance().getAttribute('fieldid')).toEqual(
        //     'fieldid-id_start_input'
        // )
    })
    it('@fieldid,"***_end_input"', () => {
        let wrapper = mount(<RangePicker fieldid='fieldid-id' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').instance().getAttribute('fieldid')).toEqual(
            'fieldid-id_end_input'
        )
        // wrapper = mount(<RangePicker fieldid='fieldid-id' />)
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').instance().getAttribute('fieldid')).toEqual(
        //     'fieldid-id_end_input'
        // )
    })
    it('@fieldid,"***_clear"', async () => {
        let defaultValue = ['2021-02-02', '2022-03-03']
        let wrapper = mount(<RangePicker defaultValue={defaultValue} fieldid='fieldid-id' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-clear span`).instance().getAttribute('fieldid')).toEqual('fieldid-id_clear')
        // wrapper = mount(<RangePicker fieldid='fieldid-id' defaultValue={defaultValue} />)
        // await sleep(1000)
        // expect(wrapper.find(`.${_PREFIX_CLS}-clear span`).instance().getAttribute('fieldid')).toEqual(
        //     'fieldid-id_clear'
        // )
    })
    it('@fieldid,"***_suffix"', async () => {
        let wrapper = mount(<RangePicker fieldid='fieldid-id' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-suffix span`).instance().getAttribute('fieldid')).toEqual('fieldid-id_suffix')
        // wrapper = mount(<RangePicker fieldid='fieldid-id' />)
        // await sleep(1000)
        // expect(wrapper.find(`.${_PREFIX_CLS}-suffix span`).instance().getAttribute('fieldid')).toEqual(
        //     'fieldid-id_suffix'
        // )
    })
    // 修复RangePicker左右面板fieldid相同问题
    it('@fieldid,"***_panel"', async () => {
        const wrapper = mount(<RangePicker open fieldid='fieldid-id' />)
        await sleep(1000)
        expect(wrapper.find(`.${_PREFIX_CLS}-date-panel`).at(0).instance().getAttribute('fieldid')).toEqual('fieldid-id_left_panel')
        expect(wrapper.find(`.${_PREFIX_CLS}-date-panel`).at(1).instance().getAttribute('fieldid')).toEqual('fieldid-id_right_panel')
    })
    // QDJCJS-9576 RangePicker快捷键及今天、确定按钮添加fieldid
    it('fieldid test', async () => {
        let wrapper = mount(<RangePicker open fieldid='fieldid-id' showTime />)
        await sleep(1000)
        expect(wrapper.find(`.${_PREFIX_CLS}-date-panel`).instance().getAttribute('fieldid')).toEqual('fieldid-id_panel')
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel`).instance().getAttribute('fieldid')).toEqual('fieldid-id-time-panel')
        expect(wrapper.find(`.${_PREFIX_CLS}-ranges`).instance().getAttribute('fieldid')).toEqual('fieldid-id-ranges')
        expect(wrapper.find(`.${_PREFIX_CLS}-ok`).instance().getAttribute('fieldid')).toEqual('fieldid-id-ok')

        let ranges = {
            本日: () => [moment().startOf('day'), moment().endOf('day')],
            本周: () => [moment().startOf('week'), moment().endOf('week')]
        }
        wrapper = mount(<RangePicker open fieldid='fieldid-id' ranges={ranges} />)
        await sleep(1000)
        expect(wrapper.find(`.${_PREFIX_CLS}-preset`).at(0).instance().getAttribute('fieldid')).toEqual('fieldid-id-本日')
        expect(wrapper.find(`.${_PREFIX_CLS}-preset`).at(1).instance().getAttribute('fieldid')).toEqual('fieldid-id-本周')
    })
})
describe('id, <test prop:: id>', () => {
    it('@id,"***_start_input"', () => {
        let wrapper = null
        wrapper = mount(<RangePicker id='id-id' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').instance().getAttribute('id')).toEqual('id-id_start_input')
        // wrapper = mount(<RangePicker id='id-id' />)
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').instance().getAttribute('id')).toEqual(
        //     'id-id_start_input'
        // )
    })
    it('@id,"***_end_input"', async () => {
        let wrapper = null
        wrapper = mount(<RangePicker id='id-id' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').instance().getAttribute('id')).toEqual('id-id_end_input')
        // wrapper = mount(<RangePicker id='id-id' />)
        // expect(wrapper1.find(`.${_PREFIX_CLS}-input`).at(1).find('input').instance().getAttribute('id')).toEqual(
        //     'id-id_end_input'
        // )
    })
})

describe('callback', () => {
    it('should execute `onBlur` callback, <test prop:: onBlur>, <test prop:: onStartInputBlur>, <test prop:: onEndInputBlur>', async () => {
        const startFn = jest.fn(),
            endFn = jest.fn(),
            onblur = jest.fn()
        const wrapper = mount(
            <RangePicker
                value={['2020-10-10', '2020-11-10']}
                onStartInputBlur={startFn}
                onEndInputBlur={endFn}
                onBlur={onblur}
                format='YYYY/MM/DD'
                open
            />
        )
        await sleep(100)
        wrapper
            .find(`.${_PREFIX_CLS}-panel`)
            .at(0)
            .find(`.${_PREFIX_CLS}-content`)
            .find('tbody')
            .find('tr')
            .at(3)
            .find('td')
            .at(3)
            .find(`.${_PREFIX_CLS}-cell-inner`)
            .simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-input`).at(0).find('input').simulate('blur')
        expect(wrapper.find('input').at(0).prop('value')).toEqual('2020/10/22')
        wrapper
            .find(`.${_PREFIX_CLS}-panel`)
            .at(1)
            .find(`.${_PREFIX_CLS}-content`)
            .find('tbody')
            .find('tr')
            .at(3)
            .find('td')
            .at(3)
            .find(`.${_PREFIX_CLS}-cell-inner`)
            .simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-input`).at(1).find('input').simulate('blur')
        expect(wrapper.find('input').at(1).prop('value')).toEqual('2020/11/19')
        expect(onblur).toHaveBeenCalledTimes(2)
        wrapper.unmount()
    })
    it('should execute `onBlur` callback & value is empty, <test prop:: onBlur>', async () => {
        const onblur = jest.fn()
        const container = document.createElement('div')
        document.body.appendChild(container)

        let value = ['2020-03-10', '2020-11-10']
        const wrapper = mount(<RangePicker onBlur={onblur} />, {attachTo: container})
        wrapper.setProps({value})
        document
            .querySelectorAll(`.${_PREFIX_CLS}-input input`)[0]
            .dispatchEvent(new Event('change', {target: {value: '2022-10-10'}}))
        document
            .querySelectorAll(`.${_PREFIX_CLS}-input input`)[0]
            .dispatchEvent(new Event('blur', {target: {value: ''}})) // 覆盖率需单独dispatch blur
        await sleep(100)
        wrapper.update()
        expect(wrapper.find('input').at(0).prop('value')).toEqual(value[0])
        // expect(onblur).toHaveBeenCalledTimes(1) // 事件没执行，待查证
        document
            .querySelectorAll(`.${_PREFIX_CLS}-input input`)[1]
            .dispatchEvent(new Event('change', {target: {value: '2022-11-10'}}))
        document
            .querySelectorAll(`.${_PREFIX_CLS}-input input`)[1]
            .dispatchEvent(new Event('blur', {target: {value: ''}})) // 覆盖率需单独dispatch blur
        await sleep(100)
        wrapper.update()
        expect(wrapper.find('input').at(1).prop('value')).toEqual(value[1])
        // expect(onblur).toHaveBeenCalledTimes(2)
        wrapper.unmount()
    })
})

describe('部分基于jira补充', () => {
    // QDJCJS-9571修复结束日期面板不随开始日期选中值变动的问题
    it(' QDJCJS-9571', async () => {
        const wrapper = mount(<RangePicker value={['2020-10-10', '2020-11-10']} format='YYYY/MM/DD' open />)
        await sleep(100)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-panel`).at(1).find(`.${_PREFIX_CLS}-header-view`).find('button').at(0).text()
        ).toEqual('2020年')
        wrapper.find(`.${_PREFIX_CLS}-header-super-next-btn`).at(0).simulate('click')
        wrapper
            .find(`.${_PREFIX_CLS}-panel`)
            .at(0)
            .find('tr')
            .at(1)
            .find('td')
            .at(1)
            .find(`.${_PREFIX_CLS}-cell-inner`)
            .simulate('click')
        expect(
            wrapper.find(`.${_PREFIX_CLS}-panel`).at(1).find(`.${_PREFIX_CLS}-header-view`).find('button').at(0).text()
        ).toEqual('2021年')
    })
})

// QDJCJS-10438 Datepicker面板头部支持下拉
describe('Component: RangePicker', () => {
    it('picker is date, <test prop:: isHeaderSelect>', async () => {
        let focusFn = jest.fn()
        let wrapper = mount(
            <RangePicker defaultValue={[moment('2022-10-10'), moment('2023-10-10')]} open onInputFocus={focusFn} />
        )
        await actWait()
        // 左面板单独测试场景
        const panelLeft = wrapper.find(`.${_PREFIX_CLS}-panel`).at(0)
        expect(panelLeft.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(true)
        expect(panelLeft.find(`.${_PREFIX_CLS}-date-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
            true
        ) // 此时不存在遮罩层
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(false)

        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击左侧面板的顶部导航栏
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-header-select div`).at(0).hasClass(`${_PREFIX_CLS}-header-select-year`)
        ).toEqual(true)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-header-select div`).at(1).hasClass(`${_PREFIX_CLS}-header-select-month`)
        ).toEqual(true)
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).text()).toEqual('2022 年')
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-month-active`).text()).toEqual('10 月')
        expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().prop('style').opacity).toEqual('0.5') // 此时存在遮罩层
        expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().exists(`.${_PREFIX_CLS}-cell-inner`)).toEqual(
            false
        )

        wrapper.find(`.${_PREFIX_CLS}-header-select-year`).find('li').at(212 + 2024 - currentYear).simulate('click') // 点击下拉框中的2035年
        expect(wrapper.find(`.${_PREFIX_CLS}-year-btn`).at(0).text()).toEqual('2036年')
        // expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
        //     true
        // ) // 此时遮罩层消失?
        wrapper.find(`.${_PREFIX_CLS}-header-select-month`).find('li').at(2).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-month-btn`).at(0).text()).toEqual('3月')

        wrapper.find(`.${_PREFIX_CLS}-header-select-box`).at(0).find('div').last().simulate('click') // 点击左侧面板的顶部导航栏
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
        // expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().prop('style').opacity).toEqual('0.5')
        wrapper.find(`.${_PREFIX_CLS}-header-select-box`).at(0).find('div').last().simulate('click') // 再次点击左侧面板的顶部导航栏
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(false)
        expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
            true
        ) // 此时遮罩层消失

        // 右面板单独测试场景
        const panelRight = wrapper.find(`.${_PREFIX_CLS}-panel`).at(1)
        expect(panelRight.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(true)
        expect(panelRight.find(`.${_PREFIX_CLS}-date-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
            true
        ) // 此时不存在遮罩层
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(false)

        wrapper.find(`.${_PREFIX_CLS}-header-select-box`).at(1).find('div').last().simulate('click') // 点击右侧面板的顶部导航栏
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)

        wrapper.find(`.${_PREFIX_CLS}-header-select-box`).at(1).find('div').last().simulate('click') // 再次点击右侧面板的顶部导航栏
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(false)
        expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
            true
        ) // 此时遮罩层消失

        // 点击前进后退影响下拉框中的值（此时为2035年3月-2035年4月）
        wrapper.find(`.${_PREFIX_CLS}-header-next-btn`).at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-prev-btn`).at(0).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-prev-btn`).at(0).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-super-next-btn`).at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-super-prev-btn`).at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-super-prev-btn`).at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-select-box`).at(0).find('div').last().simulate('click') // 点击左侧面板的顶部导航栏
        wrapper.find(`.${_PREFIX_CLS}-header-select-box`).at(1).find('div').last().simulate('click') // 点击右侧面板的顶部导航栏
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).at(0).text()).toEqual('2034 年')
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).at(1).text()).toEqual('2034 年')
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-select-month-active`).at(0).text()).toEqual('2 月')
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-select-month-active`).at(1).text()).toEqual('3 月')

        // isHeaderSelect 设置为 false 时不存在这个节点
        wrapper.setProps({isHeaderSelect: false})
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(false)
    })

    let pickerArr = [
        {picker: 'date', left: '2022年 11月', right: '2022年 10月'},
        {picker: 'month', left: '2022-10年', right: '2023年'},
        {picker: 'year', left: '2020-2029', right: '2030-2039'}
    ]
    pickerArr.forEach(({picker, left, right}) => {
        it(`picker is ${picker} & show selectPanel & focus first input`, () => {
            let wrapper = mount(
                <RangePicker picker={picker} isHeaderSelect value={[moment('2022-10-10'), moment('2023-10-10')]} />
            )
            wrapper.find('input').at(0).simulate('focus')
            // expect(wrapper.find('RangePicker').at(0).state('leftValue')).toEqual(left)
            // expect(wrapper.find('RangePicker').at(0).state('rightValue')).toEqual(right)
        })
    })
    let pickerArr2 = [
        {picker: 'date', left: '2023年 11月', right: '2023年 10月'},
        {picker: 'month', left: '2023-10年', right: '2024年'},
        {picker: 'year', left: '2020-2029', right: '2030-2039'}
    ]
    pickerArr2.forEach(({picker, left, right}, i) => {
        it(`picker is ${picker} & show selectPanel & focus second input`, () => {
            document.body.innerHTML = ''
            const container = document.createElement('div')
            container.setAttribute('id', 'container')
            document.body.appendChild(container)
            let wrapper = mount(
                <RangePicker picker={picker} isHeaderSelect value={[moment('2022-10-10'), moment('2023-10-10')]} />,
                { attachTo: container }
            )
            // wrapper.find('RangePicker').at(1).props().onInputFocus(1, right, {target: {value: right}})
        })
    })
    // picker="halfYear"
    it('picker is halfYear', async () => {
        let wrapper = mount(
            <RangePicker picker='halfYear' defaultValue={[moment('2022-10-10'), moment('2023-10-10')]} open />
        )
        await sleep(100)
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(true)
        expect(wrapper.find(`.${_PREFIX_CLS}-halfYear-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
            true
        ) // 此时不存在遮罩层
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(false)

        // 点击左侧顶部导航栏
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click')
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-header-select div`).at(0).hasClass(`${_PREFIX_CLS}-header-select-year`)
        ).toEqual(true)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-header-select div`).at(0).hasClass(`${_PREFIX_CLS}-header-select-month`)
        ).toEqual(false)
        expect(wrapper.find(`.${_PREFIX_CLS}-halfYear-panel div`).last().prop('style').opacity).toEqual('0.5') // 此时存在遮罩层
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).text()).toEqual('2022 年')
        wrapper.find(`.${_PREFIX_CLS}-header-select-year`).find('li').at(212 + 2024 - currentYear).simulate('click') // 点击下拉框中的2035年
        expect(wrapper.find(`.${_PREFIX_CLS}-year-btn`).at(0).text()).toEqual('2036年')
        expect(wrapper.find(`.${_PREFIX_CLS}-halfYear-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
            true
        ) // 此时遮罩层消失
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(false) // 下拉框收起

        // 点击右侧顶部导航栏
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click')
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-header-select div`).at(0).hasClass(`${_PREFIX_CLS}-header-select-year`)
        ).toEqual(true)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-header-select div`).at(0).hasClass(`${_PREFIX_CLS}-header-select-month`)
        ).toEqual(false)
        expect(wrapper.find(`.${_PREFIX_CLS}-halfYear-panel div`).last().prop('style').opacity).toEqual('0.5') // 此时存在遮罩层
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).text()).toEqual('2036 年') // 之前点击左侧面板下拉框影响到右侧面板日期

        wrapper.find(`.${_PREFIX_CLS}-header-select-box`).at(1).find('div').last().simulate('click') // 再次点击右侧面板的顶部导航栏
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
        // expect(wrapper.find(`.${_PREFIX_CLS}-halfYear-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
        //     true
        // ) // 此时遮罩层消失

        // 点击前进后退影响下拉框中的值（此时为2034年-2035年）
        wrapper.find(`.${_PREFIX_CLS}-header-super-next-btn`).at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-super-prev-btn`).at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-super-prev-btn`).at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-select-box`).at(0).find('div').last().simulate('click') // 点击左侧面板的顶部导航栏
        wrapper.find(`.${_PREFIX_CLS}-header-select-box`).at(1).find('div').last().simulate('click') // 点击右侧面板的顶部导航栏
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).at(0).text()).toEqual('2036 年')
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).at(1).text()).toEqual('2035 年')

        // isHeaderSelect 设置为 false 时不存在这个节点
        wrapper.setProps({isHeaderSelect: false})
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(false)
    })
    // picker='week'
    it('picker is week', async () => {
        let wrapper = mount(
            <RangePicker picker='week' defaultValue={[moment('2022-10-10'), moment('2023-10-10')]} open />
        )
        await sleep(100)
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(true)
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击左侧面板的顶部导航栏
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(1).simulate('click') // 点击右侧面板的顶部导航栏
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).at(0).text()).toEqual('2022 年')
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).at(1).text()).toEqual('2022 年')
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-month-active`).at(0).text()).toEqual('10 月')
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-select-month-active`).at(1).text()).toEqual('11 月')
        wrapper.setProps({isHeaderSelect: false})
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(false)
    })
    // picker='month' && picker='quarter'
    ;['month', 'quarter'].forEach(item => {
        it('picker is month || quarter', async () => {
            let wrapper = mount(
                <RangePicker open picker={item} defaultValue={[moment('2022-10-10'), moment('2023-10-10')]} />
            )
            await sleep(100)
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(true)
            wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击左侧面板的顶部导航栏
            wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(1).simulate('click') // 点击右侧面板的顶部导航栏
            expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year`)).toHaveLength(1)
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-year`)).toEqual(true) // 只有年选择下拉框
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-month`)).toEqual(false)
            expect(wrapper.find(`.${_PREFIX_CLS}-${item}-panel div`).last().prop('style').opacity).toEqual('0.5') // 此时存在遮罩层
            wrapper.find(`.${_PREFIX_CLS}-header-select-year`).at(0).find('li').at(212 + 2024 - currentYear).simulate('click')
            expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year`)).toHaveLength(0) // 下拉框收起一个
            expect(
                wrapper.find(`.${_PREFIX_CLS}-${item}-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)
            ).toEqual(true) // 此时遮罩层消失
            wrapper.setProps({isHeaderSelect: false})
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(false)
        })
    })
    // picker='year'
    it('picker is year', async () => {
        let wrapper = mount(
            <RangePicker open picker='year' defaultValue={[moment('2022-10-10'), moment('2023-10-10')]} />
        )
        await sleep(100)
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(true)
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击左侧面板的顶部导航栏
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(1).simulate('click') // 点击右侧面板的顶部导航栏
        await sleep(100)
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-year`)).toEqual(true) // 只有年选择下拉框
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-month`)).toEqual(false)
        expect(wrapper.find(`.${_PREFIX_CLS}-year-panel div`).last().prop('style').opacity).toEqual('0.5') // 此时存在遮罩层
        wrapper.find(`.${_PREFIX_CLS}-header-select-year`).find('li').at(19).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year`)).toHaveLength(0) // 下拉框收起一个
        expect(wrapper.find(`.${_PREFIX_CLS}-year-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
            true
        ) // 此时遮罩层消失
        wrapper.setProps({isHeaderSelect: false})
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(false)
    })
})

// 半年范围
describe('Component: RangePicker.halfYear', () => {
    // 多语
    it('picker is halfYear & props a moment array, <test prop:: onChange>', async () => {
        const changeFn = jest.fn()
        const container = document.createElement('div')
        container.setAttribute('id', 'container')
        document.body.appendChild(container)

        let wrapper = mount(
            <RangePicker picker='halfYear' locale='en' value={[moment('2023-02-03'), '2023-SH']} onChange={changeFn} open/>,
            { attachTo: container }
        )
        await sleep(100)
        expect(wrapper.find('input').at(0).prop('value')).toEqual('2023-FH')
        expect(wrapper.find('input').at(1).prop('value')).toEqual('2023-SH')

        wrapper.find(`[title='First Half']`).at(0).simulate('click')
        wrapper.find(`[title='Second Half']`).at(0).simulate('click')
        expect(changeFn).toHaveBeenCalledTimes(2)
    })
})

describe('Component: RangePicker', () => {
    // 禁用日期是否有效
    it('iniit value should be clear when it is a disabledDate, <test prop:: disabledDateValid>', async () => {
        const changeFn = jest.fn()
        const disabledDate = current => {
            return current && current < moment('2020-10-10').endOf('day')
        }
        const wrapper = mount(
            <RangePicker
                value={[moment('2020-02-03'), moment('2020-08-03')]}
                disabledDate={disabledDate}
                disabledDateValid={false}
                onChange={changeFn}
            />
        )
        await sleep(100)
        // expect(wrapper.find('input').props().value).toBe('')
        expect(wrapper.find('input').at(0).prop('value')).toEqual('')
        expect(wrapper.find('input').at(1).prop('value')).toEqual('')
        expect(changeFn).toHaveBeenCalledTimes(1)
    })

    // 回调函数
    it('iniit value should be clear when it is a disabledDate, <test prop:: onBlur>', async () => {
        const blurFn = jest.fn(),
            focusFn = jest.fn()
        const wrapper = mount(
            <RangePicker
                value={[moment('2020-02-03'), moment('2020-08-03')]}
                autoFocus
                showRangeLabel
                onBlur={blurFn}
                onFocus={focusFn}
            />
        )
        await sleep(1000)
        wrapper.find(`.${_PREFIX_CLS}-input`).at(0).simulate('click')
        expect(focusFn).toHaveBeenCalledTimes(1)
        wrapper.find(`.wui-picker-cell-inner`).at(2).simulate('click')
        await sleep(500)
        wrapper.find(`.wui-picker-cell-inner`).at(60).simulate('click')
        expect(blurFn).toHaveBeenCalledTimes(1)
        // wrapper.find('input').at(0).simulate('blur')
        // expect(blurFn).toHaveBeenCalledTimes(1)
        // wrapper.find('input').at(0).simulate('focus')
        // expect(focusFn).toHaveBeenCalledTimes(1)
    })
})
describe('rangepicker right Input', () => {
    it('right panel change value of halfYear', async () => {
        let wrapper = mount(
            <RangePicker open picker='halfYear' />
        )
        await sleep(1000)
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击左侧面板的顶部导航栏
        wrapper.find(`.${_PREFIX_CLS}-header-select-year`).find('li').at(212 + 2024 - currentYear).simulate('click') // 点击下拉框中的2035年
        expect(wrapper.find(`.${_PREFIX_CLS}-year-btn`).at(0).text()).toEqual('2036年')
    })
    it('right panel change value  of date', async () => {
        let wrapper = mount(
            <RangePicker open />
        )
        await sleep(1000)
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击左侧面板的顶部导航栏
        wrapper.find(`.${_PREFIX_CLS}-header-select-year`).find('li').at(212 + 2024 - currentYear).simulate('click') // 点击下拉框中的2035年
        expect(wrapper.find(`.${_PREFIX_CLS}-year-btn`).at(0).text()).toEqual('2036年')
    })
    it('right panel change value  of year', async () => {
        let wrapper = mount(
            <RangePicker picker='year' open />
        )
        await sleep(1000)
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击左侧面板的顶部导航栏
        await sleep(100)
        wrapper.find(`.${_PREFIX_CLS}-header-select-year`).find('li').at(21).simulate('click') // 点击下拉框中的2035年
        expect(wrapper.find(`.${_PREFIX_CLS}-decade-btn`).at(0).text()).toEqual('2040-2049')
        wrapper.find(`.${_PREFIX_CLS}-header-super-next-btn`).at(0).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-input`).at(1).simulate('click')
        // expect(wrapper.find(`.${_PREFIX_CLS}-input`).at(1).hasClass(`${_PREFIX_CLS}-input-active`)).toBe(true)
        // const {container, baseElement} = render(<RangePicker picker='year' open />)
        // await sleep(1000)
        // fireEvent.click(baseElement.querySelectorAll('.wui-picker-header-select-box')[0])
        // await sleep(1000)
        // await waitFor(() => {
        //     let dom2 = baseElement.querySelectorAll('.wui-picker-header-select-year ul li')[21]
        //     fireEvent.click(dom2)
        //     expect(baseElement.querySelectorAll(`.${_PREFIX_CLS}-decade-btn`)[0].textContent).toEqual('2020-2029')
        // })

    })
    it('input focus year', async () => {
        // let wrapper = mount(
        //     <RangePicker picker='year' open />
        // )
        // wrapper.find('RangePicker').at(0).instance().onInputFocus(1, '2023-02-10', {})
        render(<RangePicker picker='year' open value={['2000', '2020']} />)
        await waitFor(() => fireEvent.click(screen.getByText('2001')),{timeout: 2500})
        expect(screen.getByText('2001')).toBeInTheDocument
        await waitFor(() => fireEvent.click(screen.getByText('2021')),{timeout: 2500})
        expect(screen.getByText('2021')).toBeInTheDocument
    })
    it('input focus date', async () => {
        // let wrapper = mount(
        //     <RangePicker picker='date' value={[moment(), moment().add(5, 'd')]} open />
        // )
        // wrapper.find('RangePicker').at(0).instance().onInputFocus(1, '2023-02-10', {})
        render(<RangePicker picker='date' value={[moment(), moment().add(5, 'd')]} open />)
        await waitFor(() => fireEvent.click(screen.getAllByText('28')[0]),{timeout: 2500})
        expect(screen.getAllByText('28')[0]).toBeInTheDocument
    })
    it('input focus month', async () => {
        // let wrapper = mount(
        //     <RangePicker picker='month' open />
        // )
        render(<RangePicker picker='month' open />)
        // wrapper.find('RangePicker').at(0).instance().onInputFocus(1, '2023-02-10', {})
        await waitFor(() => fireEvent.click(screen.getAllByText('1月')[0]),{timeout: 2500})
        // fireEvent.click(dom.container.querySelectorAll('.wui-picker-cell-inner')[0])
        // await fireEvent.click(screen.getByText('1月'))
        expect(screen.getAllByText('1月')[0]).toBeInTheDocument
    })
})

describe('RangePicker showTime: ', () => {
    it('should render correct values and execute `onOk` callback when `showTime` exists and range selected, <test prop:: showTime>', async () => {
        const okFn = jest.fn()
        const dateFormat = 'YYYY-MM-DD',
            timeFormat = 'HH:mm:ss'
        const today = moment()
                .startOf('day'),
            todayFmt = today.format(dateFormat)
        const wrapper = mount(
            <RangePicker
                open
                showTime
                format={dateFormat + ' ' + timeFormat}
                onOk={okFn}
            />
        )
        await sleep(100)
        wrapper.find(`[title='${todayFmt}']`).simulate('click')
        expect(
            wrapper
                .find(`[title='${todayFmt}']`)
                .hasClass(`${_PREFIX_CLS}-cell-range-start`)
        ).toBeTruthy()
        expect(
            wrapper
                .find(`[title='${todayFmt}']`)
                .hasClass(`${_PREFIX_CLS}-cell-range-start-single`)
        ).toBeTruthy()
        wrapper.find(`.${_PREFIX_CLS}-ok`).first().simulate('click')
        wrapper.unmount()
    })

    it('should render correct values when `showTime` exists and range selected, <test prop:: showTime>', async () => {
        const dateFormat = 'YYYY-MM-DD',
            timeFormat = 'HH:mm:ss'

        let defaultValue = '08:00:00'
        const today = moment()
                .startOf('day'),
            todayFmt = today.format(dateFormat)
        const wrapper = mount(
            <RangePicker
                open
                showTime={{defaultValue}}
                format={dateFormat + ' ' + timeFormat}
            />
        )
        await sleep(100)
        wrapper.find(`[title='${todayFmt}']`).simulate('click')
        await actWait()
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-view`).at(1).text()).toBe('08:00:00')

        defaultValue = ['02:00:00', '23:59:59']
        wrapper.setProps({showTime: {defaultValue}})
        wrapper.find(`[title='${todayFmt}']`).simulate('click')
        await actWait()
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-view`).at(1).text()).toBe('02:00:00')
        wrapper.find(`.${_PREFIX_CLS}-ok`).simulate('click')
        wrapper.find(`[title='${todayFmt}']`).simulate('click')
        await actWait()
        // expect(wrapper.find(`.${_PREFIX_CLS}-header-view`).at(1).text()).toBe('23:59:59')
        wrapper.unmount()
    })
})

// timezone 用例
describe('RangePicker timezone: ', () => {
    it('should calculate time correct when props.timezone is set ', async () => {
        const onChange = jest.fn(),
            onSelect = jest.fn(),
            onPanelChange = jest.fn(),
            onMouseDown = jest.fn(),
            onKeyDown = jest.fn(),
            onFocus = jest.fn(),
            onStartInputBlur = jest.fn(),
            onEndInputBlur = jest.fn(),
            onOk = jest.fn(),
            onOpenChange = jest.fn()
        const container = document.createElement('div')
        document.body.appendChild(container)
        let wrapper = mount(
            <RangePicker
                open
                showTime
                placeholder={'开始结束'}
                enableTimezone
                serverTimezone='GMT+08'
                timezone='Asia/Jerusalem'
                disabledDate={()=>false}
                onChange={onChange}
                onOpenChange={onOpenChange}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onStartInputBlur={onStartInputBlur}
                onEndInputBlur={onEndInputBlur}
                onOk={onOk}
            />, {attachTo: container}
        )
        const format='MM-DD-YYYY HH:mm:ss', value = [moment('2022-02-22 08:30:00'), '2033-03-31 03:00:00']
        wrapper.setProps({format, value})
        await actWait()

        expect(wrapper.find('input').at(0).prop('value')).toEqual('02-22-2022 02:30:00')
        expect(wrapper.find('input').at(1).prop('value')).toEqual('03-30-2033 22:00:00')

        wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).simulate('focus')
        wrapper.find(`.${_PREFIX_CLS}-input input`).at(0).simulate('change', {target: {value: ''}})
        document
            .querySelectorAll(`.${_PREFIX_CLS}-input input`)[0]
            .dispatchEvent(new Event('blur')) // 覆盖率需单独dispatch blur
        // console.log('111-----', onChange.mock.calls, onStartInputBlur.mock.calls, onEndInputBlur.mock.calls)
        expect(onStartInputBlur.mock.calls[0][1]).toEqual('02-22-2022 08:30:00')

        wrapper.setProps({format, value})
        wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).simulate('focus')
        wrapper.find(`.${_PREFIX_CLS}-input input`).at(1).simulate('change', {target: {value: ''}})
        document
            .querySelectorAll(`.${_PREFIX_CLS}-input input`)[1]
            .dispatchEvent(new Event('blur')) // 覆盖率需单独dispatch blur
        // console.log('111----22-', onChange.mock.calls, onStartInputBlur.mock.calls, onEndInputBlur.mock.calls)
        expect(onEndInputBlur.mock.calls[0][1]).toEqual('03-31-2033 03:00:00')
        wrapper.unmount()
    })

    it('should calculate time correct when ConfigProvider timezone is set ', async () => {
        const onChange = jest.fn(),
            onSelect = jest.fn(),
            onPanelChange = jest.fn(),
            onMouseDown = jest.fn(),
            onKeyDown = jest.fn(),
            onFocus = jest.fn(),
            onBlur = jest.fn(),
            onOk = jest.fn(),
            onOpenChange = jest.fn()
        window.jDiwork = {
            diworkContext: () => {
                return {
                    enableTimezone: true,
                    dataformat:
                        '{"area":"zh-CN","calendar":"gregory","dateFormat":"yyyy-MM-dd","dateTimeFormat":"yyyy-MM-dd HH:mm:ss","dayOfWeek":"SUNDAY","numberFormat":"#,###,###,###,###,###[.]########+","timeFormat":"hh:mm:ss a","timezone": "Europe/Moscow"}', // utc+3
                    // "America/New_York" "America/Lima" "America/Los_Angeles" "Asia/Singapore" "Asia/Tokyo" "Asia/Shanghai" "Asia/Jerusalem" "Europe/Moscow"
                    // "#.###.###.###.###.###[,]########+"
                    // "#,###,###,###,###,###[.]########+"
                    serverTimezone: 'Asia/Shanghai',
                    timezone: 'UTC+08:00'
                }
            }
        }
        let wrapper = mount(
            <ConfigProvider>
                <RangePicker
                    open
                    showTime
                    value={['2022-02-22 08:30:00', '2033-03-31 03:00:00']}
                    placeholder={<span>开始结束</span>}
                    // format='YYYY-MM-DD HH:mm:ss'
                    enableTimezone
                    onChange={onChange}
                    onOpenChange={onOpenChange}
                    onSelect={onSelect}
                    onPanelChange={onPanelChange}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onOk={onOk}
                />
            </ConfigProvider>
        )
        await sleep(300)
        wrapper.unmount()
        window.jDiwork = undefined
    })

    it('should calculate time correct when props.timezone exists and autoFix==false', async () => {
        const onChange = jest.fn(),
            onSelect = jest.fn(),
            onPanelChange = jest.fn(),
            onMouseDown = jest.fn(),
            onKeyDown = jest.fn(),
            onFocus = jest.fn(),
            onBlur = jest.fn(),
            onOk = jest.fn(),
            onOpenChange = jest.fn()
        let wrapper = mount(
            <RangePicker
                autoFix={false}
                open
                showTime
                value={['2022-02-22 08:30:00', '2033-03-31 03:00:00']}
                format='DD-MM-YYYY HH:mm:ss'
                enableTimezone
                serverTimezone='GMT+08'
                timezone='Asia/Jerusalem'
                onChange={onChange}
                onOpenChange={onOpenChange}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                onOk={onOk}
            />
        )
        await actWait()
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        // expect(onOpenChange.mock.calls[0][2]).toEqual('22-02-2022 08:30:00')
        wrapper.unmount()
    })
})
