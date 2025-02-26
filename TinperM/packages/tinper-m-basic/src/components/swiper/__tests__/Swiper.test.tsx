/** Swiper.tsx */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import Swiper from '../src/index'
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { mockDrag } from '@tests/utils'

const prefixSwiper = `${muiPrefix}-swiper`;
const prefixPageIndicator = `${muiPrefix}-page-indicator`;
const fieldid = 'Swiper_test'

const items = [0, 1, 2, 3].map(item => <Swiper.Item style={{ height: 120 }} key={item}>{item}</Swiper.Item>)
let wrapper: any
describe('Swiper Component', () => {
  // 渲染
  it('component: Swiper, <test prop:: fieldid>', () => {
    wrapper = mount(<Swiper fieldid={fieldid}><Swiper.Item>SwiperItem</Swiper.Item></Swiper>)
    expect(wrapper.find(`.${prefixSwiper}`).prop('fieldid')).toEqual(`${fieldid}`);
    expect(screen.getByText('SwiperItem')).toBeTruthy()
  });

  // 自定义样式-clsPrefix
  it('component: Swiper, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    wrapper = mount(<Swiper clsPrefix={customClsPrefix} >{items}</Swiper>)
    expect(wrapper.exists(`.${prefixSwiper}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-swiper`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: Swiper, <test prop:: className >', () => {
    const customCls = 'custom-cls';
    wrapper = mount(<Swiper className={customCls} >{items}</Swiper>)
    expect(wrapper.exists(`.${customCls}`)).toEqual(true);
  })

  // 自定义样式-style
  it('component: Swiper, <test prop:: style >', () => {
    const customStyle = {
      background: '#FFFFFF'
    };
    wrapper = mount(<Swiper style={customStyle} >{items}</Swiper>)
    expect(wrapper.find(`.${prefixSwiper}`).props().style.background).toEqual('rgb(255, 255, 255)');
  })

  it('component: Swiper, <test prop:: defaultIndex>', () => {
    wrapper = mount(<Swiper defaultIndex={2}>{items}</Swiper>)
    expect(screen.getByText(2)).toBeTruthy()
  });

  it('component: Swiper, <test prop:: direction>', () => {
    wrapper = mount(<Swiper><Swiper.Item>SwiperItem</Swiper.Item></Swiper>)
    expect(wrapper.find(`.${prefixSwiper}`).hasClass(`${prefixSwiper}-vertical`)).toEqual(false);
    expect(wrapper.find(`.${prefixSwiper}`).hasClass(`${prefixSwiper}-horizontal`)).toEqual(true);

    wrapper.setProps({ direction: 'vertical' })
    expect(wrapper.find(`.${prefixSwiper}`).hasClass(`${prefixSwiper}-horizontal`)).toEqual(false);
    expect(wrapper.find(`.${prefixSwiper}`).hasClass(`${prefixSwiper}-vertical`)).toEqual(true);
  });

  it('component: Swiper, <test prop:: slideSize>, <test prop:: trackOffset>', () => {
    wrapper = mount(<Swiper><Swiper.Item>SwiperItem</Swiper.Item></Swiper>)
    expect(wrapper.find(`.${prefixSwiper}`).props().style['--slide-size']).toEqual('100%');
    expect(wrapper.find(`.${prefixSwiper}`).props().style['--track-offset']).toEqual('0%');

    wrapper.setProps({ slideSize: 80, trackOffset: 10 })
    expect(wrapper.find(`.${prefixSwiper}`).props().style['--slide-size']).toEqual('80%');
    expect(wrapper.find(`.${prefixSwiper}`).props().style['--track-offset']).toEqual('10%');
  });

  it('component: Swiper, <test prop:: total>', () => {
    wrapper = mount(<Swiper >{items}</Swiper>)
    expect(wrapper.find(`.${prefixPageIndicator}-dot`).length).toEqual(4);
    wrapper.setProps({ total: 2 })
    expect(wrapper.find(`.${prefixPageIndicator}-dot`).length).toEqual(2);
  });

  it('component: Swiper, <test prop:: indicator>', () => {
    wrapper = mount(<Swiper >{items}</Swiper>)
    expect(wrapper.exists(`.${prefixPageIndicator}`)).toEqual(true);
    expect(wrapper.exists('.customIndicator')).toEqual(false);

    wrapper.setProps({ indicator: () => null })
    expect(wrapper.exists(`.${prefixPageIndicator}`)).toEqual(false);
    expect(wrapper.exists('.customIndicator')).toEqual(false);

    wrapper.setProps({
      indicator: (total: any, current: number) => (
        <div className='customIndicator'>
          {`${current + 1} / ${total}`}
        </div>
      )
    })
    expect(wrapper.exists(`.${prefixPageIndicator}`)).toEqual(false);
    expect(wrapper.find('.customIndicator').text()).toEqual('1 / 4');
  });

  it('component: Swiper, <test prop:: indicatorProps>', () => {
    wrapper = mount(<Swiper >{items}</Swiper>)
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-color-primary`)).toEqual(true);
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-color-white`)).toEqual(false);

    wrapper.setProps({ indicatorProps: { color: 'white' } })
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-color-primary`)).toEqual(false);
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-color-white`)).toEqual(true);
  });

  it('component: Swiper, <test prop:: stuckAtBoundary>', () => {
    wrapper = mount(<Swiper slideSize={80} defaultIndex={3}>{items}</Swiper>)
    expect(wrapper.find(`.${prefixSwiper}-track-inner`).prop('style').transform).toEqual('translate3d(-275%,0,0)');
    wrapper = mount(<Swiper stuckAtBoundary={false} slideSize={80} defaultIndex={3}>{items}</Swiper>)
    expect(wrapper.find(`.${prefixSwiper}-track-inner`).prop('style').transform).toEqual('translate3d(-300%,0,0)');
  });

  it('component: Swiper, <test prop:: children>', () => {
    wrapper = mount(<Swiper><Swiper.Item>SwiperItem</Swiper.Item></Swiper>)
    expect(wrapper.find(`.${prefixSwiper}-item`).length).toEqual(1);
    expect(wrapper.find(`.${prefixSwiper}-item`).text()).toEqual('SwiperItem');

    wrapper = mount(<Swiper children={[<Swiper.Item key='0'>SwiperItem0</Swiper.Item>, <Swiper.Item key='1'>SwiperItem1</Swiper.Item>]}></Swiper>)
    expect(wrapper.find(`.${prefixSwiper}-item`).length).toEqual(2);
    expect(wrapper.find(`.${prefixSwiper}-item`).at(0).text()).toEqual('SwiperItem0');
    expect(wrapper.find(`.${prefixSwiper}-item`).at(1).text()).toEqual('SwiperItem1');
  });
});

describe('func test', () => {
  it('component: Swiper, <test prop:: onIndexChange>', async () => {
    const content = document.createElement('div');
    document.body.appendChild(content);

    const onIndexChange = jest.fn();
    wrapper = mount(<Swiper onIndexChange={onIndexChange}>{items}</Swiper>, { attachTo: content });

    const content0 = document.querySelector(`.${prefixSwiper}-track`);
    jest.spyOn(content0, 'offsetWidth', 'get').mockReturnValue(375);
    jest.spyOn(content0, 'offsetHeight', 'get').mockReturnValue(200);
    const el = document.getElementsByClassName(`${prefixSwiper}-track`)[0];

    expect(onIndexChange).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("0");
    mockDrag(el, [
      { clientX: 300, clientY: 0 },
      {
        clientX: 200,
        clientY: 25,
      },
      {
        clientX: 100,
        clientY: 30,
      },
    ])
    expect(onIndexChange).toHaveBeenCalledTimes(1);
    expect(onIndexChange.mock.calls[0][0]).toEqual(1);
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("1");
  });

  it('component: Swiper,<test prop:: allowTouchMove>', async () => {
    const content = document.createElement('div');
    document.body.appendChild(content);

    const onIndexChange = jest.fn();
    wrapper = mount(<Swiper allowTouchMove={false} onIndexChange={onIndexChange}>{items}</Swiper>, { attachTo: content });

    const content0 = document.querySelector(`.${prefixSwiper}-track`);
    jest.spyOn(content0, 'offsetWidth', 'get').mockReturnValue(375);
    jest.spyOn(content0, 'offsetHeight', 'get').mockReturnValue(200);
    const el = document.getElementsByClassName(`${prefixSwiper}-track`)[0];

    expect(onIndexChange).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("0");

    mockDrag(el, [
      { clientX: 300, clientY: 0 },
      {
        clientX: 200,
        clientY: 25,
      },
      {
        clientX: 100,
        clientY: 30,
      },
    ])
    expect(onIndexChange).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("0");
  });

  // autoplay = true
  it('component: Swiper, <test prop:: autoplay>', () => {
    jest.useFakeTimers()
    wrapper = mount(<Swiper autoplay>{items}</Swiper>)
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("0");
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("1");
  });

    // autoplay = false
  it('component: Swiper, <test prop:: autoplay>', () => {
    jest.useFakeTimers()
    wrapper = mount(<Swiper>{items}</Swiper>)
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("0");
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("0");
  });

  // loop = false
  it('component: Swiper, <test prop:: loop>', () => {
    jest.useFakeTimers()
    wrapper = mount(<Swiper autoplay defaultIndex={3}>{items}</Swiper>)
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("3");
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("3");
  });

  // loop = true
  it('component: Swiper, <test prop:: loop>', () => {
    jest.useFakeTimers()
    wrapper = mount(<Swiper autoplay defaultIndex={3} loop>{items}</Swiper>)
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("3");
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
    expect(wrapper.find(`.${prefixSwiper}-slide-active`).find(`.${prefixSwiper}-item`).text()).toEqual("0");
  });

  it('component: Swiper, <test prop:: stopPropagation>', async () => {
    const onMouseDown = jest.fn()
    const onMouseMove = jest.fn()
    const onMouseUp = jest.fn()
    render(
      <div
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <Swiper stopPropagation={['mousedown', 'mousemove', 'mouseup']}>
          {items}
        </Swiper>
      </div>
    )

    const el = document.getElementsByClassName(`${prefixSwiper}-track`)[0];
    mockDrag(el, [
      { clientX: 300, clientY: 0 },
      {
        clientX: 200,
        clientY: 25,
      },
      {
        clientX: 100,
        clientY: 30,
      },
    ])
    expect(onMouseDown).toHaveBeenCalledTimes(0);
    expect(onMouseMove).toHaveBeenCalledTimes(0);
    expect(onMouseUp).toHaveBeenCalledTimes(0);
  });
})
