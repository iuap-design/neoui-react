/** TreeSelect.tsx */
import {mount, ReactWrapper} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {
    actWait,
    attrsTest,
    attrsTestByLength,
    eventsTest,
    testCustomStyle
} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src';
import TreeSelectDemo from './treeSelectClass';
import {sleep} from '../../../next-ui-library/test/common/utils';

const prefixSelectTree = `${prefix}-select-tree`;
const prefixSelect = `${prefix}-select`;

attrsTest({
    title: 'component: TreeSelect, <test prop:: allowClear>',
    Component: TreeSelectDemo,
    attrs: {
        allowClear: true
    },
    testAttr: {
        allowClear: false
    },
    selector: `.${prefixSelect}`,
    classnames: [`${prefixSelect}-allow-clear`],
    act: true
})
attrsTest({
    title: 'component: TreeSelect, <test prop:: bordered>',
    Component: TreeSelectDemo,
    attrs: {
        bordered: false
    },
    testAttr: {
        bordered: true
    },
    selector: `.${prefixSelect}`,
    classnames: [`${prefixSelect}-border-none`],
    act: true
})
attrsTest({
    title: 'component: TreeSelect, <test prop:: bordered>',
    Component: TreeSelectDemo,
    attrs: {
        bordered: 'bottom'
    },
    testAttr: {
        bordered: true
    },
    selector: `.${prefixSelect}`,
    classnames: [`${prefixSelect}-border-bottom`],
    act: true
})
attrsTest({
    title: 'component: TreeSelect, <test prop:: disabled>',
    Component: TreeSelectDemo,
    attrs: {
        disabled: true
    },
    testAttr: {
        disabled: false
    },
    selector: `.${prefixSelect}`,
    classnames: [`${prefixSelect}-disabled`],
    act: true
})
attrsTest({
    title: 'component: TreeSelect, <test prop:: dropdownClassName>',
    Component: TreeSelectDemo,
    attrs: {
        dropdownClassName: 'my-class'
    },
    testAttr: {
        dropdownClassName: 'null'
    },
    selector: `.${prefixSelect}-dropdown`,
    classnames: [`my-class`],
    act: true
});
attrsTest({
    title: 'component: TreeSelect, <test prop:: treeIcon>',
    Component: TreeSelectDemo,
    attrs: {
        treeIcon: true
    },
    testAttr: {
        treeIcon: false
    },
    selector: `.${prefixSelectTree}-node-content-wrapper span`,
    classnames: [`${prefixSelectTree}-icon__customize`],
    act: true
});
[{lg: 'large'}, {sm: 'small'}].forEach(obj => {
    const [[k, v]] = Object.entries(obj);
    attrsTest({
        title: 'component: TreeSelect, <test prop:: size>',
        Component: TreeSelectDemo,
        attrs: {
            size: v
        },
        selector: `.${prefixSelect}`,
        classnames: [`${prefixSelect}-${k}`],
        act: true
    })
})

attrsTest({
    title: 'component: TreeSelect, <test prop:: showArrow>',
    Component: TreeSelectDemo,
    attrs: {
        showArrow: true
    },
    testAttr: {
        showArrow: false
    },
    selector: `.${prefixSelect}-arrow i`,
    classnames: [`${prefixSelect}-arrow-icon`],
    act: true
})
attrsTest({
    title: 'component: TreeSelect, <test prop:: showSearch>',
    Component: TreeSelectDemo,
    attrs: {
        showSearch: true
    },
    testAttr: {
        showSearch: false
    },
    selector: `.${prefixSelect}`,
    classnames: [`${prefixSelect}-show-search`],
    act: true
})
attrsTestByLength({
    title: 'component: TreeSelect, <test prop:: dropdownRender>',
    Component: TreeSelectDemo,
    attrs: {
        dropdownRender: () => <Icon type="uf-dongjie"/>
    },
    selector: `.uf-dongjie`,
    nodeCount: 1,
    beforeTest: () => {},
    act: true
})
attrsTestByLength({
    title: 'component: TreeSelect, <test prop:: suffixIcon>',
    Component: TreeSelectDemo,
    attrs: {
        suffixIcon: () => <Icon type="uf-dongjie"/>,
        showArrow: true
    },
    selector: `.uf-dongjie`,
    nodeCount: 1,
    act: true
})
attrsTestByLength({
    title: 'component: TreeSelect, <test prop:: treeCheckable>',
    Component: TreeSelectDemo,
    attrs: {
        treeCheckable: true
    },
    selector: `.${prefixSelectTree}-treenode .${prefixSelectTree}-checkbox`,
    nodeCount: 9,
    act: true
})
attrsTestByLength({
    title: 'component: TreeSelect, <test prop:: switcherIcon>',
    Component: TreeSelectDemo,
    attrs: {
        switcherIcon: () => <Icon type="uf-dongjie"/>
    },
    selector: `.${prefixSelect}-tree-switcher .uf-dongjie`,
    nodeCount: 9,
    act: true
})
attrsTestByLength({
    title: 'component: TreeSelect, <test prop:: virtual>',
    Component: TreeSelectDemo,
    attrs: {
        virtual: true
    },
    selector: `.${prefixSelectTree}-list .${prefixSelectTree}-treenode`,
    nodeCount: 9,
    act: true
})
attrsTestByLength({
    title: 'component: TreeSelect, <test prop:: virtual>',
    Component: TreeSelectDemo,
    attrs: {
        virtual: false
    },
    selector: `.${prefixSelectTree}-list .${prefixSelectTree}-treenode`,
    nodeCount: 14,
    act: true
})
attrsTestByLength({
    title: 'component: TreeSelect, <test prop:: treeExpandedKeys>',
    Component: TreeSelectDemo,
    attrs: {
        treeExpandedKeys: ["parent 1", "parent 1-0", "parent 1-1", "parent 1-2"]
    },
    selector: `.${prefixSelectTree}-list .${prefixSelectTree}-treenode`,
    nodeCount: 9,
    act: true
})

testCustomStyle({
    title: 'component: TreeSelect, <test prop:: dropdownStyle>',
    Component: TreeSelectDemo,
    attrs: {
        dropdownStyle: {
            color: 'red'
        }
    },
    selector: `.${prefixSelect}-dropdown`,
    verifyStyle: {'color': "red"},
    act: true
});
testCustomStyle({
    title: 'component: TreeSelect, <test prop:: dropdownMatchSelectWidth>',
    Component: TreeSelectDemo,
    attrs: {
        dropdownMatchSelectWidth: true
    },
    selector: `.${prefixSelect}-dropdown`,
    verifyStyle: {'width': "0px"},
    act: true
});

testCustomStyle({
    title: 'component: TreeSelect, <test prop:: dropdownMatchSelectWidth>',
    Component: TreeSelectDemo,
    attrs: {
        dropdownMatchSelectWidth: false
    },
    selector: `.${prefixSelect}-dropdown`,
    verifyStyle: {'width': ""},
    act: true
});
testCustomStyle({
    title: 'component: TreeSelect, <test prop:: listHeight>',
    Component: TreeSelectDemo,
    attrs: {
        listHeight: 330
    },
    selector: `.${prefixSelect}-tree-list-holder`,
    verifyStyle: {'max-height': '330px'},
    act: true
});

eventsTest({
    title: 'component: Tree, <test prop:: labelInValue>,<test prop:: onChange>',
    Component: TreeSelectDemo,
    propFuncName: 'onChange',
    dependentProps: {labelInValue: true},
    selector: `.${prefixSelect}-tree-node-content-wrapper`,
    eventName: 'click',
    eventArgs: [],
    act: true,
    afterTest: (mockEvent) => {
        expect(mockEvent.mock.calls[0][0].value).toBe('parent 1')
        expect(mockEvent.mock.calls[0][0].label).toBe('用友网络股份有限公司')
    }
});
// eventsTest({
//   title: 'component: Tree, <test prop:: labelInValue>,<test prop:: treeNodeLabelProp>',
//   Component: TreeSelectDemo,
//   propFuncName: 'onChange',
//   dependentProps: {treeNodeLabelProp: 'value'},
//   selector: `.${prefixSelect}-tree-node-content-wrapper`,
//   eventName: 'click',
//   eventArgs: [],
//   act: true,
//   afterTest: (mockEvent) => {
//     expect(mockEvent.mock.calls[0][0]).toBe('用友网络股份有限公司')
//   }
// });
eventsTest({
    title: 'component: Tree, <test prop:: onSearch>',
    Component: TreeSelectDemo,
    propFuncName: 'onSearch',
    dependentProps: {showSearch: true, value: 'random121'},
    selector: `input.${prefixSelect}-selection-search-input`,
    eventName: 'change',
    eventArgs: [{target: {value: 'random121'}}],
    propFuncArgs: ['random121'],
    act: true,
    afterTest: (mockEvent, wrapperD) => {
        expect(wrapperD.find(`.${prefixSelectTree}-list .${prefixSelectTree}-treenode`)).toHaveLength(3)
    }
});
eventsTest({
    title: 'component: Tree, <test prop:: onSelect>',
    Component: TreeSelectDemo,
    propFuncName: 'onSelect',
    dependentProps: {},
    selector: `.${prefixSelectTree}-list .${prefixSelectTree}-treenode .${prefixSelectTree}-node-content-wrapper`,
    eventName: 'click',
    eventArgs: [],
    propFuncArgs: ['parent 1'],
    act: true
});
describe('TreeSelect', () => {

    let wrapper: ReactWrapper;

    beforeEach(async() => {
        const div1 = document.createElement('div');
        div1.setAttribute('id', 'container');
        document.body.appendChild(div1);
        wrapper = mount(
            <TreeSelectDemo fieldid="asd"  />, {attachTo: document.getElementById('container')}
        );
        await actWait();
    })
    afterEach(async() => {
        const div = document.getElementById('container');
        if (div) {
            document.body.removeChild(div);
        }
        if (wrapper && wrapper.length) {
            wrapper.unmount();
        }
    })
    describe('component: TreeSelect, <test prop:: getPopupContainer>, <test prop:: treeDefaultExpandAll>, <test prop:: treeDefaultExpandedKeys>', () => {
        it('it should be mounted at #root', async() => {
            expect(wrapper.find(`#root .${prefixSelect}-dropdown`)).toHaveLength(1)
        })
    })

    describe('component: TreeSelect, <test prop:: defaultValue>', () => {
        it('it should be mounted at #root', () => {
            wrapper.setProps({
                defaultValue: 'leaf1'
            })
            // expect(wrapper.find(`.${prefixSelect}-selector`)).toMatchSnapshot()
            expect(wrapper.find(`.${prefixSelect}-selection-item`).text()).toBe('用友网络股份有限公司leaf1')
        })
    })
    describe('component: TreeSelect, <test prop:: value>', () => {
        it('it should be mounted at #root', () => {
            wrapper.setProps({
                value: 'leaf1'
            })
            // expect(wrapper.find(`.${prefixSelect}-selector`)).toMatchSnapshot()
            expect(wrapper.find(`.${prefixSelect}-selection-item`).text()).toBe('用友网络股份有限公司leaf1')
        })
    })
    describe('component: TreeSelect, <test prop:: notFoundContent>', () => {
        it('it should be mounted at #root', () => {
            wrapper.setProps({
                value: null,
                searchValue: 'aaa',
                notFoundContent: 'bbb'
            })
            // expect(wrapper.find(`.${prefixSelect}-selector`)).toMatchSnapshot()
            expect(wrapper.find(`.${prefixSelect}-empty`).text()).toBe('bbb')
        })
    })
    describe('component: TreeSelect, <test prop:: placeholder>', () => {
        it('placeholder should be 请选择', () => {
            wrapper.setProps({
                placeholder: '请选择',
                value: null
            })
            // expect(wrapper.find(`.${prefixSelect}-selector`)).toMatchSnapshot()
            expect(wrapper.find(`.${prefixSelect}-selection-placeholder`).text()).toBe('请选择')
        })
    })
    describe('component: TreeSelect, <test prop:: searchValue>', () => {
        it('value should be mounted aaa', () => {
            wrapper.setProps({
                value: null,
                searchValue: 'aaa'
            })
            // expect(wrapper.find(`.${prefixSelect}-selector`)).toMatchSnapshot()
            expect(wrapper.find(`.${prefixSelect}-selection-search-input`).instance().value).toBe('aaa')
        })
    })
    describe('component: TreeSelect, <test prop:: treeNodeFilterProp>', () => {
        it('it should be mounted at #root', () => {
            wrapper.setProps({
                value: null,
                searchValue: '222222',
                treeNodeFilterProp: 'title'
            })
            expect(wrapper.find(`.${prefixSelectTree}-list .${prefixSelectTree}-treenode`)).toHaveLength(3)
        })
    })

    describe('component: TreeSelect,<test prop:: onTreeExpand>', () => {
        it('the label should be seted in value', async() => {
            const mockTreeExpand = jest.fn()
            wrapper.setProps({
                onTreeExpand: mockTreeExpand
            })
            wrapper.find(`.${prefixSelectTree}-list .${prefixSelectTree}-treenode .${prefixSelectTree}-switcher`).first().simulate('click').simulate('click');
            // expect(wrapper.find(`.${prefixSelect}-selector`)).toMatchSnapshot()
            await actWait();
            expect(mockTreeExpand).toHaveBeenCalled()
        })
    })
    describe('component: TreeSelect,<test prop:: multiple>', () => {
        it('the label should be seted in value', async() => {
            wrapper.setProps({
                multiple: true
            })
            wrapper.find(`.${prefixSelectTree}-list .${prefixSelectTree}-treenode .${prefixSelectTree}-node-content-wrapper`).first().simulate('click');
            wrapper.find(`.${prefixSelectTree}-list .${prefixSelectTree}-treenode .${prefixSelectTree}-node-content-wrapper`).at(1).simulate('click');
            await actWait();
            expect(wrapper.find(`.${prefixSelect}-selector .${prefixSelect}-selection-item`)).toHaveLength(3)
        })
    })
    describe('component: TreeSelect,<test prop:: multiple>,<test prop:: autoClearSearchValue>', () => {
        it('the label should be seted in value', async() => {
            wrapper.setProps({
                multiple: true,
            })
            wrapper.find(`.${prefixSelectTree}-list .${prefixSelectTree}-treenode .${prefixSelectTree}-node-content-wrapper`).first().simulate('click');
            wrapper.find(`.${prefixSelectTree}-list .${prefixSelectTree}-treenode .${prefixSelectTree}-node-content-wrapper`).at(1).simulate('click');
            wrapper.find(`.${prefixSelect}-selection-search input`).simulate('change', {target: {value: 'a'}})
            wrapper.find(`.${prefixSelectTree}-list .${prefixSelectTree}-treenode .${prefixSelectTree}-node-content-wrapper`).at(4).simulate('click');
            await actWait();
            expect(wrapper.find(`.${prefixSelect}-selector .${prefixSelect}-selection-item`)).toHaveLength(4)
            expect(wrapper.find(`.${prefixSelect}-selection-search input`).instance().value).toBe('')
        })
    })
    //新增fieldid测试
    describe('component:  Treeselect, <test prop:: fieldid>', () => {
        it('[contains(@fieldid,"***_suffix_icon","***_treeselect_switcher","***_treeselect_option_0")]', async () => {
            wrapper.setProps({ fieldid: undefined });
            expect(wrapper.find(`.uf-arrow-down`).at(0).props().fieldid).toBe();
            expect(wrapper.find(`.${prefixSelectTree}-treenode`).at(0).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefixSelectTree}-switcher span`)).toHaveLength(0);
            wrapper.setProps({ fieldid: 'test' });
            expect(wrapper.find(`.uf-arrow-down`).at(0).props().fieldid).toBe("test_suffix_icon");
            expect(wrapper.find(`.${prefixSelectTree}-switcher span`).at(0).props().fieldid).toBe("test_treeselect_switcher");
            wrapper.find(`.${prefixSelectTree}-treenode .${prefixSelectTree}-switcher`).at(0).simulate('click');
            await actWait();
            expect(wrapper.find(`.${prefixSelectTree}-treenode`).at(1).instance().getAttribute('fieldid')).toBe('test_option_0');
        });
    });
})
describe('TreeSelect2', () => {

    let wrapper: ReactWrapper;

    beforeEach(async() => {
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
        wrapper = mount(<TreeSelectDemo resizable fieldid="abcd" switcherIcon={<Icon type="uf-dongjie"/>} />, {attachTo: document.getElementById('container')});

        await actWait();
    })
    afterEach(async() => {
        const div = document.getElementById('container');
        if (div) {
            document.body.removeChild(div);
        }
        if (wrapper && wrapper.length) {
            wrapper.unmount();
        }
    })
    describe('component:  Treeselect, <test prop:: fieldid>, <test prop:: switcherIcon>', () => {
        it('[contains(@fieldid,"***_suffix_icon","***_treeselect_switcher","***_treeselect_option_0")]', async () => {
            expect(wrapper.find(`.uf-arrow-down`).at(0).props().fieldid).toBe("abcd_suffix_icon");
            expect(wrapper.find(`.${prefixSelectTree}-switcher i`).at(0).props().fieldid).toBe("abcd_treeselect_switcher");
            wrapper.find(`.${prefixSelectTree}-treenode .${prefixSelectTree}-switcher`).at(0).simulate('click');
            await actWait();
            expect(wrapper.find(`.${prefixSelectTree}-treenode`).at(1).instance().getAttribute('fieldid')).toBe('abcd_option_0');
        });
    });
    describe('component:  Treeselect, <test prop:: resizable>', () => {
        it('[contains(@fieldid,"***_suffix_icon","***_treeselect_switcher","***_treeselect_option_0")]', async () => {
            // "wui-select-tree-resizebox"
            expect(wrapper.find(`div.${prefixSelectTree}-resizebox`)).toHaveLength(1);
            wrapper.find(`div.${prefixSelectTree}-resizebox`).simulate('mouseEnter');
            // expect(wrapper).toMatchSnapshot()
            expect(wrapper.find(`div.${prefixSelectTree}-list-holder`).props().style['max-height']).toBe('200px');
            // wrapper.find(`.${prefixSelectTree}-treenode .${prefixSelectTree}-switcher`).at(0).simulate('click');
            // await actWait();
            // expect(wrapper.find(`.${prefixSelectTree}-treenode`).at(1).instance().getAttribute('fieldid')).toBe('abcd_option_0');
        });
    });
    describe('component:  Treeselect, <test prop:: onResizeStart>', () => {

        it('onResizeStart should be called', () => {
            const mockEvent = jest.fn();
            wrapper.setProps({
                onResizeStart: mockEvent,
                open: true
            })
            
            // expect(wrapper).toMatchSnapshot()
            wrapper.find(`div.${prefixSelectTree}-resizebox`).childAt(1).childAt(3).simulate('mouseDown');
            expect(mockEvent).toHaveBeenCalled()
        })
    })
    describe('component:  Treeselect, <test prop:: onResize>', () => {

        it('onResize should be called', async () => {
            const mockEvent = jest.fn();
            wrapper.setProps({
                onResize: mockEvent,
                open: true
            })
            var evObj1 = document.createEvent('MouseEvents');
            evObj1.initMouseEvent('mousedown', true, true)
            
            document.getElementsByClassName(`${prefixSelectTree}-resizebox`)[0].children[1].children[3].dispatchEvent(evObj1);
            var evObj2 = document.createEvent('MouseEvents');
            evObj2.initMouseEvent('mousemove', true, true)
            await sleep(100)
            document.getElementsByClassName(`${prefixSelectTree}-resizebox`)[0].children[2].children[3].dispatchEvent(evObj2);
            expect(mockEvent).toHaveBeenCalled()
        })
    })
    describe('component:  Treeselect, <test prop:: onResizeStop>', () => {

        it('onResizeStop should be called', async () => {
            const mockEvent = jest.fn();
            wrapper.setProps({
                onResizeStop: mockEvent,
                open: true
            })
            var evObj1 = document.createEvent('MouseEvents');
            evObj1.initMouseEvent('mousedown', true, true)
            
            document.getElementsByClassName(`${prefixSelectTree}-resizebox`)[0].children[1].children[3].dispatchEvent(evObj1);
            var evObj2 = document.createEvent('MouseEvents');
            evObj2.initMouseEvent('mousemove', true, true)
            await sleep(100)
            document.getElementsByClassName(`${prefixSelectTree}-resizebox`)[0].children[2].children[3].dispatchEvent(evObj2);
            var evObj3 = document.createEvent('MouseEvents');
            evObj3.initMouseEvent('mouseup', true, true)
            document.getElementsByClassName(`${prefixSelectTree}-resizebox`)[0].children[2].children[3].dispatchEvent(evObj3);

            expect(mockEvent).toHaveBeenCalled()
        })
    })
})
describe('TreeSelect2', () => {
    const treeData = [{
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [{
            title: 'Child Node1',
            value: '0-0-1',
            key: '0-0-1',
        }, {
            title: 'Child Node2',
            value: '0-0-2',
            key: '0-0-2',
        }],
    }, {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
    }];
    let wrapper: ReactWrapper;

    beforeEach(async() => {
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
        wrapper = mount(<TreeSelectDemo resizable treeData={treeData} children={false} />, {attachTo: document.getElementById('container')});

        await actWait();
    })
    afterEach(async() => {
        const div = document.getElementById('container');
        if (div) {
            document.body.removeChild(div);
        }
        if (wrapper && wrapper.length) {
            wrapper.unmount();
        }
    })
    describe('component:  Treeselect, <test prop:: treeData>', () => {
        it('[contains(@fieldid,"***_suffix_icon","***_treeselect_switcher","***_treeselect_option_0")]', async () => {
            // "wui-select-tree-resizebox"
            await actWait(1000);
            expect(wrapper.find(`div.${prefixSelectTree}-resizebox`).length).toBe(1);
            wrapper.find(`div.${prefixSelectTree}-resizebox`).simulate('mouseEnter');
            // expect(wrapper).toMatchSnapshot()
            expect(wrapper.find(`div.${prefixSelectTree}-list-holder`).props().style['max-height']).toBe('200px');
            // wrapper.find(`.${prefixSelectTree}-treenode .${prefixSelectTree}-switcher`).at(0).simulate('click');
            // await actWait();
            // expect(wrapper.find(`.${prefixSelectTree}-treenode`).at(1).instance().getAttribute('fieldid')).toBe('abcd_option_0');
        });
    });
})