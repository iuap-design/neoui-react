/**
 *
 * @title 侧边栏全部收起
 * @description 可以使用collapsedWidth调整侧边栏收起宽度，且使用breakpoint进行屏幕自适应
 * @type other
 * demo9
 */

import { Icon, Layout, Tree, Menu, Table } from "@tinper/next-ui";
import React, { Component } from "react";
import "./Demo9.scss";

const { Header, Content, Sider } = Layout;

const TreeNode = Tree.TreeNode;

function isIE11Func() {
    return navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf("rv:11.0") > -1;
}

const columns = [
    { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
    { title: "员工姓名", dataIndex: "b", key: "b", width: 100 },
    { title: "性别", dataIndex: "c", key: "c", width: 100 },
    { title: "部门", dataIndex: "d", key: "d", width: 100 },
    { title: "职级", dataIndex: "e", key: "e", width: 100 },
];
const data = [
    { a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1" },
    { a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2" },
    { a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3" },
];

class Demo9 extends Component {
    state = {
        collapsed: false,
        selectedKeys: ["0-0-0-0"],
    };

    onSelect = (selectedKeys: string[]) => {
        console.log(selectedKeys);
        this.setState({ selectedKeys });
    };

    onCollapse = (collapsed: boolean, type: string) => {
        console.log('collapsed', collapsed);
        console.log('type', type)
        this.setState({collapsed})
    };

    onBreakpoint = (broken: boolean) => {
        console.log("broken", broken);
        this.setState({ collapsed: !broken });
    };

    render() {
        const { collapsed } = this.state;
        const isIE11 = isIE11Func();
        const collapsedWidth = isIE11 ? 200 : 0;
        const siderStyle = isIE11 ? { background: '#f0f2f5', display: collapsed ? 'none' : 'block'} : { background: '#f0f2f5'}
        return (
            <Layout className="layout-collapsed">
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout style={{position: 'relative'}}>
                    <Sider
                        style={siderStyle}
                        collapsible
                        collapsedWidth={collapsedWidth}
                        onCollapse={this.onCollapse}
                        collapsed={collapsed}
                        breakpoint="lg"
                        onBreakpoint={this.onBreakpoint}
                    >
                        <Tree
                            showIcon
                            defaultExpandAll
                            onSelect={this.onSelect}
                        >
                            <TreeNode
                                title="parent 1"
                                key="0-0"
                                icon={<Icon type="uf-treefolder" />}
                            >
                                <TreeNode
                                    title="parent 1-0"
                                    key="0-0-0"
                                    icon={<Icon type="uf-treefolder" />}
                                >
                                    <TreeNode
                                        title="leaf1"
                                        key="0-0-0-0"
                                        icon={<Icon type="uf-list-s-o" />}
                                    />
                                    <TreeNode title="leaf2" key="0-0-0-1" />
                                    <TreeNode
                                        title="leaf3"
                                        visibleCheckbox={false}
                                        key="0-0-0-2"
                                    />
                                </TreeNode>
                                <TreeNode title="parent 1-1" key="0-0-1">
                                    <TreeNode
                                        title={<span>sss</span>}
                                        key="0-0-1-0"
                                        icon={<Icon type="uf-list-s-o" />}
                                    />
                                </TreeNode>
                            </TreeNode>
                        </Tree>
                    </Sider>
                    <Content
                        style={{
                            minHeight: 340,
                            padding: "50px 30px 20px",
                        }}
                    >
                        <Table columns={columns} data={data} showRowNum={true} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Demo9;

