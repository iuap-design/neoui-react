import React from 'react';
import List from '../../../../packages/wui-list/src';
import Avatar from '../../../../packages/wui-avatar/src';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const BaseDemo = (porps: any) => {
    return (
        <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            dataSource={data}
            renderItem={item =>(<List.Item>{item}</List.Item>)}
            {...porps}
        />
    )
}

const Demo2 = (props: any) => {
    return (
        <List {...props} />
    )
}

describe('list.cy.tsx', () => {
    it('test size & bordered & split', () => {
        const siseArr = ['default', 'large', 'small'];
        cy.mount(
            <>
                {siseArr.map(size =>
                    <div style={{ margin: '40px' }}>
                        <BaseDemo size={size} />
                        <BaseDemo bordered={false} size={size} />
                        <BaseDemo split={false} size={size} />
                    </div>
                )}
            </>
        );
        cy.viewport(800, 1200)
        cy.compareSnapshot("size-bordered-split");
    });
    it('test loading', () => {
        cy.mount(<BaseDemo loading />)
        cy.viewport(800, 400)
        cy.compareSnapshot("loading");
    })

    it('test itemLayout', () => {

        const data = [
            {
                title: 'Title 1',
            },
            {
                title: 'Title 2',
            },
            {
                title: 'Title 3',
            },
        ];

        const layoutArr = ['vertical', 'horizontal']

        cy.mount(
            <>
                {
                    layoutArr.map(layout => (
                        <Demo2 style={{ marginBottom: '20px'}} dataSource={data} itemLayout={layout} renderItem={(item: any) => (
                            <List.Item
                                actions={[
                                    <a key="list-loadmore-edit">edit</a>,
                                    <a key="list-loadmore-more">more</a>,
                                ]}
                                extra={<a>extra</a>}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar />}
                                    title={<a href="https://yondesign.yonyou.com/">{item.title}</a>}
                                    description="A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size."
                                />
                                <List.Item.Meta
                                    avatar={<Avatar />}
                                    title={<a href="https://yondesign.yonyou.com/">{item.title}-2</a>}
                                    description="A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size."
                                />
                            </List.Item>
                        )} />
                    ))
                }
            </>
        );

        cy.viewport(1000, 800);
        cy.compareSnapshot("itemLayout");
    });

    it('test list.pagination position', () => {
        const positionArr = ['top', 'bottom', 'both'];
        cy.mount(
            <>
                {
                    positionArr.map(pot => (<BaseDemo style={{ marginBottom: '20px'}} pagination={{position: pot}} />))
                }
            </>
        )
        cy.viewport(800, 1000);
        cy.compareSnapshot("pagination-position");
    })
})
