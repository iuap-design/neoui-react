/**
 * @title 显示所有页码
 * @description 所有页数均显示。默认无跳转按钮。
 */

import {Pagination} from "@tinper/next-ui";
import React from 'react';

interface DemoState{
    activePage: number
}

class Demo1 extends React.Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activePage: 1,
        }
    }

    handleSelect(eventKey: number) {
        this.setState({
            activePage: eventKey
        });
    }

	onPageSizeChange = (activePage: number, pageSize: number) => {
	    console.log(activePage, pageSize);
	}

	render() {
	    return (
	        <div>
	            <Pagination
	                maxButtons={100}
	                defaultPageSize={20}
	                onChange={this.handleSelect.bind(this)}
	                onPageSizeChange={this.onPageSizeChange}
	                showQuickJumper={false}
	                current={this.state.activePage}
	                total={50}
	            />
	        </div>
	    );
	}
}

export default Demo1;
