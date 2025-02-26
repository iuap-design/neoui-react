import {act} from 'react-dom/test-utils';
import {
	testCustomeText,
	testMultiLang,
	attrsTest,
	attrsTestByLength,
	testChildren,
	testCustomStyle,
	testPropClassName,
	testPropId,
	testRootDomClsPrefix,
    testPropFieldid,
	testStyle
} from "./attrsTest";
import eventsTest from "./eventTest";
import newEventsTest from "./newEventTest";
import focusTest from "./focusTest";
import mountTest from "./mountTest";
import mouseenterTest from "./mouseenterTest";
import refTest from "./refTest";
import {actWait} from "./utils";

const globalTimeout = global.setTimeout;

const sleep = async (timeout = 0) => {
	await act(async () => {
		await new Promise(resolve => globalTimeout(resolve, timeout));
	});
};

function keyEvent(el, type, keyCode, bubbles, altKey, ctrlKey, shiftKey) {
	el.focus()
	const KeyboardEventInit = {
		keyCode: keyCode, bubbles: bubbles, altKey: altKey, ctrlKey:ctrlKey, shiftKey: shiftKey
	}
	const evtObj = new KeyboardEvent(type, KeyboardEventInit)
	evtObj.stop = evtObj.stopPropagation
	el.dispatchEvent(evtObj)
}

export {
	mountTest,
	testCustomeText,
	testMultiLang,
	attrsTest,
	attrsTestByLength,
	testRootDomClsPrefix,
    testPropFieldid,
	testPropClassName,
	testStyle,
	testCustomStyle,
	testChildren,
	testPropId,
	focusTest,
	sleep,
	actWait,
	eventsTest,
	refTest,
	mouseenterTest,
	keyEvent,
	newEventsTest
}
