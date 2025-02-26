/** Grid.tsx */
import React from 'react';
import {prefix} from '../../wui-core/src/updatePrefix'
import Card from '../src/index';
import {mount, render, shallow} from '../../../next-ui-library/test/common/mount'

const prefixCard = `${prefix}-card`;

describe('component: Grid', () => {
    it('Grid setting style test, <test prop:: style>', () => {
        const gridStyle = {
            width: "25%",
            textAlign: "center",
        };
        let grids = mount(
            <Card title="Card Title">
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
        );
        expect(grids.find(`.${prefixCard}-grid`).props().style.width).toBe('25%');
    });
    it('Grid should have this class, <test prop:: hoverable>', () => {
        const gridStyle = {
            width: "25%",
            textAlign: "center",
        };
        let grids = mount(
            <Card title="Card Title">
                <Card.Grid hoverable={true} style={gridStyle}>Content</Card.Grid>
            </Card>
        );
        expect(grids.find(`.${prefixCard}-grid`).hasClass(`${prefixCard}-grid-hoverable`)).toEqual(true);
    });
    it('Grid should be className name-of-card-grid, <test prop:: className>', () => {
        let grid = mount(<Card.Grid className="name-of-card-grid"/>);
        expect(grid.hasClass('name-of-card-grid')).toEqual(true);
    });
})
