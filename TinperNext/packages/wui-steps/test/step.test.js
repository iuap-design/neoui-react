/** Step.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {prefix} from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src';

import Steps from '../src/index';

const prefixSteps = `${prefix}-steps`;
const {Step} = Steps;

describe('step test', () => {
    it('step should have classname be class-of-step, <test prop:: className>, <test prop:: subTitle>', () => {
        const wrapper = mount(<Steps>
                                <Step className="class-of-item" subTitle="subtitle"/>
                             </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item`).hasClass('class-of-item')).toEqual(true);
        expect(wrapper.find(`.${prefixSteps}-item`).find(`.${prefixSteps}-item-subtitle`).text()).toBe('subtitle');
    })
    it('step should have this style, <test prop:: style>', () => {
        const wrapper = mount(
            <Steps>
                <Step style={{margin: 100}}/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item`).props().style.margin).toEqual('100px');
    })
    it('step should have this status, <test prop:: status>', () => {
        ['wait', 'process', 'finish', 'error'].forEach(item => {
            const wrapper = mount(
                <Steps>
                    <Step status={item} />
                </Steps>);
            expect(wrapper.find(`.${prefixSteps}-item`).hasClass(`${prefixSteps}-item-${item}`)).toEqual(true);
            wrapper.unmount();
        })
    })
    it('step should have this icon, <test prop:: icon>', () => {
        let wrapper;
        wrapper = mount(<Steps><Step /></Steps>);
        expect(wrapper.find(`.${prefix}-icon`).hasClass('uf-jinhangzhong')).toEqual(true);
        wrapper.unmount();

        wrapper = mount(
            <Steps>
                <Step icon={<Icon type="uf-users-o"/>}/>
            </Steps>);
        expect(wrapper.find(`.${prefix}-icon`).hasClass('uf-users-o')).toEqual(true);
    })
    it('iconPrefix, <test prop:: iconPrefix>', () => {
        const wrapper = mount(
            <Steps>
                <Step />
                <Step iconPrefix="prefix"/>
                <Step icon={<Icon type="uf-users-o"/>} iconPrefix="prefix"/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-icon`).at(0).hasClass('prefixicon')).toEqual(false);
        expect(wrapper.find(`.${prefixSteps}-icon`).at(1).hasClass('prefixicon')).toEqual(true);
        expect(wrapper.find(`.${prefixSteps}-icon`).at(2).hasClass('prefixicon')).toEqual(false);
    })
    it('description and title, <test prop:: description>, <test prop:: title>', () => {
        const wrapper = mount(
            <Steps>
                <Step />
                <Step title="进行中" description="这是一段描述"/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item`).at(0).prop('data-text')).toEqual(undefined);
        expect(wrapper.find(`.${prefixSteps}-item-title`).at(0).prop('title')).toEqual(undefined);
        expect(wrapper.find(`.${prefixSteps}-item`).at(0).exists(`.${prefixSteps}-item-description`)).toEqual(false);
        expect(wrapper.find(`.${prefixSteps}-item`).at(1).prop('data-text')).toEqual('进行中');
        expect(wrapper.find(`.${prefixSteps}-item-title`).at(1).prop('title')).toEqual('进行中');
        expect(wrapper.find(`.${prefixSteps}-item-title`).at(1).text()).toEqual('进行中');
        expect(wrapper.find(`.${prefixSteps}-item-description`).text()).toEqual('这是一段描述');
    })
    it('progressDot, <test prop:: progressDot>', () => {
        const wrapper = mount(
            <Steps>
                <Step />
                <Step progressDot/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-icon`).at(0).exists(`.${prefixSteps}-icon-dot`)).toEqual(false);
        expect(wrapper.find(`.${prefixSteps}-icon`).at(1).exists(`.${prefixSteps}-icon-dot`)).toEqual(true);
    })
    it('tailContent, <test prop:: tailContent>', () => {
        const wrapper = mount(
            <Steps>
                <Step tailContent="tail"/>
                <Step tailContent={<span>tail</span>}/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item-tail`).at(0).text()).toEqual('tail');
        expect(wrapper.find(`.${prefixSteps}-item-tail`).at(1).find('span').text()).toEqual('tail');
    })
    it('icons, <test prop:: icons>', () => {
        const wrapper = mount(
            <Steps>
                <Step status="finish" icons={{finish: <Icon type="uf-dongjie"/>, error: <Icon type="uf-creditcard"/>}} />
                <Step status="finish" icons={{finish: <Icon type="uf-dongjie"/>}} icon={<Icon type="uf-creditcard"/>}/>
            </Steps>);
        expect(wrapper.find(`.${prefix}-icon`).at(0).hasClass('uf-dongjie')).toEqual(true);
        expect(wrapper.find(`.${prefix}-icon`).at(1).hasClass('uf-creditcard')).toEqual(true);
    })
    it('stepIndex, <test prop:: stepIndex>', () => {
        const wrapper = mount(
            <Steps>
                <Step />
                <Step stepIndex={3}/>
                <Step />
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item`).at(0).prop('data-num')).toEqual('0');
        expect(wrapper.find(`.${prefixSteps}-item`).at(1).prop('data-num')).toEqual('3');
        expect(wrapper.find(`.${prefixSteps}-item`).at(2).prop('data-num')).toEqual('2');
    })
    it('active, <test prop:: active>', () => {
        const wrapper = mount(
            <Steps>
                <Step />
                <Step active/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item`).at(0).hasClass(`${prefixSteps}-item-active`)).toEqual(false);
        expect(wrapper.find(`.${prefixSteps}-item`).at(1).hasClass(`${prefixSteps}-item-active`)).toEqual(true);
    })
    it('disabled, <test prop:: disabled>', () => {
        const wrapper = mount(
            <Steps>
                <Step />
                <Step disabled/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item`).at(0).hasClass(`${prefixSteps}-disabled`)).toEqual(false);
        expect(wrapper.find(`.${prefixSteps}-item`).at(1).hasClass(`${prefixSteps}-disabled`)).toEqual(true);
    })
    it('out, <test prop:: out>', () => {
        const wrapper = mount(
            <Steps>
                <Step out/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item`).hasClass(`${prefixSteps}-more-out`)).toEqual(true);
    })
    it('more, <test prop:: more>', () => {
        const wrapper = mount(
            <Steps>
                <Step more/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item`).exists(`.${prefixSteps}-item-line`)).toEqual(true);
    })
    it('type, <test prop:: type>', () => {
        const wrapper = mount(
            <Steps>
                <Step type="default"/>
                <Step type="dot"/>
                <Step type="number"/>
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-icon`).at(0).find('i').hasClass('uf-jinhangzhong')).toEqual(true);
        expect(wrapper.find(`.${prefixSteps}-icon`).at(1).exists(`.${prefixSteps}-icon-dot`)).toEqual(true);
        expect(wrapper.find(`.${prefixSteps}-icon`).at(2).text()).toEqual('3');
    })
    it('special combination, <test prop:: type>, <test prop:: error>, <test prop:: finish>', () => {
        const wrapper = mount(
            <Steps>
                <Step status="finish" />
                <Step status="error" />
                <Step type="arrow" status="finish" />
                <Step type="arrow" status="error" />
            </Steps>);
        expect(wrapper.find(`.${prefixSteps}-item`).at(0).hasClass(`${prefixSteps}-item-finish`)).toEqual(true);
        expect(wrapper.find(`.${prefixSteps}-item`).at(1).hasClass(`${prefixSteps}-item-error`)).toEqual(true);
        expect(wrapper.find(`.${prefixSteps}-item`).at(2).hasClass(`${prefixSteps}-item-finish`)).toEqual(true);
        expect(wrapper.find(`.${prefixSteps}-item`).at(3).hasClass(`${prefixSteps}-item-error`)).toEqual(true);
        expect(wrapper.find(`.${prefix}-icon`).at(0).hasClass('uf-yiwancheng')).toEqual(true);
        expect(wrapper.find(`.${prefix}-icon`).at(1).hasClass('uf-jinhangzhong')).toEqual(true);
        expect(wrapper.find(`.${prefix}-icon`).at(2).hasClass('uf-correct-2')).toEqual(true);
        expect(wrapper.find(`.${prefix}-icon`).at(3).hasClass('uf-exc-t')).toEqual(true);
    })
    it('fieldid and stepFieldId, <test prop:: fieldid>, <test prop:: stepFieldId>', () => {
        let wrapper;
        wrapper = mount(
            <Steps fieldid="fieldid-id">
                <Step />
                <Step />
                <Step fieldid="field"/>
            </Steps>)
        expect(wrapper.find(`.${prefixSteps}-item`).at(0).prop('fieldid')).toEqual(`fieldid-id_steps_icon_0`);
        expect(wrapper.find(`.${prefixSteps}-item`).at(1).prop('fieldid')).toEqual(`fieldid-id_steps_icon_1`);
        expect(wrapper.find(`.${prefixSteps}-item`).at(2).prop('fieldid')).toEqual(`field`);

        wrapper.unmount();

        wrapper = mount(
            <Steps >
                <Step />
                <Step fieldid="field"/>
                <Step stepFieldId="field"/>
            </Steps>)
        expect(wrapper.find(`.${prefixSteps}-item`).at(0).prop('fieldid')).toEqual(undefined);
        expect(wrapper.find(`.${prefixSteps}-item`).at(1).prop('fieldid')).toEqual(`field`);
        expect(wrapper.find(`.${prefixSteps}-item`).at(2).prop('fieldid')).toEqual(`field_steps_icon_2`);
    })
})

describe('step, <test prop:: adjustMarginRight>', () => {
    it(`adjustMarginRight number`, () => {
        const num = 20
        const wrapper = mount(
            <Steps >
                <Steps.Step />
                <Steps.Step adjustMarginRight={num} />
                <Steps.Step />
            </Steps>)
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(1).props().style['margin-right']).toBe(`${num}px`);
    })
})

describe('component: Step, <test prop:: onClick> <test prop:: onStepClick>', () => {
    const description = "这是一段描述";
    const mockEvent = jest.fn();
    const mockEvent1 = jest.fn();
    const mockEvent2 = jest.fn();
    const items = [
        {
            title: '已完成',
            description
        },
        {
            title: '已完成',
            subTitle: 'Time 00:00:08',
            description,
            onClick: mockEvent1,
            onStepClick: mockEvent2
        },
        {
            title: '进行中',
            description
        },
        {
            title: '未开始'
        }
    ]
    it(`should be items mount`, () => {
        const wrapper = mount(<Steps percent={75} current={2} onChange={mockEvent} items={items} />)

        wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(1).simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(0);
        expect(mockEvent1).toHaveBeenCalledTimes(1);
        expect(mockEvent2).toHaveBeenCalledTimes(1);
    })
})

describe('component: Step, <test prop:: itemWidth> <test prop:: percent>', () => {
    const description = "这是一段描述";
    const items = [
        {
            title: '已完成',
            description
        },
        {
            title: '已完成',
            subTitle: 'Time 00:00:08',
            itemWidth: 100
        },
        {
            title: '进行中',
            description,
            percent: 75
        },
        {
            title: '未开始'
        }
    ]
    it(`should be items mount`, () => {
        const wrapper = mount(<Steps current={2} items={items} />)
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(1).props().style.width).toBe('100px');
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item-progress-icon`).exists()).toBe(true);
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item-progress-icon`).find(`.${prefix}-progress-inner`).at(0).props().style.width).toBe('20px');
    })
})

describe('component: Step, <test prop:: size>', () => {
    const description = "这是一段描述";
    const items = [
        {
            title: '已完成',
            description
        },
        {
            title: '已完成',
            subTitle: 'Time 00:00:08',
        },
        {
            title: '进行中',
            description,
            percent: 75,
            size: 'sm'
        },
        {
            title: '未开始'
        }
    ]
    it(`should be items mount`, () => {
        const wrapper = mount(<Steps current={2} items={items} />)
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item-progress-icon`).exists()).toBe(true);
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item-progress-icon`).find(`.${prefix}-progress-inner`).at(0).props().style.width).toBe('28px');
    })
})

describe('component: Step, <test prop:: stepNumber>', () => {
    const items = [
        {
            title: '已完成',
            stepNumber: 0
        },
        {
            title: '已完成',
            subTitle: 'Time 00:00:08',
        },
        {
            title: '进行中',
        },
        {
            title: '未开始',
            stepNumber: 5
        }
    ]
    it(`should be items mount`, () => {
        const wrapper = mount(<Steps current={2} items={items} type="number" />)
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-icon`).at(0).text()).toBe("0");
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-icon`).at(3).text()).toBe("5");
    })
})