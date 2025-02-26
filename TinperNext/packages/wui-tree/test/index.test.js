/** Tree.tsx */
import {mount, ReactWrapper} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTestByLength, eventsTest, sleep, testStyle} from "../../../next-ui-library/test/common/index"
import {KeyCode} from '../../wui-core/src';
import {prefix} from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src';
import Tree from '../src';
import TreeNode from '../src/TreeNode';
import TreeDemo from './treeClass';
import HeightDemo from '../demo/demo-bip/Demo19';
import FieldNameDemo from '../demo/demo-bip/Demo18';
import TreeDemo5 from './Demo5';
import LoadedDemo from './loaded';
import {render, screen, fireEvent,  waitFor} from '@testing-library/react';

const prefixTree = `${prefix}-tree`;
const prefixTreeNode = `${prefix}-tree-node`;
const treeData = [{
    title: 'pNode 01',
    key: '0-0',
    children: [{
        title: 'leaf 0-0-0',
        key: '0-0-0'
    }, {
        title: 'leaf 0-0-1',
        key: '0-0-1'
    }]
}, {
    title: 'pNode 02',
    key: '0-1',
    children: [{
        title: 'leaf 0-1-0',
        key: '0-1-0'
    }, {
        title: 'leaf 0-1-1',
        key: '0-1-1'
    }]
}, {
    title: 'pNode 03',
    key: '0-2',
    isLeaf: true
}];
const renderTreeNodes = (data) => {
    const loop = (data) => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode key={item.key} title={item.key + "uuuuu"} isLeaf={item.isLeaf}>
                    {loop(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode key={item.key} title={item.key + 1} isLeaf={true}/>;
    });
    return loop(data);
}
describe('tree1', () => {
    describe('simple tree1', () => {
        let wrapper: ReactWrapper;
        beforeEach(() => {
            wrapper = mount(<TreeDemo/>);
        })
        afterEach(() => {
            if (wrapper && wrapper.length) {
                wrapper.unmount();
            }
        })
        describe('component: Tree, <test prop:: checkStrictly> ', () => {
            it('click a checkbox and the parentNode will be checked too', () => {
                wrapper.find(`.${prefixTree}-checkbox`).at(5).simulate('click')
                expect(wrapper.find(`.${prefixTree}-checkbox`).at(5).hasClass(`${prefixTree}-checkbox-checked`)).toEqual(true);
                expect(wrapper.find(`.${prefixTree}-checkbox`).at(4).hasClass(`${prefixTree}-checkbox-checked`)).toEqual(true);
            });
            it('click a checkbox and only it will be checked ', () => {
                wrapper.setProps({
                    checkStrictly: true
                })
                wrapper.find(`.${prefixTree}-checkbox`).at(5).simulate('click')
                expect(wrapper.find(`.${prefixTree}-checkbox`).at(5).hasClass(`${prefixTree}-checkbox-checked`)).toEqual(true);
                expect(wrapper.find(`.${prefixTree}-checkbox`).at(4).hasClass(`${prefixTree}-checkbox-checked`)).toEqual(false);
            });
        })
        describe('component: Tree, <test prop:: openIcon> ', () => {
            it('parent node should has class noline_open', () => {
                wrapper.setProps({
                    openIcon: 'x'
                })
                expect(wrapper.find(`ul li .${prefixTree}-switcher`).at(0).text()).toBe('x');
            });
        })
        describe('component: Tree, <test prop:: openTransitionName> ', () => {
            it('ul should have prop openTransitionName', () => {
                wrapper.setProps({
                    openTransitionName: 'xxxx'
                })
                expect(wrapper.find(`ul`).at(0).props().opentransitionname).toBe('xxxx');
            });
        })
        describe('component: Tree, <test prop:: autoExpandParent> , <test prop:: expandedKeys> ', () => {
            it('parent node should has class noline_open', () => {
                wrapper.setProps({
                    expandedKeys: ['0-0-1', '0-0-2'],
                    defaultExpandAll: false,
                    autoExpandParent: true,
                })
                expect(wrapper.find(`ul li .${prefixTree}-switcher`).at(0).hasClass(`${prefixTree}-noline_open`)).toEqual(true);
            });
        })
        describe('component: Tree, <test prop:: onKeyDown> , <test prop:: focusable> ', () => {
            it('it should expand and select by keydown', () => {
                // console.log(wrapper.find('Tree').first().props())
                const preventDefault = () => {
                };
                const mockKeyDown = jest.fn();
                wrapper.setProps({
                    onKeyDown: mockKeyDown,
                    focusable: true,
                })
                wrapper.find(`.${prefixTree}-noline_open`).first().simulate('click');
                const parent1 = wrapper.find(`.${prefixTreeNode}-content-wrapper`).first();
                expect(parent1.hasClass(`${prefixTreeNode}-content-wrapper-close`)).toBeTruthy();
                parent1.simulate('click');
                parent1.simulate('keydown', {keyCode: KeyCode.RIGHT, preventDefault})
                const parent2 = wrapper.find(`.${prefixTreeNode}-content-wrapper`).first();
                expect(parent2.hasClass(`${prefixTreeNode}-content-wrapper-open`)).toBeTruthy();

                wrapper.find(`.${prefixTreeNode}-content-wrapper`).first().simulate('keydown', {keyCode: KeyCode.LEFT, preventDefault})
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).first().hasClass(`${prefixTreeNode}-content-wrapper-close`)).toBeTruthy();

                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).first().hasClass(`${prefixTreeNode}-selected`)).toEqual(true);
                wrapper.find(`.${prefixTreeNode}-content-wrapper`).first().simulate('keydown', {
                    keyCode: KeyCode.SPACE,
                    preventDefault
                });
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).first().hasClass(`${prefixTreeNode}-selected`)).toEqual(false);
            });
        })
        // describe('component: Tree, <test prop:: expandWhenDoubleClick>', () => {
        //     it('it should expand and select by keydown', () => {
        //         wrapper.setProps({
        //             expandWhenDoubleClick: true,
        //             onDoubleClick: () => {
        //             }
        //         })
        //         const parent1 = wrapper.find(`.${prefixTreeNode}-content-wrapper`).first();
        //         expect(parent1.hasClass(`${prefixTreeNode}-content-wrapper-open`)).toBeTruthy();
        //         parent1.simulate('doubleclick')
        //         expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).first().hasClass(`${prefixTreeNode}-content-wrapper-close`)).toEqual(true);
        //     });
        // })
       
        describe('component: Tree, <test prop:: autoSelectWhenFocus>', () => {
            it('it should have a selected class', () => {
                wrapper.setProps({
                    autoSelectWhenFocus: true,
                    focusable: true,
                    onDoubleClick: () => {
                    }
                })
                const parent1 = wrapper.find(`.${prefixTree}`).first();
                parent1.simulate('focus');
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).some(`${prefixTreeNode}-selected`)).toBeFalsy();
                wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(0).simulate('keydown', {keyCode: KeyCode.DOWN})
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(1).hasClass(`${prefixTreeNode}-selected`)).toBeTruthy();

                wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(1).simulate('keydown', {keyCode: KeyCode.UP})
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(0).hasClass(`${prefixTreeNode}-selected`)).toBeTruthy();
            });
        })
        
    })
    describe('simple tree2', () => {

        let tree;
        describe('component: Tree, <test prop:: children> ', () => {
            it('should add css class of root dom node', () => {
                tree = mount(
                    <Tree className="forTest">
                        <TreeNode title="1"/>
                    </Tree>
                );
                expect(tree.hasClass('forTest')).toEqual(true);
            });
        });
        describe('component: Tree, <test prop:: rootClassName> ', () => {
            it('should add css class of root dom node', () => {
                tree = mount(
                    <Tree rootClassName="forTest1">
                        <TreeNode title="1"/>
                    </Tree>
                );
                expect(tree.hasClass('forTest1')).toEqual(true);
            });
        });
        describe('component: Tree, <test prop:: fieldNames> ', () => {
            it('should render naturaly', () => {
                const { container, debug} = render(
                    <FieldNameDemo />
                );
                expect(container.querySelector(`.${prefixTree}-title`).textContent).toBe('0-0');
            });
        });
        describe('component: Tree, <test prop:: loadedKeys>, , <test prop:: onLoad> ', () => {
            it('should add css class of root dom node', async () => {
                // let  keys = [];
                const mocEvent = jest.fn();
                const { container, debug, baseElement} = render(
                    <LoadedDemo onLoad={mocEvent} />
                    );
			    expect(mocEvent).not.toHaveBeenCalled();
                await waitFor(() => {
			        expect(mocEvent).toHaveBeenCalled();
                    expect(mocEvent.mock.calls[0][0][0]).toBe('0-1')
                })
                
                fireEvent.click(baseElement.querySelectorAll(`.${prefixTree}-switcher`)[2])
                await waitFor(() => {
			        expect(mocEvent).toHaveBeenCalled();
                    expect(mocEvent.mock.calls[1][0][1]).toBe('0-1-0')
                })
            });
        });
        describe('component: Tree, <test prop:: selectable>, <test prop:: checkable>,<test prop:: defaultExpandAll>,<test prop:: showIcon>,<test prop:: showLine><test prop:: syncCheckedAndSelectedStatus>', () => {

            it('should have checkbox, default expand all treeNode, not show icon, show line', async() => {
                tree = mount(
                    <Tree selectable checkable defaultExpandAll showIcon={false} showLine syncCheckedAndSelectedStatus={false}>
                        <TreeNode title="parent 1" key="0-0" className="spe">
                            <TreeNode title="leaf 1" key="0-0-0" disabled>
                                <TreeNode title="leaf" key="random"/>
                                <TreeNode title="leaf"/>
                            </TreeNode>
                            <TreeNode title="leaf 2" key="0-0-1" disableCheckbox/>
                        </TreeNode>
                    </Tree>);
                await sleep(100)
                // have checkbox
                expect(tree.find(`.${prefixTree}-checkbox`).length).toEqual(5);
                // expand all treeNode
                expect(tree.find(`.${prefixTree}-switcher`).length).toEqual(5)
                expect(tree.find(`.${prefixTree}-switcher`).last().hasClass(`${prefixTree}-switcher-noop`)).toEqual(true);
                // not show icon
                expect(tree.find(`.${prefixTree}-iconEle`).length).toEqual(0);
                // show line
                expect(tree.find(`.${prefixTree}-line`).length).toEqual(5); // .${prefixTree}-line现在代表一个treenode除了子树之外的整体
            });
        });
        describe('component: Tree, <test prop:: defaultExpandedKeys>, <test prop:: defaultSelectedKeys>,<test prop:: checkable>,<test prop:: defaultCheckedKeys>,<test prop:: multiple> ', () => {

            it('should set default expandedKeys, selectedKeys and checkedKeys', () => {
                tree = mount(
                    <Tree defaultExpandedKeys={['0-0']} syncCheckedAndSelectedStatus={false} defaultSelectedKeys={['0-0', '0-0-0']}
                        multiple={true}
                        checkable defaultCheckedKeys={['0-0']}
                    >
                        <TreeNode title="parent 1" key="0-0">
                            <TreeNode title="leaf 1" key="0-0-0">
                                <TreeNode title="leaf" key="0-0-0-0"/>
                                <TreeNode title="leaf" key="0-0-0-1"/>
                            </TreeNode>
                            <TreeNode title="leaf 2" key="0-0-1"/>
                        </TreeNode>
                    </Tree>);
                const li = tree.find('li').first();
                expect(li.find(`.${prefixTree}-switcher`).first().hasClass(`${prefixTree}-noline_open`)).toEqual(true);
                expect(li.find(`.${prefixTree}-checkbox-checked`).length).toEqual(3);
                expect(li.find(`.${prefixTreeNode}-selected`).length).toEqual(2);
            });
        });
        describe('component: Tree, <test prop:: onExpand> ', () => {

            it('should expand specific treeNode', () => {
                const mockExpand = jest.fn()
                tree = mount(
                    <Tree onExpand={mockExpand} syncCheckedAndSelectedStatus={false}>
                        <TreeNode title="parent 1" key="0-0">
                            <TreeNode title="leaf 1" key="0-0-0">
                                <TreeNode title="leaf" key="0-0-0-0"/>
                                <TreeNode title="leaf" key="0-0-0-1"/>
                            </TreeNode>
                            <TreeNode title="leaf 2" key="0-0-1"/>
                        </TreeNode>
                    </Tree>);

                const li = tree.find('li').first();
                li.find(`.${prefixTree}-switcher`).first().simulate('click');
                expect(mockExpand).toHaveBeenCalled()
            });
        });
        describe('component: Tree, <test prop:: mustExpandable> ', () => {
            it('should expand specific treeNode', () => {
                // const mockExpand = jest.fn()
                const tree = mount(
                    <Tree disabled mustExpandable >
                        <TreeNode title="parent 1" key="0-0">
                            <TreeNode title="leaf 1" key="0-0-0">
                                <TreeNode title="leaf" key="0-0-0-0"/>
                                <TreeNode title="leaf" key="0-0-0-1"/>
                            </TreeNode>
                            <TreeNode title="leaf 2" key="0-0-1"/>
                        </TreeNode>
                    </Tree>);

                const li = tree.find('li').first();
                li.find(`.${prefixTree}-switcher`).first().simulate('click');
                expect(tree.find('li').first().find(`.${prefixTree}-noline_open`)).toHaveLength(1);
            });
        });
        describe('component: Tree, <test prop:: defaultExpandAll>, <test prop:: checkable>, <test prop:: onCheck> ', () => {

            it('should fire check event', () => {
                const mockCheck = jest.fn()
                tree = mount(
                    <Tree defaultExpandAll syncCheckedAndSelectedStatus={false} checkable onCheck={mockCheck}>
                        <TreeNode title="parent 1" key="0-0">
                            <TreeNode title="leaf 1" key="0-0-0">
                                <TreeNode title="leaf" key="0-0-0-0"/>
                                <TreeNode title="leaf" key="0-0-0-1"/>
                            </TreeNode>
                            <TreeNode title="leaf 2" key="0-0-1"/>
                        </TreeNode>
                    </Tree>
                );
                const ele = tree.find('li').at(1).find(`.${prefixTree}-checkbox`).at(0);
                ele.simulate("click");
                expect(mockCheck).toHaveBeenCalled()
                expect(mockCheck.mock.calls[0][0].indexOf('0-0-0-1') > -1).toEqual(true);

            });
        })
        describe('component: Tree, <test prop:: filterTreeNode> ', () => {
            it('should filter treeNode', () => {
                function filterTreeNode(treeNode) {
                    return treeNode.props.title.indexOf('parent') > -1;
                }

                tree = mount(
                    <Tree filterTreeNode={filterTreeNode} syncCheckedAndSelectedStatus={false}>
                        <TreeNode title="parent 1" key="0-0">
                            <TreeNode title="leaf 1" key="0-0-0">
                                <TreeNode title="leaf" key="0-0-0-0"/>
                                <TreeNode title="leaf" key="0-0-0-1"/>
                            </TreeNode>
                            <TreeNode title="leaf 2" key="0-0-1"/>
                        </TreeNode>
                    </Tree>
                );
                expect(tree.find(`.${prefixTree}-treenode-filter-node`).length).toEqual(1);
            });
        })
        testStyle({
            title: 'component: Tree, <test prop:: height>',
            Component: HeightDemo,
            selector: `.${prefixTree}-infinite-scroll`,
            style: {
                height: '220px'
            }
        })
        testStyle({
            title: 'component: Tree, <test prop:: rootStyle>',
            Component: Tree,
            attr: {
                children: <TreeNode title="1" />,
                rootStyle: {
                    color: 'red'
                }
            },
            selector: `.${prefixTree}`,
            style: {
                color: 'red'
            }
        })
        attrsTestByLength({
            title: 'component: Tree, <test prop:: checkedKeys>',
            Component: TreeDemo,
            attrs: {
                checkedKeys: ['0-0-1', '0-0-1-0']
            },
            selector: `.${prefixTree}-checkbox-checked`,
            nodeCount: 2,
        })
        attrsTestByLength({
            title: 'component: Tree, <test prop:: blockNode>',
            Component: TreeDemo,
            attrs: {
                blockNode: true
            },
            selector: `.${prefixTree}-block-node`,
            nodeCount: 1,
        })
        attrsTestByLength({
            title: 'component: Tree, <test prop:: blockNode>',
            Component: TreeDemo,
            attrs: {
                blockNode: false
            },
            selector: `.${prefixTree}-block-node`,
            nodeCount: 0,
        })
        attrsTestByLength({
            title: 'component: Tree, <test prop:: selectedKeys>',
            Component: TreeDemo,
            attrs: {
                selectedKeys: ['0-0-1']
            },
            selector: `.${prefixTreeNode}-selected`,
            nodeCount: 1,
            afterTest: (resWrapper) => {
                expect(resWrapper.find(`.${prefixTreeNode}-selected`).props().pos).toBe('0-0-1')
            }
        })
        eventsTest({
            title: 'component: Tree, <test prop:: onSelect>',
            Component: TreeDemo,
            propFuncName: 'onSelect',
            dependentProps: {selectedKeys: ['0-0-1']},
            selector: `.${prefixTreeNode}-selected`,
            eventName: 'click',
            eventArgs: [],
            propFuncArgs: [[]]
        });
        eventsTest({
            title: 'component: Tree, <test prop:: onSelect>',
            Component: TreeDemo,
            propFuncName: 'onSelect',
            dependentProps: {selectedKeys: ['0-0-1']},
            selector: `.${prefixTreeNode}-content-wrapper-normal`,
            eventName: 'click',
            eventArgs: [],
            propFuncArgs: [['0-0-0-0']]
        });

        describe('component: Tree, <test prop:: closeIcon> ', () => {
            it('parent node should has class noline_open', () => {
                const tree = mount(
                    <Tree
                        defaultExpandAll={false}
                        showIcon
                        selectable
                        checkable
                        closeIcon='o'
                        checkedKeys={[]}>
                        <TreeNode title="parent 1" key="0-0">
                            <TreeNode title="leaf" key="0-0-0-1"/>
                        </TreeNode>
                    </Tree>
                );
                expect(tree.find(`ul li .${prefixTree}-switcher`).at(0).text()).toBe('o');
            });
        })
        eventsTest({
            title: 'component: Tree, <test prop:: onMouseEnter>',
            Component: TreeDemo,
            propFuncName: 'onMouseEnter',
            dependentProps: {},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'mouseEnter',
            eventArgs: [],
            afterTest: (mockEvent) => {
                expect(mockEvent.mock.calls[0][0].node.props.title).toBe('parent 1')
            }
        });
        eventsTest({
            title: 'component: Tree, <test prop:: onMouseLeave>',
            Component: TreeDemo,
            propFuncName: 'onMouseLeave',
            dependentProps: {},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'mouseleave',
            eventArgs: [],
            afterTest: (mockEvent) => {
                expect(mockEvent.mock.calls[0][0].node.props.title).toBe('parent 1')
            }
        });

        eventsTest({
            title: 'component: Tree, <test prop:: onFocus>',
            Component: TreeDemo,
            propFuncName: 'onFocus',
            dependentProps: {focusable: true},
            selector: `.${prefixTree}`,
            eventName: 'focus',
            eventArgs: [true]
        });

        eventsTest({
            title: 'component: Tree, <test prop:: onRightClick>',
            Component: TreeDemo,
            propFuncName: 'onRightClick',
            dependentProps: {},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'contextmenu',
            eventArgs: [],
            afterTest: (mockEvent) => {
                expect(mockEvent.mock.calls[0][0].node.props.title).toBe('parent 1')
            }
        });


        eventsTest({
            title: 'component: Tree, <test prop:: onDoubleClick>',
            Component: TreeDemo,
            propFuncName: 'onDoubleClick',
            dependentProps: {},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'doubleclick',
            eventArgs: ['0-0'],
            afterTest: (mockEvent) => {
                expect(mockEvent.mock.calls[0][1].node.props.title).toBe('parent 1')
            }
        });
        describe('component: Tree, <test prop:: _getTreeObj>', () => {
            it('_getTreeObj should be called', () => {
                const mocEvent = jest.fn();
                const prop = {_getTreeObj: (...args) => mocEvent(...args)};
                const wrapperT = mount(<Tree  {...prop} />)
                expect(mocEvent).toHaveBeenCalled();
            });
        })

        eventsTest({
            title: 'component: Tree, <test prop:: onDragStart>',
            Component: TreeDemo,
            propFuncName: 'onDragStart',
            dependentProps: {draggable: true},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'dragstart',
            eventArgs: []
        });
        //[feat] (tree) QDJCJS-10447 拖拽时父级节点展开时长优化, 只触发一次dragenter, onDragEnter回调不被调用
        describe('component: Tree, <test prop:: onDragEnter>', () => {
            it('ondragenter should not becalled', () => {
                const onDragEnter = jest.fn()
                const wrapperT = mount(<TreeDemo draggable onDragEnter={onDragEnter} />)
                wrapperT.find(`.${prefixTreeNode}-content-wrapper`).at(0).simulate('dragenter')
                expect(onDragEnter).toHaveBeenCalled();
            });
        })
        // eventsTest({
        //     title: 'component: Tree, <test prop:: onDragEnter>',
        //     Component: TreeDemo,
        //     propFuncName: 'onDragEnter',
        //     dependentProps: { draggable: true },
        //     selector: `.${prefixTreeNode}-content-wrapper`,
        //     eventName: 'dragenter',
        //     eventArgs: []
        // });
        eventsTest({
            title: 'component: Tree, <test prop:: onDragOver>, <test prop:: draggable>',
            Component: TreeDemo,
            propFuncName: 'onDragOver',
            dependentProps: {draggable: true},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'dragover',
            eventArgs: []
        });
        eventsTest({
            title: 'component: Tree, <test prop:: onDragLeave>',
            Component: TreeDemo,
            propFuncName: 'onDragLeave',
            dependentProps: {draggable: true},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'dragleave',
            eventArgs: []
        });
        eventsTest({
            title: 'component: Tree, <test prop:: onDrop>',
            Component: TreeDemo,
            propFuncName: 'onDrop',
            dependentProps: {draggable: true},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'drop',
            eventArgs: []
        });
        eventsTest({
            title: 'component: Tree, <test prop:: onDragEnd>',
            Component: TreeDemo,
            propFuncName: 'onDragEnd',
            dependentProps: {draggable: true},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'dragend',
            eventArgs: []
        });
        eventsTest({
            title: 'component: Tree, <test prop:: keyFun>',
            Component: TreeDemo,
            propFuncName: 'keyFun',
            dependentProps: {focusable: true},
            selector: `.${prefixTreeNode}-content-wrapper`,
            eventName: 'keydown',
            eventArgs: [{keyCode: KeyCode.ENTER}],
            afterTest: (mockEvent) => {
                expect(mockEvent.mock.calls[0][1].props.title).toBe('parent 1')
            }
        });

        describe('component: Tree, <test prop:: loadData>', () => {
            it('it should load data', () => {
                const wrapperT = mount(<Tree loadData={treeData}/>)
                expect(wrapperT.find('ul').length > 0).toBeTruthy();
            });
        })
        describe('component: Tree, <test prop:: treeData>', () => {
            it('it should tree data', () => {
                const wrapperT = mount(<Tree treeData={treeData}/>)
                expect(wrapperT.find('ul').length > 0).toBeTruthy();
            });
        })
        describe('component: Tree, <test prop:: treeData>,<test prop:: renderTreeNodes>', () => {
            it('it should have tittle named 0-0uuuuu', () => {
                const wrapperT = mount(<Tree treeData={treeData} renderTreeNodes={renderTreeNodes} />)
                expect(wrapperT.find('ul li').at(0).find(`span.${prefixTree}-title`).text()).toBe('0-0uuuuu');
            });
        })
        describe('component: Tree, <test prop:: openTransitionName>', () => {
            it('Animate props.transitionName should be aaa-bbbb', () => {
                const wrapperT = mount(<Tree treeData={treeData} openTransitionName="aaa-bbbb" />)
                expect(wrapperT.find('ul').props().opentransitionname).toBe('aaa-bbbb');
            });
        })
        describe('component: Tree,<test prop:: openAnimation>', () => {
            it('Animate props.transitionName should contain open-bbb-aaa', () => {
                const wrapperT = mount(<Tree treeData={treeData} openAnimation="bbb-aaa" />)
                // 传给 Animate组件的 属性 不能再dom上 有任何体现
                // expect(wrapperT.find('ul li').at(0).find('Animate').props().transitionName).toBe(`${prefixTree}-open-bbb-aaa`);
            });
        })
        describe('component: Tree,<test prop:: disabled>', () => {
            it('it should be disabled', () => {
                const wrapperT = mount(<Tree treeData={treeData} disabled />)
                expect(wrapperT.find(`.${prefixTree}-treenode-disabled`)).toHaveLength(3);
                expect(wrapperT.find(`.${prefixTree}-switcher-disabled`)).toHaveLength(2);
            });
        })
        describe('component: Tree,<test prop:: tabIndexValue>', () => {
            it('tabIndex should  be -1', () => {
                const wrapperT = mount(<Tree treeData={treeData} tabIndexValue={-1} focusable />)
                expect(wrapperT.find('ul').at(0).props().tabindex).toBe('-1');
            });
        })
        describe('component: Tree,<test prop:: cancelUnSelect>', () => {
            it('it should no be high light whten twice click', async () => {
                const wrapperT = mount(<Tree treeData={treeData} cancelUnSelect={false} />)
                wrapperT.find(`.${prefixTreeNode}-content-wrapper-normal`).at(0).simulate('click');

                expect(wrapperT.find(`.${prefixTree}-treenode-selected`)).toHaveLength(1)
                await sleep(800)
                wrapperT.find(`.${prefixTreeNode}-content-wrapper-normal`).at(0).simulate('click');
                expect(wrapperT.find(`.${prefixTree}-treenode-selected`)).toHaveLength(0)
            });
        })
        describe('component: Tree,<test prop:: cancelUnSelect>', () => {
            it('it should be high light when twice click', () => {
                const wrapperT = mount(<Tree treeData={treeData} cancelUnSelect={true} />)
                wrapperT.find(`.${prefixTreeNode}-content-wrapper-normal`).at(0).simulate('click');

                expect(wrapperT.find(`.${prefixTree}-treenode-selected`)).toHaveLength(1)
                wrapperT.find(`.${prefixTreeNode}-content-wrapper-normal`).at(0).simulate('click');
                expect(wrapperT.find(`.${prefixTree}-treenode-selected`)).toHaveLength(1)
            });
        })
        const renderIcon = (node) => { // 可以利用树节点的信息，来渲染节点的图标，优先级低于树节点的icon
            if (node.expanded) {
                return 'e' // expanded
            } else {
                return 'c' // closed
            }
        }
        describe('component: Tree,<test prop:: icon>', () => {
            it('it should tree data', () => {
                const wrapperT = mount(<Tree treeData={treeData} showIcon icon={renderIcon} />)
                // expect(wrapperT.find('ul li').at(0)).toMatchSnapshot();
                expect(wrapperT.find('ul li').at(0).find(`.${prefixTree}-icon__customize`).text()).toBe('c');
                // expect(wrapperT.find('ul li').last().find(`.${prefixTree}-icon__customize`).text()).toBe('e');
                // expect(wrapperT.find('ul li').at(0).find(`.${prefixTree}-switcher-disabled`)).toHaveLength(1);
            });
        })
        // attrsTestByLength({
        //     title: 'component: Tree, <test prop:: openTransitionName>, <test prop:: openAnimation>',
        //     Component: TreeDemo,
        //     attrs: {
        //         openTransitionName: "aaa-bbb"
        //     },
        //     selector: `.${prefixTree}-checkbox-checked`,
        //     nodeCount: 2,
        // })
        describe('component: Tree, <test prop:: renderTitle>', () => {
            it('it should tree data', () => {
                const wrapperT = mount(<Tree renderTitle={() => '123'} treeData={treeData}/>)
                expect(wrapperT.find(`.${prefixTree}-title`).at(0).text()).toBe('123');
            });
        })
        describe('component: Tree, <test prop:: getCheckboxAttrs>', () => {
            it('CheckboxAttrs should be set', () => {
                const wrapperT = mount(<Tree
                    checkable={true}
                    treeData={treeData}
                    getCheckboxAttrs={
                        treenodeProps => {
                            return {"fieldid": "tree-checkbox-xx"}
                        }
                    }
                />)
                expect(wrapperT.find(`.${prefix}-tree-checkbox`).at(0).prop("fieldid")).toBe("tree-checkbox-xx");
            });
        })
        // 新增fieldid测试
        describe('component: Tree, <test prop:: fieldid> ', () => {
            it('[@fieldid,"***_option_","***_tree_switcher"]', () => {
                let wrapper = mount(<Tree treeData={treeData}/>);
                expect(wrapper.find(`ul li`).at(0).props().fieldid).toBe(undefined);
                expect(wrapper.find(`span.${prefixTree}-switcher`).at(0).props().fieldid).toBe(undefined);
                wrapper.setProps({ fieldid: 'test' });
                expect(wrapper.find(`ul li`).at(0).props().fieldid).toBe("test_option_0-0");
                expect(wrapper.find(`span.${prefixTree}-switcher`).at(0).props().fieldid).toBe("test_tree_switcher_0-0");
            });
            // [perf] (tree) 补充tree 节点的 fieldid
            it('补充tree 节点的 fieldid', () => {
                let wrapper = mount(<Tree showIcon checkable defaultExpandAll fieldid="test" >
                    <TreeNode title="parent 1" key="0-0" icon={<Icon type="uf-treefolder" />}>
                        <TreeNode title="parent 1-0" key="0-0-0" icon={<Icon type="uf-treefolder" />}>
                            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox icon={<Icon type="uf-list-s-o" />} />
                            <TreeNode title="leaf" key="0-0-0-1" icon={<Icon type="uf-list-s-o" />} />
                        </TreeNode>
                    </TreeNode>
                </Tree>);
                expect(wrapper.find(`.${prefixTree}-checkbox`).at(0).props().fieldid).toBe("test_tree_checkbox_0-0");
                expect(wrapper.find(`.${prefixTree}-checkbox-disabled`).at(0).props().fieldid).toBe(undefined);
                expect(wrapper.find(`.${prefixTree}-title`).at(0).props().fieldid).toBe("test_tree_title_0-0");
                expect(wrapper.find(`.${prefixTree}-iconEle`).at(0).props().fieldid).toBe("test_tree_icon_0-0");
            });
        });
        describe('jira test', () => {
            it('fix: [tree] lazyload下选中父节点叶子结点checkbox无法自动选中', () => {
                let wrapper = mount(<Tree lazyLoad checkable defaultExpandAll expandedKeys={["0-0", "0-1"]} treeData={treeData} />);
                expect(wrapper.find(`.${prefixTree}-checkbox-checked`)).toHaveLength(0);
                wrapper.find(`.${prefixTree}-checkbox`).at(0).simulate('click')
                expect(wrapper.find(`.${prefixTree}-checkbox-checked`)).toHaveLength(3);
            });
            it('fix: [tree] <test prop:: virtual>下选中父节点叶子结点checkbox无法自动选中', () => {
                let wrapper = mount(<Tree virtual checkable defaultExpandAll expandedKeys={["0-0", "0-1"]} treeData={treeData} />);
                expect(wrapper.find(`.${prefixTree}-checkbox-checked`)).toHaveLength(0);
                wrapper.find(`.${prefixTree}-checkbox`).at(0).simulate('click')
                expect(wrapper.find(`.${prefixTree}-checkbox-checked`)).toHaveLength(3);
            });
            it('#QDJCJS-8326 tree增加inverse属性  <test prop:: inverse>', () => {
                //inverse 实心选择框，样式cypress已测
                let wrapper = mount(<Tree checkable inverse defaultExpandAll >
                    <TreeNode title="parent" key="0-0-0">
                        <TreeNode title="leaf1" key="0-0-0-0" />
                        <TreeNode title="leaf2" key="0-0-0-1" />
                    </TreeNode>
                </Tree>);
                wrapper.find(`.${prefixTree}-checkbox`).at(0).simulate('click')
                expect(wrapper.find(`.${prefixTree}-checkbox`).at(0).hasClass(`${prefixTree}-checkbox-inverse`)).toEqual(true);
                expect(wrapper.find(`.${prefixTree}-checkbox`).at(0).hasClass(`${prefixTree}-checkbox-checked`)).toEqual(true);
            });
            it('fix: [tree] 修改当前rowheight的高度', () => {
                let wrapper = mount(<Tree lazyLoad checkable defaultExpandAll treeData={treeData} />);
                // dom 上get 不到css
                // expect(wrapper.find(`Tree`).at(1).instance().store.getState().rowHeight).toEqual(28);
            });
            it('onDragEnter增加回调参数', async () => {
                // event: e,
                // node: treeNode,
                // expandedKeys: expandedKeys && [...expandedKeys] || [...this.state.expandedKeys],
                // dropPosition: this.dropPosition + Number(posArr[posArr.length - 1]),
                const onDragEnter = jest.fn()
                const onDragStart = jest.fn()
                const onDrop = jest.fn()
                let wrapper = mount(<Tree draggable
                    defaultExpandedKeys={['0-0-0-0', '0-0', '0-0-0',]}
                    onDragEnter={onDragEnter}
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                >
                    <TreeNode title="0-0" key="0-0">
                        <TreeNode title="0-0-0" key="0-0-0" >
                            <TreeNode title="0-0-0-0" key="0-0-0-0" />
                            <TreeNode title="0-0-0-1" key="0-0-0-1" />
                        </TreeNode>
                        <TreeNode title="0-0-1" key="0-0-1" >
                            <TreeNode title="0-0-1-0" key="0-0-1-0" />
                            <TreeNode title="0-0-1-1" key="0-0-1-1" />
                        </TreeNode>
                    </TreeNode>
                </Tree>);
                expect(wrapper.find('ul li')).toHaveLength(5)
                expect(wrapper.find(`.${prefixTree}-noline_open`)).toHaveLength(2)
                // tree 拖拽全过程 'dragstart' 'dragenter' 'drop'
                wrapper.find(`a[title="0-0-0-1"]`).at(0).simulate('dragstart')
                wrapper.find(`a[title="0-0-1"]`).at(0).simulate('dragenter')
                //检查epandedkeys
                expect(wrapper.find(`.${prefixTree}-noline_open`)).toHaveLength(2)

                // expect(wrapper.find(`Tree`).at(1).state().expandedKeys).toEqual(["0-0-0-0", "0-0-0", "0-0"]);
                await sleep(500)
                //检查epandedkeys
                expect(wrapper.find(`.${prefixTree}-noline_open`).length).toBe(2)

                // expect(wrapper.find(`Tree`).at(1).state().expandedKeys).toEqual(["0-0-0-0", "0-0-0", "0-0", "0-0-1"]);
                wrapper.find(`a[title="0-0-1"]`).at(0).simulate('drop')
                expect(Object.keys(onDragStart.mock.calls[0][0])).toEqual(["event", "node"])
                expect(Object.keys(onDragEnter.mock.calls[0][0])).toEqual(["event", "node", "expandedKeys", "dropPosition"])
                console.log(Object.keys(onDrop.mock.calls[0][0]))
                expect(Object.keys(onDrop.mock.calls[0][0])).toEqual(["event", "node", "dragNode", "dragNodesKeys", "dropPosition", "dropToGap"])
                //具体拖拽效果cypress测
            });
            it('[feat] (tree) QDJCJS-10447 拖拽时父级节点展开时长优化', async () => {
                const onDragEnter = jest.fn()
                const onDragStart = jest.fn()
                const onDrop = jest.fn()
                let wrapper = mount(<Tree draggable dragDelayExpandTime={1000}
                    defaultExpandedKeys={['0-0-0-0']}
                    onDragEnter={onDragEnter}
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                >
                    <TreeNode title="0-0" key="0-0">
                        <TreeNode title="0-0-0" key="0-0-0" >
                            <TreeNode title="0-0-0-0" key="0-0-0-0" />
                            <TreeNode title="0-0-0-1" key="0-0-0-1" />
                        </TreeNode>
                        <TreeNode title="0-0-1" key="0-0-1" >
                            <TreeNode title="0-0-1-0" key="0-0-1-0" />
                            <TreeNode title="0-0-1-1" key="0-0-1-1" />
                        </TreeNode>
                    </TreeNode>
                </Tree>);
                // tree 拖拽全过程 'dragstart' 'dragenter' 'drop'
                wrapper.find(`a[title="0-0-0-1"]`).at(0).simulate('dragstart')
                wrapper.find(`a[title="0-0-1"]`).at(0).simulate('dragenter')
                await sleep(500)
                //检查epandedkeys
                expect(wrapper.find(`.${prefixTree}-noline_open`)).toHaveLength(2)

                // expect(wrapper.find(`Tree`).at(1).state().expandedKeys).toEqual(["0-0-0-0", "0-0-0", "0-0"]);
                await sleep(1000)
                //检查epandedkeys
                expect(wrapper.find(`.${prefixTree}-noline_open`)).toHaveLength(2)
                
                // expect(wrapper.find(`Tree`).at(1).state().expandedKeys).toEqual(["0-0-0-0", "0-0-0", "0-0", "0-0-1"]);
                wrapper.find(`a[title="0-0-1"]`).at(0).simulate('drop')
                expect(Object.keys(onDragStart.mock.calls[0][0])).toEqual(["event", "node"])
                expect(Object.keys(onDragEnter.mock.calls[0][0])).toEqual(["event", "node", "expandedKeys", "dropPosition"])
                expect(Object.keys(onDrop.mock.calls[0][0])).toEqual(["event", "node", "dragNode", "dragNodesKeys", "dropPosition", "dropToGap"])
            });
            it('fix: [tree] #QDJCJS-8461 解决传treeData时,向上快捷键定位有误', () => {
                let wrapper = mount(<Tree focusable checkable autoSelectWhenFocus defaultExpandAll treeData={treeData} />);
                wrapper.find(`.${prefixTree}`).at(0).simulate('focus');
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).some(`${prefixTreeNode}-selected`)).toBeFalsy();
                wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(0).simulate('keydown', { keyCode: KeyCode.DOWN })
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(1).hasClass(`${prefixTreeNode}-selected`)).toBeTruthy();

                wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(1).simulate('keydown', { keyCode: KeyCode.UP })
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(0).hasClass(`${prefixTreeNode}-selected`)).toBeTruthy();
            });
            it('fix: QDJCJS-4854 给Tree的onSelect方法加上event对象', () => {
                const onSelect = jest.fn()
                let wrapper = mount(<Tree focusable checkable autoSelectWhenFocus defaultExpandAll treeData={treeData} onSelect={onSelect} />);
                wrapper.find(`.${prefixTree}`).at(0).simulate('focus');
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).some(`${prefixTreeNode}-selected`)).toBeFalsy();
                wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(0).simulate('keydown', { keyCode: KeyCode.DOWN }) //通过快捷键触发选中事件
                expect(wrapper.find(`.${prefixTreeNode}-content-wrapper`).at(1).hasClass(`${prefixTreeNode}-selected`)).toBeTruthy();
                expect(onSelect.mock.calls[0][0]).toEqual(["0-0-0"])
                expect(onSelect.mock.calls[0][1].event).toEqual('select')
            });
            it('feat: [tree] 增加visibleCheckbox属性 fix: [tree] 修改visibleCheckbox的限制条件', () => {
                let wrapper = mount(<Tree checkable defaultExpandAll >
                    <TreeNode title="parent" visibleCheckbox key="0-0-0">
                        <TreeNode title="leaf1" visibleCheckbox={false} key="0-0-0-0" />
                        <TreeNode title="leaf2" key="0-0-0-1" />
                    </TreeNode>
                </Tree>);
            });
        });
    });
})
describe('component: Tree, <test prop:: lazyLoad>, <test prop:: checkable>, <test prop:: onCheck> ', () => {

    it('should fire check event', () => {
        const mockCheck = jest.fn()
        const tree = mount(<TreeDemo5 onCheck={mockCheck}></TreeDemo5>);
        const ele = tree.find(`li.${prefixTree}-treenode`).at(0).find(`span.${prefixTree}-checkbox`).at(0);

        ele.simulate("click");
        expect(mockCheck).toHaveBeenCalled()
        expect(mockCheck.mock.calls[0][0].indexOf('0-0') > -1).toEqual(true);

    });
})
describe('TreeDemo5', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
        wrapper = mount(<TreeDemo5/>);
    })
    afterEach(() => {
        if (wrapper && wrapper.length) {
            wrapper.unmount();
        }
    })
    describe('component: Tree, <test prop:: lazyLoad>, <test prop:: checkable>, <test prop:: showLine> ', () => {
        it('should load trees width lazyLoad', () => {
            expect(wrapper.find('ul').at(0).hasClass(`${prefixTree}-show-line`)).toBeTruthy();
            const li = wrapper.find(`li.${prefixTree}-treenode`);
            const checkboxes = wrapper.find(`span.${prefixTree}-checkbox`);
            expect(li).toHaveLength(12)
            expect(checkboxes).toHaveLength(12)
            li.at(1).find(`.${prefixTree}-switcher`).first().simulate('click');
            expect(wrapper.find(`li.${prefixTree}-treenode`)).toHaveLength(9)
            expect(wrapper.find(`span.${prefixTree}-checkbox`)).toHaveLength(9)
        });
    });

    describe('component: Tree, <test prop:: lazyLoad>', () => {
        it('should load trees width lazyLoad and no checkboxes', () => {
            wrapper.setProps({checkable: false})
            wrapper.update();
            const li = wrapper.find(`li.${prefixTree}-treenode`);
            const checkboxes = wrapper.find(`span.${prefixTree}-checkbox`);
            expect(li).toHaveLength(12)
            expect(checkboxes).toHaveLength(0)
            li.at(1).find(`.${prefixTree}-switcher`).first().simulate('click');
            expect(wrapper.find(`li.${prefixTree}-treenode`)).toHaveLength(9)
        });
    });
    describe('component: Tree, <test prop:: lazyLoad>, <test prop:: treeData>', () => {
        it('should load trees width receive treeData', () => {
            wrapper.setProps({treeData: [
                {
                    title: '0-0',
                    key: '0-0',
                    ext: '自定义属性',
                    children: [
                        {
                            title: '0-0-0',
                            key: '0-0-0',
                            children: [
                                {title: '0-0-0-0', key: '0-0-0-0'},
                                {title: '0-0-0-1', key: '0-0-0-1'},
                                {title: '0-0-0-2', key: '0-0-0-2'},
                            ],
                        },
                        {
                            title: '0-0-1',
                            key: '0-0-1',
                            children: [
                                {title: '0-0-1-0', key: '0-0-1-0'},
                                {title: '0-0-1-1', key: '0-0-1-1'},
                                {title: '0-0-1-2', key: '0-0-1-2'},
                            ],
                        },
                        {
                            title: '0-0-2',
                            key: '0-0-2',
                        },
                    ],
                }]})
            wrapper.update();
            const li = wrapper.find(`li.${prefixTree}-treenode`);
            const checkboxes = wrapper.find(`span.${prefixTree}-checkbox`);
            expect(li).toHaveLength(10)
            expect(checkboxes).toHaveLength(10)
            li.at(0).find(`.${prefixTree}-switcher`).first().simulate('click');
            expect(wrapper.find(`li.${prefixTree}-treenode`)).toHaveLength(1)
        });
    });
})
/**
  _treeNodesStates: PropTypes.object,
  getScrollContainer: PropTypes.func,
  debounceDuration: PropTypes.number,
  mustExpandable: PropTypes.bool,
 */
