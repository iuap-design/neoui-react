/**
 * @title simple的简单分页
 * @description 通过noBorder参数设置是否显示按钮边框。
 * @type bip
 */

import {Pagination} from "@tinper/next-ui";
import React from 'react';

interface DemoState{
    activePage: number
}

class Demo7 extends React.Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activePage: 1
        }
    }

	handleSelect = (activePage: number) => {
	    console.log(activePage);
	    // this.setState({
	    //     activePage: activePage
	    // });
	}

	onPageSizeChange = (activePage: number, pageSize: number) => {
	    console.log('onPageSizeChange===', activePage, pageSize);
	}


	render() {
	    return (
	        <div>
	            <p style={{ textAlign: 'right' }}>简单分页</p>
	            <Pagination
	                simple
	                current={this.state.activePage}
	                onChange={this.handleSelect}
	                total={10000000000}
	                pageSize={10}
	            />
	            <p style={{ textAlign: 'right' }}>极简分页</p>
	            <Pagination
	                simple={{ showSizeChanger: true }}
	                onPageSizeChange={this.onPageSizeChange}
	                total={10000000000}
	                pageSize={10}
	            />

	        </div>
	    );
	}
}

export default Demo7;
