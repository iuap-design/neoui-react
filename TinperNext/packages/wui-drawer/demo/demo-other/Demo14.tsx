/**
 *
 * @title 额外操作
 * @description extra 抽屉右上角的操作区域
 * @type other
 */

import { Button, Drawer, Space } from '@tinper/next-ui';
import React, { Component } from 'react';


interface DrawerState1 {
	showDrawer: boolean;
	maskClosable: boolean;
	showClose: boolean;
	hasHeader: boolean;
}

class Demo1 extends Component<{}, DrawerState1> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showDrawer: false,
            maskClosable: false,
            showClose: true,
            hasHeader: true,
        };
    }

	open = () => {
	    this.setState({
	        showDrawer: true
	    })
	}

	render() {
	    let { maskClosable, showDrawer, showClose, hasHeader } = this.state;
	    return (
	        <div className="demoPadding">
	            <Button onClick={this.open} colors="primary">打开</Button>
	            <Drawer
	                visible={showDrawer}
	                maskClosable={maskClosable}
	                closable={showClose}
	                hasHeader={hasHeader}
	                width={500}
	                extra={<Space>
	                    <Button onClick={() => {
	                        this.setState({ hasHeader: !hasHeader });
	                    }}>
	                        {hasHeader ? '无头部' : '有头部'}
	                    </Button>
	                    <Button type="primary" onClick={() => {
	                        this.setState({ showClose: !showClose, maskClosable: !maskClosable });
	                    }}>
	                        {showClose ? '无关闭按钮' : '有关闭按钮'}
	                    </Button>
	                </Space>}
	                zIndex={1000}
	                style={{ position: 'fixed' }}
	                title={'Drawer has extra operations'}
	                placement={'right'}
	            >
	                <div className="con">
	                    <p>这是第一行文字</p>
	                    <p>这是第二行文字</p>
	                    <p>这是第三行文字</p>
	                </div>
	            </Drawer>
	        </div>
	    )
	}
}

export default Demo1;
