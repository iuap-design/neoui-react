import {act} from 'react-dom/test-utils';

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0) => {
	await act(async () => {
		await new Promise(resolve => globalTimeout(resolve, timeout));
	});
};

export const wait = (amount = 0) => {
	return new Promise(resolve => setTimeout(resolve, amount));
}

// Use this in your test after mounting if you need just need to let the query finish without updating the wrapper
export const actWait = async (amount = 0) => {
	await act(async () => {
		await wait(amount);
	});
}

// Use this in your test after mounting if you want the query to finish and update the wrapper
export const updateWrapper = async (wrapper, amount = 0) => {
	await act(async () => {
		await wait(amount);
		wrapper.update();
	});
}
