/** Breadcrumb.tsx */
import { mount, shallow } from '../../../next-ui-library/test/common/mount'
import React from 'react';
import { prefix } from '../../wui-core/src/updatePrefix';
import Breadcrumb from '../src/index';
import Menu from '../../wui-menu/src/index'
const { Item } = Menu;
describe('Breadcrumb test', () => {
    it('Breadcrumb should be exist', () => {
        let breadcrumb = shallow(
            <Breadcrumb><Breadcrumb.Item>Home</Breadcrumb.Item><Breadcrumb.Item>Library</Breadcrumb.Item><Breadcrumb.Item>Data</Breadcrumb.Item></Breadcrumb>);
        expect(breadcrumb.hasClass(`${prefix}-breadcrumb`)).toEqual(true);
    })
    it('Breadcrumb item should be exist', () => {
        let breadcrumb = mount(
            <Breadcrumb><Breadcrumb.Item>Home</Breadcrumb.Item><Breadcrumb.Item>Library</Breadcrumb.Item><Breadcrumb.Item>Data</Breadcrumb.Item></Breadcrumb>);
        expect(breadcrumb.find("li").length).toEqual(3);
    })
    it('component: Breadcrumb, <test prop:: separator>', () => {
        let breadcrumb = mount(
            <Breadcrumb><Breadcrumb.Item>Home</Breadcrumb.Item><Breadcrumb.Item>Library</Breadcrumb.Item><Breadcrumb.Item>Data</Breadcrumb.Item></Breadcrumb>);
        expect(breadcrumb.find(`.${prefix}-breadcrumb-separator`).at(0).text()).toEqual("/")
        breadcrumb.setProps({ separator: '(●ˇ∀ˇ●)' })
        expect(breadcrumb.find(`.${prefix}-breadcrumb-separator`).at(0).text()).toEqual("(●ˇ∀ˇ●)")
    })
    it('component: Breadcrumb, <test prop:: className>', () => {
        let breadcrumb = mount(
            <Breadcrumb><Breadcrumb.Item>Home</Breadcrumb.Item><Breadcrumb.Item>Library</Breadcrumb.Item><Breadcrumb.Item>Data</Breadcrumb.Item></Breadcrumb>);
        breadcrumb.setProps({ className: 'my-class' })
        expect(breadcrumb.find(`.${prefix}-breadcrumb`).at(0).hasClass('my-class')).toEqual(true)
    })
    it('component: Breadcrumb, <test prop:: onClick>', () => {
        const onClick = jest.fn();
        let breadcrumb = mount(
            <Breadcrumb onClick={e => onClick(e.target)}><Breadcrumb.Item>Home</Breadcrumb.Item><Breadcrumb.Item>Library</Breadcrumb.Item><Breadcrumb.Item>Data</Breadcrumb.Item></Breadcrumb>);
        breadcrumb.setProps({ className: 'my-class' })
        breadcrumb.find(`li`).at(1).simulate('click')
        expect(onClick).toHaveBeenCalledWith(breadcrumb.find(`li`).at(1).instance())
    })
    it('component: Breadcrumb, <test prop:: onClick>', () => {
        const onClick = jest.fn();
        let breadcrumb = mount(
            <Breadcrumb onClick={e => onClick(e.target)}><Breadcrumb.Item>Home</Breadcrumb.Item><Breadcrumb.Item>Library</Breadcrumb.Item><Breadcrumb.Item>Data</Breadcrumb.Item></Breadcrumb>);
        breadcrumb.setProps({ className: 'my-class' })
        breadcrumb.find(`li`).at(1).simulate('click')
        expect(onClick).toHaveBeenCalledWith(breadcrumb.find(`li`).at(1).instance())
    })
    it('component: Breadcrumb, <test prop:: fillSpace>', () => {
        const items = ['Home', 'Home_1', 'Home_2', 'Home_3', 'Library', 'Library_1', 'Library_2', 'Library_3', 'Data', 'Data_1', 'Data_2', 'Data_3',]
        let breadcrumb = mount(
            <div style={{width: 300, overflow: 'visible'}}>
                <Breadcrumb fillSpace>
                    {items.map((v, i) => <Breadcrumb.Item key={i}>{v}</Breadcrumb.Item>)}
                </Breadcrumb>

            </div>);
        expect(breadcrumb.find('ol').at(0).hasClass(`${prefix}-breadcrumb`)).toEqual(true);
        // expect(breadcrumb.find('li').at(0).hasClass(`${prefix}-breadcrumb-overflow`)).toEqual(true);
        breadcrumb.unmount();
    })
    it('component: Breadcrumb, <test prop:: fillSpace number>', () => {
        const items = ['Home', 'Home_1', 'Home_2', 'Home_3', 'Library', 'Library_1', 'Library_2', 'Library_3', 'Data', 'Data_1', 'Data_2', 'Data_3',];

        const content = document.createElement('div');
        document.body.appendChild(content);

        let breadcrumb = mount(
            <Breadcrumb fillSpace={300}>
                    {items.map((v, i) => <Breadcrumb.Item key={i}>{v}</Breadcrumb.Item>)}
            </Breadcrumb>
            , {attachTo: content});
        
        let boundRect = {width: 310, height: 300}
        jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(400);
        jest.spyOn(document.querySelector(`.${prefix}-breadcrumb`), 'getBoundingClientRect').mockReturnValue(boundRect)

        expect(content.offsetWidth).toBe(400)
        expect(document.querySelector(`.${prefix}-breadcrumb`).getBoundingClientRect()).toBe(boundRect)
        // breadcrumb.find('Breadcrumb').instance().getAllChildNodesWidth(0, false);
        // breadcrumb.setProps({fillSpace: 310, children: 'breadcrumb'})

        // expect(breadcrumb.props().style.width).toBe(310)

        // console.log(breadcrumb.find('Breadcrumb').instance())
    })
})

describe('Breadcrumb.Item test', () => {
    it('component: Breadcrumb.Item, <test prop:: active>', () => {
        let breadcrumb = mount(
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Library</Breadcrumb.Item>
                <Breadcrumb.Item>Data</Breadcrumb.Item>
            </Breadcrumb>
        );
        expect(breadcrumb.find(`li`).at(1).hasClass(`${prefix}-breadcrumb-active`)).toEqual(true);
    })
    it('component: Breadcrumb.Item, <test prop:: href>', () => {
        let breadcrumb = mount(
            <Breadcrumb>
                <Breadcrumb.Item active href="https://yondesign.yonyou.com/homepage/#/">Home</Breadcrumb.Item>
            </Breadcrumb>
        );
        let item = breadcrumb.find(`li`).at(0).childAt(0).instance()
        expect(item.tagName).toEqual("A");
        expect(item.href).toEqual("https://yondesign.yonyou.com/homepage/#/");
        // // window.location.href should change after click 
        // breadcrumb.find(`li a`).at(0).simulate('click');
        // expect(window.location.href).toEqual("https://yondesign.yonyou.com/homepage/#/");
    })
    it('component: Breadcrumb.Item, <test prop:: title>', () => {
        let breadcrumb = mount(
            <Breadcrumb>
                <Breadcrumb.Item title='my-title'>Home</Breadcrumb.Item>
            </Breadcrumb>
        );
        expect(breadcrumb.find(`li span`).at(0).instance().title).toEqual("my-title");
    })
    it('component: Breadcrumb.Item, <test prop:: className>', () => {
        let breadcrumb = mount(
            <Breadcrumb>
                <Breadcrumb.Item className='my-class'>Home</Breadcrumb.Item>
            </Breadcrumb>
        );
        expect(breadcrumb.find(`li`).at(0).hasClass('my-class')).toEqual(true)
    })
    it('component: Breadcrumb.Item, <test prop:: separator>', () => {
        let breadcrumb = mount(
            <Breadcrumb>
                <Breadcrumb.Item separator='∀'>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Library</Breadcrumb.Item>
                <Breadcrumb.Item>Data</Breadcrumb.Item>
            </Breadcrumb>
        );
        //默认separator是'/', Breadcrumb.Item单独设置的separator优先级更高
        expect(breadcrumb.find(`.${prefix}-breadcrumb-separator`).at(0).text()).toEqual("∀")
        expect(breadcrumb.find(`.${prefix}-breadcrumb-separator`).at(1).text()).toEqual("/")
        expect(breadcrumb.find(`.${prefix}-breadcrumb-separator`).at(2).text()).toEqual("/")
        breadcrumb.setProps({ separator: '▽' })
        expect(breadcrumb.find(`.${prefix}-breadcrumb-separator`).at(0).text()).toEqual("∀")
        expect(breadcrumb.find(`.${prefix}-breadcrumb-separator`).at(1).text()).toEqual("▽")
        expect(breadcrumb.find(`.${prefix}-breadcrumb-separator`).at(2).text()).toEqual("▽")
    })
    it('component: Breadcrumb, <test prop:: onClick>', () => {
        const onClick = jest.fn();
        let breadcrumb = mount(
            <Breadcrumb >
                <Breadcrumb.Item onClick={e => onClick(e.target)}>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Library</Breadcrumb.Item>
                <Breadcrumb.Item>Data</Breadcrumb.Item>
            </Breadcrumb>
        );
        breadcrumb.find(`li span`).at(0).simulate('click')
        expect(onClick).toHaveBeenCalledWith(breadcrumb.find(`li span`).at(0).instance())
    })
    it('component: Breadcrumb, <test prop:: overlay>', () => {
        const menu = (<Menu>
            <Item key="1">借款合同</Item>
            <Item key="2">抵/质押合同</Item>
            <Item key="3">担保合同</Item>
        </Menu>);
        let breadcrumb = mount(
            <Breadcrumb >
                <Breadcrumb.Item overlay={menu}>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Library</Breadcrumb.Item>
                <Breadcrumb.Item>Data</Breadcrumb.Item>
            </Breadcrumb>
        );
        expect(breadcrumb.exists(`.${prefix}-dropdown`)).toBe(false)
        // breadcrumb.find(`li span`).at(0).simulate('mouseEnter')
        // expect(breadcrumb.exists(`.${prefix}-dropdown`)).toBe(true)
        breadcrumb.find(`.${prefix}-dropdown li`).forEach((node, index) => {
            expect(node.text()).toBe(['借款合同', '抵/质押合同', '担保合同'][index])
        })
    })
    it('component: Breadcrumb, <test prop:: menu>', () => {
        const menu = (<Menu>
            <Item key="1">借款合同</Item>
            <Item key="2">抵/质押合同</Item>
            <Item key="3">担保合同</Item>
        </Menu>);
        let breadcrumb = mount(
            <Breadcrumb >
                <Breadcrumb.Item menu={menu}>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Library</Breadcrumb.Item>
                <Breadcrumb.Item>Data</Breadcrumb.Item>
            </Breadcrumb>
        );
        expect(breadcrumb.exists(`.${prefix}-dropdown`)).toBe(false)
        // breadcrumb.find(`li span`).at(0).simulate('mouseEnter')
        // expect(breadcrumb.exists(`.${prefix}-dropdown`)).toBe(true)
        breadcrumb.find(`.${prefix}-dropdown li`).forEach((node, index) => {
            expect(node.text()).toBe(['借款合同', '抵/质押合同', '担保合同'][index])
        })
    })
})
