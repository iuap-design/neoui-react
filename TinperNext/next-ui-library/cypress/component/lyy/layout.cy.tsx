import React from "react";
import { Row, Col } from "../../../../packages/wui-layout/src";
import Layout from '../../../../packages/wui-layout/src';

import '../demo/demo-other/Demo8.scss';

const { Header, Footer, Content, Sider, Spliter } = Layout;

const grayDeep = {
    background: '#cdd9e6',
    height: '30px',
    marginBottom: '10px',
    lineHeight: '30px',
    // textAlign: 'center'
}

const gray = {
    background: '#e1e8f0',
    height: '30px',
    marginBottom: '10px',
    lineHeight: '30px',
    // textAlign: "center"
}

const grayLight = {
    background: '#edf1f7',
    height: '30px',
    marginBottom: '10px',
    color: 'rgb(66, 66, 66)',
    lineHeight: '30px'
}

// span 所有的值都要

const Demo1 = (
    <div>
        <Row justify="end" align="top" style={{height: '100px', background: '#eee'}}>
            <Col span={6}>
                <div style={{background: '#cdd9e6', height: '60px'}}>col-1</div>
            </Col>
            <Col span={6}>
                <div style={{background: '#e1e8f0', height: '60px'}}>col-2</div>
            </Col>
        </Row>
        <br/>
        <Row justify="center" align="middle" style={{height: '100px', background: '#eee'}}>
            <Col span={6}>
                <div style={{background: '#cdd9e6', height: '60px'}}>col-1</div>
            </Col>
            <Col span={6}>
                <div style={{background: '#e1e8f0', height: '60px'}}>col-2</div>
            </Col>
        </Row>
        <br/>
        <Row justify="space-between" align="bottom" style={{height: '100px', background: '#eee'}}>
            <Col span={6}>
                <div style={{background: '#cdd9e6', height: '60px'}}>col-1</div>
            </Col>
            <Col span={6}>
                <div style={{background: '#e1e8f0', height: '60px'}}>col-2</div>
            </Col>
            <Col span={6}>
                <div style={{background: '#cdd9e6', height: '60px'}}>col-2</div>
            </Col>
        </Row>
    </div>
)

const Demo2 = (
    <div>
        <Row gutter={24}>
            <Col xxl={1} xl={2} md={4} sm={6} xs={12}>
                <div style={grayDeep}>row-1-col-1</div>
            </Col>
            <Col lg={2} md={4} sm={6} xs={12}>
                <div style={gray}>row-1-col-2</div>
            </Col>
            <Col sm={6} xs={12}>
                <div style={grayLight}>row-1-col-3</div>
            </Col>
            <Col span={12}>
                <div style={grayDeep}>row-1-col-4</div>
            </Col>
        </Row>
        <Row gutter={{ xxl: 54, lg: 48, md: 24, sm: 12, xs: 6 }}>
            <Col span={12}>
                <div style={grayDeep}>row-2-col-1</div>
            </Col>
            <Col span={12}>
                <div style={gray}>row-2-col-2</div>
            </Col>
            <Col span={12}>
                <div style={grayLight}>row-2-col-3</div>
            </Col>
            <Col span={12}>
                <div style={grayDeep}>row-2-col-4</div>
            </Col>
        </Row>
        <Row gutter={[24, 24]}>
            {
                new Array(24).fill(1).map((_num, index) => {
                    return(
                        <Col span={(index + 1) * 2}>
                            <div style={grayDeep}>row-3-col-{index + 1}</div>
                        </Col>
                    )
                })
            }
        </Row>
    </div>
)

describe('layout.cy.tsx <row> <col>', () => {
    it('test row <align> <justify> and col <span>', () => {
        cy.mount(Demo1);
        cy.viewport(3000, 1000);
        cy.compareSnapshot("row-align-justify");
    })

    it('test row <gutter> and col at xxl', () => {
        cy.mount(Demo2);
        cy.viewport(3000, 1000);
        cy.compareSnapshot("row-gutter-xxl");
    })

    it('test row <gutter> and col at xl', () => {
        cy.mount(Demo2);
        cy.viewport(2200, 1000);
        cy.compareSnapshot("row-gutter-xl");
    })

    it('test row <gutter> and col at lg', () => {
        cy.mount(Demo2);
        cy.viewport(1500, 1000);
        cy.compareSnapshot("row-gutter-lg");
    })

    it('test row <gutter> and col at md', () => {
        cy.mount(Demo2);
        cy.viewport(1200, 1000);
        cy.compareSnapshot("row-gutter-md");
    })

    it('test row <gutter> and col at sm', () => {
        cy.mount(Demo2);
        cy.viewport(800, 1000);
        cy.compareSnapshot("row-gutter-sm");
    })

    it('test row <gutter> and col at xs', () => {
        cy.mount(Demo2);
        cy.viewport(500, 1000);
        cy.compareSnapshot("row-gutter-xs");
    })

    it ('test row <wrap>', () => {
        cy.mount(
            <Row wrap={false}>
                <Col span={6}>
                    <div style={grayDeep}>col-1</div>
                </Col>
                <Col span={6}>
                    <div style={gray}>col-2</div>
                </Col>
                <Col span={6}>
                    <div style={grayLight}>col-3</div>
                </Col>
                <Col span={6}>
                    <div style={grayDeep}>col-4</div>
                </Col>
                <Col span={6}>
                    <div style={grayDeep}>col-5</div>
                </Col>
                <Col span={6}>
                    <div style={grayDeep}>col-6</div>
                </Col>
                <Col span={6}>
                    <div style={grayDeep}>col-7</div>
                </Col>
            </Row>
        );
        cy.viewport(2500, 200);
        cy.compareSnapshot("row-wrap");
    })

    it('test col <flex>', () => {
        cy.mount(
            <div>
                <Row>
                    <Col style={grayDeep} flex={2}>2 / 5</Col>
                    <Col style={gray} flex={3}>3 / 5</Col>
                </Row>
                <Row>
                    <Col style={grayDeep} flex="100px">100px</Col>
                    <Col style={gray} flex="auto">Fill Rest</Col>
                </Row>
            </div>
        )
        cy.viewport(800, 200);
        cy.compareSnapshot("col-flex");
    })

    it('test col <offset> <span>', () => {
        cy.mount(
            <Row>
                {
                    new Array(24).fill(1).map((_num, index) => {
                        return(
                            <Col offset={23 - index} span={index + 1}>
                                <div style={grayDeep}>span-{index + 1}-offset-{23 - index}</div>
                            </Col>
                        )
                    })
                }
            </Row>
        )
        cy.compareSnapshot("col-offset");
    });

    it('test col <pull> <push>', () => {
        cy.mount(
            <Row>
                <Col span={8} push={4}>
                    <div style={grayDeep}>8 push-4</div>
                </Col>
                <Col span={4} pull={8}>
                    <div style={gray}>4 pull-8</div>
                </Col>
            </Row>
        )
        cy.viewport(800, 200);
        cy.compareSnapshot("col-pull-push");
    })

    it('test col <order>', () => {
        cy.mount(
            <Row>
                <Col span={8} order={2}>
                    <div style={grayDeep}>8</div>
                </Col>
                <Col span={4} order={1}>
                    <div style={gray}>4</div>
                </Col>
            </Row>
        )
        cy.viewport(600, 100);
        cy.compareSnapshot("col-order");
    })
})

describe('layout.cy.tsx sider', () => {
    it('test sider <collapsible> <trigger> <theme>', () => {
        cy.mount(
            <div className="demos-wui-layout">
                <Layout className="layout-triger">
                <Sider theme='dark' collapsible>
                    <div className="logo"/>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                    <Footer>底部内容</Footer>
                </Layout>
            </Layout>
            </div>
        )
        cy.viewport(800, 600);
        cy.compareSnapshot("sider");
        cy.get('.wui-layout-sider-trigger').eq(0).click();
        cy.compareSnapshot("sider-trigger-click");
    });

    it('test sider <reverseArrow>', () => {
        cy.mount(
            <div className="demos-wui-layout">
                <Layout className="layout-triger">
                <Sider reverseArrow collapsible>
                    <div className="logo"/>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
            </div>
        )
        cy.viewport(800, 600);
        cy.compareSnapshot("sider-reverseArrow");
    })

    it('test spliter <direction>', () => {
        cy.mount(
            <div>
                 <Spliter>
                     <Sider style={{ height: '100%', background: 'rgb(240, 242, 245)'}}>
                     </Sider>
                     <Layout className="site-layout">
                         <Content
                             style={{
                                 margin: '24px 16px',
                                 padding: 24,
                                 minHeight: 280,
                             }}
                         >
                             <p>content..........</p>
                             <p>content..........</p>
                             <p>content..........</p>
                         </Content>
                     </Layout>
                 </Spliter>
                 <br />
                 <br />
                 <Spliter direction='horizontal'>
                     <Header style={{ width: '100%', background: 'rgb(240, 242, 245)'}}></Header>
                     <Layout className="site-layout">
                         <Content
                             style={{
                                 margin: '24px 16px',
                                 padding: 24,
                                 minHeight: 280,
                             }}
                         >
                             <p>content..........</p>
                             <p>content..........</p>
                             <p>content..........</p>
                         </Content>
                     </Layout>
                 </Spliter>
             </div>
        )
        cy.viewport(1200, 800);
        cy.get('.wui-spliter-resizer-line').eq(0).realHover();
        cy.compareWithOptions('spliter-hover', {
            capture: 'runner',
            clip: {x: 460, y: 80, width: 1200, height: 800 }
        })
        cy.compareSnapshot("spliter-direction");
    })

    it('test spliter <collapsed> <trigger>', () => {
        cy.mount(
            <Spliter size={200} collapsible>
                <Sider style={{ height: '100%', background: 'rgb(240, 242, 245)'}}>
                </Sider>
                <Layout className="site-layout">
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <p>content..........</p>
                        <p>content..........</p>
                        <p>content..........</p>
                    </Content>
                </Layout>
            </Spliter>
        );
        cy.viewport(800, 600);
        cy.compareSnapshot("spliter-trigger");
        cy.get('.wui-spliter-resizer-trigger').eq(0).click();
        cy.compareSnapshot("spliter-trigger-click");
    })
})