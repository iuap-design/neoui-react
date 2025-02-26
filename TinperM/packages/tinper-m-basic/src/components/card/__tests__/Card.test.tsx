/** Card.tsx */
import React from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Card from '../src'

const classPrefix = `mui-card`
describe('Card Component', () => {
  it('component: Card, <test prop:: fieldid>', () => {
    const fieldid = 'Card_test'
    const component = <Card fieldid={fieldid} />
    const wrapper = render(component)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  })
  it('component: Card, <test prop:: className>', () => {
    const wrapper = mount(<Card className='testClassName' />);
    expect(wrapper.hasClass('testClassName')).toEqual(true);
  });
  it('component: Card, <test prop:: style>', () => {
    const wrapper = mount(<Card style={{ background: 'black' }} />);
    expect(wrapper.find('div').props().style.background).toEqual('black');
  });
  it('component: Card, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Card clsPrefix={classPrefix} />);
    expect(wrapper.hasClass(`${classPrefix}-card`)).toEqual(true);
  });
  it('component: Card, <test prop:: title>, <test prop:: children>, <test prop:: extra>', () => {
    const { getByText } = render(<Card title='title' extra='进行中'>Card</Card>)
    expect(getByText('title')).toHaveClass(`${classPrefix}-header-title`)
    expect(getByText('Card')).toHaveClass(`${classPrefix}-body`)
    expect(getByText('进行中')).toBeInTheDocument()
  })
  it('component: Card, <test prop:: headerClassName>, <test prop:: headerStyle>', () => {
    const component = <Card headerClassName='testHeaderClassName' title='title' headerStyle={{ background: 'red' }}/>
    const wrapper = render(component)
    const element = wrapper.container.querySelector(`[class="mui-card-header testHeaderClassName"]`);
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle('background: red')
  });
  it('component: Card, <test prop:: bodyClassName>, <test prop:: bodyStyle>', () => {
    const component = <Card bodyClassName='testBodyClassName' title='title' bodyStyle={{ background: 'blue' }}>Body</Card>
    const wrapper = render(component)
    const element = wrapper.container.querySelector(`[class="mui-card-body testBodyClassName"]`);
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle('background: blue')
  });
})


describe('Card Event', () => {
  const card = (onClick, onHeaderClick, onBodyClick) => {
    return (
      <Card
        title={
          <div style={{ fontWeight: 'normal' }}>
            卡片标题
          </div>
        }
        extra='进行中'
        onClick={onClick}
        onBodyClick={onBodyClick}
        onHeaderClick={onHeaderClick}
      >
        Card
      </Card>
    )
  }
  it('renders with event, <test prop:: onClick>', async () => {
    const onClick = jest.fn()
    const { getByText } = render(card(onClick, undefined, undefined))
    fireEvent.click(getByText('进行中'))
    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
  it('renders with event, <test prop:: onBodyClick>, <test prop:: onHeaderClick>', async () => {
    const onBodyClick = jest.fn()
    const onHeaderClick = jest.fn()

    const { getByText } = render(card(undefined, onHeaderClick, onBodyClick))
    fireEvent.click(getByText('卡片标题'))
    await waitFor(() => {
      expect(onHeaderClick).toHaveBeenCalledTimes(1)
    })
    fireEvent.click(getByText('Card'))
    await waitFor(() => {
      expect(onBodyClick).toHaveBeenCalledTimes(1)
    })
  })
})



