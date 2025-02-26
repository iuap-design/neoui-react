import React, { Component } from 'react';
import Badge from '../../../src/components/badge/src/index';

Cypress.config({
  viewportWidth: 600,
  viewportHeight: 400
})

describe('badge.cy.tsx', () => {
  it('xxx test', () => {
    document.querySelector('html').style.fontSize = '50px'
    cy.mount(
      <Badge fieldid='badge11' content={Badge.dot}>
        <div className='box' style={{ width: '40px', height: '40px', background: 'grey' }}/>
      </Badge>
    );
    cy.compareSnapshot('badgeDemo1');
  });
})