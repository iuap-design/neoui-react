/**
 * @title 按钮有边框
 * @description 通过noBorder=false增加按钮边框。
 */

import {Pagination} from "@tinper/next-ui";
import React from "react";
interface DemoState{
    activePage: number
}
class Demo6 extends React.Component<{}, DemoState> {
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
	                noBorder={false}
	                maxButtons={5}
	                current={this.state.activePage}
	                onChange={this.handleSelect}
	                onPageSizeChange={this.onPageSizeChange}
	                total={100}
	                pageSize={10}
	            />
	        </div>
	    );
	}
}

export default Demo6;
