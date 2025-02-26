/** CenterPopup.tsx */
import React, { useId } from 'react'
import { mount } from '@tests/mount'
import { CenterPopup, Button } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { cleanup, render, screen } from '@testing-library/react'
import { sleep } from '@utils/Sleeps';
import type { CenterPopupProps } from '../src'
import userEvent from "@testing-library/user-event";

const prefixCenterPopup = `${muiPrefix}-center-popup`;
const prefixMask = `${muiPrefix}-mask`;

const Popup0 = (options: any) => (
  <div id="root">
    <Button>
      打开浮框
    </Button>
    <CenterPopup
      getContainer={() => document.getElementById('root')}
      visible={true}
      {...options}
    >
    </CenterPopup>
  </div>
)

afterEach(() => {
  cleanup()
})

describe('CenterPopup Component', () => {
  let wrapper: any;
  beforeEach(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'container');
    document.body.appendChild(div);
    wrapper = mount(
      <Popup0 />, { attachTo: document.getElementById('container') }
    );

  })
  afterEach(() => {
    const div = document.getElementById('container');
    if (div) {
      document.body.removeChild(div);
    }
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  })

  it('center popup body test, <test prop:: bodyStyle>, <test prop:: bodyClassName>', () => {
    wrapper.setProps({
      bodyStyle: { color: 'red', height: 300 },
      bodyClassName: 'test-popup-body-class'
    });
    expect(wrapper.find(`.${prefixCenterPopup}-body`).hasClass('test-popup-body-class')).toEqual(true);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).props().style.color).toEqual('red');
    expect(wrapper.find(`.${prefixCenterPopup}-body`).props().style.height).toEqual('300px');
  });

  it('center popup mask test, <test prop:: maskStyle>, <test prop:: maskClassName>', () => {
    wrapper.setProps({
      maskStyle: { height: 302 },
      maskClassName: 'test-popup-mask-class'
    });
    expect(wrapper.find(`.${prefixCenterPopup}-mask`).hasClass('test-popup-mask-class')).toEqual(true);
    expect(wrapper.find(`.${prefixCenterPopup}-mask`).props().style.height).toEqual('302px');
  });

  it('center popup role test, <test prop:: role>', () => {
    wrapper.setProps({ role: 'role-test' });
    expect(wrapper.find(`.${prefixCenterPopup}-wrap`).prop('role')).toEqual('role-test');
  });

  it('getContainer test, <test prop:: getContainer>', async () => {
    wrapper.setProps({ className: 'class' });
    expect(wrapper.find('#root').exists(`.${prefixCenterPopup}`)).toEqual(true);

    wrapper.setProps({ className: 'class', getContainer: () => document.getElementById('0') });
    expect(wrapper.find('#root').exists(`.${prefixCenterPopup}`)).toEqual(false);
  });

  it('children test, <test prop:: children>', async () => {
    wrapper.setProps({ children: <span className="children-test">child</span> });
    expect(wrapper.find(`.${prefixCenterPopup}-body`).find('span').hasClass('children-test')).toEqual(true);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).find('span').instance().innerHTML).toEqual('child');
  });

  it('visible test, <test prop:: visible>', async () => {
    wrapper.setProps({ className: 'class' });
    expect(wrapper.find(`.${prefixCenterPopup}`).prop('style').display).toEqual('unset')

    wrapper.setProps({ visible: false, className: 'class' });
    await sleep(1000)
    expect(wrapper.find(`.${prefixCenterPopup}`).prop('style').display).toEqual('none')
  });

  it('showCloseButton test, <test prop:: showCloseButton>', () => {
    const onClose = jest.fn();
    wrapper.setProps({ showCloseButton: true, onClose: onClose });
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).find('a').hasClass(`${prefixCenterPopup}-close-icon`)).toEqual(true);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).find('a').hasClass(`${muiPrefix}-plain-anchor`)).toEqual(true);

    wrapper.find(`.${prefixCenterPopup}-close-icon`).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const cls = 'cls';
    wrapper.setProps({ clsPrefix: cls });
    expect(wrapper.exists(`.${prefixCenterPopup}`)).toEqual(false);
    expect(wrapper.exists(`.${cls}-center-popup`)).toEqual(true);
    expect(wrapper.exists(`.${prefixCenterPopup}-mask`)).toEqual(false);
    expect(wrapper.exists(`.${cls}-center-popup-mask`)).toEqual(true);
    expect(wrapper.exists(`.${prefixCenterPopup}-body`)).toEqual(false);
    expect(wrapper.exists(`.${cls}-center-popup-body`)).toEqual(true);
  });

  it('fieldid test, <test prop:: fieldid>', () => {
    const fieldid = 'test-fieldid';
    wrapper.setProps({ fieldid: fieldid, showCloseButton: true });
    expect(wrapper.find(`.${prefixCenterPopup}`).prop('fieldid')).toEqual(`${fieldid}_center_popup`);
    expect(wrapper.find(`.${prefixCenterPopup}`).find(`.${prefixMask}`).prop('fieldid')).toEqual(`${fieldid}_center_popup_mask`);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).prop('fieldid')).toEqual(`${fieldid}_center_popup_body`);
    expect(wrapper.find(`.${prefixCenterPopup}-close-icon`).prop('fieldid')).toEqual(`${fieldid}_center_popup_close_icon`);
  });

  it('closeOnMaskClick && onClose test, <test prop:: closeOnMaskClick>, <test prop:: onClose>, <test prop:: onMaskClick>', async () => {
    const onClose = jest.fn();
    const onMaskClick = jest.fn();
    wrapper.setProps({
      className: 'class',
      closeOnMaskClick: false,
      onClose: onClose,
      onMaskClick: onMaskClick
    });
    wrapper.find(`.${prefixMask}-aria-button`).simulate('click');
    await sleep(100);
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(onMaskClick).toHaveBeenCalledTimes(1);

    wrapper.setProps({ className: 'class', closeOnMaskClick: true, onClose: onClose, onMaskClick: onMaskClick });
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(onMaskClick).toHaveBeenCalledTimes(1);

    wrapper.find(`.${prefixMask}-aria-button`).simulate('click');
    await sleep(100);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onMaskClick).toHaveBeenCalledTimes(2);
  });

  it('afterClose && afterShow test, <test prop:: afterClose>, <test prop:: afterShow>', async () => {
    const afterShow = jest.fn();
    const afterClose = jest.fn();
    wrapper.setProps({
      afterShow: afterShow,
      afterClose: afterClose
    });

    expect(afterShow).toHaveBeenCalledTimes(0);
    expect(afterClose).toHaveBeenCalledTimes(0);

    wrapper.setProps({
      afterShow: afterShow,
      afterClose: afterClose,
      visible: false
    });
    await sleep(1000);
    expect(afterShow).toHaveBeenCalledTimes(0);
    expect(afterClose).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      afterShow: afterShow,
      afterClose: afterClose,
      visible: true
    });
    await sleep(1000);
    expect(afterShow).toHaveBeenCalledTimes(1);
    expect(afterClose).toHaveBeenCalledTimes(1);
  });

  it('onClick test, <test prop:: onClick>', async () => {
    const onClick = jest.fn();
    wrapper.setProps({ onClick: onClick });
    expect(onClick).toHaveBeenCalledTimes(0);

    wrapper.find(`.${prefixCenterPopup}`).simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forceRender && destroyOnClose, <test prop:: forceRender>, <test prop:: destroyOnClose>', async () => {
    // 内部逻辑大致为：
    // if (forceRender) return true
    // if (active) return true
    // return !destroyOnClose
    wrapper.setProps({ class: 'class', children: 'child-1' });
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toEqual('child-1');

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: false
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toEqual('child-1');

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: false,
      destroyOnClose: true
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toEqual('');

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: true,
      destroyOnClose: true
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toEqual('child-1');

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: true,
      destroyOnClose: false
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toEqual('child-1');
  });
});

describe('<test prop:: stopPropagation>', () => {
  const renderPopover = (props: Partial<CenterPopupProps> = {}) => {
    const onBubble = jest.fn()
    let fieldid: string;
    const App = () => {
      fieldid = useId()
      return (
        <div onClick={onBubble} id="ww">
          <CenterPopup
            content={'popoup'}
            visible={true}
            fieldid={fieldid}
            {...props}
          >
            <button>Open CenterPopup</button>
          </CenterPopup>
        </div>
      )
    }
    const { container, baseElement } = render(
      <App />
    );
    return {
      container,
      baseElement,
      element: container.firstChild?.firstChild,
      user: userEvent.setup(),
      trigger: screen.getByRole('button', { name: /open centerpopup/i }),
      getFloating: () => screen.getByRole('tooltip'),
      queryFloating: () => screen.queryByRole('tooltip'),
      onBubble
    }
  };

  it('should prevent event bubbling ', async () => {
    const { onBubble, getFloating, user } = renderPopover({ visible: true });

    await user.click(getFloating());

    expect(onBubble).not.toHaveBeenCalled()
  });

  it('should bubble when stopPropagation is empty', async () => {
    const { onBubble, getFloating, user } = renderPopover({ visible: true, stopPropagation: [] });

    await user.click(getFloating());

    expect(onBubble).toHaveBeenCalled()
  });
})

// jest.mock('@hooks/UseLockScroll', () => ({
//   useLockScroll: jest.fn(),
// }))

// describe('<test prop:: disableBodyScroll>', () => {
//   it('should disable body scroll when disableBodyScroll is true', () => {
//     const { useLockScroll } = require('@hooks/UseLockScroll')
//     render(<CenterPopup visible={true} disableBodyScroll={true} />)
//     // 检查是否正确调用了 useLockScroll 并传入了期望的参数
//     expect(useLockScroll).toHaveBeenCalledWith(expect.anything(), true)
//   })

//   it('should allow body scroll when disableBodyScroll is false', () => {
//     const { useLockScroll } = require('@hooks/UseLockScroll')
//     render(<CenterPopup visible={true} disableBodyScroll={false} />)
//     // 检查是否正确调用了 useLockScroll 并传入了期望的参数
//     expect(useLockScroll).toHaveBeenCalledWith(expect.anything(), false)
//   })
// })
