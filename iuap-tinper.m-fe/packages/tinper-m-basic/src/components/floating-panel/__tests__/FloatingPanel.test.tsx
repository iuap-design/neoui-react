/** FloatingPanel.tsx */
import React, { useRef, forwardRef } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { mount } from '@tests/mount'
import FloatingPanel, { FloatingPanelRef } from '../src'
import { Globals } from '@react-spring/web'

let reduced = false

const subscribers = new Set<() => void>()

function notify() {
  subscribers.forEach(subscriber => {
    subscriber()
  })
}

function reduceMotion() {
  reduced = true
  notify()
  Globals.assign({
    skipAnimation: true,
  })
}

function restoreMotion() {
  reduced = false
  notify()
  Globals.assign({
    skipAnimation: false,
  })
}

function subscribe(onStoreChange: () => void) {
  subscribers.add(onStoreChange)
  return () => {
    subscribers.delete(onStoreChange)
  }
}

const classPrefix = `mui-floating-panel`

const anchors = [100, 200, 400]

const data = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
]

async function mockDrag(el: Element, startY: number, endY: number) {
  fireEvent.mouseDown(el, {
    clientY: startY,
    buttons: 1,
  })
  fireEvent.mouseMove(el, {
    clientY: endY,
    buttons: 1,
  })
  fireEvent.mouseUp(el)
}

describe('FloatingPanel Component', () => {
  const App = forwardRef((props: any, ref) => (
    <FloatingPanel anchors={anchors} data-testid='panel' {...props} ref={ref}>
      {data.map(item => (
        <div key={item} style={{ height: 20 }}>
          {item}
        </div>
      ))}
    </FloatingPanel>
  ))

  it('component: FloatingPanel, <test prop:: fieldid>, <test prop:: children>', () => {
    const fieldid = 'FloatingPanel_test'
    const { container, getByText } = render(<App fieldid={fieldid}/>)
    const element = container.querySelector(`[fieldid="${fieldid}_floating_panel"]`);
    expect(element).toBeInTheDocument();
    const child = getByText('A')
    expect(child).toBeInTheDocument();
    const child2 = getByText('B')
    expect(child2).toBeInTheDocument();
  });
  it('component: FloatingPanel, <test prop:: style>', () => {
    const fieldid = 'FloatingPanel_test1'
    const wrapper = mount(<App fieldid={fieldid} style={{ background: 'red' }}/>);
    expect(wrapper.find('div').props().style.background).toEqual('red');
  });
  it('component: FloatingPanel, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<App clsPrefix={classPrefix}/>);
    expect(wrapper.find('div').hasClass(`${classPrefix}-floating-panel`)).toEqual(true);
  });
  it('component: FloatingPanel, <test prop:: className>', () => {
    const wrapper = mount(<App className='testClassName'/>);
    expect(wrapper.hasClass('testClassName')).toEqual(true);
  });

  it('component: FloatingPanel, <test prop:: anchors>', async () => {
    const { getByTestId } = render(<App />)

    const panelEl = getByTestId('panel')

    expect(panelEl.style.transform).toBe(
      `translateY(calc(100% + (-${anchors[0]}px)))`
    )

    mockDrag(panelEl, 0, -(anchors[0] + 20))
    await waitFor(() =>
      expect(panelEl.style.transform).toBe(
        `translateY(calc(100% + (-${anchors[1]}px)))`
      )
    )

    mockDrag(panelEl, 0, -(anchors[1] + 100))
    await waitFor(() =>
      expect(panelEl.style.transform).toBe(
        `translateY(calc(100% + (-${anchors[anchors.length - 1]}px)))`
      )
    )
  })

  it('component: FloatingPanel, <test prop:: onHeightChange>', async () => {
    restoreMotion()
    const fn = jest.fn()
    const { getByTestId } = render(<App onHeightChange={fn} />)

    const panelEl = getByTestId('panel')

    mockDrag(panelEl, 0, -(anchors[1] + 100))
    await waitFor(() => expect(fn).toBeCalled())

    // animating: true
    expect(fn.mock.calls[0][1]).toBeTruthy()

    await waitFor(() => {
      // animating: false
      expect(fn.mock.calls[fn.mock.calls.length - 1][1]).not.toBeTruthy()
      expect(fn.mock.calls[fn.mock.calls.length - 1][0]).toBe(
        anchors[anchors.length - 1]
      )
    })

    expect(panelEl.style.transform).toBe(
      `translateY(calc(100% + (-${anchors[anchors.length - 1]}px)))`
    )
    reduceMotion()
  })

  it('component: FloatingPanel, <test prop:: handleDraggingOfContent>', async () => {
    const { getByTestId } = render(<App handleDraggingOfContent={false} />)

    const panelEl = getByTestId('panel')
    const headEl = document.querySelectorAll(`.${classPrefix}-header`)[0]

    // content area
    mockDrag(panelEl, 0, -(anchors[0] + 20))
    expect(panelEl.style.transform).toBe(
      `translateY(calc(100% + (-${anchors[0]}px)))`
    )

    // head area
    mockDrag(headEl, 0, -(anchors[0] + 20))
    expect(panelEl.style.transform).toBe(
      `translateY(calc(100% + (-${anchors[1]}px)))`
    )
  })

  it('component: FloatingPanel, <test prop:: setHeight>', async () => {
    const Wrap = () => {
      const ref = useRef<FloatingPanelRef>(null)
      return (
        <>
          <App ref={ref} />
          <button onClick={() => ref.current?.setHeight(120)}>btn</button>
          <button
            onClick={() => ref.current?.setHeight(320, { immediate: true })}
          >
            btn-immediate
          </button>
        </>
      )
    }

    const { getByText, getByTestId } = render(<Wrap />)
    const panelEl = getByTestId('panel')

    getByText('btn').click()
    await waitFor(() =>
      expect(panelEl.style.transform).toBe(`translateY(calc(100% + (-120px)))`)
    )

    getByText('btn-immediate').click()
    await waitFor(() =>
      expect(panelEl.style.transform).toBe(`translateY(calc(100% + (-320px)))`)
    )
  })


})
