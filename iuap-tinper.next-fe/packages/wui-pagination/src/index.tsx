import React, {Component} from 'react'
import Pagination, {defaultProps as paginationDefaultProps} from './Pagination';
import { PaginationProps } from './iPagination';
import {setComponentSize} from "../../wui-core/src/componentStyle"
import { isShouldUpdate } from '../../wui-core/src/warning';

// const sizeMap: Record<string, string> = {
//     small: 'sm',
//     sm: 'sm',
//     large: 'lg',
//     lg: 'lg',
// }

// const propTypes = {
//     ...paginationPropTypes,
// };

const defaultProps = {
    pageSizeOptions: paginationDefaultProps.pageSizeOptions
}

class PaginationAdapter extends Component<Partial<PaginationProps>> {
    // constructor(props) {
    //     super(props);
    // }

    static defaultProps = defaultProps;
    static getCache = Pagination.getCache;
	paginationRef: Pagination | null = null;

    getCache = () => {
        return this.paginationRef?.getCache()
    }

    render() {
	    let {
	        // 当前页
	        current,
	        activePage,
	        // 分页改变事件
	        onChange,
	        onSelect,
	        // 是否展示快速跳页
	        showQuickJumper,
	        showJump,
	        // 页码数组
	        pageSizeOptions,
	        dataNumSelect,
	        // 页码改变事件
	        onShowSizeChange,
	        onPageSizeChange,
	        onDataNumSelect,
	        size = 'sm',
	        // 默认当前页
	        defaultCurrent,
	        defaultActivePage,
	        // 默认页码
	        defaultPageSize,
	        defaultDataNum,
	        pageSize,
	        dataNum,
	        ...others
	    } = this.props;
	    isShouldUpdate("Pagination", this.props);
	    pageSizeOptions = pageSizeOptions ?? dataNumSelect ?? [];
	    // 将下拉数组 页码大小都转成数字类型
	    pageSizeOptions = pageSizeOptions.filter(num => num && !isNaN(Number(num))).map(num => Number(num));
	    pageSize = pageSize && Number(pageSize);
	    defaultPageSize = defaultPageSize && Number(defaultPageSize);

	    // 如果dataNumSelect里没有当前指定的页码，则将pageSize加入到dataNumSelect，并不可修改
	    if (pageSize && !pageSizeOptions.includes(pageSize)) {
	        pageSizeOptions.push(pageSize)
	        pageSizeOptions = pageSizeOptions.sort((a: any, b: any) => a - b)
	    } else if (defaultPageSize && !pageSizeOptions.includes(defaultPageSize)) {
	        pageSizeOptions.push(defaultPageSize)
	        pageSizeOptions = pageSizeOptions.sort((a: any, b: any) => a - b)
	    }

	    // 初始dataNumSelect默认 的下标
	    // if(defaultPageSize && dataNumSelect.includes(defaultPageSize)) {
	    // 	defaultDataNum = dataNumSelect.indexOf(defaultPageSize)
	    // }

	    // if (pageSize && dataNumSelect.includes(pageSize)) {
	    // 	dataNum = dataNumSelect.indexOf(pageSize)
	    // }


	    if (defaultDataNum && !isNaN(defaultDataNum) && !defaultPageSize && pageSizeOptions[defaultDataNum]) {
	        defaultPageSize = pageSizeOptions[defaultDataNum]
	    }

	    if (dataNum && !isNaN(dataNum) && !pageSize && pageSizeOptions[dataNum]) {
	        pageSize = pageSizeOptions[dataNum]
	    }

	    return (
	        <Pagination
			    ref={(el) => this.paginationRef = el}
	            showQuickJumper={showQuickJumper ?? showJump}
	            activePage={current || activePage}
	            defaultActivePage={defaultCurrent || defaultActivePage}
	            // dataNum={dataNum} //每页显示条数在 dataNumSelect 数组中的下标 index。例如每页显示 15 条，那么 dataNum 的值应为 '15' 在 ['5','10','15','20'] 中的下标：2
	            // defaultDataNum={defaultDataNum}
	            pageSize={pageSize} // 指定的分页数量
	            defaultPageSize={defaultPageSize}
	            pageSizeOptions={pageSizeOptions}
	            size={setComponentSize(size)}
	            onChange={onChange || onSelect}
	            onPageSizeChange={onPageSizeChange || onShowSizeChange || onDataNumSelect}
	            {...others}
	        />
	    )
    }
}

// PaginationAdapter.propTypes = {...propTypes}
// PaginationAdapter.defaultProps = {...defaultProps};
// export default PaginationAdapter as React.ComponentClass<Partial<PaginationProps>>;
export default PaginationAdapter;
