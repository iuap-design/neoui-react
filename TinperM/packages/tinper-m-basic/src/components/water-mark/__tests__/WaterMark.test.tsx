/** WaterMark.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import WaterMark from '../src'
import demoImage from '../../../assets/blankPage.png'

const classPrefix = `mui-water-mark`

const mockSrcSet = jest.spyOn(Image.prototype, 'src', 'set')

describe('WaterMark component', () => {
  beforeAll(() => {
    mockSrcSet.mockImplementation(function (this: typeof Image.prototype) {
      if (this.onload) {
        this.onload()
      }
    })
  })

  afterAll(() => {
    mockSrcSet.mockRestore()
  })
  it('component: WaterMark, <test prop:: fieldid>', () => {
    const fieldid = 'Result_test'
    const { container } = render(<WaterMark fieldid={fieldid} content='TinperM'/>)
    const element = container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  });
  it('component: WaterMark, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<WaterMark clsPrefix={classPrefix} />);
    expect(wrapper.find('div').hasClass(`${classPrefix}-water-mark`)).toEqual(true);
  });
  it('component: WaterMark, <test prop:: content>', () => {
    const { container } = render(<WaterMark content='TinperM' />)
    expect(container).toMatchSnapshot()
  })

  it('component: WaterMark, <test prop:: gapX>, <test prop:: gapY>, <test prop:: width>, <test prop:: height>, <test prop:: rotate>, <test prop:: fontColor>, <test prop:: fontStyle>, <test prop:: fontFamily>, <test prop:: fontWeight>, <test prop:: fontSize>', () => {
    const props = {
      gapX : 24,
      gapY : 48,
      width : 120,
      height : 64,
      rotate : -22,
      fontStyle : 'normal',
      fontWeight : 'normal',
      fontColor : 'rgba(0,0,0,.15)',
      fontSize : 14,
      fontFamily : 'sans-serif'
    }
    const { container } = render(
      <WaterMark content='TinperM' {...props} />
    )
    expect(container).toMatchSnapshot()
  })

  test('component: WaterMark, <test prop:: image>, <test prop:: imageWidth>, <test prop:: imageHeight>', () => {
    const { container } = render(<WaterMark image={demoImage} imageWidth={120} imageHeight={64}/>)
    expect(container).toMatchSnapshot()
  })

  it('component: WaterMark, <test prop:: fullPage>', () => {
    const { getByTestId } = render(
      <WaterMark fullPage={false} data-testid='mask' />
    )
    expect(getByTestId('mask')).not.toHaveClass(`${classPrefix}-full-page`)
  })

  it('component: WaterMark, <test prop:: zIndex>', () => {
    const { getByTestId } = render(
      <WaterMark zIndex={10} data-testid='mask' />
    )
    expect(getByTestId('mask')).toHaveStyle('z-index: 10')
  })

  // test('mount should not set base64Url', () => {
  //   let exceeded = false

  //   const Demo = () => {
  //     const divRef = React.useRef<HTMLDivElement>(null)

  //     React.useLayoutEffect(() => {
  //       exceeded = true

  //       const { style } = divRef.current?.querySelector(
  //         '.adm-water-mark'
  //       ) as HTMLElement

  //       expect(style.backgroundImage).toBeFalsy()
  //     }, [])

  //     return (
  //       <div ref={divRef}>
  //         <WaterMark content='Ant Design Mobile' />
  //       </div>
  //     )
  //   }

  //   render(<Demo />)

  //   expect(exceeded).toBeTruthy()
  // })

  // test('throw error when Canvas is not supported', () => {
  //   const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  //   const mockCanvasContext = jest.spyOn(
  //     HTMLCanvasElement.prototype,
  //     'getContext'
  //   )
  //   mockCanvasContext.mockReturnValue(null)
  //   expect(() => render(<WaterMark />)).toThrow(
  //     'Canvas is not supported in the current environment'
  //   )
  //   mockCanvasContext.mockRestore()
  //   errorSpy.mockRestore()
  // })
})
