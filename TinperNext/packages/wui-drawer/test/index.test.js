/** index.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {prefix} from '../../wui-core/src/updatePrefix';
import Drawer from '../src/index';

const prefixDrawer = `${prefix}-drawer`;
const div = document.createElement('div');
div.id = 'demo'
document.body.appendChild(div)
describe('index', () => {
    it('drawer should be show, <test prop:: show> <test prop:: destroyOnClose>', () => {
        const drawerDom = mount(<Drawer show={true} destroyOnClose={true} />);
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
        drawerDom.setProps({ show: false });
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(false)
    })
    it('drawer visible, <test prop:: visible>', () => {
        const drawerDom = mount(<Drawer visible={true} mask={true} destroyOnClose={true} />);
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
        drawerDom.setProps({ visible: false });
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(false)
    })
    it('drawer should show mask, <test prop:: showMask>', () => {
        const drawerDom = mount(<Drawer visible={true} showMask={false}/>);
        expect(drawerDom.exists(`.${prefixDrawer}-mask`)).toEqual(false);
        drawerDom.setProps({ showMask: true });
        expect(drawerDom.exists(`.${prefixDrawer}-mask`)).toEqual(true);
    })
    it('drawer mask, <test prop:: mask>', () => {
        const drawerDom = mount(<Drawer visible={true} mask={false}/>);
        expect(drawerDom.exists(`.${prefixDrawer}-mask`)).toEqual(false);
        drawerDom.setProps({ mask: true });
        expect(drawerDom.exists(`.${prefixDrawer}-mask`)).toEqual(true);
    })
    it('drawer should show close button, <test prop:: showClose>', () => {
        const drawerDom = mount(<Drawer visible={true} showClose={true}/>);
        expect(drawerDom.exists(`.${prefixDrawer}-close`)).toEqual(true);
        drawerDom.setProps({ showClose: false });
        expect(drawerDom.exists(`.${prefixDrawer}-close`)).toEqual(false);
    })
    it('drawer closable, <test prop:: closable>', () => {
        const drawerDom = mount(<Drawer visible={true} closable={true}/>);
        expect(drawerDom.exists(`.${prefixDrawer}-close`)).toEqual(true);
        drawerDom.setProps({ closable: false });
        expect(drawerDom.exists(`.${prefixDrawer}-close`)).toEqual(false);
    })
    it('drawer getContainer, <test prop:: getContainer>', () => {
        const drawerDom = mount(<div><Drawer visible={true} mask={true} placement="right" getContainer={document.querySelector('#demo')}/></div>);
        expect(drawerDom.find('#demo').find(`.${prefixDrawer}-right`).hasClass(`${prefixDrawer}`)).toEqual(true);
    })
    it('drawer should have this container, <test prop:: container>', () => {
        const drawerDom = mount(<div><Drawer visible={true} mask={true}
													   container={document.querySelector('#demo')} placement="right"/></div>);
        expect(drawerDom.find('#demo').find(`.${prefixDrawer}-right`).hasClass(`${prefixDrawer}`)).toEqual(true);
    })
});
