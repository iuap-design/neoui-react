/**
 *
 * @title 下拉菜单组合示例
 * @description 多种类型按钮组合
 * @type bip
 */

import {Button, ButtonGroup, Dropdown, Menu, MenuProps, DropdownProps} from "@tinper/next-ui";
import React, {Component} from "react";

const {Item} = Menu;

const onSelect: MenuProps['onSelect'] = (info) => {
    console.log(`${info.key} selected`);
}

const onVisibleChange: DropdownProps['onVisibleChange'] = (visible) => {
    console.log(visible);
}

class Demo extends Component {
    render() {
        const menu1 = (
            <Menu onSelect={onSelect}>
                <Item key="1">借款合同</Item>
                <Item key="2">抵/质押合同</Item>
                <Item key="3">担保合同</Item>
                <Item key="4">联保合同</Item>
                <Item key="5">合同审批</Item>
                <Item key="6">抵/质押合同跟踪</Item>
            </Menu>
        );
        return (
            <ButtonGroup>
                <Button className="no-right-radius">其他</Button>
                <Dropdown.Button
                    disabled={[false, true]}
                    overlay={menu1}
                    triggerType="icon"
                    onVisibleChange={onVisibleChange}
                    className="no-radius"
                >
					打印
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu1}
                    triggerType="icon"
                    onVisibleChange={onVisibleChange}
                    className="no-radius"
                >
					导入
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu1}
                    onVisibleChange={onVisibleChange}
                    className="no-left-radius"
                >
					导出
                </Dropdown.Button>
            </ButtonGroup>
        );
    }
}

export default Demo;
