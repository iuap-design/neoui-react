/**TimelineItem.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import Timeline from '../src/index';
import {prefix} from '../../wui-core/src/updatePrefix'
const prefixTimeline = `${prefix}-timeline`

describe('Timeline', () => {
    ['0', '1'].forEach((item) => {
        it(`@fieldid,"***_timeline_${item}", <test prop:: fieldid> <test prop:: timelineFieldId>`, () => {
            const wrapper = mount(<Timeline >
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            </Timeline>);
            expect(wrapper.find(`.${prefixTimeline}`).find(`.${prefixTimeline}-item`).at(item).prop('fieldid')).toEqual(undefined);
            wrapper.setProps({ fieldid: 'fieldid-id' });
            expect(wrapper.find(`.${prefixTimeline}`).find(`.${prefixTimeline}-item`).at(item).prop('fieldid')).toEqual(`fieldid-id_timeline_${item}`);
        })
    })
    it('Timeline pending, <test prop:: pending>', function() {
        let timeline = mount(
            <Timeline pending={<a>see more</a>}>
                <Timeline.Item>0</Timeline.Item>
                <Timeline.Item>1</Timeline.Item>
            </Timeline>);
        expect(timeline.find(`.${prefixTimeline}-item`).last().hasClass(`${prefixTimeline}-item-pending`)).toEqual(true);
        expect(timeline.find(`.${prefixTimeline}-item`).last().find(`.${prefixTimeline}-item-content`).find('a').text()).toEqual('see more');
    })

    it('Timeline reverse,<test prop:: label>', () => {
        const text = '这是一段描述';
        let timeline = mount(
            <Timeline>
                <Timeline.Item>0</Timeline.Item>
                <Timeline.Item label={text}>1</Timeline.Item>
                <Timeline.Item>2</Timeline.Item>
                <Timeline.Item>3</Timeline.Item>
            </Timeline>);
        expect(timeline.find(`.${prefixTimeline}`).at(0).hasClass(`${prefixTimeline}-label`)).toEqual(true);
        expect(timeline.find(`.${prefixTimeline}`).at(0).find(`.${prefixTimeline}-item-label`).text()).toEqual(text);

    })
})