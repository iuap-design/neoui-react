/** Collapse.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';

import {attrsTest} from "../../../next-ui-library/test/common/index";
import {prefix} from '../../wui-core/src/updatePrefix';
import {fireEvent, render, screen} from '@testing-library/react';
// import { Panel, PanelGroup } from '../src/index';
import Collapse from '../src/index'

const prefixCollapse = `${prefix}-collapse`;

const {Panel} = Collapse

const MyCollapse = (options) => (
    <Collapse defaultActiveKey='2' {...options}>
        <Panel header="Panel 1" key="1">测试测试 1</Panel>
        <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
    </Collapse>
);
let mCollapse;
beforeEach(() => {
    mCollapse = mount(<MyCollapse/>);
})
afterEach(() => {
    mCollapse && mCollapse.length && mCollapse.unmount();
})
describe('component: Collapse, <test prop:: onSelect>, <test prop:: activeKey>', function() {
    it('panelGroup click', function() {
        class PanelGroupDemo extends React.Component {
            constructor(...args) {
                super(...args);
                this.state = {
                    activeKey: '1'
                };
                // this.handleSelect = this.handleSelect.bind(this);
            }

            // handleSelect(activeKey) {
            //     this.setState({activeKey});
            // }

            render() {
                return (
                    <Collapse activeKey={this.state.activeKey} accordion>
                        <Panel header="Panel 1" eventKey="1">Panel 1 content</Panel>
                        <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
                    </Collapse>
                );
            }
        }

        let panelGroupDemo = mount(<PanelGroupDemo/>);
        panelGroupDemo.find(`.${prefixCollapse}-heading`).at(0).simulate('click');
        // expect(panelGroupDemo.state('activeKey')).toEqual('2');
        expect(panelGroupDemo.find(`.${prefixCollapse}`).at(0).hasClass(`wui-panel-show`)).toEqual(true)
    });

});
describe('component: Collapse, <test prop:: accordion>, <test prop:: className>', () => {
    it('Collapse className', async () => {
        let collapseDemo = mount(
            <Collapse accordion className='testCollapse'>
                <Panel header="Panel 1" key="1">测试测试 1</Panel>
                <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
            </Collapse>
        );
        expect(screen.getByRole('tablist').className.includes('testCollapse')).toEqual(true)
        // expect(collapseDemo.find(`.${prefixCollapse}-group`).hasClass('testCollapse')).toEqual(true);
        collapseDemo.unmount()
    })
    it('component: Collapse, <test prop:: style>, group color should be blur', () => {
        let collapseDemo = mount(
            <Collapse accordion style={{color: '#ff00ff'}}>
                <Panel header="Panel 1" key="1">测试测试 1</Panel>
                <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
            </Collapse>
        );
        expect(screen.getByRole('tablist').style.color).toEqual('rgb(255, 0, 255)')
        // expect(collapseDemo.find(`.${prefixCollapse}-group`).getDOMNode().style.color).toEqual('rgb(255, 0, 255)')
        collapseDemo.unmount()
    })
    it('component: Collapse, <test prop:: expandIconPosition>, expand icon position should be right', () => {
        let collapseDemo = mount(
            <Collapse accordion expandIconPosition="right">
                <Panel header="Panel 1" key="1">测试测试 1</Panel>
                <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
            </Collapse>
        );
        expect(screen.getByRole('tablist').firstChild.className.includes(`${prefixCollapse}-icon-position-right`)).toEqual(true)
        // expect(collapseDemo.find(`.${prefixCollapse}`).at(0).hasClass(`${prefixCollapse}-icon-position-right`)).toEqual(true)
    })
    it('component: Collapse, <test prop:: ghost>', () => {
        let collapseDemo = mount(
            <Collapse accordion ghost={true}>
                <Panel header="Panel 1" key="1">测试测试 1</Panel>
                <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
            </Collapse>
        );
        expect(screen.getByRole('tablist').firstChild.className.includes(`${prefixCollapse}-ghost`)).toEqual(true)
        // expect(collapseDemo.find(`.${prefixCollapse}`).at(0).hasClass(`${prefixCollapse}-ghost`)).toEqual(true)
    })
})
// attrsTest({
//     title: 'component: Collapse, <test prop:: bordered>',
//     Component: MyCollapse,
//     attrs: {
//         bordered: true
//     },
//     testAttr: {
//         bordered: false
//     },
//     selector: `.${prefixCollapse}`,
//     classnames: [`${prefixCollapse}-borderless`]
// })
describe('component: Collapse, <test prop:: testing-library>', () => {
    it('component: Collapse, <test prop:: bordered>', () => {
        let collapseDemo = mount(
            <Collapse accordion bordered={true}>
                <Panel header="Panel 1" key="1">测试测试 1</Panel>
                <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
            </Collapse>
        );
        expect(screen.getByRole('tablist').firstChild.className.includes(`${prefixCollapse}-borderless`)).toEqual(true)
        // expect(collapseDemo.find(`.${prefixCollapse}`).hasClass(`${prefixCollapse}-borderless`)).toEqual(true)
    })
})
describe('component: Collapse, <test prop:: defaultActiveKey>', () => {
    it('component: Collapse, <test prop:: ghost>', () => {
        let collapseDemo = mount(
            <Collapse accordion defaultActiveKey='2'>
                <Panel header="Panel 1" key="1">测试测试 1</Panel>
                <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
            </Collapse>
        );
        expect(collapseDemo.find(`.${prefixCollapse}`).at(1).find(`.${prefixCollapse}-collapse`).hasClass(`in`)).toEqual(true)
    })
})
describe('component: Collapse, <test prop:: role>', () => {
    it('it should have a prop role ', () => {
        expect(mCollapse.find(`.${prefixCollapse}-group`).props().role).toBeUndefined()

        mCollapse.setProps({
            accordion: true
        })
        expect(mCollapse.find(`.${prefixCollapse}-group`).props().role).toEqual('tablist')
        mCollapse.setProps({
            role: '123'
        })
        expect(mCollapse.find(`.${prefixCollapse}-group`).props().role).toEqual('123')
    })
})
// todo  waiting for bug fix
// xdescribe('component: Collapse, <test prop:: destroyInactivePanel>', () => {
//     it('it should have a prop role ', () => {
//         let collapseDemo = mount(
//             <Collapse accordion destroyInactivePanel={false}>
//                 <Panel header="Panel 1" key="1">测试测试 1</Panel>
//                 <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
//             </Collapse>
//         );
//         expect(collapseDemo.find(`.${prefixCollapse}-body`).first().text()).toEqual('测试测试 1')
//         collapseDemo.setProps({
//             destroyInactivePanel: true
//         })
//         expect(collapseDemo.find(`.${prefixCollapse}-body`)).toHaveLength(0)

//     })
// })
// todo  wait bug fix
// xdescribe('component: Collapse, <test prop:: collapsible>', () => {
//     attrsTest({
//         title: 'component: Collapse, <test prop:: collapsible>',
//         Component: MyCollapse,
//         attrs: {
//             collapsible: 'disabled'
//         },
//         selector: `.${prefixCollapse}`,
//         classnames: [`${prefixCollapse}-item-disabled`]
//     })
//     it('collapsible: click event', () => {
//         mCollapse.setProps({
//             collapsible: 'disabled'
//         })
//         expect(mCollapse.find(`.${prefixCollapse}`).at(1).hasClass(`${prefix}-panel-show`)).toEqual(true)
//         mCollapse.find(`.${prefixCollapse}-heading`).at(1).simulate('click');
//         expect(mCollapse.find(`.${prefixCollapse}`).at(1).hasClass(`${prefix}-panel-show`)).toEqual(true)
//         mCollapse.setProps({
//             collapsible: 'header'
//         })
//         mCollapse.find(`.${prefixCollapse}-heading`).at(1).simulate('click');
//         expect(mCollapse.find(`.${prefixCollapse}`).at(1).hasClass(`${prefix}-panel-show`)).toEqual(false)

//     })
// })
describe('component: Collapse, <test prop:: not accordion>', () => {
    it('accordion is false', () => {
        let collapseDemo = mount(
            <Collapse activeKey='1'>
                <Panel header="Panel 1" key="1">测试测试 1</Panel>
                <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
            </Collapse>
        );
        // expect(screen.getByRole('tablist').firstChild.className.includes(`${prefix}-panel-show`)).toEqual(true)
        // 问题: debug之后demo结构存在两个
        expect(collapseDemo.find(`.${prefixCollapse}-group`).at(1).find(`.${prefixCollapse}`).at(0).hasClass(`${prefix}-panel-show`)).toEqual(true)
        collapseDemo.find(`.${prefixCollapse}-group`).at(1).find(`.${prefixCollapse}-heading`).at(1).simulate('click');
        // collapseDemo.setProps({accordion: false})
        expect(collapseDemo.find(`.${prefixCollapse}-group`).at(1).find(`.${prefixCollapse}`).at(1).hasClass(`${prefix}-panel-show`)).toEqual(false)
        // collapseDemo.find('CollapseGroup').setState({activeKey: ['1', '2']})
        // collapseDemo.setProps({defaultActiveKey: ['1', '2']})
        collapseDemo.find(`.${prefixCollapse}-group`).at(1).find(`.${prefixCollapse}-heading`).at(1).simulate('click');
        expect(collapseDemo.find(`.${prefixCollapse}-group`).at(1).find(`.${prefixCollapse}`).at(1).hasClass(`${prefix}-panel-show`)).toEqual(false)
    })
    it('collapsible is icon', () => {
        let collapseDemo = mount(
            <Collapse activeKey='1' collapsible="icon">
                <Panel header="Panel 1" key="1">测试测试 1</Panel>
                <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
            </Collapse>
        );
        // collapseDemo.find(`.${prefixCollapse}-heading`).at(1).simulate('click');
        collapseDemo.find(`.${prefixCollapse}-header-icon`).at(1).simulate('click');
    })
    it('defaultActiveKey is Array', () => {
        let collapseDemo = mount(
            <Collapse defaultActiveKey={['1', '2']}>
                <Panel header="Panel 1" key="1">测试测试 1</Panel>
                <Panel header="Panel 2" key="2">Content of Tab Pane 2</Panel>
            </Collapse>
        );
        collapseDemo.find(`.${prefixCollapse}-heading`).at(1).simulate('click');
        collapseDemo.find(`.${prefixCollapse}-heading`).at(1).simulate('click');
        expect(collapseDemo.find(`.${prefixCollapse}`).at(1).hasClass(`${prefix}-panel-show`)).toEqual(true)
    })
})

