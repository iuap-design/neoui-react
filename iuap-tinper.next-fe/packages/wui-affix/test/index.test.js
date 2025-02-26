/** Affix.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import Button from "../../wui-button/src";
import { prefix } from '../../wui-core/src';
import Affix from '../src/index';
import {fireEvent, render} from '@testing-library/react';


var newDiv = document.createElement("div");
newDiv.innerHTML = `
  <div id="target">
    <div id="container">
    </div>
  </div>
`;
document.body.appendChild(newDiv);

beforeEach(() => {
    var target = document.querySelector("#target");
    var container = document.querySelector("#container");
    target.style.overflowY = "scroll";
    target.top = 0;
    target.bottom = 100;
    container.top = 0;
    container.bottom = 500;
    var top = 0, bottom = 0;
    target.onscroll = function() {
        container.top -= 100;
        container.bottom -= 100;
        top -= 100;
        bottom -= 100
    };
    const myMock = jest.spyOn(
        Element.prototype,
        'getBoundingClientRect',
    );

    myMock.mockImplementation(function() {
        return {
            top: this.top ?? top,
            bottom: this.bottom ?? bottom,
        }
    });
})

describe('component: Affix', () => {
    it('onChange should be called,<test prop:: onChange>', function() {
        const Change = jest.fn();
        let affix = mount(
            <Affix container={container} target={() => {
                return target
            }} onChange={Change}>
                <Button colors="primary"></Button>
            </Affix>
        );
        // target.dispatchEvent(new Event('scroll'));
        fireEvent(target, new Event('scroll'))
        expect(Change).toHaveBeenCalled();
        // expect(affix.instance().state.affixed).toEqual(true);
        expect(affix.find(`.${prefix}-affix-content`).props().style.position).toEqual('fixed');
    })

    it('onTargetChange should be called , <test prop:: onTargetChange>', function() {
        const TargetChange = jest.fn();
        let affix = mount(
            <Affix container={container} target={() => {
                return target
            }} onTargetChange={TargetChange}>
            </Affix>
        );
        // target.dispatchEvent(new Event('scroll'));
        fireEvent(target, new Event('scroll'))
        expect(TargetChange).toHaveBeenCalled();
    })

    it('zIndex should be set , <test prop:: zIndex>', function() {
        let affix = mount(
            <Affix container={container} target={() => {
                return target
            }} zIndex={2000}>
                <Button colors="primary"></Button>
            </Affix>
        );
        // target.dispatchEvent(new Event('scroll'));
        fireEvent(target, new Event('scroll'))
        expect(affix.find(`.${prefix}-affix-content`).props().style['z-index']).toEqual("2000");
    })

    it('container should be set , <test prop:: container>', function() {
        let {container} = render(
            <div id="set-container">
                <Affix container={document.querySelector("#set-container")}>
                    <Button colors="primary">container</Button>
                </Affix>
            </div>
        );
        expect(container.querySelector(`.${prefix}-affix-container`).parentElement).toEqual(document.querySelector("#set-container"));
    })

    it('target should be set , <test prop:: target>', function() {
        let affix = mount(
            <Affix target={() => {
                return document.querySelector('#target')
            }}>
                <Button colors="primary">target</Button>
            </Affix>
        );
        expect(affix.find(`.${prefix}-affix-content`).props().target).toEqual(undefined);
    })

    it('getPopupContainer should be set , <test prop:: getPopupContainer>', function() {
        let {container} = render(
            <div id="set-container">
                <Affix getPopupContainer={document.querySelector("#set-container")}>
                    <Button colors="primary">container</Button>
                </Affix>
            </div>
        );
        expect(container.querySelector(`.${prefix}-affix-container`).parentElement).toEqual(document.querySelector("#set-container"));
        // affix.setProps({getPopupContainer: document.querySelector('#target')})
        // expect(container.querySelector(`.${prefix}-affix-container`).parentElement).toEqual(document.querySelector("#target"));
        // affix.unmount()
    })

    it('offsetTop should be 150 , <test prop:: offsetTop>', function() {
        let affix = mount(
            <Affix container={container} target={() => {
                return target
            }} offsetTop={-150}>
                <Button colors="primary">150px to affix top</Button>
            </Affix>
        );
        // expect(affix.find(`.${prefix}-affix-content`).props().style.top).toBe('-150px');
        // target.dispatchEvent(new Event('scroll'));// 滚动100,top=-100>offsetTop
        // fireEvent(target, new Event('scroll')) 
        // target.dispatchEvent(new Event('scroll'));// 再滚动100,top=-200<offsetTop,affixed状态改变为true

        fireEvent(target, new Event('scroll')) // 滚动100,top=-100>offsetTop
        expect(affix.find(`.${prefix}-affix-content`).props().style).toEqual(undefined);
        fireEvent(target, new Event('scroll')) // 再滚动100,top=-200<offsetTop,affixed状态改变为true
        expect(affix.find(`.${prefix}-affix-content`).props().style.top).toBe('-150px');
        expect(affix.find(`.${prefix}-affix-content`).props().style.position).toEqual('fixed');
    })

    it('offsetBottom should be 150 , <test prop:: offsetBottom>', function() {
        let affix = mount(
            <Affix offsetBottom={150}>
                <Button colors="primary">150px to affix top</Button>
            </Affix>
        );
        expect(affix.find(`.${prefix}-affix-content`).props().style).toBe(undefined);
    })
    it('offsetBottom should be 0 , <test prop:: offsetBottom>', function() {
        let affix = mount(
            <Affix offsetBottom={0} container={container} target={() => { return target }}>
                <Button colors="primary">0px to affix bottom</Button>
            </Affix>
        );
        // target.dispatchEvent(new Event('scroll'));// 滚动之后，计算定位
        fireEvent(target, new Event('scroll'))
        expect(affix.find(`.${prefix}-affix-content`).props().style.bottom).toBe('0px');
        expect(affix.find(`.${prefix}-affix-content`).props().style.position).toEqual('fixed');
    })

    it('offestTop should be 150 , <test prop:: initCalc> <test prop:: childrenRef>', function() {
        let affix = mount(
            <Affix offsetTop={150} initCalc>
                <Button colors="primary">150px to affix top</Button>
            </Affix>
        );
        expect(affix.find(`.${prefix}-affix-content`).props().style.top).toBe('150px');
    })

    it('offestTop should be 150 , <test prop:: horizontal>', function() {
        let affix = mount(
            <Affix offsetTop={150} initCalc horizontal>
                <Button colors="primary">150px to affix top</Button>
            </Affix>
        );
        expect(affix.find(`.${prefix}-affix-content`).props().style.top).toBe('150px');
    })

    it('offestTop should be 150 , <test prop:: canHidden>', function() {
        let affix = mount(
            <Affix offsetTop={150} initCalc canHidden>
                <Button colors="primary">150px to affix top</Button>
            </Affix>
        );
        expect(affix.find(`.${prefix}-affix-content`).props().style.top).toBe('0px');
    })
});


