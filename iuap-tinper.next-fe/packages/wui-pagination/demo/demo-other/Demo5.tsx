/**
 * @title 不可用pagiantion
 * @description pagination不可使用状态
 */

import {Pagination} from "@tinper/next-ui";
import React from "react";

interface DemoState{
    activePage: number
}

class Demo5 extends React.Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activePage: 1,
        };
    }

	handleSelect = (eventKey: number) => {
	    console.log(eventKey);
	    this.setState({
	        activePage: eventKey,
	    });
	}

	onPageSizeChange = (activePage: number, pageSize: number) => {
	    console.log(activePage, pageSize);
	};

	render() {
	    return (
	        <div>
	            <Pagination
	                current={this.state.activePage}
	                onChange={this.handleSelect}
	                onPageSizeChange={this.onPageSizeChange}
	                total={100}
	                pageSize={20}
	                disabled={true}
	            />
	        </div>
	    );
	}
}

export default Demo5;
