/*
 * @Author: Mr.mjc
 * @Date: 2022-07-05 14:09:58
 * @LastEditors: Mr.mjc
 * @LastEditTime: 2022-07-28 19:48:58
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/lib/multiSelect.tsx
 */
// @ts-nocheck
import PropTypes from 'prop-types';
import React, {Component} from "react";
import {prefix} from "../../../wui-core/src/index"
import TreeUtils from "../../../wui-core/src/TreeUtils";
import Dropdown from "../../../wui-dropdown/src";
import Icon from "../../../wui-icon/src";
import Menu from "../../../wui-menu/src";
import multiSelectX from "./multiSelectX";
import {getValueByRowKey, ObjectAssign} from './util';

const {Item} = Menu;
/**
 * 参数: 过滤表头
 * @param {*} Table
 * @param {*} Checkbox
 * @param {*} Popover
 * @param {*} Icon
 */
export default multiSelectX;

export function multiSelectOld(Table, Checkbox) {
    // console.warn('旧版multiSelect，建议使用multiSelectX');
    return class MultiSelect extends Component {
		static propTypes = {
		    autoCheckedByClickRows: PropTypes.bool, // 行点击时，是否自动勾选复选框
		    getSelectedDataFunc: PropTypes.func,
		    onRowClick: PropTypes.func,
		    autoSelect: PropTypes.bool,
		    multiSelectConfig: PropTypes.object,
		    data: PropTypes.any,
		    columns: PropTypes.any,
		    expandIconColumnIndex: PropTypes.number,
		    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		    rowSelection: PropTypes.object,
		};
		static defaultProps = {
		    prefixCls: prefix + "-table-mult-select",
		    rowKey: 'key',
		    getSelectedDataFunc: () => {
		    },
		    autoSelect: false,
		    autoCheckedByClickRows: true,
		    multiSelectConfig: {}
		}

		constructor(props) {
		    super(props);
		    this.state = {
		        data: ObjectAssign(props.data)
		    }
		}

		UNSAFE_componentWillReceiveProps(nextProps) {
		    if ('data' in nextProps) {
		        this.setState({
		            data: ObjectAssign(nextProps.data)
		        })
		    }
		}


		/**
		 * 获取选中、未选、半选状态
		 * @param {*} data
		 */
		getCheckedOrIndeter(data) {
		    let obj = {};
		    let checkStatus = this.checkAllSelected(data);
		    if (!checkStatus) {
		        obj.checkedAll = false;
		        obj.indeterminate = false;
		        return obj;
		    }
		    if (checkStatus == 'indeter') {
		        obj.indeterminate = true;
		        obj.checkedAll = false;
		    } else if (checkStatus == 'all') {
		        obj.checkedAll = true;
		        obj.indeterminate = false;
		    }
		    return obj;
		}

		/**
		 * 判断数据是否全部选中
		 * @param {*} data
		 * return  string  all(全选)、indeter(半选)
		 */
		setChecked(data) {
		    if (!Array.isArray(data)) return false;
		    if (data.length == 0) return false;
		    let count = 0;
		    let disabledCount = 0;
		    data.forEach(da => {
		        if (da._checked && !da._disabled) {
		            count++;
		        }
		        if (da._disabled) {
		            disabledCount++;
		        }
		    })

		    if (data.length == count + disabledCount && count > 0) {
		        return "all";
		    }
		    return count == 0 ? false : "indeter";
		}

		/**
		 * 重写：判断数据是否全部选中
		 * @return "all"-全选，false-未选 ，"indeter"-半选
		 */
		checkAllSelected = (data) => {
		    if (!Array.isArray(data)) return false;
		    if (data.length == 0) return false;
		    let count = 0;
		    let disabledCount = 0;
		    let length = 0;
		    let getTree = (arr) => {
		        arr.forEach(item => {
		            length++;
		            if (item._checked && !item._disabled) {
		                count++;
		            } else if (item._disabled) {
		                disabledCount++;
		            }
		            if (item.children) {
		                getTree(item.children);
		            }
		        })
		    }
		    getTree(data);
		    if (length == count + disabledCount && count > 0) {
		        return "all";
		    }
		    return count == 0 ? false : "indeter";
		}
		// 点击全选
		onAllCheckChange = (checkedAll, e) => {
		    let {data} = this.state;
		    let selectList = [];
		    let changedList = [];
		    data.forEach(item => {
		        if (item.children) {
		            let {res, changeArr} = this.setTree(item, checkedAll, true);
		            selectList = selectList.concat(res);
		            changedList = changedList.concat(changeArr);
		        } else {
		            if (!item._disabled) {
		                let preCheck = item._checked;
		                item._checked = checkedAll;
		                if (preCheck !== checkedAll) {
		                    changedList.push(item)
		                }
		            }

		            if (item._checked) {
		                selectList.push(item);
		            }
		        }
		    });
		    this.setState({data});
		    this.props.getSelectedDataFunc(selectList, undefined, undefined, data, e, changedList);
		}

		/**
		 * 遍历树节点和它的子孙节点，设置_checked
		 */
		setTree = (node, flag, autoSelect) => {
		    let res = [];
		    let changeArr = []
		    let setTreeNodeFlag = (node, flag, changeArr) => {
		        if (!node._disabled) {
		            let preCheck = node._checked;
		            node._checked = flag;
		            if (preCheck !== flag) {
		                changeArr.push(node)
		            }
		        }
		        if (flag) {
		            res.push(node);
		        }
		        if (node.children && autoSelect) {
		            node.children.forEach(item => {
		                setTreeNodeFlag(item, flag, changeArr);
		            })
		        }
		    }
		    setTreeNodeFlag(node, flag, changeArr);
		    return {res, changeArr};
		}

		/**
		 * 遍历树节点和它的子孙节点，获取对应状态的节点数组
		 */
		getTree = (node, key, value) => {
		    let res = [];
		    let getTreeNodeByFlag = (node) => {
		        if (node[key] === value) {
		            res.push(node);
		        }
		        if (node.children) {
		            node.children.forEach(item => {
		                getTreeNodeByFlag(item);
		            })
		        }
		    }
		    getTreeNodeByFlag(node);
		    return res;
		}

		// 获取每行的唯一键
		getRowKey(record, index) {
		    return getValueByRowKey(this.props.rowKey, record, index);
		}

		// 点击单行勾选
		onCheckboxChange = (text, record, index, e) => {
		    let {rowKey} = this.props;
		    let {data} = this.state;
		    let selectList = [];
		    // 当前选中行的唯一键值
		    let checkedRowKey = this.getRowKey(record, index);
		    // if(!checkedRowKey)return;
		    if (!checkedRowKey && checkedRowKey !== 0 && checkedRowKey !== '0') return
		    // 从数据(含树形数据)中匹配出当前勾选的行对象
		    let matchResults = TreeUtils.findWithPropName(data, (row, i) => {
		        return (typeof rowKey == 'function') ? rowKey(row, i) : row[rowKey];
		    }, checkedRowKey, true, true);
		    let matchRecord = matchResults.length > 0 ? matchResults[0] : null;
		    if (!matchRecord) return;
		    // 设置当前勾选行对象的选中状态
		    this.setTree(matchRecord, !record._checked, this.props.autoSelect);
		    // 获取全部勾选状态的数据
		    data.forEach((da, index) => {
		        if (da.children) {
		            selectList = selectList.concat(this.getTree(da, '_checked', true))
		        } else if (da._checked) {
		            selectList.push(da);
		        }
		    })
		    this.setState({data: data})
		    this.props.getSelectedDataFunc(selectList, record, index, data, e);
		};


		onSelect = ({item, key, selectKeys}) => {
		    // const { onSelectionSelect } = this.props;
		    // onSelectionSelect && onSelectionSelect(item, key, selectKeys)
		    const {data} = this.state;
		    const {rowSelection = {}} = this.props;
		    const {selections} = rowSelection;
		    let list = this.changeableRowKeys(data);
		    const _index = selections.findIndex(el => el.key == key)
		    const onSelect = selections[_index].onSelect
		    _index > -1 && onSelect && onSelect(list)
		}

		changeableRowKeys = (data) => {
		    let list = [];
		    this.getChangeableRowKeys(data, list)
		    return list;
		}

		getChangeableRowKeys = (data, list = []) => {
		    data.filter(v => !v.disabled).forEach((record, index) => {
		        let _key = this.getRowKey(record, index)
		        list.push(_key)
		        if (record.children && Array.isArray(record.children)) {
		            this.getChangeableRowKeys(record.children, list)
		        }
		    })
		}


		getDefaultColumns = (columns) => {
		    let {multiSelectConfig, rowSelection = {}} = this.props;
		    const {
		        columnTitle,
		        columnWidth,
		        fixed,
		        hideSelectAll,
		        renderCell,
		        selections,
		        getCheckboxProps
		    } = rowSelection;
		    let {data} = this.state;
		    let {checkedAll, indeterminate} = this.getCheckedOrIndeter(data);
		    // const data = this.props.data;
		    const dataLength = data.length;
		    let disabledCount = 0;
		    // 设置表头Checkbox是否可以点击
		    data.forEach((item, index, arr) => {
		        if (item._disabled) {
		            disabledCount++;
		        }
		    })

		    const menu = (
		        <Menu onSelect={({item, key, selectKeys}) => this.onSelect({item, key, selectKeys})}>
		            {
		                (selections || []).map((data) => {
		                    return <Item key={data.key}>{data.text}</Item>
		                })
		            }
		        </Menu>
		    )

		    const selectionsView = <Dropdown trigger={['click']} overlay={menu} transitionName='slide-up'>
		        <Icon type="uf-anglearrowdown"/>
		    </Dropdown>

		    let title = columnTitle ? columnTitle : hideSelectAll ? null : (
		        <div>
		            <Checkbox
		                style={{display: "inline-block"}}
		                className="table-checkbox"
		                checked={!!checkedAll}
		                indeterminate={indeterminate}
		                {...multiSelectConfig}
		                disabled={disabledCount == dataLength}
		                onChange={(check, e) => this.onAllCheckChange(check, e)}
		            />
		            {selections && Array.isArray(selections) ? selectionsView : null}
		        </div>
		    )

		    let _defaultColumns = [{
		        className: `${prefix}-table-multiSelect-column`,
		        title: title,
		        key: "checkbox",
		        dataIndex: "checkbox",
		        fixed: typeof fixed === 'boolean' ? !!fixed : 'left',
		        width: columnWidth || 40,
		        render: renderCell && typeof renderCell === 'function' ? (text, record, index) => renderCell(text, record, index) : (text, record, index) => {
		            let attr = {};
		            record._disabled ? attr.disabled = record._disabled : "";
		            let _getCheckboxProps = getCheckboxProps && typeof getCheckboxProps === 'function' ? {...getCheckboxProps(record)} : {}
		            return <Checkbox
		                key={index}
		                className="table-checkbox"
		                {...attr}
		                {...multiSelectConfig}
		                {..._getCheckboxProps}
		                checked={record._checked}
		                onChange={(check, e) => this.onCheckboxChange(text, record, index, e)}
		            />
		        }
		    }]
		    return _defaultColumns.concat(columns);
		}

		// 实现行点击时触发多选框勾选的需求
		onRowClick = (record, index, event) => {
		    let {autoCheckedByClickRows, onRowClick} = this.props;
		    if (autoCheckedByClickRows) {
		        if (record._disabled) return;// disabled只控制checkbox不可用，不能影响onRowClick的回调
		        this.onCheckboxChange('', record, index, event);
		    }
		    onRowClick && onRowClick(record, index, event);
		}

		render() {
		    const {columns, expandIconColumnIndex} = this.props;
		    const {data} = this.state;
		    return <Table {...this.props}
						  columns={this.getDefaultColumns(columns)}
						  data={data}
						  onRowClick={this.onRowClick}
						  expandIconColumnIndex={expandIconColumnIndex ? expandIconColumnIndex + 1 : 1}
		    />
		}
    };
}
