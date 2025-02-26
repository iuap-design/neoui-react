/**
 *  @title 页签图标
 *  @description 页签两侧带有图标（仅适配页签type为line的情况）。
 * @type bip
 * demo12
 */

import {Icon, Tabs} from "@tinper/next-ui";
import React, {Component} from 'react';

const {TabPane} = Tabs;

class Demo12 extends Component {
    tabFn = (Dom1:any, key: string) => {
        console.log('dom1', Dom1, key)
        let textDom = null
        if (key === '1') {
            let newD = React.cloneElement(Dom1, {
                children: '行业方案'
            })
            textDom = (
                <span>
                    <Icon style={{color: "#FF5735", fontSize: "12px", fontWeight: '400'}} type="uf-hebingbumenxinxi"></Icon>
                    {newD}
                    <Icon style={{color: "#FF5735", fontSize: "12px", fontWeight: '400'}} type="uf-hebingbumenxinxi"></Icon>
                </span>
            )
        } else if (key === '2') {
            let newD = React.cloneElement(Dom1, {
                children: '危险预控'
            })
            textDom = (
                <span>
                    <Icon style={{color: "#FF5735", fontSize: "12px", fontWeight: '400'}} type="uf-hebingbumenxinxi"></Icon>
                    {newD}
                </span>
            )
        } else {
            let newD = React.cloneElement(Dom1, {
                children: '计划物料'
            })
            textDom = (
                <span>
                    {newD}
                    <Icon style={{color: "#FF5735", fontSize: "12px", fontWeight: '400'}} type="uf-hebingbumenxinxi"></Icon>
                </span>
            )
        }
        return textDom
    }
    render() {
        return (
            <Tabs defaultActiveKey="1" type="line">
                <TabPane tab={this.tabFn} key="1">Content of
					Tab Pane 1</TabPane>
                <TabPane tab={this.tabFn} key="2">Content of
					Tab Pane 2</TabPane>
                <TabPane tab={this.tabFn} key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        )
    }
}

export default Demo12;
