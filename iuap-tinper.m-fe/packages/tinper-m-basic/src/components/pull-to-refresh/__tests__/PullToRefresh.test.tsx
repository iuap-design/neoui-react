/** PullToRefresh.tsx */
import React, { useState } from 'react'
import { render, fireEvent, screen, renderHook, act } from '@testing-library/react'
import PullToRefresh from '../src/index'
import { sleep } from '@/utils/Sleeps'
import { useDrag } from '@use-gesture/react'

const _clsPrefix = 'mui-pull-to-refresh'

async function getNextData() {
  await sleep(1000)
  return ['A', 'B', 'C']
}

function drag(element: Element, clientY: number) {
  fireEvent.mouseDown(element, {
    buttons: 1,
  })

  fireEvent.mouseMove(element, {
    buttons: 1,
    clientY,
  })

  fireEvent.mouseUp(element)
}

describe('PullToRefresh Component', () => {
  const originWindowProto = Object.getPrototypeOf(window)
  const getBoundingClientRectMock = jest.spyOn(
    HTMLElement.prototype,
    'getBoundingClientRect'
  )
  beforeAll(() => {
    jest.useFakeTimers()
    // window instanceof Window should be true
    Object.setPrototypeOf(window, Window.prototype)
    getBoundingClientRectMock.mockReturnValue({
      height: 10,
    } as DOMRect)
  })

  afterAll(() => {
    jest.useRealTimers()
    Object.setPrototypeOf(window, originWindowProto)
    getBoundingClientRectMock.mockRestore()
  })

  it('component: PullToRefresh, <test prop:: fieldid>, <test prop:: className>, <test prop:: clsPrefix>', () => {
    const fieldid = 'PullToRefresh_test'
    const classname = 'PullToRefresh_testClassName'
    const classPrefix = 'PullToRefresh_testClsPrefix'
    const comp = <PullToRefresh fieldid={fieldid} className={classname} clsPrefix={classPrefix}/>
    const wrapper = render(comp)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
    expect(wrapper.container.querySelector(`[class="${classPrefix}-pull-to-refresh ${classname}"]`)).toBeInTheDocument();
  });
  it('component: PullToRefresh, <test prop:: children>', () => {
    const comp = <PullToRefresh><div>children</div></PullToRefresh>
    const { getByText } = render(comp)
    expect(getByText('children')).toBeInTheDocument();

  });
  it('component: PullToRefresh, <test prop:: onRefresh>, <test prop:: threshold>', async () => {
    const onRefresh = jest.fn()
    render(<PullToRefresh threshold={70} onRefresh={onRefresh}><div style={{ height: '200px' }}>children</div></PullToRefresh>)
    const content = document.querySelector(`.${_clsPrefix}-content`) as HTMLElement
    drag(content, 220)
    await act(async () => {
      Promise.resolve()
    })
    expect(screen.getByText('刷新成功')).toBeInTheDocument()

    drag(content, 220)
    await act(async () => {
      Promise.resolve()
    })
    expect(screen.getByText('刷新成功')).toBeInTheDocument()
    expect(onRefresh.mock.calls.length).toEqual(1)
  })
  it('component: PullToRefresh, <test prop:: disabled>', async () => {
    const onRefresh = jest.fn()
    render(<PullToRefresh disabled onRefresh={onRefresh}><div style={{ height: '200px' }}>children</div></PullToRefresh>)
    const content = document.querySelector(`.${_clsPrefix}-content`) as HTMLElement
    drag(content, 200)
    await act(async () => {
      Promise.resolve()
    })
    expect(screen.getByText('下拉刷新')).toBeInTheDocument()
  })
  it('component: PullToRefresh, <test prop:: renderText>', () => {
    const comp = <PullToRefresh renderText={ () => {return '加载中'}}><div>children</div></PullToRefresh>
    const { getByText } = render(comp)
    expect(getByText('加载中')).toBeInTheDocument();
  });
  it('component: PullToRefresh, <test prop:: headHeight>', () => {
    const comp = <PullToRefresh headHeight={60}><div>children</div></PullToRefresh>
    render(comp)
    const content = document.querySelector(`.${_clsPrefix}-head-content`)
    expect(content).toHaveStyle('height: 60px');
  });
  it('component: PullToRefresh, <test prop:: pullingText>, <test prop:: canReleaseText>, <test prop:: refreshingText>, <test prop:: completeText>', async () => {
    const onRefresh = jest.fn()
    const comp = <PullToRefresh onRefresh={onRefresh} pullingText='用力拉' canReleaseText='松开吧' refreshingText='玩命加载中...' completeText='好啦'><div>children</div></PullToRefresh>
    render(comp)
    const content = document.querySelector(`.${_clsPrefix}-content`) as HTMLElement
    fireEvent.mouseDown(content, {
      buttons: 1,
    })

    fireEvent.mouseMove(content, {
      buttons: 1,
      clientY: 100,
    })
    expect(screen.getByText('用力拉')).toBeInTheDocument()

    fireEvent.mouseMove(content, {
      buttons: 1,
      clientY: 200,
    })
    expect(screen.getByText('松开吧')).toBeInTheDocument()

    fireEvent.mouseUp(content)
    expect(screen.getByText('玩命加载中...')).toBeInTheDocument()

    await act(async () => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByText('好啦')).toBeInTheDocument()
  });
})
