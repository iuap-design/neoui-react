/**Message.tsx */
import KeyCode from 'rc-util/lib/KeyCode';
import React from 'react';
import { sleep } from '../../../next-ui-library/test/common/index';
import { mount } from '../../../next-ui-library/test/common/mount';
import Button from "../../wui-button/src";
import { prefix } from '../../wui-core/src/updatePrefix';
import Message from '../src/index';
const prefixMessage = `${prefix}-message`;

describe('prop, <test prop:: fieldid>, <test prop:: color>, <test prop:: content>', () => {
    Object.entries({'info': 'infolight', 'success': 'successlight', 'dark': 'dark', 'light': 'light', 'error': 'dangerlight', 'waring': 'waring'}).forEach((item) => {
        it(`@fieldid,"***_alert_${item[0]}"`, () => {
            const onClick = function() {
                Message.destroy();
                Message.create({content: '单据提交成功。', color: item[0], fieldid: "fieldid-id", duration: "5"});
            };
            const wrapper = mount(<Button onClick={onClick} />);
            wrapper.find('button').simulate('click');
            expect(document.getElementsByClassName(`${prefixMessage}`)[0].getAttribute('fieldid')).toEqual(`fieldid-id_alert`);
            expect(document.getElementsByClassName(`${prefixMessage}-notice-description-icon`)[0].getElementsByTagName('i')[0].getAttribute('fieldid')).toEqual(`fieldid-id_alert_${item[0]}`);
            expect(document.getElementsByClassName(`${prefixMessage}-notice`)[0].getAttribute('class').includes(`${prefixMessage}-notice-${item[1]}`)).toBe(true);
            expect(document.getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('单据提交成功。');
        })
    })
})
describe('prop, <test prop:: fieldid>, <test prop:: color>, <test prop:: message>', () => {
    Object.entries({'info': 'infolight', 'success': 'successlight', 'dark': 'dark', 'light': 'light', 'error': 'dangerlight', 'waring': 'waring'}).forEach((item) => {
        it(`@fieldid,"***_alert_${item[0]}"`, () => {
            const onClick = function() {
                Message.destroy();
                Message.create({message: '单据提交成功。', color: item[0], fieldid: "fieldid-id", duration: "5"});
            };
            const wrapper = mount(<Button onClick={onClick} />);
            wrapper.find('button').simulate('click');
            expect(document.getElementsByClassName(`${prefixMessage}`)[0].getAttribute('fieldid')).toEqual(`fieldid-id_alert`);
            expect(document.getElementsByClassName(`${prefixMessage}-notice-description-icon`)[0].getElementsByTagName('i')[0].getAttribute('fieldid')).toEqual(`fieldid-id_alert_${item[0]}`);
            expect(document.getElementsByClassName(`${prefixMessage}-notice`)[0].getAttribute('class').includes(`${prefixMessage}-notice-${item[1]}`)).toBe(true);
            expect(document.getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('单据提交成功。');
        })
    })
})

describe('position should be this, <test prop:: position>', () => {
    ['top', 'bottom', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft'].forEach((item, index) => {
        it(`position should be ${item}`, () => {
            const onClick = function() {
                Message.destroy();
                Message.create({content: index % 2 ? '单据提交成功。' : <span>单据提交{item}</span>, color: 'dark', fieldid: "fieldid-id", duration: "1", position: item});
            };
            const wrapper = mount(<Button onClick={onClick} />);
            wrapper.find('button').simulate('click');
            expect(document.getElementsByClassName(`${prefixMessage}-notice`)[0].getAttribute('position')).toEqual(item);
        })
    })
    it(`.${prefixMessage}-notice should not be exists`, () => {
        const onClick = function() {
            Message.destroy();
            Message.create({content: '单据提交成功。', color: 'dark', fieldid: "fieldid-id", duration: "1", position: 'error'});
        };
        const wrapper = mount(<Button onClick={onClick} />);
        wrapper.find('button').simulate('click');
        expect(document.getElementsByClassName(`${prefixMessage}-notice`)[0]).toEqual(undefined);
    })
})
// 键盘快捷键
describe('Component: Message, keyboard test', () => {
    it('keyboard test, <test prop:: keyboard>, <test prop:: onEscapeKeyUp>', async () => {
        const mockEvent = jest.fn()
        const dark = function() {
            Message.destroy();
            Message.create({ content: '通过ESC按键可以关闭弹窗', onEscapeKeyUp: mockEvent, color: "dark", duration: 1000, keyboard: true });
        };
        const light = function() {
            Message.destroy();
            Message.create({content: '通过ESC按键无法关闭弹窗', color: "dark", duration: 1000, keyboard: false});
        };
        const wrapper = mount(
            <div className="paddingDemo">
                <Button colors="dark" onClick={dark}> 通过ESC按键可以关闭弹窗 </Button>
                <Button shape="border" onClick={light}> 通过ESC按键无法关闭弹窗 </Button>
            </div>);
        expect(mockEvent).toHaveBeenCalledTimes(0);
        expect(document.getElementsByClassName(`${prefixMessage}-notice-dark`)[0]).toEqual(undefined)
        wrapper.find('button').at(0).simulate('click')
        expect(document.getElementsByClassName(`${prefixMessage}-notice-dark`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('通过ESC按键可以关闭弹窗')
        
        let event = new KeyboardEvent('keyup', { 'keyCode': KeyCode.ESC , bubbles: true});
        document.querySelector(`.${prefixMessage}`).focus();
        document.querySelector(`.${prefixMessage}`).dispatchEvent(event);
        expect(mockEvent).toHaveBeenCalledTimes(1)
        expect(mockEvent.mock.calls[0][0].isTrusted).toEqual(false)
        await sleep(500)
        expect(document.getElementsByClassName(`${prefixMessage}-notice-dark`)[0]).toEqual(undefined)

        // keyboard: false
        wrapper.update()
        expect(mockEvent).toHaveBeenCalledTimes(1);
        expect(document.getElementsByClassName(`${prefixMessage}-notice-dark`)[0]).toEqual(undefined)
        wrapper.find('button').at(1).simulate('click')
        expect(document.getElementsByClassName(`${prefixMessage}-notice-dark`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('通过ESC按键无法关闭弹窗')

        event = new KeyboardEvent('keyup', { 'keyCode': KeyCode.ESC , bubbles: true});
        document.querySelector(`.${prefixMessage}`).focus();
        document.querySelector(`.${prefixMessage}`).dispatchEvent(event);
        expect(mockEvent).toHaveBeenCalledTimes(1)
        await sleep(500)
        expect(document.getElementsByClassName(`${prefixMessage}-notice-dark`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('通过ESC按键无法关闭弹窗')
    })
})
describe('Component: Message1,', () => {
        it('icon should be "uf uf-tinperzc-col", <test prop:: icon>, <test prop:: showIcon>', () => {
            const onClick = function() {
                Message.destroy();
                Message.create({content: '单据提交成功。', color: 'dark', duration: '5', icon: 'uf uf-tinperzc-col'});
            };
            const wrapper = mount(<Button onClick={onClick} />);
            wrapper.find('button').simulate('click');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-description-icon`)[0].getElementsByTagName('i')[0].getAttribute('class')).toEqual('uf uf-tinperzc-col');
            wrapper.unmount()
            const onClick1 = function() {
                Message.destroy();
                Message.create({content: '单据提交成功。', color: 'dark', duration: '5', showIcon: false});
            };
            const wrapper1 = mount(<Button onClick={onClick1} />);
            wrapper1.find('button').simulate('click');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-description-icon`)[0]).toBe(undefined);
            wrapper1.unmount()
        })
        Object.entries({'info': 'uf uf-xingzhuangbeifen', 'dark': 'uf uf-notification', 'light': 'uf uf-notification', 'success': 'uf uf-chenggongtishi', 'error': 'uf uf-exc-c-2', 'waring': ''}).forEach((item) => {
            it(`icon class when icon prop is not exists, <test prop:: icon>, <test peop:: color>`, () => {
                const onClick = function() {
                    Message.destroy();
                    Message.create({content: '单据提交成功。', color: item[0], fieldid: "fieldid-id", duration: "5"});
                };
                
                const wrapper = mount(<Button onClick={onClick} />);
                wrapper.find('button').simulate('click');
                expect(document.getElementsByClassName(`${prefixMessage}-notice-description-icon`)[0].getElementsByTagName('i')[0].getAttribute('class')).toEqual(`${item[1]}`);
            wrapper.unmount()
    
            })
        });
        it('onClose, <test prop:: onClose>, <test prop:: duration>', async () => {
            const onClose = jest.fn();
            const onClickButton = function() {
                Message.destroy();
                Message.create({content: '单据提交成功。', color: 'dark', duration: "2", onClose: onClose});
            };
            const wrapper = mount(<Button onClick={onClickButton} />);
            wrapper.find('button').simulate('click');
            expect(onClose).not.toHaveBeenCalled();
            expect(document.getElementsByClassName(`${prefixMessage}-notice-description`)[0]).toBeTruthy()
            await sleep(2100);
            expect(onClose).toHaveBeenCalled();
            expect(document.getElementsByClassName(`${prefixMessage}-notice-description`)[0]).toBeFalsy()
            wrapper.unmount()
        });
        it('onClick, <test prop:: onClick>', () => {
            const mockFn = jest.fn();
            const onClickButton = function() {
                Message.destroy();
                Message.create({content: '单据提交成功。', color: 'dark', duration: "2", onClick: mockFn});
            };
            const wrapper = mount(<Button onClick={onClickButton} />);
            expect(mockFn).toHaveBeenCalledTimes(0);
            wrapper.find('button').simulate('click');
            document.querySelector(`.${prefixMessage}-notice`).click();
            expect(mockFn).toHaveBeenCalledTimes(1);
            wrapper.unmount()
        })
        it('message.type', () => {
            const showMessage = () => {
                Message.success({ content: "success", duration: 0 })
                Message.info({ content: "info", duration: 0 })
                Message.warning({ content: "warning", duration: 0 })
                Message.error({ content: "error", duration: 0 })
                Message.loading({ content: "loading", duration: 0 })
                Message.infolight({ content: "infolight", duration: 0 })
                Message.successlight({ content: "successlight", duration: 0 })
                Message.dangerlight({ content: "dangerlight", duration: 0 })
                Message.warninglight({ content: "warninglight", duration: 0 }) 
            }
            const wrapper = mount(<Button onClick={showMessage}>测试api</Button>);
            wrapper.find('button').simulate('click');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-successlight`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('success');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-infolight`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('info');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-warninglight`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('warning');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-dangerlight`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('error');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-loading`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('loading');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-infolight`)[1].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('infolight');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-successlight`)[1].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('successlight');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-dangerlight`)[1].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('dangerlight');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-warninglight`)[1].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('warninglight');
            wrapper.unmount()
        });
        // (message) 新增 wrapperStyle 和 innerStyle 代替style(style保留 未删除)
        it('<test prop:: style>,<test prop:: innerStyle>,<test prop:: wrapperStyle>, test', () => {
            const onClick = function() {
                Message.destroy();
                Message.create({content: '单据', color: "success", duration: "5000", 
                                style: {width: '100%', transform: 'none'},
                                innerStyle: {color: 'yellow'},
                                wrapperStyle: {border: '1px solid red'}
                            });
            };
            const wrapper = mount(<Button onClick={onClick} />);
            wrapper.find('button').simulate('click');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-successlight`)[0].getAttribute('style')).toEqual("width: 100%; transform: none; color: yellow;");
            expect(document.getElementsByClassName(`${prefixMessage}`)[0].getAttribute('style')).toEqual("top: 180px; left: 50%; transform: none; max-height: calc( 100% - 180px ); overflow: auto; width: 100%; border: 1px solid red;");
            wrapper.unmount()
        });
        it('promise test', async() => {
            let temp = 'a';
            const onClick = () => {
                Message.destroy();
                Message.create({content: '单据提交成功。', fieldid: "fieldid-id", duration: 2, color: 'dark'})
                    .then(() => Message.destroy())
                    .then(() => temp = 'b')
            };
            const wrapper = mount(<Button onClick={onClick}/>);
            wrapper.find('button').simulate('click');
            expect(temp).toBe('a');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-dark`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('单据提交成功。')
            // await sleep(2000);
            // expect(document.getElementsByClassName(`${prefixMessage}-notice-dark`)[0]).toEqual(undefined);
            // expect(temp).toBe('b');
            wrapper.unmount()
        });
        it('maxCount test, <test prop:: maxCount>',async () => {
            const showMessage = () => {
                Message.config({ maxCount: 3, bottom: 400});
                Message.success({ content: "success", duration: 0, position: 'bottomLeft'});
                Message.info({ content: "info", duration: 0 });
                Message.warning({ content: "warning", duration: 0 });
                Message.error({ content: "error", duration: 0 });
                Message.loading({ content: "loading", duration: 0 });
            }
            const wrapper = mount(<Button onClick={showMessage}/>);
            wrapper.find('button').simulate('click');
            await sleep(100)
            expect(document.getElementsByClassName(`${prefixMessage}-notice-successlight`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('success');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-infolight`)[0]).toEqual(undefined);
            expect(document.getElementsByClassName(`${prefixMessage}-notice-warninglight`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('warning');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-dangerlight`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('error');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-loading`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].textContent).toEqual('loading');
            wrapper.unmount()
        });
        it('key test, <test prop:: key>', async() => {
            const onClick = function() {
                Message.destroy();
                Message.create({content: '单据提交成功1。', color: "light", key: 'aaa', duration: 5});
                Message.create({content: '单据提交成功2。', color: "light", key: 'bbb', duration: 5});
                Message.create({content: '单据提交成功3。', color: "light", duration: 5});
            };
            const onClick2 = function() {
                Message.destroy('bbb');
            };
            const onClick3 = function() {
                Message.destroy();
            };
            const wrapper = mount(
                <div>
                    <Button onClick={onClick}/>
                    <Button onClick={onClick2}/>
                    <Button onClick={onClick3}/>
                </div>
            );
            wrapper.find('button').at(0).simulate('click');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-light`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('单据提交成功1。');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-light`)[1].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('单据提交成功2。');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-light`)[2].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('单据提交成功3。');
            wrapper.find('button').at(1).simulate('click');
            await sleep(1000)
            expect(document.getElementsByClassName(`${prefixMessage}-notice-light`)[0].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('单据提交成功1。');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-light`)[1].getElementsByClassName(`${prefixMessage}-notice-description-content`)[0].innerHTML).toEqual('单据提交成功3。');
            wrapper.find('button').at(2).simulate('click');
            expect(document.getElementsByClassName(`${prefixMessage}-notice-light`)[0]).toEqual(undefined);
        })
    })
// 测试config 默认
describe('config, <test prop:: top>', () => {
    it(`@fieldid,"***_alert_info"`, () => {
        const onClick = function() {
            Message.destroy();
            Message.config({
                // clsPrefix: "aaa",
                // defaultBottom: "300px",
                // bottom: "300px",
                // width: "300px",
                top: 400,
                duration: 300,
                clsPrefix: 'aaa-message',
                width: 400
            });
            Message.create({content: '单据提交成功。', fieldid: "fieldid-id", duration: "5"});
        };
        const wrapper = mount(<Button onClick={onClick} />);
        wrapper.find('button').simulate('click');
        expect(document.getElementsByClassName(`aaa-message`)[0].getAttribute('style')).toContain("top: 400px;");
    })
})