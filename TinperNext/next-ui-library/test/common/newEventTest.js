import { mount } from './mount';
import React from "react";
import { actWait } from './utils';
import {fireEvent} from "@testing-library/react";

/**
 * Use selector and classname together,
 * At the same time, the representative must be matched according to the specific category,
 * There is no representative at the same time, only the basic snapshot is matched
 */
export default function newEventsTest({
	title, // string; 描述
	Component, // current
	wrapper,
	propFuncName, //string; functions ['onClick', 'onMouseEnter', 'customName' ...]
	dependentProps, // {}; Some prop attributes that trigger events depend on
	dependentStates, //{}; Some state attributes that trigger events depend on
	selector, // string; The id of the selector that needs to be matched (the selector that triggers the event) such as'#demo' or the unique class name'.demo' tag'div', etc. If there are more than one, choose the first one
	eventName, // string; The name of the event triggered by the native launch
	eventArgs, // []; type array  Native trigger event parameters (incoming event parameters) if
	propFuncArgs, // type array
	afterTest,
	act = false,
	hasTimeout = false,
	selectorIndex = 0
}) {

	describe(title, () => {
		const mocEvent = jest.fn();
		const prop = { [propFuncName]: (...args) => mocEvent(...args) };

		let eventSelect
		beforeEach(async () => {

			if (!wrapper) {
				wrapper = mount(<Component {...dependentProps} {...prop} />);
			}
			if (dependentStates) {
				wrapper.setState(dependentStates);
			}
			if (act) {
				await actWait();
			}
			eventSelect = wrapper.instance().querySelectorAll(selector)[selectorIndex];
			mocEvent.mockClear();
		});

		it(`${title}should call ${propFuncName}`, async () => {
			expect(eventSelect).toBeDefined();
			if (hasTimeout) {
				jest.useFakeTimers();
			}

			expect(mocEvent).not.toHaveBeenCalled();
			eventArgs = eventArgs ?? [];
			fireEvent[eventName](eventSelect, ...eventArgs)
			if (hasTimeout) {
				jest.runAllTimers();
			}

			// eventSelect.update()
			if (act) {
				await actWait();
			}
			expect(mocEvent).toHaveBeenCalled();
			if (propFuncArgs) {
				propFuncArgs.forEach((item, index) => {
					if (item !== 'mockEvent') {
						if (item instanceof Array) {
							item.forEach((im, i) => {
								expect(mocEvent.mock.calls[0][index][i]).toBe(im)
							})
						} else if (item.constructor === Object) {
							expect(Object.values(mocEvent.mock.calls[0][index]).includes(Object.values(item)[0])).toBeTruthy();
						} else {
							expect(mocEvent.mock.calls[0][index]).toBe(item)
						}
					}
				})
			}
			if (afterTest) {
				afterTest(mocEvent, wrapper)
			}
		})
	})
}
