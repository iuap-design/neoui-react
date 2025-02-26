/** Dialog.tsx */
import React, { useId } from 'react'
import { mount } from '@tests/mount'
import { Dialog, Button } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { cleanup, render, screen } from '@testing-library/react'
import { sleep } from '@utils/Sleeps';
import type { DialogProps } from '../src'
import userEvent from "@testing-library/user-event";

const prefixDialog = `${muiPrefix}-dialog`;
const prefixMask = `${muiPrefix}-mask`;
const prefixCenterPopup = `${muiPrefix}-center-popup`;

const Dialog0 = (options: any) => (
  <div id="root">
    <Button>
      打开对话框
    </Button>
    <Dialog
      getContainer={() => document.getElementById('root')}
      visible={true}
      {...options}
    >
    </Dialog>
  </div>
)

afterEach(() => {
  cleanup()
})

describe('Dialog Component', () => {
  let wrapper: any;
  beforeEach(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'container');
    document.body.appendChild(div);
    wrapper = mount(
      <Dialog0 />, { attachTo: document.getElementById('container') }
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

  it('dialog body test, <test prop:: bodyStyle>, <test prop:: bodyClassName>', () => {
    wrapper.setProps({
      bodyStyle: { color: 'red', height: 300 },
      bodyClassName: 'test-dialog-body-class'
    });
    expect(wrapper.find(`.${prefixDialog}-body`).hasClass('test-dialog-body-class')).toEqual(true);
    expect(wrapper.find(`.${prefixDialog}-body`).props().style.color).toEqual('red');
    expect(wrapper.find(`.${prefixDialog}-body`).props().style.height).toEqual('300px');
  });

  it('header && fieldid test, <test prop:: header>, <test prop:: fieldid>', () => {
    wrapper.setProps({
      header: <div className="dialog-header-test">header-test</div>,
      fieldid: 'header-fieldid-test'
    });
    expect(wrapper.find(`.${prefixDialog}-header`).exists(`.dialog-header-test`)).toEqual(true);
    expect(wrapper.find(`.${prefixDialog}-header`).prop('fieldid')).toEqual('header-fieldid-test_dialog_header');
    expect(wrapper.find(`.dialog-header-test`).instance().innerHTML).toEqual("header-test");
  });

  it('title && fieldid test, <test prop:: title>, <test prop:: fieldid>', () => {
    wrapper.setProps({
      title: <div className="dialog-title-test">title-test</div>,
      fieldid: 'title-fieldid-test'
    });
    expect(wrapper.find(`.${prefixDialog}-title`).exists(`.dialog-title-test`)).toEqual(true);
    expect(wrapper.find(`.${prefixDialog}-title`).prop('fieldid')).toEqual('title-fieldid-test_dialog_title');
    expect(wrapper.find(`.dialog-title-test`).instance().innerHTML).toEqual("title-test");
  });

  it('content test, <test prop:: content>', () => {
    wrapper.setProps({
      content: <div className="dialog-content-test">content-test</div>
    });
    expect(wrapper.find(`.${prefixDialog}-content`).exists(`.dialog-content-test`)).toEqual(true);
    expect(wrapper.find(`.dialog-content-test`).instance().innerHTML).toEqual("content-test");

    wrapper.setProps({
      content: 'string-content'
    });
    expect(wrapper.find(`.${prefixDialog}-content`).find(`.${prefixDialog}-content-center-c`).instance().innerHTML).toEqual('string-content');
  });

  it('footer test, <test prop:: footer>', () => {
    wrapper.setProps({
      footer: <div className="dialog-footer-test">footer-test</div>
    });
    expect(wrapper.find(`.${prefixDialog}-footer`).exists(`.dialog-footer-test`)).toEqual(true);
    expect(wrapper.find(`.dialog-footer-test`).instance().innerHTML).toEqual("footer-test");
  });

  it('fieldid test, <test prop:: fieldid>', () => {
    const fieldid = 'fieldid-test'
    wrapper.setProps({ fieldid: fieldid });
    expect(wrapper.find(`.${prefixDialog}`).prop('fieldid')).toEqual(`${fieldid}_dialog_center_popup`);
    expect(wrapper.find(`.${prefixMask}`).prop('fieldid')).toEqual(`${fieldid}_dialog_center_popup_mask`);
    expect(wrapper.find(`.${prefixDialog}-content`).prop('fieldid')).toEqual(`${fieldid}_dialog_content`);
    expect(wrapper.find(`.${prefixDialog}-footer`).prop('fieldid')).toEqual(`${fieldid}_dialog_footer`);
    expect(wrapper.find(`.${prefixDialog}-footer-custom`).prop('fieldid')).toEqual(`${fieldid}_dialog_footer_custom`);
  });

  it('image && fieldid test, <test prop:: image>', () => {
    wrapper.setProps({ image: '../../image/demos/image-demo.png', fieldid: 'image-test-fieldid' });
    expect(wrapper.exists(`.${prefixDialog}-image-container`)).toEqual(true);
    expect(wrapper.find(`.${prefixDialog}-image-container`).prop('fieldid')).toEqual('image-test-fieldid_dialog_image_container');
    expect(wrapper.find(`.${prefixDialog}-image-container`).find('img').prop('fieldid')).toEqual('image-test-fieldid_dialog_image_img');
  });

  it('maskStyle && maskClassName test, <test prop:: maskStyle>, <test prop:: maskClassName>', () => {
    wrapper.setProps({
      maskStyle: { color: 'red' },
      maskClassName: 'test-mask-class',
    });
    expect(wrapper.find(`.${prefixMask}`).hasClass('test-mask-class')).toEqual(true);
    expect(wrapper.find(`.${prefixMask}`).prop('style').color).toEqual('red');
  });

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const cls = 'cls';
    wrapper.setProps({ clsPrefix: cls });
    expect(wrapper.exists(`.${prefixDialog}`)).toEqual(false);
    expect(wrapper.exists(`.${cls}-dialog`)).toEqual(true);
    expect(wrapper.exists(`.${prefixDialog}-footer`)).toEqual(false);
    expect(wrapper.exists(`.${cls}-dialog-footer`)).toEqual(true);
    expect(wrapper.exists(`.${prefixDialog}-body`)).toEqual(false);
    expect(wrapper.exists(`.${cls}-dialog-body`)).toEqual(true);
  });

  it('visible test, <test prop:: visible>', async () => {
    wrapper.setProps({ className: 'class' });
    expect(wrapper.find(`.${prefixDialog}`).prop('style').display).toEqual('unset')

    wrapper.setProps({ visible: false, className: 'class' });
    await sleep(1000)
    expect(wrapper.find(`.${prefixDialog}`).prop('style').display).toEqual('none')
  });

  it('closeOnMaskClick && onClose test, <test prop:: closeOnMaskClick>, <test prop:: onClose>', async () => {
    const onClose = jest.fn();
    wrapper.setProps({
      className: 'class',
      closeOnMaskClick: false,
      onClose: onClose
    });
    wrapper.find(`.${prefixMask}-aria-button`).simulate('click');
    await sleep(100);
    expect(onClose).toHaveBeenCalledTimes(0);

    wrapper.setProps({ className: 'class', closeOnMaskClick: true, onClose: onClose });
    expect(onClose).toHaveBeenCalledTimes(0);

    wrapper.find(`.${prefixMask}-aria-button`).simulate('click');
    await sleep(100);
    expect(onClose).toHaveBeenCalledTimes(1);
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

  it('actions && onAction && closeOnAction test, <test prop:: actions>, <test prop:: onAction>, <test prop:: closeOnAction>', async () => {
    const onAction = jest.fn();
    const onClose = jest.fn();
    wrapper.setProps({
      fieldid: 'fieldid-test',
      onAction: onAction,
      onClose: onClose,
      closeOnAction: true,
      actions: [
        {
          key: 'action0',
          text: '操作一',
          primary: true
        },
        {
          key: 'action1',
          text: '操作二'
        },
        {
          key: 'action2',
          text: '操作三'
        }
      ],
    });
    expect(onAction).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(0).prop('fieldid')).toEqual('fieldid-test_dialog_action_0_0');
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(0).hasClass(`${muiPrefix}-button-primary`)).toEqual(false);
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(0).hasClass(`${prefixDialog}-button-primary`)).toEqual(true);
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(0).find('span').instance().innerHTML).toEqual('操作一');
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(1).prop('fieldid')).toEqual('fieldid-test_dialog_action_1_0');
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(1).hasClass(`${muiPrefix}-button-primary`)).toEqual(false);
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(1).find('span').instance().innerHTML).toEqual('操作二');
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(2).prop('fieldid')).toEqual('fieldid-test_dialog_action_2_0');
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(2).hasClass(`${muiPrefix}-button-primary`)).toEqual(false);
    expect(wrapper.find(`.${prefixDialog}-footer`).find('button').at(2).find('span').instance().innerHTML).toEqual('操作三');

    wrapper.find(`.${prefixDialog}-footer`).find('button').at(1).simulate('click');
    await sleep(100);
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onAction.mock.calls[0][0].key).toEqual('action1');
    expect(onAction.mock.calls[0][0].text).toEqual('操作二');
  });

  it('getContainer test, <test prop:: getContainer>', async () => {
    wrapper.setProps({ className: 'class' });
    expect(wrapper.find('#root').exists(`.${prefixDialog}`)).toEqual(true);

    wrapper.setProps({ className: 'class', getContainer: () => document.getElementById('0') });
    expect(wrapper.find('#root').exists(`.${prefixDialog}`)).toEqual(false);
  });

  it('destroyOnClose test, <test prop:: destroyOnClose>', async () => {
    wrapper.setProps({ className: 'class', visible: false, destroyOnClose: false });
    await sleep(1000);
    expect(wrapper.find(`.${prefixDialog}-body`).instance().innerHTML).toBeTruthy();

    wrapper.setProps({ className: 'class', visible: false, destroyOnClose: true });
    await sleep(1000);
    expect(wrapper.find(`.${prefixDialog}-body`).instance().innerHTML).toBeFalsy();
  });

  it('forceRender && destroyOnClose, <test prop:: forceRender>, <test prop:: destroyOnClose>', async () => {
    // 内部逻辑大致为：
    // if (forceRender) return true
    // if (active) return true
    // return !destroyOnClose
    wrapper.setProps({ class: 'class', children: 'child-1' });
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toBeTruthy();

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: false
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toBeTruthy();

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: false,
      destroyOnClose: true
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toBeFalsy();

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: true,
      destroyOnClose: true
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toBeTruthy();

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: true,
      destroyOnClose: false
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixCenterPopup}-body`).instance().innerHTML).toBeTruthy();
  });
});

//`alert`、 `confirm`、`show`
describe('Dialog.method()', () => {
  it('alert', async () => {
    const wrapper = mount(
      <div id="root">
        <button
          onClick={() => {
            Dialog.alert({
              fieldid: 'fieldid-dialog-0',
              content: '确定要清空已选商品吗？',
              confirmText: '主操作',
              getContainer: () => document.getElementById('root')
            });
          }}
        >
          btn
        </button>
      </div>
    )
    wrapper.find('button').simulate('click')
    await sleep(100);
    const temp = document.getElementsByClassName(`${muiPrefix}-center-popup-wrap`)[0];
    expect(temp.getElementsByClassName(`${prefixDialog}-content-center-c`)[0].innerHTML).toBe("确定要清空已选商品吗？");
    expect(temp.getElementsByClassName(`${prefixDialog}-button-primary`)[0].getElementsByTagName('span')[0].innerHTML).toBe("主操作");
  });

  it('confirm', async () => {
    const wrapper = mount(
      <div id="root1">
        <button
          onClick={() => {
            Dialog.confirm({
              content: '确定要清空已选商品吗1？',
              getContainer: () => document.getElementById('root1')
            });
          }}
        >
          btn
        </button>
      </div>
    )
    wrapper.find('button').simulate('click')
    await sleep(100);
    const temp = document.getElementsByClassName(`${muiPrefix}-center-popup-wrap`)[0];
    expect(temp.getElementsByClassName(`${prefixDialog}-content-center-c`)[0].innerHTML).toBe("确定要清空已选商品吗1？");
    expect(temp.getElementsByClassName(`${prefixDialog}-button-primary`)[0].getElementsByTagName('span')[0].innerHTML).toBe("确定");
    expect(temp.getElementsByClassName(`${prefixDialog}-button`)[0].getElementsByTagName('span')[0].innerHTML).toBe("取消");
  });

  it('show', async () => {
    const wrapper = mount(
      <div id="root2">
        <button
          onClick={() => {
            Dialog.show({
              content: '确定要清空已选商品吗2？',
              getContainer: () => document.getElementById('root2')
            });
          }}
        >
          btn
        </button>
      </div>
    )
    wrapper.find('button').simulate('click')
    await sleep(100);
    const temp = document.getElementsByClassName(`${muiPrefix}-center-popup-wrap`)[0];
    expect(temp.getElementsByClassName(`${prefixDialog}-content-center-c`)[0].innerHTML).toBe("确定要清空已选商品吗2？");
    expect(temp.getElementsByClassName(`${muiPrefix}-button`)[0]).toBeFalsy();
  });
});

describe('<test prop:: stopPropagation>', () => {
  const renderPopover = (props: Partial<DialogProps> = {}) => {
    const onBubble = jest.fn()
    let fieldid: string;
    const App = () => {
      fieldid = useId()
      return (
        <div onClick={onBubble} id="ww">
          <Dialog
            content={'popoup'}
            visible={true}
            fieldid={fieldid}
            {...props}
          >
          </Dialog>
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
      trigger: screen.getByRole('dialog'),
      getFloating: () => screen.getByRole('dialog'),
      queryFloating: () => screen.queryByRole('dialog'),
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
//     render(<Dialog visible={true} disableBodyScroll={true} />)
//     // 检查是否正确调用了 useLockScroll 并传入了期望的参数
//     expect(useLockScroll).toHaveBeenCalledWith(expect.anything(), true)
//   })

//   it('should allow body scroll when disableBodyScroll is false', () => {
//     const { useLockScroll } = require('@hooks/UseLockScroll')
//     render(<Dialog visible={true} disableBodyScroll={false} />)
//     // 检查是否正确调用了 useLockScroll 并传入了期望的参数
//     expect(useLockScroll).toHaveBeenCalledWith(expect.anything(), false)
//   })
// })
