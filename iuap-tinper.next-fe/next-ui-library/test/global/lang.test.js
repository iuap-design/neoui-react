import React from 'react'

import {getCompApis, getUntestedApis} from './utils'
import {testMultiLang, sleep} from '../common/index'
import allComps from './../../mdApi.json'
import testedComps from './tested.json'
import {langTestComps} from './components'

import {prefix} from './../../../packages/wui-core/src/updatePrefix'
import Clipboard from '../../../packages/wui-clipboard/src/index'
import Form from '../../../packages/wui-form/src/index'
import Input from '../../../packages/wui-input/src/index'
import Progress from '../../../packages/wui-progress/src/index'
import Slider from '../../../packages/wui-slider/src/index'
import Table from '../../../packages/wui-table/src/index'

const content = `我是组件文本`,
    contentNode = <span>{content}</span>

/**
 * @desc 组件
 * @param compName 必传，组件名
 * @param Component 必传，组件
 * @param props 必传，待测属性列表
 * @param parentProps 父组件需传入的属性，如 open
 * @param ParentComp 父组件（组件为SubMunu等子组件时，必须配合使用的父组件）
 * */
langTestComps.forEach(({compName, Component, ParentComp, parentProps, props}) => {
    /**
     * @desc 属性
     * @param propKey 必传，待测属性
     * @param selector 必传，测试该属性的选择器
     * @param propType 'text' | 'attr' | 'item'；其中 text: 文本，attr: img.alt等属性，item: options[i].label等
     * @param attrName 待测属性名，如传入TimePicker.clearText，挂载在title属性上
     * @param otherProps 测试属性时需传递的参数，如 Card.open，antd等
     * @param hasSelectorSpan 测试属性selector是否需要加 span
     * @param isFunctionNode contentNode是否以函数形式传入
     * @param beforeCb 断言前必须执行的操作，如click
     * */
    props.forEach(
        ({
            propKey,
            selector,
            propType = 'text',
            attrName = '',
            otherProps = {},
            itemsKey,
            elementType,
            hasSelectorSpan = true,
            isFunctionNode = false,
            beforeCb
        }) => {
            const _contentNode = isFunctionNode ? () => contentNode : contentNode
            testMultiLang({
                title: `多语改造: ${compName}, <test prop:: ${propKey}>`,
                propType,
                propKey,
                attrName,
                ParentComp,
                parentProps,
                Component,
                attrs: {
                    ...otherProps,
                    [propKey]: propType === 'arr' ? [_contentNode] : _contentNode
                },
                selector:
                    propType === 'attr'
                        ? `${selector} ${elementType ?? ''}`.trim()
                        : `${selector}${hasSelectorSpan ? ' span' : ''}`,
                text: content,
                ...(['item', 'arr'].includes(propType)
                    ? {
                          itemsKey,
                          contentNode: _contentNode
                      }
                    : {}),
                beforeCb
            })
        }
    )
})

describe('多语改造：', () => {
    it(`Clipboard copy, <test prop:: text> >  it should be ${content} attr`, () => {
        let wrapper = mount(<Clipboard text={contentNode} action='copy'></Clipboard>)
        wrapper.find(`.${prefix}-clipboard`).simulate('click')
        expect(wrapper.state().html).toEqual(contentNode)
    })

    it(`Progress, <test prop:: format> >  it should be ${content} text`, () => {
        let wrapper = mount(<Progress type='circle' percent={100} format={() => contentNode} />)
        expect(wrapper.find(`.${prefix}-progress-text`).text()).toEqual(content)
    })

    it(`Form, <test prop:: validateMessages> >  it should be ${content} text`, async () => {
        const wrapper = mount(
            <Form validateMessages={{required: contentNode}}>
                <Form.Item name='test' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
            </Form>
        )
        wrapper.find('input').first().simulate('blur')
        await sleep(100)
        wrapper.find('input').first().simulate('focus')
        expect(wrapper.find(`.${prefix}-form-item-explain span`).first().text()).toEqual(content)
    })

    it(`Form.Item, <test prop:: tooltip> >  it should be ${content} text`, () => {
        let wrapper = mount(
            <Form.Item label='我是label' tooltip={{title: contentNode, visible: true}}>
                <Input />
            </Form.Item>
        )
        expect(wrapper.find(`.${prefix}-tooltip-inner span`).at(0).text()).toContain(content)
    })

    it(`Slider, <test prop:: marks> >  it should be ${content} text`, () => {
        const marks = {
            100: {
                style: {
                    color: 'red'
                },
                label: contentNode
            }
        }
        let wrapper = mount(<Slider marks={marks} defaultValue={33} />)
        expect(wrapper.find(`.${prefix}-slider-mark-text span`).text()).toEqual(content)
    })

    it(`Table.columns, <test prop:: title> >  it should be ${content} text`, () => {
        const columns = [
                {
                    title: contentNode,
                    dataIndex: 'a',
                    key: 'a'
                }
            ],
            data = [{a: '88888'}]
        let wrapper = mount(<Table columns={columns} data={data} />)
        expect(wrapper.find(`.${prefix}-table-header-cell span`).text()).toEqual(content)
    })
})

let {allApis, testedApis, restApis} = getCompApis(testedComps, langTestComps)
let untestedApis = getUntestedApis(allComps, testedComps)
describe('已测组件：', () => {
    it(`已测API: ================================================================================================================`, () => {})
    testedApis.map(testedCompApis => {
        it(`${testedCompApis}`, () => {})
    })
})
describe('已评审忽略组件：', () => {
    it(`忽略API: ================================================================================================================`, () => {})
    restApis.map(restCompApis => {
        it(`${restCompApis}`, () => {})
    })
})

describe('待评审组件：', () => {
    if (untestedApis.length === 0) {
        it(` ！！！！！无待评审API ！！！！！`, () => {})
    } else {
        it(`待评审API: ================================================================================================================================================================================================================================`, () => {})
        untestedApis.map(untested => {
            it(`${untested}`, () => {})
        })
    }
})
