/**
 *
 * @title 拖拽改变顺序
 * @description `dragable`参数可拖拽页签。
 * @type other
 * demo14
 */

import React, { Component } from 'react';
import { Tabs, TabsProps } from '@tinper/next-ui';

const {TabPane} = Tabs;

 interface TabsState15 {
    activeKey: string;
    data: {tab: string, text: string, key: string, disabled?: boolean}[]
 }
class Demo14 extends Component<{}, TabsState15> {
    constructor(props: {}) {
        super(props)
        let pane = [
            {
                tab: 'Tab 1',
                key: '1',
                text: 'Content of Tab Pane 1'
            },
            {
                tab: 'Tab 2',
                key: '2',
                text: 'Content of Tab Pane 2'
            },
            {
                tab: 'Tab 3',
                key: '3',
                text: 'Content of Tab Pane 3'
            },
            {
                tab: 'Tab 4',
                key: '4',
                text: 'Content of Tab Pane 4'
            }
        ]
        this.state = {
            data: pane,
            activeKey: pane[0].key
        }
    }
     onTabChange: TabsProps['onChange'] = (activeKey) => {
         this.setState({
             activeKey,
         });
     }
     onDrag = (result: Record<string, any>) => {
         console.log('拖拽的目标', result)
         let { source, destination } = result
         let originArr = this.state.data

         // originArr.splice(originArr.findIndex((item, index)=>index == source.index),1)
         if (destination != null) {
             let delArr = originArr.splice(source.index, 1)
             originArr.splice(destination.index, 0, delArr[0])
         }

         //  console.log('AAAAAAAAA',delArr)
         console.log('整合后的数据', originArr)
         this.setState({
             data: originArr
         })
     }

     render() {
         // debugger
         return (
             <div className="Demo6">
                 <Tabs
                     className="Demo6-tabs"
                     // defaultActiveKey={this.state.activeKey}
                     activeKey={this.state.activeKey}
                     tabBarStyle="line"
                     onChange={this.onTabChange}
                     dragable={true}
                     onDrag={this.onDrag}
                 >
                     {/* <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
                     <TabPane tab='Tab 2' disabled key="2">Content of Tab Pane 2</TabPane>
                     <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane> */}
                     {
                         this.state.data.map(item =>
                             (
                                 <TabPane tab={item.tab} key={item.key} disabled={item.disabled}>{item.text}</TabPane>
                             )
                         )
                     }
                 </Tabs>
             </div>
         )
     }
}

export default Demo14;
