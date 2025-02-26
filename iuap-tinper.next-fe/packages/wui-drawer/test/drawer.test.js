/** Drawer.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React, {Component} from 'react';
import {attrsTest, attrsTestByLength, sleep, testCustomStyle} from "../../../next-ui-library/test/common/index"
import Button from '../../wui-button/src/index';
import KeyCode from 'rc-util/lib/KeyCode';
import {prefix} from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src/index';
import Drawer from '../src/index';

const prefixDrawer = `${prefix}-drawer`;
const div = document.createElement('div');
div.id = 'demo'
document.body.appendChild(div)
describe('Drawer', () => {
    ['left', 'right', 'top', 'bottom'].forEach(item => {
        attrsTest({
            title: 'placement, <test prop:: placement>',
            Component: Drawer,
            attrs: {placement: item, visible: true},
            selector: `.${prefixDrawer}`,
            classnames: [`${prefixDrawer}-${item}`]
        })
    })
    attrsTest({
        title: 'Drawer className, <test prop:: className>',
        Component: Drawer,
        attrs: {className: "name-of-drawer", visible: true},
        selector: ".drawerc",
        classnames: ["name-of-drawer"]
    })
    attrsTestByLength({
        title: 'component: Drawer, <test prop:: extra>',
        Component: Drawer,
        attrs: {
            show: true,
            extra: true
        },
        selector: `.${prefixDrawer}-extra`,
        nodeCount: 1
    });
    it('Drawer hasHeader setting header is show, <test prop:: hasHeader>', () => {
        const drawerDom = mount(<Drawer hasHeader={false} visible={true} />);
        expect(drawerDom.exists(`.${prefixDrawer}-header`)).toEqual(false); 
        drawerDom.setProps({ hasHeader: true });
        expect(drawerDom.exists(`.${prefixDrawer}-header`)).toEqual(true);
    })
    it('drawer should be show, <test prop:: show> <test prop:: destroyOnClose>', () => {
        const drawerDom = mount(<Drawer show={true} destroyOnClose={true} />);
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
        drawerDom.setProps({ show: false });
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(false)
    })
    it('drawer should be show, <test prop:: show> <test prop:: autoFocus>', async () => {
        const drawerDom = mount(<Drawer show={true} autoFocus={true} />);
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
        await sleep(500)
        expect(drawerDom.find(`.${prefixDrawer}`).at(0).props().tabindex).toBe('-1')
    })

    it('drawer should be show, <test prop:: forceRender>', () => {
        const drawerDom = mount(<Drawer show={true} forceRender={true} />);
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
    })

    it('setting header title, <test prop:: title>', () => {
        const drawerDom = mount(<Drawer visible={true} title="Drawer标题"/>);
        expect(drawerDom.find(`.${prefixDrawer}-header-title`).text()).toEqual('Drawer标题');
    })
    it('close closeIcon, <test prop:: closeIcon>', () => {
        const drawerDom = mount(<Drawer visible={true} closable={true}/>);
        expect(drawerDom.find('.uf').hasClass('uf-close')).toEqual(true);
        drawerDom.setProps({ closeIcon: <Icon type="uf-plus"/> })
        expect(drawerDom.find('.uf').hasClass('uf-plus')).toEqual(true);
    })
    it('drawer width, <test prop:: width>', () => {
        const drawerDom = mount(<Drawer visible={true} width="400px"/>);
        expect(drawerDom.find(`.${prefixDrawer}`).props().style.width).toEqual("400px");
    })
    it('drawer height, <test prop:: height>', () => {
        const drawerDom = mount(<Drawer visible={true} height="400px"/>);
        expect(drawerDom.find(`.${prefixDrawer}`).props().style.height).toEqual("400px");
    })
    it('drawer zIndex, <test prop:: zIndex>', () => {
        const drawerDom = mount(<Drawer visible={true} zIndex={10}/>);
        expect(drawerDom.find(`.drawerc`).props().style['z-index']).toEqual('10');
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
    it('drawer should be show, <test prop:: show>', () => {
        const drawerDom = mount(<Drawer show={true} destroyOnClose={true} />);
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
        drawerDom.setProps({ show: false });
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(false)
    })
    it('drawer visible, <test prop:: visible>', () => {
        const drawerDom = mount(<Drawer visible={true} mask={true} destroyOnClose={true}/>);
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
        drawerDom.setProps({ visible: false });
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(false)
    })
    it('drawer getContainer, <test prop:: getContainer>', () => {
        let drawerDom = mount(<div><Drawer visible={true} mask={true} getContainer={document.querySelector('#demo')} placement="right"/></div>);
        expect(drawerDom.find('#demo').find(`.${prefixDrawer}-right`).hasClass(`${prefixDrawer}`)).toEqual(true);
        drawerDom.unmount()
        drawerDom = mount(<div><Drawer visible={true} mask={true} getContainer={() => document.querySelector('#demo')} placement="right"/></div>);
        expect(drawerDom.find('#demo').find(`.${prefixDrawer}-right`).hasClass(`${prefixDrawer}`)).toEqual(true);
    })
    it('drawer should have this container, <test prop:: container>', () => {
        let drawerDom = mount(<div><Drawer visible={true} mask={true} container={document.querySelector('#demo')} placement="right"/></div>);
        expect(drawerDom.find('#demo').find(`.${prefixDrawer}-right`).hasClass(`${prefixDrawer}`)).toEqual(true);
        drawerDom.unmount()
        drawerDom = mount(<div><Drawer visible={true} mask={true} container={() => {return document.querySelector('#demo')}} placement="right"/></div>);
        expect(drawerDom.find('#demo').find(`.${prefixDrawer}-right`).hasClass(`${prefixDrawer}`)).toEqual(true);
    })
    it('drawer should have this container, <test prop:: getPopupContainer>', () => {
        let drawerDom = mount(<div><Drawer visible={true} mask={true} getPopupContainer={document.querySelector('#demo')} placement="right"/></div>);
        expect(drawerDom.find('#demo').find(`.${prefixDrawer}-right`).hasClass(`${prefixDrawer}`)).toEqual(true);
        drawerDom.unmount()

        drawerDom = mount(<div><Drawer visible={true} mask={true} getPopupContainer={() => {return document.querySelector('#demo')}} placement="right"/></div>);
        expect(drawerDom.find('#demo').find(`.${prefixDrawer}-right`).hasClass(`${prefixDrawer}`)).toEqual(true);
    })
    it('click mask close drawer, <test prop:: maskClosable>', () => {
        const drawerDom = mount(<Drawer visible={true} maskClosable={false} destroyOnClose={true}/>);
        drawerDom.find(`.${prefixDrawer}-mask`).simulate('click')
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
        drawerDom.setProps({ maskClosable: true });
        drawerDom.find(`.${prefixDrawer}-mask`).simulate('click')
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(false);
    })
    it('click mask close drawer when has onClose, <test prop:: maskClosable>', () => {
        const mock = jest.fn()
        const drawerDom = mount(<Drawer visible={true} maskClosable={false} destroyOnClose={true} onClose={mock}/>);
        drawerDom.find(`.${prefixDrawer}-mask`).simulate('click')
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
        expect(mock).toHaveBeenCalledTimes(0)
        drawerDom.setProps({ maskClosable: true });
        drawerDom.find(`.${prefixDrawer}-mask`).simulate('click')
        expect(drawerDom.exists(`.${prefixDrawer}`)).toEqual(true);
        expect(mock).toHaveBeenCalledTimes(1)
        drawerDom.unmount()
    })
    it('drawer should be this footerStyle, <test prop:: footerStyle>, <test prop:: footer>', () => {
        const drawerDom = mount(<Drawer visible={true} footerStyle={{background: 'gold'}} footer="这是尾部"/>);
        expect(drawerDom.find(`.${prefixDrawer}-footer`).props().style.background).toEqual('gold');
        expect(drawerDom.find(`.${prefixDrawer}-footer`).text()).toEqual('这是尾部');
    })
    it('onClose test, <test prop:: onClose>', () => {
        let drawerDom = mount(<Drawer visible closable placement='top'/>)
        expect(drawerDom.find(`.${prefixDrawer}`).props().style.width).toEqual('100%')
        drawerDom.find(`.${prefixDrawer}-close`).simulate('click')
        expect(drawerDom.find(`.${prefixDrawer}`).props().style.width).toEqual('0px')
        drawerDom.unmount()
        let mock = jest.fn()
        drawerDom = mount(<Drawer visible closable onClose={mock} placement='top'/>)
        expect(drawerDom.find(`.${prefixDrawer}`).props().style.width).toEqual('100%')
        drawerDom.find(`.${prefixDrawer}-close`).simulate('click')
        expect(drawerDom.find(`.${prefixDrawer}`).props().style.width).toEqual('100%')
        expect(mock).toBeCalledTimes(1)
    })
    testCustomStyle({
        title: 'component: Drawer, <test prop:: maskStyle>',
        Component: Drawer,
        attrs: {
            visible: true,
            maskStyle: {'background': 'yellow'}
        },
        selector: `.${prefixDrawer}-mask`,
        verifyStyle: {'background': 'yellow'}
    })
    testCustomStyle({
        title: 'component: Drawer, <test prop:: drawerStyle>',
        Component: Drawer,
        attrs: {
            visible: true,
            drawerStyle: {'background': 'red'}
        },
        selector: `.${prefixDrawer}`,
        verifyStyle: {'background': 'red'}
    })
    testCustomStyle({
        title: 'component: Drawer, <test prop:: headerStyle>',
        Component: Drawer,
        attrs: {
            visible: true,
            headerStyle: {'background': 'blue'}
        },
        selector: `.${prefixDrawer}-header-box`,
        verifyStyle: {'background': 'blue'}
    })
    testCustomStyle({
        title: 'component: Drawer, <test prop:: bodyStyle>',
        Component: Drawer,
        attrs: {
            visible: true,
            bodyStyle: {'background': 'cyan'}
        },
        selector: `.${prefixDrawer}-body`,
        verifyStyle: {'background': 'cyan'}
    })
    testCustomStyle({
        title: 'component: Drawer, <test prop:: style>',
        Component: Drawer,
        attrs: {
            visible: true,
            style: {'position': 'fixed'}
        },
        selector: '.drawerc',
        verifyStyle: {'position': "fixed"}
    })
})

describe('component: Drawer, <test prop:: push>, <test prop:: onClose>', function() {
    class Demo4 extends Component {
        constructor(props) {
            super(props);
            this.state = {
                placement: 'right',
                showDrawer: false,
                title: 'Basic Drawer',
                secondTitle: 'Second Drawer',
                showSecondDrawer: false,
                secondPlacement: 'right',
            };
        }

		fPopDrawer = () => {
		    this.setState({
		        showDrawer: true
		    })
		}
		fCloseDrawer = () => {
		    this.setState({
		        showDrawer: false
		    })
		}
		fPopSecondDrawer = () => {
		    this.setState({
		        showSecondDrawer: true
		    })
		}
		fCloseSecondDrawer = () => {
		    this.setState({
		        showSecondDrawer: false
		    })
		}

		render() {
		    let {placement, showDrawer, title, secondTitle, showSecondDrawer, secondPlacement} = this.state;
		    let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.container') // 为了示例中drawer覆盖区域在导航栏下面
		    return (
		        <div className="demoPadding">
		            <div className="btnc">
		                <Button colors="primary" onClick={this.fPopDrawer}>打开</Button><br/>
		                <br/>
		            </div>
		            <Drawer push={this.props.push} style={{position: 'fixed'}} container={container} zIndex={1000}
		                showMask={false} className={'demo4'} width={500} title={title} show={showDrawer}
		                placement={placement} onClose={this.fCloseDrawer} showClose={true}>
		                <div className="con">
		                    <Button onClick={this.fPopSecondDrawer} className="btn">二级抽屉</Button>
		                </div>
		                <Drawer container={container} style={{position: 'fixed'}} showMask={false} className={'demo4'}
		                    width={'320px'} zIndex={1000001} title={secondTitle} show={showSecondDrawer}
		                    placement={secondPlacement} onClose={this.fCloseSecondDrawer} showClose={true}>
		                    <div>
		                        <p>这是第一行文字</p>
		                        <p>这是第二行文字</p>
		                    </div>
		                </Drawer>
		            </Drawer>
		        </div>
		    )
		}
    }
    it('drawer should be this transform', () => {
        const drawerDom = mount(<Demo4 push={false}/>);
        drawerDom.find(`.${prefix}-button`).at(0).simulate('click');
        drawerDom.find('.btn').simulate('click');
        expect(drawerDom.find(`.${prefixDrawer}-right`).at(0).prop('style').transform).toEqual('translate(0,0)');
    })
    it('drawer should be this transform', () => {
        const drawerDom = mount(<Demo4 />);
        drawerDom.find(`.${prefix}-button`).at(0).simulate('click');
        drawerDom.find('.btn').simulate('click');

        expect(drawerDom.find(`.${prefixDrawer}-right`).at(1).prop('style').transform).toEqual('translate(-50px,0)');
    })
    it('drawer should be this transform', () => {
        const drawerDom = mount(<Demo4 push={{distance: '100'}}/>);
        drawerDom.find(`.${prefix}-button`).at(0).simulate('click');
        // drawerDom.find('.con').find(`.${prefix}-button`).simulate('click');
        drawerDom.find('.btn').simulate('click');
        expect(drawerDom.find(`.${prefixDrawer}-right`).at(1).prop('style').transform).toEqual('translate(-100px,0)');
    })
    it('drawer should be close', () => {
        const drawerDom = mount(<Demo4/>);
        drawerDom.find(`.${prefix}-button`).at(0).simulate('click');
        drawerDom.find('.con').find(`.${prefix}-button`).simulate('click');
        drawerDom.find(`.${prefixDrawer}-close`).last().simulate('click');
        expect(drawerDom.find(`.${prefixDrawer}`).length).toBe(2);
        expect(drawerDom.find(`.${prefixDrawer}-header-title`).at(0).text()).toBe('Second Drawer');
        expect(drawerDom.find(`.${prefixDrawer}-header-title`).at(1).text()).toBe('Basic Drawer');
        drawerDom.find(`.${prefixDrawer}-close`).last().simulate('click');
        expect(drawerDom.find(`.${prefixDrawer}`).length).toBe(2);
    })
});

describe('fieldid, <test prop:: fieldid>', () => {
    it('@fieldid,"***-close"', () => {
        const wrapper = mount(<Drawer visible={true} closable={true} />);
        expect(wrapper.find(`.${prefixDrawer}-close`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixDrawer}-close`).prop('fieldid')).toEqual('fieldid-id-close');
    });
    it('@fieldid,"***-mask"', () => {
        const wrapper = mount(<Drawer visible={true} mask={true} />);
        expect(wrapper.find(`.${prefixDrawer}-mask`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixDrawer}-mask`).prop('fieldid')).toEqual('fieldid-id-mask');
    });
});

describe('Component: Drawer, keyboard test', () => {
    class Demo11 extends Component {
        constructor(props) {
            super(props);
            this.state = { showDrawer: false, closable: true, mask: true };
        }
        fPopDrawer = () => { this.setState({ showDrawer: true }) }
        fCloseDrawer = () => { this.setState({ showDrawer: false }) }
        render() {
            let { showDrawer} = this.state;
            return (
                <div className="demoPadding">
                    <div className="btnc"> <Button onClick={this.fPopDrawer}>打开Drawer</Button><br/> </div>
                    <Drawer keyboard closable={this.state.closable} visible={showDrawer} placement={'right'} onClose={this.fCloseDrawer} >
                        <div className="con"> <p>这是第一行文字</p> </div>
                    </Drawer>
                </div>
            )
        }
    }
    it('keyboard test, <test prop:: keyboard>', async () => {
        const wrapper = mount(<Demo11 />);
        expect(wrapper.find(`.${prefixDrawer}-right`).prop('style').height).toEqual('0px');
        wrapper.find('button').simulate('click');
        expect(wrapper.find(`.${prefixDrawer}-right`).prop('style').height).toEqual('100%');
        const event = new KeyboardEvent('keyup', { 'keyCode': KeyCode.ESC , bubbles: true});
        document.querySelector(`.${prefixDrawer}`).focus();
        document.querySelector(`.${prefixDrawer}`).dispatchEvent(event);
        wrapper.update();
        await sleep(500)
        expect(wrapper.find(`.${prefixDrawer}-right`).prop('style').height).toEqual('0px')
    })
})