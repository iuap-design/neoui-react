/*
 * @Author: Mr.mjc
 * @Date: 2023-01-09 11:28:23
 * @LastEditors: Mr.mjc
 * @LastEditTime: 2023-01-11 14:25:20
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/hooks/usePagination.ts
 */
import { useState } from "react";


export const getPaginationParam = (
    pagination: any,
    mergedPagination: any,
) => {
    const param: any = {
        current: mergedPagination.current,
        pageSize: mergedPagination.pageSize,
    };
    const paginationObj = pagination && typeof pagination === 'object' ? pagination : {};

    Object.keys(paginationObj).forEach((pageProp) => {
        const value = (mergedPagination as any)[pageProp];

        if (typeof value !== 'function') {
            param[pageProp] = value;
        }
    });

    return param;
}


const usePagination = (total: number, pagination: any, onChange: (current: number, pageSize: number) => void): [any, () => void] => {
    const { total: paginationTotal = 0, ...otherPagenation} = pagination && typeof pagination === 'object' ? pagination : {};
    const [innerPagination, setInnerPagination] = useState<{
        current?: number,
        pageSize?: number
    }>(() => ({
        current: 'defaultCurrent' in otherPagenation ? otherPagenation.defaultCurrent : 1,
        pageSize: 'defaultPageSize' in otherPagenation ? otherPagenation.defaultPageSize : 10,
    }))

    const mergePagenation = Object.assign({}, { ...innerPagination}, {...otherPagenation}, { total: paginationTotal > 0 ? paginationTotal : total});

    const maxPage = Math.ceil((paginationTotal || total) / mergePagenation.pageSize!)

    if (mergePagenation.current! > maxPage) {
        mergePagenation.current = maxPage || 1;
    }

    const refreshPagination = (current?: number, pageSize?: number) => {
        setInnerPagination({
            current: current ?? 1,
            pageSize: pageSize || mergePagenation.pageSize,
        });
    };

    const onInternalChange: any = (current: number, pageSize: number) => {
        if (pagination) {
            pagination.onChange?.(current, pageSize);
        }
        refreshPagination(current, pageSize);
        onChange(current, pageSize || mergePagenation?.pageSize!);
    };

    if (pagination === false) {
        return [{}, () => {}]
    }

    return [
        {
            ...mergePagenation,
            onChange: onInternalChange,
        },
        refreshPagination,
    ];
}

export default usePagination;