/**
 * @title 自定义跳页的确认按钮
 * @description 通过confirmBtn参数自定义确认按钮，默认不显示按钮，设置之后需手动触发跳转。
 */

import {Button, Pagination} from "@tinper/next-ui";
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

	renderConfirmBtn = () => {
	    return (
	        <Button className="confirm-btn" size={"small"} bordered>
				确认
	        </Button>
	    );
	};

	render() {
	    return (
	        <div>
	            <Pagination
	                current={this.state.activePage}
	                onChange={this.handleSelect}
	                onPageSizeChange={this.onPageSizeChange}
	                total={100}
	                showQuickJumper={true}
	                confirmBtn={this.renderConfirmBtn}
	                id="testid"
	            />
	        </div>
	    );
	}
}

export default Demo6;
