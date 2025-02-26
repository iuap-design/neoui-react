/** Steps.tsx */
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import { mount } from '@tests/mount'
import { Steps } from '@tinper/m';
import '@tinper/m-icons/lib/iconfont/iconfont.js'

import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixSteps = `${muiPrefix}-steps`;
const prefixStep = `${muiPrefix}-step`;

const { Step } = Steps

describe('Steps Component', () => {
  it('render, <test prop:: fieldid>', () => {
    const fieldid = 'Steps_test'
    const wrapper = mount(
      <Steps current={1} fieldid={fieldid}>
        <Step title="已完成" description="副标题"/>
        <Step title="进行中" description="副标题"/>
        <Step title="未开始" description="副标题"/>
      </Steps>)
    const element = wrapper.find(`[fieldid="${fieldid}_steps"]`);
    expect(element.getDOMNode()).toBeInTheDocument();
  });

  it('style test, <test prop:: style>', () => {
    const wrapper = mount(<Steps style={{ display: 'flex' }} />);
    expect(wrapper.find(`.${prefixSteps}`).props().style.display).toBe('flex');
  })

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const wrapper = mount(<Steps clsPrefix="testClassPre" />);
    expect(wrapper.find('.testClassPre-steps').getDOMNode()).toBeInTheDocument();
  })

  it('className test, <test prop:: className>', () => {
    const wrapper = mount(<Steps className="test-classname" />);
    expect(wrapper.find(`.${prefixSteps}`).hasClass('test-classname')).toBeTruthy();
  })

  it('current test, <test prop:: current>', () => {
    const wrapper = mount(
      <Steps current={1}>
        <Step title="已完成" description="副标题"/>
        <Step title="进行中" description="副标题"/>
        <Step title="未开始" description="副标题"/>
      </Steps>
    );
    const step = wrapper.find(`.${prefixStep}-status-process`);
    expect(step.find(`.${prefixStep}-title`).text('test-classname')).toBe('进行中');
  })

  it('direction test, <test prop:: direction>', () => {
    const wrapper = mount(
      <Steps current={1} direction='vertical'>
        <Step title="已完成" description="副标题"/>
        <Step title="进行中" description="副标题"/>
        <Step title="未开始" description="副标题"/>
      </Steps>
    );
    const vertical = wrapper.find(`.${prefixSteps}-vertical`);
    expect(vertical.getDOMNode()).toBeInTheDocument();
  })

  it('children test, <test prop:: children>', () => {
    const wrapper = mount(
      <Steps current={1} direction='vertical'>
        <Step title="已完成" description="副标题"/>
        <Step title="进行中" description="副标题"/>
        <Step title="未开始" description="副标题"/>
      </Steps>
    );
     
    const step = wrapper.find(`.${prefixStep}`);
    expect(step.length).toBe(3);
  })
})
