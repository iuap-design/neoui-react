/**
 * @title 多语示例
 * @description 所有页数均显示。
 */

import {Pagination} from "@tinper/next-ui";
import React from "react";

interface DemoState{
    activePage: number
}

class Demo4 extends React.Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activePage: 1,
        };
    }

    handleSelect(eventKey: number) {
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
	                onChange={this.handleSelect.bind(this)}
	                onPageSizeChange={this.onPageSizeChange}
	                total={100}
	                locale={"en-us"}
	            />
	        </div>
	    );
	}
}

export default Demo4;
