/**
 * @title 自适应父节点宽度
 * @description fillSpace = true 面包屑会自适应父节点宽度，超出内容下拉展示
 */

import {Breadcrumb, Menu} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Item} = Menu;

class Demo6 extends Component {

     handleClick = (e: React.MouseEvent) => {
         console.log(e.target);
     }

     render() {

         const menu = (
             <Menu>
                 <Item key="1">借款合同</Item>
                 <Item key="2">抵/质押合同</Item>
                 <Item key="3">担保合同</Item>
             </Menu>
         );

         return (
             <div style={{ width: '60%'}}>
                 <Breadcrumb fillSpace style={{height: 100}} onClick={this.handleClick}>
                     <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
                        Home
                     </Breadcrumb.Item>
                     <Breadcrumb.Item overlay={menu}>
                        Library
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        Library_1
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        Library_2
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        data_1
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        data_2
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        data_3
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        page_1
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        page_2
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        page_3
                     </Breadcrumb.Item>
                     <Breadcrumb.Item active>
                        page_4
                     </Breadcrumb.Item>
                 </Breadcrumb>
             </div>
         )
     }
}

export default Demo6;
