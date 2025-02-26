/** Slider.tsx */
import { mount } from '../../../next-ui-library/test/common/mount'
import React from 'react';
import { attrsTest, testCustomStyle, testStyle, actWait } from '../../../next-ui-library/test/common/index';
import { prefix } from '../../wui-core/src/updatePrefix';
import Slider from '../src/index';
import keyCode from 'rc-util/lib/KeyCode';
import { sleep } from '../../../next-ui-library/test/common/utils';
import { waitFor, screen } from "@testing-library/react";
const prefixSlider = `${prefix}-slider`;

describe('Slider', () => {
    attrsTest({
        title: 'component: Slider, <test prop:: className>',
        Component: Slider,
        attrs: {
            className: 'my-class'
        },
        selector: `.${prefixSlider}`,
        classnames: [`my-class`]
    });
    attrsTest({
        title: 'component: Slider, <test prop:: marks>',
        Component: Slider,
        attrs: {
            defaultValue: '33',
            marks: {
                0: <strong>0°C</strong>,
                26: '26°C',
                100: '100°C'
            }
        },
        selector: `.${prefixSlider}-mark span`,
        classnames: [`${prefixSlider}-mark-text`]
    });
    attrsTest({
        title: 'component: Slider, <test prop:: dots>',
        Component: Slider,
        attrs: {
            dots: true
        },
        selector: 'span',
        classnames: [`${prefixSlider}-dot`]
    });
    attrsTest({
        title: 'component: Slider, <test prop:: vertical>',
        Component: Slider,
        attrs: {
            vertical: 'true'
        },
        selector: `.${prefixSlider}`,
        classnames: [`${prefixSlider}-vertical`]
    });
    testStyle({
        title: 'component: Slider, <test prop:: style>',
        Component: Slider,
        selector: `.${prefixSlider}`,
        style: { 'color': "red" }
    });
    testCustomStyle({
        title: 'component: Slider, <test prop:: trackStyle>',
        Component: Slider,
        attrs: {
            trackStyle: { backgroundColor: 'black', height: 10 }
        },
        selector: `.${prefixSlider}-track`,
        verifyStyle: { backgroundColor: 'black', height: 10 }
    });
    testCustomStyle({
        title: 'component: Slider, <test prop:: minimumTrackStyle>',
        Component: Slider,
        attrs: {
            minimumTrackStyle: { backgroundColor: 'black', height: 10 }
        },
        selector: `.${prefixSlider}-track`,
        verifyStyle: { backgroundColor: 'black', height: 10 }
    });
    testCustomStyle({
        title: 'component: Slider, <test prop:: handleStyle>',
        Component: Slider,
        attrs: {
            handleStyle: { borderColor: 'black', height: 10 }
        },
        selector: `.${prefixSlider}-handle`,
        verifyStyle: { borderColor: 'black', height: 10 }
    });
    testCustomStyle({
        title: 'component: Slider, <test prop:: railStyle>',
        Component: Slider,
        attrs: {
            railStyle: { backgroundColor: 'black', height: 10 }
        },
        selector: `.${prefixSlider}-rail`,
        verifyStyle: { backgroundColor: 'black', height: 10 }
    });
    testCustomStyle({
        title: 'component: Slider, <test prop:: dotStyle>',
        Component: Slider,
        attrs: {
            dots: true,
            dotStyle: { borderColor: 'orange' }
        },
        selector: `.${prefixSlider}-dot`,
        verifyStyle: { borderColor: 'orange' }
    });
    testCustomStyle({
        title: 'component: Slider, <test prop:: activeDotStyle>',
        Component: Slider,
        attrs: {
            dots: true,
            dotStyle: { borderColor: 'yellow' }
        },
        selector: `.${prefixSlider}-dot-active`,
        verifyStyle: { borderColor: 'yellow' }
    });
    describe('component: Slider, <test prop:: defaultValue>', () => {
        it('aria-valuenow should be defaultValue', function () {
            let slider = mount(<Slider defaultValue={60} />);
            expect(slider.find(`.${prefixSlider}-handle`).at(0).prop("aria-valuenow")).toEqual("60");
            expect(slider.find(`.${prefixSlider}-handle`).at(0).prop("aria-valuenow")).toEqual("60");
        })
    });
    describe('component: Slider, <test prop:: value>', () => {
        it('aria-valuenow should be value', function () {
            let slider = mount(<Slider defaultValue={60} value={30} />);
            expect(slider.find(`.${prefixSlider}-handle`).at(0).prop("aria-valuenow")).toEqual("30");
        })
    });
    describe('component: Slider, <test prop:: min>,<test prop:: max>', () => {
        it('aria-valuemin should be 0,aria-valuemax should be 100', function () {
            let slider = mount(<Slider defaultValue={60} />);
            expect(slider.find(`.${prefixSlider}-handle`).at(0).prop("aria-valuemin")).toEqual("0");
            expect(slider.find(`.${prefixSlider}-handle`).at(0).prop("aria-valuemax")).toEqual("100");
        })
    });
    describe('component: Slider, <test prop:: included>', () => {
        it('marks should be not included', function () {
            let slider = mount(<Slider
                marks={{
                    0: '0°C',
                    33: '33°C',
                    100: '100°C'
                }}
                included={false} defaultValue={33}
            />);
            expect(slider.find(`.${prefixSlider}-mark-text`).at(0).hasClass(`${prefixSlider}-mark-text-active`)).toEqual(false);
            expect(slider.find(`.${prefixSlider}-mark-text`).at(1).hasClass(`${prefixSlider}-mark-text-active`)).toEqual(true);
            expect(slider.find(`.${prefixSlider}-mark-text`).at(2).hasClass(`${prefixSlider}-mark-text-active`)).toEqual(false);
        })
    });
    describe('component: Slider, <test prop:: reverse>', () => {
        it('Slider should be reverse', function () {
            let slider = mount(<Slider defaultValue={60} reverse={true} />);
            expect(slider.find(`.${prefixSlider}-handle`).at(0).prop("style").right === "60%").toEqual(true);
        })
    });
    describe('component: Slider, <test prop:: reverse>', () => {
        it('Slider should be not reverse', function () {
            let slider = mount(<Slider defaultValue={60} reverse={false} />);
            expect(slider.find(`.${prefixSlider}-handle`).at(0).prop("style").left === "60%").toEqual(true);
        })
    });
    describe('component: Slider, <test prop:: allowClear>', () => {
        it('Slider allows to clear', function () {
            let slider = mount(<Slider allowClear defaultValue={20} />);
            const i = slider.find("i");
            expect(i.hasClass("uf-close-c")).toEqual(true);
            i.simulate('click');
            expect(slider.find(`.${prefixSlider}-handle`).at(0).prop("aria-valuenow")).toEqual("0");
        })
    });
    describe('component: Slider, <test prop:: disabled>', () => {
        it('Slider should be aria-disabled', function () {
            let slider = mount(<Slider disabled defaultValue={60} />);
            expect(slider.find(`.${prefixSlider}-handle`).at(0).prop("aria-disabled")).toEqual("true");
        })
    });
    describe('component: Slider, <test prop:: tooltipVisible>,', () => {
        it('Tooltip should  display', () => {
            let slider = mount(<Slider defaultValue={45} tooltipVisible tipFormatter={value => `${value}%`} />);
            expect(slider.find(`.${prefix}-tooltip`)).toHaveLength(1);
        });
    });
    describe('component: Slider, <test prop:: tooltipPlacement>', () => {
        ["top", "left", "right", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight", "leftTop", "leftBottom", "rightTop", "rightBottom"]
            .forEach(tooltipPlacement => {

                it(`Tooltip display on ${tooltipPlacement}`, async () => {
                    let slider = mount(<Slider defaultValue={45} tooltipPlacement={tooltipPlacement} tooltipVisible
                        tipFormatter={value => `${value}%`} />);
                });
            })
    });
});

function mockRect(element) {
    const mock = jest.spyOn(element, 'getBoundingClientRect');
    mock.mockReturnValue({
        top: 0,
        bottom: 100,
        left: 0,
        right: 100,
        width: 100,
        height: 100,
    });
}
describe('keyboardevent change slider value, <test prop:: onChange>, <test prop:: onBeforeChange>,<test prop:: onAfterChange>', () => {
    let wrapper;
    const onChange = jest.fn();
    beforeEach(async () => {
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        wrapper = mount(<Slider onChange={onChange} defaultValue={50} />, { attachTo: container });
        mockRect(document.querySelector(`.${prefixSlider}`));
        await actWait();
    })
    afterEach(async () => {
        const container = document.getElementById('container');
        if (container) {
            document.body.removeChild(container);
        };
        if (wrapper && wrapper.length) {
            wrapper.unmount();
        };
        onChange.mockClear();
    })

    function keyDown(keyCode) {
        const el = document.querySelector(`.${prefixSlider}-handle`);
        const evtObj = new KeyboardEvent('keydown', { keyCode, bubbles: true });
        el.dispatchEvent(evtObj);
    };

    it('increases the value when key "up" is pressed', async () => {
        keyDown(keyCode.UP);
        expect(onChange).toHaveBeenCalledWith(51);
    });

    it('increases the value for vertical slider when key "up" is pressed', () => {
        wrapper.setProps({ vertical: true })
        keyDown(keyCode.UP);
        expect(onChange).toHaveBeenCalledWith(51);
    });

    it('increases the value when key "right" is pressed', () => {
        keyDown(keyCode.RIGHT);
        expect(onChange).toHaveBeenCalledWith(51);
    });

    it('decreases the value when key "down" is pressed', () => {
        keyDown(keyCode.DOWN);
        expect(onChange).toHaveBeenCalledWith(49);
    });

    it('decreases the value when key "left" is pressed', () => {
        keyDown(keyCode.LEFT);
        expect(onChange).toHaveBeenCalledWith(49);
    });

    it('decreases the value when key "End" is pressed', () => {
        keyDown(keyCode.END);
        expect(onChange).toHaveBeenCalledWith(100);
    });
    it('decreases the value when key "Home" is pressed', () => {
        keyDown(keyCode.HOME);
        expect(onChange).toHaveBeenCalledWith(0);
    });
    it('decreases the value when key "PageUp" is pressed', () => {
        keyDown(keyCode.PAGE_UP);
        expect(onChange).toHaveBeenCalledWith(52);
    });
    it('decreases the value when key "PageDown" is pressed', () => {
        keyDown(keyCode.PAGE_DOWN);
        expect(onChange).toHaveBeenCalledWith(48);
    });

    //'click slider to change value'
    const mousedownX = (new MouseEvent('mousedown', { bubbles: true }))
    mousedownX.pageX = 20;
    const mousedownY = (new MouseEvent('mousedown', { bubbles: true, clientY: 90 }))
    it('defalut', () => {
        document.querySelector(`.${prefixSlider}`).dispatchEvent(mousedownX);
        expect(onChange).toHaveBeenCalledWith(20);
    });

    it('reverse', () => {
        wrapper.setProps({ reverse: true });
        document.querySelector(`.${prefixSlider}`).dispatchEvent(mousedownX);
        expect(onChange).toHaveBeenCalledWith(80);
    });

    it('vertical', () => {
        wrapper.setProps({ vertical: true });
        document.querySelector(`.${prefixSlider}`).dispatchEvent(mousedownY);
        expect(onChange).toHaveBeenCalledWith(10);
    });

    it('vertical reverse', () => {
        wrapper.setProps({ vertical: true, reverse: true });
        document.querySelector(`.${prefixSlider}`).dispatchEvent(mousedownY);
        expect(onChange).toHaveBeenCalledWith(90);
    });

    it('should call onBeforeChange, onChange, and onAfterChange', async () => {
        const onBeforeChange = jest.fn();
        const onAfterChange = jest.fn();
        wrapper.setProps({ onBeforeChange: onBeforeChange, onAfterChange: onAfterChange });
        document.querySelector(`.${prefixSlider}`).dispatchEvent(mousedownX);
        await sleep(100);
        expect(onBeforeChange).toHaveBeenCalledWith(50);
        expect(onChange).toHaveBeenCalledWith(20);

        document.querySelector(`.${prefixSlider}`).dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        expect(onAfterChange).toHaveBeenCalledWith(20);
    });
});

describe('Slider Range', () => {
    let wrapper;
    beforeEach(async () => {
        document.body.innerHTML = '';
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        wrapper = mount(<Slider range defaultValue={[20, 40]} />, { attachTo: container });
        mockRect(document.querySelector(`.${prefixSlider}`));
        await actWait();
    })
    afterEach(async () => {
        const container = document.getElementById('container');
        if (container) {
            document.body.removeChild(container);
        }
        if (wrapper && wrapper.length) {
            wrapper.unmount();
        }
    })

    async function doMove(trigger, end, element = 1) {
        const start = (element === 2 ? 100 : 0);
        if (trigger === 'mouse') {
            const mouseDown = new MouseEvent('mousedown', { bubbles: true });
            mouseDown.pageX = start;
            mouseDown.pageY = start;
            document.querySelector(`.${prefixSlider}`).dispatchEvent(mouseDown);
            await sleep(100);
            const mouseMove = new MouseEvent('mousemove', { bubbles: true });
            mouseMove.pageX = end;
            mouseMove.pageY = end;
            document.querySelector(`.${prefixSlider}`).dispatchEvent(mouseMove);
        } else if (trigger === 'touch') {
            const touchStart = new TouchEvent('touchstart', { bubbles: true, touches: [{ pageX: start }] });
            document.querySelector(`.${prefixSlider}`).dispatchEvent(touchStart);
            await sleep(100);
            const touchMove = new TouchEvent('touchmove', { bubbles: true, touches: [{ pageX: end }] });
            document.querySelector(`.${prefixSlider}`).dispatchEvent(touchMove);
        }
    };

    function rangeValueNow(value1, value2, reverse) {
        const handle1 = document.querySelector(`.${prefixSlider}-handle-1`);
        const handle2 = document.querySelector(`.${prefixSlider}-handle-2`);
        expect(handle1.getAttribute('aria-valuenow')).toBe(`${value1}`);
        expect(handle2.getAttribute('aria-valuenow')).toBe(`${value2}`);
        if (reverse === 'reverse') {
            expect(handle1.style.right).toBe(`${value1}%`);
            expect(handle2.style.right).toBe(`${value2}%`);
        } else {
            expect(handle1.style.left).toBe(`${value1}%`);
            expect(handle2.style.left).toBe(`${value2}%`);
        }
    };

    it('should render Range with value correctly', async () => {
        rangeValueNow(20, 40);
    });

    it('should render reverse Range with value correctly', () => {
        wrapper.setProps({ reverse: true });
        rangeValueNow(20, 40, 'reverse');
    });

    ['mouse', 'touch'].forEach((trigger) => {
        it(`${trigger}move`, async () => {
            await doMove(trigger, 30);
            await sleep(100);
            rangeValueNow(30, 40);
        });

        it(`${trigger}move not more than 100`, async () => {
            await doMove(trigger, 999);
            await sleep(100);
            rangeValueNow(40, 100);
        });

        it(`${trigger}move not less than 0`, async () => {
            await doMove(trigger, -10);
            await sleep(100);
            rangeValueNow(0, 40);
        });

        it('not allow Cross', async () => {
            wrapper.setProps({ allowCross: false })
            await doMove(trigger, 999);
            await sleep(100);
            rangeValueNow(40, 40);//不允许第一个handle超过第二个
        });

        it('not allow Cross', async () => {
            wrapper.setProps({ allowCross: false })
            await doMove(trigger, 0, 2);
            await sleep(100);
            rangeValueNow(20, 20);//不允许第二个handle超过第一个
        });

        it('not allow Cross, pushable', async () => {
            wrapper.setProps({ allowCross: false, pushable: 10 })
            await doMove(trigger, 999);
            await sleep(100);
            rangeValueNow(40, 50);//第一个可以推动第二个，距离为10
        });
    });
});

describe('4.4.4 New Api Test', () => {
    it('component: Slider, <test prop:: tooltip>', async () => {
        let wrapper = mount(<Slider defaultValue={20} />);
        expect(wrapper.find(`.${prefix}-tooltip`)).toHaveLength(0);
        wrapper.setProps({ tooltip: { open: true } })
        expect(wrapper.find(`.${prefix}-tooltip`)).toHaveLength(1);
        expect(wrapper.find(`.${prefix}-tooltip`).text()).toBe("20");
        wrapper.setProps({tooltip: { open: true, formatter: v => v + '%' } })
        expect(wrapper.find(`.${prefix}-tooltip`).text()).toEqual("20%");
        wrapper.setProps({ tooltip: { placement: 'bottom' } })

        //测试挂载点
        wrapper = mount(<Slider defaultValue={20} tooltip={{ open: true }} />, { attachTo: document.body });
        await sleep(100);        
        // expect(document.querySelector(`.${prefix}-tooltip`).parentElement).toBe(document.body);
    });
    it('component: Slider, <test prop:: tooltip getPopupContainer>', async () => {
        //测试挂载点
        const wrapper = mount(<Slider defaultValue={20} tooltip={{ open: true, getPopupContainer: dom => dom }} />, { attachTo: document.body });
        await sleep(100);
        // expect(document.querySelector(`.${prefix}-tooltip`).parentElement).toEqual(document.querySelector(`.${prefixSlider}-handle`))
    });
})
describe('补充props测试用例', () => {
    it('component: Slider, <test prop:: fieldid>', () => {
        let wrapper = mount(<Slider min={-10} marks={{ 0: '0°C', 33: '33°C', 100: '100°C' }} defaultValue={20} fieldid='test' />);
        expect(wrapper.find(`div.${prefixSlider}-rail`).props().fieldid).toBe('test_slider_rail')
        expect(wrapper.find(`div.${prefixSlider}-track`).props().fieldid).toBe('test_slider_track')
        expect(wrapper.find(`div.${prefixSlider}-step`).props().fieldid).toBe('test_slider_step')
        wrapper.find(`.${prefixSlider}-dot`).forEach((node, index) => {
            expect(node.props().fieldid).toBe('test_slider_step_' + index)
        })
        expect(wrapper.find(`div.${prefixSlider}-handle`).props().fieldid).toBe('test_slider_handle')
        expect(wrapper.find(`div.${prefixSlider}-mark`).props().fieldid).toBe('test_slider_mark')
        wrapper.find(`.${prefixSlider}-mark-text`).forEach((node, index) => {
            expect(node.props().fieldid).toBe('test_slider_mark_' + index)
        })
    });
    // startPoint tabIndex offset dragging index ref都是handle的props,不是接收外部传入props
})
