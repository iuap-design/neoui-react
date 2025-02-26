import React from "react";
import {mount} from "./mount"
export default function mountTest(Component) {
	const str = `mount and unmount`;
	describe(str, () => {
		it(`component could be updated and unmounted without errors`, () => {
			const wrapper = mount(<Component/>);
			expect(() => {
				wrapper.setProps({});
				wrapper.unmount();
			}).not.toThrow();
		});
	})
}
