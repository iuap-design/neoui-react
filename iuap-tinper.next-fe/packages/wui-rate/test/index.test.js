/** Rate.tsx */
import { mount, ReactWrapper } from '../../../next-ui-library/test/common/mount'
import React, { Component } from 'react';
import { attrsTest, eventsTest, focusTest, mountTest, testStyle, newEventsTest, sleep } from "../../../next-ui-library/test/common/index";
import KeyCode from 'rc-util/lib/KeyCode';
import { prefix } from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src'
import Rate from '../src/index';
import Demo1 from './rate.class';
import { render, screen, fireEvent } from "@testing-library/react";

const prefixRate = `${prefix}-rate`
let wrapper: ReactWrapper;
beforeEach(() => {
    wrapper = mount(<Rate defaultValue={3} />)
})
afterEach(() => {
    if (!wrapper) return;
    wrapper && wrapper.length & wrapper.unmount()
})
describe('verifiy Rate', () => {
    mountTest(Rate)
    // focusTest({title: 'component: Rate, <test prop:: autoFocus>', Component: Rate, refFocus: true})
})
describe('component: Rate, <test prop:: autoFocus>, <test prop:: onFocus>, <test prop::onBlur>', () => {
    it('foucsTest', () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        const ref = React.createRef();
        const wrapper = mount(<Rate refFocus={true} onFocus={onFocus} ref={ref} onBlur={onBlur} />)
        ref.current.focus();
        expect(onFocus).toHaveBeenCalled();
        ref.current.blur();
        expect(onBlur).toHaveBeenCalled();
    })
})
describe('component: Rate, <test prop:: count>', () => {
    it('it should have 10 star', () => {

        wrapper.setProps({
            count: 10
        })
        expect(wrapper.find(`.${prefixRate}`).children()).toHaveLength(10)
    })
})
describe('component: Rate, <test prop:: value>', () => {
    it('it should have 5 full star', () => {
        wrapper.setProps({
            count: 10,
            value: 5
        })
        expect(wrapper.find(`.${prefixRate}-star-full`)).toHaveLength(5)
    })
    it('Value allows two decimal places', () => {
        wrapper.setProps({
            value: 3.77,
            allowHalf: true
        })
        expect(wrapper.find(`.${prefix}-rate-star-half`).find(`.${prefix}-rate-star-first`).instance().getAttribute('style')).toEqual("width: 77%;")
        expect(wrapper.find(`.${prefix}-rate-star-half`).find(`.${prefix}-rate-star-second`).find('i').hasClass('uf-star-3')).toEqual(true)
    })
})
describe('component: Rate, <test prop:: allowHalf>', () => {
    it('it should have 5 full star', () => {

        wrapper.setProps({
            count: 10,
            value: 3.5,
            allowHalf: true
        })
        expect(wrapper.find(`.${prefixRate}-star-full`)).toHaveLength(3)
        expect(wrapper.find(`.${prefixRate}-star-half`)).toHaveLength(1)
    })
})
describe('component: Rate, <test prop:: defaultValue>', () => {
    it('default should have 3 full star', () => {
        expect(wrapper.find(`.${prefixRate}-star-full`)).toHaveLength(3);

        wrapper.find(`.${prefixRate}-star`).at(4).find('div').at(0).simulate('click');
        // 上个版本设置defaultValue后，通过点击无法改变评分，2.10.0版本可以
        expect(wrapper.find(`.${prefixRate}-star-full`)).toHaveLength(5);
    })
})
describe('component: Rate, <test prop:: character>', () => {
    it('star should uf-dongjie', () => {
        const wrapper = mount(<Rate character={<Icon type="uf-dongjie" />} />)
        expect(wrapper.instance().querySelector(`.${prefixRate} li i`).className).toContain('uf-dongjie')
    })
})
attrsTest({
    title: 'component: Rate, <test prop:: disabled>',
    Component: Rate,
    attrs: {
        disabled: true
    },
    selector: ``,
    classnames: [`${prefixRate}-disabled`]
})
describe('component: Rate, <test prop:: style>', () => {
    it('style.color should be red', () => {
        const wrapper = mount(<Rate style={{ color: 'red' }} />)
        expect(wrapper.instance().style.color).toBe('red')
    })
})
describe('component: Rate, <test prop:: allowClear>', () => {
    it('it should have 0 full star', () => {
        const wrapper = mount(<Demo1 allowClear={true} count={10} />)
        fireEvent.click(wrapper.instance().querySelector(`div[aria-posinset='3']`))
        expect(wrapper.instance().querySelectorAll(`.${prefixRate}-star-full`)).toHaveLength(0)
    })
})
newEventsTest({
    title: 'component: Rate, <test prop:: onChange>',
    Component: Rate,
    propFuncName: 'onChange',
    dependentProps: { defalutValue: 2, count: 10 },
    selector: `div[aria-posinset='3']`,
    eventName: 'click',
    afterTest: (mockEvent, wrapper) => expect(wrapper.instance().querySelectorAll(`.${prefixRate}-star-full`)).toHaveLength(3),
});
newEventsTest({
    title: 'component: Rate, <test prop:: onHoverChange>',
    Component: Rate,
    propFuncName: 'onHoverChange',
    dependentProps: { value: 2, count: 10 },
    selector: `div[aria-posinset='3']`,
    eventName: 'mouseMove',
    afterTest: (mockEvent, wrapper) => expect(wrapper.instance().querySelectorAll(`.${prefixRate}-star-full`)).toHaveLength(3),
});
newEventsTest({
    title: 'component: Rate, <test prop:: onKeyDown>',
    Component: Rate,
    propFuncName: 'onKeyDown',
    dependentProps: { value: 2, count: 10 },
    selector: `div[aria-posinset='3']`,
    eventName: 'keyDown',
    eventArgs: [{
        keyCode: KeyCode.ENTER
    }]
});
describe('fieldid', () => {
    [0, 1, 2, 3, 4].forEach((item) => {
        it(`@fieldid,"***_rate_${item}", <test prop:: fieldid>`, () => {
            if (wrapper) { wrapper.unmount() };
            const wrapper1 = mount(<Rate fieldid='fieldid-id' />);
            expect(wrapper1.find(`.${prefixRate}-star`).at(item).instance().getAttribute('fieldid')).toEqual(`fieldid-id_rate_${item}`)
        })
    })
    it('fieldid test', () => {
        if (wrapper) { wrapper.unmount() };
        class Demo1 extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    value: 3,
                    fieldId: 'field'
                };
            }
            handChange = (value) => {
                this.setState({
                    value,
                    fieldId: value ? 'field' + value : undefined
                })
            }
            render() {
                return (
                    <Rate fieldid={this.state.fieldId} value={this.state.value} onChange={this.handChange} />
                )
            }
        }
        let wrapper1 = mount(<Demo1 />)
        expect(wrapper1.find(`.${prefixRate}`).instance().getAttribute('fieldid')).toEqual('field')
        expect(wrapper1.find(`.${prefixRate}`).find(`.${prefixRate}-star`).at(0).instance().getAttribute('fieldid')).toEqual(`field_rate_0`)

        wrapper1.find(`.${prefixRate}-star`).at(0).find('div').at(0).simulate('click')
        expect(wrapper1.find(`.${prefixRate}`).instance().getAttribute('fieldid')).toEqual('field1')
        expect(wrapper1.find(`.${prefixRate}`).find(`.${prefixRate}-star`).at(0).instance().getAttribute('fieldid')).toEqual(`field1_rate_0`)

        wrapper1.find(`.${prefixRate}-star`).at(0).find('div').at(0).simulate('click')
        expect(wrapper1.find(`.${prefixRate}`).instance().getAttribute('fieldid')).toEqual(null)
        expect(wrapper1.find(`.${prefixRate}`).find(`.${prefixRate}-star`).at(0).instance().getAttribute('fieldid')).toEqual(null)
    })
})

describe('component: Rate, <test prop:: tooltips>', () => {
    it('the 4th full star tooltips good', async () => {
        const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
        const wrapper = mount(<Rate tooltips={desc} value={4} />);
        expect(wrapper.instance().querySelectorAll(`.${prefixRate}-star-full`)).toHaveLength(4);
        fireEvent.mouseOver(wrapper.instance().querySelectorAll(`.${prefixRate}-star-full`)[3]);
        await sleep(500)
        expect(wrapper.find(`.${prefix}-tooltip-inner`).text()).toBe('good');
    })
})

describe('component: Rate, <test prop:: index>, <test prop:: characterRender>', () => {
    //都是rc-rate的props, 实际传入没有效果, 也没有对外暴露
})
