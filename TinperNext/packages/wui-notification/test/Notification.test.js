/**Notification.tsx */
import React, {Component} from 'react';
import {mount} from '../../../next-ui-library/test/common/mount'
import {prefix} from '../../wui-core/src/updatePrefix'
import Notification from '../src/index'
import Button from "../../wui-button/src";
import KeyCode from 'rc-util/lib/KeyCode';
import { sleep } from '../../../next-ui-library/test/common/index';
import {fireEvent, render} from '@testing-library/react';

const prefixNotification = `${prefix}-notification`;

describe('Component: Notification', () => {
    it(`background should be red, <test prop:: style>`, () => {
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight', style: {'background': 'red'}}, n => newNotification = n);
        const simpleFn = () => {
            newNotification.notice({ color: 'info', duration: '1', content: <span>这是一个提示</span>});
        }
        const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
        wrapper.find(`.${prefix}-button`).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}`)[0].getAttribute('style')).toEqual("background: red;")
    })
    it(`clsPrefix test, <test prop:: clsPrefix>`, () => {
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight', clsPrefix: 'cls', className: 'class'}, n => newNotification = n);
        const simpleFn = () => {
            newNotification.notice({ color: 'info', duration: '1', content: <span>这是一个提示</span>});
        }
        const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
        wrapper.find(`.${prefix}-button`).simulate('click');
        expect(document.getElementsByClassName('cls-notice')[0]).toBeTruthy()
    })
})
describe('fieldid test, <test prop:: fieldid>', () => {
    ['info', 'success', 'danger', 'warning', 'dark'].forEach((item) => {
        it(`@fieldid,"***_${item}_close"`, async () => {
            let newNotification = null;
            Notification.newInstance({position: 'bottomRight'}, n => newNotification = n);
            const simpleFn = () => {
                newNotification.notice({
                    color: item,
                    duration: 1,
                    fieldid: "fieldid-id",
                    content: <span>这是一个提示</span>,
                    onClose() {
                    console.log('simple close');
                    },
                });
            }
            const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
            await sleep(1500)
            wrapper.find(`.${prefix}-button`).simulate('click');
            expect(document.getElementsByClassName(`${prefixNotification}-notice-closable`)[0].getElementsByTagName('a')[0].getAttribute('fieldid')).toEqual(`fieldid-id_${item}_close`);
        })
    })
})

describe('position test', () => {
    ['topRight', 'bottomRight'].forEach(item => {
        it(`${prefixNotification}-${item} should be exists, <test prop:: position>`, async () => {
            let newNotification = null;
            Notification.newInstance({position: item}, n => newNotification = n);
            const simpleFn = () => {
                newNotification.notice({ color: 'info', duration: 1, content: <span>这是一个提示</span>});
            }
            const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
            await sleep(1500)
            wrapper.find(`.${prefix}-button`).simulate('click');
            expect(document.getElementsByClassName(`${prefixNotification}-${item}`)[0]).toBeTruthy()
        })
    })
    it(`${prefixNotification}-topRight should be exists, <test prop:: position>`, () => {
        let newNotification = null;
        Notification.newInstance({}, n => newNotification = n);
        const simpleFn = () => {
            newNotification.notice({ color: 'info', duration: '0', content: <span>这是一个提示</span>});
        }
        const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
        wrapper.find(`.${prefix}-button`).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-topRight`)[0]).toBeTruthy()
    })
})
describe('placement test', () => {
    ['topRight', 'bottomRight'].forEach(item => {
        it(`${prefixNotification}-${item} should be exists, <test prop:: placement>`, async () => {
            let newNotification = null;
            Notification.newInstance({placement: item}, n => newNotification = n);
            const simpleFn = () => {
                newNotification.notice({ color: 'info', duration: 1, content: <span>这是一个提示</span>});
            }
            const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
            await sleep(1500)
            wrapper.find(`.${prefix}-button`).simulate('click');
            expect(document.getElementsByClassName(`${prefixNotification}-${item}`)[0]).toBeTruthy()
        })
    })
    it(`${prefixNotification}-topRight should be exists, <test prop:: placement>`, () => {
        let newNotification = null;
        Notification.newInstance({}, n => newNotification = n);
        const simpleFn = () => {
            newNotification.notice({ color: 'info', duration: '0', content: <span>这是一个提示</span>});
        }
        const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
        wrapper.find(`.${prefix}-button`).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-topRight`)[0]).toBeTruthy()
    })
})


describe('keyboard test', () => {
    it(`esc should be work, <test prop:: onEscapeKeyUp>, <test prop:: keyboard>`, () => {
        let newNotification = null;
        const mockEvent = jest.fn();
        Notification.newInstance({position: 'bottomRight', onEscapeKeyUp: mockEvent, keyboard: true}, n => newNotification = n);
        const simpleFn = () => {
            newNotification.notice({ color: 'info', duration: '1', content: <span>这是一个提示</span>});
        }
        const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
        expect(mockEvent).toHaveBeenCalledTimes(0)
        wrapper.find(`.${prefix}-button`).simulate('click');
        
        const event = new KeyboardEvent('keyup', { keyCode: KeyCode.ESC , bubbles: true});
        document.querySelector(`.${prefixNotification}`).focus();
        document.querySelector(`.${prefixNotification}`).dispatchEvent(event);
        expect(mockEvent).toHaveBeenCalledTimes(1)
        expect(mockEvent.mock.calls[0][0].isTrusted).toEqual(false)
    })
})

describe('notification.type', () => {
    it('notification.type', async () => {
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight'}, n => newNotification = n);
        const simpleLight = () => { Notification.success({ title: 'success', content: 'success', duration: null }) }
        const simpleLight1 = () => { Notification.info({ title: 'info', content: 'info', duration: null }) }
        const simpleLight2 = () => { Notification.warning({ title: 'warning', content: 'warning', duration: null }) }
        const simpleLight3 = () => { Notification.warn({ title: 'warn', content: 'warn', duration: null }) }
        const simpleLight4 = () => { Notification.error({ title: 'error', content: 'error', duration: null, key: '12' }) }
        const openHandle = () => {
            Notification.open(Object.assign({ title: 'error', content: 'error', duration: null, key: '13' }, {color: 'primary'}))  
        } 
        const closeHandle = () =>  Notification.close('12') 
        const destroyHandle = () => Notification.destroy()
        const simpleDark = () => { newNotification.notice({ color: "dark", title: '邮箱', content: '您收到一封邮件' }) }
    
        const wrapper = mount(
            <div className="demoPadding">
                <Button colors="secondary" onClick={simpleLight}>success</Button>
                <Button colors="secondary" onClick={simpleLight1}>info</Button>
                <Button colors="secondary" onClick={simpleLight2}>warning</Button>
                <Button colors="secondary" onClick={simpleLight3}>warn</Button>
                <Button colors="secondary" onClick={simpleLight4}>error</Button>
                <Button onClick={openHandle}>open</Button>
                <Button onClick={closeHandle}>close</Button>
                <Button onClick={destroyHandle}>destroy</Button>
                <Button colors="dark" onClick={simpleDark}>dark</Button>
            </div>
        );
        wrapper.find('button').at(0).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-successlight`)[0]).toBeTruthy();
        wrapper.find('button').at(1).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-infolight`)[0]).toBeTruthy();
        wrapper.find('button').at(2).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-warninglight`)[0]).toBeTruthy();
        wrapper.find('button').at(3).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-warninglight`)[0]).toBeTruthy();
        wrapper.find('button').at(4).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-dangerlight`)[0]).toBeTruthy();

        expect(document.getElementsByClassName(`${prefixNotification}-notice-primary`)[0]).toBeFalsy();
        wrapper.find('button').at(5).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-primary`)[0]).toBeTruthy();

        wrapper.find('button').at(6).simulate('click');
        await sleep(500);
        expect(document.getElementsByClassName(`${prefixNotification}-notice-dangerlight`)[0]).toBeFalsy();

        wrapper.find('button').at(7).simulate('click');
        await sleep(500);
        expect(document.getElementsByClassName(`${prefixNotification}-notice-successlight`)[0]).toBeFalsy();
        expect(document.getElementsByClassName(`${prefixNotification}-notice-infolight`)[0]).toBeFalsy();
        expect(document.getElementsByClassName(`${prefixNotification}-notice-warninglight`)[0]).toBeFalsy();
        expect(document.getElementsByClassName(`${prefixNotification}-notice-warninglight`)[0]).toBeFalsy();

        expect(document.getElementsByClassName(`${prefixNotification}-notice-dark`)[0]).toBeFalsy();
        wrapper.find('button').at(8).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-dark`)[0]).toBeTruthy();
    })
})
describe('error test', () => {
    it(`throw error when callback not a function, <test prop:: style>`, () => {
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight', style: {'background': 'red'}}, []);
        const simpleFn = () => {newNotification.notice({ color: 'info', content: <span>这是一个提示</span>});}
        class Demo2 extends Component {render() {return <Button onClick={simpleFn} />}}
        const wrapper = mount(<Demo2 />);
        expect(Notification).toThrow(new Error("Cannot call a class as a function"))
    })
})
describe('getPopupContainer test', () => {
    it(`throw error when callback not a function, <test prop:: getPopupContainer>`, () => {
        const div = document.createElement('div');
        div.id = "root"
        document.body.appendChild(div);
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight', getPopupContainer: () => document.querySelector('#root'),}, n => newNotification = n);
        const simpleLight = () => { Notification.success({ title: 'success', content: 'success', duration: null }) }
        const { container, baseElement, debug} = render(
            <div className="demoPadding">
                <Button colors="secondary" onClick={simpleLight}>success</Button>
            </div>
        );
        fireEvent.click(baseElement.querySelector('button'));
        expect(document.querySelector("#root").children[0].children[0].className.includes(prefixNotification)).toEqual(true);
        // expect(baseElement.querySelector(`.${prefixNotification}`).parentElement.parentElement).toEqual(document.querySelector("#root"));
        document.body.removeChild(document.querySelector("#root"))
    })
    it(`throw error when callback not a function, <test prop:: container>`, () => {
        const div = document.createElement('div');
        div.id = "root1"
        document.body.appendChild(div);
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight', container: () => document.querySelector('#root1'),}, n => newNotification = n);
        const simpleLight = () => { Notification.success({ title: 'success', content: 'success', duration: null }) }
        const { container, baseElement, debug} = render(
            <div className="demoPadding">
                <Button colors="secondary" onClick={simpleLight}>success</Button>
            </div>
        );
        fireEvent.click(baseElement.querySelector('button'));
        expect(document.querySelector("#root1").children[0].children[0].className.includes(prefixNotification)).toEqual(true);

        // expect(baseElement.querySelector(`.${prefixNotification}`).parentElement.parentElement).toEqual(document.querySelector("#root1"));
        document.body.removeChild(document.querySelector("#root1"))
    })
    it(`throw error when callback not a function, <test prop:: getContainer>`, () => {
        const div = document.createElement('div');
        div.id = "root2"
        document.body.appendChild(div);
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight', getContainer: () => document.querySelector('#root2'),}, n => newNotification = n);
        const simpleLight = () => { Notification.success({ title: 'success', content: 'success', duration: null }) }
        const { container, baseElement, debug} = render(
            <div className="demoPadding">
                <Button colors="secondary" onClick={simpleLight}>success</Button>
            </div>
        );
        fireEvent.click(baseElement.querySelector('button'));
        expect(document.querySelector("#root2").children[0].children[0].className.includes(prefixNotification)).toEqual(true);
        // expect(baseElement.querySelector(`.${prefixNotification}`).parentElement.parentElement).toEqual(document.querySelector("#root2"));
        document.body.removeChild(document.querySelector("#root2"))
    })
})