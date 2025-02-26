/** TimePicker.tsx */
import React from 'react';
import { render, screen, within } from "@testing-library/react";
import { TimePicker } from "@tinper/m";
import userEvent from "@testing-library/user-event";
import { TimePickerProps } from "@components/time-picker/src/iTimePicker";
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'
const prefixTimePicker = `${muiPrefix}-time-picker`;

describe('TimePicker Component', () => {
  const timeString = '07:08:19'
  const timeArr = [7, 8, 19]

  const renderTimePicker = (props: Partial<TimePickerProps> = {}) => {
    const onOk = jest.fn()
    const onDismiss = jest.fn()
    const fieldid = 'time-picker-fieldid'
    const { container } = render(<TimePicker fieldid={fieldid} onOk={onOk} onDismiss={onDismiss}  {...props} />)
    const getOptionByLabel = async (precision: string, label: number | string) => within(await screen.findByRole('listbox', { name: new RegExp(precision, 'i') })).getByRole('gridcell', { name: new RegExp(label.toString()) })
    const getOptions = async (precision: string) => within(await screen.findByRole('listbox', { name: new RegExp(precision, 'i') })).getAllByRole('gridcell')

    return {
      container,
      user: userEvent.setup(),
      trigger: screen.getByRole('textbox'),
      getConfirmBtn: () => screen.getByRole('button', { name: /确定/, hidden: true }),
      getCancelBtn: () => screen.getByRole('button', { name: /取消/, hidden: true }),
      onOk,
      onDismiss,
      fieldid,
      getOptionByLabel,
      getOptions
    }
  };
  it('should render correctly', () => {
    const {container} = renderTimePicker({defaultValue: timeString})
    expect(container).toMatchSnapshot()
  });
  it('should render defaultValue, <test prop:: defaultValue>', async () => {
    const { trigger } = renderTimePicker({ defaultValue: timeString })
    expect(trigger).toHaveValue(timeString)
  });
  it('should select defaultValue when trigger', async () => {
    const { user, trigger } = renderTimePicker({ defaultValue: timeString })
    await user.click(trigger)
    const cells = await screen.findAllByRole('gridcell', { selected: true })
    timeArr.forEach((item, i) => {
      expect(cells[i]).toHaveTextContent(item.toString())
    })
  });
  it('should render time default format HH:mm:ss, <test prop:: subuitype>', async () => {
    const { trigger } = renderTimePicker({ defaultValue: timeString })
    expect(trigger).toHaveDisplayValue(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/)
  });
  it('should render time  format HH:mm', async () => {
    const { trigger } = renderTimePicker({ defaultValue: timeString, subuitype: 'HH:mm' })
    expect(trigger).toHaveDisplayValue(/^(\d{1,2}):(\d{1,2})$/)
  });
  it('should render popTitle, <test prop:: popTitle>', async () => {
    const popTitle = 'popTitle'
    const { user, trigger } = renderTimePicker({ popTitle })
    await user.click(trigger)
    expect(screen.getByText(popTitle)).toBeInTheDocument()
  });
  it('should render placeholder, <test prop:: placeholder>', async () => {
    const placeholder = 'placeholder'
    const { user, trigger } = renderTimePicker({ placeholder })
    await user.click(trigger)
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  });
  it('should render hours interval, <test prop:: hourStep>', async () => {
    const { user, trigger, getOptions } = renderTimePicker({ hourStep: 2 });
    await user.click(trigger)
    const minuteOptions = await getOptions('hour')
    expect(minuteOptions).toHaveLength(12)
  });
  it('should render minute interval, <test prop:: minuteStep>', async () => {
    const { user, trigger, getOptions } = renderTimePicker({ minuteStep: 10 });
    await user.click(trigger)
    const minuteOptions = await getOptions('minute')
    expect(minuteOptions).toHaveLength(6)
  });
  it('should render minute interval, <test prop:: secondStep>', async () => {
    const { user, trigger, getOptions } = renderTimePicker({ secondStep: 3 });
    await user.click(trigger)
    const minuteOptions = await getOptions('second')
    expect(minuteOptions).toHaveLength(20)
  });
  it('should not popup  when disabled, <test prop:: disabled>', async () => {
    const { user, trigger } = renderTimePicker({ disabled: true })
    await user.click(trigger)
    expect(screen.queryAllByRole('gridcell')).toEqual([])
  });
  it('should contain mui clsPrefix default, <test prop:: clsPrefix>', async () => {
    const { user, trigger, container } = renderTimePicker({ value: timeString })
    await user.click(trigger)
    expect(container.firstChild).toHaveClass(/^mui/)
  });
  it('should contain provided clsPrefix', async () => {
    const { user, trigger, container } = renderTimePicker({ value: timeString, clsPrefix: 'test' })
    await user.click(trigger)
    expect(container.firstChild).toHaveClass(/^test/)
  });
  it('should contain fieldid, <test prop:: fieldid>', async () => {
    const { user, trigger, fieldid, getConfirmBtn, getCancelBtn } = renderTimePicker({ value: timeString, clsPrefix: 'test' })
    await user.click(trigger)
    expect(getConfirmBtn()).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
    expect(getCancelBtn()).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
  });
  it('should show 上午/下午, <test prop:: use12Hours>', async () => {
    const { user, trigger } = renderTimePicker({ use12Hours: true });
    await user.click(trigger)
    expect(screen.getByText('上午')).toBeInTheDocument()
    expect(screen.getByText('下午')).toBeInTheDocument()
  });
  it("readOnly test, <test prop:: readOnly>", () => {
    const wrapper = mount(<TimePicker readOnly></TimePicker>);
    wrapper.find(`.${prefixTimePicker}`).simulate('click');
    expect(document.getElementsByClassName('mui-picker')[0]).toBeFalsy();
  });
  it("value test, <test prop:: value>", () => {
    const wrapper = mount(<TimePicker value='14:12:10'></TimePicker>);
    expect(wrapper.find(`.${prefixTimePicker}`).find('input').props().value).toEqual('14:12:10');
    // todo 暂时显示有两个mui-time-picker(?)
    wrapper.find(`.${prefixTimePicker}`).at(1).simulate('click');
    expect(document.getElementsByClassName('mui-picker')[0]).toBeTruthy();
  });
  it("onDismiss && onOk && onClearReturn test, <test prop:: onDismiss>, <test prop:: onOk>, <test prop:: onClearReturn>", () => {
    const onDismiss = jest.fn();
    const onOk = jest.fn();
    const onClearReturn = jest.fn();
    const wrapper1 = mount(<TimePicker onDismiss={onDismiss} value='14:12:10' onOk={onOk} onClearReturn={onClearReturn}></TimePicker>);
    expect(onDismiss).toHaveBeenCalledTimes(0);
    expect(onOk).toHaveBeenCalledTimes(0);
    expect(onClearReturn).toHaveBeenCalledTimes(0);
    wrapper1.find(`.${prefixTimePicker}`).at(1).simulate('click');
    document.getElementsByClassName('mui-picker-footer-buttons')[0].getElementsByClassName('mui-button-primary')[0].click();
    expect(onDismiss).toHaveBeenCalledTimes(0);
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onClearReturn).toHaveBeenCalledTimes(0);
    wrapper1.find(`.${prefixTimePicker}`).at(1).simulate('click');
    document.getElementsByClassName('mui-picker-footer-buttons')[0].getElementsByClassName('mui-button-default')[0].click();
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onClearReturn).toHaveBeenCalledTimes(0);
    document.getElementsByClassName('clear-return-button')[0].click();
    expect(onClearReturn).toHaveBeenCalledTimes(1);
  });
  it("format test, <test prop:: format>", () => {
    const wrapper = mount(<TimePicker value='14:12:10' format={val => val + "111"}></TimePicker>);
    expect(wrapper.find('input').props().value.slice(-3)).toEqual('111')
  });
});
