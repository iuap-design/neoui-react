/** PageIndicator.tsx */
import React from 'react'
import PageIndicator from '../src/index'
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixPageIndicator = `${muiPrefix}-page-indicator`;
const fieldid = 'PageIndicator_test'

describe('PageIndicator Component', () => {
  let wrapper: any
  // 渲染
  it('component: PageIndicator, <test prop:: fieldid>', () => {
    wrapper = mount(<PageIndicator fieldid={fieldid}/>)
    expect(wrapper.find(`.${prefixPageIndicator}`).prop('fieldid')).toEqual(`${fieldid}`);
  });

  it('component: PageIndicator, <test prop:: className>', () => {
    wrapper = mount(<PageIndicator className='class-test'/>)
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass('class-test')).toEqual(true);
  });

  it('component: PageIndicator, <test prop:: clsPrefix>', () => {
    wrapper = mount(<PageIndicator clsPrefix='clsPrefix-test'/>)
    expect(wrapper.exists(`.${prefixPageIndicator}`)).toEqual(false);
    expect(wrapper.exists('.clsPrefix-test-page-indicator')).toEqual(true);
    expect(wrapper.exists('.clsPrefix-test-page-indicator-horizontal')).toEqual(true);
    expect(wrapper.exists('.clsPrefix-test-page-indicator-color-primary')).toEqual(true);
  });

  it('component: PageIndicator, <test prop:: direction>', () => {
    wrapper = mount(<PageIndicator />)
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-vertical`)).toEqual(false);
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-horizontal`)).toEqual(true);
    wrapper.setProps({ direction: 'vertical' })
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-vertical`)).toEqual(true);
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-horizontal`)).toEqual(false);
  });

  it('component: PageIndicator, <test prop:: style>', () => {
    wrapper = mount(<PageIndicator />)
    wrapper.setProps({ style: { color: 'white' } })
    expect(wrapper.find(`.${prefixPageIndicator}`).prop('style').color).toEqual('white');
  });

  it('component: PageIndicator, <test prop:: color>', () => {
    wrapper = mount(<PageIndicator />)
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-color-primary`)).toEqual(true);
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-color-white`)).toEqual(false);

    wrapper.setProps({ color: 'white' })
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-color-primary`)).toEqual(false);
    expect(wrapper.find(`.${prefixPageIndicator}`).hasClass(`${prefixPageIndicator}-color-white`)).toEqual(true);
  });

  it('component: PageIndicator, <test prop:: total>', () => {
    wrapper = mount(<PageIndicator />)
    expect(wrapper.find(`.${prefixPageIndicator}`).find(`.${prefixPageIndicator}-dot`).length).toEqual(0);

    wrapper.setProps({ total: 5 })
    expect(wrapper.find(`.${prefixPageIndicator}`).find(`.${prefixPageIndicator}-dot`).length).toEqual(5);
  });

  it('component: PageIndicator, <test prop:: current>', () => {
    wrapper = mount(<PageIndicator total={5} current={2} />)
    expect(wrapper.find(`.${prefixPageIndicator}`).find(`.${prefixPageIndicator}-dot`).at(2).hasClass(`${prefixPageIndicator}-dot-active`)).toEqual(true);
  });
})
