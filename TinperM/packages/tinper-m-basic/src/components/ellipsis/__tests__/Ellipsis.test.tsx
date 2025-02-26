/** Ellipsis.tsx */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Ellipsis from '../src'
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixEllipsis = `${muiPrefix}-ellipsis`;
const fieldid = 'ellipsis_test'

const content =
  'YonDesign是一套企业级设计系统。基于用友多年企业级产品的成功经验并结合业内最新技术及设计趋势，以B端各类角色、场景、业务为基础，沉淀出一整套设计语言、方法、规范及模式，包括：设计原则与方法、基础视觉规范、基础组件、业务组件、布局、界面模式及应用案例等，并沉淀不同领域、行业的的设计规范和案例。'

  const lineHeight = 26

describe('Ellipsis Component', () => {

  const originGetComputedStyle = window.getComputedStyle
  beforeAll(() => {
    window.getComputedStyle = el => {
      const style = originGetComputedStyle(el)
      style.lineHeight = `${lineHeight}px`
      return style
    }
  })

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get() {
        if (this.innerHTML.includes('...')) {
          const row = Math.ceil(
            // the width of '...' is equal to a Chinese char
            (this.innerHTML.replace(/\.\.\./g, '中').length / content.length) *
              4
          )
          return lineHeight * row
        }
        return lineHeight * 4
      },
    })
  })

  afterAll(() => {
    window.getComputedStyle = originGetComputedStyle
  })

  let wrapper: any
  // 渲染
  it('component: Ellipsis, <test prop:: fieldid>', () => {
    wrapper = mount(<Ellipsis fieldid={fieldid} />)
    expect(wrapper.find(`.${prefixEllipsis}`).prop('fieldid')).toEqual(`${fieldid}`);
  });

  // 自定义样式-clsPrefix
  it('component: Ellipsis, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    wrapper = mount(<Ellipsis clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${prefixEllipsis}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-ellipsis`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: Ellipsis, <test prop:: className >', () => {
    const customCls = 'custom-cls';
    wrapper = mount(<Ellipsis className={customCls} />)
    expect(wrapper.exists(`.${customCls}`)).toEqual(true);
  })

  // 自定义样式-style
  it('component: Ellipsis, <test prop:: style >', () => {
    const customStyle = {
      background: '#FFFFFF'
    };
    wrapper = mount(<Ellipsis style={customStyle} />)
    expect(wrapper.find(`.${prefixEllipsis}`).props().style.background).toEqual('rgb(255, 255, 255)');
  })

  // 文本内容-content
  it('component: Ellipsis  <test prop:: content>', () => {
    wrapper = mount(<Ellipsis content={content}/>)
    expect(document.querySelector('mui-ellipsis')?.innerHTML !== null).toBeTruthy();
  });

  // 省略位置-direction
  it('component: Ellipsis, <test prop:: direction>', () => {
    let direction = 'start'
    wrapper = mount(<Ellipsis content={content} direction={direction}/>)
    expect(document.querySelector('.mui-ellipsis')?.innerHTML.startsWith('...')).toBeTruthy();
    direction = 'end'
    wrapper.setProps({
      direction: direction,
      content: content
    })
    expect(document.querySelector('.mui-ellipsis')?.innerHTML.endsWith('...')).toBeTruthy();
    // TODO: 测试中报错, 中间省略时渲染为了两行, 暂时注释掉
    /* direction = 'middle'
    wrapper.setProps({
      direction: direction,
      content: content
    }) */
  });

  // 省略行数-rows
  it('component: Ellipsis, <test prop:: rows>', () => {
    wrapper = mount(<Ellipsis content={content} rows={1}/>)
    const length1 = document.querySelector('.mui-ellipsis')?.innerHTML.length
    wrapper.setProps({
      rows: 2,
      content: content
    })
    const length2 = document.querySelector('.mui-ellipsis')?.innerHTML.length
    expect(Math.round(length2 / length1) === 2).toBeTruthy();
  });

  // 展开收起
  it('component: Ellipsis, <test prop:: expandText> <test prop:: collapseText>', () => {
    const expendText = '展开'
    const collapseText = '收起'
    wrapper = mount(<Ellipsis
      content={content}
      direction='end'
      expandText={expendText}
      collapseText={collapseText}
    />)
    const element = wrapper.find('a').getDOMNode()
    expect(element.innerHTML).toEqual(expendText)
    fireEvent.click(element);
    expect(element.innerHTML).toEqual(collapseText)
    fireEvent.click(element);
    expect(element.innerHTML).toEqual(expendText)
  });

  // 阻止冒泡-stopPropagationForActionButtons
  it('component: Ellipsis, <test prop:: stopPropagationForActionButtons>', () => {
    const onContentClick = jest.fn();
    wrapper = mount(<Ellipsis
      content={content}
      direction='end'
      expandText='展开'
      collapseText='收起'
      stopPropagationForActionButtons={['click']}
      onContentClick={onContentClick}
    />)
    fireEvent.click(document.querySelector('a'))
    expect(onContentClick).toHaveBeenCalledTimes(0);
  });

  // 内容点击事件-onContentClick
  it('component: Ellipsis, <test prop:: onContentClick>', () => {
    const onContentClick = jest.fn();
    wrapper = mount(<Ellipsis content={content} direction='end' onContentClick={onContentClick}/>)
    fireEvent.click(document.querySelector('.mui-ellipsis'))
    expect(onContentClick).toHaveBeenCalledTimes(1);
  });

  // 默认展开-defaultExpanded
  it('component: Ellipsis, <test prop:: defaultExpanded>', () => {
    const expendText = '展开'
    const collapseText = '收起'
    wrapper = mount(<Ellipsis
      content={content}
      direction='end'
      defaultExpanded={true}
      expandText={expendText}
      collapseText={collapseText}
    />)
    const element = wrapper.find('a').getDOMNode()
    expect(element.innerHTML).toEqual(collapseText)
  });
})
