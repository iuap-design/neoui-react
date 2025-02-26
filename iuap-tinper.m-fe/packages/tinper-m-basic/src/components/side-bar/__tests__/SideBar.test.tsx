/** SideBar.tsx */
import Reac from 'react'
import { mount } from '@tests/mount'
import { SideBar, Badge } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';

const prefixSideBar = `${muiPrefix}-side-bar`;
const prefixBage = `${muiPrefix}-badge`;
const tabs = [
    {
        key: 'key1',
        title: '选项一',
        badge: Badge.dot,
    },
    {
        key: 'key2',
        title: '选项二',
        badge: '5',
    },
    {
        key: 'key3',
        title: '选项三',
        badge: '99+',
        disabled: true,
    },
]

describe('SideBar test', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(
            <SideBar>
                {tabs.map(item => (
                    <SideBar.Item key={item.key} title={item.title} />
                ))}
            </SideBar>
        );
    })
    it('activeKey, <test prop:: activeKey>', () => {
        const wrapper1 = mount(
            <SideBar activeKey="key2">
                {tabs.map(item => (
                    <SideBar.Item key={item.key} title={item.title} />
                ))}
            </SideBar>
        )
        expect(wrapper.find(`.${prefixSideBar}-item`).at(0).hasClass(`${prefixSideBar}-item-active`)).toEqual(true);
        expect(wrapper.find(`.${prefixSideBar}-item`).at(1).hasClass(`${prefixSideBar}-item-active`)).toEqual(false);

        expect(wrapper1.find(`.${prefixSideBar}-item`).at(0).hasClass(`${prefixSideBar}-item-active`)).toEqual(false);
        expect(wrapper1.find(`.${prefixSideBar}-item`).at(1).hasClass(`${prefixSideBar}-item-active`)).toEqual(true);
        wrapper1.unmount();
    });
    it('defaultActiveKey, <test prop:: defaultActiveKey>, <test prop:: children>', () => {
        const wrapper1 = mount(
            <SideBar defaultActiveKey="key2">
                {tabs.map(item => (
                    <SideBar.Item key={item.key} title={item.title} />
                ))}
            </SideBar>
        )
        expect(wrapper.find(`.${prefixSideBar}-item`).at(0).hasClass(`${prefixSideBar}-item-active`)).toEqual(true);
        expect(wrapper.find(`.${prefixSideBar}-item`).at(1).hasClass(`${prefixSideBar}-item-active`)).toEqual(false);

        expect(wrapper1.find(`.${prefixSideBar}-item`).at(0).hasClass(`${prefixSideBar}-item-active`)).toEqual(false);
        expect(wrapper1.find(`.${prefixSideBar}-item`).at(1).hasClass(`${prefixSideBar}-item-active`)).toEqual(true);
        wrapper1.unmount();
    });
    it('className, <test prop:: className>', () => {
        const wrapper1 = mount(
            <SideBar className="classtest">
                {tabs.map(item => (
                    <SideBar.Item key={item.key} title={item.title} />
                ))}
            </SideBar>
        );
        expect(wrapper1.find(`.${prefixSideBar}`).hasClass(`classtest`)).toEqual(true);
        wrapper1.unmount();
    });
    it('fieldid, <test prop:: fieldid>', () => {
        const wrapper1 = mount(
            <SideBar fieldid="fieldidtest">
                {tabs.map(item => (
                    <SideBar.Item key={item.key} title={item.title} />
                ))}
            </SideBar>
        );
        expect(wrapper1.find(`.${prefixSideBar}`).prop('fieldid')).toEqual('fieldidtest_side_bar');
        expect(wrapper1.find(`.${prefixSideBar}-items`).prop('fieldid')).toEqual('fieldidtest_side_bar_items');
        expect(wrapper1.find(`.${prefixSideBar}-item`).at(0).prop('fieldid')).toEqual('fieldidtest_side_bar_item_0');
        expect(wrapper1.find(`.${prefixSideBar}-item`).at(1).prop('fieldid')).toEqual('fieldidtest_side_bar_item_1');
        expect(wrapper1.find(`.${prefixSideBar}-item`).at(2).prop('fieldid')).toEqual('fieldidtest_side_bar_item_2');
        expect(wrapper1.find(`.${prefixBage}-wrapper`).prop('fieldid')).toEqual('fieldidtest_side_bar_badge');
        wrapper1.unmount();
    });
    it('style, <test prop:: style>', () => {
        const wrapper1 = mount(
            <SideBar style={{ color: 'red' }}>
                {tabs.map(item => (
                    <SideBar.Item key={item.key} title={item.title} />
                ))}
            </SideBar>
        );
        expect(wrapper1.find(`.${prefixSideBar}`).prop('style').color).toEqual('red');
    });
    it('clsPrefix, <test prop:: clsPrefix>', () => {
        const wrapper1 = mount(
            <SideBar clsPrefix='clstest'>
                {tabs.map(item => (
                    <SideBar.Item key={item.key} title={item.title} />
                ))}
            </SideBar>
        );
        expect(wrapper1.hasClass('clstest')).toEqual(true);
        expect(wrapper1.hasClass(`${prefixSideBar}`)).toEqual(false);
        expect(wrapper.hasClass(`${prefixSideBar}`)).toEqual(true);
        wrapper1.unmount();
    });
    it('onChange, <test prop:: onChange>', () => {
        const onChange = jest.fn();
        const wrapper1 = mount(
            <SideBar onChange={onChange}>
                {tabs.map(item => (
                    <SideBar.Item key={item.key} title={item.title} />
                ))}
            </SideBar>
        );
        expect(wrapper1.find(`.${prefixSideBar}-item`).at(0).hasClass(`${prefixSideBar}-item-active`)).toEqual(true);
        expect(wrapper1.find(`.${prefixSideBar}-item`).at(1).hasClass(`${prefixSideBar}-item-active`)).toEqual(false);
        wrapper1.find(`.${prefixSideBar}-item`).at(1).simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toBe('key2');
        expect(wrapper1.find(`.${prefixSideBar}-item`).at(0).hasClass(`${prefixSideBar}-item-active`)).toEqual(false);
        expect(wrapper1.find(`.${prefixSideBar}-item`).at(1).hasClass(`${prefixSideBar}-item-active`)).toEqual(true);
        wrapper1.unmount();
    });
});
