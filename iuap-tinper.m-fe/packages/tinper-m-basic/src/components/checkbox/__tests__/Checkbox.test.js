/** Checkbox.tsx */
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import { mount } from '@tests/mount'
import { Icon, Checkbox } from '@tinper/m';

import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixCheckbox = `${muiPrefix}-checkbox`;

describe('Checkbox Component', () => {
  it('render, <test prop:: fieldid>', () => {
    const fieldid = 'Checkbox_test'
    const wrapper = mount(<Checkbox fieldid={fieldid} />)
    const element = wrapper.find(`[fieldid="${fieldid}"]`);
    // class toHaveAttribute
    expect(element.getDOMNode()).toBeInTheDocument();
  });

  it('style test, <test prop:: style>', () => {
    const wrapper = mount(<Checkbox style={{ display: 'flex' }} />);
    expect(wrapper.find(`.${prefixCheckbox}`).props().style.display).toBe('flex');
  })

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const wrapper = mount(<Checkbox clsPrefix="testClassPre" />);
    expect(wrapper.find('.testClassPre-checkbox').getDOMNode()).toBeInTheDocument();
  })

  it('className test, <test prop:: className>', () => {
    const wrapper = mount(<Checkbox className="test-classname" />);
    expect(wrapper.find(`.${prefixCheckbox}`).hasClass('test-classname')).toBeTruthy();
  })

  it('disabled test, <test prop:: disabled>', () => {
    const wrapper = mount(<Checkbox disabled />);
    const element = wrapper.find(`.${prefixCheckbox}`);
    expect(element.props().class).toBe('mui-checkbox mui-checkbox-disabled');
    const input = wrapper.find(`input`);
    expect(input.props().disabled).toBeTruthy();
  });

  it('checked test, <test prop:: checked>', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Checkbox checked onChange={onChange} />);
    const element = wrapper.find(`.${prefixCheckbox}`);
    expect(element.props().class).toBe('mui-checkbox mui-checkbox-checked');
    const input = wrapper.find(`input`);
    expect(input.props().checked).toBeTruthy();
  });

  it('defaultChecked test, <test prop:: defaultChecked>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Checkbox onClick={onClick} defaultChecked />);
    const element = wrapper.find(`.${prefixCheckbox}`);
    expect(element.props().class).toBe('mui-checkbox mui-checkbox-checked');
    const input = wrapper.find(`input`);
    expect(input.props().checked).toBeTruthy();
  });
  it('block test, <test prop:: block>', () => {
    const wrapper = mount(<Checkbox block>复选框</Checkbox>);
    const element = wrapper.find(`.${prefixCheckbox}-block`);
    expect(element.length).toBe(1);
  });
  it('icon test, <test prop:: icon>', () => {
    const wrapper = mount(<Checkbox
      value='6'
      icon={checked =>
        checked ? (
          <Icon fieldid='icon_2' type='archeart' color='#EE2233'/>
        ) : (
          <Icon fieldid='icon_2' type='archeart' color='#000000'/>
        )
      }
    >
      自定义图标
    </Checkbox>);
    const element = wrapper.find(`.${prefixCheckbox}-custom-icon`);
    expect(element.length).toBe(1);
  })

  it('id, <test prop:: id>', () => {
    const id = 'checkbox_test_id'
    const wrapper = mount(<Checkbox id={id}>复选框</Checkbox>)
    const element = wrapper.find(`[id="${id}"]`);
    expect(element.getDOMNode()).toBeInTheDocument();
  });

  it('value, <test prop:: value>', () => {
    const wrapper = mount(<Checkbox.Group defaultValue="1">
      <div className="checkbox-item margin-0">
        <Checkbox value='1' block className="blockIndicator">
          块级元素
        </Checkbox>
      </div>
      <div className="checkbox-item">
        <Checkbox value='2' className="blockIndicator">
          非块级元素
        </Checkbox>
      </div>
    </Checkbox.Group>)
    const element = wrapper.find(`.${prefixCheckbox}-checked`);
    const content = element.find(`.${prefixCheckbox}-content`);
    expect(content.text()).toBe('块级元素');
  });
  it('children, <test prop:: children>', () => {
    const wrapper = mount(<Checkbox children="test_children" />)
    const element = wrapper.find(`.${prefixCheckbox}-content`);
    expect(element.text()).toBe('test_children');
  });

  it('content, <test prop:: content>', () => {
    const wrapper = mount(<Checkbox content="test_content" />)
    const element = wrapper.find(`.${prefixCheckbox}-content`);
    expect(element.text()).toBe('test_content');
  });

  it('onClick test, <test prop:: onClick>, <test prop:: onChange>', () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount( <Checkbox children="123" onClick={onClick} onChange={onChange} />);
    wrapper.find(`.${prefixCheckbox}`).simulate('click');
    expect(onClick).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  })
  it('indeterminate, <test prop:: indeterminate>', () => {
    const wrapper = mount(<Checkbox content="test_content" indeterminate />)
    const element = wrapper.find(`.${prefixCheckbox}-indeterminate`);
    expect(element.length).toBe(1);
  });

  it('type, <test prop:: type>', () => {
    const wrapper = mount(<Checkbox type="square" />)
    const element = wrapper.find(`.${prefixCheckbox}-icon-square`);
    expect(element.length).toBe(1);
  });
})
