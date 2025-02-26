/** Slider.tsx */
import React from 'react'
import { screen, fireEvent, render } from '@testing-library/react';
import { mount } from '@tests/mount'
import { Slider, Icon } from "@tinper/m";
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixSlider = `${muiPrefix}-slider`;

function $$(className) {
  return document.querySelectorAll(className)
}

function drag(element, moveClientX) {
  fireEvent.mouseDown(element, {
    buttons: 1,
  })

  fireEvent.mouseMove(element, {
    buttons: 1,
    clientX: moveClientX,
  })

  fireEvent.mouseUp(element)
}

describe('Slider Component', () => {
  it('fieldid test, <test prop:: fieldid>', () => {
    const fieldid = 'Slider_test'
    const wrapper = mount(<Slider fieldid={fieldid} defaultValue={30}  />)
    const element = wrapper.find(`[fieldid="${fieldid}_slider"]`);
    expect(element.getDOMNode()).toBeInTheDocument();
  });

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const wrapper = mount(<Slider clsPrefix="testClassPref" />);
    expect(wrapper.find(`.testClassPref-slider`).getDOMNode()).toBeInTheDocument();
  })

  it('className test, <test prop:: className>', () => {
    const wrapper = mount(<Slider className="test-classname" />);
    expect(wrapper.find(`.${prefixSlider}`).hasClass('test-classname')).toBeTruthy();
  })

  it('style test, <test prop:: style>', () => {
    const wrapper = mount(<Slider style={{display: "flex"}} />);
    expect(wrapper.find(`.${prefixSlider}`).props().style.display).toBe('flex');
  })


  it('disabled test, <test prop:: disabled>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Slider onClick={onClick} disabled />);
    const element = wrapper.find(`.${prefixSlider}`);
    expect(element.props().class).toBe('mui-slider mui-slider-disabled');
    wrapper.find(`.${prefixSlider}`).simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('value test, <test prop:: value>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Slider onClick={onClick} value={50} />);
    const element = wrapper.find(`.${prefixSlider}-thumb-container`);
    expect(element.props().style.left).toBe('50%');
  });

  it('defaultValue test, <test prop:: defaultValue>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Slider onClick={onClick} defaultValue={50} />);
    const element = wrapper.find(`.${prefixSlider}-thumb-container`);
    expect(element.props().style.left).toBe('50%');
  });

  it('handleStyle test, <test prop:: handleStyle>', () => {
    const wrapper = mount(<Slider handleStyle={{color: "blue"}} />);
    const element = wrapper.find(`.${prefixSlider}-thumb-container`);
    expect(element.props().style.color).toBe('blue');
  })

  it('trackStyle test, <test prop:: trackStyle>', () => {
    const wrapper = mount(<Slider trackStyle={{color: "blue"}} />);
     ;
    const element = wrapper.find(`.${prefixSlider}-fill`);
    expect(element.props().style.color).toBe('blue');
  })

  it('railStyle test, <test prop:: railStyle>', () => {
    const wrapper = mount(<Slider railStyle={{color: "blue"}} />);
    const element = wrapper.find(`.${prefixSlider}-track`);
    expect(element.props().style.color).toBe('blue');
  })

  it('marks test, <test prop:: marks>', () => {
    const marks = {
      0: 0,
      20: 20,
      40: 40,
      60: 60,
      80: 80,
      100: 100,
    }
    const wrapper = mount(<Slider marks={marks} defaultValue={80} />);
    const element = wrapper.find(`.${prefixSlider}-mark-text-active`);
    expect(element.last().text()).toBe('80');
  })
  it('min test, <test prop:: min>', () => {
    const marks = {
      0: 0,
      50: 50,
      100: 100,
      150: 150,
      200: 200,
      250: 250,
    }
    const wrapper = mount(<Slider marks={marks} min={50} max={250} />);
    const element = wrapper.find(`.${prefixSlider}-mark-text`);
    expect(element.first().text()).toBe('50');
  })
  it('max test, <test prop:: max>', () => {
    const marks = {
      0: 0,
      50: 50,
      100: 100,
      150: 150,
      200: 200,
      250: 250,
    }
    const wrapper = mount(<Slider marks={marks} min={50} max={250} />);
    const element = wrapper.find(`.${prefixSlider}-mark-text`);
    expect(element.last().text()).toBe('250');
  })
  it('range test, <test prop:: range>', () => {
    const wrapper = mount(<Slider range />);
    const element = wrapper.find(`.${prefixSlider}-thumb`);
    expect(element.length).toBe(2);
  })
  it('ticks test, <test prop:: ticks>', () => {
    const wrapper = mount(<Slider ticks />);
    const element = wrapper.find(`.${prefixSlider}-tick-ticks`);
    expect(element.length).toBe(1);
  })
  it('ticks test, <test prop:: ticks>', () => {
    const wrapper = mount(<Slider defaultValue={66} />);
    const element = wrapper.find(`.${prefixSlider}-thumb-container`);
    expect(element.props().style.left).toBe('66%');
  })
  it('popover test, <test prop:: popover>, <test prop:: residentPopover>', () => {
    const wrapper = mount(<Slider ticks popover residentPopover defaultValue={30} />);
    const element = wrapper.find(`.mui-popover`);
    expect(element.length).toBe(1);
  })
  it('icon test, <test prop:: icon>', () => {
    const wrapper = mount(<Slider icon={<Icon type='arcradio-button-on-Fill' />} defaultValue={30} />);
    const element = wrapper.find(`.${prefixSlider}-thumb-icon`);
    expect(element.length).toBe(1);
  })
  it('onChange test, <test prop:: onChange>', () => {
    const onClick = jest.fn();
    const wrapper = mount( <Slider defaultValue={30} onChange={onClick} />);
    wrapper.find(`.${prefixSlider}-track-container`).simulate('click');
    expect(onClick).toHaveBeenCalled();
  })
})

describe('event', () => {
  it('step test, <test prop:: step>', () => {
    jest.useFakeTimers()
    render(<Slider ticks step={10} />)
    const thumb = screen.getByRole('slider')
    const track = $$(`.${prefixSlider}-track`)[0]
    drag(thumb, 18)
    expect($$(`.${prefixSlider}-tick-ticks`)[0]).toBeInTheDocument()

    // reset dragLockRef
    jest.runAllTimers()
    fireEvent.click(track, { clientX: 60 })
    expect($$(`.${prefixSlider}-tick`)[6]).toHaveClass(
      `${prefixSlider}-tick-active`
    )
    jest.useRealTimers()
  })
  it('onAfterChange test, <test prop:: onAfterChange>', () => {
    const onAfterChange = jest.fn()
    render(
      <Slider step={100} min={0} max={1000} onAfterChange={onAfterChange} />
    )
    drag(screen.getByRole('slider'), 40)
    expect(onAfterChange).toHaveBeenCalledTimes(0)
  })
});
