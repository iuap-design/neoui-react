/**
 * @title 缓存分页属性
 * @description 设置唯一cacheId可以缓存当前分页组件的pagesize
 * @type bip
 */

import {Pagination} from "@tinper/next-ui";
import React from "react";

interface DemoState{
    activePage: number,
    cacheId: string,
}

class Demo14 extends React.Component<{}, DemoState> {
    pageRef: any = null;
    constructor(props: {}) {
        super(props);
        this.state = {
            activePage: 1,
            cacheId: "20231108"
        };
    }
    componentDidMount() {
        // 提供两种方法获取缓存的pageSize
        console.log(this.pageRef.getCache(), Pagination.getCache(this.state.cacheId))
    }

    handleSelect = (activePage: number) => {
        this.setState({
            activePage: activePage,
        });
    }
    onPageSizeChange = (activePage: number, pageSize: number) => {
	    console.log(activePage, pageSize);
	    this.setState({
	        activePage: activePage
	    });
    }
    render() {
        return (
            <Pagination
                ref={(el: any) => this.pageRef = el}
                cacheId={this.state.cacheId}
                showSizeChanger
                pageSizeOptions={["10", "20", "30", "50", "80"]}
                total={300}
                defaultPageSize={20}
                current={this.state.activePage}
                onChange={this.handleSelect}
                onPageSizeChange={this.onPageSizeChange}
            />
        );
    }
}

export default Demo14;
