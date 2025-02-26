import React, { Component } from 'react';
import Input from '../../../src/components/input/src/index';

Cypress.config({
  viewportWidth: 300,
  viewportHeight: 400
})

describe('input.cy.tsx', () => {
  it('value test', () => {
    document.querySelector('html').style.fontSize = '50px'
    cy.mount(<Input value='value' style={{ border: '0.02rem solid #979797' }} />);
    cy.compareSnapshot('inputValue');
  });
})