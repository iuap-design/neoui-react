/** TabPane.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { TabPane } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixTabPane = `${muiPrefix}-tabpane`;

describe('Tabs test', () => {
    let wrapper;
    it('className test, <test prop:: className>', () => {
        wrapper = mount(<TabPane className="class-test" />);
        expect(wrapper.find(`.${prefixTabPane}`).hasClass('class-test')).toEqual(true);
    });
    it('style test, <test prop:: style>', () => {
        wrapper = mount(<TabPane style={{ color: 'red' }} />);
        expect(wrapper.find(`.${prefixTabPane}`).prop('style').color).toEqual('red');
    });
    it('minHeight test, <test prop:: minHeight>', () => {
        wrapper = mount(<TabPane minHeight="20px" />);
        expect(wrapper.find(`.${prefixTabPane}`).prop('style').minHeight).toEqual('20px');
    });
    it('width test, <test prop:: width>', () => {
        wrapper = mount(<TabPane width="30px" />);
        expect(wrapper.find(`.${prefixTabPane}`).prop('style').width).toEqual('30px');
    });
    it('backgroundColor test, <test prop:: backgroundColor>', () => {
        wrapper = mount(<TabPane backgroundColor="blue" />);
        expect(wrapper.find(`.${prefixTabPane}`).prop('style').backgroundColor).toEqual('blue');
    });
    it('marginBottom test, <test prop:: marginBottom>', () => {
        wrapper = mount(<TabPane marginBottom="10px" />);
        expect(wrapper.find(`.${prefixTabPane}`).prop('style').marginBottom).toEqual('10px');
    });
    it('fieldid test, <test prop:: fieldid>', () => {
        wrapper = mount(<TabPane fieldid="fieldid-test" />);
        expect(wrapper.find(`.${prefixTabPane}`).prop('fieldid')).toEqual('fieldid-test_tabpane');
    });
    it('clsPrefix test, <test prop:: clsPrefix>', () => {
        wrapper = mount(<TabPane clsPrefix="clsPrefix-test" />);
        expect(wrapper.exists(`.${prefixTabPane}`)).toEqual(false);
        expect(wrapper.exists('.clsPrefix-test-tabpane')).toEqual(true);
    });
    it('children test, <test prop:: children>', () => {
        wrapper = mount(<TabPane children="children-test" />);
        expect(wrapper.find(`.${prefixTabPane}`).instance().innerHTML).toEqual("children-test");
    });
})