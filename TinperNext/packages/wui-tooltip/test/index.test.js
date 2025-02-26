/** index.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React, { Component } from 'react'
import {
    actWait,
    attrsTestByLength,
    eventsTest,
    sleep,
    testCustomStyle
} from '../../../next-ui-library/test/common/index'
import { prefix } from '../../wui-core/src/updatePrefix'
import Button from '../../wui-button/src'
import Tooltip from '../src/index'
import TooltipDemo from './tooltipClass'

const prefixTip = `${prefix}-tooltip`
const prefixTipPlacement = `${prefix}-tooltip-placement`

eventsTest({
    title: 'component: Tooltip, <test prop:: onVisibleChange>',
    Component: TooltipDemo,
    propFuncName: 'onVisibleChange',
    dependentProps: {},
    selector: `button`,
    eventName: 'click',
    eventArgs: [true]
})
eventsTest({
    title: 'component: Tooltip, <test prop:: onOpenChange>',
    Component: TooltipDemo,
    propFuncName: 'onOpenChange',
    dependentProps: {},
    selector: `button`,
    eventName: 'click',
    eventArgs: [true]
})
eventsTest({
    title: 'component: Tooltip, <test prop:: onMouseLeave>',
    Component: TooltipDemo,
    propFuncName: 'onMouseLeave',
    dependentProps: {
        trigger: 'hover',
        defaultVisible: true
    },
    selector: `button`,
    eventName: 'mouseleave',
    eventArgs: [false]
})

eventsTest({
    title: 'component: Tooltip, <test prop:: onMouseOut>',
    Component: TooltipDemo,
    propFuncName: 'onMouseOut',
    dependentProps: {
        trigger: 'hover',
        defaultVisible: true
    },
    selector: `button`,
    eventName: 'mouseleave',
    eventArgs: [false]
})

eventsTest({
    title: 'component: Tooltip, <test prop:: mouseLeaveDelay>',
    Component: TooltipDemo,
    propFuncName: 'onMouseLeave',
    dependentProps: {
        trigger: 'hover',
        defaultVisible: true,
        mouseLeaveDelay: 2
    },
    selector: `button`,
    eventName: 'mouseleave',
    eventArgs: [],
    afterTest: async (e, wrapperD) => {
        expect(wrapperD.find(`.${prefixTip}`)).toHaveLength(0)
        await sleep(2000)
        expect(wrapperD.find(`.${prefixTip}`)).toHaveLength(0)
    }
})
eventsTest({
    title: 'component: Tooltip, <test prop:: mouseEnterDelay>, <test prop:: onmouseEnter>',
    Component: TooltipDemo,
    propFuncName: 'onMouseEnter',
    dependentProps: {
        trigger: 'hover',
        mouseEnterDelay: 2
    },
    selector: `button`,
    eventName: 'mouseenter',
    eventArgs: [],
    afterTest: async (e, wrapperD) => {
        expect(wrapperD.find(`.${prefixTip}`)).toHaveLength(0)
        await sleep(2500)
        expect(wrapperD.find(`.${prefixTip}`)).toHaveLength(1)
    }
})
eventsTest({
    title: 'component: Tooltip, <test prop:: delay>, <test prop:: trigger>',
    Component: TooltipDemo,
    propFuncName: 'onMouseEnter',
    dependentProps: {
        trigger: 'hover',
        delay: 2000
    },
    selector: `button`,
    eventName: 'mouseenter',
    eventArgs: [],
    afterTest: async (e, wrapperD) => {
        expect(wrapperD.find(`.${prefixTip}`)).toHaveLength(0)
        await sleep(2500)
        expect(wrapperD.find(`.${prefixTip}`)).toHaveLength(1)
    }
})
// testCustomStyle({
//     title: 'component: Tooltip, <test prop:: color>',
//     Component: TooltipDemo,
//     attrs: {
//         color: '#f00',
//         visible: true
//     },
//     selector: `.${prefixTip}-inner`,
//     act: true,
//     verifyStyle: { background: 'rgb(255, 0, 0)' }
// })
// testCustomStyle({
//     title: 'component: Tooltip, <test prop:: zIndex>',
//     Component: TooltipDemo,
//     attrs: {
//         zIndex: 1000,
//         visible: true
//     },
//     selector: `.${prefixTip}`,
//     act: true,
//     verifyStyle: { 'z-index': '1000' }
// })
// attrsTestByLength({
//     title: 'component: Tooltip, <test prop:: defaultVisible>',
//     Component: TooltipDemo,
//     attrs: {
//         defaultVisible: true
//     },
//     selector: `.${prefixTip}`,
//     act: true,
//     nodeCount: 1
// })
// attrsTestByLength({
//     title: 'component: Tooltip, <test prop:: defaultOpen>',
//     Component: TooltipDemo,
//     attrs: {
//         defaultOpen: true
//     },
//     selector: `.${prefixTip}`,
//     act: true,
//     nodeCount: 1
// })
attrsTestByLength({
    title: 'component: Tooltip, <test prop:: openClassName>',
    Component: TooltipDemo,
    attrs: {
        openClassName: 'rrr',
        defaultVisible: true
    },
    selector: `button.rrr`,
    act: true,
    nodeCount: 1
})
attrsTestByLength({
    title: 'component: Tooltip, <test prop:: hideArrow>',
    Component: TooltipDemo,
    attrs: {
        hideArrow: true,
        defaultVisible: true
    },
    selector: `.${prefixTip}-arrow-content`,
    act: true,
    nodeCount: 0
})
