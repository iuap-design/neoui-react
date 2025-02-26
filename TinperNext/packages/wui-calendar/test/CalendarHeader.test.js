/** CalendarHeader.tsx */
import {mount} from '../../../next-ui-library/test/common/mount';
import Moment from 'moment';
import React from 'react';
import {prefix} from '../../wui-core/src/updatePrefix';
import Select from '../../wui-select/src';
import CalendarHeader from '../src/CalendarHeader';

const prefixCalendar = `${prefix}-calendar`;
const prefixSelect = `${prefix}-select`;
import i18n from '../src/i18n/lang'

describe('CalendarHeader', () => {
    it(`locale should be this, <test prop:: locale>`, () => {
        const wrapper = mount(<CalendarHeader value={Moment('2017-01-25')} locale={{month: '月', year: '年'}}
											  Select={Select} prefixCls={`${prefixCalendar}`}/>);
        expect(wrapper.find(`.${prefixCalendar}-show-date`).text()).toEqual('2017 年 1 月')
        wrapper.setProps({locale: {month: 'month', year: 'year'}});
        expect(wrapper.find(`.${prefixCalendar}-show-date`).text()).toEqual('2017 year 1 month')
    })
    Object.entries({0: 'month', 1: 'date'}).forEach((item) => {
        it(`type should be ${item}, <test prop:: type>`, () => {
            const wrapper = mount(<CalendarHeader type={item[1]} value={Moment('2017-01-25')}
												  Select={Select} prefixCls={`${prefixCalendar}`}
												  showTypeSwitch={true}/>);
            expect(wrapper.find(`.${prefixCalendar}-header-switcher`).find('span').at(item[0]).hasClass(`${prefixCalendar}-header-switcher-focus`)).toEqual(true);
        })
    })
    it(`showTypeSwitch, <test prop:: showTypeSwitch>`, () => {
        const wrapper = mount(<CalendarHeader showTypeSwitch={true} value={Moment('2017-01-25')}
											  Select={Select} prefixCls={`${prefixCalendar}`}/>);
        expect(wrapper.exists(`.${prefixCalendar}-header-switcher`)).toEqual(true);
        wrapper.setProps({showTypeSwitch: false});
        expect(wrapper.exists(`.${prefixCalendar}-header-switcher`)).toEqual(false);
    })
    it(`headerComponents, <test prop:: headerComponents>`, () => {
        const wrapper = mount(<CalendarHeader value={Moment('2017-01-25')} Select={Select}
											  prefixCls={`${prefixCalendar}`}/>);
        expect(wrapper.find(`.${prefixCalendar}-header`).find(`.${prefixSelect}`).length).toEqual(1);
        wrapper.setProps({headerComponents: [<Select/>, <Select/>]});
        expect(wrapper.find(`.${prefixCalendar}-header`).find(`.${prefixSelect}`).length).toEqual(3);
    })
    it(`prefixCls, <test prop:: prefixCls>`, () => {
        const wrapper = mount(<CalendarHeader prefixCls={`${prefix}`} showTypeSwitch={true}
											  value={Moment('2017-01-25')} Select={Select}/>);
        expect(wrapper.exists(`.${prefix}-header`)).toEqual(true);
        wrapper.setProps({prefixCls: `${prefixCalendar}`});
        expect(wrapper.exists(`.${prefixCalendar}-header`)).toEqual(true);
    })
    it('should be success, <test prop:: value>', () => {
        const wrapper = mount(<CalendarHeader value={Moment('2017-01-25')} locale={{month: '月', year: '年'}}
											  Select={Select} prefixCls={`${prefixCalendar}`}/>);
        expect(wrapper.find(`.${prefixCalendar}-show-date`).text()).toEqual('2017 年 1 月')
    })
    it('onTypeChange should work correctly, <test prop:: onTypeChange>', () => {
        const onTypeChange = jest.fn();
        let wrapper = mount(<CalendarHeader onTypeChange={onTypeChange} type='date' showTypeSwitch={true} value={Moment('2017-01-25')} Select={Select}  prefixCls={`${prefixCalendar}`} locale={i18n['en-us']} />);
        wrapper.find(`.${prefixCalendar}-header-switcher-normal`).simulate('click');
        expect(onTypeChange).toHaveBeenCalled();
        expect(onTypeChange.mock.calls[0][0]).toBe('month');

        wrapper.setProps({ type: 'month' })
        wrapper.find(`.${prefixCalendar}-header-switcher-normal`).simulate('click');
        expect(onTypeChange.mock.calls[1][0]).toBe('date');
        wrapper.unmount()
        wrapper = mount(<CalendarHeader operations={['lastMonth', 'nextMonth', 'today', 'headerSwitcher']} type="date" value={Moment('2017-01-25')} locale={{...i18n['zh-cn'], month: '月', year: '年'}}
                            Select={Select} prefixCls={`${prefixCalendar}`} onTypeChange={onTypeChange}/>);
        wrapper.find(`.${prefixCalendar}-header-switcher-normal`).simulate('click');
        expect(onTypeChange.mock.calls[2][0]).toBe('hour');
        wrapper.unmount()
        wrapper = mount(<CalendarHeader operations={['lastMonth', 'nextMonth', 'today', 'headerSwitcher']} type="hour" value={Moment('2017-01-25')} locale={{...i18n['en-us'], date:'日', month: '月', year: '年'}}
                            Select={Select} prefixCls={`${prefixCalendar}`} onTypeChange={onTypeChange}/>);
        wrapper.find(`.${prefixCalendar}-header-switcher-normal`).simulate('click');
        expect(onTypeChange.mock.calls[3][0]).toBe('date');

    })
    it('onValueChange should work correctly, <test prop:: onValueChange>', () => {
        const onValueChange = jest.fn();
        let wrapper = mount(<CalendarHeader onValueChange={onValueChange} type='date' showTypeSwitch={true} value={Moment('2017-01-25')}
                                                Select={Select}  prefixCls={`${prefixCalendar}`} yearSelectTotal={5} yearSelectOffset={1}/>);
        wrapper.find(`.${prefixCalendar}-header-year-select`).find(`.${prefixSelect}-selector`).simulate('click');
        // wrapper.find(`.${prefixSelect}-item-option`).at(0).simulate('click');
        // expect(onValueChange).toHaveBeenCalled();
        // expect(Moment(onValueChange.mock.calls[0][0]).format("YYYY-MM-DD")).toBe("2016-01-25");

        // wrapper = mount(<CalendarHeader operations={['lastMonth', 'nextMonth', 'today', 'headerSwitcher']} type="date" value={Moment('2017-01-25')} locale={{...i18n['zh-cn'], month: '月', year: '年'}}
        //                             Select={Select} prefixCls={`${prefixCalendar}`} onValueChange={onValueChange}/>);
        // wrapper.find(`.${prefixCalendar}-lastMonth`).at(0).simulate('click');
        // expect(Moment(onValueChange.mock.calls[1][0]).format('YYYY-MM-DD')).toBe('2016-12-25');
        // wrapper.find(`.${prefixCalendar}-nextMonth`).at(0).simulate('click');
        // expect(Moment(onValueChange.mock.calls[2][0]).format('YYYY-MM-DD')).toBe('2017-02-25');
        // wrapper.find(`.${prefixCalendar}-today`).at(0).simulate('click');
        // expect(Moment(onValueChange.mock.calls[3][0]).format('YYYY-MM-DD')).toBe(Moment().format('YYYY-MM-DD'));

        // wrapper = mount(<CalendarHeader operations={['lastDay', 'nextDay', 'today', 'headerSwitcher']} type="hour" value={Moment('2017-01-25')} locale={{...i18n['en-us'], date: '日', month: '月', year: '年'}}
        //                     Select={Select} prefixCls={`${prefixCalendar}`} onValueChange={onValueChange}/>);
        // wrapper.find(`.${prefixCalendar}-lastDay`).at(0).simulate('click');
        // expect(Moment(onValueChange.mock.calls[4][0]).format('YYYY-MM-DD')).toBe('2017-01-24');
        // wrapper.find(`.${prefixCalendar}-nextDay`).at(0).simulate('click');
        // expect(Moment(onValueChange.mock.calls[5][0]).format('YYYY-MM-DD')).toBe('2017-01-26');
        // wrapper.find(`.${prefixCalendar}-today`).at(0).simulate('click');
        // expect(Moment(onValueChange.mock.calls[6][0]).format('YYYY-MM-DD')).toBe(Moment().format('YYYY-MM-DD'));
    })
    it(`Select, <test prop:: Select>`, () => {
        const Select1 = () => {
            return <Select className='new-select'/>
        };
        const wrapper = mount(<CalendarHeader Select={Select1} value={Moment('2017-01-25')}
											  prefixCls={`${prefixCalendar}`}/>);
        expect(wrapper.find(`.${prefixCalendar}-header`).find(`.${prefixSelect}`).hasClass('new-select')).toEqual(true);
    })
    it('yearSelectOffset yearSelectTotal, <test prop:: yearSelectTotal>, <test prop:: yearSelectOffset>', () => {
        const wrapper = mount(<CalendarHeader value={Moment('2017-01-25')} yearSelectTotal={5} yearSelectOffset={1}
											  Select={Select} prefixCls={`${prefixCalendar}`}/>);
        wrapper.find(`.${prefixCalendar}-header-year-select`).find(`.${prefixSelect}-selector`).simulate('click');
        // expect(wrapper.find(`.${prefixSelect}-item-option`)).toHaveLength(5);
        // expect(wrapper.find(`.${prefixSelect}-item-option`).at(0).find(`.${prefixSelect}-item-option-content`).text()).toEqual('2016');
    });
    it('operations test, <test prop:: operations>', async () => {
        let wrapper = mount(<CalendarHeader operations={['lastMonth', 'nextMonth', 'today', 'headerSwitcher']} type="date" value={Moment('2017-01-25')} locale={{...i18n['zh-cn'], month: '月', year: '年'}}
                                    Select={Select} prefixCls={`${prefixCalendar}`}/>);
        expect(wrapper.exists(`.${prefixCalendar}-lastMonth`)).toEqual(true);
        expect(wrapper.exists(`.${prefixCalendar}-nextMonth`)).toEqual(true);
        expect(wrapper.exists(`.${prefixCalendar}-today`)).toEqual(true);
        expect(wrapper.exists(`.${prefixCalendar}-header-switcher`)).toEqual(true);
        expect(wrapper.find(`.${prefixCalendar}-show-date`).text()).toEqual("2017 年 1 月 ");
        wrapper.unmount()
        wrapper = mount(<CalendarHeader operations={['lastDay', 'nextDay', 'today', 'headerSwitcher']} type="hour" value={Moment('2017-01-25')} locale={{...i18n['en-us'], date: '日', month: '月', year: '年'}}
                                    Select={Select} prefixCls={`${prefixCalendar}`}/>);
        expect(wrapper.exists(`.${prefixCalendar}-lastDay`)).toEqual(true);
        expect(wrapper.exists(`.${prefixCalendar}-nextDay`)).toEqual(true);
        expect(wrapper.exists(`.${prefixCalendar}-today`)).toEqual(true);
        expect(wrapper.exists(`.${prefixCalendar}-header-switcher`)).toEqual(true);
        expect(wrapper.find(`.${prefixCalendar}-show-date`).text()).toEqual("2017 年 1 月 25 日 ");
        wrapper.unmount()

        wrapper = mount(<CalendarHeader operations={undefined} type="hour" value={Moment('2017-01-25')} locale={{...i18n['en-us'], date: '日', month: '月', year: '年'}}
                                    Select={Select} prefixCls={`${prefixCalendar}`}/>);
        expect(wrapper.exists(`.${prefixCalendar}-lastDay`)).toEqual(false);
        expect(wrapper.exists(`.${prefixCalendar}-nextDay`)).toEqual(false);
        expect(wrapper.exists(`.${prefixCalendar}-today`)).toEqual(false);
        expect(wrapper.exists(`.${prefixCalendar}-header-switcher`)).toEqual(false);
        expect(wrapper.exists(`.${prefixCalendar}-header-year-select`)).toEqual(true);
        expect(wrapper.find(`.${prefixCalendar}-show-date`).text()).toEqual("2017 年 1 月");
      })
})

describe('fieldid, <test prop:: fieldid>', () => {
    it('@fieldid,"***_year_select"', () => {
        const wrapper = mount(<CalendarHeader value={Moment('2017-01-25')} locale={{...i18n['zh-cn'], month: '月', year: '年'}}
                                              Select={Select} prefixCls={`${prefixCalendar}`} />);
        expect(wrapper.find(`.${prefixCalendar}-header`).find(`.${prefix}-select`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixCalendar}-header`).find(`.${prefix}-select`).prop('fieldid')).toEqual('fieldid-id_year_select');
    })
    it('@fieldid,"***_switch_month"', () => {
        const wrapper = mount(<CalendarHeader value={Moment('2017-01-25')} locale={{...i18n['zh-cn'], month: '月', year: '年'}}
                                              Select={Select} prefixCls={`${prefixCalendar}`} type="date" showTypeSwitch={true}/>);
        expect(wrapper.find(`.${prefixCalendar}-header-switcher-focus`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixCalendar}-header-switcher-focus`).prop('fieldid')).toEqual('fieldid-id_switch_month');
    })
    it('@fieldid,"***_switch_year"', () => {
        const wrapper = mount(<CalendarHeader value={Moment('2017-01-25')} locale={{...i18n['zh-cn'], month: '月', year: '年'}}
                                              Select={Select} prefixCls={`${prefixCalendar}`} type="month" showTypeSwitch={true}/>);
        expect(wrapper.find(`.${prefixCalendar}-header-switcher-focus`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixCalendar}-header-switcher-focus`).prop('fieldid')).toEqual('fieldid-id_switch_year');
    })
    it('@fieldid,"***_calendar_header"', () => {
        const wrapper = mount(<CalendarHeader value={Moment('2017-01-25')} locale={{...i18n['zh-cn'], month: '月', year: '年'}}
                                              Select={Select} prefixCls={`${prefixCalendar}`}/>);
        expect(wrapper.find(`.${prefixCalendar}-header`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixCalendar}-header`).prop('fieldid')).toEqual('fieldid-id_calendar_header');
    })
    it('fieldid test', () => {
        let wrapper = mount(<CalendarHeader type="hour" value={Moment('2017-01-25')} locale={{...i18n['zh-cn'], date: '日', month: '月', year: '年'}} 
                                Select={Select} headerComponents={[<Select/>, <Select/>]} 
                                fieldid={'fieldid-id'} prefixCls={`${prefixCalendar}`} operations={['lastDay', 'nextDay', 'today', 'headerSwitcher']}/>);
        expect(wrapper.find(`.${prefixCalendar}-lastDay`).at(0).prop('fieldid')).toEqual('fieldid-id_toLastDay');
        expect(wrapper.find(`.${prefixCalendar}-nextDay`).at(0).prop('fieldid')).toEqual('fieldid-id_toNextDay');
        expect(wrapper.find(`.${prefixCalendar}-today`).at(0).prop('fieldid')).toEqual('fieldid-id_toToday');
        expect(wrapper.find(`.${prefixCalendar}-headerComponents`).at(0).prop('fieldid')).toEqual('fieldid-id_headerComponents');

        wrapper = mount(<CalendarHeader type="date" value={Moment('2017-01-25')} locale={{...i18n['zh-cn'], month: '月', year: '年'}} Select={Select}
                                fieldid={'fieldid-id'} prefixCls={`${prefixCalendar}`} operations={['lastMonth', 'nextMonth', 'today', 'headerSwitcher']}/>);
        expect(wrapper.find(`.${prefixCalendar}-lastMonth`).at(0).prop('fieldid')).toEqual('fieldid-id_toLastMonth');
        expect(wrapper.find(`.${prefixCalendar}-nextMonth`).at(0).prop('fieldid')).toEqual('fieldid-id_toNextMonth');
        expect(wrapper.find(`.${prefixCalendar}-today`).at(0).prop('fieldid')).toEqual('fieldid-id_toToday');
    })
})
