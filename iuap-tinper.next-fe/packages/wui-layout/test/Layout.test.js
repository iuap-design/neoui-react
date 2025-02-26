/** Layout.tsx */
import {shallow, mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {prefix} from '../../wui-core/src/updatePrefix';
// import { sleep } from '../../../next-ui-library/test/common/utils';
import Layout, {Col, Row} from '../src/index';
import Menu from '../../wui-menu/src';
import {actWait} from "../../../next-ui-library/test/common";
import {Footer} from "../src/Layout";

const {Header, Content, Sider, Container, Spliter} = Layout;

const layoutPrefix = `.${prefix}-layout`;

let mockWidth = 2700;
jest.spyOn(window, 'matchMedia').mockImplementation(
    (x) => {
        if (x === '(max-width: 600px)') {
            return {
                matches: mockWidth < 600,
                media: '(max-width: 600px)',
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
        }
        if (x === '(min-width: 600px)') {
            return {
                matches: mockWidth >= 600,
                media: '(min-width: 600px)',
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
        }
        if (x === '(min-width: 1000px)') {
            return {
                matches: mockWidth >= 1000,
                media: '(min-width: 1000px)',
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
        }
        if (x === '(min-width: 1340px)') {
            return {
                matches: mockWidth >= 1340,
                media: '(min-width: 1340px)',
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
        }
        if (x === '(min-width: 1900px)') {
            return {
                matches: mockWidth >= 1900,
                media: '(min-width: 1900px)',
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
        }
        if (x === '(min-width: 2500px)') {
            return {
                matches: mockWidth >= 2500,
                media: '(min-width: 2500px)',
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
        }
    }
);

describe('test row', function() {
    it('row', function() {
        let wrapper = shallow(<Row/>);
        expect(wrapper.find(`.${prefix}-row`).length).toBe(1);
        wrapper.unmount(); // 为了清除window.matchMedia 记录
    });
});
describe('test col', function() {
    it('<test prop:: span>', function() {   
        let colMd = mount(<Col span={6}/>);
        expect(colMd.find(`.${prefix}-col-6`).length).toBe(1);
        colMd.unmount();
    });
    it('<test prop:: xxl>, <test prop:: xl>, <test prop:: lg>, <test prop:: md>, <test prop:: sm>, <test prop:: xs>, <test prop:: xxlPull>, <test prop:: xlPull>, <test prop:: lgPull>, <test prop:: mdPull>, <test prop:: smPull>, <test prop:: xsPull>,  <test prop:: mdOffset>', function() {
        const demo = <Col xxl={1} xxlPull={11} xl={2} xlPull={10} lg={4} lgPull={8} md={6} mdPull={6} mdOffset={4} sm={8} smPull={4} xs={12} xsPull={2} />;
        let wrapper = mount(demo);
        expect(wrapper.find(`.${prefix}-col-xxl-1`).length).toBe(1);
        expect(wrapper.find(`.${prefix}-col-xxl-pull-11`).length).toBe(1);
        wrapper.unmount();

        mockWidth = 2000;
        wrapper = mount(demo);
        expect(wrapper.find(`.${prefix}-col-xl-2`).length).toBe(1);
        expect(wrapper.find(`.${prefix}-col-xl-pull-10`).length).toBe(1);
        wrapper.unmount();

        mockWidth = 1500;
        wrapper = mount(demo);
        expect(wrapper.find(`.${prefix}-col-lg-4`).length).toBe(1);
        expect(wrapper.find(`.${prefix}-col-lg-pull-8`).length).toBe(1);
        wrapper.unmount();

        mockWidth = 1200;
        wrapper = mount(demo);
        // expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(`.${prefix}-col-md-6`).length).toBe(1);
        expect(wrapper.find(`.${prefix}-col-md-pull-6`).length).toBe(1);
        expect(wrapper.find(`.${prefix}-col-md-offset-4`).length).toBe(1);
        wrapper.unmount();

        mockWidth = 800;
        wrapper = mount(demo);
        expect(wrapper.find(`.${prefix}-col-sm-8`).length).toBe(1);
        expect(wrapper.find(`.${prefix}-col-sm-pull-4`).length).toBe(1);
        wrapper.unmount();

        mockWidth = 500;
        wrapper = mount(demo);
        expect(wrapper.find(`.${prefix}-col-xs-12`).length).toBe(1);
        expect(wrapper.find(`.${prefix}-col-xs-pull-2`).length).toBe(1);
        wrapper.unmount();
    });
    it('col flex, <test prop:: flex>', () => {
        const wrapper = mount(
            <Row>
                <Col flex={2}>2 / 5</Col>
                <Col flex={3}>3 / 5</Col>
            </Row>
        );
        expect(wrapper.find('.wui-col').at(0).props().style).toEqual({flex: '2 2 auto'});
        expect(wrapper.find('.wui-col').at(1).props().style).toEqual({flex: '3 3 auto'});
        wrapper.unmount();
    });
    it('col gutter,  <test prop:: gutter>', () => {
        const Demo = ({gutter}) => {
            return (
                <Row gutter={gutter}>
                    <Col span={12}>
                        <div className='grayDeep'>row-1-col-1</div>
                    </Col>
                    <Col span={12}>
                        <div className='gray'>row-1-col-2</div>
                    </Col>
                    <Col span={12}>
                        <div className='grayLight'>row-1-col-3</div>
                    </Col>
                    <Col span={12}>
                        <div className='grayDeep'>row-1-col-4</div>
                    </Col>
                </Row>
            )
        };
        const wrapper1 = mount(<Demo gutter={24} />);
        expect(wrapper1.find(`.${prefix}-row`).first().getDOMNode().style.marginLeft).toBe('-12px');
        expect(wrapper1.find(`.${prefix}-row`).first().getDOMNode().style.marginBottom).toBe('');
        wrapper1.unmount();

        const wrapper2 = mount(<Demo gutter={[24, 48]} />);
        expect(wrapper2.find(`.${prefix}-row`).first().getDOMNode().style.marginLeft).toBe('-12px');
        expect(wrapper2.find(`.${prefix}-row`).first().getDOMNode().style.marginBottom).toBe('-24px');
        wrapper2.unmount();

        mockWidth = 1000;
        const wrapper3 = mount(<Demo gutter={{md: 48, sm: 12}} />);
        expect(wrapper3.find(`.${prefix}-row`).first().getDOMNode().style.marginLeft).toBe('-24px');
        wrapper3.unmount()
    })

});

describe('test Layout Com', () => {
    const Demo = ({siderProps, ...others}) => (
        <Layout {...others} className="layout-triger">
            <Sider {...siderProps} theme='dark'>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                    nav 1
                    </Menu.Item>
                    <Menu.Item key="2">
                    nav 2
                    </Menu.Item>
                    <Menu.Item key="3">
                    nav 3
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{border: '1px solid #eee'}}>
                <Header style={{ padding: 0, background: '#fff', borderBottom: '1px solid #eee' }}>
                    Header
                </Header>
                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: '#fff'
                }}>
                Content
                </Content>
            </Layout>
        </Layout>
    );

    const SpliterDemo = (props) => (
        <>
            <Spliter {...props}>
                <Content style={{padding: '0 50px', background: '#f5f5f5'}}>
                    Content 1
                </Content>
                <Content style={{padding: '0 50px', background: '#f5f5f5'}}>
                    Content 2
                    <p>.........</p>
                    <p>.........</p>
                    <p>.........</p>
                </Content>
            </Spliter>
        </>
    );

    it(`use Layout Header Content Footer, <test prop:: collapsible>, <test prop:: onCollapse>`, () => {
        const onCollapseEvent = jest.fn();
        const wrapper = mount(<Demo siderProps={{ collapsible: true, onCollapse: onCollapseEvent }} />);
        wrapper.find(`${layoutPrefix}-sider-trigger`).at(0).simulate('click');
        expect(wrapper.find(`${layoutPrefix}-sider-collapsed`).length).toBe(1);
        expect(onCollapseEvent).toHaveBeenCalled();
    })

    it(`use Layout Header Content Footer, <test prop:: collapsedWidth>, <test prop:: defaultCollapsed>, <test prop:: collapsed>`, () => {
        const defaultSiderProps = {collapsedWidth: 0, collapsible: true, defaultCollapsed: true}
        const wrapper = mount(<Demo siderProps={{...defaultSiderProps}} />);
        expect(wrapper.find(`${layoutPrefix}-sider-zero-width`).length).toBe(1);
        expect(wrapper.find(`${layoutPrefix}-sider-zero-width`).instance().getAttribute('style')
        ?.includes(`width: 0`)).toBe(true);
        wrapper.setProps({siderProps: {...defaultSiderProps, collapsed: false}});
        wrapper.update();
        expect(wrapper.find(`${layoutPrefix}-sider-collapsed`).length).toBe(0);
    })

    it(`use Layout Container, <test prop:: Container>`, () => {
        const ContainerCom = mount(<Container componentClass="span" />);
        expect(ContainerCom.find('span').at(0).hasClass(`${prefix}-container`)).toEqual(true);
    })

    it(`use Layout Sider, <test prop:: breakpoint>,  <test prop:: onBreakpoint>`, () => {
        const onBreakpointEvent = jest.fn();
        const wrapper = mount(<Demo siderProps={{ collapsible: true, breakpoint: 'md', onBreakpoint: onBreakpointEvent }} />);
        wrapper.unmount();
        expect(onBreakpointEvent).toHaveBeenCalled();
    })

    it(`use Layout Spliter, <test prop:: collapsible>,  <test prop:: onCollapse>`, () => {
        const onCollapseEvent = jest.fn();
        const wrapper = mount(
        <SpliterDemo
            size={60}
            maxSize={400}
            minSize={50}
            direction="horizontal"
            collapsible
            onCollapse={onCollapseEvent}
        />);
        expect(wrapper.find(`.${prefix}-spliter-collapsed`).length).toBe(1);
        wrapper.find(`.${prefix}-spliter-resizer-trigger`).at(0).simulate('click');
        expect(wrapper.find(`.${prefix}-spliter-resizer-trigger-collapsed`).length).toBe(1);
        expect(onCollapseEvent).toHaveBeenCalled();
    })

    it(`use Layout Spliter, <test prop:: onDragStarted>, <test prop:: onDragMove>,  <test prop:: onDragFinished>`, async () => {
        const dragStartedEvent = jest.fn()
        const dragMoveEvent = jest.fn()
        const dragFinishedEvent = jest.fn()
        const wrapper = mount(
            <SpliterDemo
                size={60}
                maxSize={400}
                minSize={50}
                onDragStarted={dragStartedEvent}
                onDragMove={dragMoveEvent}
                onDragFinished={dragFinishedEvent}
                id="test"
            />, {attachTo: document});
            const mouseDown = new MouseEvent('mousedown', { bubbles: true });
            document.querySelector(`.wui-spliter-resizer-line`).dispatchEvent(mouseDown);
            expect(dragStartedEvent).toHaveBeenCalled();

            const mouseMove = new MouseEvent('mousemove', { bubbles: true, clientX: 100 });
            let boundRect = {
                top: 20,
                bottom: 20,
                left: 20,
                right: 1000,
                width: 100,
                height: 100
            }
            jest.spyOn(document.querySelector('.wui-spliter-first'), 'getBoundingClientRect').mockReturnValue(boundRect)
            await actWait();
            document.querySelector(`.wui-spliter-resizer-line`).dispatchEvent(mouseMove);
            expect(dragMoveEvent).toHaveBeenCalled();

            const touchStart = new TouchEvent('touchstart', { touches: [{clientX: 100}], bubbles: true });
            document.querySelector(`.wui-spliter-resizer-line`).dispatchEvent(touchStart);
            expect(dragStartedEvent).toHaveBeenCalled();
            
            const TouchEnd = new TouchEvent('touchend', { bubbles: true });
            await actWait();
            document.querySelector(`.wui-spliter-resizer-line`).dispatchEvent(TouchEnd);
            expect(dragFinishedEvent).toHaveBeenCalled();
    })

    //程序内已写死tagName为section、header、footer、main
    it(`use Layout attr tagName, <test prop:: tagName>`, () => {
        const layoutCom = mount(<Layout/>);
        const headerCom = mount(<Header/>);
        const footerCom = mount(<Footer/>);
        const contentCom = mount(<Content/>);
        expect(layoutCom.find('section').length).toEqual(1);
        expect(headerCom.find('header').length).toEqual(1);
        expect(footerCom.find('footer').length).toEqual(1);
        expect(contentCom.find('main').length).toEqual(1);
    })
})
