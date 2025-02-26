/**
 *
 * @title 抽屉footer 和内置Footer 组件
 * @description 抽屉footer
 * @type other
 */

import { Button, Drawer, Space } from '@tinper/next-ui';
import React, { Component } from 'react';


interface DrawerState1 {
	showDrawer: boolean;
	showDrawerLeft: boolean;
}

class Demo15 extends Component<{}, DrawerState1> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showDrawer: false,
            showDrawerLeft: false,
        };
    }

	open = () => {
	    this.setState({
	        showDrawer: true,
	        showDrawerLeft: false
	    })
	}
	openLeft = () => {
	    this.setState({
	        showDrawerLeft: true,
	        showDrawer: false
	    })
	}

	render() {
	    let { showDrawer, showDrawerLeft } = this.state;
	    return (
	        <div className="demoPadding">
	            <Button onClick={this.open} colors="primary">打开</Button>
	            <Button onClick={this.openLeft} colors="primary">打开left</Button>
	            <Drawer
	                visible={showDrawer}
	                width={500}
	                footer={<Space>
	                    <Button onClick={() => {
	                        this.setState({ showDrawer: false });
	                    }}>
	                        取消
	                    </Button>
	                    <Button type="primary" onClick={() => {
	                        this.setState({ showDrawer: false });
	                    }}>
	                        确定
	                    </Button>
	                </Space>}
	                footerStyle={{height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}
	                title={'Drawer 自定义 footer 和 footerStyle'}
	                style={{ position: 'fixed' }}
	                placement={'right'}
	                zIndex={1000}
	            >
	                <div className="con">
	                    <p>这是第一行文字</p>
	                    <p>这是第二行文字</p>
	                    <p>这是第三行文字</p>
	                </div>
	            </Drawer>
	            <Drawer
	                visible={showDrawerLeft}
	                width={500}
	                footerStyle={{height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}
	                title={'Drawer 自定义 footer 和 footerStyle'}
	                style={{ position: 'fixed' }}
	                placement={'right'}
	                zIndex={1000}
	            >
	                <div className="con">
	                    <p>这是第一行文字</p>
	                    <p>这是第二行文字</p>
	                    <p>这是第三行文字</p>
	                </div>
	                <Drawer.Footer className='sdfsd'>
	                    <Space>
	                        <Button onClick={() => {
	                            this.setState({ showDrawerLeft: false });
	                        }}>
								取消
	                        </Button>
	                        <Button type="primary" onClick={() => {
	                            this.setState({ showDrawerLeft: false });
	                        }}>
								确定
	                        </Button>
	                    </Space>
	                </Drawer.Footer>
	            </Drawer>
	        </div>
	    )
	}
}

export default Demo15;
