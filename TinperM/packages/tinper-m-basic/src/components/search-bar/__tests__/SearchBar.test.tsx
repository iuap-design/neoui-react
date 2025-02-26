/** SearchBar.tsx */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Search from '../src/index'
import { mount } from '@tests/mount'
import IconScanning from '@tinper/m-icons/lib/cjs/IconScanning'
import PlusCircle from '@tinper/m-icons/lib/cjs/PlusCircle'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';
import SearchBar from '../src/SearchBar'

const prefixSearchBar = `${muiPrefix}-search`;

describe('Search Component', () => {
  it('component: Search, <test prop:: fieldid>, <test prop:: className>, <test prop:: clsPrefix>, <test prop:: style>', () => {
    const fieldid = 'Search_test'
    const classname = 'SearchTestClass'
    const classPrefix = 'test-mui'
    const comp = <Search fieldid={fieldid} clsPrefix={classPrefix} className={classname} style={{ '--background': '#EEE' }} />
    const wrapper = render(comp)
    const element = wrapper.container.querySelector(`[fieldid="${fieldid}"]`);
    expect(element).toBeInTheDocument();

    expect(wrapper.container.querySelector(`[class="${classPrefix}-search ${classname}"]`)).toBeInTheDocument();

    expect(element).toHaveStyle('--background: #EEE');
  });
  it('component: Search, <test prop:: value>, <test prop:: placeholder>, <test prop:: maxLength>', () => {
    const comp = <Search value='搜索单元测试' placeholder='testPlaceholder' maxLength={6} />
    const wrapper = mount(comp)
    expect(wrapper.find('input').prop('value')).toEqual('搜索单元测试');

    expect(wrapper.find('input').prop('placeholder')).toEqual('testPlaceholder');

    expect(wrapper.find('input').prop('maxlength')).toEqual('6');
  });
  it('component: Search, <test prop:: defaultValue>', () => {
    const wrapper = mount(<Search defaultValue='defaultValue-test' />)
    expect(wrapper.find('input').prop('value')).toEqual('defaultValue-test');
  });
  it('component: Search, <test prop:: disabled>', () => {
    const comp = <Search disabled />
    const wrapper = render(comp)
    const element = wrapper.container.querySelector(`[class="mui-search-input mui-input mui-input-wrapper-disabled"]`);
    expect(element).toBeInTheDocument();
  });
  it('component: Search, <test prop:: showCancelButton>, <test prop:: cancelText>, <test prop:: clearOnCancel>, <test prop:: clearable>', async () => {
    const comp = <Search defaultValue='123' clearOnCancel showCancelButton={() => true} cancelText='消失' clearable={false} />
    const { container, getByText } = render(comp)
    const element = container.querySelector(`[class="mui-button mui-button-middle mui-button-text mui-search-cancel-btn"]`) as HTMLButtonElement;
    expect(element).toBeInTheDocument();

    const elementText = getByText('消失');
    expect(elementText).toBeInTheDocument();

    const elementClear = container.querySelector(`[class="mui-input-clear-box"]`);
    expect(elementClear).toHaveStyle('display: none');

    const elementInput = container.querySelector(`[class="mui-input-box"]`);
    expect(elementInput).toHaveValue('123');

    fireEvent.click(element);
    expect(elementInput).toHaveValue('');
  });
  it('component: Search, <test prop:: leftIcon>, <test prop:: rightIcon>', () => {
    const comp = <Search leftIcon={<IconScanning />} rightIcon={<PlusCircle />}/>
    const wrapper = render(comp)
    const elementLeft = wrapper.container.querySelector(`[id="arcicon-scanning"]`);
    expect(elementLeft).toBeInTheDocument();

    const elementRight = wrapper.container.querySelector(`[id="arcplus-circle"]`);
    expect(elementRight).toBeInTheDocument();
  });
  it('component: Search, <test prop:: leftIcon>, <test prop:: rightIcon>, <test prop:: isRightIn>', () => {
    const comp = <Search isRightIn rightIcon={<PlusCircle />}/>
    const wrapper = render(comp)
    const elementRight = wrapper.container.querySelector(`[class="mui-search-right mui-search-right-in"]`);
    expect(elementRight).toBeInTheDocument();
  });
})

describe('Search Component Events', () => {
  it('Search Event Test, <test prop:: onLeftIconClick>, <test prop:: onRightIconClick>', () => {
    const leftClick = jest.fn();
    const rightClick = jest.fn();
    const comp = <Search onLeftIconClick={leftClick} onRightIconClick={rightClick}/>
    const wrapper = render(comp)
    const elementLeft = wrapper.container.querySelector(`[id="arcsearch"]`);
    elementLeft && fireEvent.click(elementLeft);
    expect(leftClick.mock.calls.length).toEqual(1);

    const elementRight = wrapper.container.querySelector(`[id="arcicon-scanning"]`);
    elementRight && fireEvent.click(elementRight);
    expect(rightClick.mock.calls.length).toEqual(1);
  });
  it('Search Event Test, <test prop:: onSubmit>', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Search onSubmit={onSubmit} />);
    wrapper.find('input').simulate('focus');
    expect(onSubmit).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('keydown', { keyCode: 14 })
    expect(onSubmit).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('keydown', { keyCode: 13 })
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
  it('Search Event Test, <test prop:: onSearch>', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<Search onSearch={onSearch} />);
    wrapper.find('input').simulate('focus');
    expect(onSearch).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('keydown', { keyCode: 14 })
    expect(onSearch).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('keydown', { keyCode: 13 })
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
  it('Search Event Test, <test prop:: onChange>', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Search onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('change', { target: { value: 'newValue' } })
    expect(onChange.mock.calls[0][0]).toBe('newValue');
  });
  it('Search Event Test, <test prop:: onFocus>, <test prop:: onBlur>', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const wrapper = mount(<Search onFocus={onFocus} onBlur={onBlur} defaultValue='defaultValue' />);
    expect(onFocus).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(wrapper.find('input').prop('value')).toEqual('defaultValue');

    wrapper.find('input').simulate('blur');
    await sleep(200)
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(wrapper.find('input').prop('value')).toEqual('defaultValue');
  });

  it('Search Event Test, <test prop:: onClear>', () => {
    const onClickClear = jest.fn();
    const wrapper = mount(<Search onClear={onClickClear} defaultValue='defaultValue' />);
    expect(onClickClear).toHaveBeenCalledTimes(0);
    expect(wrapper.find('input').prop('value')).toEqual('defaultValue');

    wrapper.find(`.mui-input-clear-box`).simulate('click')
    expect(wrapper.find('input').prop('value')).toEqual('');
    expect(onClickClear).toHaveBeenCalledTimes(1);
    expect(onClickClear.mock.calls[0][0]).toBe('defaultValue');
  });

  it('Search Event Test, <test prop:: onCancel>', () => {
    const onCancel = jest.fn();
    const wrapper = mount(<Search onCancel={onCancel} showCancelButton={() => true} />);
    expect(onCancel).toHaveBeenCalledTimes(0);
    wrapper.find(`.${prefixSearchBar}-cancel-btn`).simulate('click')
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('Search Props Test: onlyShowClearWhenFocus, <test prop:: onlyShowClearWhenFocus>', async () => {
    const prefixInput = 'mui-input';
    let wrapper = mount(<SearchBar clearable defaultValue="test" />);
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('none');
    wrapper.find('input').simulate('focus');
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('input').simulate('blur');
    await sleep(1000)
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('none');

    wrapper = mount(<SearchBar clearable onlyShowClearWhenFocus={false} defaultValue="test" />);
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('input').simulate('focus');
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('flex');
    wrapper.find('input').simulate('blur');
    await sleep(1000)
    expect(wrapper.find(`.${prefixInput}-clear-box`).prop('style').display).toEqual('flex');
  });

  it('Search Props Test: autoFocus, <test prop:: autoFocus>', async () => {
    const onFocus = jest.fn();
    mount(<SearchBar onFocus={onFocus} autoFocus defaultValue="test" />);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
})
