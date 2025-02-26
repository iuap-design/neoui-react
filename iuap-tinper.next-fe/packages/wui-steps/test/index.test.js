/** Steps.tsx */
import { mount, ReactWrapper } from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {
    attrsTest,
    attrsTestByLength,
    eventsTest,
    testChildren,
    testStyle
} from "../../../next-ui-library/test/common/index"
import { prefix } from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src';
import Steps from '../src/index';
import { waitFor, screen } from "@testing-library/react";

const prefixSteps = `${prefix}-steps`;
// let wrapper;
const Demo = (props) => {
    return (
        <Steps {...props}>
            <Steps.Step title="1已完成" description="这是一段描述" />
            <Steps.Step title="2已完成" description="这是一段描述" />
            <Steps.Step title="3进行中" description="这是一段描述" />
            <Steps.Step title="4未开始" />
        </Steps>
    )
}
// beforeEach(async() => {
//     wrapper = mount(
//         <Steps>
//             <Steps.Step title="1已完成" description="这是一段描述"/>
//             <Steps.Step title="2已完成" description="这是一段描述"/>
//             <Steps.Step title="3进行中" description="这是一段描述"/>
//             <Steps.Step title="4未开始"/>
//         </Steps>
//     );
// })
// afterEach(async() => {

//     if (wrapper && wrapper.length) {
//         wrapper.unmount();
//     }
// })
describe('steps test', () => {
    attrsTestByLength({
        title: 'component: Steps, <test prop:: iconPrefix>',
        Component: Demo,
        attrs: {
            iconPrefix: "iiii-"
        },
        selector: `span.iiii-icon`,
        nodeCount: 4,
    })
    attrsTestByLength({
        title: 'component: Steps, <test prop:: direction>',
        Component: Demo,
        attrs: {
            direction: "vertical"
        },
        selector: `.${prefixSteps}-vertical`,
        nodeCount: 1,
    })
    attrsTestByLength({
        title: 'component: Steps, <test prop:: icons>, <test prop:: finish>',
        Component: Demo,
        attrs: {
            current: 2,
            icons: { finish: <Icon type="uf-dongjie" /> }
        },
        selector: `.uf-dongjie`,
        nodeCount: 2,
    })
    attrsTestByLength({
        title: 'component: Steps, <test prop:: icons>, <test prop:: error>',
        Component: Demo,
        attrs: {
            current: 2,
            status: 'error',
            icons: { error: <Icon type="uf-dongjie" /> }
        },
        selector: `.uf-dongjie`,
        nodeCount: 1,
    })
    attrsTest({
        title: 'component: Steps, <test prop:: icons>',
        Component: Demo,
        attrs: {
            icons: true,
            current: 1
        },
        selector: `.${prefixSteps}-icon`,
        classnames: ['uicon-check'],
    })
    describe('component: Steps, <test prop:: current>', () => {
        it('the third item should be current', () => {
            const wrapper = mount(<Demo />);
            expect(wrapper.find(`.${prefixSteps}-item`).at(0).hasClass(`${prefixSteps}-item-process`)).toBeTruthy()
            wrapper.setProps({
                current: 2
            })
            expect(wrapper.find(`.${prefixSteps}-item`).at(2).hasClass(`${prefixSteps}-item-process`)).toBeTruthy()
        })
    });
    describe('component: Steps, <test prop:: initial>', () => {
        it('the third item should be current', () => {
            const wrapper = mount(<Demo />);
            wrapper.setProps({
                initial: 1,
                current: 3
            })
            expect(wrapper.find(`.${prefixSteps}-item`).at(2).hasClass(`${prefixSteps}-item-process`)).toBeTruthy()
        })
    });
    ['danger', 'info', 'news', 'warning', 'sucess', 'process'].forEach(status => {
        attrsTest({
            title: 'component: Steps, <test prop:: status>',
            Component: Demo,
            attrs: {
                status
            },
            selector: `.${prefixSteps}-item`,
            classnames: [`${prefixSteps}-item-${status}`],
        })
    })
    attrsTest({
        title: 'component: Steps, <test prop:: size>',
        Component: Demo,
        attrs: {
            size: 'small'
        },
        selector: `.${prefixSteps}`,
        classnames: [`${prefixSteps}-small`],
    })
    attrsTest({
        title: 'component: Steps, <test prop:: progressDot>',
        Component: Demo,
        attrs: {
            progressDot: true
        },
        selector: `.${prefixSteps}`,
        classnames: [`${prefixSteps}-dot`],
    });
    [0, 1, 2].forEach(item => {
        it('when progressDot is a function, <test prop:: progressDot>', () => {
            let wrapper = mount(
                <Steps progressDot={() => <span>a</span>} current={1}>
                    <Steps.Step title="Finished" description="This is a description." />
                    <Steps.Step title="In Progress" description="This is a description." />
                    <Steps.Step title="Waiting" description="This is a description." />
                </Steps>
            )
            expect(wrapper.find(`.${prefixSteps}-icon span`).at(item).text()).toEqual('a')
        })
    })
    attrsTest({
        title: 'component: Steps, <test prop:: more>',
        Component: Demo,
        attrs: {
            more: true
        },
        selector: `.${prefixSteps}`,
        classnames: [`${prefixSteps}-more`],
    })
    testStyle({
        title: 'component: Steps, <test prop:: style>',
        Component: Demo,
        selector: `.${prefixSteps}`,
        style: {
            color: 'red'
        }
    })
    testChildren({
        title: 'component: Steps, <test prop:: children>',
        Component: Steps,
        attrs: {
            children: <Steps.Step />
        },
        selector: `.${prefixSteps}-item`
    })
    eventsTest({
        title: 'component: Steps, <test prop:: onChange>',
        Component: Demo,
        propFuncName: 'onChange',
        dependentProps: {
            current: 2
        },
        selector: `.${prefixSteps}-item`,
        eventName: 'click',
        eventArgs: [],
        propFuncArgs: [0],
    });
    it('type, <test prop:: type>', () => {
        let wrapper;
        wrapper = mount(<Steps type='default'><Steps.Step /></Steps>);
        expect(wrapper.find(`.${prefixSteps}-icon`).exists(`.${prefix}-icon`)).toEqual(true);
        wrapper.unmount();

        wrapper = mount(<Steps type='number'><Steps.Step /><Steps.Step /></Steps>);
        expect(wrapper.find(`.${prefixSteps}-icon`).at(0).text()).toEqual('1');
        expect(wrapper.find(`.${prefixSteps}-icon`).at(1).text()).toEqual('2');
        wrapper.unmount();

        wrapper = mount(<Steps type='dot'><Steps.Step /></Steps>);
        expect(wrapper.find(`.${prefixSteps}-icon`).exists(`.${prefixSteps}-icon-dot`)).toEqual(true);
        wrapper.unmount();

        wrapper = mount(<Steps type='arrow'><Steps.Step /></Steps>);
        expect(wrapper.find(`.${prefixSteps}`).hasClass(`${prefixSteps}-arrow`)).toEqual(true);
    });
    ['vertical', 'horizontal'].forEach(item => {
        attrsTestByLength({
            title: 'component: Steps, <test prop:: labelPlacement>',
            Component: Demo,
            attrs: {
                labelPlacement: item
            },
            selector: `.${prefixSteps}-label-${item}`,
            nodeCount: 1,
        })
    })
    attrsTestByLength({
        title: 'be vertical when progressDot is true, <test prop:: labelPlacement>',
        Component: Demo,
        attrs: {
            progressDot: true,
            labelPlacement: 'horizontal'
        },
        selector: `.${prefixSteps}-label-vertical`,
        nodeCount: 1,
    })
})
describe('fieldid, <test prop:: fieldid>', () => {
    ['0', '1', '2'].forEach((item) => {
        it(`@fieldid,"***_steps_icon_${item}"`, () => {
            const wrapper = mount(
                <Steps >
                    <Steps.Step />
                    <Steps.Step />
                    <Steps.Step />
                </Steps>)
            expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(item).prop('fieldid')).toEqual(undefined);
            wrapper.setProps({ fieldid: 'fieldid-id' });
            expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(item).prop('fieldid')).toEqual(`fieldid-id_steps_icon_${item}`);
        })
    })
})

describe('component: Steps, <test prop:: items>', () => {
    const description = "这是一段描述";
    const items = [
        {
            title: '已完成',
            description
        },
        {
            title: '已完成',
            subTitle: 'Time 00:00:08',
            description
        },
        {
            title: '进行中',
            description
        },
        {
            title: '未开始'
        }
    ]
    // const wrapper = mount(<Steps current={2} items={items} />)
    it(`should be items mount`, () => {
        const wrapper = mount(<Steps current={2} items={items} />)
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(0).find(`.${prefixSteps}-item-title`).text()).toBe('已完成');
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(1).find(`.${prefixSteps}-item-subtitle`).text()).toBe('Time 00:00:08');
    })

    it(`should be more mount`, () => {
        const wrapper = mount(<Steps current={2} items={items} />)
        wrapper.setProps({ more: true, current: 2, items, status: 'error' });
        expect(wrapper.find(`.${prefixSteps}`).hasClass(`${prefixSteps}-more`)).toBe(true);
    })
})

describe('component: Steps, <test prop:: items> <test prop:: more>', () => {
    const description = "这是一段描述";
    const items = [{ title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description },
    { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description },
    { title: '已完成', description }, { title: '已完成', description }, { title: '进行中', description }, { title: '未开始' }
    ]
    it(`should be items mount`, async () => {
        const wrapper = mount(<div style={{ width: 1200 }}><Steps current={1} items={items} type='arrow' more /></div>)
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-more-front-dropdown`).exists()).toBe(false);
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-more-after-dropdown`).exists()).toBe(true);
        expect(wrapper.exists(`.${prefixSteps}-tab-more-select`)).toBe(true)
    })
})

describe('component: Steps, <test prop:: more>', () => {
    const description = "这是一段描述";
    const items = [{ title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description },
    { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description },
    { title: '已完成', description }, { title: '已完成', description }, { title: '进行中', description }, { title: '未开始' }
    ]
    it(`should be items mount`, async () => {
        const wrapper = mount(<Steps current={8} items={items} type='arrow' />)
        const centerBodyDom = wrapper.find(`.wui-steps-horizontal`).getDOMNode();
        jest.spyOn(centerBodyDom, 'clientWidth', 'get').mockReturnValue(60)
        wrapper.setProps({ more: true })
        expect(wrapper.exists(`.${prefixSteps}-more`)).toBe(true)
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-more-front-dropdown`).find(`.${prefixSteps}-tab-more-select-title`).text()).toBe('更多');
        expect(wrapper.exists(`.${prefixSteps}-tab-more-select`)).toBe(true)
    })
})

describe('component: Steps, <test prop:: percent>', () => {
    const description = "这是一段描述";
    const items = [
        {
            title: '已完成',
            description
        },
        {
            title: '已完成',
            subTitle: 'Time 00:00:08',
            description
        },
        {
            title: '进行中',
            description
        },
        {
            title: '未开始'
        }
    ]
    // const wrapper = mount(<Steps percent={75} current={2} items={items} />)
    it(`should be items mount`, () => {
        const wrapper = mount(<Steps percent={75} current={2} items={items} />)
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item-progress-icon`).exists()).toBe(true);
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item-progress-icon`).find(`.${prefix}-progress-inner`).at(0).props().style.width).toBe('20px');
    })

    it(`should be more mount`, () => {
        const wrapper = mount(<Steps percent={75} current={2} items={items} />)
        wrapper.setProps({ percent: 75, current: 2, items, size: 'small' });
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item-progress-icon`).find(`.${prefix}-progress-inner`).at(0).props().style.width).toBe('28px');
    })
})

describe('component: Steps, <test prop:: onChange>', () => {
    const description = "这是一段描述";
    const mockEvent = jest.fn();
    const mockEvent1 = jest.fn();
    const items = [
        {
            title: '已完成',
            description
        },
        {
            title: '已完成',
            subTitle: 'Time 00:00:08',
            description,
            onClick: mockEvent1
        },
        {
            title: '进行中',
            description
        },
        {
            title: '未开始'
        }
    ]
    it('should be items mount', () => {
        const wrapper = mount(<Steps percent={75} current={2} onChange={mockEvent} items={items} />)
        wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(1).simulate('click');
        expect(mockEvent).toHaveBeenCalled();
        expect(mockEvent1).toHaveBeenCalled();
    })
    // it(`should be items mount`, () => {
    //     wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(1).simulate('click');
    //     expect(mockEvent).toHaveBeenCalled();
    //     expect(mockEvent1).toHaveBeenCalled();
    // })
})
describe('component: Steps, <test prop:: disabled>', () => {
    const description = "这是一段描述";
    const mockEvent = jest.fn();
    const mockEvent1 = jest.fn();
    const items = [
        {
            title: '已完成',
            description
        },
        {
            title: '已完成',
            subTitle: 'Time 00:00:08',
            description,
            disabled: true,
            onClick: mockEvent1
        },
        {
            title: '进行中',
            description
        },
        {
            title: '未开始'
        }
    ]
    // const wrapper = mount(<Steps percent={75} current={2} onChange={mockEvent} items={items} />)
    it(`should be items mount`, () => {
        const wrapper = mount(<Steps percent={75} current={2} onChange={mockEvent} items={items} />)
        wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(1).simulate('click');
        expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-item`).at(1).hasClass(`${prefixSteps}-disabled`)).toBe(true);
        expect(mockEvent).toHaveBeenCalledTimes(0);
        expect(mockEvent1).toHaveBeenCalledTimes(1);
    })
})

describe('component: Steps, <test prop:: locale>', () => {
    const description = "这是一段描述";
    const items = [{ title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description },
    { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description }, { title: '已完成', description },
    { title: '已完成', description }, { title: '已完成', description }, { title: '进行中', description }, { title: '未开始' }
    ]
    const localeMap = {
        'zh-cn': {
            'text': '更多',
        },
        'en-us': {
            'text': 'More',
        },
        'zh-tw': {
            'text': '更多',
        },
        'vi-vn': {
            'text': 'thêm',
        }
    }
    for (let key in localeMap) {
        it(`should be items mount`, () => {
            const text = localeMap[key].text
            const wrapper = mount(<div style={{ width: 1200 }}><Steps current={2} items={items} type='arrow' more locale={key} /></div>)
            expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-more-front-dropdown`).find(`.${prefixSteps}-tab-more-select-title`).text()).toBe(text);
            expect(wrapper.find(`.${prefixSteps}`).find(`.${prefixSteps}-more-after-dropdown`).find(`.${prefixSteps}-tab-more-select-title`).text()).toBe(text);
        })
    }
})
jest.mock('../src/utils', () => {
    return {
        __esModule: true,
        isFlexSupported: () => false,
    };
});
describe('component: Steps, <test Funtion isFlexSupported>', () => {
    const utils = require('../src/utils');
    expect(utils.isFlexSupported()).toBe(false);
})