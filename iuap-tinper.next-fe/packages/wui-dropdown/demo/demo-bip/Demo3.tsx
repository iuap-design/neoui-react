/**
 *
 * @title button带loading的下拉菜单
 * @description 结合buttonsRender让按钮处于加载状态，最后两个按钮演示点击后进入加载状态
 * @type bip
 */

import {Dropdown, Menu, MenuProps, DropdownProps} from "@tinper/next-ui";
import React, {Component} from "react";

const {Item, Divider, SubMenu, ItemGroup} = Menu;

const onSelect: MenuProps['onSelect'] = (info) => {
    console.log(`${info.key} selected`);
}

const onVisibleChange: DropdownProps['onVisibleChange'] = (visible) => {
    console.log(visible);
}

const menu1 = (
    <Menu onSelect={onSelect}>
        <Item key="1">借款合同</Item>
        <Item key="2">抵/质押合同</Item>
        <Item key="3">担保合同</Item>
        <Item key="4">联保合同</Item>
        <Divider/>
        <Item key="5">合同审批</Item>
        <Item key="6">抵/质押合同跟踪</Item>
    </Menu>
);

const menu2 = (
    <Menu onSelect={onSelect}>
        <ItemGroup title="合同类别">
            <Item key="1">借款合同</Item>
            <Item key="2">抵/质押合同</Item>
            <Item key="3">担保合同</Item>
            <Item key="4">联保合同</Item>
        </ItemGroup>
        <ItemGroup title="合同操作">
            <Item key="5">合同审批</Item>
            <Item key="6">抵/质押合同跟踪</Item>
        </ItemGroup>
    </Menu>
);
const menu3 = (
    <Menu onSelect={onSelect}>
        <SubMenu key="sub1" title="合同类别">
            <Item key="1">借款合同</Item>
            <Item key="2">抵/质押合同</Item>
            <Item key="3">担保合同</Item>
            <Item key="4">联保合同</Item>
        </SubMenu>
        <SubMenu key="sub2" title="合同操作">
            <Item key="5">抵/质押合同跟踪</Item>
            <Item key="51">抵/质押合同跟踪</Item>
            <Item key="52">抵/质押合同跟踪</Item>
            <Item key="53">抵/质押合同跟踪</Item>
            <SubMenu key="sub3" title="合同审批">
                <Item key="6">待审批合同</Item>
                <Item key="7">已审批合同</Item>
            </SubMenu>
        </SubMenu>
    </Menu>
);

interface DemoState {
    loadings: boolean[];
}

class Demo3 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            loadings: [false, false]
        }
    }
    enterLoading(index: number) {
        this.setState((state: Readonly<DemoState>) => {
            const newLoadings = [...state.loadings];
            newLoadings[index] = true;
            return {loadings: newLoadings};
        });

        setTimeout(() => {
            this.setState((state: Readonly<DemoState>) => {
                const newLoadings = [...state.loadings];
                newLoadings[index] = false;
                return {loadings: newLoadings};
            });
        }, 3000);
    }
    render() {
        const {loadings} = this.state;
        return (
            <div className="demoPadding">
                <Dropdown.Button
                    overlay={menu1}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                    buttonsRender={([leftButton]) => [
                        React.cloneElement(leftButton as React.ReactElement, {loading: true})
                    ]}
                >
                    按钮
                </Dropdown.Button>

                <Dropdown.Button
                    overlay={menu2}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                    triggerType="icon"
                    buttonsRender={([leftButton, rightButton]) => [
                        React.cloneElement(leftButton as React.ReactElement, {loading: true}),
                        rightButton,
                    ]}
                >
                    Icon按钮
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu3}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                    buttonsRender={([leftButton]) => [
                        React.cloneElement(leftButton as React.ReactElement, {
                            loading: loadings[0],
                            onClick: () => this.enterLoading(0)
                        })
                    ]}
                >
                    按钮
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu3}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                    triggerType="icon"
                    buttonsRender={([leftButton, rightButton]) => [
                        React.cloneElement(leftButton as React.ReactElement, {
                            loading: loadings[1],
                            onClick: () => this.enterLoading(1)
                        }),
                        rightButton,
                    ]}
                >
					icon按钮
                </Dropdown.Button>
            </div>
        );
    }
}

export default Demo3;
