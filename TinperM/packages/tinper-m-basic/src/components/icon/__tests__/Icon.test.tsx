/** Icon.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Icon from '../src/index'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixIcon = `${muiPrefix}-icon`;

describe('Icon Component', () => {
  it('component: Icon, <test prop:: fieldid>', () => {
    const fieldid = 'Icon_test'
    const wrapper = render(<Icon type='archeart' fieldid={fieldid} />)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  });
  it('component: Icon, <test prop:: type>', () => {
    const wrapper = mount(<Icon type='archeart'/>)
    expect(wrapper.find('use').props()['xlink:href']).toEqual('#archeart');
  });
  it('component: Icon, <test prop:: color>', () => {
    const wrapper = mount(<Icon type='archeart' color='red'/>)
    expect(wrapper.find('svg').props().style.color).toEqual('red');
  });
  ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'].forEach(item => {
    it('component: Icon, <test prop:: size>', () => {
      const wrapper = mount(<Icon type='archeart' size={item} />);
      expect(wrapper.find('svg').props().class).toEqual(`${prefixIcon} ${prefixIcon}-${item}`);
    })
  });
  it('component: Icon, <test prop:: style>', () => {
    const wrapper = mount(<Icon type='archeart' style={{ background: 'black' }} />);
    expect(wrapper.find('svg').props().style.background).toEqual('black');
  });
  it('component: Icon, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Icon type='archeart' clsPrefix={classPrefix} />);
    expect(wrapper.find('svg').props().class).toEqual(`${classPrefix}-icon ${classPrefix}-icon-md`);
  });
  it('component: Icon, <test prop:: className>', () => {
    const wrapper = mount(<Icon type='archeart' className='testClassName' />);
    expect(wrapper.find('svg').props().class).toEqual(`${prefixIcon} testClassName ${prefixIcon}-md`);
  });
})

describe('component: Icon Events', function () {
  it('Icon click change size, <test prop:: onClick>', function () {
    let sizeChange = 'xs';

    function clickEvent(event) {
      sizeChange = 'lg';
    }

    let wrapper = mount(<Icon type='archeart' onClick={clickEvent} size={sizeChange} />);
    const icon = wrapper.find('svg');
    icon.simulate('click');
    expect(sizeChange == 'lg').toEqual(true);
  });
});
