import React from 'react';
import Transfer from '../../../../packages/wui-transfer/src';


const BaseDemo = (props: any) => {
    const mockData = [];
    for (let i = 0; i < 20; i++) {
        mockData.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            disabled: i % 3 < 1,
        });
    }
    const targetKeys = mockData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);
    return (
        <Transfer
            dataSource={mockData}
            targetKeys={targetKeys}
            {...props}
        />
    )
}

describe('transfer.cy.tsx', () => {
    it('test base demo', () => {
        cy.mount(
            <>
                <BaseDemo style={{ marginBottom: '20px' }} />
                <BaseDemo style={{ marginBottom: '20px' }} showSearch />
            </>
        );
        cy.viewport(800, 600);
        cy.compareSnapshot('baseDemo')
    });

    it('test showCheckbox', () => {
        cy.mount(
            <>
                <BaseDemo style={{ marginBottom: '20px' }} selectedKeys={['1', '4']} />
                <BaseDemo style={{ marginBottom: '20px' }} selectedKeys={['1', '4']} showCheckbox={false} />
            </>
        );
        cy.viewport(800, 600);
        cy.compareSnapshot('showCheckbox');
    });

    it('test locale', () => {
        cy.mount(<>{['zh-cn', 'en-us', 'zh-tw'].map(local => <Transfer dataSource={[]} showSearch locale={local} />)}</>);
        cy.viewport(800, 600)
        cy.compareSnapshot('locale')
    })
    
    it('test operations', () => {
        const operations = ['rightAll', 'rightOne', 'leftAll', 'leftOne'];
        cy.mount(
            <>
                <BaseDemo style={{ marginBottom: '20px' }} operations={{ 'rightAll': {text: '全部向右'}, 'rightOne': {text: '向右'}, 'leftAll': {text: '全部向左'}, 'leftOne': {text: '向左'} }} />
                {
                    operations.map(item => <BaseDemo style={{ marginBottom: '20px' }} operations={[item]} />)
                }
            </>
        )
        cy.viewport(800, 1200)
        cy.compareSnapshot('operations')
    })
})