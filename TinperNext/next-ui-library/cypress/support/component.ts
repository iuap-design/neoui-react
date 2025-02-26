// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import compareSnapshotCommand from 'cypress-image-diff-js/dist/command'
import "@tinper/styles";
import "../../../packages/wui-svgicon/src/iconfont"; 
import { mount } from 'cypress/react'
import "cypress-real-events/support";
// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      compareSnapshot(email: string): any
      realHover(): any
      compareWithOptions(name:string, options:any): any
    }
  }
}

Cypress.Commands.add('mount', mount)

compareSnapshotCommand();
after(() => {
  cy.task("generateReport");
});

// 新的截图方法，支持传参数
Cypress.Commands.add('compareWithOptions', (name:string, options) => {
  compareSnapshotCommand(options);
  cy.compareSnapshot(name);
  compareSnapshotCommand();
})