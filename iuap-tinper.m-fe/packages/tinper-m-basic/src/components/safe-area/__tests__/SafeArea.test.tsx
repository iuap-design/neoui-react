/** SafeArea.tsx */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SafeArea from '../src'
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixSafeArea = `${muiPrefix}-safe-area`;
const fieldid = 'safe-area_test'

describe('SafeArea Component', () => {
  let wrapper: any
  // 渲染
  it('component: SafeArea, <test prop:: fieldid>', () => {
    wrapper = mount(<SafeArea fieldid={fieldid} />)
    expect(wrapper.find(`.${prefixSafeArea}`).prop('fieldid')).toEqual(`${fieldid}`);
  });

  // 自定义样式-clsPrefix
  it('component: SafeArea, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    wrapper = mount(<SafeArea clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${prefixSafeArea}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-safe-area`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: SafeArea, <test prop:: className >', () => {
    const customCls = 'custom-cls';
    wrapper = mount(<SafeArea className={customCls} />)
    expect(wrapper.exists(`.${customCls}`)).toEqual(true);
  })

  // 自定义样式-style
  it('component: SafeArea, <test prop:: style >', () => {
    const customStyle = {
      background: '#FFFFFF'
    };
    wrapper = mount(<SafeArea style={customStyle} />)
    expect(wrapper.find(`.${prefixSafeArea}`).props().style.background).toEqual('rgb(255, 255, 255)');
  })

  // 位置-position
  it('component: SafeArea, <test prop:: position >', () => {
    let position = 'bottom';
    wrapper = mount(<SafeArea position={position} />)
    expect(wrapper.exists(`.${prefixSafeArea}-position-${position}`)).toEqual(true);
    position = 'top';
    wrapper.setProps({ position })
    expect(wrapper.exists(`.${prefixSafeArea}-position-${position}`)).toEqual(true);
  })
})
