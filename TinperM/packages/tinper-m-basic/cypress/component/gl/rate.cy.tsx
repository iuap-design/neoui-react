import React, { Component } from 'react';
import Rate from '../../../src/components/rate/src/index';

Cypress.config({
  viewportWidth: 300,
  viewportHeight: 400
})

describe('rate.cy.tsx', () => {
  it('defaultValue test', () => {
    document.querySelector('html').style.fontSize = '50px'
    cy.mount(<Rate  defaultValue={3}/>);
    cy.compareSnapshot('rateDefaultValue');
  });
})