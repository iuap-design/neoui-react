/** ToolBar.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { ToolBar, Button } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';

const prefixToolBar = `${muiPrefix}-toolbar`;
const prefixPopover = `${muiPrefix}-popover`;
const prefixActionSheet = `${muiPrefix}-action-sheet`;

describe('ToolBar Component', () => {
  let wrapper;
  it('should have correct className, <test prop:: className>', () => {
    wrapper = mount(<ToolBar className="toolbar-test-class" />)
    expect(wrapper.find(`.${prefixToolBar}`).hasClass('toolbar-test-class')).toEqual(true);
  });

  it('direction test, <test prop:: direction>', () => {
    const wrapper = mount(<ToolBar />);
    expect(wrapper.find(`.${prefixToolBar}`).prop('style').textAlign).toEqual('right');

    wrapper.setProps({ direction: 'left' });
    expect(wrapper.find(`.${prefixToolBar}`).prop('style').textAlign).toEqual('left');

    wrapper.setProps({ direction: 'right' });
    expect(wrapper.find(`.${prefixToolBar}`).prop('style').textAlign).toEqual('right');
  });

  it('should have correct style, <test prop:: style>', () => {
    wrapper = mount(<ToolBar style={{ color: 'red' }} />)
    expect(wrapper.find(`.${prefixToolBar}`).prop('style').color).toEqual('red');
  });

  it('should have correct fieldid, <test prop:: fieldid>', () => {
    const fieldid = 'fieldid-id';
    wrapper = mount(
      <ToolBar className="toolbar-demo0" fieldid={fieldid} maxVisibleNum={5}>
        <Button mode='default' size='middle' className='button0'>取消</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
      </ToolBar>
    );
    expect(wrapper.find(`.${prefixToolBar}`).prop('fieldid')).toEqual(`${fieldid}_toolbar`);
    expect(wrapper.find(`.${prefixToolBar}`).find(`.${prefixToolBar}-item`).at(0).prop('fieldid')).toEqual(`${fieldid}_toolbar_item_0`);
    expect(wrapper.find(`.${prefixToolBar}`).find(`.${prefixToolBar}-item`).at(1).prop('fieldid')).toEqual(`${fieldid}_toolbar_item_1`);
    expect(wrapper.find(`.${prefixToolBar}`).find(`.${prefixToolBar}-item`).at(2).prop('fieldid')).toEqual(`${fieldid}_toolbar_item_2`);
    expect(wrapper.find(`.${prefixToolBar}`).find(`.${prefixToolBar}-item`).at(3).prop('fieldid')).toEqual(`${fieldid}_toolbar_item_3`);
  });

  it('should have correct clsPrefix, <test prop:: clsPrefix>', () => {
    wrapper = mount(<ToolBar clsPrefix='prefix-test' />)
    expect(wrapper.exists(`.${prefixToolBar}`)).toEqual(false);
    expect(wrapper.find(`.prefix-test-toolbar`).hasClass(`prefix-test-toolbar-wrapper`)).toEqual(true);
  });

  it('should have correct mode && maxVisibleNum, <test prop:: mode>, <test prop:: maxVisibleNum>', () => {
    wrapper = mount(<ToolBar />)
    expect(wrapper.find(`.${prefixToolBar}`).prop('mode')).toEqual('popup');

    wrapper = mount(
      <ToolBar mode='popup' maxVisibleNum={1}>
        <Button mode='default' size='middle' className='button0'>取消</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
      </ToolBar>
    );
    expect(wrapper.find(`.${prefixToolBar}`).prop('mode')).toEqual('popup');
    expect(wrapper.find(`.${prefixToolBar}-item`).at(1).hasClass(`${prefixToolBar}-item-more`)).toEqual(false);

    wrapper = mount(
      <ToolBar mode='popover' maxVisibleNum={3}>
        <Button mode='default' size='middle' className='button0'>取消</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
      </ToolBar>
    );
    // expect(wrapper.find(`.${prefixToolBar}`).prop('mode')).toEqual('popover');
    // expect(wrapper.find(`.${prefixToolBar}-item`).at(3).hasClass(`${prefixToolBar}-item-more`)).toEqual(true);
  });

  it('onSelect test, <test prop:: onSelect>', async () => {
    const onSelect = jest.fn();
    wrapper = mount(
      <ToolBar mode='popover' maxVisibleNum={3} onSelect={onSelect} >
        <Button mode='default' size='middle' className='button0'>取消</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
        <Button mode='default' size='middle' className='button1'>保存并新增</Button>
        <span>多余按钮0</span>
        <Button mode='default' size='middle' className='button1'>多余按钮1</Button>
      </ToolBar>
    );

    expect(wrapper.exists(`.${prefixToolBar}-item-more-item`)).toEqual(false);

    // wrapper.find(`.${prefixToolBar}-item-more`).simulate('click');
    // expect(wrapper.find(`.${prefixPopover}`).find(`.${prefixToolBar}-item-more-item`).at(0).find('span').instance().innerHTML).toEqual('多余按钮0');
    // expect(wrapper.find(`.${prefixPopover}`).find(`.${prefixToolBar}-item-more-item`).at(1).find('span').instance().innerHTML).toEqual('多余按钮1');
    // expect(wrapper.find(`.${prefixPopover}`).hasClass(`${prefixPopover}-hidden`)).toEqual(false);
    // expect(onSelect).toHaveBeenCalledTimes(0);

    // wrapper.find(`.${prefixPopover}`).find(`.${prefixToolBar}-item-more-item`).at(0).simulate('click');
    // expect(wrapper.find(`.${prefixPopover}`).hasClass(`${prefixPopover}-hidden`)).toEqual(true);
    // expect(onSelect).toHaveBeenCalledTimes(1);

    // // 顺便测试onBlur时，popover会隐藏
    // wrapper.find(`.${prefixToolBar}-item-more`).simulate('click');
    // expect(wrapper.find(`.${prefixPopover}`).hasClass(`${prefixPopover}-hidden`)).toEqual(false);
    // wrapper.find(`.${prefixToolBar}-item-more`).simulate('blur');
    // await sleep(1000);
    // expect(wrapper.find(`.${prefixPopover}`).hasClass(`${prefixPopover}-hidden`)).toEqual(true);
  });

  ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'].forEach((item) => {
    it('placement test, <test prop:: placement>', () => {
      wrapper = mount(
        <ToolBar
          placement={item}
          mode='popover'
          maxVisibleNum={1}
        >
          <Button mode='default' size='middle'>添加</Button>
          <Button mode='default' size='middle'>取消</Button>
          <Button mode='default' size='middle'>继续添加</Button>
        </ToolBar>
      );
      expect(wrapper.find(`.${prefixToolBar}`).prop('placement')).toEqual(item);
    })
  });

  it('should have correct children, <test prop:: children>', () => {
    // children为非数组测试
    wrapper = mount(
      <ToolBar
        fieldid="fieldid-id"
        children={
          <>
            <Button mode='default' size='middle' className='button0'>取消</Button>
            <Button mode='default' size='middle' className='button1'>保存并新增</Button>
            <Button mode='default' size='middle' className='button1'>保存并新增</Button>
          </>
        }
      />
    );
    expect(wrapper.find(`.${prefixToolBar}-item`).prop('fieldid')).toEqual('fieldid-id_toolbar_children');
  });

  it('onDotClick test, <test prop:: onDotClick>', () => {
    const onDotClick = jest.fn();
    wrapper = mount(
      <ToolBar
        onDotClick={onDotClick}
        maxVisibleNum={1}
      >
        <Button mode='default' size='middle'>添加</Button>
        <Button mode='default' size='middle'>取消</Button>
        <Button mode='default' size='middle'>继续添加</Button>
      </ToolBar>
    );
    // expect(onDotClick).toHaveBeenCalledTimes(0);
    // wrapper.find(`.${prefixToolBar}-item-more`).simulate('click');
    // expect(onDotClick).toHaveBeenCalledTimes(1);
  });

  it('cancelText test, <test prop:: cancelText>', () => {
    wrapper = mount(
      <ToolBar
        mode="popup"
        maxVisibleNum={1}
        cancelText="ttt"
      >
        <Button mode='default' size='middle'>添加</Button>
        <Button mode='default' size='middle'>取消</Button>
        <Button mode='default' size='middle'>继续添加</Button>
      </ToolBar>
    );
    // wrapper.find(`.${prefixToolBar}-item-more-span`).simulate('click');
    // expect(wrapper.find(`.${prefixActionSheet}-cancel`).find(`.${prefixActionSheet}-button-item-name`).instance().innerHTML).toEqual('ttt');
  })
});
