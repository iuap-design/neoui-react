/** Avatar.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Avatar from '../src'
import { Sync } from '@tinper/m-icons'

const demoImage =
  'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80'

describe('Avatar Component', () => {
  it('component: Avatar, <test prop:: fieldid>', () => {
    const fieldid = 'Avatar_test'
    const component = <Avatar fieldid={fieldid} />
    const wrapper = render(component)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  })
  it('component: Avatar, <test prop:: className>', () => {
    const wrapper = mount(<Avatar className='testClassName' />);
    expect(wrapper.hasClass('testClassName')).toEqual(true);
  });
  it('component: Avatar, <test prop:: style>', () => {
    const button = mount(<Avatar style={{ background: 'black' }} />);
    expect(button.find('div').props().style.background).toEqual('black');
  });
  it('component: Avatar, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Avatar clsPrefix={classPrefix} />);
    expect(wrapper.hasClass(`${classPrefix}-avatar`)).toEqual(true);
  });
  it('component: Avatar, <test prop:: src>', () => {
    const button = mount(<Avatar src={demoImage} />);
    expect(button.find('img').props().src).toEqual(demoImage);
  });
  it('component: Avatar, <test prop:: fit>', () => {
    const button = mount(<Avatar src={demoImage} fit='contain'/>);
    expect(button.find('img').props().style['object-fit']).toEqual('contain');
  });
  it('component: Avatar, <test prop:: fallback>', () => {
    const button = mount(<Avatar fallback={<Sync />}/>);
    expect(button.find('svg').props().id).toEqual('arcSync');
  });
  it('component: Avatar, <test prop:: children>', () => {
    const { getByText } = render(<Avatar>友</Avatar>);
    expect(getByText('友')).toBeInTheDocument();
  });
})
