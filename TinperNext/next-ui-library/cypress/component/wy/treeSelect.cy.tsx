import React from 'react';
import Demo5 from './treeSelectDemo2';
import Demo1 from './TreeSelectDemo1';
import { TreeSelectProps } from '../../../../packages';

const sizeArr: any = ['xs', 'sm', 'md', 'nm', 'lg', 'default', 'small', 'middle', 'large'];
const TreeSelectSizeDemo = (props: any) => {
  let comps: JSX.Element[] = [];
  sizeArr.forEach((size: any) => {
      comps.push(
          <>
            <Demo1 size={size} {...props} />
            <Demo1 size={size} disabled {...props} />
          </>
      );
  });
  return <>{comps}</>;
};

describe('treeselect.cy.tsx',{
  viewportWidth: 300,
  viewportHeight: 300,
}, () => {

  it('test size', () => {
    cy.mount(<TreeSelectSizeDemo allowClear style={{width: 200}} />);
    cy.compareSnapshot('basic_treeselect_size');

    cy.mount(<TreeSelectSizeDemo allowClear style={{width: 200}}  bordered='bottom' />)
    cy.compareSnapshot('basic_treeselect_border_bottom')
    cy.mount(<TreeSelectSizeDemo allowClear style={{width: 200}}  bordered='bottom' disabled />)
    cy.compareSnapshot('basic_treeselect_disabled_border_bottom')
  });

  it('should allowClear', () => {
    cy.mount((<Demo1 value="parent 1-0" />));
    cy.compareSnapshot('hasValue')
    cy.get('.wui-tree-select').eq(0).realHover()
    cy.compareWithOptions('hover', {
      capture: 'runner',
      clip: {x: 800, y: 80, width: 800, height: 400 }
    })

    cy.get('.wui-select-clear').eq(0).click()
    cy.wait(200)
    cy.compareSnapshot('successClear')
  });
  it('should bordered', () => {
    cy.mount((<Demo1 bordered={false} />));
    cy.compareSnapshot('bordered')
  });
  it('should expanded and disabled', () => {
    cy.mount((<Demo1 disabled />));
    cy.compareSnapshot('disabled')
    cy.get('.wui-select-selection-search-input').eq(0).click({force: true})
    cy.compareSnapshot('disabled-click')
  });
  // 增加的一组 展开用例
  it('should expanded', () => {
    cy.mount((<Demo1 style={{marginLeft: '-20px'}} />));
    cy.get('.wui-select-selection-search-input').eq(0).click()
    cy.get('.wui-select-tree-switcher').eq(0).click()
    cy.compareSnapshot('expanded')
  });
  it('should expanded and listHeight', () => {
    cy.mount((<Demo1 style={{'marginLeft': "-20px"}} listHeight={300} />));
    cy.get('.wui-select-selection-search-input').eq(0).click()
    cy.wait(200)
    cy.compareSnapshot('listHeight300')
  });
  it('should showArrow and suffixIcon', () => {
    cy.mount((<Demo1 suffixIcon='u' />));
    cy.compareSnapshot('suffixIcon')
  });
  it('should not showArrow and suffixIcon', () => {
    cy.mount((<Demo1 showArrow={false} suffixIcon='u' />));
    cy.compareSnapshot('no-suffixIcon')
  });
  it('should expanded and dropdownMatchSelectWidth',{
    viewportWidth: 400,
    viewportHeight: 300,
  }, () => {
    cy.mount((<Demo1 dropdownMatchSelectWidth={350}  style={{'marginLeft': "-20px"}} />));
    cy.get('.wui-select-selection-search-input').eq(0).click()
    cy.wait(500)
    cy.compareSnapshot('dropdownMatchSelectWidth')
  });
  const placement: TreeSelectProps["placement"][] = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight']
  placement.forEach(p => {
    it(`should expanded and placement ${p}`,{
      viewportWidth: 400,
      viewportHeight: 600,
    }, () => {
      cy.mount((<Demo1 style={{'marginLeft': "-20px"}} placement={p} />));
      cy.get('.wui-select-selection-search-input').eq(0).click()
      cy.wait(200)
      cy.compareSnapshot(`placement_${p}`)
    });
  })

  it('should loadData', () => {
    cy.mount((<Demo5 />));
    cy.get('.wui-select-selection-search-input').eq(0).click()
    cy.wait(500)
    cy.compareSnapshot('loadData')
  });

})