import React from 'react';
import Switch from '../../../../packages/wui-switch/src';
import type {SwitchColors, SwitchSize} from '../../../../packages/wui-switch/src/iSwitch';

Cypress.config({
  viewportWidth: 300,
  viewportHeight: 300,
}) 

const colorsArr:Array<SwitchColors> = ['primary', 'success', 'info', 'warning', 'danger', 'dark', 'default'];
const sizeArr:Array<SwitchSize> = ['default', 'small'];
const style = {marginLeft: 10}

describe('switch.cy.tsx-default', () => {
  it('should mount', () => {

    cy.mount((<><Switch /><br /><br /><Switch /></>));
    cy.get('button').eq(1).click();
    cy.compareSnapshot('default');

  });
})

describe('switch.cy.tsx-colors', () => {
  it('should mount colors', () => {

    cy.mount((<div>
      {
        colorsArr.map(item => {
          return (<Switch style={style} checked colors={item} />);
        })
      }
    </div>));
    cy.compareSnapshot('colors');

  });
})

describe('switch.cy.tsx-size', () => {
  it('should mount size', () => {

    cy.mount((<div>
      {
        sizeArr.map(item => {
          return (<Switch style={style} checked size={item} />);
        })
      }
    </div>));
    cy.compareSnapshot('size');

  });
})

describe('switch.cy.tsx-checked', () => {
  it('should mount', () => {

    cy.mount((<div>
      <Switch checked /><br /><br />
      <Switch autoFocus /><br /><br />
      <Switch checkedChildren='on' checked /><br /><br />
      <Switch unCheckedChildren='off' /><br /><br />
      <Switch disabled checked /><br /><br />
      <Switch disabled /><br /><br />    
    </div>));
      cy.compareSnapshot(`checked`);
  });
})

describe('switch.cy.tsx-key', () => {
  it('should mount key', () => {

    cy.mount((<div>
      <Switch autoFocus enterKeyDown /><br /><br />    
      <Switch disabled /><br /><br />    
    </div>));
    cy.compareSnapshot(`key-1`);
    cy.get('body').type('{enter}')
    cy.get('button').eq(1).click()
    cy.compareSnapshot(`key-2`);
  });
  it('should mount key2', () => {

    cy.mount((<div>
      <Switch /><br /><br />    
      <Switch disabled /><br /><br />    
    </div>));
    cy.get('body').type('{enter}')
    cy.get('button').eq(1).click()
    cy.compareSnapshot(`key-3`);
  });
})

// describe('switch.cy.tsx-loading', () => {
//   it('should mount', () => {
//     cy.mount((<Switch loading checked />));
//     cy.compareSnapshot('loading');
//   });
// })