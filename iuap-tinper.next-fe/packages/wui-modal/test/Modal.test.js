/** Modal.tsx */
import { cleanup } from '@testing-library/react';
import { mount } from '../../../next-ui-library/test/common/mount';
// Attributes to be obsolete（废弃）show、backdrop、onHide、onExited、dialogClassName、backdropStyle、container、getContainer、backdropClosable、 <test prop:: show> <test prop:: backdrop><test prop:: onHide><test prop:: dialogClassName><test prop:: backdropStyle><test prop:: container><test prop:: getContainer>
import React from 'react';
import { keyEvent } from '../../../next-ui-library/test/common/index';
import { sleep } from '../../../next-ui-library/test/common/utils';
import Button from '../../wui-button/src';
import Checkbox from '../../wui-checkbox/src';
import KeyCode from '../../wui-core/src/keyCode';
import { prefix } from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src';
import Modal from '../src/index';
import Demo1 from './testClassModal';

const prefixModal = `${prefix}-modal`

// autoFocus
// enforceFocus
// dialogComponentClass
// bounds
const MyModal = (options) => (
    <div id="root">
        <Button>
            打开模态框
        </Button>
        <Modal
            getPopupContainer={() => document.getElementById('root')}
            containerClassName='my-class-v'
            visible={true}
            {...options}
        >
            <Modal.Header>
                <Modal.Title>标题</Modal.Title>
            </Modal.Header>
            <Modal.Body tabIndex='-1'>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal.Body>
            <Modal.Footer>
                <Button colors="secondary" style={{marginRight: 8}}>取消</Button>
                <Button colors='primary'>确定</Button>
            </Modal.Footer>
        </Modal>
    </div>
);
const MyModalNoChildren = (options) => (
    <div id="root1">
        <Modal
            getPopupContainer={() => document.getElementById('root1')}
            visible={true}
            {...options}
        >
        </Modal>
    </div>
)
const MyModalManuallyOpen = (options) => (
    <div id="root2">
        <Modal
            getPopupContainer={() => document.getElementById('root2')}
            visible={false}
            {...options}
        >
        </Modal>
    </div>
)

function keyUp(keyCode, altKey) {
    const el = document.querySelector(`.${prefixModal}`)
    keyEvent(el, 'keyup', keyCode, true, altKey);
};
afterEach(()=>  {
    cleanup()
})
describe('test some props and the modal has been opened', () => {

    let wrapper

    beforeEach(() => {
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
        wrapper = mount(
            <MyModal/>, {attachTo: document.getElementById('container')}
        );

    })
    afterEach(() => {
        const div = document.getElementById('container');
        if (div) {
            document.body.removeChild(div);
        }
        if (wrapper) {
            wrapper.unmount();
            wrapper = null;
        }
    })


    describe('component: Modal, <test prop:: mask>, <test prop:: visible>, <test prop:: getPopupContainer>', () => {
        it(`it should has class as ${prefixModal}-mask`, () => {
            wrapper.setProps(
                {
                    mask: false
                }
            );
            expect(wrapper.find(`.${prefixModal}-mask`).first()).toHaveLength(0);
        })
    })

    describe('component: Modal, <test prop:: style>', () => {
        it('modal body color should red', () => {
            wrapper.setProps(
                {
                    style: {color: 'red'}
                }
            );
            expect(wrapper.find(`.${prefixModal}-dialog`).props().style.color).toEqual('red');
        })
    })
    describe('component: Modal, <test prop:: bodyStyle>', () => {
        it('modal body color should red', () => {
            wrapper.setProps(
                {
                    bodyStyle: {color: 'red', height: 300}
                }
            );
            expect(wrapper.find(`.${prefixModal}-body`).props().style.color).toEqual('red');
            expect(wrapper.find(`.${prefixModal}-body`).props().style.height).toEqual('300px');
        })
    })
    describe('component: Modal, <test prop:: resizable>', () => {

        it('it should have a new dom: span', () => {
            expect(wrapper.find(`.${prefixModal}-resize`)).toHaveLength(0);
            wrapper.setProps(
                {
                    resizable: true
                }
            );
            
            expect(wrapper.find(`.${prefixModal}-dialog`).childAt(0).childAt(1).name()).toBe('span');
        })
        it('resizable modal can not resize when isMaximize', () => {
            expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(false)
            wrapper.setProps({ 
                resizable: true,
                isMaximize:true 
            } );
            expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(true)
            const resizbox = wrapper.find(`div.${prefixModal}-resizbox`).first();
            expect(resizbox.getDOMNode().style['height']).toEqual('100%');
            expect(resizbox.getDOMNode().style['width']).toEqual('100%');
        })
    })
    // describe('component: Modal, <test prop:: onResizeStart>', () => {

    //     it('onResizeStart should be called', () => {
    //         const mockEvent = jest.fn();
    //         wrapper.setProps({
    //             onResizeStart: mockEvent,
    //             resizable: true
    //         })
    //         window.dispatchEvent(new Event('resize'));
    //         wrapper.find(`.${prefixModal}-dialog`).childAt(0).childAt(1).childAt(5).simulate('mouseDown');
    //         expect(mockEvent).toHaveBeenCalled()
    //     })
    // })
    // describe('component: Modal, <test prop:: onResize>', () => {
    //     it('onResize should be called', async () => {
    //         const mockEvent = jest.fn();
    //         wrapper.setProps({
    //             onResize: mockEvent,
    //             resizable: true
    //         })
    //         var evObj1 = new MouseEvent('mousedown', {bubbles: true});
    //         document.getElementsByClassName(`${prefixModal}-resizbox`)[0].children[1].children[5].dispatchEvent(evObj1);
    //         await sleep(100);
    //         var evObj2 = new MouseEvent('mousemove', {bubbles: true})
    //         document.getElementsByClassName(`${prefixModal}-resizbox`)[0].children[2].children[5].dispatchEvent(evObj2);
    //         expect(mockEvent).toHaveBeenCalled();
    //     })
    // })
    // describe('component: Modal, <test prop:: onResizeStop>', () => {
    //     it('onResizeStop should be called', async () => {
    //         const mockEvent = jest.fn();
    //         wrapper.setProps({
    //             centered: true,
    //             onResizeStop: mockEvent,
    //             resizable: true
    //         })
    //         var evObj1 = new MouseEvent('mousedown', {bubbles: true});
    //         document.getElementsByClassName(`${prefixModal}-resizbox`)[0].children[1].children[5].dispatchEvent(evObj1);
    //         await sleep(100);
    //         var evObj2 = new MouseEvent('mousemove', {bubbles: true, clientX: 150, clientY: 150})
    //         document.getElementsByClassName(`${prefixModal}-resizbox`)[0].children[2].children[5].dispatchEvent(evObj2);
    //         jest.spyOn(document.getElementsByClassName(`${prefixModal}-resizbox`)[0], 'offsetWidth', 'get').mockReturnValue(150);
    //         await sleep(100);
    //         var evObj3 = new MouseEvent('mouseup', {bubbles: true})
    //         document.getElementsByClassName(`${prefixModal}-resizbox`)[0].children[2].children[5].dispatchEvent(evObj3);
    //         expect(mockEvent).toHaveBeenCalled()
    //     })
    // })
    describe('component: Modal, <test prop:: resizable>, <test prop:: resizeClassName>', () => {
        it(`it should have a classname qwert`, () => {
            wrapper.setProps(
                {
                    resizable: true,
                    resizeClassName: 'qwert'
                }
            );
            expect(wrapper.find(`.${prefixModal}-dialog div`).first().hasClass(`qwert`)).toEqual(true);
        })
    })

    describe('component: Modal, <test prop:: centered>', () => {
        it(`it should have a classname ${prefixModal}-centered`, () => {
            wrapper.setProps(
                {
                    centered: true
                }
            );
            expect(wrapper.find(`.${prefixModal}`).hasClass(`${prefixModal}-centered`)).toEqual(true);
        })
    })
    describe('component: Modal, <test prop:: zIndex>', () => {
        it(`z-index should be 10000`, () => {
            wrapper.setProps(
                {
                    zIndex: 10000
                }
            );
            const styleSelector = wrapper.find(`.${prefixModal}`).first();
            expect(styleSelector.getDOMNode().style['z-index']).toEqual('10000');
        })
    })
    describe('component: Modal, <test prop:: minWidth>', () => {
        it(`minWidth should be 11000px`, () => {
            wrapper.setProps(
                {
                    minWidth: 11000,
                    resizable: true
                }
            );
            const styleSelector = wrapper.find(`div.${prefixModal}-resizbox`).first();
            expect(styleSelector.getDOMNode().style['min-width']).toEqual('11000px');
        })
    })
    describe('component: Modal, <test prop:: minHeight>', () => {
        it(`minHeight should be 100100px`, () => {
            wrapper.setProps(
                {
                    minHeight: 100100,
                    resizable: true
                }
            );
            const styleSelector = wrapper.find(`div.${prefixModal}-resizbox`).first();
            expect(styleSelector.getDOMNode().style['min-height']).toEqual('100100px');
        })
    })
    // test 存在警告 因re-resizable渲染 内部产生 不能避免 （maxHeight同理)
    describe('component: Modal, <test prop:: maxWidth>', () => {
        it(`maxWidth should be 100200px`, () => {
            wrapper.setProps(
                {
                    maxWidth: 100200,
                    resizable: true
                }
            );
            const styleSelector = wrapper.find(`div.${prefixModal}-resizbox`).first();
            expect(styleSelector.getDOMNode().style['max-width']).toEqual('100200px');
        })
    })
    describe('component: Modal, <test prop:: maxHeight>', () => {
        it(`maxHeight should be 190px`, () => {
            wrapper.setProps(
                {
                    maxHeight: 190,
                    resizable: true
                }
            );
            const styleSelector = wrapper.find(`div.${prefixModal}-resizbox`).first();
            expect(styleSelector.getDOMNode().style['max-height']).toEqual('190px');
        })
    })

    describe('component: Modal, <test prop:: size>', () => {
        ['lg', 'md', 'sm'].forEach(size => {
            it(`it should have a classname ${prefixModal}-${size}`, () => {
                wrapper.setProps(
                    {
                        size
                    }
                );
                expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-${size}`)).toEqual(true);
            })
        })
    })
    describe('component: Modal, <test prop:: draggable>', () => {

        it(`it should have a classname react-draggable`, () => {
            wrapper.setProps(
                {
                    draggable: true,
                    bounds: 'body'
                }
            );
            expect(wrapper.find(`.${prefixModal}-content`).hasClass(`react-draggable`)).toEqual(true);
        })
    })
})

describe('test some props and it have no children', () => {
    let wrapper1;
    beforeEach(() => {

        const div1 = document.createElement('div');
        div1.setAttribute('id', 'container1');
        document.body.appendChild(div1);
        wrapper1 = mount(
            <MyModalNoChildren/>,
            {attachTo: document.getElementById('container1')}
        );

    })
    afterEach(() => {
        const div1 = document.getElementById('container1');
        if (div1) {
            document.body.removeChild(div1);
        }
        wrapper1 = null;

        if (wrapper1 && wrapper1.length) {
            wrapper1.unmount();
        }
    })
    describe('component: Modal, <test prop:: title>', () => {
        it('title should be 1234567', () => {
            wrapper1.setProps(
                {
                    title: '1234567',
                }
            );
            wrapper1.update();
            expect(wrapper1.find(`.${prefixModal}-title`).text()).toEqual('1234567');
        })
    })
    describe('component: Modal, <test prop:: cancelButtonProps>', () => {
        it('prop a/b should be 1/2', () => {
            wrapper1.setProps(
                {
                    cancelButtonProps: {
                        a: '1',
                        b: '2'
                    },
                }
            );
            wrapper1.update();
            expect(wrapper1.find(`.${prefixModal}-footer`).find(`button`).first().props().a).toEqual('1');
            expect(wrapper1.find(`.${prefixModal}-footer`).find(`button`).first().props().b).toEqual('2');
        })
    })
    describe('component: Modal, <test prop:: okButtonProps>', () => {
        it('prop a/b should be 3/4', () => {
            wrapper1.setProps(
                {
                    okButtonProps: {
                        a: '3',
                        b: '4'
                    },
                }
            );
            wrapper1.update();
            expect(wrapper1.find(`.${prefixModal}-footer`).find(`button`).at(1).props().a).toEqual('3');
            expect(wrapper1.find(`.${prefixModal}-footer`).find(`button`).at(1).props().b).toEqual('4');
        })
    })
    describe('component: Modal, <test prop:: okType>', () => {
        it('prop a/b should be 3/4', () => {
            wrapper1.setProps(
                {
                    okType: 'success',
                }
            );
            expect(wrapper1.find(`.${prefixModal}-footer`).find(`button`).at(1).hasClass('wui-button-success')).toEqual(true);
        })
    })
    describe('component: Modal, <test prop:: cancelText>', () => {
        it('cancel button text should be bug-cancel', () => {
            wrapper1.setProps(
                {
                    cancelText: 'bug-cancel',
                }
            );
            wrapper1.update();
            expect(wrapper1.find(`.${prefix}-button span`).at(0).text()).toEqual('bug-cancel');
        })
    })
    describe('component: Modal, <test prop:: okText>', () => {
        it('cancel button text should be bug-cancel', () => {
            wrapper1.setProps(
                {
                    okText: 'bug-ok',
                }
            );
            wrapper1.update();
            expect(wrapper1.find(`.${prefix}-button span`).at(1).text()).toEqual('bug-ok');
        })
    })
    describe('component: Modal, <test prop:: footer>', () => {
        it(`it should have a classname uf-dongjie`, () => {
            wrapper1.setProps(
                {
                    footer: <Icon type="uf-dongjie"/>
                }
            );
            expect(wrapper1.find(`.${prefixModal}-footer i`).hasClass(`uf-dongjie`)).toEqual(true);
        })
    })
    describe('component: Modal, <test prop:: closable>', () => {
        it(`it should have a classname uf-dongjie`, () => {
            wrapper1.setProps(
                {
                    closable: true
                }
            );
            expect(wrapper1.find(`.${prefixModal}-header .close`).hasClass(`dnd-cancel`)).toEqual(true);

        })
    })

    describe('component: Modal, <test prop:: onHide>', () => {
        const mockEvent = jest.fn()
        it('onHide   should be called', () => {
            wrapper1.setProps(
                {
                    onHide: mockEvent,
                    closable: true,
                    // onHide: ()=> { console.log('=================onhide')}
                }
            );
            wrapper1.find(`.${prefixModal}-header button`).simulate('click');
            expect(mockEvent).toHaveBeenCalled()
        })
    })
    describe('component: Modal, <test prop:: keyboard>', () => {
        const onHide = jest.fn();
        const onOk = jest.fn();
        const onCancel = jest.fn();
        const onKeyUp = jest.fn();
        const onEscapeKeyUp = jest.fn();
        function isCalled(mockevent, call = true) {
            if (call) {
                expect(mockevent).toHaveBeenCalledTimes(1) //快捷键回调只被调用一次
            } else {
                expect(mockevent).not.toHaveBeenCalled()
            }
        };
        [
            {
                keyboard: true,
                title: 'all open',
            },
            {
                keyboard: false,
                title: 'all close',
            },
            {
                keyboard: undefined,
                title: 'default: only Esc',
            },
            {
                keyboard: ['cancel', 'ok'],
                title: 'alt + Y or N',
            },
            {
                keyboard: ['enter'],
                title: 'only Enter',
            },
        ].forEach(({ keyboard, title, result }) => {
            it(`keyboard test, ${title}`, async () => {
                wrapper1.setProps({
                    closable: true,
                    keyboard: keyboard,
                    onHide: onHide,
                    onCancel: onCancel,
                    onKeyUp,
                    onEscapeKeyUp,
                });
                keyUp(KeyCode.ESC);//Esc
                await sleep(100);
                const escCalled = keyboard === true || keyboard === undefined || (Array.isArray(keyboard) && keyboard.includes('esc'));
                isCalled(onHide, escCalled);
                isCalled(onCancel, escCalled);
                isCalled(onEscapeKeyUp, escCalled);
                isCalled(onKeyUp);
                jest.clearAllMocks();

                wrapper1.setProps({
                    visible: true,
                    keyboard: keyboard,
                    onOk: onOk,
                    onKeyUp,
                })
                keyUp(KeyCode.Y, true);//alt + Y	
                await sleep(100);
                const altYCalled = keyboard === true || (Array.isArray(keyboard) && keyboard.includes('ok'));
                isCalled(onOk, altYCalled);
                jest.clearAllMocks();

                wrapper1.setProps({
                    visible: true,
                    keyboard: keyboard,
                    onCancel: onCancel,
                    onKeyUp,
                })
                keyUp(KeyCode.N, true);//alt + N
                await sleep(100);
                const altNCalled = keyboard === true || (Array.isArray(keyboard) && keyboard.includes('cancel'));
                isCalled(onCancel, altNCalled);
                jest.clearAllMocks();

                wrapper1.setProps({
                    visible: true,
                    keyboard: keyboard,
                    onOk,
                    onKeyUp,
                })
                keyUp(KeyCode.ENTER);//Enter
                await sleep(100)
                const enterCalled = keyboard === true || (Array.isArray(keyboard) && keyboard.includes('enter'));
                isCalled(onOk, enterCalled);
                jest.clearAllMocks();
            })
        });
    })
    describe('component: Modal, <test prop:: onCancel>', () => {
        const mockEvent = jest.fn()
        it('onCancel   should be called', () => {
            wrapper1.setProps(
                {
                    onCancel: mockEvent,
                    closable: true,
                }
            );
            wrapper1.find(`.${prefixModal}-header button`).simulate('click');
            expect(mockEvent).toHaveBeenCalled()
        })
    })
    describe('component: Modal, <test prop:: onOk>', () => {
        it('cancel button text should be Cancel when onOk has been setted en-us', () => {
            const mockEvent = jest.fn()
            wrapper1.setProps(
                {
                    onOk: mockEvent
                }
            );
            expect(mockEvent).not.toHaveBeenCalled()
            wrapper1.find(`.${prefixModal}-footer .${prefix}-button-primary`).simulate('click');
            expect(mockEvent).toHaveBeenCalled()
        })
    })
    describe('component: Modal, <test prop:: locale>', () => {
        it('cancel button text should be Cancel when locale has been setted en-us', () => {
            expect(wrapper1.find(`.${prefix}-button span`).first().text()).toBe('取消')
            wrapper1.setProps(
                {
                    locale: 'en-us'
                }
            );
            expect(wrapper1.find(`.${prefix}-button span`).first().text()).toBe('Cancel')
        })
    })
    describe('component: Modal, <test prop:: closeIcon>', () => {
        it(`it should have a classname uf-dongjie`, () => {
            wrapper1.setProps(
                {
                    closeIcon: <Icon type="uf-dongjie"/>
                }
            );
            expect(wrapper1.find(`.${prefixModal}-header .close i`).hasClass(`uf-dongjie`)).toEqual(true);
        })
    })
    describe('component: Modal, <test prop:: className>', () => {
        it(`it should have a classname uf-dongjie`, () => {
            wrapper1.setProps(
                {
                    className: 'qwert'
                }
            );
            expect(wrapper1.find(`.${prefixModal}-dialog`).hasClass(`qwert`)).toEqual(true);
        })
    })
    describe('component: Modal, <test prop:: backdrop>', () => {
        it(`it should have no mask`, () => {
            expect(wrapper1.exists(`.${prefixModal}-mask`)).toEqual(true);
            wrapper1.setProps(
                {
                    backdrop: false
                }
            );
            expect(wrapper1.exists(`.${prefixModal}-mask`)).toEqual(false);
        })
    })   
    describe('component: Modal, <test prop:: backdropClosable>', () => {
        it(`mask should be close after click`, () => {
            wrapper1.setProps(
                {
                    backdropClosable: true
                }
            );
            expect(wrapper1.exists(`.${prefixModal}`)).toEqual(true);
            expect(wrapper1.exists(`.${prefixModal}-mask`)).toEqual(true);
            wrapper1.find(`.${prefixModal}-mask`).simulate('click');
            expect(wrapper1.exists(`.${prefixModal}`)).toEqual(false);
            expect(wrapper1.exists(`.${prefixModal}-mask`)).toEqual(false);
        })
    })
    //maskClosable和backdropClosable功能一样
    describe('component: Modal, <test prop:: maskClosable>', () => {
        it(`mask should be close after click`, () => {
            wrapper1.setProps(
                {
                    maskClosable: true
                }
            );
            expect(wrapper1.exists(`.${prefixModal}`)).toEqual(true);
            expect(wrapper1.exists(`.${prefixModal}-mask`)).toEqual(true);
            wrapper1.find(`.${prefixModal}-mask`).simulate('click');
            expect(wrapper1.exists(`.${prefixModal}`)).toEqual(false);
            expect(wrapper1.exists(`.${prefixModal}-mask`)).toEqual(false);
        })
    })   
    describe('component: Modal, <test prop:: destroyOnClose>', () => {
        it(`madal should be destroyed after close`, () => {
            wrapper1.setProps(
                {
                    destroyOnClose: false

                }
            );
            expect(wrapper1.exists(`.${prefixModal}`)).toEqual(true);
            wrapper1.find(`.${prefixModal}-header button`).at(0).simulate('click')
            expect(wrapper1.exists(`.${prefixModal}`)).toEqual(true);
            wrapper1.setProps(
                {
                    destroyOnClose: true

                }
            );
            expect(wrapper1.exists(`.${prefixModal}`)).toEqual(true);
            wrapper1.find(`.${prefixModal}-header button`).at(0).simulate('click')
            expect(wrapper1.exists(`.${prefixModal}`)).toEqual(false);
        })
    })  
    describe('component: Modal, <test prop:: onExited>', () => {
        const mockEvent = jest.fn()
        it('onExited   should be called', () => {
            wrapper1.setProps(
                {
                    onExited: mockEvent,
                    closable: true,
                }
            );
            wrapper1.find(`.${prefixModal}-header button`).simulate('click');
            expect(mockEvent).toHaveBeenCalled()
        })
    }) 
    describe('component: Modal, <test prop:: isMaximize>', () => {
        it('modal should be maximize', () => {
            expect(wrapper1.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(false)
            wrapper1.setProps(
                {
                    isMaximize:true
                }
            );
            expect(wrapper1.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(true)
        })
    })
    describe('component: Modal, <test prop:: bodyClassName>', () => {
        it('bodyClassName should be my-class', () => {
            wrapper1.setProps(
                {
                    bodyClassName:'my-class'
                }
            );
            expect(wrapper1.find(`.${prefixModal}-body`).hasClass(`my-class`)).toBe(true)
        })
    })
})

describe('component: Modal', () => {
    let wrapperD
    beforeEach(() => {
        const div = document.createElement('div');
        div.setAttribute('id', 'containerD');
        document.body.appendChild(div);
        wrapperD = mount(
            <Demo1
            />, {attachTo: document.getElementById('containerD')}
        );
    })
    afterEach(() => {
        wrapperD && wrapperD.length && wrapperD.unmount();
    })
    it(' <test prop:: containerClassName> it should have class -> edg', () => {
        wrapperD.setProps({
            containerClassName: 'edg'
        })
        wrapperD.find(`.${prefix}-button`).first().simulate('click');
        // show  false
        const mdiv = wrapperD.find(`#rootD`);
        expect(mdiv.childAt(1).hasClass('edg')).toBeTruthy()
    })
    it(' <test prop:: height> it should have height -> 1110px', () => {
        wrapperD.setProps({
            height: 1110
        })
        wrapperD.find(`.${prefix}-button`).first().simulate('click');
        const select = wrapperD.find(`.${prefixModal}-dialog .${prefixModal}-content`);
        expect(select.getDOMNode().style.height).toBe('1110px');
        wrapperD.setProps({
            height: '222px'
        })
        wrapperD.find(`.${prefix}-button`).first().simulate('click');
        const select1 = wrapperD.find(`.${prefixModal}-dialog .${prefixModal}-content`);
        expect(select1.getDOMNode().style.height).toBe('222px');
    })
    it(' <test prop:: width> it should have width -> 1110px', () => {
        wrapperD.setProps({
            width: 1110
        })
        wrapperD.find(`.${prefix}-button`).first().simulate('click');
        const select = wrapperD.find(`.${prefixModal}-dialog .${prefixModal}-content`);
        expect(select.getDOMNode().style.width).toBe('1110px');
        wrapperD.setProps({
            width: '222px'
        })
        wrapperD.find(`.${prefix}-button`).first().simulate('click');
        const select1 = wrapperD.find(`.${prefixModal}-dialog .${prefixModal}-content`);
        expect(select1.getDOMNode().style.width).toBe('222px');
    })   
    it('<test prop:: onShow> onShow should be called', () => {
        const mockEvent = jest.fn()
        wrapperD.setProps(
            {
                onShow: mockEvent,
            }
        );
        wrapperD.find(`.${prefix}-button`).first().simulate('click');
        expect(mockEvent).toHaveBeenCalled()
    })
})
describe('Modal.header', () => {
    it('<test prop:: closeButton>', () => {
        let wrapper = mount(<Modal show={true}>
            <Modal.Header closeButton/>
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).exists(`.uf-close`)).toBe(true);  
    });
    it('<test prop:: renderCloseButton>', () => {
        let wrapper = mount(<Modal show={true}>
            <Modal.Header closeButton renderCloseButton={() => <i className='myClosebtn'>myClosebtn</i>}/>
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).exists(`.uf-close`)).toBe(false); 
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).exists(`.myClosebtn`)).toBe(true);  
    });
    it('<test prop:: closeButtonProps>', () => {
        let wrapper = mount(<Modal show={true}>
            <Modal.Header closeButton closeButtonProps={{style:{background:'red'}}}/>
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).getDOMNode().style['background']).toBe('red'); 
    });
    it('<test prop:: maximize>', () => {
        let wrapper = mount(<Modal show={true}>
            <Modal.Header maximize/>               
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).exists(`.uf-zuidahua`)).toBe(true); 
        wrapper.find(`.${prefixModal}-header button`).at(0).simulate('click')
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).exists(`.uf-zuixiaohua`)).toBe(true);
    });
    it('<test prop:: renderMaximizeButton>', () => {
        //renderMaximizeButton这个方法应该添加一个isMaximize参数，从而根据是否最大化渲染不同的自定义按钮
        let wrapper = mount(<Modal show={true}>
            {/* <Modal.Header maximize renderMaximizeButton={(isMaximize) => <i className={isMaximize ?'myMinbtn' : 'myMaxbtn'}/>}/> */} 
            <Modal.Header maximize renderMaximizeButton={() => <i className='myMaximizebtn'/>}/>
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).exists(`.myMaximizebtn`)).toBe(true); 
        wrapper.find(`.${prefixModal}-header button`).at(0).simulate('click')
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).exists(`.myMaximizebtn`)).toBe(true);
    });
    it('<test prop:: onMaximize>', () => {
        const mockEvent = jest.fn();
        let wrapper = mount(<Modal show={true}>
            <Modal.Header maximize onMaximize={mockEvent}>
                <Modal.Title >标题</Modal.Title>
            </Modal.Header>
        </Modal>);
        wrapper.find(`.${prefixModal}-header button`).at(0).simulate('click')
        expect(mockEvent).toHaveBeenCalled()
    });
})
//`info`、`success`、`error`、`warning`、`confirm` 等API
describe('Modal.method()', () => {
    it('info', () => {
        const modal = Modal.info();
        modal.update({
            title: '提示',
        });
        expect(document.getElementsByClassName(`ac-confirm`)[0].getElementsByClassName('ac-confirm-body-title-keyword')[0].innerHTML).toBe("提示");  
        modal.destroy();
    }); 
    it('success', () => {
        const modal = Modal.success();
        modal.update({
            title: '成功',
        });
        expect(document.getElementsByClassName(`ac-confirm`)[0].getElementsByClassName('ac-confirm-body-title-keyword')[0].innerHTML).toBe("成功"); 
        modal.destroy();
    }); 
    it('error', () => {
        const modal = Modal.error();
        modal.update({
            title: '失败',
        });
        expect(document.getElementsByClassName(`ac-confirm`)[0].getElementsByClassName('ac-confirm-body-title-keyword')[0].innerHTML).toBe("失败"); 
        modal.destroy();
    }); 
    it('warning', () => {
        const modal = Modal.warning();
        modal.update({
            title: '警告',
        });
        expect(document.getElementsByClassName(`ac-confirm`)[0].getElementsByClassName('ac-confirm-body-title-keyword')[0].innerHTML).toBe("警告"); 
        modal.destroy();
    }); 
    it('confirm', () => {
        const modal = Modal.confirm();
        modal.update({
            title: '确定',
        });
        expect(document.getElementsByClassName(`ac-confirm`)[0].getElementsByClassName('ac-confirm-body-title-keyword')[0].innerHTML).toBe("确定"); 
        modal.destroy();
    }); 
    it('<test prop:: onOK>', () => {
        const mockEvent = jest.fn();
        const complexModal = Modal.confirm({
            title: '确定要删除这条单据吗？',
            content: '单据删除后将不能恢复。',
            onOk() {
                mockEvent()
            },
        });
        const evt = document.createEvent('MouseEvents'); 
        evt.initEvent('click', true, true); 
        document.getElementsByClassName(`ac-confirm`)[0].getElementsByTagName('button')[1].dispatchEvent(evt);
        expect(mockEvent).toHaveBeenCalled();
        Modal.destroyAll();
    }); 
    it('<test prop:: onCancle>', () => {
        const mockEvent = jest.fn();
        const complexModal = Modal.confirm({
            title: '确定要删除这条单据吗？',
            content: '单据删除后将不能恢复。',
            onCancel() {
                mockEvent()
            }
        });
        const evt = document.createEvent('MouseEvents'); 
        evt.initEvent('click', true, true); 
        document.getElementsByClassName(`ac-confirm`)[0].getElementsByTagName('button')[0].dispatchEvent(evt);
        expect(mockEvent).toHaveBeenCalled(); 
        Modal.destroyAll();
    }); 
    [true, false].forEach( v => {
        it('<test prop:: onOK>', async () => {
            document.body.innerHTML = ''
            const modal = Modal.confirm({
                title: '确定要删除这条单据吗？',
                content: '单据删除后将不能恢复。',
                onOk() {
                    var p = new Promise(function(resolve, _reject) {
                        // 做一些异步操作
                        setTimeout(function() {
                            resolve(v);
                        }, 500);
                    });
                    return p;
                },
            });
            document.querySelector(`.ac-confirm`).querySelectorAll('button')[1].click();
            expect(document.querySelectorAll(`.ac-confirm`).length === 1).toBe(true)
            await sleep(1000)
            expect(document.querySelectorAll(`.ac-confirm`).length === 1).toBe(false)
            modal.destroy();
        }); 
    })
})
describe('special combination', () => {
    it('Modal.body className should have bodyclassname-of-modal and classname-of-modal, <test prop:: bodyClassName>', () => {
        let wrapper = mount(<Modal show={true} bodyClassName="bodyclassname-of-modal">
            <Modal.Body className="classname-of-modal">
                <p>Some contents...</p>
            </Modal.Body>
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-body`).hasClass("classname-of-modal")).toEqual(true);
        expect(wrapper.find(`.${prefixModal}-body`).hasClass("bodyclassname-of-modal")).toEqual(true);
    });
})

//新增fieldid测试
describe('component: Modal, <test prop:: fieldid>', () => {
    it('Modal no children', () => {
        let wrapper = mount(<Modal show={true} />);
        expect(wrapper.find(`.${prefixModal}-header`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefixModal}-title`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefixModal}-body`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefixModal}-footer`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefixModal}-footer button`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefixModal}-footer button`).at(1).props().fieldid).toBe(undefined);
        wrapper.setProps({ fieldid: 'test' });
        expect(wrapper.find(`.${prefixModal}-header`).at(0).props().fieldid).toBe("test_modal_header");
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).props().fieldid).toBe("test_modal_header_close");
        expect(wrapper.find(`.${prefixModal}-title`).at(0).props().fieldid).toBe("test_modal_title");
        expect(wrapper.find(`.${prefixModal}-body`).at(0).props().fieldid).toBe("test_modal_body");
        expect(wrapper.find(`.${prefixModal}-footer`).at(0).props().fieldid).toBe("test_modal_footer");
        expect(wrapper.find(`.${prefixModal}-footer button`).at(0).props().fieldid).toBe("test_modal_footer_cancel");
        expect(wrapper.find(`.${prefixModal}-footer button`).at(1).props().fieldid).toBe("test_modal_footer_ok");
    });
    it('Modal has children', () => {
        let wrapper = mount(<Modal show={true}>
            <Modal.Header fieldid="test_modal_header" closeButton maximize>
                <Modal.Title fieldid="test_modal_title">标题</Modal.Title>
            </Modal.Header>
            <Modal.Body fieldid="test_modal_body">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal.Body>
            <Modal.Footer fieldid="test_modal_footer">
                <Button fieldid="test_modal_footer_cancel" colors="secondary" style={{ marginRight: 8 }}>取消</Button>
                <Button fieldid="test_modal_footer_ok" colors='primary'>确定</Button>
            </Modal.Footer>
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-header`).at(0).props().fieldid).toBe("test_modal_header");
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).props().fieldid).toBe("test_modal_header_close");
        expect(wrapper.find(`.${prefixModal}-title`).at(0).props().fieldid).toBe("test_modal_title");
        expect(wrapper.find(`.${prefixModal}-body`).at(0).props().fieldid).toBe("test_modal_body");
        expect(wrapper.find(`.${prefixModal}-footer`).at(0).props().fieldid).toBe("test_modal_footer");
        expect(wrapper.find(`.${prefixModal}-footer button`).at(0).props().fieldid).toBe("test_modal_footer_cancel");
        expect(wrapper.find(`.${prefixModal}-footer button`).at(1).props().fieldid).toBe("test_modal_footer_ok");
        expect(wrapper.find(`.${prefixModal}-header button`).at(1).props().fieldid).toBe("test_modal_header_min");
        wrapper.find(`.${prefixModal}-header button`).at(1).simulate('click')
        expect(wrapper.find(`.${prefixModal}-header button`).at(1).props().fieldid).toBe("test_modal_header_max");
    });
});

describe('component: Modal, <test prop:: onCustomRender>', () => {
    it('Modal no ModalFooter', () => {
        let wrapper = mount(<Modal show={true} />);
        expect(wrapper.find(`.${prefixModal}-footer`).children()).toHaveLength(2)//有两个button
        wrapper.setProps({
            footerProps: {
                className: "cutom-footer",
                onCustomRender: undefined
            }
        })
        expect(wrapper.find(`.${prefixModal}-footer`).hasClass('cutom-footer')).toBe(true)
        expect(wrapper.find(`.${prefixModal}-footer`).find('button')).toHaveLength(2);
        expect(wrapper.find(`.${prefixModal}-footer`).find('input[type="checkbox"]')).toHaveLength(0);
        wrapper.setProps({
            footerProps: {
                onCustomRender: () => undefined
            }
        })
        expect(wrapper.find(`.${prefixModal}-footer`).find('button')).toHaveLength(0);
        expect(wrapper.find(`.${prefixModal}-footer`).find('input[type="checkbox"]')).toHaveLength(0);
        wrapper.setProps({
            footerProps: {
                onCustomRender: () => <Checkbox >check it </Checkbox>
            }
        })
        expect(wrapper.find(`.${prefixModal}-footer`).find('button')).toHaveLength(0);
        expect(wrapper.find(`.${prefixModal}-footer`).find('input[type="checkbox"]')).toHaveLength(1);
        wrapper.setProps({
            footerProps: {
                onCustomRender: (child) => [<Checkbox >check it </Checkbox>, child]
            }
        })
        expect(wrapper.find(`.${prefixModal}-footer`).find('button')).toHaveLength(2);
        expect(wrapper.find(`.${prefixModal}-footer`).find('input[type="checkbox"]')).toHaveLength(1);
    });
    it('Modal has ModalFooter', () => {
        let wrapper = mount(<Modal show={true}>
            <Modal.Header closeButton maximize>
                <Modal.Title >标题</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal.Body>
            <Modal.Footer onCustomRender={(child) => [<Checkbox >check it </Checkbox>, child]}>
                <Button colors="secondary">取消</Button>
                <Button colors='primary'>确定</Button>
            </Modal.Footer>
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-footer`).find('button')).toHaveLength(2);
        expect(wrapper.find(`.${prefixModal}-footer`).find('input[type="checkbox"]')).toHaveLength(1);
    });
})
describe('component: Modal, <test prop:: isMaximize>', () => {
    it('Modal no ModalHeader', () => {
        const mockEvent = jest.fn()
        let wrapper = mount(<Modal show={true} isMaximize maximize onMaximize={mockEvent} />);
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(true)

        wrapper.find(`.${prefixModal}-header`).find(`button.maximize`).simulate('click')
        //点击最小化按钮不起作用，只能通过改变props.isMaximize，来控制最大最小化
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(true)
        expect(mockEvent).toHaveBeenCalledWith(false)

        wrapper.setProps({ isMaximize: false })
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(false)
    });
    it('Modal only set isMaximize', () => {
        let wrapper = mount(<Modal show={true} isMaximize />);
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(true)
        //不使用maximize时，没有最大化最小化按钮
        expect(wrapper.find(`.${prefixModal}-header`).exists(`button.maximize`)).toBe(false)
        wrapper.setProps({ isMaximize: false })
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(false)
    });
    it('Modal has ModalHeader', () => {
        const mockEvent = jest.fn()
        let wrapper = mount(<Modal show={true} isMaximize>
            <Modal.Header maximize onMaximize={mockEvent} />
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(true)
        wrapper.find(`.${prefixModal}-header`).find(`button.maximize`).simulate('click')
        //点击最小化按钮不起作用，只能通过改变props.isMaximize，来控制最大最小化
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(true)
        expect(mockEvent).toHaveBeenCalledWith(false)
        wrapper.setProps({ isMaximize: false })
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(false)
    });
})

describe('4.4.4 New Api Test', () => {
    it('component: Modal, <test prop:: afterClose> <test prop:: afterClose> <test prop:: centered> <test prop:: keyboard> <test prop:: autoFocus> <test prop:: style> <test prop:: bodyStyle>', () => {
        document.body.innerHTML = '';
        const onOk = jest.fn();
        const onCancel = jest.fn();
        const afterClose = jest.fn();
        const createModal = () => Modal.info({
            title: '4.4.4 New Api',
            content: (
                <div>
                    <p>单据状态已更新，请在审批中心内查看。</p>
                </div>
            ),
            onOk() {
                onOk()
            },
            afterClose(){
                afterClose()
            },
            centered: true,
            keyboard: true,
            autoFocus: 'ok',
            style: {color: '#fff'},
            bodyStyle: {color: '#fff'}
        });
        createModal(); //打开confirmModal
        const confirmModal = document.getElementsByClassName(`ac-confirm`)[0];
        const okButton = confirmModal.querySelector(`.${prefixModal}-ok-button`);
        expect(document.activeElement).toBe(okButton);
        expect(confirmModal.getElementsByClassName('ac-confirm-body-title-keyword')[0].innerHTML).toBe("4.4.4 New Api"); 
        expect(confirmModal.querySelector(`.${prefixModal}-dialog`).style.color).toBe("rgb(255, 255, 255)");
        expect(confirmModal.querySelector(`.${prefixModal}-body`).style.color).toBe("rgb(255, 255, 255)");
        okButton.click();
        expect(confirmModal.classList.contains(`${prefixModal}-centered`)).toBe(true);
        expect(onOk).toBeCalledTimes(1);
        expect(afterClose).toBeCalledTimes(1);

        createModal();
        jest.clearAllMocks();
        keyUp(KeyCode.ESC);//Esc
        expect(afterClose).toBeCalledTimes(1)

        createModal();
        jest.clearAllMocks();
        keyUp(KeyCode.Y, true);//alt + Y	
        expect(onOk).toBeCalledTimes(1)

        createModal();
        jest.clearAllMocks();
        keyUp(KeyCode.N, true);//alt + N
        expect(afterClose).toBeCalledTimes(1)

        Modal.destroyAll()
    })
    it('component: Modal, <test prop:: forceRender>', () => {
        let wrapper = mount(<Modal show={false} forceRender destroyOnClose />);
        //在打开之前，modal不可见， 但是已经渲染了dom结构
        expect(wrapper.find(`.${prefixModal}`)).toHaveLength(1)
        expect(wrapper.find(`.${prefixModal}`).instance().style.display).toBe('none')

        //打开后可见
        wrapper.setProps({show: true})
        expect(wrapper.find(`.${prefixModal}`).instance().style.display).toBe('block')

        //关闭后销毁
        wrapper.setProps({show: false})
        expect(wrapper.find(`.${prefixModal}`)).toHaveLength(0)
    });
})
describe('component: Modal, <test prop:: showPosition>', () => {
    it('Modal showPosition', () => {
        document.body.innerHTML = '';
        let wrapper = mount(<Modal show={true} draggable />, {attachTo: document.body});
        jest.spyOn(document.querySelector(`.${prefixModal}-dialog`), 'getBoundingClientRect').mockReturnValue({
            top: 200,
            bottom: 600,
            left: 200,
            right: 400,
            width: 200,
            height: 200,
        });
        wrapper.setProps({showPosition: {x:300, y:300}})
        wrapper.update()
        expect(wrapper.find(`.${prefixModal}-draggable div`).at(0).props().style.transform).toBe("translate(300px,300px)")
    });
})
describe('component: Modal, <test prop:: enforceFocus>', () => {
    it('Modal default ModalHeader', () => {
        const wrapper = mount(<Modal show={true} enforceFocus />);
        expect(document.activeElement.className).toEqual("wui-modal-body")
        wrapper.unmount();
    });
})
describe('component: Modal, <test prop:: draggable>', () => {
    it('Modal draggable', async () => {
        document.body.innerHTML = '';
        const container = document.createElement('div');
        document.body.appendChild(container);
        const onStart = jest.fn()
        const onStop = jest.fn()
        mount(<Modal show={true} draggable onStart={onStart} onStop={onStop} />, {attachTo: container});
        document.querySelector(`.${prefixModal}-header-dnd-handle`).dispatchEvent(new MouseEvent('mousedown',{bubbles:true}))
        await sleep(100)
        document.querySelector(`.${prefixModal}-header-dnd-handle`).dispatchEvent(new MouseEvent('mousemove',{bubbles:true, clientX: -200, clientY: -200}))
        await sleep(100)
        document.querySelector(`.${prefixModal}-header-dnd-handle`).dispatchEvent(new MouseEvent('mouseup',{bubbles:true, clientX: -200, clientY: -200}))
        // expect(onStart).toBeCalled(); 回调暂时未暴露
        // expect(onStop).toBeCalled(); 回调暂时未暴露
        expect(document.querySelector(`.${prefixModal}-draggable > div`).style.transform).toEqual("translate(-200px,-200px)")
    });
})

describe('component: Modal, Test Jira', () => {
    it('QDJCJS-10177放大后缩小不了', () => {
        //解决componentWillReceiveProps中'show'和'isMaximize'没有分开写导致的错误, 点击最大化, 之后又设置show, 会把ismaxmize更新成undefined
        const mockEvent = jest.fn()
        let wrapper = mount(<Modal show={true} maximize onMaximize={mockEvent} />);
        wrapper.find(`.${prefixModal}-header`).find(`button.maximize`).simulate('click')
        wrapper.setProps({ show: true })
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(true) //正常显示最大化
        wrapper.find(`.${prefixModal}-header`).find(`button.maximize`).simulate('click')
        expect(mockEvent).toHaveBeenCalledWith(false)
        expect(wrapper.find(`.${prefixModal}-dialog`).hasClass(`${prefixModal}-maximize`)).toBe(false) //可以正常缩小
        // 缩小后的尺寸 前后对比
    });
    it('ConfirmModal支持传入footer属性', () => {
        const modal = Modal.info({
            footer: (<Button onClick={() => modal.destroy()}>自定义底部按钮</Button>),
            title: '提示',
            content: (
                <div>
                    <p>这是一个自定义footer的modal提示</p>
                </div>
            )
        });
        expect(document.querySelector(`.ac-confirm`).querySelector(`.${prefixModal}-footer button`).textContent).toBe('自定义底部按钮');
        modal.destroy();
    });
    it('ConfirmModal传入footer: null时不显示按钮', () => {
        const modal = Modal.info({
            footer: null,
            title: '提示',
            content: (
                <div>
                    <p>这是一个自定义footer的modal提示</p>
                </div>
            )
        });
        // 其他默认按钮存在
        expect(document.querySelector(`.ac-confirm`).querySelectorAll(`.${prefixModal}-footer button`).length).toBe(0)
        modal.destroy();
    });
    it('modal.info 中width设置', () => {
        const modal = Modal.info({
            width: 300,
            title: '提示',
            content: (
                <div>
                    <p>这是一个支持width的modal提示</p>
                </div>
            )
        });
        expect(document.querySelector(`.ac-confirm`).querySelector(`.${prefixModal}-content`).style.width).toBe('300px')
        modal.destroy();
        expect(document.querySelector(`.ac-confirm`)).toBe(null)
    });
    it('modal右上角的最大化最小化关闭按钮自定义渲染 ', () => {
        //renderMaximizeButton通过isMaximize参数，从而根据是否最大化渲染不同的自定义按钮
        let wrapper = mount(<Modal show={true}>
            <Modal.Header maximize renderMaximizeButton={(isMaximize) => <i className={isMaximize ? 'myMinbtn' : 'myMaxbtn'} />} />
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).exists(`.myMaxbtn`)).toBe(true);
        wrapper.find(`.${prefixModal}-header button`).at(0).simulate('click')
        expect(wrapper.find(`.${prefixModal}-header button`).at(0).exists(`.myMinbtn`)).toBe(true);
    });
    it('modal body标签中增加style', () => {
        let wrapper = mount(<Modal show={true}>
            <Modal.Body style={{ background: 'red' }} />
        </Modal>);
        expect(wrapper.find(`.${prefixModal}-body`).at(0).instance().style.background).toBe("red");
    });
    it(`centered为once`, () => {
        let wrapper = mount(<Modal show={true} centered={'once'} > </Modal>);
        expect(wrapper.find(`.${prefixModal}`).hasClass(`${prefixModal}-centered`)).toEqual(true);
    });
    it(`在onshow参数中增加dom返回`, () => {
        const onShow = jest.fn();
        let wrapper = mount(<Modal show={false} onShow={onShow} />);
        wrapper.setProps({show: true})
        let dom = wrapper.find('div[role="dialogRoot"]').instance()
        expect(onShow).toHaveBeenCalledWith(dom)
    })
}); 
