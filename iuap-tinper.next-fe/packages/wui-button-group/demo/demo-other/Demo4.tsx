/**
 *
 * @title 下拉菜单组合示例
 * @description 多种类型按钮组合
 */

import {Button, ButtonGroup, Dropdown, Menu, Tooltip} from "@tinper/next-ui";
import React, {Component} from "react";

const {Item} = Menu;

function onSelect({key}: {key: string}) {
    console.log(`${key} selected`);
}

function onVisibleChange(visible: boolean) {
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
            <>
                <ButtonGroup>
                    <Button className="no-right-radius">其他</Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                        className="no-radius"
                    >
						打印
                    </Dropdown.Button>
                    <Button className="no-right-radius">其他</Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                        className="no-radius"
                    >
						导入
                    </Dropdown.Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        onVisibleChange={onVisibleChange}
                        className="no-left-radius"
                    >
						导出
                    </Dropdown.Button>
                </ButtonGroup>
                <br/>
                <br/>
                <ButtonGroup vertical>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                        className="no-radius"
                    >
						导入
                    </Dropdown.Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        onVisibleChange={onVisibleChange}
                        className="no-left-radius"
                    >
						导出
                    </Dropdown.Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                        className="no-radius"
                    >
						导入
                    </Dropdown.Button>
                    <Button className="no-right-radius">其他</Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                        className="no-radius"
                    >
						导入
                    </Dropdown.Button>
                </ButtonGroup>
                <br />
                <br />
                <ButtonGroup>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                        disabled
                        buttonsRender={([left, right]) => {
                            const leftT = <Tooltip title="123">{left}</Tooltip>
                            const rightT = <Tooltip title="123">{right}</Tooltip>
                            return [leftT, rightT]
                        }}
                    >
						打印
                    </Dropdown.Button>
                    <Button className="no-right-radius">其他</Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                        disabled
                        buttonsRender={([left, right]) => {
                            const leftT = <Tooltip title="123">{left}</Tooltip>
                            const rightT = <Tooltip title="123">{right}</Tooltip>
                            return [leftT, rightT]
                        }}
                    >
						打印
                    </Dropdown.Button>
                    <Tooltip title="tooltip content"><Button disabled className="no-right-radius">其他</Button></Tooltip>
                    <Button disabled className="no-right-radius">其他</Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                    >
						导入
                    </Dropdown.Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        onVisibleChange={onVisibleChange}
                        className="no-left-radius"
                    >
						导出
                    </Dropdown.Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                        disabled
                        buttonsRender={([left, right]) => {
                            const leftT = <Tooltip title="123">{left}</Tooltip>
                            const rightT = <Tooltip title="123">{right}</Tooltip>
                            return [leftT, rightT]
                        }}
                    >
						打印
                    </Dropdown.Button>
                </ButtonGroup>
            </>
        );
    }
}

export default Demo;
