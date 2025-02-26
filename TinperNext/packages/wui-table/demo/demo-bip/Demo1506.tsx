/**
 *
 * @title 自定义单列过滤交互
 * @description 单列过滤
 * @type bip
 * demo1505
 */


import { Table, TableProps, Input, Tag, Icon, Popover, Checkbox, Button} from "@tinper/next-ui";
import React, {Component} from 'react';
const {filterColumn, singleFilter} = Table;
const SingleFilterTable = singleFilter(Table);
const FilterColumnTable = filterColumn(SingleFilterTable);
import List from 'rc-virtual-list';

const prefixCls = `wui-table-filter-column`;
const prefix = `wui`

const data: TableProps['data'] = [
    {
        orderCode: "NU0391025",
        supplierName: "xx供应商",
        typeName: "1",
        purchasing: '组织c',
        purchasingGroup: "aa",
        voucherDate: "2018年03月18日",
        approvalStateName: "",
        confirmStateName: "执行中",
        closeStateName: "未关闭",
        key: "1"
    },
    {
        orderCode: "NU0391026",
        supplierName: "xx供应商",
        typeName: "2",
        purchasing: '组织a',
        purchasingGroup: "bb",
        voucherDate: "2018年02月05日",
        approvalStateName: "已审批",
        confirmStateName: "待确认",
        closeStateName: "未关闭",
        key: "2"
    },
    {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "3",
        purchasing: '组织b',
        purchasingGroup: "aa",
        voucherDate: "2018年07月01日",
        approvalStateName: "未审批",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "3"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "4",
        purchasing: '组织d',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "4"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "5",
        purchasing: '组织e',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "5"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "6",
        purchasing: '组织f',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "6"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: 7,
        purchasing: '组织g',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "7"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: 8,
        purchasing: '组织h',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "8"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: 0,
        purchasing: '组织k',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "0"
    }
];

const columns: TableProps['columns'] = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 100,
        fixed: 'left',
        singleFilter: false,
        singleFind: false,
        render(_text: any, _record: Record<string, any>, index: number) {
            return index + 1
        }
    },
    {
        title: "订单编号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 140,
        fixed: 'left',
        required: true
    },
    {
        title: "供应商名称",
        dataIndex: "supplierName",
        key: "supplierName",
        width: 150,
        required: true,
        filterDropdownAuto: 'manual',
        filterDropdownData: [
            {
                key: '1',
                value: 'xx供应商'
            },
            {
                key: '2',
                value: 'xxx供应商'
            },
        ]
    },
    {
        title: '类型',
        dataIndex: "typeName",
        key: "typeName",
        sorter: (a, b) => a.typeName - b.typeName,
        width: 140
    },
    {
        title: "采购组织",
        dataIndex: "purchasing",
        key: "purchasing",
        width: 120,
        titleAlign: 'center'
    },
    {
        title: "单据日期",
        dataIndex: "voucherDate",
        key: "voucherDate",
        width: 150,
        titleAlign: 'right'
    },
    {
        title: "审批状态",
        dataIndex: "approvalStateName",
        key: "approvalStateName",
        width: 150
    },
    {
        title: "备注",
        dataIndex: "approvalState_mark",
        key: "approvalState_mark",
        width: 150
    }
]

   interface Demo1505State {
       data: TableProps['data'],
       filterTarget: any
   }

   interface FilterModalProps {
       dataIndex: string,
       clickCb: Function,
       filterTarget: any
   }

   interface FilterModalState {
       actived: boolean,
       showTop: boolean,
       showModal: boolean,
       showList: boolean,
       filterTarget: any
   }

class FilterModal extends Component<FilterModalProps, FilterModalState> {
    constructor(props: FilterModalProps) {
        super(props)
        this.state = {
            actived: false,
            showTop: false,
            showModal: false,
            showList: false,
            filterTarget: JSON.parse(JSON.stringify(props.filterTarget)) // 本地存储的一份
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<FilterModalProps>, _nextContext: any): void {
        if ('filterTarget' in nextProps) {
            const { filterTarget, dataIndex } = nextProps;
            const { filterList = [], checkedList = [] } = filterTarget[dataIndex] || {};
            this.setState({
                filterTarget: JSON.parse(JSON.stringify(filterTarget)),
                actived: filterList.length !== checkedList.length,
            })
        }
    }

     onVisibleChangeTop = (visible: boolean) => {
         const { dataIndex, clickCb } = this.props;
         let filterTarget = {...this.state.filterTarget};
         clickCb && clickCb(filterTarget, dataIndex)
         this.setState({
             showTop: visible,
             actived: visible,
         })
     }

     inputChange = (value: string) => {
         const { filterTarget } = this.state;
         const { dataIndex } = this.props;
         filterTarget[dataIndex].searchStr = value;
         this.setState({
             filterTarget
         })
     }

     checkChange = (checked: boolean, item: string, dataIndex: string, filterTarget: any) => {
         const target = filterTarget[dataIndex] || {};
         if (checked) {
             (target.checkedList || []).push(item)
         } else {
             target.checkedList = (target.checkedList || []).filter((t: string) => t !== item)
         }
         filterTarget[dataIndex] = target;
         this.setState({
             filterTarget
         })
     }

     getCloumItem = (dataIndex: string, filterTarget: any) => {
         const { filterList = [], checkedList = []} = filterTarget[dataIndex] || {};
         return (
             <List data={filterList} height={300} itemHeight={30} itemKey="item">
                 {
                     (item: string, index: number) => (
                         <div key={index} className={`${prefixCls}-pop-check-wrap`}>
                             <Checkbox value={item} key={`${item}_${index}`}
                                 checked={checkedList.includes(item)}
                                 onChange={(v: boolean) => this.checkChange(v, item, dataIndex, filterTarget)}>
                                 {item === undefined ? '空值' : item}
                             </Checkbox>
                         </div>
                     )
                 }
             </List>
         );
     }

     onHide = () => {
         const { dataIndex, filterTarget, clickCb} = this.props;
         const { filterList = [], checkedList = [] } = filterTarget[dataIndex] || {}
         clickCb && clickCb(null, dataIndex)
         this.setState({
             showTop: false,
             actived: filterList.length !== checkedList.length,
         })
     }
     save = () => {
         const { filterTarget } = this.state;
         const { dataIndex, clickCb } = this.props;
         clickCb && clickCb(filterTarget, dataIndex)
         this.setState({
             showTop: false,
         })
     }

     onVisibleChangeModal = (visible: boolean) => {
         this.setState({
             showModal: visible
         })
     }

     closeTag = (item: string) => {
         const { filterTarget } = this.state;
         const { dataIndex } = this.props;
         const { checkedList = [] } = filterTarget[dataIndex] || {};
         let newList = checkedList.filter((v: string) => v !== item);
         filterTarget[dataIndex].checkedList = newList;
         this.setState({
             filterTarget
         })
     }

     showChange = () => {
         this.setState({
             showList: !this.state.showList
         })
     }

     getContent = (dataIndex: string) => {
         const { filterTarget } = this.state;
         const { searchStr = '', checkedList = [] } = filterTarget[dataIndex] || {}
         let content =
         <div style={{display: "flex"}}>
             <div className={`${prefixCls}-pop-cont-single-filter`} style={{flex: 1, width: '220px', padding: '8px 20px'}}>
                 <div>
                     <Input type="search" showClose value={searchStr}
                         onChange={this.inputChange}/>
                 </div>
                 <div className={`${prefixCls}-pop-cont-single-filter-check`}>
                     {this.getCloumItem(dataIndex, filterTarget)}
                 </div>
                 <div className={`${prefixCls}-pop-footer`}>
                     <span className={`${prefixCls}-clear-setting`} onClick={this.showChange}>
                         {'已选'}<span>{checkedList.length}</span>
                     </span>
                     <Button colors="secondary" size="sm" onClick={this.onHide}>{'取消'}</Button>
                     <Button colors="primary" size="sm" onClick={this.save}>{'确定'}</Button>
                 </div>
             </div>
             <div style={{flex: 1, width: '220px', borderLeft: "1px dashed #999", padding: '8px 20px', display: this.state.showList ? 'block' : 'none'}}>
                 {checkedList.map((item: string) => {
                     return <Tag key={item} closable onClose={() => this.closeTag(item)}>{item}</Tag>
                 })}
             </div>
         </div>
         return content;
     }

     iconClick = (_e:React.MouseEvent<HTMLElement>, dataIndex:string | number) => {
         const { clickCb } = this.props;
         clickCb && clickCb(null, dataIndex)
         this.setState({
             showTop: true,
         })
     }

     render() {
         const { dataIndex } = this.props;
         const { filterTarget } = this.state;
         let isFilter = filterTarget[dataIndex] && (filterTarget[dataIndex].filterList || []).length !== (filterTarget[dataIndex].checkedList || []).length
         let isActive = isFilter || this.state.showTop
         let wrapClassName = isActive ? `${prefix}-table-column-single-filter ${prefix}-table-column-single-filter-active` : `${prefix}-table-column-single-filter`;
         return (
             <div className={`${wrapClassName} ${prefix}-table-title-icon`}>
                 <Popover rootClose arrowPointAtCenter placement="top" content={this.getContent(dataIndex)} trigger="click" show={this.state.showTop}
                     onVisibleChange={this.onVisibleChangeTop} onHide={this.onHide}>
                     <Icon type={isActive ? "uf-biaotoushaixuanyixuannormal" : "uf-shaixuan1-copy"} onClick={(e) => this.iconClick(e, dataIndex)}/>
                 </Popover>
             </div>
         )
     }
}


class Demo1506 extends Component<{}, Demo1505State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            filterTarget: {
                typeName: {
                    filterList: ['1', '2', '3', '4', '5', '6', '7', '8', '0'],
                    checkedList: ['1', '2', '3', '4', '5', '6', '7', '8', '0'],
                    searchStr: ''
                }
            },
            data: data

        };
    }
     clickCb = (filterTarget: any, _dataIndex: string) => {
         // 处理自定义组件的筛选条件和data逻辑
         if (filterTarget) {
             this.setState({
                 filterTarget
             })
         } else {
             this.setState({
                 filterTarget: this.state.filterTarget
             })
         }
     }

     filterColumnRender = (column: any) => {
         const { title, dataIndex } = column
         if (typeof title === 'string') {
             return title
         }
         if (dataIndex === 'typeName') {
             return '类型'
         }
         return title;
     }

     onSingleFilterRender = (column: any) => {
         const { dataIndex } = column;
         const { filterTarget } = this.state;
         return <FilterModal dataIndex={dataIndex} filterTarget={filterTarget} clickCb={this.clickCb}></FilterModal>
     }

     render() {
         return (
             <FilterColumnTable
                 columns={columns}
                 data={this.state.data}
                 filterColumnRender={this.filterColumnRender}
                 onSingleFilterRender={this.onSingleFilterRender}
             />
         )
     }
}

export default Demo1506;
