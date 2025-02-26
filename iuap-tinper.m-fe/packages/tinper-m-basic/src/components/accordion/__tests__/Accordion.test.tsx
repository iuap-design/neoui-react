/** Accordion.tsx */
import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { mount } from '@tests/mount'
import Accordion from '../src'
import { Sync } from '@tinper/m-icons'

const classPrefix = `mui-accordion`

describe('Accordion Component', () => {
  it('component: Accordion, <test prop:: fieldid>', () => {
    const fieldid = 'Accordion_test'
    const component = <Accordion fieldid={fieldid} />
    const wrapper = render(component)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  })
  it('component: Accordion, <test prop:: className>', () => {
    const wrapper = mount(<Accordion className='testClassName' />);
    expect(wrapper.hasClass('testClassName')).toEqual(true);
  });
  it('component: Accordion, <test prop:: style>', () => {
    const wrapper = mount(<Accordion style={{ background: 'black' }} />);
    expect(wrapper.find('div').props().style.background).toEqual('black');
  });
  it('component: Accordion, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Accordion clsPrefix={classPrefix} />);
    expect(wrapper.hasClass(`${classPrefix}-accordion`)).toEqual(true);
  });
  it('component: Accordion, <test prop:: children>, <test prop:: defaultActiveKey>', () => {
    const { getByText } = render(
      <Accordion defaultActiveKey={['2']}>
        <Accordion.Panel key='1' title='第一项'>
          <div data-testid='first'>这里是第一项的内容</div>
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项'>
          <div data-testid='second'>这里是第二项的内容</div>
        </Accordion.Panel>
      </Accordion>
    );
    expect(getByText('这里是第二项的内容')).toBeInTheDocument();
  });
  it('component: Accordion, <test prop:: activeKey>', () => {
    const { getByText } = render(
      <Accordion activeKey={['2']}>
        <Accordion.Panel key='1' title='第一项'>
          <div data-testid='first'>这里是第一项的内容</div>
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项'>
          <div data-testid='second'>这里是第二项的内容</div>
        </Accordion.Panel>
      </Accordion>
    );
    expect(getByText('这里是第二项的内容')).toBeInTheDocument();
  });
  it('component: Accordion, <test prop:: accordion>', async () => {
    render(
      <Accordion defaultActiveKey='1' accordion>
        <Accordion.Panel key='1' title='第一项'>
          <div data-testid='first'>这里是第一项的内容</div>
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项'>
          <div data-testid='second'>这里是第二项的内容</div>
        </Accordion.Panel>
        <Accordion.Panel key='3' title='第三项'>
          <div data-testid='third'>这里是第三项的内容</div>
        </Accordion.Panel>
      </Accordion>
    )
    expect(await screen.queryByTestId('first')).toBeVisible()
    expect(await screen.queryByTestId('second')).toBe(null)
    expect(await screen.queryByTestId('third')).toBe(null)

    // 点击第二项，第二项展开，其他闭合,通过height：0px 隐藏
    fireEvent.click(screen.getByText('第二项'))
    await waitFor(() => {
      const [first] = Array.from(
        document.getElementsByClassName(`${classPrefix}-panel-content`)
      )
      expect(first).toHaveStyle('height: 0px')
      // 未展示的组件，依旧没有渲染
      expect(screen.queryByTestId('third')).toBe(null)
    });
    // 点击第三项，第三项展开，其他闭合
    fireEvent.click(screen.getByText('第三项'))
    await waitFor(() => {
      const [first, second] = Array.from(
        document.getElementsByClassName(`${classPrefix}-panel-content`)
      )
      // 第一，第二都隐藏
      expect(first).toHaveStyle('height: 0px')
      expect(second).toHaveStyle('height: 0px')

      // 三个都有渲染，只是前两个隐藏了
      expect(screen.queryByTestId('first')).toBeVisible()
      expect(screen.queryByTestId('second')).toBeVisible()
      expect(screen.queryByTestId('third')).toBeVisible()
    })
  });
  it('component: Accordion, <test prop:: arrow>', () => {
    const wrapper = mount(
      <Accordion defaultActiveKey='1' arrow={<Sync />}>
        <Accordion.Panel key='1' title='第一项'>
          <div data-testid='first'>这里是第一项的内容</div>
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项'>
          <div data-testid='second'>这里是第二项的内容</div>
        </Accordion.Panel>
        <Accordion.Panel key='3' title='第三项'>
          <div data-testid='third'>这里是第三项的内容</div>
        </Accordion.Panel>
      </Accordion>
    )
    expect(wrapper.find('svg').props().id).toEqual('arcSync');
  });
})

describe('Test Accordion Events', () => {
  it('onChange, <test prop:: onChange>', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Accordion defaultActiveKey={['1']} onChange={onChange}>
        <Accordion.Panel key='1' title='第一项'>
          <div data-testid='first'>这里是第一项的内容</div>
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项'>
          <div data-testid='second'>这里是第二项的内容</div>
        </Accordion.Panel>
        <Accordion.Panel key='3' title='第三项'>
          <div data-testid='third'>这里是第三项的内容</div>
        </Accordion.Panel>
      </Accordion>
    )
    expect(await screen.queryByTestId('first')).toBeVisible()
    expect(await screen.queryByTestId('second')).toBe(null)
    expect(await screen.queryByTestId('third')).toBe(null)
    expect(onChange).toHaveBeenCalledTimes(0);
    // 点击第二项，第二项展开
    fireEvent.click(screen.getByText('第二项'))
    expect(onChange).toHaveBeenCalledTimes(1);
    // 点击第三项，第二项展开
    fireEvent.click(screen.getByText('第三项'))
    expect(onChange).toHaveBeenCalledTimes(2);
  });
})
