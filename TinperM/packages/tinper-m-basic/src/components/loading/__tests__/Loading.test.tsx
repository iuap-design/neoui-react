/** Loading.tsx */
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Loading from '../src'
import { sleep } from '@/utils/Sleeps';

describe('Loading Component', () => {
  it('component: Loading, <test prop:: fieldid>, <test prop:: content>, <test prop:: show>', () => {
    const fieldid = 'Loading_test'
    const { container, getByText } = render(<Loading fieldid={fieldid} type='spinloading' show color='#EE2233' content='加载中' />)
    const element = container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
    expect(getByText('加载中')).toBeInTheDocument();
  });
  it('component: Loading, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Loading clsPrefix={classPrefix} type='spinloading' show color='#EE2233' content='加载中' />);
    expect(wrapper.find('div').hasClass(`${classPrefix}-loading`)).toEqual(true);
  });
  it('component: Loading, <test prop:: className>, <test prop:: style>, <test prop:: color>', () => {
    const classname = 'testClassName'
    const wrapper = mount(<Loading className={classname} type='spinloading' show style={{ '--color': '#EE2233'}} content='加载中' />);
    expect(wrapper.find('div').find('div').hasClass(`${classname}`)).toEqual(true);
    expect(wrapper.find('div').find('div').props().style['--color']).toEqual('#EE2233');
  });
  it('component: Loading, <test prop:: size>', () => {
    const fieldid = 'Loading_test'
    const { container } = render(<Loading size='0.96rem' fieldid={fieldid} type='spinloading' show color='#EE2233' content='加载中' />)
    const element = container.querySelector(`[fieldid="${fieldid}_spinLoading"]`);
    expect(element).toHaveStyle('--size: 0.96rem');
  });
  it('component: Loading, <test prop:: percent>', () => {
    const { container } = render(<Loading  type='progress' show={true} percent={10} />)
    const element = container.querySelector(`[class="mui-progress-bar-fill"]`);
    expect(element).toHaveStyle('width: 10%');
  });
  it('Toast afterClose test, <test prop:: duration>, <test prop:: showBackDrop>', async function () {
    mount(<Loading duration={1} type='toast' showBackDrop show color='#EE2233' content='加载中' />);
    expect(document.querySelector('[class="mui-mask mui-toast-mask"]')).toBeInTheDocument()
    expect(document.querySelector('[class="mui-mask mui-toast-mask"]')).toHaveStyle('background: rgba(0, 0, 0, 0)')
    await sleep(2000)
    expect(document.querySelector('[class="mui-mask mui-toast-mask"]')).toEqual(null)
  });
  it('component: Loading, <test prop:: loadingStyle>', () => {
    mount(<Loading loadingStyle={{ '--color': '#111111' }} type='spinloading' show  content='加载中' />);
    const element = document.querySelector(`[class="circle-loader"]`);
    expect(element).toHaveStyle('--color: #111111');
  });
  ['toast' , 'progress' , 'spinloading' , 'dotloading'].forEach(item => {
    it('component: Loading, <test prop:: type>', () => {
      mount(<Loading type={item} show content='默认' />);
      if (item === 'toast') {
        expect(document.querySelector('[class="mui-mask mui-toast-mask"]')).toBeInTheDocument()
      } else if (item === 'progress') {
        expect(document.querySelector('[class="mui-progress-bar-fill"]')).toBeInTheDocument()
      } else if (item === 'spinloading') {
        expect(document.querySelector('[class="mui-loading-spinloading"]')).toBeInTheDocument()
      } else if (item === 'dotloading') {
        expect(document.querySelector('[class="mui-loading-dotloading"]')).toBeInTheDocument()
      }

    })
  });
})
