/** Image.tsx */
import React from 'react'
import { screen, fireEvent, act } from '@testing-library/react';
import { mount } from '@tests/mount'
import Image from '../src/index'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixImage = `${muiPrefix}-image`;
const demoSrc =
  'https://design.yonyoucloud.com/static/yonui/pic/pic1.jpg'
const demoSrcError =
  'https://design.yonyoucloud.com/static/yonui/pic/pic1error.jpg'

const waitTimeout = (time = 0) => new Promise((resolve) => setTimeout(resolve, time));

const waitForComponentToPaint = async (wrapper, time = 0) => {
  await act(async () => {
    await waitTimeout(time);
    wrapper.update();
  });
};

describe('Image Component', () => {
  it('src test, <test prop:: src>', () => {
    const wrapper = mount(<Image src={demoSrc} />)
    const element = wrapper.find('img');
    expect(element.props().src).toBe(demoSrc);
  });
  it('alt test, <test prop:: alt>', () => {
    const altText = 'this is my image';
    const wrapper = mount(<Image src={demoSrc} alt={altText} />)
    const element = wrapper.find('img');
    expect(element.props().alt).toBe(altText);
  });
  it('width test, <test prop:: width>', () => {
    const wrapper = mount(<Image src={demoSrc} width={123} />)
    const element = wrapper.find(`.${prefixImage}`);
    expect(element.props().style.width).toBe('123px');
  });
  it('height test, <test prop:: height>', () => {
    const wrapper = mount(<Image src={demoSrc} height={35} />)
    const element = wrapper.find(`.${prefixImage}`);
    expect(element.props().style.height).toBe('35px');
  });
  ['contain', 'cover', 'fill', 'none', 'scale-down'].forEach(item => {
    it('fit test, <test prop:: fit>', () => {
      const wrapper = mount(<Image src={demoSrc} fit={item} />);
      expect(wrapper.find('img').props().style['object-fit']).toBe(item);
    })
  });
  it('placeholder test, <test prop:: placeholder>', () => {
    const pl = <div className="test-placeholder">placeholder</div>;
    const wrapper = mount(<Image src={demoSrc} placeholder={pl} />)
    const element = wrapper.find(`.${prefixImage}-placeholder`);
    expect(element.find('.test-placeholder').getDOMNode()).toBeInTheDocument();
  });

  it('fieldid test, <test prop:: fieldid>', () => {
    const fieldid = 'image_test'
    const wrapper = mount(<Image src={demoSrc} fieldid={fieldid} />)
    const element = wrapper.find(`[fieldid="${fieldid}"]`);
    expect(element.getDOMNode()).toBeInTheDocument();
  });
  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const wrapper = mount(<Image src={demoSrc} clsPrefix="testClassPre" />);
    expect(wrapper.find('.testClassPre-image').getDOMNode()).toBeInTheDocument();
  })
  it('className test, <test prop:: className>', () => {
    const wrapper = mount(<Image src={demoSrc} className="test-classname" />);
    expect(wrapper.find(`.${prefixImage}`).hasClass('test-classname')).toBeTruthy();
  })
  it('style test, <test prop:: style>', () => {
    const wrapper = mount(<Image src={demoSrc} style={{ display: 'flex' }} />);
    expect(wrapper.find(`.${prefixImage}`).props().style.display).toBe('flex');
  })

  it('draggable test, <test prop:: draggable>', () => {
    const wrapper = mount(<Image src={demoSrc} draggable />);
    expect(wrapper.find('img').props().draggable).toBeTruthy();
  })

  it('onClick test, <test prop:: onClick>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Image src={demoSrc} onClick={onClick} />);
    wrapper.find('img').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
  it('onContainerClick test, <test prop:: onContainerClick>', () => {
    const onContainerClick = jest.fn();
    const wrapper = mount(<Image src={demoSrc} onContainerClick={onContainerClick} />);
    wrapper.find(`.${prefixImage}`).simulate('click');
    expect(onContainerClick).toHaveBeenCalled();
  });

  //   onLoad?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  it('onLoad test, <test prop:: onLoad>', () => {
    const onLoad = jest.fn();
    const wrapper = mount(<Image src={demoSrc} onLoad={onLoad} />);
    const image = wrapper.find('img')
    expect(onLoad).toHaveBeenCalledTimes(0);
    fireEvent.load(image.getDOMNode());
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('lazy test, <test prop:: lazy>', () => {
    const fb = <div className="fallback">fallback</div>;
    const wrapper = mount(<Image src={demoSrc} width={100} height={100} lazy />)
    const image = wrapper.find('img')
    expect(image.props().loading).toBe('lazy');
  });
})


describe('event', () => {
  it('onError test, <test prop:: onError>', async () => {
    const onError = jest.fn();
    const wrapper = mount(<Image src='/404' onError={onError} />);
    const img = wrapper.find('img');
    expect(img.props().src).toEqual('http://localhost/404')

  });

  it('fallback test, <test prop:: fallback>', () => {
    const fb = <div className="fallback">fallback</div>;
    const wrapper = mount(<Image src={demoSrc} width={100} height={100} fallback={fb} />)
    const image = wrapper.find('img')
    image.getDOMNode().src = null;
    fireEvent.load(image.getDOMNode());
    const element = wrapper.find(`.${prefixImage}-placeholder`);
    expect(element.getDOMNode()).toBeInTheDocument();
  });
});
