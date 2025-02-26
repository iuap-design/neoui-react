/**
 * @title loading
 * @description 在计算出total之前可以先设置为Infinity，此时分页处于loading状态
 * @type bip
 */

import { Pagination } from "@tinper/next-ui";
import React from "react";

interface DemoState {
    activePage: number,
    pageSize: number,
    total: number,
}

class Demo13 extends React.Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activePage: 1,
            pageSize: 10,
            total: Infinity,
        };
    }
    componentDidMount() {
        this.loadData()
    }
    handleSelect = (activePage: number) => {
        this.setState({
            activePage: activePage,
        });
    }
    onPageSizeChange = (activePage: number, pageSize: number) => {
        console.log(activePage, pageSize);
        this.setState({
            activePage: activePage,
            pageSize: pageSize,
        });
    }
    loadData = () => {
        let timer = setTimeout(() => {
            this.setState({
                total: 10000
            });
            clearTimeout(timer);
        }, 10000)
    }
    render() {
        const { total, activePage, pageSize } = this.state;
        return (
            <div>
                <Pagination
                    showSizeChanger
                    pageSizeOptions={["10", "20", "30", "50", "80"]}
                    total={total}
                    pageSize={pageSize}
                    current={activePage}
                    onChange={this.handleSelect}
                    onPageSizeChange={this.onPageSizeChange}
                />
            </div >
        );
    }
}

export default Demo13;
