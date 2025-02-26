/**CarouselFigure.tsx */
import React, { Component } from 'react';
import { mount } from '../../../next-ui-library/test/common/mount'
import Carousel from '../src/index';
import { prefix } from '../../wui-core/src/updatePrefix';
import { sleep, attrsTest } from '../../../next-ui-library/test/common/index';
import ButtonGroup from "../../../packages/wui-button-group/src/index";
import Button from "../../../packages/wui-button/src/index";
import debounce from '../src/utils';

const prefixCarousel = `${prefix}-carousel`;

attrsTest({
	title: 'component: Carousel, <test prop:: vertical>',
	Component: Carousel,
	attrs: {
		dotsClass: 'yyy',
		children: [
			<div><h3>1</h3></div>,
			<div><h3>2</h3></div>,
			<div><h3>3</h3></div>,
		]
	},
	selector: '.slick-dots',
	classnames: ['yyy']
});
describe('Carousel', () => {
	it('easing test, <test prop:: easing>', () => {
		const wrapper = mount(
			<Carousel easing="linear">
				<div><h3>1</h3></div>
				<div><h3>2</h3></div>
				<div><h3>3</h3></div>
			</Carousel>
		);
		// expect(wrapper.find('CarouselFigure').props().easing).toEqual('linear');
	})
	it('dots, <test prop:: dots>', () => {
		const wrapper = mount(<Carousel>
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
		</Carousel>);
		expect(wrapper.find(`.${prefixCarousel}`).exists('.slick-dots')).toEqual(true);
		expect(wrapper.find(`.${prefixCarousel}`).find('.slick-dots').find('li').length).toEqual(2);
		wrapper.setProps({ dots: false });
		expect(wrapper.find(`.${prefixCarousel}`).exists('.slick-dots')).toEqual(false);
	});
	it('dotPosition, <test prop:: dotPosition>', () => {
		const wrapper = mount(<Carousel dotPosition=''>
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
		</Carousel>);
		expect(wrapper.find(`.${prefixCarousel}`).find('.slick-dots').hasClass('slick-dots-bottom')).toEqual(true);
		['top', 'bottom', 'left', 'right'].forEach(item => {
			wrapper.setProps({ dotPosition: item });
			expect(wrapper.find(`.${prefixCarousel}`).find('.slick-dots').hasClass(`slick-dots-${item}`)).toEqual(true);
		});
		wrapper.setProps({ dotPosition: '', vertical: true })
		expect(wrapper.find(`.${prefixCarousel}`).find('.slick-dots').hasClass('slick-dots-right')).toEqual(true);
		wrapper.setProps({ dotPosition: '', vertical: false })
		expect(wrapper.find(`.${prefixCarousel}`).find('.slick-dots').hasClass('slick-dots-bottom')).toEqual(true);
	});
	it('effect, <test prop:: effect>', () => {
		const wrapper = mount(<Carousel>
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
		</Carousel>);
		expect(wrapper.find('.slick-slider').find('.slick-slide').at(0).props().style.transition).toEqual(undefined);
		wrapper.setProps({ effect: "scrollx" });
		expect(wrapper.find('.slick-slider').find('.slick-slide').at(0).props().style.transition).toEqual(undefined);
		wrapper.setProps({ effect: "fade" });
		expect(wrapper.find('.slick-slider').find('.slick-slide').at(0).props().style.transition).toEqual("opacity 500ms ease, visibility 500ms ease");
	});
	it('speed, <test prop:: speed>', async () => {
		const wrapper = mount(<Carousel speed={1000}>
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
			<div><h3>3</h3></div>
		</Carousel>);
		expect(wrapper.find('.slick-current').find('h3').text()).toEqual("1");
		wrapper.find('ul').find('li').at(1).find('button').simulate('click');
		await sleep(1000);
		expect(wrapper.find('.slick-current').find('h3').text()).toEqual("2");
		await sleep(1000);
		wrapper.find('ul').find('li').at(2).find('button').simulate('click');
		expect(wrapper.find('.slick-current').find('h3').text()).toEqual("3");
	});
	it('beforeChange, <test prop:: beforeChange>', () => {
		const beforeChange = jest.fn();
		const wrapper = mount(<Carousel beforeChange={beforeChange}>
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
			<div><h3>3</h3></div>
			<div><h3>4</h3></div>
		</Carousel>);
		wrapper.find('ul').find('li').at(2).find('button').simulate('click');
		expect(beforeChange).toHaveBeenCalled();
		expect(beforeChange.mock.calls[0][0]).toBe(0);
		expect(beforeChange.mock.calls[0][1]).toBe(2);
	});
	it('afterChange, <test prop:: afterChange>', async () => {
		const afterChange = jest.fn();
		const wrapper = mount(<Carousel afterChange={afterChange}>
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
			<div><h3>3</h3></div>
			<div><h3>4</h3></div>
		</Carousel>);
		wrapper.find('ul').find('li').at(2).find('button').simulate('click');
		await sleep(1000)
		expect(afterChange).toHaveBeenCalled();
		expect(afterChange.mock.calls[0][0]).toBe(2);
	});
	it('arrows, <test prop:: arrows>', async () => {
		const wrapper = mount(<Carousel >
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
			<div><h3>3</h3></div>
			<div><h3>4</h3></div>
		</Carousel>);
		expect(wrapper.exists('.slick-arrow')).toEqual(false);
		expect(wrapper.find('.slick-current').find('h3').text()).toEqual("1");
		wrapper.setProps({ arrows: true });
		expect(wrapper.find('.slick-arrow').at(0).hasClass('slick-prev')).toEqual(true);
		expect(wrapper.find('.slick-arrow').at(1).hasClass('slick-next')).toEqual(true);
		wrapper.find('.slick-next').simulate('click');
		expect(wrapper.find('.slick-current').find('h3').text()).toEqual("2");
	});
	it('arrows, <test prop:: arrows>', async () => {
		const wrapper = mount(<Carousel >
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
			<div><h3>3</h3></div>
			<div><h3>4</h3></div>
		</Carousel>);
		expect(wrapper.exists('.slick-arrow')).toEqual(false);
		expect(wrapper.find('.slick-current').find('h3').text()).toEqual("1");
		wrapper.setProps({ arrows: true });
		expect(wrapper.find('.slick-arrow').at(0).hasClass('slick-prev')).toEqual(true);
		expect(wrapper.find('.slick-arrow').at(1).hasClass('slick-next')).toEqual(true);
		wrapper.find('.slick-prev').simulate('click');
		expect(wrapper.find('.slick-current').find('h3').text()).toEqual("4");
	});
	it('initialSlide, <test prop:: initialSlide>', async () => {
		const wrapper = mount(<Carousel initialSlide={3}>
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
			<div><h3>3</h3></div>
			<div><h3>4</h3></div>
		</Carousel>);
		expect(wrapper.find('.slick-current').find('h3').text()).toEqual("4");
	});
	attrsTest({
		title: 'component: Carousel, <test prop:: vertical>',
		Component: Carousel,
		attrs: {
			vertical: 'true'
		},
		selector: '.slick-slider',
		classnames: ['slick-vertical']
	});
	it('draggable test, <test prop:: draggable>', () => {
		const wrapper = mount(
			<Carousel draggable>
				<div><h3>1</h3></div>
				<div><h3>2</h3></div>
				<div><h3>3</h3></div>
			</Carousel>
		);
		expect(wrapper.find('.slick-current').find('h3').text()).toEqual("1");
		// expect(wrapper.find('CarouselFigure').props().draggable).toEqual(true);
	})
	it('should trigger autoPlay after window resize', async () => {
		jest.useRealTimers()
		const ref = React.createRef()
		const div = document.createElement('div');
		div.setAttribute('id', 'container');
		document.body.appendChild(div);

		const wrapper = mount(
			<Carousel autoplay ref={ref}>
				<div><h3>1</h3></div>
				<div><h3>2</h3></div>
				<div><h3>3</h3></div>
			</Carousel>, { attachTo: document.getElementById('container') }
		)
		const spy = jest.spyOn(ref.current.innerSlider, 'autoPlay')

		window.dispatchEvent(new Event('resize'))
		expect(spy).not.toHaveBeenCalled()

		await sleep(500)
		expect(spy).toHaveBeenCalled()
	});
	it('autoplay, <test prop:: autoplay>', async () => {
		const wrapper = mount(
			<Carousel autoplay>
				<div>1</div>
				<div>2</div>
				<div>3</div>
			</Carousel>,
		);
		const spy = jest.spyOn(window, 'removeEventListener');
		wrapper.unmount();
		expect(spy).toHaveBeenCalled();
	});
	it('should active', () => {
		const wrapper = mount(<Carousel />);
		wrapper.setProps({
			children: <div />,
		});
		wrapper.update();
		expect(wrapper.find('.slick-active').length).toBeTruthy();
	});
	it('next && prev test', async () => {
		let prevItem = false;
		let nextItem = false;
		class Demo5 extends Component {
			prev = () => {
				this.carousel && this.carousel.prev();
				prevItem = true
			}
			next = () => {
				this.carousel && this.carousel.next();
				nextItem = true
			}
			render() {
				return (
					<div>
						<ButtonGroup>
							<Button onClick={this.prev}>前一个</Button>
							<Button onClick={this.next}>后一个</Button>
						</ButtonGroup>
						<Carousel dots={false} ref={carousel => this.carousel = carousel}>
							<div><h3>1</h3></div>
							<div><h3>2</h3></div>
						</Carousel>
					</div>
				)
			}
		}
		let wrapper = mount(<Demo5 />)
		wrapper.find('button').at(1).simulate('click')
		expect(nextItem).toEqual(true)
		wrapper.find('button').at(0).simulate('click')
		expect(prevItem).toEqual(true)
	})
})

describe('file: ../src/utils test', () => {
	it('debounce function test', () => {
		let mockFn = jest.fn();
		// 封装防抖函数
		let fn = debounce(mockFn, false, { maxWait: 100 });
		// 连续调用两次
		fn(1);
		fn(2);
		setTimeout(() => {
			const calls = mockFn.mock.calls;
			// 断言只调用一次
			expect(calls.length).toEqual(1);
			// 结果以第二次为准
			expect(calls[0][0]).toEqual(2);
			done()
		}, 50);

		mockFn = jest.fn();
		fn = debounce(mockFn, 10, { maxWait: 100 });
		fn(1);
		fn(2);
		setTimeout(() => {
			const calls = mockFn.mock.calls;
			expect(calls.length).toEqual(1);
			expect(calls[0][0]).toEqual(2);
			done()
		}, 50)
	});
	it('the first parameter should be function', () => {
		debounce(() => { }, false, { leading: false, maxWait: 100 }).cancel();
		debounce(() => { }, false, { leading: false, maxWait: 100 }).flush();
		debounce(() => { }, false, { leading: false, maxWait: 100 }).pending();
		expect(() => debounce(1, false, { leading: false, maxWait: 100 })).toThrow(new Error('Expected a function'))
	});
})