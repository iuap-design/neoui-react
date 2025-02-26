/** BackTop.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {act} from 'react-dom/test-utils';
import {prefix} from '../../wui-core/src/updatePrefix';
import BackTop from '../src/index';

const prefixBackTop = `${prefix}-back-top`;

const globalTimeout = global.setTimeout;
const sleep = async(timeout = 0) => {
    await act(async() => {
        await new Promise(resolve => globalTimeout(resolve, timeout));
    });
};

describe('BackTop', () => {

    it('should scroll to top after click it,<test prop:: visibilityHeight>', async() => {
        const wrapper = mount(<BackTop visibilityHeight={-1}/>);
        const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
            window.scrollY = y;
            window.pageYOffset = y;
            document.documentElement.scrollTop = y;
        });

        window.scrollTo(0, 400);
        expect(document.documentElement.scrollTop).toBe(400);
        wrapper.find(`.${prefixBackTop}`).simulate('click');
        await sleep(600);
        expect(document.documentElement.scrollTop).toBe(0);
        scrollToSpy.mockRestore();
    })

    it('support click,<test prop:: click>', async() => {
        const Click = jest.fn();
        const wrapper = mount(<BackTop click={Click} visibilityHeight={-1}/>);
        const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
            window.scrollY = y;
            window.pageYOffset = y;
            document.documentElement.scrollTop = y;
        });
        window.scrollTo(0, 400);
        wrapper.find(`.${prefixBackTop}`).simulate('click');
        await sleep(600);
        expect(document.documentElement.scrollTop).toBe(0);
        expect(Click).toHaveBeenCalled();
        scrollToSpy.mockRestore();
    });

    it('invalid target,<test prop:: target>', async() => {
        const wrapper = mount(
            <BackTop target={() => ({documentElement: {}})}/>,
        );
        wrapper.find(`.${prefixBackTop}`).simulate('click');
        expect(document.documentElement.scrollTop).toBe(0);
    });

    it('invalid character,<test prop:: character>', async() => {
        const wrapper = mount(
            <BackTop visibilityHeight={0} character="up"/>,
        );
        expect(wrapper.find(`.${prefixBackTop}`).text()).toBe("up");
    });
})
