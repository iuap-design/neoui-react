import React from 'react';
import Space from '../../../../packages/wui-space/src';
import {Button, Input, Icon, Select, DatePicker, TimePicker, Cascader, AutoComplete, TreeSelect, InputNumber, Dropdown, Menu} from '../../../../packages/index';
import type {SpaceSize, SpaceAlign} from '../../../../packages/wui-space/src/iSpace'

Cypress.config({
  viewportWidth: 600,
  viewportHeight: 400,
}) 

const sizeArr: Array<SpaceSize> = ['small', 'middle', 'large', 20];
const alignArr: Array<SpaceAlign> = ['start', 'end', 'center', 'baseline'];
const directionArr: Array<any> = ['vertical', 'horizontal'];

function BaseSpace(props: any) {
  return (
    <Space {...props}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
    </Space>
  )
}

describe('space.cy.tsx-default', () => {
  it('should mount default', () => {
    cy.mount((<BaseSpace />));
    cy.compareSnapshot('default');
  });
})

describe('space.cy.tsx-direction', () => {
  it('should mount direction', () => {

    cy.mount((<>
      {
        directionArr.map(item => {
          return (<><BaseSpace direction={item} /><br/><br/></>)
        })
      }
    </>));
    cy.compareSnapshot('direction');
    
  });
})

describe('space.cy.tsx-size', () => {
  it('should mount size', () => {
    
    cy.mount((<>
      {
        sizeArr.map(item => {
          return (<><BaseSpace size={item} /><br/><br/></>)
        })
      }
    </>));
    cy.compareSnapshot('size');

  });
})

describe('space.cy.tsx-align', () => {
  it('should mount', () => {

    cy.mount((<>
      {
        alignArr.map(item => {
          return (
            <>
              <Space align={item}>
                {item}
                <Button type="primary">Primary</Button>
                <span className="mock-block">Block</span>
            </Space>
            <br/>
            <br/>
            </>
          )
        })
      }
    </>));
    cy.compareSnapshot('align');

  });
})

describe('space.cy.tsx-split', () => {
  it('should mount', () => {
    cy.mount((<BaseSpace split={'-'} />));
    cy.compareSnapshot('split---');
  });
})

describe('space.cy.tsx-Compact', () => {
  it('should mount CompactButton', () => {
    cy.mount((<CompactButton />));
    cy.wait(500);
    cy.compareSnapshot('CompactButton');
  });

  it('should mount CompactInput', () => {
    cy.mount((<CompactInput />));
    cy.wait(500)
    cy.viewport(800, 800)
    cy.compareSnapshot('CompactInput');
  });
})

function CompactButton() {
  const {Item} = Menu;
  const {Compact} = Space;
  const menu1 = (
    <Menu>
        <Item key="1">借款合同</Item>
        <Item key="2">抵/质押合同</Item>
        <Item key="3">担保合同</Item>
        <Item key="4">联保合同</Item>
        <Item key="5">合同审批</Item>
        <Item key="6">抵/质押合同跟踪</Item>
    </Menu>
);
return (
    <>
        <Compact>
            <Button type='primary'>增加</Button>
            <Button>其他</Button>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
                triggerType="icon"
            >打印</Dropdown.Button>
            <Button>其他</Button>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
                triggerType="icon"
            >导入</Dropdown.Button>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
            >导出</Dropdown.Button>
        </Compact>
        <br/>
        <br/>
        <Compact>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
                triggerType="icon"
            >打印</Dropdown.Button>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
                triggerType="icon"
            >导入</Dropdown.Button>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
                triggerType="icon"
            >导出</Dropdown.Button>
        </Compact>
        <br/>
        <br/>
        <Compact direction='vertical'>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
                triggerType="icon"
            >导入</Dropdown.Button>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
            >导出</Dropdown.Button>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
                triggerType="icon"
            >导入</Dropdown.Button>
            <Button className="no-right-radius">其他</Button>
            <Dropdown.Button
                overlay={menu1}
                transitionName="slide-up"
                triggerType="icon"
            > 导入</Dropdown.Button>
        </Compact>
        <br/>
        <br/>
        <Compact direction='vertical'>
            <Button>新增</Button>
            <Button>确认</Button>
            <Button>其他</Button>
        </Compact>
    </>
);
}

function CompactInput() {
  const {Compact} = Space;
  const { RangePicker } = DatePicker;
  const { TreeNode } = TreeSelect;
  
  let options = [
      {
          key: "vision",
          label: "幻视"
      },
      {
          key: "shang-chi",
          label: "尚气"
      },
      {
          key: "peter",
          label: "彼得"
      }
  ];
  const CascaderOptions: any = [{
      label: '基础组件',
      value: 'jczj',
      children: [{
          label: '导航',
          value: 'dh',
          children: [{
              label: '面包屑',
              value: 'mbx'
          }, {
              label: '分页',
              value: 'fy'
          }, {
              label: '标签',
              value: 'bq'
          }, {
              label: '菜单',
              value: 'cd'
          }]
      }, {
          label: '反馈',
          value: 'fk',
          children: [{
              label: '模态框',
              value: 'mtk'
          }, {
              label: '通知',
              value: 'tz'
          }]
      },
      {
          label: '表单',
          value: 'bd'
      }]
  }, {
      label: '应用组件',
      value: 'yyzj',
      children: [{
          label: '参照',
          value: 'ref',
          children: [{
              label: '树参照',
              value: 'reftree'
          }, {
              label: '表参照',
              value: 'reftable'
          }, {
              label: '穿梭参照',
              value: 'reftransfer'
          }]
      }]
  }
  ];
  return (
    <>
        <Compact block>
            <Select defaultValue="vision" style={{ width: 80 }} options={options} />
            <Input style={{ width: '30%' }} defaultValue="0571" />
            <Button icon={<Icon type="uf-search-light-2" />} />
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <Input style={{ width: '10%' }} defaultValue="新疆" />
            <Input style={{ width: '20%' }} defaultValue="0571" />
            <Input style={{ width: '30%' }} defaultValue="26888888" />
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <Input style={{ width: '20%' }} defaultValue="0571" />
            <Button icon={<Icon type="uf-search-light-2" />} />
            <Input style={{ width: '30%' }} defaultValue="26888888" />
            <Button type="primary">Submit</Button>
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <InputNumber />
            <InputNumber iconStyle='one' />
            <Select defaultValue="vision" style={{ width: 80 }} options={options} />
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <Select defaultValue="vision" style={{ width: 80 }} options={options} />
            <RangePicker style={{ width: '30%' }} format='YYYY/MM/DD' placeholder={['开始', '结束']} />
            <Button icon={<Icon type="uf-search-light-2" />} />
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <Input style={{ width: '20%' }} defaultValue="选择日期" />
            <DatePicker style={{ width: '20%' }} defaultValue='2036-04-23' format='YYYY-MM-DD' placeholder='选择日期' showToday />
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <Select defaultValue="vision" style={{ width: 80 }} options={options} />
            <TimePicker style={{ width: '20%' }} placeholder='选择时间' use12Hours format='h:mm'/>
            <Button icon={<Icon type="uf-search-light-2" />} />
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <Cascader options={CascaderOptions} placeholder="请选择" />
            <Input style={{ width: '30%' }} defaultValue="0571" />
            <Button icon={<Icon type="uf-search-light-2" />} />
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <Select defaultValue="vision" style={{ width: 80 }} options={options} />
            <AutoComplete style={{ width: '20%' }} placeholder='查找关键字,请输入1' options={["10000", "10001", "10002", "11000", "12010"]}/>
            <Button icon={<Icon type="uf-search-light-2" />} />
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <DatePicker style={{ width: '20%' }} defaultValue='2036-04-23' format='YYYY-MM-DD' placeholder='选择日期' showToday />
            <Select defaultValue="vision" style={{ width: 80 }} options={options} />
            <Input style={{ width: '20%' }} defaultValue="input" />
            <Button type="primary">查询</Button>
        </Compact>
        <br/>
        <br/>
        <Compact block>
            <TreeSelect
                showSearch
                style={{width: 240}}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                placeholder="请选择"
                allowClear
                treeDefaultExpandAll
            >
                <TreeNode value="parent 1" title="用友网络股份有限公司">
                    <TreeNode value="parent 1-0" title="用友网络股份有限公司1-0">
                        <TreeNode value="leaf1" title="用友网络股份有限公司leaf"/>
                        <TreeNode value="leaf2" title="用友网络股份有限公司leaf"/>
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="用友网络股份有限公司">
                        <TreeNode value="sss" title="用友网络股份有限公司"/>
                    </TreeNode>
                </TreeNode>
            </TreeSelect>
            <Input style={{ width: '20%' }} placeholder="Email" />
        </Compact>
    </>
  );
}