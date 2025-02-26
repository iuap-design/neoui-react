/** PickerView.tsx */

import React, { useState } from 'react'

import { PickerView } from '@tinper/m'
import { basicColumns } from '../demos/columns-data'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const classPrefix = `mui-picker-view`

describe('PickerView', () => {


  test('controlled mode <test prop:: value> <test prop:: onChange> <test prop:: columns>', async () => {
    const user = userEvent.setup()
    const App = () => {
      const [value, setValue] = useState<(string | number | null)[]>([
        'Mon',
        'am',
      ])
      return (
        <>
          <PickerView
            columns={basicColumns}
            value={value}
            onChange={val => {
              setValue(val)
            }}
          />
          <div data-testid='res'>{JSON.stringify(value)}</div>
        </>
      )
    }

    const { getByTestId } = render(<App />)
    const wheelEl = document.body.querySelectorAll(
      `.${classPrefix}-column-wheel`
    )[0]

    await user.pointer([
      { keys: '[TouchA>]', target: wheelEl },
      { pointerName: 'TouchA', target: wheelEl.lastChild as Element },
      { keys: '[/TouchA]' },
    ])

    await waitFor(
      () => expect(getByTestId('res')).toHaveTextContent(JSON.stringify(['Fri', 'am'])),

)
  })

  test('uncontrolled mode <test prop:: defaultValue>', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

   render(<PickerView
      columns={basicColumns}
      defaultValue={[
        'Mon',
        'am',
      ]}
     onChange={onChange}

    />)
    const wheelEl = document.body.querySelectorAll(
      `.${classPrefix}-column-wheel`
    )[0]

    await user.pointer([
      { keys: '[TouchA>]', target: wheelEl },
      { pointerName: 'TouchA', target: wheelEl.lastChild as Element },
      { keys: '[/TouchA]' },
    ])


  })

  test('loading <test prop:: loading> <test prop:: loadingContent>', async () => {
   render(<PickerView columns={basicColumns} loading loadingContent='loading...' />)

    expect(screen.getByText('loading...')).toBeInTheDocument()

  })

  test('<test prop:: fieldid>', () => {
    const { container } = render(<PickerView columns={basicColumns} fieldid='picker-view-fieldid' />)


    expect(container.firstElementChild).toHaveAttribute('fieldid', 'picker-view-fieldid')
  })

  test('<test prop:: clsPrefix>', () => {
    const { container } = render(<PickerView columns={basicColumns}  clsPrefix='picker-view-clsPrefix' />)

    expect(container.firstElementChild).toHaveClass(/picker-view-clsPrefix/i)
  })

})
