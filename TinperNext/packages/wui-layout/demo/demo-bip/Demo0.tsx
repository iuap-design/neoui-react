/**
 *
 * @title 基本结构
 * @description 典型的页面布局(Layout,Header,Sider,Content,Footer) 使用fieldid
 *
 */

import {Layout} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Header, Content, Footer, Sider} = Layout;

class Demo5 extends Component {
    render() {
        return (
            <div className="layout-demo-basic">
                <Layout fieldid="layout">
                    <Header fieldid="header">Header</Header>
                    <Content fieldid="content">Content</Content>
                    <Footer fieldid="footer">Footer</Footer>
                </Layout>

                <Layout>
                    <Header>Header</Header>
                    <Layout>
                        <Sider>Sider</Sider>
                        <Content>Content</Content>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>

                <Layout>
                    <Header>Header</Header>
                    <Layout>
                        <Content>Content</Content>
                        <Sider>Sider</Sider>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>

                <Layout>
                    <Sider>Sider</Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content>Content</Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Demo5;
