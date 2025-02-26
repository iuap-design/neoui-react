/** index.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React, {Component} from 'react'
import {
    actWait,
    attrsTestByLength,
    eventsTest,
    sleep,
    testCustomStyle
} from '../../../next-ui-library/test/common/index'
import {prefix} from '../../wui-core/src/updatePrefix'
import Button from '../../wui-button/src'
import Tooltip from '../src/index'
import TooltipDemo from './tooltipClass'

const prefixTip = `${prefix}-tooltip`
const prefixTipPlacement = `${prefix}-tooltip-placement`

let wrapper

beforeEach(async () => {
    const div = document.createElement('div')
    div.setAttribute('id', 'container')
    document.body.appendChild(div)
    wrapper = mount(<TooltipDemo />)
    await actWait()
})
afterEach(async () => {
    const div = document.getElementById('container')
    if (div) {
        document.body.removeChild(div)
    }
    if (wrapper && wrapper.length) {
        wrapper.unmount()
    }
})

describe('Tooltip show or hide', () => {
    it('Tooltip show', () => {
        let tooltip = mount(<Tooltip className='in' />)
        expect(tooltip.hasClass('in')).toEqual(true)
    })
    it('Tooltip hide', () => {
        let tooltip = mount(<Tooltip />)
        expect(tooltip.exists('.in')).toEqual(false)
    })
})

describe('component: Tooltip, <test prop:: inverse>,', () => {
    it('Tooltip display on top', () => {
        wrapper.setProps({inverse: true})
        wrapper.find('button').first().simulate('click')
        expect(wrapper.find(`.${prefixTip}`).hasClass(`${prefixTip}-inverse`)).toBeTruthy()
    })
})

describe('component: Tooltip, <test prop:: show>,', () => {
    it('Tooltip should  display', () => {
        wrapper.setProps({show: true})
        expect(wrapper.find(`.${prefixTip}`)).toHaveLength(1)
    })
    it('Tooltip should not display while children is disabled', async () => {
        wrapper.unmount()
        wrapper = mount(
            <Tooltip overlay='提示内容'>
                <Button disabled className='myBtn'>
                    Button禁用
                </Button>
            </Tooltip>
        )
        wrapper.find('button').first().simulate('click')
        await actWait()
        expect(wrapper.find(`.${prefixTip}`)).toHaveLength(0)
    })
})
describe('component: Tooltip, <test prop:: overlay>, <test prop:: overlayClassName>, <test prop:: overlayStyle>, <test prop:: overlayInnerStyle>', () => {
    it('Tooltip display on top', () => {
        wrapper.setProps({
            overlay: <div>abcde</div>,
            overlayClassName: 'my-class',
            overlayStyle: {color: 'red'},
            overlayInnerStyle: {color: 'green'}
        })
        wrapper.find('button').first().simulate('click')
        expect(wrapper.find(`.${prefixTip}-inner div`).first().text()).toBe('abcde')
        expect(wrapper.find(`.${prefixTip}`).hasClass(`my-class`)).toBeTruthy()
        expect(wrapper.find(`.${prefixTip}`).getDOMNode().style.color).toBe('red')
        expect(wrapper.find(`.${prefixTip}-inner`).getDOMNode().style.color).toBe('green')
    })
})
describe('component: Tooltip, <test prop:: destroyTooltipOnHide>', () => {
    it('tooltip should be hidden when destroyTooltipOnHide false', () => {
        wrapper.setProps({
            destroyTooltipOnHide: true
        })
        wrapper.find('button').first().simulate('click')
        expect(wrapper.find(`.${prefixTip}`)).toHaveLength(1)
        wrapper.find('button').first().simulate('click')
        expect(wrapper.find(`.${prefixTip}`)).toHaveLength(0)
        wrapper.setProps({
            destroyTooltipOnHide: false
        })
        wrapper.find('button').first().simulate('click')
        expect(wrapper.find(`.${prefixTip}`)).toHaveLength(1)
        wrapper.find('button').first().simulate('click')
        expect(wrapper.find(`.${prefixTip}`)).toHaveLength(1)
    })
})
describe('component: Tooltip, <test prop:: onHide>', () => {
    it('onHide should be called', () => {
        const mockHide = jest.fn()
        wrapper.setProps({
            onHide: mockHide
        })
        wrapper.find('button').first().simulate('click').simulate('click')
        expect(mockHide).toHaveBeenCalled()
        expect(mockHide.mock.calls[0][0]).toBeFalsy()
    })
})

describe('component: Tooltip, <test prop:: title>,', () => {
    it('Tooltip should display ddddddd', () => {
        wrapper.setProps({title: 'dddddddd', overlay: undefined, visible: true})
        expect(wrapper.find(`.${prefixTip}-inner`).text()).toBe('dddddddd')
    })
    it('Tooltip should display 0', () => {
        wrapper.setProps({title: 0, overlay: undefined, visible: true})
        expect(wrapper.find(`.${prefixTip}-inner`).text()).toBe('0')
    })
})
describe('component: Tooltip, <test prop:: getTooltipContainer>,', () => {
    it('Tooltip should  display', async () => {
        wrapper.setProps({
            getTooltipContainer: () => {
                return document.getElementById('root')
            },
            visible: true
        })
        await actWait()
        expect(wrapper.find(`#root .${prefixTip}`)).toHaveLength(1)
    })
})
describe('component: Tooltip, <test prop:: getContextPopupContainer>,', () => {
    it('Tooltip should  display', async () => {
        wrapper.setProps({
            getContextPopupContainer: () => {
                return document.getElementById('root')
            },
            visible: true
        })
        await actWait()
        expect(wrapper.find(`#root .${prefixTip}`)).toHaveLength(1)
    })
})
describe('component: Tooltip, <test prop:: container>,', () => {
    it('Tooltip should  display', async () => {
        wrapper.setProps({
            container: () => {
                return document.getElementById('root')
            },
            open: true
        })
        await actWait()
        expect(wrapper.find(`#root .${prefixTip}`)).toHaveLength(1)
    })
})
describe('component: Tooltip, <test prop:: open>,', () => {
    it('Tooltip should  display', async () => {
        wrapper.setProps({
            open: true
        })
        await actWait()
        expect(wrapper.find(`#root .${prefixTip}`)).toHaveLength(1)
    })
})
describe('Component: Tooltip placementEdge ', () => {
    class Demo1 extends Component {
        state = {visible: false}
        show = () => {
            this.setState({visible: !this.state.visible})
        }
        getPopupContainer = () => {
            return document.getElementById('container')
        }
        render() {
            let tip = (
                <div>
                    <p>这是一个很强的提醒</p>
                    <p>这是一个很强的提醒</p>
                    <p>这是一个很强的提醒</p>
                    <p>这是一个很强的提醒</p>
                </div>
            )
            return (
                <div className='demo-tooltip' style={{height: '20px'}}>
                    <Tooltip
                        fieldid='demo1-fieldid'
                        arrowPointAtCenter
                        className='--child-className--'
                        overlay={tip}
                        overlayClassName='--overlayClassName--'
                        trigger='click'
                        overlayMaxHeight={true}
                        visible={this.state.visible}
                        getPopupContainer={this.getPopupContainer}
                        // placement='top'
                        color='#f0f'
                    >
                        <Button
                            id='--btn-id--'
                            className='--btn-className--'
                            onClick={this.show}
                            style={{marginLeft: 10}}
                        >
                            点击显示
                        </Button>
                    </Tooltip>
                </div>
            )
        }
    }
    it('Component: Tooltip, <test prop:: color>, <test prop:: placement>, <test prop:: overlayMaxHeight>, <test prop:: arrowPointAtCenter>, <test prop:: overlayClassName>, <test prop:: getPopupContainer>', () => {
        wrapper.unmount()
        wrapper = mount(<Demo1 />)
        wrapper.setProps({placement: 'top'})
        wrapper.find(`button`).at(0).simulate('click')
        expect(wrapper.find(`.${prefixTip}`).hasClass('--overlayClassName--')).toEqual(true)
        expect(wrapper.find(`.${prefixTip}-arrow-content`).prop('style')._values).toEqual({
            background: 'rgb(255, 0, 255)',
            'background-color': 'rgb(255, 0, 255)',
            bottom: '0px',
            left: '0px',
            top: '0px'
        })

        wrapper.setProps({placement: 'left'})
        wrapper.find(`button`).at(0).simulate('click')
        wrapper.setProps({placement: 'right'})
        wrapper.find(`button`).at(0).simulate('click')

        wrapper.setProps({placement: 'bottomLeft'})
        wrapper.find(`button`).at(0).simulate('click')
        wrapper.setProps({placement: 'bottomRight'})
        wrapper.find(`button`).at(0).simulate('click')

        wrapper.setProps({placement: 'rightTop'})
        wrapper.find(`button`).at(0).simulate('click')
        wrapper.setProps({placement: 'rightBottom'})
        wrapper.find(`button`).at(0).simulate('click')
    })
})
