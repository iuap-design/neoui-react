/** Panel.tsx */
import {mount, shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';

import {attrsTest, eventsTest, testCustomStyle} from "../../../next-ui-library/test/common/index";
import {prefix} from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src'
// import {mockCreate} from "../../wui-message/src/index";
import Collapse from '../src/index'

const prefixCollapse = `${prefix}-collapse`;
jest.mock('../../wui-message/src/index');

const {Panel} = Collapse

describe('component: Panel, <test prop:: header>,<test prop:: footer>', () => {
    it('Panel should be exist', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel header={title} footer='Panel footer'>
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}-heading`).length).toEqual(1);
        expect(panel.find(`.${prefixCollapse}-title`).length).toEqual(1);
        expect(panel.find(`.${prefixCollapse}-body`).length).toEqual(1);
        expect(panel.find(`.${prefixCollapse}-footer`).length).toEqual(1);
        expect(panel.find('a').text()).toEqual('Panel title');
    });

});

describe('component: Panel, <test prop:: defaultExpanded>', () => {
    it('Panel should be expanded', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel defaultExpanded={true} header={title} footer='Panel footer'
        >
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}`).hasClass(`${prefix}-panel-show`)).toBeTruthy()
    });
});
describe('component: Panel, <test prop:: headerRole>', () => {
    it('Panel should be expanded', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel headerRole='master' header={title} footer='Panel footer'
        >
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}-heading a`).props().role).toBe('master')
    });
});
describe('component: Panel, <test prop:: panelRole>', () => {
    it('Panel should be expanded', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel panelRole='master' header={title} footer='Panel footer'
        >
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}-collapse`).props().role).toBe('master')
    });
});

// attrsTest({
//     title: 'component: Panel, <test prop:: expandIconPosition>',
//     Component: Panel,
//     attrs: {
//         expandIconPosition: 'right',
//         showArrow: true,
//         header: <h3>Panel title</h3>
//     },
//     selector: `.${prefixCollapse}-heading Icon i`,
//     classnames: [`${prefixCollapse}-icon-right`]
// })
// attrsTest({
//     title: 'component: Panel, <test prop:: showArrow>',
//     Component: Panel,
//     attrs: {
//         showArrow: true,
//         header: <h3>Panel title</h3>
//     },
//     selector: `.${prefixCollapse}-heading Icon i`,
//     classnames: [`${prefixCollapse}-header-icon`]
// })
describe('component: Panel, <test prop:: copyable>', () => {
    let panel
    beforeEach(() => {
        // mockCreate.mockClear();
        const title = (
            <h3>Panel title</h3>
        );
        panel = shallow(<Panel copyable={true} header={title} footer='Panel footer'
        >
			<div>Panel content</div>
        </Panel>);
    })
    it('copyable button should be show', () => {

        expect(panel.find(`.${prefixCollapse}-body i`).hasClass(`${prefixCollapse}-copy`)).toBe(true)
    });
});
// attrsTest({
//     title: 'component: Panel, <test prop:: bordered>',
//     Component: Panel,
//     attrs: {
//         bordered: true
//     },
//     testAttr: {
//         bordered: false
//     },
//     selector: `.${prefixCollapse}`,
//     classnames: [`${prefixCollapse}-borderless`]
// })
// attrsTest({
//     title: 'component: Panel, <test prop:: expanded>',
//     Component: Panel,
//     attrs: {
//         expanded: true
//     },
//     testAttr: {
//         expanded: false
//     },
//     selector: `.${prefixCollapse}`,
//     classnames: [`${prefix}-panel-show`]
// })

// attrsTest({
//     title: 'component: Panel, <test prop:: ghost>',
//     Component: Panel,
//     attrs: {
//         ghost: true
//     },
//     testAttr: {
//         ghost: false
//     },
//     selector: `.${prefixCollapse}`,
//     classnames: [`${prefixCollapse}-ghost`]
// })
// attrsTest({
//     title: 'component: Panel, <test prop:: expandIcon>',
//     Component: Panel,
//     attrs: {
//         expandIcon: <Icon type="uf-dongjie"/>,
//         header: <h3>Panel title</h3>
//     },
//     selector: `.${prefixCollapse}-heading Icon i`,
//     classnames: [`uf-dongjie`]
// })

describe('component: Panel, testing-library expandIcon', () => {
    it('component: Panel, <test prop:: expandIcon>', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel header={title} footer='Panel footer' expandIcon={<Icon type="uf-dongjie"/>}>
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}-header-icon`).hasClass('uf-dongjie')).toEqual(true)
        panel.unmount()
    });
    it('component: Panel, <test prop:: ghost>', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel header={title} footer='Panel footer' ghost={true}>
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}`).hasClass(`${prefixCollapse}-ghost`)).toEqual(true)
        panel.unmount()
    });
    it('component: Panel, <test prop:: expanded>', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel header={title} footer='Panel footer' expanded={true}>
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}`).hasClass(`wui-panel-show`)).toEqual(true)
        panel.unmount()
    });
    it('component: Panel, <test prop:: bordered>', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel header={title} footer='Panel footer' bordered={true}>
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}`).hasClass(`${prefixCollapse}-borderless`)).toEqual(true)
        panel.unmount()
    });
    it('component: Panel, <test prop:: showArrow>', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel header={title} footer='Panel footer' showArrow={true}>
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}`).hasClass(`${prefixCollapse}-arrow`)).toEqual(true)
        panel.unmount()
    });
    it('component: Panel, <test prop:: expandIconPosition>', () => {
        const title = (
            <h3>Panel title</h3>
        );
        let panel = shallow(<Panel header={title} footer='Panel footer' expandIconPosition='right'>
			Panel content
        </Panel>);
        expect(panel.find(`.${prefixCollapse}`).hasClass(`${prefixCollapse}-icon-position-right`)).toEqual(true)
        panel.unmount()
    });
});

testCustomStyle({
    title: 'component: Panel, <test prop:: headerStyle>',
    Component: Panel,
    attrs: {
        header: "Panel 1",
        headerStyle: {
            color: 'red'
        }
    },
    selector: `.${prefixCollapse}-heading`,
    verifyStyle: {color: 'red'}
});
testCustomStyle({
    title: 'component: Panel, <test prop:: footerStyle>',
    Component: Panel,
    attrs: {
        footer: "Panel 1",
        footerStyle: {
            color: 'red'
        }
    },
    selector: `.${prefixCollapse}-footer`,
    verifyStyle: {color: 'red'}
});
describe('component: Panel, <test prop:: collapsible>', () => {
    attrsTest({
        title: 'component: Collapse, <test prop:: collapsible>',
        Component: Panel,
        attrs: {
            collapsible: 'disabled'
        },
        selector: `.${prefixCollapse}`,
        classnames: [`${prefixCollapse}-item-disabled`]
    })
    it('collapsible: click event', () => {
        const mPanel = mount(<Panel header={<h3>Panel title</h3>} footer='Panel footer'/>)
        mPanel.setProps({
            collapsible: 'disabled'
        })
        expect(mPanel.find(`.${prefixCollapse}`).hasClass(`${prefix}-panel-show`)).toEqual(false)
        mPanel.find(`.${prefixCollapse}-title`).simulate('click');
        expect(mPanel.find(`.${prefixCollapse}`).hasClass(`${prefix}-panel-show`)).toEqual(false)
        mPanel.setProps({
            collapsible: 'header'
        })
        mPanel.find(`.${prefixCollapse}-title`).simulate('click');
        expect(mPanel.find(`.${prefixCollapse}`).hasClass(`${prefix}-panel-show`)).toEqual(true)
    })

});
describe('component: Panel, <test prop:: headerContent>', () => {
    it('it show content when headerContent was true', () => {
        const mPanel = mount(<Panel header={<h3>Panel title</h3>} headerContent={true}/>)
        expect(mPanel.find(`.${prefixCollapse}-heading h3`).text()).toEqual('Panel title')

        mPanel.setProps({
            headerContent: false
        })
        expect(mPanel.find(`.${prefixCollapse}-heading a`).text()).toEqual('Panel title')
    })

});
describe('component: Panel, <test prop:: extra>', () => {
    it('it show content when extra exit', () => {
        const mPanel = mount(<Panel header={<h3>Panel title</h3>} extra='right'/>)
        expect(mPanel.find(`.${prefixCollapse}-extra`).text()).toEqual('right')

        mPanel.setProps({
            extra: null
        })
        expect(mPanel.find(`.${prefixCollapse}-extra`)).toHaveLength(0)
    })

});
describe('component: Panel, <test prop:: forceRender>', () => {
    it('it has content when forceRender true', () => {
        const mPanel = mount(<Panel header={<h3>Panel title</h3>}>123</Panel>)
        expect(mPanel.find(`.${prefixCollapse}-body`).text()).toEqual('123')

        mPanel.setProps({
            forceRender: false
        })
        expect(mPanel.find(`.${prefixCollapse}-body`)).toHaveLength(0)
    })

});
describe('component: Panel, <test prop:: expanded>', () => {
    it('Panel collapsible', () => {

        class CollapsibleDemo extends React.Component {
            constructor(...args) {
                super(...args);
                this.state = {
                    open: true
                };
            }

            render() {
                const content = "some description";

                const title = (
                    <h3>Panel title</h3>
                )
                return (
                    <div>
                        <button onClick={() => this.setState({open: !this.state.open})}>
							click
                        </button>
                        <Panel collapsible expanded={false}>
                            {content}
                        </Panel>
                    </div>
                );
            }
        }

        let collapsibleDemo = mount(<CollapsibleDemo/>);
        collapsibleDemo.find('button').simulate('click');

        expect(collapsibleDemo.find(`.${prefixCollapse}`).hasClass(`wui-panel-hidden`)).toEqual(true)
        // expect(collapsibleDemo.state('open')).toEqual(false);
        // expect(collapsibleDemo.find(Panel).at(0).props().expanded).toEqual(false);
    });

});
// todo
// xdescribe('component: Collapse, <test prop:: destroyInactivePanel>', () => {
//     it('it should have a prop role ', () => {
//         let collapseDemo = mount(
//             <Panel header="Panel 1" key="1">测试测试 1</Panel>
//         );
//         expect(collapseDemo.find(`.${prefixCollapse}-body`).first().text()).toEqual('测试测试 1')
//         collapseDemo.setProps({
//             destroyInactivePanel: true
//         })
//         expect(collapseDemo.find(`.${prefixCollapse}-body`).first()).toHaveLength(0)

//     })
// })
describe('component: Collapse, <test prop:: onEnter>, <test prop:: onEntering>', () => {
    it('it should have a prop role ', () => {
        const mockEnter = jest.fn();
        const mockEntering = jest.fn();
        const mockEntered = jest.fn();
        let collapseDemo = mount(
            <Panel header="Panel 1" onEntered={mockEntered} onEntering={mockEntering} onEnter={mockEnter}>测试测试 1</Panel>
        );

        expect(mockEnter).not.toHaveBeenCalled()
        expect(mockEntering).not.toHaveBeenCalled()
        expect(mockEntered).not.toHaveBeenCalled()
        collapseDemo.find(`.${prefixCollapse}-title`).first().simulate('click');
        expect(mockEnter).toHaveBeenCalled()
        expect(mockEntering).toHaveBeenCalled()
    })
})
describe('component: Collapse, <test prop:: onExit>, <test prop:: onExiting>', () => {
    it('it should have a prop role ', () => {
        const mockonExit = jest.fn();
        const mockonExiting = jest.fn();
        const mockonExited = jest.fn();
        let collapseDemo = mount(
            <Panel header="Panel 1" onExited={mockonExited} onExiting={mockonExiting} onExit={mockonExit}>测试测试 1</Panel>
        );

        expect(mockonExit).not.toHaveBeenCalled()
        expect(mockonExiting).not.toHaveBeenCalled()
        expect(mockonExited).not.toHaveBeenCalled()
        // click twice
        collapseDemo.find(`.${prefixCollapse}-title`).first().simulate('click');
        collapseDemo.find(`.${prefixCollapse}-title`).first().simulate('click');
        expect(mockonExit).toHaveBeenCalled()
        expect(mockonExiting).toHaveBeenCalled()
    })
})
eventsTest({
    title: 'component: InputNumber, <test prop:: eventKey><test prop:: onSelect>',
    Component: Panel,
    propFuncName: 'onSelect',
    dependentProps: {header: 'Panel 1', eventKey: 'edg123'},
    selector: `.${prefixCollapse}-title`,
    eventName: 'click',
    eventArgs: [],
    propFuncArgs: ['edg123', 'mockEvent']
});
eventsTest({
    title: 'component: InputNumber, <test prop:: eventKey>,<test prop:: onSelect>,<test prop:: collapsible>',
    Component: Panel,
    propFuncName: 'onSelect',
    dependentProps: {header: 'Panel 1', eventKey: 'edg123', collapsible: 'header'},
    selector: `.${prefixCollapse}-title`,
    eventName: 'click',
    eventArgs: [],
    propFuncArgs: ['edg123', 'mockEvent']
});

describe('fieldid, <test prop:: fieldid>', () => {
    it('@fieldid,"***-panel_"', () => {
        const wrapper = mount(<Panel header="Panel header" footer='Panel footer' />);
        expect(wrapper.find(`.${prefixCollapse}`).find(`.${prefixCollapse}-heading`).prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixCollapse}`).find(`.${prefixCollapse}-heading`).prop('fieldid')).toEqual('fieldid-id-panel_');
    })
})
describe('Collapse Test', () => {
    it('component: Collapse, <test prop:: colors>', () => {
        const wrapper = mount(<Panel header="Panel header" footer='Panel footer' colors="default" />);
        expect(wrapper.find(`.${prefixCollapse}`).hasClass(`${prefixCollapse}-default`)).toEqual(true)
    });
    it('component: Collapse, <test prop:: parentFlag>', () => {
        const wrapper = mount(<Panel header="Panel header" footer='Panel footer' parentFlag={false} expanded={true} />);
        expect(wrapper.find(`.${prefixCollapse}`).hasClass(`wui-panel-show`)).toEqual(true)
    });
    it('component: Collapse, <test prop:: onEntered>', () => {
        const mockEntered = jest.fn();
        let collapseDemo = mount(
            <Panel header="Panel 1" onEntered={mockEntered}>测试测试 1</Panel>
        );
        expect(mockEntered).not.toHaveBeenCalled()
        collapseDemo.find(`.${prefixCollapse}-title`).first().simulate('click');
    })
    it('component: Collapse, <test prop:: onExited>', () => {
        const mockEntered = jest.fn();
        let collapseDemo = mount(
            <Panel header="Panel 1" onExited={mockEntered}>测试测试 1</Panel>
        );
        expect(mockEntered).not.toHaveBeenCalled()
        collapseDemo.find(`.${prefixCollapse}-title`).first().simulate('click');
    })
    it('component: Collapse, <test prop:: defaultActiveKey>', () => {
        let collapseDemo = mount(
            <Panel header="Panel 1" key="1" defaultActiveKey={'1'}>测试测试 1</Panel>
        );
        expect(collapseDemo.find(`.${prefixCollapse}`).hasClass(`wui-panel-hidden`)).toEqual(true)
    })
})