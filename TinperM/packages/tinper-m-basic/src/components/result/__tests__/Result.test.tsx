/** Result.tsx */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Result from '../src'
import Bell from '@tinper/m-icons/lib/cjs/Bell'

describe('Result Component', () => {
  it('component: Result, <test prop:: fieldid>', () => {
    const fieldid = 'Result_test'
    const { container } = render(<Result fieldid={fieldid} title='Title' description='desc'/>)
    const element = container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();
  });
  it('component: Result, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<Result clsPrefix={classPrefix} />);
    expect(wrapper.find('div').hasClass(`${classPrefix}-result`)).toEqual(true);
  });
  it('component: Result, <test prop:: className>', () => {
    const className = 'testClassName'
    const wrapper = mount(<Result className={className} />);
    expect(wrapper.find('div').hasClass(`${className}`)).toEqual(true);
  });
  it('component: Result, <test prop:: style>', () => {
    const fieldid = 'Result_test'
    const { container } = render(<Result style={{ background: 'red' }} fieldid={fieldid} />)
    const element = container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toHaveStyle('background: red');
  });
  ['success' , 'error' , 'info' , 'waiting' , 'warning'].forEach(item => {
    it('component: Result, <test prop:: status>', () => {
      const wrapper = mount(<Result status={item}/>);
      expect(wrapper.find('div').hasClass(`mui-result-${item}`)).toEqual(true);
    })
  });
  it('component: Result, <test prop:: title>, <test prop:: description>', () => {
    const { getByText } = render(<Result title='Title' description='desc'/>)
    const elementTitle = getByText('Title');
    expect(elementTitle).toBeInTheDocument();
    const elementDesc = getByText('desc');
    expect(elementDesc).toBeInTheDocument();
  });
  it('component: Result, <test prop:: icon>', () => {
    mount(<Result icon={<Bell />} />);
    expect(document.querySelector(`[id="arcbell"]`)).toBeInTheDocument();
  });
})
