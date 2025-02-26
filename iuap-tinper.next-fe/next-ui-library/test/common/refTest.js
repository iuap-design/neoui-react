import {mount} from './mount';
import React from "react";

export default function refTest(
	Component, // current
	selector, // unique tags such as unique component tag name, #demo, class, etc.
	customRef, // ref bind variable name
) {
	it(`should render ref ${customRef}`, () => {
		const wrapper = mount(<Component/>);
		expect(wrapper.find(selector)).toHaveLength(1)
		expect(wrapper.find(selector).instance()[customRef]).toBeTruthy();
	})
}
