/** Transfer.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import { render, screen,fireEvent } from '@testing-library/react';
import React from 'react';
import {
    actWait,
    attrsTest,
    attrsTestByLength,
    eventsTest,
    testCustomStyle
} from "../../../next-ui-library/test/common/index";
import {prefix} from '../../wui-core/src/updatePrefix';
import Transfer from '../src/index';
import Table from '../../wui-table/src'
import Tag from '../../wui-tag/src'
import Checkbox from '../../wui-checkbox/src'

const prefixTransfer = `${prefix}-transfer`

describe('Transfer test', () => {
    const mockData = [];
    const AllTargetKeys = [];

    for (let i = 0; i < 5; i++) {
        mockData.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
        });
        AllTargetKeys.push(i.toString());
    }
    const targetKeys = mockData
        .filter(item => +item.key % 3 > 1)
        .map(item => item.key);

    attrsTestByLength({
        title: 'component: Transfer, <test prop:: dataSource>, <test prop:: titles>, <test prop:: render>, <test prop:: targetKeys>',
        Component: Transfer,
        attrs: {
            dataSource: mockData,
            titles: ['Source', 'Target'],
            showSearch: true,
            render: item => item.title,
            targetKeys: targetKeys,
            lazy: {container: "modal"}
        },
        selector: `.${prefixTransfer}-list`,
        nodeCount: 2,
        afterTest: async (wrapper) => {
            expect(wrapper.find(`.${prefixTransfer}-list-header-title`).at(0).text()).toBe('Source')
            expect(wrapper.find(`.${prefixTransfer}-list-header-title`).at(1).text()).toBe('Target')
            expect(wrapper.find(`.${prefixTransfer}-list-content-item`).at(0).text()).toBe('content1')
            expect(wrapper.find(`div.${prefixTransfer}-list`).at(1).find(`.${prefixTransfer}-list-content-item`).at(0).text()).toBe('content3')
        }
    });
    attrsTest({
        title: 'component: Transfer, <test prop:: showSearch>',
        Component: Transfer,
        attrs: {
            showSearch: true
        },
        selector: `.${prefix}-input-search`,
        classnames: [`${prefixTransfer}-list-search`],
        act: true
    })
    attrsTest({
        title: 'component: Transfer, <test prop:: className>',
        Component: Transfer,
        attrs: {
            className: 'my-class'
        },
        selector: `.${prefixTransfer}`,
        classnames: [`my-class`]
    });
    testCustomStyle({
        title: 'component: Transfer, <test prop:: listStyle>',
        Component: Transfer,
        attrs: {
            listStyle: {
                width: 250,
                height: 500,
            }
        },
        selector: `div.${prefixTransfer}-list`,
        verifyStyle: {
            width: "250px",
            height: "500px",
        }
    });
    testCustomStyle({
        title: 'component: Transfer, <test prop:: style>',
        Component: Transfer,
        attrs: {
            style: {
                width: 250,
                height: 500,
            }
        },
        selector: `div.${prefixTransfer}`,
        verifyStyle: {
            width: "250px",
            height: "500px",
        }
    });
    eventsTest({
        title: 'component: Transfer, <test prop:: filterOption>',
        Component: Transfer,
        propFuncName: 'filterOption',
        dependentProps: {showSearch: true, dataSource: mockData, lazy: {container: "modal"}},
        selector: `.${prefixTransfer}-list-search input`,
        eventName: 'change',
        eventArgs: [{target: {value: 'content1'}}],
        propFuncArgs: ['content1', 'mockEvent'],
        act: true
    });

    eventsTest({
        title: 'component: Transfer, <test prop:: onSearchChange>',
        Component: Transfer,
        propFuncName: 'onSearchChange',
        dependentProps: {showSearch: true, dataSource: mockData, lazy: {container: "modal"}},
        selector: `.${prefixTransfer}-list-search input`,
        eventName: 'change',
        eventArgs: [{target: {value: 'content1'}}]
    });

    it('body should be set,<test prop:: body>', () => {
        let transfer = mount(<Transfer
            body={() => <div className='mybody'>body</div>}
        />);
        expect(transfer.find('.mybody').at(0).text()).toEqual('body');
    });
    it('footer should be set,<test prop:: footer>', () => {
        let transfer = mount(<Transfer
            footer={() => <div className='myfooter'>footer</div>}
        />);
        expect(transfer.find('.myfooter').at(0).text()).toEqual('footer');
    });
    it('onSelectChange should be called,<test prop:: onSelectChange>', () => {
        const Select = jest.fn();
        let transfer = mount(<Transfer
            dataSource={mockData}
            onSelectChange={Select}
            lazy={{container: "modal"}}
        />);
        transfer.find(`div.${prefixTransfer}-list`).at(0).find(`.${prefixTransfer}-list-content-item`).at(0).simulate('click');
        expect(Select).toHaveBeenCalled();
    });
    it('onScroll should be called,<test prop:: onScroll>', () => {
        const Scroll = jest.fn();
        let transfer = mount(<Transfer
            dataSource={mockData}
            onScroll={Scroll}
            lazy={{container: "modal"}}
        />);
        transfer.find(`div.${prefixTransfer}-list-content`).at(0).simulate('scroll');
        expect(Scroll).toHaveBeenCalled();
    });
    it('lazyload success,<test prop:: lazy>', () => {
        let transfer = mount(<Transfer
            dataSource={mockData}
            render={item => item.title}
        />);
        expect(transfer.find(`div.${prefixTransfer}-list`).at(0).exists(`.${prefixTransfer}-list-content-item`)).toBe(false);
        transfer.setProps({lazy: {container: "modal"}})
        expect(transfer.find(`div.${prefixTransfer}-list`).at(0).exists(`.${prefixTransfer}-list-content-item`)).toBe(true);
    });
    it('searchPlaceholder should be "mysearch",<test prop:: searchPlaceholder>', () => {
        let transfer = mount(<Transfer
            dataSource={mockData}
            showSearch={true}
            searchPlaceholder='mysearch'
        />);
        expect(transfer.find(`.${prefixTransfer}-list-search input`).at(0).props().placeholder).toEqual('mysearch');
    });
    it('operations success,<test prop:: operations>', () => {
        const changeEvent = jest.fn();
        let transfer = mount(<Transfer
            dataSource={mockData}
            targetKeys={['3', '4']}
            operations={['右移', '左移']}
            lazy={{container: "modal"}}
            onChange={changeEvent}
        />);
        expect(transfer.find('button span').at(0).exists('.uf-2arrow-right')).toBe(true);
        expect(transfer.find('button span').at(1).exists('.uf-arrow-left')).toBe(true);
        expect(transfer.find('button span').at(1).text()).toEqual('左移');
        expect(transfer.find('button span').at(2).text()).toEqual('右移');
        expect(transfer.find('button span').at(2).exists('.uf-arrow-right')).toBe(true);
        expect(transfer.find('button span').at(3).exists('.uf-2arrow-left')).toBe(true);
        transfer.find('button').at(0).simulate('click');
        expect(changeEvent).toHaveBeenCalled()

        transfer.find('button').at(3).simulate('click');
        expect(changeEvent).toHaveBeenCalled()
    });

    it('component: Transfer,<test prop:: locale>', () => {
        let transfer = mount(<Transfer
            dataSource={mockData}
            showSearch={true}
        />);
        expect(transfer.find(`.${prefixTransfer}-list-body-not-found`).text()).toBe('暂无数据');
        expect(transfer.find(`.${prefix}-input-search input`).props().placeholder).toBe('搜索');
        expect(transfer.find(`.${prefixTransfer}-list-header-selected`).at(0).text()).toBe('可选列表(0/5)');
        expect(transfer.find(`.${prefixTransfer}-list-header-selected`).at(1).text()).toBe('已选列表(0/0)');
        transfer.setProps({
            locale: 'en-us'
        });
        transfer.update();
        expect(transfer.find(`.${prefixTransfer}-list-body-not-found`).text()).toBe('Not Found');
        expect(transfer.find(`.${prefix}-input-search input`).props().placeholder).toBe('Search');
        expect(transfer.find(`.${prefixTransfer}-list-header-selected`).at(0).text()).toBe("Source(0/5)");
        expect(transfer.find(`.${prefixTransfer}-list-header-selected`).at(1).text()).toBe("Target(0/0)");
    });

    it('component: Transfer,<test prop:: children>', () => {
        const { multiSelect } = Table;
        let MultiSelectTable = multiSelect(Table, Checkbox);
        function getMockData(start, end) {
            const mockData = [];
            const targetKeys = [];
            for (let i = start; i < end; i++) {
                const item = {
                    key: i.toString(),
                    title: `content${i + 1}`,
                    tag: `tag-${i + 1}`,
                    description: `description of content${i + 1}`,
                    disabled: i % 3 < 1,
                    chosen: Math.random() * 2 > 1,
                };
                mockData.push(item);
                if (item.chosen)
                    targetKeys.push(item.key);
            }
            return { mockData, targetKeys };
        }
        const { mockData, targetKeys } = getMockData(0, 50);
        const tableColumns = [
            {
                dataIndex: 'title',
                title: 'Name',
            },
            {
                dataIndex: 'tag',
                title: 'Tag',
                render: (tag) => <Tag>{tag}</Tag>,
            },
            {
                dataIndex: 'description',
                title: 'Description',
            },
        ];
        let transfer = mount(
            <Transfer
                dataSource={mockData}
                targetKeys={targetKeys}
                showSearch
                filterOption={(inputValue, item) => {
                    return item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1;
                }}
                listStyle={{ width: '40%', height: '500px' }}
            >
                {({ onItemSelect, onItemSelectAll, direction, dataSource = [], checkedKeys, }) => {
                    const columns = direction === 'left' ? tableColumns : tableColumns;
                    const rowSelection = {
                        getCheckboxProps: (item) => ({ disabled: item.disabled }),
                        onSelectAll(selected, selectedRows) {
                            const filteredDataSource = selectedRows.filter(item => !item.disabled);
                            const checkAll = !selected; // 全选checkbox 当前的状态
                            onItemSelectAll(filteredDataSource, checkAll);
                        },
                        onSelect(item) {
                            onItemSelect(item);
                        },
                        selectedRowKeys: checkedKeys,
                    };
                    return (<MultiSelectTable rowSelection={rowSelection} columns={columns} data={dataSource} size="small" scroll={{ y: 399 }} rowKey={item => item.key}/>);
                }}
            </Transfer>
        );
        expect(transfer.find(`.${prefix}-table`).length).toBe(2)
    });

    it('showCheckbox hidden,<test prop:: showCheckbox>', () => {
        let transfer = mount(<Transfer
            dataSource={mockData}
            showCheckbox={false}
            // 有一个小问题:lazy={{ container: "modal" }}设置后,showCheckbox={false}不起作用
        />);
        expect(transfer.find(`.${prefix}-checkbox`).length).toBe(0);
    });
    it('notFoundContent should be "No content",<test prop:: notFoundContent>', () => {
        let transfer = mount(<Transfer
            notFoundContent='No content'
        />);
        expect(transfer.find(`.${prefixTransfer}-list-body-not-found`).at(0).text()).toEqual('No content');
    });
    it('item should be draggable,<test prop:: draggable>', async () => {
        const changeEvent = jest.fn();
        let transfer = mount(<Transfer
            draggable={true}
            dataSource={mockData}
            lazy={{container: 'modal'}}
            onChange={changeEvent}
        />,{attachTo: document});
        const selectedKeys = mockData.filter(item => +item.key < 2).map(item => item.key);
        transfer.setProps({selectedKeys: [...selectedKeys]});
        expect(document.querySelectorAll(`.${prefixTransfer}-list-draggable`)).toHaveLength(2)
        // transfer.debug()
        // console.log(22222222222222)
        // const mouseMove = new MouseEvent('mousemove', { bubbles: true, clientX: 300});
        // await actWait();
        // document.querySelector(`li.${prefixTransfer}-list-content-item-selected`).dispatchEvent(mouseMove);
        // const mouseMove2 = new MouseEvent('mousemove', { bubbles: true, clientX: 600});
        // await actWait();
        // document.querySelector(`li.${prefixTransfer}-list-content-item-selected`).dispatchEvent(mouseMove2);
        // const mouseUp = new MouseEvent('mouseup', { bubbles: true, clientX: 600});
        // await actWait();
        // document.querySelectorAll(`div.${prefixTransfer}-list-content`)[1].dispatchEvent(mouseUp);
        // transfer.debug()
        // expect(dragStartedEvent).toHaveBeenCalled();re
        //

        // transfer.debug();
        // console.log(3333333333)
        // expect(transfer.find('Draggable').at(0).props().isDragDisabled).toEqual(undefined);
        // const leftToRight = {
        //     destination: {droppableId: "droppable2", index: 0},
        //     draggableId: '1',
        //     source: { droppableId: 'droppable1', index: 1}
        // }
        // transfer.find('DragDropContext').at(0).props().onDragEnd(leftToRight);
        // expect(changeEvent).toHaveBeenCalled();
        //
        // const rightToLeft = {
        //     destination: {droppableId: "droppable1", index: 0},
        //     draggableId: '1',
        //     source: { droppableId: 'droppable2', index: 1}
        // }
        // transfer.find('DragDropContext').at(0).props().onDragEnd(rightToLeft);
        // expect(changeEvent).toHaveBeenCalled();
        //
        // transfer.setProps({targetKeys: ['3', '4']})
        // const rightToRight = {
        //     destination: {droppableId: "droppable2", index: 0},
        //     draggableId: '1',
        //     source: { droppableId: 'droppable2', index: 1}
        // }
        // transfer.find('DragDropContext').at(0).props().onDragEnd(rightToRight);
        // expect(changeEvent).toHaveBeenCalled();

    });
    it('rowKey should be set,<test prop:: rowKey>', async () => {
        let transfer = mount(<Transfer
            dataSource={[{
                uid: '1',
                title: 'content1',
            },
            {
                uid: '2',
                title: 'content2',
            }]}
            lazy={{container: "modal"}}
            rowKey={record => record.uid - 1}
        />);
        expect(transfer.find(`.${prefixTransfer}-list-content-item`).at(0).prop("title")).toEqual('content1')
    });
    it('selectedKeys should be set,<test prop:: selectedKeys>', async () => {
        let transfer = mount(<Transfer
            dataSource={mockData}
            lazy={{container: "modal"}}
        />);
        const selectedKeys = mockData.filter(item => +item.key < 2).map(item => item.key);
        transfer.setProps({selectedKeys: [...selectedKeys]});
        expect(transfer.find(`.${prefixTransfer}-list-content-item`).at(0).hasClass(`${prefixTransfer}-list-content-item-selected`)).toEqual(true);
        expect(transfer.find(`.${prefixTransfer}-list-content-item`).at(2).hasClass(`${prefixTransfer}-list-content-item-selected`)).toEqual(false);
        expect(transfer.find(`.${prefixTransfer}-list-content-item`).at(3).hasClass(`${prefixTransfer}-list-content-item-selected`)).toEqual(false);

        const newkeys = mockData.filter(item => +item.key > 2).map(item => item.key);
        transfer.setProps({selectedKeys: newkeys});
        expect(transfer.find(`.${prefixTransfer}-list-content-item`).at(1).hasClass(`${prefixTransfer}-list-content-item-selected`)).toEqual(false);
        expect(transfer.find(`.${prefixTransfer}-list-content-item`).at(3).hasClass(`${prefixTransfer}-list-content-item-selected`)).toEqual(true);
    });
    it('renderOperation should be set,<test prop:: renderOperation>', () => {
        let transfer = mount(<Transfer
            dataSource={mockData}
            renderOperation={() => <button className='myOperation'>myOperation</button>}
        />);
        expect(transfer.find('.myOperation').text()).toEqual('myOperation');
    });
    it('onChange should be called,<test prop:: onChange>', () => {
        const Change = jest.fn();
        let transfer = mount(<Transfer
            dataSource={mockData}
            onChange={Change}
            lazy={{container: "modal"}}
        />);
        transfer.find(`div.${prefixTransfer}-list`).at(0).find(`.${prefixTransfer}-list-content-item`).at(0).simulate('click');
        transfer.find('i.uf-arrow-right').simulate('click');
        expect(Change).toHaveBeenCalled();
    });
    it('appendToBottom should be set,<test prop:: appendToBottom>', () => {
        let transfer = mount(<Transfer
            dataSource={mockData}
            targetKeys={targetKeys}
            lazy={{container: "modal"}}
            appendToBottom={true}
            render={item => item.title}
        />);
        expect(transfer.find(`div.${prefixTransfer}-list`).at(1).find(`.${prefixTransfer}-list-content-item`).last().props().title).toBe('content3')
        transfer.find(`div.${prefixTransfer}-list`).at(0).find(`.${prefixTransfer}-list-content-item`).at(0).simulate('click');
        transfer.find('i.uf-arrow-right').simulate('click');
    });

    it('disabled should be set, <test prop:: disabled>', () => {
        const onSelectChange = jest.fn();
        let wrapper = mount(
            <Transfer
                disabled
                dataSource={mockData}
                targetKeys={targetKeys}
                onSelectChange={onSelectChange}
                lazy={{container: "modal"}}
            />
        )
        wrapper.find(`div.${prefixTransfer}-list`).at(0).find(`.${prefixTransfer}-list-content-item`).at(0).simulate('click');
        expect(onSelectChange).not.toHaveBeenCalled();
    });

    it('selectAllLabels should be set, <test prop:: selectAllLabels>', () => {
        const setSelectAllLabels = (info, direction) => {
            const {checkedCount} = info;
            return `${checkedCount} - ${direction === 'right' ? targetKeys.length : mockData.filter(item => !targetKeys.includes(item.key)).length}`
        }
        let wrapper = mount(
            <Transfer
                dataSource={mockData}
                targetKeys={targetKeys}
                selectAllLabels={[(info) => setSelectAllLabels(info, 'left'), (info) => setSelectAllLabels(info, 'right')]}
            />
        )
        expect(wrapper.find(`.${prefixTransfer}-list-header-number`).at(1).text()).toBe('0 - 1')
    });
    //新增fieldid测试
    describe('component: Transfer, <test prop:: fieldid>', () => {
        it('[contains(@fieldid,"***_transfer-operation_left","***_transfer-operation_right","***_transfer-input-search_left","***_transfer-input-search_right")]', () => {
            const wrapper = mount(<Transfer showSearch />);
            expect(wrapper.find(`.${prefixTransfer}-operation`).find('button').at(0).prop("fieldid")).toEqual(undefined);
            expect(wrapper.find(`.${prefixTransfer}-operation`).find('button').at(1).prop("fieldid")).toEqual(undefined);
            expect(wrapper.find(`.${prefixTransfer}-list`).at(0).find(`.${prefixTransfer}-list-body-search-wrapper`).find('input').prop('fieldid')).toEqual(undefined);
            expect(wrapper.find(`.${prefixTransfer}-list`).at(1).find(`.${prefixTransfer}-list-body-search-wrapper`).find('input').prop('fieldid')).toEqual(undefined);
            wrapper.setProps({ fieldid: 'test' });
            expect(wrapper.find(`.${prefixTransfer}-operation`).find('button').at(0).prop("fieldid")).toEqual("test_transfer-operation_all_right");
            expect(wrapper.find(`.${prefixTransfer}-operation`).find('button').at(1).prop("fieldid")).toEqual("test_transfer-operation_left");
            expect(wrapper.find(`.${prefixTransfer}-operation`).find('button').at(2).prop("fieldid")).toEqual("test_transfer-operation_right");
            expect(wrapper.find(`.${prefixTransfer}-operation`).find('button').at(3).prop("fieldid")).toEqual("test_transfer-operation_all_left");
            expect(wrapper.find(`.${prefixTransfer}-list`).at(0).find(`.${prefixTransfer}-list-body-search-wrapper`).find('input').prop('fieldid')).toEqual("test_transfer-input-search_left");
            expect(wrapper.find(`.${prefixTransfer}-list`).at(1).find(`.${prefixTransfer}-list-body-search-wrapper`).find('input').prop('fieldid')).toEqual("test_transfer-input-search_right");
        })
    })
    it('item should be draggable,<test prop:: draggable>', async () => {
        const changeEvent = jest.fn();
        let transfer = mount(<Transfer
            draggable={true}
            dataSource={mockData}
            lazy={{container: 'modal'}}
            targetKeys={["1","2"]}
            onChange={changeEvent}
        />,{attachTo: document});
        await actWait();
        let dom = document.querySelectorAll(`.${prefixTransfer}-list-draggable`)[1]
        let list = dom.querySelectorAll('.wui-transfer-list-content > ul > div')
        const attributeValue = list[0].getAttribute('data-rbd-draggable-id');
        const target1 = list[0];
        const target2 =list[1];

        // 模拟开始拖拽目标1事件
        const dragStartEvent = new Event('dragstart', { bubbles: true });
        target1.dispatchEvent(dragStartEvent);

        // 模拟将目标1拖拽到目标2的位置
        const dragEnterEvent = new Event('dragenter', { bubbles: true });
        target2.dispatchEvent(dragEnterEvent);

        const dragOverEvent = new Event('dragover', { bubbles: true });
        target2.dispatchEvent(dragOverEvent);

        const dropEvent = new Event('drop', { bubbles: true });
        target2.dispatchEvent(dropEvent);

        // screen.debug()
        expect(attributeValue).toBe('1');
    });
})
