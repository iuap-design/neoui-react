/**
 *
 * @title 下拉菜单组合示例
 * @description 多种类型按钮组合
 */

import {Button, Space, Dropdown, Menu} from "@tinper/next-ui";
import React, {Component} from "react";

const {Item} = Menu;
const {Compact} = Space;

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
            <div tinper-next-role='container' style={{position: 'relative', zIndex: 1}}>
                <Compact>
                    <Button type='primary'>增加</Button>
                    <Button>其他</Button>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                    >
						打印
                    </Dropdown.Button>
                    <Button>其他</Button>
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
                    >
						导出
                    </Dropdown.Button>
                </Compact>
                <br/>
                <br/>
                <Compact>
                    <Dropdown.Button
                        overlay={menu1}
                        transitionName="slide-up"
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                    >
						打印
                    </Dropdown.Button>
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
                        triggerType="icon"
                        onVisibleChange={onVisibleChange}
                    >
						导出
                    </Dropdown.Button>
                </Compact>
                <br/>
                <br/>
                <Compact direction='vertical'>
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
                </Compact>
                <br/>
                <br/>
                <Compact direction='vertical'>
                    <Button>新增</Button>
                    <Button>确认</Button>
                    <Button>其他</Button>
                </Compact>
            </div>
        );
    }
}

export default Demo;
