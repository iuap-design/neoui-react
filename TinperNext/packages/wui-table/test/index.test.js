/** Table.tsx */
import React from 'react';
import Table from '../src/index';
import { shallow, mount, ReactWrapper } from '../../../next-ui-library/test/common/mount'
import { mountTest, attrsTest, focusTest, sleep, eventsTest, attrsTestByLength, testStyle, testCustomStyle, keyEvent } from "../../../next-ui-library/test/common/index";
import { prefix } from '../../wui-core/src/updatePrefix';
import { items } from '../../wui-pagination/src/i18n';
import Radio from '../../wui-radio/src/index';
import Checkbox from '../../wui-checkbox/src/index';
import Space from '../../wui-space/src/index';
import Tag from '../../wui-tag/src/index';
import Column from '../src/Column';
import renderInput from "../src/render/InputRender";
import renderDate from "../src/render/DateRender";
import renderCheckbox from "../src/render/CheckboxRender";
import renderRadio from "../src/render/RadioRender";
import renderSelect from "../src/render/SelectRender";
import Icon from '../../wui-icon/src/index';
import Input from '../../wui-input/src';
import Form from '../../wui-form/src';
import DatePicker from '../../wui-datepicker/src/index';
import Select from '../../wui-select/src/index';
import Popover from '../../wui-popover/src/index';
import { multiSelectOld } from '../src/lib/multiSelect';
import { ObjectAssign } from '../src/lib/utils';
const InputRender = renderInput(Form, Input, Icon);
const DateRender = renderDate(DatePicker, Icon);
const SelectRender = renderSelect(Select, Icon);
const CheckboxRender = renderCheckbox(Checkbox, Icon);
const prefixTable =`${prefix}-table`;
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
jest.mock('rc-resize-observer', () => {
  const React = require('react');
  const RefResizeObserver = (props, ref) => {
    React.useEffect(()=>{
      props.onResize(ref);
    }, [])
    return props.children;
  }
  return {
    __esModule: true,
    default: RefResizeObserver
  };
});

describe('Table test', () => {
  const columns = [
    {
      title: "序号", dataIndex: "index", key: "index", width: 80,
      render(text, record, index) {
        return index + 1;
      }
    },
    { title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: 200 },
    { title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: 200 },
    { title: "类型", dataIndex: "type_name", key: "type_name", width: 200 },
    { title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: 200 },
    { title: "采购金额", dataIndex: "purchasingmoney", key: "purchasingmoney", width: 200 },
    { title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: 200 }
  ];

  // 宽度为像素字符串
  const columnsPx = [
    {
      title: "序号", dataIndex: "index", key: "index", width: '80px',
      render(text, record, index) {
        return index + 1;
      }
    },
    { title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: '200px' },
    { title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: '200px' },
    { title: "类型", dataIndex: "type_name", key: "type_name", width: '200px' },
    { title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: '200px' },
    { title: "采购金额", dataIndex: "purchasingmoney", key: "purchasingmoney", width: '200px' },
    { title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: '200px' }
  ];

  // 宽度为百分比
  const percentColumns = [
    {
      title: "序号", dataIndex: "index", key: "index", width: '10%',
      render(text, record, index) {
        return index + 1;
      }
    },
    { title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: '20%' },
    { title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: '20%' },
    { title: "类型", dataIndex: "type_name", key: "type_name", width: '20%' },
    { title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: '10%' },
    { title: "采购金额", dataIndex: "purchasingmoney", key: "purchasingmoney", width: '10%' },
    { title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: '10%' }
  ];

  const data = [
    {
      orderCode: "NU0391025",
      supplierName: "供应商1",
      type_name: "1",
      purchasing: '组织c',
      purchasingmoney: "4000",
      voucherDate: "2018年03月18日",
      key: "1"
    },
    {
      orderCode: "NU0391026",
      supplierName: "供应商3",
      type_name: "2",
      purchasing: '组织a',
      purchasingmoney: "7000",
      voucherDate: "2018年02月05日",
      key: "2"
    },
    {
      orderCode: "NU0391027",
      supplierName: "供应商1",
      type_name: "3",
      purchasing: '组织b',
      purchasingmoney: "2000",
      voucherDate: "2018年07月01日",
      key: "3"
    },
    {
      orderCode: "NU0391028",
      supplierName: "供应商4",
      type_name: "4",
      purchasing: '组织c',
      purchasingmoney: "4000",
      voucherDate: "2019年03月01日",
      key: "4"
    },
    {
      orderCode: "NU0391029",
      supplierName: "供应商5",
      type_name: "5",
      purchasing: '组织d',
      purchasingmoney: "14000",
      voucherDate: "2019年02月14日",
      key: "5"
    },
    {
      orderCode: "NU0391030",
      supplierName: "供应商2",
      type_name: "1",
      purchasing: '组织e',
      purchasingmoney: "5000",
      voucherDate: "2019年02月18日",
      key: "6"
    },
    {
      orderCode: "NU0391031",
      supplierName: "供应商1",
      type_name: "2",
      purchasing: '组织f',
      purchasingmoney: "16000",
      voucherDate: "2019年01月01日",
      key: "7"
    },
    {
      orderCode: "NU0391032",
      supplierName: "供应商2",
      type_name: "3",
      purchasing: '组织g',
      purchasingmoney: "20000",
      voucherDate: "2019年01月31日",
      key: "8"
    },
  ];

  //多列表头数据
  const columns2 = [
    {
      title: "商品名",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "商品信息",
      width: 400,
      children: [
        {
          title: "价格",
          dataIndex: "price",
          key: "price",
          width: 200,
          sumCol: true,
        },
        {
          title: "数量",
          dataIndex: "count",
          key: "count",
          width: 200,
          sumCol: true,
          sumThousandth: true
        },
      ]
    },
  ];
  const data2 = [];
  for (let i = 0; i < 10; i++) {
    data2.push({
      key: i,
      name: "商品A",
      price: 10 * i,
      count: 5
    });
  }

  describe('columnsWidth < contentWidth', () => {
    it('columnsWidth test', () => {
      let contentBoundRect = {
            width: 1400
       }
      let centerBodyDomBoundRect = {
            height: 280
       }
      let centerBodyTableDomBoundRect = {
            height: 280
       }
      const container = document.createElement('div');
      document.body.innerHTML = '';
      document.body.appendChild(container);
      let wrapper = mount(<Table columns={columns} data={data} style={{width: '1400px'}}/>, { attachTo: container})
      const content = document.querySelector(`.${prefixTable}`);
      jest.spyOn(content, 'getBoundingClientRect').mockReturnValue(contentBoundRect)
      const centerBodyDom = document.querySelector(`.${prefixTable}-body`);
      const centerBodyTableDom = document.querySelector(`.${prefixTable}-body table`);
      jest.spyOn(centerBodyDom, 'scrollWidth', 'get').mockReturnValue(1400)
      jest.spyOn(centerBodyDom, 'clientWidth', 'get').mockReturnValue(1400)
      jest.spyOn(centerBodyDom, 'getBoundingClientRect').mockReturnValue(centerBodyDomBoundRect)
      jest.spyOn(centerBodyTableDom, 'getBoundingClientRect').mockReturnValue(centerBodyTableDomBoundRect) 
      // expect(wrapper.find('Table').at(0).state()).toBe()
      // // expect(wrapper.find('Table').at(0).state().contentWidthDiff).toBe(68)
      // // expect(wrapper.find('Table').at(0).state().lastShowIndex).toBe(6)
    })
  })

  //新增fieldid测试
  describe('scrollMode: sticky, <test prop:: fieldid>', () => {
    const { multiSelect, sum } = Table
    let MultiSelectTable = multiSelect(sum(Table), Checkbox);
    let expandedRowRender = (_record, index, _indent) => {
      if (index % 2 === 0) {
          return <div style={{ height: '30px' }}> 偶数测试展开行</div>;
      }
      else {
          return <div style={{ height: '30px' }}> 奇数测试展开行</div>;
      }
    };
    it('fieldid test', () => {
      const testColumn = JSON.parse(JSON.stringify(columns))
      testColumn[0]["fixed"] = 'left'
      testColumn[6]["fixed"] = 'right'
      const columnsCell = [
        {
          title: "序号", dataIndex: "index", key: "index", width: 80,
          render(text, record, index) {
            return index + 1;
          }
        },
        { title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: 200, fieldid: 'test-1' },
        { title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: 200 },
        { title: "类型", dataIndex: "type_name", key: "type_name", width: 200 },
        { title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: 200 },
        { title: "采购金额", dataIndex: "purchasingmoney", key: "purchasingmoney", width: 200 },
        { title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: 200 }
      ];
      let wrapper = mount(<MultiSelectTable columns={testColumn} data={data} fieldid="test" defaultExpandAllRows
       expandedRowRender={expandedRowRender}/>)
      let _wrapper = mount(<MultiSelectTable columns={testColumn} data={data} fieldid="test" defaultExpandAllRows
       expandedRowRender={expandedRowRender}/>)
      expect(wrapper.find(`.${prefixTable}`).props().fieldid).toBe("test_table");
      expect(wrapper.find(`.${prefixTable}-scroll .${prefixTable}-header`).props().fieldid).toBe("table-header");
      expect(wrapper.find(`.${prefixTable}-scroll th`).at(0).props().fieldid).toBe("checkbox");
      expect(wrapper.find(`.${prefixTable}-scroll th`).at(1).props().fieldid).toBe("index");
      expect(wrapper.find(`.${prefixTable}-scroll .${prefixTable}-header`).props().fieldid).toBe("table-header");
      expect(wrapper.find(`th.${prefixTable}-cell-fix-left`).at(0).props().fieldid).toBe("checkbox");
      expect(wrapper.find(`.${prefixTable}-scroll .${prefixTable}-header`).props().fieldid).toBe("table-header");
      expect(wrapper.find(`th.${prefixTable}-cell-fix-right`).props().fieldid).toBe("voucherDate");
      expect(wrapper.find(`tr.${prefixTable}-row`).at(8).props().fieldid).toBe("total-row");
      expect(wrapper.find(`tr.${prefixTable}-expanded-row`).at(0).props().fieldid).toBe("expanded-row");
      //部分fieldid增加待补充
      wrapper.setProps({ columns: columnsCell})
      expect(wrapper.find(`.${prefixTable}-scroll th`).at(2).props().fieldid).toBe("test-1");
      _wrapper.setProps({ columns: columnsCell})
      expect(_wrapper.find(`.${prefixTable}-scroll th`).at(2).props().fieldid).toBe("test-1");
    });

  });

  describe('scrollMode: table, <test prop:: fieldid>', () => {
    const { multiSelect, sum } = Table
    let MultiSelectTable = multiSelect(sum(Table), Checkbox);
    let expandedRowRender = (_record, index, _indent) => {
      if (index % 2 === 0) {
          return <div style={{ height: '30px' }}> 偶数测试展开行</div>;
      }
      else {
          return <div style={{ height: '30px' }}> 奇数测试展开行</div>;
      }
    };
    it('fieldid test', () => {
      const testColumn = JSON.parse(JSON.stringify(columns))
      testColumn[0]["fixed"] = 'left'
      testColumn[6]["fixed"] = 'right'
      const columnsCell = [
        {
          title: "序号", dataIndex: "index", key: "index", width: 80,
          render(text, record, index) {
            return index + 1;
          }
        },
        { title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: 200, fieldid: 'test-1' },
        { title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: 200 },
        { title: "类型", dataIndex: "type_name", key: "type_name", width: 200 },
        { title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: 200 },
        { title: "采购金额", dataIndex: "purchasingmoney", key: "purchasingmoney", width: 200 },
        { title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: 200 }
      ];
      let wrapper = mount(<MultiSelectTable columns={testColumn} data={data} fieldid="test" defaultExpandAllRows scrollMode='table'
       expandedRowRender={expandedRowRender}/>)
      expect(wrapper.find(`.${prefixTable}`).props().fieldid).toBe("test_table");
      expect(wrapper.find(`.${prefixTable}-scroll .${prefixTable}-header`).props().fieldid).toBe("table-header");
      expect(wrapper.find(`.${prefixTable}-scroll th`).at(0).props().fieldid).toBe("orderCode");  
      expect(wrapper.find(`.${prefixTable}-fixed-left .${prefixTable}-header`).props().fieldid).toBe("table-header");
      expect(wrapper.find(`.${prefixTable}-fixed-left th`).at(0).props().fieldid).toBe("checkbox");
      expect(wrapper.find(`.${prefixTable}-fixed-left th`).at(1).props().fieldid).toBe("index");
      expect(wrapper.find(`.${prefixTable}-fixed-right .${prefixTable}-header`).props().fieldid).toBe("table-header");
      expect(wrapper.find(`.${prefixTable}-fixed-right th`).props().fieldid).toBe("voucherDate");
      expect(wrapper.find(`tr.${prefixTable}-row`).at(8).props().fieldid).toBe("total-row");
      // expect(wrapper.find(`tr.${prefixTable}-expanded-row`).at(0).props().fieldid).toBe("expanded-row");
      //部分fieldid增加待补充
      wrapper.setProps({ columns: columnsCell})
      expect(wrapper.find(`.${prefixTable}-scroll th`).at(1).props().fieldid).toBe("test-1");
    });

  });


  attrsTestByLength({
    title: 'component: Table, <test prop:: data>',
    Component: Table,
    attrs: { data: data },
    selector: "tbody tr",
    nodeCount: 8,
  });
  attrsTest({
    title: 'component: Table, <test prop:: className>',
    Component: Table,
    attrs: {
      className: 'my-class'
    },
    selector:`.${prefixTable}`,
    classnames: [`my-class`]
  });
  testStyle({
    title: 'component: Table, <test prop:: style>',
    Component: Table,
    selector:`.${prefixTable}`,
    style: { 'color': "red" }
  });
  testCustomStyle({
    title: 'component: Table, <test prop:: bodyStyle>',
    Component: Table,
    attrs: {
      bodyStyle: {
        width: 250,
        height: 500,
      }
    },
    selector:`div.${prefixTable}-body`,
    verifyStyle: {
      width: "250px",
      height: "500px"
    }
  });
  describe('scrollMode: sticky, <test prop:: emptyText>, <test prop:: emptyClassName>', () => {
    const { sum } = Table;
    let ContentTable = sum(Table)
    it('emptyText No Data easy, <test prop:: useFixedHeader>', () => {
      let wrapper = mount(<ContentTable columns={columns} data={[]} emptyClassName='abc' emptyText={() => 'No Data'} />)
      expect(wrapper.find(`.${prefixTable}-placeholder`).text()).toBe('No Data')
      expect(wrapper.find('tbody tr').length).toBe(1)
      expect(wrapper.find(`.${prefixTable}-placeholder`).hasClass('abc')).toBe(true)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-fixed-header`)).toBe(true)
    })
    it('emptyText No Data', () => {
      let wrapper = mount(<ContentTable columns={columns} data={[]} style={{minHight: '400px'}} emptyText={() => 'No Data'} />)
      expect(wrapper.find(`.${prefixTable}-placeholder`).text()).toBe('No Data')
      expect(wrapper.find('tbody tr').length).toBe(1)
    })
  });
  describe('scrollMode: table, <test prop:: emptyText>', () => {
    const { sum } = Table;
    let ContentTable = sum(Table)
    it('emptyText No Data', () => {
      let wrapper = mount(<ContentTable columns={columns} data={[]} emptyText={() => 'No Data'} scrollMode='table'/>)
      expect(wrapper.find(`.${prefixTable}-placeholder`).text()).toBe('No Data')
      expect(wrapper.find('tbody tr').length).toBe(0)
    })
  });

  
  describe('<test prop:: showHeader>', () => {
    it('cannot find Header', () => {
      let wrapper = mount(<Table columns={columns} showHeader={false} />)
      expect(wrapper.find('th')).toHaveLength(0)
    })
  });
  describe('<test prop:: title>', () => {
    it('title should be 采购信息统计表', () => {
      let wrapper = mount(<Table columns={columns} title={() => <div>采购信息统计表</div>} />)
      expect(wrapper.find(`.${prefixTable}-title`).html()).toBe("<div>采购信息统计表</div>")
    })
    it('title should be 采购信息统计表', () => {
      let _wrapper = mount(<Table columns={columns} scrollMode='table' title={() => <div>采购信息统计表</div>} />)
      expect(_wrapper.find(`.${prefixTable}-title`).html()).toBe("<div>采购信息统计表</div>")
    })
  });
  describe('<test prop:: footer>', () => {
    it('footer should be 合计', () => {
      let wrapper = mount(<Table columns={columns} footerClassName={'abc'} footer={() => <div>合计</div>} />)
      expect(wrapper.find(`.${prefixTable}-footer`).html()).toBe('<div>合计</div>')
    })
    it('footerClassName', () => {
      let wrapper = mount(<Table columns={columns} footerClassName={'abc'} footer={() => <div>合计</div>} />)
      expect(wrapper.find(`.${prefixTable}-footer`).hasClass('abc'))
    })

    
    it('footer should be 合计', () => {
      let _wrapper = mount(<Table scrollMode='table' columns={columns} footerClassName={'abc'} footer={() => <div>合计</div>} />)
      expect(_wrapper.find(`.${prefixTable}-footer`).html()).toBe('<div>合计</div>')
    })
    it('<test prop:: footerClassName>', () => {
      let _wrapper = mount(<Table scrollMode='table' columns={columns} footerClassName={'abc'} footer={() => <div>合计</div>} />)
      expect(_wrapper.find(`.${prefixTable}-footer`).hasClass('abc'))
    })
  });
  describe('<test prop:: footer>', () => {
    it('footer should be 合计', () => {
      let wrapper = mount(<Table columns={columns} footerClassName={'abc'} scrollMode='sticky' footer={() => <div>合计</div>} />)
      expect(wrapper.find(`.${prefixTable}-footer`).html()).toBe('<div>合计</div>')
    })
    it('footerClassName', () => {
      let wrapper = mount(<Table columns={columns} footerClassName={'abc'} scrollMode='sticky' footer={() => <div>合计</div>} />)
      expect(wrapper.find(`.${prefixTable}-footer`).hasClass('abc'))
    })
  });
  describe('<test prop:: loading>', () => {
    it('loading should be set', () => {
      let wrapper = mount(<Table columns={columns} loading={true} />)
      expect(wrapper.find(`.${prefix}-spin-backdrop`)).toHaveLength(1)
      expect(wrapper.find(`.${prefix}-spin-desc`).text()).toBe("加载中...")
    })
    it('locale, en-us', () => {
      let wrapper = mount(<Table columns={columns} loading={true} locale={'en-us'}/>)
      expect(wrapper.find(`.${prefix}-spin-backdrop`)).toHaveLength(1)
      expect(wrapper.find(`.${prefix}-spin-desc`).text()).toBe("Loading...")
    });
  });
  describe('<test prop:: bordered>', () => {
    [false, true].forEach((item) => {
      it('border should be set', () => {
        let wrapper = mount(<Table columns={columns} data={data} bordered={item} />)
        expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-bordered`)).toBe(item)
      })

      it('border should be set', () => {
        let wrapper = mount(<Table scrollMode='table' columns={columns} data={data} bordered={item} />)
        expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-bordered`)).toBe(item)
      })
    })
  });

  describe('<test prop:: height>', () => {
    it('height should be 50', () => {
      let wrapper = mount(<Table columns={columns} data={data} height={50} />)
      expect(wrapper.find(`tbody tr`).at(0).getDOMNode().style['height']).toBe("50px")
    })
    it('height should be 50', () => {
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={data} height={50} />)
      expect(wrapper.find(`tbody tr`).at(0).getDOMNode().style['height']).toBe("50px")
    })
  });
  
  describe('<test prop:: headerHeight>', () => {
    it('headerHeight should be 60', () => {
      let wrapper = mount(<Table columns={columns} data={data} headerHeight={60} />)
      expect(wrapper.find(`thead tr`).at(0).getDOMNode().style['height']).toBe("60px")
    })

    it('headerHeight should be 60', () => {
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={data} headerHeight={60} />)
      expect(wrapper.find(`thead tr`).at(0).getDOMNode().style['height']).toBe("60px")
    })
  });

  describe('<test prop:: stripeLine>', () => {
    it('Interlaced color change', () => {
      let wrapper = mount(<Table columns={columns} data={data} stripeLine={true} />)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-striped`)).toBe(true)
    })

    it('Interlaced color change', () => {
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={data} stripeLine={true} />)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-striped`)).toBe(true)
    })
  });


  describe('<test prop:: hoverContent>', () => {
    const {multiSelect} = Table;
    let MultiSelectTable = multiSelect(Table, Checkbox);

    it('set hoverContent', async () => {
      let wrapper = mount(<Table columns={columns} data={data} hoverContent={() => <div className='myhover'>hovercontent</div>} />)
      wrapper.find("tbody tr").at(0).find('td').at(0).simulate('mouseEnter')
      await sleep(100)
      // expect(wrapper.find("tbody tr").at(0).find(`.myhover`).text()).toBe('hovercontent')
      expect(wrapper.find(`.myhover`).text()).toBe('hovercontent')
      let _wrapper = mount(<Table scrollMode={'table'} columns={columns} data={[data]} hoverContent={() => <div className='myhover'>hovercontent</div>} />)
      _wrapper.find("tbody tr").at(0).find('td').at(0).simulate('mouseEnter')
      expect(_wrapper.find(`.myhover`).text()).toBe('hovercontent')
    })

    it('hoverContent hover', async () => {
      let rowSelection = {selectedRowKeys: ['1']}
      let wrapper = mount(<MultiSelectTable columns={columns} data={[...data]} hoverContent={() => <div className='myhover'>hovercontent</div>}/>)
      wrapper.setProps({rowSelection: rowSelection})
      wrapper.find("tbody tr").at(0).find('td').at(0).simulate('mouseEnter')
      await sleep(100)
      // // wrapper.find(`.${prefix}-row-hover`).simulate('mouseEnter')
      // expect(wrapper.find("tbody tr").at(0).find(`.myhover`).text()).toBe('hovercontent')
      // // expect(wrapper.find("tbody tr").at(0).find(`.${prefixTable}-row-hover-content-box`).getDOMNode().style['lineHeight']).toBe('35px')
      // wrapper.find("tbody tr").at(0).simulate('mouseleave')
      // // expect(wrapper.find(`.${prefix}-row-hover-content-box`).getDOMNode().style['display']).toBe('none')
      wrapper.find(`.${prefix}-row-hover`).simulate('mouseEnter')
      expect(wrapper.find(`.${prefix}-row-hover`).getDOMNode().style['display']).toBe('block')
      wrapper.find(`.${prefix}-row-hover`).simulate('mouseleave')
      expect(wrapper.find(`.${prefix}-row-hover`).getDOMNode().style['display']).toBe('none')
      wrapper.simulate('mouseleave')

      let _wrapper = mount(<MultiSelectTable scrollMode={'table'} columns={columns} data={[...data]} hoverContent={() => <div className='myhover'>hovercontent</div>}/>)
      _wrapper.setProps({rowSelection: rowSelection})
      _wrapper.find("tbody tr").at(0).simulate('mouseEnter')
      _wrapper.find(`.${prefix}-row-hover`).simulate('mouseEnter')
      expect(_wrapper.find(`.${prefix}-row-hover`).getDOMNode().style['display']).toBe('block')
      _wrapper.find(`.${prefix}-row-hover`).simulate('mouseleave')
      expect(_wrapper.find(`.${prefix}-row-hover`).getDOMNode().style['display']).toBe('none')
      _wrapper.simulate('mouseleave')
      
    })
    it('nextProps hoverContent', () => {
      let rowSelection = {selectedRowKeys: ['1']}
        let wrapper = mount(<MultiSelectTable columns={columns} data={[...data]} hoverContent={() => <div className='myhover'>hovercontent</div>}/>)
        wrapper.setProps({rowSelection: rowSelection})
        // expect(wrapper.find(`.${prefix}-row-hover`).hasClass(`${prefixTable}-hovercontent-hover`)).toBe(true)
    })
    it('nextProps hoverContent', () => {
      let rowSelection = {selectedRowKeys: ['1']}
      let _wrapper = mount(<MultiSelectTable columns={columns} data={[...data]} hoverContent={() => <div className='myhover'>hovercontent</div>} rowSelection={{selectedRowKeys: ['2']}}/>)
        _wrapper.find("tbody tr").at(0).simulate('mouseEnter')
        _wrapper.setProps({rowSelection: rowSelection})
        // expect(_wrapper.find(`.${prefix}-row-hover`).getDOMNode().classList.contains(`${prefixTable}-hovercontent-selected`)).toBeTruthy()
    })
    it('nextProps hoverContent, <scrollMode: table>', () => {
      let rowSelection = {selectedRowKeys: ['1']}
      let wrapper1 = mount(<MultiSelectTable scrollMode={'table'} columns={columns} data={[...data]} hoverContent={() => <div className='myhover'>hovercontent</div>}/>)
        wrapper1.setProps({rowSelection: rowSelection})
        expect(wrapper1.find(`.${prefix}-row-hover`).hasClass(`${prefixTable}-hovercontent-hover`)).toBe(true)
    })
    it('nextProps hoverContent, <scrollMode: table>', () => {
      let rowSelection = {selectedRowKeys: ['1']}
       let _wrapper1 = mount(<MultiSelectTable scrollMode={'table'} columns={columns} data={[...data]} hoverContent={() => <div className='myhover'>hovercontent</div>} rowSelection={{selectedRowKeys: ['2']}}/>)
        _wrapper1.find("tbody tr").at(0).simulate('mouseEnter')
        _wrapper1.setProps({rowSelection: rowSelection})
        // expect(_wrapper1.find(`.${prefix}-row-hover`).getDOMNode().classList.contains(`${prefixTable}-hovercontent-selected`)).toBeTruthy()
    })
    it('hoverContent callback', () => {
      const hoverContent = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} hoverContent={hoverContent} />)
      wrapper.find("tbody tr").at(0).find('td').at(0).simulate('mouseEnter')
      expect(hoverContent).toHaveBeenCalled()
      expect(hoverContent.mock.calls[0][0]).toEqual(data[0])
    })
  });

  describe('<test prop:: syncHover>', () => {
    [true, false].forEach((item) => {
      it('syncHover', () => {
        let wrapper = mount(<Table columns={columns} data={[data]} />)
        wrapper.setProps({ syncHover: item })
        wrapper.find("tbody tr").at(0).simulate('mouseEnter')
        // expect(wrapper.find(`tbody tr`).at(0).hasClass(`${prefixTable}-row-hover`)).toBe(item)
      })

      it('syncHover', () => {
        let _wrapper = mount(<Table scrollMode='table' columns={columns} data={[data]} />)
        _wrapper.setProps({ syncHover: item })
        _wrapper.find("tbody tr").at(0).simulate('mouseEnter')
        // expect(_wrapper.find(`tbody tr`).at(0).hasClass(`${prefixTable}-row-hover`)).toBe(item)
      })
    })
  });

  describe('<test prop:: getBodyWrapper>', () => {
    const getBodyWrapper = jest.fn()
    it('getBodyWrapper set', () => {
      let wrapper = mount(<Table columns={columns} data={data} />)
      let tbody = wrapper.find(`tbody`).at(0).html()
      wrapper.setProps({ getBodyWrapper: getBodyWrapper })
      expect(getBodyWrapper).toHaveBeenCalled()
    })

    it('getBodyWrapper set', () => {
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={data} />)
      let tbody = wrapper.find(`tbody`).at(0).html()
      wrapper.setProps({ getBodyWrapper: getBodyWrapper })
      expect(getBodyWrapper).toHaveBeenCalled()
    })

  });

  describe('<test prop:: rowClassName>', () => {
    it('set rowClassName', () => {
      let wrapper = mount(<Table columns={columns} data={[data]} rowClassName={() => 'myrow'} />)
      expect(wrapper.find(`tbody tr`).at(0).hasClass('myrow')).toBe(true)
    })

    it('set rowClassName', () => {
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={[data]} rowClassName={() => 'myrow'} />)
      expect(wrapper.find(`tbody tr`).at(0).hasClass('myrow')).toBe(true)
    })

    it('rowClassName callback', () => {
      const rowClassName = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} rowClassName={rowClassName} />)
      expect(rowClassName).toHaveBeenCalled()
      expect(rowClassName.mock.calls[0][0]).toEqual(data[0])
    })

    it('rowClassName callback', () => {
      const rowClassName = jest.fn()
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={data} rowClassName={rowClassName} />)
      expect(rowClassName).toHaveBeenCalled()
      expect(rowClassName.mock.calls[0][0]).toEqual(data[0])
    })

  });

  describe('<test prop:: getCellClassName>', () => {
    it('set getCellClassName', () => {
      let wrapper = mount(<Table columns={columns} data={[data]} getCellClassName={() => 'mycell'} />)
      expect(wrapper.find(`tbody td`).at(0).hasClass('mycell')).toBe(true)
    })

    it('set getCellClassName', () => {
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={[data]} getCellClassName={() => 'mycell'} />)
      expect(wrapper.find(`tbody td`).at(0).hasClass('mycell')).toBe(true)
    })

    it('getCellClassName callback', () => {
      const getCellClassName = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} getCellClassName={getCellClassName} />)
      expect(getCellClassName).toHaveBeenCalled()
      expect(getCellClassName.mock.calls[0][0]).toEqual(data[0])
    })

    it('getCellClassName callback', () => {
      const getCellClassName = jest.fn()
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={data} getCellClassName={getCellClassName} />)
      expect(getCellClassName).toHaveBeenCalled()
      expect(getCellClassName.mock.calls[0][0]).toEqual(data[0])
    })
  });

  describe('<test prop:: onBodyMouseLeave>', () => {
    it('onBodyMouseLeave callback', async () => {
      const onBodyMouseLeave = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} onBodyMouseLeave={onBodyMouseLeave} />)
      wrapper.find(`.${prefixTable}-body`).at(0).simulate('mouseleave')
      await sleep(100)
      expect(onBodyMouseLeave).toHaveBeenCalled()
    })

    it('onBodyMouseLeave callback', async () => {
      const onBodyMouseLeave = jest.fn()
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={data} onBodyMouseLeave={onBodyMouseLeave} />)
      wrapper.find(`.${prefixTable}-body`).at(0).simulate('mouseleave')
      await sleep(100)
      expect(onBodyMouseLeave).toHaveBeenCalled()
    })
  });

  describe('<test prop:: onPaste>', () => {
    it('onPaste callback', async () => {
      const onPaste = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} onPaste={onPaste} />)
      wrapper.find(`.${prefixTable}-body tr td`).at(0).simulate('paste')
      await sleep(100)
      expect(onPaste).toHaveBeenCalled()
    })

    it('onPaste callback', async () => {
      const onPaste = jest.fn()
      let wrapper = mount(<Table scrollMode='table' columns={columns} data={data} onPaste={onPaste} />)
      wrapper.find(`.${prefixTable}-body tr td`).at(0).simulate('paste')
      await sleep(100)
      expect(onPaste).toHaveBeenCalled()
    })
  });

  describe('<test prop:: onRow>', () => {
    it('onRow callback', () => {
      const onRow = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} onRow={onRow} />)
      expect(onRow).toHaveBeenCalled()
      expect(onRow.mock.calls[0][0]).toEqual(data[0])
    })

    it('onRow callback', () => {
      const onRow = jest.fn()
      let wrapper = mount(<Table scrollMode={'table'} columns={columns} data={data} onRow={onRow} />)
      expect(onRow).toHaveBeenCalled()
      expect(onRow.mock.calls[0][0]).toEqual(data[0])
    })
  });
  describe('<test prop:: onHeaderRow>', () => {
    it('onHeaderRow callback', () => {
      const onHeaderRow = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} onHeaderRow={onHeaderRow} />)
      expect(onHeaderRow).toHaveBeenCalled()
      expect(onHeaderRow.mock.calls[0][0]).toEqual(columns)
    })

    it('onHeaderRow callback', () => {
      const onHeaderRow = jest.fn()
      let wrapper = mount(<Table scrollMode={'table'} columns={columns} data={data} onHeaderRow={onHeaderRow} />)
      expect(onHeaderRow).toHaveBeenCalled()
      expect(onHeaderRow.mock.calls[0][0]).toEqual(columns)
    })
  });

  describe('<test prop:: onRowClick>', () => {
    it('onRowClick callback', () => {
      const onRowClick = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} onRowClick={onRowClick} />)
      wrapper.find("tbody tr").at(0).simulate('click')
      expect(onRowClick).toHaveBeenCalled()
    })
    
    it('onRowClick callback', () => {
      const onRowClick = jest.fn()
      let _wrapper = mount(<Table scrollMode={'table'} columns={columns} data={data} onRowClick={onRowClick} />)
      _wrapper.find("tbody tr").at(0).simulate('click')
      expect(onRowClick).toHaveBeenCalled()
    })
  });

  describe('<test prop:: expandRowByClick>', () => {  
    const data = [
      {
        orderCode: "NU0391025",
        supplierName: "供应商1",
        type_name: "1",
        purchasing: '组织c',
        purchasingmoney: "4000",
        voucherDate: "2018年03月18日",
        key: "1",
        children: [
          {
            orderCode: "NU0391025",
            supplierName: "供应商11",
            type_name: "11",
            purchasing: '组织c1',
            purchasingmoney: "40001",
            voucherDate: "2018年03月18日",
            key: "11"
          }
        ]
      },
      {
        orderCode: "NU0391026",
        supplierName: "供应商3",
        type_name: "2",
        purchasing: '组织a',
        purchasingmoney: "7000",
        voucherDate: "2018年02月05日",
        key: "2"
      },
      {
        orderCode: "NU0391027",
        supplierName: "供应商1",
        type_name: "3",
        purchasing: '组织b',
        purchasingmoney: "2000",
        voucherDate: "2018年07月01日",
        key: "3"
      },
      {
        orderCode: "NU0391028",
        supplierName: "供应商4",
        type_name: "4",
        purchasing: '组织c',
        purchasingmoney: "4000",
        voucherDate: "2019年03月01日",
        key: "4"
      },
      {
        orderCode: "NU0391029",
        supplierName: "供应商5",
        type_name: "5",
        purchasing: '组织d',
        purchasingmoney: "14000",
        voucherDate: "2019年02月14日",
        key: "5"
      },
      {
        orderCode: "NU0391030",
        supplierName: "供应商2",
        type_name: "1",
        purchasing: '组织e',
        purchasingmoney: "5000",
        voucherDate: "2019年02月18日",
        key: "6"
      },
      {
        orderCode: "NU0391031",
        supplierName: "供应商1",
        type_name: "2",
        purchasing: '组织f',
        purchasingmoney: "16000",
        voucherDate: "2019年01月01日",
        key: "7"
      },
      {
        orderCode: "NU0391032",
        supplierName: "供应商2",
        type_name: "3",
        purchasing: '组织g',
        purchasingmoney: "20000",
        voucherDate: "2019年01月31日",
        key: "8"
      },
    ];
    it('onExpand callback', () => {
      const onExpand = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} expandRowByClick onExpand={onExpand}/>)
      let _wrapper = mount(<Table scrollMode='table' columns={columns} data={data} expandRowByClick onExpand={onExpand}/>)
      wrapper.find("tbody tr").at(0).simulate('click')
      expect(onExpand).toHaveBeenCalled()
      _wrapper.find("tbody tr").at(0).simulate('click')
      expect(onExpand).toHaveBeenCalled()
    })
  });

  describe('<test prop:: onRowDoubleClick>', () => {
    it('onRowDoubleClick callback', () => {
      const onRowDoubleClick = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} onRowDoubleClick={onRowDoubleClick} />)
      wrapper.find("tbody tr").at(0).simulate('doubleclick')
      expect(onRowDoubleClick).toHaveBeenCalled()
    })
    
    it('onRowDoubleClick callback', () => {
      const onRowDoubleClick = jest.fn()
      let _wrapper = mount(<Table scrollMode={'table'} columns={columns} data={data} onRowDoubleClick={onRowDoubleClick} />)
      _wrapper.find("tbody tr").at(0).simulate('doubleclick')
      expect(onRowDoubleClick).toHaveBeenCalled()
    })
  });
  describe('<test prop:: onRowHover>', () => {
    it('onRowHover callback', () => {
      const onRowHover = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} onRowHover={onRowHover} />)
      wrapper.find("tbody tr").at(0).find('td').at(0).simulate('mouseEnter')
      expect(onRowHover).toHaveBeenCalled()
    })

    it('onRowHover callback', () => {
      const onRowHover = jest.fn()
      let wrapper = mount(<Table scrollMode={'table'} columns={columns} data={data} onRowHover={onRowHover} />)
      wrapper.find("tbody tr").at(0).find('td').at(0).simulate('mouseEnter')
      expect(onRowHover).toHaveBeenCalled()
    })
  });

  describe('column test, <test prop:: columns>', () => {
    it('column should be set', async () => {
      let wrapper = mount(<Table columns={columns} data={data} />)
      await sleep(100)
      expect(wrapper.find('th')).toHaveLength(7)
    });
    it('<test prop:: title>', () => {
      let wrapper = mount(<Table columns={columns} data={data} />)
      columns.forEach((item, index) => {
        expect(wrapper.find('th').at(index).text()).toBe(item.title)
      });
    });
    // it('<test prop:: width>', () => {
    //   let wrapper = mount(<Table columns={columns} data={data} />)
    //   columns.forEach((item, index) => {
    //     expect(wrapper.find('th').at(index).prop('style').maxWidth).toBe(`${item.width}px`)
    //   });
    // });
    it('<test prop:: dataIndex>', () => {
      let wrapper = mount(<Table columns={columns} data={data} />)
      columns.forEach((item, index) => {
        expect(wrapper.find('th').at(index).prop('data-line-key')).toBe(item.dataIndex)
      });
    });
    it('<test prop:: key>', () => {
      let wrapper = mount(<Table columns={columns} data={data} />)
      columns.forEach((item, index) => {
        expect(wrapper.find('th').at(index).prop('data-col-key')).toBe(item.key)
      });
    });
    it('<test prop:: fixed>', () => {
      const fixColumn = JSON.parse(JSON.stringify(columns))
      fixColumn[0]["fixed"] = 'left'
      fixColumn[6]["fixed"] = 'right'
      let wrapper = mount(<Table columns={fixColumn} data={data} />)
      expect(wrapper.find(`th.${prefixTable}-cell-fix-left`).text()).toBe('序号')
      expect(wrapper.find(`th.${prefixTable}-cell-fix-left`).props().fixed).toBe('left')
      expect(wrapper.find(`th.${prefixTable}-cell-fix-right`).text()).toBe('凭证日期')
      expect(wrapper.find(`th.${prefixTable}-cell-fix-right`).props().fixed).toBe('right')
    })
  })

  describe('展开子表测试', () => {
    const columnsChild = [
      { title: "仓库编号", dataIndex: "storageCode", key: "storageCode" },
      { title: "使用者名称", dataIndex: "userName", key: "userName" },
    ];
    const dataChild = [
      {
        storageCode: "CK01",
        userName: "xxA",
        key: "1"
      },
      {
        storageCode: "CK02",
        userName: "xxB",
        key: "2"
      },
    ];
    
    it('<test prop:: expandedRowRender>', () => {
      let wrapper = mount(<Table
        columns={[...columns]} data={[...data]}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
      />)
      expect(wrapper.find('tbody span').at(1).hasClass('expand-icon-con')).toBe(true)
      expect(wrapper.find('tbody span span').at(0).hasClass(`${prefixTable}-row-collapsed`)).toBe(true)
    });
    [false, true].forEach((item) => {
      it('<test prop:: defaultExpandAllRows>', () => {
        let wrapper = mount(<Table
          columns={columns} data={data}
          expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
          defaultExpandAllRows={true}
        />)
        expect(wrapper.find('tbody span span').at(0).hasClass(`${prefixTable}-row-expanded`)).toBe(true)
      })
    });
    it('<test prop:: defaultExpandedRowKeys>', () => {
      let Exlist = ['1', '3', '5', '7']
      let wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        defaultExpandedRowKeys={Exlist}
      />)
      Exlist.forEach((item) => {
        expect(wrapper.find('tbody span span').at(item - 1).hasClass(`${prefixTable}-row-expanded`)).toBe(true)
      })
    });
    it('<test prop:: expandedRowKeys>', () => {
      let Exlist = ['2', '4', '6']
      let wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        expandedRowKeys={Exlist}
      />)
      Exlist.forEach((item) => {
        expect(wrapper.find('tbody span span').at(item - 1).hasClass(`${prefixTable}-row-expanded`)).toBe(true)
      })

      let _wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} scrollMode='table'/>}
        expandedRowKeys={Exlist}
      />)
      Exlist.forEach((item) => {
        expect(_wrapper.find('tbody span span').at(item - 1).hasClass(`${prefixTable}-row-expanded`)).toBe(true)
      })
    });
    it('<test prop:: expandedRowClassName>', () => {
      const ExClassName = jest.fn();
      let wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        expandedRowClassName={ExClassName}
      />)
      wrapper.find('tbody span span').at(0).simulate('click')
      expect(wrapper.find('tbody span span').at(0).hasClass(`${prefixTable}-row-expanded`)).toBe(true)
      expect(ExClassName).toHaveBeenCalled();
      expect(ExClassName.mock.calls[0]).toEqual([data[0], 0, 0])
    });
    [false, true].forEach((item) => {
      it('<test prop:: expandIconAsCell>', () => {
        let wrapper = mount(<Table
          columns={[...columns]} data={[...data]}
          expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        />)
        wrapper.setProps({ expandIconAsCell: item })
        expect(wrapper.find('thead th').at(0).hasClass(`${prefixTable}-expand-icon-col`)).toBe(item)
      });
    })


    it('<test prop:: expandIconColumnIndex>', () => {
      let wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        expandIconColumnIndex={1}
      />)
      expect(wrapper.find('tr td').at(0).hasClass(`${prefixTable}-row-has-expandIcon`)).toBe(false)
      expect(wrapper.find('tr td').at(1).hasClass(`${prefixTable}-row-has-expandIcon`)).toBe(true)
    });
    // TODO
    // it('<test prop:: haveExpandIcon>', () => {
    //   let wrapper = mount(<Table
    //     columns={[...columns]} data={[...data]}
    //     expandIconAsCell
    //     expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
    //   />)
    //   expect(wrapper.find('tbody span').at(0).hasClass('expand-icon-con')).toBe(true)
    //   wrapper.setProps({ haveExpandIcon: (record, index) => true })
    //   expect(wrapper.find('tbody span').at(0).hasClass('expand-icon-con')).toBe(false)
    // });
    it('<test prop:: expandedIcon>', () => {
      let wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        expandedIcon={<i class="uf uf-arrow-up"></i>}
      />)
      wrapper.find('tbody span span').at(0).simulate('click')
      expect(wrapper.find('tbody i').at(0).prop('class')).toBe("uf uf-arrow-up")
    });
    it('<test prop:: collapsedIcon>', () => {
      let wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        collapsedIcon={<i class="uf uf-arrow-down"></i>}
      />)
      expect(wrapper.find('tbody i').at(0).prop('class')).toBe("uf uf-arrow-down")
    });
    it('<test prop:: expandIcon>', () => {
      let wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        collapsedIcon={<i class="uf uf-arrow-down"></i>}
        expandedIcon={<i class="uf uf-arrow-up"></i>}
        expandIcon={({ expanded, onExpand, record }) => expanded ? <i class="uf uf-arrow-up expandIcon"></i> : <i class="uf uf-arrow-down expandIcon"></i>}
      />)
      expect(wrapper.find('tbody i').at(0).prop('class')).toBe("uf uf-arrow-down expandIcon")
      wrapper.find('tbody i').at(0).simulate('click')
      expect(wrapper.find('tbody i').at(0).prop('class')).toBe("uf uf-arrow-up expandIcon")
    });
    [false, true].forEach((item) => {
      it('<test prop:: expandRowByClick>', () => {
        let wrapper = mount(<Table
          columns={columns} data={data}
          expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
          expandRowByClick={item}
        />)
        wrapper.find('tbody tr').at(0).simulate('click')
        expect(wrapper.find('tbody span span').at(0).hasClass(`${prefixTable}-row-expanded`)).toBe(item)
        expect(wrapper.find("tbody tr").at(1).hasClass(`${prefixTable}-expanded-row`)).toBe(item)
      })
    });

    it('<test prop:: expandIconCellWidth>', () => {
      let wrapper = mount(<Table
        columns={[...columns]} data={[...data]}
        expandIconAsCell
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
      />)
      // expect(wrapper.find('thead th').at(0).prop("style").maxWidth).toBe('43px')
      wrapper.setProps({ expandIconCellWidth: 200 })
      // expect(wrapper.find('thead th').at(0).prop("style").maxWidth).toBe('200px')
    });

    it('<test prop:: onExpand>', () => {
      const Expand = jest.fn();
      let wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        onExpand={Expand}
      />)
      wrapper.find('tbody span span').at(0).simulate('click')
      expect(wrapper.find('tbody span span').at(0).hasClass(`${prefixTable}-row-expanded`)).toBe(true)
      expect(Expand).toHaveBeenCalled();
      expect(Expand.mock.calls[0]).toEqual([true, data[0], 0])
    });
    it('<test prop:: onExpandedRowsChange>', () => {
      const ExpandedRowsChange = jest.fn();
      let wrapper = mount(<Table
        columns={columns} data={data}
        expandedRowRender={() => <Table columns={columnsChild} data={dataChild} />}
        onExpandedRowsChange={ExpandedRowsChange}
      />)
      wrapper.find('tbody span span').at(1).simulate('click')
      expect(wrapper.find('tbody span span').at(1).hasClass(`${prefixTable}-row-expanded`)).toBe(true)
      expect(ExpandedRowsChange).toHaveBeenCalled();
      expect(ExpandedRowsChange.mock.calls[0][0]).toEqual(["2"])
    });
  })


  describe('过滤数据测试', () => {
    const columns = [
      {
        title: "序号", dataIndex: "index", key: "index", width: 80,
        render(text, record, index) {
          return index + 1;
        }
      },
      { title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: 200 },
      { title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: 200 },
      { title: "类型", dataIndex: "type_name", key: "type_name", width: 200 },
      { title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: 200 },
      { title: "采购金额", dataIndex: "purchasingmoney", key: "purchasingmoney", width: 200 },
      { title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: 200 },
      { title: "凭证日期1", dataIndex: "voucherDate1", key: "voucherDate1", width: 200 },
      { title: "凭证日期2", dataIndex: "voucherDate2", key: "voucherDate2", width: 200 },
      { title: "凭证日期3", dataIndex: "voucherDate3", key: "voucherDate3", width: 200 },
      { title: "凭证日期4", dataIndex: "voucherDate4", key: "voucherDate4", width: 200 },
      { title: "凭证日期5", dataIndex: "voucherDate5", key: "voucherDate5", width: 200 },
      { title: "凭证日期6", dataIndex: "voucherDate6", key: "voucherDate6", width: 200 },
      { title: "凭证日期7", dataIndex: "voucherDate7", key: "voucherDate7", width: 200 },
      { title: "凭证日期8", dataIndex: "voucherDate8", key: "voucherDate8", width: 200 },
    ]   
    const filterColumn = JSON.parse(JSON.stringify(columns))
    filterColumn[1]["filterType"] = 'dropdown'
    filterColumn[1]["filterDropdownOptions"] = {allowClear: true}   
    filterColumn[2]["filterType"] = 'text'
    filterColumn[2]["filterDropdownOptions"] = {allowClear: true}   
    filterColumn[3]["filterType"] = 'number'
    filterColumn[3]["filterDropdownOptions"] = {allowClear: true}   
    filterColumn[6]["filterType"] = 'date'
    filterColumn[6]["filterDropdownOptions"] = {allowClear: true}   
    filterColumn[7]["filterType"] = 'dateyear'
    filterColumn[7]["filterDropdownOptions"] = {allowClear: true}
    filterColumn[8]["filterType"] = 'datemonth'
    filterColumn[8]["filterDropdownOptions"] = {allowClear: true} 
    filterColumn[9]["filterType"] = 'dateweek'
    filterColumn[9]["filterDropdownOptions"] = {allowClear: true}
    filterColumn[10]["filterType"] = 'daterange'
    filterColumn[10]["filterDropdownOptions"] = {allowClear: true} 
    filterColumn[11]["filterType"] = 'time'
    filterColumn[11]["filterDropdownOptions"] = {allowClear: true} 
    filterColumn[12]["filterType"] = 'bool'
    filterColumn[12]["filterDropdownOptions"] = {disabled: true}
    class FilterDemo extends React.Component {
      constructor(props) {
        super(props);
        this.filterObj = {};
        this.state = {
          data: data,
        }
        this.data = data;
      }
      handleFilter = (arr, obj) => {
        let tempArr = [];
        let { key, val } = obj;
        if (!val && val !== '0' && val !== 0) {
          tempArr = arr;
          return tempArr
        }
        switch (obj.condition) {
          case 'LIKE':
            tempArr = arr.filter(item => {
              return item[key].toString().toLowerCase().includes(val.toString().toLowerCase());
            })
            break;
          case 'ULIKE':
            tempArr = arr.filter(item => {
              return !item[key].toString().toLowerCase().includes(val.toString().toLowerCase());
            })
            break;
          case 'EQ':
            tempArr = arr.filter(item => {
              return item[key].toString().toLowerCase() === val.toString().toLowerCase();
            })
            break;
          case 'UEQ':
            tempArr = arr.filter(item => {
              return item[key].toString().toLowerCase() !== val.toString().toLowerCase();
            })
            break;
          case 'RLIKE':
            tempArr = arr.filter(item => {
              return item[key].toString().toLowerCase().startsWith(val.toString().toLowerCase());
            })
            break;
          case 'LLIKE':
            tempArr = arr.filter(item => {
              return item[key].toString().toLowerCase().endsWith(val.toString().toLowerCase());
            })
            break;
          case 'GT':  //大于
            tempArr = arr.filter(item => {
              return item[key] > val;
            })
            break;
          case 'GTEQ': //大于等于
            tempArr = arr.filter(item => {
              return item[key] >= val;
            })
            break;
          case 'LT': // 小于
            tempArr = arr.filter(item => {
              return item[key] < val;
            })
            break;
          case 'LTEQ': // 小于等于
            tempArr = arr.filter(item => {
              return item[key] <= val;
            })
            break;
          default:
            tempArr = arr;
        }
        return tempArr;
      }
      filter = () => {
        let tempData = this.data;
        for (let k in this.filterObj) {
          if (this.filterObj[k] !== undefined) {
            tempData = this.handleFilter(tempData, this.filterObj[k])
          }
        }
        this.setState({ data: tempData })
      }
      handlerFilterChange = (key, val, condition) => {
        if (key === 'date') {
          if (val) {
            val = moment(val).format("YYYY-MM-DD");
          }
        }
        this.filterObj[key] = {
          key,
          val,
          condition
        }
        this.filter()
      }
      handlerFilterClear = (key) => {
        this.filterObj[key] = undefined;
        this.filter()
      }
      render() {
        return (
          <Table
            columns={filterColumn}
            data={this.state.data}
            filterable={true}
            onFilterChange={this.handlerFilterChange}//下拉条件的回调(key,val)=>()
            onFilterClear={this.handlerFilterClear}//触发输入操作以及其他的回调(key,val)=>()
            {...this.props}
          />
        )
      }
    }
    it('<test prop:: filterable>', () => {
      let wrapper = mount(<FilterDemo />)
      expect(wrapper.find('thead tr').at(1).hasClass("filterable")).toBe(true)
      expect(wrapper.find('.filterable th').at(1).find('button')).toHaveLength(2)
      // table模式
      let _wrapper = mount(<FilterDemo scrollMode='table'/>)
      expect(_wrapper.find('thead tr').at(1).hasClass("filterable")).toBe(true)
      expect(_wrapper.find('.filterable th').at(1).find('button')).toHaveLength(2)
    });
    it('<test prop:: filterDelay>', async () => {
      let wrapper = mount(<FilterDemo filterDelay={1000} />)
      wrapper.find('.filterable th').at(2).find('input').simulate('change', { target: { value: '供应商1' } })
      expect(wrapper.find('tbody tr').length).toBe(8)
      await sleep(1000)
      expect(wrapper.find('tbody tr').length).toBe(3)
    });
    it('<test prop:: filterDelay>', async () => {
      // table模式
      let _wrapper = mount(<FilterDemo filterDelay={1000} scrollMode='table'/>)
      _wrapper.find('.filterable th').at(2).find('input').simulate('change', { target: { value: '供应商1' } })
      expect(_wrapper.find('tbody tr').length).toBe(8)
      await sleep(1000)
      expect(_wrapper.find('tbody tr').length).toBe(3)
    });
    it('<test prop:: filterType>', () => {
      let wrapper = mount(<FilterDemo />)
      expect(wrapper.find('.filterable th').at(1).prop('filtertype')).toBe('dropdown')
      expect(wrapper.find('.filterable th').at(2).prop('filtertype')).toBe('text')
      expect(wrapper.find('.filterable th').at(3).prop('filtertype')).toBe('number')
      expect(wrapper.find('.filterable th').at(6).prop('filtertype')).toBe('date')
      // table模式
      let _wrapper = mount(<FilterDemo scrollMode='table'/>)
      expect(_wrapper.find('.filterable th').at(1).prop('filtertype')).toBe('dropdown')
      expect(_wrapper.find('.filterable th').at(2).prop('filtertype')).toBe('text')
      expect(_wrapper.find('.filterable th').at(3).prop('filtertype')).toBe('number')
      expect(_wrapper.find('.filterable th').at(6).prop('filtertype')).toBe('date')
    });
    it('<test prop:: filterDropdown>', () => {
      filterColumn[1]["filterDropdown"] = 'hide'
      let wrapper = mount(<FilterDemo />)
      expect(wrapper.find('.filterable th').at(1).find('button')).toHaveLength(1)
      // table模式
      let _wrapper = mount(<FilterDemo scrollMode='table' />)
      expect(_wrapper.find('.filterable th').at(1).find('button')).toHaveLength(1)
    });

    // it('<test prop:: format>', () => {
    //   filterColumn[6]["format"] = "YYYY年MM月DD日"
    //   let wrapper = mount(<FilterDemo columns={filterColumn}/>)
    //   // let wrapper = <div id='target' role='test'><FilterDemo columns={filterColumn}/></div>
    //   // expect(document.querySelector(`.${prefix}-picker-dropdown`)).toHaveLength(0);
    //   // expect(wrapper.find(`.${prefix}-picker-dropdown`)).toHaveLength(0)
    //   wrapper.find('thead tr').at(1).find('th').at(6).find(`.${prefix}-picker-input`).find('input').simulate('click')
    //   expect(document.querySelector(`.${prefix}-picker-dropdown`)).toHaveLength(1);
    //   // expect(wrapper.find('thead tr').at(1).find('th').at(6).find(`.${prefix}-picker`).html()).toBe()
    //   // expect(wrapper.find('thead tr').at(1).find('th').at(6).find(`.${prefix}-picker`).hasClass(`${prefix}-picker-focused`)).toBe(true)
    //   wrapper.find(`.${prefix}-picker-dropdown tbody td`).at(0).simulate('click')
    //   expect(wrapper.find(`.${prefix}-picker input`).at(0).prop('value').indexOf('年')).toBe(4)
    //   expect(wrapper.find(`.${prefix}-picker input`).at(0).prop('value').indexOf('月')).toBe(7)
    //   expect(wrapper.find(`.${prefix}-picker input`).at(0).prop('value').indexOf('日')).toBe(10)
    //    // table模式
    //   // let _wrapper = mount(<FilterDemo scrollMode='table' />)
    //   // expect(_wrapper.find(`.${prefix}-picker-dropdown`)).toHaveLength(0)
    //   // _wrapper.find(`DatePicker`).at(0).setState({ open: true })
    //   // expect(_wrapper.find(`.${prefix}-picker-dropdown`)).toHaveLength(1)
    //   // _wrapper.find(`.${prefix}-picker-dropdown tbody td`).at(0).simulate('click')
    //   // expect(_wrapper.find(`.${prefix}-picker input`).at(0).prop('value').indexOf('年')).toBe(4)
    //   // expect(_wrapper.find(`.${prefix}-picker input`).at(0).prop('value').indexOf('月')).toBe(7)
    //   // expect(_wrapper.find(`.${prefix}-picker input`).at(0).prop('value').indexOf('日')).toBe(10)
    // });

    // it('<test prop:: filterDropdownAuto>', () => {
    //   filterColumn[1]["filterDropdownAuto"] = 'auto'
    //   let wrapper = mount(<FilterDemo />)
    //   wrapper.find(`.${prefix}-select-selector`).simulate('click')
    //   expect(wrapper.find(`.${prefix}-select-item-option`)).toHaveLength(8)  
    //   // table模式   
    //   let _wrapper = mount(<FilterDemo scrollMode='table' />)
    //   _wrapper.find(`.${prefix}-select-selector`).simulate('click')
    //   expect(_wrapper.find(`.${prefix}-select-item-option`)).toHaveLength(8)  
    // });
    // it('<test prop:: filterDropdownData>', () => {
    //   filterColumn[1]["filterDropdownAuto"] = 'manual'
    //   filterColumn[1]["filterDropdownData"] = [{ key: "myKey", value: "myValue" }]
    //   let wrapper = mount(<FilterDemo />)
    //   wrapper.find(`.${prefix}-select-selector`).simulate('click')
    //   expect(wrapper.find(`.${prefix}-select-item-option`)).toHaveLength(1)
    //   expect(wrapper.find(`.${prefix}-select-item-option`).text()).toBe('myKey')
    //   // table模式   
    //   let _wrapper = mount(<FilterDemo scrollMode='table' />)
    //   _wrapper.find(`.${prefix}-select-selector`).simulate('click')
    //   expect(_wrapper.find(`.${prefix}-select-item-option`)).toHaveLength(1)
    //   expect(_wrapper.find(`.${prefix}-select-item-option`).text()).toBe('myKey')
    // });
    it('<test prop:: filterDropdownFocus>', async () => {
      const FilterDropdown = jest.fn();
      filterColumn[1]["filterDropdownFocus"] = FilterDropdown
      let wrapper = mount(<FilterDemo />)
      wrapper.find('.filterable th').at(1).find('input').simulate('focus')
      expect(FilterDropdown).toHaveBeenCalled();
      // table模式
      let _wrapper = mount(<FilterDemo scrollMode='table' />)
      _wrapper.find('.filterable th').at(1).find('input').simulate('focus')
      expect(FilterDropdown).toHaveBeenCalled();
    });
    it('<test prop:: filterDropdownType>', () => {
      filterColumn[1]["filterDropdown"] = 'show'
      filterColumn[1]["filterDropdownType"] = 'number'
      // let wrapper = mount(<FilterDemo />)
      // wrapper.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(wrapper.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(6)
      // expect(wrapper.find(`ul li`).at(0).text()).toBe('大于')
       // table模式
      // let _wrapper = mount(<FilterDemo scrollMode='table' />)
      // _wrapper.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(_wrapper.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(6)
      // expect(_wrapper.find(`ul li`).at(0).text()).toBe('大于')
    });
    it('<test prop:: filterDropdownType>', () => {
      filterColumn[1]["filterDropdownType"] = 'number'
      filterColumn[1]["filterDropdownIncludeKeys"] = ['EQ']
      // let wrapper1 = mount(<FilterDemo />)
      // wrapper1.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(wrapper1.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(1)
      // expect(wrapper1.find(`ul li`).at(0).text()).toBe('等于')
      // wrapper1.find(`.${prefix}-dropdown-menu li.${prefix}-dropdown-menu-item`).at(0).simulate('click')
      // expect(wrapper1.find(`.${prefixTable}-body tr`)).toHaveLength(8)
       // table模式
      // let _wrapper1 = mount(<FilterDemo scrollMode='table' />)
      // _wrapper1.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(_wrapper1.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(1)
      // expect(_wrapper1.find(`ul li`).at(0).text()).toBe('等于')
      // _wrapper1.find(`.${prefix}-dropdown-menu li.${prefix}-dropdown-menu-item`).at(0).simulate('click')
      // expect(_wrapper1.find(`.${prefixTable}-body tr`)).toHaveLength(8)
    });

    it('<test prop:: filterDropdownType>', () => {
      filterColumn[1]["filterDropdownType"] = 'number'
      filterColumn[1]["filterDropdownIncludeKeys"] = ['EQ']
       // table模式
      // let _wrapper1 = mount(<FilterDemo scrollMode='table' />)
      // _wrapper1.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(_wrapper1.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(1)
      // expect(_wrapper1.find(`ul li`).at(0).text()).toBe('等于')
      // _wrapper1.find(`.${prefix}-dropdown-menu li.${prefix}-dropdown-menu-item`).at(0).simulate('click')
      // expect(_wrapper1.find(`.${prefixTable}-body tr`)).toHaveLength(8)
    });

    it('<test prop:: filterDropdownType>', () => {
      filterColumn[1]["filterDropdownType"] = 'string'
      filterColumn[1]["filterDropdownIncludeKeys"] = undefined;
      // let wrapper1 = mount(<FilterDemo />)
      // wrapper1.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(wrapper1.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(6)
      // expect(wrapper1.find(`ul li`).at(0).text()).toBe('包含')
      //  // table模式
      // let _wrapper1 = mount(<FilterDemo scrollMode='table' />)
      // _wrapper1.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(_wrapper1.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(6)
      // expect(_wrapper1.find(`ul li`).at(0).text()).toBe('包含')
    });
    it('<test prop:: filterDropdownIncludeKeys>', () => {
      filterColumn[1]["filterDropdownIncludeKeys"] = ['LIKE', 'ULIKE', 'EQ']
      // let wrapper = mount(<FilterDemo />)
      // wrapper.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(wrapper.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(3)
      // expect(wrapper.find(`ul li`).at(0).text()).toBe('包含')
      // wrapper.find(`.${prefix}-dropdown-menu li.${prefix}-dropdown-menu-item`).at(0).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-body tr`)).toHaveLength(8)
      // table模式
      // let _wrapper = mount(<FilterDemo scrollMode='table' />)
      // _wrapper.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(_wrapper.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(3)
      // expect(_wrapper.find(`ul li`).at(0).text()).toBe('包含')
      // _wrapper.find(`.${prefix}-dropdown-menu li.${prefix}-dropdown-menu-item`).at(0).simulate('click')
      // expect(_wrapper.find(`.${prefixTable}-body tr`)).toHaveLength(8)
    });

    it('<test prop:: filterDropdownIncludeKeys>', () => {
      filterColumn[1]["filterDropdownIncludeKeys"] = ['LIKE', 'ULIKE', 'EQ']
      // table模式
      // let _wrapper = mount(<FilterDemo scrollMode='table' />)
      // _wrapper.find('.filterable th').at(1).find('button').at(0).simulate('click')
      // expect(_wrapper.find(`ul.${prefix}-dropdown-menu li`)).toHaveLength(3)
      // expect(_wrapper.find(`ul li`).at(0).text()).toBe('包含')
      // _wrapper.find(`.${prefix}-dropdown-menu li.${prefix}-dropdown-menu-item`).at(0).simulate('click')
      // expect(_wrapper.find(`.${prefixTable}-body tr`)).toHaveLength(8)
    });


    it('<test prop:: filterInputNumberOptions>', () => {
      filterColumn[3]["filterInputNumberOptions"] = { step: 2 }
      const mocEventTarget = {
        persist: () => { },
        nativeEvent: {
          stopPropagation: () => { },
          preventDefault: () => { },
        }
      }
      let wrapper = mount(<FilterDemo />)
      wrapper.find('.filterable th').at(3).find('.plus').simulate('mousedown', mocEventTarget)
      expect(wrapper.find('.filterable th').at(3).find('input').prop('value')).toBe("2")
      wrapper.find('.filterable th').at(3).find('.plus').simulate('mousedown', mocEventTarget)
      expect(wrapper.find('.filterable th').at(3).find('input').prop('value')).toBe("4")
      // table模式
      // let _wrapper = mount(<FilterDemo scrollMode='table' />)
      // _wrapper.find('.filterable th').at(3).find('.plus').simulate('mousedown', mocEventTarget)
      // expect(_wrapper.find('.filterable th').at(3).find('input').prop('value')).toBe("2")
      // _wrapper.find('.filterable th').at(3).find('.plus').simulate('mousedown', mocEventTarget)
      // expect(_wrapper.find('.filterable th').at(3).find('input').prop('value')).toBe("4")
    });
    it('<test prop:: filterInputNumberOptions>', () => {
      filterColumn[3]["filterInputNumberOptions"] = { step: 2 }
      const mocEventTarget = {
        persist: () => { },
        nativeEvent: {
          stopPropagation: () => { },
          preventDefault: () => { },
        }
      }
      // table模式
      let _wrapper = mount(<FilterDemo scrollMode='table' />)
      _wrapper.find('.filterable th').at(3).find('.plus').simulate('mousedown', mocEventTarget)
      expect(_wrapper.find('.filterable th').at(3).find('input').prop('value')).toBe("2")
      _wrapper.find('.filterable th').at(3).find('.plus').simulate('mousedown', mocEventTarget)
      expect(_wrapper.find('.filterable th').at(3).find('input').prop('value')).toBe("4")
    });
    it('<test prop:: onFilterChange>', async () => {
      const FilterChange = jest.fn();
      let wrapper = mount(<FilterDemo onFilterChange={FilterChange} />)
      wrapper.find('.filterable th').at(2).find('input').simulate('change', { target: { value: '供应商1' } })
      await sleep(500)
      expect(FilterChange).toHaveBeenCalled();
      expect(FilterChange.mock.calls[0]).toEqual(["supplierName", "供应商1", "EQ"])
      // table模式
      let _wrapper = mount(<FilterDemo onFilterChange={FilterChange} scrollMode='table' />)
      _wrapper.find('.filterable th').at(2).find('input').simulate('change', { target: { value: '供应商1' } })
      await sleep(500)
      expect(FilterChange).toHaveBeenCalled();
      expect(FilterChange.mock.calls[0]).toEqual(["supplierName", "供应商1", "EQ"])
    });
    it('<test prop:: onFilterClear>', () => {
      const FilterClear = jest.fn();
      let wrapper = mount(<FilterDemo onFilterClear={FilterClear} />)
      wrapper.find('.filterable th').at(2).find('input').simulate('change', { target: { value: '供应商1' } })
      wrapper.find('.filterable th').at(2).find('button').at(1).simulate('click')
      expect(FilterClear).toHaveBeenCalled();
      // table模式
      let _wrapper = mount(<FilterDemo onFilterClear={FilterClear} scrollMode='table' />)
      _wrapper.find('.filterable th').at(2).find('input').simulate('change', { target: { value: '供应商1' } })
      _wrapper.find('.filterable th').at(2).find('button').at(1).simulate('click')
      expect(FilterClear).toHaveBeenCalled();
    });
    it('<test prop:: filterDropdownOptions>', () => {
      let wrapper = mount(<FilterDemo/>)
      expect(wrapper.find('.filterable th').at(1).find(`.${prefix}-select`).find('span').at(3).hasClass(`${prefix}-select-clear`)).toBe(true)  
      expect(wrapper.find('.filterable th').at(4).find('div').length).toBe(1)
      expect(wrapper.find('.filterable th').at(12).find('button').at(0).hasClass(`${prefix}-switch-disabled`)).toBe(true)
      // table模式
      let _wrapper = mount(<FilterDemo scrollMode='table'/>)
      expect(_wrapper.find('.filterable th').at(1).find(`.${prefix}-select`).find('span').at(3).hasClass(`${prefix}-select-clear`)).toBe(true)  
      expect(_wrapper.find('.filterable th').at(4).find('div').length).toBe(1)
      expect(_wrapper.find('.filterable th').at(12).find('button').at(0).hasClass(`${prefix}-switch-disabled`)).toBe(true)
    });
    it('locale, en-us', () => {
      // let wrapper = mount(<FilterDemo locale={'en-us'}/>)
      // wrapper.find('.filterable th').at(2).find('button').at(0).simulate('click')
      // expect(wrapper.find(`.${prefix}-dropdown-menu-item`).at(0).text()).toBe('Include')
      // // table模式
      // let _wrapper = mount(<FilterDemo locale={'en-us'} scrollMode='table'/>)
      // _wrapper.find('.filterable th').at(2).find('button').at(0).simulate('click')
      // expect(_wrapper.find(`.${prefix}-dropdown-menu-item`).at(0).text()).toBe('Include')
    });
    
  })

  describe('大数据渲染功能测试', () => {
    const { bigData } = Table;
    const BigDataTable = bigData(Table);
    const bigColumns = [
      {
        title: '序号', dataIndex: 'index', key: 'index', width: 60, render(text, record, index) {
          return index + 1;
        }
      },

      { title: "用户名", dataIndex: "a", key: "a", width: 300 },
      { title: "性别", dataIndex: "b", key: "b", width: 80 },
      { title: "年龄", dataIndex: "c", key: "c", width: 200 }

    ];
    const bigDatas = [...new Array(10000)].map((e, i) => {
      const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
      return rs;
    })

    it('bigData should be render, <test prop:: originData>, <test prop:: bigColumns>, <test prop:: columnsLoadBuffer>, <test prop:: scroll, <test prop:: setRowHeight>>', () => {
      let wrapper = mount(<BigDataTable columns={bigColumns} data={bigDatas} scroll={{ y: 350 }} />)
      expect(wrapper.find('tbody tr')).toHaveLength(111)
      expect(wrapper.find('tbody tr').at(0).prop("data-row-key")).toBe('0')
      // wrapper.find(`div.${prefixTable}-content`).at(0).simulate('scroll');
      // expect(wrapper.find('tbody tr').at(0).prop("data-row-key")).not.toBe(0)
    });
    it('<test prop:: height>', () => {
      let wrapper = mount(<BigDataTable columns={bigColumns} data={bigDatas} height={50} scroll={{ y: 350 }} />)
      expect(wrapper.find(`tbody tr`).at(0).getDOMNode().style['height']).toBe("50px")
    });
    it('<test prop:: currentIndex>', () => {
      let wrapper = mount(<BigDataTable columns={bigColumns} data={bigDatas} scroll={{ y: 350 }} />)
      wrapper.setProps({ currentIndex: 100 })
      expect(wrapper.find('tbody tr').at(1).prop("data-row-key")).toBe('51')//因为此时loadBuffer缓冲区大小为50
    });
    it('<test prop:: loadBuffer>', () => {
      let wrapper = mount(<BigDataTable columns={bigColumns} data={bigDatas} scroll={{ y: 350 }} />)
      wrapper.setProps({ loadBuffer: 0 })
      expect(wrapper.find('tbody tr')).toHaveLength(111)
      wrapper.setProps({  loadBuffer: 0, currentIndex: 100 })
      expect(wrapper.find('tbody tr').at(1).prop("data-row-key")).toBe('51')
    });
    // it('<test prop:: onBodyScroll>', () => {
    //   const onBodyScroll = jest.fn()
    //   let wrapper = mount(<BigDataTable columns={bigColumns} data={bigDatas} height={50} scroll={{ y: 350 }} onBodyScroll={onBodyScroll}/>)
    //   wrapper.find(`.${prefixTable}-body`).simulate('scroll')
    //   // wrapper.find('Table').instance().handleBodyScroll({})
    //   expect(onBodyScroll).toHaveBeenCalled()
    // });
    it('init treeData', () => {    
      let _data = [...new Array(10000)].map((_e, i) => {
        const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
        if ([2, 4, 6, 50, 100, 101, 102].includes(i)) { // 模拟可展开的子行集合数据
            rs.children = [];
            for (let subj = 0; subj < 100; subj++) {
                rs.children.push({
                    a: 333 + ' ' + subj,
                    b: 333 + ' ' + subj,
                    c: 333 + ' ' + subj,
                    d: 333 + ' ' + subj,
                    key: i + `-${subj}`
                });
            }
        }
        return rs;
      })
      // const onExpand = jest.fn()
      let wrapper = mount(<BigDataTable columns={bigColumns} data={_data} scroll={{ y: 350 }}/>)
      // wrapper.find(`tbody tr`).at(2).find('td').at(0).find(`.${prefixTable}-row-expand-icon`).simulate('click')
      // expect(onExpand).toHaveBeenCalled();
    });

    it('treeData, <test prop:: isTree>', () => {
      let wrapper = mount(<BigDataTable columns={bigColumns} data={bigDatas} scroll={{ y: 350 }} isTree={true}/>)
      expect(wrapper.find('tbody tr')).toHaveLength(111)
      expect(wrapper.find('tbody tr').at(0).prop("data-row-key")).toBe('0')
      let _data = [...new Array(10000)].map((_e, i) => {
        const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
        if ([2, 4, 6, 50, 100, 101, 102].includes(i)) { // 模拟可展开的子行集合数据
            rs.children = [];
            for (let subj = 0; subj < 100; subj++) {
                rs.children.push({
                    a: 333 + ' ' + subj,
                    b: 333 + ' ' + subj,
                    c: 333 + ' ' + subj,
                    d: 333 + ' ' + subj,
                    key: i + `-${subj}`
                });
            }
        }
        return rs;
      })
      const onExpand = jest.fn()
      wrapper.setProps({ data: _data, onExpand: onExpand, height: 40, scroll: { y: 400 } })
      wrapper.find(`tbody tr`).at(2).find('td').at(0).find(`.${prefixTable}-row-expand-icon`).simulate('click')
      expect(onExpand).toHaveBeenCalled();
      wrapper.find(`tbody tr`).at(2).find('td').at(0).find(`.${prefixTable}-row-expand-icon`).simulate('click')
      expect(onExpand).toHaveBeenCalled();
      // wrapper.setProps({ expandedRowKeys: ['2'] })
      // expect(wrapper.find(`tbody tr`).at(1).html()).toBe()
      // // expect(wrapper.find(`BigDataX`).instance().expandedRowKeys[0]).toBe('2')
      // wrapper.setProps({ currentIndex: 2 })
      // expect(wrapper.find(`BigDataX`).state().scrollTop).toBe(80)
     
    });

    it('select treeData, <test prop:: autoSelect> ', () => {
      const columns = [
        {title: "员工编号", dataIndex: "a", key: "a", width: 150},
        {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
        {title: "性别", dataIndex: "c", key: "c", width: 100},
        {title: "部门", dataIndex: "d", key: "d", width: 100},
        {title: "职级", dataIndex: "e", key: "e", width: 100}
      ]
      const data = [
        {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务1科", e: "M1", key: "1"},
        {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "2", children: [
          {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "221"},
          {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "222", children: [
            {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "2221"},
            {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "2222"}
          ]},
        ]},
        {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务2科", e: "T2", key: "3"}
      ];
      const rowSelection = {
        type: 'checkbox'
      }
      let wrapper = mount(<Table columns={columns} data={data} rowSelection={rowSelection} autoSelect defaultExpandAllRows/>)
      wrapper.find(`tbody tr`).at(2).find('td').at(0).find(`input`).simulate('click')
      wrapper.find(`tbody tr`).at(3).find('td').at(0).find(`input`).simulate('click')
      // expect(wrapper.find(`tbody tr`).at(1).find('td').at(0).find(`.${prefix}-box`).hasClass('is-checked')).toBe(true)
      Array.from([1, 2, 3, 4, 5]).forEach((i, index) => {
        expect(wrapper.find(`tbody tr`).at(i).find('td').at(0).find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(true)
      })
    });
  })

  describe('单列定位功能测试', () => {
    const { singleFind } = Table;
    const SingleFindTable = singleFind(Table);
    let _columns = [...columns]
    
    it('singleFind has been set', () => {
      let wrapper = mount(<SingleFindTable columns={columns} data={data} />)
      expect(wrapper.find('thead th').at(0).exists('.uf-biaodansousuo')).toBe(true)
      wrapper.setProps({ columns: _columns })
      expect(wrapper.find('thead th').at(0).exists('.uf-biaodansousuo')).toBe(true)
    });
    it('<test prop:: singleFind>', () => {
      columns[0]['singleFind'] = false;
      let wrapper = mount(<SingleFindTable columns={columns} data={data} />)
      wrapper.setProps({ columns: columns })
      expect(wrapper.find('thead th').at(0).exists('.uf-biaodansousuo')).toBe(false)
    });
    it('the found row will be slected, <test prop:: findRowKeys>', () => {
      let wrapper = mount(<SingleFindTable columns={columns} data={data} />)
      wrapper.find('thead th').at(2).find('.uf-biaodansousuo').simulate('click')
      // expect(wrapper.exists(`.${prefix}-popover`)).toBe(true)
      // wrapper.find(`.${prefix}-popover`).find('input').simulate('change', { target: { value: '供应商1' } })
      // wrapper.find(`.${prefix}-popover`).find('.uf-search-light-2').simulate('click')
      // expect(wrapper.find('.find-selected')).toHaveLength(3)
      // data.forEach((item, index) => {
      //   expect(wrapper.find('tbody tr').at(index).hasClass('find-selected')).toBe(item.supplierName === '供应商1')
      // })

      // //点击上一个按钮
      // wrapper.find(`.${prefix}-popover`).find('.uf-shangyitiao-copy').simulate('click')
      // expect(document.querySelector(`.${prefix}-message-notice-description-content`).innerHTML).toEqual("已经是匹配的第一行！");

      // //点击下一个按钮
      // wrapper.find(`.${prefix}-popover`).find('.uf-xiayitiao-copy').simulate('click')
      // // expect(wrapper.state().currentIndex).toBe(2)
      // wrapper.find(`.${prefix}-popover`).find('.uf-xiayitiao-copy').simulate('click')
      // // expect(wrapper.state().currentIndex).toBe(6)
      // wrapper.find(`.${prefix}-popover`).find('.uf-xiayitiao-copy').simulate('click')
      // expect(document.querySelector(`.${prefix}-message-notice-description-content`).innerHTML).toEqual("已经是匹配的最后一行！");
    });
    it('warning when not found', () => {
      let wrapper = mount(<SingleFindTable columns={columns} data={data} />)
      wrapper.find('thead th').at(2).find('.uf-biaodansousuo').simulate('click')
      // wrapper.find(`.${prefix}-popover`).find('input').simulate('change', { target: { value: '不存在的值' } })
      // wrapper.find(`.${prefix}-popover`).find('.uf-search-light-2').simulate('click')
      // expect(document.querySelector(`.${prefix}-message-notice-description-content`).innerHTML).toEqual("未搜索到匹配的行！");
      // expect(wrapper.find('.find-selected')).toHaveLength(0)

      //数据更新后会重新搜索
      let newData = [...data, {
        orderCode: "notexist",
        supplierName: "不存在的值",
        type_name: "n",
        purchasing: '组织n',
        purchasingmoney: "4000",
        voucherDate: "2022年038月26日",
        key: "9"
      }]
      wrapper.setProps({ data: newData })
      wrapper.update()
      // expect(wrapper.find('.find-selected')).toHaveLength(1)
    });
    it('warning when not found', () => {
      let wrapper = mount(<SingleFindTable columns={columns} data={data} />)
      // wrapper.find('thead th').at(2).find('.uf-biaodansousuo').simulate('click')
      // expect(wrapper.exists(`.${prefix}-popover`)).toBe(true)

      // //点击退出搜索
      // wrapper.find(`.${prefix}-popover`).find('.uf-close').simulate('click')
      // expect(wrapper.exists(`.${prefix}-popover`)).toBe(false)
    });
  })


  describe('合计功能测试', () => {
    const { sum } = Table;
    const SumTable = sum(Table);
    //precision为精度值，默认为2
    //const SumTable = sum(Table,precision);
    columns[5]['sumCol'] = true;
    
    it('correct Sum, <test prop:: sumClassName>, <test prop:: showSum>', () => {
      let wrapper = mount(<SumTable columns={columns} data={data} sumClassName={'abc'}/>)
      expect(wrapper.find('tbody tr')).toHaveLength(8)
      expect(wrapper.find('tfoot tr').at(0).find('td').at(5).text()).toBe("72000.00")
      expect(wrapper.find(`.${prefixTable}-sum`).hasClass('abc')).toBe(true)
    });
    it('correct Sum when precision = 0', () => {
      let precision = 0;
      const SumTable = sum(Table, precision);
      let wrapper = mount(<SumTable columns={columns} data={data} />);
      expect(wrapper.find('tfoot tr').at(0).find('td').at(5).text()).toBe("72000");
    });
    //多列表头时,合计能正确计算
    it('treeData correct Sum, <test prop:: sumdata>', () => {
      let wrapper = mount(<SumTable columns={columns2} data={data2} />);
      expect(wrapper.find('tfoot tr').at(0).find('td').at(1).text()).toBe("450.00");
      expect(wrapper.find('tfoot tr').at(0).find('td').at(2).text()).toBe("50.00");
    });
    it('locale, en-us, <test prop:: locale>', () => {
      let wrapper = mount(<SumTable columns={columns} data={data2} locale={'en-us'}/>)
      expect(wrapper.find('tfoot tr').at(0).find('td').at(0).text()).toBe("Subtotal ");
    });
  })

  describe('测试行拖拽交换顺序', () => {
    it('rowDrag, <test prop:: rowDraggAble>', () => {
      let wrapper = mount(<Table columns={columns} data={data} rowDraggAble={true} />)
      expect(wrapper.find('th').at(0).hasClass("drag-handle-column")).toBe(true)
    });

    it('onDragRowStart should be called, <test prop:: onDragRowStart>', async () => {
      const DragRowStart = jest.fn();
      let wrapper = mount(<Table
        columns={columns}
        data={data}
        rowDraggAble={true}
        onDragRowStart={DragRowStart}
      />);
      // TODO
      // wrapper.find('Table').instance()._onRowDragStart({ "dragStartKey": "2", "dragStartIndex": "1" })
      // expect(DragRowStart).toHaveBeenCalled();
    });
    it('onDropRow should be called, <test prop:: onDropRow>', () => {
      const DropRow = jest.fn();
      let wrapper = mount(<Table
        columns={columns}
        data={data}
        rowDraggAble={true}
        onDropRow={DropRow}
      />);
      // TODO
      // wrapper.find('Table').instance()._onRowDragDrop({ "dragTargetKey": "2", "dragTargetIndex": "1", "dropTargetKey": "3", "dropTargetIndex": "0" })
      // expect(DropRow).toHaveBeenCalled();
      // //恢复数据顺序
      // wrapper.find('Table').instance()._onRowDragDrop({ "dragTargetKey": "2", "dragTargetIndex": "0", "dropTargetKey": "3", "dropTargetIndex": "1" })
    });
    it('<test prop:: useDragHandle>', () => {
      let wrapper = mount(<Table columns={columns} data={data} rowDraggAble={true} useDragHandle={true} />)
      expect(wrapper.find('tbody tr').at(0).prop('draggable')).toBe('false')
      expect(wrapper.find('tbody td').at(0).prop('draggable')).toBe(true)
    })
  })

  describe('测试单选功能', () => {
    const { singleSelect } = Table;
    let SingleSelectTable = singleSelect(Table, Radio);
    it('SingleSelectTable sucesess, <test prop:: selectType>', () => {
      let wrapper = mount(<SingleSelectTable columns={columns} data={data} />)
      expect(wrapper.find(`.${prefixTable}-cell-fix-left`).at(0).hasClass(`${prefixTable}-single-column`)).toBe(true)
      columns.forEach((item, index) => {
        expect(wrapper.find(`tr`).at(index).hasClass(`selected`)).toBe(false)
        expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(index).hasClass(`selected`)).toBe(false)
      })
      wrapper.find(`td.${prefixTable}-cell-fix-left`).at(0).simulate('click')
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(0).hasClass(`selected`)).toBe(true)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(0).hasClass(`selected`)).toBe(true)
      wrapper.find(`td.${prefixTable}-cell-fix-left`).at(1).simulate('click')
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(0).hasClass(`selected`)).toBe(false)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(0).hasClass(`selected`)).toBe(false)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(1).hasClass(`selected`)).toBe(true)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(1).hasClass(`selected`)).toBe(true)
    });
    it('<test prop:: selectedRowIndex>', () => {
      let wrapper = mount(<SingleSelectTable columns={columns} data={data} selectedRowIndex={2} />)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).hasClass(`selected`)).toBe(true)
      wrapper.setProps({selectedRowIndex: 1})
      // expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(1)).toMatchSnapshot()
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(1).getDOMNode().className).toContain('selected')
      // expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(1).hasClass(`selected`)).toBe(true)
    });
    it('<test cancel select>', () => {
      let wrapper = mount(<SingleSelectTable columns={columns} data={data} />)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).hasClass(`selected`)).toBe(false)
      wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).find(`td`).at(0).find(`input`).simulate('click')
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).hasClass(`selected`)).toBe(true)
      wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).find(`td`).at(0).find(`input`).simulate('click')
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).hasClass(`selected`)).toBe(false)
    });
    it('<test prop:: getSelectedDataFunc>', () => {
      const GetSelectedData = jest.fn();
      let wrapper = mount(<SingleSelectTable columns={columns} data={data} getSelectedDataFunc={GetSelectedData} />)
      wrapper.find(`td.${prefixTable}-cell-fix-left`).at(1).simulate('click')
      expect(GetSelectedData).toHaveBeenCalled();
      // expect(GetSelectedData.mock.calls[0][0]).toEqual(data[1])
    });
    it('<test prop:: autoCheckedByClickRows>', () => {
      let wrapper = mount(<SingleSelectTable columns={columns} data={data} autoCheckedByClickRows={false} />)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(0).hasClass(`selected`)).toBe(false)
      wrapper.find(`.${prefixTable}-scroll tbody tr`).at(0).simulate('click')
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(0).hasClass(`selected`)).toBe(false)
      wrapper.find(`.${prefixTable}-cell-fix-left input`).at(0).simulate('click')
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(0).hasClass(`selected`)).toBe(true)
    });
    it('<test prop:: rowSelection>', () => {
      const rowSelection = {
        columnTitle: 'myTitle',
        columnWidth: '100',
      }
      let wrapper = mount(<SingleSelectTable columns={columns} data={data} rowSelection={rowSelection} />)
      expect(wrapper.find(`.${prefixTable}-single-column`).at(0).text()).toBe("myTitle")
      // expect(wrapper.find(`.${prefixTable}-single-column`).at(0).getDOMNode().style['maxWidth']).toBe('100px')
      let _rowSelection = {
        columnTitle: 'myTitle',
        columnWidth: '100',
        selectedRowKeys: ['3']
      }
      wrapper.setProps({ rowSelection: _rowSelection })
      // expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).getDOMNode().class).toContain()
      // expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).getDOMNode().class).toContain(`selected`)
      // expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).hasClass(`selected`)).toBe(true)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(2).instance().className).toBe(`${prefixTable}-row selected`)
    })
  })

  describe('测试多选功能', () => {
    const { multiSelect } = Table;
    let MultiSelectTable = multiSelect(Table, Checkbox);
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<MultiSelectTable columns={columns} data={data} />);
    });
    afterEach(() => {
      data.forEach((item) => { item['_checked'] = false, item['_disabled'] = false });//清除选中和禁用状态
    });
    function isSelected(wrapper, index, isSelected = true) {
      expect(wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).at(index).hasClass(`is-checked`)).toBe(isSelected)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(index).hasClass(`selected`)).toBe(isSelected)
      expect(wrapper.find(`.${prefixTable}-scroll tbody tr`).at(index).hasClass(`selected`)).toBe(isSelected)
    };
    it('MultiSelectTable sucesess, <test prop:: selectType>', () => {
      expect(wrapper.find(`th.${prefixTable}-cell-fix-left`).at(0).hasClass(`${prefixTable}-multiSelect-column`)).toBe(true)
      data.forEach((item, index) => { isSelected(wrapper, index, false) });

      wrapper.find(`.${prefixTable}-scroll tbody input`).at(0).simulate('click')
      isSelected(wrapper, 0, true);

      //点击全选
      wrapper.find(`th.${prefixTable}-multiSelect-column input`).at(0).simulate('click')
      data.forEach((item, index) => { isSelected(wrapper, index, true) });

      //再次点击取消全选
      wrapper.find(`th.${prefixTable}-multiSelect-column input`).at(0).simulate('click')
      data.forEach((item, index) => { isSelected(wrapper, index, false) });
    });
    it('<test prop:: multiSelectConfig>', () => {
      wrapper.setProps({ multiSelectConfig: { className: "myCheckbox" } })
      expect(wrapper.find(`.${prefix}-checkbox`).at(0).hasClass(`myCheckbox`)).toBe(true)
    });
    it('<test prop:: getSelectedDataFunc>', () => {
      const GetSelectedData = jest.fn();
      wrapper.setProps({ getSelectedDataFunc: GetSelectedData })
      wrapper.find(`.${prefixTable}-scroll tbody input`).at(0).simulate('click')
      expect(GetSelectedData).toHaveBeenCalled();
      // expect(GetSelectedData.mock.calls[0][0]).toEqual([data[0]])
      // expect(wrapper.state().data[0]._checked).toBe(true)
    });
    [`.${prefixTable}-scroll tbody tr`,`.${prefixTable}-scroll tbody tr`].forEach((selector) => {
      it('<test prop:: autoCheckedByClickRows>', () => {
        wrapper.setProps({ autoCheckedByClickRows: false })
        isSelected(wrapper, 0, false);
        wrapper.find(selector).at(0).simulate('click')
        isSelected(wrapper, 0, false);

        wrapper.setProps({ autoCheckedByClickRows: true })
        wrapper.find(selector).at(0).simulate('click')
        isSelected(wrapper, 0, true);
      })
    });
    it('<test prop:: rowSelection>', () => {
      const rowSelection = {
        columnTitle: 'myTitle',
        columnWidth: '100',
      }
      wrapper.setProps({ rowSelection: rowSelection })
      expect(wrapper.find(`.${prefixTable}-multiSelect-column`).at(0).text()).toBe("myTitle")
      // expect(wrapper.find(`.${prefixTable}-multiSelect-column`).at(0).getDOMNode().style['maxWidth']).toBe('100px')
    });
    it('<test prop:: selectedRowKeys>', () => {
      const rowSelection = {
        selectedRowKeys: ['4'],
      }
      wrapper.setProps({ rowSelection: rowSelection })
      // let wrapper = mount(<MultiSelectTable columns={columns} data={data} rowSelection={rowSelection}/>);
      // expect(wrapper.find(`tbody tr`).at(3).find('td').at(0).find(`.${prefix}-checkbox`).getDOMNode().classList).toBe()
      expect(wrapper.find(`tbody tr`).at(3).find('td').at(0).find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(true)
      wrapper.setProps({ rowSelection: {selectedRowKeys: ['3']} })
      expect(wrapper.find(`tbody tr`).at(3).find('td').at(0).find(`.${prefix}-checkbox`).instance().className).toBe(`${prefix}-checkbox ${prefix}-checkbox-primary table-checkbox`)
      // expect(_wrapper.find(`tbody tr`).at(2).find('td').at(0).find(`.${prefix}-checkbox`).instance().className).toBe(`${prefix}-checkbox is-checked ${prefix}-checkbox-primary table-checkbox`)
      expect(wrapper.find(`tbody tr`).at(3).find('td').at(0).find(`.${prefix}-checkbox`).instance().classList.contains(`is-checked`)).toBe(false)
      expect(wrapper.find(`tbody tr`).at(2).find('td').at(0).find(`.${prefix}-checkbox`).instance().className).toContain(`is-checked`)
      // expect(_wrapper.find(`tbody tr`).at(3).find('td').at(0).find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(false)
      // expect(_wrapper.find(`tbody tr`).at(2).find('td').at(0).find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(true)
    });
    it('when row is disabled', () => {
      const rowSelection = { getCheckboxProps: (record) => ({ disabled: record.key == '3' }) }
      wrapper.setProps({ rowSelection: rowSelection })
      data.forEach((item, index) => { isSelected(wrapper, index, false) });

      //点击全选,disabled的行不被选中，其他都选中
      wrapper.find(`th.${prefixTable}-multiSelect-column input`).at(0).simulate('click')
      data.forEach((item, index) => { index === 2 ? isSelected(wrapper, index, false) : isSelected(wrapper, index, true) });
    });

    it('不再支持通过_disabled设置禁用', () => {
      data[3]['_disabled'] = true;
      wrapper.setProps({ data: data });
      wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).forEach((node) => {
        expect(node.hasClass(`is-checked`)).toBe(false)
      });

      //点击全选,全部选中
      wrapper.find(`th.${prefixTable}-multiSelect-column input`).at(0).simulate('click');
      data.forEach((item, index) => { isSelected(wrapper, index, true) });
    });
    it('<test prop:: rowSelection selections>', () => {
      const onSelect = jest.fn();
      const rowSelection = {
        selections: [{ key: 1, text: '1', onSelect: onSelect }]
      }
      wrapper.setProps({ rowSelection: rowSelection })
      // wrapper.find(`th.${prefixTable}-multiSelect-column .uf-anglearrowdown`).at(0).simulate('click')
      // expect(wrapper.find(`.${prefix}-dropdown`)).toHaveLength(1)
      // wrapper.find(`.${prefix}-dropdown-menu-item`).at(0).simulate('click')
      // expect(onSelect).toHaveBeenCalled()
    })
    it('<test prop:: rowSelection onChange onSelectAll>', () => {
      const onChange = jest.fn()
      const onSelectAll = jest.fn()
      const rowSelection = {
        onChange: onChange,
        onSelectAll: onSelectAll
      }
      wrapper.setProps({ rowSelection: rowSelection })
      // let _wrapper = mount(<MultiSelectTable columns={columns} data={[...data]} rowSelection={rowSelection}/>)
      wrapper.find(`.${prefixTable}-scroll tbody tr`).at(0).find('td').at(0).find('input').simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][0]).toEqual(['1'])

      //点击全选
      wrapper.find(`th.${prefixTable}-multiSelect-column input`).at(0).simulate('click')
      expect(onSelectAll).toHaveBeenCalled()
      expect(onSelectAll.mock.calls[0][0]).toEqual(true)
      expect(onSelectAll.mock.calls[0][1]).toEqual(data)

      expect(onChange.mock.calls[1][0]).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"])
    })
  })

  describe('lib/multiSelect 多选测试', () => {
    let MultiSelectTable = multiSelectOld(Table, Checkbox);
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<MultiSelectTable columns={columns} data={data} />);
    });
    afterEach(() => {
      data.forEach((item) => { item['_checked'] = false, item['_disabled'] = false });//清除选中和禁用状态
    });
    it('MultiSelectTable sucesess, <test prop:: _checked>', () => {
      expect(wrapper.find(`th.${prefixTable}-cell-fix-left`).at(0).hasClass(`${prefixTable}-multiSelect-column`)).toBe(true)
      wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).forEach((node) => {
        expect(node.hasClass(`is-checked`)).toBe(false)
      })

      wrapper.find(`.${prefixTable}-scroll tbody input`).at(0).simulate('click')
      expect(wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).at(0).hasClass(`is-checked`)).toBe(true)

      //点击全选
      wrapper.find(`th.${prefixTable}-multiSelect-column input`).at(0).simulate('click')
      wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).forEach((node) => {
        expect(node.hasClass(`is-checked`)).toBe(true)
      })

      //再次点击取消全选
      wrapper.find(`th.${prefixTable}-multiSelect-column input`).at(0).simulate('click')
      wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).forEach((node) => {
        expect(node.hasClass(`is-checked`)).toBe(false)
      })
    });
    it('when row is disabled, <test prop:: _disabled>', () => {
      data[3]['_disabled'] = true;
      wrapper.setProps({ data: data })
      wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).forEach((node) => {
        expect(node.hasClass(`is-checked`)).toBe(false)
      })

      //点击全选,disabled的行不被选中，其他都选中
      wrapper.find(`th.${prefixTable}-multiSelect-column input`).at(0).simulate('click')
      wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).forEach((node, index) => {
        index == 3 ? expect(node.hasClass(`is-checked`)).toBe(false) : expect(node.hasClass(`is-checked`)).toBe(true)
      })
    });
    it('<test prop:: multiSelectConfig> 自定义Checkbox属性', () => {
      wrapper.setProps({ multiSelectConfig: { className: "myCheckbox" } })
      expect(wrapper.find(`.${prefix}-checkbox`).at(0).hasClass(`myCheckbox`)).toBe(true)
    });
    it('<test prop:: getSelectedDataFunc>', () => {
      const GetSelectedData = jest.fn();
      wrapper.setProps({ getSelectedDataFunc: GetSelectedData })
      wrapper.find(`.${prefixTable}-scroll tbody input`).at(0).simulate('click')
      expect(GetSelectedData).toHaveBeenCalled();
      // expect(GetSelectedData.mock.calls[0][0]).toEqual([wrapper.state().data[0]])
    });
    [`.${prefixTable}-scroll tbody tr`,`.${prefixTable}-scroll tbody tr`].forEach((selector) => {
      it('<test prop:: autoCheckedByClickRows>', () => {
        wrapper.setProps({ autoCheckedByClickRows: false })
        expect(wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).at(0).hasClass(`is-checked`)).toBe(false)
        wrapper.find(selector).at(0).simulate('click')
        expect(wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).at(0).hasClass(`is-checked`)).toBe(false)

        wrapper.setProps({ autoCheckedByClickRows: true })
        wrapper.find(selector).at(0).simulate('click')
        expect(wrapper.find(`.${prefixTable}-scroll tbody .${prefix}-checkbox`).at(0).hasClass(`is-checked`)).toBe(true)
      });
    });
    it('<test prop:: rowSelection>', () => {
      const rowSelection = {
        columnTitle: 'myTitle',
        columnWidth: '100',
        hideSelectAll: true,
      }
      wrapper.setProps({ rowSelection: rowSelection })
      expect(wrapper.find(`.${prefixTable}-multiSelect-column`).at(0).text()).toBe("myTitle")
      // expect(wrapper.find(`.${prefixTable}-multiSelect-column`).at(0).getDOMNode().style['maxWidth']).toBe('100px')
      expect(wrapper.find(`th.${prefixTable}-multiSelect-column`).exists(`input`)).toBe(false)
    })
    it('<test prop:: rowSelection selections>', () => {
      const onSelect = jest.fn();
      const rowSelection = {
        selections: [{ key: 1, text: '1', onSelect: onSelect }]
      }
      wrapper.setProps({ rowSelection: rowSelection })
      // wrapper.find(`th.${prefixTable}-multiSelect-column .uf-anglearrowdown`).at(0).simulate('click')
      // expect(wrapper.find(`.${prefix}-dropdown`)).toHaveLength(1)
      // wrapper.find(`.${prefix}-dropdown-menu-item`).at(0).simulate('click')
      // expect(onSelect).toHaveBeenCalled()
    })
  })

  describe('测试快捷键功能', () => {
    function keyDown(keyCode) {
      let el = document.querySelector(`.${prefixTable}`)
      keyEvent(el, 'keydown', keyCode, true)
    };
    it('<test prop:: focusable>, <test prop:: tabIndex>', () => {
      let wrapper = mount(<Table columns={columns} data={data}/>);
      expect(wrapper.find(`.${prefixTable}`).at(0).getDOMNode().tabIndex).toBe(-1);
      wrapper.setProps({ focusable: true });
      expect(wrapper.find(`.${prefixTable}`).at(0).getDOMNode().tabIndex).toBe(0);
      wrapper.setProps({ focusable: true, tabIndex: 1 });
      expect(wrapper.find(`.${prefixTable}`).at(0).getDOMNode().tabIndex).toBe(1);
    });
    it('<test prop:: onKeyTab>', () => {
      const onKeyTab = jest.fn();
      mount(<Table columns={columns} data={data} onKeyTab={onKeyTab} focusable={true}/>, { attachTo: document.body });
      document.querySelector(`.${prefixTable}`).dispatchEvent(new FocusEvent('focus'));
      expect(onKeyTab).toBeCalled();
    });

    it('<test prop:: onKeyTab>', () => {
      const onKeyTab = jest.fn();
      mount(<Table columns={columns} scrollMode='table' data={data} onKeyTab={onKeyTab} focusable={true} />, { attachTo: document.body });
      document.querySelector(`.${prefixTable}`).dispatchEvent(new FocusEvent('focus'));
      expect(onKeyTab).toBeCalled();
    });

    it('<test prop:: onKeyDown>', () => {
      const onKeyDown = jest.fn();
      mount(<Table columns={columns} data={data} onKeyDown={onKeyDown} focusable={true} />, { attachTo: document.body });
      keyDown(40);
      expect(onKeyDown).toBeCalled();
    });

    it('<test prop:: onKeyDown>', () => {
      const onKeyDown = jest.fn();
      mount(<Table columns={columns} scrollMode='table' data={data} onKeyDown={onKeyDown} focusable={true} />, { attachTo: document.body });
      keyDown(40);
      expect(onKeyDown).toBeCalled();
    });
    it('<test prop:: onKeyUp>', () => {
      const onKeyUp = jest.fn();
      mount(<Table columns={columns} data={data} onKeyUp={onKeyUp} focusable={true} />, { attachTo: document.body });
      keyDown(38);
      expect(onKeyUp).toBeCalled();
    });

    it('<test prop:: onKeyUp>', () => {
      const onKeyUp = jest.fn();
      mount(<Table columns={columns} scrollMode='table' data={data} onKeyUp={onKeyUp} focusable={true} />, { attachTo: document.body });
      keyDown(38);
      expect(onKeyUp).toBeCalled();
    });

    it('<test prop:: onTableKeyDown>', () => {
      const onTableKeyDown = jest.fn();
      mount(<Table columns={columns} data={data} onTableKeyDown={onTableKeyDown} focusable={true} />, { attachTo: document.body });
      keyDown();
      expect(onTableKeyDown).toBeCalled();
    });

    it('<test prop:: onTableKeyDown>', () => {
      const onTableKeyDown = jest.fn();
      mount(<Table columns={columns} scrollMode='table' data={data} onTableKeyDown={onTableKeyDown} focusable={true} />, { attachTo: document.body });
      keyDown();
      expect(onTableKeyDown).toBeCalled();
    });

  })

  //rendertype test
  describe('InputRender test', () => {
    it('<test prop:: value>', () => {
      let wrapper = mount(<InputRender value={123} />)
      expect(wrapper.find(`.editable-cell-text-wrapper`).text()).toBe('123')
      wrapper.find(`.uf-pencil`).simulate('click')
      expect(wrapper.find(`input`).props().value).toBe('123')
    });
    it('<test prop:: check>', () => {
      const check = jest.fn()
      let wrapper = mount(<InputRender check={check} />)
      wrapper.find(`.uf-pencil`).simulate('click')
      wrapper.find(`.uf-correct`).simulate('click')
      expect(check).toBeCalled()
    });
    it('<test prop:: onChange>', () => {
      const onChange = jest.fn()
      let wrapper = mount(<InputRender value={123} onChange={onChange} />)
      wrapper.find(`.uf-pencil`).simulate('click')
      wrapper.find(`input`).simulate('change', { target: { value: '111' } });
      // expect(onChange).toBeCalledWith()
    });
    it('<test prop:: name>', () => {
      let wrapper = mount(<InputRender name='myInput' />)
      wrapper.find(`.uf-pencil`).simulate('click')
      expect(wrapper.find(`input`).props().name).toBe('myInput')
    });
    it('<test prop:: placeholder>', () => {
      let wrapper = mount(<InputRender placeholder='myPlaceholder' />)
      wrapper.find(`.uf-pencil`).simulate('click')
      expect(wrapper.find(`input`).props().placeholder).toBe('myPlaceholder')
    });
    it('<test prop:: formItemClassName>', () => {
      let wrapper = mount(<InputRender formItemClassName='testClass' />)
      wrapper.find(`.uf-pencil`).simulate('click')
      expect(wrapper.find(`.${prefix}-form-item`).at(0).hasClass('testClass')).toBe(true)
    });
    it('<test prop:: mesClassName>', () => {
      let wrapper = mount(<InputRender mesClassName='testClass' />)
      wrapper.find(`.uf-pencil`).simulate('click')
      // expect(wrapper.find(`.${prefix}-form-item`).at(0).props().mesClassName).toBe("errMessage-style testClass")
    });
    it('<test prop:: isclickTrigger>', () => {
      let wrapper = mount(<InputRender isclickTrigger={true} />)
      expect(wrapper.exists(`.uf-pencil`)).toBe(false)
      expect(wrapper.exists(`input`)).toBe(false)
      wrapper.find(`.editable-cell-text-wrapper`).simulate('click')
      expect(wrapper.exists(`input`)).toBe(true)
    });
    it('<test prop:: format>', () => {
      let wrapper = mount(<InputRender format='Currency' value={123} />)
      expect(wrapper.find(`.editable-cell-text-wrapper`).text()).toBe('123.00')
      // wrapper.setState({ value: 0 })
      // expect(wrapper.find(`.editable-cell-text-wrapper`).text()).toBe('0.00')
      // wrapper.setState({ value: undefined })
      // expect(wrapper.find(`.editable-cell-text-wrapper`).text()).toBe(' ')
      // wrapper.setState({ value: -5 })
      // expect(wrapper.find(`.editable-cell-text-wrapper`).text()).toBe('-5.00')
    });
  })

  describe('DateRender test', () => {
    it('<test prop:: value>', () => {
      let wrapper = mount(<DateRender value={'2022-08-04'} />)
      expect(wrapper.find(`.editable-cell-text-wrapper`).text()).toBe('2022-08-04')
      wrapper.find(`.uf-pencil`).simulate('click')
      expect(wrapper.find(`input`).props().value).toBe('2022-08-04')
    });
    it('<test prop:: onChange>', () => {
      const onChange = jest.fn()
      let wrapper = mount(<DateRender onChange={onChange} />)
      wrapper.find(`.uf-pencil`).simulate('click')
      wrapper.find('input').simulate('change', { target: { value: '2022-00-00' } })
      expect(wrapper.find('input').prop('value')).toBe('2022-00-00')
      wrapper.find('input').simulate('keydown', {
        keyCode: 13
      })
      expect(onChange).toBeCalledWith("2022-01-01T00:00:00+08:00")
    });
    it('<test prop:: isclickTrigger>', () => {
      let wrapper = mount(<DateRender isclickTrigger={true} />)
      expect(wrapper.exists(`.uf-pencil`)).toBe(false)
      expect(wrapper.exists(`input`)).toBe(false)
      wrapper.find(`.editable-cell-text-wrapper`).simulate('click')
      expect(wrapper.exists(`input`)).toBe(true)
    });
    it('<test prop:: type>', () => {
      let wrapper = mount(<DateRender value={'2022-08-04'} />)
      wrapper.find(`.uf-pencil`).simulate('click')
      expect(wrapper.find(`input`).props().value).toBe('2022-08-04')
      wrapper.setProps({ type: 'monthpicker' })
      wrapper.update()
      expect(wrapper.find(`input`).props().value).toBe('2022-08')
      wrapper.setProps({ type: 'weekpicker' })
      wrapper.update()
      expect(wrapper.find(`input`).props().value).toBe('2022-31周')//2022年第31周
    });
  })

  // describe('SelectRender test', () => {
  //   const dataSource = [{ key: "张三", value: "1" }, { key: "李四", value: "2" }]
  //   let wrapper;
  //   it('<test prop:: dataSource>, <test prop:: value>', () => {
  //     wrapper = mount(
  //       <SelectRender value='1'>
  //         <Select.Option value='1'>1</Select.Option>
  //         <Select.Option value='2'>2</Select.Option>
  //       </SelectRender>
  //     )
  //     expect(wrapper.find(`.editable-cell`).text()).toBe('1')
  //     wrapper.setProps({ dataSource: dataSource })
  //     expect(wrapper.find(`.editable-cell`).text()).toBe('张三')
  //     wrapper.find(`.uf-pencil`).simulate('click')
  //     expect(wrapper.find(`.${prefix}-select-selection-item`).text()).toBe('1')
  //   });
  //   it('<test prop:: onChange>', async () => {
  //     const onChange = jest.fn()
  //     wrapper.setProps({ onChange: onChange })
  //     wrapper.find('input').simulate('click')
  //     wrapper.find(`.${prefix}-select-item-option`).at(1).simulate('click')
  //     expect(wrapper.find(`.${prefix}-select-selection-item`).text()).toBe('2')
  //     expect(onChange).toHaveBeenCalledWith('2')
  //     await sleep(100)
  //     expect(wrapper.find(`.editable-cell`).text()).toBe('李四')
  //   });
  //   it('<test prop:: onBlur>', async () => {
  //     const onBlur = jest.fn()
  //     wrapper.setProps({ onBlur: onBlur })
  //     wrapper.find(`.uf-pencil`).simulate('click')
  //     wrapper.find('input').simulate('blur')
  //     expect(onBlur).toHaveBeenCalled()
  //     wrapper.find(`.uf-correct`).simulate('click')
  //   });
  //   it('<test prop:: isclickTrigger>', () => {
  //     wrapper.setProps({ isclickTrigger: true })
  //     expect(wrapper.exists(`.uf-pencil`)).toBe(false)
  //     expect(wrapper.exists(`input`)).toBe(false)
  //     wrapper.find(`.editable-cell-text-wrapper`).simulate('click')
  //     expect(wrapper.exists(`input`)).toBe(true)
  //     wrapper.find(`input`).simulate('focus')
  //     wrapper.find(`input`).simulate('blur')
  //   });
  // })

  // describe('CheckboxRender test', () => {
  //   let wrapper;
  //   it('<test prop:: value>', () => {
  //     wrapper = mount(<CheckboxRender value={'1'} />)
  //     expect(wrapper.find(`.editable-cell`).text()).toBe('1')
  //     wrapper.find(`.uf-pencil`).simulate('click')
  //     expect(wrapper.find(`input[type="checkbox"]`).instance().value).toBe('1')
  //   });
  //   it('<test prop:: onChange>', async () => {
  //     const onChange = jest.fn()
  //     wrapper.setProps({ onChange: onChange })
  //     wrapper.find('input').simulate('keydown', { keyCode: 13 })
  //     expect(onChange).toHaveBeenCalledWith('1')
  //   });
  // })

  describe('lib/sort 排序测试', () => {
    const { sort } = Table;
    const SortTable = sort(Table);
    const sorterName = (a, b) => a.name >= b.name ? 1 : -1;
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name', sorter: sorterName, },
      { title: 'Age', dataIndex: 'age', key: 'age' }
    ];

    const data = [
      { key: 0, name: 'Jack', age: 25 },
      { key: 1, name: 'Lucy', age: 21 },
      { key: 2, name: 'Tom', age: 32 },
      { key: 3, name: 'Jerry', age: 19 }
    ];

    function renderedText(wrapper, index = 0) {
      const textList = [];
      wrapper.find(`.${prefixTable}-tbody tr`).forEach(tr => {
        textList.push(tr.find('td').at(index).text());
      });
      return textList;
    };

    it('render correctly', () => {
      let wrapper = mount(<SortTable columns={columns} data={data} />);
      expect(renderedText(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
      expect(wrapper.find(`.${prefixTable}-thead th`).at(0).exists(`.${prefixTable}-column-sorter`)).toBe(true);
    });
    it('sort by click', () => {
      const sorterClick = jest.fn();
      let wrapper = mount(<SortTable columns={[{ ...columns[0], sorterClick: sorterClick }]} data={data} />);
      wrapper.find(`.${prefixTable}-column-sorter`).find(`.uf-triangle-up`).simulate('click');
      expect(renderedText(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);
      expect(sorterClick.mock.calls[0][1]).toBe('up');

      wrapper.find(`.${prefixTable}-column-sorter`).find(`.uf-triangle-down`).simulate('click');
      expect(renderedText(wrapper)).toEqual(["Tom", "Lucy", "Jerry", "Jack"]);
      expect(sorterClick.mock.calls[1][1]).toBe('down');
    });
    it('sort order ascend', () => {
      let wrapper = mount(<SortTable columns={[{ ...columns[0], order: 'ascend' }]} data={data} />);
      expect(renderedText(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);
    });
    it('sort order decend', () => {
      let wrapper = mount(<SortTable columns={[{ ...columns[0], order: 'descend' }]} data={data} />);
      expect(renderedText(wrapper)).toEqual(["Tom", "Lucy", "Jerry", "Jack"]);
    });
    it('The data needs to be reordered after it has been updated', () => {
      let wrapper = mount(<SortTable columns={[{ ...columns[0], order: 'ascend' }]} data={data} />);
      expect(renderedText(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);

      wrapper.setProps({ data: [...data, { key: 5, name: 'Mark' }] });
      wrapper.update();
      expect(renderedText(wrapper)).toEqual(["Jack", "Jerry", "Lucy", "Mark", "Tom"]);
    });
    
    it('sortEnable', () => {
      columns[1]['sortEnable'] = true;//开启默认排序
      let wrapper = mount(<SortTable columns={columns} data={data} />);
      expect(wrapper.find(`.${prefixTable}-thead th`).at(1).exists(`.${prefixTable}-column-sorter`)).toBe(true);
      expect(renderedText(wrapper, 1)).toEqual(["25", "19", "21", "32"]);//初始顺序
      wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click');
      expect(renderedText(wrapper, 1)).toEqual(["32", "25", "21", "19"]);//sortEnable 默认排序
      wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click');
      expect(renderedText(wrapper, 1)).toEqual(["25", "19", "21", "32"]);//再次点击,恢复初始顺序
    });
    it('sortEnable', () => {
      //优先级低于sorter属性
      const sorterAge = (a, b) => b.age - a.age;//自定义排序
      columns[1]['sorter'] = sorterAge;
      let wrapper = mount(<SortTable columns={columns} data={data} />)
      wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click');
      expect(renderedText(wrapper, 1)).toEqual(["19", "21", "25", "32"]);
    });
    it('sort.mode single, <test prop:: sort>, <test prop:: mode>', () => {
      const sorterAge = (a, b) => b.age - a.age;//自定义排序
      columns[1]['sorter'] = sorterAge;
      columns.forEach(column => column['order'] = '');//清空排序状态
      let wrapper = mount(<SortTable columns={columns} data={data} sort={{ mode: 'single' }} />);
      wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click');//按Name排序
      expect(renderedText(wrapper)).toEqual(["Tom", "Lucy", "Jerry", "Jack"]);
      expect(renderedText(wrapper, 1)).toEqual(["32", "21", "19", "25"]);

      // 单列排序，清空其他列的排序
      wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click');//按Age排序
      expect(renderedText(wrapper)).toEqual(["Jerry", "Lucy", "Jack", "Tom"]);
      expect(renderedText(wrapper, 1)).toEqual(["19", "21", "25", "32"]);
    });
    
    it('sort.mode multiple, <test prop:: sort>, <test prop:: mode>, <test prop:: backSource>, <test prop:: sortFun>', () => {
      const sorterAge = (a, b) => b.age - a.age;//自定义排序
      columns[1]['sorter'] = sorterAge;
      columns.forEach(column => column['order'] = '');//清空排序状态
      const sortFun = jest.fn();
      let wrapper = mount(<SortTable columns={columns} data={data} sort={{ mode: 'multiple', sortFun: sortFun }} />);
      wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click');//按Name排序
      expect(renderedText(wrapper)).toEqual(["Tom", "Lucy", "Jerry", "Jack"]);
      expect(renderedText(wrapper, 1)).toEqual(["32", "21", "19", "25"]);
      expect(wrapper.find(`.${prefixTable}-thead th`).at(0).find(`.${prefixTable}-column-sorter-num`).text()).toBe('1');

      // 多列排序,不会清空第一次排序的结果
      wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click');//按Age排序
      expect(renderedText(wrapper)).toEqual(["Tom", "Lucy", "Jerry", "Jack"]);
      expect(renderedText(wrapper, 1)).toEqual(["32", "21", "19", "25"]);
      expect(wrapper.find(`.${prefixTable}-thead th`).at(1).find(`.${prefixTable}-column-sorter-num`).text()).toBe('2');

      wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click');//再次点击,取消按Name排序,
      expect(wrapper.find(`.${prefixTable}-thead th`).at(0).find(`.${prefixTable}-column-sorter-num`).text()).toBe('');
      expect(wrapper.find(`.${prefixTable}-thead th`).at(1).find(`.${prefixTable}-column-sorter-num`).text()).toBe('1');

      //此时,按Age排序起作用
      expect(renderedText(wrapper)).toEqual(["Jerry", "Lucy", "Jack", "Tom"]);
      expect(renderedText(wrapper, 1)).toEqual(["19", "21", "25", "32"]);

      //backSource默认为false,此时sortFun接受三个参数:sortCol, data, oldData
      expect(sortFun.mock.calls[0]).toEqual([
        [{ "field": "name", "order": "descend", "orderNum": 1 }],
        [{ "age": 19, "key": 3, "name": "Jerry" }, { "age": 21, "key": 1, "name": "Lucy" }, { "age": 25, "key": 0, "name": "Jack" }, { "age": 32, "key": 2, "name": "Tom" }],
        [{ "age": 19, "key": 3, "name": "Jerry" }, { "age": 21, "key": 1, "name": "Lucy" }, { "age": 25, "key": 0, "name": "Jack" }, { "age": 32, "key": 2, "name": "Tom" }]
      ]);
      sortFun.mockClear();

      //backSource设置为true,此时sortFun接受一个参数:sortCol
      wrapper.setProps({ sort: { mode: 'multiple', backSource: true, sortFun: sortFun } });
      wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click');
      expect(sortFun.mock.calls[0]).toEqual([[{ "field": "name", "order": "descend", "orderNum": 2 }, { "field": "age", "order": "descend", "orderNum": 1 }]]);

      //在多选情况下,改变columns,使第一列不支持排序
      const columns2 = [{ title: 'Name', dataIndex: 'name', key: 'name', }, { title: 'Age', dataIndex: 'age', key: 'age', sortEnable: true }];
      wrapper.setProps({ columns: columns2 });
      expect(wrapper.find(`.${prefixTable}-thead th`).at(0).exists(`.${prefixTable}-column-sorter`)).toBe(false);
      expect(wrapper.find(`.${prefixTable}-thead th`).at(1).exists(`.${prefixTable}-column-sorter`)).toBe(true);
    });

    it('sort, <test prop:: sortDirections>, <test prop:: showSorterTooltip>', () => {
      const _columns = [{
          title: "单据编号",
          dataIndex: "num",
          key: "num",
          width: 120,
      },
      {
          title: "单据日期",
          dataIndex: "date",
          key: "date",
          width: 200,
      },
      {
          title: "供应商",
          dataIndex: "supplier",
          key: "supplier",
          width: 100
      },
      {
          title: "联系人",
          dataIndex: "contact",
          key: "contact",
      },
      {
          title: "整单数量",
          dataIndex: "total",
          key: "total",
          width: 150,
          sorter: (a, b) => a.total - b.total,
          order: 'descend'
      }]
      const _data = [
        { num: "NU0391001", date: "2019-03-01", supplier: 'xx供应商', contact: 'Tom', total: 30, key: "1" },
        { num: "NU0391002", date: "2018-11-02", supplier: 'yy供应商', contact: 'Jack', total: 41, key: "2" },
        { num: "NU0391003", date: "2019-05-03", supplier: 'zz供应商', contact: 'Jane', total: 25, key: "3" }
      ];
      let wrapper = mount(<SortTable columns={_columns} data={_data} sortDirections={['descend']} showSorterTooltip/>);
      expect(wrapper.find('th').at(4).find(`.${prefixTable}-column-sorter`).hasClass(`${prefixTable}-column-sorter-active`)).toBe(true);
      expect(wrapper.find('th').at(4).find(`.${prefixTable}-column-sorter`).find(`i`)).toHaveLength(1);
      // expect(wrapper.find('th').at(4).find(`.${prefixTable}-column-sorter`).find(`i`).prop('date-for-wui-tooltip')).toHaveLength(1);
    })
  })

  describe('lib/singleFilter 单列筛选', () => {
    const { singleFilter } = Table;
    const SingleFilterTable = singleFilter(Table);
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 80,
        fixed: 'left',
        singleFilter: false,
        render(_text,  _record, index) {
            return index + 1
        }
    },
    {
        title: "订单编号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 100,
        fixed: 'left',
        singleFilter: false,
        required: true
    },
    {
        title: "供应商名称",
        dataIndex: "supplierName",
        key: "supplierName",
        width: 150,
        required: true,
        filterMultiple: false
    },
    {
      title: "类型",
      dataIndex: "typeName",
      key: "typeName",
      width: 100,
      onFilter: (value, record) => {
          return record.typeName == value;
      }
    },
    ];

    const data = [
      {
          orderCode: "1",
          supplierName: "1",
          typeName: "1",
          purchasing: "1"
      },
      {
          orderCode: "2",
          supplierName: "2",
          typeName: "2",
          purchasing: "2"
      },
      {
          orderCode: "3",
          supplierName: "3",
          typeName: "3",
          purchasing: "3"
      }, 
      {
          orderCode: "4",
          supplierName: "4",
          typeName: "4",
          purchasing: "4"
      },
      {
          orderCode: "5",
          supplierName: "5",
          typeName: "5",
          purchasing: "5"
      },
      {
          orderCode: "6",
          supplierName: "6",
          typeName: "6",
          purchasing: "6"
      },
      {
          orderCode: "7",
          supplierName: "7",
          typeName: "7",
          purchasing: "7"
      }, 
      {
          orderCode: "8",
          supplierName: "8",
          typeName: "8",
          purchasing: "8"
      },
      {
        orderCode: "9",
        supplierName: "9",
        typeName: "9",
        purchasing: "9"
      },
      {
          orderCode: "10",
          supplierName: "10",
          typeName: "10",
          purchasing: "10"
      },
      {
          orderCode: "11",
          supplierName: "11",
          typeName: "11",
          purchasing: "11"
      }
    ];

    function renderedText(wrapper, index = 0) {
      const textList = [];
      wrapper.find(`.${prefixTable}-tbody tr`).forEach(tr => {
        textList.push(tr.find('td').at(index).text());
      });
      return textList;
    };

    it('render correctly', () => {
      let wrapper = mount(<SingleFilterTable columns={columns} data={data} />);
      expect(renderedText(wrapper, 1)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
      expect(renderedText(wrapper, 2)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
    });

    it('support search and clearset', async () => {
      let wrapper = mount(<SingleFilterTable columns={columns} data={data} />)
      wrapper.find(`.uf-shaixuan1-copy`).at(1).simulate('click')
      await sleep(100)
      // wrapper.find(`.${prefix}-input-search input`).simulate('change', { target: { value: '1' } })
      // expect(wrapper.find(`.${prefixTable}-pop-check-wrap`)).toHaveLength(3)
      

      // wrapper.find(`.${prefix}-input-search input`).simulate('change', { target: { value: ' ' } })
      // expect(wrapper.find(`.${prefixTable}-pop-check-wrap`)).toHaveLength(11)

    });

    it('filter column', () => {
      let wrapper = mount(<SingleFilterTable columns={columns} data={data} />);
      expect(wrapper.find(`.${prefixTable}-column-single-filter`)).toHaveLength(2)
    });

    it('filter all and clear all', async () => {
      let wrapper = mount(<SingleFilterTable columns={columns} data={data} />);
      wrapper.find(`.uf-shaixuan1-copy`).at(1).simulate('click')
      await sleep(100)
      // 判断是否全选
      wrapper.find(`.${prefixTable}-pop-check-wrap`).forEach((item, index) => {
        expect(item.find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(true)
      })
      // 点击清空全选

      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).find(`input`).at(0).simulate('click')
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).forEach((item, index) => {
      //   expect(item.find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(false)
      // })
      // expect(wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).at(0).hasClass('is-checked')).toBe(false)
      // TODO: 无法触发
      // expect(wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).at(0).find(`.${prefixTable}-filter-box-left-checked-num`).text()).toBe("0")
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).find(`input`).at(0).simulate('click')
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).forEach((item, index) => {
      //   expect(item.find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(true)
      // })
      // expect(wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).at(0).hasClass('is-checked')).toBe(true)
      // expect(wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).at(0).find(`.${prefixTable}-filter-box-left-checked-num`).text()).toBe("11")
    });

    it('filter and cancel', async () => {
      let wrapper = mount(<SingleFilterTable columns={columns} data={data} />);
      wrapper.find(`.uf-shaixuan1-copy`).at(1).simulate('click')
      await sleep(100)
      wrapper.find(`.${prefixTable}-pop-check-wrap`).forEach((item, index) => {
        expect(item.find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(true)
      })
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).find(`input`).at(0).simulate('click')
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).forEach((item, index) => {
      //   expect(item.find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(false)
      // })
      // 点击取消
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`button`).at(0).simulate('click')
      // await sleep(100)
      // wrapper.find(`.uf-shaixuan1-copy`).at(1).simulate('click')
      // await sleep(100)
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).forEach((item, index) => {
      //   expect(item.find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(true)
      // })
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).find(`input`).at(0).simulate('click')
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).at(0).find(`.${prefixTable}-pop-check-wrap-item`).find(`input`).simulate('click')
      // // 点击确定
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`button`).at(1).simulate('click')
      // expect(renderedText(wrapper, 1)).toEqual(['1']);
      // // 还原过滤条件
      // wrapper.find(`.uf-biaotoushaixuanyixuannormal`).at(0).simulate('click')
      // await sleep(100)
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).find(`input`).at(0).simulate('click')
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`button`).at(1).simulate('click')
      // expect(renderedText(wrapper, 1)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
      // const _columns = [...columns, {
      //     title: "采购组织",
      //     dataIndex: "purchasing",
      //     key: "purchasing",
      //     width: 100
      // }]
      // const _data = [...data, {
      //     orderCode: "NU0391029",
      //     supplierName: "5",
      //     typeName: "5",
      //     purchasing: "5"
      // }]
      // wrapper.setProps({columns: _columns, data: _data})
      // expect(wrapper.find(`.${prefixTable}-column-single-filter`)).toHaveLength(3)
    });

    it('onFilter and onlyFilter', async () => {
      let wrapper = mount(<SingleFilterTable columns={columns} data={data} />);
      wrapper.find(`.uf-shaixuan1-copy`).at(1).simulate('click')
      await sleep(100)
      // wrapper.find(`.${prefix}-input-search input`).simulate('change', { target: { value: '1' } })
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`button`).at(1).simulate('click')
      // expect(renderedText(wrapper, 1)).toEqual(['1', '10', '11']);
      // expect(renderedText(wrapper, 2)).toEqual(['1', '10', '11']);
      // wrapper.find(`.uf-biaotoushaixuanyixuannormal`).at(0).simulate('click')
      // await sleep(100)
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).at(0).find(`.${prefixTable}-pop-check-wrap-item`).simulate('mouseover')
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).at(0).find(`.${prefixTable}-pop-check-wrap-item`).find(`button`).simulate('click')
      // expect(renderedText(wrapper, 1)).toEqual(['1']);
      // wrapper.find(`.uf-biaotoushaixuanyixuannormal`).at(0).simulate('click')
      // await sleep(100)
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).find(`input`).at(0).simulate('click')
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`button`).at(1).simulate('click')
      // expect(renderedText(wrapper, 1)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);

    });

    // 右侧已选
    it('have selected tags', async () => {
      let wrapper = mount(<SingleFilterTable columns={columns} data={data} />);
      wrapper.find(`.uf-shaixuan1-copy`).at(1).simulate('click')
      await sleep(100)
      // wrapper.find(`.${prefixTable}-filter-box-left-footer`).find(`.${prefixTable}-filter-box-left-check`).find(`.${prefix}-checkbox`).find(`.${prefixTable}-filter-box-left-check-num`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-box-right`).find(`.${prefix}-tag`)).toHaveLength(11);
      // // 删除一个tag
      // wrapper.find(`.${prefixTable}-filter-box-right`).find(`.${prefix}-tag`).at(0).find(`.${prefix}-icon`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-box-right`).find(`.${prefix}-tag`)).toHaveLength(10);
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).forEach((item, index) => {
      //   expect(item.find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(index === 0 ? false : true)
      // })
      // 清空筛选
      // wrapper.find(`.${prefixTable}-filter-box-right`).find(`.${prefixTable}-filter-box-right-footer`).find(`button`).simulate('click')
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).forEach((item, index) => {
      //   expect(item.find(`.${prefix}-checkbox`).hasClass('is-checked')).toBe(false)
      // })
    })

    // 多列筛选
    it('filterMode: multiple', async () => {
      const _columns = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 80,
            fixed: 'left',
            singleFilter: false,
            render(_text,  _record, index) {
                return index + 1
            }
        },
        {
            title: "订单编号",
            dataIndex: "orderCode",
            key: "orderCode",
            width: 100,
            fixed: 'left',
            singleFilter: false,
            required: true
        },
        {
            title: "供应商名称",
            dataIndex: "supplierName",
            key: "supplierName",
            width: 150,
            required: true,
        },
        {
          title: "类型",
          dataIndex: "typeName",
          key: "typeName",
          width: 100,
          onFilter: (value, record) => {
              return record.typeName == value;
          }
        },
      ]
      let wrapper1 = mount(<SingleFilterTable columns={_columns} data={data} filterMode='multiple'/>);
      wrapper1.find(`.uf-shaixuan1-copy`).at(1).simulate('click')
      await sleep(100)
      // wrapper1.find(`.${prefixTable}-pop-check-wrap`).at(0).find(`input`).simulate('click')
      // wrapper1.find(`.${prefixTable}-pop-check-wrap`).at(1).find(`input`).simulate('click')
      // wrapper1.find(`.${prefixTable}-filter-box-left-footer`).find(`button`).at(1).simulate('click')
      // expect(renderedText(wrapper1, 1)).toEqual(['3', '4', '5', '6', '7', '8', '9', '10', '11']);
      // wrapper1.find(`.uf-shaixuan1-copy`).at(0).simulate('click')
      // await sleep(100)
      // wrapper1.find(`.${prefixTable}-pop-check-wrap`).at(0).find(`input`).simulate('click')
      // wrapper1.find(`.${prefixTable}-filter-box-left-footer`).find(`button`).at(1).simulate('click')
      // expect(renderedText(wrapper1, 1)).toEqual(['4', '5', '6', '7', '8', '9', '10', '11']);
    })

    it('column: filterMultiple', async () => {
      let wrapper = mount(<SingleFilterTable columns={columns} data={data} filterMultiple={false}/>);
      wrapper.find(`.uf-shaixuan1-copy`).at(0).simulate('click')
      await sleep(100)
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).at(0).find(`input`).simulate('click')
      // wrapper.find(`.${prefixTable}-pop-check-wrap`).at(1).find(`input`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-pop-check-wrap`).at(0).find(`.${prefix}-radio`).hasClass(`is-checked`)).toBe(false)
      // expect(wrapper.find(`.${prefixTable}-pop-check-wrap`).at(1).find(`.${prefix}-radio`).hasClass(`is-checked`)).toBe(true)
    });

    it('<test prop:: filterDropdownData>', async () => {
      columns[1]["singleFilter"] = true
      columns[1]["filterDropdownAuto"] = 'manual'
      columns[1]["filterDropdownData"] = [{ key: "myKey", value: "myValue" }]
      let wrapper = mount(<SingleFilterTable columns={columns} data={data} />);
      wrapper.find(`thead tr`).at(0).find(`th`).at(1).simulate('mousedown')
      wrapper.find(`thead tr`).at(0).find(`th`).at(1).find(`.uf-shaixuan1-copy`).simulate('click')
      await sleep(100)
      // expect(wrapper.find(`.${prefixTable}-pop-check-wrap`)).toHaveLength(1)
    });
  })

  describe('lib/filterColumn 列过滤测试', () => {
    const { filterColumn } = Table;
    const FilterColumnTable = filterColumn(Table);
    it('<test prop:: prefixCls>', () => {
      let _columns = columns.map((col, index) => {
        if (index === 0) {
          col.ifshow = true
          return col
        }
        if (index === 1) {
          col.isShow = true
          return col
        }
        if (index === columns.length - 1) {
          col.fixed = 'right'
        }
        return col
      })
      let wrapper = mount(<FilterColumnTable columns={columns} data={data} fieldid={'abc'}/>)
      // expect(wrapper.find(`.${prefixTable}-filter-column-cont`).exists(`.${prefixTable}`)).toBe(true)
      expect(wrapper.exists(`.${prefixTable}-filter-column-filter-icon`)).toBe(true)
      wrapper.setProps({columns: _columns})
      expect(wrapper.exists(`.${prefixTable}-filter-column-filter-icon`)).toBe(true)
      // let _wrapper = mount(<FilterColumnTable columns={_columns} data={data}/>)
      // _wrapper.find(`.${prefixTable}-filter-column-filter-icon .uf-3dot-h`).simulate('click')
      // _wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(0).
    });
    it('Filter Popover show after click filter icon, <test prop:: filterColumnContent>, <test prop:: filterColumnShowModal>, <test prop:: filterColumnOnHide>, <test prop:: filterColumnOnVisibleChange>, <test prop:: filterColumnOpenCloumList>', async () => {
      let wrapper = mount(<FilterColumnTable columns={columns} data={data} />)
      expect(wrapper.find(`.${prefix}-popover`)).toHaveLength(0)
      wrapper.find(`.${prefixTable}-filter-column-filter-icon .uf-liebiaoshezhi`).simulate('click')
      // expect(wrapper.find(`.${prefix}-popover`)).toHaveLength(1)
    });
    it('<test prop:: columnFilterAble>', () => {
      let wrapper = mount(<FilterColumnTable columns={columns} data={data} columnFilterAble={false} />)
      expect(wrapper.exists(`.${prefixTable}-filter-column-filter-icon`)).toBe(false)
    });
    it('<test prop:: afterFilter>', async () => {
      const afterFilter = jest.fn()
      let wrapper = mount(<FilterColumnTable columns={columns} data={data} afterFilter={afterFilter} />)
      // 点击三个点打开面板，
      wrapper.find(`.${prefixTable}-filter-column-filter-icon .uf-liebiaoshezhi`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`)).toHaveLength(7)
      // 点击未冻结，锁定列
      wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.uf-weidongjie`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).exists(`.uf-dongjie`)).toBe(true)
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.${prefix}-checkbox`).hasClass(`disabled`)).toBe(true)
      // //锁定不能选择
      // //
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.${prefix}-checkbox`).hasClass(`is-checked`)).toBe(true)
      // wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`input`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.${prefix}-checkbox`).hasClass(`is-checked`)).toBe(true)

      // wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.uf-dongjie`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).exists(`.uf-weidongjie`)).toBe(true)
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.${prefix}-checkbox`).hasClass(`disabled`)).toBe(false)

      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(2).find(`.${prefix}-checkbox`).hasClass(`is-checked`)).toBe(true)
      // wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(2).find(`input`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(2).find(`.${prefix}-checkbox`).hasClass(`is-checked`)).toBe(false)

      // wrapper.find(`button.${prefix}-button-primary`).simulate('click')
      // expect(wrapper.find(`.${prefix}-popover`)).toHaveLength(0)
      // expect(afterFilter).toHaveBeenCalled()
      // expect(JSON.stringify(afterFilter.mock.calls[0][1])).toBe(JSON.stringify(wrapper.find('FilterColumn').state().columns))
    });

    it('exclude locked columns when selecting all', async () => {
      const afterFilter = jest.fn()
      let wrapper = mount(<FilterColumnTable columns={columns} data={data}/>)
      // 点击三个点打开面板，
      wrapper.find(`.${prefixTable}-filter-column-filter-icon .uf-liebiaoshezhi`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`)).toHaveLength(7)

      // 取消勾选
    //   expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.${prefix}-checkbox`).hasClass(`is-checked`)).toBe(true)
    //   wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`input`).simulate('click')
    //   expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.${prefix}-checkbox`).hasClass(`is-checked`)).toBe(false)

    //   // 点击未冻结，锁定列
    //   wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.uf-weidongjie`).simulate('click')
    //   expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).exists(`.uf-dongjie`)).toBe(true)
    //   expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.${prefix}-checkbox`).hasClass(`disabled`)).toBe(true)
      
    //   // 点击全选, 锁定列不应该被选中
    //   expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.${prefix}-checkbox`).hasClass(`is-checked`)).toBe(false)
    //   wrapper.find(`.${prefixTable}-filter-column-clear-setting`).at(0).simulate('click')
    //   expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(1).find(`.${prefix}-checkbox`).hasClass(`is-checked`)).toBe(false)
    })

    it('support search and clearset', () => {
      let wrapper = mount(<FilterColumnTable columns={columns} data={data} lockable={false} />)
      // wrapper.find(`.${prefixTable}-filter-column-filter-icon .uf-liebiaoshezhi`).simulate('click')
      // wrapper.find(`.${prefix}-input-search input`).simulate('change', { target: { value: '供应商名称' } })
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`)).toHaveLength(1)

      // wrapper.find(`.${prefixTable}-filter-column-clear-setting`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`)).toHaveLength(7)

    });
    it('support search and clearset', () => {
      let _columns = columns.map((col, index) => {
        if (index === 2) {
          col.title = <span>供应商名称</span>
          return col
        }
        return col
      })
      let _wrapper = mount(<FilterColumnTable columns={_columns} data={data} lockable={false} />)
      _wrapper.find(`.${prefixTable}-filter-column-filter-icon .uf-liebiaoshezhi`).simulate('click')
      // _wrapper.find(`.${prefix}-input-search input`).simulate('change', { target: { value: '供应商名称' } })
      // expect(_wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`)).toHaveLength(1)

    });
    it('<test prop:: lockable>', () => {
      let _columns = columns.map((col, index) => {
        if (index === 0 || index === 1) {
          col.fixed = 'left'
          return col
        }
        if (index === columns.length - 1) {
          col.fixed = 'right'
        }
        return col
      })
      let wrapper = mount(<FilterColumnTable columns={columns} data={data} lockable={false} />)
      wrapper.find(`.${prefixTable}-filter-column-filter-icon .uf-liebiaoshezhi`).simulate('click')
      wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).forEach((node) => {
        expect(node.exists(`.uf-weidongjie`)).toBe(false)
        expect(node.exists(`.uf-dongjie`)).toBe(false)
      })
      wrapper.find(`th`).forEach((node) => {
        expect(node.exists(`.${prefixTable}-column-lock`)).toBe(false)
      })
    });
    it('<test prop:: lockable>', () => {
      let _columns = columns.map((col, index) => {
        if (index === 0 || index === 1) {
          col.fixed = 'left'
          return col
        }
        if (index === columns.length - 1) {
          col.fixed = 'right'
        }
        return col
      })
      let _wrapper = mount(<FilterColumnTable columns={_columns} data={data}/>)
      _wrapper.find(`th`).at(1).find(`.${prefixTable}-column-lock`).find(`i`).simulate('click')
      expect(_wrapper.find(`th`).at(1).find(`.${prefixTable}-column-lock`).find(`i`).hasClass('uf-weidongjie')).toBe(true);
      _wrapper.find(`th`).at(1).find(`.${prefixTable}-column-lock`).find(`i`).simulate('click')
      expect(_wrapper.find(`th`).at(1).find(`.${prefixTable}-column-lock`).find(`i`).hasClass('uf-dongjie')).toBe(true);
    });
    it('<test prop:: columnSetPopover>', () => {
      let wrapper = mount(<FilterColumnTable columns={columns} data={data} />)
      wrapper.setProps({ columnSetPopover: false })
      expect(wrapper.find(`.${prefix}-popover`)).toHaveLength(0)

      wrapper.setProps({ columnSetPopover: true })
      // expect(wrapper.find(`.${prefix}-popover`)).toHaveLength(1)
    });
    it('<test prop:: filterCheckboxProps>', () => {
      let filterCheckboxProps = (column) => ({
          disabled: column.key == 'type_name',
          name: column.key
      })
      let wrapper = mount(<FilterColumnTable columns={columns} data={data} filterCheckboxProps={filterCheckboxProps}/>)
      wrapper.find(`.${prefixTable}-filter-column-filter-icon .uf-liebiaoshezhi`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-column-pop-cont-item`).at(3).find(`.${prefix}-checkbox`).hasClass(`disabled`)).toBe(true)
    });
    it('locale, en-us', () => {
      let wrapper = mount(<FilterColumnTable  columns={columns} data={data} locale={'en-us'}/>)
      // wrapper.find(`.${prefixTable}-filter-column-filter-icon .uf-liebiaoshezhi`).simulate('click')
      // expect(wrapper.find(`.${prefixTable}-filter-column-clear-setting`).at(1).text()).toBe('Reset')
      // expect(wrapper.find(`.${prefix}-button-text-wrap`).at(0).text()).toBe('Cancel')
      // expect(wrapper.find(`.${prefix}-button-text-wrap`).at(1).text()).toBe('OK')
    });
  })

  describe('table和sticky模式', () => {
    it('<test prop:: scrollMode>', () => {
      let wrapper = mount(<Table columns={columns} data={data} scrollMode='sticky'/>)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-sticky`)).toBe(true)
    })
  })

  // describe('columnsPx width test', () => {
  //   it('<test prop:: width>', () => {
  //     let wrapper = mount(<Table columns={columnsPx} data={data}/>)
  //     columnsPx.forEach((item, index) => {
  //       // expect(wrapper.find(`.${prefixTable}-colgroup`).at(0).find('col').at(index).getDOMNode().style['maxWidth']).toBe(parseInt(item.width) + 'px')
  //     });
  //   });
  // })

  // describe('percentColumns width test', () => {
  //   let wrapper = mount(<Table columns={percentColumns} data={data} scrollMode='sticky' style={{width: '1008px'}}/>)
  //   let content = wrapper.find('Table').instance().scrollbarWidth;
  //   console.log('content', content)
  //   it('<test prop:: width>', () => {
  //     percentColumns.forEach((item, index) => {
  //       // expect(wrapper.find('th').at(index).prop('style').maxWidth).toBe(parseInt((1000 - content) * parseInt(item.width)) / 100)
  //       expect(content).tobe()
  //     });
  //   });
  // })

  describe('<test prop:: bodyClassName>', () => {
    it('bodyClassName', () => {
      let wrapper = mount(<Table columns={columns} data={data} bodyClassName={'abc'} />)
      expect(wrapper.find(`.${prefixTable}`).find(`.${prefixTable}-body`).hasClass(`abc`)).toBe(true)
    })
  });

  describe('<test prop:: bodyClassName>', () => {
    it('bodyClassName', () => {
      let wrapper = mount(<Table columns={columns} data={data} bodyClassName={'abc'} scrollMode='sticky'/>)
      expect(wrapper.find(`.${prefixTable}`).find(`.${prefixTable}-body`).hasClass(`abc`)).toBe(true)
    })
  });

  describe('测试兼容antd', () => {
    const { AntdTable } = Table;
    const sorterName = (a, b) => a.name >= b.name ? 1 : -1;
    const sorterAge = (a, b) => b.age - a.age;//自定义排序
    const sorterAdr = (a, b) => b.adr - a.adr;//自定义排序
    const sorterSch = (a, b) => b.school - a.school;//自定义排序
    const columns = [
      { title: 'Name', 
        dataIndex: 'name', 
        key: 'name', 
        align: 'left', 
        sorter: {
          compare: sorterName,
          multiple: 1,
        }, 
        sortOrder: null, 
        ellipsis: true
      },
      { title: 'Age', 
        dataIndex: 'age', 
        key: 'age', 
        sorter: {
          compare: sorterAge,
          multiple: 2,
        } 
      },
      { title: 'Adr', dataIndex: 'adr', key: 'adr',sorter: sorterAdr, sortOrder: false },
      { title: 'School', dataIndex: 'school', key: 'school', sorter: {
          compare: sorterSch,
          multiple: 3,
        }, 
      }
    ];
    const data = [
      { key: 0, name: 'Jack', age: 25, adr: 1, school: 1, id: 0 },
      { key: 1, name: 'Lucy', age: 21, adr: 2, school: 2, id: 1},
      { key: 2, name: 'Tom', age: 32, adr: 3, school: 3, id: 2 },
      { key: 3, name: 'Jerry', age: 19, adr: 4, school: 4, id: 3 }
    ];
    function renderedText(wrapper, index = 0) {
      const textList = [];
      wrapper.find(`.${prefixTable}-tbody tr`).forEach(tr => {
        textList.push(tr.find('td').at(index).text());
      });
      return textList;
    };
    it('sort', () => {
      let wrapper = mount(<AntdTable columns={columns} data={data}/>);
      wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click');//按Name排序
      expect(renderedText(wrapper)).toEqual(["Tom", "Lucy", "Jerry", "Jack"]);
      expect(renderedText(wrapper, 1)).toEqual(["32", "21", "19", "25"]);
      expect(wrapper.find(`.${prefixTable}-thead th`).at(0).find(`.${prefixTable}-column-sorter-num`).text()).toBe('1');

      // 多列排序,不会清空第一次排序的结果
      wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click');//按Age排序
      expect(renderedText(wrapper)).toEqual(["Tom", "Lucy", "Jerry", "Jack"]);
      expect(renderedText(wrapper, 1)).toEqual(["32", "21", "19", "25"]);
      expect(wrapper.find(`.${prefixTable}-thead th`).at(1).find(`.${prefixTable}-column-sorter-num`).text()).toBe('2');

      wrapper.find(`.${prefixTable}-column-sorter`).find(`.uf-triangle-down`).at(0).simulate('click');//再次点击,取消按Name排序,
      expect(wrapper.find(`.${prefixTable}-thead th`).at(0).find(`.${prefixTable}-column-sorter-num`).text()).toBe('');
      expect(wrapper.find(`.${prefixTable}-thead th`).at(1).find(`.${prefixTable}-column-sorter-num`).text()).toBe('1');

      //此时,按Age排序起作用
      expect(renderedText(wrapper)).toEqual(["Jerry", "Lucy", "Jack", "Tom"]);
      expect(renderedText(wrapper, 1)).toEqual(["19", "21", "25", "32"]);
    });

    it('sort other, <test prop:: antd>, <test prop:: isBigData>', () => {
      const sortColumns = [
        { title: 'Name', 
          dataIndex: 'name', 
          key: 'name', 
          align: 'left', 
          sorter: true,
          sortOrder: 'ascend',
          sorterClick: () => {},
          width: '200px'
        },
        { title: 'Age', 
          dataIndex: 'age', 
          key: 'age', 
          sorter: {
            compare: sorterAge,
            multiple: 1,
          } 
        },
      ];
      const sortData = [
        { key: 0, name: 'Jack', age: 25, id: 0 },
        { key: 1, name: 'Lucy', age: 21, id: 1},
        { key: 2, name: 'Tom', age: 32, id: 2 },
        { key: 3, name: 'Jerry', age: 19, id: 3 }
      ]
      let wrapper = mount(<AntdTable columns={sortColumns} data={sortData} rowKey={'id'}/>);
      wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click');//按Name排序
      expect(renderedText(wrapper)).toEqual(["Jack", "Lucy", "Tom", "Jerry"]);
      expect(renderedText(wrapper, 1)).toEqual(["25", "21", "32", "19"]);
    })
    it('<test prop:: emptyText>, <test prop:: pagination>', async () => {
      const locale = {
        emptyText: () => 'No Data'
      }
      let wrapper = mount(<AntdTable className={'antd-table'} columns={columns} data={[]} locale={locale}/>)
      expect(wrapper.find(`.${prefixTable}-placeholder`).text()).toBe('No Data')
      expect(wrapper.find('tbody tr').length).toBe(1)
      const _locale = {
        emptyText: 'No Data'
      }
      let _wrapper = mount(<AntdTable scrollMode="table" columns={columns} data={[]} locale={_locale}/>)
      expect(_wrapper.find(`.${prefixTable}-placeholder`).text()).toBe('No Data')
      expect(_wrapper.find('tbody tr').length).toBe(1)
      const onChange = jest.fn();
      const onSelect = jest.fn();
      const onExpand = jest.fn();
      const rowSelection = {
        type: 'radio',
        onChange: onChange,
        onSelect: onSelect
      }
      const _data = [
        { key: 0, name: 'Jack', age: 25 },
        { key: 1, name: 'Lucy', age: 21, children: [
          {key: 11, name: 'Lucy1', age: 10}
        ] },
        { key: 2, name: 'Tom', age: 32 },
        { key: 3, name: 'Jerry', age: 19 }
      ]
      let expandable = {
        onExpand: onExpand
      }
      wrapper.setProps({data: _data, expandable: expandable, pagination: true})
      await sleep(500)
      const child = document.querySelector('.antd-table')
      await sleep(500)
      jest.spyOn(child, 'getBoundingClientRect').mockReturnValue({
        width: 1500,
          height: 500
      })
      await sleep(500)
      expect(wrapper.find('tbody tr').length).toBe(5)
      wrapper.find('tbody tr').at(1).find('td').at(0).find(`.${prefixTable}-row-expand-icon`).simulate('click')
      expect(onExpand).toHaveBeenCalled();

      let pagination = {pageSize: 3}
      wrapper.setProps({data: data, expandable: {}, pagination: pagination, rowSelection})
      expect(wrapper.find('tbody tr').length).toBe(3)
      wrapper.find('tbody tr').at(0).find('td').at(0).find(`input`).simulate('click')
      expect(onChange).toHaveBeenCalled();
      expect(onSelect).toHaveBeenCalled();

      wrapper.find(`.${prefix}-pagination-list li`).at(3).find(`a`).simulate('click')
      expect(wrapper.find('tbody tr').length).toBe(1)

    });
    it('tableLayout, <test prop:: tableLayout>', () => {
      let wrapper = mount(<AntdTable columns={columns} data={[]} tableLayout={'fixed'} pagination={false}/>)
      expect(wrapper.find(`.${prefixTable}`).getDOMNode().style['table-layout']).toBe("fixed")
    });
    it('tableLayout width style, <test prop:: tableLayout>', () => {
      let wrapper = mount(<AntdTable columns={columns} data={[]} tableLayout={'fixed'} style={{fontSize: '14px'}} pagination={false}/>)
      expect(wrapper.find(`.${prefixTable}`).getDOMNode().style['table-layout']).toBe("fixed")
    });

    it('component: Table, <test prop:: rowKey>', () => {
      let wrapper = mount(<AntdTable columns={columns} data={[]} tableLayout={'fixed'} rowKey={'id'}/>)
      expect(wrapper.find(`.${prefixTable}`).getDOMNode().style['table-layout']).toBe("fixed")
      let _wrapper = mount(<AntdTable columns={columns} data={[]} tableLayout={'fixed'} rowKey={(record) => record.id}/>)
      expect(_wrapper.find(`.${prefixTable}`).getDOMNode().style['table-layout']).toBe("fixed")
    });

  })

  describe('内置序号列表头locale', () => {
    const { multiSelect } = Table;
    let MultiSelectTable = multiSelect(Table, Checkbox);
    const columns = [
      {title: "员工编号", dataIndex: "a", key: "a", width: 150},
      {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
      {title: "性别", dataIndex: "c", key: "c", width: 100},
      {title: "部门", dataIndex: "d", key: "d", width: 100},
      {title: "职级", dataIndex: "e", key: "e", width: 100}
    ];
    const data = [
      {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1"},
      {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2"},
      {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3"}
    ];
    it('locale, en-us, <test prop:: showRowNum>', () => {
      let wrapper = mount(<Table columns={columns} data={data} showRowNum={true} locale={'en-us'}/>)
      expect(wrapper.find('thead tr').find('th').at(0).text()).toBe("Serial number");
    });
    it('showRowNum: ascii', () => {
      let showRowNum = {
        type: 'ascii',
        fixed: false
      }
      let wrapper = mount(<Table columns={columns} data={data} showRowNum={showRowNum}/>)
      expect(wrapper.find('tbody tr').at(0).find('td').at(0).text()).toBe("a");
    });
    it('showRowNum: number', () => {
      let showRowNum = {
        type: 'number',
        fixed: false
      }
      let wrapper = mount(<Table columns={columns} data={data} showRowNum={showRowNum}/>)
      expect(wrapper.find('tbody tr').at(0).find('td').at(0).text()).toBe("0");
    });
    it('showRowNum, multiSelect', () => {
      let wrapper = mount(<MultiSelectTable columns={columns} data={data} showRowNum={true}/>)
      expect(wrapper.find('tbody tr').at(0).find('td').at(1).text()).toBe("0");
    });
  })
  
  describe('JSX', () => {
    const { Column, ColumnGroup, multiSelect, sort, singleFind, singleFilter } = Table;
    let MultiSelectTable = multiSelect(Table, Checkbox);
    let SortTable = sort(Table)
    let SingFindTable = singleFind(Table)
    let SingFilterTable = singleFilter(Table)
    const data = [
      {
        key: '1',
        name: '喜洋洋',
        sex: '男',
        age: 24,
        address: '羊村',
        tags: ['wisdom', 'brave'],
    },
    {
        key: '2',
        name: '美羊羊',
        sex: '女',
        age: 18,
        address: '羊村',
        tags: ['nice'],
    },
    {
        key: '3',
        name: '灰太狼',
        sex: '男',
        age: 26,
        address: '羊村外',
        tags: ['cool', 'handsome'],
    },
    ];

    const SingFilterWrapper = <SingFilterTable bordered data={data} autoCheckedByClickRows={false} rowDraggAble={true} useDragHandle={true}>
      <Column columnType="rowdrag" fixed='left'/>
      <Column columnType="multiselect"/>
      <ColumnGroup title="个人信息">
          <Column title="姓名" dataIndex="name" key="name"/>
          <Column title="性别" dataIndex="sex" key="sex"/>
      </ColumnGroup>
      <Column title="年龄" dataIndex="age" key="age"/>
      <Column title="地址" dataIndex="address" key="address"/>
      <Column title="标签" dataIndex="tags" key="tags" render={(tags) => (<>
                  {tags.map((tag) => (<Tag colors="blue" key={tag}>
                          {tag}
                      </Tag>))}
              </>)}/>
      <Column title="操作" key="e" render={(_, record) => (<Space size="middle">
                  <a>Invite {record.lastName}</a>
                  <a>Delete</a>
              </Space>)}/>
  </SingFilterTable>

  it('column should be set', () => {
    let wrapper = mount(SingFilterWrapper)
    expect(wrapper.find('thead tr').at(0).find('th')).toHaveLength(7)
    expect(wrapper.find('thead tr').at(1).find('th')).toHaveLength(2)
  });
  it('jsx', () => {
    let wrapper = mount(SingFilterWrapper)
    expect(wrapper.find('tbody tr').at(0).find('td').at(2).text()).toBe("喜洋洋");
  });

    const SingFindWrapper = <SingFindTable bordered data={data} autoCheckedByClickRows={false} rowDraggAble={true} useDragHandle={true}>
        <Column columnType="rowdrag" fixed='left'/>
        <Column columnType="multiselect"/>
        <ColumnGroup title="个人信息">
            <Column title="姓名" dataIndex="name" key="name"/>
            <Column title="性别" dataIndex="sex" key="sex"/>
        </ColumnGroup>
        <Column title="年龄" dataIndex="age" key="age"/>
        <Column title="地址" dataIndex="address" key="address"/>
        <Column title="标签" dataIndex="tags" key="tags" render={(tags) => (<>
                    {tags.map((tag) => (<Tag colors="blue" key={tag}>
                            {tag}
                        </Tag>))}
                </>)}/>
        <Column title="操作" key="e" render={(_, record) => (<Space size="middle">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                </Space>)}/>
    </SingFindTable>

    it('column should be set', () => {
      let wrapper = mount(SingFindWrapper)
      expect(wrapper.find('thead tr').at(0).find('th')).toHaveLength(7)
      expect(wrapper.find('thead tr').at(1).find('th')).toHaveLength(2)
    });
    it('jsx', () => {
      let wrapper = mount(SingFindWrapper)
      expect(wrapper.find('tbody tr').at(0).find('td').at(2).text()).toBe("喜洋洋");
    });


    const sortWrapper = <SortTable bordered data={data} autoCheckedByClickRows={false} rowDraggAble={true} useDragHandle={true}>
        <Column columnType="rowdrag" fixed='left'/>
        <Column columnType="multiselect"/>
        <ColumnGroup title="个人信息">
            <Column title="姓名" dataIndex="name" key="name"/>
            <Column title="性别" dataIndex="sex" key="sex"/>
        </ColumnGroup>
        <Column title="年龄" dataIndex="age" key="age"/>
        <Column title="地址" dataIndex="address" key="address"/>
        <Column title="标签" dataIndex="tags" key="tags" render={(tags) => (<>
                    {tags.map((tag) => (<Tag colors="blue" key={tag}>
                            {tag}
                        </Tag>))}
                </>)}/>
        <Column title="操作" key="e" render={(_, record) => (<Space size="middle">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                </Space>)}/>
    </SortTable>

    it('column should be set', () => {
      let wrapper = mount(sortWrapper)
      expect(wrapper.find('thead tr').at(0).find('th')).toHaveLength(7)
      expect(wrapper.find('thead tr').at(1).find('th')).toHaveLength(2)
    });
    it('jsx', () => {
      let wrapper = mount(sortWrapper)
      expect(wrapper.find('tbody tr').at(0).find('td').at(2).text()).toBe("喜洋洋");
    });


    const _wrapper = <MultiSelectTable bordered data={data} autoCheckedByClickRows={false} rowDraggAble={true} useDragHandle={true}>
        <Column columnType="rowdrag" fixed='left'/>
        <Column columnType="multiselect"/>
        <ColumnGroup title="个人信息">
            <Column title="姓名" dataIndex="name" key="name"/>
            <Column title="性别" dataIndex="sex" key="sex"/>
        </ColumnGroup>
        <Column title="年龄" dataIndex="age" key="age"/>
        <Column title="地址" dataIndex="address" key="address"/>
        <Column title="标签" dataIndex="tags" key="tags" render={(tags) => (<>
                    {tags.map((tag) => (<Tag colors="blue" key={tag}>
                            {tag}
                        </Tag>))}
                </>)}/>
        <Column title="操作" key="e" render={(_, record) => (<Space size="middle">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                </Space>)}/>
    </MultiSelectTable>
    
    it('column should be set', () => {
      let wrapper = mount(_wrapper)
      expect(wrapper.find('thead tr').at(0).find('th')).toHaveLength(7)
      expect(wrapper.find('thead tr').at(1).find('th')).toHaveLength(2)
    });
    it('jsx', () => {
      let wrapper = mount(_wrapper)
      expect(wrapper.find('tbody tr').at(0).find('td').at(2).text()).toBe("喜洋洋");
    });
    
    const _wrapper1 = <MultiSelectTable scrollMode='table' bordered data={data} autoCheckedByClickRows={false} rowDraggAble={true} useDragHandle={true}>
        <Column columnType="rowdrag" fixed='left'/>
        <Column columnType="multiselect"/>
        <ColumnGroup title="个人信息">
            <Column title="姓名" dataIndex="name" key="name"/>
            <Column title="性别" dataIndex="sex" key="sex"/>
        </ColumnGroup>
        <Column title="年龄" dataIndex="age" key="age"/>
        <Column title="地址" dataIndex="address" key="address"/>
        <Column title="标签" dataIndex="tags" key="tags" render={(tags) => (<>
                    {tags.map((tag) => (<Tag colors="blue" key={tag}>
                            {tag}
                        </Tag>))}
                </>)}/>
        <Column title="操作" key="e" render={(_, record) => (<Space size="middle">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                </Space>)}/>
    </MultiSelectTable>
    
    it('column should be set', () => {
      let wrapper1 = mount(_wrapper1)
      expect(wrapper1.find(`.${prefixTable}-content-inner thead tr`).at(0).find('th')).toHaveLength(5)
      expect(wrapper1.find(`.${prefixTable}-content-inner thead tr`).at(1).find('th')).toHaveLength(2)
    });

    const _wrapper2 = <Table bordered data={data} rowSelection={{type: 'checkbox'}}>
        <Column columnType="multiselect"/>
        <ColumnGroup title="个人信息">
            <Column title="姓名" dataIndex="name" key="name"/>
            <Column title="性别" dataIndex="sex" key="sex"/>
        </ColumnGroup>
        <Column title="年龄" dataIndex="age" key="age"/>
        <Column title="地址" dataIndex="address" key="address"/>
        <Column title="标签" dataIndex="tags" key="tags" render={(tags) => (<>
                    {tags.map((tag) => (<Tag colors="blue" key={tag}>
                            {tag}
                        </Tag>))}
                </>)}/>
        <Column title="操作" key="e" render={(_, record) => (<Space size="middle">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                </Space>)}/>
    </Table>
    
    it('column should be set', () => {
      let wrapper1 = mount(_wrapper2)
      expect(wrapper1.find(`.${prefixTable}-content-inner thead tr`).at(0).find('th')).toHaveLength(6)
      expect(wrapper1.find(`.${prefixTable}-content-inner thead tr`).at(1).find('th')).toHaveLength(2)
    });

  })

  // 
  describe('fillSpace', () => { 
    const columns1 = [
        {title: "员工编号", dataIndex: "a", key: "a", width: 150, fixed: 'left'},
        // {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
        {title: "员工1", dataIndex: "y", key: "y", width: 100, children: [
          {title: "员工姓名", dataIndex: "b", key: "b", width: 50},
          {title: "员工年龄", dataIndex: "m", key: "m", width: 50},
        ]},
        {title: "性别", dataIndex: "c", key: "c", width: 100},
        {title: "部门", dataIndex: "d", key: "d", width: 100},
        {title: "职级", dataIndex: "e", key: "e", width: 100}
    ];

    const columns2 = [
      {title: "员工编号", dataIndex: "a", key: "a", width: 150, fixed: 'left'},
      {title: "员工1", dataIndex: "y", key: "y", width: 100, fixed: 'left', children: [
        {title: "员工姓名", dataIndex: "b", key: "b", width: 50, fixed: 'left'},
        {title: "员工年龄", dataIndex: "MN", key: "MN", width: 50, fixed: 'left', children: [
          {title: "员工年龄1", dataIndex: "m", key: "m", width: 25, fixed: 'left'},
          {title: "员工年龄2", dataIndex: "n", key: "n", width: 25, fixed: 'left'}
        ]},
      ]},
      {title: "性别", dataIndex: "c", key: "c", width: 100, fixed: 'left'},
      {title: "部门", dataIndex: "d", key: "d", width: 100, fixed: 'left'},
      {title: "职级", dataIndex: "e", key: "e", width: 100}
  ];
    const data = [
        {a: "ASVAL_20190328", b: "小张", m: '18', n: '20', c: "男", d: "财务二科", e: "M1", key: "1"},
        {a: "ASVAL_20190320", b: "小明", m: '18', n: '20', c: "男", d: "财务一科", e: "T1", key: "2"},
        {a: "ASVAL_20190312", b: "小红", m: '18', n: '20', c: "女", d: "财务一科", e: "T2", key: "3"},
        {a: "ASVAL_20190301", b: "小张", m: '18', n: '20', c: "男", d: "财务二科", e: "M1", key: "4"},
        {a: "ASVAL_20190302", b: "小明", m: '18', n: '20', c: "男", d: "财务一科", e: "T1", key: "5"},
        {a: "ASVAL_20190303", b: "小红", m: '18', n: '20', c: "女", d: "财务一科", e: "T2", key: "6"},
        {a: "ASVAL_20190304", b: "小张", m: '18', n: '20', c: "男", d: "财务二科", e: "M1", key: "7"},
        {a: "ASVAL_20190305", b: "小明", m: '18', n: '20', c: "男", d: "财务一科", e: "T1", key: "8"},
        {a: "ASVAL_20190306", b: "小红", m: '18', n: '20', c: "女", d: "财务一科", e: "T2", key: "9"},
        {a: "ASVAL_20190307", b: "小张", m: '18', n: '20', c: "男", d: "财务二科", e: "M1", key: "10"},
        {a: "ASVAL_20190308", b: "小明", m: '18', n: '20', c: "男", d: "财务一科", e: "T1", key: "11"},
        {a: "ASVAL_20190309", b: "小红", m: '18', n: '20', c: "女", d: "财务一科", e: "T2", key: "12"}
    ];
    let contentBoundRect = {
          width: 1000,
          height: 200
    };
    ['sticky','table'].forEach((mode)=>{
      it('component: Table, <test prop:: fillSpace>', async () => {
        document.body.innerHTML = '';
        let wrapper = render(<div id="container"><Table className={`test-table`} columns={columns1} data={data} fillSpace scrollMode={mode} locale={'zh-cn'}/></div>)
        const parent = document.querySelector('#container');
        const child = document.querySelector('.test-table');
        jest.spyOn(parent, 'getBoundingClientRect').mockReturnValue(contentBoundRect)
        jest.spyOn(child, 'getBoundingClientRect').mockReturnValue({
          width: 1200,
          height: 300
        })
        jest.spyOn(window, 'getComputedStyle').mockReturnValue({
          getPropertyValue: (x)=> x === 'width'? 1000 : 200
        });
        // render(<div id="container"><Table columns={columns} data={data} fillSpace scrollMode={mode} /></div>)
        // expect(document.body.innerHTML).toMatchSnapshot()
        // screen.debug()
        // let wrapper = mount(<div id='container'><Table columns={columns} data={data} fillSpace scrollMode={mode} /></div>)s
        const currentBox = document.querySelector(`.${prefixTable}`);
        jest.spyOn(currentBox, 'clientWidth', 'get').mockReturnValue(1000)
        jest.spyOn(currentBox, 'clientHeight', 'get').mockReturnValue(200)


        await sleep(500)

        jest.spyOn(child, 'getBoundingClientRect').mockReturnValue({
          width: 1500,
          height: 500
        })

        jest.spyOn(child, 'getBoundingClientRect').mockReturnValue({
          width: 400,
          height: 200
        })

      });
    });

    ['sticky','table'].forEach((mode)=>{
      it('component: Table, <test prop:: fillSpace checkFixedColumn> ', async () => {
        document.body.innerHTML = '';
        let _wrapper = render(<div id="container1"><Table className={`test1-table`} columns={columns2} data={data} fillSpace scrollMode={mode} locale={'zh-cn'}/></div>)
        const parent1 = document.querySelector('#container1');
        const child1 = document.querySelector('.test1-table');
        jest.spyOn(parent1, 'getBoundingClientRect').mockReturnValue(contentBoundRect)
        jest.spyOn(child1, 'getBoundingClientRect').mockReturnValue({
          width: 400,
          height: 300
        });
        jest.spyOn(window, 'getComputedStyle').mockReturnValue({
          getPropertyValue: (x)=> x === 'width'? 1000 : 200
        });
  //       const currentBox1 = document.querySelector(`.${prefixTable}`);
  //       jest.spyOn(currentBox1, 'clientWidth', 'get').mockReturnValue(1000)
  //       jest.spyOn(currentBox1, 'clientHeight', 'get').mockReturnValue(200)


  //       await sleep(500)

  //       jest.spyOn(child1, 'getBoundingClientRect').mockReturnValue({
  //         width: 1500,
  //         height: 500
  //       })

        jest.spyOn(child1, 'getBoundingClientRect').mockReturnValue({
          width: 400,
          height: 200
        })

        window.dispatchEvent(new MouseEvent('resize'))
        
      });
    });

  })

  describe('Table <Tree data>', () => {
    const data = [
        { a: "ASVAL_201903280005", b: "小张", c: false, d: "财务二科", e: "M1", key: "1001", children: [
                { a: "ASVAL_201903200004", b: "小明", c: false, d: "财务一科", e: "T1", key: "1002" }] },
        { a: "ASVAL_201903120003", b: "小岳", c: false, d: "财务五科", e: "T2", key: "1005" },
    ];
    const data1 = [
      { a: "ASVAL_201903280005", b: "小张", c: false, d: "财务二科", e: "M1", key: "1001", list: [
              { a: "ASVAL_201903200004", b: "小明", c: false, d: "财务一科", e: "T1", key: "1002" }] },
      { a: "ASVAL_201903120003", b: "小岳", c: false, d: "财务五科", e: "T2", key: "1005" },
    ];
    const columns = [
        { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
        { title: "员工姓名", dataIndex: "b", key: "b", width: 200 },
        { title: "部门", dataIndex: "d", key: "d", width: 100, onHeaderCell: () => ({}) },
        { title: "职级", dataIndex: "e", key: "e", width: 100, onHeadCellClick: () => {} }
    ];
    
    it('component: Table, <test prop:: childrenColumnName>', () => {

      let wrapper1 = mount(<Table columns={columns} data={data1} expandedRowKeys={['1001']} childrenColumnName='list'/>)
      expect(wrapper1.find('tbody tr').length).toBe(3)
    });

    it('component: Table, <test prop:: childrenColumnName>', () => {
      let _wrapper1 = mount(<Table columns={columns} scrollMode='table' data={data1} expandedRowKeys={['1001']} childrenColumnName='list'/>)
      expect(_wrapper1.find('tbody tr').length).toBe(3)
    });
    it('props: onExpand', () => {
      const onExpand = jest.fn()
      let wrapper = mount(<Table columns={columns} data={data} onExpand={onExpand} expandIconAsCell/>)
      expect(wrapper.find('thead th').length).toBe(5)
      wrapper.find('tbody tr').at(0).find('td').at(0).find(`.${prefixTable}-row-expand-icon`).at(0).simulate('click')
      expect(onExpand).toHaveBeenCalled()
      expect(wrapper.find('tbody tr').length).toBe(3)
    });
    it('props: onExpandAll, <test prop:: onExpandAll>, <test prop:: showHeaderExpandIcon>, <test prop:: expandableColumnTitle>, <test prop:: expandIconFixed>, <test prop:: expandable>, <test prop:: showExpandColumn>', () => {
      const onExpandAll = jest.fn()
      const expandable = {
        onExpandAll: onExpandAll,
        columnTitle: '测试全部展开/收起',
        fixed: 'left',
        showExpandColumn: true,
        showHeaderExpandIcon: true,
        expandIconAsCell: true
    }
      let wrapper = mount(<Table columns={columns} data={data} expandable={expandable}/>)
      expect(wrapper.find('thead th').length).toBe(5)
      expect(wrapper.find('thead th').at(0).hasClass(`${prefixTable}-cell-fix-left`)).toBe(true)
      expect(wrapper.find('thead th').at(0).find(`.${prefixTable}-row-expand-icon`).hasClass(`${prefixTable}-row-collapsed`)).toBe(true)
      wrapper.find('thead th').at(0).find(`.${prefixTable}-row-expand-icon`).simulate('click')
      expect(onExpandAll).toHaveBeenCalled()
    });
    it('props: onExpandAll, <test prop:: onExpandAll>, <test prop:: showHeaderExpandIcon>, <test prop:: expandableColumnTitle>, <test prop:: expandIconFixed>, <test prop:: expandable>, <test prop:: showExpandColumn>', () => {
      const onExpandAll = jest.fn()
      const expandable = {
        onExpandAll: onExpandAll,
        columnTitle: '测试全部展开/收起',
        fixed: 'left',
        showExpandColumn: true,
        showHeaderExpandIcon: true,
        expandIconAsCell: true
    }
      let wrapper1 = mount(<Table columns={columns} data={data} expandable={Object.assign({}, {...expandable}, {showExpandColumn: false})}/>)
      expect(wrapper1.find('thead th').length).toBe(4)
    });
    it('props: onExpandAll, <test prop:: onExpandAll>, <test prop:: showHeaderExpandIcon>, <test prop:: expandableColumnTitle>, <test prop:: expandIconFixed>, <test prop:: expandable>, <test prop:: showExpandColumn>', () => {
      let expandable2 = {
        columnTitle: '测试全部展开/收起',
        fixed: 'left',
        showExpandColumn: true,
        showHeaderExpandIcon: false,
        expandIconAsCell: true
      }
      let wrapper2 = mount(<Table columns={columns} data={data} expandable={expandable2}/>)
      expect(wrapper2.find('thead th').at(0).find(`.${prefixTable}-cell-content`).text()).toBe('测试全部展开/收起')
    });

    it('component: Table, <test prop:: indentSize>', () => {
      let wrapper = mount(<Table columns={columns} data={data} indentSize={20} defaultExpandAllRows/>)
      expect(wrapper.find('tbody tr').at(1).find('td').at(0).find(`.indent-level-1`).getDOMNode().style['padding-left']).toBe('20px')
    });
    window.dispatchEvent(new MouseEvent('resize'))
  })

  describe('bigColumns', () => {
    const { dragColumn} = Table;
    const DragColumnTable = dragColumn(Table);
    const commonColumns = [
        {
            title: "序号", dataIndex: "index", key: "index", width: 80,
            render(_text, _record, index) {
                return index + 1;
            },
            fixed: 'left'
        },
        {title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: '120px', fixed: 'left'},
        {title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: '120px', fixed: 'left'},
        {title: "类型", dataIndex: "typeName", key: "typeName", width: '120px'},
        {title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: '120px'},
        {title: "采购组", dataIndex: "purchasingGroup", key: "purchasingGroup", width: '120px'},
        {title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: '120px'},
    ];
    const commonData = [
        {
            orderCode: "NU0391025",
            supplierName: "xx供应商",
            typeName: "1",
            purchasing: '组织c',
            purchasingGroup: "aa",
            voucherDate: "2018年03月18日",
            key: "1"
        },
        {
            orderCode: "NU0391026",
            supplierName: "xx供应商",
            typeName: "2",
            purchasing: '组织a',
            purchasingGroup: "bb",
            voucherDate: "2018年02月05日",
            key: "2"
        },
        {
            orderCode: "NU0391027",
            supplierName: "xx供应商",
            typeName: "3",
            purchasing: '组织b',
            purchasingGroup: "aa",
            voucherDate: "2018年07月01日",
            key: "3"
        },
        {
            orderCode: "NU0391028",
            supplierName: "xx供应商",
            typeName: "4",
            purchasing: '组织c',
            purchasingGroup: "cc",
            voucherDate: "2019年03月01日",
            key: "4"
        },
        {
            orderCode: "NU0391029",
            supplierName: "xx供应商",
            typeName: "5",
            purchasing: '组织d',
            purchasingGroup: "ss",
            voucherDate: "2019年02月14日",
            key: "5"
        },
        {
            orderCode: "NU0391030",
            supplierName: "xx供应商",
            typeName: "1",
            purchasing: '组织e',
            purchasingGroup: "zz",
            voucherDate: "2019年02月18日",
            key: "6"
        },
        {
            orderCode: "NU0391031",
            supplierName: "xx供应商",
            typeName: "2",
            purchasing: '组织f',
            purchasingGroup: "qq",
            voucherDate: "2019年01月01日",
            key: "7"
        },
        {
            orderCode: "NU0391032",
            supplierName: "xx供应商",
            typeName: "3",
            purchasing: '组织g',
            purchasingGroup: "pp",
            voucherDate: "2019年01月31日",
            key: "8"
        },
    ];
    let renderColumns = [...commonColumns];
    let renderData = [...commonData];
    [...new Array(1000)].forEach((_col, index) => {
        renderColumns.push({
            title: `虚拟列_${index}`,
            dataIndex: `virtual_columns_${index}`,
            key: `virtual_columns_${index}`,
            width: 200,
        })
    })
    renderColumns.push({
        title: `虚拟右固定列`,
        dataIndex: `virtual_columns_fixed_right`,
        key: `virtual_columns_fixed_right`,
        width: 200,
        fixed: 'right'
    })
    renderData.forEach((da, index) => {
        [...new Array(1000)].forEach((_col, _index) => {
            da[`virtual_columns_${_index}`] = `数据${_index}`
        })
        da.virtual_columns_fixed_right = `右固定列数据${index}`
    })
    
    
    it('render: sticky, <test prop:: currentScrollColumn>', () => {
      let wrapper = mount(<DragColumnTable columns={renderColumns}
        data={renderData}
        stripeLine={true}
        bigColumns={true}
        draggable={true}
        dragborder={true}
        currentScrollColumn={'typeName'}
        style={{width: '1996px'}}
        bordered/>)
      expect(wrapper.find('tbody tr').length).toBe(8)
      let thLen = wrapper.find('thead th').length;
      expect(wrapper.find('thead th').at(thLen - 2).hasClass('suf')).toBe(true);
      wrapper.setProps({currentScrollColumn: 'virtual_columns_111'})
      expect(wrapper.find('thead th').at(3).hasClass('pre')).toBe(true);
    });

    it('render: table, <test prop:: currentScrollColumn>', () => {
      let wrapper = mount(<DragColumnTable columns={renderColumns}
        data={renderData}
        stripeLine={true}
        bigColumns={true}
        draggable={true}
        dragborder={true}
        currentScrollColumn={'typeName'}
        scrollMode='table'
        style={{width: '1996px'}}
        bordered/>)
      expect(wrapper.find(`.${prefixTable}-scroll`).find('tbody tr').length).toBe(8)
      let thLen = wrapper.find(`.${prefixTable}-scroll`).find('thead th').length;
      expect(wrapper.find(`.${prefixTable}-scroll`).find('thead th').at(thLen - 1).hasClass('suf')).toBe(true);
      wrapper.setProps({currentScrollColumn: 'virtual_columns_111'})
      expect(wrapper.find(`.${prefixTable}-scroll`).find('thead th').at(0).hasClass('pre')).toBe(true);
    });
  })

  // TODO
  describe('onDropBorder', () => {
      const {dragColumn} = Table;
      const DragColumnTable = dragColumn(Table);
      const columns = [
        {
          title: "订单编号",
          dataIndex: "a",
          key: "a",
          width: '200',
          fixed: 'left'
        },
        {
          title: "单据日期",
          dataIndex: "b",
          key: "b",
          width: '600',
          dragborder: false// 本列禁止拖拽调整宽度
        },
        {
          title: "供应商",
          dataIndex: "c",
          key: "c",
          width: '200',
        },
        {
          title: "联系人",
          dataIndex: "d",
          key: "d",
          width: '500',
        }
      ];
    
      const data = [
          {a: "NU0391001", b: "2019-03-01", c: "xx供应商", d: 'Tom', key: "2"},
          {a: "NU0391002", b: "2018-11-02", c: "yy供应商", d: 'Jack', key: "1"},
          {a: "NU0391003", b: "2019-05-03", c: "zz供应商", d: 'Jane', key: "3"}
      ];
  
      async function dragBorder(props, index, moveX, minColumnWidth = 80) {
        it(`dragborder will change column width, <test prop:: dragborder>, <test prop:: headerEventNoStop> , <test prop:: minColumnWidth>, <test prop:: onDropBorder>, <test prop:: onDraggingBorder>, <test prop:: afterDragColWidth>, <test prop:: onMouseDown>`, async () => {
            document.body.innerHTML = `<div id='container' style='width: 800px' />`;
            const onDropBorder = jest.fn();
            let wrapper = mount(<Table dragborder onDropBorder={onDropBorder} />, { attachTo: document.getElementById('container') });
            wrapper.setProps({ data: props.data, columns: props.columns });
            //drag-gap 渲染在正确的位置
            wrapper.find(`.${prefixTable} th`).forEach((node) => {
                if (node.prop('data-line-key') && node.prop('dragborder') !== 'false') {
                    expect(node.exists(`.${prefixTable}-thead-th-drag-gap`)).toBe(true)
                }
            })
    
            //拖拽drag-gap会改变列宽度
            let dragGapNode = document.querySelectorAll(`.${prefixTable}-thead-th-drag-gap`)[index];
            let tdNode = document.querySelectorAll(`th`)[index];
            let widthBeforeDrag = Number(dragGapNode.parentNode.hasAttribute('data-th-width') ? dragGapNode.parentNode.getAttribute('data-th-width') : dragGapNode.parentNode.parentNode.getAttribute('data-th-width'));
            let widthAfterDrag = `${(widthBeforeDrag + moveX) < minColumnWidth ? minColumnWidth : (widthBeforeDrag + moveX)}px`;
            if (minColumnWidth !== 80) { wrapper.setProps({ minColumnWidth: minColumnWidth, data: props.data, columns: props.columns }) };
    
            // 按下drag-gap后出现拖拽的尺表线
            dragGapNode.dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
            await sleep(1000)
            // expect(wrapper.find('Table').at(0).instance().state.resizerVisible).toBe(true)
            // expect(dragGapNode.html).toBe()

            expect(document.querySelector(`.${prefixTable}-drag-resizer`).style.display).toBe("block")
    
            // dragGapNode.dispatchEvent(new MouseEvent('mousemove', { clientX: moveX }))
            document.querySelector(`.${prefixTable}`).dispatchEvent(new MouseEvent('mousemove', { clientX: moveX }))
            await sleep(100)
            if (moveX > 800) {
                // 拖拽距离大于table 容器宽度，在table外触发mouseup
                // dragGapNode.dispatchEvent(new MouseEvent('mouseup'))
                document.querySelector(`#container`).dispatchEvent(new MouseEvent('mouseup'))
                await sleep(100)
                widthAfterDrag = `${widthBeforeDrag}px`;
                expect(onDropBorder).not.toHaveBeenCalled()
            } else {
                // dragGapNode.dispatchEvent(new MouseEvent('mouseup'), {bubbles:true})
                document.querySelector(`.${prefixTable}`).dispatchEvent(new MouseEvent('mouseup'))
                await sleep(100)
                expect(onDropBorder).toHaveBeenCalled()
            }
            
            // 拖拽后的宽度
            // expect(dragGapNode.parentNode.hasAttribute('data-th-width') ? dragGapNode.parentNode.style.maxWidth : dragGapNode.parentNode.parentNode.style.maxWidth).toBe(widthAfterDrag)


            tdNode.dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
            tdNode.dispatchEvent(new MouseEvent('mouseup', {bubbles:true}))
            wrapper.unmount()
        })
      }
      describe('test dragBorder', ()=>{
        let props = { scrollMode:'table', columns , data };
        dragBorder(props, 0, 50); //正常拖拽
        dragBorder(props, 0, -10);  //拖拽让宽度变窄
        dragBorder(props, 0, -100); //默认最小拖拽宽度为80
        dragBorder(props, 0, -100, 50); //设置第三个参数：最小拖拽宽度50
        dragBorder(props, 0, 2000); //超出表格边界，拖拽会取消
        dragBorder(props, 2, 50); //拖拽最后一列，拖拽不起作用
      });
      // 新版有点问题
      describe('test dragBorder', ()=>{
        let props = { columns , data };
        dragBorder(props, 0, 50); //正常拖拽
        dragBorder(Object.assign(props, {cacheId: 'abc'}) , 0, 50); //正常拖拽
        dragBorder(props, 0, -10);  //拖拽让宽度变窄
        dragBorder(props, 0, -100); //默认最小拖拽宽度为80
        dragBorder(props, 0, -100, 50); //设置第三个参数：最小拖拽宽度50
        dragBorder(props, 0, 2000); //超出表格边界，拖拽会取消
        dragBorder(props, 2, 50); //拖拽最后一列，拖拽不起作用
      });
    
  })

  describe('dragColumn', () => {
    const {dragColumn} = Table;
    const DragColumnTable = dragColumn(Table);
    const columns = [
      {
        title: "订单编号",
        dataIndex: "a",
        key: "a",
        width: 100
    },
    {
        title: "单据日期",
        dataIndex: "b",
        key: "b",
        width: 200
    },
    {
        title: "供应商",
        dataIndex: "c",
        key: "c",
        width: 200
    },
    {
        title: "联系人",
        dataIndex: "d",
        key: "d",
        width: 500,
    },
    {
        title: "操作",
        dataIndex: "e",
        key: "e",
        width: 200,
        fixed: 'right',
    }
    ];
  
    const data = [
      {a: "NU0391001", b: "2019-03-01", c: 'xx供应商', d: 'Tom', e: '...', key: "2"},
      {a: "NU0391002", b: "2018-11-02", c: 'yy供应商', d: 'Jack', e: '...', key: "1"},
      {a: "NU0391003", b: "2019-05-03", c: 'zz供应商', d: 'Jane', e: '...', key: "3"}
    ];

    function dragColumnFun(props, index) {
      it(`dragColumn will change column , <test prop:: draggable>, <test prop:: onDragEnd>`, async () => {
          document.body.innerHTML = `<div id='container' style='width: 800px' />`;
          const onDrop = jest.fn();
          const onDragEnd = jest.fn();
          let wrapper = mount(<DragColumnTable {...props} draggable={true} dragborder onDrop={onDrop} onDragEnd={onDragEnd}/>, { attachTo: document.getElementById('container') });
          wrapper.setProps({ data: props.data, columns: props.columns });
          //drag-gap 渲染在正确的位置
          wrapper.find(`.${prefixTable} th`).forEach((node) => {
              if (node.prop('data-line-key')) {
                  expect(node.hasClass(`th-drag`)).toBe(true)
              }
          })
  
          //按下事件
          let dragThNode = document.querySelectorAll(`.th-drag`)[index];
          let dragThNodeNext = document.querySelectorAll(`.th-drag`)[index + 1];
          dragThNode.dispatchEvent(new MouseEvent('mousedown', {bubbles:true}))
          await sleep(100)
          expect(dragThNode.getAttribute('draggable')).toBe('true')

          // 开始拖拽
          dragThNode.dispatchEvent(new MouseEvent('dragstart', { bubbles:true }))
          await sleep(100)
          dragThNodeNext.dispatchEvent(new MouseEvent('dragenter', { bubbles:true }))
          await sleep(100)

          dragThNode.dispatchEvent(new MouseEvent('dragleave', { bubbles:true }))
          await sleep(100)

          dragThNodeNext.dispatchEvent(new MouseEvent('drop', { bubbles:true }))
          await sleep(100)
          expect((dragThNodeNext.style)['border-right-color']).toBe("rgb(30, 136, 229)")
          expect((dragThNodeNext.style)['border-right-style']).toBe("dashed")
          expect((dragThNodeNext.style)['border-right-width']).toBe("2px")
          expect(onDrop).toHaveBeenCalled()
          dragThNodeNext.dispatchEvent(new MouseEvent('dragend', { bubbles:true }))
          await sleep(100)
          expect(onDragEnd).toHaveBeenCalled()
      })
    }
    describe('test dragBorder', ()=>{
      let props = { scrollMode:'table', columns , data };
      dragColumnFun(props, 0); //正常拖拽
    });
    describe('test dragBorder', ()=>{
      let props = { columns , data };
      dragColumnFun(props, 0); //正常拖拽
    });
  
  })

  describe('onDropRow', () => {
    const { bigData } = Table;
    const BigDataTable = bigData(Table);
    const columns = [
      { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
      { title: "员工姓名", dataIndex: "b", key: "b", width: 200 },
      {
          title: "系统权限", dataIndex: "c", key: "c", width: 200, render: (text, _record, _index) => {
              return text ? '管理员' : '用户';
          }
      },
      { title: "部门", dataIndex: "d", key: "d", width: 100 },
      { title: "职级", dataIndex: "e", key: "e", width: 100 }
    ];
  
    const data = [
      { a: "ASVAL_201903280005", b: "小张", c: true, d: "财务二科", e: "M1", key: "1001" },
      { a: "ASVAL_201903200004", b: "小明", c: false, d: "财务一科", e: "T1", key: "1002" },
      { a: "ASVAL_201903120001", b: "小红", c: true, d: "财务四科", e: "T3", key: "1003" },
      { a: "ASVAL_201903120002", b: "小姚", c: false, d: "财务一科", e: "T2", key: "1004" },
    ];

    const bigDatas = [
      { a: "ASVAL_201903280005", b: "小张", c: true, d: "财务二科", e: "M1", key: "1001" },
      { a: "ASVAL_201903200004", b: "小明", c: false, d: "财务一科", e: "T1", key: "1002" },
      { a: "ASVAL_201903120001", b: "小红", c: true, d: "财务四科", e: "T3", key: "1003" },
      { a: "ASVAL_201903120002", b: "小姚", c: false, d: "财务一科", e: "T2", key: "1004" },
    ];

    function renderedText(wrapper, index = 0) {
        const textList = [];
        wrapper.find(`.${prefixTable}-tbody tr`).forEach(tr => {
          textList.push(tr.find('td').at(index).text());
        });
        return textList;
    };

    function dragRow(props, index) {
      it(`dragRow will change row sort, <test prop:: hideDragHandle>`, async () => {
          document.body.innerHTML = `<div id='container1' style='width: 800px' />`;
          const onDragRowStart = jest.fn();
          const onDropRow = jest.fn();
          let wrapper = mount(<Table {...props} dragborder rowDraggAble={true} onDragRowStart={onDragRowStart} onDropRow={onDropRow} />, { attachTo: document.getElementById('container1') });
          wrapper.setProps({ data: props.data, columns: props.columns });
          expect(renderedText(wrapper, 2)).toEqual(['小张', '小明', '小红', '小姚']);
          //drag-handle-column 渲染在正确的位置
          wrapper.find(`.${prefixTable}-body tr`).forEach((node) => {
              if (node.find(`td`).at(0).prop('columntype')) {
                  expect(node.find(`td`).at(0).hasClass(`drag-handle-column`)).toBe(true)
              }
          })
  
          let dragTrNode = document.querySelectorAll(`.${prefixTable}-body tr`)[index];
          let dragTrNodeNext = document.querySelectorAll(`.${prefixTable}-body tr`)[index + 1];
  
          //开始拖拽
          let dragStart = new MouseEvent('dragstart', { bubbles:true });
          dragStart.dataTransfer = {
            effectAllowed: '',
            setData: () => { },
          };
          dragTrNode.dispatchEvent(dragStart);
          expect(onDragRowStart).toHaveBeenCalled();
          
          //显示尺标线
          dragTrNodeNext.querySelector('td').dispatchEvent(new MouseEvent('dragenter', { bubbles:true }))
          await sleep(100)
          expect(document.querySelector(`.${prefixTable}-drag-row-line`).style.display).toBe('block')
          
          //拖拽后改变位置
          dragTrNodeNext.dispatchEvent(new MouseEvent('dragend', { bubbles:true }))
          await sleep(100)
          expect(onDropRow).toHaveBeenCalled()
          wrapper.update();
          expect(renderedText(wrapper, 2)).toEqual(['小明', '小张', '小红', '小姚']);
      })
    }

    function dragTouchRow(props, index) {
      it(`dragRow will change row sort`, async () => {
          document.body.innerHTML = `<div id='container2' style='width: 800px' />`;
          const onDragRowStart = jest.fn();
          const onDropRow = jest.fn();
          let wrapper = mount(<Table {...props} dragborder rowDraggAble={true} onDragRowStart={onDragRowStart} onDropRow={onDropRow} />, { attachTo: document.getElementById('container2') });
          wrapper.setProps({ data: props.data, columns: props.columns });
          expect(renderedText(wrapper, 2)).toEqual(['小张', '小明', '小红', '小姚']);
          //drag-handle-column 渲染在正确的位置
          wrapper.find(`.${prefixTable}-body tr`).forEach((node) => {
              if (node.find(`td`).at(0).prop('columntype')) {
                expect(node.find(`td`).at(0).hasClass(`drag-handle-column`)).toBe(true)
              }
          })
  
          let dragTrNode = document.querySelectorAll(`.${prefixTable}-body tr`)[index];
          let dragTrNodeNext = document.querySelectorAll(`.${prefixTable}-body tr`)[index + 1];
  
          //开始拖拽
          let dragStart = new MouseEvent('touchstart', { bubbles:true });
          await sleep(100)
          dragStart.dataTransfer = {
            effectAllowed: '',
            setData: () => { },
          };
          dragTrNode.dispatchEvent(dragStart);
          await sleep(100)
          expect(onDragRowStart).toHaveBeenCalled();
          
          // dragTrNodeNext.querySelector('td').dispatchEvent(new MouseEvent('touchmove', { bubbles:true }))
          
          
          // //拖拽后改变位置
          // dragTrNodeNext.dispatchEvent(new MouseEvent('touchend', { bubbles:true }))
          // await sleep(100)
          // expect(onDropRow).toHaveBeenCalled()
          // wrapper.update();
      })
    }

    function dragRowBig(props, index) {
      it(`dragRow will change row sort, component: Table, <test prop:: onRowDragStart>, <test prop:: onRowDragDrop>, <test prop:: onDragStart>, <test prop:: onDragEnter>, <test prop:: onDragOver>`, async () => {
          document.body.innerHTML = `<div id='bigContainer' style='width: 800px' />`;
          const onDragRowStart = jest.fn();
          const onDropRow = jest.fn();
          let wrapper = mount(<BigDataTable {...props} dragborder rowDraggAble={true} onDragRowStart={onDragRowStart} onDropRow={onDropRow} />, { attachTo: document.getElementById('bigContainer') });
          wrapper.setProps({ data: props.data, columns: props.columns });
          expect(renderedText(wrapper, 2)).toEqual(['小张', '小明', '小红', '小姚']);
          //drag-handle-column 渲染在正确的位置
          wrapper.find(`.${prefixTable}-body tr`).forEach((node) => {
              if (node.find(`td`).at(0).prop('columntype')) {
                 expect(node.find(`td`).at(0).hasClass(`drag-handle-column`)).toBe(true)
              }
          })
  
          let dragTrNode = document.querySelectorAll(`.${prefixTable}-body tr`)[index];
          let dragTrNodeNext = document.querySelectorAll(`.${prefixTable}-body tr`)[index + 1];
  
          //开始拖拽
          let dragStart = new MouseEvent('dragstart', { bubbles:true });
          await sleep(100)
          dragStart.dataTransfer = {
            effectAllowed: '',
            setData: () => { },
          };
          dragTrNode.dispatchEvent(dragStart);
          await sleep(100)
          expect(onDragRowStart).toHaveBeenCalled();
          
          //显示尺标线
          dragTrNodeNext.querySelector('td').dispatchEvent(new MouseEvent('dragenter', { bubbles:true }))
          await sleep(100)
          expect(document.querySelector(`.${prefixTable}-drag-row-line`).style.display).toBe('block')
          
          //拖拽后改变位置
          dragTrNodeNext.dispatchEvent(new MouseEvent('dragend', { bubbles:true }))
          await sleep(100)
          expect(onDropRow).toHaveBeenCalled()
          wrapper.update();
          expect(renderedText(wrapper, 2)).toEqual(['小明', '小张', '小红', '小姚']);
      })
    }

    describe('test dragRow', ()=>{
      let props = { scrollMode:'table', columns , data: [...data] };
      let touchProps = {scrollMode:'table', columns , data: [...data]}
      let bigProps = {scrollMode:'table', columns , data: [...bigDatas]}
      dragRow(props, 0); //正常拖拽
      dragRowBig(bigProps, 0)
      dragTouchRow(touchProps, 0)
    });

    describe('test dragRow', ()=>{
      let props = { columns , data: [...data] };
      let touchProps = { columns , data: [...data]}
      let bigProps = {columns , data: [...bigDatas]}
      dragRow(props, 0); //正常拖拽
      dragRowBig(bigProps, 0)
      dragTouchRow(touchProps, 0)
    });
  
  })

  describe('Header Render Type', () => {
    const callback = jest.fn()
    const columns = [
      {title: "员工编号", dataIndex: "a", key: "a", width: 150, fieldType: 'link', linkConfig: {
          url: (data, record, index) => {
              return 'key'
          },
          className: 'abc',
          underline: true,
      }},
      {title: "员工收入", dataIndex: "b", key: "b", width: 100, fieldType: 'number', numberConfig: {
          thousand: true,
          preSymbol: '收入',
          nextSymbol: '元'
      }},
      {title: "扣除", dataIndex: "c", key: "c", width: 100, fieldType: 'currency', currencyConfig: {
          thousand: true,
          preSymbol: '扣除',
          nextSymbol: '元',
      }},
      {title: "部门", dataIndex: "d", key: "d", width: 100, fieldType: 'bool', boolConfig: {
          trueText: '财务科',
          falseText: '非财务科'
      }},
      {title: "时间", dataIndex: "e", key: "e", width: 100, fieldType: 'date', dateConfig: {
          moment: null,
          format: 'YYYY-MM-DD'
      }},
      {title: "关系", dataIndex: "f", key: "f", width: 100, fieldType: 'select', selectConfig: {
          options: {
              key: '1',
              value: '1'
          },
          defaultShow: '占位'
      }},
      {title: "按钮", dataIndex: "g", key: "g", width: 100, cellMenu: {
        menu: [{
            key: '1',
            text: '111',
            callback: callback
        }],
        icon: <Icon type='uf-3dot-h'/>,
        iconSize: 24,
        trigger: 'click',
        className: 'xyz'
      }}
    ];
  
    const data = [
      {a: "ASVAL_20190328", b: 3000, c: 1000, d: true, e: "M1", f: 'key', g: 'L1', key: "1"},
      {a: "ASVAL_20190320", b: 2400, c: 1200, d: false, e: "T1", f: 'S1', g: 'L2', key: "2"},
      {a: "ASVAL_20190312", b: 10000, c: 3400, d: true, e: "T2", f: 'S1', g: 'L3', key: "3"}
    ];
    
    it('fieldType: sticky', () => {
      let wrapper = mount(<Table columns={columns} data={data}/>)
      expect(wrapper.find('tbody tr').at(0).find('td').at(0).find(`.${prefixTable}-link`).hasClass('abc')).toBe(true)
      expect(wrapper.find('tbody tr').at(0).find('td').at(0).find(`.${prefixTable}-link-underline`).hasClass('abc')).toBe(true)
      expect(wrapper.find('tbody tr').at(0).find('td').at(1).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-pre`).text()).toBe('收入')
      expect(wrapper.find('tbody tr').at(0).find('td').at(1).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-number`).text()).toBe('3,000')
      expect(wrapper.find('tbody tr').at(0).find('td').at(1).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-next`).text()).toBe('元')
      expect(wrapper.find('tbody tr').at(0).find('td').at(2).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-pre`).text()).toBe('扣除')
      expect(wrapper.find('tbody tr').at(0).find('td').at(2).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-number`).text()).toBe('1,000.00')
      expect(wrapper.find('tbody tr').at(0).find('td').at(2).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-next`).text()).toBe('元')
      expect(wrapper.find('tbody tr').at(0).find('td').at(3).text()).toBe('财务科')
      expect(wrapper.find('tbody tr').at(1).find('td').at(3).text()).toBe('非财务科')
      expect(wrapper.find('tbody tr').at(0).find('td').at(4).text()).toBe('M1')
      expect(wrapper.find('tbody tr').at(0).find('td').at(5).text()).toBe('1')
      expect(wrapper.find('tbody tr').at(1).find('td').at(5).text()).toBe('占位')
      expect(wrapper.find('tbody tr').at(1).find('td').at(6).find(`.${prefix}-icon`).hasClass('uf-3dot-h')).toBe(true)
      // wrapper.find('tbody tr').at(1).find('td').at(6).find(`.${prefix}-icon`).simulate('click')
      // expect(wrapper.find(`.${prefix}-dropdown`).find(`.${prefix}-dropdown-menu`).at(0).hasClass('xyz')).toBe(true)
      // expect(wrapper.find(`.xyz`).find(`li`).length).toBe(1)
      // expect(wrapper.find(`.xyz`).find(`li`).text()).toBe('111')
      // wrapper.find(`.xyz`).find(`li`).simulate('click')
      // expect(callback).toHaveBeenCalled()
    });
    it('fieldType: table', () => {
      let wrapper = mount(<Table columns={columns} data={data} scrollMode='table'/>)
      expect(wrapper.find('tbody tr').at(0).find('td').at(0).find(`.${prefixTable}-link`).hasClass('abc')).toBe(true)
      expect(wrapper.find('tbody tr').at(0).find('td').at(0).find(`.${prefixTable}-link-underline`).hasClass('abc')).toBe(true)
      expect(wrapper.find('tbody tr').at(0).find('td').at(1).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-pre`).text()).toBe('收入')
      expect(wrapper.find('tbody tr').at(0).find('td').at(1).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-number`).text()).toBe('3,000')
      expect(wrapper.find('tbody tr').at(0).find('td').at(1).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-next`).text()).toBe('元')
      expect(wrapper.find('tbody tr').at(0).find('td').at(2).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-pre`).text()).toBe('扣除')
      expect(wrapper.find('tbody tr').at(0).find('td').at(2).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-number`).text()).toBe('1,000.00')
      expect(wrapper.find('tbody tr').at(0).find('td').at(2).find(`.${prefixTable}-currency`).find(`.${prefixTable}-currency-next`).text()).toBe('元')
      expect(wrapper.find('tbody tr').at(0).find('td').at(3).text()).toBe('财务科')
      expect(wrapper.find('tbody tr').at(1).find('td').at(3).text()).toBe('非财务科')
      expect(wrapper.find('tbody tr').at(0).find('td').at(4).text()).toBe('M1')
      expect(wrapper.find('tbody tr').at(0).find('td').at(5).text()).toBe('1')
      expect(wrapper.find('tbody tr').at(1).find('td').at(5).text()).toBe('占位')
      expect(wrapper.find('tbody tr').at(1).find('td').at(6).find(`.${prefix}-icon`).hasClass('uf-3dot-h')).toBe(true)
      // wrapper.find('tbody tr').at(1).find('td').at(6).find(`.${prefix}-icon`).simulate('click')
      // expect(wrapper.find(`.${prefix}-dropdown`).find(`.${prefix}-dropdown-menu`).at(0).hasClass('xyz')).toBe(true)
      // expect(wrapper.find(`.xyz`).find(`li`).length).toBe(1)
      // expect(wrapper.find(`.xyz`).find(`li`).text()).toBe('111')
      // wrapper.find(`.xyz`).find(`li`).simulate('click')
      // expect(callback).toHaveBeenCalled()
    });
  })

  describe('pagination', () => {
    const columns = [
        {title: "员工编号", dataIndex: "a", key: "a", width: 150},
        {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
        {title: "性别", dataIndex: "c", key: "c", width: 100},
        {title: "部门", dataIndex: "d", key: "d", width: 100},
        {title: "职级", dataIndex: "e", key: "e", width: 100}
    ];
  
    const data = [
        {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务1科", e: "M1", key: "1"},
        {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "2"},
        {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务2科", e: "T2", key: "3"}
    ];
    
    [...new Array(100)].forEach((_item, index) => {
        data.push({
            a: `ASVAL_2019033${index}`,
            b: `员工${index + 1}`,
            c: `男`,
            d: `财务${index + 1}科`,
            e: `M${index + 2}`,
            key: `${4 + index}`,
        })
    })

    it('onChange', () => {
      const onChange = jest.fn()
      let pagination = {
          showSizeChanger: true,
          current: 1,
          pageSize: 10
      }
      let wrapper = mount(<Table columns={columns} data={data} pagination={pagination} dragborder onChange={onChange} fieldid="abc"/>)
      expect(wrapper.find('tbody tr')).toHaveLength(10)
      expect(wrapper.find(`.${prefix}-pagination`).props().fieldid).toBe("abc");  
      // expect(wrapper.find(`.${prefix}-pagination-list`).html()).toBe()
      wrapper.find(`.${prefix}-pagination-list`).find('li').at(3).find('a').simulate('click')
      expect(onChange).toHaveBeenCalled()
      wrapper.setProps({ pagination: false})
      expect(wrapper.find('tbody tr')).toHaveLength(103)
    });

    it('position', () => {
      let pagination = {
          showSizeChanger: true,
          position: ['topCenter', 'bottomRight']
      }
      let wrapper = mount(<Table columns={columns} data={data} pagination={pagination} dragborder/>) 
      expect(wrapper.find(`.${prefix}-pagination`)).toHaveLength(2)
      wrapper.setProps({ pagination: false})
      expect(wrapper.find(`.${prefix}-pagination`)).toHaveLength(0)
      wrapper.setProps({ pagination: {showSizeChanger: true,position: ['topCenter']}})
      expect(wrapper.find(`.${prefix}-pagination`)).toHaveLength(1)
      wrapper.setProps({ pagination: {showSizeChanger: true,position: ['bottomLeft']}})
      expect(wrapper.find(`.${prefix}-pagination`)).toHaveLength(1)
      // expect(wrapper.find(`.${prefix}-pagination`).getDOMNode().style['justify-content']).toBe('flex-start')
    });
  })

  describe('scroll Mode', () => {
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 100,
        render(_text, _record, index) {
            return index + 1;
        }
    },
    {
        title: "订单编号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 300,
    },
    {
        title: "供应商名称",
        dataIndex: "supplierName",
        key: "supplierName",
        width: 200
    },
    {
        title: "类型",
        dataIndex: "typeName",
        key: "typeName",
        width: 200
    },
    {
        title: "采购组织",
        dataIndex: "purchasing",
        key: "purchasing",
        width: 200
    },
    {
        title: "采购组",
        dataIndex: "purchasingGroup",
        key: "purchasingGroup",
        width: 200
    },
    {
        title: "凭证日期",
        dataIndex: "voucherDate",
        key: "voucherDate",
        width: 300,
    },
    {
        title: "审批状态",
        dataIndex: "approvalStateName",
        key: "approvalStateName",
        width: 200
    },
    {
        title: "确定状态",
        dataIndex: "confirmStateName",
        key: "confirmStateName",
        width: 200
    },
    {
        title: "关闭状态",
        dataIndex: "closeStateName",
        key: "closeStateName",
        width: 100
    }
    ];
  
    const data = [
      {
        orderCode: "NU0391025",
        supplierName: "xx供应商",
        typeName: "1",
        purchasing: '组织c',
        purchasingGroup: "aa",
        voucherDate: "2018年03月18日",
        approvalStateName: "已审批",
        confirmStateName: "执行中",
        closeStateName: "未关闭",
        key: "1"
    },
    {
        orderCode: "NU0391026",
        supplierName: "xx供应商",
        typeName: "2",
        purchasing: '组织a',
        purchasingGroup: "bb",
        voucherDate: "2018年02月05日",
        approvalStateName: "已审批",
        confirmStateName: "待确定",
        closeStateName: "未关闭",
        key: "2"
    },
    {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "3",
        purchasing: '组织b',
        purchasingGroup: "aa",
        voucherDate: "2018年07月01日",
        approvalStateName: "已审批",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "3"
    },
    {
        orderCode: "NU0391028",
        supplierName: "xx供应商",
        typeName: "4",
        purchasing: '组织c',
        purchasingGroup: "cc",
        voucherDate: "2019年03月01日",
        approvalStateName: "未审批",
        confirmStateName: "待确定",
        closeStateName: "未关闭",
        key: "4"
    },
    {
        orderCode: "NU0391029",
        supplierName: "xx供应商",
        typeName: "5",
        purchasing: '组织d',
        purchasingGroup: "ss",
        voucherDate: "2019年02月14日",
        approvalStateName: "未审批",
        confirmStateName: "待确定",
        closeStateName: "未关闭",
        key: "5"
    }
    ];
    let boxBoundRect = {
        width: 2000,
        height: 100
    }
    let contentBoundRect = {
        width: 800,
        height: 100
     }

    let footBoundRect = {
        width: 800,
     }

    it('scroll x, <test prop:: handleScrollX>, <test prop:: resetScroll>', async () => {
      const { sum } = Table
      const handleScrollX = jest.fn()
      let SumTable = sum(Table);
      const container = document.createElement('div');
      document.body.innerHTML = '';
      document.body.appendChild(container);
      let wrapper = mount(<SumTable columns={columns} data={data} scroll={{ x: 900 }} style={{width: '800px'}} handleScrollX={handleScrollX}/>, { attachTo: container})
      // wrapper.setProps({ data, columns })
      const box = document.querySelector(`.${prefixTable}-body table`);
      const content = document.querySelector(`.${prefixTable}-body`);
      const foot = document.querySelector(`.${prefixTable}-sum`);
      // jest.spyOn(box, 'getBoundingClientRect').mockReturnValue(boxBoundRect)
      // jest.spyOn(content, 'getBoundingClientRect').mockReturnValue(contentBoundRect)  
      // jest.spyOn(foot, 'getBoundingClientRect').mockReturnValue(footBoundRect)
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(1)
      jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(800)
      jest.spyOn(content, 'scrollWidth', 'get').mockReturnValue(2000)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-middle`)).toBe(true)
      expect(handleScrollX).toHaveBeenCalled()
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(0)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-left`)).toBe(true)
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(1200)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-right`)).toBe(true)
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(0)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      jest.spyOn(foot, 'scrollLeft', 'get').mockReturnValue(1200)
      wrapper.find(`.${prefixTable}-sum`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-right`)).toBe(true)
      wrapper.setProps({resetScroll: true})
      // expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-left`)).toBe(true)
    });

    it('<table> scroll x', async () => {
      const handleScrollX = jest.fn()
      const container = document.createElement('div');
      document.body.innerHTML = '';
      document.body.appendChild(container);
      let wrapper = mount(<Table columns={columns} scrollMode='table' data={data} scroll={{ x: 900 }} style={{width: '800px'}} handleScrollX={handleScrollX}/>, { attachTo: container})
      const box = document.querySelector(`.${prefixTable}-body table`);
      const content = document.querySelector(`.${prefixTable}-body`);
      jest.spyOn(box, 'getBoundingClientRect').mockReturnValue(boxBoundRect)
      jest.spyOn(content, 'getBoundingClientRect').mockReturnValue(contentBoundRect)  
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(1)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-middle`)).toBe(true)
      expect(handleScrollX).toHaveBeenCalled()
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(0)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-left`)).toBe(true)
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(1200)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-right`)).toBe(true)
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(0)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      wrapper.setProps({resetScroll: true})
    });

    it('bigColumns scroll x', async () => {
      const { sum } = Table
      let SumTable = sum(Table);
      const container = document.createElement('div');
      document.body.innerHTML = '';
      document.body.appendChild(container);
      let wrapper = mount(<SumTable columns={columns} data={data} scroll={{ x: 900 }} style={{width: '800px'}} bigColumns/>, { attachTo: container})
      const box = document.querySelector(`.${prefixTable}-body table`);
      const content = document.querySelector(`.${prefixTable}-body`);
      // jest.spyOn(box, 'getBoundingClientRect').mockReturnValue(boxBoundRect)
      // jest.spyOn(content, 'getBoundingClientRect').mockReturnValue(contentBoundRect)  
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(1)
      jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(800)
      jest.spyOn(content, 'scrollWidth', 'get').mockReturnValue(2000)

      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-middle`)).toBe(true)
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(1200)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-right`)).toBe(true)
    });

    it('bigColumns scroll x: <table>, <test prop:: footerScroll>', async () => {
      const { sum } = Table
      let SumTable = sum(Table);
      const container = document.createElement('div');
      document.body.innerHTML = '';
      document.body.appendChild(container);
      let wrapper = mount(<SumTable scroll='table' columns={columns} data={data} scroll={{ x: 900 }} style={{width: '800px'}} bigColumns/>, { attachTo: container})
      // expect(wrapper.find(`.${prefixTable}`).find(`.${prefixTable}-body`).getDOMNode().style[`overflow-x`]).toBe('hidden')
      // expect(wrapper.find(`.${prefixTable}`).find(`.${prefixTable}-body`).getDOMNode().style['overflow']).toBe('auto')
      const box = document.querySelector(`.${prefixTable}-body table`);
      const content = document.querySelector(`.${prefixTable}-body`);
      // jest.spyOn(box, 'getBoundingClientRect').mockReturnValue(boxBoundRect)
      // jest.spyOn(content, 'getBoundingClientRect').mockReturnValue(contentBoundRect)  
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(1)
      jest.spyOn(content, 'scrollWidth', 'get').mockReturnValue(2000)
      jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(800)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-middle`)).toBe(true)
      jest.spyOn(content, 'scrollLeft', 'get').mockReturnValue(1200)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(wrapper.find(`.${prefixTable}`).hasClass(`${prefixTable}-scroll-position-right`)).toBe(true)
    });

    it('scroll y, <test prop:: scrollTop>, <test prop:: ignoreScrollYChange>', async () => {
      const container = document.createElement('div');
      const onBodyScroll = jest.fn()
      document.body.innerHTML = '';
      document.body.appendChild(container);
      let wrapper = mount(<Table columns={columns} data={data} hovercontent={() => (<span>hovercontent</span>)} scroll={{ x: 900, y: 130 }} onBodyScroll={onBodyScroll}/>, { attachTo: container})
      const content = document.querySelector(`.${prefixTable}-body`); 
      jest.spyOn(content, 'scrollTop', 'get').mockReturnValue(20)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(onBodyScroll).toHaveBeenCalled()
      wrapper.setProps({scroll: {x: 900, y: 110}, ignoreScrollYChange: true})
    });

    it('scroll y: <table>, <test prop:: scrollTop>, <test prop:: ignoreScrollYChange>', async () => {
      const container = document.createElement('div');
      const onBodyScroll = jest.fn()
      document.body.innerHTML = '';
      document.body.appendChild(container);
      let wrapper = mount(<Table columns={columns} scrollMode='table' data={data} hovercontent={() => (<span>hovercontent</span>)} scroll={{ x: 900, y: 130 }} onBodyScroll={onBodyScroll}/>, { attachTo: container})
      const content = document.querySelector(`.${prefixTable}-body`); 
      jest.spyOn(content, 'scrollTop', 'get').mockReturnValue(20)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(onBodyScroll).toHaveBeenCalled()
      wrapper.setProps({scroll: {x: 900, y: 110}, ignoreScrollYChange: true})
    });

    it('bigData scroll y, <test prop:: handleScrollY>', async () => {
      const { bigData } = Table
      const BigDataTable = bigData(Table);
      const container = document.createElement('div');
      const onBodyScroll = jest.fn()
      document.body.innerHTML = '';
      document.body.appendChild(container);
      let wrapper = mount(<BigDataTable columns={columns} data={data} scroll={{ x: 900, y: 130 }} onBodyScroll={onBodyScroll}/>, { attachTo: container})
      const content = document.querySelector(`.${prefixTable}-body`); 
      jest.spyOn(content, 'scrollTop', 'get').mockReturnValue(20)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      await sleep(300)
      expect(onBodyScroll).toHaveBeenCalled()
      wrapper.setProps({scroll: {x: 900, y: 110}})
    });

    it('bigData scroll y: <table>, <test prop:: lazyLoad>', () => {
      const columns = [
        {
          title: '序号', dataIndex: 'index', key: 'index', width: 60, render(text, record, index) {
            return index + 1;
          },
          fixed: 'left'
        },
        
  
        { title: "用户名", dataIndex: "a", key: "a", width: 300 },
        { title: "性别", dataIndex: "b", key: "b", width: 80 },
        { title: "年龄", dataIndex: "c", key: "c", width: 200, fixed: 'right' }
  
      ];
      const _columns = [
        {
          title: '序号', dataIndex: 'index', key: 'index', width: 60, render(text, record, index) {
            return index + 1;
          },
          fixed: 'left'
        },
        
  
        { title: "用户名", dataIndex: "a", key: "a", width: 300 },
        { title: "性别", dataIndex: "b", key: "b", width: 80 },
      ];
      const data = [...new Array(10000)].map((_e, i) => {
      const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
        if ([2, 4, 6, 50, 100, 101, 102].includes(i)) { // 模拟可展开的子行集合数据
            rs.children = [];
            for (let subj = 0; subj < 100; subj++) {
                rs.children.push({
                    a: 333 + ' ' + subj,
                    b: 333 + ' ' + subj,
                    c: 333 + ' ' + subj,
                    d: 333 + ' ' + subj,
                    key: i + `-${subj}`,
                });
                rs.isleaf = true
            }
        }
        return rs;
      })
      const { bigData } = Table
      const BigDataTable = bigData(Table);
      const container = document.createElement('div');
      const onBodyScroll = jest.fn()
      document.body.innerHTML = '';
      document.body.appendChild(container);
      let wrapper = mount(<BigDataTable columns={columns} scrollMode='table' data={data} scroll={{ x: 900, y: 130 }} onBodyScroll={onBodyScroll}/>, { attachTo: container})
      const content = document.querySelector(`.${prefixTable}-body`); 
      jest.spyOn(content, 'scrollTop', 'get').mockReturnValue(900)
      wrapper.find(`.${prefixTable}-body`).simulate('scroll')
      expect(onBodyScroll).toHaveBeenCalled()
      wrapper.setProps({scroll: {x: 900, y: 110}, columns: _columns})
    });

  })
  describe('scroll Mode', () => {
    const { bigData } = Table
    const BigDataTable = bigData(Table);


    it('bigData scroll y, <test prop:: bodyDisplayInRow>, <test prop:: headerDisplayInRow>, <test prop:: showExpandIcon>', () => {
      const columns = [
        {
          title: '序号', dataIndex: 'index', key: 'index', width: 60, render(text, record, index) {
            return index + 1;
          },
          fixed: 'left'
        },
        
  
        { title: "用户名", dataIndex: "a", key: "a", width: 300 },
        { title: "性别", dataIndex: "b", key: "b", width: 80 },
        { title: "年龄", dataIndex: "c", key: "c", width: 200, fixed: 'right' }
  
      ];
      const _columns = [
        {
          title: '序号', dataIndex: 'index', key: 'index', width: '20%', render(text, record, index) {
            return index + 1;
          },
          fixed: 'left'
        },
        
  
        { title: "用户名", dataIndex: "a", key: "a", width: '30%' },
        { title: "性别", dataIndex: "b", key: "b", width: '30%' },
        { title: "年龄", dataIndex: "c", key: "c", width: '20%', fixed: 'right' }
  
      ];

      const data = [...new Array(10000)].map((_e, i) => {
      const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
        if ([2, 4, 6, 50, 100, 101, 102].includes(i)) { // 模拟可展开的子行集合数据
            rs.children = [];
            for (let subj = 0; subj < 100; subj++) {
                rs.children.push({
                    a: 333 + ' ' + subj,
                    b: 333 + ' ' + subj,
                    c: 333 + ' ' + subj,
                    d: 333 + ' ' + subj,
                    key: i + `-${subj}`,
                });
                rs.isleaf = true
            }
        }
        return rs;
      })
      const _data = [...new Array(10000)].map((_e, i) => {
        const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
        return rs;
      })
      let wrapper = mount(<BigDataTable expandIconAsCell columns={columns} data={data} scroll={{ x: 900, y: 130 }} defaultExpandAllRows showExpandIcon/>)
      expect(wrapper.find(`thead th`).at(0).hasClass(`${prefixTable}-expand-icon-col`)).toBe(true)
      wrapper.setProps({showExpandIcon: (record, index) => ( index % 2)})
      expect(wrapper.find(`thead th`).at(0).hasClass(`${prefixTable}-expand-icon-col`)).toBe(true)

      let wrapper1 = mount(<BigDataTable expandIconAsCell scrollMode='table' columns={columns} data={data} scroll={{ x: 900, y: 130 }} defaultExpandAllRows showExpandIcon/>)
      expect(wrapper1.find(`.${prefixTable}-fixed-left th`).at(0).hasClass(`${prefixTable}-expand-icon-th`)).toBe(true)
      wrapper1.setProps({showExpandIcon: (record, index) => ( index % 2), bodyDisplayInRow: false, headerDisplayInRow: false, hideHeaderScroll: true, scroll: { x: true, y: 130 }})
      expect(wrapper1.find(`.${prefixTable}-fixed-left th`).at(0).hasClass(`${prefixTable}-expand-icon-th`)).toBe(true)
      wrapper1.setProps({showExpandIcon: false})
      expect(wrapper1.find(`.${prefixTable}-fixed-left th`).at(0).hasClass(`${prefixTable}-expand-icon-th`)).toBe(true)

      let _wrapper = mount(<BigDataTable expandIconAsCell scrollMode='table' columns={columns} data={_data} scroll={{ x: 900, y: 130 }} expandedRowKeys={[1]} defaultExpandAllRows expandedRowRender={() => (<span>111</span>)}/>)
      expect(_wrapper.find(`.${prefixTable}-fixed-left th`).at(0).hasClass(`${prefixTable}-expand-icon-th`)).toBe(true)
      _wrapper.setProps({haveExpandIcon: (record, index) => ( index % 2)})
      expect(_wrapper.find(`.${prefixTable}-fixed-left th`).at(0).hasClass(`${prefixTable}-expand-icon-th`)).toBe(true)
      _wrapper.setProps({data: [], headerScroll: true, columns: _columns})
      expect(_wrapper.find(`.${prefixTable}-fixed-left th`).at(0).hasClass(`${prefixTable}-expand-icon-th`)).toBe(true)
    })
  })

  describe('props:  columnKey', () => {
    const { dragColumn } = Table;
    const DragColumnTable = dragColumn(Table);
    const columns = [
      {
          title: "订单编号",
          dataIndex: "a",
          t: "a",
          width: '200'
      },
      {
          title: "单据日期",
          dataIndex: "b",
          t: "b",
          width: '600',
          dragborder: false // 本列禁止拖拽调整宽度
      },
      {
          title: "供应商",
          dataIndex: "c",
          t: "c",
          width: '200',
      },
      {
          title: "联系人",
          dataIndex: "d",
          t: "d",
          width: 500,
      }
    ];
    const data = [
        {a: "NU0391001", b: "2019-03-01", c: "xx供应商", d: 'Tom', key: "2"},
        {a: "NU0391002", b: "2018-11-02", c: "yy供应商", d: 'Jack', key: "1"},
        {a: "NU0391003", b: "2019-05-03", c: "zz供应商", d: 'Jane', key: "3"}
    ];
    it('component: Table, <test prop:: columnKey>', () => {
      let wrapper = mount(<DragColumnTable columns={columns} data={data} columnKey='t'/>)
      columns.forEach((item, index) => {
        expect(wrapper.find('th').at(index).prop('data-col-key')).toBe(item.t)
      });
      let _wrapper = mount(<DragColumnTable columns={columns} data={data} scrollMode='table' columnKey='t'/>)
      columns.forEach((item, index) => {
        expect(_wrapper.find('th').at(index).prop('data-col-key')).toBe(item.t)
      });
    })
  })
  describe('props: new sort', () => {
    const { sort } = Table;
    const SortTable = sort(Table);
    const columns = [
      {
        title: "单据编号",
        dataIndex: "num",
        key: "num",
        width: 120,
    },
    {
        title: "单据日期",
        dataIndex: "date",
        key: "date",
        width: 200,
        sorter: 'date',
    },
    {
        title: "供应商",
        dataIndex: "supplier",
        key: "supplier",
        width: 100,
        sorter: 'string',
    },
    {
        title: "联系人",
        dataIndex: "contact",
        key: "contact",
    },
    {
        title: "整单数量",
        dataIndex: "total",
        key: "total",
        width: 150,
        sorter: 'number',
    }
    ];
    const data = [
      { num: "NU0391001", date: "2019-03-01", supplier: 'xx供应商', contact: 'Tom', total: 30, key: "1" },
      { num: "NU0391002", date: "2018-11-02", supplier: 'yy供应商', contact: 'Jack', total: 41, key: "2" },
      { num: "NU0391003", date: "2019-05-03", supplier: 'zz供应商', contact: 'Jane', total: 25, key: "3" }
    ];
    function renderedText(wrapper, index = 0) {
      const textList = [];
      wrapper.find(`.${prefixTable}-tbody tr`).forEach(tr => {
        textList.push(tr.find('td').at(index).text());
      });
      return textList;
    };

    it('component: Table, <test prop:: sort>', () => {
      let wrapper = mount(<SortTable columns={columns} data={data}/>)
      wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click'); //单据日期
      expect(renderedText(wrapper)).toEqual(["NU0391003", "NU0391001", "NU0391002"]);
      expect(renderedText(wrapper, 1)).toEqual(["2019-05-03", "2019-03-01", "2018-11-02"]);
      wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click'); //单据日期
      expect(renderedText(wrapper)).toEqual(["NU0391001", "NU0391002", "NU0391003"]);
      expect(renderedText(wrapper, 1)).toEqual(["2019-03-01", "2018-11-02", "2019-05-03"]);

      wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click'); //单据日期
      expect(renderedText(wrapper)).toEqual(["NU0391003", "NU0391002", "NU0391001"]);
      expect(renderedText(wrapper, 2)).toEqual(["zz供应商", "yy供应商", "xx供应商"]);
      wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click'); //单据日期
      expect(renderedText(wrapper)).toEqual(["NU0391001", "NU0391002", "NU0391003"]);
      expect(renderedText(wrapper, 2)).toEqual(["xx供应商", "yy供应商", "zz供应商"]);

      wrapper.find(`.${prefixTable}-column-sorter`).at(2).find(`.uf-triangle-down`).simulate('click'); //单据日期
      expect(renderedText(wrapper)).toEqual(["NU0391002", "NU0391001", "NU0391003"]);
      expect(renderedText(wrapper, 4)).toEqual(["41", "30", "25"]);
      wrapper.find(`.${prefixTable}-column-sorter`).at(2).find(`.uf-triangle-down`).simulate('click'); //单据日期
      expect(renderedText(wrapper)).toEqual(["NU0391001", "NU0391002", "NU0391003"]);
      expect(renderedText(wrapper, 4)).toEqual(["30", "41", "25"]);

    })
  })

  // 列锁定总宽度大于可视区域表格宽度，自动解锁并提示
  describe('fixed columns width more than table width', () => {
    const columns = [
      {
        title: "单据编号",
        dataIndex: "num",
        key: "num",
        width: 120,
        fixed: true
    },
    {
        title: "单据日期",
        dataIndex: "date",
        key: "date",
        width: 200,
        fixed: true
    },
    {
        title: "供应商",
        dataIndex: "supplier",
        key: "supplier",
        width: 100,
        fixed: true
    },
    {
        title: "联系人",
        dataIndex: "contact",
        key: "contact",
        width: 100,
        fixed: true
    },
    {
        title: "整单数量",
        dataIndex: "total",
        key: "total",
        width: 150,
    }
    ];
    const data = [
      { num: "NU0391001", date: "2019-03-01", supplier: 'xx供应商', contact: 'Tom', total: 30, key: "1" },
      { num: "NU0391002", date: "2018-11-02", supplier: 'yy供应商', contact: 'Jack', total: 41, key: "2" },
      { num: "NU0391003", date: "2019-05-03", supplier: 'zz供应商', contact: 'Jane', total: 25, key: "3" }
    ];
    it('component: Table, <test prop:: width>', () => {
      let wrapper = mount(<Table columns={columns} data={data} style={{width: '450px'}}/>)
      // wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click'); //单据日期
      // expect(renderedText(wrapper)).toEqual(["NU0391003", "NU0391001", "NU0391002"]);
      // expect(renderedText(wrapper, 1)).toEqual(["2019-05-03", "2019-03-01", "2018-11-02"]);
      // wrapper.find(`.${prefixTable}-column-sorter`).at(0).find(`.uf-triangle-down`).simulate('click'); //单据日期
      // expect(renderedText(wrapper)).toEqual(["NU0391001", "NU0391002", "NU0391003"]);
      // expect(renderedText(wrapper, 1)).toEqual(["2019-03-01", "2018-11-02", "2019-05-03"]);

      // wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click'); //单据日期
      // expect(renderedText(wrapper)).toEqual(["NU0391003", "NU0391002", "NU0391001"]);
      // expect(renderedText(wrapper, 2)).toEqual(["zz供应商", "yy供应商", "xx供应商"]);
      // wrapper.find(`.${prefixTable}-column-sorter`).at(1).find(`.uf-triangle-down`).simulate('click'); //单据日期
      // expect(renderedText(wrapper)).toEqual(["NU0391001", "NU0391002", "NU0391003"]);
      // expect(renderedText(wrapper, 2)).toEqual(["xx供应商", "yy供应商", "zz供应商"]);

      // wrapper.find(`.${prefixTable}-column-sorter`).at(2).find(`.uf-triangle-down`).simulate('click'); //单据日期
      // expect(renderedText(wrapper)).toEqual(["NU0391002", "NU0391001", "NU0391003"]);
      // expect(renderedText(wrapper, 4)).toEqual(["41", "30", "25"]);
      // wrapper.find(`.${prefixTable}-column-sorter`).at(2).find(`.uf-triangle-down`).simulate('click'); //单据日期
      // expect(renderedText(wrapper)).toEqual(["NU0391001", "NU0391002", "NU0391003"]);
      // expect(renderedText(wrapper, 4)).toEqual(["30", "41", "25"]);

    })
  })

  // 框选点选
  describe('cell select', () => {
    const renderContent = (value, _row, index) => {
      const obj = {
          children: value,
          props: {},
      };
      if (index === 4) {
          obj.props.colSpan = 0;
      }
      return obj;
    };

    const columns = [
      {
          title: '姓名',
          key: "name",
          dataIndex: 'name',
          render: (text, _record, index) => {
              if (index < 4) {
                  return <a href="javascript:void(0);">{text}</a>;
              }
              return {
                  children: <a href="javascript:void(0);">{text}</a>,
                  props: {
                      colSpan: 1,
                  },
              };
          },
      }, {
          title: '年龄',
          key: "age",
          dataIndex: 'age',
          render: (text, _record, index) => {
              if (index < 4 || index > 4) {
                  return text;
              }
              return {
                  children: text,
                  props: {
                      colSpan: 3,
                  },
              };
          },
      }, {
          title: '座机',
          key: "tel",
          dataIndex: 'tel',
          render: (text, _record, index) => {
              const obj = {
                  children: text,
                  props: {},
              };
              if (index === 2) {
                  obj.props.rowSpan = 2;
              }
              if (index === 3) {
                  obj.props.rowSpan = 0;
              }
              if (index === 4) {
                  obj.props.colSpan = 0;
              }
              return obj;
          },
      }, {
          title: '手机号',
          // colSpan: 0,
          key: "phone",
          dataIndex: 'phone',
          render: renderContent,
      }, {
          title: '家庭住址',
          key: "address",
          dataIndex: 'address',
          render: (text, _record, _index) => {
              return text;
          },
      }];
      
    const data = [
      {
          key: 'key1',
          name: '小红',
          age: 32,
          tel: '0571-22098909',
          phone: 18889898989,
          address: '北京海淀',
      }, {
          key: 'key2',
          name: '小明',
          tel: '0571-22098333',
          phone: 18889898888,
          age: 42,
          address: '河北张家口',
      }, {
          key: 'key3',
          name: '张三',
          age: 32,
          tel: '0575-22098909',
          phone: 18900010002,
          address: '浙江杭州',
      }, {
          key: 'key4',
          name: '李四',
          age: 18,
          tel: '0575-22098909',
          phone: 18900010002,
          address: '广州深圳',
      }, {
          key: 'key5',
          name: '王五',
          age: 18,
          tel: '0575-22098909',
          phone: 18900010002,
          address: '北京昌平',
      }, {
          key: 'key6',
          name: '赵六',
          age: 28,
          tel: '0575-2209908',
          phone: 18900010002,
          address: '北京东城',
      }
    ];

    // 判断class类名
    const hasClass = (container, rowIndex, cellIndex, directions = [], excludeDirections = [], type = "solid") => {
      if (directions.length) {
        directions.forEach(direction => {
          expect(container.find(`.${prefixTable}-tbody tr`).at(rowIndex).find('td').at(cellIndex).hasClass(`${prefixTable}-cell-selected`)).toBe(true)
          expect(container.find(`.${prefixTable}-tbody tr`).at(rowIndex).find('td').at(cellIndex).hasClass(`${prefixTable}-cell-selected-${direction}-${type}`)).toBe(true)
        })
      }
      if (excludeDirections.length) {
        excludeDirections.forEach(direction => {
          expect(container.find(`.${prefixTable}-tbody tr`).at(rowIndex).find('td').at(cellIndex).hasClass(`${prefixTable}-cell-selected-${direction}-${type}`)).toBe(false)
        })
      }
    }
    
    it('component: Table, <test prop:: selcet cell border>', async () => {
      let wrapper = mount(<Table className={'test-table'} columns={columns} data={data} bordered openSelectCells />)
      const child = document.querySelector('.test-table')
      await sleep(500)
      jest.spyOn(child, 'getBoundingClientRect').mockReturnValue({
        width: 1500,
          height: 500
      })
      await sleep(500)

      wrapper.find(`.${prefixTable}-tbody tr`).at(1).find('td').at(1).simulate('mousedown')
      await sleep(100)
      hasClass(wrapper, 1, 1, ['top', 'bottom', 'left', 'right'])

      // 向下移动框选单元格
      wrapper.find(`.${prefixTable}-tbody tr`).at(2).find('td').at(1).simulate('mouseenter')
      await sleep(100)
      hasClass(wrapper, 1, 1, ['top','left', 'right'], ['bottom'])
      hasClass(wrapper, 2, 1, ['bottom','left', 'right'], ['top'])

      // 向左移动
      wrapper.find(`.${prefixTable}-tbody tr`).at(2).find('td').at(0).simulate('mouseenter')
      await sleep(100)
      hasClass(wrapper, 1, 1, ['top','right'], ['bottom', 'left'])
      hasClass(wrapper, 2, 1, ['bottom', 'right'], ['left','top'])
      hasClass(wrapper, 1, 0, ['top','left'], ['bottom', 'right'])
      hasClass(wrapper, 2, 0, ['bottom','left'], ['top', 'right'])

      // 向右移动，其实列的左侧会取消，右侧合并单元格会计算最终框选单元格
      wrapper.find(`.${prefixTable}-tbody tr`).at(2).find('td').at(2).simulate('mouseenter')
      await sleep(100)
      hasClass(wrapper, 1, 1, ['top','left'], ['bottom', 'right'])
      hasClass(wrapper, 1, 2, ['top','right'], ['bottom', 'left'])
      hasClass(wrapper, 2, 1, ['left'], ['top','bottom', 'right'])
      hasClass(wrapper, 2, 2, ['bottom','right'], ['top', 'left'])
      hasClass(wrapper, 3, 1, ['bottom','left'], ['top', 'right'])

      // 向下移动合并列
      wrapper.find(`.${prefixTable}-tbody tr`).at(4).find('td').at(1).simulate('mouseenter')
      await sleep(100)
      hasClass(wrapper, 3, 1, ['left'], ['top', 'right', 'bottom'])
      hasClass(wrapper, 4, 1, ['left', 'bottom', 'right'], ['top'])
      hasClass(wrapper, 1, 3, ['top','right'], ['bottom', 'left'])
      hasClass(wrapper, 2, 3, ['right'], ['top','bottom', 'left'])
      hasClass(wrapper, 3, 2, ['right'], ['top','bottom', 'left'])
      wrapper.find(`.${prefixTable}-tbody tr`).at(4).find('td').at(1).simulate('mouseup')

      // 松开重新点击其他单元格
      wrapper.find(`.${prefixTable}-tbody tr`).at(1).find('td').at(4).simulate('mouseenter')
      await sleep(100)
      hasClass(wrapper, 1, 14 ['left', 'top', 'right', 'bottom'], [])

      // 触发右键并传入参数clientX和clientY
      fireEvent.contextMenu(screen.getByText('河北张家口'), {clientX: 300, clientY: 300})
      await sleep(300)
      // expect(document.body.innerHTML).toMatchSnapshot()
      // expect(document.getElementsByClassName(`${prefix}-dropdown-menu`).length).toBe(1)
      // expect(wrapper.innerHTML).toMatchSnapshot()
      // expect(wrapper.find(`.${prefix}-dropdown-menu`).length).toBe(1)
      // 触发document监听的copy事件



      // document.simulate('copy')
      // await sleep(100)
      // hasClass(wrapper, 3, 1, ['left'], ['top', 'right', 'bottom'], 'dashed')
    })
  })
})
