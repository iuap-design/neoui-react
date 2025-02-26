/** Progress.tsx */
import {mount, shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, attrsTestByLength, testCustomStyle} from "../../../next-ui-library/test/common/index";
import {prefix} from '../../wui-core/src/updatePrefix';
import Progress from '../src/index';
import {render, screen, fireEvent} from "@testing-library/react";
const prefixProgress = `${prefix}-progress`;

describe('Progress', () => {
    attrsTest({
        title: 'component: Progress, <test prop:: successPercent>',
        Component: Progress,
        attrs: {
            percent: '60',
            successPercent: '30',
        },
        selector: `.${prefixProgress}-bg+div`,
        classnames: [`${prefixProgress}-success-bg`]
    })

    attrsTestByLength({
        title: 'component: Progress, <test prop:: steps>',
        Component: Progress,
        attrs: {
            steps: "5"
        },
        selector: `.${prefixProgress}-steps-item`,
        nodeCount: 5,
    })
    testCustomStyle({
        title: 'component: Progress, <test prop:: width>',
        Component: Progress,
        attrs: {
            type: "circle",
            width: 400
        },
        selector: `.${prefixProgress}-inner`,
        verifyStyle: {width: "400px"}
    });
    testCustomStyle({
        title: 'component: Progress, <test prop:: strokeColor>',
        Component: Progress,
        attrs: {
            strokeColor: "yellow"
        },
        selector: `.${prefixProgress}-bg`,
        verifyStyle: {backgroundColor: "yellow"}
    });
    testCustomStyle({
        title: 'component: Progress, <test prop:: trailColor>',
        Component: Progress,
        attrs: {
            type: "circle",
            trailColor: "red"
        },
        selector: '.rc-progress-circle-trail',
        verifyStyle: {stroke: "red"}
    });
    it('Progress should be exist', function() {
        let progress = shallow(<Progress/>);
        expect(progress.hasClass(`${prefixProgress}`)).toEqual(true);
    })

    it('strokeWidth should be 20px, <test prop:: strokeWidth>', function() {
        let progress = mount(<Progress percent={100} strokeWidth={20}/>);
        expect(progress.find(`.${prefixProgress}-bg`).prop("style").height).toEqual("20px");
    })

    it('width should be 30%,<test prop:: percent >', function() {
        let progress = mount(<Progress percent={30}/>);
        expect(progress.find(`.${prefixProgress}-bg`).prop("style").width).toEqual("30%");
    })

    it('strokeLinecap should be square,<test prop:: strokeLinecap >', function() {
        let progress = mount(<Progress strokeLinecap="square" percent={30}/>);
        expect(progress.find(`.${prefixProgress}-bg`).prop("style").borderRadius).toEqual("0");
    })

    it('strokeDashoffset should be -1/2gapDegree,<test prop:: gapDegree>', function() {
        let progress = mount(<Progress type="dashboard" percent={30} gapDegree={180}/>);
        expect(progress.find('.rc-progress-circle-trail').prop("style").strokeDashoffset).toEqual("-90px");
    })

    it('Progress is success,<test prop:: percent >', function() {
        let progress = mount(<Progress percent={100}/>);
        expect(progress.find('i').hasClass("uf-correct-2")).toEqual(true);
    })

    it('circle is success,<test prop:: type >', function() {
        let progress = mount(<Progress type="circle" percent={75}/>);
        expect(progress.find('svg').instance().classList.contains('rc-progress-circle')).toEqual(true);
    })

    it('exception is success,<test prop:: status>', function() {
        let progress = mount(<Progress percent={70} status="exception"/>);
        expect(progress.find('i').hasClass("uf-close-c")).toEqual(true);
    })

    it('small is success,<test prop:: size >', function() {
        let progress = shallow(<Progress percent={30} size="small"/>);
        expect(progress.hasClass(`${prefixProgress}-small`)).toEqual(true);
    })

    it('showInfo should be exist', function() {
        let progress = shallow(<Progress percent={30} size="small"/>);
        expect(progress.hasClass(`${prefixProgress}-show-info`)).toEqual(true);
    })

    it('showInfo should be not exist,<test prop:: showInfo >', function() {
        let progress = shallow(<Progress percent={30} showInfo={false}/>);
        expect(progress.hasClass(`${prefixProgress}-show-info`)).toEqual(false);
    })

    it('status should be active,<test prop:: status>', function() {
        let progress = shallow(<Progress percent={30} status="active"/>);
        expect(progress.hasClass(`${prefixProgress}-status-active`)).toEqual(true);
    })

    it('format should be Done,<test prop:: format >', function() {
        let progress = shallow(<Progress type="circle" percent={100} format={() => 'Done'}/>);
        expect(progress.find('span').prop("title")).toEqual("Done");
    })

});
//新增fieldid测试
describe('component:  Progress, <test prop:: fieldid>', () => {
    it('[contains(@fieldid,"***_progress")]', () => {
        let wrapper = mount(<Progress percent={30}/>);
        expect(wrapper.find(`.${prefixProgress}-bg`).props().fieldid).toBe(undefined);
        wrapper.setProps({fieldid:'test'});
        expect(wrapper.find(`.${prefixProgress}-bg`).props().fieldid).toBe("test_progress");
    });
    it('[contains(@fieldid,"***__progress-circle")]', () => {
        let wrapper = mount(<Progress percent={30} type="circle"/>);
        expect(wrapper.find(`.${prefixProgress}-inner`).at(0).props().fieldid).toBe(undefined);
        wrapper.setProps({fieldid:'test'});
        expect(wrapper.find(`.${prefixProgress}-inner`).at(0).props().fieldid).toBe("test_progress-circle");
    });
    it('[contains(@fieldid,"***_progress","***_progress_")]', () => {
        let wrapper = mount(<Progress percent={30} steps={5}/>);
        expect(wrapper.find(`.${prefixProgress}-steps-outer`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefixProgress}-steps-item`).at(0).props().fieldid).toBe(undefined);
        wrapper.setProps({fieldid:'test'});
        expect(wrapper.find(`.${prefixProgress}-steps-outer`).at(0).props().fieldid).toBe("test_progress");
        expect(wrapper.find(`.${prefixProgress}-steps-item`).at(0).props().fieldid).toBe("test_progress_0");
    });
});

describe('4.4.4 New Api Test', () => {
    it('component: Progress, <test prop:: strokeColor>', () => {
        // strokeColor设置进度条的色彩，当有 steps 时支持传入一个数组
        let wrapper = mount(<Progress percent={80} steps={5} strokeColor={['grey', 'yellow', 'red']}/>);
        //此时前三个step是我们设置的颜色，第四个是原本的active颜色，第五个是非active的颜色
        ["grey", "yellow", "red", "", "rgb(243, 243, 243)"].forEach((value,index)=>{
            expect(wrapper.find(`.${prefix}-progress-steps-item`).at(index).instance().style.backgroundColor).toBe(value);
        })
    });
    it('component: Progress, <test prop:: strokeColor>', () => {
        // 测试在不是step类型时(line和circle)传入数组类型strokeColor
        let wrapper = mount(<Progress percent={80} strokeColor={['grey', 'yellow', 'red']}/>);
        expect(wrapper.find(`.${prefixProgress}-bg`).instance().style.backgroundColor).toBe('grey');
        wrapper.setProps({type: 'circle'})
        expect(wrapper.find('.rc-progress-circle-path').instance().style.stroke).toBe('grey');
    });
    // xit('component: Progress, <test prop:: strokeColor>', () => {
    //     // 测试Line传入object时为渐变颜色
    //     let wrapper = mount(<Progress percent={80} test strokeColor={{
    //         '0%': '#108ee9',
    //         '100%': '#87d068',
    //     }} />);
    //     expect(wrapper.find(`.${prefixProgress}-bg`).props().style.backgroundImage).toBe('linear-gradient(to right, #108ee9 0%, #87d068 100%)');
    //     // 测试输入from to 格式的object
    //     wrapper.setProps({strokeColor: {
    //         from: '#108ee9',
    //         to: '#87d068',
    //     }})
    //     expect(wrapper.find(`.${prefixProgress}-bg`).props().style.backgroundImage).toBe('linear-gradient(to right, #108ee9, #87d068)');
    //     // 测试输入错误格式的object
    //     wrapper.setProps({strokeColor: {
    //         start: '#108ee9',
    //         end: '#87d068',
    //     }})
    //     expect(wrapper.find(`.${prefixProgress}-bg`).props().style.backgroundImage).toBe('linear-gradient(to right, [object Object])');
    // });
    it('component: Progress, <test prop:: strokeColor>', () => {
        // 测试Circle传入object时为渐变颜色
        let wrapper = mount(<Progress percent={100} type='circle' strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
        }} />);
        expect(wrapper.find('linearGradient').find('stop').prop('stop-color')).toBe('#108ee9');
        expect(wrapper.find('linearGradient').find('stop').at(1).prop('stop-color')).toBe('#87d068');
    });
})
describe('代码覆盖率提高至100%', () => {
    it('component: Progress, <test prop:: percent>', () => {
        // 测试percent大于100
        let wrapper = mount(<Progress percent={150} />);
        expect(wrapper.find(`.${prefixProgress}-bg`).prop("style").width).toEqual("100%");
        expect(wrapper.find(`.${prefixProgress}-text i`).hasClass("uf-correct-2")).toEqual(true);
        wrapper.setProps({type: 'circle'})
        expect(wrapper.find(`.${prefixProgress}-text i`).hasClass("uf-correct-2")).toEqual(true);
    });
    it('component: Progress, <test prop:: successPercent>', () => {
        // 测试Circle传入successPercent（已完成的分段百分比）的场景
        let wrapper = mount(<Progress type='circle' percent={80} successPercent={60} />);
        expect(wrapper.find('.rc-progress-circle-path')).toHaveLength(2); //
        let Path1StrokeDasharray = wrapper.find('.rc-progress-circle-path').at(0).instance().style.strokeDasharray.split(' ');
        let Path2StrokeDasharray = wrapper.find('.rc-progress-circle-path').at(1).instance().style.strokeDasharray.split(' ');
        expect(parseFloat(Path1StrokeDasharray[0])/parseFloat(Path1StrokeDasharray[1])).toBe(0.2); //80%-60% 超出部分
        expect(parseFloat(Path2StrokeDasharray[0])/parseFloat(Path2StrokeDasharray[1])).toBe(0.6); //60% successPercent
    });
    // 测试Progress.Bar
    const Bar = Progress.Bar;
    it('component: Progress, <test prop:: now>, <test prop:: min>, <test prop:: max>, <test prop:: label>, <test prop:: active>', () => {
        let wrapper = mount(<Bar min={10} max={90} now={30} srOnly label={'test-bar'} />);
        expect(wrapper.exists(`.${prefix}-bar`)).toBe(true)
        expect(wrapper.find(`.${prefix}-bar-bar`).instance().style.width).toBe('25%'); // (now - min) / (max - min)
        wrapper.setProps({active: true});
        expect(wrapper.find(`.${prefix}-bar-bar`).hasClass('active wui-bar-bar-striped')).toBe(true);
        expect(wrapper.find(`.${prefixProgress}-label`).text()).toBe('test-bar');
        wrapper.setProps({isChild: true});
        expect(wrapper.exists(`.${prefix}-bar`)).toBe(false) // isChild为true时，没有外层wui-bar
    });
    it('component: Progress, <test prop:: colors>,', () => {
        let wrapper = mount(<Bar><Bar now={10} colors="info"/><Bar now={20} colors="success"/></Bar>);
        expect(wrapper.find(`.${prefix}-bar`).find(`.${prefix}-bar-bar`)).toHaveLength(2);
        expect(wrapper.find(`.${prefix}-bar-bar`).at(0).instance().style.width).toBe("10%")
        expect(wrapper.find(`.${prefix}-bar-bar`).at(0).hasClass(`${prefix}-bar-bar-info`)).toBe(true)
        expect(wrapper.find(`.${prefix}-bar-bar`).at(1).instance().style.width).toBe("20%")
        expect(wrapper.find(`.${prefix}-bar-bar`).at(1).hasClass(`${prefix}-bar-bar-success`)).toBe(true)
    });
    it('component: Progress, <test prop:: gapPosition>,', () => {
        // 圆形进度条缺口位置
        let wrapper = mount(
            <div className='contaiber'>
                <Progress type="circle" percent={50} gapPosition={'top'}/>
                <Progress type="circle" percent={50} gapPosition={'bottom'}/>
                <Progress type="circle" percent={50} gapPosition={'right'}/>
                <Progress type="circle" percent={50} gapPosition={'left'}/>
            </div>
        );
        // 无法从类名或者样式上断言，只有svg绘制的path不同，所以通过Snapshot来比对不同方向dom差异，另外在cypress测试视觉效果
        expect(wrapper.find(`.${prefixProgress}-text`).text()).toBe("50%");
        expect(wrapper.instance()).toMatchSnapshot();
    });
})


