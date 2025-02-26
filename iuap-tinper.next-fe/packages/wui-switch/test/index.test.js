/** Switch.tsx */
import {mount, shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, eventsTest, focusTest, mountTest} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix'
import KeyCode from 'rc-util/lib/KeyCode';
import Switch from '../src/index';
import {fireEvent, screen, render} from '@testing-library/react'
const prefixSwitch = `${prefix}-switch`

const mocEventTarget = {
    persist: () => {
    },
    nativeEvent: {
        stopPropagation: () => {
        },
        preventDefault: () => {
        },
    }
}

describe('switch', () => {
    mountTest(Switch)
    focusTest({title: 'component: Switch, <test prop:: autoFocus>', Component: Switch, refFocus: true})
    it('Switch should be exist', () => {
        let mSwitch = mount(<Switch/>);
        expect(mSwitch.find('button').at(0).hasClass(`${prefixSwitch}`)).toEqual(true)
    })
    it('should has click wave effect', () => {
        const wrapper = mount(<Switch/>);
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find('button').at(0).hasClass('is-checked')).toEqual(true);
    });
})

describe('component: Switch, <test prop:: loading>', () => {
    it('Switch should be loading', () => {
        let mSwitch = mount(<Switch loading/>);
        expect(mSwitch.find(`button.${prefixSwitch}`).at(0).hasClass(`${prefixSwitch}-loading`)).toEqual(true);
    })
    it('Switch should not be click', () => {
        const mockClick = jest.fn();
        let mSwitch = mount(<Switch loading onClick={mockClick}/>);
        mSwitch.simulate('click');
        expect(mockClick).not.toHaveBeenCalled();
    })
});

describe('checked', () => {
    it('Switch should be checked', () => {
        let mSwitch = mount(<Switch checked/>);
        expect(mSwitch.find(`button.${prefixSwitch}`).at(0).hasClass('is-checked')).toEqual(true);
    })
});

describe('component: Switch, <test prop:: defaultChecked>', () => {
    it('Switch defaultChecked should be checked', () => {
        let mSwitch = mount(<Switch defaultChecked/>);
        expect(mSwitch.find(`button.${prefixSwitch}`).at(0).hasClass('is-checked')).toEqual(true);
    })
    it('Switch defaultChecked should not be checked', () => {
        let mSwitch = mount(<Switch defaultChecked={false}/>);
        expect(mSwitch.find(`button.${prefixSwitch}`).at(0).hasClass('is-checked')).toEqual(false);
    })
});

describe('component: Switch, <test prop:: disabled>', () => {
    it('Switch should be disabled', () => {
        let mSwitch = mount(<Switch disabled/>);
        expect(mSwitch.find(`button.${prefixSwitch}`).at(0).hasClass(`${prefixSwitch}-disabled`)).toEqual(true);
    })
    it('Switch should not be click', () => {
        const mockClick = jest.fn();
        let mSwitch = mount(<Switch disabled onClick={mockClick}/>);
        mSwitch.simulate('click');
        expect(mockClick).not.toHaveBeenCalled();
    })
});

describe('component: Switch, <test prop:: size>', () => {
    const sizeMap = {
        "sm": 'sm',
        "lg": 'lg',
        "default": 'sm',
    };
    ["sm", "lg", "default"].forEach(size => {
        attrsTest({
            title: `component: Switch, <test prop:: size>`,
            Component: Switch,
            attrs: {
                size
            },
            selector: 'button',
            classnames: [`${prefix}-switch-${sizeMap[size]}`]
        })
    })
})

describe('component: Switch, <test prop:: colors>', () => {
    it('primary Switch should be exist', () => {
        let mSwitch = mount(<Switch colors="primary"/>);
        expect(mSwitch.find('button').at(0).hasClass(`${prefixSwitch}-primary`)).toEqual(true)
    })
    it('success Switch should be exist', () => {
        let mSwitch = mount(<Switch colors="success"/>);
        expect(mSwitch.find('button').at(0).hasClass(`${prefixSwitch}-success`)).toEqual(true)
    })
    it('dark Switch should be exist', () => {
        let mSwitch = mount(<Switch colors="dark"/>);
        expect(mSwitch.find('button').at(0).hasClass(`${prefixSwitch}-dark`)).toEqual(true)
    })
    it('info Switch should be exist', () => {
        let mSwitch = mount(<Switch colors="info"/>);
        expect(mSwitch.find('button').at(0).hasClass(`${prefixSwitch}-info`)).toEqual(true)
    })
    it('warning Switch should be exist', () => {
        let mSwitch = mount(<Switch colors="warning"/>);
        expect(mSwitch.find('button').at(0).hasClass(`${prefixSwitch}-warning`)).toEqual(true)
    })
})

describe('component: Switch, <test prop:: checkedChildren>', () => {
    it('Switch checkedChildren should be show open text', () => {
        let mSwitch = mount(<Switch checked checkedChildren={'开'} unCheckedChildren={'关'}/>);
        expect(mSwitch.find('button').at(0).find('span').at(0).text()).toEqual('开');
    })
})

describe('component: Switch, <test prop:: unCheckedChildren>', () => {
    it('Switch checkedChildren should be show close text', () => {
        let mSwitch = mount(<Switch checkedChildren={'开'} unCheckedChildren={'关'}/>);
        expect(mSwitch.find('button').at(0).find('span').at(0).text()).toEqual('关');
    })
})
describe('component: Switch, <test prop:: defaultValue>', () => {
    it('Switch checkedChildren should be show close text', () => {
        let mSwitch = mount(<Switch defaultValue={true}/>);
        expect(mSwitch.find(`button.${prefixSwitch}`).at(0).hasClass('is-checked')).toEqual(true);
    })
})
describe('component: Switch, <test prop:: enterkeyDown>', () => {
    it('Switch enterkeyDown', () => {
        let mSwitch = mount(<Switch data-testid="enterkeyDown" defaultValue={true} enterkeyDown={false} />);
        // mSwitch.find(`button.${prefixSwitch}`).at(0).simulate('click', {type: 'click', nativeEvent: {x: 0, y: 0, isTrusted: true}})
        fireEvent.keyDown(screen.getByTestId('enterkeyDown'), { key: 'Enter', code: 'Enter' });
        expect(mSwitch.find(`button.${prefixSwitch}`).at(0).hasClass('is-checked')).toEqual(true);
    })
})

describe('component: Switch, <test prop:: onChange>', () => {
    it('switch click change type', function() {
        let typeChange = "primary";

        function clickEvent(event) {
            typeChange = "accent";
        }

        let mSwitch = mount(<Switch onChangeHandler={clickEvent}/>);
        mSwitch.find('button').at(0).simulate('click');
        expect(typeChange == "accent").toEqual(true);
    });
})
eventsTest({
    title: 'component: Switch, <test prop:: onChangeHandler>',
    Component: Switch,
    propFuncName: 'onChangeHandler',
    dependentProps: {},
    selector: 'button',
    eventName: 'keyDown',
    eventArgs: [{...mocEventTarget, keyCode: KeyCode.LEFT}, true],
    propFuncArgs: [false]
});
eventsTest({
    title: 'component: Switch, <test prop:: onChangeHandler>',
    Component: Switch,
    propFuncName: 'onChangeHandler',
    dependentProps: {},
    selector: 'button',
    eventName: 'keyDown',
    eventArgs: [{...mocEventTarget, keyCode: KeyCode.RIGHT}, true],
    propFuncArgs: [true]
});
eventsTest({
    title: 'component: Switch, <test prop:: onClick> through keydown1',
    Component: Switch,
    propFuncName: 'onClick',
    dependentProps: {checked: true},
    selector: 'button',
    eventName: 'keyDown',
    eventArgs: [{...mocEventTarget, keyCode: KeyCode.SPACE}, true],
    propFuncArgs: [false]
});
eventsTest({
    title: 'component: Switch, <test prop:: onClick> through keydown2',
    Component: Switch,
    propFuncName: 'onClick',
    dependentProps: {checked: false},
    selector: 'button',
    eventName: 'keyDown',
    eventArgs: [{...mocEventTarget, keyCode: KeyCode.ENTER}, true],
    propFuncArgs: [true]
});
eventsTest({
    title: 'component: Switch, <test prop:: onkeyDown>,<test prop:: enterkeyDown> through keydown',
    Component: Switch,
    propFuncName: 'onKeyDown',
    dependentProps: {checked: false},
    selector: 'button',
    eventName: 'keyDown',
    eventArgs: [{...mocEventTarget, keyCode: KeyCode.DOWN}, true]
});
eventsTest({
    title: 'component: Switch, <test prop:: onClick>,<test prop:: enterkeyDown> through click1',
    Component: Switch,
    propFuncName: 'onClick',
    dependentProps: {checked: false},
    selector: 'button',
    eventName: 'click',
    eventArgs: [mocEventTarget, true],
    propFuncArgs: [true, 'mockEvent']
});
eventsTest({
    title: 'component: Switch, <test prop:: onClick> through click2',
    Component: Switch,
    propFuncName: 'onClick',
    dependentProps: {checked: true},
    selector: 'button',
    eventName: 'click',
    eventArgs: [mocEventTarget, true],
    propFuncArgs: [false, 'mockEvent']
});
eventsTest({
    title: 'component: Switch, <test prop:: onMouseUp> through click2',
    Component: Switch,
    propFuncName: 'onMouseUp',
    dependentProps: {},
    selector: 'button',
    eventName: 'mouseup',
    eventArgs: [mocEventTarget]
});
describe('disabled: true', () => {
    it('keyboard event should be invalid when disabled is true', () => {
        const mockEvent = jest.fn()
        const mockEvent2 = jest.fn()
        let wrapper = mount(<Switch onChangeHandler={mockEvent} onClick={mockEvent2} disabled={true}></Switch>)
        wrapper.find('button').simulate('keyDown', {keyCode: KeyCode.LEFT})
        wrapper.find('button').simulate('keyDown', {keyCode: KeyCode.RIGHT})
        wrapper.find('button').simulate('keyDown', {keyCode: KeyCode.SPACE})
        wrapper.find('button').simulate('keyDown', {keyCode: KeyCode.ENTER})
        expect(mockEvent).toHaveBeenCalledTimes(0)
        expect(mockEvent2).toHaveBeenCalledTimes(0)
    })
})
describe('fieldid && id, <test prop:: fieldid>, <test prop:: id>', () => {
    it('@fieldid,"***_loading_switch"', () => {
        const wrapper = mount(<Switch loading />);
        expect(wrapper.find(`.${prefix}-switch`).find(`.${prefix}-icon`).prop("fieldid")).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefix}-switch`).find(`.${prefix}-icon`).prop("fieldid")).toEqual("fieldid-id_loading_switch");
    })
    it('@id,"***_loading_switch"', () => {
        const wrapper = mount(<Switch loading />);
        expect(wrapper.find(`.${prefix}-switch`).find(`.${prefix}-icon`).prop("id")).toEqual(undefined);
        wrapper.setProps({ id: 'id-id' });
        expect(wrapper.find(`.${prefix}-switch`).find(`.${prefix}-icon`).prop("id")).toEqual("id-id_loading_switch");
    })
})
