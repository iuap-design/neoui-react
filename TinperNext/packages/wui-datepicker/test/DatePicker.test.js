/**DatePicker.tsx */
import moment from 'moment'
import React from 'react'
import { prefix } from '../../wui-core/src'
import Icon from '../../wui-icon/src'
import Form from '../../wui-form/src'
import KeyCode from 'rc-util/lib/KeyCode'
import DatePicker from '../src'
import ConfigProvider from '../../wui-provider/src'
import { _PREFIX_CLS } from '../src/DatePicker'
import { autoFormat } from '../src/_utils/autoFix'
import { updateValueLocale } from '../src/_utils/lang'
import { mount, shallow } from '../../../next-ui-library/test/common/mount'
import {
    eventsTest,
    attrsTest,
    testCustomeText,
    testCustomStyle,
    sleep,
    actWait
} from '../../../next-ui-library/test/common/index'

const currentYear = moment().year();
/**
 * * 根据当前日期返回，起始日期和结束日期
 * @param {*} value
 * @param {*} type type为year 返回今年的起始日期和结束日期，type 为month返回这个月的起始日期和结束日期
 */
const getDate = (value, type) => {
    const dateInfo = {
        startDate: moment(value).startOf(type).format('YYYY-MM-DD'),
        endDate: moment(value).endOf(type).format('YYYY-MM-DD')
    }
    return dateInfo
}

// * 默认
describe('DatePicker default config: ', () => {
    it('should render default DatePicker component correctly', () => {
        const wrapper = mount(<DatePicker />)
        expect(wrapper.hasClass(_PREFIX_CLS)).toBe(true)
    })
})

// * 样式
describe('DatePicker styles: ', () => {
    // it('the root class should beggin with prefix `${prefix}-`', () => {
    //     const wrapper = mount(<DatePicker />)
    //     const rootDom = wrapper.find('div').at(2)
    //     expect(rootDom.getDOMNode().className).toContain(`${prefix}-`)
    // })
    testCustomStyle({
        title: 'component: DatePicker, <test prop:: style>',
        Component: DatePicker,
        attrs: {
            style: {color: 'red'}
        },
        selector: `.${_PREFIX_CLS}`,
        verifyStyle: {color: 'red'}
    })
    attrsTest({
        title: 'component: DatePicker, <test prop:: className>',
        Component: DatePicker,
        attrs: {
            className: 'my-picker'
        },
        selector: `.${_PREFIX_CLS}`,
        classnames: ['my-picker']
    })
})

// * input 输入框用例
describe('DatePicker input: ', () => {
    it('should render `placeholder` correctly, <test prop:: placeholder>', () => {
        const wrapper = mount(<DatePicker placeholder='please choose date' />)
        expect(wrapper.find('input').at(0).prop('placeholder')).toBe('please choose date')
    })

    it('should render disabled component when `disabled` set to true, <test prop:: disabled>', () => {
        const mockFn = jest.fn(),
            mockIconFn = jest.fn()
        const wrapper = mount(<DatePicker disabled onFocus={mockFn} iconClick={mockIconFn} />)
        wrapper.simulate('focus')
        expect(mockFn).not.toHaveBeenCalled()
        wrapper.find(`.${_PREFIX_CLS}-suffix`).simulate('click')
        expect(mockIconFn).toHaveBeenCalledTimes(0)
    })

    // 优化inputReadonly只禁用input不禁用按钮 && QDJCJS-7687日期只读时输入框事件禁用
    it('should render readonly input when `inputReadOnly` set to true, <test prop:: inputReadOnly>', async () => {
        const mockFn = jest.fn()
        const wrapper = mount(<DatePicker inputReadOnly onFocus={mockFn} defaultValue='2022-02-02' showTime open />)
        await actWait()
        wrapper.simulate('focus')
        expect(mockFn).not.toHaveBeenCalled()
        expect(wrapper.find('input').prop('readonly')).toBe('')
        expect(wrapper.find('input').prop('value')).toEqual('2022-02-02 00:00:00')

        wrapper.find(`.${_PREFIX_CLS}-date-panel`).find('tbody').find('tr').at(1).find('td').at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-ok`).find('button').simulate('click')
        expect(wrapper.find('input').prop('value')).toEqual('2022-02-08 00:00:00')
    })

    it('should display correct `value`, <test prop:: value>', () => {
        let wrapper = mount(<DatePicker value='2021-01-01' defaultValue='2022-02-02' />)
        expect(wrapper.find('input').prop('value')).toBe('2021-01-01')
        wrapper.unmount()

        wrapper = mount(<DatePicker value='2055-01-01' />)
        expect(wrapper.find('input').prop('value')).toEqual('2055-01-01')
        wrapper.unmount()

        wrapper = mount(<DatePicker value='2055-01-01' picker='month' />)
        expect(wrapper.find('input').prop('value')).toEqual('2055-01')
        wrapper.unmount()

        wrapper = mount(<DatePicker value='!*' />)
        expect(wrapper.find('input').prop('value')).toEqual('')
        wrapper.unmount()

        wrapper = mount(<DatePicker value={moment('2022-02-02')} />)
        expect(wrapper.find('input').prop('value')).toEqual('2022-02-02')
        wrapper.unmount()

        wrapper = mount(<DatePicker value={['!']} />)
        expect(wrapper.find('input').prop('value')).toEqual('')
    })

    it('should display correct `defaultValue` when there is no value, <test prop:: defaultValue>', () => {
        const wrapper = mount(<DatePicker defaultValue='2022-02-02' />)
        expect(wrapper.find('input').prop('value')).toBe('2022-02-02')
    })

    it('should display value in correct `format`, <test prop:: format>', () => {
        let wrapper = mount(<DatePicker value='2021-01-01' />)
        expect(wrapper.find('input').prop('value')).toBe('2021-01-01')
        // QDJCJS-9408修复format漏传问题
        wrapper.setProps({format: 'YYYY/MM/DD'})
        wrapper.update()
        expect(wrapper.find('input').prop('value')).toBe('2021/01/01')
        wrapper.unmount()
        wrapper = mount(<DatePicker value='2021-01-01' format={['YYYY-MM-DD', 'YYYY/MM/DD']} />)
        expect(wrapper.find('input').prop('value')).toBe('2021-01-01')
    })

    // QDJCJS-6852 【DatePicker重构】增加默认值allowClear=true
    it('allowClear test, <test prop:: allowClear>', () => {
        // allowClear = false 时任何情况clear按钮都不存在
        let wrapper = mount(<DatePicker allowClear={false} />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-clear`)).toEqual(false)
        wrapper = mount(<DatePicker allowClear={false} defaultValue='2021-01-01' />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-clear`)).toEqual(false)
        wrapper.unmount()

        // allowClear默认为true时
        // input框为空时不存在clear按钮
        wrapper = mount(<DatePicker />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-clear`)).toEqual(false)
        wrapper.unmount()
        // input框不为空时存在clear按钮
        wrapper = mount(<DatePicker defaultValue='2021-01-01' />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-clear`)).toEqual(true)
    })

    // TODO: clearIcon hover样式、清空功能  可以使用cypress进行测试
    // xit('should have clearIcon when value is set && Icon is on hover', () => {
    //     const wrapper = mount(<DatePicker />)
    //     wrapper.setProps({value: '2021-01-01'})
    //     wrapper.find(`.${_PREFIX_CLS}-clear`).at(0).simulate('mouseover')
    //     expect(wrapper.find(`.${_PREFIX_CLS}-clear`).getDOMNode().style).toHaveProperty('opacity', 1)
    //     wrapper.find(`.${_PREFIX_CLS}-clear`).at(0).simulate('click')
    //     expect(wrapper.find('input').getDOMNode().value).toBe('')
    // })

    it('should have custom Icon when `clearIcon` or `suffixIcon` is provided, <test prop:: clearIcon>, <test prop:: suffixIcon>', () => {
        const wrapper = shallow(
            <DatePicker clearIcon={() => <Icon type='uf-bell-o' />} suffixIcon={<Icon type='uf-cart' />} />
        )
        expect(wrapper.find('.uf-bell-o')).toBeTruthy()
        expect(wrapper.find('.uf-cart')).toBeTruthy()
    })
    it('should have custom Icon when `closeIcon` or `renderIcon` is provided, <test prop:: closeIcon>, <test prop:: renderIcon>', () => {
        const wrapper = shallow(
            <DatePicker closeIcon={() => <Icon type='uf-bell-o' />} renderIcon={<Icon type='uf-cart' />} />
        )
        expect(wrapper.find('.uf-bell-o')).toBeTruthy()
        expect(wrapper.find('.uf-cart')).toBeTruthy()
    })
    eventsTest({
        title: 'component: DatePicker, <test prop:: iconClick>',
        Component: DatePicker,
        propFuncName: 'iconClick',
        dependentProps: {},
        selector: `.${_PREFIX_CLS}-suffix .${prefix}-icon.uf-calendar`,
        eventName: 'click',
        eventArgs: []
    })
})

// * Panel 用例
describe('DatePicker Panel: ', () => {
    // ;['bottomLeft', 'bottomRight', 'topLeft', 'topRight'].forEach(item => {
    //     // Trigger.placement相关class未生成，测试跳过
    //     xit('should render panel placement correctly with `dropdownAlign`, <test prop:: dropdownAlign>', async () => {
    //         const wrapper = mount(<DatePicker open dropdownAlign={item} />)
    //         await actWait()
    //         expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-placement-${item}`)).toBe(
    //             true
    //         )
    //     })
    //     xit('should render panel placement correctly with `placement`, <test prop:: placement>', async () => {
    //         const wrapper = mount(<DatePicker open placement={item} />)
    //         await actWait()
    //         expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-placement-${item}`)).toBe(
    //             true
    //         )
    //     })
    // })
    attrsTest({
        title: 'component: DatePicker, <test prop:: dropdownClassName>',
        Component: DatePicker,
        attrs: {
            open: true,
            dropdownClassName: 'my-picker-dropdown'
        },
        selector: `.${_PREFIX_CLS}-dropdown`,
        act: true,
        classnames: ['my-picker-dropdown']
    })
    attrsTest({
        title: 'component: DatePicker, <test prop:: popupClassName>',
        Component: DatePicker,
        attrs: {
            open: true,
            popupClassName: 'my-picker-popup'
        },
        selector: `.${_PREFIX_CLS}-dropdown`,
        act: true,
        classnames: ['my-picker-popup']
    })
    attrsTest({
        title: 'component: DatePicker, <test prop:: direction>',
        Component: DatePicker,
        attrs: {
            open: true,
            direction: 'rtl'
        },
        selector: `.${_PREFIX_CLS}-panel`,
        act: true,
        classnames: [`${_PREFIX_CLS}-panel-rtl`]
    })
    testCustomStyle({
        title: 'component: DatePicker, <test prop:: popupStyle>',
        Component: DatePicker,
        attrs: {
            open: true,
            popupStyle: {
                border: '2px solid #f07'
            }
        },
        selector: `.${_PREFIX_CLS}-dropdown`,
        act: true,
        verifyStyle: {border: '2px solid #f07'}
    })
    Object.entries({month: '10月', year: '2023年'}).forEach(item => {
        testCustomeText({
            title: 'Comment: DatePicker, <test prop:: defaultPickerValue>',
            Component: DatePicker,
            attrs: {
                isHeaderSelect: false,
                open: true,
                defaultPickerValue: moment('2021-11-11').add(2, 'years').subtract(1, 'months')
            },
            selector: `.${_PREFIX_CLS}-${item[0]}-btn`,
            act: true,
            text: item[1]
        })
    })
    it('should show panel when `open` set to true, <test prop:: open>', async () => {
        let wrapper = mount(<DatePicker />)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(0)
        wrapper.setProps({open: true})
        await actWait()
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(1)
        wrapper.unmount()

        // QDJCJS-5943 DatePicker open默认值必须为bool类型，若不是，自动转换为bool类型
        wrapper = mount(<DatePicker open={1} />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(1)
        wrapper.unmount()
        wrapper = mount(<DatePicker open={0} />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(0)
    })
    it('should show panel when `defaultPanelShown` set to true, <test prop:: defaultPanelShown>', async () => {
        let wrapper = mount(<DatePicker defaultPanelShown />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(1)
    })
    it('should not open/hidden panel by tab Enter when `enterKeyDown` set to false, <test prop:: enterKeyDown>', () => {
        const wrapper = mount(<DatePicker />)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`)).toHaveLength(1)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toBe(false)

        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ESC
        })
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toBe(true)

        wrapper.setProps({enterKeyDown: false})
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toBe(true)
    })

    it('should show hot button [today] when `showToday` set to true, <test prop:: showToday>', async () => {
        const today = moment().format('YYYY-MM-DD')
        const wrapper = mount(<DatePicker open />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-today-btn`)).toHaveLength(0)
        wrapper.setProps({showToday: true})
        expect(wrapper.find(`.${_PREFIX_CLS}-today-btn`)).toHaveLength(1)
        wrapper.find(`.${_PREFIX_CLS}-today-btn`).simulate('click')
        expect(wrapper.find('input').props().value).toBe(today)
    })

    it('should render panel on correct node with `getCalendarContainer`, <test prop:: getCalendarContainer>', async () => {
        const wrapper = mount(
            <div id='popupContainer'>
                <DatePicker open getCalendarContainer={() => document.getElementById('popupContainer')} />
            </div>
        )
        await actWait()
        expect(wrapper.find('#popupContainer').exists(`.${_PREFIX_CLS}-dropdown`)).toBeTruthy()
    })

    it('should render panel on correct node with `getPopupContainer`, <test prop:: getPopupContainer>', async () => {
        const wrapper = mount(
            <div id='popupContainer'>
                <DatePicker open getPopupContainer={() => document.getElementById('popupContainer')} />
            </div>
        )
        await actWait()
        await sleep(100)
        expect(wrapper.find('#popupContainer').exists(`.${_PREFIX_CLS}-dropdown`)).toBeTruthy()
    })
    Object.entries({en: 'Oct', 'zh-cn': '10月', 'vi-vn': 'Thg 10', '': '10月'}).forEach(item => {
        testCustomeText({
            title: 'Comment: DatePicker, <test prop:: locale>',
            Component: DatePicker,
            attrs: {
                isHeaderSelect: false,
                open: true,
                value: '2021-10-10',
                locale: item[0]
            },
            selector: `.${_PREFIX_CLS}-month-btn`,
            act: true,
            text: item[1]
        })
    })
    it('should render  proper language with `locale`, <test prop:: locale>', async () => {
        // QDJCJS-10154修复季度传string报错问题
        let wrapper = mount(
            <DatePicker
                open
                value='2021'
                locale={{locale: 'zh-cn', quarterFormat: '第Q季度'}}
                picker='quarter'
                format='YYYY-Q季度'
            />
        )
        await actWait()
        await sleep(100)
        expect(wrapper.find('td').at(0).find(`.${_PREFIX_CLS}-cell-inner`).text()).toEqual('第1季度')
        expect(wrapper.find('input').prop('value')).toEqual('2021-1季度')
        wrapper.unmount()

        // 修复越南语'确定'按钮未翻译
        wrapper = mount(<DatePicker open locale='vi-vn' showTime value='2021-01-01' />)
        await actWait()
        expect(wrapper.find(`.${_PREFIX_CLS}-ok`).find('button').text()).toEqual('Chắc chắn')
        expect(wrapper.find(`.${_PREFIX_CLS}-now-btn`).text()).toEqual('Bây giờ')
    })

    it('should trigger onOk, <test prop:: onOk>', async () => {
        const okFn = jest.fn()
        let wrapper = mount(<DatePicker open value='2021-10-10' showTime onOk={okFn} />)
        await actWait()

        expect(okFn).toHaveBeenCalledTimes(0)
        wrapper.find(`.${_PREFIX_CLS}-ok button`).simulate('click')
        expect(okFn).toHaveBeenCalledTimes(1)
    })

    it('days should’t can be selected with `disabledDate`, <test prop:: disabledDate>', async () => {
        const changeFn = jest.fn(),
            selectFn = jest.fn()
        const disabledDate = current => {
            return current && current < moment('2020-10-10').endOf('day')
        }
        const wrapper = mount(
            <DatePicker open value='2020-10-10' disabledDate={disabledDate} onChange={changeFn} onSelect={selectFn} />
        )
        await actWait()
        expect(wrapper.find("[title='2020-10-08']").hasClass(`${_PREFIX_CLS}-cell-disabled`)).toBeTruthy()
        expect(wrapper.find("[title='2020-10-11']").hasClass(`${_PREFIX_CLS}-cell-disabled`)).toBeFalsy()

        wrapper.find(`.${_PREFIX_CLS}-cell[title='2020-10-08']`).simulate('click')
        expect(selectFn).toHaveBeenCalledTimes(0)
        expect(changeFn).toHaveBeenCalledTimes(0)
        expect(wrapper.find('input').props().value).toBe('2020-10-10')
        expect(
            wrapper.find(`.${_PREFIX_CLS}-cell[title='2020-10-08']`).hasClass(`${_PREFIX_CLS}-cell-selected`)
        ).toBeFalsy()

        wrapper.find(`.${_PREFIX_CLS}-cell[title='2020-10-11']`).simulate('click')
        expect(selectFn).toHaveBeenCalledTimes(1)
        expect(changeFn).toHaveBeenCalledTimes(1)
        expect(wrapper.find('input').props().value).toBe('2020-10-11')
        expect(
            wrapper.find(`.${_PREFIX_CLS}-cell[title='2020-10-11']`).hasClass(`${_PREFIX_CLS}-cell-selected`)
        ).toBeTruthy()
    })

    it('iniit value should be clear when it is a disabledDate, <test prop:: disabledDateValid>', async () => {
        const changeFn = jest.fn(),
            selectFn = jest.fn()
        const disabledDate = current => {
            return current && current < moment('2020-10-10').endOf('day')
        }
        const wrapper = mount(
            <DatePicker open value='2020-10-10' disabledDate={disabledDate} disabledDateValid={false} />
        )
        await actWait()
        expect(wrapper.find('input').props().value).toBe('')
    })

    it('should render custom footer with `renderExtraHeader`, <test prop:: renderExtraHeader>', async () => {
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
        const wrapper = mount(<DatePicker open renderExtraHeader={renderExtraHeader} />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-header-extra li`).length).toBe(2)
    })

    it('should render custom footer with `renderExtraFooter`, <test prop:: renderExtraFooter>', async () => {
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
        const wrapper = mount(<DatePicker open renderExtraFooter={renderExtraFooter} />)
        await actWait()
        expect(wrapper.find(`.${_PREFIX_CLS}-footer-extra li`).length).toBe(2)
    })

    it('should render custom date cell correct with `dateRender`, <test prop:: dateRender>, <test prop:: dateCellRender>', async () => {
        const render = (currentDate, today) => {
            if (currentDate.format('YYYY-MM-DD') === moment('2021-10-06').format('YYYY-MM-DD')) {
                return <Icon type='uf-star' />
            } else {
                return currentDate.get('date')
            }
        }
        const wrapper = mount(<DatePicker open dateRender={render} value='2021-10-10' />)
        await actWait()
        expect(wrapper.find(`.${_PREFIX_CLS}-cell[title='2021-10-06'] .uf-star`).exists()).toEqual(true)
        expect(wrapper.find(`.${_PREFIX_CLS}-cell[title='2021-10-07'] .uf-star`).exists()).toEqual(false)
        wrapper.unmount()
        // 兼容 dateCellRender
        const wrap = mount(<DatePicker open dateCellRender={render} value='2021-10-10' />)
        await actWait()
        expect(wrap.find(`.${_PREFIX_CLS}-cell[title='2021-10-06'] .uf-star`).exists()).toEqual(true)
        expect(wrap.find(`.${_PREFIX_CLS}-cell[title='2021-10-07'] .uf-star`).exists()).toEqual(false)
    })

    it('should render custom month cell correct with `monthCellRender`, <test prop:: monthCellRender>, <test prop:: monthCellContentRender>, <test prop:: isHeaderSelect>', async () => {
        function monthMap(month) {
            const _MONTH_MAP = {
                1: '正',
                2: '贰',
                3: '叁',
                4: '肆',
                5: '伍',
                6: '陆',
                7: '柒',
                8: '捌',
                9: '玖',
                10: '拾',
                11: '冬',
                12: '腊'
            }
            return _MONTH_MAP[month]
        }

        const monthCellRender = (currentDate, locale) => {
            return `${monthMap(currentDate.get('month') + 1)}月`
        }
        const wrapper = mount(
            <DatePicker open monthCellRender={monthCellRender} value='2021-01-01' isHeaderSelect={false} />
        )
        await actWait()
        await sleep(100)
        wrapper.find(`.${_PREFIX_CLS}-month-btn`).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-cell[title='2021-01']`).text()).toEqual('正月')
        wrapper.unmount()

        const wrapper2 = mount(
            <DatePicker open monthCellContentRender={monthCellRender} value='2021-01-01' isHeaderSelect={false} />
        )
        await actWait()
        await sleep(100)
        wrapper2.find(`.${_PREFIX_CLS}-month-btn`).simulate('click')
        expect(wrapper2.find(`.${_PREFIX_CLS}-cell[title='2021-01']`).text()).toEqual('正月')
    })

    it('should render custom icon with `prevIcon/nextIcon/superPrevIcon/superNextIcon`, <test prop:: prevIcon>, <test prop:: nextIcon>, <test prop:: superPrevIcon>, <test prop:: superNextIcon>', async () => {
        const prevIcon = <Icon type='uf-triangle-left' />,
            nextIcon = <Icon type='uf-triangle-right' />,
            superPrevIcon = <Icon type='uf-arrow-c-o-left' />,
            superNextIcon = <Icon type='uf-arrow-c-o-right' />
        const wrapper = mount(
            <DatePicker
                open
                prevIcon={prevIcon}
                nextIcon={nextIcon}
                superPrevIcon={superPrevIcon}
                superNextIcon={superNextIcon}
            />
        )
        await actWait()
        await sleep(100)
        expect(wrapper.find('.uf-triangle-left').exists()).toEqual(true)
        expect(wrapper.find('.uf-triangle-right').exists()).toEqual(true)
        expect(wrapper.find('.uf-arrow-c-o-left').exists()).toEqual(true)
        expect(wrapper.find('.uf-arrow-c-o-right').exists()).toEqual(true)
    })

    it('should render mode panel correct when has `picker` and `mode`, <test prop:: picker>, <test prop:: mode>', async () => {
        const wrapper = mount(<DatePicker open picker='time' mode='year' />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-panel`).find('div').at(0).hasClass(`${_PREFIX_CLS}-year-panel`)).toEqual(
            true
        )
    })
})

describe('picker test', () => {
    ;['time', 'date', 'week', 'month', 'quarter', 'year'].forEach(item => {
        it('should render panel correct when `picker` set to `time`|| `date`|| `week` || `month` || `quarter` || `year`, <test prop:: picker>', async () => {
            const wrapper = mount(<DatePicker open />)
            await actWait()
            await sleep(100)
            expect(wrapper.find(`.${_PREFIX_CLS}-date-panel`)).toHaveLength(1)
            wrapper.setProps({picker: item})
            wrapper.update()
            expect(
                wrapper.find(`.${_PREFIX_CLS}-panel`).find('div').at(0).hasClass(`${_PREFIX_CLS}-${item}-panel`)
            ).toEqual(true)
        })
    })
})
describe('mode test', () => {
    ;['time', 'date', 'week', 'month', 'quarter', 'year', 'decade'].forEach(item => {
        it('should render panel correct when `mode` set to `time`|| `date`|| `week` || `month` || `quarter`|| `year` || `decade`, <test prop:: mode>', async () => {
            const wrapper = mount(<DatePicker open />)
            await actWait()
            await sleep(100)
            expect(wrapper.find(`.${_PREFIX_CLS}-date-panel`)).toHaveLength(1)
            wrapper.setProps({mode: item})
            wrapper.update()
            await actWait()
            await sleep(100)
            expect(
                wrapper.find(`.${_PREFIX_CLS}-panel`).find('div').at(0).hasClass(`${_PREFIX_CLS}-${item}-panel`)
            ).toEqual(true)
        })
    })
})

// * Events input用例
describe('DatePicker Input Events: ', () => {
    // TODO: autoFocus获取焦点、样式
    it('should execute `onFocus` callback  when input is on focus with inputReadOnly && disabled are false, <test prop:: onFocus>', async () => {
        const mockFn = jest.fn()
        const wrapper = mount(<DatePicker onFocus={mockFn} autoFocus={false} inputReadOnly={false} />)
        wrapper.find('input').simulate('focus')
        await actWait()
        await sleep(100)
        expect(mockFn).toHaveBeenCalledTimes(2)
    })

    it('should execute `outInputFocus` callback  when input is on focus with inputReadOnly && disabled are false, <test prop:: outInputFocus>', async () => {
        const mockFn = jest.fn()
        const wrapper = mount(<DatePicker outInputFocus={mockFn} autoFocus={false} inputReadOnly={false} />)
        wrapper.find('input').simulate('focus')
        await actWait()
        await sleep(100)
        expect(mockFn).toHaveBeenCalledTimes(2)
    })

    // xit('should execute `onBlur` callback  when input is on blur with inputReadOnly && disabled are false, <test prop:: onBlur>', () => {
    //     const mockFn = jest.fn()
    //     const wrapper = mount(<DatePicker onBlur={mockFn} />)
    //     wrapper.find('input').simulate('focus')
    //     wrapper.find('input').simulate('blur')
    //     expect(mockFn).toHaveBeenCalledTimes(1)
    // })

    // xit('should execute `onDateInputBlur` callback  when input is on blur with inputReadOnly && disabled are false, <test prop:: onDateInputBlur>', () => {
    //     const mockFn = jest.fn()
    //     const wrapper = mount(<DatePicker onDateInputBlur={mockFn} />)
    //     wrapper.find('input').simulate('focus')
    //     wrapper.find('input').simulate('blur')
    //     expect(mockFn).toHaveBeenCalledTimes(1)
    // })

    it('should execute `outInputKeydown` callback with correct arguments when press down keyboard, <test prop:: outInputKeydown>', () => {
        const mockFn = jest.fn()
        const wrapper = mount(<DatePicker outInputKeydown={mockFn} />)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.NUM_ZERO
        })
        expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should execute `onKeyDown` callback with correct arguments when press down keyboard, <test prop:: onKeyDown>', () => {
        const mockFn = jest.fn()
        const wrapper = mount(<DatePicker onKeyDown={mockFn} />)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.NUM_ZERO
        })
        expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should execute `onMouseDown` callback with correct arguments when mouse down, <test prop:: onMouseDown>', () => {
        const mockFn = jest.fn()
        const wrapper = mount(<DatePicker onMouseDown={mockFn} />)
        wrapper.find('input').simulate('mousedown', {keyCode: KeyCode.NINE})
        wrapper.find('input').simulate('change', {target: {value: '3'}})
        expect(wrapper.find('input').props().value).toBe('3')
        expect(mockFn).toHaveBeenCalledTimes(1)
        // expect(mockFn).toHaveBeenCalledWith(expect.objectContaining({keyCode: KeyCode.NINE}))
    })
})

// * Events Panel用例
describe('DatePicker Panel Events: , <test prop:: onChange>, <test prop:: onSelect>', () => {
    // TODO: 样式、方法、值；输入的内容显示到input，区分picker、format、触发方式如picker-cell，ok button
    it('should render correct value and execute `onChange` callback when date selected', async () => {
        const changeFn = jest.fn(),
            selectFn = jest.fn()
        let wrapper = mount(
            <DatePicker
                open
                defaultValue='2021年10月26日'
                format='YYYY年M月D日'
                onChange={changeFn}
                onSelect={selectFn}
            />
        )
        await actWait()
        await sleep(100)
        wrapper.find("[title='2021-10-08']").simulate('click')
        expect(selectFn).toHaveBeenCalledTimes(1)
        expect(changeFn).toHaveBeenCalledTimes(1)
        expect(wrapper.find('input').props().value).toBe('2021年10月8日')
        expect(wrapper.find("[title='2021-10-08']").hasClass(`${_PREFIX_CLS}-cell-selected`)).toBeTruthy()
        expect(wrapper.find("[title='2021-10-26']").hasClass(`${_PREFIX_CLS}-cell-selected`)).toBeFalsy()
        wrapper.unmount()

        wrapper = mount(<DatePicker open defaultValue='2021年10月26日' format='YYYY年M月D日' onChange={changeFn} />)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.BACKSPACE
        })
        expect(changeFn).toHaveBeenCalledTimes(1)
    })

    it('should render correct value and execute `onChange` callback when halfYear selected', async () => {
        const changeFn = jest.fn(),
            selectFn = jest.fn()
        let wrapper = mount(
            <DatePicker
                picker='halfYear'
                open
                locale='zh-cn'
                value='2021-上半年'
                onChange={changeFn}
                onSelect={selectFn}
            />
        )
        await actWait()
        await sleep(100)
        wrapper.find("[title='下半年']").simulate('click')
        expect(selectFn).toHaveBeenCalledTimes(1)
        expect(changeFn).toHaveBeenCalledTimes(1)
        wrapper.setProps({value: '2021-上半财年'})
    })
})
describe('DatePicker Panel Events: , <test prop:: onChange>, <test prop:: onSelect>', () => {
    it('should execute `onChange` `onSelect` callback and render correct value when month selected', async () => {
        const changeFn = jest.fn(),
            selectFn = jest.fn()
        const wrapper = mount(
            <DatePicker picker='month' open defaultValue='2021-01' onSelect={selectFn} onChange={changeFn} />
        )
        await actWait()
        await sleep(100)
        wrapper.find("[title='2021-08']").simulate('click')
        expect(selectFn).toHaveBeenCalledTimes(1)
        expect(changeFn).toHaveBeenCalledTimes(1)
        expect(wrapper.find('input').props().value).toBe('2021-08')
        expect(wrapper.find("[title='2021-08']").at(1).hasClass(`${_PREFIX_CLS}-cell-selected`)).toBeTruthy()
    })

    it('should execute `onChange` `onSelect` callback and render correct value when year selected', async () => {
        const changeFn = jest.fn(),
            selectFn = jest.fn()
        const wrapper = mount(<DatePicker picker='year' open onSelect={selectFn} onChange={changeFn} />)
        await actWait()
        await sleep(100)
        wrapper.find("[title='2022']").simulate('click')
        expect(selectFn).toHaveBeenCalledTimes(1)
        expect(changeFn).toHaveBeenCalledTimes(1)
        expect(wrapper.find('input').props().value).toBe('2022')
        expect(wrapper.find("[title='2022']").at(1).hasClass(`${_PREFIX_CLS}-cell-selected`)).toBeTruthy()
    })

    it('should execute `onChange` `onSelect` callback and render correct value when week selected', async () => {
        const changeFn = jest.fn(),
            selectFn = jest.fn()
        const wrapper = mount(
            <DatePicker picker='week' defaultValue='2021-40' open={true} onSelect={selectFn} onChange={changeFn} />
        )
        await actWait()
        await sleep(100)
        wrapper.find("[title='2021-10-18']").simulate('click')
        expect(selectFn).toHaveBeenCalledTimes(1)
        expect(changeFn).toHaveBeenCalledTimes(1)
        expect(wrapper.find('input').props().value).toBe('2021-42')
        expect(wrapper.find(`.${_PREFIX_CLS}-week-panel-row-selected [title='2021-10-18']`)).toHaveLength(1)
    })

    it('should execute `onOpenChange` callback when open status change, <test prop:: onOpenChange>', async () => {
        let wrapper
        let openChangeFn = jest.fn()
        wrapper = mount(<DatePicker onOpenChange={openChangeFn} open />)
        await actWait()
        await sleep(100)
        wrapper.find(`input`).simulate('blur')
        expect(openChangeFn).toHaveBeenCalledTimes(1)
        wrapper.unmount()

        openChangeFn = jest.fn()
        wrapper = mount(<DatePicker onOpenChange={openChangeFn} open />)
        await actWait()
        await sleep(100)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ESC
        })
        expect(openChangeFn).toHaveBeenCalledTimes(2)
    })
    it('should execute `onPanelChange` callback when panel changes, <test prop:: onPanelChange>', async () => {
        const panelChangeFn = jest.fn()
        const wrapper = mount(<DatePicker open onPanelChange={panelChangeFn} isHeaderSelect={false} />)
        await actWait()
        await sleep(100)
        wrapper.find(`.${_PREFIX_CLS}-month-btn`).simulate('click')
        expect(panelChangeFn).toHaveBeenCalledTimes(1)
        wrapper.find(`.${_PREFIX_CLS}-year-btn`).simulate('click')
        expect(panelChangeFn).toHaveBeenCalledTimes(2)
        wrapper.find(`[title='2026']`).simulate('click')
        expect(panelChangeFn).toHaveBeenCalledTimes(3)
    })
    // 输入年份后再弹出面板选择1月1号时触发onChange
    it('should execute `onChange` callback, <test prop:: onChange>', async () => {
        const onChange = jest.fn()
        const wrapper = mount(<DatePicker open onChange={onChange} value='2022-01-01' />)
        await actWait()
        await sleep(100)
        wrapper.find(`.${_PREFIX_CLS}-cell-selected`).simulate('click')
        expect(moment(onChange.mock.calls[0][0]).format('YYYY-MM-DD')).toEqual('2022-01-01')
    })
    it('should execute `onChange` callback when blur, <test prop:: onChange>', () => {
        const onChange = jest.fn()
        const wrapper = mount(<DatePicker picker='year' format='YYYY' placeholder='选择年' onChange={onChange} />)
        wrapper.find('input').simulate('change', {target: {value: '20'}})
        expect(onChange).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('blur')
        expect(moment(onChange.mock.calls[0][0]).format('YYYY')).toEqual('2020')
        expect(wrapper.find('input').prop('value')).toEqual('2020')
    })
})

describe('fieldid, <test prop:: fieldid>', () => {
    it('@fieldid,"***_input"', () => {
        let wrapper = mount(<DatePicker />)
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).find('input').instance().getAttribute('fieldid')).toEqual(null)
        wrapper.unmount()
        wrapper = mount(<DatePicker fieldid='fieldid-id' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-input`).find('input').instance().getAttribute('fieldid')).toEqual(
            'fieldid-id_input'
        )
    })
    it('@fieldid,"***_clear"', () => {
        let wrapper = mount(<DatePicker defaultValue='2036-04-23' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-clear span`).instance().getAttribute('fieldid')).toEqual(null)
        wrapper.unmount()
        wrapper = mount(<DatePicker fieldid='fieldid-id' defaultValue='2036-04-23' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-clear span`).instance().getAttribute('fieldid')).toEqual(
            'fieldid-id_clear'
        )
    })
    it('@fieldid,"***_suffix"', () => {
        let wrapper = mount(<DatePicker />)
        expect(wrapper.find(`.${_PREFIX_CLS}-suffix span`).instance().getAttribute('fieldid')).toEqual(null)
        wrapper.unmount()
        wrapper = mount(<DatePicker fieldid='fieldid-id' />)
        expect(wrapper.find(`.${_PREFIX_CLS}-suffix span`).instance().getAttribute('fieldid')).toEqual(
            'fieldid-id_suffix'
        )
    })
    // QDJCJS-9576 RangePicker快捷键及今天、确定按钮添加fieldid
    it('fieldid test', async () => {
        let wrapper = mount(<DatePicker open fieldid='fieldid-id' showTime />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-date-panel`).instance().getAttribute('fieldid')).toEqual(
            'fieldid-id_panel'
        )
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel`).instance().getAttribute('fieldid')).toEqual(
            'fieldid-id-time-panel'
        )
        expect(wrapper.find(`.${_PREFIX_CLS}-ranges`).instance().getAttribute('fieldid')).toEqual('fieldid-id-ranges')
        expect(wrapper.find(`.${_PREFIX_CLS}-now`).instance().getAttribute('fieldid')).toEqual('fieldid-id-now')
        expect(wrapper.find(`.${_PREFIX_CLS}-ok`).instance().getAttribute('fieldid')).toEqual('fieldid-id-ok')
    })
    // QDJCJS-8299 用户更新suffixIcon时丢失fieldid问题
    it('fieldid should be exist when update suffixIcon', () => {
        let wrapper = mount(<DatePicker fieldid='fieldid-id' />)
        wrapper.setProps({suffixIcon: <Icon type='uf-cart' />})
        expect(wrapper.find(`.${_PREFIX_CLS}-suffix span`).instance().getAttribute('fieldid')).toEqual(
            'fieldid-id_suffix'
        )
    })
})

// 键盘快捷键
describe('keyboard test', () => {
    // disabled: false
    it('should execute `onOpenChange` callback when click Esc key', async () => {
        const openChangeFn = jest.fn()
        let wrapper = mount(<DatePicker onOpenChange={openChangeFn} open />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ESC
        })
        expect(openChangeFn).toHaveBeenCalledTimes(2)
        expect(openChangeFn.mock.calls[0][0]).toEqual(false)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(true)
    })
    it('board should open when click Down key', () => {
        const openChangeFn = jest.fn()
        let wrapper = mount(<DatePicker onOpenChange={openChangeFn} />)
        wrapper.find('input').simulate('focus')
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.DOWN
        })
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(true)
        expect(openChangeFn).toHaveBeenCalledTimes(1)
        expect(openChangeFn.mock.calls[0][0]).toEqual(true)
    })
    // disabled: true
    it('board should not open when click Down key', () => {
        const openChangeFn = jest.fn()
        let wrapper = mount(<DatePicker onOpenChange={openChangeFn} disabled={true} />)
        wrapper.find('input').simulate('focus')
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.DOWN
        })
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
    })
    // inputReadOnly: true
    it('should execute `onOpenChange` callback when click Esc key', async () => {
        const openChangeFn = jest.fn()
        let wrapper = mount(<DatePicker onOpenChange={openChangeFn} open inputReadOnly={true} />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ESC
        })
        expect(openChangeFn).toHaveBeenCalledTimes(2)
        expect(openChangeFn.mock.calls[0][0]).toEqual(false)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(true)
    })
    it('board should open when click Down key', () => {
        const openChangeFn = jest.fn()
        let wrapper = mount(<DatePicker onOpenChange={openChangeFn} inputReadOnly={true} />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.DOWN
        })
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(true)
        expect(openChangeFn).toHaveBeenCalledTimes(1)
        expect(openChangeFn.mock.calls[0][0]).toEqual(true)
    })
    // showTime: false
    it('should execute `onOpenChange` callback when click Esc key', async () => {
        const openChangeFn = jest.fn()
        let wrapper = mount(<DatePicker onOpenChange={openChangeFn} open showTime={false} />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ESC
        })
        expect(openChangeFn).toHaveBeenCalledTimes(2)
        expect(openChangeFn.mock.calls[0][0]).toEqual(false)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(true)
    })
    it('board should open when click Down key', () => {
        const openChangeFn = jest.fn()
        let wrapper = mount(<DatePicker onOpenChange={openChangeFn} showTime={false} />)
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.DOWN
        })
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(true)
        expect(openChangeFn).toHaveBeenCalledTimes(1)
        expect(openChangeFn.mock.calls[0][0]).toEqual(true)
    })
    // showTime: Object
    it('should execute `onOpenChange` callback when click Esc key', async () => {
        const openChangeFn = jest.fn()
        let wrapper = mount(
            <DatePicker
                onOpenChange={openChangeFn}
                open
                showTime={{
                    format: 'HH点mm',
                    showSecond: false,
                    use12Hours: true,
                    minuteStep: 5,
                    hideDisabledOptions: false
                }}
            />
        )
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ESC
        })
        expect(openChangeFn).toHaveBeenCalledTimes(2)
        expect(openChangeFn.mock.calls[0][0]).toEqual(false)
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(true)
    })
    it('the dropdown panel should hidden when click OK', async () => {
        let wrapper = mount(<DatePicker showTime open defaultValue='2036-04-23' picker='date' />)
        await actWait()
        await sleep(100)
        wrapper.find(`.${_PREFIX_CLS}-content`).find('tbody').find('tr').at(2).find('td').at(2).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(false)
        wrapper.find(`.${_PREFIX_CLS}-ok button`).simulate('click')
        expect(wrapper.find('input').prop('value')).toEqual('2036-04-16 00:00:00')
        expect(wrapper.find(`.${_PREFIX_CLS}-dropdown`).hasClass(`${_PREFIX_CLS}-dropdown-hidden`)).toEqual(true)
    })
    it('board should open when click Down key', () => {
        const openChangeFn = jest.fn()
        let wrapper = mount(
            <DatePicker
                onOpenChange={openChangeFn}
                showTime={{
                    format: 'HH点mm',
                    showSecond: false,
                    use12Hours: true,
                    minuteStep: 5,
                    hideDisabledOptions: false
                }}
            />
        )
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(false)
        expect(openChangeFn).toHaveBeenCalledTimes(0)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.DOWN
        })
        expect(wrapper.exists(`.${_PREFIX_CLS}-dropdown`)).toEqual(true)
        expect(openChangeFn).toHaveBeenCalledTimes(1)
        expect(openChangeFn.mock.calls[0][0]).toEqual(true)
    })
})

describe('extra function test', () => {
    it('updateValueLocale test', () => {
        let value = {
            locale: () => {}
        }
        const spy = jest.spyOn(value, 'locale')
        updateValueLocale('zh-cn', value)
        expect(spy).toBeCalledWith('zh-cn')
        updateValueLocale({lang: 'zh-cn'}, value)
        expect(spy).toBeCalledWith('zh-cn')
        updateValueLocale({locale: 'zh-cn'}, value)
        expect(spy).toBeCalledWith('zh-cn')
    })
    it('getDate test', () => {
        expect(getDate('2020-12-12', 'year')).toEqual({endDate: '2020-12-31', startDate: '2020-01-01'})
    })
})

describe('click the first day of the year when locale is "zh-cn"', () => {
    // 隔年同周场景
    it('value should be 2021-52', async () => {
        let wrapper = mount(<DatePicker locale='zh-cn' open picker='week' defaultValue={'2021-52'} format='YYYY/ww' />)
        await actWait()
        await sleep(100)
        wrapper.find("[title='2022-01-01']").simulate('click')
        expect(wrapper.find('input').prop('value')).toBe('2021/52')
    })
    // 隔年不同周场景
    it('value should be 2018-01', async () => {
        let wrapper = mount(<DatePicker locale='zh-cn' open picker='week' defaultValue={'2017-52'} format='YYYY/ww' />)
        await actWait()
        await sleep(100)
        wrapper.find("[title='2018-01-01']").simulate('click')
        expect(wrapper.find('input').prop('value')).toBe('2018/01')
    })
})
describe('部分基于jira缺陷的单测', () => {
    // QDJCJS-10002，moment不能简易传入format里非年月日时分秒的格式, 解决表单里失焦后自动变第一周问题
    it('QDJCJS-10002', () => {
        const wrapper = mount(
            <Form>
                <Form.Item name='week' initialValue={moment('2019-45', 'GGGG-WW')}>
                    <DatePicker picker='week' format='GGGG-WW' />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find('input').prop('value')).toEqual('2019-45')
        wrapper.find('input').simulate('focus')
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('2019-45')
    })

    // 修复周自动校正最大周不随locale和年份变化问题
    it('the problem of autofix', async () => {
        let wrapper = mount(<DatePicker open picker='week' defaultValue='2026-51' />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-week-panel-row`).at(4).find(`.${_PREFIX_CLS}-cell-week`).text()).toEqual(
            '53'
        )
        wrapper.find(`.${_PREFIX_CLS}-header-super-next-btn`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-week-panel-row`).at(4).find(`.${_PREFIX_CLS}-cell-week`).text()).toEqual(
            '52'
        )
        wrapper.unmount()

        wrapper = mount(<DatePicker open picker='week' defaultValue='2026-51' locale='en-us' />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-week-panel-row`).at(4).find(`.${_PREFIX_CLS}-cell-week`).text()).toEqual(
            '1'
        )
        expect(wrapper.find(`.${_PREFIX_CLS}-week-panel-row`).at(3).find(`.${_PREFIX_CLS}-cell-week`).text()).toEqual(
            '52'
        )
        wrapper.find(`.${_PREFIX_CLS}-header-super-next-btn`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-week-panel-row`).at(4).find(`.${_PREFIX_CLS}-cell-week`).text()).toEqual(
            '1'
        )
        expect(wrapper.find(`.${_PREFIX_CLS}-week-panel-row`).at(3).find(`.${_PREFIX_CLS}-cell-week`).text()).toEqual(
            '52'
        )
        wrapper.find(`.${_PREFIX_CLS}-header-super-next-btn`).at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-week-panel-row`).at(3).find(`.${_PREFIX_CLS}-cell-week`).text()).toEqual(
            '52'
        )
    })

    // QDJCJS-7787修复日期无法翻页问题 QDJCJS-7029子表日期面板无法翻页 修复DatePicker的prevIcon等icon点击时触发onChange问题
    it('Unable to turn pages', async () => {
        const mockFn = jest.fn()
        let wrapper = mount(
            <DatePicker showToday defaultValue='2021-12-01' open onChange={mockFn} isHeaderSelect={false} />
        )
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-year-btn`).text()).toEqual('2021年')
        expect(wrapper.find(`.${_PREFIX_CLS}-month-btn`).text()).toEqual('12月')

        wrapper.find(`.${_PREFIX_CLS}-header-next-btn`).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-year-btn`).text()).toEqual('2022年')
        expect(wrapper.find(`.${_PREFIX_CLS}-month-btn`).text()).toEqual('1月')

        wrapper.find(`.${_PREFIX_CLS}-header-prev-btn`).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-header-super-next-btn`).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-year-btn`).text()).toEqual('2022年')
        expect(wrapper.find(`.${_PREFIX_CLS}-month-btn`).text()).toEqual('12月')
        expect(mockFn).toHaveBeenCalledTimes(0)
    })

    // showTime和picker = time时，只有点击‘确定’按钮或者‘此刻’按钮才赋值（showTime为ture时，value修改没有触发onChange事件问题修复）
    it('the problem of onChange and showTime', async () => {
        let mockFn = jest.fn()
        let wrapper = mount(<DatePicker showTime picker='time' onChange={mockFn} open />)
        await actWait()
        await sleep(100)
        wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(0).find('li').at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(1).find('li').at(1).simulate('click')
        wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(2).find('li').at(1).simulate('click')
        wrapper.find('input').simulate('blur')
        expect(mockFn).toBeCalledTimes(0)

        wrapper.find(`.${_PREFIX_CLS}-ok`).find('button').simulate('click')
        expect(mockFn).toBeCalledTimes(1)
        mockFn = jest.fn()
        wrapper.unmount()
        wrapper = mount(<DatePicker showTime picker='time' onChange={mockFn} open />)
        await actWait()
        await sleep(100)
        wrapper.find(`.${_PREFIX_CLS}-now-btn`).simulate('click')
        expect(mockFn).toHaveBeenCalled()
        expect(moment(mockFn.mock.calls[0][0]).format('YYYY-MM-DD')).toEqual(moment().format('YYYY-MM-DD'))
    })

    // QDJCJS-7486 DatePicker增加时间格式处理 增加支持受控的showTime配置
    it('when showTime is Object, <test prop:: showTime>, <test prop:: use12Hours>, <test prop:: showHour>, <test prop:: showMinute>, <test prop:: showSecond>', async () => {
        let wrapper = mount(<DatePicker open showTime defaultValue='2022-01-01 00:00:00' />)
        await actWait()
        await sleep(100)
        expect(wrapper.find(`.${_PREFIX_CLS}-content .${_PREFIX_CLS}-time-panel-column`)).toHaveLength(3)

        // showHour showMinute showSecond
        wrapper.setProps({showTime: {showHour: true, showMinute: false, showSecond: false}})
        expect(wrapper.find(`.${_PREFIX_CLS}-content .${_PREFIX_CLS}-time-panel-column`)).toHaveLength(1)
        wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).find('li').at(13).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-header-view`).at(1).text()).toEqual('13:00:00')
        wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).find('li').at(0).simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-header-view`).at(1).text()).toEqual('00:00:00')

        // use12Hours
        wrapper.setProps({showTime: {showHour: true, showMinute: false, showSecond: false, use12Hours: true}})
        expect(wrapper.find(`.${_PREFIX_CLS}-content .${_PREFIX_CLS}-time-panel-column`)).toHaveLength(2)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(1).find(`.${_PREFIX_CLS}-time-panel-cell`)
        ).toHaveLength(2)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(1).find(`.${_PREFIX_CLS}-time-panel-cell`).at(0).text()
        ).toEqual('AM')
        expect(
            wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(1).find(`.${_PREFIX_CLS}-time-panel-cell`).at(1).text()
        ).toEqual('PM')

        // hourStep minuteStep secondStep
        wrapper.setProps({showTime: {hourStep: 2, minuteStep: 3, secondStep: 4}})
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(0).find('li').at(1).find('div').text()).toEqual(
            '02'
        )
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(1).find('li').at(1).find('div').text()).toEqual(
            '03'
        )
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(2).find('li').at(1).find('div').text()).toEqual(
            '04'
        )

        // hideDisabledOptions format && disabledTime
        const range = (start, end) => {
            const result = []
            for (let i = start; i < end; i++) {
                result.push(i)
            }
            return result
        }
        const disabledDateTime = () => {
            return {disabledHours: () => range(0, 24).splice(4, 20)}
        }
        wrapper.setProps({
            disabledTime: disabledDateTime,
            showTime: {format: 'HH点mm', showSecond: false, use12Hours: true, minuteStep: 5, hideDisabledOptions: false}
        })
        expect(wrapper.find(`.${_PREFIX_CLS}-header-view`).at(1).text()).toEqual('12点00')
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(0).find('li').at(4).find('div').text()).toEqual(
            '04'
        )

        wrapper.setProps({
            disabledTime: disabledDateTime,
            showTime: {format: 'HH点mm', showSecond: false, use12Hours: true, minuteStep: 5, hideDisabledOptions: true}
        })
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(0).find('li')).toHaveLength(4)
    })

    it('when showTime is Object, autoFix value with steps <test prop:: showTime>', async () => {
        // autoFix input value with hourStep minuteStep secondStep
        const container = document.createElement('div')
        document.body.appendChild(container)

        let wrapper = mount(
            <DatePicker open format='YYYY-MM-DD HH:mm:ss' showTime={{hourStep: 2, minuteStep: 3, secondStep: 4}} />,
            {attachTo: container}
        )
        await actWait()

        document.querySelector('input').value = '2023-01-05 03:04:05'
        document.querySelector('input').dispatchEvent(new Event('input'))
        await sleep(100)
        wrapper.update()
        await actWait()
        expect(document.querySelector('input').value).toBe('2023-01-05 02:03:04')
        expect(wrapper.find('input').prop('value')).toBe('2023-01-05 02:03:04')
    })

    // 修复DatePicker showTime时年月面板多余`此刻`
    it('now-btn should not exist when picker is month', async () => {
        let wrapper = mount(<DatePicker picker='month' showTime open />)
        await actWait()
        expect(wrapper.exists(`.${_PREFIX_CLS}-now-btn`)).toEqual(false)
    })

    // DatePicker增加有效日期输入在失焦时保留
    it('date should exist when blur', async () => {
        const mockFn = jest.fn()
        let wrapper = mount(<DatePicker format='YYYY-MM-DD' onBlur={mockFn} open />)
        await actWait()
        wrapper.find('input').simulate('change', {target: {value: '2022-01-01'}})
        wrapper.find('input').simulate('blur')
        expect(mockFn).toHaveBeenCalledTimes(1)
        expect(wrapper.find('input').prop('value')).toEqual('2022-01-01')
    })
})

// QDJCJS-10438 Datepicker面板头部支持下拉
describe('Component: DatePicker', () => {
    // 选择日期、选择日期时刻的情况
    ;[false, {defaultValue: '00:00:00'}].forEach(item => {
        it('showTime', async () => {
            let wrapper = mount(
                <DatePicker defaultValue='2036-04-23' format='YYYY-MM-DD' showToday open showTime={item} />
            )
            await actWait()
            await sleep(100)
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(false)
            expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
                true
            ) // 此时没有遮罩层

            // 点击一次导航栏会发生的变化
            wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击顶部导航栏
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
            expect(
                wrapper.find(`.${_PREFIX_CLS}-header-select div`).at(0).hasClass(`${_PREFIX_CLS}-header-select-year`)
            ).toEqual(true)
            expect(
                wrapper.find(`.${_PREFIX_CLS}-header-select div`).at(1).hasClass(`${_PREFIX_CLS}-header-select-month`)
            ).toEqual(true)
            expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).text()).toEqual('2036 年')
            expect(wrapper.find(`.${_PREFIX_CLS}-header-select-month-active`).text()).toEqual('4 月')
            expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().prop('style').opacity).toEqual('0.5') // 此时存在遮罩层

            // expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
            //     false
            // )

            // 对下拉框中的年月进行点击操作会发生的变化
            wrapper.find(`.${_PREFIX_CLS}-header-select-year`).find('li').at(212 + 2024 - currentYear).simulate('click') // 点击下拉框中的2035年
            expect(wrapper.find(`.${_PREFIX_CLS}-year-btn`).text()).toEqual('2036年')
            expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().prop('style').opacity).toEqual('0.5')
            wrapper.find(`.${_PREFIX_CLS}-header-select-month`).find('li').at(2).simulate('click') // 点击下拉框中的3月
            expect(wrapper.find(`.${_PREFIX_CLS}-month-btn`).text()).toEqual('3月')
            expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
                true
            ) // 此时遮罩层消失

            // 点击顶部导航栏，下拉框与遮罩层显示，再次点击，下拉框和遮罩层收起
            wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击顶部导航栏
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
            expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().prop('style').opacity).toEqual('0.5')
            wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 再次点击顶部导航栏
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
            // expect(wrapper.find(`.${_PREFIX_CLS}-date-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)).toEqual(
            //     false
            // ) // 此时遮罩层消失

            // 点击前进后退会影响下拉框中的值(此时下拉框中显示为2035年3月)
            wrapper.find(`.${_PREFIX_CLS}-header-next-btn`).simulate('click')
            wrapper.find(`.${_PREFIX_CLS}-header-prev-btn`).simulate('click')
            wrapper.find(`.${_PREFIX_CLS}-header-prev-btn`).simulate('click')
            wrapper.find(`.${_PREFIX_CLS}-header-super-next-btn`).simulate('click')
            wrapper.find(`.${_PREFIX_CLS}-header-super-prev-btn`).simulate('click')
            wrapper.find(`.${_PREFIX_CLS}-header-super-prev-btn`).simulate('click')
            wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击顶部导航栏
            expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).text()).toEqual('2036 年')
            expect(wrapper.find(`.${_PREFIX_CLS}-header-select-month-active`).text()).toEqual('3 月')

            // isHeaderSelect 设置为 false 时不存在这个节点
            wrapper.setProps({isHeaderSelect: false})
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(false)
        })
    })
    // picker='week'
    it('picker="week"', async () => {
        let wrapper = mount(<DatePicker picker='week' placeholder='选择周' defaultValue='2026-51' open />)
        await actWait()
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(true)
        wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击顶部导航栏
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select`)).toEqual(true)
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-year-active`).text()).toEqual('2026 年')
        expect(wrapper.find(`.${_PREFIX_CLS}-header-select-month-active`).text()).toEqual('12 月')
        wrapper.setProps({isHeaderSelect: false})
        expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(false)
    })
    // picker='month' && picker='quarter'
    ;['month', 'quarter'].forEach(item => {
        it('picker is month || quarter', async () => {
            let wrapper = mount(<DatePicker open picker={item} format='YYYY-MM' />)
            await actWait()
            await sleep(100)
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(true)
            wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击顶部导航栏
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-year`)).toEqual(true) // 只有年选择下拉框
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-month`)).toEqual(false)
            expect(wrapper.find(`.${_PREFIX_CLS}-${item}-panel div`).last().prop('style').opacity).toEqual('0.5') // 此时存在遮罩层
            wrapper.find(`.${_PREFIX_CLS}-header-select-year`).find('li').at(212 + 2024 - currentYear).simulate('click')
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-year`)).toEqual(false) // 下拉框收起
            expect(
                wrapper.find(`.${_PREFIX_CLS}-${item}-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)
            ).toEqual(true) // 此时遮罩层消失
            wrapper.setProps({isHeaderSelect: false})
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(false)
        })
    })
    // picker='year' && picker='halfYear'
    ;['year', 'halfYear'].forEach(item => {
        it('picker is year || halfYear', async () => {
            let wrapper = mount(<DatePicker open picker={item} />)
            await actWait(200)
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(true)
            wrapper.find(`.${_PREFIX_CLS}-header-select-box div`).at(0).simulate('click') // 点击顶部导航栏
            // await sleep(100)
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-year`)).toEqual(true) // 只有年选择下拉框
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-month`)).toEqual(false)
            expect(wrapper.find(`.${_PREFIX_CLS}-${item}-panel div`).last().prop('style').opacity).toEqual('0.5') // 此时存在遮罩层
            wrapper.find(`.${_PREFIX_CLS}-header-select-year`).find('li').at(19).simulate('click')
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-year`)).toEqual(false) // 下拉框收起
            expect(
                wrapper.find(`.${_PREFIX_CLS}-${item}-panel div`).last().hasClass(`${_PREFIX_CLS}-cell-inner`)
            ).toEqual(true) // 此时遮罩层消失
            wrapper.setProps({isHeaderSelect: false})
            expect(wrapper.exists(`.${_PREFIX_CLS}-header-select-box`)).toEqual(false)
        })
    })

    it('should be now when showTime.defaultValue is invalid', async () => {
        let wrapper = mount(<DatePicker open showTime={{defaultValue: '00:00:99'}} />)
        await actWait(200)
        expect(wrapper.find('input').prop('value')).toEqual('')

        wrapper.setProps({showTime: {defaultValue: moment('00:00:99')}})
        expect(wrapper.find('input').prop('value')).toEqual('')
    })
})

// 半年
describe('Component: DatePicker.halfYear', () => {
    let locale = {
        firstHalfYear: '上半财年',
        secondHalfYear: '下半财年'
    }
    // moment
    it('picker is halfYear & props a moment value', () => {
        let wrapper = mount(<DatePicker picker='halfYear' locale={locale} value={moment('2023-02-03')} />)
        expect(wrapper.find('input').prop('value')).toEqual('2023-上半财年')
    })
    it('picker is halfYear & props a moment value', () => {
        let wrapper = mount(<DatePicker picker='halfYear' locale={locale} value={moment('2023-08-03')} />)
        expect(wrapper.find('input').prop('value')).toEqual('2023-下半财年')
    })

    // string
    it('picker is halfYear & props a string value', () => {
        let wrapper = mount(<DatePicker picker='halfYear' locale={locale} value={'2023-上半财年'} />)
        expect(wrapper.find('input').prop('value')).toEqual('2023-上半财年')
    })
    it('picker is halfYear & props a string value', () => {
        let wrapper = mount(<DatePicker picker='halfYear' locale={locale} value={'2023-下半财年'} />)
        expect(wrapper.find('input').prop('value')).toEqual('2023-下半财年')
    })
    // 多语
    it('picker is FH & en', () => {
        let wrapper = mount(<DatePicker picker='halfYear' locale='en' value={moment('2023-02-03')} />)
        expect(wrapper.find('input').prop('value')).toEqual('2023-FH')
    })
    it('picker is SH & en', () => {
        let wrapper = mount(<DatePicker picker='halfYear' locale='en' value={moment('2023-08-03')} />)
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('2023-SH')
    })

    // user input
    it('picker is halfYear & change value', () => {
        let wrapper = mount(<DatePicker picker='halfYear' locale={locale} />)
        wrapper.find('input').simulate('change', {target: {value: '2023-上半财年'}})
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        expect(wrapper.find('input').prop('value')).toEqual('2023-上半财年')
    })

    // user input and autoFix is false
    it('picker is halfYear & change value without autofix', () => {
        let wrapper = mount(<DatePicker.HalfYearPicker autoFix={false} locale={locale} />)
        wrapper.find('input').simulate('change', {target: {value: '2023-上半财年'}})
        expect(wrapper.find('input').prop('value')).toEqual('2023-上半财年')
    })
})

// timezone 用例
describe('DatePicker timezone: ', () => {
    it('should calculate time correct when props.timezone is set ', async () => {
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
            <DatePicker
                open
                showTime
                value='2022-02-22 08:30:00'
                format='YYYY-MM-DD HH:mm:ss'
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
                onBlur={onBlur}
                onOk={onOk}
            />
        )
        await actWait()
        expect(wrapper.find('input').prop('value')).toEqual('2022-02-22 02:30:00')
        wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(0).find('li').at(1).simulate('click')
        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(wrapper.find('input').prop('value')).toEqual('2022-02-22 01:30:00')
        wrapper.find(`.${_PREFIX_CLS}-ok`).find('button').simulate('click')
        expect(onOk).toBeCalledTimes(1)
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0][1]).toEqual('2022-02-22 07:30:00')
        expect(onOpenChange).toHaveBeenCalledTimes(1)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ESC
        })
        expect(onOpenChange.mock.calls[0][2]).toEqual('2022-02-22 13:30:00')
        wrapper.find('input').simulate('blur')
        expect(onBlur).toBeCalledTimes(1)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        expect(onOpenChange.mock.calls[0][2]).toEqual('2022-02-22 13:30:00')
        wrapper.setProps({format: 'MM-DD-YYYY HH:mm:ss'})
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        expect(onOpenChange.mock.calls[0][2]).toEqual('2022-02-22 13:30:00')
        wrapper.setProps({format: 'YYYY-MM-DD HH:mm:ss'})
        wrapper.find('input').simulate('focus')
        expect(onFocus).toBeCalledTimes(2)
        wrapper.find(`.${_PREFIX_CLS}-header-prev-btn`).simulate('click')
        expect(onPanelChange).toHaveBeenCalled()
        wrapper.setProps({value: onChange.mock.calls[0][0]})
        expect(wrapper.find('input').prop('value')).toEqual('2022-02-22 01:30:00')
        wrapper.find(`.${_PREFIX_CLS}-now-btn`).simulate('click')
        expect(onChange).toHaveBeenCalled()
        expect(moment(onChange.mock.calls[2][1]).diff(moment(), 'second')).toBeLessThanOrEqual(2)
        wrapper.find('input').simulate('focus')
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
                <DatePicker
                    open
                    showTime
                    value='2022-02-22 08:30:00'
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
        // await actWait()
        await sleep(300)
        expect(wrapper.find('input').prop('value')).toEqual('2022-02-22 03:30:00')
        wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(0).find('li').at(1).simulate('click')
        expect(onSelect).toHaveBeenCalledTimes(1)
        await sleep(100)
        expect(wrapper.find('input').prop('value')).toEqual('2022-02-22 01:30:00')
        wrapper.find(`.${_PREFIX_CLS}-ok`).find('button').simulate('click')
        expect(onOk).toBeCalledTimes(1)
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0][1]).toEqual('2022-02-22 06:30:00')
        expect(onOpenChange).toHaveBeenCalledTimes(1)
        wrapper.find('input').simulate('blur')
        expect(onBlur).toBeCalledTimes(1)
        wrapper.find('input').simulate('focus')
        expect(onFocus).toBeCalledTimes(2)
        wrapper.find(`.${_PREFIX_CLS}-header-prev-btn`).simulate('click')
        expect(onPanelChange).toHaveBeenCalled()
        wrapper.setProps({value: onChange.mock.calls[0][0]})
        expect(wrapper.find('input').prop('value')).toEqual('2022-02-22 03:30:00')
        wrapper.find(`.${_PREFIX_CLS}-now-btn`).simulate('click')
        expect(onChange).toHaveBeenCalled()
        expect(moment(onChange.mock.calls[2][1]).diff(moment(), 'second')).toBeLessThanOrEqual(2)
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
            <DatePicker
                autoFix={false}
                open
                showTime
                value='22-02-2022 08:30:00'
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
        expect(onOpenChange.mock.calls[0][2]).toEqual('22-02-2022 08:30:00')
        wrapper.unmount()
    })
})

// showTime 用例
describe('DatePicker showTime: ', () => {
    it('should render time panel when `showTime` set to true ', async () => {
        const wrapper = mount(<DatePicker open showTime />)
        await actWait()
        expect(wrapper.find(`.${_PREFIX_CLS}-datetime-panel`)).toHaveLength(1)
    })

    it('ok button should be disabled without a value', async () => {
        const changeFn = jest.fn()
        const wrapper = mount(<DatePicker open showTime onChange={changeFn} />)
        await actWait()

        expect(wrapper.find(`.${_PREFIX_CLS}-ok`).find('button').props().disabled).toBe(true)
    })

    it('should disable to click ok button on default', async () => {
        const changeFn = jest.fn()
        const wrapper = mount(<DatePicker open showTime onChange={changeFn} value='2021-10-20 12:20:30' />)
        await actWait()
        expect(wrapper.find(`.${_PREFIX_CLS}-ok`).find('button').props().disabled).toBeFalsy()
    })

    it('should not render second column when `showTime.showSecond` set to  false', async () => {
        const wrapper = mount(<DatePicker open showTime={{showSecond: false}} />)
        await actWait()
        expect(wrapper.find(`.${_PREFIX_CLS}-datetime-panel`)).toHaveLength(1)
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel-column`)).toHaveLength(2)
        expect(
            wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).first().find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
        ).toHaveLength(24)
    })

    it('should render panel correct when `showTime.hourStep` `showTime.minuteStep` `showTime.secondStep` set a number', async () => {
        const hourStep = 3,
            minuteStep = 4,
            secondStep = 5
        const wrapper = mount(<DatePicker open showTime={{hourStep, minuteStep, secondStep}} />)
        await actWait()

        expect(
            wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).first().find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
        ).toHaveLength(24 / hourStep)
        expect(
            +wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).first().childAt(1).text() -
                +wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).first().childAt(0).text()
        ).toEqual(hourStep)

        expect(
            wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(1).find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
        ).toHaveLength(60 / minuteStep)

        expect(
            +wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(1).childAt(1).text() -
                +wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).at(1).childAt(0).text()
        ).toEqual(minuteStep)

        expect(
            wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).last().find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
        ).toHaveLength(60 / secondStep)
        expect(
            +wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).last().childAt(1).text() -
                +wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).last().childAt(0).text()
        ).toEqual(secondStep)
    })

    it('should render hour column correct when `showTime.use12Hours` set to true, ', async () => {
        const wrapper = mount(<DatePicker open showTime={{use12Hours: true}} />)
        await actWait()
        expect(
            wrapper.find(`.${_PREFIX_CLS}-time-panel-column`).first().find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
        ).toHaveLength(12)
        expect(
            wrapper
                .find(`.${_PREFIX_CLS}-time-panel-column`)
                .first()
                .find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
                .at(11)
                .text()
        ).toBe('11')
    })

    it('should render time panel header correct with `showTime.format`', async () => {
        const wrapper = mount(<DatePicker open showTime={{format: 'HH点m分s秒'}} />)
        await actWait()
        wrapper
            .find(`.${_PREFIX_CLS}-time-panel-column`)
            .first()
            .find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
            .at(15)
            .simulate('click')
        expect(wrapper.find(`.${_PREFIX_CLS}-time-panel`).find(`.${_PREFIX_CLS}-header-view`).text()).toBe('15点0分0秒')
    })

    function range(start, end) {
        const result = []
        for (let i = start; i < end; i++) {
            result.push(i)
        }
        return result
    }

    function disabledTime() {
        return {
            disabledHours: () => range(0, 24).splice(15, 8),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56]
        }
    }

    it('should render disabled options correctly with `showTime.disabledHours` `showTime.disabledMinutes` `showTime.disabledSeconds` ', () => {
        async function testTimeDisabled(columnIndex = 0, value, isTruty, disabledCellIndex = 0) {
            const wrapper = mount(<DatePicker open disabledTime={disabledTime} showTime />)
            await actWait()

            expect(
                wrapper
                    .find(`.${_PREFIX_CLS}-time-panel-column`)
                    .at(columnIndex)
                    .find(`.${_PREFIX_CLS}-time-panel-cell-disabled .${_PREFIX_CLS}-time-panel-cell-inner`)
                    .at(disabledCellIndex)
                    .text() === value
            ).toBe(isTruty)
        }

        testTimeDisabled(0, '12', false, 0)
        testTimeDisabled(0, '16', true, 1)
        testTimeDisabled(1, '25', false, 0)
        testTimeDisabled(1, '35', true, 5)
        testTimeDisabled(2, '50', false, 0)
        testTimeDisabled(2, '55', true, 0)
    })

    it('should hide disabled options when `showTime.hideDisabledOptions` set to true', () => {
        async function testTimeDisabled(index, value, isTruty) {
            const wrapper = mount(
                <DatePicker open disabledTime={disabledTime} showTime={{hideDisabledOptions: true}} />
            )
            await actWait()
            return expect(
                wrapper
                    .find(`.${_PREFIX_CLS}-time-panel-column`)
                    .at(index)
                    .find(`.${_PREFIX_CLS}-time-panel-cell-inner`)
                    .at(+value)
                    .text() === value
            ).toBe(!isTruty)
        }

        testTimeDisabled(0, '12', false)
        testTimeDisabled(0, '16', true)
        testTimeDisabled(1, '25', false)
        testTimeDisabled(1, '35', true)
        testTimeDisabled(2, '50', false)
        testTimeDisabled(2, '55', true)
    })
})

// QDJCJS-7287 新增时分秒越界校正
describe('autoFix', () => {
    async function fixEvent(result, autofix, value, picker, format) {
        let wrapper = mount(
            <DatePicker locale='zh-cn' format={format} autoFix={autofix} open isHeaderSelect={false} picker={picker} />
        )
        await actWait()
        wrapper.find('input').simulate('change', {target: {value: value}})
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        await actWait()
        expect(wrapper.find('input').prop('value')).toBe(result)
        // wrapper.unmount()
    }
    it('should fix invildate to valid date with `autofix` when format="YYYY-MM-DD", <test prop:: autoFix>', () => {
        // autoFix 为 true
        fixEvent('2022-01-01', true, '2022-')
        // QDJCJS-7184 DatePicker的年份为3位时00替换错误 月日为00时修正为01，如2222-00修正为2222-01
        fixEvent('2022-01-01', true, '2022-00-00')
        fixEvent('2022-11-01', true, '2022-11')
        fixEvent('2022-05-01', true, '20225')
        fixEvent('2022-12-31', true, '20222244')
        fixEvent('2022-02-28', true, '2022-02-44')
        fixEvent('2022-01-01', true, '2022-aa')
        // QDJCJS-6895增加非数字输入校验
        fixEvent('2022-01-01', true, '2022-非数字输入校验')
    })
    it('should fix invildate to valid date with `autofix` when format="YYYY-MM-DD", <test prop:: autoFix>', () => {
        // autoFix 为 false
        fixEvent('', false, '')
        fixEvent('2022-01-01', false, '2022-')
        fixEvent('2022-00-00', false, '2022-00-00')
        fixEvent('2022-11-01', false, '2022-11')
        fixEvent('20222244', false, '20222244')
        fixEvent('2022-01-01', false, '2022---')
        fixEvent('2022-01-01', false, '2022-aa')
        // QDJCJS-6895增加非数字输入校验
        fixEvent('2022-01-01', false, '2022-非数字输入校验')
    })

    it('should fix invildate to valid date with `autofix` when format="YYYY-MM-DD HH:mm:ss", <test prop:: autoFix>', () => {
        // autoFix 为 true
        fixEvent('2021-12-12 00:00:00', true, '20211212256565', 'date', 'YYYY-MM-DD HH:mm:ss')
        fixEvent('2021-12-12 23:59:59', true, '2021-12-12 25:65:65', 'date', 'YYYY-MM-DD HH:mm:ss')

        // autoFix 为 false
        fixEvent('20211212256565', false, '20211212256565', 'date', 'YYYY-MM-DD HH:mm:ss')
        fixEvent('2021-12-12 40:65:65', false, '2021-12-12 40:65:65', 'date', 'YYYY-MM-DD HH:mm:ss')
    })
    // 增加autoFix未定义，且传入的format不支持自动校正
    it('format cannot support autofix', () => {
        // fixEvent('', undefined, '2022-05-06', 'date', 'MM-DD-YYYY')
        fixEvent('05-06-2022', undefined, '05-06-2022', 'date', 'MM-DD-YYYY')
    })
    // DatePicker增加星期越界校验
    it('should fix invildate to valid date with `autofix` when picker="week", <test prop:: autoFix>', () => {
        // autoFix 为 true
        fixEvent('2021-52', true, '2021-90', 'week')
        fixEvent('2021-01', true, '2021-00', 'week')

        // autoFix 为 false
        fixEvent('2021-90', false, '2021-90', 'week')
        fixEvent('2021-00', false, '2021-00', 'week')
    })
})


// autoFix工具函数测试
describe('autoFix utils autoFormat ', () => {
    function autoFormatTest(value, format, result, showTime = false) {
        it(`should fix invildate to valid date, input is ${value} ${format}, expect output is ${result}, <test prop:: autoFix>`, () => {
            const res = autoFormat({ value, format, showTime })
            // console.log('111--------', value, format, result, res.value)
            expect(res.value).toBe(result)
        })
    }

    autoFormatTest('8888', 'YYYY', '8888')
    autoFormatTest('2021-00', 'YYYY-ww', '2021-01')
    autoFormatTest('2022-66', 'YYYY-ww', '2022-51')
    autoFormatTest('2021-00', 'YYYY-MM', '2021-01')
    autoFormatTest('2021-22', 'YYYY-MM', '2021-12')
    autoFormatTest('2021-02-00', 'YYYY-MM-DD', '2021-02-01')
    autoFormatTest('2021-02-29', 'YYYY-MM-DD', '2021-02-28')
    autoFormatTest('2021-03-33', 'YYYY-MM-DD', '2021-03-31')
    autoFormatTest('2021-01-01 33:66:66', 'YYYY-MM-DD HH:mm:ss', '2021-01-01 23:59:59')
    autoFormatTest('2021-01-01 11:11:11', 'YYYY-MM-DD HH:mm:ss', '2021-01-01 08:10:10', {hourStep: 4, minuteStep: 5, secondStep: 10})
})
