/**
 *
 * @title 下拉项关闭菜单
 * @description editable-card类型多页签时，下拉项根据closable属性是否支持关闭功能,通过回调函数onEdit实现关闭
 * @type other
 */

import {Tabs, TabsProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TabPane} = Tabs;

 interface TabsState8 {
     activeKey: string;
     panes: {title: string, content: string, key: string, closable?: boolean}[]
 }

class Demo16 extends Component<{}, TabsState8> {
     newTabIndex: number
     constructor(props: {}) {
         super(props);
         this.newTabIndex = 0;
         const panes = [
             {title: 'Tab 1', content: 'Content of Tab 1', key: '1'},
             {title: 'Tab 2', content: 'Content of Tab 2', key: '2'},
             {
                 title: 'Tab 3',
                 content: 'Content of Tab 3',
                 key: '3',
                 closable: false,
             },
             {title: 'Tab 4', content: 'Content of Tab 4', key: '4'},
             {title: 'Tab 5', content: 'Content of Tab 5', key: '5'},
             {title: 'Tab 6', content: 'Content of Tab 6', key: '6'},
             {title: 'Tab 7', content: 'Content of Tab 7', key: '7'},
             {title: 'Tab 8', content: 'Content of Tab 8', key: '8'},
             {title: 'Tab 9', content: 'Content of Tab 9', key: '9'},
             {title: 'Tab 10', content: 'Content of Tab 10', key: '10'},
             {title: 'Tab 11', content: 'Content of Tab 11', key: '11'},
             {title: 'Tab 12', content: 'Content of Tab 12', key: '12'},
             {title: 'Tab 13', content: 'Content of Tab 13', key: '13'},
             {title: 'Tab 14', content: 'Content of Tab 14', key: '14'},
             {title: 'Tab 15', content: 'Content of Tab 15', key: '15'},
             {title: 'Tab 16', content: 'Content of Tab 16', key: '16'},
             {title: 'Tab 17', content: 'Content of Tab 17', key: '17'},
             {title: 'Tab 18', content: 'Content of Tab 18', key: '18'},
             {title: 'Tab 19', content: 'Content of Tab 19', key: '19'},
             {title: 'Tab 20', content: 'Content of Tab 20', key: '20'},
             {title: 'Tab 21', content: 'Content of Tab 21', key: '21'},
             {title: 'Tab 22', content: 'Content of Tab 22', key: '22'},
             {title: 'Tab 23', content: 'Content of Tab 23', key: '23'}
         ];
         this.state = {
             activeKey: panes[0].key,
             panes
         }
     }

     onTabChange: TabsProps['onChange'] = (activeKey) => {
         this.setState({
             activeKey,
         });
     }

     remove = (targetKey: string) => {
         let {activeKey} = this.state;
         let lastIndex: number = 0;
         this.state.panes.forEach((pane, i) => {
             if (pane.key === targetKey) {
                 lastIndex = i - 1;
             }
         });
         const panes = this.state.panes.filter(pane => pane.key !== targetKey);
         if (panes.length && activeKey === targetKey) {
             if (lastIndex >= 0) {
                 activeKey = panes[lastIndex].key;
             } else {
                 activeKey = panes[0].key;
             }
         }
         this.setState({panes, activeKey});
     };

     onEdit: TabsProps['onEdit'] = (targetKey, action) => {
         console.log('onEdit', targetKey, action)
         this[action](targetKey);
     };

     onTabScroll: TabsProps['onTabScroll'] = (key) => {
         console.log(key)
     }

     render() {
         return (
             <Tabs
                 className="demo16"
                 activeKey={this.state.activeKey}
                 onChange={this.onTabChange}
                 type="editable-card"
                 onEdit={this.onEdit}
                 onTabScroll={this.onTabScroll}
                 hideAdd
             >
                 {this.state.panes.map(pane => (
                     <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                         {pane.content}
                     </TabPane>
                 ))}
             </Tabs>
         );
     }
}

export default Demo16;
