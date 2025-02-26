/**Calendar.tsx */
import React, { Component } from 'react';
import {mount} from '../../../next-ui-library/test/common/mount';
import { attrsTest, testCustomeText, eventsTest } from "../../../next-ui-library/test/common/index";
import Moment from 'moment';
import Calendar from '../src/index';
import { prefix } from '../../wui-core/src/updatePrefix'
import { sleep } from '../../../next-ui-library/test/common/utils';
const prefixCalendar = `${prefix}-calendar`;

describe('Calendar', () => {
  attrsTest({
    title: 'component: Calendar',
    Component: Calendar,
    attrs: {
    },
    selector: 'div div',
    classnames: [`${prefixCalendar}`],
  }) 
  attrsTest({
    title: 'component: Calendar, <test prop:: fillSpace>',
    Component: Calendar,
    attrs: {
      fillSpace: true,
      fullscreen: true
    },
    selector: `.${prefixCalendar}`,
    classnames: [`${prefixCalendar}-fill-space`],
  }) 
  attrsTest({
    title: 'component: Calendar, <test prop:: fullscreen>',
    Component: Calendar,
    attrs: {
      fullscreen: true
    },
    selector: `.${prefixCalendar}`,
    classnames: [`${prefixCalendar}-fullscreen`],
  })
  attrsTest({
    title: 'component: Calendar, <test prop:: markWeekend>',
    Component: Calendar,
    attrs: {
      markWeekend: true
    },
    selector: `.${prefixCalendar}-cell`,
    classnames: [`${prefixCalendar}-day-mark`],
  })
  Object.entries({Year:'month', Month: 'date'}).forEach((item) => {
    testCustomeText({
      title: 'Comment: Calendar, <test prop:: type>',
      Component: Calendar,
      attrs: {
          type: item[1]
      },
      selector: `.${prefixCalendar}-full-header-switcher-focus`,
      text: item[0]
    })
  })
  Object.entries({Year:'month', Month: 'date'}).forEach((item) => {
    testCustomeText({
      title: 'Comment: Calendar, <test prop:: defaultType>',
      Component: Calendar,
      attrs: {
        defaultType: item[1]
      },
      selector: `.${prefixCalendar}-full-header-switcher-focus`,
      text: item[0]
    })
  });
  Object.entries({Year:'month', Month: 'date'}).forEach((item) => {
    testCustomeText({
      title: 'Comment: Calendar, <test prop:: mode>',
      Component: Calendar,
      attrs: {
        mode: item[1]
      },
      selector: `.${prefixCalendar}-full-header-switcher-focus`,
      text: item[0]
    })
  });
  eventsTest({
    title: 'component: Calendar, <test prop:: onTypeChange>',
    Component: Calendar,
    propFuncName: 'onTypeChange',
    dependentProps: {type: 'date'},
    selector: `.${prefixCalendar}-full-header-switcher-normal`,
    eventName: 'click',
    eventArgs: ['month']
  })
  eventsTest({
    title: 'component: Calendar, <test prop:: onPanelChange>',
    Component: Calendar,
    propFuncName: 'onPanelChange',
    dependentProps: {type: 'date'},
    selector: `.${prefixCalendar}-full-header-switcher-normal`,
    eventName: 'click',
    eventArgs: ['month']
  })
  eventsTest({
    title: 'component: Calendar, <test prop:: onChange>',
    Component: Calendar,
    propFuncName: 'onChange',
    dependentProps: {defaultValue: Moment('2017-01-25')},
    selector: `td`,
    eventName: 'click',
    eventArgs: [],
    afterTest: (mockevent) => {
      expect(mockevent.mock.calls[0][0].format('YYYY-MM-DD')).toEqual('2017-01-01')
    }
  })
  eventsTest({
    title: 'component: Calendar, <test prop:: onSelect>',
    Component: Calendar,
    propFuncName: 'onSelect',
    dependentProps: {defaultValue: Moment('2017-01-25')},
    selector: `td`,
    eventName: 'click',
    eventArgs: [],
    afterTest: (mockevent) => {
      expect(mockevent.mock.calls[0][0].format('YYYY-MM-DD')).toEqual('2017-01-01')
    }
  })
  it('defaultValue, <test prop:: defaultValue>', () => {
    const wrapper = mount(<Calendar defaultValue={Moment('2017-01-25')} />);
    expect(Moment(wrapper.find(`.${prefixCalendar}-selected-day`).prop("title")).format("YYYY-MM-DD")).toEqual('2017-01-25');
  });
  [0, 1, 2, 3, 4, 5, 6].forEach(item => {
    it('renderDateHeaderCell, <test prop:: renderDateHeaderCell>', () => {
      const wrapper = mount(<Calendar renderDateHeaderCell={() => {return <div>11</div>}} />);
      expect(wrapper.find(`.${prefixCalendar}-column-header-inner div`).at(item).text()).toEqual('11');
    });
  });
  it('headerRender should be this, <test prop:: headerRender>', () => {
    const headerRender = () => {
      return <div className='header'>自定义头部</div>
    };
    const wrapper = mount(<Calendar headerRender={headerRender} />);
    expect(wrapper.find(`.${prefixCalendar}`).find('.header').text()).toBe("自定义头部");
  })
  it('monthCellRender should be called, <test prop:: monthCellRender>', () => {
    const wrapper = mount(<Calendar type='month' />);
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-month-panel-month`).text()).toEqual('Jan')
    wrapper.setProps({ monthCellRender: () => {return <div>month</div>} });
    expect(wrapper.exists(`.${prefixCalendar}-month-panel-month`)).toEqual(false);
    expect(wrapper.find('tr td').at(0).find('div').text()).toEqual('month');
  })
  it('monthCellContentRender should be called, <test prop:: monthCellContentRender>', () => {
    const wrapper = mount(<Calendar type='month' />);
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-month-panel-month`).text()).toEqual('Jan')
    wrapper.setProps({ monthCellContentRender: () => {return <div>month</div>} });
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-month-panel-month`).find('div').text()).toEqual('month');
  })
  it('monthFullCellRender should be called, <test prop:: monthFullCellRender>', () => {
    const wrapper = mount(<Calendar type='month' />);
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-month-panel-month`).text()).toEqual('Jan')
    wrapper.setProps({ monthFullCellRender: () => {return <div>month</div>} });
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-month-panel-month`).find('div').text()).toEqual('month');
  })
  it('dateCellRender should be called, <test prop:: dateCellRender>', () => {
    const wrapper = mount(<Calendar defaultValue={Moment('2017-01-25')}/>);
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-date`).text()).toEqual('1');
    wrapper.setProps({ dateCellRender: () => {return <div>date</div>} });
    expect(wrapper.exists(`.${prefixCalendar}-date`)).toEqual(false);
    expect(wrapper.find('tr td').at(0).find('div').text()).toEqual('date');
  })
  it('dateCellContentRender should be called, <test prop:: dateCellContentRender>', () => {
    const wrapper = mount(<Calendar defaultValue={Moment('2017-01-25')} />);
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-date`).text()).toEqual('1');
    wrapper.setProps({ dateCellContentRender: () => {return <div>date</div>} });
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-date div`).text()).toEqual('date');
  })
  it('dateFullCellRender should be called, <test prop:: dateFullCellRender>', () => {
    const wrapper = mount(<Calendar defaultValue={Moment('2017-01-25')} />);
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-date`).text()).toEqual('1');
    wrapper.setProps({ dateFullCellRender: () => {return <div>date</div>} });
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-date div`).text()).toEqual('date');
  })
  it('disabledDate be function, <test prop:: disabledDate>', () => {
    const disabledDate = (current) => {
      return current < Moment('2017-01-25').subtract(1, "day")
    };
    const wrapper = mount(<Calendar defaultValue={Moment('2017-01-02')} disabledDate={disabledDate} />);
    // wrapper.debug()
    // wrapper.debug(wrapper.find("td").at(0))
    expect(wrapper.find("td").at(0).hasClass(`${prefixCalendar}-disabled-cell`)).toEqual(true);
  })
  it('disabledDate be string, <test prop:: disabledDate>', () => {
    const wrapper = mount(<Calendar />);
    const yesterday = Moment().subtract(1, 'day').format('YYYY-MM-DD')
    expect(wrapper.find(`[title="${yesterday}"]`).hasClass(`${prefixCalendar}-disabled-cell`)).toEqual(false)
    wrapper.setProps({ disabledDate: 'beforeCurrentDate' })
    expect(wrapper.find(`[title="${yesterday}"]`).hasClass(`${prefixCalendar}-disabled-cell`)).toEqual(true)
  })
  it('headerComponent, <test prop:: headerComponent>', () => {
    let wrapper = mount(<Calendar />)
    expect(wrapper.find(`.${prefixCalendar}-full-header`).exists(`.${prefixCalendar}-full-header-switcher`)).toEqual(true)
    expect(wrapper.find(`.${prefixCalendar}-full-header`).exists(`.${prefixCalendar}-full-header-month-select`)).toEqual(true)
    expect(wrapper.find(`.${prefixCalendar}-full-header`).exists(`.${prefixCalendar}-full-header-year-select`)).toEqual(true)
    wrapper.unmount()
    // 钉耙内部预制的头部
    wrapper = mount(<Calendar headerComponent={Calendar.SwitchYearHeader}/>)
    expect(wrapper.find(`.${prefixCalendar}-switch-header`).exists(`.${prefixCalendar}-switch-prev-year-btn`)).toEqual(true)
    expect(wrapper.find(`.${prefixCalendar}-switch-header`).exists(`.${prefixCalendar}-switch-prev-month-btn`)).toEqual(true)
    expect(wrapper.find(`.${prefixCalendar}-switch-header`).exists(`.${prefixCalendar}-switch-month-select`)).toEqual(true)
    expect(wrapper.find(`.${prefixCalendar}-switch-header`).exists(`.${prefixCalendar}-switch-year-select`)).toEqual(true)
    expect(wrapper.find(`.${prefixCalendar}-switch-header`).exists(`.${prefixCalendar}-switch-next-year-btn`)).toEqual(true)
    expect(wrapper.find(`.${prefixCalendar}-switch-header`).exists(`.${prefixCalendar}-switch-next-month-btn`)).toEqual(true)
    wrapper.unmount()

    // 自定义头部
    wrapper = mount(<Calendar headerComponent={() => { return <div className='headerComponent'>headerComponent</div> }}/>)
    expect(wrapper.find(`.${prefixCalendar} .headerComponent`).text()).toEqual('headerComponent')
    wrapper.unmount()
    wrapper = mount(<Calendar headerComponent={() => { return <div className='headerComponent'>headerComponent</div> }} 
                              headerRender={() => { return <div className='headerRender'>headerRender</div> }}/>)
    expect(wrapper.exists('.headerComponent')).toEqual(false)
    expect(wrapper.find(`.${prefixCalendar} .headerRender`).text()).toEqual('headerRender')
  })
  it('getDateCellAttr, <test prop:: getDateCellAttr>', () => {
    let time = Moment().startOf('week')
    let weekArr = []
    for (let i = 0; i < 7; i++) {
      let tempTime = Moment(time).weekday(i)
      let tr = Moment(tempTime).format('YYYY-MM-DD')
      weekArr.push(tr)
    }
    const getAllWeekDate = () => { return weekArr }
    const getDateCellAttr = (current, value) => {
      if (getAllWeekDate(value).some(v => v === current.format('YYYY-MM-DD'))) {
          return { className: 'same-week', }
      } return { }
    }

    let wrapper = mount(<Calendar getDateCellAttr={getDateCellAttr}/>)
    for(let j = 0; j < 7; j++) {
      expect(wrapper.find(`[title='${weekArr[j]}']`).hasClass('same-week')).toEqual(true)
    }
  });        
  Object.entries({'0': 'Sun', '1': 'Mon', '2': 'Tue', '3': 'Wed', '4': 'Thu', '5': 'Fri', '6': 'Sat'}).forEach(item => {
    it('weekStartsOn test, <test prop:: weekStartsOn>', () => {
      let wrapper = mount(<Calendar fullscreen={false} weekStartsOn={Number(item[0])} value={Moment('2017-01-25')}/>);
      expect(wrapper.find('thead').find(`.${prefixCalendar}-column-header-inner`).at(0).text()).toEqual(item[1]);
      item[0] !== '0' && expect(wrapper.find(`.wui-calendar-cell`).at(6 - Number(item[0])).prop('title')).toEqual('2016-12-31');
      item[0] === '0' && expect(wrapper.find(`.wui-calendar-cell`).at(6 - Number(item[0])).prop('title')).toEqual('2017-01-07');
    });
  });
  it('allowLunar, <test prop:: allowLunar>', () => {
    let wrapper = mount(<Calendar allowLunar type={'date'} value={Moment('2017-01-25')}/>);
    // expect(wrapper.find(`.${prefixCalendar}-selected-day`)).toMatchSnapshot();
    expect(wrapper.find(`.${prefixCalendar}-selected-day`).text()).toEqual('25廿八');
    wrapper.setProps({ value: Moment('2017-01-01') });
    wrapper.update();
    expect(wrapper.find(`.${prefixCalendar}-selected-day`).text()).toEqual('1元旦');
    wrapper.setProps({ value: Moment('2017-02-26') });
    wrapper.update();
    expect(wrapper.find(`.${prefixCalendar}-selected-day`).text()).toEqual('26初一');
  });
});
describe('value, <test prop:: value>', () => {
  it('should be able to set undefined or null', () => {
    const wrapper = mount(<Calendar />);
    expect(() => {
        wrapper.setProps({ value: null });
      }).not.toThrow();
      expect(() => {
        wrapper.setProps({ value: undefined });
      }).not.toThrow();
  });
  it('should be success', () => {
    const wrapper = mount(<Calendar />);
    wrapper.setProps({ value: Moment('2017-01-25')});
    expect(Moment(wrapper.find(`.${prefixCalendar}-selected-day`).prop("title")).format("YYYY-MM-DD")).toEqual('2017-01-25');
  });
});


// mutiple
describe('mutiple', () => {
  ['left', 'right'].forEach(item => {
    attrsTest({
      title: 'component: Calendar, <test prop:: layout>',
      Component: Calendar,
      attrs: {
        fullscreen: true,
        mutiple: true,
        layout: item
      },
      selector: `.${prefixCalendar}-root`,
      classnames: [`${prefixCalendar}-root-${item}`],
    })
  })
  attrsTest({
    title: 'component: Calendar, <test prop:: sidebar>',
    Component: Calendar,
    attrs: {
      mutiple: true,
      sidebar: false
    },
    selector: `.${prefixCalendar}-root`,
    classnames: [`${prefixCalendar}-root-nosidebar`],
  })

  it('mutiple, <test prop:: mutiple>', () => {
    const calendar = mount(<Calendar type='date' />);
    expect(calendar.exists(`.${prefixCalendar}-mutiple-selected-day`)).toEqual(false);
    calendar.setProps({ mutiple: true });
    expect(calendar.exists(`.${prefixCalendar}-mutiple-selected-day`)).toEqual(true);
  })
  attrsTest({
    title: 'component: Calendar, <test prop:: fullscreen>',
    Component: Calendar,
    attrs: {
      fullscreen: true,
      mutiple: true
    },
    selector: `.${prefixCalendar}`,
    classnames: [`${prefixCalendar}-fullscreen`],
  })
  attrsTest({
    title: 'component: Calendar, <test prop:: markWeekend>',
    Component: Calendar,
    attrs: {
      markWeekend: true,
      fullscreen: true,
      mutiple: true
    },
    selector: `.${prefixCalendar}-cell`,
    classnames: [`${prefixCalendar}-day-mark`],
  }) 
  attrsTest({
    title: 'component: Calendar, <test prop:: fillSpace>',
    Component: Calendar,
    attrs: {
      fillSpace: true,
      mutiple: true,
      type: 'date'
    },
    selector: `.${prefixCalendar}-root tbody`,
    classnames: [`${prefixCalendar}-fill-space-init`],
  }) 
  it('mutiple, <test prop:: dateCellRender>, <test prop:: dateCellContentRender>, <test prop:: dateFullCellRender>, <test prop:: monthCellRender>, <test prop:: monthCellContentRender>, <test prop:: monthFullCellRender>', () => {
    let wrapper = mount(<Calendar mutiple prefixCls={`${prefixCalendar}`} 
                          type='date' fullscreen dateCellRender={() => {return <div>date</div>}}/>)
    expect(wrapper.find(`.${prefixCalendar}-tbody`).find('tr td').at(0).find('div').text()).toEqual('date')
    wrapper.unmount()
    wrapper = mount(<Calendar mutiple prefixCls={`${prefixCalendar}`} 
                          type='date' fullscreen dateCellContentRender={() => {return <div>date</div>}}/>)
    expect(wrapper.find(`.${prefixCalendar}-tbody`).find('tr td').at(0).find(`.${prefixCalendar}-cell-body div`).text()).toEqual('date')
    wrapper.unmount()
  
    wrapper = mount(<Calendar mutiple prefixCls={`${prefixCalendar}`} 
                          type='date' fullscreen dateFullCellRender={() => {return <div>date</div>}}/>)
    expect(wrapper.find(`.${prefixCalendar}-tbody`).find('tr td').at(0).find(`.${prefixCalendar}-cell-body div`).text()).toEqual('date')
    wrapper.unmount()

    wrapper = mount(<Calendar mutiple prefixCls={`${prefixCalendar}`} 
                          type='month' fullscreen monthCellRender={() => {return <div>month</div>}}/>)
    expect(wrapper.find('tr td').at(0).find('div').text()).toEqual('month')
    wrapper.unmount()

    wrapper = mount(<Calendar mutiple prefixCls={`${prefixCalendar}`} 
                          type='month' fullscreen monthCellContentRender={() => {return <div>month</div>}}/>)
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-month-panel-month`).find('div').text()).toEqual('month')
    wrapper.unmount()

    wrapper = mount(<Calendar mutiple prefixCls={`${prefixCalendar}`} 
                          type='month' fullscreen monthFullCellRender={() => {return <div>month</div>}}/>)
    expect(wrapper.find('tr td').at(0).find(`.${prefixCalendar}-month-panel-month`).find('div').text()).toEqual('month')
  })
  Object.entries({'en-us': 'Sun', 'zh-cn': '周日', 'zh-tw': '週日', 'vi-vn': 'CN'}).forEach((item) => {
    it('locale, <test prop:: locale>', () => {
      let wrapper = mount(<Calendar mutiple prefixCls={'wui-calendar'} type='date' 
                            fullscreen dateCellContentRender={() => {return <div>month</div>}}/>)
      expect(wrapper.find(`.${prefixCalendar}-table`).find('tr th').at(1).find(`.${prefixCalendar}-column-header-inner`).text()).toEqual('Sun')
      wrapper.setProps({ locale: item[0] })
      expect(wrapper.find(`.${prefixCalendar}-table`).find('tr th').at(1).find(`.${prefixCalendar}-column-header-inner`).text()).toEqual(item[1])
    })
  })
  it('onchange, <test prop:: onChange>', () => {
    const onchange = jest.fn()
    let wrapper = mount(<Calendar type='date' mutiple onChange={onchange}/>)
    let today = Moment().format('YYYY-MM-DD')
    wrapper.find(`[title='${today}']`).find(`.${prefixCalendar}-date`).simulate('click');
    expect(Moment(onchange.mock.calls[0][0]).format('YYYY-MM-DD')).toEqual(Moment().format('YYYY-MM-DD'))
    wrapper.find(`[title='${today}']`).find(`.${prefixCalendar}-date`).simulate('click');
    expect(Moment(onchange.mock.calls[1][0]).format('YYYY-MM-DD')).toEqual(Moment().format('YYYY-MM-DD'))
  })
  // it('onSelect, <test prop:: onSelect>', () => {
  //   const onselect = jest.fn()
  //   let wrapper = mount(
  //     <Calendar fullscreen mutiple onSelect={onselect} type='date' 
  //           dateCellHeaderReader={(_current, _values, headerChilds) => {return headerChilds}}
  //           defaultScrollIntoValue={Moment('2022-12-25')} 
  //   />)
  //   expect(wrapper.find(`.${prefixCalendar}-active-sider-month`).at(0).text()).toEqual('Dec')
  //   expect(onselect).toHaveBeenCalledTimes(0)
  //   wrapper.find('ul').find('li').at(0).simulate('click')
  //   expect(wrapper.find(`.${prefixCalendar}-active-sider-month`).at(0).text()).toEqual('Jan')
  //   expect(onselect).toHaveBeenCalledTimes(1)

  //   wrapper.find(`.${prefix}-select-selector`).simulate('click');
  //   wrapper.find(`.${prefix}-select-item-option`).at(0).simulate('click');
  //   expect(onselect).toHaveBeenCalledTimes(2);
  //   expect(Moment(onselect.mock.calls[1][0]).format('YYYY-MM-DD')).toEqual('2012-01-25');
  // })
  it('onYearChange, <test prop:: onYearChange>', () => {
    const mockFn = jest.fn()
    let wrapper = mount(
      <Calendar fullscreen mutiple onYearChange={mockFn} type='date' 
            dateCellHeaderReader={(_current, _values, headerChilds) => {return headerChilds}}
            defaultScrollIntoValue={Moment('2022-12-25')} 
    />)
    // expect(wrapper.find(`.${prefixCalendar}-full-show-date`).text()).toEqual("2022 Year 12 Month")
    // expect(mockFn).toHaveBeenCalledTimes(0)

    // wrapper.find(`.${prefix}-select-selector`).simulate('click');
    // wrapper.find(`.${prefix}-select-item-option`).at(0).simulate('click');
    // expect(mockFn).toHaveBeenCalledTimes(1);
    // expect(wrapper.find(`.${prefixCalendar}-full-show-date`).text()).toEqual("2012 Year 12 Month");
  })
  it('onTypeChange test', async () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Calendar mutiple type='date' onTypeChange={mockFn} fullscreen operations={['lastDay', 'lastMonth', 'nextDay', 'nextMonth', 'today', 'headerSwitcher']}/>);
    expect(mockFn).toBeCalledTimes(0);
    wrapper.find(`.${prefixCalendar}-full-header-switcher-normal`).simulate('click');
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn.mock.calls[0][0]).toEqual('week');
    wrapper.find(`.${prefixCalendar}-full-header-switcher-normal`).simulate('click');
    await sleep(200);
    expect(mockFn).toBeCalledTimes(2);
    expect(mockFn.mock.calls[1][0]).toEqual('date');
    wrapper.unmount();
  });
  it('onPanelChange test', async () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Calendar mutiple type='date' onPanelChange={mockFn} fullscreen operations={['lastDay', 'lastMonth', 'nextDay', 'nextMonth', 'today', 'headerSwitcher']}/>);
    expect(mockFn).toBeCalledTimes(0);
    wrapper.find(`.${prefixCalendar}-full-header-switcher-normal`).simulate('click');
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn.mock.calls[0][0]).toEqual('week');
    wrapper.find(`.${prefixCalendar}-full-header-switcher-normal`).simulate('click');
    await sleep(200);
    expect(mockFn).toBeCalledTimes(2);
    expect(mockFn.mock.calls[1][0]).toEqual('date');
    wrapper.unmount();
  })
  it('dateCellHeaderReader, <test prop:: dateCellHeaderReader>', () => {
    let selectValues = new Map(),
      initAlreadyChanged= new Map([])
    const dateCellHeaderReader = (current, value, headerChilds) => {
      let text = '';
      if (current.weekday() === 5 || current.weekday() === 6) {
          text = '休'
      }
      headerChilds.shift();
      text = selectValues.get(current.format('YYYY-MM-DD')) || text;
      text = initAlreadyChanged.get(current.format('YYYY-MM-DD')) || text;
      text && headerChilds.push(<span style={{marginLeft: '5px'}}>{text}</span>)
      return headerChilds
    }

    let wrapper = mount(<Calendar fullscreen mutiple type={'date'} value={[...selectValues.keys()].map(key => Moment(key))}
                                  locale='zh-cn' />)
    expect(wrapper.exists(`.${prefixCalendar}-cell-header`)).toEqual(false)
    wrapper.setProps({ dateCellHeaderReader: dateCellHeaderReader })
    expect(wrapper.exists(`.${prefixCalendar}-cell-header`)).toEqual(true)
    expect(wrapper.find('tbody').find('tr td').find('span').at(0).hasClass(`${prefixCalendar}-cell-header-date`)).toEqual(true)
    expect(wrapper.find('tbody').find('tr td').find('span').last().text()).toEqual('休')

    // todo
    wrapper.find(`.${prefixCalendar}-tbody`).simulate('scroll')
  })
  it('onQuickSelect, <test prop:: onQuickSelect>, <test prop:: quickSelect>', () => {
    const mockevent=jest.fn()
    let tempTime = Moment(Moment().startOf('week')).weekday(0)
    const calendar = mount(<Calendar type='date' scrollIntoValue={Moment('2023-01-01')} quickSelect onQuickSelect={mockevent} mutiple/>);
    calendar.find(`.${prefixCalendar}-column-header-inner-select`).at(0).simulate('click')
    // expect(mockevent.mock.calls[0][0]).toEqual({changeValues: calendar.instance().getColumnHightlightDates(0), isChecked: true, value: calendar.state().selectValuesMap, direction: 'vertical' })
    expect(mockevent.mock.calls[0][0].isChecked).toEqual(true)
    expect(mockevent.mock.calls[0][0].direction).toEqual('vertical')
    expect(mockevent.mock.calls[0][0].changeValues.length).toEqual(53)
    // calendar.find(`.${prefixCalendar}-current-week`).find(`.${prefixCalendar}-row-select`).at(0).simulate('click');
    calendar.find(`.${prefixCalendar}-tbody tr`).at(0).find(`.${prefixCalendar}-row-select`).at(0).simulate('click');

    expect(mockevent.mock.calls[1][0].changeValues).toEqual(['2023-01-01', '2023-01-02','2023-01-03', '2023-01-04','2023-01-05', '2023-01-06','2023-01-07',])
    expect(mockevent.mock.calls[1][0].isChecked).toEqual(true)
    expect(mockevent.mock.calls[1][0].direction).toEqual('horizontal')

    expect(mockevent.mock.calls[1][0].changeValues.length).toEqual(7)
    // expect(mockevent.mock.calls[1][0]).toEqual({changeValues: calendar.instance().getRowHightlightDates(tempTime), isChecked: true, value: calendar.state().selectValuesMap, direction: 'horizontal' })
  })
  it('QuickSelect can be number when vertical selected, <test prop:: quickSelect>', () => {
    const mockevent=jest.fn()
    let tempTime = Moment(Moment().startOf('week')).weekday(0)
    const calendar = mount(<Calendar type='date' scrollIntoValue={Moment('2023-01-01')} quickSelect={2} onQuickSelect={mockevent} mutiple/>);
    calendar.find(`.${prefixCalendar}-column-header-inner-select`).at(0).simulate('click')
    expect(mockevent.mock.calls[0][0].changeValues).toEqual(['2023-01-01', '2023-01-08'])
    expect(mockevent.mock.calls[0][0].isChecked).toEqual(true)
    expect(mockevent.mock.calls[0][0].direction).toEqual('vertical')
    expect(mockevent.mock.calls[0][0].changeValues.length).toEqual(2)
    calendar.find(`.${prefixCalendar}-tbody tr`).at(0).find(`.${prefixCalendar}-row-select`).at(0).simulate('click');

    expect(mockevent.mock.calls[1][0].changeValues).toEqual(['2023-01-01', '2023-01-02','2023-01-03', '2023-01-04','2023-01-05', '2023-01-06','2023-01-07',])
    expect(mockevent.mock.calls[1][0].isChecked).toEqual(true)
    expect(mockevent.mock.calls[1][0].direction).toEqual('horizontal')

    expect(mockevent.mock.calls[1][0].changeValues.length).toEqual(7)
  })
  it('onQuickSelect high-light', () => {
    const mockevent=jest.fn()
    const calendar = mount(<Calendar type='date' locale="zh-cn" scrollIntoValue={Moment('2023-03-01')} quickSelect onQuickSelect={mockevent} mutiple/>)
    expect(calendar.exists(`.${prefixCalendar}-high-light`)).toEqual(false)
    calendar.find(`.${prefixCalendar}-column-select-header`).at(0).simulate('mouseEnter')
    const dateArr = ['2023-02-26','2023-03-05','2023-03-12','2023-03-19','2023-03-26'];
    for( let i = 0; i < dateArr.length; i++) {
      let dateFormat = Moment(dateArr[i]).format('YYYY-MM-DD')
      expect(calendar.find(`[title='${dateFormat}']`).hasClass(`${prefixCalendar}-high-light`)).toEqual(true)
    }

    calendar.find(`.${prefixCalendar}-tbody tr`).at(9).find('td').at(0).simulate('mouseEnter')
    // let tempTime = Moment(Moment().startOf('week')).weekday(0)
    const dateRowArr = ['2023-03-06','2023-03-05','2023-03-07','2023-03-09','2023-03-08'];
    for( let j = 0; j < dateRowArr.length; j++) {
      let dateRowFormat = Moment(dateRowArr[j]).format('YYYY-MM-DD')
      expect(calendar.find(`[title='${dateRowFormat}']`).hasClass(`${prefixCalendar}-high-light`)).toEqual(true)
    }
  })
  it('scrollIntoValue, <test prop:: scrollIntoValue>', () => {
    const mockevent = jest.fn()
    let wrap = mount(<Calendar mutiple type='date' fullscreen quickSelect onQuickSelect={mockevent}/>)
    wrap.setProps({ scrollIntoValue: Moment('2030-04-09')})
    let wrapper = wrap;
    wrapper.find(`.${prefixCalendar}-column-header-inner-select`).at(1).simulate('click')
    expect(mockevent.mock.calls[0][0].changeValues[0]).toEqual("2030-04-01")
  })
  it('defaultScrollIntoValue, <test prop:: defaultScrollIntoValue>', () => {
    const mockevent = jest.fn()
    let wrapper = mount(<Calendar defaultScrollIntoValue={Moment('2025-05-09')} mutiple type='date' fullscreen quickSelect onQuickSelect={mockevent}/>);
    wrapper.find(`.${prefixCalendar}-column-header-inner-select`).at(4).simulate('click')
    expect(mockevent.mock.calls[0][0].changeValues[0]).toEqual("2025-05-01")
  })
  it('scrollIntoValue && defaultScrollIntoValue', () => {
    const mockevent = jest.fn()
    let wrapper = mount(<Calendar scrollIntoValue={Moment('2030-04-09')} defaultScrollIntoValue={Moment('2025-05-09')} mutiple type='date' fullscreen quickSelect onQuickSelect={mockevent}/>);
    wrapper.find(`.${prefixCalendar}-column-header-inner-select`).at(1).simulate('click')
    expect(mockevent.mock.calls[0][0].changeValues[0]).toEqual("2030-04-01")
  })
})
// QDJCJS-9862日历日视图开发 type='hour'
describe('when type is hour', () => {
  attrsTest({
    title: 'component: Calendar, <test prop:: type>',
    Component: Calendar,
    attrs: {
      mutiple: true,
      type: 'hour'
    },
    selector: `.${prefixCalendar}-root`,
    classnames: [`${prefixCalendar}-root-hour`],
  });
  attrsTest({
    title: 'component: Calendar, <test prop:: operations>',
    Component: Calendar,
    attrs: {
      mutiple: true,
      type: 'date',
      operations: ['lastMonth', 'nextMonth', 'today'],

    },
    selector: `.${prefixCalendar}-full-header`,
    classnames: [`${prefixCalendar}-full-operations`],
  });
  it('type test, <test prop:: type>, <test prop:: showTimeLine>', () => {
    const wrapper = mount(<Calendar mutiple type='hour' />);
    expect(wrapper.find(`.${prefixCalendar}-sider`).find(`.${prefix}-list-items`).find(`.${prefix}-list-item`)).toHaveLength(96);
    expect(wrapper.find(`.${prefixCalendar}-sider`).find(`.${prefix}-list-items`).find(`.${prefixCalendar}-time-item-span`)).toHaveLength(24);
    expect(wrapper.find(`.${prefixCalendar}-sider`).find(`.${prefixCalendar}-time-item-span`).at(0).text()).toEqual("");
    expect(wrapper.find(`.${prefixCalendar}-full-body`).exists(`.${prefixCalendar}-curr-line`)).toEqual(true);
    expect(wrapper.find(`.${prefixCalendar}-full-body`).exists(`.${prefixCalendar}-curr-circle`)).toEqual(true);
    expect(wrapper.find(`.${prefixCalendar}-full-body`).exists(`.${prefixCalendar}-curr-time`)).toEqual(true);

    wrapper.setProps({ showTimeLine: false });
    expect(wrapper.find(`.${prefixCalendar}-full-body`).exists(`.${prefixCalendar}-curr-line`)).toEqual(false);
    expect(wrapper.find(`.${prefixCalendar}-full-body`).exists(`.${prefixCalendar}-curr-circle`)).toEqual(false);
    expect(wrapper.find(`.${prefixCalendar}-full-body`).exists(`.${prefixCalendar}-curr-time`)).toEqual(false);
  });
  it('timeEvents, fieldid test, <test prop:: timeEvents>, <test prop:: fieldid>, <test prop:: onTimeEventsClick>', () => {
    const timeEvents = [
      {
        start: '2022-10-09 04:00',
        end: 1666778784363,
        content: '重型机械维修a',
      },
      {
        start: '2022-10-09 05:00',
        end: '3022-10-13 15:00',
        content: '重型机械维修b',
      },
      {
        start: '2022-10-09 05:00',
        end: '3033-10-13 15:00',
        content: '重型机械维修c',
      }];
    const onTimeEventsClick = jest.fn();
    let wrapper = mount(<Calendar defaultScrollIntoValue={Moment('2025-05-09')} mutiple type='hour' fullscreen
                            timeEvents={timeEvents} onTimeEventsClick={onTimeEventsClick} fieldid='fieldid-id'/>);
    expect(wrapper.find(`.${prefixCalendar}-allDay-container`).find('li')).toHaveLength(2);
    expect(wrapper.find(`.${prefixCalendar}-allDay-container`).prop('fieldid')).toEqual("fieldid-id_allDay_container");
    expect(wrapper.find(`.${prefixCalendar}-allDay-container`).find('li').at(0).prop('fieldid')).toEqual("fieldid-id_allDayEvents_0");
    expect(wrapper.find(`.${prefixCalendar}-allDay-container`).find('li').at(1).prop('fieldid')).toEqual("fieldid-id_allDayEvents_1");
    wrapper.find(`.${prefixCalendar}-allDay-container`).find('li').at(0).simulate('click');
    expect(onTimeEventsClick.mock.calls[0][1]).toEqual({"content": "重型机械维修b", "end": "3022-10-13 15:00", "start": "2022-10-09 05:00"})
  });
  // 新增属性hourCellRender、hourCellContentRender
  it('<test prop:: hourCellRender>, <test prop:: hourCellContentRender>', () => {
    let wrapper = mount(<Calendar mutiple type='hour' showTimeLine={false}/>)
    expect(wrapper.find(`.${prefixCalendar}-sider`).find('li').at(4).find('span').hasClass(`${prefixCalendar}-time-item-span`)).toEqual(true);
    expect(wrapper.find(`.${prefixCalendar}-sider`).find('li').at(4).find('span').text()).toEqual('01:00');

    wrapper.setProps({ hourCellContentRender: () => <div className='test'>test</div> });
    expect(wrapper.find(`.${prefixCalendar}-sider`).find('li').at(4).find('span').hasClass(`${prefixCalendar}-time-item-span`)).toEqual(true);
    expect(wrapper.find(`.${prefixCalendar}-sider`).find('li').at(4).find('span').find('div').hasClass('test')).toEqual(true);
    expect(wrapper.find(`.${prefixCalendar}-sider`).find('li').at(4).find('span').find('div').text()).toEqual('test');

    wrapper.setProps({ hourCellRender: () => <div className='test'>test</div> });
    expect(wrapper.find(`.${prefixCalendar}-sider`).find('li').at(4).exists(`.${prefixCalendar}-time-item-span`)).toEqual(false);
    expect(wrapper.find(`.${prefixCalendar}-sider`).find('li').at(4).find('div').hasClass('test')).toEqual(true);
    expect(wrapper.find(`.${prefixCalendar}-sider`).find('li').at(4).find('div').text()).toEqual('test');
  });
  // Object.entries({'0': 'Sun', '1': 'Mon', '2': 'Tue', '3': 'Wed', '4': 'Thu', '5': 'Fri', '6': 'Sat'}).forEach(item => {
  //   it('weekStartsOn test, <test prop:: weekStartsOn>', () => {
  //     let wrapper = mount(<Calendar mutiple fullscreen type='date' dateCellHeaderReader={(_current, _values, headerChilds) => {return headerChilds}}
  //             defaultScrollIntoValue={Moment('2022-12-25')} weekStartsOn={item[0]}/>)
  //     expect(wrapper.find('thead').find(`.${prefixCalendar}-column-header-inner`).at(0).text()).toEqual(item[1]);
  //   });
  // });

  it('weekStartsOn test, <test prop:: weekStartsOn>', () => {
    let wrapper = mount(<Calendar mutiple fullscreen type='date' dateCellHeaderReader={(_current, _values, headerChilds) => {return headerChilds}}
            defaultScrollIntoValue={Moment('2022-12-25')} weekStartsOn={3}/>)
    expect(wrapper.find('thead').find(`.${prefixCalendar}-column-header-inner`).at(0).text()).toEqual('Wed');
  });
})
describe('header select', () => {
  it('<test prop:: headerSelect date>', async () => {
    let wrapper = mount(<Calendar fullscreen mutiple type='date' operations={['lastMonth']} locale='zh-cn' />)
    await sleep(600)
    expect(wrapper.exists(`.${prefixCalendar}-full-header-select`)).toEqual(false)
    wrapper.find(`.${prefixCalendar}-full-header-select-box div:first-child`).simulate('click') // 点击顶部导航栏
    await sleep(1000)
    expect(wrapper.exists(`.${prefixCalendar}-full-header-select`)).toEqual(true)
    wrapper.find(`.${prefixCalendar}-full-header-select-year`).find('li').at(212).simulate('click')
    wrapper.find(`.${prefixCalendar}-full-header-select-month`).find('li').at(2).simulate('click')
  })
  it('<test prop:: headerSelect hour>', async () => {
    let wrapper = mount(<Calendar fullscreen mutiple type='hour' operations={['lastDay']} locale='zh-cn' />)
    await sleep(600)
    expect(wrapper.exists(`.${prefixCalendar}-full-header-select`)).toEqual(false)
    wrapper.find(`.${prefixCalendar}-full-header-select-box div:first-child`).simulate('click') // 点击顶部导航栏
    await sleep(1000)
    expect(wrapper.exists(`.${prefixCalendar}-full-header-select`)).toEqual(true)
    wrapper.find(`.${prefixCalendar}-full-header-select-year`).find('li').at(212).simulate('click')
    wrapper.find(`.${prefixCalendar}-full-header-select-month`).find('li').at(2).simulate('click')
    wrapper.find(`.${prefixCalendar}-full-header-select-date`).find('li').at(10).simulate('click')
  })
})
describe('props isDragEvent', () => {
  it('<test prop:: isDragEvent>', async () => {
    let wrapper = mount(<Calendar fullscreen mutiple type='date' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} />)
    await sleep(600)
    document.querySelector("[title='2025-07-07']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
  })
  it('<test prop:: strideValue>', async () => {
    let strideValue = [
      { startTitleValue: '2025-05-07', titleValue: '2025-05-10', dataFlag: 'calendar5', tex: '日程自定义' },
      { startTitleValue: '2025-05-05', titleValue: '2025-05-08', dataFlag: 'calendar3', tex: '日程自定义' },
      { startTitleValue: '2025-05-11', titleValue: '2025-05-09', dataFlag: 'calendar4', tex: '日程自定义' }
    ]
    let wrapper = mount(<Calendar fullscreen mutiple type='date' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} strideValue={strideValue} />)
    await sleep(600)
    document.querySelector("[title='2025-07-07']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
    await sleep(100)
    // document.querySelector(`.wui-button-secondary`).simulate('click')
    // wrapper.find(`.wui-button-secondary`).at(0).simulate('click')
    wrapper.find(`.wui-modal-mask`).at(0).simulate('click')
  })
  it('<test prop:: strideValue close>', async () => {
    let strideValue = [
      { startTitleValue: '2025-05-07', titleValue: '2025-05-10', dataFlag: 'calendar5', tex: '日程自定义' },
      { startTitleValue: '2025-05-05', titleValue: '2025-05-08', dataFlag: 'calendar3', tex: '日程自定义' },
      { startTitleValue: '2025-05-11', titleValue: '2025-05-09', dataFlag: 'calendar4', tex: '日程自定义' }
    ]
    let wrapper = mount(<Calendar fullscreen mutiple type='date' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} strideValue={strideValue} />)
    await sleep(600)
    document.querySelector("[title='2025-07-07']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
    await sleep(100)
    // document.querySelector(`.wui-button-secondary`).simulate('click')
    // wrapper.find(`.wui-button-secondary`).at(0).simulate('click')
    wrapper.find(`.wui-modal-header .close`).at(0).simulate('click')
  })
  it('<test prop:: creat two event>', async () => {
    let strideValue = [
      { startTitleValue: '2025-05-07', titleValue: '2025-05-10', dataFlag: 'calendar5', tex: '日程自定义' },
      { startTitleValue: '2025-05-07', titleValue: '2025-05-08', dataFlag: 'calendar3', tex: '日程自定义' },
      { startTitleValue: '2025-05-07', titleValue: '2025-05-09', dataFlag: 'calendar4', tex: '日程自定义' },
      { startTitleValue: '2025-05-07', titleValue: '2025-05-11', dataFlag: 'calendar6', tex: '日程自定义' }
    ]
    let wrapper = mount(<Calendar fullscreen mutiple type='date' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} strideValue={strideValue} />)
    await sleep(600)
    document.querySelector("[title='2025-07-07']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
    await sleep(100)
    // document.querySelector(`.wui-button-secondary`).simulate('click')
    wrapper.find(`.wui-button-primary`).at(0).simulate('click')
    await sleep(600)
    document.querySelector("[title='2025-05-05']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 300 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
    await sleep(100)
    wrapper.find(`.wui-button-primary`).at(0).simulate('click')
    await sleep(600)
    document.querySelector("[title='2025-05-05']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 300 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
    await sleep(100)
    wrapper.find(`.wui-button-primary`).at(0).simulate('click')
    wrapper.find("[moredom='is']").at(0).simulate('click')
    wrapper.find("[data-add='calendar6']").at(0).simulate('click')
  })
  it('<test prop:: type month strideValue>', async () => {
    let strideValue = [
      {startTitleValue: '2025-05', titleValue: '2025-10', dataFlag: 'calendar5', tex: '日程自定义'},
      {startTitleValue: '2025-05', titleValue: '2025-06', dataFlag: 'calendar3', tex: '日程自定义'},
      {startTitleValue: '2025-03', titleValue: '2025-07', dataFlag: 'calendar4', tex: '日程自定义'}
    ]
    let wrapper = mount(<Calendar fullscreen mutiple type='month' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} strideValue={strideValue} />)
    await sleep(600)
    document.querySelector("[datatitle='2025-07']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
    await sleep(100)
    // document.querySelector(`.wui-button-secondary`).simulate('click')
    wrapper.find(`.wui-button-secondary`).at(0).simulate('click')
    wrapper.find("[moredom='is']").at(0).simulate('click')
    wrapper.find("[data-add='calendar4']").at(0).simulate('click')
  })
  it('<test prop:: delete strideValue>', async () => {
    let strideValue = [
      { startTitleValue: '2025-05-07', titleValue: '2025-05-10', dataFlag: 'calendar5', tex: '日程自定义' },
      { startTitleValue: '2025-05-05', titleValue: '2025-05-08', dataFlag: 'calendar3', tex: '日程自定义' },
      { startTitleValue: '2025-05-11', titleValue: '2025-05-09', dataFlag: 'calendar4', tex: '日程自定义' }
    ]
    let wrapper = mount(<Calendar fullscreen mutiple type='date' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} strideValue={strideValue} />)
    await sleep(600)
    document.querySelector("[title='2025-05-05']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
    await sleep(100)
    // document.querySelector(`.wui-button-secondary`).simulate('click')
    wrapper.find(`.wui-modal-footer .wui-button-secondary`).at(0).simulate('click')
    await sleep(600)
    document.querySelector("[title='2025-07-07']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
    await sleep(100)
    // document.querySelector(`.wui-button-secondary`).simulate('click')
    wrapper.find(`.wui-modal-footer .wui-button-primary`).at(0).simulate('click')
    await sleep(600)
    document.querySelector("[title='2025-07-07']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    await sleep(100)
    document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mouseup'))
    await sleep(100)
    // document.querySelector(`.wui-button-secondary`).simulate('click')
    wrapper.find(`.wui-modal-footer .wui-button-secondary`).at(0).simulate('click')
  })
})
describe('create hour event', () => {
  it('<test prop:: hour isDragEvent>', async () => {
      const timeEvents = [
          {
              start: '2022-10-09 12:52',
              end: '2022-10-09 15:00',
              content: '1重型机械维修',
          },
      ];
      const wrapper = mount(<Calendar type='hour' fullscreen mutiple
                                  timeEvents={timeEvents} showTimeLine isDragEvent={true} />);
      // await sleep(1000)
      document.querySelector("[data-time='05:00']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mousemove', { clientY: -200 }))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mouseup'))
      document.querySelector("[data-time='05:15']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mousemove', { clientY: -210 }))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mouseup'))
      // wrapper.find(`.wui-modal-footer .wui-button-secondary`).at(0).simulate('click')
      document.querySelector("[data-time='08:00']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mousemove', { clientY: 200 }))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mouseup'))
      document.querySelector("[data-time='08:30']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mousemove', { clientY: 210 }))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mouseup'))
      document.querySelector("[data-time='12:30']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mousemove', { clientY: 220 }))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mouseup'))
      document.querySelector("[data-time='12:30']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mousemove', { clientY: 240 }))
      // await sleep(100)
      document.dispatchEvent(new MouseEvent('mouseup'))
  })
  it('<test prop:: hour isDragEvent customIntervalNum>', async () => {
    const timeEvents = [
        {
            start: '2022-10-09 12:52',
            end: '2022-10-09 15:00',
            content: '1重型机械维修',
        },
    ];
    const wrapper = mount(<Calendar type='hour' fullscreen mutiple
                                timeEvents={timeEvents} showTimeLine isDragEvent={true} customInterval={4} />);
    // await sleep(1000)
    document.querySelector("[data-time='05:00']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    // await sleep(100)
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: 60 }))
    // await sleep(100)
    document.dispatchEvent(new MouseEvent('mouseup'))
})
  it('<test prop:: type week>', async () => {
    const timeEvents = {
      '2024-06-17': [
          {
              start: '2024-06-17' + ' 22:30',
              end: '2024-06-17' + ' 23:00',
              content: '11轻型机械维修',
          },
          {
              start: '2024-06-17' + ' 22:30',
              end: '2024-06-17' + ' 23:00',
              content: '12轻型机械维修',
          },
          {
              start: '2024-06-17' + ' 22:30',
              end: '2024-06-17' + ' 23:00',
              content: '13轻型机械维修',
          }
      ],
      '2024-06-18': [
          {
              start: '2024-06-17 05:00',
              end: '3022-10-13 15:00',
              content: '重型机械维修b',
          },
          {
              start: '2024-06-18 06:00',
              end: '3022-10-13 15:00',
              content: '重型机械维修c',
          },
          {
              start: '2022-10-09 07:00',
              end: '3022-10-10 08:00',
              content: '重型机械维修d',
          },
          {
              start: '2022-10-08 07:00',
              end: '3022-10-11 08:00',
              content: '重型机械维修e',
          },
          {
              start: '2022-10-07 07:00',
              end: '3022-10-12 08:00',
              content: '重型机械维修f',
          }
      ],
      '2024-06-20': [
          {
              start: '2024-06-20' + ' 22:30',
              end: '2024-06-20' + ' 23:00',
              content: '11轻型机械维修',
          },
          {
              start: '2024-06-20' + ' 22:30',
              end: '2024-06-20' + ' 23:00',
              content: '12轻型机械维修',
          },
          {
              start: '2024-06-20' + ' 22:30',
              end: '2024-06-20' + ' 23:00',
              content: '13轻型机械维修',
          }
      ],
      '2024-06-24': [
          {
              start: '2024-06-24' + ' 21:00',
              end: '2024-06-24' + ' 22:00',
              content: '6轻型机械维修',
          },
          {
              start: '2024-06-24' + ' 17:00',
              end: '2024-06-24' + ' 18:00',
              content: '7轻型机械维修',
          }
      ]
  };
    const wrapper = mount(<Calendar type='week' fullscreen mutiple showTimeLine isDragEvent={true} weekTimeEvents={timeEvents} />);
    // await sleep(1000)
    // document.querySelector("[data-time='05:00']").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    // await sleep(50)
    // document.querySelector(`.wui-calendar-root`).dispatchEvent(new MouseEvent('mousemove', { clientY: -200 }))
    // await sleep(50)
    // document.querySelector(".wui-calendar-root").dispatchEvent(new MouseEvent('mouseup'))
    wrapper.find(`[data-time='05:00']`).at(0).simulate('click')
  })
  it('<test prop:: isEditEvent>', async () => {
    const today = Moment().format('YYYY-MM-DD')
    const timeEvents = [
      {
          start: today + ' 01:00',
          end: today + ' 15:00',
          content: '1重型机械维修',
          key: 't1'
      },
    ];
    let wrapper = mount(<Calendar fullscreen mutiple type='hour' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} timeEvents={timeEvents} isEditEvent={true} />)
    await sleep(1000)
    wrapper.find(".wui-calendar-day-events-item-resizer-bottom-line").at(0).simulate('mouseEnter')
    // document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mouseenter', {bubbles:true}))
    await sleep(600)
    document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    // await sleep(1000)
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: -200 }))
    // await sleep(100)
    document.dispatchEvent(new MouseEvent('mouseup'))
  })
  it('<test prop:: isEditEvent drag bottom > 15>', async () => {
    const today = Moment().format('YYYY-MM-DD')
    const timeEvents = [
      {
          start: today + ' 13:00',
          end: today + ' 15:00',
          content: '1重型机械维修',
          key: 't1'
      },
    ];
    let wrapper = mount(<Calendar fullscreen mutiple type='hour' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} timeEvents={timeEvents} isEditEvent={true} />)
    await sleep(1000)
    wrapper.find(".wui-calendar-day-events-item-resizer-bottom-line").at(0).simulate('mouseEnter')
    // document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mouseenter', {bubbles:true}))
    await sleep(600)
    document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    // await sleep(1000)
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: 110 }))
    // await sleep(100)
    document.dispatchEvent(new MouseEvent('mouseup'))
  })
  it('<test prop:: isEditEvent distance > 15>', async () => {
    const today = Moment().format('YYYY-MM-DD')
    const timeEvents = [
      {
          start: today + ' 01:00',
          end: today + ' 18:00',
          content: '1重型机械维修',
          key: 't1'
      },
    ];
    let wrapper = mount(<Calendar fullscreen mutiple type='hour' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} timeEvents={timeEvents} isEditEvent={true} />)
    await sleep(1000)
    wrapper.find(".wui-calendar-day-events-item-resizer-bottom-line").at(0).simulate('mouseEnter')
    // document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mouseenter', {bubbles:true}))
    await sleep(600)
    document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    await sleep(1000)
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: -100 }))
    await sleep(1000)
    document.dispatchEvent(new MouseEvent('mouseup'))
  })
  it('<test prop:: isEditEvent drag top>', async () => {
    const today = Moment().format('YYYY-MM-DD')
    const timeEvents = [
      {
          start: today + ' 13:00',
          end: today + ' 15:00',
          content: '1重型机械维修',
          key: 't1'
      },
    ];
    let wrapper = mount(<Calendar fullscreen mutiple type='hour' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} timeEvents={timeEvents} isEditEvent={true} />)
    await sleep(1000)
    wrapper.find(".wui-calendar-day-events-item-resizer-top-line").at(0).simulate('mouseEnter')
    // document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mouseenter', {bubbles:true}))
    await sleep(600)
    document.querySelector(".wui-calendar-day-events-item-resizer-top-line").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    // await sleep(1000)
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: -200 }))
    // await sleep(100)
    document.dispatchEvent(new MouseEvent('mouseup'))
  })
  it('<test prop:: isEditEvent drag top distance < 15>', async () => {
    const today = Moment().format('YYYY-MM-DD')
    const timeEvents = [
      {
          start: today + ' 13:00',
          end: today + ' 15:00',
          content: '1重型机械维修',
          key: 't1'
      },
    ];
    let wrapper = mount(<Calendar fullscreen mutiple type='hour' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} timeEvents={timeEvents} isEditEvent={true} />)
    await sleep(1000)
    wrapper.find(".wui-calendar-day-events-item-resizer-top-line").at(0).simulate('mouseEnter')
    // document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mouseenter', {bubbles:true}))
    await sleep(600)
    document.querySelector(".wui-calendar-day-events-item-resizer-top-line").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    // await sleep(1000)
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: 120 }))
    // await sleep(100)
    document.dispatchEvent(new MouseEvent('mouseup'))
    await sleep(600)
    document.querySelector(".wui-modal-mask").dispatchEvent(new MouseEvent('click'))
  })
  it('<test prop:: isEditEvent drag top distance = 30>', async () => {
    const today = Moment().format('YYYY-MM-DD')
    const timeEvents = [
      {
          start: today + ' 13:00',
          end: today + ' 15:30',
          content: '1重型机械维修',
          key: 't1'
      },
    ];
    let wrapper = mount(<Calendar fullscreen mutiple type='hour' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} timeEvents={timeEvents} isEditEvent={true} />)
    await sleep(1000)
    wrapper.find(".wui-calendar-day-events-item-resizer-bottom-line").at(0).simulate('mouseEnter')
    // document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mouseenter', {bubbles:true}))
    await sleep(600)
    document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    // await sleep(1000)
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: 90 }))
    // await sleep(100)
    document.dispatchEvent(new MouseEvent('mouseup'))
    // await sleep(600)
    // document.querySelector(".wui-modal-mask").dispatchEvent(new MouseEvent('click'))
  })
  it('<test prop:: isEditEvent drag top distance >= 0>', async () => {
    const today = Moment().format('YYYY-MM-DD')
    const timeEvents = [
      {
          start: today + ' 13:45',
          end: today + ' 15:30',
          content: '1重型机械维修',
          key: 't1'
      },
    ];
    let wrapper = mount(<Calendar fullscreen mutiple type='hour' operations={['lastMonth']} locale='zh-cn' isDragEvent={true} timeEvents={timeEvents} isEditEvent={true} />)
    await sleep(1000)
    wrapper.find(".wui-calendar-day-events-item-resizer-top-line").at(0).simulate('mouseEnter')
    // document.querySelector(".wui-calendar-day-events-item-resizer-bottom-line").dispatchEvent(new MouseEvent('mouseenter', {bubbles:true}))
    await sleep(600)
    document.querySelector(".wui-calendar-day-events-item-resizer-top-line").dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
    // await sleep(1000)
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: -75 }))
    // await sleep(100)
    document.dispatchEvent(new MouseEvent('mouseup'))
    // await sleep(600)
    // document.querySelector(".wui-modal-mask").dispatchEvent(new MouseEvent('click'))
  })
})
