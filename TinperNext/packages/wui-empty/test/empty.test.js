/** Empty.tsx */
import React from 'react';
import { testCustomStyle, testCustomeText, attrsTest } from '../../../next-ui-library/test/common/index';
import { prefix } from '../../wui-core/src/updatePrefix'
import Empty from '../src/Empty'
import { mount } from '../../../next-ui-library/test/common/mount'

const prefixEmpty = `${prefix}-empty`;

describe('component: Empty', () => {
    it('Empty should be description description-of-customize, <test prop:: description>', () => {
        const empty = mount(<Empty />)
        empty.setProps({ description: <span>description-of-customize</span> })
        expect(empty.find(`.${prefixEmpty}-description`).find('span').text()).toEqual('description-of-customize');
    });
    it('Empty should have this image, <test prop:: image>', () => {
        const empty = mount(<Empty />)
        empty.setProps({ image: "https://img0.baidu.com/it/u=4142543606,1747378043&fm=26&fmt=auto&gp=0.jpg" })
        expect(empty.find(`.${prefixEmpty}-image`).find('img').prop('src')).toEqual('https://img0.baidu.com/it/u=4142543606,1747378043&fm=26&fmt=auto&gp=0.jpg');
    });
})

// 增加全局配置多语功能
describe('locale && image test, <test prop:: locale>, <test prop:: image>', () => {
    Object.entries({
        'not-found': '404', 'no-visualize-data': '暂时没有数据哦~', 'no-collect': '暂时没有收藏哦~', 'no-data': '暂时没有数据哦~',
        'no-search': '暂时没有搜索哦~', 'no-network': '暂时没有网络哦~', 'no-data-easy': '暂时没有数据哦~'
    }).forEach(item => {
        testCustomeText({
            title: 'Comment: Empty',
            Component: Empty,
            attrs: {
                locale: 'zh-cn',
                image: item[0]
            },
            selector: `.${prefixEmpty}-description`,
            text: item[1]
        })
    });
    Object.entries({
        'not-found': '404', 'no-visualize-data': 'No data for now', 'no-collect': 'No collection for now', 'no-data': 'No data for now',
        'no-search': 'No search for now', 'no-network': 'No network for now', 'no-data-easy': 'No data for now'
    }).forEach(item => {
        testCustomeText({
            title: 'Comment: Empty',
            Component: Empty,
            attrs: {
                locale: 'en-us',
                image: item[0]
            },
            selector: `.${prefixEmpty}-description`,
            text: item[1]
        })
    });
    Object.entries({
        'not-found': '404', 'no-visualize-data': '暫時沒有數據哦~', 'no-collect': '暫時沒有收藏哦~', 'no-data': '暫時沒有數據哦~',
        'no-search': '暫時沒有蒐索哦~', 'no-network': '暫時沒有網絡哦~', 'no-data-easy': '暫時沒有數據哦~'
    }).forEach(item => {
        testCustomeText({
            title: 'Comment: Empty',
            Component: Empty,
            attrs: {
                locale: 'zh-tw',
                image: item[0]
            },
            selector: `.${prefixEmpty}-description`,
            text: item[1]
        })
    });
    Object.entries({
        'not-found': '404', 'no-visualize-data': 'Không có dữ liệu', 'no-collect': 'Không có bộ sưu tập', 'no-data': 'Không có dữ liệu',
        'no-search': 'Không có tìm kiếm', 'no-network': 'Không có mạng', 'no-data-easy': 'Không có dữ liệu'
    }).forEach(item => {
        testCustomeText({
            title: 'Comment: Empty',
            Component: Empty,
            attrs: {
                locale: 'vi-vn',
                image: item[0]
            },
            selector: `.${prefixEmpty}-description`,
            text: item[1]
        })
    })
})

testCustomStyle({
    title: 'component: Empty, <test prop:: imageStyle>',
    Component: Empty,
    attrs: {
        imageStyle: { height: 60 }
    },
    selector: `.${prefixEmpty}-image`,
    verifyStyle: { height: '60px' }
});
attrsTest({
    title: 'component: Empty, <test prop:: image>',
    Component: Empty,
    attrs: {
        image: 'no-data-easy'
    },
    selector: `.${prefixEmpty}`,
    classnames: [`${prefixEmpty}-easy`]
});

describe('fieldid, <test prop:: fieldid>', () => {
    it('@fieldid,"***_empty_img"', () => {
        const wrapper = mount(<Empty image="https://img0.baidu.com/it/u=4142543606,1747378043&fm=26&fmt=auto&gp=0.jpg" />);
        expect(wrapper.find(`.${prefixEmpty}-image`).find('img').prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixEmpty}-image`).find('img').prop('fieldid')).toEqual('fieldid-id_empty_img');
    })
    it('@fieldid,"***_empty"', () => {
        const wrapper = mount(<Empty />);
        expect(wrapper.find(`.${prefixEmpty}`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixEmpty}`).prop('fieldid')).toEqual('fieldid-id_empty');
    })
    it('@fieldid,"***_empty_data"', () => {
        const wrapper = mount(<Empty />);
        expect(wrapper.find(`.${prefixEmpty}-description`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixEmpty}-description`).prop('fieldid')).toEqual('fieldid-id_empty_data');
    })
    it('@fieldid,"***_empty_footer"', () => {
        const wrapper = mount(<Empty> children </Empty>);
        expect(wrapper.find(`.${prefixEmpty}-footer`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixEmpty}-footer`).prop('fieldid')).toEqual('fieldid-id_empty_footer');
    })
})