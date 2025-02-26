/**
 *
 * @title Spliter拖拽分割器,上下分割
 * @description 增加纯图标的折叠布局
 * @type other
 * demo12
 */

import { Icon, Layout, Select, Table } from '@tinper/next-ui';
import React, { Component } from 'react';
const Option = Select.Option;

const { Spliter } = Layout;

class Demo11 extends Component {
     state={
         collapsed: false
     }

     onCollapse = (collapsed: boolean) => {
         console.log('onCollapse', collapsed);
         this.setState({
             collapsed: !this.state.collapsed
         })
     }

     render() {
         let {collapsed} = this.state;
         const columns = [
             { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
             { title: "员工姓名", dataIndex: "b", key: "b", width: 100 },
             { title: "性别", dataIndex: "c", key: "c", width: 100 },
             { title: "部门", dataIndex: "d", key: "d", width: 100 },
             { title: "职级", dataIndex: "e", key: "e", width: 100 }
         ];
         const data = [
             { a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1" },
             { a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2" },
             { a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3" }
         ];
         return (
             <Layout className="layout-spliter-demo13">
                 <Spliter
                     size={50}
                     collapsible
                     collapsed={collapsed}
                     resizerClassName="wui-spliter-gradient" // 设置此类名用于实现分割线渐变效果
                     trigger={!collapsed ? <Icon rotate={180} type="uf-gridcaretdown" /> : <Icon type="uf-gridcaretdown" />}
                     direction="horizontal"
                     onCollapse={this.onCollapse}
                     style={{overflow: 'unset'}}
                     resizerable={false}
                 >
                     <div>
                         <Select defaultValue="all" style={{ width: 200, marginRight: 6 }}>
                             <Option value="all">全部</Option>
                             <Option value="confirming">待确认</Option>
                             <Option value="executing">执行中</Option>
                             <Option value="completed" disabled>
                                已办结
                             </Option>
                             <Option value="termination">终止</Option>
                         </Select>
                     </div>
                     <Table style={{marginTop: 15 }} columns={columns} data={data} showRowNum={true}/>
                 </Spliter>
             </Layout>
         )
     }
}

export default Demo11;