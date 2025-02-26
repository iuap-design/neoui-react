/**Viewer.tsx */
import React from 'react';
import Image from '../src/index';
import { mount } from '../../../next-ui-library/test/common/mount'
import { prefix } from '../../wui-core/src/updatePrefix'
import KeyCode from 'rc-util/lib/KeyCode';
const prefixImage = `${prefix}-image`;

const div = document.createElement('div');
div.setAttribute('id', 'container');
document.body.appendChild(div);

describe('shortcuts test', () => {
    it('img should hide when click ESC key', () => {
        let wrapper = mount(
            <Image transition={false} asyncLoad>
	            <div>
	                <img
	                    data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg"
	                    src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg'
	                    alt="Picture"/>
	            </div>
	        </Image>, {attachTo: document.getElementById('container')}
        )
        Object.defineProperty( 
            document.querySelector('img'), 
            'complete', 
            { value: true });

        wrapper.setProps({ keyboard: true })
        document.querySelector('img').click()
        expect(document.getElementsByClassName('viewer-in')[0]).toBeTruthy()
        expect(document.getElementsByClassName('viewer-hide')[0]).toBeFalsy()

        document.querySelector('.viewer-play').dispatchEvent(new MouseEvent('click', { bubbles: true }))
        expect(document.getElementsByClassName('viewer-player')[0].getAttribute('class').includes('viewer-show')).toEqual(true)

        document.querySelector('.viewer-container').dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': KeyCode.ESC , bubbles: true}))
        expect(document.getElementsByClassName('viewer-player')[0].getAttribute('class').includes('viewer-show')).toEqual(false)

        document.querySelector('.viewer-container').dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': KeyCode.ESC , bubbles: true}))
        expect(document.getElementsByClassName('viewer-in')[0]).toBeFalsy()
        expect(document.getElementsByClassName('viewer-hide')[0]).toBeTruthy()
    })
    it('image will stop playing when click SPACE key', () => {
        let wrapper = mount(
            <Image keyboard={true} transition={false} >
	            <div>
	                <img
	                    data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg"
	                    src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg'
	                    alt="Picture"/>
	            </div>
	        </Image>, {attachTo: document.getElementById('container')}
        )
        Object.defineProperty( 
            document.querySelector('img'), 
            'complete', 
            { value: true });

        document.querySelector('img').click()
        document.querySelector('.viewer-play').dispatchEvent(new MouseEvent('click', { bubbles: true }))
        expect(document.getElementsByClassName('viewer-player')[0].getAttribute('class').includes('viewer-show')).toEqual(true)

        document.querySelector('.viewer-container').dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': KeyCode.SPACE , bubbles: true}))
        expect(document.getElementsByClassName('viewer-player')[0].getAttribute('class').includes('viewer-show')).toEqual(false)
    })
    it('LEFT && RIGHT key test', () => {
        let wrapper = mount(
            <Image keyboard={true} transition={false}>
	            <div>
                    <img 
                        data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg"
                        src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg'
                        alt="Picture" />
                    <img 
                        data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-4-min.jpg"
                        src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-2-min.jpg'
                        alt="Picture" />
                    <img 
                        data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-3-min.jpg"
                        src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-3-min.jpg'
                        alt="Picture" />
	            </div>
	        </Image>, {attachTo: document.getElementById('container')}
        )
        Object.defineProperty( 
            document.querySelector('img'), 
            'complete', 
            { value: true });

        document.querySelector('img').click()
        expect(document.getElementsByClassName('viewer-canvas')[0].getElementsByTagName('img')[0].getAttribute('src')).toEqual('http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg')
        
        document.querySelector('.viewer-container').dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': KeyCode.RIGHT , bubbles: true}))
        expect(document.getElementsByClassName('viewer-canvas')[0].getElementsByTagName('img')[0].getAttribute('src')).toEqual('http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-4-min.jpg')
        
        document.querySelector('.viewer-container').dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': KeyCode.LEFT , bubbles: true}))
        expect(document.getElementsByClassName('viewer-canvas')[0].getElementsByTagName('img')[0].getAttribute('src')).toEqual('http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg')
    })
})

describe('Event test', () => {
    it('Event test, <test prop:: show>, <test prop:: shown>, <test prop:: view>, <test prop:: hide>, <test prop:: hidden>', () => {
        const mock1 = jest.fn(),
              mock2 = jest.fn(),
              mock3 = jest.fn(),
              mock4 = jest.fn(),
              mock5 = jest.fn();
        let wrapper = mount(
            <Image  show={mock1} shown={mock2} view={mock3} keyboard={true}  hide={mock4} hidden={mock5} transition={false}>
	            <div>
	                <img
	                    data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg"
	                    src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg'
	                    alt="Picture"/>
	            </div>
	        </Image>, {attachTo: document.getElementById('container')}
        )
        Object.defineProperty( 
            document.querySelector('img'), 
            'complete', 
            { value: true });

        document.querySelector('img').click()
        expect(mock1.mock.calls[0][0].isTrusted).toEqual(false)
        expect(mock2.mock.calls[0][0].isTrusted).toEqual(false)
        expect(mock3.mock.calls[0][0].isTrusted).toEqual(false)

        document.querySelector('.viewer-container').dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': KeyCode.ESC , bubbles: true}))
        expect(mock4.mock.calls[0][0].isTrusted).toEqual(false)
        expect(mock5.mock.calls[0][0].isTrusted).toEqual(false)
    })
})

describe('other props test', () => {
    it('button and navbar and toolbar should be hide, <test prop:: button>, <test prop:: navbar>, <test prop:: toolbar>', () => {
        let wrapper = mount(
            <Image button={false} navbar={false} toolbar={false}>
	            <div>
	                <img
	                    data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg"
	                    src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg'
	                    alt="Picture"/>
	            </div>
	        </Image>, {attachTo: document.getElementById('container')}
        )
        document.querySelector('img').click()
        expect(document.getElementsByClassName('viewer-button')[0].getAttribute('class').includes('viewer-hide')).toEqual(true)
        expect(document.getElementsByClassName('viewer-navbar')[0].getAttribute('class').includes('viewer-hide')).toEqual(true)
        expect(document.getElementsByClassName('viewer-toolbar')[0].getAttribute('class').includes('viewer-hide')).toEqual(true)
    })
})