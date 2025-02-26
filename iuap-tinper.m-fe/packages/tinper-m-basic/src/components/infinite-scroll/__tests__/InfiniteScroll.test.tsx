/** InfiniteScroll.tsx */
import React, { useState } from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import InfiniteScroll from '../src/index'
import { sleep } from '@/utils/Sleeps'
import List from '@/components/list/src/List'
import { InfiniteScrollProps } from '../src/iInfiniteScroll'

const _clsPrefix='mui-infinite-scroll'
let count = 0
const time = 1000
export async function mockRequest() {
  if (count >= 2) {
    return []
  }
  await sleep(time)
  count++
  return ['A', 'B', 'C']
}

describe('InfiniteScroll Component', () => {
  const getBoundingClientRectMock = jest.spyOn(
    HTMLElement.prototype,
    'getBoundingClientRect'
  )

  beforeEach(() => {
    count = 0

    getBoundingClientRectMock.mockReturnValue({
      top: 1000,
    } as DOMRect)
  })

  beforeAll(() => {
    window.innerHeight = 667

    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      value: {},
    })

    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  const App = (props?: Partial<InfiniteScrollProps>) => {
    const [data, setData] = useState<string[]>([])
    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
      const append = await mockRequest()
      setData(val => [...val, ...append])
      setHasMore(append.length > 0)
    }

    return (
      <>
        <List>
          {data.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} {...props}>
          {props?.children}
        </InfiniteScroll>
      </>
    )
  }

  it('component: InfiniteScroll, <test prop:: fieldid>, <test prop:: className>, <test prop:: clsPrefix>', () => {
    const fieldid = 'InfiniteScroll_test'
    const classname = 'InfiniteScroll_testClassName'
    const classPrefix = 'InfiniteScroll_testClassPrefix'
    const comp = <InfiniteScroll fieldid={fieldid} className={classname} clsPrefix={classPrefix}/>
    const wrapper = render(comp)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
    expect(wrapper.container.querySelector(`[class="${classPrefix}-infinite-scroll ${classname}"]`)).toBeInTheDocument();
  });
  it('component: InfiniteScroll, <test prop:: children>', () => {
    const comp = <InfiniteScroll><div>向上拉</div></InfiniteScroll>
    const { getByText } = render(comp)
    expect(getByText('向上拉')).toBeInTheDocument();
  });
  it('component: InfiniteScroll, <test prop:: loadMore>', async () => {
    const loadMore = jest.fn()
    render(<App loadMore={loadMore}/>)
    getBoundingClientRectMock.mockReturnValue({
      top: 800,
    } as DOMRect)
    fireEvent.scroll(window)
    screen.findByText('加载中...')

    await act(async () => {
      jest.advanceTimersByTime(time)
    })
    await act(async () => {
      jest.advanceTimersByTime(time)
    })
    await act(async () => {
      jest.advanceTimersByTime(time)
    })
    expect(loadMore.mock.calls.length).toEqual(6);
  });

  it('component: InfiniteScroll, <test prop:: onEndReached>', async () => {
    const onEndReached = jest.fn()
    const loadMore = jest.fn()
    render(<App loadMore={loadMore} onEndReached={onEndReached}/>)
    getBoundingClientRectMock.mockReturnValue({
      top: 800,
    } as DOMRect)
    fireEvent.scroll(window)
    screen.findByText('加载中...')

/*     await act(async () => {
      jest.advanceTimersByTime(time)
    })
    await act(async () => {
      jest.advanceTimersByTime(time)
    })
    await act(async () => {
      jest.advanceTimersByTime(time)
    }) */
    expect(onEndReached.mock.calls.length).toEqual(1);
  });

  it('component: InfiniteScroll, <test prop:: hasMore>', async () => {
    const loadMore = jest.fn()
    render(<App loadMore={loadMore} hasMore={false}/>)
    getBoundingClientRectMock.mockReturnValue({
      top: 800,
    } as DOMRect)
    fireEvent.scroll(window)
    screen.findByText('没有更多了')

    await act(async () => {
      jest.advanceTimersByTime(time)
    })
    await act(async () => {
      jest.advanceTimersByTime(time)
    })
    await act(async () => {
      jest.advanceTimersByTime(time)
    })
    expect(loadMore.mock.calls.length).toEqual(0);
  });
})
