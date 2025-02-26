/** SwipeAction.tsx */
import React, { useRef } from 'react'
import { mount } from '@tests/mount'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import SwipeAction, { SwipeActionRef } from '../src'
import { muiPrefix } from '@utils/UpdatePrefixs'
import Dialog from '@/components/dialog/src'
import { sleep } from '@utils/Sleeps';

const prefixSwipeAction = `${muiPrefix}-swipe-action`;
const width = 80
const leftActions = [
  {
    key: 'pin',
    text: '置顶',
    color: 'primary',
  },
]
const rightActions = [
  {
    key: 'unsubscribe',
    text: '取消关注',
    color: 'light',
  },
  {
    key: 'mute',
    text: '免打扰',
    color: 'warning',
  },
  {
    key: 'delete',
    text: '删除',
    color: 'danger',
  },
]

const mockDrag = async (el: Element, options: any[], time?: number) => {
  const [downOptions, ...moveOptions] = options
  fireEvent.mouseDown(el, {
    buttons: 1,
    ...downOptions,
  })
  for (const item of moveOptions) {
    fireEvent.mouseMove(el, {
      buttons: 1,
      ...item,
    })

    if (time) {
      await sleep(time)
    }
  }
  fireEvent.mouseUp(el)
}

function swipe(el: Element, moveOptions: { clientX: number }[]) {
  mockDrag(el, [
    {
      clientX: 100,
    },
    ...moveOptions,
  ])
}

describe('SwipeAction Component', () => {
  let wrapper;
  it('describe', () => {
    wrapper = mount(<SwipeAction />)
    expect(wrapper.exists(`.${prefixSwipeAction}`)).toEqual(true);
  });
  it('component: SwipeAction, <test prop:: fieldid>', () => {
    const fieldid = 'SwipeAction_test'
    const { container } = render(<SwipeAction fieldid={fieldid} />)
    const element = container.querySelector(`[fieldid="${fieldid}_swipe_action"]`);
    expect(element).toBeInTheDocument();
  });
  it('component: SwipeAction, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<SwipeAction clsPrefix={classPrefix} />);
    expect(wrapper.find('div').hasClass(`${classPrefix}-swipe-action`)).toEqual(true);
  });
  it('component: SwipeAction, <test prop:: leftActions>, <test prop:: rightActions>, <test prop:: children>', () => {
    const fieldid = 'SwipeAction_test'
    const children = 'SwipeAction_children'
    const swiperaction = <SwipeAction
      closeOnTouchOutside={false}
      fieldid={fieldid}
      leftActions={leftActions}
      rightActions={rightActions}
    >
      {children}
    </SwipeAction>
    const { getByText } = render(swiperaction)
    const elementLeft = getByText('置顶')
    expect(elementLeft).toBeInTheDocument();
    const elementRight = getByText('删除')
    expect(elementRight).toBeInTheDocument();
    const elementChildren = getByText(children)
    expect(elementChildren).toBeInTheDocument();
  });
  it('component: SwipeAction, <test prop:: stopPropagation>', () => {
    const fieldid = 'SwipeAction_test'
    const onActionClick = jest.fn()
    const { getByText } = render(<SwipeAction leftActions={leftActions} onAction={onActionClick} fieldid={fieldid} stopPropagation={['onClick']} />)
    const childElement = getByText('置顶');
    // 触发子元素的点击事件
    fireEvent.click(childElement);
    // 检查父元素的点击事件是否被触发
    expect(onActionClick).toHaveBeenCalled();
  });
  test('component: SwipeAction, <test prop:: closeOnAction>, <test prop:: closeOnTouchOutside>', async () => {
    const App = () => {
      const ref = useRef<SwipeActionRef>(null)

      return (
        <SwipeAction
          ref={ref}
          closeOnAction={false}
          closeOnTouchOutside={false}
          rightActions={[
            {
              key: 'delete',
              text: 'delete',
              color: 'danger',
              onClick: async () => {
                await Dialog.confirm({
                  content: 'Are you sure',
                })
                ref.current?.close()
              },
            },
          ]}
          data-testid='swipe'
        >
          A
        </SwipeAction>
      )
    }
    const { getByTestId, getByText } = render(<App />)
    swipe(getByTestId('swipe'), [
      {
        clientX: 250,
      },
    ])

    const track = document.querySelectorAll(`.${prefixSwipeAction}-track`)[0]
    // await waitFor(() =>
    //   expect(track).toHaveStyle(`transform: translate3d(-${width}px,0,0);`)
    // )
    fireEvent.click(getByText('delete'))
    await waitFor(() => expect(track).toHaveStyle(`transform: none`))
  });
  it('should not drag when disabled, <test prop:: disabled>', () => {
    const { getByTestId, queryByTestId } = render(
      <SwipeAction
        data-testid="swipe-action"
        leftActions={[{ text: 'Left Action' }]}
        rightActions={[{ text: 'Right Action' }]}
        disabled
      />
    );

    // 尝试拖动
    const swipeAction = getByTestId('swipe-action');
    fireEvent.touchStart(swipeAction, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(swipeAction, { touches: [{ clientX: 100, clientY: 0 }] });

    // 检查是否未发生任何拖动
    expect(queryByTestId('swipe-action')).not.toHaveStyle('transform: translateX(-100px)');
  });
});

describe('SwipeAction Events', () => {
  it('SwipeAction event test, <test prop:: onAction>', () => {
    const onActionClick = jest.fn()
    const { getByText } = render(<SwipeAction leftActions={rightActions} onAction={onActionClick} />)
    const childElement = getByText('取消关注');
    fireEvent.click(childElement);
    expect(onActionClick).toHaveBeenCalled();
  });
  it('SwipeAction event test, <test prop:: onActionsReveal>', async () => {
    const onActionsReveal = jest.fn()
    const App = () => {
      const ref = useRef<SwipeActionRef>(null)
      return (
        <>
          <SwipeAction
            ref={ref}
            leftActions={leftActions}
            onActionsReveal={onActionsReveal}
          >
            A
          </SwipeAction>
          <button onClick={() => ref.current?.show('left')}>left</button>
        </>
      )
    }
    const { getByText } = render(<App />)

    fireEvent.click(getByText('left'))
    await waitFor(() => {
      expect(onActionsReveal.mock.calls.length).toEqual(1)
      expect(onActionsReveal).toHaveBeenCalledWith('left')
    })
  });
});
