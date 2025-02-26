/** Button.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Button from '../src/index'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { Sync } from '@tinper/m-icons'

const prefixButton = `${muiPrefix}-button`;
describe('Button Component', () => {
  it('component: Button, <test prop:: fieldid>', () => {
    const fieldid = 'Button_test'
    const bbb = <Button fieldid={fieldid} />
    const wrapper = render(bbb)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  });
  ['default', 'primary', 'warning', 'ghost', 'text'].forEach(item => {
    it('component: Button, <test prop:: mode>', () => {
      const wrapper = mount(<Button mode={item} />);
      expect(wrapper.hasClass(`${prefixButton}-${item}`)).toEqual(true);
    })
  });
  ['large', 'middle', 'small'].forEach(item => {
    it('component: Button, <test prop:: size>', () => {
      const wrapper = mount(<Button size={item} />);
      expect(wrapper.hasClass(`${prefixButton}-${item}`)).toEqual(true);
    })
  });
  ['rounded', 'rectangular'].forEach(item => {
    it('component: Button, <test prop:: shape>', () => {
      const wrapper = mount(<Button shape={item} />);
      expect(wrapper.hasClass(`${prefixButton}-${item}`)).toEqual(true);
    })
  });
  it('component: Button, <test prop:: children>', () => {
    const children_fieldid = 'button_children';
    // const wrapper = render(<Button children={<div fieldid={children_fieldid} />} />);
    // expect(wrapper.container.querySelector(`[fieldid="${children_fieldid}"]`)).toBeInTheDocument()
    const wrapper = mount(<Button children={<div fieldid={children_fieldid} />} />);
    expect(wrapper.find(`[fieldid="${children_fieldid}"]`)).toHaveLength(1)
  });
  it('component: Button, <test prop:: block>', () => {
    const wrapper = mount(<Button block />);
    expect(wrapper.hasClass(`${prefixButton}-block`)).toEqual(true);
  })
  it('component: Button, <test prop:: visible>', () => {
    let button = mount(<Button visible={false} />);
    expect(button).toHaveLength(0);
  })
  it('component: Button, <test prop:: disabled>', () => {
    let button = mount(<Button disabled />);
    expect(button.find('button').props().disabled).toEqual(true);
  })
  it('component: Button, <test prop:: loading>', () => {
    const wrapper = mount(<Button loading />);
    expect(wrapper.find('div').hasClass('circle')).toEqual(true);
  })
  it('component: Button, <test prop:: loadingIcon>', () => {
    const wrapper = mount(<Button loading loadingIcon={<Sync />}/>);
     
    expect(wrapper.find('svg').props().id).toEqual('arcSync');
  })
  it('component: Button, <test prop:: loadingText>', () => {
    let wrapper = mount(<Button loading loadingText='加载中' />);
    expect(wrapper.find('button').text()).toEqual('加载中');
  });
  it('component: Button, <test prop:: icon>', () => {
    const wrapper = mount(<Button icon='arcclose-circle-Fill' />);
    expect(wrapper.hasClass(`${prefixButton}-with-icon`)).toEqual(true);
  });
  it('component: Button, <test prop:: iconPosition>', () => {
    const wrapper = mount(<Button icon='arcclose-circle-Fill' iconPosition='right' />);
    expect(wrapper.hasClass(`${prefixButton}-with-icon-right`)).toEqual(true);
  });
  it('component: Button, <test prop:: className>', () => {
    const wrapper = mount(<Button className='testClassName' />);
    expect(wrapper.hasClass('testClassName')).toEqual(true);
  });
  it('component: Button, <test prop:: style>', () => {
    const button = mount(<Button style={{ background: 'black' }} />);
    expect(button.find('button').props().style.background).toEqual('black');
  });
  it('component: Button, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Button clsPrefix={classPrefix} />);
    expect(wrapper.hasClass(`${classPrefix}-button`)).toEqual(true);
  });
})

describe('component: Button Events', function () {
  it('Button click change mode, <test prop:: onClick>', function () {
    let modeChange = 'primary';

    function clickEvent(event) {
      modeChange = 'warning';
    }

    let buttonC = mount(<Button onClick={clickEvent} mode={modeChange} />);
    const button = buttonC.find('button');
    button.simulate('click');
    expect(modeChange == 'warning').toEqual(true);
  });
  it('Button onTouchStart change mode, <test prop:: onTouchStart>', function () {
    let modeChange = 'primary';

    function touchStartEvent(event) {
      modeChange = 'warning';
    }

    let buttonC = mount(<Button onTouchStart={touchStartEvent} mode={modeChange} />);
    const button = buttonC.find('button');
    button.simulate('touchstart')
    expect(modeChange == 'warning').toEqual(true);
  });
  it('Button onTouchEnd change mode, <test prop:: onTouchEnd>', function () {
    let modeChange = 'primary';

    function touchEndEvent(event) {
      modeChange = 'ghost';
    }

    let buttonC = mount(<Button onTouchEnd={touchEndEvent} mode={modeChange} />);
    const button = buttonC.find('button');
    button.simulate('touchend')
    expect(modeChange == 'ghost').toEqual(true);
  });
});
