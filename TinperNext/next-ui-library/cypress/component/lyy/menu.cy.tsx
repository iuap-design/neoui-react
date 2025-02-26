import React from 'react';
import Menu from '../../../../packages/wui-menu/src';
import Icon from '../../../../packages/wui-icon/src';
const { SubMenu, ItemGroup } = Menu;

const BaseDemo = (props: any) => {
    const { popupOffset, defaultOpenKeys } = props;
    return (
        <Menu {...props} defaultOpenKeys={defaultOpenKeys || ['demosub1']}>
            <SubMenu popupOffset={popupOffset} icon={<Icon type="uf-search-light-2"/>} key="demosub1" title={<span><span>组织 1</span></span>}>
                <ItemGroup title="组 1">
                    <Menu.Item icon={<Icon type="uf-9square-2"/>} key="1">选项 1</Menu.Item>
                    <Menu.Item key="2">选项 2</Menu.Item>
                </ItemGroup>
                <ItemGroup title="组 2">
                    <Menu.Item key="3" disabled>选项 3</Menu.Item>
                    <Menu.Item key="4">选项 4</Menu.Item>
                </ItemGroup>
            </SubMenu>
            <SubMenu disabled icon={<Icon type="uf-4square-3"/>} key="demosub2" title={<span><span>组织 2</span></span>}>
                <Menu.Item key="5">选项 5</Menu.Item>
                <Menu.Item key="6">选项 6</Menu.Item>
                <SubMenu key="demosub3" title="子项">
                    <Menu.Item key="7">选项 7</Menu.Item>
                    <Menu.Item key="8">选项 8</Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu key="demosub4" title={<span><span>组织 3</span></span>}>
                <Menu.Item key="9">选项 9</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="10">选项 10</Menu.Item>
                <Menu.Divider dashed />
                <Menu.Item key="11">选项 11</Menu.Item>
                <Menu.Item key="12">选项 12</Menu.Item>
            </SubMenu>
        </Menu>
    )
};

describe('menu.cy.tsx', () => {
    it('test <theme> <mode> <disabled>', () => {
        const themeArr = ['dark', 'light'];
        const modeArr = ['horizontal', 'inline', 'vertical'];
        cy.mount(
            <div>
                {
                    modeArr.map(mode => {
                        return (
                            <div>
                                {themeArr.map(theme => (
                                    <BaseDemo style={{width: mode === 'horizontal' ? 500: 240, display: 'inline-block', margin: '0 300px 300px 0'}} mode={mode} theme={theme} />
                                ))}
                            </div>
                        )
                        
                    })
                }
            </div>
        )
        cy.compareSnapshot('theme-mode')
    })

    it('test vertical mode`s <position>', () => {
        const positionArr = ['leftTop', 'rightTop'];
        cy.mount(
            <div style={{overflow: 'hidden'}}>
                {
                    positionArr.map(position => (
                        <BaseDemo mode="vertical" position={position} defaultOpenKeys={['demosub2', 'demosub3']} style={{ width: '240px', float: position.indexOf('right') ? 'left' : 'right'}} />
                    ))
                }
            </div>
        )
        cy.viewport(1000, 400);
        cy.wait(1000)
        cy.compareSnapshot('vertical-position')
    })

    it('test inline mode`s inlineCollapsed', () => {
        const themeArr = ['dark', 'light'];
        cy.mount(
            <>
                {themeArr.map(theme => <BaseDemo style={{ marginBottom: '200px'}} mode="inline" theme={theme} inlineCollapsed />)}
            </>
        )

        cy.viewport(800, 800);
        cy.compareSnapshot('inline-inlineCollapsed')
    })

    it('test submenu popupOffset', () => {
        // popupOffset 属性inline时无效
        const modeArr = ['horizontal', 'vertical'];
        cy.mount(
            <div>
                {
                    modeArr.map(mode => {
                        return (
                            <BaseDemo style={{width: mode === 'horizontal' ? 500: 240, display: 'inline-block'}} popupOffset={[20, 10]} mode={mode} />
                        )
                        
                    })
                }
            </div>
        )
        cy.compareSnapshot('submenu-popupOffset')
    })

    it('test menu.divider normal & dashed', () => {
        cy.mount(<BaseDemo mode="horizontal" defaultOpenKeys={['demosub4']} />);
        cy.viewport(1000, 400);
        cy.wait(1000)
        cy.compareSnapshot('menu.divider')
    })
})