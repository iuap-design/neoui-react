/** Grid.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Grid from '../src'

const classPrefix = `mui-grid`

describe('Grid Component', () => {
  const App = (props: any) => {
    return (
      <Grid columns={3} gap={8} {...props}>
        <Grid.Item fieldid={`${props.fieldid}_A`}>ChildrenA</Grid.Item>
        <Grid.Item fieldid={`${props.fieldid}_B`}>ChildrenB</Grid.Item>
        <Grid.Item fieldid={`${props.fieldid}_C`}>ChildrenC</Grid.Item>
      </Grid>
    )
  }
  it('component: Grid, <test prop:: fieldid>, <test prop:: children>', () => {
    const fieldid = 'Grid_test'
    const { container, getByText } = render(App({ fieldid }))
    const element = container.querySelector(`[fieldid="${fieldid}_grid"]`);
    expect(element).toBeInTheDocument();
    const children = getByText('ChildrenA');
    expect(children).toBeInTheDocument();
  });
  it('component: Grid, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(App({ clsPrefix: classPrefix }));
    expect(wrapper.find('div').hasClass(`${classPrefix}-grid`)).toEqual(true);
  });
  it('component: Grid, <test prop:: className>', () => {
    const className = 'testClassName'
    const wrapper = mount(App({ className: className }));
    expect(wrapper.find('div').hasClass(`${className}`)).toEqual(true);
  });
  it('component: Grid, <test prop:: style>', () => {
    const fieldid = 'Grid_test'
    const { container } = render(App({ style: { background: 'red' }, fieldid }))
    const element = container.querySelector(`[fieldid="${fieldid}_grid"]`);
    expect(element).toHaveStyle('background: red');
  });
  it('component: Grid, <test prop:: columns>', () => {
    const fieldid = 'Grid_test'
    const columns = 4
    render(App({ columns, fieldid }))
    expect(document.querySelector(`.${classPrefix}`)).toHaveStyle(
      '--columns:4; --gap:8px;'
    )
  });
  it('component: Grid, <test prop:: gap>', () => {
    const fieldid = 'Grid_test'
    const gap = [5, 10]
    render(App({ fieldid, gap }))
    expect(document.querySelector(`.${classPrefix}`)).toHaveStyle(
      '--gap-horizontal:5px; --gap-vertical: 10px;'
    )
  });
})
