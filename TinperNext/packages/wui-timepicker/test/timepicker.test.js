/** TimePicker.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'

import moment from 'moment'
import React from 'react'
import {attrsTest, eventsTest} from '../../../next-ui-library/test/common/index'
import {prefix} from '../../wui-core/src/updatePrefix'
import KeyCode from 'rc-util/lib/KeyCode'

import Timepicker from '../src/index'

const prefixTime = `${prefix}-time-picker`

const now = moment()

attrsTest({
    title: 'component: Timepicker, <test prop:: className>',
    Component: Timepicker,
    attrs: {
        className: 'my-class'
    },
    selector: `.${prefixTime}`,
    classnames: [`my-class`]
})
attrsTest({
    title: 'component: Timepicker, <test prop:: bordered>',
    Component: Timepicker,
    attrs: {
        bordered: false
    },
    selector: `.${prefixTime}`,
    classnames: [`${prefixTime}-border-none`]
})

attrsTest({
    title: 'component: Timepicker, <test prop:: popupClassName>',
    Component: Timepicker,
    attrs: {
        popupClassName: 'my-class-transition',
        open: true
    },
    selector: `.${prefixTime}-panel`,
    act: true,
    classnames: [`my-class-transition`]
})

eventsTest({
    title: 'component: Timepicker, <test prop:: onOpenChange>',
    Component: Timepicker,
    propFuncName: 'onOpenChange',
    dependentProps: {},
    selector: `.${prefixTime}`,
    eventName: 'click',
    eventArgs: []
})
eventsTest({
    title: 'component: Timepicker, <test prop:: onFocus>',
    Component: Timepicker,
    propFuncName: 'onFocus',
    dependentProps: {},
    selector: `input`,
    eventName: 'focus',
    eventArgs: [],
    propFuncArgs: ['mockEvent']
})

eventsTest({
    title: 'component: Timepicker, <test prop:: onKeyDown>',
    Component: Timepicker,
    propFuncName: 'onKeyDown',
    dependentProps: {
        value: now
    },
    selector: `input`,
    eventName: 'keydown',
    eventArgs: [{target: {value: 'qwer'}}]
})
eventsTest({
    title: 'component: Timepicker, <test prop:: onEsc>',
    Component: Timepicker,
    propFuncName: 'onEsc',
    dependentProps: {
        value: now
    },
    selector: `input`,
    eventName: 'keydown',
    eventArgs: [{keyCode: KeyCode.ESC}]
})
