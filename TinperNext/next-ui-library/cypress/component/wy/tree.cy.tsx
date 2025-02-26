import React from 'react';
import Demo1 from './TreeDemo1';
import Demo5 from './TreeDemo2';

describe('tree.cy.tsx',{
  viewportWidth: 300,
  viewportHeight: 300,
}, () => {
  // 所有测试均 有测试到icon
  it('should expanded and disabled', () => {
    cy.mount((<Demo1 />));
    cy.compareSnapshot('expanded-on')

    cy.get('.wui-tree-switcher.wui-tree-noline_open:last').click();
    cy.compareSnapshot('expanded-off')
  });
  it('should all disabled', () => {
    cy.mount((<Demo1 disabled />));
    cy.compareSnapshot('allDisabled')
  });
  it('should checkable and checkStrictly', () => {
    cy.mount((<Demo1 checkStrictly={false} cancelUnSelect={false}/>));
    cy.compareSnapshot('checkable-init')

    cy.get('.wui-tree-checkbox-inner:last').click();
    cy.compareSnapshot('half-checked')
  });
  it('should checkable and syncCheckedAndSelectedStatus', () => {
    cy.mount((<Demo1 syncCheckedAndSelectedStatus />));

    cy.get('.wui-tree-checkbox-inner:last').click();
    cy.compareSnapshot('syncCheckedAndSelectedStatus')
  });
  it('should showLine', () => {
    cy.mount((<Demo1 showLine/>));
    cy.compareSnapshot('showLine')
  });
  it('should focusable', () => {
    cy.mount((<Demo1 focusable/>));
    cy.get('.wui-tree-node-content-wrapper').eq(0).click()
    cy.get('.wui-tree-node-content-wrapper').eq(0).type('{downarrow}{downarrow}')
    cy.compareSnapshot('focusable')
  });
  it('should autoSelectWhenFocus', () => {
    cy.mount((<Demo1 autoSelectWhenFocus focusable/>));
    cy.get('.wui-tree-node-content-wrapper').eq(0).click()
    // 自动
    cy.get('.wui-tree-node-content-wrapper').eq(0).type('{downarrow}{downarrow}')
    cy.compareSnapshot('autoSelectWhenFocus')
  });
  it('should openIcon', () => {
    cy.mount((<Demo1 openIcon='u' focusable/>));
    // 有一个节点是关闭节点  closeIcon
    cy.get('.wui-tree-node-content-wrapper').eq(0).click()
    cy.get('.wui-tree-node-content-wrapper').eq(0).type('{downarrow}{downarrow}')
    cy.compareSnapshot('openIcon')
  });
  // 本例为 loadData 其他为TreeNodes 作为Children
  it('should loadData', () => {
    cy.mount((<Demo5 />));
    cy.wait(2000)
    cy.compareSnapshot('loadData')
  });

})