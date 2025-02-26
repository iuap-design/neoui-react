/** Skeleton.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Skeleton from '../src'

describe('Skeleton Component', () => {
  it('component: Skeleton, <test prop:: fieldid>', () => {
    const fieldid = 'Skeleton_test'
    const { container } = render(<Skeleton fieldid={fieldid} />)
    const element = container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  });
  it('component: Skeleton, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Skeleton clsPrefix={classPrefix} />);
    expect(wrapper.find('div').hasClass(`${classPrefix}-skeleton`)).toEqual(true);
  });
  it('component: Skeleton, <test prop:: className>', () => {
    const className = 'testClassName'
    const wrapper = mount(<Skeleton className={className} />);
    expect(wrapper.find('div').hasClass(`${className}`)).toEqual(true);
  });
  it('component: Skeleton, <test prop:: style>', () => {
    const fieldid = 'Skeleton_test'
    const { container } = render(<Skeleton style={{ background: 'red' }} fieldid={fieldid} />)
    const element = container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toHaveStyle('background: red');
  });
  it('component: Skeleton, <test prop:: animated>', () => {
    const wrapper = mount(<Skeleton animated />);
    expect(wrapper.find('div').hasClass('mui-skeleton-animated')).toEqual(true);
  });
  it('component: Skeleton, <test prop:: lineCount>', () => {
    const fieldid = 'Skeleton_test'
    const count = 5
    const { container } = render(<Skeleton.Paragraph lineCount={5} fieldid={fieldid} />)
    const element = container.querySelector(`[fieldid="${fieldid}_paragraph_line_${count}"]`);
    expect(element).toBeInTheDocument();
  });
})

