/** Space.tsx */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Space from '../src'
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixSpace = `${muiPrefix}-space`;
const fieldid = 'space_test'

describe('Space Component', () => {
  let wrapper: any
  // 渲染
  it('component: Space, <test prop:: fieldid> <test prop:: children>', () => {
    const children = 'Children'
    wrapper = mount(<Space fieldid={fieldid}>{children}</Space>)
    expect(wrapper.find(`.${prefixSpace}`).prop('fieldid')).toEqual(`${fieldid}`);
    expect(screen.getByText(children)).toBeTruthy();
  });

  // 自定义样式-clsPrefix
  it('component: Space, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    wrapper = mount(<Space clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${prefixSpace}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-space`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: Space, <test prop:: className >', () => {
    const customCls = 'custom-cls';
    wrapper = mount(<Space className={customCls} />)
    expect(wrapper.exists(`.${customCls}`)).toEqual(true);
  })

  // 自定义样式-style
  it('component: Space, <test prop:: style >', () => {
    const customStyle = {
      background: '#FFFFFF'
    };
    wrapper = mount(<Space style={customStyle} />)
    expect(wrapper.find(`.${prefixSpace}`).props().style.background).toEqual('rgb(255, 255, 255)');
  })

  // 排列方向-direction
  it('component: Space, <test prop:: direction >', () => {
    let direction = 'horizontal';
    wrapper = mount(<Space direction={direction} />)
    expect(wrapper.exists(`.${prefixSpace}-${direction}`)).toEqual(true);
    direction = 'vertical';
    wrapper.setProps({ direction })
    expect(wrapper.exists(`.${prefixSpace}-${direction}`)).toEqual(true);
  })

  // 交叉轴对齐方式-align
  it('component: SafeArea, <test prop:: align >', () => {
    ['start', 'end', 'center', 'baseline'].forEach(align => {
      wrapper = mount(<Space align={align} />)
      expect(wrapper.exists(`.${prefixSpace}-align-${align}`)).toEqual(true);
    })
  })

  // 主轴对齐方式-justify
  it('component: SafeArea, <test prop:: justify >', () => {
    ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'].forEach(justify => {
      wrapper = mount(<Space justify={justify} />)
      expect(wrapper.exists(`.${prefixSpace}-justify-${justify}`)).toEqual(true);
    })
  })

  // 换行-wrap
  it('component: Space, <test prop:: wrap >', () => {
    wrapper = mount(<Space />)
    expect(wrapper.exists(`.${prefixSpace}-wrap`)).toEqual(false);
    wrapper.setProps({ wrap: true })
    expect(wrapper.exists(`.${prefixSpace}-wrap`)).toEqual(true);
  })

  // block
  it('component: Space, <test prop:: block >', () => {
    wrapper = mount(<Space />)
    expect(wrapper.exists(`.${prefixSpace}-block`)).toEqual(false);
    wrapper.setProps({ block: true })
    expect(wrapper.exists(`.${prefixSpace}-block`)).toEqual(true);
  })

  // onClick
  it('component: Space, <test prop:: onClick >', () => {
    const handleClick = jest.fn();
    wrapper = mount(<Space onClick={handleClick} />)
    const element = wrapper.find(`.${prefixSpace}`).getDOMNode()
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalled();
  });

})
