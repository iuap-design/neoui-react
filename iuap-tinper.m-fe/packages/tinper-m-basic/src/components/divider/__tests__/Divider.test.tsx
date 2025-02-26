/** Divider.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Divider from '../src'

describe('Divider Component', () => {
  it('component: Divider, <test prop:: fieldid>', () => {
    const fieldid = 'Divider_test'
    const { container } = render(<Divider fieldid={fieldid} />)
    const element = container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  });
  it('component: Divider, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Divider clsPrefix={classPrefix} />);
    expect(wrapper.find('div').hasClass(`${classPrefix}-divider`)).toEqual(true);
  });
  it('component: Divider, <test prop:: className>', () => {
    const className = 'testClassName'
    const wrapper = mount(<Divider className={className} />);
    expect(wrapper.find('div').hasClass(`${className}`)).toEqual(true);
  });
  it('component: Divider, <test prop:: style>', () => {
    const fieldid = 'Divider_test'
    const { container } = render(<Divider style={{ background: 'red' }} fieldid={fieldid} />)
    const element = container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toHaveStyle('background: red');
  });
  it('component: Divider, <test prop:: contentPosition>', () => {
    const wrapper = mount(<Divider contentPosition='left' />);
    expect(wrapper.find('div').hasClass('mui-divider-left')).toEqual(true);
  });
  it('component: Divider, <test prop:: direction>', () => {
    const wrapper = mount(<Divider direction='vertical' />);
    expect(wrapper.find('div').hasClass('mui-divider-vertical')).toEqual(true);
  });
  it('component: Divider, <test prop:: children>', () => {
    const fieldid = 'Divider_test'
    const children = '分割线'
    const { getByText } = render(<Divider fieldid={fieldid}>{children}</Divider>)
    const element = getByText(children);
    expect(element).toBeInTheDocument();
  });
  it('component: Flex, <test prop:: fieldid> <test prop:: visible>', () => {
    const wrapper = mount(<Divider visible={false}/>)
    expect(wrapper.find('div').hasClass('mui-divider')).toEqual(false);
    wrapper.setProps({ visible: true })
    expect(wrapper.find('div').hasClass('mui-divider')).toEqual(true);
  });
})
