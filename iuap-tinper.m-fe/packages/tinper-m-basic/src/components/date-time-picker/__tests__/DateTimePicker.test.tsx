/** DateTimePicker.tsx */
import React from 'react';
import type { DateTimePickerProps } from '@components/date-time-picker/src/iDateTimePicker';
import { render, screen, waitFor } from '@testing-library/react';
import { DateTimePicker } from '@/index';
import userEvent from '@testing-library/user-event';
import { range } from 'lodash';
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'
const prefixDateTimePicker = `${muiPrefix}-date-time-picker`;

describe('DateTimePicker Component', () => {
  const dateString = '2023-12-13'
  const dateArr = dateString.split('-')
  const renderDateTimePicker = (props: Partial<DateTimePickerProps> = {}) => {
    const onOk = jest.fn()
    const onDismiss = jest.fn()
    const fieldid = 'datetime-picker-fieldid'
    const { container } = render(<DateTimePicker fieldid={fieldid} onOk={onOk} onDismiss={onDismiss}  {...props} />)
    return {
      container,
      user: userEvent.setup(),
      trigger: screen.getByRole('textbox'),
      getConfirmBtn: () => screen.getByRole('button', { name: /确定/, hidden: true }),
      getCancelBtn: () => screen.getByRole('button', { name: /取消/, hidden: true }),
      onOk,
      onDismiss,
      fieldid
    }
  }
  it('should render defaultValue, <test prop:: defaultValue>', () => {
    const { trigger } = renderDateTimePicker({ defaultValue: dateString })
    expect(trigger).toHaveValue(dateString)
  });
  it('should select defaultValue when trigger', async () => {
    const { user, trigger } = renderDateTimePicker({ defaultValue: dateString })
    await user.click(trigger)
    await waitFor(
      () => {
        const cells = screen.getAllByRole('gridcell', { selected: true })
        dateArr.forEach((item, i) => {
          expect(cells[i]).toHaveTextContent(new RegExp(item))
        })
      },
    )
  });
  it('should render value, <test prop:: value>', () => {
    const { trigger } = renderDateTimePicker({ value: dateString })
    expect(trigger).toHaveValue(dateString)
  });
  it('should select value when trigger', async () => {
    const { user, trigger } = renderDateTimePicker({ value: dateString })
    await user.click(trigger)
    await waitFor(
      () => {
        const cells = screen.getAllByRole('gridcell', { selected: true, hidden: true })
        dateArr.forEach((item, i) => {
          expect(cells[i]).toHaveTextContent(new RegExp(item))
        })
      },
    )
  });
  it('should render popTitle, <test prop:: popTitle>', async () => {
    const popTitle = 'popTitle'
    const { user, trigger } = renderDateTimePicker({ popTitle })
    await user.click(trigger)
    expect(screen.getByText(popTitle)).toBeInTheDocument()
  });
  it('should render placeholder, <test prop:: placeholder>', async () => {
    const placeholder = 'placeholder'
    const { user, trigger } = renderDateTimePicker({ placeholder })
    await user.click(trigger)
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  });
  it.each([
    { minDate: '2024-3-1', maxDate: '2024-3-1', expectedResult: [2024, 3, [1]] as const },
    { minDate: '2024-3-1', maxDate: '2024-3-15', expectedResult: [2024, 3, range(1, 16)] as const },
  ])('it should render expectedResult when minDate = $minDate, maxDate = $maxDate, <test prop:: minDate> <test prop:: maxDate>', async ({
    minDate,
    maxDate,
    expectedResult
  }) => {
    const { user, trigger } = renderDateTimePicker({ minDate, maxDate })
    await user.click(trigger)
    const cells = screen.getAllByRole('gridcell', { hidden: true })
    const [expectedYear, expectedMonth, expectedDays] = expectedResult
    const expectedLength = expectedResult.flat().length

    expect(cells).toHaveLength(expectedLength)
    expect(screen.getByRole('gridcell', { name: `${expectedYear}年`, hidden: true })).toBeInTheDocument()
    expect(screen.getByRole('gridcell', { name: `${expectedMonth}月`, hidden: true })).toBeInTheDocument();
    expectedDays.forEach(day => {
      expect(screen.getByRole('gridcell', { name: `${day}日`, hidden: true })).toBeInTheDocument()
    })
  });
  it.each([
    { mode: 'year', labels: ['年'] },
    { mode: 'month', labels: ['年', '月'] },
    { mode: 'day', labels: ['年', '月', '日'] },
    { mode: 'hour', labels: ['年', '月', '日', '时'] },
    { mode: 'minute', labels: ['年', '月', '日', '时', '分'] },
    { mode: 'second', labels: ['年', '月', '日', '时', '分', '秒'] },
    // { mode: 'time', labels:  }
  ])('it should render $labels when mode = $mode, <test prop:: mode>', async ({ mode, labels }) => {
    const { user, trigger } = renderDateTimePicker({ mode, minDate: dateString, maxDate: dateString })
    await user.click(trigger)
    await waitFor(
      () => {
        const cells = screen.getAllByRole('gridcell', { hidden: true })
        expect(cells).toHaveLength(labels.length);
        labels.forEach((label, i) => {
          expect(cells[i]).toHaveTextContent(label)
        })
      },
    )
  });
  it('should not popup  when disabled, <test prop:: disabled>', async () => {
    const { container, user, trigger } = renderDateTimePicker({ disabled: true })
    await user.click(trigger)
    expect(screen.queryAllByRole('gridcell')).toEqual([])
  });
  it('should contain mui clsPrefix default, <test prop:: clsPrefix>', async () => {
    const { user, trigger, container } = renderDateTimePicker({ value: dateString })
    await user.click(trigger)
    expect(container.firstChild).toHaveClass(/^mui/)
  });
  it('should contain provided clsPrefix', async () => {
    const { user, trigger, container } = renderDateTimePicker({ value: dateString, clsPrefix: 'test' })
    await user.click(trigger)
    expect(container.firstChild).toHaveClass(/^test/)
  });
  it('should contain fieldid, <test prop:: fieldid>', async () => {
    const { user, trigger, container, fieldid } = renderDateTimePicker({ value: dateString, clsPrefix: 'test' })
    await user.click(trigger)
    expect(screen.getByRole('button', { name: /确定/, hidden: true })).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
    expect(screen.getByRole('button', { name: /取消/, hidden: true })).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
  });
  it('should show 上午/下午 when precision is hour at least, <test prop:: use12Hours>', async () => {
    const { user, trigger } = renderDateTimePicker({ mode: 'minute', use12Hours: true })
    await user.click(trigger)
    expect(screen.getByText('上午')).toBeInTheDocument()
    expect(screen.getByText('下午')).toBeInTheDocument()
  });
  it('should not show 上午/下午 when precision is less than hour', () => {
    renderDateTimePicker({ mode: 'day', use12Hours: true })
    expect(screen.queryByText('上午')).not.toBeInTheDocument()
    expect(screen.queryByText('下午')).not.toBeInTheDocument()
  });
  it("readOnly test, <test prop:: readOnly>", () => {
    const wrapper = mount(<DateTimePicker readOnly></DateTimePicker>);
    wrapper.find(`.${prefixDateTimePicker}`).simulate('click');
    expect(document.getElementsByClassName('mui-picker')[0]).toBeFalsy();
  });
  it("onDismiss && onOk && onClearReturn test, <test prop:: onDismiss>, <test prop:: onOk>, <test prop:: onClearReturn>", () => {
    const onDismiss = jest.fn();
    const onOk = jest.fn();
    const onClearReturn = jest.fn();
    const wrapper1 = mount(<DateTimePicker onDismiss={onDismiss} value='2022-09-09' onOk={onOk} onClearReturn={onClearReturn}></DateTimePicker>);
    expect(onDismiss).toHaveBeenCalledTimes(0);
    expect(onOk).toHaveBeenCalledTimes(0);
    expect(onClearReturn).toHaveBeenCalledTimes(0);
    wrapper1.find(`.${prefixDateTimePicker}`).at(1).simulate('click');
    document.getElementsByClassName('mui-picker-footer-buttons')[0].getElementsByClassName('mui-button-primary')[0].click();
    expect(onDismiss).toHaveBeenCalledTimes(0);
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onClearReturn).toHaveBeenCalledTimes(0);
    wrapper1.find(`.${prefixDateTimePicker}`).at(1).simulate('click');
    document.getElementsByClassName('mui-picker-footer-buttons')[0].getElementsByClassName('mui-button-default')[0].click();
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onClearReturn).toHaveBeenCalledTimes(0);
    document.getElementsByClassName('clear-return-button')[0].click();
    expect(onClearReturn).toHaveBeenCalledTimes(1);
  });
  it("format test, <test prop:: format>", () => {
    const wrapper = mount(<DateTimePicker value='2022-09-09' format={val => val + "111"}></DateTimePicker>);
    expect(wrapper.find('input').props().value.slice(-3)).toEqual('111')
  });
  it("minuteStep test, <test prop:: minuteStep>", () => {
    const wrapper = mount(<DateTimePicker minuteStep={30} mode="minute"></DateTimePicker>);
    // todo有两个mui-date-time-picker?
    wrapper.find(`.${prefixDateTimePicker}`).at(1).simulate('click')
    expect(document.getElementsByClassName('mui-picker-view-column')[4].getElementsByClassName('mui-picker-view-column-item-label')[0].innerHTML).toEqual('0分');
    expect(document.getElementsByClassName('mui-picker-view-column')[4].getElementsByClassName('mui-picker-view-column-item-label')[1].innerHTML).toEqual('30分');
  });
});
