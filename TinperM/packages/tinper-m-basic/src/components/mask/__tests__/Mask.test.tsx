/** Mask.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { Mask } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';
import { render, fireEvent } from '@testing-library/react'

const prefixMask = `${muiPrefix}-mask`;

describe('Mask Component', () => {
  let wrapper;
  it('visible test, <test prop:: visible>', () => {
    wrapper = mount(<Mask />);
    expect(wrapper.exists(`.${prefixMask}`)).toEqual(true)

    wrapper = mount(<Mask visible={false}/>);
    expect(wrapper.getDOMNode()).toEqual(undefined)
  });
  it('className test, <test prop:: className>', () => {
    wrapper = mount(<Mask className='test-class'/>);
    expect(wrapper.find(`.${prefixMask}`).hasClass('test-class')).toEqual(true)
  });
  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const clsPrefix = 'clss'
    wrapper = mount(<Mask clsPrefix={clsPrefix}/>);
    expect(wrapper.exists(`.${clsPrefix}-mask`)).toEqual(true)
    expect(wrapper.exists(`.${prefixMask}`)).toEqual(false)
  });
  it('fieldid test, <test prop:: fieldid>', () => {
    const fieldid = 'fiee'
    wrapper = mount(<Mask fieldid={fieldid}/>);
    expect(wrapper.find(`.${prefixMask}`).prop('fieldid')).toEqual(`${fieldid}_mask`)
    expect(wrapper.find(`.${prefixMask}-content`).prop('fieldid')).toEqual(`${fieldid}_mask_content`)
  });
  it('color && opacity test, <test prop:: color>, <test prop:: opacity>', () => {
    wrapper = mount(<Mask />);
    expect(wrapper.find(`.${prefixMask}`).prop('style').background).toEqual('rgba(17, 17, 17, 0.5)')

    wrapper = mount(<Mask color='white'/>);
    expect(wrapper.find(`.${prefixMask}`).prop('style').background).toEqual('rgba(255, 255, 255, 0.5)')

    wrapper = mount(<Mask color='rgba(1, 1, 1, 0.1)'/>);
    expect(wrapper.find(`.${prefixMask}`).prop('style').background).toEqual('rgba(1, 1, 1, 0.1)')

    wrapper = mount(<Mask opacity='0.6'/>);
    expect(wrapper.find(`.${prefixMask}`).prop('style').background).toEqual('rgba(17, 17, 17, 0.6)')

    wrapper = mount(<Mask opacity='thin'/>);
    expect(wrapper.find(`.${prefixMask}`).prop('style').background).toEqual('rgba(17, 17, 17, 0.3)')

    wrapper = mount(<Mask opacity='thick'/>);
    expect(wrapper.find(`.${prefixMask}`).prop('style').background).toEqual('rgba(17, 17, 17, 0.8)')

    wrapper = mount(<Mask color='white' opacity='thick'/>);
    expect(wrapper.find(`.${prefixMask}`).prop('style').background).toEqual('rgba(255, 255, 255, 0.8)')
  });
  it('style test, <test prop:: style>', () => {
    wrapper = mount(<Mask style={{color: 'red'}}/>);
    expect(wrapper.find(`.${prefixMask}`).prop('style').color).toEqual('red')
  });
  it('children test, <test prop:: children>', () => {
    wrapper = mount(<Mask children={<div className="child-test">child-test-content</div>}/>);
    expect(wrapper.find(`.${prefixMask}-content`).find('.child-test').instance().innerHTML).toEqual('child-test-content')
  });
  it('getContainer test, <test prop:: getContainer>', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    // 模拟getContainer函数，返回我们的模拟容器
    const getContainerMock = jest.fn().mockImplementation(() => container);

    // 渲染Mask组件，并传入getContainerMock作为getContainer属性
    render(<Mask getContainer={getContainerMock} />);

    // 检查Mask的内容是否被渲染到了模拟容器中
    expect(container.querySelector(`.${prefixMask}`)).toBeInTheDocument();
  });
  it('forceRender && destroyOnClose, <test prop:: forceRender>, <test prop:: destroyOnClose>', async () => {
    // 内部逻辑大致为：
    // if (forceRender) return true
    // if (active) return true
    // return !destroyOnClose
    wrapper = mount(<Mask></Mask>)
    wrapper.setProps({ class: 'class', children: 'child-1' });
    expect(wrapper.find(`.${prefixMask}-content`).instance().innerHTML.includes('child-1')).toEqual(true);

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: false
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixMask}-content`).instance().innerHTML.includes('child-1')).toEqual(true);

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: false,
      destroyOnClose: true
    })
    await sleep(1000);
    expect(wrapper.exists(`.${prefixMask}-content`)).toEqual(false);

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: true,
      destroyOnClose: true
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixMask}-content`).instance().innerHTML.includes('child-1')).toEqual(true);

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: true,
      destroyOnClose: false
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixMask}-content`).instance().innerHTML.includes('child-1')).toEqual(true);
  });
});

// function test
describe('Mask Component', () => {
  let wrapper;
  it('onMaskClick test, <test prop:: onMaskClick>', () => {
    const onMaskClick = jest.fn();
    wrapper = mount(<Mask onMaskClick={onMaskClick}/>);
    expect(onMaskClick).toHaveBeenCalledTimes(0)
    wrapper.find(`.${prefixMask}`).simulate('click')
    expect(onMaskClick).toHaveBeenCalledTimes(1)
  });
  it('afterShow && afterClose test, <test prop:: afterShow>, <test prop:: afterClose>', async () => {
    const afterShow = jest.fn();
    const afterClose = jest.fn();
    wrapper = mount(
        <Mask afterShow={afterShow} afterClose={afterClose} />
    );
    expect(afterShow).toHaveBeenCalledTimes(0)
    expect(afterClose).toHaveBeenCalledTimes(0)
    wrapper.setProps({ visible: false });
    await sleep(1000)
    expect(afterShow).toHaveBeenCalledTimes(0)
    expect(afterClose).toHaveBeenCalledTimes(1)
    wrapper.setProps({ visible: true });
    await sleep(1000)
    expect(afterShow).toHaveBeenCalledTimes(1)
    expect(afterClose).toHaveBeenCalledTimes(1)
  });
});

// stopPropagation test
describe('Mask Component', () => {
  it('should stop propagation of specified events, <test prop:: stopPropagation>', () => {
    const onOuterClick = jest.fn();
    const onMaskClick = jest.fn();

    const { getByTestId } = render(
      <div onClick={onOuterClick}>
        <Mask stopPropagation={['click']} onMaskClick={onMaskClick} data-testid="mask" />
      </div>
    );

    const maskElement = getByTestId('mask');

    // 触发Mask上的点击事件
    fireEvent.click(maskElement);

    // 检查外部div的点击事件处理器是否被调用
    expect(onOuterClick).not.toHaveBeenCalled();

    // 检查Mask的点击事件处理器是否被调用
    expect(onMaskClick).toHaveBeenCalled();
  });

  it('should not stop propagation of unspecified events', () => {
    const onOuterClick = jest.fn();
    const onMaskClick = jest.fn();

    const { getByTestId } = render(
      <div onClick={onOuterClick}>
        <Mask stopPropagation={['mousedown']} onMaskClick={onMaskClick} data-testid="mask" />
      </div>
    );

    const maskElement = getByTestId('mask');

    // 触发Mask上的点击事件（click事件包含mousedown事件）
    fireEvent.click(maskElement);

    // 检查外部div的点击事件处理器是否被调用，因为只阻止了mousedown，所以click事件应该能够冒泡到外部div
    expect(onOuterClick).toHaveBeenCalled();

    // 检查Mask的点击事件处理器是否被调用
    expect(onMaskClick).toHaveBeenCalled();
  });
});
