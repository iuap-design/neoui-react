/**
 *
 * @title 其他
 * @description overlayClassName，overlayStyle，minOverlayWidthMatchTrigger, fieldid 属性使用场景
 * @type bip
 */

import {Button, Dropdown, Menu} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Item} = Menu;

class Demo1 extends Component {

    render() {

        const menu1 = (
            <Menu>
                <Item key="1">借款合同</Item>
                <Item key="2">抵/质押合同</Item>
                <Item key="3">担保合同</Item>
                <Item key="4">联保合同</Item>
                <Item key="5">合同审批</Item>
                <Item key="6">抵/质押合同跟踪</Item>
                <Item key="43">联保合同</Item>
                <Item key="534">合同审批</Item>
                <Item key="64">抵/质押合同跟踪</Item>
                <Item key="45">联保合同</Item>
                <Item key="56">合同审批</Item>
                <Item key="67">抵/质押合同跟踪</Item>
            </Menu>
        );
        const menu2 = (
            <Menu fieldid="fieldid-menu">
                <Item key="1">借款合同</Item>
                <Item key="2">抵/质押合同</Item>
                <Item key="3">担保合同</Item>
                <Item key="4">联保合同</Item>
                <Item key="5">合同审批</Item>
                <Item key="6">抵/质押合同跟踪</Item>
            </Menu>
        );
        return (
            <div className="demoPadding">
                <Dropdown
                    overlay={menu1}
                    trigger="click"
                    minOverlayWidthMatchTrigger={true}
                >
                    <Button colors='primary' style={{ display: 'block' }} id="dropdown-btn">这是一个很长的按钮minOverlayWidthMatchTrigger</Button>
                </Dropdown>
                <Dropdown
                    overlay={menu1}
                    trigger="click"
                    overlayClassName="overlayClassName"
                    overlayStyle={{paddingBottom: '10px'}}
                >
                    <Button fieldid="dropdown" colors='primary'>下拉样式自定义</Button>
                </Dropdown>
                <Dropdown.Button
                    fieldid="dropdown1"
                    overlay={menu2}
                    triggerType="icon"
                    type="primary"
                >
					新增
                </Dropdown.Button>
                <Dropdown.Button
                    fieldid="dropdown2"
                    overlay={menu2}
                    type="primary"
                >
					新增
                </Dropdown.Button>
            </div>
        )
    }
}

export default Demo1;
