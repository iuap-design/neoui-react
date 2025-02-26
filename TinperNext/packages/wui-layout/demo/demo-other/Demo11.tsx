/**
 *
 * @title Spliter拖拽分割器
 * @description 分割器自带收起功能
 * @type other
 * demo8
 */

import { Icon, Layout, Menu } from '@tinper/next-ui';
import React, { Component } from 'react';
import './Demo10.scss';

const { Header, Content, Spliter } = Layout;

class Demo11 extends Component {
     state={
         width: 200,
     }

     onDragStarted = () => {
         console.log('开始拖拽__')
     }

     onDragMove = (size: string | number) => {
         console.log('拖拽中__', size)
         this.setState({
             width: size
         })
     }

     onDragFinished = (size: string | number) => {
         console.log('拖拽完成__', size)
         // this.setState({
         //     width: size
         // })
     }

     onResizerClick = (e: React.MouseEvent<HTMLElement>) => {
         console.log('onResizerClick', e.target);
     }

     onResizerDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
         console.log('onResizerDoubleClick', e);
     }

     onCollapse = (collapsed: boolean) => {
         console.log('onCollapse', collapsed);
     }

     render() {
         return (
             <Layout className="layout-spliter">
                 <Spliter
                     size={this.state.width}
                     maxSize={400}
                     minSize={0}
                     defaultSize={200}
                     onDragStarted={this.onDragStarted}
                     onDragMove={this.onDragMove}
                     onDragFinished={this.onDragFinished}
                     onResizerClick={this.onResizerClick}
                     onResizerDoubleClick={this.onResizerDoubleClick}
                     collapsible
                     onCollapse={this.onCollapse}
                     mode='mixed'
                     defaultMode='default'
                 >
                     <Menu mode="inline" style={{ height: '100%', background: 'rgb(240, 242, 245)', border: '1px solid transparent', overflow: 'hidden'}}>
                         <Menu.Item key="1">
                            nav 1
                         </Menu.Item>
                         <Menu.Item key="2">
                            nav 2
                         </Menu.Item>
                         <Menu.Item key="3">
                            nav 3
                         </Menu.Item>
                         <Menu.Item key="4">
                            nav 4
                         </Menu.Item>
                         <Menu.Item key="5">
                            nav 5
                         </Menu.Item>
                     </Menu>
                     <Layout className="site-layout">
                         <Header>
                             <Icon type="uf-home" />
                         </Header>
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
             </Layout>
         )
     }
}

export default Demo11;
