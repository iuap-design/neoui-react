/**
 * @title 支持itemRender, hideOnSinglePage, showTotal
 * @description 自定义页码以及按钮的结构,只有一页时隐藏分页器,显示数据总量和当前数据顺序
 */

import {Pagination} from "@tinper/next-ui";
import React from "react";

const itemRender = (eventKey: number | undefined, type: string, ComponentWrap: React.ReactNode) => {
    if (type === 'prev') {
        return <a>Prev</a>
    }
    if (type === 'next') {
        return <a>Next</a>
    }
    if (type === 'last') {
        return <a>Last</a>
    }
    if (type === 'first') {
        return <a>First</a>
    }
    if (type === 'page') {
        return <a>p{eventKey}</a>
    }
    return ComponentWrap;
};

class Demo12 extends React.Component {

    render() {
        return (
            <Pagination
                showSizeChanger
                pageSizeOptions={["10", "30", "100"]}
                total={100}
                defaultPageSize={10}
                onChange={(activePage: number) => {
                    console.log('onChange', activePage)
                }}
                onPageSizeChange={(activePage, dataNumValue) =>
                    console.log('onPageSizeChange', activePage, dataNumValue)
                }
                noBorder={false}
                itemRender={itemRender}
                hideOnSinglePage
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            />
        );
    }
}

export default Demo12;
