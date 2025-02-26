/**
 * @title 无间隔Pagination
 * @description 无间隔Pagination，页码有边框noBorder=false的情况下生效
 */

import {Pagination} from "@tinper/next-ui";
import React from "react";

interface DemoState{
    activePage: number
}

class Demo3 extends React.Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

	handleSelect = (eventKey: number) => {
	    this.setState({
	        activePage: eventKey
	    });
	}

	render() {
	    return (
	        <Pagination
	            noBorder={false}
	            gap={false}
	            current={this.state.activePage}
	            onChange={this.handleSelect}
	            total={100}
	        />
	    );
	}
}

export default Demo3;
