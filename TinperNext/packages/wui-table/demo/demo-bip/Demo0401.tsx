/**
 *
 * @title 悬浮列
 * @parent 列渲染 Custom Render
 * @description 鼠标hover行时呼出操作按钮。
 * @type bip
 * demo0401
 */

import {Button, Table, TableProps, Icon, Dropdown, Menu} from '@tinper/next-ui'
import React, {Component} from 'react'
const { Item } = Menu;
 type DefaultRecordType = Record<string, any>;
const columns: TableProps['columns'] = [
    {title: '员工编号', dataIndex: 'a', key: 'a', width: 150},
    {title: '员工姓名', dataIndex: 'b', key: 'b', width: 100},
    {title: '性别', dataIndex: 'c', key: 'c', width: 100},
    {title: '部门', dataIndex: 'd', key: 'd', width: 100}
]

const data: TableProps['data'] = [
    {a: 'ASVAL_201903280005', b: '小张', c: '男', d: '财务二科', key: '1'},
    {a: 'ASVAL_201903200004', b: '小明', c: '男', d: '财务一科', key: '2'},
    {a: 'ASVAL_201903120002', b: '小红', c: '女', d: '财务一科', key: '3'}
]

class Demo11 extends Component<{}, {val: string, keyObj: any}> {
     currentIndex: number | undefined
     currentRecord: DefaultRecordType | undefined
     // keyObj: {};
     constructor(props: {}) {
         super(props)
         this.state = {
             val: '',
             keyObj: this.init()
         }
     }

     init = () => {
         let keyObj = {};
         data.forEach((record, _index) => {
             let key = record.key
             keyObj[key] = true;
         })
         return keyObj
     }


     onRowHover = (index: number, record: DefaultRecordType) => {
         this.currentIndex = index
         this.currentRecord = record
     }

     setRecordKeyFun = (recordKey: string | number) => {
         const { keyObj } = this.state;
         if (recordKey) {
             let changeStatus = !keyObj[recordKey];
             let _keyObj = Object.assign({}, keyObj, {[recordKey]: changeStatus})
             this.setState({keyObj: _keyObj})
         }
     }

     getHoverContent = (record: DefaultRecordType, _index: number) => {
         const menus = (<Menu fieldid="fieldid-menu">
             <Item key="2">操作1</Item>
             <Item key="3">操作2</Item>
             <Item key="4">操作3</Item>
             <Item key="5">操作4</Item>
             <Item key="6">操作5</Item>
         </Menu>);
         let recordKey = record && record.key
         if (!recordKey) {
             return null
         }
         const { keyObj } = this.state;
         let flag = keyObj[recordKey];
         return (
             <div className='opt-btns' style={{height: '100%', overflow: 'hidden'}}>
                 {flag ? <div style={{display: 'inline-block', height: '34px', lineHeight: '34px'}}>
                     <Button size='sm' colors="dark" style={{marginRight: '5px'}}>操作1</Button>
                     <Button size='sm' colors="dark" style={{marginRight: '5px'}}>操作2</Button>
                     <Button size='sm' colors="dark" style={{marginRight: '5px'}}>操作3</Button>
                     <Button size='sm' colors="dark" style={{marginRight: '5px'}}>操作4</Button>
                     <Button size='sm' colors="dark" style={{marginRight: '5px'}}>操作5</Button>
                 </div> : null}
                 {flag ? null : <Dropdown fieldid="dropdown1" overlay={menus}>
                     <Button size='sm' style={{marginRight: '5px'}} icon={<Icon type='uf-arrow-down'/>}></Button>
                 </Dropdown>}
                 <Button size='sm' colors="dark" icon={<Icon type={flag ? 'uf-youjiantou_shuang' : 'uf-daoshouye'}/>} onClick={() => this.setRecordKeyFun(recordKey)}>
                 </Button>
             </div>
         )
     }

     render() {
         return <Table columns={columns} data={data} onRowHover={this.onRowHover} hoverContent={this.getHoverContent} />
     }
}

export default Demo11
