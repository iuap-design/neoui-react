/**
 *
 * @title 自定义触发器
 * @description 要使用自定义触发器，可以设置 trigger={null} 来隐藏默认设定
 * @type other
 * demo8
 */

import {Icon, Layout, Menu} from '@tinper/next-ui';
import React, {Component} from 'react';
import './Demo8.scss';

const {Header, Content, Sider} = Layout;

class Demo8 extends Component {


	state = {
	    collapsed: false,
	};

	toggle = () => {
	    this.setState({
	        collapsed: !this.state.collapsed,
	    });
	};

	render() {
	    return (
	        <Layout className="layout-triger">
	            <Sider theme='dark' trigger={null} collapsible collapsed={this.state.collapsed}>
	                <div className="logo"/>
	                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
	                    <Menu.Item key="1">
							nav 1
	                    </Menu.Item>
	                    <Menu.Item key="2">
							nav 2
	                    </Menu.Item>
	                    <Menu.Item key="3">
							nav 3
	                    </Menu.Item>
	                </Menu>
	            </Sider>
	            <Layout className="site-layout">
	                <Header className="site-layout-background" style={{padding: 0}}>
	                    <span className="trigger" onClick={this.toggle}>{this.state.collapsed ?
	                        <Icon type="uf-2arrow-right"/> : <Icon type="uf-2arrow-left"/>}</span>
	                </Header>
	                <Content
	                    className="site-layout-background"
	                    style={{
	                        margin: '24px 16px',
	                        padding: 24,
	                        minHeight: 280,
	                    }}
	                >
						Content
	                </Content>
	            </Layout>
	        </Layout>
	    )
	}
}

export default Demo8;
