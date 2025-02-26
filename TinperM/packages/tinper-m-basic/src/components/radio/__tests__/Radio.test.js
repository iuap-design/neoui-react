/** Radio.tsx */
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import { mount } from '@tests/mount'
import { Radio, Icon, Slider } from '@tinper/m';
import '@tinper/m-icons/lib/iconfont/iconfont.js'

import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixRadio = `${muiPrefix}-radio`;

describe('Radio Component', () => {
  it('render, <test prop:: fieldid>', () => {
    const fieldid = 'Radio-test'
    const wrapper = mount(<Radio fieldid={fieldid} />)
    expect(wrapper.find(`.${prefixRadio}`).prop('fieldid')).toEqual(`${fieldid}_radio`);
  });

  it('style test, <test prop:: style>', () => {
    const wrapper = mount(<Radio style={{ display: 'flex' }} />);
    expect(wrapper.find(`.${prefixRadio}`).props().style.display).toBe('flex');
  })

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const wrapper = mount(<Radio clsPrefix="testClassPre" />);
    expect(wrapper.find('.testClassPre-radio').getDOMNode()).toBeInTheDocument();
  })

  it('className test, <test prop:: className>', () => {
    const wrapper = mount(<Radio className="test-classname" />);
    expect(wrapper.find(`.${prefixRadio}`).hasClass('test-classname')).toBeTruthy();
  })

  it('disabled test, <test prop:: disabled>', () => {
    const wrapper = mount(<Radio disabled />);
    const element = wrapper.find(`.${prefixRadio}`);
    expect(element.props().class).toBe('mui-radio mui-radio-disabled');
    const input = wrapper.find(`input`);
    expect(input.props().disabled).toBeTruthy();
  });

  it('checked test, <test prop:: checked>', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Radio checked onChange={onChange} />);
    const element = wrapper.find(`.${prefixRadio}`);
    expect(element.props().class).toBe('mui-radio mui-radio-checked');
    const input = wrapper.find(`input`);
    expect(input.props().checked).toBeTruthy();
  });

  it('defaultChecked test, <test prop:: defaultChecked>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Radio onClick={onClick} defaultChecked />);
    const element = wrapper.find(`.${prefixRadio}`);
    expect(element.props().class).toBe('mui-radio mui-radio-checked');
    const input = wrapper.find(`input`);
    expect(input.props().checked).toBeTruthy();
  });

  it('block test, <test prop:: block>', () => {
    const wrapper = mount( <Radio value='1' block>块级元素</Radio>);
    const element = wrapper.find(`.${prefixRadio}-block`);
    expect(element.length).toBe(1);
  });
  it('icon test, <test prop:: icon>', () => {
    const wrapper = mount(<Radio
      value='radio1'
      icon={(checked) =>
        checked ? (
          <Icon type='arcradio-button-on-Fill' color='#EE2233' />
        ) : (
          <Icon type='arcradio-button-off' color='#BFBFBF' />
        )
      }
    >
      单选框一
    </Radio>);
    const element = wrapper.find(`.${prefixRadio}-custom-icon`);
    expect(element.length).toBe(1);
  })

  it('id, <test prop:: id>', () => {
    const id = 'Radio_test_id'
    const wrapper = mount(<Radio id={id} />)
    const element = wrapper.find(`[id="${id}"]`);
    expect(element.getDOMNode()).toBeInTheDocument();
  });

  it('value, <test prop:: value>', () => {
    const wrapper = mount(<Radio.Group defaultValue='1'>
      <Radio value='1'>
        第一项
      </Radio>
      <Radio value='2'>第二项</Radio>
      <Radio value='3'>第三项</Radio>
    </Radio.Group>)
    const element = wrapper.find(`.${prefixRadio}-checked`);
    const content = element.find(`.${prefixRadio}-content`);
    expect(content.text()).toBe('第一项');
  });
  it('children, <test prop:: children>', () => {
    const wrapper = mount(<Radio children="test_children" />)
    const element = wrapper.find(`.${prefixRadio}-content`);
     ;
    expect(element.text()).toBe('test_children');
  });

  it('onClick test, <test prop:: onClick>, <test prop:: onChange>', () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount( <Radio children="单选项框" onClick={onClick} onChange={onChange} />);
    wrapper.find(`.${prefixRadio}`).simulate('click');
    expect(onClick).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  })
})
