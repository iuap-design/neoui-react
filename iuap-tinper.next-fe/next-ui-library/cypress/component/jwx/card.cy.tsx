import React from 'react';
import Card from '../../../../packages/wui-card/src';


const Demo = (props: any) => {
    return (
        <Card {...props} title="card title" extra={<a>More</a>} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    )
}

describe('card.cy.tsx', {
    viewportWidth: 500,
    viewportHeight: 300
}, () => {
    it('test bordered', () => {
        cy.mount(<Demo bordered={false} />)
        cy.compareSnapshot('bordered')
    });

    it('test size', () => {
        cy.mount(<Demo />)
        cy.compareSnapshot('size-default');

        cy.mount(<Demo size="small" />)
        cy.compareSnapshot('size-small');
    });

    it('test loading', () => {
        cy.mount(<Demo loading/>)
        cy.compareSnapshot('loading');
    });

    it('test type inner', () => {
        cy.mount(<Demo type="inner" />)
        cy.compareSnapshot('inner');
    });

    it('test card.grid <hoverable>', () => {
        const gridStyle = {
            width: "25%",
        };
        cy.mount(
            <Card title="Card Title">
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid hoverable={true} style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
        );
        cy.viewport(1000, 400);
        cy.compareSnapshot('card.grid');
        cy.get('.wui-card-grid-hoverable').eq(0).realHover();
        cy.compareWithOptions('card.grid-hoverable', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 1200, height: 500 }
        })
    })
})