import React, { Component } from 'react';
import Icon from '../../../src/components/icon/src/index';
import DefaultDiagramFill from '@tinper/m-icons/lib/cjs/DefaultDiagramFill'


Cypress.config({
  viewportWidth: 300,
  viewportHeight: 400
})

describe('icon.cy.tsx', () => {
  it('xxx test', () => {
    document.querySelector('html').style.fontSize = '50px'
    cy.mount(
      <>
        <Icon type='arcicon-scanning' />
        <Icon type='archeart' />
      </>
    );
        
    cy.compareSnapshot('iconDemo');
  });
  it('xxx test', () => {
    document.querySelector('html').style.fontSize = '50px'
    cy.mount(
      <>
        <DefaultDiagramFill />
      </>
    );
        
    cy.compareSnapshot('iconDemo1');
  });
})