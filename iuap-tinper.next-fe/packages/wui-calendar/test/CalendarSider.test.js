/** CalendarSider.tsx */
import {mount} from '../../../next-ui-library/test/common/mount';
import Moment from 'moment';
import React from 'react';
import {prefix} from '../../wui-core/src/updatePrefix'
import CalendarSider from '../src/CalendarSider';
import i18n from '../src/i18n/lang'

const prefixCalendar = `${prefix}-calendar`;

describe('CalendarSider', () => {
    it(`prefixCls, <test prop:: prefixCls>`, () => {
        const wrapper = mount(<CalendarSider prefixCls={`${prefix}`} value={Moment('2017-01-25')} lang='zh-cn' localeData={i18n['zh-cn']}/>);
        expect(wrapper.exists(`.${prefix}-sider`)).toEqual(true);
        wrapper.setProps({prefixCls: `${prefixCalendar}`});
        expect(wrapper.exists(`.${prefixCalendar}-sider`)).toEqual(true);
    })
    Object.entries({'1月': 'zh-cn', 'Jan': 'en-us', '1月': 'zh-tw', 'Thg 01': 'vi-vn'}).forEach((item) => {
        it(`lang should be ${item}, <test prop:: lang>`, () => {
            const wrapper = mount(<CalendarSider prefixCls={`${prefix}`} value={Moment('2017-01-25')} lang={item[1]} localeData={i18n[item[1]]}/>);
            expect(wrapper.find(`ul li`).at(0).text()).toEqual(item[0]);
        })
    })
    it('should be success, <test prop:: value>', () => {
        const wrapper = mount(<CalendarSider prefixCls={`${prefix}`} value={Moment('2017-03-25')} lang='zh-cn' localeData={i18n['zh-cn']}/>);
        expect(wrapper.find(`.${prefix}-active-sider-month`).at(0).text()).toEqual('3月')
    })
    it('onMonthChange, <test prop:: onMonthChange>', () => {
        const onMonthChange = jest.fn();
        const wrapper = mount(<CalendarSider onMonthChange={onMonthChange} prefixCls={`${prefix}`}
											 value={Moment('2017-01-25')} lang='zh-cn'  localeData={i18n['zh-cn']} />);
        expect(onMonthChange).not.toHaveBeenCalled();
        wrapper.find('li').at(3).simulate('click');
        expect(Moment(onMonthChange.mock.calls[0][0]).format('YYYY-MM-DD')).toEqual("2017-04-25");
    })
    it('onTimeEventsClick, <test prop:: onTimeEventsClick>', () => {
        const onTimeEventsClick = jest.fn();
        const wrapper = mount(<CalendarSider onTimeEventsClick={onTimeEventsClick} prefixCls={`${prefix}`}
											 value={Moment('2017-01-25')} lang='zh-cn' localeData={i18n['zh-cn']} type="hour"/>);
        expect(onTimeEventsClick).not.toHaveBeenCalled();
        wrapper.find('li').at(0).simulate('click');
        expect(Moment(onTimeEventsClick.mock.calls[0][0]).format('HH:mm')).toEqual('00:00');
    })
    it('hourCellRender && hourCellContentRender, <test prop:: hourCellRender>, <test prop:: hourCellContentRender>, <test prop:: showTimeLine>', () => {
        const wrapper = mount(<CalendarSider showTimeLine={false} prefixCls={`${prefix}`}
											 value={Moment('2017-01-25')} lang='zh-cn' localeData={i18n['zh-cn']} type="hour"/>);
        wrapper.setProps({ hourCellContentRender: () => <div className='test'>test</div> });
        expect(wrapper.exists(`.${prefix}-time-item-span`)).toEqual(true);
        expect(wrapper.find(`.${prefix}-time-item-span`).at(4).find('div').hasClass('test')).toEqual(true);
        expect(wrapper.find(`.${prefix}-time-item-span`).at(4).find('div').text()).toEqual('test');
                                         
        wrapper.setProps({ hourCellRender: () => <div className='test'>test</div> });
        expect(wrapper.exists(`.${prefix}-time-item-span`)).toEqual(false);
        expect(wrapper.find(`.${prefix}-list-item`).at(4).find('div').hasClass('test')).toEqual(true);
        expect(wrapper.find(`.${prefix}-list-item`).at(4).find('div').text()).toEqual('test');
    })
    it('type test, <test prop:: type>', () => {
        let wrapper = mount(<CalendarSider prefixCls={`${prefix}`} value={Moment('2017-01-25')} localeData={i18n['zh-cn']} lang='zh-cn'/>);
        expect(wrapper.find(`.${prefix}-list-items`).find(`.${prefix}-list-item`)).toHaveLength(12);
        wrapper.unmount()
        wrapper = mount(<CalendarSider showTimeLine={false} prefixCls={`${prefix}`} value={Moment('2017-01-25')} lang='zh-cn' type="hour"/>)
        expect(wrapper.find(`.${prefix}-list-items`).find(`.${prefix}-list-item`)).toHaveLength(96);
    })
})

describe('fieldid, <test prop:: fieldid>', () => {
    Object.entries({'0': '1', '1': '2', '2': '3', '3': '4', '4': '5', '5': '6'}).forEach((item) => {
        it(`@fieldid,"***_${item[1]}月"`, () => {
            const wrapper = mount(<CalendarSider prefixCls={`${prefix}`} value={Moment('2017-01-25')} localeData={i18n['zh-cn']} lang='zh-cn'/>);
            expect(wrapper.find(`.${prefix}-list-item`).at(item[0]).prop('fieldid')).toEqual(undefined)
            wrapper.setProps({ fieldid: 'fieldid-id' });
            expect(wrapper.find(`.${prefix}-list-item`).at(item[0]).prop('fieldid')).toEqual(`fieldid-id_${item[1]}月`)
        })
    })
    it('@fieldid,"***_slider"', () => {
        const wrapper = mount(<CalendarSider prefixCls={`${prefix}`} value={Moment('2017-01-25')} localeData={i18n['zh-cn']} lang='zh-cn'/>);
        expect(wrapper.find(`.${prefix}-sider`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefix}-sider`).prop('fieldid')).toEqual('fieldid-id_slider');
    })
    it('@fieldid,"***_siderTime_${item}_${i}`"', () => {
        const wrapper = mount(<CalendarSider prefixCls={`${prefix}`} type="hour"  localeData={i18n['zh-cn']} fieldid='fieldid-id'
                                    value={Moment('2017-01-25')} lang='zh-cn'/>);
        expect(wrapper.find(`.${prefix}-time-item`).at(0).prop('fieldid')).toEqual("fieldid-id_siderTime_0_1");
    })
})
