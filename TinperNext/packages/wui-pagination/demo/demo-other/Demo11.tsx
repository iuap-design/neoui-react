/**
 * @title 使用id
 * @description 组件添加id会在相应功能dom 生成系列id，fieldid为自动化测试使用
 */

import { Button, Pagination } from "@tinper/next-ui";
import React from "react";
interface DemoState {
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
        this.setState({
	        activePage: activePage
	    });
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
                    showSizeChanger
                    current={this.state.activePage}
                    onChange={this.handleSelect}
                    onPageSizeChange={this.onPageSizeChange}
                    total={100}
                    showQuickJumper={true}
                    confirmBtn={this.renderConfirmBtn}
                    id="testid"
                    fieldid="fieldid"
                    pageSizeInput
                />
            </div>
        );
    }
}

export default Demo6;
