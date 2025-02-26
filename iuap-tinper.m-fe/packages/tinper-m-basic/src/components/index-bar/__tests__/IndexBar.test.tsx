/** IndexBar.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { render, fireEvent } from '@testing-library/react'
import { IndexBar, List } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixIndexBar = `${muiPrefix}-index-bar`;
const charCodeOfA = 'A'.charCodeAt(0)
const groups = Array(26)
  .fill('')
  .map((_, i) => ({
    title: String.fromCharCode(charCodeOfA + i),
    items: Array(3).fill(`item ${String.fromCharCode(charCodeOfA + i)}`),
  }))

function mockPxTester(px: number) {
  const tester = document.querySelectorAll('.mui-px-tester')

  tester.forEach(
    item =>
    (item.getBoundingClientRect = jest.fn(
      () =>
      ({
        height: px,
      } as DOMRect)
    ))
  )
}

describe('IndexBar Component', () => {
  let wrapper;
  it('describe', () => {
    wrapper = mount(<IndexBar />)
    expect(wrapper.exists(`.${prefixIndexBar}`)).toEqual(true)
  });
  it('component: IndexBar, <test prop:: fieldid>', () => {
    const fieldid = 'IndexBar_test'
    const { container } = render(<IndexBar fieldid={fieldid} />)
    const element = container.querySelector(`[fieldid="${fieldid}_index_bar"]`);
    expect(element).toBeInTheDocument();
  });
  it('component: IndexBar, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<IndexBar clsPrefix={classPrefix} />);
    expect(wrapper.find('div').hasClass(`${classPrefix}-index-bar`)).toEqual(true);
  });
  it('component: IndexBar, <test prop:: className>', () => {
    const className = 'testClassName'
    const wrapper = mount(<IndexBar className={className} />);
    expect(wrapper.find('div').hasClass(`${className}`)).toEqual(true);
  });
  it('component: IndexBar, <test prop:: style>', () => {
    const fieldid = 'IndexBar_test'
    const { container } = render(<IndexBar style={{ background: 'red' }} fieldid={fieldid} />)
    const element = container.querySelector(`[fieldid="${fieldid}_index_bar"]`);
    expect(element).toHaveStyle('background: red');
  });
  it('component: IndexBar, <test prop:: sticky>', async () => {
    const { getByTestId } = render(
      <IndexBar sticky={false} data-testid='indexbar'>
        <IndexBar.Panel index='A' key='A'>
          A
        </IndexBar.Panel>
        <IndexBar.Panel index='B' key='B'>
          B
        </IndexBar.Panel>
      </IndexBar>
    )

    expect(getByTestId('indexbar')).not.toHaveClass(`${prefixIndexBar}-sticky`)
  });
  it('component: IndexBar, <test prop:: children>', () => {
    const children = 'IndexBart_test_children'
    const { getByText } = render(
      <IndexBar sticky={false} data-testid='indexbar'>
        <IndexBar.Panel index='A' key='A'>
          {children}
        </IndexBar.Panel>
      </IndexBar>
    )
    expect(getByText(children)).toBeInTheDocument();
  });
  it('component: IndexBar, <test prop:: onIndexChange>', () => {
    const onChange = jest.fn()
    const App = () => (
      <IndexBar onIndexChange={onChange}>
        {groups.map(group => {
          const { title, items } = group
          return (
            <IndexBar.Panel
              index={title}
              title={`标题${title}`}
              key={`标题${title}`}
            >
              <List>
                {items.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </IndexBar.Panel>
          )
        })}
      </IndexBar>
    )
    mockPxTester(35)
    const { getByText } = render(<App />)

    const bodyEl = document.querySelectorAll(`.${prefixIndexBar}-body`)[0]
    const elements = document.querySelectorAll(`.${prefixIndexBar}-anchor`)

    // mock
    Object.defineProperty(bodyEl, 'scrollTop', {
      value: 400,
    })

    elements.forEach((panel, i) =>
      Object.defineProperties(panel, {
        clientHeight: {
          value: 188,
        },
        offsetTop: {
          value: i * 188,
        },
      })
    )

    fireEvent.scroll(bodyEl)

    expect(getByText('C').parentElement).toHaveClass(
      `${prefixIndexBar}-sidebar-item-active`
    )
    expect(onChange).toHaveBeenCalledWith('C')
  });
});
