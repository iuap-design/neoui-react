/** TextArea.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { TextArea } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';

const prefixTextArea = `${muiPrefix}-text-area`;

describe('TextArea Component', () => {
  let wrapper;
  it('should have fieldid, <test prop:: fieldid>', () => {
    wrapper = mount(<TextArea />)
    expect(wrapper.find(`.${prefixTextArea}`).prop('fieldid')).toEqual(undefined);
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('fieldid')).toEqual(undefined);

    const fieldid = 'fieldid-id';
    wrapper.setProps({ fieldid: fieldid });
    expect(wrapper.find(`.${prefixTextArea}`).prop('fieldid')).toEqual(`${fieldid}_textarea`);
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('fieldid')).toEqual(`${fieldid}_textarea_element`);
  });

  it('should have correct show, <test prop:: showClose>', async () => {
    wrapper = mount(<TextArea showClose defaultValue="test" />);
    expect(wrapper.find(`.${prefixTextArea}-clear-box`).prop('style').display).toEqual('none');
    wrapper.find('textarea').simulate('focus');
    expect(wrapper.find(`.${prefixTextArea}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('textarea').simulate('blur');
    await sleep(1000)
    expect(wrapper.find(`.${prefixTextArea}-clear-box`).prop('style').display).toEqual('none');
  });

  it('should have correct value, <test prop:: value>, <test prop:: defaultValue>', () => {
    wrapper = mount(<TextArea />)
    wrapper.setProps({ value: 'value-test' })
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('value')).toEqual('value-test');

    wrapper = mount(<TextArea defaultValue='defaultValue-test' />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('value')).toEqual('defaultValue-test');

    wrapper = mount(<TextArea value='value' defaultValue='defaultValue' />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('value')).toEqual('value');
  });

  it('should have correct id, <test prop:: id>', () => {
    wrapper = mount(<TextArea />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('id')).toEqual(undefined);
    wrapper.setProps({ id: 'id-test' })
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('id')).toEqual('id-test');
  });

  it('should have correct name, <test prop:: name>', () => {
    wrapper = mount(<TextArea />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('name')).toEqual(undefined);
    wrapper.setProps({ name: 'name-test' })
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('name')).toEqual('name-test');
  });

  it('should have correct placeholder, <test prop:: placeholder>', () => {
    wrapper = mount(<TextArea />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('placeholder')).toEqual(undefined);
    wrapper.setProps({ placeholder: 'placeholder-test' })
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('placeholder')).toEqual('placeholder-test');
  });

  it('should have correct rows, <test prop:: rows>', () => {
    wrapper = mount(<TextArea />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('rows')).toEqual(3);
    wrapper.setProps({ rows: '7' })
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('rows')).toEqual(7);
  });

  it('should have correct maxLength && shwoCount, <test prop:: maxLength>, <test prop:: showCount>', async () => {
    // 默认状态：没有下角标
    wrapper = mount(<TextArea />)
    expect(wrapper.find(`.${prefixTextArea}-element`).exists(`.${prefixTextArea}-count`)).toEqual(false);
    wrapper.find('textarea').simulate('change', { target: { value: '01234567890123456789012345' } });
    expect(wrapper.find(`.${prefixTextArea}-element`).instance().innerHTML).toEqual('01234567890123456789012345');

    // 单独设置 maxLength，限制输入字数，但不显示下角标
    wrapper = mount(<TextArea maxLength={20} />)
    wrapper.find('textarea').simulate('change', { target: { value: '01234567890123456789012345' } });
    expect(wrapper.find(`.${prefixTextArea}-element`).instance().innerHTML).toEqual('01234567890123456789');
    expect(wrapper.find(`.${prefixTextArea}-element`).exists(`.${prefixTextArea}-count`)).toEqual(false);

    // 单独设置 showCount，显示下角标，角标显示统计的字数
    wrapper = mount(<TextArea showCount />)
    expect(wrapper.find(`.${prefixTextArea}-element`).find(`.${prefixTextArea}-count`).instance().innerHTML).toEqual('0');
    wrapper.find('textarea').simulate('change', { target: { value: 'newValue' } });
    expect(wrapper.find(`.${prefixTextArea}-element`).instance().innerHTML).toEqual('newValue');
    expect(wrapper.find(`.${prefixTextArea}-element`).find(`.${prefixTextArea}-count`).instance().innerHTML).toEqual('8');

    // 设置 maxLength + showCount，限制输入字数，显示下角标，角标显示 字数/最大输入数
    wrapper = mount(<TextArea maxLength={20} showCount />)
    expect(wrapper.find(`.${prefixTextArea}-element`).find(`.${prefixTextArea}-count`).instance().innerHTML).toEqual('0/20');
    wrapper.find('textarea').simulate('change', { target: { value: 'newValue' } });
    expect(wrapper.find(`.${prefixTextArea}-element`).instance().innerHTML).toEqual('newValue');
    expect(wrapper.find(`.${prefixTextArea}-element`).find(`.${prefixTextArea}-count`).instance().innerHTML).toEqual('8/20');
    wrapper.find('textarea').simulate('change', { target: { value: '01234567890123456789012345' } });
    expect(wrapper.find(`.${prefixTextArea}-element`).instance().innerHTML).toEqual('01234567890123456789');
    expect(wrapper.find(`.${prefixTextArea}-element`).find(`.${prefixTextArea}-count`).instance().innerHTML).toEqual('20/20');
  });

  it('should have correct clsPrefix, <test prop:: clsPrefix>', () => {
    wrapper = mount(<TextArea showCount />)
    const clsPrefix = 'clsPrefix-test'
    wrapper.setProps({ clsPrefix })
    expect(wrapper.exists(`.${prefixTextArea}`)).toEqual(false)
    expect(wrapper.find(`.${clsPrefix}-text-area`).find(`.${clsPrefix}-text-area-element`).find(`.${clsPrefix}-text-area-count`).instance().innerHTML).toEqual('0')
  });

  it('should have correct autoComplete, <test prop:: autoComplete>', () => {
    wrapper = mount(<TextArea />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('autoComplete')).toEqual(undefined);
    wrapper.setProps({ autoComplete: 'off' })
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('autoComplete')).toEqual('off');
    wrapper.setProps({ autoComplete: 'on' })
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('autoComplete')).toEqual('on');
  });

  it('should have correct class, <test prop:: disabled>, <test prop:: readOnly>', () => {
    wrapper = mount(<TextArea />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('disabled')).toEqual(undefined);
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('readOnly')).toEqual(undefined);

    wrapper = mount(<TextArea disabled={true} />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('disabled')).toEqual(true);
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('readOnly')).toEqual(undefined);

    wrapper = mount(<TextArea readOnly={true} />)
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('disabled')).toEqual(undefined);
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('readOnly')).toEqual(true);
  });

  it('should have correct autoFocus, <test prop:: autoFocus>', () => {
    const onFocus = jest.fn();
    wrapper = mount(<TextArea onFocus={onFocus} />)
    expect(onFocus).toHaveBeenCalledTimes(0);

    wrapper = mount(<TextArea onFocus={onFocus} autoFocus />)
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('isHTML test, <test prop:: isHTML>', () => {
    const htmlContent = '<p>This is an <strong>HTML</strong> content.</p>';
    wrapper = mount(<TextArea value={htmlContent} />);
    expect(wrapper.exists(`.${prefixTextArea}`)).toEqual(true);
    expect(wrapper.exists(`.html-content`)).toEqual(false);

    wrapper = mount(<TextArea value={htmlContent} isHTML />);
    expect(wrapper.exists(`.html-content`)).toEqual(true);
    expect(wrapper.find('.html-content').find('p').instance().innerHTML).toEqual('This is an <strong>HTML</strong> content.');
  });

  it('autoSize test, <test prop:: autoSize>', () => {
    wrapper = mount(<TextArea />);
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('style').height).toEqual('');
    expect(wrapper.exists(`.${prefixTextArea}-element-hidden`)).toEqual(false);

    wrapper = mount(<TextArea autoSize />);
    // expect(wrapper.find(`.${prefixTextArea}-element`).prop('style').height).toEqual('0px');
    expect(wrapper.exists(`.${prefixTextArea}-element-hidden`)).toEqual(true);

    wrapper = mount(<TextArea autoSize={{ minRows: 3, maxRows: 5 }} />);
    // expect(wrapper.find(`.${prefixTextArea}-element`).prop('style').height).toEqual('auto');
    expect(wrapper.exists(`.${prefixTextArea}-element-hidden`)).toEqual(true);
    expect(wrapper.find(`.${prefixTextArea}-element-hidden`).prop('rows')).toEqual(3);
  });

  // func test
  it('onChange test, <test prop:: onChange>', () => {
    const onChange = jest.fn();
    wrapper = mount(<TextArea onChange={onChange} />)
    expect(onChange).toHaveBeenCalledTimes(0);
    wrapper.find('textarea').simulate('change', { target: { value: '123' } });
    expect(onChange.mock.calls[0][0]).toBe('123');
  });

  it('onClick test, <test prop:: onClick>', () => {
    const onClick = jest.fn();
    wrapper = mount(<TextArea onClick={onClick} value="222" />)
    expect(onClick).toHaveBeenCalledTimes(0);
    wrapper.find('textarea').simulate('click');
    expect(onClick.mock.calls[0][0].target.innerHTML).toEqual('222')
  });

  it('onFocus && onBlur test, <test prop:: onFocus>, <test prop:: onBlur>', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    wrapper = mount(<TextArea onFocus={onFocus} onBlur={onBlur} value="value-d" />)
    expect(onFocus).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);

    wrapper.find('textarea').simulate('focus')
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus.mock.calls[0][0]).toBe('value-d');

    wrapper.find('textarea').simulate('blur')
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur.mock.calls[0][0]).toBe('value-d');
  });

  it('onCompositionStart test, <test prop:: onCompositionStart>', () => {
    const onCompositionStart = jest.fn();
    wrapper = mount(<TextArea onCompositionStart={onCompositionStart} value="11" data-testid="textarea"/>)
    expect(onCompositionStart).toHaveBeenCalledTimes(0);

    wrapper.find('textarea').simulate('compositionstart');
    expect(onCompositionStart).toHaveBeenCalledTimes(1);
    expect(onCompositionStart.mock.calls[0][0].target.innerHTML).toBe('11');
  });

  it('onCompositionEnd test, <test prop:: onCompositionEnd>', () => {
    const onCompositionEnd = jest.fn();
    wrapper = mount(<TextArea onCompositionEnd={onCompositionEnd} value="11" data-testid="textarea"/>)
    expect(onCompositionEnd).toHaveBeenCalledTimes(0);
    
    wrapper.find('textarea').simulate('compositionend');
    expect(onCompositionEnd).toHaveBeenCalledTimes(1);
    expect(onCompositionEnd.mock.calls[0][0].target.innerHTML).toBe('11');
  });

  it('onClickClear, <test prop:: onClickClear>', () => {
    const onClickClear = jest.fn();
    wrapper = mount(<TextArea onClickClear={onClickClear} showClose defaultValue='defaultValue' />);
    expect(onClickClear).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('value')).toEqual('defaultValue');
    wrapper.find('textarea').simulate('focus');
    wrapper.find(`.${prefixTextArea}-clear-box`).simulate('click')
    expect(wrapper.find(`.${prefixTextArea}-element`).prop('value')).toEqual(undefined);
    expect(onClickClear).toHaveBeenCalledTimes(1);
    expect(onClickClear.mock.calls[0][0]).toBe('defaultValue');
  });
});
