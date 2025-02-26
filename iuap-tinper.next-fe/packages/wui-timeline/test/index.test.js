/**Timeline.tsx */
import {mount, shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import Timeline from '../src/index';
import Icon from '../../wui-icon/src';
import {prefix} from '../../wui-core/src/updatePrefix'
const prefixTimeline = `${prefix}-timeline`

describe('Enzyme Shallow', function() {
    it('Timeline should be exist', function() {
        let timeline = shallow(<Timeline/>);
        expect(timeline.hasClass(`${prefixTimeline}`)).toEqual(true);
    })
})
describe('Timeline styles', function() {
    ['danger', 'info', 'news', 'waring', 'sucess'].forEach( item => {
        it('color, , <test prop:: color>', () => {
            let timeline = mount(
                <Timeline>
                    <Timeline.Item color={item}>Create a services site 2015-09-01</Timeline.Item>
                </Timeline>);
            expect(timeline.find(`.${prefixTimeline}-item-head`).hasClass(`${prefixTimeline}-item-head-${item}`)).toEqual(true);
        }) 
    })
    it('Timeline pending, <test prop:: pending>', function() {
        let timeline = mount(
            <Timeline>
                <Timeline.Item>0</Timeline.Item>
                <Timeline.Item pending={true}>1</Timeline.Item>
                <Timeline.Item>2</Timeline.Item>
                <Timeline.Item>3</Timeline.Item>
            </Timeline>);
        expect(timeline.find(`.${prefixTimeline}-item`).at(1).hasClass(`${prefixTimeline}-item-pending`)).toEqual(true);
        expect(timeline.find(`.${prefixTimeline}-item`).at(3).hasClass(`${prefixTimeline}-item-last`)).toEqual(true);
    })
    it('dot, <test prop:: dot>', function() {
        let timeline = mount(
            <Timeline>
                <Timeline.Item>0</Timeline.Item>
                <Timeline.Item dot={<Icon type="uf-time-c-o"/>}>1</Timeline.Item>
                <Timeline.Item dot="111">2</Timeline.Item>
            </Timeline>);
        expect(timeline.find(`.${prefixTimeline}-item-head`).at(0).text()).toEqual("");
        expect(timeline.find(`.${prefixTimeline}-item-head`).at(1).find(`.${prefix}-icon`).hasClass(`uf-time-c-o`)).toEqual(true);
        expect(timeline.find(`.${prefixTimeline}-item-head`).at(2).text()).toEqual('111');
    })
    it('Timeline pendingDot, <test prop:: pendingDot>', function() {
        let timeline = mount(
            <Timeline pending pendingDot={<Icon type="uf-time-c-o"/>}>
                <Timeline.Item>0</Timeline.Item>
                <Timeline.Item>1</Timeline.Item>
                <Timeline.Item>2</Timeline.Item>
                <Timeline.Item>3</Timeline.Item>
            </Timeline>);
        expect(timeline.find(`.${prefixTimeline}-item-head`).at(4).find(`.${prefix}-icon`).hasClass(`uf-time-c-o`)).toEqual(true);
    })

    it('Timeline reverse,<test prop:: reverse>', () => {
        let timeline = mount(
            <Timeline reverse>
                <Timeline.Item>0</Timeline.Item>
                <Timeline.Item>1</Timeline.Item>
                <Timeline.Item>2</Timeline.Item>
                <Timeline.Item>3</Timeline.Item>
            </Timeline>);
        expect(timeline.find(`.${prefixTimeline}`).hasClass(`${prefixTimeline}-reverse`)).toEqual(true);
    })
    
    it('Timeline reverse,<test prop:: labelWidth>', () => {
        let timeline = mount(
            <Timeline labelWidth={200}>
                <Timeline.Item>0</Timeline.Item>
                <Timeline.Item label='这是一段很长的描述...'>1</Timeline.Item>
                <Timeline.Item>2</Timeline.Item>
                <Timeline.Item>3</Timeline.Item>
            </Timeline>);
        let widthStr = '200px'
        expect(timeline.find(`.${prefixTimeline}`).at(0).hasClass(`${prefixTimeline}-label`)).toEqual(true);
        expect(timeline.find(`.${prefixTimeline}`).at(0).props().style['margin-left']).toEqual(widthStr);
        expect(timeline.find(`.${prefixTimeline}-item-label`).at(0).props().style.width).toEqual(widthStr);
        timeline.setProps({labelWidth: 200, mode: 'right'});
        expect(timeline.find(`.${prefixTimeline}`).at(0).props().style['margin-right']).toEqual(widthStr);
        expect(timeline.find(`.${prefixTimeline}-item-label`).at(0).props().style.width).toEqual(widthStr);
    })

    it('Timeline label auto width,<test prop:: label auto width>', () => {
        let timeline = mount(
            <Timeline mode="left">
                <Timeline.Item>0</Timeline.Item>
                <Timeline.Item label='这是一段很长的描述...'>1</Timeline.Item>
                <Timeline.Item>2</Timeline.Item>
                <Timeline.Item>3</Timeline.Item>
            </Timeline>);
        expect(timeline.find(`.${prefixTimeline}`).at(0).hasClass(`${prefixTimeline}-label`)).toEqual(true);
        const labelWidth = timeline.find(`.${prefixTimeline}`).at(0).props().style["margin-left"];
        expect(timeline.find(`.${prefixTimeline}-item-label`).at(0).props().style.width).toEqual(labelWidth);
        timeline.setProps({mode: 'right'});
        expect(timeline.find(`.${prefixTimeline}`).at(0).props().style['margin-right']).toEqual(labelWidth);
        expect(timeline.find(`.${prefixTimeline}-item-label`).at(0).props().style.width).toEqual(labelWidth);
    })
})

describe('TimelineGroup', function() {
    (['left', 'right', 'alternate']).forEach(item => {
        it('TimelineGroup,<test prop:: mode>', () => {
            let timeline = mount(
                <Timeline mode={item}>
                    <Timeline.Group>
                        <Timeline.Item color={'sucess'} label={'06:00 - 12:00'}>早班</Timeline.Item>
                        <Timeline.Item color={'info'} label={'06:00 - 12:00'}>早班</Timeline.Item>
                    </Timeline.Group>
                    <Timeline.Group>
                        <Timeline.Item color={'sucess'} label={'06:00 - 12:00'}>早班</Timeline.Item>
                        <Timeline.Item color={'info'} label={'06:00 - 12:00'}>早班</Timeline.Item>
                    </Timeline.Group>
                </Timeline>);
            expect(timeline.find(`.${prefixTimeline}`).hasClass(`${prefixTimeline}-${item}`)).toEqual(true);
            expect(timeline.find(`.${prefixTimeline}-item-group`).exists()).toEqual(true);
        }) 
    })

    it('TimelineGroup,<test prop:: reverse>', () => {
        let timeline = mount(
            <Timeline reverse fieldid='TimelineGroup'>
                <Timeline.Group>
                    <Timeline.Item color={'sucess'} label={'06:00 - 12:00'}>早班</Timeline.Item>
                    <Timeline.Item color={'info'} label={'06:00 - 12:00'}>早班</Timeline.Item>
                </Timeline.Group>
                <Timeline.Group>
                    <Timeline.Item color={'sucess'} label={'06:00 - 12:00'}>早班</Timeline.Item>
                    <Timeline.Item color={'info'} label={'06:00 - 12:00'}>早班</Timeline.Item>
                </Timeline.Group>
            </Timeline>);
        expect(timeline.find(`.${prefixTimeline}`).hasClass(`${prefixTimeline}-reverse`)).toEqual(true);
    })
})