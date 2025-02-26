/** Alert.tsx */
import React from 'react';
import {attrsTest, testCustomeText, eventsTest, attrsTestByLength} from '../../../next-ui-library/test/common/index';
import {prefix} from '../../wui-core/src/updatePrefix'
import Alert from '../src/index';
import Icon from '../../wui-icon/src/index';
import Button from '../../wui-button/src/index';
import {mount, shallow} from '../../../next-ui-library/test/common/mount';

const prefixAlert = `${prefix}-alert`;

describe('Enzyme Shallow', () => {
    it('Alert should be exist', () => {
        let alert = shallow(<Alert/>);
        expect(alert.hasClass(`${prefixAlert}`)).toEqual(true);
    })
})
describe('component: Alert', () => {
    const alert = mount(<Alert/>);
    ['danger', 'warning', 'info', 'news', 'success'].forEach(item => {
        attrsTest({
            title: 'component: Alert, <test prop:: colors>',
            Component: Alert,
            attrs: {
                colors: item
            },
            selector: `.${prefixAlert}`,
            classnames: [`${prefixAlert}-${item}`]
        })
    });
    ['danger', 'warning', 'info', 'success'].forEach(item => {
        attrsTest({
            title: 'component: Alert, <test prop:: type>',
            Component: Alert,
            attrs: {
                type: item
            },
            selector: `.${prefixAlert}`,
            classnames: [`${prefixAlert}-${item}`]
        })
    });
    attrsTest({
        title: 'component: Alert, <test prop:: showIcon>',
        Component: Alert,
        attrs: {
            showIcon: true
        },
        selector: `i`,
        classnames: ["show-icon"]
    });
    attrsTest({
        title: 'component: Alert, <test prop:: closable>',
        Component: Alert,
        attrs: {
            closable: true
        },
        selector: `.${prefixAlert}-close i`,
        classnames: ["uf-close"]
    });
    attrsTest({
        title: 'component: Alert, <test prop:: dark>',
        Component: Alert,
        attrs: {
            dark: true
        },
        selector: `.${prefixAlert}`,
        classnames: ["dark"]
    });
    attrsTest({
        title: 'component: Alert, <test prop:: bordered>',
        Component: Alert,
        attrs: {
            bordered: true
        },
        testAttr: {
            bordered: false
        },
        selector: `.${prefixAlert}`,
        classnames: [`${prefixAlert}-bordered`]
    });
    attrsTestByLength({
        title: 'component: Alert, <test prop:: action>',
        Component: Alert,
        attrs: {
            message: "Error Text",
            description: "Error Description Error Description Error Description Error Description",
            colors: "danger",
            action: <Button size="small" danger> Detail</Button>
        },
        testAttr: {
            action: null
        },
        selector: `.${prefixAlert}-action`,
        nodeCount: 1
    });
    attrsTestByLength({
        title: 'component: Alert, <test prop:: icon>',
        Component: Alert,
        attrs: {
            showIcon: true,
            icon: <Icon type="uf-hanshu" />
        },
        testAttr: {
            icon: null
        },
        selector: `.uf-hanshu`,
        nodeCount: 1
    });
    // 无wui前缀的className添加规范的带wui前缀className备用（两种类名均存在）
    ['.close', `.${prefixAlert}-close`].forEach(item => {
        testCustomeText({
            title: 'Comment: Alert, <test prop:: closeLabel>',
            Component: Alert,
            attrs: {
                closeLabel: '123'
            },
            selector: item,
            text: '123'
        })
    });
    ['.close', `.${prefixAlert}-close`].forEach(item => {
        testCustomeText({
            title: 'Comment: Alert, <test prop:: closeText>',
            Component: Alert,
            attrs: {
                closeText: '1123'
            },
            selector: item,
            text: '1123'
        })
    });
    ['.close', `.${prefixAlert}-close`].forEach(item => {
        testCustomeText({
            title: 'Comment: Alert, <test prop:: closeIcon>',
            Component: Alert,
            attrs: {
                closeIcon: '123'
            },
            selector: item,
            text: '123'
        })
    });
    ['.message', `.${prefixAlert}-message`].forEach(item => {
        testCustomeText({
            title: 'Comment: Alert, <test prop:: message>',
            Component: Alert,
            attrs: {
                message: 'content-of-alert'
            },
            selector: item,
            text: 'content-of-alert'
        })
    });
    ['.description', `.${prefixAlert}-description`].forEach(item => {
        testCustomeText({
            title: 'Comment: Alert, <test prop:: description>',
            Component: Alert,
            attrs: {
                description: 'description-of-alert'
            },
            selector: item,
            text: 'description-of-alert'
        })
    });
    // onDismiss 关闭alert触发的方法
    eventsTest({
        title: 'component: Alert, <test prop:: onDismiss>',
        Component: Alert,
        propFuncName: 'onDismiss',
        dependentProps: {},
        selector: '.close',
        eventName: 'click',
        eventArgs: [true]
    });
    eventsTest({
        title: 'component: Alert, <test prop:: onClose>',
        Component: Alert,
        propFuncName: 'onClose',
        dependentProps: {},
        selector: '.close',
        eventName: 'click',
        eventArgs: [true]
    });
    it('showIcon test, <test prop:: showIcon>', () => {
        let wrapper = mount(<Alert showIcon={false} />);
        expect(wrapper.exists(`.show-icon`)).toBe(false);
        wrapper.setProps({showIcon: true});
        expect(wrapper.exists(`.show-icon`)).toBe(true);
        expect(wrapper.exists(`.${prefixAlert}-show-icon`)).toBe(true);
    });
    it('afterClose test, <test prop:: afterClose>', () => {
        const afterClose = jest.fn()
        let wrapper = mount(<Alert afterClose={afterClose} />);
        expect(afterClose.mock.calls.length).toBe(0)
        wrapper.unmount()
        expect(afterClose.mock.calls.length).toBe(1)
    });
})

describe('fieldid', () => {
    ['success', 'danger', 'info', 'waring'].forEach((item) => {
        it('fieldid, <test prop:: fieldid>', () => {
            const wrapper = mount(<Alert id='demo1-id' colors={item} showIcon />);
            expect(wrapper.find(`.${prefixAlert}`).find('i').at(0).prop('fieldid')).toEqual(undefined);
            expect(wrapper.find(`.${prefixAlert}`).find('.close').prop('fieldid')).toEqual(undefined);
            wrapper.setProps({ fieldid: 'fieldid-id' });
            expect(wrapper.find(`.${prefixAlert}`).find('i').at(0).prop('fieldid')).toEqual(`fieldid-id_alert_${item}`);
            expect(wrapper.find(`.${prefixAlert}`).find('.close').prop('fieldid')).toEqual(`fieldid-id_alert_${item}_close`);
        })
    })
})