/*
 * @Author: Mr.mjc
 * @Date: 2023-01-05 16:26:32
 * @LastEditors: Mr.mjc
 * @LastEditTime: 2023-01-11 15:41:08
 * @Description: 表格自带分页组件
 * @FilePath: /next-ui/packages/wui-table/src/lib/tablePage.tsx
 */
import React from 'react';
import Pagination from '../../../wui-pagination/src';
import { PaginationProps } from '../../../wui-pagination/src/iPagination';


const TablePage: React.FC<Partial<PaginationProps>> = React.forwardRef((props: PaginationProps, ref) => {
    const {
        total,
        onChange: propOnChange,
        ...other
    } = props
    const onChange = (current: number, pageSize: number) => {
        propOnChange && propOnChange(current, pageSize)
    }
    // @ts-ignore
    return <Pagination
        {...other}
        total={total}
        // @ts-ignore
        ref={ref}
        onChange={(current, pageSize) => onChange(current, pageSize)}
        onPageSizeChange={(current, pageSize) => onChange(current, pageSize)}
    />
})
export default TablePage;
