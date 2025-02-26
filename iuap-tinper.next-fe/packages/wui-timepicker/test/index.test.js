/** TimePicker.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'

import moment from 'moment'
import React from 'react'
import {actWait, sleep} from '../../../next-ui-library/test/common/index'
import {prefix} from '../../wui-core/src/updatePrefix'
import KeyCode from 'rc-util/lib/KeyCode'
import Icon from '../../wui-icon/src'

import Timepicker from '../src/index'

const prefixTime = `${prefix}-time-picker`

const now = moment()
const [hours, minutes, seconds] = [11, 12, 30]
const demoTime = moment().set({
    hours,
    minutes,
    seconds
})

let mTimepicker
beforeEach(() => {
    mTimepicker = mount(<Timepicker />)
})
afterEach(() => {
    mTimepicker.unmount()
})

describe('component: Timepicker, <test prop:: popupStyle>', () => {
    it('it should have popupStyle color red ', async () => {
        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker
                    getPopupContainer={() => document.getElementById('popupEl')}
                    popupStyle={{color: 'red'}}
                    defaultOpen={true}
                />
            </div>
        )
        await actWait()
        const popupElWrapper = mTimepicker.find(`.${prefixTime}-panel`).first()
        expect(popupElWrapper.prop('style').color).toEqual('red')
    })
})
describe('component: Timepicker, <test prop:: style>', () => {
    it('it should have style color ', () => {
        mTimepicker.setProps({style: {color: 'red'}})
        const mSpan = mTimepicker.find(`.${prefixTime}`)
        expect(mSpan.prop('style').color).toEqual('red')
    })
})
// placeholder默认值处理
describe('component: Timepicker, <test prop:: placeholder>', () => {
    it('placeholder should be abc', () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker use12Hours />)
        // 默认情况下placeholder为''
        expect(mTimepicker.find('input').at(0).props().placeholder).toEqual('')
        mTimepicker.setProps({placeholder: 'abc'})
        expect(mTimepicker.find('input').at(0).props().placeholder).toEqual('abc')
    })
})
// xdescribe('component: Timepicker, <test prop:: id>', () => {
//     it('placeholder should be abc', () => {
//         mTimepicker.unmount()
//         mTimepicker = mount(<Timepicker use12Hours id='abce' />)
//         expect(mTimepicker.find('input').at(0).props().id).toEqual('abce')
//     })
// })
// describe('component: Timepicker, <test prop:: autoFocus>', () => {
//     it('autoFocus should be called ', () => {
//         let mTimepicker = mount(<Timepicker autoFocus showSearch={true} />);
//         const input = mTimepicker.find('input')
//         mTimepicker.simulate('mouseEnter');
//         setTimeout(() => expect(input.focus).toHaveBeenCalled(), 250);
//     })
// })
describe('component: Timepicker, <test prop:: name>', () => {
    it('placeholder should be abc', () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker use12Hours name='abcd' />)
        expect(mTimepicker.find('input').at(0).props().name).toEqual('abcd')
    })
})
describe('component: Timepicker, <test prop:: value>', () => {
    it('it should have a value', () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker use12Hours />)
        expect(mTimepicker.find('input').at(0).instance().value).toEqual('')
        mTimepicker.setProps({value: '非法输入'})
        expect(mTimepicker.find('input').at(0).instance().value).toEqual('')
        mTimepicker.setProps({value: now})
        expect(0 + mTimepicker.find('input').at(0).instance().value).toContain(now.format('hh:mm:ss'))
    })
})
describe('component: Timepicker, <test prop:: use12Hours>', () => {
    it('it should have a value', () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker use12Hours />)
        expect(mTimepicker.find('input').at(0).instance().value).toEqual('')
        mTimepicker.setProps({
            value: demoTime
        })
        expect(mTimepicker.find('input').at(0).instance().value).toContain('11:12:30 AM')
    })
})
describe('component: Timepicker, <test prop:: format>', () => {
    it('it should have a value', () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker use12Hours format='HH时mm分ss秒' />)
        expect(mTimepicker.find('input').at(0).instance().value).toEqual('')
        mTimepicker.setProps({
            value: now
        })
        expect(0 + mTimepicker.find('input').at(0).instance().value).toContain(now.format('HH时mm分ss秒'))
    })
})
describe('component: Timepicker, <test prop:: defaultValue>', () => {
    it('it should have a defaultValue', () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker defaultValue={now} use12Hours />)
        expect(0 + mTimepicker.find('input').at(0).instance().value).toContain(now.format('hh:mm:ss'))
    })
    it('it should be value', () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker defaultValue='12:13:14' value={now} use12Hours />)
        expect(0 + mTimepicker.find('input').at(0).instance().value).toContain(now.format('hh:mm:ss'))
        mTimepicker.setProps({
            value: '12:13:14',
            defaultValue: now
        })
        expect(mTimepicker.find('input').at(0).prop('value')).toEqual('12:13:14 PM')
    })
})
describe('component: Timepicker', () => {
    it('it should have a value but no hours, <test prop:: showHour>', async () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker open showHour={false} defaultValue={demoTime} />)
        await actWait()
        expect(mTimepicker.find('input').at(0).instance().value).toContain(demoTime.format('mm:ss'))
        expect(mTimepicker.find(`.${prefixTime}-panel-select`)).toHaveLength(2)
        expect(mTimepicker.find(`.${prefixTime}-panel-select`).at(0).find('li')).toHaveLength(60)
    })
    it('it should have a value but no minutes, <test prop:: showMinute>', async () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker open showMinute={false} defaultValue={demoTime} />)
        await actWait()
        expect(mTimepicker.find(`.${prefixTime}-panel-select`)).toHaveLength(2)
        expect(mTimepicker.find(`.${prefixTime}-panel-select`).at(0).find('li')).toHaveLength(24)
        expect(mTimepicker.find(`.${prefixTime}-panel-select`).at(1).find('li')).toHaveLength(60)
    })
    it('it should have a value but no second, <test prop:: showSecond>', async () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker open showSecond={false} defaultValue={demoTime} />)
        await actWait()
        expect(mTimepicker.find('input').at(0).instance().value).toContain(demoTime.format('hh:mm'))
        expect(mTimepicker.find(`.${prefixTime}-panel-select`)).toHaveLength(2)
        expect(mTimepicker.find(`.${prefixTime}-panel-select`).at(0).find('li')).toHaveLength(24)
        expect(mTimepicker.find(`.${prefixTime}-panel-select`).at(1).find('li')).toHaveLength(60)
    })
})
describe('component: Timepicker, <test prop:: clearText>', () => {
    it('render Timepicker', () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker clearText='abcd' value={now} />)
        expect(mTimepicker.find('.uf-close-c').at(0).props().title).toEqual('abcd')
    })
})
describe('component: Timepicker, <test prop:: showNow>', () => {
    // showNow时显示`此刻`
    it('render Timepicker now btn', async () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker open showNow />)
        await actWait()
        expect(mTimepicker.exists('.wui-time-picker-panel-now')).toEqual(true)
    })
    // showNow时显示`确定`
    it('render Timepicker ok btn', async () => {
        mTimepicker.unmount()
        mTimepicker = mount(<Timepicker open showNow />)
        await actWait()
        expect(mTimepicker.exists('.wui-time-picker-panel-ok')).toEqual(true)
    })
})

describe('component: Timepicker, <test prop:: inputReadOnly>, <test prop:: disabled>', () => {
    it('the input should be disabled', () => {
        const input1 = mTimepicker.find('input')

        expect(input1.instance().disabled).toBe(false)
        expect(input1.instance().readOnly).toBe(false)
        mTimepicker.setProps({disabled: true, inputReadOnly: true})
        const input = mTimepicker.find('input')
        expect(input.instance().disabled).toBe(true)
        expect(input.instance().readOnly).toBe(true)
    })
})
// QDJCJS-8357 autoComplete属性添加默认值off
describe('component: Timepicker, <test prop:: inputReadOnly>, <test prop:: autoComplete>', () => {
    it('the input should be disabled', () => {
        expect(mTimepicker.find('input').instance().autocomplete).toBe('off')
        mTimepicker.setProps({autoComplete: 'on'})
        const input = mTimepicker.find('input')
        expect(input.instance().autocomplete).toBe('on')
    })
})
describe('component: Timepicker', () => {
    // xit(`it should have correct placement, <test prop:: placement>`, () => {
    //     let wrapper = mount(<Timepicker placement='topRight' open />)
    //     expect(wrapper.find(`.${prefixTime}-panel`).getDOMNode().className).toContain(
    //         `${prefixTime}-panel-placement-topRight`
    //     )
    // })

    it(`it should have defaultValue, <test prop:: allowEmpty>`, () => {
        mTimepicker.setProps({value: now})
        let mSpan = mTimepicker.find(`.${prefixTime}`).first()
        expect(mSpan.childAt(1).hasClass(`uf-close-c`)).toBeTruthy()

        mTimepicker.setProps({allowEmpty: false})
        mSpan = mTimepicker.find(`.${prefixTime}`).first()
        expect(mSpan.find('uf-close-c')).toHaveLength(0)
    })
})

describe('component: Timepicker', () => {
    it(`it should have allowClear, <test prop:: allowClear>`, () => {
        mTimepicker.setProps({value: now})
        let mSpan = mTimepicker.find(`.${prefixTime}`).first()
        expect(mSpan.childAt(1).hasClass(`uf-close-c`)).toBeTruthy()

        mTimepicker.setProps({allowClear: false})
        mSpan = mTimepicker.find(`.${prefixTime}`).first()
        expect(mSpan.find('uf-close-c')).toHaveLength(0)
    })
    it(`it should have showClear, <test prop:: showClear>`, () => {
        mTimepicker.setProps({value: now})
        let mSpan = mTimepicker.find(`.${prefixTime}`).first()
        expect(mSpan.childAt(1).hasClass(`uf-close-c`)).toBeTruthy()

        mTimepicker.setProps({showClear: false})
        mSpan = mTimepicker.find(`.${prefixTime}`).first()
        expect(mSpan.find('uf-close-c')).toHaveLength(0)
    })
})
describe('component: Timepicker, <test prop:: getPopupContainer>, <test prop:: clearIcon>', () => {
    it(`it should have new icon and class as uf-dongjie`, () => {
        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker
                    getPopupContainer={() => document.getElementById('popupEl')}
                    clearIcon={<Icon type='uf-dongjie' />}
                    value={now}
                />
            </div>
        )
        let mSpan = mTimepicker.find(`.${prefixTime}`).first()
        expect(mSpan.find(`.uf-dongjie`).length).toBe(1)
    })
})
describe('component: Timepicker, <test prop:: getPopupContainer>, <test prop:: inputIcon>, <test prop:: suffixIcon>', () => {
    it(`it should have new icon and class as uf-dongjie`, () => {
        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker
                    getPopupContainer={() => document.getElementById('popupEl')}
                    inputIcon={<Icon type='uf-dongjie' />}
                    value={now}
                />
            </div>
        )
        let mSpan = mTimepicker.find(`.${prefixTime}`).at(0)
        expect(mSpan.childAt(2).hasClass(`uf-dongjie`)).toBeTruthy()
    })
    it(`it should have new icon and class as uf-weidongjie`, () => {
        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker suffixIcon={<Icon type='uf-weidongjie' />} value={now} />
            </div>
        )
        let mSpan = mTimepicker.find(`.${prefixTime}`).at(0)
        expect(mSpan.childAt(2).hasClass(`uf-weidongjie`)).toBeTruthy()
    })
})
describe('component: Timepicker, <test prop:: open>, <test prop:: getPopupContainer>', () => {
    it(`it should have class name as time-picker-panel`, async () => {
        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker getPopupContainer={() => document.getElementById('popupEl')} open={true} />
            </div>
        )
        await actWait()
        // let outDiv = mTimepicker.find(`.${prefixTime}`);
        // outDiv.simulate('click');
        const popupElWrapper = mTimepicker.find(`.${prefixTime}-panel`).first()
        expect(popupElWrapper.hasClass(`${prefixTime}-panel-column-3`)).toEqual(true)
    })
})
describe('component: Timepicker, <test prop:: defaultOpenValue>, <test prop:: getPopupContainer>', () => {
    it(`default Open should have class name as time-picker-panel-select-option-selected`, async () => {
        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker defaultOpenValue={demoTime} getPopupContainer={() => document.getElementById('popupEl')} />
            </div>
        )
        let outDiv = mTimepicker.find(`.${prefixTime}`)
        outDiv.simulate('click')
        await actWait()
        const popupElWrapperHours = mTimepicker
            .find(`.${prefixTime}-panel-select`)
            .first()
            .find(`.${prefixTime}-panel-select-option-selected`)
        expect(+popupElWrapperHours.text()).toBe(hours)
        const popupElWrapperMinutes = mTimepicker
            .find(`.${prefixTime}-panel-select`)
            .at(1)
            .find(`.${prefixTime}-panel-select-option-selected`)
        expect(+popupElWrapperMinutes.text()).toBe(minutes)
        const popupElWrapperSeconds = mTimepicker
            .find(`.${prefixTime}-panel-select`)
            .at(2)
            .find(`.${prefixTime}-panel-select-option-selected`)
        expect(+popupElWrapperSeconds.text()).toBe(seconds)
    })
})
describe('component: Timepicker, <test prop:: open>, <test prop:: getPopupContainer>, <test prop:: hourStep>, <test prop:: minuteStep>, <test prop:: secondStep>', () => {
    ;['hourStep', 'minuteStep', 'secondStep'].forEach((step, index) => {
        const stepObj = {[step]: 3}
        it(`${step} should 3`, async () => {
            mTimepicker.unmount()
            mTimepicker = mount(
                <div id='popupEl'>
                    <Timepicker getPopupContainer={() => document.getElementById('popupEl')} {...stepObj} open={true} />
                </div>
            )
            await actWait()
            const popupElWrappers = mTimepicker.find(`.${prefixTime}-panel-select`)
            const firstLiContent = +popupElWrappers.at(index).find('li').first().text()
            const secondLiContent = +popupElWrappers.at(index).find('li').at(1).text()
            expect(secondLiContent - firstLiContent).toEqual(3)
        })
    })
})

describe('component: Timepicker, <test prop:: open>, <test prop:: getPopupContainer>, <test prop:: disabledHours>, <test prop:: disabledMinutes>, <test prop:: disabledSeconds>', () => {
    ;['disabledHours', 'disabledMinutes', 'disabledSeconds'].forEach((step, index) => {
        const stepObj = {[step]: () => [0, 1, 2]}
        it(`${step}: the first three items should be disabled`, async () => {
            mTimepicker.unmount()
            mTimepicker = mount(
                <div id='popupEl'>
                    <Timepicker
                        getPopupContainer={() => document.getElementById('popupEl')}
                        value={demoTime}
                        {...stepObj}
                        open={true}
                    />
                </div>
            )
            await actWait()
            const popupLi = mTimepicker.find(`.${prefixTime}-panel-select`).at(index).find('li')
            for (let i = 0; i < 10; i++) {
                if (i < 3) {
                    expect(popupLi.at(i).hasClass(`${prefixTime}-panel-select-option-disabled`)).toEqual(true)
                    popupLi.at(i).simulate('click')
                    expect(
                        mTimepicker.find('input').at(0).instance().value === demoTime.format('hh:mm:ss')
                    ).toBeTruthy()
                } else {
                    popupLi.at(i).simulate('click')
                    expect(popupLi.at(i).hasClass(`${prefixTime}-panel-select-option-disabled`)).toEqual(false)
                    expect(mTimepicker.find('input').at(0).instance().value === demoTime.format('hh:mm:ss')).toBeFalsy()
                }
            }
        })
    })
})
describe('component: Timepicker, <test prop:: open>, <test prop:: getPopupContainer>, <test prop:: hideDisabledOptions>, <test prop:: disabledHours>, <test prop:: disabledMinutes>, <test prop:: disabledSeconds>', () => {
    ;['disabledHours', 'disabledMinutes', 'disabledSeconds'].forEach((step, index) => {
        const stepObj = {[step]: () => [0, 1, 2]}
        it(`${step}: the first three items should be disabled`, async () => {
            mTimepicker.unmount()
            mTimepicker = mount(
                <div id='popupEl'>
                    <Timepicker
                        getPopupContainer={() => document.getElementById('popupEl')}
                        value={demoTime}
                        {...stepObj}
                        hideDisabledOptions={true}
                        open={true}
                    />
                </div>
            )
            await actWait()
            const popupLi = mTimepicker.find(`.${prefixTime}-panel-select`).at(index).find('li')
            expect(popupLi.at(0).text()).toBe('03')
        })
    })
})
describe('component: Timepicker, <test prop:: defaultOpen>, <test prop:: getPopupContainer>', () => {
    it(`it should have class name as time-picker-panel`, async () => {
        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker getPopupContainer={() => document.getElementById('popupEl')} defaultOpen={true} />
            </div>
        )
        await actWait()
        const popupElWrapper = mTimepicker.find(`.${prefixTime}-panel`).first()
        expect(popupElWrapper.hasClass(`${prefixTime}-panel-column-3`)).toEqual(true)
    })
})
describe('component: Timepicker, <test prop:: onChange>, <test prop:: getPopupContainer>', () => {
    it(`onChange should have been called when click hours li`, async () => {
        const mockChange = jest.fn()

        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker
                    getPopupContainer={() => document.getElementById('popupEl')}
                    defaultOpen={true}
                    onChange={mockChange}
                />
            </div>
        )
        await actWait()
        expect(mockChange).not.toHaveBeenCalled()
        const popupElWrapper = mTimepicker.find(`.${prefixTime}-panel-select li`).first()
        popupElWrapper.simulate('click')
        expect(mockChange).toHaveBeenCalled()
    })

    it(`onChange should have been called when click now btn`, async () => {
        const mockChange = jest.fn()
        const mockClose = jest.fn()

        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker
                    getPopupContainer={() => document.getElementById('popupEl')}
                    defaultOpen={true}
                    onChange={mockChange}
                    onClose={mockClose}
                    showNow
                />
            </div>
        )
        await actWait()
        expect(mockChange).not.toHaveBeenCalled()
        expect(mockClose).not.toHaveBeenCalled()
        const popupElWrapper = mTimepicker.find(`.${prefixTime}-panel-now`).first()
        popupElWrapper.simulate('click')
        expect(mockChange).toHaveBeenCalled()
        expect(mockClose).toHaveBeenCalled()
        expect(moment().diff(moment(mTimepicker.find('input').prop('value'), 'HH:mm:ss'), 's')).toBeLessThan(3) // 避免点击和取值刚好不在同一秒，误差3秒内视为正确
    })
})
describe('component: Timepicker, <test prop:: use12Hours>, <test prop:: onAmPmChange>, <test prop:: getPopupContainer>', () => {
    it(`onAmPmChange should have been called when click am pm`, async () => {
        const mockonAmPmChange = jest.fn()

        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker
                    getPopupContainer={() => document.getElementById('popupEl')}
                    defaultOpen={true}
                    use12Hours
                    onAmPmChange={mockonAmPmChange}
                    open={true}
                />
            </div>
        )
        await actWait()
        expect(mockonAmPmChange).not.toHaveBeenCalled()
        const popupElWrapper = mTimepicker.find(`.${prefixTime}-panel-select`).at(3).find('li')
        popupElWrapper.first().simulate('click')
        expect(mockonAmPmChange).toHaveBeenCalled()
        expect(mockonAmPmChange.mock.calls[0][0]).toBe('AM')
        popupElWrapper.at(1).simulate('click')
        expect(mockonAmPmChange.mock.calls[1][0]).toBe('PM')
    })
})
describe('component: Timepicker, <test prop:: onOpen>, <test prop:: onClose>, <test prop:: getPopupContainer>', () => {
    it(`mockOpen 、mockClose should have been called`, () => {
        const mockOpen = jest.fn()
        const mockClose = jest.fn()

        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker
                    focusOnOpen
                    onOpen={mockOpen}
                    onClose={mockClose}
                    defaultOpenValue={demoTime}
                    getPopupContainer={() => document.getElementById('popupEl')}
                />
            </div>
        )
        expect(mockOpen).not.toHaveBeenCalled()
        let outDiv = mTimepicker.find(`.${prefixTime}`)
        outDiv.simulate('click')
        expect(mockOpen).toHaveBeenCalled()
        expect(mockClose).not.toHaveBeenCalled()
        outDiv.simulate('click')
        expect(mockClose).toHaveBeenCalled()
    })
})
describe('component: Timepicker, <test prop:: renderExtraFooter>, <test prop:: getPopupContainer>', () => {
    it(`panel footer text should be 'werwerwerew'`, async () => {
        mTimepicker.unmount()
        mTimepicker = mount(
            <div id='popupEl'>
                <Timepicker
                    renderExtraFooter={v => 'werwerwerew'}
                    defaultOpenValue={demoTime}
                    open={true}
                    getPopupContainer={() => document.getElementById('popupEl')}
                />
            </div>
        )
        await actWait()
        expect(mTimepicker.find(`.${prefixTime}-panel-inner`).text()).toContain('werwerwerew')
    })
})
describe('clear button test', () => {
    it('when click clear button value should be cleared', () => {
        mTimepicker.unmount()
        let wrapper = mount(<Timepicker defaultValue={'12:13:14'} />)
        expect(wrapper.find('input').prop('value')).toEqual('12:13:14')
        wrapper.find('.uf-close-c').simulate('click')
        expect(wrapper.find('input').prop('value')).toEqual('')
    })
})

// 增加fieldid及文档
describe('fieldid, <test prop:: fieldid>', () => {
    it('@fieldid,"***_input', () => {
        mTimepicker.unmount()
        const wrapper = mount(<Timepicker />)
        expect(wrapper.find('input').prop('fieldid')).toEqual(undefined)
        wrapper.setProps({fieldid: 'fieldid-id'})
        expect(wrapper.find('input').prop('fieldid')).toEqual('fieldid-id_input')
    })
    it('@fieldid,"***_clear', () => {
        mTimepicker.unmount()
        let wrapper = mount(<Timepicker showSecond={false} defaultValue={now} use12Hours />)
        expect(wrapper.find('.uf-close-c').prop('fieldid')).toEqual(undefined)
        wrapper.unmount()
        wrapper = mount(<Timepicker fieldid='fieldid-id' showSecond={false} defaultValue={now} use12Hours />)
        expect(wrapper.find('.uf-close-c').prop('fieldid')).toEqual('fieldid-id_clear')
    })
    it('@fieldid, ***_now', async () => {
        mTimepicker.unmount()
        let wrapper = mount(<Timepicker showNow open fieldid='fieldid' />)
        await actWait()
        expect(wrapper.find(`.wui-time-picker-panel-now`).prop('fieldid')).toEqual('fieldid_now')
    })
})

describe('value', () => {
    it('value, <test prop:: value>', () => {
        mTimepicker.unmount()
        let wrapper = mount(<Timepicker value='10:20:22 PM' use12Hours />)
        wrapper.find('input').simulate('change', {target: {value: ''}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('')

        wrapper.find('input').simulate('change', {target: {value: 'a'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('12:00:00 AM')

        wrapper.find('input').simulate('change', {target: {value: '00'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('12:00:00 AM')

        wrapper.find('input').simulate('change', {target: {value: '26'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('11:00:00 PM')
        wrapper.unmount()

        // showHour={false}
        wrapper = mount(<Timepicker value='' showHour={false} use12Hours />)
        wrapper.find('input').simulate('change', {target: {value: ''}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('')

        wrapper.find('input').simulate('change', {target: {value: 'a'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('00:00 AM')

        wrapper.find('input').simulate('change', {target: {value: '00'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('00:00 AM')

        wrapper.find('input').simulate('change', {target: {value: '78'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('59:00 AM')

        wrapper.unmount()

        wrapper = mount(<Timepicker value='' showHour={false} use12Hours />)
        wrapper.setProps({showHour: false, showMinute: true})

        wrapper.find('input').simulate('change', {target: {value: '123'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('12:03 AM')

        wrapper.find('input').simulate('change', {target: {value: '1234'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('12:34 AM')

        wrapper.find('input').simulate('change', {target: {value: '12345'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('12:34 AM')

        wrapper.find('input').simulate('change', {target: {value: '123456'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('12:34 AM')

        wrapper.find('input').simulate('change', {target: {value: '1234567'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual("12:34 AM")

        wrapper.unmount()

        wrapper = mount(<Timepicker value='' showHour={false} use12Hours />)
        wrapper.setProps({showHour: false, showMinute: false, showSecond: true})

        wrapper.find('input').simulate('change', {target: {value: '1'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('00:01 AM')

        wrapper.find('input').simulate('change', {target: {value: '12'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('00:12 AM')

        wrapper.find('input').simulate('change', {target: {value: '123'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('00:12 AM')

        wrapper.find('input').simulate('change', {target: {value: '1234'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('00:12 AM')

        wrapper.find('input').simulate('change', {target: {value: '12345'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('00:12 AM')

        wrapper.find('input').simulate('change', {target: {value: '123456'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('00:12 AM')

        wrapper.find('input').simulate('change', {target: {value: '1234567'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('00:12 AM')
    })
})

describe('component: <test prop:: disabledHours>, <test prop:: disabledMinutes>, <test prop:: disabledSeconds>', () => {
    function disabledHours() {
        return [0, 1, 2, 3, 4, 5]
    }
    it(`disabledHours: the first three items are disabled, and input the disabled time is invalid`, async () => {
        mTimepicker.unmount()
        const wrapper = mount(<Timepicker value='08:08:08' disabledHours={disabledHours} open={true} />)
        await actWait()
        wrapper.find('input').simulate('change', {target: {value: '10:20:22'}}) // 合法时间
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('10:20:22')

        wrapper.find('input').simulate('change', {target: {value: '02:20:22'}}) // 被禁用时间
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('10:20:22')

        // ============ 输入长度为小于6的时间 start ============
        wrapper.find('input').simulate('change', {target: {value: '102'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('10:02:00')

        wrapper.find('input').simulate('change', {target: {value: '112'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('11:02:00')

        wrapper.find('input').simulate('change', {target: {value: '1178'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('11:59:00')

        wrapper.find('input').simulate('change', {target: {value: '10202'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('10:20:02')

        wrapper.find('input').simulate('change', {target: {value: '123456'}})
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input').prop('value')).toEqual('12:34:56')
        // ============ 长度为小于6的时间 end ============
    })
})

// describe('component: <test prop:: allowEmpty>', () => {
//     it(`it should be error when empty and allowEmpty is false`, () => {
//         mTimepicker.unmount()
//         const wrapper = mount(<Timepicker allowEmpty={false} />);
//         wrapper.find('input').simulate('change', { target: { value: '' } }); // 被禁用时间
//         wrapper.find('input').simulate('blur');
//         expect(wrapper.find('input').hasClass(`${prefixTime}-input-invalid`)).toBe(true)
//     })
// })

// 快捷键补充
describe('keyboard test', () => {
    it('board should open when click DOWN key', () => {
        let wrapper = mount(<Timepicker />)
        expect(wrapper.exists(`.${prefixTime}-panel`)).toEqual(false)
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.DOWN
        })
        expect(wrapper.exists(`.${prefixTime}-panel`)).toEqual(true)
    })
})

// 基于jira的测试用例
describe('Jira-based unit testing, <test prop:: locale>', () => {
    // QDJCJS-8560修复blur事件取值错误导致时间无效
    // 问题场景： timePicker 只显示时 选中一个时间 然后失焦 再聚焦 不做操作再聚焦 内容消失
    it('', async () => {
        let wrapper = mount(<Timepicker showMinute={false} showSecond={false} open />)
        await actWait()
        wrapper.find(`.${prefixTime}-panel-select`).at(0).find('li').at(1).simulate('click')
        expect(wrapper.find('input').at(1).prop('value')).toEqual('01')
        wrapper.find('input').simulate('blur')
        wrapper.find('input').simulate('focus')
        wrapper.find('input').simulate('focus')
        expect(wrapper.find('input').at(1).prop('value')).toEqual('01')
    })

    // QDJCJS-6403修复TimePicker清除按钮多语未适配
    Object.entries({'zh-cn': '清除', en: 'Clear', 'en-us': 'Clear', 'zh-tw': '清除', 'vi-vn': 'Làm sạch'}).forEach(
        item => {
            it('', () => {
                let wrapper = mount(<Timepicker defaultValue={'10:10:10'} locale={item[0]} />)
                expect(wrapper.find('.uf-close-c').prop('title')).toEqual(item[1])
            })
        }
    )
})
