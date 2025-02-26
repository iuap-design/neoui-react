/** NavBar.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { screen } from '@testing-library/react'
import { muiPrefix } from '@utils/UpdatePrefixs'
import Close from '@tinper/m-icons/lib/cjs/Close'
import NavBar from '../src/index'

const prefixNavBar = `${muiPrefix}-navbar`
describe('NavBar Component', () => {
  it('component: NavBar, <test prop:: fieldid>', () => {
    const wrapper = mount(<NavBar />)
    expect(wrapper.find(`.${prefixNavBar}`).prop('fieldid')).toEqual(undefined);

    const fieldid = 'navbar_fieldid'
    wrapper.setProps({ fieldid: fieldid })
    expect(wrapper.find(`.${prefixNavBar}`).prop('fieldid')).toEqual(fieldid);
  });

  // 自定义样式-clsPrefix
  it('component: NavBar, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    const wrapper = mount(<NavBar clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${prefixNavBar}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-navbar`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: NavBar, <test prop:: className >', () => {
    const customCls = 'custom-cls';
    const wrapper = mount(<NavBar className={customCls} />)
    expect(wrapper.exists(`.${prefixNavBar}.${customCls}`)).toEqual(true);
  })

  // 自定义样式-style
  it('component: NavBar, <test prop:: style >', () => {
    const customStyle = {
      background: '#000000'
    };
    const wrapper = mount(<NavBar style={customStyle} />)
    expect(wrapper.find(`.${prefixNavBar}`).props().style.background).toEqual('rgb(0, 0, 0)');
  })

  it('component: NavBar, <test prop:: titleAlign>', () => {
    const wrapper = mount(<NavBar />)
    expect(wrapper.exists(`.${prefixNavBar}-align-center`)).toEqual(true);
    wrapper.setProps({ titleAlign: 'left' })
    expect(wrapper.exists(`.${prefixNavBar}-align-left`)).toEqual(true);
    wrapper.setProps({ titleAlign: 'right' })
    expect(wrapper.exists(`.${prefixNavBar}-align-right`)).toEqual(true);
  });

  it('component: NavBar, <test prop:: blur>', () => {
    const wrapper = mount(<NavBar />)
    expect(wrapper.exists(`.${prefixNavBar}-content-blur`)).toEqual(false);
    wrapper.setProps({ blur: true })
    expect(wrapper.exists(`.${prefixNavBar}-content-blur`)).toEqual(true);
  });

  it('component: NavBar, <test prop:: left> <test prop:: right> <test prop:: children>', () => {
    const customLeft = 'Left'
    const customRight = 'Right'
    const title = "Title"
    mount(<NavBar left={customLeft} right={customRight} >{title}</NavBar>)
    expect(screen.getByText(customLeft)).toBeInTheDocument();
    expect(screen.getByText(customRight)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('component: NavBar, <test prop:: back> <test prop:: backArrow>', () => {
    const customBack = 'Back'
    const wrapper = mount(<NavBar backArrow={<Close />} />)
    expect(wrapper.exists(`[id="arcclose"]`)).toEqual(true);
    wrapper.setProps({ back: null })
    expect(wrapper.exists(`.${prefixNavBar}-back`)).toEqual(false);
    wrapper.setProps({ back: customBack })
    expect(screen.getByText(customBack)).toBeInTheDocument();
  });

  it('component: NavBar, <test prop:: onBack>', () => {
    const onBack = jest.fn();
    const wrapper = mount(<NavBar onBack={onBack} />)
    expect(onBack).toHaveBeenCalledTimes(0);
    wrapper.find(`.${prefixNavBar}-back`).simulate('click')
    expect(onBack).toHaveBeenCalledTimes(1);
  });

})
