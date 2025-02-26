import React from 'react';
import Dropdown from '../../../../packages/wui-dropdown/src';
import Icon from '../../../../packages/wui-icon/src';
import Menu from '../../../../packages/wui-menu/src';
import Button from '../../../../packages/wui-button/src';

const { Item } = Menu;


const menu1 = (
    <Menu>
        <Item key="1">借款合同</Item>
        <Item key="2">抵/质押合同</Item>
        <Item key="3">担保合同</Item>
        <Item key="4">联保合同</Item>
        <Item key="5">合同审批</Item>
        <Item key="6">抵/质押合同跟踪/借款合同</Item>
        <Item key="43">联保合同</Item>
        <Item key="534">合同审批</Item>
        <Item key="64">抵/质押合同跟踪</Item>
    </Menu>
);
const menu2 = (
    <Menu>
        <Item key="1"><Icon type="uf-todolist"/>借款合同</Item>
        <Item key="2"><Icon type="uf-personin"/>抵/质押合同</Item>
        <Item key="3"><Icon type="uf-ticket"/>担保合同</Item>
        <Item key="4"><Icon type='uf-listsearch'/>联保合同</Item>
        <Item key="5"><Icon type='uf-seal'/>合同审批</Item>
        <Item key="6"><Icon type='uf-bullseye'/>抵/质押合同跟踪/借款合同</Item>
    </Menu>
);

const menu3 = (
    <Menu>
        <Item key="1">借款合同</Item>
        <Item key="2">抵/质押合同</Item>
        <Item key="3">担保合同</Item>
        <Item key="4">联保合同</Item>
        <Item key="5">合同审批</Item>
        <Item key="6">抵/质押合同跟踪</Item>
        <Item key="43">联保合同</Item>
        <Item key="534">合同审批</Item>
        <Item key="64">抵/质押合同跟踪/借款合同</Item>
        <Item key="45">联保合同</Item>
        <Item key="56">合同审批</Item>
        <Item key="67">抵/质押合同跟踪</Item>
    </Menu>
)

const Demo1 = (props: any) => {
    return (
        <>
            <Dropdown
                overlay={menu1}
                {...props}
            >
                <Button style={{margin: '10px 0 10px 10px'}} colors='primary'>鼠标滑过显示</Button>
            </Dropdown>
            <Dropdown
                overlay={menu1}
                {...props}
            >
                <Button style={{margin: '10px 0 10px 10px'}}>鼠标滑过显示</Button>
            </Dropdown>
        </>
    )
}

const Demo2 = (props: any) => {
    return (
        <>
            <Dropdown.Button
                overlay={menu2}
                {...props}
                type="primary"
                style={{margin: '10px 0 10px 10px', ...props.style}}
            >
                新增
            </Dropdown.Button> 
            <Dropdown.Button
                overlay={menu2}
                {...props}
                style={{margin: '10px 0 10px 10px', ...props.style}}
            >
                新增
            </Dropdown.Button> 
        </>
    )
}

describe('dropdown.cy.tsx', {
    viewportWidth: 800,
    viewportHeight: 400
}, () => {
    it('test base demo', () => {
        cy.mount(
            <>
                <Demo1 />
                <Demo2 />
                <Demo2 triggerType="icon" />
            </>
        );
        cy.compareSnapshot('base-demo');
    })

    it('test disabled', () => {
        cy.mount(
            <>
                <Demo1 disabled />
                <Demo2 disabled />
                <Demo2 disabled={[false, true]} triggerType="icon" />
                <Demo2 disabled={[true, false]} triggerType="icon" />
            </>
        );
        cy.compareSnapshot('disabled');
    })

    it('test placement', () => {
        const placements = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'];
        placements.forEach(pl => {
            cy.mount(
                <div style={{  paddingLeft: '200px', paddingTop: '300px'}}>
                    <Demo1 placement={pl} />
                    <Demo2 placement={pl} />
                    <Demo2 placement={pl} triggerType="icon" /> 
                </div>
            )
            cy.viewport(1000, 700);
            cy.get('.wui-button').eq(0).trigger('mouseover');
            cy.wait(600);

            cy.get('.wui-dropdown-button-no-line').eq(0).trigger('mouseover');
            cy.wait(600);

            cy.get('.wui-dropdown-button-right').eq(0).trigger('mouseover');
            cy.wait(600);
            cy.compareSnapshot(`dropdown-placement-${pl}`);
        })
    })

    it('test auto placement', () => {
        cy.mount(
            <div style={{  paddingLeft: '200px', paddingTop: '350px'}}>
                <Demo1 />
                <Demo2 />
                <Dropdown.Button
                    overlay={menu3}
                    type="primary"
                    style={{margin: '10px 0 10px 10px'}}
                >
                    新增
                </Dropdown.Button> 
            </div>
        );
        cy.viewport(800, 600);
        cy.get('.wui-button').eq(0).trigger('mouseover');
        cy.wait(600);

        cy.get('.wui-dropdown-button-no-line').eq(0).trigger('mouseover');
        cy.wait(400);

        cy.get('.wui-dropdown-button-no-line').eq(2).trigger('mouseover');
        cy.wait(400);
        cy.compareSnapshot(`dropdown-auto-placement`);
    })

    it('test base demo hover', () => {
        cy.mount(
            <>
                <Demo2 />
                <Demo2 triggerType="icon" /> 
            </>
        );

        new Array(2).fill(1).forEach((_num, index) => {
            // triggerType = button
            cy.get('.wui-dropdown-button-no-line').eq(index).trigger('mouseover', {force: true});
            cy.wait(400);

            // triggerType = icon
            cy.get('.wui-dropdown-button-left').eq(index).trigger('mouseover', {force: true});
            cy.wait(400);

            cy.get('.wui-dropdown-button-right').eq(index).trigger('mouseover', {force: true});
            cy.wait(400);
        })

        cy.compareSnapshot(`dropdown-hover`);
    })

    it('test overlayMaxHeight', () => {
        cy.mount(
            <div style={{  paddingLeft: '100px', paddingTop: '300px'}}>
                <Dropdown
                    overlay={menu3}
                    overlayMaxHeight={true}
                    placement="topLeft"
                >
                    <Button style={{ marginRight: '10px' }} colors='primary'>默认设置向上最大高度</Button>
                </Dropdown>
                <Dropdown
                    overlay={menu3}
                    overlayMaxHeight={true}
                >
                    <Button style={{ marginRight: '10px' }} colors='primary'>默认设置向下最大高度</Button>
                </Dropdown>
                <Dropdown
                    overlay={menu1}
                    overlayMaxHeight={150}
                >
                    <Button colors='primary'>设置为数字</Button>
                </Dropdown>
            </div>
        );
        cy.viewport(800, 500);
        cy.get('.wui-button').eq(0).trigger('mouseover', {force: true});
        cy.wait(400);
        cy.get('.wui-button').eq(1).trigger('mouseover', {force: true});
        cy.wait(400);
        cy.get('.wui-button').eq(2).trigger('mouseover', {force: true});
        cy.wait(400);
        cy.compareSnapshot(`overlayMaxHeight`);
    })
})