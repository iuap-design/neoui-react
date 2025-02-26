/** Notice.tsx */
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Notice from '../src'
import ArrowIosRight from '@tinper/m-icons/lib/cjs/ArrowIosRight'
import Bell from '@tinper/m-icons/lib/cjs/Bell'
import { sleep } from '@/utils/Sleeps';

describe('Notice Component', () => {
  it('component: Notice, <test prop:: fieldid>, <test prop:: content>', () => {
    const fieldid = 'Notice_test'
    const { container, getByText } = render(<Notice fieldid={fieldid} content='默认' />)
    const element = container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
    expect(getByText('默认')).toBeInTheDocument();
  });
  it('component: Notice, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Notice clsPrefix={classPrefix} content='加载中' />);
    expect(wrapper.find('div').hasClass(`${classPrefix}-notice`)).toEqual(true);
  });
  it('component: Notice, <test prop:: className>', () => {
    const className = 'testClassName'
    const wrapper = mount(<Notice className={className} content='默认' />);
    expect(wrapper.find('div').hasClass(`${className}`)).toEqual(true);
  });
  ['default' , 'success' , 'alert' , 'error' , 'info'].forEach(item => {
    it('component: Notice, <test prop:: color>', () => {
      const wrapper = mount(<Notice color={item} content='默认' />);
      expect(wrapper.find('div').hasClass(`mui-notice-${item}`)).toEqual(true);
    })
  });
  it('component: Notice, <test prop:: closeable>', () => {
    mount(<Notice closeable content='默认' />);
    expect(document.querySelector(`[class="mui-notice-close"]`)).toBeInTheDocument();
  });
  it('component: Notice, <test prop:: extra>', () => {
    mount(<Notice extra={<ArrowIosRight />} />);
    expect(document.querySelector(`[id="arcarrow-ios-right"]`)).toBeInTheDocument();
  });
  it('component: Notice, <test prop:: icon>', () => {
    mount(<Notice icon={<Bell />} />);
    expect(document.querySelector(`[id="arcbell"]`)).toBeInTheDocument();
    const wrapper = mount(<Notice icon='none' />);
    expect(wrapper.find('span').hasClass(`mui-notice-left`)).toEqual(false);
  });
  ['default' , 'modal'].forEach(item => {
    it('component: Notice, <test prop:: mode>', () => {
      const wrapper = mount(<Notice mode={item} content='默认' />);
      if (item === 'default') {
        expect(wrapper.find('div').hasClass(`mui-notice-${item}`)).toEqual(true);
      } else {
        expect(wrapper.find('div').hasClass(`mui-center-popup`)).toEqual(true);
      }
    })
  });
  it('component: Notice, <test prop:: wrap>', () => {
    const wrapper = mount(<Notice wrap/>);
    expect(wrapper.find('div').hasClass(`mui-notice-wrap`)).toEqual(true);
  });
  it('component: Notice, <test prop:: noticeModalShow>', () => {
    const wrapper = mount(<Notice mode='modal' noticeModalShow={false}/>);
    expect(wrapper.find('div').hasClass(`mui-notice-wrap`)).toEqual(false);
  });
  it('component: Notice, <test prop:: delay>, <test prop:: speed>', async () => {
    const { container } = render(
      <Notice
        delay={100}
        speed={500}
        content='这条通知是一个超长滚动的示例，这条通知是一个超长滚动的示例，这条通知是一个超长滚动的示例'
      />
    )
    const contentEl = document.querySelectorAll(`.mui-notice-content`)[0]
    const innerEl = document.querySelectorAll(`.mui-notice-content-inner`)[0]
    Object.defineProperty(contentEl, 'offsetWidth', {
      configurable: true,
      value: 300,
    })
    Object.defineProperty(innerEl, 'offsetWidth', {
      configurable: true,
      value: 600,
    })
    await sleep(200)
    expect(container).toMatchSnapshot()
  });
})

describe('component: Notice Events', function () {
  it('Notice afterClose test, <test prop:: onClick>', async function () {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Notice content='notice!' onClick={handleClick} />
    )
    const noticeBar = getByText('notice!')
    fireEvent.click(noticeBar)
    expect(handleClick).toHaveBeenCalled()
  });
  it('Notice afterClose test, <test prop:: onClose>', async function () {
    const fn = jest.fn()
    const wrapper = mount(
      <Notice content='notice' closeable testid='notice' onClose={fn} />
    )
    const iconEl = document.querySelector('[class="mui-notice-close"]') as HTMLElement
    expect(iconEl).toBeVisible()

    fireEvent.click(iconEl)
    expect(wrapper.find('div').hasClass('mui-notice')).toEqual(false)
    expect(fn.mock.calls.length).toEqual(1)
  });
});
