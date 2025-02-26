/** TimeRangePicker.tsx */
import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { TimeRangePicker } from '@/index';
import userEvent from '@testing-library/user-event';
import { range } from 'lodash';
import { TimeRangePickerProps } from '@components/time-range-picker/src/iTimeRangePicker';
import { DatePrecision } from '@components/date-picker/src/DatePickerDateUtils';
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'
const prefixTimeRangePicker = `${muiPrefix}-time-range-picker`;

describe('DateTimePicker Component', () => {
  const startDate = '2024-01-12'
  const endDate = '2024-06-17'
  const dateString = [startDate, endDate]
  const renderTimeRangePicker = (props: Partial<TimeRangePickerProps> = {}) => {
    const onOk = jest.fn()
    const onDismiss = jest.fn()
    const onClearReturn = jest.fn()
    const fieldid = 'time-range-picker-fieldid'
    const { container } = render(<TimeRangePicker fieldid={fieldid} onOk={onOk} onDismiss={onDismiss} onClearReturn={onClearReturn}  {...props} />)
    const user = userEvent.setup()
    const selectPrecision =
      (precision: DatePrecision) =>
        async (item: number) => {
          const selected = await within(screen.getByRole('listbox', { name: new RegExp(precision, 'i') })).findByRole('gridcell', { name: new RegExp(item.toString(), 'i') })
          await user.dblClick(selected)
        }
    return {
      container,
      user,
      trigger: screen.getByRole('textbox'),
      confirm: () => user.click(screen.getByRole('button', { name: /确定/ })),
      cancel: () => user.click(screen.getByRole('button', { name: /取消/ })),
      clearReturn: () => user.click(screen.getByRole('button', { name: /清空/ })),
      selectYear: selectPrecision('year'),
      selectMonth: selectPrecision('month'),
      selectDay: selectPrecision('day'),
      getStart: () => screen.getByPlaceholderText('开始', { exact: false }),
      getEnd: () => screen.getByPlaceholderText('结束', { exact: false }),
      onOk,
      onDismiss,
      onClearReturn,
      fieldid
    }
  }
  it('should render  defaultValue, <test prop:: defaultValue>', () => {
    renderTimeRangePicker({ defaultValue: dateString })
    expect(screen.getByText(startDate)).toBeInTheDocument()
    expect(screen.getByText(endDate)).toBeInTheDocument()
  });
  it('should render value, <test prop:: value>', () => {
    renderTimeRangePicker({ value: dateString });
    expect(screen.getByText(startDate)).toBeInTheDocument()
    expect(screen.getByText(endDate)).toBeInTheDocument()
  });
  it('should render popTitle, <test prop:: popTitle>', async () => {
    const popTitle = 'popTitle'
    const { user, trigger } = renderTimeRangePicker({ popTitle })
    await user.click(trigger)
    expect(screen.getByText(popTitle)).toBeInTheDocument()
  });
  it('should render placeholder, <test prop:: placeholder>', async () => {
    const placeholder = 'placeholder1-placeholder2'
    const { user, trigger } = renderTimeRangePicker({ placeholder })
    await user.click(trigger)
    expect(screen.getByText('placeholder1')).toBeInTheDocument()
    expect(screen.getByText('placeholder2')).toBeInTheDocument()
  });
  describe('<test prop:: minDate> <test prop:: maxDate>', () => {
    it.each([
      { minDate: '2024-3-1', maxDate: '2024-3-1', expectedResult: [2024, 3, [1]] as const },
      { minDate: '2024-3-1', maxDate: '2024-3-15', expectedResult: [2024, 3, range(1, 16)] as const },
    ])('it should render expectedResult when minDate = $minDate, maxDate = $maxDate', async ({
      minDate,
      maxDate,
      expectedResult
    }) => {
      const { user, trigger } = renderTimeRangePicker({ minDate, maxDate })
      await user.click(trigger)
      await waitFor(
        async () => {
          const cells = screen.getAllByRole('gridcell')
          const [expectedYear, expectedMonth, expectedDays] = expectedResult
          const expectedLength = expectedResult.flat().length
          expect(cells).toHaveLength(expectedLength)
          expect(screen.getByRole('gridcell', { name: `${expectedYear}年` })).toBeInTheDocument()
          expect(screen.getByRole('gridcell', { name: `${expectedMonth}月` })).toBeInTheDocument();
          expectedDays.forEach(day => {
            expect(screen.getByRole('gridcell', { name: `${day}日` })).toBeInTheDocument()
          })
        },
      )
    })
  });
  it('should not popup  when disabled, <test prop:: disabled>', async () => {
    const { container, user, trigger } = renderTimeRangePicker({ disabled: true })
    await user.click(trigger)
    expect(screen.queryAllByRole('gridcell')).toEqual([])
  });
  it('should contain mui clsPrefix default, <test prop:: clsPrefix>', async () => {
    const { user, trigger, container } = renderTimeRangePicker({ value: dateString })
    await user.click(trigger)
    expect(container.firstChild).toHaveClass(/^mui/)
  });
  it('should contain provided clsPrefix', async () => {
    const { user, trigger, container } = renderTimeRangePicker({ value: dateString, clsPrefix: 'test' })
    await user.click(trigger)
    expect(container.firstChild).toHaveClass(/^test/)
  });
  it('should contain fieldid, <test prop:: fieldid>', async () => {
    const { user, trigger, container, fieldid } = renderTimeRangePicker({ value: dateString, clsPrefix: 'test' })
    await user.click(trigger)
    expect(screen.getByRole('button', { name: /确定/, hidden: true })).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
    expect(screen.getByRole('button', { name: /取消/, hidden: true })).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
  });
  it('should show 上午/下午 when precision is hour at least， <test prop:: use12Hours>', async () => {
    const { trigger, user } = renderTimeRangePicker({ mode: 'minute', use12Hours: true })
    await user.click(trigger)
    await waitFor(
      () => {
        expect(screen.getByText('上午')).toBeInTheDocument()
        expect(screen.getByText('下午')).toBeInTheDocument()
      },
    )
  });
  it('should not show 上午/下午 when precision is less than hour', () => {
    renderTimeRangePicker({ mode: 'day', use12Hours: true })
    expect(screen.queryByText('上午')).not.toBeInTheDocument()
    expect(screen.queryByText('下午')).not.toBeInTheDocument()
  });
  it("onDismiss && onOk && onClearReturn test, <test prop:: onDismiss>, <test prop:: onOk>, <test prop:: onClearReturn>", () => {
    const onDismiss = jest.fn();
    const onOk = jest.fn();
    const onClearReturn = jest.fn();
    const wrapper1 = mount(<TimeRangePicker onDismiss={onDismiss} value={dateString} onOk={onOk} onClearReturn={onClearReturn}></TimeRangePicker>);
    expect(onDismiss).toHaveBeenCalledTimes(0);
    expect(onOk).toHaveBeenCalledTimes(0);
    expect(onClearReturn).toHaveBeenCalledTimes(0);
    wrapper1.find(`.${prefixTimeRangePicker}`).find('span').at(0).simulate('click');
    document.getElementsByClassName('mui-picker-footer-buttons')[0].getElementsByClassName('mui-button-primary')[0].click();
    expect(onDismiss).toHaveBeenCalledTimes(0);
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onClearReturn).toHaveBeenCalledTimes(0);
    wrapper1.find(`.${prefixTimeRangePicker}`).find('span').at(0).simulate('click');
    document.getElementsByClassName('mui-picker-footer-buttons')[0].getElementsByClassName('mui-button-default')[0].click();
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onClearReturn).toHaveBeenCalledTimes(0);
    document.getElementsByClassName('clear-return-button')[0].click();
    expect(onClearReturn).toHaveBeenCalledTimes(1);
  });
  it("readOnly test, <test prop:: readOnly>", () => {
    const wrapper = mount(<TimeRangePicker readOnly></TimeRangePicker>);
    wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).simulate('click');
    expect(document.getElementsByClassName('mui-picker')[0]).toBeFalsy();

    const wrapper1 = mount(<TimeRangePicker ></TimeRangePicker>);
    wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).simulate('click');
    expect(document.getElementsByClassName('mui-picker')[0]).toBeTruthy();
  });
  it("mode test, <test prop:: mode>", () => {
    let wrapper = mount(<TimeRangePicker value={['2021-04-01', '2022-09-01']}></TimeRangePicker>);
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).instance().innerHTML).toEqual('2021-04-01');
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(2).instance().innerHTML).toEqual('2022-09-01');

    wrapper = mount(<TimeRangePicker value={['2021-04-01', '2022-09-01']} mode='year'></TimeRangePicker>);
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).instance().innerHTML).toEqual('2021');
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(2).instance().innerHTML).toEqual('2022');

    wrapper = mount(<TimeRangePicker value={['2021-04-01', '2022-09-01']} mode='month'></TimeRangePicker>);
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).instance().innerHTML).toEqual('2021-04');
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(2).instance().innerHTML).toEqual('2022-09');

    wrapper = mount(<TimeRangePicker value={['2021-04-01', '2022-09-01']} mode='day'></TimeRangePicker>);
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).instance().innerHTML).toEqual('2021-04-01');
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(2).instance().innerHTML).toEqual('2022-09-01');

    wrapper = mount(<TimeRangePicker value={['2021-04-01 11:11:11', '2022-09-01 11:11:11']} mode='minute'></TimeRangePicker>);
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).instance().innerHTML).toEqual('2021-04-01 11:11');
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(2).instance().innerHTML).toEqual('2022-09-01 11:11');

    wrapper = mount(<TimeRangePicker value={['2021-04-01 11:11:11', '2022-09-01 11:11:11']} mode='second'></TimeRangePicker>);
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).instance().innerHTML).toEqual('2021-04-01 11:11:11');
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(2).instance().innerHTML).toEqual('2022-09-01 11:11:11');

    wrapper = mount(<TimeRangePicker value={['2021-04-01 11:11:11', '2022-09-01 11:11:11']} mode='time'></TimeRangePicker>);
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).instance().innerHTML).toEqual('11:11');
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(2).instance().innerHTML).toEqual('11:11');

    wrapper = mount(<TimeRangePicker value={['2021-04-01 11:11:11', '2022-09-01 11:11:11']} mode='hms'></TimeRangePicker>);
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(0).instance().innerHTML).toEqual('11:11:11');
    expect(wrapper.find(`.${prefixTimeRangePicker}`).find('span').at(2).instance().innerHTML).toEqual('11:11:11');
  });
});
