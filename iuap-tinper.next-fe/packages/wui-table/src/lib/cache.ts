const filterKey = [
    'fixed',
    'dataIndex',
    'key',
    'width',
    'align',
    'ellipsis',
    'colSpan',
    'rowSpan',
    'ifshow',
    'isShow',
    'order',
    'sortDirections',
    'orderNum',
    'parentDataIndexKey',
]

// 考虑多列表头(递归处理)
// 交换顺序
const cacheTarget = {
    merge: (key: string, cloumns: any[]) => {
        if (!window.localStorage) return cloumns;
        let cacheColumns = JSON.parse(window.localStorage.getItem(key) || '[]'); // 缓存的columns
        cloumns = cacheTarget.flat(cloumns); // 摊平后的columns
        let newData: any[] = [];
        // let matchedColumns: any[] = [];
        let matchedColumnMap = new Map();
        // let notMatchedColumns: any[] = [];
        // 结合缓存进行展示, 考虑树形的表头结构递归处理
        cacheColumns.forEach((cacheItem: any) => {
            cloumns.forEach((item) => {
                if (item.dataIndex === cacheItem.dataIndex || item.key === cacheItem.key) {
                    // matchedColumns.push(
                    //     {
                    //         ...item,
                    //         ...cacheItem
                    //     }
                    // )
                    matchedColumnMap.set(item.dataIndex, {
                        ...item,
                        ...cacheItem
                    })
                    return false
                }
            })
        })
        cloumns.forEach((item) => {
            let newItem = {...item};
            if (matchedColumnMap.has(item.dataIndex)) {
                newItem = {...matchedColumnMap.get(item.dataIndex)};
            }
            newData.push(newItem)
        })
        // cloumns.forEach((item) => {
        //     let repeat = false;
        //     matchedColumns.forEach((cacheItem: any) => {
        //         if (item.dataIndex === cacheItem.dataIndex || item.key === cacheItem.key) {
        //             repeat = true;
        //             return false
        //         }
        //     });
        //     if (!repeat) {
        //         notMatchedColumns.push(item);
        //     }
        // })
        // newData = [...matchedColumns, ...notMatchedColumns];
        return newData || [];
    },
    // 结合缓存进行展示
    get: (key: string, cloumns: any[]) => {
        let isTree = cacheTarget.isTreeColumns(cloumns);
        let newData = cacheTarget.merge(key, cloumns);
        return isTree ? cacheTarget.setTreeColumns(newData) : newData;
    },
    // 给什么存什么
    set: (key: string, cloumns: any[]) => {
        if (!window.localStorage) return;
        // 过滤需要缓存的信息
        cloumns = cacheTarget.flat(cloumns); // 摊平后的columns
        let newColumns: any[] = [];
        cloumns.forEach((item) => {
            const obj = {};
            filterKey.forEach((key) => {
                if (item.hasOwnProperty(key)) {
                    // obj[key] = item[key] || ''; // 解决某些字段为undefined的情况
                    obj[key] = item[key] !== undefined ? item[key] : ''; // 解决某些字段为undefined的情况
                }
            });
            newColumns.push(obj);
        })
        window.localStorage.setItem(key, JSON.stringify(newColumns));
    },
    // 修改某一列的缓存信息
    setOne: (key: string, cloumns: any[], column: any) => {
        // 获取全部的缓存信息
        if (!window.localStorage) return;
        //  隐藏后又拖拽，需要把之前隐藏的也存储起来
        cloumns = cacheTarget.flat(cloumns); // 摊平后的columns
        let newColumns: any[] = JSON.parse(window.localStorage.getItem(key) || '[]');
        // let list = newColumns.map(item => item.dataIndex);
        cloumns.forEach((item) => {
            const obj = {};
            let isCurrentColumn = item.dataIndex === column.dataIndex || item.key === column.key; // 是否要设置的列
            // 没有的重新赋值，有的取缓存
            // if (isCurrentColumn) {
            //     filterKey.forEach((key) => {
            //         if (item.hasOwnProperty(key)) {
            //             obj[key] = column[key] !== undefined ? column[key] : '';
            //         }
            //     });
            // }
            filterKey.forEach((key) => {
                if (item.hasOwnProperty(key)) {
                    // obj[key] = column[key] !== undefined ? column[key] : '';
                    if (isCurrentColumn) {
                        obj[key] = column[key] !== undefined ? column[key] : '';
                    } else {
                        obj[key] = item[key] !== undefined ? item[key] : '';
                    }
                }
            });
            let currentIndex = newColumns.findIndex(col => col.dataIndex === column.dataIndex || col.key === column.key)
            if (currentIndex >= 0 && isCurrentColumn) {
                newColumns.splice(currentIndex, 1, {
                    ...obj,
                    parentDataIndexKey: item.parentDataIndexKey
                })
            } else {
                if (!newColumns.some(col => col.dataIndex === item.dataIndex || col.key === item.key)) {
                    newColumns.push({
                        ...obj,
                        parentDataIndexKey: item.parentDataIndexKey
                    });
                }
            }
            // if (list.includes(column.dataIndex || column.key)) {
            //     let currentIndex = list.findIndex(item => item === column.dataIndex)
            //     if (currentIndex > 0) {
            //         newColumns.splice(currentIndex, 1, {
            //             ...obj,
            //             parentDataIndexKey: item.parentDataIndexKey
            //         })
            //     }
            // } else {
            //     newColumns.push({
            //         ...obj,
            //         parentDataIndexKey: item.parentDataIndexKey
            //     });
            // }
        })
        window.localStorage.setItem(key, JSON.stringify(newColumns));
    },
    // 是否是多表头
    isTreeColumns: (columns: any[]) => {
        return columns.some((item) => item.children && Array.isArray(item.children) && item.children && item.children.length);
    },
    // 多表头摊平处理
    flat: (columns: any[], parentDataIndexKey?: string) => {
        if (!columns) return [];
        if (!cacheTarget.isTreeColumns(columns)) return columns;
        let arr: any[] = [];
        const fn = (list: any[], parentDataIndexKey?: string) => {
            list.forEach((item) => {
                let hasChildren = item.children && Array.isArray(item.children) && item.children.length;
                let childrenAttr = hasChildren ? {children: []} : {};
                arr.push(Object.assign({}, item, { parentDataIndexKey }, childrenAttr));
                if (hasChildren) {
                    fn(item.children, item.dataIndex || item.key);
                }
            })
        }
        fn(columns, parentDataIndexKey);
        return arr;
    },
    // 摊平后的多表头转化为树形结构
    setTreeColumns: (columns: any[]) => {
        if (!columns) return [];
        let arr: any[] = [];
        const fn = (list: any[]) => {
            list.forEach((item) => {
                if (item.parentDataIndexKey || item.parentDataIndexKey === '0') {
                    let parent = list.find((elem) => elem.dataIndex === item.parentDataIndexKey || elem.key === item.parentDataIndexKey);
                    if (parent) {
                        if (parent.children) {
                            parent.children.push(item);
                        } else {
                            parent.children = [item];
                        }
                    }
                } else {
                    arr.push(item);
                }
                delete item.parentDataIndexKey;
            })
        }
        fn(columns);
        return arr;
    },
    // 清空缓存
    delete: (key: string) => {
        if (!window.localStorage) return;
        window.localStorage.removeItem(key);
    },
}

export default cacheTarget;