/**index.tsx */
import React from 'react';
import List from '../src/index';
import Card from '../../wui-card/src/index';
import Avatar from '../../wui-avatar/src/index';
import { mount } from '../../../next-ui-library/test/common/mount'
import { attrsTest } from "../../../next-ui-library/test/common/index";
import { prefix } from '../../wui-core/src/updatePrefix';
const Item = List.Item;
const Meta = Item.Meta;
const prefixList = `${prefix}-list`;
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
const data2 = new Array(25).fill(0).map((num, index) => {
    return { title: 'Title ' + index }
});

describe('List Test basic attr', () => {
    attrsTest({
        title: 'component: List, <test prop:: bordered>',
        Component: List,
        attrs: {
            bordered: true
        },
        testAttr: {},
        selector: `.${prefixList}`,
        classnames: [`${prefixList}-bordered`],
    });
    attrsTest({
        title: 'component: List, <test prop:: size>',
        Component: List,
        attrs: {
            size: 'large'
        },
        testAttr: {},
        selector: `.${prefixList}`,
        classnames: [`${prefixList}-lg`],
    });
    attrsTest({
        title: 'component: List, <test prop:: size>',
        Component: List,
        attrs: {
            size: 'small'
        },
        testAttr: {},
        selector: `.${prefixList}`,
        classnames: [`${prefixList}-sm`],
    });
    attrsTest({
        title: 'component: List, <test prop:: size>',
        Component: List,
        attrs: {},
        testAttr: {
            split: false
        },
        selector: `.${prefixList}`,
        classnames: [`${prefixList}-split`],
    });
});

describe('List with data', () => {
    it('show empty when on dataSuorce, <test prop:: dataSource>, <test prop:: showIcon>', () => {
        const wrapper = mount(<List />); //未传dataSource
        expect(wrapper.find(`img.${prefix}-empty-no-data`).exists()).toBe(true);
        wrapper.setProps({ dataSource: [] }) //dataSource为空数组
        expect(wrapper.find(`img.${prefix}-empty-no-data`).exists()).toBe(true);
        wrapper.setProps({ dataSource: ['11111', '22222'] })
        expect(wrapper.find(`img.${prefix}-empty-no-data`).exists()).toBe(false);
        expect(wrapper.find(`ul.${prefixList}-items`).exists()).toBe(true);

    });
    it('test grid, <test prop:: loading>', () => {
        const wrapper = mount(<List loading dataSource={data} renderItem={item => (<Item> {item} </Item>)} />);
        expect(wrapper.find(`.${prefixList}`).exists(`.${prefix}-spin-backdrop`)).toBe(true)
        wrapper.setProps({loading: false})
        wrapper.update()
        expect(wrapper.find(`.${prefixList}`).exists(`.${prefix}-spin-backdrop`)).toBe(false)
    });
    it('test grid, <test prop:: grid>', () => {
        const wrapper = mount(<List dataSource={data} grid={{ column: 5, gutter: 16, xs: 1, sm: 2, md: 4, lg: 6 }}
            renderItem={item => (<Item> {item} </Item>)}
        />);
        expect(wrapper.find(`div.${prefix}-row`).at(0).props().style).toEqual({"margin-left": "-8px", "margin-right": "-8px"})
        expect(wrapper.find(`div.${prefix}-row > div`).at(0).props().style).toEqual({"max-width": "20%", "width": "20%"})
        expect(wrapper.find(`div.${prefix}-col`).at(0).props().style).toEqual({"flex": "1 1 auto", "padding-left": "8px", "padding-right": "8px"})
    });
    it('render dataSource, <test prop:: renderItem>, <test prop:: itemLayout>, <test prop:: extra>, <test prop:: Meta>', () => {
        const wrapper = mount(<List dataSource={data}
            renderItem={item => (
                <Item
                    actions={[
                        <a key="list-loadmore-edit">edit</a>,
                        <a key="list-loadmore-more">more</a>,
                    ]}
                    extra={
                        <div>extra content</div>
                    }
                >
                    <Meta
                        avatar={
                            <Avatar
                                src="http://git.yonyou.com/uploads/-/system/user/avatar/10501/avatar.png?width=23" />
                        }
                        title={<a href="https://yondesign.yonyou.com/">{item.title}</a>}
                        description="Here is description."
                    />
                    {item}
                </Item>
            )}
        />);
        let items = wrapper.find(`ul.${prefixList}-items`).find(`li.${prefixList}-item`);
        expect(items).toHaveLength(5);
        items.forEach((li, index) => {
            const meta = li.find(`.${prefixList}-item-meta`);
            expect(meta.find(`.${prefixList}-item-meta-avatar img`).instance().src).toBe("http://git.yonyou.com/uploads/-/system/user/avatar/10501/avatar.png?width=23");
            expect(meta.find(`.${prefixList}-item-meta-title a`).instance().href).toBe("https://yondesign.yonyou.com/")
            expect(meta.find(`.${prefixList}-item-meta-description`).text()).toBe("Here is description.")
            expect(li.find('div').at(4).html()).toBe("extra content")
            expect(li.find(`.${prefixList}-item-action`).text()).toBe("editmore")
            expect(li.text()).toContain(data[index])
        });
        wrapper.setProps({ itemLayout: 'vertical' })
        expect(wrapper.find(`.${prefixList}`).hasClass(`${prefixList}-vertical`)).toBe(true)
    });
    ['title', item => item.title].forEach((v) => {
        it('render dataSource, <test prop:: rowKey>', () => {
            const wrapper = mount(<List dataSource={data2}
                renderItem={item => (
                    <Item>
                        <Card title={item.title}>Card content</Card>
                    </Item>
                )}
                rowKey={v}
            />);
            let items = wrapper.find(`ul.${prefixList}-items`);
            expect(items.find(`.${prefix}-card`)).toHaveLength(25);
            items.find(`.${prefix}-card`).forEach((node, index) => {
                expect(node.find(`.${prefix}-card-head-title`).text()).toBe(data2[index].title)
            });
        })
    });
    it('render dataSource, <test prop:: header>, <test prop:: footer>', () => {
        const wrapper = mount(<List header={<div>coustom Header</div>} footer={<div>soustom Footer</div>} />);
        expect(wrapper.find(`.${prefixList} > .${prefixList}-header`).instance().innerHTML).toBe("<div>coustom Header</div>")
        expect(wrapper.find(`.${prefixList} > .${prefixList}-footer`).instance().innerHTML).toBe("<div>soustom Footer</div>")
    });
    it('render dataSource, <test prop:: pagination>', () => {
        const onChange = jest.fn()
        const wrapper = mount(<List dataSource={data2} pagination />);
        expect(wrapper.find(`.${prefixList}`).exists(`.${prefixList}-pagination`)).toBe(true)
        wrapper.setProps({ pagination: { onChange } });
        wrapper.find(`.${prefix}-pagination-next a`).at(0).simulate('click') //下一页
        expect(onChange).toHaveBeenCalled()
        expect(wrapper.find('li.active').text()).toBe('2')
    });
});
