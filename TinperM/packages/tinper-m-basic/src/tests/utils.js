import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react'

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise(resolve => globalTimeout(resolve, timeout));
  });
};

export const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

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

export const mockDrag = async (el, options, time) => {
  const [downOptions, ...moveOptions] = options
  fireEvent.mouseDown(el, {
    buttons: 1,
    ...downOptions,
  })
  for (const item of moveOptions) {
    fireEvent.mouseMove(el, {
      buttons: 1,
      ...item,
    })

    if (time) {
      await sleep(time)
    }
  }
  fireEvent.mouseUp(el)
}
