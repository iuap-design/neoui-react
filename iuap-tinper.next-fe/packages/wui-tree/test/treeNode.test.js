/** TreeNode.tsx */
import {mount, ReactWrapper} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, eventsTest, testCustomStyle, testStyle} from "../../../next-ui-library/test/common/index"

import {prefix} from '../../wui-core/src/updatePrefix';

import TreeNode from '../src';
import TreeNodeDemo from './treeNodeClass';

const prefixTree = `${prefix}-tree`;
const prefixTreeNode = `${prefix}-tree-node`;
const prefixTreeTreeNode = `${prefix}-tree-treenode`;


//   clsPrefix: PropTypes.string,
//   disabled: PropTypes.bool,
//   disableCheckbox: PropTypes.bool,
//   expanded: PropTypes.bool,
//   isLeaf: PropTypes.bool,
//   root: PropTypes.object,
//   onSelect: PropTypes.func,
//   openIcon: PropTypes.element,
//   closeIcon: PropTypes.element,
//   style: PropTypes.object,
//   className: PropTypes.string,
//   titleClass:PropTypes.string,
//   titleStyle:PropTypes.object,
//   switcherClass:PropTypes.string,
//   switcherStyle:PropTypes.object
describe('component: TreeNode', () => {

    let wrapper: ReactWrapper;
    beforeEach(() => {
        wrapper = mount(<TreeNodeDemo/>);
    })
    afterEach(() => {
        if (wrapper && wrapper.length) {
            wrapper.unmount();
        }
    })

    describe('component: TreeNode, <test prop:: disabled> ', () => {
        it('parent node should has class noline_open', () => {
            wrapper.setProps({
                disabled: true
            })
            wrapper.update()
            expect(wrapper.find(`ul li`).at(1).hasClass(`${prefixTreeTreeNode}-disabled`)).toBe(true);
        });
    })
    describe('component: TreeNode, <test prop:: disableCheckbox> ', () => {
        it('parent node should has class noline_open', () => {
            wrapper.setProps({
                disableCheckbox: true
            })
            wrapper.update()
            expect(wrapper.find(`ul li .${prefixTree}-checkbox`).at(1).hasClass(`${prefixTree}-checkbox-disabled`)).toBe(true);
        });
    })
    describe('component: TreeNode, <test prop:: selectable> ', () => {
        it('parent node should has class noline_open', () => {
            wrapper.setProps({
                selectable: false
            })
            wrapper.update()
            wrapper.find(`.${prefixTreeNode}-content-wrapper`).first().simulate('click')
            expect(wrapper.find(`ul li`).at(1).hasClass(`${prefixTreeTreeNode}-selected`)).toBe(false);
        });
    })
    describe('component: TreeNode, <test prop:: isLeaf> ', () => {
        it('parent node should has class noline_open', () => {
            wrapper.setProps({
                isLeaf: false
            })
            expect(wrapper.find(`ul li span.${prefixTree}-switcher`).at(1)).toHaveLength(1);
        });
    })
})
testStyle({
    title: 'component: TreeNode, <test prop:: style>',
    selector: `ul li`,
    Component: TreeNodeDemo,
    style: {
        color: 'red'
    }
})
testCustomStyle({
    title: 'component: TreeNode, <test prop:: titleStyle>',
    Component: TreeNodeDemo,
    attrs: {
        titleStyle: {
            color: 'red'
        }
    },
    selector: `.${prefixTree}-title`,
    verifyStyle: {'color': "red"}
});
testCustomStyle({
    title: 'component: TreeNode, <test prop:: switcherStyle>',
    Component: TreeNodeDemo,
    attrs: {
        switcherStyle: {
            color: 'red'
        }
    },
    selector: `.${prefixTree}-switcher`,
    verifyStyle: {'color': "red"}
});
attrsTest({
    title: 'component: TreeNode, <test prop:: switcherClass>',
    Component: TreeNodeDemo,
    attrs: {
        switcherClass: 'aaa'
    },
    testAttr: {
        switcherClass: ''
    },
    selector: `.${prefixTree}-switcher`,
    classnames: [`aaa`],
})
// describe('component: TreeNode1 ', () => {
//     let wrapper: ReactWrapper;
//     beforeEach(() => {
//         wrapper = mount(<TreeNodeDemo1 />);
//     })
//     afterEach(() => {
//         if (wrapper && wrapper.length) {
//             wrapper.unmount();
//         }
//     })
//     describe('component: TreeNode, <test prop:: openIcon> ', () => {
//         it('parent node should has class noline_open', () => {
//             wrapper.setProps({
//                 openIcon: 'x'
//             })
//             expect(wrapper.find(`ul li .${prefixTree}-switcher`)).toMatchSnapshot();
//             expect(wrapper.find(`ul li .${prefixTree}-switcher`).at(0).text()).toBe('x');
//         });
//     })

// })

xdescribe('component: TreeNode, <test prop:: closeIcon> ', () => {
    it('parent node should has class noline_open', () => {
        const tree = mount(
            <TreeNode
                defaultExpandAll={false}
                showIcon
                selectable
                checkable
                checkedKeys={[]}>
                <TreeNode closeIcon='o' openIcon="o" title="parent 1" key="0-0">
                    <TreeNode title="leaf" key="0-0-0-1"/>
                </TreeNode>
            </TreeNode>
        );
        expect(tree.find(`ul`).at(0).getDOMNode()).toMatchSnapshot();
        expect(tree.find(`ul li .${prefixTree}-switcher`).at(0).text()).toBe('o');
    });
})
