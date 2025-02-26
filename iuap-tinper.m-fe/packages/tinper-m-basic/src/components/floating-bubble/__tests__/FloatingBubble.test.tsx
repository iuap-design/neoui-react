/** FloatingBubble.tsx */
import React, { useState }  from 'react'
import { fireEvent, render, waitFor, screen, sleep } from '@testing-library/react'
import { mount } from '@tests/mount'
import FloatingBubble from '../src'

const classPrefix = `mui-floating-bubble`

function mockRect(el: Element, value: any) {
  jest.spyOn(el, 'getBoundingClientRect').mockReturnValue(value)
}

function mockBoundaryRect() {
  const boundary = document.querySelectorAll(`.${classPrefix}-boundary`)[0]
  mockRect(boundary, {
    top: 0,
    right: 300,
    bottom: 600,
    left: 0,
    x: 0,
    y: 0,
  })
}

function mockButtonRect(data: any = {}) {
  const btn = document.querySelectorAll(`.${classPrefix}-button`)[0]
  const defaultRect = {
    x: 252,
    left: 252,
    right: 300,
    y: 500,
    top: 552,
    bottom: 600,
  }
  mockRect(btn, {
    ...defaultRect,
    ...data,
  })
}

describe('FloatingBubble Component', () => {
  it('component: FloatingBubble, <test prop:: fieldid>', () => {
    const fieldid = 'FloatingBubble_test'
    const component = <FloatingBubble fieldid={fieldid} />
    const wrapper = render(component)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  })
  it('component: FloatingBubble, <test prop:: className>', () => {
    const wrapper = mount(<FloatingBubble className='testClassName' />);
    expect(wrapper.hasClass('testClassName')).toEqual(true);
  });
  it('component: FloatingBubble, <test prop:: style>', () => {
    const wrapper = mount(<FloatingBubble style={{ background: 'black' }} />);
    expect(wrapper.find('div').props().style.background).toEqual('black');
  });
  it('component: FloatingBubble, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<FloatingBubble clsPrefix={classPrefix} />);
    expect(wrapper.hasClass(`${classPrefix}-floating-bubble`)).toEqual(true);
  });
  it('component: FloatingBubble, <test prop:: children>', () => {
    const children = '分享'
    const component = <FloatingBubble >{children}</FloatingBubble>
    const { getByText } = render(component)
    expect(getByText(children)).toBeInTheDocument();
  })
  it('component: FloatingBubble, <test prop:: onClick>', async () => {
    const onClick = jest.fn()
    render(<FloatingBubble onClick={onClick} />)
    const btn = document.querySelectorAll(`.${classPrefix}-button`)[0]
    fireEvent.click(btn)
    waitFor(() => expect(onClick).toHaveBeenCalled())
  })

  it('component: FloatingBubble, <test prop:: axis>, <test prop:: magnetic>, <test prop:: defaultOffset>', async () => {
    render(<FloatingBubble axis='xy' magnetic='x' defaultOffset= {{ x: -30, y: -30 }}/>)
    mockBoundaryRect()
    const btn = document.querySelectorAll(`.${classPrefix}-button`)[0]
    expect(btn).toHaveStyle('transform: translate(-30px, -30px)')
    mockButtonRect()

    fireEvent.mouseDown(btn, {
      buttons: 1,
      clientX: 303,
    })
    fireEvent.mouseMove(btn, {
      buttons: 1,
      clientX: 100,
    })
    mockButtonRect({
      x: 100,
      left: 100,
      right: 148,
    })
    fireEvent.mouseUp(btn)

    await waitFor(() =>
      expect(btn).toHaveStyle('transform: translate(-130px, -30px)')
    )
  })

  it('component: FloatingBubble, <test prop:: offset>, <test prop:: onOffsetChange>', async () => {
    const App = () => {
      const [offset, setOffset] = useState({ x: -24, y: -24 })
      return (
        <FloatingBubble
          onOffsetChange={offset => {
            setOffset(offset)
          }}
          offset={offset}
          axis='xy'
        />
      )
    }
    render(<App />)
    const btn = document.querySelectorAll(`.${classPrefix}-button`)[0]
    expect(btn).toHaveStyle('transform: translate(-24px, -24px)')

    mockBoundaryRect()
    fireEvent.mouseDown(btn, {
      buttons: 1,
      clientX: -27,
      clientY: -27,
    })
    fireEvent.mouseMove(btn, {
      buttons: 1,
      clientX: 0,
      clientY: 0,
    })
    mockButtonRect({ x: 0, y: 0 })
    fireEvent.mouseUp(btn)
    await waitFor(() =>
      expect(btn).toHaveStyle('transform: translate(0px, 0px)')
    )
  })
})
