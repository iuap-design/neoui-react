/** Pagination.tsx */
import { mount, ReactWrapper } from '../../../next-ui-library/test/common/mount'
import React from 'react';
import { attrsTest, attrsTestByLength, eventsTest, testCustomeText } from "../../../next-ui-library/test/common/index"
import { prefix } from '../../wui-core/src/updatePrefix';
import KeyCode from 'rc-util/lib/KeyCode';
import Pagination from '../src/index';
import Icon from '../../wui-icon/src/index';
import Button from "../../wui-button/src";

const prefixPagination = `${prefix}-pagination`;

describe('Pagination test', () => {
    let pagination;
    beforeEach(async () => {
        pagination = mount(
            <Pagination />
        );
    })
    afterEach(async () => {
        if (pagination && pagination.length) {
            pagination.unmount();
        }
    })
    it('component: Pagination, <test prop:: total>Pagination total', () => {
        pagination.setProps({
            total: 12
        })
        expect(pagination.find(`.${prefixPagination}-total`).text()).toEqual('共12条');
    })
    it('component: Pagination, <test prop:: prev>previous button should be exist', () => {
        pagination.setProps({
            items: 10,
            activePage: 2,
            prev: true
        })
        expect(pagination.find('ul').find('li').at(1).hasClass(`${prefixPagination}-prev`)).toEqual(true);
    })
    it('component: Pagination, <test prop:: pageSize>, <test prop:: total>, <test prop:: prev>page counts should be 5', () => {
        // let pagination = mount(<Pagination boundaryLinks pageSize={20} total={98} activePage={2} maxButtons={5} />);
        pagination.setProps({
            total: 20,
            pageSize: 4,
            prev: false,
            next: false,
            first: false,
            last: false
        })
        expect(pagination.find('ul li').last().find('a').text()).toEqual('5');
    })
    it('component: Pagination, <test prop:: showTitle> title should be 1', () => {
        pagination.setProps({
            total: 20,
            pageSize: 4,
            prev: false,
            next: false,
            first: false,
            last: false,
            showTitle: true,
        })
        expect(pagination.find('ul li').first().props().title).toEqual('1');
    })
})
describe('Pagination test', () => {
    it('component: Pagination, <test prop:: items>, <test prop:: total>Pagination length', () => {
        const pagination = mount(<Pagination pageSize={20} total={98} />);
        expect(pagination.find('ul').find('li').length).toEqual(9);
    })
    it('component: Pagination, <test prop:: activePage>active page', () => {
        let pagination = mount(<Pagination pageSize={20} total={98} activePage={2} />);
        expect(pagination.find('ul').find('li').at(3).hasClass('active')).toEqual(true);
    })
    it('component: Pagination, <test prop:: next>next button should be exist', () => {
        let pagination = mount(<Pagination prev next pageSize={20} total={98} activePage={2} />);
        expect(pagination.find('ul').find('li').at(7).hasClass(`${prefixPagination}-next`)).toEqual(true);
    })
    it('component: Pagination, <test prop:: first>component: Pagination, <test prop:: prev>first button should be exist', () => {
        let pagination = mount(<Pagination first prev next pageSize={20} total={98} activePage={2} />);
        expect(pagination.find('ul').find('li').at(0).hasClass(`${prefixPagination}-first`)).toEqual(true);
    })
    it('component: Pagination, <test prop:: last>last button should be exist', () => {
        let pagination = mount(<Pagination first prev next last pageSize={20} total={98} activePage={2} />);
        expect(pagination.find('ul').find('li').last().hasClass(`${prefixPagination}-last`)).toEqual(true);
    })
    it('component: Pagination, <test prop:: defaultPageSize>, <test prop:: total>, <test prop:: prev>page counts should be 5', () => {
        let pagination = mount(<Pagination defaultPageSize={6} total={50} last={false} next={false} />);
        expect(pagination.find('ul li').last().find('a').text()).toEqual('9');
    })
    it('component: Pagination, <test prop:: defaultPageSize>, <test prop:: pageSize>', () => {
        // 分页未设置pagesize 属性，需默认渲染defaltePagesize
        let pagination = mount(<Pagination defaultPageSize={5} total={50} last={false} next={false} />);
        expect(pagination.find('ul li').last().find('a').text()).toEqual('10');

        let pagination1 = mount(<Pagination pageSize={6} total={50} last={false} next={false} />);
        expect(pagination1.find('ul li').last().find('a').text()).toEqual('9');

        let pagination2 = mount(<Pagination pageSize={6} defaultPageSize={5} total={50} last={false} next={false} />);
        expect(pagination2.find('ul li').last().find('a').text()).toEqual('9');
    })
    it('component: Pagination, <test prop:: pageSize>, <test prop:: total>', () => {
        // 分页total 和pagesize 属性同时发生变化，保证页码个数渲染正确
        let pagination = mount(<Pagination pageSize={6} total={50} last={false} next={false} />);
        expect(pagination.find('ul li').last().find('a').text()).toEqual('9');
        pagination.setProps({
            pageSize: 5,
            total: 100,
            last: false,
            next: false
        });
        expect(pagination.find('ul li').last().find('a').text()).toEqual('20');
    })
    it('component: Pagination, <test prop:: pageSizeInput>', () => {
        let pagination = mount(<Pagination pageSizeInput={true} pageSizeOptions={["10", "20", "30", "50", "80"]}
            defaultPageSize={20} showSizeChanger={true} total={300} last={false}
            next={false} />);
        expect(pagination.find(`.${prefix}-select-selection-search-input`).props().value).toBe('20');
        pagination.find(`.${prefix}-select-selection-search-input`).simulate('click'); // 修复了选择和失焦触发两次回调的bug后，只有点击输入框后再失焦才会改变页数
        pagination.find(`.${prefix}-select-selection-search-input`).simulate('change', { target: { value: '5' } });
        pagination.find(`.${prefix}-select-selection-search-input`).simulate('blur');
        expect(pagination.find(`ul li`).last().find('a').text()).toBe('60');
        pagination.find(`.${prefix}-select-selection-search-input`).simulate('click');
        pagination.find(`.${prefix}-select-selection-search-input`).simulate('change', { target: { value: '81' } });
        pagination.find(`.${prefix}-select-selection-search-input`).simulate('blur');
        expect(pagination.find(`ul li`).last().find('a').text()).toBe('4');

        pagination.setProps({ pageSizeInput: { max: 2 } })
        pagination.update()
        pagination.find(`.${prefix}-select-selection-search-input`).simulate('click');
        pagination.find(`.${prefix}-select-selection-search-input`).simulate('change', { target: { value: '10' } });
        pagination.find(`.${prefix}-select-selection-search-input`).simulate('blur');
        expect(pagination.find(`ul li`).last().find('a').text()).toBe('150');
    })
    it('component: Pagination, <test prop:: maxButton>', () => {
        let wrapper = mount(<Pagination total={100} pageSize={10} />)
        wrapper.setProps({ maxButtons: 5 })
        expect(wrapper.find('li').at(2).prop('title')).toEqual('1')
        expect(wrapper.find('li').at(6).prop('title')).toEqual('5')
        expect(wrapper.find('li').at(7).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)

        wrapper.find('input').simulate('change', { target: { 'value': '5' } })
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('li').at(2).prop('title')).toEqual('1')
        expect(wrapper.find('li').at(3).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)
        expect(wrapper.find('li').at(4).prop('title')).toEqual('3')
        expect(wrapper.find('li').at(8).prop('title')).toEqual('7')
        expect(wrapper.find('li').at(9).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)

        wrapper.find('input').simulate('change', { target: { 'value': '10' } })
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('li').at(3).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)
        expect(wrapper.find('li').at(4).prop('title')).toEqual('6')
        expect(wrapper.find('li').at(8).prop('title')).toEqual('10')
    })
    it('ENTER key test', () => {
        let wrapper = mount(<Pagination total={100} pageSize={10} />)
        expect(wrapper.find('.active').prop('title')).toEqual('1')
        wrapper.find('input').simulate('change', { target: { 'value': '5' } })
        expect(wrapper.find('.active').prop('title')).toEqual('1')
        wrapper.find('input').simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        expect(wrapper.find('.active').prop('title')).toEqual('5')
    })
    it('component: Pagination, <test prop:: itemRender>', () => {
        let wrapper = mount(<Pagination total={100} />)
        expect(wrapper.find('.active').exists('span')).toEqual(false)
        wrapper.setProps({ itemRender: (eventKey, type, ComponentWrap) => { return <span key={eventKey}>{ComponentWrap}</span> } })
        expect(wrapper.find('.active').exists('span')).toEqual(true)
    })
    it('jump page test', () => {
        let wrapper = mount(<Pagination total={100} pageSize={10} />)
        wrapper.find('input').simulate('change', { target: { 'value': '3' } })
        wrapper.find('input').simulate('blur')
        expect(wrapper.find(`.${prefixPagination}-list`).find('.active').prop('title')).toEqual('3')

        wrapper.find('input').simulate('change', { target: { 'value': '-1' } })
        wrapper.find('input').simulate('blur')
        expect(wrapper.find(`.${prefixPagination}-list`).find('.active').prop('title')).toEqual('3')

        wrapper.find('input').simulate('change', { target: { 'value': '20' } })
        wrapper.find('input').simulate('blur')
        expect(wrapper.find(`.${prefixPagination}-list`).find('.active').prop('title')).toEqual('3')

        wrapper.find('input').simulate('change', { target: { 'value': '#' } })
        wrapper.find('input').simulate('blur')
        expect(wrapper.find(`.${prefixPagination}-list`).find('.active').prop('title')).toEqual('3')
    })
    it('maxButtons test, <test prop:: maxButtons>', () => {
        const wrapper = mount(<Pagination total={100} pageSize={10} />)
        wrapper.setProps({ maxButtons: 5, activePage: 1 })
        expect(wrapper.find('ul').find('li').at(7).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)
        wrapper.setProps({ activePage: 3 })
        expect(wrapper.find('ul').find('li').at(7).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)
        wrapper.setProps({ activePage: 4 })
        expect(wrapper.find('ul').find('li').at(8).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)
        wrapper.setProps({ activePage: 5 })
        expect(wrapper.find('ul').find('li').at(3).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)
        expect(wrapper.find('ul').find('li').at(9).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)
        wrapper.setProps({ activePage: 7 })
        expect(wrapper.find('ul').find('li').at(3).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)
        expect(wrapper.find('ul').find('li').at(4).prop('title')).toEqual('5')
        wrapper.setProps({ activePage: 8 })
        expect(wrapper.find('ul').find('li').at(3).hasClass(`${prefixPagination}-item-ellipsis`)).toEqual(true)
        expect(wrapper.find('ul').find('li').at(4).prop('title')).toEqual('6')

        wrapper.setProps({ maxButtons: false })
        expect(wrapper.exists(`.${prefixPagination}-item-ellipsis`)).toEqual(false)
    })
    // 增加页码选择框配置属性
    it('sizeChangerProps test, <test prop:: sizeChangerProps>', () => {
        let wrapper = mount(
            <Pagination
                showSizeChanger fieldid="root-fieldid" id="root-id" pageSizeOptions={["10", "20", "30", "50", "80"]} total={300}
                sizeChangerProps={{
                    dropdownClassName: 'dropdown-className', dropdownStyle: { color: 'red' }, fieldid: 'changer-fieldid', id: 'changer-id',
                    listHeight: 90, placement: 'topLeft', suffixIcon: <Icon type="uf-dongjie" />
                }}
            />
        );
        expect(wrapper.find(`.${prefix}-select-arrow`).find('i').hasClass('uf-dongjie')).toEqual(true);
        expect(wrapper.find(`.${prefix}-select-arrow`).find('i').hasClass('uf-arrow-down')).toEqual(false);
        wrapper.find(`.${prefix}-select`).simulate('click');
        expect(document.getElementsByClassName('wui-select-dropdown')[0].getAttribute('class').includes('dropdown-className')).toEqual(true);
        expect(document.getElementsByClassName('wui-select-dropdown')[0].getAttribute('style').includes('color: red')).toEqual(true);
        expect(document.getElementsByClassName('rc-virtual-list-holder')[0].getAttribute('style').includes("max-height: 90px")).toEqual(true);
        expect(wrapper.find(`.${prefix}-select`).prop('fieldid')).toEqual('changer-fieldid');
        expect(document.getElementsByClassName('rc-virtual-list-holder-inner')[0].getElementsByClassName(`${prefix}-select-item`)[0].getAttribute('fieldid')).toEqual('changer-fieldid_option_0');
        expect(document.getElementsByClassName('rc-virtual-list-holder-inner')[0].getElementsByClassName(`${prefix}-select-item`)[2].getAttribute('fieldid')).toEqual('changer-fieldid_option_2');
        expect(document.getElementsByClassName('rc-virtual-list-holder-inner')[0].getElementsByClassName(`${prefix}-select-item`)[0].getAttribute('id')).toEqual('changer-id_option_0');
        expect(document.getElementsByClassName('rc-virtual-list-holder-inner')[0].getElementsByClassName(`${prefix}-select-item`)[2].getAttribute('id')).toEqual('changer-id_option_2');
        wrapper.unmount();

        // 不设置 sizeChangerProps 时的状态
        wrapper = mount(<Pagination showSizeChanger fieldid="root-fieldid" id="root-id" pageSizeOptions={["10", "20", "30", "50", "80"]} total={300} />)
        expect(wrapper.find(`.${prefix}-select`).hasClass(`${prefix}-select-border-none`)).toEqual(false);
        expect(wrapper.find(`.${prefix}-select-arrow`).find('i').hasClass('uf-arrow-down')).toEqual(true);
        wrapper.find(`.${prefix}-select`).simulate('click');
        expect(document.getElementsByClassName('wui-select-dropdown')[0].getAttribute('class').includes('dropdown-className')).toEqual(false);
        expect(wrapper.find(`.${prefix}-select`).prop('fieldid')).toEqual('root-fieldid-size-changer');
        expect(document.getElementsByClassName('rc-virtual-list-holder-inner')[0].getElementsByClassName(`${prefix}-select-item`)[0].getAttribute('fieldid')).toEqual('root-fieldid-size-changer_option_0');
        expect(document.getElementsByClassName('rc-virtual-list-holder-inner')[0].getElementsByClassName(`${prefix}-select-item`)[1].getAttribute('fieldid')).toEqual('root-fieldid-size-changer_option_1');
        expect(document.getElementsByClassName('rc-virtual-list-holder-inner')[0].getElementsByClassName(`${prefix}-select-item`)[0].getAttribute('id')).toEqual('root-id-size-changer_option_0');
        expect(document.getElementsByClassName('rc-virtual-list-holder-inner')[0].getElementsByClassName(`${prefix}-select-item`)[1].getAttribute('id')).toEqual('root-id-size-changer_option_1');
        wrapper.unmount();

    });
    // DEVOPS-44400 兼容simple模式下未设置pageSize导致渲染问题
    it('page should not be NaN', () => {
        let wrapper = mount(<Pagination simple total={100} />);
        expect(wrapper.find('.page_jump').find('span').text()).toEqual("/ 10");
    })

    // 补充props单测
    it('component: Pagination, <test prop:: dataNum>, <test prop:: total>, <test prop:: boundaryLinks>, page counts should be 5', () => {
        let pagination = mount(<Pagination boundaryLinks dataNum={1} total={98} />);
        pagination.find('.uf-2arrow-right').simulate('click')
        expect(pagination.find('ul li.active').last().find('a').text()).toEqual('5');
    })
    it('component: Pagination, <test prop::  defaultActivePage> default active page should be 5', () => {
        let pagination = mount(<Pagination defaultActivePage={3} pageSize={20} total={98} />);
        expect(pagination.find('ul li.active').last().find('a').text()).toEqual('3');
    })
    it('component: Pagination, <test prop::  defaultCurrent>, default current page should be 5', () => {
        let pagination = mount(<Pagination defaultCurrent={3} pageSize={20} total={98} />);
        expect(pagination.find('ul li.active').last().find('a').text()).toEqual('3');
    })
    it('component: Pagination, <test prop:: current> current should be right', () => {
        let pagination = mount(<Pagination pageSize={20} total={98} current={2} />);
        expect(pagination.find('ul').find('li').at(3).hasClass('active')).toEqual(true);
    })
    it('component: Pagination, <test prop:: dataNumSelect> 已废弃不生效', () => {
        let pagination = mount(<Pagination dataNumSelect={['10', '20', '50', '100']} total={100} />);
        // expect(pagination.find('Pagination').props().pageSizeOptions).toEqual([10, 20, 30, 50, 100, 200, 500, 1000])
    })
    it('component: Pagination, <test prop:: defaultDataNum>, <test prop:: onDataNumSelect> onDataNumSelect should be right', () => {
        const mockEvent = jest.fn()
        let pagination = mount(<Pagination showSizeChanger defaultDataNum={2} onDataNumSelect={mockEvent} total={100} />);
        expect(pagination.find(`.${prefix}-select-selection-item`).text()).toEqual('30');
        pagination.find(`.${prefix}-select`).simulate('click');
        pagination.find(`.${prefix}-select-item-option`).at(1).simulate('click');
        expect(mockEvent).toBeCalledWith(1, 20);
        pagination.unmount();
    })
    it('component: Pagination, <test prop:: onShowSizeChange> onShowSizeChange should be called', () => {
        const mockEvent = jest.fn()
        let pagination = mount(<Pagination showSizeChanger defaultDataNum={2} onDataNumSelect={mockEvent} total={100} />);
        expect(pagination.find(`.${prefix}-select-selection-item`).text()).toEqual('30');
        pagination.find(`.${prefix}-select`).simulate('click');
        pagination.find(`.${prefix}-select-item-option`).at(1).simulate('click');
        expect(mockEvent).toBeCalledWith(1, 20);
        pagination.unmount();
    })
    it('component: Pagination, <test prop:: dropdownAlign> dropdownAlign should be bottomRight', () => {
        const mockEvent = jest.fn()
        let pagination = mount(<Pagination showSizeChanger dropdownAlign='bottomRight' />);
        // expect(pagination.find('Trigger').props().popupAlign).toBe('bottomRight')
        pagination.unmount();
    })
    it('component: Pagination, <test prop:: dropdownAlign>', () => {
        const mockEvent = jest.fn()
        let pagination = mount(<Pagination showSizeChanger showQuickJumper locale='en-US' total={100} />);
        expect(pagination.find(`.${prefixPagination}-total`).at(0).text()).toBe('Total100items')
        expect(pagination.find(`.${prefixPagination}-first`).at(0).props().title).toBe('Go to first page')
        expect(pagination.find(`.${prefixPagination}-prev`).at(0).props().title).toBe('Previous page')
        expect(pagination.find(`.${prefixPagination}-next`).at(0).props().title).toBe('Next page')
        expect(pagination.find(`.${prefixPagination}-last`).at(0).props().title).toBe('Go to last page')
        expect(pagination.find(`.page_jump`).at(0).text()).toBe("GotoPage")
        pagination.unmount();
    })
})
attrsTest({
    title: 'component: Pagination',
    Component: Pagination,
    attrs: {},
    selector: `ul`,
    classnames: [`${prefixPagination}-list`],
});
attrsTest({
    title: 'component: Pagination, <test prop:: noBorder>',
    Component: Pagination,
    attrs: {
        noBorder: true
    },
    selector: `ul`,
    classnames: [`${prefixPagination}-no-border`],
});
attrsTest({
    title: 'component: Pagination, <test prop:: gap>',
    Component: Pagination,
    attrs: {
        items: 10,
        activePage: 2,
        noBorder: false,
        gap: true
    },
    selector: `ul`,
    classnames: [`${prefixPagination}-gap`],
});
['lg', 'sm'].forEach(item => {
    attrsTest({
        title: 'component: Pagination, <test prop:: size>',
        Component: Pagination,
        attrs: {
            items: 10,
            activePage: 2,
            size: item
        },
        selector: `ul`,
        classnames: [`${prefixPagination}-${item}`],
    })
});
testCustomeText({
    title: 'Comment: Pagination, <test prop:: total>',
    Component: Pagination,
    attrs: {
        locale: 'en-us',
        pageSize: 43,
        activePage: 2,
        total: 100,
        last: false,
        next: false
    },
    selector: `.${prefixPagination}-total`,
    text: 'Total100items'
});
testCustomeText({
    title: 'Comment: Pagination, <test prop:: pageSizeOptions>',
    Component: Pagination,
    attrs: {
        pageSizeOptions: ['22', '44'],
        dataNum: 1,
        showSizeChanger: true,
        total: 100,
        last: false,
        next: false
    },
    selector: `.${prefix}-select-selection-item`,
    text: '44'
});
attrsTestByLength({
    title: 'component: Pagination, <test prop:: ellipsis>',
    Component: Pagination,
    attrs: {
        total: 50,
        pageSize: 4,
        prev: false,
        next: false,
        first: false,
        last: false
    },
    selector: `li.${prefixPagination}-item-ellipsis`,
    testAttrArr: [
        {
            nodeCount: 1,
            ellipsis: true
        },
        {
            nodeCount: 0,
            ellipsis: false
        },
    ]
})
attrsTestByLength({
    title: 'component: Pagination, <test prop:: showJump>',
    Component: Pagination,
    attrs: {
        total: 50,
        pageSize: 4,
        prev: false,
        next: false,
        first: false,
        last: false
    },
    selector: `.page_jump`,
    testAttrArr: [
        // {
        //     nodeCount: 0,
        //     showJump: false
        // },
        {
            nodeCount: 1,
            showJump: true
        },
    ]
})
// 这里的测试存在问题， wrapper和实际dom不同， wrapper.debug()和wrapper.instance()不同
describe('showJump', () => {
    it('showJump, <test prop:: showJump>', () => {
        const props = {
            total: 50,
            pageSize: 4,
            prev: false,
            next: false,
            first: false,
            last: false,
            showJump: false
        }
        const wrapper = mount(<Pagination {...props} />);
        expect(wrapper.instance().querySelectorAll(`.page_jump`).length).toEqual(0);
        wrapper.setProps({ showJump: true });
        expect(wrapper.instance().querySelectorAll(`.page_jump`).length).toEqual(1);
    })
})
attrsTestByLength({
    title: 'component: Pagination, <test prop:: showSizeChanger>',
    Component: Pagination,
    attrs: {
        total: 100,
        // pageSize: 4,
        prev: false,
        next: false,
        first: false,
        last: false
    },
    selector: `.data_per_select`,
    testAttrArr: [
        {
            nodeCount: 1,
            showSizeChanger: true
        },
        {
            nodeCount: 0,
            showSizeChanger: false
        },
    ]
})
attrsTestByLength({
    title: 'component: Pagination, <test prop:: buttonComponentClass>',
    Component: Pagination,
    attrs: {
        total: 5,
        pageSize: 10,
        prev: false,
        next: false,
        first: false,
        last: false,
        buttonComponentClass: 'aaa'
    },
    nodeCount: 1,
    selector: `li aaa`
})
attrsTest({
    title: 'component: Pagination, <test prop:: disabled>',
    Component: Pagination,
    attrs: {
        disabled: true
    },
    testAttr: {
        disabled: false
    },
    selector: `.${prefixPagination}`,
    classnames: [`${prefixPagination}-disabled`],
})

attrsTestByLength({
    title: 'component: Pagination, <test prop:: hideOnSinglePage>',
    Component: Pagination,
    attrs: {
        total: 1,
    },
    selector: `.${prefixPagination}`,
    testAttrArr: [
        // {
        //     hideOnSinglePage: true,
        //     nodeCount: 0,
        // },
        {
            hideOnSinglePage: false,
            nodeCount: 1,
        },
    ]
})
describe('hideOnSinglePage', () => {
    it('hideOnSinglePage, <test prop:: hideOnSinglePage>', () => {
        const props = {
            total: 1,
            hideOnSinglePage: false,
        }
        const wrapper = mount(<Pagination {...props} />);
        expect(wrapper.instance().querySelectorAll(`.${prefixPagination}`).length).toEqual(0);
        wrapper.setProps({ hideOnSinglePage: true });
        expect(wrapper.instance()).toEqual(undefined);
    })
})
attrsTestByLength({
    title: 'component: Pagination, <test prop:: simple>',
    Component: Pagination,
    attrs: {},
    selector: `.${prefixPagination}-simple`,
    testAttrArr: [
        {
            simple: true,
            nodeCount: 1,
        },
        {
            simple: false,
            nodeCount: 0,
        },
    ]
})
eventsTest({
    title: 'component: Pagination, <test prop:: onSelect>',
    Component: Pagination,
    propFuncName: 'onSelect',
    dependentProps: {
        total: 100,
        pageSize: 15,
        activePage: 3,
        prev: false,
        next: false,
        first: false,
        last: false
    },
    selector: `.${prefixPagination}-list li a`,
    eventName: 'click',
    eventArgs: [1]
});
eventsTest({
    title: 'component: Pagination, <test prop:: onChange>',
    Component: Pagination,
    propFuncName: 'onChange',
    dependentProps: {
        total: 100,
        pageSize: 15,
        activePage: 3,
        prev: false,
        next: false,
        first: false,
        last: false
    },
    selector: `.${prefixPagination}-list li a`,
    eventName: 'click',
    eventArgs: [1]
});
attrsTestByLength({
    title: 'component: Pagination, <test prop:: confirmBtn>',
    Component: Pagination,
    attrs: {},
    selector: `.page_jump_btn`,
    testAttrArr: [
        {
            confirmBtn: () => 123,
            nodeCount: 1,
        },
    ],
    afterTest: (wrapperD) => {
        expect(wrapperD.find(`.page_jump_btn`).text()).toBe('123')
    }
})

describe('fieldid', () => {
    ['prev', 'next', 'first', 'last'].forEach((item) => {
        it('fieldid, <test prop:: fieldid>', () => {
            const wrapper = mount(
                <Pagination showSizeChanger total={300} defaultPageSize={20}
                    pageSizeOptions={["10", "20", "30", "50", "80"]}
                    confirmBtn={() => { return <Button className="confirm-btn" size={"small"} bordered /> }}
                />);
            expect(wrapper.find(`.${prefixPagination}-${item}`).find('a').prop('fieldid')).toEqual(undefined);
            expect(wrapper.find(`.${prefixPagination}-total`).prop('fieldid')).toEqual(undefined);
            expect(wrapper.find('.data_per_select').find(`.${prefix}-select`).prop('fieldid')).toEqual(undefined);
            expect(wrapper.find(`.${prefixPagination}`).find('.page_jump').find('input').prop('fieldid')).toEqual(undefined);
            expect(wrapper.find('.page_jump').find('.page_jump_btn').prop('fieldid')).toEqual(undefined);

            wrapper.setProps({ fieldid: 'fieldid-id' });
            expect(wrapper.find(`.${prefixPagination}-${item}`).find('a').prop('fieldid')).toEqual(`fieldid-id-${item}`);
            expect(wrapper.find(`.${prefixPagination}-total`).prop('fieldid')).toEqual('fieldid-id-total');
            expect(wrapper.find('.data_per_select').find(`.${prefix}-select`).prop('fieldid')).toEqual('fieldid-id-size-changer');
            expect(wrapper.find(`.${prefixPagination}`).find('.page_jump').find('input').prop('fieldid')).toEqual('fieldid-id-jump');
            expect(wrapper.find('.page_jump').find('.page_jump_btn').prop('fieldid')).toEqual('fieldid-id-jump-btn');
        })
    })
})

describe('onPageSizeChange && showQuickJumper test', () => {
    it('onPageSizeChange && showQuickJumper test, <test prop:: onPageSizeChange>, <test prop:: showQuickJumper>', () => {
        const mockEvent = jest.fn()
        const renderConfirmBtn = () => {
            return (<Button className="confirm-btn" size={"small"} bordered>确定</Button>);
        };
        let wrapper = mount(
            <Pagination showSizeChanger onPageSizeChange={mockEvent} pageSizeInput pageSizeOptions={['10', '50', '100']}
                total={100} showQuickJumper={true} confirmBtn={renderConfirmBtn}
            />
        )
        wrapper.find('.page_jump').find('input').simulate('change', { target: { 'value': '5' } })
        wrapper.find('.page_jump').find('input').simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        wrapper.find('.page_jump').find('input').simulate('blur')
        expect(wrapper.find('.active').prop('title')).toEqual('1')
        wrapper.find('.page_jump_btn').simulate('click')
        expect(wrapper.find('.active').prop('title')).toEqual('5')

        expect(wrapper.find('ul').find('li').length).toEqual(13)
        wrapper.find('input').at(0).simulate('change', { target: { 'value': '50' } })
        wrapper.find('input').at(0).simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        wrapper.find('input').at(0).simulate('blur')
        expect(wrapper.find('ul').find('li').length).toEqual(6)
        expect(mockEvent.mock.calls[0][0]).toEqual(2)

        wrapper.find('input').at(0).simulate('change', { target: { 'value': '#$' } })
        wrapper.find('input').at(0).simulate('keydown', {
            keyCode: KeyCode.ENTER
        })
        wrapper.find('input').at(0).simulate('blur')
        expect(wrapper.find('ul').find('li').length).toEqual(6)
    })
    it('select test', () => {
        const renderConfirmBtn = () => {
            return (<Button className="confirm-btn" size={"small"} bordered>确定</Button>);
        };
        let wrapper = mount(
            <Pagination showSizeChanger pageSizeInput pageSizeOptions={['10', '50', '100']}
                total={100} showQuickJumper={true} confirmBtn={renderConfirmBtn}
            />
        )
        expect(document.getElementsByClassName(`${prefix}-select-dropdown`)[0]).toBeFalsy()
        wrapper.find(`.${prefix}-select`).simulate('click')
        expect(document.getElementsByClassName(`${prefix}-select-dropdown`)[0]).toBeTruthy()
        expect(document.getElementsByClassName(`${prefix}-select-dropdown-hidden`)[0]).toBeFalsy()
        wrapper.find('input').at(0).simulate('blur')
        expect(document.getElementsByClassName(`${prefix}-select-dropdown-hidden`)[0]).toBeTruthy()
        wrapper.find('input').at(0).simulate('focus')
        expect(document.getElementsByClassName(`${prefix}-select-dropdown`)[0]).toBeTruthy()
    })
})

describe('4.4.4 New Api Test', () => {
    it('component: Pagination, <test prop:: itemRender>', () => {
        const onChange = jest.fn();
        const onPageSizeChange = jest.fn();
        const itemRender = (eventKey, type, ComponentWrap) => {
            if (type === 'prev') { return <a>Prev</a> }
            if (type === 'next') { return <a>Next</a> }
            if (type === 'last') { return <a>Last</a> }
            if (type === 'first') { return <a>First</a> }
            if (type === 'page') { return <a>p{eventKey}</a> }
            return ComponentWrap;
        };
        let result = [];
        let wrapper = mount(<Pagination total={100} defaultPageSize={10} onChange={onChange} onPageSizeChange={onPageSizeChange} itemRender={itemRender} />);
        wrapper.find(`ul.${prefixPagination}-list li`).forEach(item => {
            result.push(item.instance().innerHTML)
        })
        expect(result).toEqual(["<a disabled=\"\">First</a>", "<a disabled=\"\">Prev</a>", "<a>p1</a>", "<a>p2</a>", "<a>p3</a>", "<a>p4</a>", "<a>p5</a>", "<a disabled=\"\"><span aria-label=\"More\">…</span></a>", "<a>p10</a>", "<a>Next</a>", "<a>Last</a>"])
        expect(wrapper.find('li[title="1"]').hasClass('active')).toBe(true)
        wrapper.find(`.${prefixPagination}-next a`).simulate('click') //下一页
        expect(wrapper.find('li[title="2"]').hasClass('active')).toBe(true)
        wrapper.find(`.${prefixPagination}-last a`).simulate('click') //跳至尾页
        expect(wrapper.find('li[title="10"]').hasClass('active')).toBe(true)
        wrapper.find(`.${prefixPagination}-prev a`).simulate('click') //上一页
        expect(wrapper.find('li[title="9"]').hasClass('active')).toBe(true)
        wrapper.find(`.${prefixPagination}-first a`).simulate('click') //返回首页
        expect(wrapper.find('li[title="1"]').hasClass('active')).toBe(true)
        wrapper.find('li[title="5"] a').simulate('click') //点击第五页
        expect(wrapper.find('li[title="5"]').hasClass('active')).toBe(true)
    })
    it('component: Pagination, <test prop:: showTotal>', () => {
        let wrapper = mount(<Pagination showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} pageSize={30} activePage={1} total={100} />);
        expect(wrapper.find(`.${prefixPagination}-total`).text()).toBe('1-30 of 100 items')
        wrapper.setProps({ activePage: 4 }) //设置为最后一页时，第二个数不会超过total，原来显示90-120，已修复
        expect(wrapper.find(`.${prefixPagination}-total`).text()).toBe("91-100 of 100 items")
    })
    it('component: Pagination, <test prop:: hideOnSinglePage>', () => {
        let wrapper = mount(<Pagination showSizeChanger pageSizeOptions={['10', '100']} total={100} defaultPageSize={10} hideOnSinglePage />);
        expect(wrapper.exists(`.${prefixPagination}`)).toBe(true)
        wrapper.setProps({ pageSize: 100 }) //此时只有一页，不显示分页器
        // expect(wrapper.exists(`.${prefixPagination}`)).toBe(false)
        expect(wrapper.instance()).toEqual(undefined);
    })
})
