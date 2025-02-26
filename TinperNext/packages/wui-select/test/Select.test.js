/** index.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {waitFor, screen} from "@testing-library/react";
import {actWait, attrsTest, eventsTest, sleep} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix'
import KeyCode from 'rc-util/lib/KeyCode';
import Icon from '../../wui-icon/src'
import Select from '../src';
import { act } from 'react-dom/test-utils';
import {Warning} from "../../wui-core/src";

const Option = Select.Option;
const options = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
        arr = [...arr, {value: `value${i}`, label: `label${i}`}]
    }
    return arr
} 
let wrapper
beforeEach(() => {

})
afterEach(() => {
    if (wrapper) {
        wrapper.unmount();
    }
})
Object.entries({lg: 'large', sm: 'small'}).forEach((item) => {
    attrsTest({
        title: 'component: Select, <test prop:: size>',
        Component: Select,
        attrs: {
            size: item[1]
        },
        selector: `.${prefix}-select`,
        classnames: [`${prefix}-select-${item[0]}`]
    })
})

attrsTest({
    title: 'component: Select, <test prop:: bordered>',
    Component: Select,
    attrs: {
        bordered: false
    },
    selector: `.${prefix}-select`,
    classnames: [`${prefix}-select-border-none`]
})
attrsTest({
    title: 'component: Select, <test prop:: bordered>',
    Component: Select,
    attrs: {
        bordered: 'bottom'
    },
    selector: `.${prefix}-select`,
    classnames: [`${prefix}-select-border-bottom`]
})
attrsTest({
  title: 'component: Select, <test prop:: loading>',
  Component: Select,
  attrs: {
    loading: true,
    open:true
  },
  selector: `.${prefix}-select`,
  classnames: [`${prefix}-select-loading`]
})
eventsTest({
    title: 'component: Select, <test prop:: onBlur>',
    Component: Select,
    propFuncName: 'onBlur',
    dependentProps: {},
    selector: 'input',
    eventName: 'blur',
    eventArgs: [],
    propFuncArgs: ["mockEvent"]
});
eventsTest({
    title: 'component: Select,<test prop:: getPopupContainer>, <test prop:: onFocus>',
    Component: Select,
    propFuncName: 'onFocus',
    dependentProps: {
        getPopupContainer: () => document.getElementById('popupEl'),
        showSearch: true,
        options: options(),
        value: options()[2].value
    },
    selector: `input`,
    eventName: 'focus',
});
// eventsTest({
//     title: 'component: Select,<test prop:: getPopupContainer>, <test prop:: onDropdownVisibleChange>',
//     Component: Select,
//     propFuncName: 'onDropdownVisibleChange',
//     dependentProps: {
//         getPopupContainer: () => document.getElementById('popupEl'),
//         allowClear: true,
//         options: options(),
//         value: options()[2].value
//     },
//     selector: `.${prefix}-select-selector`,
//     eventName: 'click',
//     propFuncArgs: [true]
// });
eventsTest({
    title: 'component: Select, <test prop:: onInputKeyDown>',
    Component: Select,
    propFuncName: 'onInputKeyDown',
    dependentProps: {},
    selector: 'input',
    eventName: 'keydown',
    eventArgs: [{keyCode: KeyCode.DOWN}]
})
eventsTest({
    title: 'component: Select, <test prop:: onMouseEnter>',
    Component: Select,
    propFuncName: 'onMouseEnter',
    dependentProps: {},
    selector: `.${prefix}-select`,
    eventName: 'mouseEnter'
})
eventsTest({
    title: 'component: Select, <test prop:: onSearch>',
    Component: Select,
    propFuncName: 'onSearch',
    dependentProps: {
        showSearch: true
    },
    selector: `input`,
    eventName: 'change',
    eventArgs: [{target: {value: '321'}}],
    propFuncArgs: ['321']
})

describe('component: Select, <test prop:: getPopupContainer>, <test prop:: onPopupScroll>', () => {
    it('it should be found 5 options when open as true', async () => {
        const mockPopupScroll = jest.fn();
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    options={options()} value={options()[2].value}
                    onPopupScroll={mockPopupScroll}
                    open={true}>
                </Select>
            </div>
        );
        await actWait();
        const popupElWrappers = wrapper.find(`.rc-virtual-list-holder`);
        popupElWrappers.simulate('scroll')
        expect(mockPopupScroll).toHaveBeenCalled()
    })
})
eventsTest({
    title: 'component: Select, <test prop:: onSelect>',
    Component: Select,
    propFuncName: 'onSelect',
    dependentProps: {
        options: options(),
        open: true,
        value: options()[2].value
    },
    selector: `.${prefix}-select-item-option`,
    eventName: 'click',
    propFuncArgs: ['value0'],
    act: true
});
describe('component: Select, <test prop:: onMouseLeave>', () => {

    it('onMouseLeave should be called ', () => {
        const mockMouseLeave = jest.fn();
        let wrapper = mount(<Select onMouseLeave={mockMouseLeave}>
        </Select>);
        const selectDiv = wrapper.find(`.${prefix}-select`).first()
        selectDiv.simulate('mouseEnter')
        expect(mockMouseLeave).not.toHaveBeenCalled();
        selectDiv.simulate('mouseleave')
        expect(mockMouseLeave).toHaveBeenCalled();
    })
})
describe('component: Select, <test prop:: autoFocus>', () => {

    it('onMouseLeave should be called ', () => {
        const mockMouseLeave = jest.fn();
        const mockFocus = jest.fn();
        let wrapper = mount(<Select autoFocus showSearch={true} onMouseLeave={mockMouseLeave} onFocus={mockFocus}>
        </Select>);
        wrapper.simulate('mouseEnter');
        setTimeout(() => expect(mockFocus).toHaveBeenCalled(), 250);

    })
})
describe('component: Select, <test prop:: onClear>', () => {
    // QDJCJS-7859 clear的时候不用处理选项是数组的情况  （更改前，若选项为非数组，点击清除会报错，无法触发onChange）
    it('mockClear should be called ', () => {
        const mockClear = jest.fn();
        const mockChange = jest.fn();
        let wrapper = mount(
            <Select allowClear onClear={mockClear} value="Array" defaultOpen id='idd' onChange={mockChange}>
                <Option value="svetlana" id="ida">Svetlana</Option>
	            <Option value="Array" id="idb">Array</Option>
            </Select>);
        const selectDiv = wrapper.find(`.${prefix}-select`).first()
        selectDiv.simulate('mouseEnter')
        expect(mockClear).not.toHaveBeenCalled();
        expect(mockChange).not.toHaveBeenCalled();
        const clearSpan = wrapper.find(`.${prefix}-select-clear`).first()
        clearSpan.simulate('mousedown')
        expect(mockClear).toHaveBeenCalled();
        expect(mockChange).toHaveBeenCalled();
    })
    it('mockClear should be called when value is array ', () => {
        let opt = () => {
            let arr = [];
            for (let i = 0; i < 5; i++) { arr = [...arr, {value: [`value${i}`], label: `label${i}`, id: `id${i}`}] }
            return arr
        } 
        const mockClear = jest.fn();
        let wrapper = mount(
            <Select allowClear={true} onClear={mockClear} options={opt()} id="id-of-select" 
                fieldid="fieldid-of-select" value={opt()[2].value}>
            </Select>);
        const selectDiv = wrapper.find(`.${prefix}-select`).first()
        selectDiv.simulate('mouseEnter')
        expect(mockClear).not.toHaveBeenCalled();
        const clearSpan = wrapper.find(`.${prefix}-select-clear`).first()
        clearSpan.simulate('mousedown')
        expect(mockClear).toHaveBeenCalled();
    })
    it('mockClear should be called when value is not in option', () => {
        let opt = () => {
            let arr = [];
            for (let i = 0; i < 5; i++) { arr = [...arr, {key: `key${i}`, label: `label${i}`, id: `id${i}`}] }
            return arr
        } 
        const mockClear = jest.fn();
        let wrapper = mount(
            <Select allowClear={true} onClear={mockClear} options={opt()} id="id-of-select" 
                fieldid="fieldid-of-select" value={opt()[2].key}>
            </Select>);
        const selectDiv = wrapper.find(`.${prefix}-select`).first()
        selectDiv.simulate('mouseEnter')
        expect(mockClear).not.toHaveBeenCalled();
        const clearSpan = wrapper.find(`.${prefix}-select-clear`).first()
        clearSpan.simulate('mousedown')
        expect(mockClear).toHaveBeenCalled();
    })
})
describe('component: Select, <test prop:: clearIcon>', () => {
    it(`it should have new icon and class as uf-dongjie`, () => {
        const wrapper = mount(<Select allowClear={true} showSearch={true} defaultValue="全部"
									  clearIcon={<Icon type="uf-dongjie"/>}>
        </Select>);
        let i = wrapper.find(`.${prefix}-select-clear i`).first();
        expect(i.hasClass(`uf-dongjie`)).toBeTruthy();
    })
})
describe('component: Select, <test prop:: suffixIcon>', () => {
    it(`it should have new icon and class as uf-dongjie`, () => {
        const wrapper = mount(<Select allowClear={true} showSearch={true} defaultValue="全部"
									  suffixIcon={<Icon type="uf-dongjie"/>}>
        </Select>);
        let i = wrapper.find(`.${prefix}-select-arrow i`).first();
        expect(i.hasClass(`uf-dongjie`)).toBeTruthy();
    })
})
describe('component: Select, <test prop:: notFoundContent>',() => {
    it(`it should have new icon and class as uf-dongjie`, async() => {
        const wrapper = mount(<Select allowClear={true} open={true} showSearch={true} defaultValue="全部"
									  notFoundContent={<Icon type="uf-dongjie"/>}>
        </Select>);
        await actWait();
        await sleep(100);
        let i = wrapper.find(`.${prefix}-select-item-empty i`).first();
        expect(i.hasClass(`uf-dongjie`)).toBeTruthy();
    })
})

describe('component: Select, <test prop:: placeholder>', () => {

    it('the value should be demo11 ', () => {
        let wrapper = mount(<Select placeholder="请输入或选择">
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
        </Select>);
        let placeholderSpan = wrapper.find(`.${prefix}-select-selection-placeholder`).first();
        expect(placeholderSpan.text()).toBe('请输入或选择');
    })

    it('after select click the placeholder should be empty ', async() => {
        let wrapper = mount(<Select placeholder="请输入或选择" defaultOpen={true}>
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
        </Select>);
        await actWait(1000);
        wrapper.find(`.${prefix}-select-item-option`).first().simulate('click');
        expect(wrapper.find(`.${prefix}-select-selection-placeholder`).length).toBe(0);
    })
})
describe('component: Select, <test prop:: getPopupContainer>, <test prop:: defaultOpen>', () => {
    it('it should be found 5 options when open as true', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    defaultOpen={true}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        const popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers.length).toBe(5)
    })
})
describe('component: Select, <test prop:: getPopupContainer>, <test prop:: open>', () => {
    it('it should be found 5 options when open as true', async() => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    open={true}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        const popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers.length).toBe(5)
    })
})
describe('component: Select, <test prop:: getPopupContainer>, <test prop:: showArrow>', () => {
    it('it should be found 5 options when open as true', () => {
        const wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    showArrow={false}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        let arrow = wrapper.find(`.${prefix}-select-arrow`);
        expect(arrow).toHaveLength(0);
        wrapper.unmount();
        const wrapper1 = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    showArrow={true}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        const arrow1 = wrapper1.find(`.${prefix}-select-arrow`);
        expect(arrow1).not.toHaveLength(0);
    })
})
describe('component: Select, <test prop:: allowClear>', () => {

    it('the value should be demo11 ', () => {
        let wrapper = mount(<Select allowClear={true}>
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
        </Select>);
        let div = wrapper.find(`.${prefix}-select.${prefix}-select-single`).first();
        expect(div.hasClass(`${prefix}-select-allow-clear`)).toBeTruthy();
    })
})
describe('component: Select, <test prop:: getPopupContainer>, <test prop:: disabled>', () => {
    it('it should be no options when disabled ', () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')
                }
                disabled={true}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        let outDiv = wrapper.find(`.${prefix}-select-selector`);
        outDiv.simulate('mousedown');
        const popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers).toHaveLength(0)
    })
})
describe('component: Select, <test prop:: getPopupContainer>, <test prop:: dropdownClassName>', () => {
    it('it should be custom className ', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    dropdownClassName='my-class' defaultOpen>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        const popupElWrappers = wrapper.find(`.${prefix}-select-dropdown`);
        
        expect(popupElWrappers.hasClass('my-class')).toBeTruthy()
    })
})
describe('component: Select, <test prop:: getPopupContainer>, <test prop:: dropdownStyle>', () => {
    it('the color should be red ', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    dropdownStyle={{color: 'red'}} open={true}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        // let outDiv = wrapper.find(`.${prefix}-select-selector`);
        // outDiv.simulate('click');
        await actWait();
        const popupElWrappers = wrapper.find(`.${prefix}-select-dropdown`);
        expect(popupElWrappers.getDOMNode().style.color).toEqual('red')
    })
})

attrsTest({
    title: 'component: Select, <test prop:: showSearch>',
    Component: Select,
    attrs: {
        showSearch: true,
        children: <Option value="all">all</Option>
    },
    selector: `input`,
    classnames: [`${prefix}-select-selection-search-input`]
})

describe('component: Select <test prop:: filterOption>, <test prop:: showSearch>', () => {
    it('options count should be 4', async() => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    open={true}
                    showSearch={true}
                    filterOption={true}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                    <Option value="develop1">demo14</Option>
                    <Option value="develop2">demo14</Option>
                    <Option value="develop3">demo14</Option>
                    <Option value="develop4">demo14</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        const input = wrapper.find('input').first();
        input.simulate('change', {target: {value: 'demo'}})
        const popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers.length).toBe(4)
    })
    it('options count should be 3', async() => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    open={true}
                    showSearch={true}
                    filterOption={(inputValue, option) => {
                        return option.children.includes(inputValue)
                    }}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo22</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                    <Option value="develop1">develop14</Option>
                    <Option value="develop2">develop14</Option>
                    <Option value="develop3">develop14</Option>
                    <Option value="develop4">develop14</Option>
                </Select>
            </div>
        );
        await actWait(500);
        const input = wrapper.find('input').first();
        input.simulate('change', {target: {value: 'demo1'}})
        const popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers.length).toBe(3)
    })
    it('when select value the selectionStart not 0', async() => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                        defaultOpen={true}
                        showSearch={true}
                        filterOption={true}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                    <Option value="develop1">demo14</Option>
                    <Option value="develop2">demo14</Option>
                    <Option value="develop3">demo14</Option>
                    <Option value="develop4">demo14</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        wrapper.find(`.${prefix}-select-item-option`).last().simulate('click');
        const input = wrapper.find('.wui-select-selection-item').getDOMNode();
        expect(input.title).toEqual('demo14');
    })
})
describe('component: Select <test prop:: filterOption>, <test prop:: filterSort>, <test prop:: getPopupContainer>, <test prop:: open>, <test prop:: showSearch>', () => {
    it('options should be filter', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    open={true}
                    showSearch={true}
                    filterSort={(optionA, optionB) => optionA.children - optionB.children}
                    filterOption={true}>
                    <Option value="all">8</Option>
                    <Option value="demo1">2</Option>
                    <Option value="demo2">3</Option>
                    <Option value="demo3">4</Option>
                    <Option value="demo4">1</Option>
                    <Option value="develop1">5</Option>
                    <Option value="develop2">6</Option>
                    <Option value="develop3">3</Option>
                    <Option value="develop4">4</Option>
                </Select>
            </div>
        );
        await actWait(1000)
        const input = wrapper.find('input').first();
        input.simulate('change', {target: {value: 'demo'}})
        wrapper.update();
        const popupElWrapper1 = wrapper.find(`.${prefix}-select-item-option`).first();
        expect(popupElWrapper1.text()).toBe("1")
        const popupElWrapper2 = wrapper.find(`.${prefix}-select-item-option`).at(1);
        expect(popupElWrapper2.text()).toBe("2")
    })
})
describe('component: Select <test prop:: optionFilterProp>, <test prop:: getPopupContainer>, <test prop:: open>, <test prop:: showSearch>', () => {
    it('options should be filter', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    open={true}
                    showSearch={true}
                    optionFilterProp="children">
                    <Option value="all">8</Option>
                    <Option value="demo1">2</Option>
                    <Option value="demo2">3</Option>
                    <Option value="demo3">4</Option>
                    <Option value="demo4">1</Option>
                    <Option value="develop1">3</Option>
                    <Option value="develop2">3</Option>
                    <Option value="develop3">3</Option>
                    <Option value="develop4">3</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        const input = wrapper.find('input').first();
        input.simulate('change', {target: {value: '3'}})
        const popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers.length).toBe(5)
    })
})
describe('component: Select <test prop:: labelInValue>, <test prop:: getPopupContainer>, <test prop:: open>, <test prop:: onChange>', () => {
    it('label should be 8', async () => {
        const mockChange = jest.fn();
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    open={true}
                    labelInValue={true}
                    onChange={mockChange}>
                    <Option value="all">8</Option>
                    <Option value="demo1">2</Option>
                    <Option value="demo2">3</Option>
                    <Option value="demo3">4</Option>
                    <Option value="demo4">1</Option>
                    <Option value="develop1">5</Option>
                    <Option value="develop2">6</Option>
                    <Option value="develop3">3</Option>
                    <Option value="develop4">4</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        expect(mockChange).not.toHaveBeenCalled();
        const popupElWrapper1 = wrapper.find(`.${prefix}-select-item-option`).first();
        popupElWrapper1.simulate('click')
        expect(mockChange).toHaveBeenCalled();
        expect(mockChange.mock.calls[0][0].label).toEqual('8')
        expect(mockChange.mock.calls[0][0].value).toEqual('all')
    })
    // 补充传递数组value的情况下，onSelect和onDeselect的逻辑
    it('when value is array, <test prop:: onChange>, <test prop:: onSelect>', async () => {
        const onchange = jest.fn()
        const onselect = jest.fn()
        let wrapper = mount(
            <Select defaultOpen value={['aa']} onChange={onchange} onSelect={onselect} id='idd'>
                    <Option value={['aa']} id="ida">aaa</Option>
                    <Option value={['bb']} id="idb">bbb</Option>
            </Select>
        )
        await actWait(1000);
        expect(wrapper.find(`.${prefix}-select-item-option`).at(0).prop('id')).toEqual("idd_option_0")
        expect(wrapper.find(`.${prefix}-select-item-option`).at(1).prop('id')).toEqual("idd_option_1")
        expect(wrapper.find(`.${prefix}-select-selection-item`).text()).toEqual('aaa')
        wrapper.find(`.${prefix}-select-item-option`).at(1).simulate('click');
        expect(onchange.mock.calls[0][0]).toEqual(["bb"])
        expect(onselect.mock.calls[0][0]).toEqual(["bb"])
    })
})
describe('component: Select <test prop:: listHeight>, <test prop:: getPopupContainer>, <test prop:: open>', () => {
    it('options should be 4', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    open={true}
                    listHeight={200}>
                    <Option value="all">8</Option>
                    <Option value="demo1">2</Option>
                    <Option value="demo2">3</Option>
                    <Option value="demo3">4</Option>
                    <Option value="demo4">1</Option>
                    <Option value="demo5">1</Option>
                    <Option value="demo6">1</Option>
                    <Option value="demo7">1</Option>
                    <Option value="demo8">1</Option>
                    <Option value="develop1">5</Option>
                    <Option value="develop21">5</Option>
                    <Option value="develop31">5</Option>
                    <Option value="develop41">5</Option>
                    <Option value="develop2">6</Option>
                    <Option value="develop3">3</Option>
                    <Option value="develop4">4</Option>
                </Select>
            </div>
        );
        await actWait()
        const popupElWrapper1 = wrapper.find(`.rc-virtual-list-holder`).first();
        expect(popupElWrapper1.getDOMNode().style['max-height']).toBe('200px');
    })
})
describe('component: Select <test prop:: options>, <test prop:: getPopupContainer>, <test prop:: open>, <test prop:: data>', () => {
    it('options should be 4', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')}
                    open={true}
                    options={[
                        {label: 'all', value: '8'},
                        {label: '20', value: 'demo10'},
                        {label: '21', value: 'demo12'},
                        {label: '22', value: 'demo13'},
                        {label: '23', value: 'demo14'},
                        {label: '24', value: 'demo15'},
                        {label: '25', value: 'demo16'},
                        {label: '26', value: 'demo17'},
                        {label: '27', value: 'demo18'},
                    ]}>
                </Select>
            </div>
        );
        await actWait(1000);
        const popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers.length).toBe(9)
    })
})

// todo it not precise enough, may be a bug
describe('component: Select, <test prop:: dropdownMatchSelectWidth>', () => {
    it('it should has a width when dropdownMatchSelectWidth as true', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select
                    dropdownMatchSelectWidth={true}
                    open={true}
                    style={{width: 200}}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11dfsdfsdfsdfsdfsdfsdfsdfsdfdsfffffffffffffffffffffffff</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        let outDiv = wrapper.find(`.${prefix}-select-selector`);
        outDiv.simulate('mousedown');
        const popupElWrapper = wrapper.find(`.${prefix}-select-dropdown`);
        expect(popupElWrapper.getDOMNode().style.width).not.toEqual('')
    })
    it('it should has a width when dropdownMatchSelectWidth as false ', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select
                    dropdownMatchSelectWidth={false}
                    open={true}
                    style={{width: 200}}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11dfsdfsdfsdfsdfsdfsdfsdfsdfdsfffffffffffffffffffffffff</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        const popupElWrapper = wrapper.find(`.${prefix}-select-dropdown`);
        expect(popupElWrapper.getDOMNode().style.width).toEqual('')
    })
})


// single select

describe('component: Select, <test prop:: defaultValue>', () => {

    it('the value should be demo11 ', () => {
        let wrapper = mount(<Select defaultValue="demo1">
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
            <Option value="demo2">demo12</Option>
            <Option value="demo3">demo13</Option>
            <Option value="demo4">demo14</Option>
        </Select>);
        let showValEl = wrapper.find(`.${prefix}-select-selection-item`).first();
        expect(showValEl.text()).toBe('demo11');
    })
})
describe('component: Select, <test prop:: searchValue>', () => {

    it('the value should be demo11 ', () => {
        let wrapper = mount(<Select searchValue="demo2" showSearch>
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
            <Option value="demo2">demo12</Option>
            <Option value="demo3">demo13</Option>
            <Option value="demo4">demo14</Option>
        </Select>);
        const input = wrapper.find('input').first()
        expect(input.props().value).toBe('demo2');
    })
})
describe('component: Select, <test prop:: virtual>, <test prop:: options>', () => {

    it('the value should be demo11 ', async () => {
        let wrapper = mount(<Select virtual={true} options={options()} open={true}>
        </Select>);
        await actWait(1000);
        let popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers.length).toBe(12)
        wrapper.setProps({virtual: false});
        wrapper.update();
        popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers).toHaveLength(options().length)
    })
})
describe('component: Select, <test prop:: optionLabelProp>', () => {

    it('the value should be demo11 ', () => {
        let wrapper = mount(<Select optionLabelProp="value" value="demo2">
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
            <Option value="demo2">demo12</Option>
            <Option value="demo3">demo13</Option>
            <Option value="demo4">demo14</Option>
        </Select>);
        let showValEl = wrapper.find(`.${prefix}-select-selection-item`).first();
        expect(showValEl.text()).toBe('demo2');
    })
})
describe('component: Select, <test prop:: getPopupContainer>, <test prop:: defaultActiveFirstOption>', () => {

    it('it should be found 5 options ', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')
                }
                defaultActiveFirstOption={true} defaultOpen>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>
            </div>
        );
        await actWait(1000);
        let outDiv = wrapper.find(`.${prefix}-select-selector`);
        outDiv.simulate('click');
        const popupElWrappers = wrapper.find(`.${prefix}-select-item-option`);
        expect(popupElWrappers).toHaveLength(5)
        expect(popupElWrappers.first().hasClass(`${prefix}-select-item-option-active`)).toBeTruthy();
    })
})

describe('component: Select, <test prop:: value>', () => {
    it('the value should be demo11 ', () => {
        let wrapper = mount(<Select value="demo1">
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
        </Select>);
        const showValEl = wrapper.find(`.${prefix}-select-selection-item`).first();
        expect(showValEl.text()).toBe('demo11');
    })
})

describe('component: Select, <test prop:: title>', () => {
    it('the value should be demo11 ', () => {
        let wrapper = mount(<Select value="demo1" title={'demo1'}>
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
        </Select>);
        const showValEl = wrapper.find(`.${prefix}-select-selector`);
        expect(showValEl.text()).toBe('demo11');
    })
})

describe('when child has array', () => {
    it('when child has array', async () => {
        let children = [<Option value='demo1'>demo11</Option>, <Option value='demo2'>demo22</Option>]
        let wrapper = mount(
            <Select open>
                {[children, <Option value='demo3'>demo33</Option>]}
            </Select>
        )
        await actWait(1000);
        expect(wrapper.find('input').hasClass(`${prefix}-select-selection-search-input`)).toEqual(true)
        expect(wrapper.find(`.${prefix}-select-item-option-content`).at(0).text()).toEqual('demo11')
        expect(wrapper.find(`.${prefix}-select-item-option-content`).at(1).text()).toEqual('demo22')
        expect(wrapper.find(`.${prefix}-select-item-option-content`).at(2).text()).toEqual('demo33')
    })
})

// multiple select

describe('event test', () => {
    // 补充传递数组value的情况下，onSelect和onDeselect的逻辑
    it('when value is array, <test prop:: onChange>, <test prop:: onDeselect>', async () => {
        const onchange = jest.fn()
        const ondeselect = jest.fn()
        let wrapper = mount(
            <Select defaultOpen mode="multiple" data-is-array={true} value={['cc', 'dd']} onChange={onchange} onDeselect={ondeselect}>
                    <Option value={['cc']}>ccc</Option>
                    <Option value={['dd']}>ddd</Option>
            </Select>
        )
        await actWait(1000);
        wrapper.find(`.${prefix}-select-item-option`).at(0).simulate('click');
        expect(wrapper.find(`.${prefix}-select-selection-item-content`).at(0).text()).toEqual('ccc')
        expect(wrapper.find(`.${prefix}-select-selection-item-content`).at(1).text()).toEqual('ddd')
        expect(onchange).toHaveBeenCalledTimes(1)
        wrapper.find(`.${prefix}-select-selection-overflow`).find(`.${prefix}-select-selection-item-remove`).at(0).simulate('click');
        expect(ondeselect.mock.calls[0][0]).toEqual(["cc"]);
    })
})
describe('component: Select, <test prop:: mode> <test prop:: removeIcon>', () => {

    it('multiple toMatchSnapshot ', () => {
        let wrapper = mount(<Select showSearch={true} allowClear={true} mode="multiple"
            removeIcon={<Icon type="uf-dongjie"/>} value={['all']}>
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
        </Select>);
        expect(wrapper.find(`.${prefix}-select-selection-item-remove i`).hasClass(`uf-dongjie`)).toBeTruthy();
    })
})
describe('component: Select, <test prop:: mode> <test prop:: menuItemSelectedIcon>', () => {

    it('multiple toMatchSnapshot ', async () => {
        let wrapper = mount(<Select showSearch={true} allowClear={true} 
            open={true}
            mode="multiple"
            menuItemSelectedIcon={<Icon type="uf-dongjie"/>} value={['all']}>
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
        </Select>);
        await actWait();
        expect(wrapper.find(`.${prefix}-select-item-option-selected i`).first().hasClass(`uf-dongjie`)).toBeTruthy();
    })
})
// describe('component: Select, <test prop:: tags>', () => {

//     xit('tags toMatchSnapshot', () => {
//         let wrapper = mount(<Select tags={true}>
//             <Option value="all">all</Option>
//             <Option value="demo1">demo11</Option>
//         </Select>);
//     })
// })

describe('component: Select, <test prop:: resizable>', () => {
    it('is resizable', async () => {
        let wrapper = mount(<Select resizable={true} open={true}>
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
        </Select>);
        await actWait();
        expect(wrapper.find(`div.${prefix}-select-resizebox`)).toHaveLength(1);
        wrapper.find(`div.${prefix}-select-resizebox`).simulate('mouseEnter');
        expect(wrapper.find(`div.rc-virtual-list-holder`).props().style['max-height']).toBe('320px');
    })
})
// todo
describe('component: Select, <test prop:: mode>, <test prop:: maxTagTextLength> ', () => {
    it('the value should be demo11 ', () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select getPopupContainer={() => document.getElementById('popupEl')} open={true} mode='tags'
                    value={['all', 'demo1']} maxTagTextLength={10}>
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                </Select>
            </div>);
        expect(wrapper.find(`.${prefix}-select-selection-overflow-item`)).toHaveLength(3)
    })
})

describe('component: Select, ' +
    '<test prop:: itemIcon>,' +
    ' <test prop:: dropdownMenuStyle>, ' +
    '<test prop:: dataIndex>,' +
    ' <test prop:: filterDropdown>,' +
    '<test prop:: filterDropdownType>,' +
    '<test prop:: filterDropdownIncludeKeys>,' +
    '<test prop:: scrollToEnd>,' +
    '<test prop:: onFilterChange>,' +
    '<test prop:: onFilterClear>,' +
    '<test prop:: onKeyDown>,', () => {
    it('those attr are no support in select', () => {
      expect(true).toBe(true)
    })
})

// 新增单选的fieldid测试
describe('component:  Select, <test prop:: fieldid>', () => {
    it('[contains(@fieldid,"***_suffix","***_option_")]', async () => {
        let wrapper = mount(<Select open={true}>
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
            <Option value="demo2">demo12</Option>
            <Option value="demo3">demo13</Option>
            <Option value="demo4">demo14</Option>
        </Select>);
        await actWait();
        expect(wrapper.find(`.${prefix}-select-arrow i`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefix}-select-item-option`).at(0).props().fieldid).toBe(undefined);
        wrapper.setProps({ fieldid: 'test' });
        wrapper.update();
        expect(wrapper.find(`.${prefix}-select-arrow i`).at(0).props().fieldid).toBe('test_suffix');
        expect(wrapper.find(`.${prefix}-select-item-option`).at(0).props().fieldid).toBe('test_option_0');
    });
});
// 新增多选的fieldid测试 Select组件支持fieldid
describe('component:  Select, <test prop:: fieldid>',  () => {
    it('[contains(@fieldid,"***_remove","***_item_selected","***_clear")]', async() => {
        let wrapper = mount(<Select showSearch={true} allowClear={true}
            open={true} mode="multiple" value={['all']}>
            <Option value="all">all</Option>
            <Option value="demo1">demo11</Option>
        </Select>);
        await actWait(1000);
        expect(wrapper.find(`.${prefix}-select-selection-item-remove i`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefix}-select-item-option-selected .${prefix}-checkbox`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefix}-select-clear `).at(0).props().fieldid).toBe(undefined);
        wrapper.setProps({ fieldid: 'test' });
        wrapper.update();
        expect(wrapper.find(`.${prefix}-select-item-option-selected .${prefix}-checkbox`).at(0).props().fieldid).toBe('test_item_selected');
        expect(wrapper.find(`.${prefix}-select-clear i`).at(0).props().fieldid).toBe('test_clear');
    });
    it('[contains(@fieldid,"***_tag_${i}","***_remove_${i}")]', async () => {
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
        let wrapper = mount(
                <Select defaultOpen={true} fieldid='fied' mode='multiple' defaultValue={['demo1', 'demo2']}>
                    <Option value="demo1">demo11</Option>
                    <Option value="demo2">demo12</Option>
                    <Option value="demo3">demo13</Option>
                    <Option value="demo4">demo14</Option>
                </Select>, { attachTo: document.getElementById('container') }
        );
        await actWait();
        expect(wrapper.find(`.${prefix}-select`).prop('fieldid')).toEqual('fied')
        expect(wrapper.find(`.${prefix}-select-selection-overflow-item`).at(0).instance().getAttribute('fieldid')).toEqual("fied_tag_0")
        expect(wrapper.find(`.${prefix}-select-selection-overflow-item`).at(1).instance().getAttribute('fieldid')).toEqual("fied_tag_1")
        expect(document.body.getElementsByClassName(`${prefix}-select-selection-item-remove`)[0].getAttribute('fieldid')).toEqual("fied_remove_0")
        expect(document.body.getElementsByClassName(`${prefix}-select-selection-item-remove`)[1].getAttribute('fieldid')).toEqual("fied_remove_1")
    });
});

// 兼容性
describe('component: Select', () => {
    it('the text should be demo11 ', () => {
        let wrapper = mount(
            <Select value="demo1">
                <Option key="all">all</Option>
                <Option key="demo1">demo11</Option>
            </Select>);
        const showValEl = wrapper.find(`.${prefix}-select-selection-item`).first();
        expect(showValEl.text()).toBe('demo11');
    })
    it('different value test ', async () => {
        let wrapper = mount(
            <Select defaultValue="all" defaultOpen={true} >
                <Option value="all">all</Option>
                <Option value={[10, 2, 3]}>demo11</Option>
                <Option value={['10', '2', '3']}>demo22</Option>
            </Select>);
        await actWait();
        expect(wrapper.find(`.${prefix}-select-item-option`).at(1).text()).toBe('demo11');
        expect(wrapper.find(`.${prefix}-select-item-option`).at(2).text()).toBe('demo22');
    })
    it('the text should be [1, 2, [3, 4], 5]', async () => {
        let wrapper = mount(
            <Select defaultValue="all" defaultOpen={true}>
                <Option value="all">all</Option>
                <Option value="demo1">[1, 2, [3, 4], 5]</Option>
            </Select>);
        await actWait(1000);
        // screen.debug()
        expect(wrapper.find(`.${prefix}-select-item-option .${prefix}-select-item-option-content`).at(1).text()).toBe('[1, 2, [3, 4], 5]');
    })
    it('id should be dong', async () => {
        const mockChange = jest.fn();
        let wrapper = mount(
            <Select defaultOpen={true} labelInValue={true} onChange={mockChange} id="autu" >
	            <Option value="spring" id="chun">春天</Option>
	            <Option value="summer" id="xia">夏天</Option>
	            <Option value="autumn" id="qiu" disabled>
					秋天
	            </Option>
	            <Option value="winter" id="dong">冬天</Option>
	        </Select>);
        await actWait(1000);
        expect(mockChange).not.toHaveBeenCalled();
        const popupElWrapper1 = wrapper.find(`.${prefix}-select-item-option`).last();
        popupElWrapper1.simulate('click')
        expect(mockChange).toHaveBeenCalled();
        expect(mockChange.mock.calls[0][1].id).toEqual('dong')
    }) 
    it('mode="combobox" value', () => {
        const wrapper = mount(
            <Select showSearch allowClear mode="combobox" optionFilterProp="children" 
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="beijing">北京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="guangzhou">广州</Option>
            </Select>)

        const input = wrapper.find('input').first();
        input.simulate('change', {target: {value: 'mosike'}});
        wrapper.find('input').simulate('blur');
        wrapper.update();
        expect(wrapper.find('input').prop('value')).toEqual('mosike');

        input.simulate('change', {target: {value: 'shanghai'}});
        wrapper.find('input').simulate('blur');
        wrapper.update();
        expect(wrapper.find('input').prop('value')).toEqual('上海');

        wrapper.setProps({ value: 'shanghai' });
        wrapper.update();
        expect(wrapper.find('input').prop('value')).toEqual('上海')
    })
    it('dropdownClassName,  <test prop:: dropdownClassName>', async () => {
        const wrapper = mount(
            <Select dropdownClassName="test" defaultOpen
                    getSelectAttrs={() => { return {test: '1'} }}>
                <Option value="spring">春天</Option>
	            <Option value="summer">夏天</Option>
	            <Option value="autumn" disabled>
					秋天
	            </Option>
	            <Option value="winter">冬天</Option>
            </Select>)
        await actWait();
        expect(wrapper.find(`.${prefix}-select-dropdown`).hasClass('test')).toEqual(true)
    })
    // maxtag内容数字后面去除省略号
    it('The excess will be displayed + n,  <test prop:: maxTagCount>', async () => {
        const wrapper = mount(
            <Select
				 mode='multiple'
				 style={{width: 320}}
				 placeholder="select one country"
				 defaultValue={['china']}
				 optionLabelProp="label"
                 defaultOpen
			 >
				 <Option value="china" label="China">
					 China (中国)
				 </Option>
				 <Option value="russia" label="Russia">
					 Russia (俄罗斯)
				 </Option>
				 <Option value="australia" label="Australia">
					 Australia (澳大利亚)
				 </Option>
				 <Option value="korea" label="Korea">
					 Korea (韩国)
				 </Option>
			 </Select>)
        await actWait(1000);
        expect(wrapper.exists(`.${prefix}-select-selection-overflow-item-rest`)).toEqual(false);

        wrapper.setProps({ maxTagCount: 2 })
        wrapper.update()
        wrapper.find(`.${prefix}-select-item-option`).at(1).simulate('click');
        wrapper.find(`.${prefix}-select-item-option`).at(2).simulate('click');
        expect(wrapper.find(`.${prefix}-select-selection-overflow-item-rest`).find(`.${prefix}-select-selection-item-content`).text()).toEqual('+ 1');
        wrapper.find(`.${prefix}-select-item-option`).at(3).simulate('click');
        expect(wrapper.find(`.${prefix}-select-selection-overflow-item-rest`).find(`.${prefix}-select-selection-item-content`).text()).toEqual('+ 2');
        wrapper.find('.uf-close').at(1).simulate('click');
        expect(wrapper.find(`.${prefix}-select-selection-overflow-item-rest`).find(`.${prefix}-select-selection-item-content`).text()).toEqual('+ 1');
    })
    it('onDeselect should be called, <test prop:: onDeselect>', async () => {
        const onDeselect = jest.fn();
        const onSelect = jest.fn();
        let wrapper = mount(
            <Select mode='multiple' showArrow={false} allowClear defaultOpen onSelect={onSelect} onDeselect={onDeselect} >
	            <Option value='10'>10</Option>
                <Option value='11'>11</Option>
                <Option value='12'>12</Option>
	        </Select> )
        await actWait();
        expect(onDeselect).not.toHaveBeenCalled();
        expect(onSelect).not.toHaveBeenCalled();
        wrapper.find(`.${prefix}-select-item-option`).at(0).simulate('click');
        expect(onSelect.mock.calls[0][0]).toBe('10');
        wrapper.find(`.${prefix}-select-selection-overflow`).find(`.${prefix}-select-selection-item-remove`).at(0).simulate('click');
        expect(onDeselect.mock.calls[0][0]).toBe('10');
    })
    // QDJCJS-7402 Select组件增加外层容器属性功能
    it('this tag should have hello, <test prop:: getSelectAttrs>', () => {
        let wrapper = mount(
            <Select dropdownClassName="test" getSelectAttrs={() => {
                return {hello: '1'}
            }} defaultValue="spring">
                <Option value="spring">春天</Option>
                <Option value="summer">夏天</Option>
                <Option value="autumn" disabled>
                    秋天
                </Option>
                <Option value="winter">冬天</Option>
            </Select>
        )
        wrapper.find('input').simulate('keydown', {keyCode: KeyCode.ENTER});
        expect(document.getElementsByClassName('test')[0].getAttribute('hello')).toEqual('1')
    })
    // QDJCJS-5962 Select组件增加部分翻译内容
    it('the text should be this locale, <test prop:: locale>', async () => {
        const wrapper = mount(<Select locale='zh-cn' open />)
        await actWait();
        expect(wrapper.find(`.${prefix}-select-item-empty`).find('span').text()).toEqual('暂无数据');
        wrapper.setProps({ locale: 'en-us' });
        expect(wrapper.find(`.${prefix}-select-item-empty`).find('span').text()).toEqual('Not Found');
        wrapper.setProps({ locale: 'zh-tw' });
        expect(wrapper.find(`.${prefix}-select-item-empty`).find('span').text()).toEqual('暫無數據');
        wrapper.setProps({ locale: 'vi-vn' });
        expect(wrapper.find(`.${prefix}-select-item-empty`).find('span').text()).toEqual('Không có dữ liệu');
    })
})

describe('maxTagCount="auto"', () => {
    it('event, <test prop:: onChange>, <test prop:: onSelect>', async () => {
        const onSelect = jest.fn();
        const onChange = jest.fn();
        let wrapper = mount(
            <Select onSelect={onSelect} onChange={onChange} showArrow={false}
                maxTagCount="auto" allowClear defaultOpen >
                    <Option value='10'>10</Option>
                    <Option value='11'>11</Option>
                    <Option value='12'>12</Option>
            </Select>
        )
        await actWait(1000);
        wrapper.find(`.${prefix}-select-item-option`).at(0).simulate('click');
        expect(onSelect.mock.calls[0][0]).toBe('10');
        expect(onChange.mock.calls[0][0]).toMatchObject(['10']);
    })
    it('dropdownRender should replace options, <test prop:: dropdownRender>', async () => {
        let wrapper = mount(
            <Select maxTagCount="auto"  defaultOpen>
                <Option value='10'>10</Option>
                <Option value='11'>11</Option>
                <Option value='12'>12</Option>
            </Select>
        )
        await actWait();
        expect(wrapper.find('.rc-virtual-list-holder-inner').find(`.${prefix}-select-item`).length).toBe(3)
        wrapper.setProps({ dropdownRender: () => {
            return <div className='demo'>dropdownRender</div>
        } })
        expect(wrapper.find(`.${prefix}-select-dropdown div`).getDOMNode().innerHTML).toEqual("<div class=\"demo\">dropdownRender</div>")
    })
})

describe('Component: Select', () => {
    // 用户在Option中传了id，回调函数时，使用这个id
    it('id should be option id', async () => {
        const onchange = jest.fn()
        let wrapper = mount(
            <Select open onChange={onchange} id='idd' value={['aa']}>
                    <Option value={['aa']}>aaa</Option>
                    <Option value={['bb']} id="idb">bbb</Option>
            </Select>
        );
        await actWait();
        wrapper.find(`.${prefix}-select-item-option`).at(1).simulate('click');
        expect(onchange.mock.calls[0][1]).toEqual({"children": "bbb", "data-id": "idb", "id": "idb", "key": null, "value": "bb"});

        wrapper.setProps({ value: ['bb']})
        wrapper.find(`.${prefix}-select-item-option`).at(0).simulate('click');
        expect(onchange.mock.calls[1][1]).toEqual({"children": "aaa", "id": "idd_option_0", "key": null, "value": "aa"});
    })
})

describe('resizable=true', () => {
    it('resizable should replace options, <test prop:: resizable>', async () => {
        let wrapper = mount(
            <div id="popupEl">
                <Select placement='topRight' defaultOpen
                resizable getPopupContainer={() => document.getElementById('popupEl')} open={true} >
                    <Option value="all">all</Option>
                    <Option value="demo1">demo11</Option>
                </Select>
            </div>);
        await actWait(2000);
        // screen.debug()
        expect(wrapper.find(`.${prefix}-select-resizebox`).length).toBe(1)
    })
})