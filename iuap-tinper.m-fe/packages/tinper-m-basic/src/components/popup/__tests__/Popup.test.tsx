/** Popup.tsx */
import React, { useId } from 'react'
import { mount } from '@tests/mount'
import { Popup, Button } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { sleep } from '@utils/Sleeps';
import type { PopupProps } from '../src'
import userEvent from '@testing-library/user-event';

const prefixPopup = `${muiPrefix}-popup`;
const prefixMask = `${muiPrefix}-mask`;
const prefixButton = `${muiPrefix}-button`;

const mockDrag = async (el: Element, options: any[], time?: number) => {
  const [downOptions, ...moveOptions] = options
  fireEvent.mouseDown(el, {
    buttons: 1,
    ...downOptions,
  })
  for (const item of moveOptions) {
    fireEvent.mouseMove(el, {
      buttons: 1,
      ...item,
    })

    if (time) {
      await sleep(time)
    }
  }
  fireEvent.mouseUp(el)
}

const Popup0 = (options: any) => (
  <div id="root">
    <Button>
      打开浮框
    </Button>
    <Popup
      getContainer={() => document.getElementById('root')}
      visible={true}
      {...options}
    >
    </Popup>
  </div>
)

afterEach(() => {
  cleanup()
})

describe('Popup Component', () => {
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

  it('popup body test, <test prop:: bodyStyle>, <test prop:: bodyClassName>', () => {
    wrapper.setProps({
      bodyStyle: { color: 'red', height: 300 },
      bodyClassName: 'test-popup-body-class'
    });
    expect(wrapper.find(`.${prefixPopup}-body`).hasClass('test-popup-body-class')).toEqual(true);
    expect(wrapper.find(`.${prefixPopup}-body`).props().style.color).toEqual('red');
    expect(wrapper.find(`.${prefixPopup}-body`).props().style.height).toEqual('300px');
  });

  it('popup title test, <test prop:: popupTitle>', () => {
    expect(wrapper.find(`.${prefixPopup}-title`).prop('style').display).toEqual('none');
    expect(wrapper.find(`.${prefixPopup}-title`).instance().innerHTML).toEqual('');
    wrapper.setProps({ popupTitle: 'title-test' });
    expect(wrapper.find(`.${prefixPopup}-title`).prop('style').display).toEqual('flex');
    expect(wrapper.find(`.${prefixPopup}-title`).instance().innerHTML).toEqual('title-test');
  });

  it('popup mask test, <test prop:: maskStyle>, <test prop:: maskClassName>', () => {
    wrapper.setProps({
      maskStyle: { height: 302 },
      maskClassName: 'test-popup-mask-class'
    });
    expect(wrapper.find(`.${prefixPopup}-mask`).hasClass('test-popup-mask-class')).toEqual(true);
    expect(wrapper.find(`.${prefixPopup}-mask`).props().style.height).toEqual('302px');
  });

  ['bottom', 'left', 'right', 'top'].forEach((item) => {
    it('position test, <test prop:: position>', () => {
      expect(wrapper.find(`.${prefixPopup}-body`).hasClass(`${prefixPopup}-body-position-bottom`)).toEqual(true);

      wrapper.setProps({ position: item });
      expect(wrapper.find(`.${prefixPopup}-body`).hasClass(`${prefixPopup}-body-position-${item}`)).toEqual(true);
    });
  });

  it('fieldid test, <test prop:: fieldid>', () => {
    const fieldid = 'test-fieldid';
    wrapper.setProps({ fieldid: fieldid, showCloseButton: true });
    expect(wrapper.find(`.${prefixPopup}`).prop('fieldid')).toEqual(`${fieldid}_popup`);
    expect(wrapper.find(`.${prefixPopup}`).find(`.${prefixMask}`).prop('fieldid')).toEqual(`${fieldid}_popup_mask`);
    expect(wrapper.find(`.${prefixPopup}-body`).prop('fieldid')).toEqual(`${fieldid}_popup_body`);
    expect(wrapper.find(`.${prefixPopup}-close-icon`).prop('fieldid')).toEqual(`${fieldid}_popup_close_icon`);
  });

  it('footer test, <test prop:: footer>', () => {
    wrapper.setProps({ footer: <div className='footer-test'>footerTest</div>, showCloseButton: true });
    expect(wrapper.find(`.${prefixPopup}-footer`).find('.footer-test').instance().innerHTML).toEqual('footerTest');

    wrapper.setProps({ footer: [
      {
        text: 'a',
        disabled: true,
        className: 'class',
        style: {color: 'red'},
        bold: true,
        danger: true
      },
      {
        text: 'b',
        primary: true
      }
    ]});
    expect(wrapper.find(`.${prefixPopup}-footer`).find('button').at(0).hasClass(`${prefixButton}-disabled`)).toEqual(true);
    expect(wrapper.find(`.${prefixPopup}-footer`).find('button').at(0).hasClass(`${prefixPopup}-button-bold`)).toEqual(true);
    expect(wrapper.find(`.${prefixPopup}-footer`).find('button').at(0).hasClass(`${prefixPopup}-button-danger`)).toEqual(true);
    expect(wrapper.find(`.${prefixPopup}-footer`).find('button').at(0).hasClass(`class`)).toEqual(true);
    expect(wrapper.find(`.${prefixPopup}-footer`).find('button').at(0).prop('style').color).toEqual('red');
    expect(wrapper.find(`.${prefixPopup}-footer`).find('button').at(1).hasClass(`${prefixPopup}-button-primary`)).toEqual(true);
    expect(wrapper.find(`.${prefixPopup}-footer`).find('button').at(1).find('span').instance().innerHTML).toEqual('b');
  });

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const cls = 'cls';
    wrapper.setProps({ clsPrefix: cls });
    expect(wrapper.exists(`.${prefixPopup}`)).toEqual(false);
    expect(wrapper.exists(`.${cls}-popup`)).toEqual(true);
    expect(wrapper.exists(`.${prefixPopup}-mask`)).toEqual(false);
    expect(wrapper.exists(`.${cls}-popup-mask`)).toEqual(true);
    expect(wrapper.exists(`.${prefixPopup}-body`)).toEqual(false);
    expect(wrapper.exists(`.${cls}-popup-body`)).toEqual(true);
  });

  it('getContainer test, <test prop:: getContainer>', async () => {
    wrapper.setProps({ className: 'class' });
    expect(wrapper.find('#root').exists(`.${prefixPopup}`)).toEqual(true);

    wrapper.setProps({ className: 'class', getContainer: () => document.getElementById('0') });
    expect(wrapper.find('#root').exists(`.${prefixPopup}`)).toEqual(false);
  });

  it('showCloseButton test, <test prop:: showCloseButton>', () => {
    const onClose = jest.fn();
    wrapper.setProps({ showCloseButton: true, onClose: onClose });
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.${prefixPopup}-body`).find('a').hasClass(`${prefixPopup}-close-icon`)).toEqual(true);
    expect(wrapper.find(`.${prefixPopup}-body`).find('a').hasClass(`${muiPrefix}-plain-anchor`)).toEqual(true);

    wrapper.find(`.${prefixPopup}-close-icon`).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('visible test, <test prop:: visible>', async () => {
    wrapper.setProps({ className: 'class' });
    expect(wrapper.find(`.${prefixPopup}`).prop('style').display).toEqual('')

    wrapper.setProps({ visible: false, className: 'class' });
    await sleep(1000)
    expect(wrapper.find(`.${prefixPopup}`).prop('style').display).toEqual('none')
  });

  it('children test, <test prop:: children>', async () => {
    wrapper.setProps({ children: <span className="children-test">child</span> });
    expect(wrapper.find(`.${prefixPopup}-body`).find('span').hasClass('children-test')).toEqual(true);
    expect(wrapper.find(`.${prefixPopup}-body`).find('span').instance().innerHTML).toEqual('child');
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

    wrapper.find(`.${prefixPopup}`).simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forceRender && destroyOnClose, <test prop:: forceRender>, <test prop:: destroyOnClose>', async () => {
    // 内部逻辑大致为：
    // if (forceRender) return true
    // if (active) return true
    // return !destroyOnClose
    wrapper.setProps({ class: 'class', children: 'child-1' });
    expect(wrapper.find(`.${prefixPopup}-body`).instance().innerHTML.includes('child-1')).toEqual(true);

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: false
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixPopup}-body`).instance().innerHTML.includes('child-1')).toEqual(true);

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: false,
      destroyOnClose: true
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixPopup}-body`).instance()).toEqual(undefined);

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: true,
      destroyOnClose: true
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixPopup}-body`).instance().innerHTML.includes('child-1')).toEqual(true);

    wrapper.setProps({
      children: 'child-1',
      visible: false,
      forceRender: true,
      destroyOnClose: false
    })
    await sleep(1000);
    expect(wrapper.find(`.${prefixPopup}-body`).instance().innerHTML.includes('child-1')).toEqual(true);
  });
});

describe('closeOnSwipe test', () => {
  it('top swipe should be closed, <test prop:: closeOnSwipe>', async () => {
    const onClose = jest.fn()
    render(
      <Popup visible onClose={onClose} position='top' closeOnSwipe>
        <div style={{ height: '400px', width: '400px' }}></div>
      </Popup>
    )

    await mockDrag(
      document.querySelector(`.${prefixPopup}`) as Element,
      new Array(4).fill(0).map((_, i) => ({ clientY: 400 - 50 * i, })),
      5
    )
    expect(onClose).toHaveBeenCalledTimes(1);
  })

  it('bottom swipe should be closed, <test prop:: closeOnSwipe>', async () => {
    const onClose = jest.fn()
    render(
      <Popup visible onClose={onClose} position='bottom' closeOnSwipe>
        <div style={{ height: '400px', width: '400px' }}></div>
      </Popup>
    )

    await mockDrag(
      document.querySelector(`.${prefixPopup}`) as Element,
      new Array(6).fill(0).map((_, i) => ({ clientY: 50 * i, })),
      5
    )
    expect(onClose).toHaveBeenCalledTimes(1);
  })
});

describe('<test prop:: stopPropagation>', () => {
  const renderPopover = (props: Partial<PopupProps> = {}) => {
    const onBubble = jest.fn()
    let fieldid: string;
    const App = () => {
      fieldid = useId()
      return (
        <div onClick={onBubble} id="ww">
          <Popup
            content={'popoup'}
            visible={true}
            fieldid={fieldid}
            {...props}
          >
            <button>Open Popup</button>
          </Popup>
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
      trigger: screen.getByRole('button', { name: /open popup/i }),
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
