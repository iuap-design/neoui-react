import React, { useState } from 'react';
import Rate from '../../../../packages/wui-rate/src';

Cypress.config({
  viewportWidth: 400,
  viewportHeight: 200,
}) 

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ToolTipRate: React.FC = () => {
    const [value, setValue] = useState(4);

    return (
        <span style={{display:'inline-block', marginTop: 50}}>
            <Rate tooltips={desc} onChange={setValue} value={value} />
            {value ? <span>{desc[value - 1]}</span> : ''}
        </span>
    );
};

describe('Rate.cy.tsx-default', () => {
  it('should mount', () => {

    cy.mount((<Rate value={3} />));
    cy.wait(300);
    cy.compareSnapshot('default');

  });
})

describe('Rate.cy.tsx-style', () => {
  it('should mount', () => {

    cy.mount((<Rate style={{ color: 'red' }} defaultValue={3} />));
    cy.compareSnapshot(`colors-style-red`);

  });
})

describe('Rate.cy.tsx-allowhalf', () => {
  it('should mount', () => {

    cy.mount((<>
      <Rate allowHalf={true} value={3.5} />
      <br /><br />
      <Rate value={4.35} />
    </>));
    cy.compareSnapshot(`allowhalf`);

  });
})

describe('Rate.cy.tsx-autoFocus', () => {
  it('should mount autoFocus', () => {

    cy.mount((<>
      <Rate value={3} />
      <br /><br />
      <Rate autoFocus value={3} />
    </>));
    cy.get('ul:first > li:first > div').trigger('mousemove');
    cy.compareSnapshot(`autoFocus-and-mouseover`);

  });
})

describe('Rate.cy.tsx-character', () => {
  it('should mount', () => {

    cy.mount((<>
      <Rate character='A' defaultValue={3} />
      <br /><br />
      <Rate character='正' defaultValue={3} />
    </>));
    cy.compareSnapshot('character-A-正');

  });
})

describe('Rate.cy.tsx-disabled', () => {
  it('should mount', () => {

    cy.mount((<Rate defaultValue={4} disabled />));
    cy.compareSnapshot('disabled');

  });
})

describe('Rate.cy.tsx-tooltips', () => {
  it('should mount', () => {

    cy.mount((<ToolTipRate />));
    cy.get('ul > li').eq(3).trigger('mouseover');
    cy.wait(500);
    cy.compareSnapshot('tooltips');

  });
})