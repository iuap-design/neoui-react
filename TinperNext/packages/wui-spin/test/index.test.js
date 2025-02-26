/** Loading.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {mountTest} from "../../../next-ui-library/test/common/index"
import Spin from '../src/index';
import {prefix} from '../../wui-core/src/updatePrefix';
import { sleep } from '../../../next-ui-library/test/common/utils';

const prefixSpin = `${prefix}-spin`;

var newDiv = document.createElement("div");
newDiv.innerHTML = `<div id="container"></div><div id="target" class="target"></div>`;
document.body.appendChild(newDiv);

describe('Spin', function() {
    mountTest(Spin)
    it('should be controlled by spinning <test prop:: spinning><test prop:: show>', () => {
        const wrapper = mount(<Spin spinning={false}/>);
        // expect(wrapper.instance().state.spinning).toBe(false);
        expect(wrapper.find(`.${prefixSpin}`).exists()).toBe(false);
        wrapper.setProps({spinning: true});
        // expect(wrapper.instance().state.spinning).toBe(true);
        expect(wrapper.find(`.${prefixSpin}`).exists()).toBe(true);
    });

    it('should render 0 <test prop:: antd>', () => {
        const wrapper = mount(<Spin loadingType="antd">{0}</Spin>);
        expect(wrapper.find(`.${prefixSpin}-container`).at(0).text()).toBe('0');
    });

    it("should render custom indicator when it's set <test prop:: indicator><test prop:: loadingType>", () => {
        let imgsrc = "http://design.yonyoucloud.com/static/bee.tinper.org-demo/Spin.gif";
        const beeIcon = <img src={imgsrc} style={{width: '50px'}}/>
        const wrapper = mount(<Spin getPopupContainer={this} spinning={true} indicator={beeIcon} loadingType="custom" tip="loading"/>);
        expect(wrapper.find(`.${prefixSpin}-desc`).text()).toEqual('loading');
    });
    it("should render tip <test prop:: tip>", () => {
        const wrapper = mount(<Spin getPopupContainer={this} spinning={true} tip="loading"/>);
        expect(wrapper.find(`.${prefixSpin}-desc`).text()).toEqual('loading');
    });
    it("should render showBackDrop <test prop:: showBackDrop>", () => {
        const wrapper = mount(<Spin getPopupContainer={this} spinning={true} showBackDrop={false}/>);
        // expect(wrapper.find(`.${prefixSpin}-desc`).text()).toEqual('loading');
    });
});

describe('verifiy size <test prop:: size>', function() {
    it('Spin should be lg', function() {
        let loading = mount(<Spin spinning size="lg"/>);
        expect(loading.find(`.${prefixSpin}-default-lg`).exists()).toEqual(true);

    });
    it('Spin should be sm', function() {
        let loading = mount(<Spin spinning size="sm"/>);
        expect(loading.find(`.${prefixSpin}-default-sm`).exists()).toEqual(true);
    });

});

describe('verifiy ladingType <test prop:: ladingType>', function() {
    it('Spin should be rotate', function() {
        let loading = mount(<Spin spinning loadingType="rotate"/>);
        expect(loading.find(`.${prefixSpin}-rotate`).exists()).toEqual(true);
    });
    it('Spin should be line', function() {
        let loading = mount(<Spin spinning loadingType="line"/>);
        expect(loading.find(`.${prefixSpin}-line`).exists()).toEqual(true);
    });
    it('Spin should be cricle', function() {
        let loading = mount(<Spin spinning loadingType="cricle"/>);
        expect(loading.find(`.${prefixSpin}-cricle`).exists()).toEqual(true);
    });
});

describe('spin delay <test prop:: delay>', function() {
    it('Spin: delay 200', () => {
        let loading = mount(<Spin spinning delay={200}/>);
        expect(loading.find(`.${prefixSpin}`).exists()).toEqual(false);
    });
});

describe('spin getPopupContainer <test prop:: getPopupContainer> <test prop:: container>', function() {
    it('Spin: getPopupContainer () => container', function() {
        let loading = mount(<Spin spinning getPopupContainer={() => document.querySelector('#container')}/>);
        expect(loading.find(`.${prefixSpin}-backdrop`).exists()).toEqual(true);
        expect(document.querySelector(`.${prefixSpin}-backdrop`).parentElement.id).toEqual('container');
        expect(document.querySelector(`.${prefixSpin}-container`)).toEqual(null);
        loading.unmount();
    });

    it('Spin: getPopupContainer () => target add className', function() {
        let loading = mount(<Spin spinning getPopupContainer={() => document.querySelector('#target')}/>);
        expect(loading.find(`.${prefixSpin}-backdrop`).exists()).toEqual(true);
        expect(document.querySelector(`.${prefixSpin}-backdrop`).parentElement.id).toEqual('target');
        expect(document.querySelector(`.${prefixSpin}-container`).nodeName).toEqual('DIV');
        loading.unmount();
    });

    it('Spin: getPopupContainer string', function() {
        let loading = mount(<Spin spinning getPopupContainer={document.querySelector('#target')}/>);
        expect(loading.find(`.${prefixSpin}-backdrop`).exists()).toEqual(true);
        expect(document.querySelector(`.${prefixSpin}-backdrop`).parentElement.id).toEqual('target');
        expect(document.querySelector(`.${prefixSpin}-container`).nodeName).toEqual('DIV');
        loading.unmount();
    });
});

describe('spin <test prop:: showBackDrop>', function() {
    it('Spin: not exist showBackDrop', () => {
        let loading = mount(<Spin spinning showBackDrop={false} />);
        expect(loading.find(`.${prefixSpin}-backdrop`).exists()).toEqual(false);
    });
});

describe('spin <test prop:: backDropClassName>', function() {
    it('Spin: backDropClassName', () => {
        const cls = 'back-spin'
        let loading = mount(<Spin spinning backDropClassName={cls} />);
        expect(loading.find(`.${prefixSpin}-backdrop`).hasClass(cls)).toEqual(true);
        loading.setProps({spinning: true, showBackDrop: false, backDropClassName: cls})
        expect(loading.find(`.${cls}`).exists()).toEqual(false);
    });
});

describe('spin <test prop:: fullScreen>', function() {
    it('Spin: fullScreen', () => {
        let loading = mount(<Spin spinning fullScreen />);
        expect(loading.find(`.${prefixSpin}-full-screen`).exists()).toEqual(true);
        loading.setProps({spinning: true, showBackDrop: false, fullScreen: true})
        expect(loading.find(`.${prefixSpin}-full-screen`).exists()).toEqual(false);
    });
});

describe('spin <test prop:: color>', function() {
    it('Spin: color', () => {
        let loading = mount(<Spin spinning color="success" />);
        expect(loading.find(`.${prefixSpin}-default-success`).exists()).toEqual(true);
        loading.setProps({spinning: true, color: 'warning'})
        expect(loading.find(`.${prefixSpin}-default-warning`).exists()).toEqual(true);
    });
});

describe('spin <test prop:: wrapperClassName>', function() {
    it('Spin: wrapperClassName', () => {
        const cls = 'root-spin'
        let loading = mount(<Spin spinning wrapperClassName={cls} />);
        expect(loading.find(`.${cls}`).exists()).toEqual(true);
    });
    it('Spin: antd wrapperClassName', () => {
        const cls = 'root-spin'
        let loading = mount(<Spin spinning antd wrapperClassName={cls} />);
        expect(loading.find(`.${cls}`).exists()).toEqual(true);
    });
    it('Spin: not effective props clsLoadBack <test prop:: clsLoadBack>', () => {
    });
});

describe('spin <test prop:: locale>', function() {
    const localeMap = {
        'zh-cn': {
            'loading': '加载中...',
        },
        'en-us': {
            'loading': 'Loading...',
        },
        'zh-tw': {
            'loading': '加載中...',
        },
        'vi-vn': {
            'loading': 'Đang tải...',
        },
    }

    for(let k in localeMap) {
        it('Spin: locale', () => {
            const tip = localeMap[k].loading
            let loading = mount(<Spin spinning locale={k} />);
            expect(loading.find(`.${prefixSpin}-desc`).text()).toEqual(tip);
        });
    }
});

