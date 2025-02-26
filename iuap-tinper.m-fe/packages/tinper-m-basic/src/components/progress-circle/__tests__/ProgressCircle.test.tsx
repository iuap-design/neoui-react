/** ProgressCircle.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import ProgressCircle from '../src/index'
import { mount } from '@tests/mount'

const classPrefix = `mui-progress-circle`

describe('ProgressCircle', () => {
  let wrapper: any
  const fieldid = 'progress-circle';
  // 渲染
  it('component: ProgressCircle, <test prop:: fieldid>', () => {
    wrapper = mount(<ProgressCircle fieldid={fieldid} />)
    expect(wrapper.find(`.${classPrefix}`).prop('fieldid')).toEqual(`${fieldid}`);
  });
  // 自定义样式-clsPrefix
  it('component: ProgressCircle, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    wrapper = mount(<ProgressCircle clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${classPrefix}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-progress-circle`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: ProgressCircle, <test prop:: className >', () => {
    const customCls = 'custom-cls';
    wrapper = mount(<ProgressCircle className={customCls} />)
    expect(wrapper.exists(`.${customCls}`)).toEqual(true);
  })

  // 自定义样式-style
  it('component: ProgressCircle, <test prop:: style >', () => {
    const customStyle = {
      background: '#FFFFFF'
    };
    wrapper = mount(<ProgressCircle style={customStyle} />)
    expect(wrapper.find(`.${classPrefix}`).props().style.background).toEqual('rgb(255, 255, 255)');
  })
  it('component: ProgressCircle, <test prop:: percent >', () => {
    render(<ProgressCircle percent={20} />)
    expect(document.querySelector(`.${classPrefix}`)).toHaveStyle(
      '--percent:20;'
    )
  })

  test('component: ProgressCircle, <test prop:: children >', () => {
    render(<ProgressCircle percent={50}>50%</ProgressCircle>)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})
