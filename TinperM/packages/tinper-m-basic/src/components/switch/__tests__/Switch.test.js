/** Switch.tsx */
import React from 'react'
import { screen, fireEvent, render } from '@testing-library/react';
import { mount } from '@tests/mount'
import { Switch } from '@/index'

import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixSwitch = `${muiPrefix}-switch`;

describe('Switch Component', () => {
  it('render, <test prop:: fieldid>', () => {
    const fieldid = 'Switch_test'
    const wrapper = mount(<Switch fieldid={fieldid} />)
    const element = wrapper.find(`[fieldid="${fieldid}"]`);
    expect(element.getDOMNode()).toBeInTheDocument();
  });

  it('style test, <test prop:: style>', () => {
    const wrapper = mount(<Switch style={{ display: 'flex' }} />);
    expect(wrapper.find(`.${prefixSwitch}`).props().style.display).toBe('flex');
  })

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const wrapper = mount(<Switch clsPrefix="testClassPre" />);
    expect(wrapper.find('.testClassPre-switch').getDOMNode()).toBeInTheDocument();
  })

  it('className test, <test prop:: className>', () => {
    const wrapper = mount(<Switch className="test-classname" />);
    expect(wrapper.find(`.${prefixSwitch}`).hasClass('test-classname')).toBeTruthy();
  })

  it('disabled test, <test prop:: disabled>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Switch onClick={onClick} readonly={false} disabled />);
    const element = wrapper.find(`.${prefixSwitch}`);
    expect(element.props().class).toBe('mui-switch mui-switch-disabled');
    wrapper.find(`.${prefixSwitch}`).simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('checked test, <test prop:: checked>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Switch onClick={onClick} checked />);
    const element = wrapper.find(`.${prefixSwitch}`);
    expect(element.props().class).toBe('mui-switch mui-switch-checked');
  });

  it('defaultChecked test, <test prop:: defaultChecked>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Switch onClick={onClick} defaultChecked />);
    const element = wrapper.find(`.${prefixSwitch}`);
    expect(element.props().class).toBe('mui-switch mui-switch-checked');
  });

  it('visible false test, <test prop:: visible>', () => {
    const wrapper = mount(<Switch visible={false} />)
    const element = wrapper.find(`.${prefixSwitch}`);
    expect(element.props().class).toBe('mui-switch mui-switch-hidden');
  });

  it('checkedText test, <test prop:: checkedText>', () => {
    const wrapper = mount(<Switch checked checkedText="OK" />);
    const element = wrapper.find(`.${prefixSwitch}-inner`);
    //  ;
    expect(element.text()).toBe('OK');
  });
  it('uncheckedText test, <test prop:: uncheckedText>', () => {
    const wrapper = mount(<Switch uncheckedText="CANCEL" />);
    const element = wrapper.find(`.${prefixSwitch}-inner`);
     ;
    expect(element.text()).toBe('CANCEL');
  });
  it('onChange test, <test prop:: onChange>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Switch onChange={onClick} checked checkedText="CANCEL" />);
    wrapper.find(`.${prefixSwitch}`).simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
})

describe('event', () => {
  it('beforeChange test, <test prop:: beforeChange>, <test prop:: loading', () => {
    const beforeChange = jest.fn()
    render(<Switch loading beforeChange={beforeChange} />)
    const switchEl = screen.getByRole('switch')
    fireEvent.click(switchEl)
    expect(
      switchEl.querySelectorAll(`.${prefixSwitch}-spin-icon`).length
    ).toBeTruthy()
    expect(beforeChange).not.toHaveBeenCalled()
  });
});
