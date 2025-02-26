/** CascadePickerView.tsx */
import React, { useId } from 'react'
import { mount } from '@tests/mount'
import { CascadePickerView } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps'

const prefixPV = `${muiPrefix}-picker-view`;
const options = [
  {
    label: '广东',
    value: '广东',
    children: [
      {
        label: '广州',
        value: '广州',
      },
      {
        label: '深圳',
        value: '深圳',
        children: [
          {
            label: '南山区',
            value: '南山区',
            children: [
              {
                label: '科技园',
                value: '科技园',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: '山东',
    value: '山东',
    children: [
      {
        label: '济南',
        value: '济南',
      }
    ],
  }
]
describe('CascadePickerView test', () => {
  it('options test, <test prop:: options>', async () => {
    const wrapper = mount(<CascadePickerView options={options}/>);
    expect(wrapper.find(`.${prefixPV}-column`).at(0).find(`.${prefixPV}-column-item`).at(0).props()['aria-label']).toBe('广东');
    expect(wrapper.find(`.${prefixPV}-column`).at(0).find(`.${prefixPV}-column-item`).at(0).props()['data-selected']).toBe('true');
    expect(wrapper.find(`.${prefixPV}-column`).at(0).find(`.${prefixPV}-column-item`).at(1).props()['aria-label']).toBe('山东');
    expect(wrapper.find(`.${prefixPV}-column`).at(0).find(`.${prefixPV}-column-item`).at(1).props()['data-selected']).toBe('false');
    expect(wrapper.find(`.${prefixPV}-column`).at(1).find(`.${prefixPV}-column-item`).at(0).props()['aria-label']).toBe('广州');
    expect(wrapper.find(`.${prefixPV}-column`).at(1).find(`.${prefixPV}-column-item`).at(0).props()['data-selected']).toBe('true');
    expect(wrapper.find(`.${prefixPV}-column`).at(1).find(`.${prefixPV}-column-item`).at(1).props()['aria-label']).toBe('深圳');
    expect(wrapper.find(`.${prefixPV}-column`).at(1).find(`.${prefixPV}-column-item`).at(1).props()['data-selected']).toBe('false');

    wrapper.find(`.${prefixPV}-column`).at(1).find(`.${prefixPV}-column-accessible-button`).simulate('click');
    await sleep(1000);
    expect(wrapper.find(`.${prefixPV}-column`).at(1).find(`.${prefixPV}-column-item`).at(0).props()['aria-label']).toBe('广州');
    expect(wrapper.find(`.${prefixPV}-column`).at(1).find(`.${prefixPV}-column-item`).at(0).props()['data-selected']).toBe('false');
    expect(wrapper.find(`.${prefixPV}-column`).at(1).find(`.${prefixPV}-column-item`).at(1).props()['aria-label']).toBe('深圳');
    expect(wrapper.find(`.${prefixPV}-column`).at(1).find(`.${prefixPV}-column-item`).at(1).props()['data-selected']).toBe('true');
    expect(wrapper.find(`.${prefixPV}-column`).at(2).find(`.${prefixPV}-column-item`).at(0).props()['aria-label']).toBe('南山区');
    expect(wrapper.find(`.${prefixPV}-column`).at(3).find(`.${prefixPV}-column-item`).at(0).props()['aria-label']).toBe('科技园');
  })
})
