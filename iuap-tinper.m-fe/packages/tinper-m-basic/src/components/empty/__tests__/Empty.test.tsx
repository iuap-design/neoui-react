/** Empty.tsx */
import React from 'react'
import { render, debug } from '@testing-library/react'
import { mount } from '@tests/mount'
import Empty from '../src';

const imgUrl = 'https://design.yonyoucloud.com/static/yonui/pic/pic1.jpg'

describe('Empty Component', () => {
  it('component: Empty, <test prop:: fieldid>', () => {
    const fieldid = 'Empty_test'
    const wrapper = render(<Empty fieldid={fieldid} image={imgUrl}></Empty>)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  });
  ['noData', 'noCollect', 'noResult'].forEach(item => {
    const data = {
      noData: 'http://localhost/noData',
      noCollect: 'http://localhost/client',
      noResult: 'http://localhost/blankPage'
    }
    it('component: Empty, <test prop:: mode>', () => {
      const wrapper = mount(<Empty mode={item} image={data[item]}/>);
      expect(wrapper.find('img').props().src).toEqual(data[item]);
    })
  });
  it('component: Empty, <test prop:: message>', () => {
    const fieldid = 'Empty_test'
    const wrapper = mount(<Empty fieldid={fieldid} image={imgUrl} message='加载中' />);
    expect(wrapper.childAt(1).text()).toEqual('加载中');
  });
  it('component: Empty, <test prop:: style>', () => {
    const fieldid = 'Empty_test1'
    const wrapper = mount(<Empty fieldid={fieldid} image={imgUrl} style={{ background: 'red' }}/>);
    expect(wrapper.find('div').props().style.background).toEqual('red');
  });
  it('component: Empty, <test prop:: image>', () => {
    const wrapper = mount(<Empty image={imgUrl}/>);
    expect(wrapper.find('img').props().src).toEqual(imgUrl);
  });
  it('component: Empty, <test prop:: imageStyle>', () => {
    const fieldid = 'Empty_test1'
    const wrapper = mount(<Empty fieldid={fieldid} image={imgUrl} imageStyle={{ width: '128px' }}/>);
    expect(wrapper.find('img').props().style.width).toEqual('128px');
  });
  it('component: Empty, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Empty clsPrefix={classPrefix} image={imgUrl}/>);
    expect(wrapper.find('div').hasClass(`${classPrefix}-empty`)).toEqual(true);
  });
  it('component: Empty, <test prop:: className>', () => {
    const wrapper = mount(<Empty className='testClassName' image={imgUrl}/>);
    expect(wrapper.hasClass('testClassName')).toEqual(true);
  });
})


