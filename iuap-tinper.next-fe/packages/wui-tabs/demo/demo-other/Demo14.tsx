/**
 *
 * @title fieldid 示例
 * @description tab页签增加fieldid属性。
 * demo0
 */

import {Select, Tabs, TabsProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {TabPane} = Tabs;
const {Option} = Select;
 interface TabsState14 {
    activeKey: string;
    start: number;
    tabType: string;
    allType: string[];
 }

class Demo14 extends Component<{}, TabsState14> {
    constructor(props: {}) {
        super(props);
        this.state = ({
            activeKey: "1",
            start: 0,
            tabType: "line",
            allType: ['line', 'card', 'editable-card', 'fill', 'primary', 'trangle', 'fade', 'trapezoid']
        })
    }

     onChange: TabsProps['onChange'] = (activeKey) => {
         console.log(`onChange ${activeKey}o-^-o`);
         this.setState({
             activeKey,
         });
     }

     changeTabPosition = (tabType: string) => {
         this.setState({tabType});
     }

     render() {

         return (
             <div className="demo0">
                 <div style={{marginBottom: 16}}>
                     Tab Type：
                     <Select
                         value={this.state.tabType}
                         onChange={this.changeTabPosition}
                         style={{width: '100px'}}
                     >
                         {
                             this.state.allType.map(item => {
                                 return (
                                     <Option value={item} key={item}>{item}</Option>
                                 )
                             })
                         }
                     </Select>
                 </div>
                 <Tabs
                     activeKey={this.state.activeKey}
                     type={this.state.tabType}
                     onChange={this.onChange}
                     defaultActiveKey="1"
                     className="demo0-tabs"
                     fieldid={'tabs'}
                     id="father"
                 >
                     <TabPane tab='Tab 1' key="1" fieldid={'tabpanel'} id="childrenid">Content of Tab Pane 1</TabPane>
                     <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
                     <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
                     <TabPane tab='Tab 4' key="4">Content of Tab Pane 4</TabPane>
                     <TabPane tab='Tab 5' key="5">Content of Tab Pane 5</TabPane>
                     <TabPane tab='Tab 6' key="6">Content of Tab Pane 6</TabPane>
                     <TabPane tab='Tab 7' key="7">Content of Tab Pane 7</TabPane>
                     <TabPane tab='Tab 8' key="8">Content of Tab Pane 8</TabPane>
                 </Tabs>
             </div>
         )
     }
}

export default Demo14;
