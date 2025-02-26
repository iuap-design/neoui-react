/**Notice.tsx */
import React, {Component} from 'react';
import {mount} from '../../../next-ui-library/test/common/mount'
import {prefix} from '../../wui-core/src/updatePrefix'
import Notification from '../src/index'
import Button from "../../wui-button/src";
import Icon from '../../wui-icon/src';
import { sleep } from '../../../next-ui-library/test/common/index';

const prefixNotification = `${prefix}-notification`;

describe('Component: Notification', () => {
    ['info', 'success', 'danger', 'warning', 'dark', 'news', 'light', 'infolight', 'successlight', 'dangerlight', 'warninglight'].forEach((item) => {
        it(`@fieldid,"***_${item}_close", <test prop:: fieldid>`, async () => {
            let newNotification = null;
            Notification.newInstance({position: 'bottomRight'}, n => newNotification = n);
            const simpleFn = () => {
                newNotification.notice({
                    color: item,
                    duration: '1',
                    fieldid: "fieldid-id",
                    content: <span>这是一个提示</span>
                });
            }
            const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
            await sleep(1500)
            wrapper.find(`.${prefix}-button`).simulate('click');
            expect(document.getElementsByClassName(`${prefixNotification}-notice-closable`)[0].getElementsByTagName('a')[0].getAttribute('fieldid')).toEqual(`fieldid-id_${item}_close`);
        })
    })
    it(`<test prop:: closable>, <test prop:: onClose>, <test prop:: onClick>, <test prop:: duration>`, async () => {
        const onclose = jest.fn();
        const onclick = jest.fn();
        let closable = true;
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight'}, n => newNotification = n);
        const simpleFn = () => {
            newNotification.notice({
                color: 'info',
                duration: 1,
                fieldid: "fieldid-id",
                content: <span>这是一个提示</span>,
                onClose: onclose,
                closable: closable,
                onClick: onclick
            });
        }
        const wrapper = mount(<Button colors="secondary" onClick={simpleFn} />);
        wrapper.find(`.${prefix}-button`).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-closable`)[0]).toBeTruthy()
        expect(onclose).toHaveBeenCalledTimes(0);
        await sleep(1500)
        expect(onclose).toHaveBeenCalledTimes(1);
        expect(onclose.mock.calls[0][0]).toEqual(undefined);

        closable = false;
        wrapper.update();
        wrapper.find(`.${prefix}-button`).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-closable`)[0]).toEqual(undefined);
        expect(onclick).toHaveBeenCalledTimes(0);
        document.querySelector(`.${prefixNotification}-notice`).click();
        expect(onclick).toHaveBeenCalledTimes(1);
    })
})
describe('Component: Notification', () => {
    it('test, <test prop:: content>, <test prop:: title>, <test prop:: className>, <test prop:: btn>, <test prop:: icon>, <test prop:: closeIcon>', () => {
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight'}, n => newNotification = n);
        const simpleFn = ()=> {
            newNotification.notice({
                title: 'title-of-notification',
                duration: '1',
                color: 'dark',
                style: {padding: 10},
                className: 'className-of-notification',
                content: <span>这是一个提示</span>,
                btn: <span className='classButton'>关闭按钮</span>,
                closeIcon: <Icon type="uf-appzhankai"/>,
                icon: <Icon type="uf-bumen"/>
            });
        }
        const wrapper = mount(
            <div className="demoPadding">
                <Button colors="secondary" onClick={simpleFn}>simple show</Button>
            </div>
        );
        wrapper.find(`.${prefix}-button`).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-description`)[0].getElementsByTagName('span')[0].innerHTML).toEqual('这是一个提示');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-title`)[0].textContent).toEqual("title-of-notification");
        expect(document.getElementsByClassName(`className-of-notification`)[0]).toBeTruthy();
        expect(document.getElementsByClassName(`classButton`)[0].innerHTML).toEqual('关闭按钮');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-close`)[0].getElementsByClassName(`uf-appzhankai`)[0]).toBeTruthy();
        expect(document.getElementsByClassName(`${prefixNotification}-notice-title`)[0].getElementsByClassName(`uf-bumen`)[0]).toBeTruthy();
    })
})
describe('Component: Notification', () => {
    Object.entries({'success': 'successlight', 'successlight': 'successlight', 'info': 'infolight', 'infolight': 'infolight', 
                    'danger': 'dangerlight', 'dangerlight': 'dangerlight', 'warning': 'warninglight', 'warninglight': 'warninglight', 
                    'dark': 'dark', 'news': 'news', 'light': 'light'}).forEach((item) => {
        it('color should be this, <test prop:: color>', async () => {
            let newNotification = null;
            Notification.newInstance({position: 'bottomRight'}, n => newNotification = n);
            const simpleFn = ()=> {
                newNotification.notice({
                    duration: '1',
                    color: item[0],
                    content: <span>这是一个提示</span>
                });
            }
            const wrapper = mount(
                <div className="demoPadding">
                    <Button colors="secondary" onClick={simpleFn}>simple show</Button>
                </div>
            );
            wrapper.find(`.${prefix}-button`).simulate('click');
            expect(document.getElementsByClassName(`${prefixNotification}-notice-${item[1]}`)[0]).toBeTruthy(); 
        })
    })
})
describe('Component: Notification', () => {
    Object.entries({'success': 'uf uf-yiwancheng', 'successlight': 'uf uf-yiwancheng', 'info': 'uf uf-i-c', 'infolight': 'uf uf-i-c', 
                    'danger': 'uf uf-exc-c', 'dangerlight': 'uf uf-exc-c', 'warning': 'uf uf-exc-t', 'warninglight': 'uf uf-exc-t', 
                    'dark': 'uf', 'news': 'uf uf-bell', 'light': 'uf'}).forEach((item) => {
        it('color should be this, <test prop:: color>', async () => {
            let newNotification = null;
            Notification.newInstance({position: 'bottomRight'}, n => newNotification = n);
            const simpleFn = ()=> {
                newNotification.notice({
                    duration: 0.5,
                    title: 'title',
                    color: item[0],
                    content: <span>这是一个提示</span>
                });
            }
            const wrapper = mount(
                <div className="demoPadding">
                    <Button colors="secondary" onClick={simpleFn}>simple show</Button>
                </div>
            );
            await sleep(1000)
            wrapper.find(`.${prefix}-button`).simulate('click');
            expect(document.getElementsByClassName(`${prefixNotification}-notice-title`)[0].getElementsByTagName('i')[0].getAttribute('class')).toEqual(item[1]);
        })
    })
})

describe('style test', () => {
    it('background should be red, <test prop:: style>, <test prop:: description>, <test prop:: message>', async () => {
        const onclose = jest.fn();
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight'}, n => newNotification = n);
        const simpleFn = ()=> {
            newNotification.notice({
                duration: 1,
                message: 'message-of-notification',
                style: {'background': 'red'},
                description: <span>这是一个提示</span>,
                color: 'success',
                onClose: onclose
            });
        }
        const wrapper = mount(
            <div className="demoPadding">
                <Button colors="secondary" onClick={simpleFn}>simple show</Button>
            </div>
        );
        await sleep(1000)
        wrapper.find(`.${prefix}-button`).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice`)[0].getAttribute('style')).toEqual("background: red;")
        expect(document.getElementsByClassName(`${prefixNotification}-notice-description`)[0].getElementsByTagName('span')[0].innerHTML).toEqual('这是一个提示');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-title`)[0].textContent).toEqual("message-of-notification");

        // 点击消息框主体时 移除关闭效果
        document.querySelector(`.${prefixNotification}-notice-closable`).click();
        expect(document.getElementsByClassName(`${prefixNotification}-notice`)[0]).toBeTruthy()
        expect(onclose).toHaveBeenCalledTimes(0);
        await sleep(1500)
        expect(onclose).toHaveBeenCalledTimes(1);
        expect(document.getElementsByClassName(`${prefixNotification}-notice`)[0]).toBeFalsy()
    })
})

describe('key test', () => {
    it('key, <test prop:: key>', async () => {
        let newNotification = null;
        Notification.newInstance({position: 'bottomRight'}, n => newNotification = n);
        const simpleLight3 = () => { Notification.warn({ title: 'warn', content: 'warn', duration: null }) }
        const simpleLight4 = () => { Notification.error({ title: 'error', content: 'error', duration: null, key: '12' }) }
        const closeHandle = () =>  Notification.close('12')
    
        const wrapper = mount(
            <div className="demoPadding">
                <Button colors="secondary" onClick={simpleLight3}>warn</Button>
                <Button colors="secondary" onClick={simpleLight4}>error</Button>
                <Button onClick={closeHandle}>close</Button>
            </div>
        );

        wrapper.find('button').at(0).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-warninglight`)[0]).toBeTruthy();
        wrapper.find('button').at(1).simulate('click');
        expect(document.getElementsByClassName(`${prefixNotification}-notice-dangerlight`)[0]).toBeTruthy();

        wrapper.find('button').at(2).simulate('click');
        await sleep(500);
        expect(document.getElementsByClassName(`${prefixNotification}-notice-dangerlight`)[0]).toBeFalsy();
        expect(document.getElementsByClassName(`${prefixNotification}-notice-warninglight`)[0]).toBeTruthy();
    })
})