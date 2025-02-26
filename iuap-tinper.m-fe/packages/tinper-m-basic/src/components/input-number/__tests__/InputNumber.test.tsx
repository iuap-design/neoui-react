/** InputNumber.tsx */
import React from 'react'
import { screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import { InputNumber } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';

const prefixInputNumber = `${muiPrefix}-input-number`;
const integerMarks = [
  {
    len: 3,
    mark: '@',
    key: 'hundred'
  },
  {
    len: 4,
    mark: '#',
    key: 'thousand'
  },
  {
    len: 5,
    mark: '$',
    key: 'tenThousand'
  },
  {
    len: 6,
    mark: '%',
    key: 'hundredThousand'
  },
  {
    len: 7,
    mark: '^',
    key: 'million'
  },
  {
    len: 8,
    mark: '111',
    key: 'tenMillion'
  },
  {
    len: 9,
    mark: '*',
    key: 'hundredMillion'
  },
  {
    len: 10,
    mark: '(',
    key: 'billion'
  },
  {
    len: 11,
    mark: ')',
    key: 'tenBillion'
  },
  {
    len: 12,
    mark: '-',
    key: 'hundredBillion'
  },
  {
    len: 13,
    mark: '+',
    key: 'trillion'
  },
  {
    len: 14,
    mark: '=',
    key: 'tenTrillion'
  },
  {
    len: 15,
    mark: '~',
    key: 'hundredTrillion'
  },
  {
    len: 16,
    mark: '!',
    key: 'quadrillion'
  },
]
describe('InputNumber Component', () => {
  let wrapper;
  it('should have fieldid, <test prop:: fieldid>', () => {
    wrapper = mount(<InputNumber />)
    expect(wrapper.find(`.${prefixInputNumber}`).prop('fieldid')).toEqual(undefined);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('fieldid')).toEqual(undefined);
    expect(wrapper.find(`.${prefixInputNumber}-clear-box`).prop('fieldid')).toEqual(undefined);

    const fieldid = 'fieldid-id'
    wrapper.setProps({ fieldid: fieldid })
    expect(wrapper.find(`.${prefixInputNumber}`).prop('fieldid')).toEqual(`${fieldid}_input_number`);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('fieldid')).toEqual(`${fieldid}_input_number_box`);
    expect(wrapper.find(`.${prefixInputNumber}-clear-box`).prop('fieldid')).toEqual(`${fieldid}_input_number_clear`);
    expect(wrapper.find(`svg`).prop('fieldid')).toEqual(`${fieldid}_input_number_clear_icon`);
  });

  ['left', 'center', 'right'].forEach(item => {
    it('should have correct align, <test prop:: align>', () => {
      wrapper = mount(<InputNumber />)
      expect(wrapper.find(`.${prefixInputNumber}`).hasClass(`${prefixInputNumber}-align-${item}`)).toEqual(false);
      wrapper.setProps({ align: item });
      expect(wrapper.find(`.${prefixInputNumber}`).hasClass(`${prefixInputNumber}-align-${item}`)).toEqual(true);
    })
  });

  it('should have correct value, <test prop:: value>, <test prop:: defaultValue>', () => {
    wrapper = mount(<InputNumber />)
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('');
    wrapper = mount(<InputNumber value={1} />)
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('1');

    wrapper = mount(<InputNumber defaultValue={2} />)
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('2');

    wrapper = mount(<InputNumber value={1} defaultValue={1} />)
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('1');
  });

  it('should have correct name && id, <test prop:: name>, <test prop:: id>', () => {
    wrapper = mount(<InputNumber />)
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('id')).toEqual(undefined);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('name')).toEqual(undefined);

    wrapper.setProps({ id: 'id-test', name: 'name-test' })
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('id')).toEqual('id-test');
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('name')).toEqual('name-test');
  });

  it('should have correct style && inputStyle, <test prop:: style>, <test prop:: inputStyle>', () => {
    wrapper = mount(<InputNumber />)
    expect(wrapper.find(`.${prefixInputNumber}`).props().style).toEqual(undefined);
    expect(wrapper.find(`.${prefixInputNumber}-box`).props().style).toEqual(undefined);

    wrapper.setProps({ style: { color: 'rgb(51, 51, 51)' }, inputStyle: { color: 'rgb(34, 34, 34)' } })
    expect(wrapper.find(`.${prefixInputNumber}`).props().style.color).toEqual('rgb(51, 51, 51)');
    expect(wrapper.find(`.${prefixInputNumber}-box`).props().style.color).toEqual('rgb(34, 34, 34)');
  });

  it('should have correct class, <test prop:: disabled>, <test prop:: readOnly>', () => {
    wrapper = mount(<InputNumber />)
    expect(wrapper.find(`.${prefixInputNumber}`).hasClass(`${prefixInputNumber}-wrapper-disabled`)).toEqual(false);
    expect(wrapper.find(`.${prefixInputNumber}`).hasClass(`${prefixInputNumber}-wrapper-readOnly`)).toEqual(false);

    wrapper.setProps({ disabled: true })
    expect(wrapper.find(`.${prefixInputNumber}`).hasClass(`${prefixInputNumber}-wrapper-disabled`)).toEqual(true);
    expect(wrapper.find(`.${prefixInputNumber}`).hasClass(`${prefixInputNumber}-wrapper-readonly`)).toEqual(false);

    wrapper.setProps({ disabled: false, readOnly: true })
    expect(wrapper.find(`.${prefixInputNumber}`).hasClass(`${prefixInputNumber}-wrapper-disabled`)).toEqual(false);
    expect(wrapper.find(`.${prefixInputNumber}`).hasClass(`${prefixInputNumber}-wrapper-readonly`)).toEqual(true);
  });

  it('should have correct show, <test prop:: showClose>, <test prop:: onlyShowClearWhenFocus>', async () => {
    wrapper = mount(<InputNumber showClose defaultValue={1} />);
    expect(wrapper.find(`.${prefixInputNumber}-clear-box`).prop('style').display).toEqual('none');
    wrapper.find('input').simulate('focus');
    expect(wrapper.find(`.${prefixInputNumber}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('input').simulate('blur');
    await sleep(1000)
    expect(wrapper.find(`.${prefixInputNumber}-clear-box`).prop('style').display).toEqual('none');

    wrapper = mount(<InputNumber showClose onlyShowClearWhenFocus={false} defaultValue={1} />);
    expect(wrapper.find(`.${prefixInputNumber}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('input').simulate('focus');
    expect(wrapper.find(`.${prefixInputNumber}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('input').simulate('blur');
    await sleep(1000)
    expect(wrapper.find(`.${prefixInputNumber}-clear-box`).prop('style').display).toEqual('flex');
  });

  it('should have correct placeholder, <test prop:: placeholder>', () => {
    wrapper = mount(<InputNumber defaultValue='placeholder-test' showClose onlyShowClearWhenFocus={false} />);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('placeholder')).toEqual(undefined)
    wrapper.setProps({ placeholder: 'placeholder-test' })
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('placeholder')).toEqual('placeholder-test')
    wrapper.find(`.${prefixInputNumber}-clear-box`).simulate('click')
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('placeholder')).toEqual('placeholder-test')
  });

  it('should have correct className, <test prop:: className>', () => {
    wrapper = mount(<InputNumber className='className-test' />);
    expect(wrapper.find(`.${prefixInputNumber}`).hasClass('className-test')).toEqual(true)
  });

  it('should have correct value, <test prop:: precision>', () => {
    wrapper = mount(<InputNumber defaultValue={1.1111} />);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('1.1111');

    wrapper = mount(<InputNumber defaultValue={1.1111} precision={2} />);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('1.11');
  });

  it('should have correct unit, <test prop:: showUnit>', () => {
    wrapper = mount(<InputNumber defaultValue={111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('百');

    wrapper = mount(<InputNumber defaultValue={1111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('千');

    wrapper = mount(<InputNumber defaultValue={11111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('万');

    wrapper = mount(<InputNumber defaultValue={111111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('十万');

    wrapper = mount(<InputNumber defaultValue={1111111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('百万');

    wrapper = mount(<InputNumber defaultValue={11111111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('千万');

    wrapper = mount(<InputNumber defaultValue={111111111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('亿');

    wrapper = mount(<InputNumber defaultValue={1111111111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('十亿');

    wrapper = mount(<InputNumber defaultValue={11111111111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('百亿');

    wrapper = mount(<InputNumber defaultValue={111111111111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('千亿');

    wrapper = mount(<InputNumber defaultValue={1111111111111} showUnit max={11111111111111} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('万亿');

    wrapper = mount(<InputNumber defaultValue={11111111111111} showUnit max={111111111111111} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('十万亿');

    wrapper = mount(<InputNumber defaultValue={111111111111111} showUnit max={1111111111111111} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('百万亿');

    wrapper = mount(<InputNumber defaultValue={1111111111111111} showUnit max={11111111111111111} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('千万亿');

    wrapper = mount(<InputNumber defaultValue={+1111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('千');

    wrapper = mount(<InputNumber defaultValue={-1111} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('千');

    wrapper = mount(<InputNumber defaultValue={-1111.11} showUnit />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('千');
  });

  it('should have correct unit, <test prop:: integerMarks>', () => {
    wrapper = mount(<InputNumber defaultValue={111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('@');

    wrapper = mount(<InputNumber defaultValue={1111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('#');

    wrapper = mount(<InputNumber defaultValue={11111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('$');

    wrapper = mount(<InputNumber defaultValue={111111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('%');

    wrapper = mount(<InputNumber defaultValue={1111111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('^');

    wrapper = mount(<InputNumber defaultValue={11111111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('111');

    wrapper = mount(<InputNumber defaultValue={111111111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('*');

    wrapper = mount(<InputNumber defaultValue={1111111111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('(');

    wrapper = mount(<InputNumber defaultValue={11111111111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual(')');

    wrapper = mount(<InputNumber defaultValue={111111111111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('-');

    wrapper = mount(<InputNumber defaultValue={1111111111111} showUnit max={11111111111111} integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('+');

    wrapper = mount(<InputNumber defaultValue={11111111111111} showUnit max={111111111111111} integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('=');

    wrapper = mount(<InputNumber defaultValue={111111111111111} showUnit max={1111111111111111} integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('~');

    wrapper = mount(<InputNumber defaultValue={1111111111111111} showUnit max={11111111111111111} integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('!');

    wrapper = mount(<InputNumber defaultValue={+1111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('#');

    wrapper = mount(<InputNumber defaultValue={-1111} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('#');

    wrapper = mount(<InputNumber defaultValue={-1111.11} showUnit integerMarks={integerMarks} />);
    expect(wrapper.find(`.${prefixInputNumber}-showunit`).instance().innerHTML).toEqual('#');
  });

  it('should have correct value, <test prop:: max>, <test prop:: min>', async () => {
    wrapper = mount(<InputNumber defaultValue={50} max={20} />);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('20');

    wrapper = mount(<InputNumber defaultValue={10} min={20} />);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('20');
  });

  it('should have correct value, <test prop:: format>', async () => {
    wrapper = mount(<InputNumber format={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} defaultValue={11111} />);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('11,111');
  });

  it('should have correct class, <test prop:: clsPrefix>', () => {
    wrapper = mount(<InputNumber showClose defaultValue={11} onlyShowClearWhenFocus={false} addonAfter='test1' tips='test2' />);
    expect(wrapper.exists(`.${prefixInputNumber}`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInputNumber}-wrap-no-tips`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInputNumber}-box`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInputNumber}-clear-box`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInputNumber}-clear`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInputNumber}-addonafter`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInputNumber}-tips`)).toEqual(true);

    const clsPrefix = 'clsPrefix'
    wrapper.setProps({ clsPrefix: clsPrefix })
    expect(wrapper.exists(`.${prefixInputNumber}`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInputNumber}-wrap-no-tips`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInputNumber}-box`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInputNumber}-clear-box`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInputNumber}-clear`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInputNumber}-addonafter`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInputNumber}-tips`)).toEqual(false);

    expect(wrapper.exists(`.${clsPrefix}-input-number`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-number-wrap-no-tips`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-number-box`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-number-clear-box`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-number-clear`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-number-addonafter`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-number-tips`)).toEqual(true);
  });

  it('should have correct class, <test prop:: addonAfter>, <test prop:: tips>, <test prop:: addonBefore>', () => {
    wrapper = mount(<InputNumber />);
    expect(wrapper.exists(`.${prefixInputNumber}-addonafter`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInputNumber}-addonbefore`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInputNumber}-tips`)).toEqual(false);

    wrapper.setProps({ addonAfter: 'addonAfter-test', tips: 'tips-test', addonBefore: "addonBefore-test" });
    expect(wrapper.find(`.${prefixInputNumber}-addonafter`).instance().innerHTML).toEqual('addonAfter-test');
    expect(wrapper.find(`.${prefixInputNumber}-addonbefore`).instance().innerHTML).toEqual('addonBefore-test');
    expect(wrapper.find(`.${prefixInputNumber}-tips`).instance().innerHTML).toEqual('tips-test');

    wrapper.setProps({ addonAfter: <span className='addonAfter-test-class'>addonAfter-test-text</span>, tips: <span className='tips-test-class'>tips-test-text</span> });
    expect(wrapper.find(`.${prefixInputNumber}-addonafter`).find('span').hasClass('addonAfter-test-class')).toEqual(true);
    expect(wrapper.find(`.${prefixInputNumber}-addonafter`).find('.addonAfter-test-class').instance().innerHTML).toEqual('addonAfter-test-text');
    expect(wrapper.find(`.${prefixInputNumber}-tips`).find('span').hasClass('tips-test-class')).toEqual(true);
    expect(wrapper.find(`.${prefixInputNumber}-tips`).find('.tips-test-class').instance().innerHTML).toEqual('tips-test-text');
  });

  it('check && required, <test prop:: check>, <test prop:: required>', async () => {
    const onError = jest.fn();
    // check: false
    wrapper = mount(<InputNumber onError={onError} required />);
    expect(onError).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('input', { target: { value: 1 } });
    expect(onError).toHaveBeenCalledTimes(0);

    // required: false
    wrapper = mount(<InputNumber onError={onError} check />);
    expect(onError).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('input', { target: { value: 1 } });
    expect(onError).toHaveBeenCalledTimes(0);

    // normal test
    wrapper = mount(<InputNumber onError={onError} check required defaultValue={1} />);
    expect(onError).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('pattern && finalPattern, <test prop:: pattern>, <test prop:: finalPattern>', async () => {
    const onError = jest.fn();
    wrapper = mount(<InputNumber onError={onError} check />);
    expect(onError).toHaveBeenCalledTimes(0);

    wrapper.setProps({ pattern: /^[0-8.]*$/ });
    wrapper.find('input').simulate('input', { target: { value: 12345 } })
    expect(onError).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('input', { target: { value: 99 } })
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toEqual('99');
    expect(onError.mock.calls[0][1]).toEqual({ reg: /^[0-8.]*$/, text: '' });

    wrapper.setProps({ finalPattern: /^[0-8.]*$/, pattern: null });
    wrapper.find('input').simulate('input', { target: { value: 12345 } })
    expect(onError).toHaveBeenCalledTimes(1);
    wrapper.find('input').simulate('input', { target: { value: 89 } })
    expect(onError).toHaveBeenCalledTimes(1);
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(2);
    expect(onError.mock.calls[1][0]).toEqual('89');
    expect(onError.mock.calls[1][1]).toEqual({ reg: /^[0-8.]*$/ });

    wrapper.setProps({ finalPattern: /^[0-8.]*$/, pattern: /^[0-3.]*$/ });
    wrapper.find('input').simulate('input', { target: { value: 123 } })
    expect(onError).toHaveBeenCalledTimes(2);
    wrapper.find('input').simulate('input', { target: { value: 99 } })
    expect(onError).toHaveBeenCalledTimes(3);
    expect(onError.mock.calls[2][1]).toEqual({ reg: /^[0-3.]*$/, text: '' });
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(4);
    expect(onError.mock.calls[3][1]).toEqual({ reg: /^[0-8.]*$/ });
  });

  it('customCheck test, <test prop:: customCheck>', async () => {
    const onError = jest.fn();
    // check: false
    wrapper = mount(<InputNumber onError={onError} check defaultValue={99} />);
    expect(onError).toHaveBeenCalledTimes(0);

    wrapper.setProps({ customCheck: () => true })
    wrapper.find('input').simulate('blur');
    expect(onError).toHaveBeenCalledTimes(0);

    wrapper.setProps({ customCheck: () => false })
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBe('99');
  });

  it('autoSelect test, <test prop:: autoSelect>', async () => {
    wrapper = mount(<InputNumber defaultValue={80} format={(value) => `${value}%`} showClose autoSelect />);
    wrapper.find('input').simulate('focus');
    const input = screen.getByRole('textbox'); 
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
    wrapper.unmount()
  });

  it('autoSelect test', async () => {
    wrapper = mount(<InputNumber defaultValue={80} format={(value) => `${value}%`} showClose />);
    wrapper.find('input').simulate('focus');
    const input = screen.getByRole('textbox'); 
    expect(input.selectionStart).toBe(input.value.length);
    expect(input.selectionEnd).toBe(input.value.length);
    wrapper.unmount()
  });
});

describe('Input event test', () => {
  let wrapper;
  it('onFocus && onBlur, <test prop:: onFocus>, <test prop:: onBlur>', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    wrapper = mount(<InputNumber onFocus={onFocus} onBlur={onBlur} defaultValue={12} />);
    expect(onFocus).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);

    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('onClickClear, <test prop:: onClickClear>', () => {
    const onClickClear = jest.fn();
    wrapper = mount(<InputNumber onClickClear={onClickClear} showClose onlyShowClearWhenFocus={false} defaultValue={13} />);
    expect(onClickClear).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('13');

    wrapper.find(`.${prefixInputNumber}-clear-box`).simulate('click')
    expect(wrapper.find(`.${prefixInputNumber}-box`).prop('value')).toEqual('');
    expect(onClickClear).toHaveBeenCalledTimes(1);
  });

  it('onChange, <test prop:: onChange>', () => {
    const onChange = jest.fn();
    wrapper = mount(<InputNumber onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('input', { target: { value: '55' } })
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('onError && onSuccess, <test prop:: onError>, <test prop:: onSuccess>', () => {
    const onError = jest.fn();
    const onSuccess = jest.fn();
    wrapper = mount(<InputNumber onError={onError} onSuccess={onSuccess} check required />);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('input', { target: { value: '66' } });
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
})
