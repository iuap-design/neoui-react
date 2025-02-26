/**
 *
 * @title 自定义过滤列
 * @parent onFilterColumnRender
 * @description 自定义过滤列 onFilterColumnRender
 * @type bip
 * demo1505
 */


import { Table, TableProps, ColumnType, Tabs, Button, Checkbox, Icon} from "@tinper/next-ui";
import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const {singleFilter, singleFind, sort, filterColumn} = Table;
const {TabPane} = Tabs;
const prefixCls = `wui-table`;

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
const FilterColumnTable = filterColumn(Table);
const FindColumnTable = singleFind(FilterColumnTable);
const SingleFilterTable = singleFilter(FindColumnTable);
const ComplexTable = sort(SingleFilterTable);

 interface Demo21State {
     columns: TableProps['columns'];
     rowButtons: any;
     lockable: boolean;
 }

 interface FilterColumnModalProps extends Partial<TableProps> {
    rowButtons: any;
    srcColumns: ColumnType[]
 }

 interface FilterColumnModalState {
    columns: ColumnType[];
    tempColumns: ColumnType[];
    srcColumns: ColumnType[];
    rowButtons: any;
    originRowButtons: any;
    showModal: boolean;
 }

 type FixedType = 'left' | 'right' | boolean | undefined;

class FilterColumnModal extends Component<FilterColumnModalProps, FilterColumnModalState> {
    dragArr: ColumnType[] = [];
    unDragArrLeft: ColumnType[] = [];
    unDragArrRight: ColumnType[] = [];
    showColumnsKeys: any[];
    constructor(props: FilterColumnModalProps) {
        super(props)
        this.unDragArrLeft = []
        this.unDragArrRight = []
        this.dragArr = []
        this.showColumnsKeys = [];
        this.state = {
            columns: this.setColumOrderByIndex(this.ObjectAssign(props.columns) as ColumnType[]),
            tempColumns: this.setColumOrderByIndex(this.ObjectAssign(props.columns) as ColumnType[]), // 修改，未确定之前，临时的变量,popover展示的数据源
            srcColumns: this.setColumOrderByIndex(this.ObjectAssign(props.srcColumns) as ColumnType[]), // 最原始的数据源
            originRowButtons: this.ObjectAssign(props.rowButtons),
            rowButtons: this.ObjectAssign(props.rowButtons),
            showModal: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: FilterColumnModalProps) {
        if (nextProps.columns != this.props.columns) {
            let {columns, srcColumns} = nextProps;
            this.showColumnsKeys = [];
            this.setState({
                columns: this.setColumOrderByIndex(this.ObjectAssign(columns) as ColumnType[]),
                tempColumns: this.setColumOrderByIndex(this.ObjectAssign(columns) as ColumnType[]),
                srcColumns: this.setColumOrderByIndex(this.ObjectAssign(srcColumns) as ColumnType[])
            });
        }
        if (nextProps.rowButtons !== this.props.rowButtons) {
            this.setState({
                rowButtons: nextProps.rowButtons
            })
        }
    }

    ObjectAssign = (obj: any) => {
        let b = obj instanceof Array;
        let tagObj = b ? [] : {};
        if (b) {// 数组
            obj.forEach((da: any) => {
                let _da = {};
                Object.assign(_da, da);
                (tagObj as any[]).push(_da);
            });
        } else {
            Object.assign(tagObj, obj);
        }
        return tagObj;
    }

    setColumOrderByIndex = (_column: ColumnType[]) => {
        _column.forEach((da: ColumnType) => {
            if (da.hasOwnProperty("ifshow")) {
                da.checked = !!da.ifshow;
                da.ifshow = da.checked;
                da.isShow = da.checked;
                if (da.ifshow) {
                    this.showColumnsKeys.push(da.dataIndex)
                }
            } else {
                da.checked = true;
                da.ifshow = true;
                da.isShow = true;
                this.showColumnsKeys.push(da.dataIndex)
            }
        });
        return _column;
    };

    onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        const [removed] = this.dragArr.splice(result.source.index, 1);
        this.dragArr.splice(result.destination.index, 0, removed);
        this.setState({
            tempColumns: this.unDragArrLeft.concat(this.dragArr).concat(this.unDragArrRight)
        })
    }

    // 递归列锁定和非锁定状态
    setChildColumns = (columns: ColumnType[], fixed: FixedType) => {
        columns.forEach((da, _i) => {
            da.fixed = fixed;
            if (da.children && Array.isArray(da.children) && da.children.length > 0) {
                this.setChildColumns(da.children as ColumnType[], fixed);
            }
        })
    }

    lockClick = (da: ColumnType) => {
        let {lockIndex, fixed} = da;
        const { tempColumns } = this.state;
        tempColumns.forEach((da, i) => {
            if ((lockIndex || lockIndex === 0) && fixed && i >= lockIndex) {
                // 如果右固定则保持不动
                let fixed = da.fixed === 'right' ? 'right' : undefined as FixedType;
                da.fixed = fixed;
                if (da.children && Array.isArray(da.children) && da.children.length > 0) {
                    this.setChildColumns(da.children as ColumnType[], fixed);
                }
            }

            if ((lockIndex || lockIndex === 0) && !fixed && i <= lockIndex) {
                da.fixed = 'left';
                if (da.children && Array.isArray(da.children) && da.children.length > 0) {
                    this.setChildColumns(da.children as ColumnType[], 'left');
                }
            }

        })

        this.setState({
            ...this.state
        });
    }

    checkedColumItemClick = (da: ColumnType) => {
        let {checkMinSize} = this.props; // 设置最少被选中的
        let sum = 0,
            leng = 0;
        this.state.tempColumns.forEach(da => {
            da.fixed ? "" : leng++;
            !da.fixed && da.checked ? sum++ : "";
        });
        if (checkMinSize && sum < checkMinSize && da.checked) {
            return false;
        } else {
            if (sum <= 1 && da.checked) return;
        }
        da.checked = !da.checked;
        da.ifshow = !!da.checked;
        da.isShow = !!da.checked;

        this.setState({
            ...this.state
        });
    };

    getCloumItem = () => {
        const { tempColumns } = this.state;
        this.dragArr = [];
        this.unDragArrLeft = [];
        this.unDragArrRight = [];
        tempColumns.forEach((da, i) => {
            da.lockIndex = i;
            if (da.fixed === true || da.fixed === 'left') {
                this.unDragArrLeft.push(da);
            } else if (da.fixed === 'right') {
                this.unDragArrRight.push(da);
            } else {
                this.dragArr.push(da);
            }
        });
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {
                    this.unDragArrLeft.map((da, i) => ( // 表现行为和列表展示一致
                        <div
                            key={da.key + "_" + i}
                            className={`${prefixCls}-filter-column-pop-cont-item`}
                        >
                            <Icon type="uf-tuodong"/>
                            <Checkbox checked={da.checked} disabled>
                                {da.title}
                            </Checkbox>
                            {da.fixed && <Icon type={da.fixed ? "uf-dongjie" : 'uf-weidongjie'} onClick={() => {
                                this.lockClick(da)
                            }}/>}
                        </div>
                    ))
                }
                <Droppable droppableId="droppable">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                        >
                            {
                                this.dragArr.map((da, i) =>
                                    (
                                        <Draggable key={da.key + "_" + i} index={i} draggableId={da.key + "_" + i}>
                                            {(provided: any) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    key={da.key + "_" + i}
                                                    className={`${prefixCls}-filter-column-pop-cont-item`}
                                                >
                                                    <Icon type="uf-tuodong"/>
                                                    <Checkbox checked={da.checked} onClick={() => this.checkedColumItemClick(da)} >
                                                        {da.title}
                                                    </Checkbox>
                                                    {<Icon type={da.fixed ? "uf-dongjie" : 'uf-weidongjie'} onClick={() => {
                                                        this.lockClick(da)
                                                    }}/>}
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                )
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {
                    this.unDragArrRight.map((da, i) => ( // 表现行为和列表展示一致
                        <div
                            key={da.key + "_" + i}
                            className={`${prefixCls}-filter-column-pop-cont-item`}
                        >
                            <Icon type="uf-tuodong"/>
                            <Checkbox checked={da.checked} disabled>
                                {da.title}
                            </Checkbox>
                            {<Icon type={da.fixed ? "uf-dongjie" : 'uf-weidongjie'} onClick={() => {
                                this.lockClick(da)
                            }}/>}
                        </div>
                    ))
                }
            </DragDropContext>
        );
    }

    clear = (flag: boolean) => {
        const {srcColumns, tempColumns} = this.state;
        let dataList = flag ? tempColumns : srcColumns;
        let cloneSrcColumns: ColumnType[] = dataList.map((da) => {
            if (flag && da.fixed) {
                return {...da}
            }
            return {
                ...da,
                checked: flag || this.showColumnsKeys.includes(da.dataIndex),
                ifshow: flag || this.showColumnsKeys.includes(da.dataIndex),
                isShow: flag || this.showColumnsKeys.includes(da.dataIndex),
            }
        })
        this.setState({
            tempColumns: cloneSrcColumns
        });
    }

    onHide = () => {
        const {onChange} = this.props;
        this.setState({
            columns: this.ObjectAssign(this.state.srcColumns) as ColumnType[]
        })
        onChange && onChange(this.state.srcColumns, this.state.rowButtons)
    }

    save = () => {
        const {onChange} = this.props;
        this.setState({
            columns: this.ObjectAssign(this.state.tempColumns) as ColumnType[]
        })
        onChange && onChange(this.state.tempColumns, this.state.rowButtons)
    }

    checkButtons = (da: any, checked: boolean) => {
        const { rowButtons } = this.state;
        let _rowButtons = rowButtons.map(item => {
            let _checked = item.key === da.key ? checked : item.checked;
            return {
                ...item,
                checked: _checked
            }
        })
        this.setState({
            rowButtons: _rowButtons
        })
    }

    checkButtonsClear = (flag: boolean) => {
        const { rowButtons } = this.state;
        let _rowButtons = rowButtons.map(item => {
            return {
                ...item,
                checked: flag
            }
        })
        this.setState({
            rowButtons: _rowButtons
        })
    }


    checkButtonsHide = () => {
        this.setState({
            rowButtons: this.state.originRowButtons
        })
    }

    checkButtonsSave = () => {
        const { onChange } = this.props;
        onChange && onChange(this.state.tempColumns, this.state.rowButtons)
    }

    render() {
        const { rowButtons } = this.state;
        return (
            <Tabs style={{width: '192px'}} type={'line'} defaultActiveKey="1">
                <TabPane tab='列表设置' key="1">
                    <div className={`${prefixCls}-filter-column-pop-cont`}>
                        <div className={`${prefixCls}-filter-column-pop-content`}>
                            {this.getCloumItem()}
                        </div>
                        <div className={`${prefixCls}-filter-column-pop-footer`}>
                            <span className={`${prefixCls}-filter-column-clear-setting`} onClick={() => this.clear(true)}>
                                全选
                            </span>
                            <span className={`${prefixCls}-filter-column-clear-setting`} onClick={() => this.clear(false)}>
                                重置
                            </span>
                            <Button colors="secondary" size="sm" onClick={this.onHide}>取消</Button>
                            <Button colors="primary" size="sm" onClick={this.save}>确定</Button>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab='行按钮' key="2">
                    <div className={`${prefixCls}-filter-column-pop-content`}>
                        {
                            rowButtons.map((da, i) => {
                                return (
                                    <div
                                        key={da.key + "_" + i}
                                        className={`${prefixCls}-filter-column-pop-cont-item`}
                                    >
                                        <Checkbox checked={da.checked} onChange={(checked) => this.checkButtons(da, checked)}>
                                            {da.title}
                                        </Checkbox>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={`${prefixCls}-filter-column-pop-footer`}>
                        <span className={`${prefixCls}-filter-column-clear-setting`} onClick={() => this.checkButtonsClear(true)}>
                                全选
                        </span>
                        <span className={`${prefixCls}-filter-column-clear-setting`} onClick={() => this.checkButtonsClear(false)}>
                                重置
                        </span>
                        <Button colors="secondary" size="sm" onClick={this.checkButtonsHide}>取消</Button>
                        <Button colors="primary" size="sm" onClick={this.checkButtonsSave}>确定</Button>
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

const srcColumns : TableProps['columns'] = [
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
    },
    {
        title: "类型",
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

class Demo1505 extends Component<{}, Demo21State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            columns: srcColumns.map(column => {
                return {...column}
            }),
            rowButtons: [
                {
                    title: '同意',
                    key: 'agree'
                },
                {
                    title: '拒绝',
                    key: 'refuse'
                },
                {
                    title: '忽略',
                    key: 'ignore'
                }
            ],
            lockable: true,
        };
    }
     afterFilter = (_optData: TableProps['columns'], _columns: TableProps['columns']) => {

     }

     onDropBorder = (_e: any, _width: number, _column: ColumnType, columns: ColumnType[]) => {
         this.setState({
             columns
         })
     }

     onChange = () => {
         this.setState({
             lockable: !this.state.lockable
         })
     }

     buttonsChange = (columns: any, rowButtons: any) => {
         this.setState({columns, rowButtons})
     }

     onFilterColumnRender = (columns: ColumnType[]) => {
         return <FilterColumnModal columns={columns} srcColumns={srcColumns} rowButtons={this.state.rowButtons} onChange={this.buttonsChange}></FilterColumnModal>
     }

	 renderRowHover = () => {
	     const { rowButtons } = this.state
	         return <div className="hover-btns">
	         {rowButtons.map((btn: any) => {
	             return btn.checked ? <Button key={btn.key} size="sm" bordered>{btn.title}</Button> : null
	         })}
	    </div>
	 };

	 render() {
	     let filterCheckboxProps = (column: ColumnType) => ({
	         disabled: column.key == 'purchasing',
	         name: column.key
	     })

	     return (
	         <ComplexTable
	             columns={this.state.columns}
	             data={data}
	             dragborder={true}
	             filterCheckboxProps={filterCheckboxProps}
	             onFilterColumnRender={this.onFilterColumnRender}
	             afterFilter={this.afterFilter}
	             lockable={this.state.lockable}
	             fieldid={'abc'}
	             hoverContent={this.renderRowHover}
	             onDropBorder={this.onDropBorder}
	         />
	     )
	 }
}

export default Demo1505;
