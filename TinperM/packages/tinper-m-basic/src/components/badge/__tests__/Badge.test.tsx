/** Badge.tsx */
import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { mount } from '@tests/mount'
import Badge from '../src'

describe('Badge Component', () => {
  const childrenStyle = { width: '50px', height: '50px' }

  it('component: Badge, <test prop:: fieldid>', () => {
    const fieldid = 'Badge_test'
    const component = <Badge fieldid={fieldid} content='5' />
    const wrapper = render(component)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  })
  it('component: Badge, <test prop:: wrapperClassName>', () => {
    const wrapper = mount(
      <Badge wrapperClassName='testClassName' content='5'>
        <div style={childrenStyle} />
      </Badge>
    );
    expect(wrapper.hasClass('testClassName')).toEqual(true);
  });
  it('component: Badge, <test prop:: wrapperStyle>', () => {
    const wrapper = mount(
      <Badge wrapperStyle={{ background: 'black' }} content='5'>
        <div style={childrenStyle} />
      </Badge>
    );
    expect(wrapper.find('div').props().style.background).toEqual('black');
  });
  it('component: Badge, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(
      <Badge clsPrefix={classPrefix} content='5'>
        <div style={childrenStyle} />
      </Badge>
    );
    expect(wrapper.hasClass(`${classPrefix}-badge`)).toEqual(true);
  });
  it('component: Badge, <test prop:: content>, <test prop:: children>', () => {
    const {getByText} = render(
      <Badge content='有更新'>
        <div style={childrenStyle}>children</div>
      </Badge>
    );
    expect(getByText('有更新')).toBeInTheDocument();
    expect(getByText('children')).toBeInTheDocument();
  });
  it('component: Badge, <test prop:: color>', () => {
    render(
      <Badge content='有更新' color='black' fieldid='badge1'>
        <div style={childrenStyle}/>
      </Badge>
    );
    const element = document.querySelector(`[fieldid="badge1_data_icon"]`);
    expect(element).toHaveStyle('--color: black');
  });
  it('component: Badge, <test prop:: bordered>', () => {
    render(
      <Badge content='有更新' color='black' fieldid='badge2' bordered>
        <div style={childrenStyle}/>
      </Badge>
    );
    const element = document.querySelector(`[fieldid="badge2_data_icon"]`);
    expect(element).toHaveClass('mui-badge-bordered');
  });
})
