/*
 * @Author: Mr.mjc
 * @Date: 2022-07-05 14:09:58
 * @LastEditors: MJC
 * @LastEditTime: 2023-09-27 11:28:44
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/index.tsx
 */
import Column from "./Column";
import ColumnGroup from "./ColumnGroup";
import AntdTable from './lib/AntdTable';
import bigData from './lib/bigData';
import dragColumn from './lib/dragColumn';
import filterColumn from './lib/filterColumn';
import multiSelect from './lib/multiSelect';
import singleFilter from './lib/singleFilter';
import singleFind from "./lib/singleFind";
import singleSelect from './lib/singleSelect';
import sort from './lib/sort';
import sum from './lib/sum';
import InternalTable from "./MiddlewareTable";
import MergeTable from './lib/MergeTable';
import Pagination from '../../wui-pagination/src';
import {
    SELECTION_ALL,
    SELECTION_INVERT,
    SELECTION_NONE
} from './constant';
type InternalTableType = typeof InternalTable;
export interface TableInterface extends InternalTableType {
    getPaginationCache: (key: string) => any;
    multiSelect: typeof multiSelect;
    singleSelect: typeof singleSelect;
    bigData: typeof bigData;
    dragColumn: typeof dragColumn;
    filterColumn: typeof filterColumn;
    sort: typeof sort;
    sum: typeof sum;
    singleFilter: typeof singleFilter;
    singleFind: typeof singleFind;
    Column: typeof Column;
    ColumnGroup: typeof ColumnGroup;
    AntdTable: typeof AntdTable;
    MergeTable: typeof MergeTable;
    SELECTION_ALL: typeof SELECTION_ALL;
    SELECTION_INVERT: typeof SELECTION_INVERT;
    SELECTION_NONE: typeof SELECTION_NONE;
}
const Table = InternalTable as TableInterface;
Table.multiSelect = multiSelect;
Table.singleSelect = singleSelect;
Table.bigData = bigData;
Table.dragColumn = dragColumn;
Table.filterColumn = filterColumn;
Table.sort = sort;
Table.MergeTable = MergeTable;

Table.sum = sum;
Table.singleFilter = singleFilter;
Table.singleFind = singleFind;
Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.SELECTION_ALL = SELECTION_ALL;
Table.SELECTION_INVERT = SELECTION_INVERT;
Table.SELECTION_NONE = SELECTION_NONE;
Table.AntdTable = AntdTable;
Table.getPaginationCache = (cacheId) => Pagination.getCache(cacheId ? `${cacheId}_pagination` : '');
export default Table;
