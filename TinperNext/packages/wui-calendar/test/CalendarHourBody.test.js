/** CalendarHourBody.tsx */
import {mount} from '../../../next-ui-library/test/common/mount';
import Moment from 'moment';
import React from 'react';
import {prefix} from '../../wui-core/src/updatePrefix';
import CalendarHourBody from '../src/CalendarHourBody';

const prefixCalendar = `${prefix}-calendar`;
// QDJCJS-9862日历日视图开发
describe('Component: CalendarHourBody', () => {
    it('Component: CalendarHourBody, <test prop:: onTimeEventsClick>, <test prop:: layout>, <test prop:: fieldid>, <test prop:: timeEvents>', () => {
        const timeEvents = [
            {
                start: '2022-10-09 12:52',
                end: '2022-10-09 15:00',
                content: '1重型机械维修',
            },
            {
                start: '2022-10-09 13:00',
                end: '2022-10-09 13:07',
                content: '2重型机械维修',
            },
            {
                start: '2022-10-09 13:08',
                end: '2022-10-09 13:13',
                content: '3重型机械维修',
            },
            {
                start: '2022-10-09 12:08',
                end: '2022-10-09 13:13',
                content: '4重型机械维修',
            },
            {
                start: '2022-10-09 12:59',
                end: '2022-10-09 13:13',
                content: '5重型机械维修',
            },
            {
                start: '2022-10-09 22:59',
                end: '2022-10-09 23:13',
                content: '6重型机械维修',
            },
            {
                start: '2022-10-09 14:40',
                end: '2022-10-09 14:55',
                content: '7重型机械维修',
            },
            {
                start: '2022-10-09 15:01',
                end: '2022-10-09 15:05',
                content: '8重型机械维修',
            },
        ];
        const onTimeEventsClick = jest.fn();
        const wrapper = mount(<CalendarHourBody value={'2022-10-09'} clsPrefix={`${prefixCalendar}`}
                                    timeEvents={timeEvents} onTimeEventsClick={onTimeEventsClick}/>);
        // timeEvents
        expect(wrapper.find(`.${prefixCalendar}-day-events-item`)).toHaveLength(8);
        wrapper.find(`.${prefixCalendar}-last-item`).at(0).simulate('click');
        expect(Moment(onTimeEventsClick.mock.calls[0][1]).format('HH:mm')).toBe('00:00');
        wrapper.find(`.${prefixCalendar}-day-events-item`).at(0).simulate('click');
        expect(onTimeEventsClick.mock.calls[1][1]).toEqual({"content": "3重型机械维修", "end": "2022-10-09 13:13", "start": "2022-10-09 13:08"});

        // layout fieldid
        expect(wrapper.find(`.${prefixCalendar}-day-events`).at(0).prop('style').width).toEqual("calc(100% - 78px)")
        expect(wrapper.find(`.${prefixCalendar}-last-item`).at(0).prop('fieldid')).toEqual(undefined)
        wrapper.setProps({ layout: 'left', fieldid: 'fieldid-id' })
        expect(wrapper.find(`.${prefixCalendar}-day-events`).at(0).prop('style').width).toEqual("calc(100% - 85px)")
        expect(wrapper.find(`.${prefixCalendar}-last-item`)).toHaveLength(24);
        for (let i = 0; i < 24; i++) {
            let time = i < 10 ? '0' + i : i;
            expect(wrapper.find(`.${prefixCalendar}-last-item`).at(i).prop('fieldid')).toEqual("fieldid-id_bodyTime_" + time + "_45")
        }

        wrapper.unmount();
    })
})

describe('showTimeLine test', () => {
    it('<test prop:: showTimeLine>, <test prop:: value>, <test prop:: current>', () => {
        const timeEvents = [
            {
                start: '2022-10-09 12:52',
                end: '2022-10-09 15:00',
                content: '1重型机械维修',
            },
        ];
        const wrapper = mount(<CalendarHourBody value={Moment().format('YYYY-MM-DD')} clsPrefix={`${prefixCalendar}`}
                                    timeEvents={timeEvents} showTimeLine current={Moment()}/>);
        // 在当天 并且 showTimeLine=true 时会进行渲染 
        expect(wrapper.exists(`.${prefixCalendar}-curr-line`)).toEqual(true);
        expect(wrapper.exists(`.${prefixCalendar}-curr-circle`)).toEqual(true);
        expect(wrapper.exists(`.${prefixCalendar}-curr-time`)).toEqual(true);

        wrapper.setProps({ value: '2022-10-09' });
        expect(wrapper.exists(`.${prefixCalendar}-curr-line`)).toEqual(false);
        expect(wrapper.exists(`.${prefixCalendar}-curr-circle`)).toEqual(false);
        expect(wrapper.exists(`.${prefixCalendar}-curr-time`)).toEqual(false);

        wrapper.setProps({ showTimeLine: false, value: Moment().format('YYYY-MM-DD') });
        expect(wrapper.exists(`.${prefixCalendar}-curr-line`)).toEqual(false);
        expect(wrapper.exists(`.${prefixCalendar}-curr-circle`)).toEqual(false);
        expect(wrapper.exists(`.${prefixCalendar}-curr-time`)).toEqual(false);
    })
})