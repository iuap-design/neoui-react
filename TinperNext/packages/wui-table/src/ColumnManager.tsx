/*
 * @Author: Mr.mjc
 * @Date: 2022-06-16 19:38:36
 * @LastEditors: MJC
 * @LastEditTime: 2024-12-30 15:16:06
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/ColumnManager.tsx
 */
// import React from 'react';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import { columnType, defaultDragHandleColumn, DEFAULT_ROW_NUM_WIDTH } from './constant';
import { DefaultRecordType, FixedType } from './interface';
import { ColumnType, ShowRowNumType, InnerColumnType } from './iTable';
import i18n from "./lib/i18n";
import {getLangInfo} from "../../wui-locale/src/tool";
import {ObjectAssign} from "./lib/util";

// 行控制管理
export default class ColumnManager {
	columns: InnerColumnType[];
	// columns: ColumnType<DefaultRecordType>[];
	originWidth: number;
	_cached = {}
	// DefaultColumnWidth = getTableCssHeight(`--${prefix}-table-cloumn-width`);// 缺省的列宽度
	locale: any;
	defaultColumnWidth: number;
	originColumns: ColumnType<DefaultRecordType>[];
	showRowNum: boolean | ShowRowNumType;
	constructor(columns: ColumnType<DefaultRecordType>[], _elements: JSX.Element[], originWidth: number, rowDraggAble: boolean, showRowNum: boolean | ShowRowNumType, locale: any, defaultColumnWidth: number) {
	    this.showRowNum = showRowNum;
	    if (columns && columns.length) {
	        columns = this.addDragHandleColumn(columns, rowDraggAble);
	        columns = this.addOrderColumn(columns, showRowNum, locale);
	        // columns = this.deleteColumnNotShow(columns);
	    }
	    // this.columns = columns && columns.length ? columns.filter(col => !!col) : this.normalize(elements, showRowNum, locale);
	    this.originColumns = ObjectAssign([...(columns.filter(col => !!col))]) as ColumnType<DefaultRecordType>[];
	    this.columns = columns.filter(col => !!col);
	    this.originWidth = originWidth;
	    this.defaultColumnWidth = defaultColumnWidth;// 缺省的列宽度
	}

	get = () => {
	    return ObjectAssign([...this.originColumns]);
	}

	set = (columns: InnerColumnType[]) => {
	    this.columns = ObjectAssign(columns) as InnerColumnType[];
	    this.originColumns = ObjectAssign(columns) as InnerColumnType[];
	    this._cached = {}
	}

	// 向数据列中添加一列:行拖拽标识
	addDragHandleColumn = (columns:ColumnType<DefaultRecordType>[], rowDraggAble: boolean) => {
	    if (!rowDraggAble) {
	        return columns
	    }
	    let currentColumn = columns.find(item => item.columnType === columnType.ROWDRAG);
	    let currentColumnIndex = columns.findIndex(item => item.columnType === columnType.ROWDRAG) || 0;
	    let dragHandleColumn: ColumnType<DefaultRecordType> = {
	        ...defaultDragHandleColumn,
	        ...(currentColumn || {})
	    }
	    if (!currentColumn) { // 外部未传拖拽列的配置
	        columns = [dragHandleColumn].concat(columns);
	    } else {
	        columns.splice(currentColumnIndex, 1, dragHandleColumn)
	    }
	    return columns;
	}

	// delete the column which does not show
	deleteColumnNotShow = (columns:ColumnType<DefaultRecordType>[]) => {
	    let len = columns.length;
	    for (let i = 0; i < len; i++) {
	        if (columns && columns[i] && (columns[i].ifshow === false || columns[i].isShow === false)) {
	            columns.splice(i, 1);
	            i--;
	        }
	    }
	    return columns;
	}

	getDefaultRowNum = (locale: any) => {
	    let {key, fixed, width, name, type, ...others} = this.showRowNum as ShowRowNumType;
	    let _locale = getLangInfo(locale, i18n, 'table')
	    let order: ColumnType<DefaultRecordType> = {
	        dataIndex: key || '_index',
	        key: '_index',
	        fixed: fixed !== undefined ? fixed : 'left',
	        width: width || DEFAULT_ROW_NUM_WIDTH,
	        title: name || _locale.langMap.showRowNum || '序号',
	        columnType: columnType.ROWNUM,
	        singleFilter: false, // 不可过滤
	        singleFind: false, // 不可查找
	        dragborder: false, // 不可拖拽
	        titleAlign: 'center',
	        contentAlign: 'center',
	        // filterColumn: false, // 不可锁定
	        render: (_text: any, _record: DefaultRecordType, index: number) => {
	            const {base} = this.showRowNum as ShowRowNumType;
	            switch (type) {
	                case 'ascii': {
	                    // @ts-ignore
	                    return (String.fromCharCode((base || 'a')?.charCodeAt() + index));
	                }
	                case 'number':
	                default: {
	                    return (Number(base || 0)) + index;
	                }
	            }
	        },
	        ...others
	    }
	    return order;
	}


	// 向数据列中添加一列:序号
	addOrderColumn = (columns:ColumnType<DefaultRecordType>[], showRowNum: boolean | ShowRowNumType, locale: any):ColumnType<DefaultRecordType>[] => {
	    let currentIndex = columns.findIndex(col => col.columnType === columnType.ROWNUM)
	    if (!showRowNum && currentIndex < 0) {
	        return columns
	    }

	    let order = this.getDefaultRowNum(locale)
	    let currentColumn = columns.find(item => item.columnType === columnType.ROWNUM);
	    let currentColumnIndex = columns.findIndex(item => item.columnType === columnType.ROWNUM) || 0;
	    let orderColumn: ColumnType<DefaultRecordType> = {
	        ...order,
	        ...(currentColumn || {})
	    }
	    if (!currentColumn) { // 外部未传显示行order的配置, 有多选单选和抓手列则放入后边
	        if (columns.length > 0 && columns[0] && ['checkbox', 'radio', 'dragHandle'].includes(columns[0].dataIndex as string)) {
	            if (columns[1] && ['checkbox', 'radio', 'dragHandle'].includes(columns[1].dataIndex as string)) {
	                columns.splice(2, 0, orderColumn);
	            } else {
	                columns.splice(1, 0, orderColumn);
	            }
	        } else {
	            columns = [orderColumn].concat(columns);
	        }
	    } else { // 外部传入了显示行order的配置
	        columns.splice(currentColumnIndex, 1, orderColumn);
	    }

	    return columns;
	}

	isAnyColumnsFixed() {
	    return this._cache('isAnyColumnsFixed', () => {
	        return this.columns.some((column: ColumnType<DefaultRecordType>) => !!column.fixed);
	    });
	}

	isAnyColumnsLeftFixed() {
	    return this._cache('isAnyColumnsLeftFixed', () => {
	        return this.columns.some(
	            (column: ColumnType<DefaultRecordType>) => column.fixed === 'left' || column.fixed === true
	        );
	    });
	}

	isAnyColumnsRightFixed() {
	    return this._cache('isAnyColumnsRightFixed', () => {
	        return this.columns.some(
	            (column: ColumnType<DefaultRecordType>) => column.fixed === 'right'
	        );
	    });
	}

	leftColumns() {
	    return this._cache('leftColumns', () => {
	        return this.groupedColumns().filter(
	            (column: ColumnType<DefaultRecordType>) => column.fixed === 'left' || column.fixed === true
	        );
	    });
	}

	rightColumns() {
	    return this._cache('rightColumns', () => {
	        return this.groupedColumns().filter(
	            (column: ColumnType<DefaultRecordType>) => column.fixed === 'right'
	        );
	    });
	}

	centerColumns() {
	    return this._cache('centerColumns', () => {
	        return this.groupedColumns().filter(
	            (column: ColumnType<DefaultRecordType>) => !column.fixed
	        );
	    });
	}

	// 全部末级列（多表头下）节点
	leafColumns() {
	    return this._cache('leafColumns', () =>
	        this._leafColumns(this.columns as ColumnType<DefaultRecordType>[])
	    );
	}

	leftLeafColumns() {
	    return this._cache('leftLeafColumns', () =>
	        this._leafColumns(this.leftColumns())
	    );
	}

	rightLeafColumns() {
	    return this._cache('rightLeafColumns', () =>
	        this._leafColumns(this.rightColumns())
	    );
	}

	centerLeafColumns() {
	    return this._cache('centerLeafColumns', () =>
	        this._leafColumns(this.centerColumns())
	    );
	}

	// 获取显示的列，加入第二个参数, 判断是否需要全部列满足sticky版表格
	showLeafColumns(fixed?: FixedType, isAll?: boolean) {
	    let columns = [];
	    if (isAll) {
	        columns = this.leafColumns();
	    } else {
	        if (fixed) {
	            if (fixed == 'right') {
	                columns = this.rightLeafColumns();
	            } else {
	                columns = this.leftLeafColumns();
	            }
	        } else {
	            columns = this.centerLeafColumns();
	        }
	    }
	    let showColumns = columns.filter((col: ColumnType<DefaultRecordType>) => col.ifshow == true || col.isShow == true);
	    return showColumns;
	}

	// add appropriate rowspan and colspan to column
	groupedColumns(type?:string) {
	    return this._cache('groupedColumns', () => {
	        const _groupColumns = (columns: ColumnType<DefaultRecordType>[], currentRow: number = 0, parentColumn: any = {}, rows: any[] = []) => {
	            // track how many rows we got
	            rows[currentRow] = rows[currentRow] || [];
	            const grouped:any[] = [];
	            const setRowSpan = (column:ColumnType<DefaultRecordType>) => {
	                const rowSpan = rows.length - currentRow;
	                if (column &&
						!column.children && // parent columns are supposed to be one row
						rowSpan > 1 &&
						(!column.rowSpan || column.rowSpan < rowSpan)
	                ) {
	                    column.rowSpan = rowSpan;
	                }
	            };
	            columns.forEach((column, _index) => {
	                let defaultOpt: any = {
	                    ifshow: true,
	                    isShow: true
	                }
	                if (!this.originWidth) {
	                    defaultOpt.width = this.defaultColumnWidth;
	                }
	                // 获取非固定列
	                if (type == 'nofixed' && column.fixed) {
	                    return false;
	                }
	                let realWidth = column.width === undefined || column.width === null || column.width === '' ? defaultOpt.width : column.width;
	                const newColumn: ColumnType<DefaultRecordType> = {...defaultOpt, ...column, ...{width: realWidth}};
	                if (type == 'show' && (newColumn.ifshow == false || newColumn.isShow == false)) {
	                    return
	                }
	                rows[currentRow].push(newColumn);
	                parentColumn.colSpan = parentColumn.colSpan || 0;
	                if (newColumn.children && (newColumn.children as ColumnType<DefaultRecordType>[]).length > 0) {
	                    // @ts-ignore
	                    newColumn.children = _groupColumns((newColumn.children as ColumnType<DefaultRecordType>[]), currentRow + 1, newColumn, rows);
	                    parentColumn.colSpan = parentColumn.colSpan + (newColumn.colSpan || 0);
	                } else {
	                    parentColumn.colSpan++;
	                }
	                // console.log('rows==>', rows, currentRow)
	                // update rowspan to all same row columns
	                for (let i = 0; i <= rows[currentRow].length - 1; ++i) {
	                    setRowSpan(rows[currentRow][i]);
	                }
	                // last column, update rowspan immediately
	                // if (index + 1 === columns.length) {
	                //     setRowSpan(newColumn);
	                // }
	                grouped.push(newColumn);
	            });
	            return grouped;
	        };
	        return _groupColumns(this.columns);
	    });
	}

	// normalize(elements: JSX.Element[], showRowNum: boolean | ShowRowNumType, locale: any) {
	//     const columns:ColumnType<DefaultRecordType>[] = [];
	//     React.Children.forEach(elements, element => {
	//         if (!this.isColumnElement(element)) return;
	//         let column = {...element.props};
	//         let _columnType = column.columnType || columnType.DEFAULTTYPE;
	//         if (element.key) {
	//             column.key = element.key;
	//         }
	//         if (element.type === ColumnGroup) {
	//             column.children = this.normalize(column.children, showRowNum, locale);
	//         }
	//         if (_columnType === columnType.ROWDRAG) { // 拖拽行
	//             column = {
	//                 ...defaultDragHandleColumn,
	//                 ...column
	//             }
	//         }
	//         if (_columnType === columnType.ROWNUM) { // 列序号行
	//             let defaultRowNumColumn = this.getDefaultRowNum(showRowNum, locale)
	//             column = {
	//                 ...defaultRowNumColumn,
	//                 ...column
	//             }
	//         }
	//         columns.push(column);
	//     });
	//     return columns;
	// }

	isColumnElement(element: JSX.Element) {
	    return element && (element.type === Column || element.type === ColumnGroup);
	}

	reset(columns:ColumnType<DefaultRecordType>[], _elements: JSX.Element[] | null | undefined, showRowNum: boolean | ShowRowNumType, rowDraggAble: boolean, locale: any) {
	    this.showRowNum = showRowNum
	    columns = this.addDragHandleColumn(columns, rowDraggAble);
	    columns = this.addOrderColumn(columns, showRowNum, locale);
	    // columns = this.deleteColumnNotShow(columns);
	    this.originColumns = [...(columns.filter(col => !!col))];
	    this.columns = columns
	    // this.columns = columns || (elements && this.normalize(elements, showRowNum, locale));
	    this._cached = {};
	}

	clearCache() {
	    this._cached = {};
	}

	getColumnWidth(contentWidth: number) {
	    let allColumns = this.leafColumns();
		const columns = allColumns.filter((col: ColumnType<DefaultRecordType>) => !!col.ifshow && !!col.isShow);
	    let res: {
			computeWidth: number,
			lastShowIndex: number,
			lastDataIndex?: null | string | number
		} = {computeWidth: 0, lastShowIndex: -1, lastDataIndex: null};
	    let centerShowColCount = 0;// 中间区域的可见列个数å
	    // let count = 0;
	    columns.forEach((col:ColumnType<DefaultRecordType>) => {
	        // 如果列显示
	        if (col.ifshow !== false && col.isShow !== false) {
	            let width = col.width;
	            if (typeof (width) == 'string' && width.includes('%')) {
	                width = contentWidth * parseInt(col.width + '') / 100;
	            }
	            res.computeWidth += parseInt(width + '');
	            if (!col.fixed) {
	                centerShowColCount++;
	                res.lastDataIndex = col.dataIndex || col.key
	            }
	        }
	    })
	    // res.lastDataIndex = columns[centerShowColCount - 1].dataIndex;
	    res.lastShowIndex = centerShowColCount - 1;
	    return res;
	}

	getLeftColumnsWidth(contentWidth = 1) {
	    return this._cache('leftColumnsWidth', () => {
	        let leftColumnsWidth = 0;
	        this.groupedColumns().forEach((column:ColumnType<DefaultRecordType>) => {
	            if (column.fixed === 'left' || column.fixed === true) {
	                let width = column.width;
	                if (typeof (width) == 'string' && width.includes('%')) {
	                    width = contentWidth * parseInt(column.width + '') / 100;
	                }
	                leftColumnsWidth += parseInt(width + '')
	            }
	        });
	        return leftColumnsWidth;
	    });
	}

	getRightColumnsWidth(contentWidth = 1) {
	    return this._cache('rightColumnsWidth', () => {
	        let rightColumnsWidth = 0;
	        this.groupedColumns().forEach((column:ColumnType<DefaultRecordType>) => {
	            if (column.fixed === 'right') {
	                let width = column.width;
	                if (typeof (width) == 'string' && width.includes('%')) {
	                    width = contentWidth * parseInt(column.width + '') / 100;
	                }
	                rightColumnsWidth += parseInt(width + '')
	            }
	        });
	        return rightColumnsWidth;
	    });
	}

	getLeftColumnKeys() {
	    return this._cache('leftColumnKeys', () => {
	        return this.leftColumns().map((column: ColumnType<DefaultRecordType>) => {
	            return column.key || column.dataIndex
	        })
	    });
	}

	getRightColumnKeys() {
	    return this._cache('rightColumnKeys', () => {
	        return this.rightColumns().map((column: ColumnType<DefaultRecordType>) => {
	            return column.key || column.dataIndex;
	        })
	    });
	}

	// 通过key或dataIndex查找匹配的列定义（支持多表头的列定义情况）
	findColumn(columnKey: string | number) {
	    return this._findColumn(columnKey, this.columns || []);
	}

	_findColumn(columnKey: string | number, columns: ColumnType<DefaultRecordType>[]): any {
	    for (let i = 0; i < columns.length; i++) {
	        let findOne = null;
	        let column = columns[i];
	        if (!column) continue;
	        if (column.key == columnKey || column.dataIndex == columnKey) {// 兼容只有key的情况
	            findOne = column;
	        } else {
	            if (column.children) {
	                findOne = this._findColumn(columnKey, (column.children as ColumnType<DefaultRecordType>[]));
	            }
	        }
	        if (findOne) return findOne;
	    }
	}


	_cache(name: string, fn: any) {
	    if (name in this._cached) {
	        // @ts-ignore
	        return this._cached[name];
	    }
	    // @ts-ignore
	    this._cached[name] = fn();
	    // @ts-ignore
	    return this._cached[name];
	}

	// todo 含有children的宽度计算
	_leafColumns(columns:ColumnType<DefaultRecordType>[]) {
	    const leafColumns:ColumnType<DefaultRecordType>[] = [];

	    columns.forEach(column => {
	        if (!column.children || (column.children && Array.isArray(column.children) && column.children.length == 0)) {

	            let defaultOpt: any = {
	                ifshow: true,
	                isShow: true,
	            }
	            if (!this.originWidth) {
	                defaultOpt.width = this.defaultColumnWidth;
	            }
	            // '0px' / 0 / '0' / undefind / null / ''
	            let realWidth = column.width === undefined || column.width === null || column.width === '' ? defaultOpt.width : column.width;
	            const newColumn = {...defaultOpt, ...column, ...{width: realWidth}};
	            leafColumns.push(newColumn);
	        } else {
	            leafColumns.push(...this._leafColumns(column.children as ColumnType<DefaultRecordType>[]));
	        }
	    });
	    return leafColumns;
	}
}
