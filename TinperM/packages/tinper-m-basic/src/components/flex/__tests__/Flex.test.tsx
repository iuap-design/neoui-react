/** Flex.tsx */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Flex from '../src/index'
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixFlex = `${muiPrefix}-flex`;
const fieldid = 'Flex_test'

describe('Flex Component', () => {
  let wrapper: any
  // 渲染
  it('component: Flex, <test prop:: fieldid> <test prop:: visible>', () => {
    wrapper = mount(<Flex fieldid={fieldid} />)
    expect(wrapper.find(`.${prefixFlex}`).prop('fieldid')).toEqual(`${fieldid}`);
    wrapper.setProps({ visible: false })
    expect(wrapper.exists(`.${prefixFlex}`)).toEqual(false);
  });

  // 自定义样式-clsPrefix
  it('component: Flex, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    wrapper = mount(<Flex clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${prefixFlex}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-flex`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: Flex, <test prop:: className >', () => {
    const customCls = 'custom-cls';
    wrapper = mount(<Flex className={customCls} />)
    expect(wrapper.exists(`.${customCls}`)).toEqual(true);
  })

  // 自定义样式-style
  it('component: Flex, <test prop:: style >', () => {
    const customStyle = {
      background: '#FFFFFF'
    };
    wrapper = mount(<Flex style={customStyle} />)
    expect(wrapper.find(`.${prefixFlex}`).props().style.background).toEqual('rgb(255, 255, 255)');
  })

  // children
  it('component: Flex, <test prop:: children>', () => {
    const children = 'Children';
    wrapper = mount(<Flex fieldid={fieldid}>{children}</Flex>)
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('component: Flex, <test prop:: direction >, <test prop:: justify > <test prop:: align > <test prop:: alignContent > <test prop:: wrap>', () => {
    const direction = 'row'
    const justify = 'center'
    const align = 'center'
    const alignContent = 'center'
    const wrap = 'wrap'
    wrapper = mount(<Flex direction={direction} justify={justify} align={align} alignContent={alignContent} wrap={wrap} />)
    expect(wrapper.exists(`.${prefixFlex}-dir-row`)).toEqual(true);
    expect(wrapper.exists(`.${prefixFlex}-justify-center`)).toEqual(true);
    expect(wrapper.exists(`.${prefixFlex}-align-center`)).toEqual(true);
    expect(wrapper.exists(`.${prefixFlex}-align-content-center`)).toEqual(true);
    expect(wrapper.exists(`.${prefixFlex}-wrap`)).toEqual(true);
  })

  // 点击事件
  it('component: Flex, <test prop:: onClick >', () => {
    const handleClick = jest.fn();
    wrapper = mount(<Flex fieldid={fieldid} onClick={handleClick} />)
    const element = wrapper.find(`.${prefixFlex}`).getDOMNode()
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalled();
  });

})
