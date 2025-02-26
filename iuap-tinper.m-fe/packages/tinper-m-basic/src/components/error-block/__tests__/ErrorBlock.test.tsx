/** CreateErrorBlock.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import ErrorBlock from '../src';
import demoImage from '@assets/FallBack.svg'

const classPrefix = `mui-error-block`

describe('ErrorBlock Component', () => {
  it('component: ErrorBlock, <test prop:: fieldid>', () => {
    const fieldid = 'ErrorBlock_test'
    const wrapper = render(<ErrorBlock status='default' fieldid={fieldid}/>)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  });
  it('component: ErrorBlock, <test prop:: style>', () => {
    const fieldid = 'ErrorBlock_test1'
    const wrapper = mount(<ErrorBlock fieldid={fieldid} style={{ background: 'red' }}/>);
    expect(wrapper.find('div').props().style.background).toEqual('red');
  });
  it('component: ErrorBlock, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<ErrorBlock clsPrefix={classPrefix}/>);
    expect(wrapper.find('div').hasClass(`${classPrefix}-error-block`)).toEqual(true);
  });
  it('component: ErrorBlock, <test prop:: className>', () => {
    const wrapper = mount(<ErrorBlock className='testClassName'/>);
    expect(wrapper.hasClass('testClassName')).toEqual(true);
  });
  ['default' , 'disconnected' , 'empty' , 'busy'].forEach(item => {
    const data = {
      default: '待会来试试',
      disconnected: '暂无网络',
      empty: '暂无数据',
      busy: '暂无搜索'
    }
    it('component: ErrorBlock, <test prop:: status>', () => {
      const { getByText } = render(<ErrorBlock status={item}/>);
      const element = getByText(data[item]);
      expect(element).toBeInTheDocument();
    })
  });

  it('component: ErrorBlock, <test prop:: fullPage>, <test prop:: children>', async () => {
    const children = 'ErrorBlockChildren'
    const { getByTestId, getByText } = render(
      <ErrorBlock fullPage data-testid='error-block'>{children}</ErrorBlock>
    )
    expect(getByTestId('error-block')).toHaveClass(`${classPrefix}-full-page`)
    const element = getByText(children)
    expect(element).toBeInTheDocument()
  })

  test('component: ErrorBlock, <test prop:: title>, <test prop:: description>', async () => {
    const title = 0
    const description = 0

    const { container } = render(
      <ErrorBlock title={title} description={description} />
    )

    const titleElement = container.querySelector(
      `.${classPrefix}-description-title`
    )
    expect(titleElement).toBeInTheDocument()
    expect(titleElement?.textContent).toBe(title + '')

    const descElement = container.querySelector(
      `.${classPrefix}-description-subtitle`
    )
    expect(descElement).toBeInTheDocument()
    expect(descElement?.textContent).toBe(description + '')
  })
  it('component: ErrorBlock, <test prop:: image>', () => {
    const wrapper = mount(<ErrorBlock/>);
    const src = 'http://localhost/image/demos/image-demo.png'
    wrapper.setProps({ image: src, fieldid: 'image-test-fieldid' })
    expect(wrapper.find('img').props().src).toEqual(src);
  })
})
