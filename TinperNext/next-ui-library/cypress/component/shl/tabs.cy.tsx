import React from 'react'
import { Tabs, Icon } from '../../../../packages'
import BaseDemo from './tabsDemo1'
const { TabPane } = Tabs

let moreTabsItemFun = () => {
    let arr = []
    for(let i=0; i<20; i++) {
        arr.push('Tabs' + i)
    }
    return arr
}
let moreTabsItem = moreTabsItemFun()

describe('Tabs view', () => {
    it('Tabs type', () => {
        cy.mount((
            <div>
                <BaseDemo type="line" />
                <br />
                <BaseDemo type="card" />
                <br />
                <BaseDemo type="editable-card" />
                <br />
                <BaseDemo type="trangle" />
                <br />
                <BaseDemo type="primary" />
                <br />
                <BaseDemo type="fill" />
                <br />
                <BaseDemo type="fade" />
                <br />
                <BaseDemo type="trapezoid" />
                <br />
            </div>
        ))
        cy.wait(2000)
        cy.compareSnapshot('tabs-type')
    })
    it('Tabs position', () => {
        cy.mount((
            <div>
                <BaseDemo tabPosition="top" />
                <br />
                <BaseDemo tabPosition="left" />
                <br />
                <BaseDemo tabPosition="right" />
                <br />
                <BaseDemo tabPosition="bottom" />
            </div>
        ))
        cy.compareSnapshot('tabs-position')
    })
    it('Tabs activeKey', () => {
        cy.mount((
            <BaseDemo activeKey="2" />
        ))
        cy.compareSnapshot('tabs-activeKey')
    })
    it('Tabs hiddAdd', () => {
        cy.mount((
            <BaseDemo type="editable-card" hideAdd />
        ))
        cy.compareSnapshot('tabs-hiddAdd')
    })
    it('Tabs nested', () => { // 嵌套加方向
        cy.mount((
            <div>
                <Tabs type="line">
                    <TabPane tab='Tab 1' key="1">
                        <Tabs>
                            <TabPane tab='line 1' key="l1">first content 1</TabPane>
                            <TabPane tab='line 2' key="l2">first content 2</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
                <br />
                <br />
                <br />
                <Tabs type="line">
                    <TabPane tab='Tab 1' key="1">
                        <Tabs type="trangle">
                            <TabPane tab='line 1' key="l1">first content 1</TabPane>
                            <TabPane tab='line 2' key="l2">first content 2</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
                <br />
                <br />
                <br />
                <Tabs type="card">
                    <TabPane tab='Tab 1' key="1">
                        <Tabs type="line">
                            <TabPane tab='line 1' key="l1">first content 1</TabPane>
                            <TabPane tab='line 2' key="l2">first content 2</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
                <br />
                <br />
                <br />
                <Tabs type="card">
                    <TabPane tab='Tab 1' key="1">
                        <Tabs type="trangle">
                            <TabPane tab='line 1' key="l1">first content 1</TabPane>
                            <TabPane tab='line 2' key="l2">first content 2</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        ))
        cy.compareSnapshot('tabs-nested')
    })
    it('tabs more', () => {
        cy.mount((
            <Tabs type="editable-card" hideAdd>
                {
                    moreTabsItem.map(item => {
                        return (
                        <TabPane tab={item} key={item}>{item}</TabPane>
                        )
                    })
                }
            </Tabs>
        ))
        cy.viewport(600, 600)
        cy.wait(1000)
        cy.get('.wui-tabs-tab-more-select').trigger('mouseover')
        cy.wait(1000)
        cy.compareSnapshot('tabs-more-selectShow')
        cy.get('.wui-dropdown-menu-item').eq(2).click()
        cy.compareSnapshot('tabs-more-selectClick')
    })
    it('tabs select position', () => { // 下拉位置在上方显示
        cy.mount((
            <div>
                <div style={{height: '500px'}}></div>
                <Tabs type="editable-card" hideAdd>
                    {
                        moreTabsItem.map(item => {
                            return (
                            <TabPane tab={item} key={item}>{item}</TabPane>
                            )
                        })
                    }
                </Tabs>
            </div>
        ))
        cy.viewport(600, 600)
        cy.wait(1000)
        cy.get('.wui-tabs-tab-more-select').trigger('mouseover')
        cy.wait(1000)
        cy.compareSnapshot('tabs-select-position-top')
    })
    it('tabs select position', () => { // 下拉位置在中间位置显示
        cy.mount((
            <div>
                <div style={{height: '250px'}}></div>
                <Tabs type="editable-card" hideAdd>
                    {
                        moreTabsItem.map(item => {
                            return (
                            <TabPane tab={item} key={item}>{item}</TabPane>
                            )
                        })
                    }
                </Tabs>
            </div>
        ))
        cy.viewport(600, 600)
        cy.wait(1000)
        cy.get('.wui-tabs-tab-more-select').trigger('mouseover')
        cy.wait(1000)
        cy.compareSnapshot('tabs-select-position-middle')
    })
    it('tabs boundary', () => { // 极值情况多页签，最后一个也签没显示全点击状态
        cy.mount((
            <Tabs type="editable-card" hideAdd>
                {
                    moreTabsItem.map(item => {
                        return (
                        <TabPane tab={item} key={item}>{item}</TabPane>
                        )
                    })
                }
            </Tabs>
        ))
        cy.viewport(600, 600)
        cy.wait(1000)
        cy.get('.wui-tabs-tab').eq(6).click()
        cy.compareSnapshot('tabs-boundary-lastTabsItemClick')
    })
    it('tabs closeIcon', () => {
        cy.mount((
            <Tabs type="editable-card" hideAdd >
                <TabPane tab={'tab 1'} key="1" closeIcon={<Icon type="uf-qq"/>}>Tab 1</TabPane>
                <TabPane tab={'tab 2'} key="2" closeIcon={<Icon type="uf-qq"/>}>Tab 2</TabPane>
                <TabPane tab={'tab 3'} key="3" closeIcon={<Icon type="uf-qq"/>}>Tab 3</TabPane>
                <TabPane tab={'tab 4'} key="4" closeIcon={<Icon type="uf-qq"/>} closable={false}>Tab 4</TabPane>
            </Tabs>
        ))
        cy.viewport(600, 600)
        cy.compareSnapshot('tabs-closeIcon-show')
    })
    it('tabs Icon', () => {
        cy.mount((
            <Tabs>
                <TabPane tab={<span><Icon style={{ color: "#FF5735", fontSize: "12px" }} type="uf-mi"></Icon>行业方案<Icon style={{ color: "#FF5735", fontSize: "12px" }} type="uf-exc-t"></Icon></span>} key="1" closeIcon={<Icon type="uf-qq"/>}>Tab 1</TabPane>
                <TabPane tab={<span><Icon style={{ color: "#FF5735", fontSize: "12px" }} type="uf-mi"></Icon>行业方案<Icon style={{ color: "#FF5735", fontSize: "12px" }} type="uf-exc-t"></Icon></span>} key="2" closeIcon={<Icon type="uf-qq"/>}>Tab 2</TabPane>
                <TabPane tab={'tab 3'} key="3" closeIcon={<Icon type="uf-qq"/>}>Tab 3</TabPane>
            </Tabs>
        ))
        cy.viewport(600, 600)
        cy.compareSnapshot('tabs-item-icon')
    })
    it('tabs position nested', () => {
        cy.mount((
            <div>
                <Tabs>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs>
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition='left'>
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition="bottom">
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition="right">
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
            </div>
            
        ))
        cy.viewport(600, 600)
        cy.compareSnapshot('tabs-position-nested-top')
    })
    it('tabs position nested left', () => {
        cy.mount((
            <div>
                <Tabs tabPosition='left'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs>
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs tabPosition='left'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition='left'>
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs tabPosition='left'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition="bottom">
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs tabPosition='left'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition="right">
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
            </div>
            
        ))
        cy.viewport(600, 600)
        cy.compareSnapshot('tabs-position-nested-left')
    })
    it('tabs position nested right', () => {
        cy.mount((
            <div>
                <Tabs tabPosition='right'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs>
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs tabPosition='right'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition='left'>
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs tabPosition='right'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition="bottom">
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs tabPosition='right'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition="right">
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
            </div>
            
        ))
        cy.viewport(600, 600)
        cy.compareSnapshot('tabs-position-nested-right')
    })
    it('tabs position nested bottom', () => {
        cy.mount((
            <div>
                <Tabs tabPosition='bottom'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs>
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs tabPosition='bottom'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition='left'>
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs tabPosition='bottom'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition="bottom">
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
                <br />
                <br />
                <Tabs tabPosition='bottom'>
                    <TabPane tab={'tab 1'} key="1">
                        <Tabs tabPosition="right">
                            <TabPane tab={'tab 1'} key="1">Tab 1</TabPane>
                            <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                            <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={'tab 2'} key="2">Tab 2</TabPane>
                    <TabPane tab={'tab 3'} key="3">Tab 3</TabPane>
                </Tabs>
            </div>
            
        ))
        cy.viewport(600, 600)
        cy.compareSnapshot('tabs-position-nested-bottom')
    })
})