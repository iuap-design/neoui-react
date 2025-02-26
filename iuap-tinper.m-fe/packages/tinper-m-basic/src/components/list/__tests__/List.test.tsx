/** List.tsx */
import React from 'react'
import { render } from '@testing-library/react'
import List from '../src/index'
import { mount } from '@tests/mount'
import { screen } from '@testing-library/react'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixList = `${muiPrefix}-list`
describe('List Component', () => {
  it('component: List, <test prop:: fieldid> <test prop:: children>', () => {
    const fieldid = 'List_test'
    const comp = <List fieldid={fieldid} ><List.Item>{'children'}</List.Item></List>
    const wrapper = render(comp)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
    expect(screen.getByText('children')).toBeInTheDocument();
  });

  // 自定义样式-clsPrefix
  it('component: List, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    const wrapper = mount(<List clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${prefixList}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-list`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: List, <test prop:: className >', () => {
    const customCls = 'custom-cls';
    const wrapper = mount(<List className={customCls} />)
    expect(wrapper.exists(`.${prefixList}.${customCls}`)).toEqual(true);
  })

  // mode
  it('component: List, <test prop:: mode >', () => {
    const wrapper = mount(<List />)
    expect(wrapper.exists(`.${prefixList}-default`)).toEqual(true);
    wrapper.setProps({ mode: 'card' })
    expect(wrapper.exists(`.${prefixList}-card`)).toEqual(true);
  })

  it('component: List, <test prop:: header >', () => {
    const header = 'Header'
    const wrapper = mount(<List />)
    expect(wrapper.exists(`.${prefixList}-header`)).toEqual(false);
    wrapper.setProps({ header: header })
    expect(wrapper.exists(`.${prefixList}-header`)).toEqual(true);
    expect(screen.getByText(header)).toBeInTheDocument();
  })
})
