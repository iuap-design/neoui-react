import {mount} from './mount';
import React from 'react';

// eslint-disable-next-line jest/no-export
export default function MouseEnterTest(Component, elId) {
	describe('mouseover and mouseleave', () => {

		it('mouse enter and leave matchSnapshot', () => {
			const wrapper = mount(<Component/>)
			expect(wrapper).toMatchSnapshot();
			wrapper.find(elId).first().simulate('mouseenter');
			expect(wrapper).toMatchSnapshot();
			wrapper.find(elId).first().simulate('mouseleave');
			expect(wrapper).toMatchSnapshot();
		});
	});
}
