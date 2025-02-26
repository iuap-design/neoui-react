/** Input.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { Input } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';

const prefixInput = `${muiPrefix}-input`;
const prefixIcon = `${muiPrefix}-icon`;

describe('Input Component', () => {
  let wrapper;
  it('should have fieldid, <test prop:: fieldid>', () => {
    wrapper = mount(<Input />)
    expect(wrapper.find(`.${prefixInput}`).prop('fieldid')).toEqual(undefined);
    expect(wrapper.find(`.${prefixInput}-box`).prop('fieldid')).toEqual(undefined);
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('fieldid')).toEqual(undefined);

    const fieldid = 'fieldid-id'
    wrapper.setProps({ fieldid: fieldid })
    expect(wrapper.find(`.${prefixInput}`).prop('fieldid')).toEqual(`${fieldid}_input`);
    expect(wrapper.find(`.${prefixInput}-box`).prop('fieldid')).toEqual(`${fieldid}`);
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('fieldid')).toEqual(`${fieldid}_input_clear`);
    expect(wrapper.find(`svg`).prop('fieldid')).toEqual(`${fieldid}_input_clear_icon`);
  });

  ['left', 'center', 'right'].forEach(item => {
    it('should have correct textAlign, <test prop:: textAlign>', () => {
      wrapper = mount(<Input />)
      expect(wrapper.find(`.${prefixInput}`).hasClass(`${prefixInput}-align-${item}`)).toEqual(false);
      wrapper.setProps({ textAlign: item });
      expect(wrapper.find(`.${prefixInput}`).hasClass(`${prefixInput}-align-${item}`)).toEqual(true);
    })
  });

  it('should have correct value, <test prop:: value>, <test prop:: defaultValue>', () => {
    wrapper = mount(<Input />)
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('');
    wrapper.setProps({ value: 'value-test' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('value-test');

    wrapper = mount(<Input defaultValue='defaultValue-test' />)
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('defaultValue-test');

    wrapper = mount(<Input value='value' defaultValue='defaultValue' />)
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('value');
  });

  it('should have correct name && id, <test prop:: name>, <test prop:: id>', () => {
    wrapper = mount(<Input />)
    expect(wrapper.find(`.${prefixInput}-box`).prop('id')).toEqual(undefined);
    expect(wrapper.find(`.${prefixInput}-box`).prop('name')).toEqual(undefined);

    wrapper.setProps({ id: 'id-test', name: 'name-test' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('id')).toEqual('id-test');
    expect(wrapper.find(`.${prefixInput}-box`).prop('name')).toEqual('name-test');
  });

  it('should have correct style && inputStyle, <test prop:: style>, <test prop:: inputStyle>', () => {
    wrapper = mount(<Input />)
    expect(wrapper.find(`.${prefixInput}`).props().style).toEqual(undefined);
    expect(wrapper.find(`.${prefixInput}-box`).props().style).toEqual(undefined);

    wrapper.setProps({ style: { color: 'rgb(51, 51, 51)' }, inputStyle: { color: 'rgb(34, 34, 34)' } })
    expect(wrapper.find(`.${prefixInput}`).props().style.color).toEqual('rgb(51, 51, 51)');
    expect(wrapper.find(`.${prefixInput}-box`).props().style.color).toEqual('rgb(34, 34, 34)');
  });

  it('should have correct class, <test prop:: disabled>, <test prop:: readOnly>', () => {
    wrapper = mount(<Input />)
    expect(wrapper.find(`.${prefixInput}`).hasClass(`${prefixInput}-wrapper-disabled`)).toEqual(false);
    expect(wrapper.find(`.${prefixInput}`).hasClass(`${prefixInput}-wrapper-readOnly`)).toEqual(false);

    wrapper.setProps({ disabled: true })
    expect(wrapper.find(`.${prefixInput}`).hasClass(`${prefixInput}-wrapper-disabled`)).toEqual(true);
    expect(wrapper.find(`.${prefixInput}`).hasClass(`${prefixInput}-wrapper-readonly`)).toEqual(false);

    wrapper.setProps({ disabled: false, readOnly: true })
    expect(wrapper.find(`.${prefixInput}`).hasClass(`${prefixInput}-wrapper-disabled`)).toEqual(false);
    expect(wrapper.find(`.${prefixInput}`).hasClass(`${prefixInput}-wrapper-readonly`)).toEqual(true);
  });

  it('should have correct show, <test prop:: showClose>, <test prop:: onlyShowClearWhenFocus>', async () => {
    wrapper = mount(<Input showClose defaultValue="test" />);
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('none');
    wrapper.find('input').simulate('focus');
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('input').simulate('blur');
    await sleep(1000)
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('none');

    wrapper = mount(<Input showClose onlyShowClearWhenFocus={false} defaultValue="test" />);
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('input').simulate('focus');
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('input').simulate('blur');
    await sleep(1000)
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('flex');
  });

  it('should have correct placeholder, <test prop:: placeholder>, <test prop:: updatePlaceholder>', () => {
    wrapper = mount(<Input defaultValue='placeholder-test' showClose onlyShowClearWhenFocus={false} />);
    expect(wrapper.find(`.${prefixInput}-box`).prop('placeholder')).toEqual(undefined)
    wrapper.setProps({ placeholder: 'placeholder-test' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('placeholder')).toEqual('placeholder-test')
    wrapper.find(`.${prefixInput}-clear-box`).simulate('click')
    expect(wrapper.find(`.${prefixInput}-box`).prop('placeholder')).toEqual('placeholder-test')

    wrapper = mount(<Input placeholder='placeholder' updatePlaceholder showClose onlyShowClearWhenFocus={false} defaultValue='updatePlaceholder-test' />);
    expect(wrapper.find(`.${prefixInput}-box`).prop('placeholder')).toEqual('placeholder')
    wrapper.find(`.${prefixInput}-clear-box`).simulate('click')
    expect(wrapper.find(`.${prefixInput}-box`).prop('placeholder')).toEqual('updatePlaceholder-test')
  });

  it('should have correct value, <test prop:: max>, <test prop:: min>', async () => {
    wrapper = mount(<Input defaultValue='50' max={20} mode='number' />);
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('50');
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('20');

    wrapper = mount(<Input defaultValue='10' min={20} mode='number' />);
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('10');
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('20');
  });

  it('should have correct class, <test prop:: clsPrefix>', () => {
    wrapper = mount(<Input showClose defaultValue='test' onlyShowClearWhenFocus={false} suffix='test1' tips='test2' />);
    expect(wrapper.exists(`.${prefixInput}`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInput}-wrap-no-tips`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInput}-box`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInput}-clear-box`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInput}-clear`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInput}-suffix`)).toEqual(true);
    expect(wrapper.exists(`.${prefixInput}-tips`)).toEqual(true);

    const clsPrefix = 'clsPrefix'
    wrapper.setProps({ clsPrefix: clsPrefix })
    expect(wrapper.exists(`.${prefixInput}`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInput}-wrap-no-tips`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInput}-box`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInput}-clear-box`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInput}-clear`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInput}-suffix`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInput}-tips`)).toEqual(false);

    expect(wrapper.exists(`.${clsPrefix}-input`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-wrap-no-tips`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-box`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-clear-box`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-clear`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-suffix`)).toEqual(true);
    expect(wrapper.exists(`.${clsPrefix}-input-tips`)).toEqual(true);
  });

  it('should have correct class, <test prop:: suffix>, <test prop:: tips>, <test prop:: prefix>', () => {
    wrapper = mount(<Input />);
    expect(wrapper.exists(`.${prefixInput}-suffix`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInput}-prefix`)).toEqual(false);
    expect(wrapper.exists(`.${prefixInput}-tips`)).toEqual(false);

    wrapper.setProps({ suffix: 'suffix-test', tips: 'tips-test', prefix: "prefix-test" });
    expect(wrapper.find(`.${prefixInput}-suffix`).instance().innerHTML).toEqual('suffix-test');
    expect(wrapper.find(`.${prefixInput}-prefix`).instance().innerHTML).toEqual('prefix-test');
    expect(wrapper.find(`.${prefixInput}-tips`).instance().innerHTML).toEqual('tips-test');

    wrapper.setProps({ suffix: <span className='suffix-test-class'>suffix-test-text</span>, tips: <span className='tips-test-class'>tips-test-text</span> });
    expect(wrapper.find(`.${prefixInput}-suffix`).find('span').hasClass('suffix-test-class')).toEqual(true);
    expect(wrapper.find(`.${prefixInput}-suffix`).find('.suffix-test-class').instance().innerHTML).toEqual('suffix-test-text');
    expect(wrapper.find(`.${prefixInput}-tips`).find('span').hasClass('tips-test-class')).toEqual(true);
    expect(wrapper.find(`.${prefixInput}-tips`).find('.tips-test-class').instance().innerHTML).toEqual('tips-test-text');
  });

  it('should have correct length, <test prop:: maxLength>', () => {
    wrapper = mount(<Input />);
    expect(wrapper.find(`.${prefixInput}-box`).prop('maxlength')).toEqual(undefined);
    wrapper.setProps({ maxLength: 3 })
    expect(wrapper.find(`.${prefixInput}-box`).prop('maxlength')).toEqual('3');
  });

  it('should have correct inputmode, <test prop:: inputmode>', () => {
    wrapper = mount(<Input />);
    expect(wrapper.find(`.${prefixInput}-box`).prop('inputmode')).toEqual(undefined);
    wrapper.setProps({ inputmode: 'text' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('inputmode')).toEqual('text');
    wrapper.setProps({ inputmode: 'decimal' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('inputmode')).toEqual('decimal');
  });

  it('should have correct mode, <test prop:: mode>', async () => {
    const onError = jest.fn();
    wrapper = mount(<Input check onError={onError} />);
    expect(onError).toHaveBeenCalledTimes(0);

    wrapper.setProps({ mode: 'idCard' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('type')).toEqual('text');
    wrapper.find('input').simulate('change', { target: { value: '123456199909871988' } })
    expect(onError).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('change', { target: { value: 'incorrect number' } })
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toEqual('incorrect number');
    expect(onError.mock.calls[0][1]).toEqual({ reg: /^[0-9xX]*$/, text: '' });

    wrapper.setProps({ mode: 'ipAddress' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('type')).toEqual('text');
    wrapper.find('input').simulate('change', { target: { value: '198.0.0.1' } })
    expect(onError).toHaveBeenCalledTimes(1);
    wrapper.find('input').simulate('change', { target: { value: 'incorrect number' } })
    expect(onError).toHaveBeenCalledTimes(2);
    expect(onError.mock.calls[1][0]).toEqual('incorrect number');
    expect(onError.mock.calls[1][1]).toEqual({ reg: /^[0-9.]*$/, text: '' });

    wrapper.setProps({ mode: 'bankCard16' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('type')).toEqual('number');
    wrapper.find('input').simulate('change', { target: { value: '1234567891234567' } })
    expect(onError).toHaveBeenCalledTimes(2);
    wrapper.find('input').simulate('change', { target: { value: '111' } })
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(3);
    expect(onError.mock.calls[2][0]).toEqual('111');
    expect(onError.mock.calls[2][1]).toEqual({ reg: /^\d{16}$/, text: '' });

    wrapper.setProps({ mode: 'bankCard19' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('type')).toEqual('number');
    wrapper.find('input').simulate('change', { target: { value: '1234567891234567111' } })
    expect(onError).toHaveBeenCalledTimes(3);
    wrapper.find('input').simulate('change', { target: { value: '111' } })
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(4);
    expect(onError.mock.calls[3][0]).toEqual('111');
    expect(onError.mock.calls[3][1]).toEqual({ reg: /^\d{19}$/, text: '' });

    wrapper.setProps({ mode: 'number' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('type')).toEqual('number');

    wrapper.setProps({ mode: 'tel' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('type')).toEqual('tel');

    wrapper.setProps({ mode: 'text' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('type')).toEqual('text');

    wrapper.setProps({ mode: 'email' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('type')).toEqual('email');

    wrapper.setProps({ mode: 'password' })
    expect(wrapper.find(`.${prefixInput}-box`).prop('type')).toEqual('password');
  });
  it('check && required, <test prop:: check>, <test prop:: required>', async () => {
    const onError = jest.fn();
    // check: false
    wrapper = mount(<Input onError={onError} required />);
    expect(onError).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('change', { target: { value: 'newValue' } });
    expect(onError).toHaveBeenCalledTimes(0);

    // required: false
    wrapper = mount(<Input onError={onError} check />);
    expect(onError).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('change', { target: { value: 'newValue' } });
    expect(onError).toHaveBeenCalledTimes(0);

    // normal test
    wrapper = mount(<Input onError={onError} check required defaultValue='newValue' />);
    expect(onError).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('pattern && finalPattern, <test prop:: pattern>, <test prop:: finalPattern>', async () => {
    const onError = jest.fn();
    wrapper = mount(<Input onError={onError} check />);
    expect(onError).toHaveBeenCalledTimes(0);

    wrapper.setProps({ pattern: /^[0-9.]*$/ });
    wrapper.find('input').simulate('change', { target: { value: '1234567891234567111' } })
    expect(onError).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('change', { target: { value: 'test' } })
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toEqual('test');
    expect(onError.mock.calls[0][1]).toEqual({ reg: /^[0-9.]*$/, text: '' });

    wrapper.setProps({ finalPattern: /^[0-9.]*$/, pattern: undefined });
    wrapper.find('input').simulate('change', { target: { value: '1234567891234567111' } })
    expect(onError).toHaveBeenCalledTimes(2);
    wrapper.find('input').simulate('change', { target: { value: 'test' } })
    expect(onError).toHaveBeenCalledTimes(2);
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(3);
    expect(onError.mock.calls[2][0]).toEqual('test');
    expect(onError.mock.calls[2][1]).toEqual({ reg: /^[0-9.]*$/ });

    wrapper.setProps({ finalPattern: /^[0-9.]*$/, pattern: /^[0-3.]*$/ });
    wrapper.find('input').simulate('change', { target: { value: '123' } })
    expect(onError).toHaveBeenCalledTimes(4);
    wrapper.find('input').simulate('change', { target: { value: 'test' } })
    expect(onError).toHaveBeenCalledTimes(5);
    expect(onError.mock.calls[4][1]).toEqual({ reg: /^[0-3.]*$/, text: '' });
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(6);
    expect(onError.mock.calls[5][1]).toEqual({ reg: /^[0-9.]*$/ });
  });

  it('customCheck test, <test prop:: customCheck>', async () => {
    const onError = jest.fn();
    // check: false
    wrapper = mount(<Input onError={onError} check defaultValue='defaultValue' />);
    expect(onError).toHaveBeenCalledTimes(0);

    wrapper.setProps({ customCheck: () => true })
    wrapper.find('input').simulate('blur');
    expect(onError).toHaveBeenCalledTimes(0);

    wrapper.setProps({ customCheck: () => false })
    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onError).toHaveBeenCalledTimes(2);
    expect(onError.mock.calls[0][0]).toBe('defaultValue');
  });
});

describe('Input event test', () => {
  let wrapper;
  it('onFocus && onBlur, <test prop:: onFocus>, <test prop:: onBlur>', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    wrapper = mount(<Input onFocus={onFocus} onBlur={onBlur} defaultValue='defaultValue' />);
    expect(onFocus).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus.mock.calls[0][0]).toBe('defaultValue');

    wrapper.find('input').simulate('blur');
    await sleep(400);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur.mock.calls[0][0]).toBe('defaultValue');
  });

  it('onClickClear, <test prop:: onClickClear>', () => {
    const onClickClear = jest.fn();
    wrapper = mount(<Input onClickClear={onClickClear} showClose onlyShowClearWhenFocus={false} defaultValue='defaultValue' />);
    expect(onClickClear).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('defaultValue');

    wrapper.find(`.${prefixInput}-clear-box`).simulate('click')
    expect(wrapper.find(`.${prefixInput}-box`).prop('value')).toEqual('');
    expect(onClickClear).toHaveBeenCalledTimes(1);
    expect(onClickClear.mock.calls[0][0]).toBe('defaultValue');
  });

  it('onEnterPress, <test prop:: onEnterPress>', () => {
    const onEnterPress = jest.fn();
    wrapper = mount(<Input onEnterPress={onEnterPress} />);
    wrapper.find('input').simulate('focus');
    expect(onEnterPress).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('keydown', { keyCode: 14 })
    expect(onEnterPress).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('keydown', { keyCode: 13 })
    expect(onEnterPress).toHaveBeenCalledTimes(1);
  });

  it('onSuffixClick, <test prop:: onSuffixClick>', () => {
    const onSuffixClick = jest.fn();
    wrapper = mount(<Input onSuffixClick={onSuffixClick} suffix='suffix' />);
    expect(onSuffixClick).toHaveBeenCalledTimes(0);

    wrapper.find(`.${prefixInput}-suffix`).simulate('click')
    expect(onSuffixClick).toHaveBeenCalledTimes(1);
  });

  it('onChange, <test prop:: onChange>', () => {
    const onChange = jest.fn();
    wrapper = mount(<Input onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('change', { target: { value: 'newValue' } })
    expect(onChange.mock.calls[0][0]).toBe('newValue');
  });

  it('onError && onSuccess, <test prop:: onError>, <test prop:: onSuccess>', () => {
    const onError = jest.fn();
    const onSuccess = jest.fn();
    wrapper = mount(<Input onError={onError} onSuccess={onSuccess} check required />);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('change', { target: { value: 'newValue' } });
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
})
