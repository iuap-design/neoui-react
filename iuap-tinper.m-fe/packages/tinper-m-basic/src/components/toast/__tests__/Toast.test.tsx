/** Toast.tsx */
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { mount } from '@tests/mount'
import Toast from '../src/index';
import { sleep } from '@/utils/Sleeps';

const waitForContentShow = async (content: string) => {
  await waitFor(() => {
    screen.getByText(content)
  })
}

describe('Toast Component', () => {
  it('component: Toast, <test prop:: fieldid>, <test prop:: content>', async () => {
    const fieldid = 'Toast_test'
    const { container, getByText } = render(<button
      onClick={() => {
        Toast.show({
          fieldid: fieldid,
          content: `content`
        })
      }}
    >
      Toast_btn
    </button>)
    fireEvent.click(getByText('Toast_btn'))
    // await waitForContentShow('content')
    expect(document.querySelector(`[fieldid="${fieldid}_mask"]`)).toBeInTheDocument();
    expect(getByText('content')).toBeInTheDocument();
  });
  it('component: Toast, <test prop:: clsPrefix>', () => {
    const classPrefix = 'testMui'
    const wrapper = mount(<button
      onClick={() => {
        Toast.show({
          clsPrefix: classPrefix,
          content: `ToastContent`
        })
      }}
    >
    </button>);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(wrapper.find('div').last().hasClass(`${classPrefix}-auto-center-content`)).toEqual(true);
  });
  ['success', 'fail', 'loading'].forEach(item => {
    const data: { [x: string]: string } = {
      'success': 'arccheckmark-circle',
      'fail': 'arcclose-circle'
    }
    it('component: Toast, <test prop:: icon>', () => {
      const wrapper = mount(<button
        onClick={() => {
          Toast.show({
            icon: item,
            content: `${item}`
          })
        }}
      >
      </button>);
      const button = wrapper.find('button');
      button.simulate('click');
      if (item === 'loading') {

        expect(document.querySelector(`[class="circle-loader mui-toast-loading"]`)).toBeInTheDocument();
      } else {
        expect(wrapper.find('svg').props().id).toEqual(data[item]);
      }
    })
  });
  ['top', 'bottom', 'center'].forEach(item => {
    const data: { [x: string]: string } = {
      'top': '20%',
      'bottom': '80%',
      'center': '50%'
    }
    it('component: Toast, <test prop:: position>', () => {
      const wrapper = mount(<button
        onClick={() => {
          Toast.show({
            position: item as "center" | "top" | "bottom",
            content: `${item}`
          })
        }}
      >
      </button>);
      const button = wrapper.find('button');
      button.simulate('click');
      expect(document.querySelector(`[class="mui-toast-main mui-toast-main-text"]`)).toHaveStyle(`top: ${data[item]}`);
    })
  });
  it('component: Toast, <test prop:: visible>', () => {
    const fieldid = 'Toast_testvisible'
    const wrapper = mount(<button
      onClick={() => {
        Toast.show({
          fieldid: fieldid,
          visible: true,
          content: `ToastContent`
        })
      }}
    >
    </button>);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(document.querySelector(`[fieldid="${fieldid}_mask"]`)).toHaveStyle('opacity: 1');
  });
  it('component: Toast, <test prop:: maskClickable>', () => {
    const fieldid = 'Toast_maskClickable'
    const wrapper = mount(<button
      onClick={() => {
        Toast.show({
          fieldid: fieldid,
          maskClickable: false,
          content: `ToastContent`
        })
      }}
    >
    </button>);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(document.querySelector(`[fieldid="${fieldid}_mask"]`)).toHaveStyle('pointer-events: auto');
  });
  it('component: Toast, <test prop:: maskStyle>, <test prop:: maskClassName>, <test prop:: className>', () => {
    const fieldid = 'Toast_maskStyle'
    const wrapper = mount(<button
      onClick={() => {
        Toast.show({
          fieldid: fieldid,
          maskStyle: { height: '128px' },
          maskClassName: 'testClassName',
          className: 'classname',
          content: `ToastContent`
        })
      }}
    >
    </button>);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(document.querySelector(`[fieldid="${fieldid}_mask"]`)).toHaveStyle('height: 128px;');
    expect(document.querySelector(`[fieldid="${fieldid}_mask"]`)).toHaveClass('testClassName');
    expect(document.querySelector(`[class="mui-toast-wrap classname"]`)).toBeInTheDocument();
  });
  it('component: Toast, <test prop:: getContainer>', () => {
    const div = document.createElement('div');
    div.id = "root2"
    document.body.appendChild(div);
    const fieldid = 'Toast_getContainer'
    const wrapper = mount(<button
      onClick={() => {
        Toast.show({
          fieldid: fieldid,
          getContainer: () => document.querySelector('#root2') as HTMLElement,
          content: `ToastContent`
        })
      }}
    >
    </button>);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(document.querySelector("#root2")?.children[0].children[0].className.includes('mui-mask')).toEqual(true);
    document.body.removeChild(document.querySelector("#root2") as HTMLElement)
  });
  it('component: Toast, <test prop:: singleton>', async () => {
    const { getByText } = render(<button
      onClick={() => {
        Toast.show({
          singleton: false,
          duration: 0,
          content: `content1`
        })
        Toast.show({
          singleton: false,
          duration: 0,
          content: `content2`
        })
      }}
    >
      Toast_btn
    </button>)
    fireEvent.click(getByText('Toast_btn'))
    // await waitForContentShow('content')
    expect(getByText('content1')).toBeInTheDocument();
    expect(getByText('content2')).toBeInTheDocument();
  });
})

describe('component: Toast Events', function () {
  it('Toast afterClose test, <test prop:: afterClose>, <test prop:: duration>', async function () {
    const afterClose = jest.fn()
    const wrapper = mount(<button
      onClick={() => {
        Toast.show({
          afterClose: afterClose,
          duration: 3,
          content: `ToastContent`
        })
      }}
    >
    </button>);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(afterClose.mock.calls.length).toEqual(0)
    await sleep(3000)
    expect(afterClose.mock.calls.length).toEqual(0)
    await sleep(1000)
    expect(afterClose.mock.calls.length).toEqual(1)
  });
});


