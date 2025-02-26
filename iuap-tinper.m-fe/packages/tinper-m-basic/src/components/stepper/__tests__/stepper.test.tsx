/** Stepper.tsx */

import { render, waitFor, screen } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { Stepper } from '@tinper/m'
import userEvent from '@testing-library/user-event'

describe('stepper', () => {
  test('control works <test prop:: value> <test prop:: onChange>', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()

    const Element = () => {
      const [value, setValue] = useState<number>(1)
      return (
        <Stepper
          value={value}
          onChange={v => {
            if (v === 3) {
              return
            }
            setValue(v)
            onChange(v)
          }}
        />
      )
    }
    render(<Element></Element>)
    const plusButton = document.querySelector('.mui-stepper-plus') as Element

    // plus
    await user.click(plusButton)
    expect(onChange).toHaveBeenLastCalledWith(2)

    // plus
    await user.click(plusButton)
    expect(onChange).toHaveBeenCalledTimes(1)

    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.type(input, '1000')
    expect(input.value).toBe('1000')
  })

  test('defaultValue works <test prop:: defaultValue>', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Stepper defaultValue={100} onChange={onChange} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('100')

    // Change to 200
    await user.type(input, '200')

    // Clean up
     await user.clear(input)
    expect(onChange).toHaveBeenLastCalledWith(100)
  })

  test('step works <test prop:: step>', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Stepper defaultValue={0} step={100} onChange={onChange} />)

    const minusButton = document.querySelector('.mui-stepper-minus') as Element
    const plusButton = document.querySelector('.mui-stepper-plus') as Element
    // minus
    await user.click(minusButton)
    expect(onChange.mock.calls[0][0]).toBe(-100)

    // plus
    await user.click(plusButton)
    expect(onChange.mock.calls[1][0]).toBe(0)
  })

  test('digits works <test prop:: digits>', () => {
    render(<Stepper value={0.1} digits={2} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('0.10')
  })

  test('min and max works <test prop:: min> <test prop:: max>', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()

    render(
      <Stepper
        max={0.2}
        onChange={onChange}
        min={0}
        defaultValue={0.1}
        digits={2}
        step={0.01}
      />
    )

    const minusButton = document.querySelector('.mui-stepper-minus') as Element
    const plusButton = document.querySelector('.mui-stepper-plus') as Element

    // max
    for (let i = 1; i <= 11; i++) {
      await user.click(plusButton)
      expect(onChange.mock.lastCall[0]).toBeLessThanOrEqual(0.2)
    }

    // min
    for (let i = 20; i >= -1; i--) {
      await user.click(minusButton)
      expect(onChange.mock.lastCall[0]).toBeGreaterThanOrEqual(0)
    }

    const input = screen.getByRole('textbox')
    await user.type(input, '1000')
    expect(onChange).toHaveBeenLastCalledWith(0.2)
  })

  test('allowEmpty works <test prop:: allowEmpty>', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    render(<Stepper defaultValue={100} allowEmpty onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.clear(input)

    expect(onChange).toHaveBeenLastCalledWith(null)
  })

  test('disabled works <test prop:: disabled>', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()

    render(<Stepper disabled onChange={onChange} />)

    const minusButton = document.querySelector('.mui-stepper-minus') as Element
    const plusButton = document.querySelector('.mui-stepper-plus') as Element


    await user.click(minusButton)
    await user.click(plusButton)
    const input = screen.getByRole('textbox')

     await user.type(input, '1000')
    expect(onChange).toHaveBeenCalledTimes(0)
  })

  test('inputReadOnly works <test prop:: inputReadOnly>', () => {
    const onChange = jest.fn()
    const { container } = render(<Stepper inputReadOnly onChange={onChange} />)
    expect(container.querySelector('input[readonly]')).not.toBeNull()
  })

  test('onFocus and onBlur works <test prop:: onBlur> <test prop:: onFocus>', async () => {
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    const user = userEvent.setup()
    render(<Stepper onBlur={onBlur} onFocus={onFocus} />)

    const input = screen.getByRole('textbox')

    await user.click(input)
    await user.click(document.body)

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onBlur).toHaveBeenCalledTimes(1)

    })
  })

  test('value as NaN works ', async () => {
    const user = userEvent.setup()
    render(<Stepper defaultValue={1000} />, {})

    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.type(input, '中文[Tab]')
    await waitFor(() => {
      expect(input.value).toBe('1000')

    })
  })

  test('dynamic digits works', async () => {
    const Demo = () => {
      const [digits, setDigits] = useState(2)

      useEffect(() => {
        setTimeout(() => {
          setDigits(0)
        })
      }, [])

      return <Stepper digits={digits} defaultValue={1.23}></Stepper>
    }
    render(<Demo />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('1.23')

    await waitFor(() => {
      expect(input.value).toBe('1')
    })
  })

  test('formatter & parser <test prop:: formatter>  <test prop:: parser>', async () => {
    const formatter = jest.fn((val?: number) => `$ ${val}`)
    const parser = jest.fn((text: string) => parseFloat(text))

    const user = userEvent.setup()

    const {container} = render(
      <Stepper formatter={formatter} parser={parser}/>
    )

    const inputEle = container.querySelector('input') as HTMLInputElement
    expect(inputEle.value).toEqual('$ 0')

    await user.click(inputEle)
    expect(inputEle.value).toEqual('0')

    // await user.type(inputEle, '93')
    // expect(inputEle.value).toEqual('093')

    // await user.click(document.body)
    // expect(inputEle.value).toEqual('$ 93')
  })

  test('stringMode <test prop:: stringMode>', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { container } = render(
      <Stepper
        stringMode
        defaultValue='0.000000000000002'
        step='0.000000000000001'
        onChange={onChange}
      />
    )

    // plus
    const plusButton = document.querySelector('.mui-stepper-plus') as Element
    await user.click(plusButton)

    expect(onChange).toHaveBeenCalledWith('0.000000000000003')
    expect(container.querySelector('input')!.value).toEqual('0.000000000000003')
  })

  test('<test prop:: fieldid>', () => {
    const { container } = render(<Stepper fieldid='stepper-fieldid' />)


    expect(container.firstElementChild).toHaveAttribute('fieldid', 'stepper-fieldid')
  })

  test('<test prop:: clsPrefix>', () => {
    const { container } = render(<Stepper clsPrefix='stepper-clsPrefix' />)

    expect(container.firstElementChild).toHaveClass(/stepper-clsPrefix/i)
  })
})
