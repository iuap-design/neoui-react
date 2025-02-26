/** Dropdown.tsx */

import React, { useState } from 'react'
import { Dropdown } from '@tinper/m'
import {render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ArrowDownSFill from '@tinper/m-icons/lib/cjs/ArrowDownSFill'

const classPrefix = `mui-dropdown`

describe('Dropdown', () => {
  test('basic usage', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown data-testid='dropdown'>
        <Dropdown.Item title='sorter' key='sorter' data-testid='item'>
          content
        </Dropdown.Item>
      </Dropdown>
    )

    await user.click(screen.getByText('sorter'))
    const content = screen.getByText('content')
    expect(content).toBeInTheDocument()
    expect(screen.getByTestId('dropdown')).toHaveClass(`${classPrefix}-open`)
    expect(screen.getByTestId('item')).toHaveClass(
      `${classPrefix}-item-active ${classPrefix}-item-highlight`
    )

    await user.click(document.body)
    waitFor(() => expect(content).not.toBeVisible())
  })

  test('multi item <test prop:: onChange>', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

    render(
      <Dropdown data-testid='dropdown' onChange={onChange}>
        <Dropdown.Item title='item1' key='item1' data-testid='item1'>
          content1
        </Dropdown.Item>
        <Dropdown.Item title='item2' key='item2' data-testid='item2'>
          content2
        </Dropdown.Item>
      </Dropdown>
    )

    await user.click(screen.getByText('item1'))
    expect(screen.getByText('content1')).toBeVisible()
    expect(onChange).toHaveBeenCalledWith('item1')
    expect(screen.getByTestId('item1')).toHaveClass(
      `${classPrefix}-item-active ${classPrefix}-item-highlight`
    )
    await user.click(screen.getByText('item2'))
    expect(onChange).toHaveBeenCalledWith('item2')
    expect(screen.getByText('content2')).toBeVisible()
    expect(screen.getByTestId('item2')).toHaveClass(
      `${classPrefix}-item-active ${classPrefix}-item-highlight`
    )
  })

  test('non-control mode <test prop:: defaultActiveKey>', async () => {
    const user = userEvent.setup()

    render(
      <Dropdown data-testid='dropdown' defaultActiveKey="item2">
        <Dropdown.Item title='item1' key='item1' data-testid='item1'>
          content1
        </Dropdown.Item>
        <Dropdown.Item title='item2' key='item2' data-testid='item2'>
          content2
        </Dropdown.Item>
      </Dropdown>
    )

    expect(screen.getByText('content2')).toBeInTheDocument()

    await user.click(await screen.findByRole('button', {name: /背景蒙层/i, hidden: true}))

    expect(screen.getByText('content2')).toHaveClass(/hidden/i)

  })

  test('control mode <test prop:: activeKey>', async () => {
    const user = userEvent.setup()

    render(
      <Dropdown data-testid='dropdown' activeKey="item2">
        <Dropdown.Item title='item1' key='item1' data-testid='item1'>
          content1
        </Dropdown.Item>
        <Dropdown.Item title='item2' key='item2' data-testid='item2'>
          content2
        </Dropdown.Item>
      </Dropdown>
    )

    expect(screen.getByText('content2')).toBeInTheDocument()

    await user.click(await screen.findByRole('button', {name: /背景蒙层/i, hidden: true}))

    expect(screen.getByText('content2')).not.toHaveClass(/hidden/i)

  })

  test('renders with invalid react element', () => {
    render(<Dropdown>{1}</Dropdown>)
    expect(screen.getByText(1)).toBeInTheDocument()
  })

  test('rendered to the current node <test prop:: getContainer>', async () => {
    const user = userEvent.setup()

    const { getByText, container } = render(
      <Dropdown getContainer={null}>
        <Dropdown.Item key='bizop' title='Item'>
          <div style={{ padding: 12 }}>内容</div>
        </Dropdown.Item>
      </Dropdown>
    )

    await user.click(getByText('Item'))

    expect(
      within(container).getByRole('tooltip')
    ).toBeInTheDocument()
  })

  test('forceRender should be work <test prop:: forceRender>', () => {
    render(
      <Dropdown data-testid='dropdown'>
        <Dropdown.Item title='sorter' key='sorter' forceRender>
          content
        </Dropdown.Item>
      </Dropdown>
    )
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  test('trigger the click of Dropdown.Item ', async () => {
    const user = userEvent.setup()

    const ClickTest = () => {
      const [count, setCount] = useState(0)
      return (
        <Dropdown>
          <Dropdown.Item
            onClick={() => setCount(count + 1)}
            title='sorter'
            key='sorter'
          >
            click{count}
          </Dropdown.Item>
        </Dropdown>
      )
    }

    render(<ClickTest/>)

    await user.click(screen.getByText('sorter'))
    expect(screen.getByText('click1'))
    await user.click(screen.getByText('sorter'))
    expect(screen.getByText('click2'))
  })

  test('closeOnMaskClick should be work <test prop:: closeOnMaskClick>', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown data-testid='dropdown' closeOnMaskClick={false}>
        <Dropdown.Item title='sorter' key='sorter' data-testid='item'>
          content
        </Dropdown.Item>
      </Dropdown>
    )

    await user.click(screen.getByText('sorter'))
    await user.click(await screen.findByRole('button', {  name: /背景蒙层/i,  hidden: true}))

    expect(screen.getByText('content')).not.toHaveClass(/hidden/i)

  })

  test('closeOnClickAway should be work <test prop:: closeOnClickAway>', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown data-testid='dropdown' closeOnClickAway>
        <Dropdown.Item title='sorter' key='sorter' data-testid='item'>
          content
        </Dropdown.Item>
      </Dropdown>
    )

    await user.click(screen.getByText('sorter'))
    await user.click(document.body)

    expect(screen.getByText('content')).toHaveClass(/hidden/i)
  })

  test('position bottom <test prop:: position>', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown data-testid='dropdown' position='bottom'>
        <Dropdown.Item title='sorter' key='sorter' data-testid='item'>
          content
        </Dropdown.Item>
      </Dropdown>
    )

    await user.click(screen.getByText('sorter'))

    expect(document.querySelector('.mui-popup-body')).toHaveClass(/position-bottom/i)


  })

  test('label style and custom arrow <test prop:: label> <test prop:: arrow> ', () => {
    const {container} = render(
      <Dropdown data-testid='dropdown' label arrow={<ArrowDownSFill />}>
        <Dropdown.Item title='sorter' key='sorter' data-testid='item'>
          content
        </Dropdown.Item>
      </Dropdown>
    );

    expect(container).toMatchSnapshot()

  })

  test('<test prop:: fieldid>', () => {
    const {container} = render(
      <Dropdown fieldid="dropdown-fieldid" data-testid='dropdown' label arrow={<ArrowDownSFill />}>
        <Dropdown.Item title='sorter' key='sorter' data-testid='item'>
          content
        </Dropdown.Item>
      </Dropdown>
    );

    expect(container.firstElementChild).toHaveAttribute('fieldid', 'dropdown-fieldid')
  })

  test('<test prop:: clsPrefix>', () => {
    const {container} = render(
      <Dropdown clsPrefix="dropdown-clsPrefix" data-testid='dropdown' label arrow={<ArrowDownSFill />}>
        <Dropdown.Item title='sorter' key='sorter' data-testid='item'>
          content
        </Dropdown.Item>
      </Dropdown>
    );

    expect(container.firstElementChild).toHaveClass(/dropdown-clsPrefix/i)
  })
})
