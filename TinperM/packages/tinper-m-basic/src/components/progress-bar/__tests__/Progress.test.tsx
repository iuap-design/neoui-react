/** ProgressBar.tsx */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProgressBar from '../src/index'
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixProgressBar = `${muiPrefix}-progress-bar`;
const fieldid = 'ProgressBar_test'

describe('ProgressBar Component', () => {
  let wrapper: any
  // 渲染
  it('component: ProgressBar, <test prop:: fieldid>', () => {
    wrapper = mount(<ProgressBar fieldid={fieldid} />)
    expect(wrapper.find(`.${prefixProgressBar}`).prop('fieldid')).toEqual(`${fieldid}`);
  });

  // percent 百分比
  it('component: ProgressBar, <test prop:: percent >', () => {
    let percent = 50;
    wrapper = mount(<ProgressBar percent={percent} />);
    expect(wrapper.find(`.${prefixProgressBar}-fill`).props().style.width).toEqual(`${percent}%`);
    percent = 80;
    wrapper.setProps({ percent: 80 })
    expect(wrapper.find(`.${prefixProgressBar}-fill`).props().style.width).toEqual(`${percent}%`);
  });

  it('component: ProgressBar, <test prop:: rounded >', () => {
    wrapper = mount(<ProgressBar rounded={false} />);
    expect(wrapper.exists(`.${prefixProgressBar}-rounded`)).toEqual(false);
    wrapper.setProps({ rounded: true })
    expect(wrapper.exists(`.${prefixProgressBar}-rounded`)).toEqual(true);
  });

  // text 文字
  it('component: ProgressBar, <test prop:: text >', () => {
    wrapper = mount(<ProgressBar text={false} />);
    expect(wrapper.exists(`.${prefixProgressBar}-text`)).toEqual(false);
    wrapper.setProps({ text: true })
    expect(wrapper.exists(`.${prefixProgressBar}-text`)).toEqual(true);
    const customeText = '加载中...'
    wrapper.setProps({ text: customeText })
    expect(screen.getByText(customeText)).toBeInTheDocument();
    const textFunc = jest.fn();
    wrapper = mount(<ProgressBar text={textFunc} />);
    expect(textFunc).toHaveBeenCalled();

    const customeTextFunc = (percent: number) => {
      return `${percent}%`
    }
    wrapper.setProps({ percent: 50, text: customeTextFunc })
    expect(screen.getByText('50%')).toBeInTheDocument();
    wrapper.setProps({ percent: 80, text: customeTextFunc })
    expect(screen.getByText('80%')).toBeInTheDocument();

  });

  // 自定义样式-clsPrefix
  it('component: ProgressBar, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    wrapper = mount(<ProgressBar clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${prefixProgressBar}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-progress-bar`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: ProgressBar, <test prop:: className > <test prop:: labelCls > <test prop:: contentCls > <test prop:: errorCls > <test prop:: rightIconCls >', () => {
    const customCls = 'custom-cls';
    wrapper = mount(<ProgressBar className={customCls} />)
    expect(wrapper.exists(`.${customCls}`)).toEqual(true);
  })

  // 自定义样式-style
  it('component: ProgressBar, <test prop:: style >, <test prop:: labelStyle > <test prop:: contentStyle > <test prop:: wrapStyle >', () => {
    const customStyle = {
      background: '#FFFFFF'
    };
    wrapper = mount(<ProgressBar style={customStyle} />)
    expect(wrapper.find(`.${prefixProgressBar}`).props().style.background).toEqual('rgb(255, 255, 255)');
  })

})
