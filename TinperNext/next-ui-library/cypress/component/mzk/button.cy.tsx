import React from 'react';
import Button from '../../../../packages/wui-button/src';
import type {ButtonType, ButtonColors, ButtonShape, ButtonSize} from '../../../../packages/wui-button/src/iButton';

Cypress.config({
  viewportWidth: 800,
  viewportHeight: 200,
}) 

const typeArr:Array<ButtonType> = ['default', 'ghost', 'danger', 'primary', 'dashed', 'text', 'link'];
const colorsArr:Array<ButtonColors> = ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'danger', 'dark', 'light'];
const shapeArr: Array<ButtonShape> = ['block', 'round', 'border', 'squared', 'pillRight', 'pillLeft'];
const sizeArr: Array<ButtonSize> = ['sm', 'md', 'lg'];
const style = {marginRight: 20, marginTop: 10}
// hover active 状态
// 补类名

describe('button.cy.tsx-default', () => {
  it('should mount', () => {

    cy.mount((<Button>Default Button</Button>));
    cy.compareSnapshot('default');

    // cy.mount((<Button>Default Button</Button>));
    // cy.get('button').trigger('mouseover');
    // cy.wait(200);
    // cy.compareSnapshot('default-mouseover');

  });
})

describe('button.cy.tsx-default-hover', () => {
  it('should mount default hover', () => {

    cy.mount((<>
    <Button style={{marginLeft: 20}}>Default Button</Button>
    <Button style={{marginLeft: 20}}>Default Button</Button>
    </>));

    cy.get('button').eq(1).realHover()
    cy.compareWithOptions('hover-default-hover', {
      capture: 'runner',
      clip: {x: 800, y: 80, width: 800, height: 400 }
    })


  });

  it('should mount primary hover', () => {

    cy.mount((<>
    <Button type='primary' style={{marginLeft: 20}}>Primary Button</Button>
    <Button type='primary' style={{marginLeft: 20}}>Primary Button</Button>
    </>));

    cy.get('button').eq(1).realHover()
    cy.compareWithOptions('hover-primary-hover', {
      capture: 'runner',
      clip: {x: 800, y: 80, width: 800, height: 400 }
    })


  });
})

describe('button.cy.tsx-type', () => {
  it('should mount type', () => {

    const list = typeArr.map(item => {
      return(<Button style={style} type={item}>{`${item} Button`}</Button>);
    })
    cy.mount((<>{list}</>));
    cy.compareSnapshot('type');

  });
})

describe('button.cy.tsx-colors', () => {
  it('should mount colors', () => {

    const list = colorsArr.map(item => {
      return(<Button style={style} colors={item}>{`${item} Button`}</Button>);
    })
    cy.mount((<>{list}</>));
    cy.compareSnapshot('colors');

  });
})

describe('button.cy.tsx-shape', () => {
  it('should mount shape', () => {

    const list = shapeArr.map(item => {
        return(<Button style={style} shape={item}>{`${item} Button`}</Button>);
    })
    const icon = (<Button shape='icon' icon='uf-search'></Button>);
    list.push(icon)
    cy.mount((<>{list}</>));
    cy.wait(200);
    cy.compareSnapshot('shape');

  });
})

describe('button.cy.tsx-icon', () => {
  it('should mount icon', () => {
    const onlyIcon = (<Button icon='uf-search' type='primary'></Button>);
    const search = ((<Button style={style} icon='uf-search' type='primary'>search Button</Button>));

    cy.mount((<>{search}{onlyIcon}</>));
    cy.wait(200);
    cy.compareSnapshot('icon-only');

  });
})

describe('button.cy.tsx-bordered', () => {
  it('should mount bordered', () => {

    const list = colorsArr.map(item => {
      return(<Button style={style} colors={item} bordered>{`${item} Button`}</Button>);
    })
    cy.mount((<>{list}</>));
    cy.compareSnapshot('bordered');

  });
})

// describe('button.cy.tsx-loading', () => {
//   it('should mount', () => {
//     cy.mount((<Button loading type='primary'>loading Button</Button>));
//     cy.compareSnapshot('loading');
//   });
// })

describe('button.cy.tsx-disabled', () => {
  it('should mount', () => {

    const list = colorsArr.map(item => {
      return(<Button style={style} colors={item} disabled>{`${item} Button`}</Button>);
    })
    cy.mount((<>{list}</>));
    cy.compareSnapshot('disabled');

  });
})

describe('button.cy.tsx-click', () => {
  it('should mount click', () => {

    cy.mount((<><Button style={style} type='primary'>click Button</Button><Button style={style} type='primary'>click Button</Button></>));
    cy.get('button').eq(1).click();
    cy.compareSnapshot('click');

  });
})

describe('button.cy.tsx-size', () => {
  it('should mount size', () => {

    const list = sizeArr.map(item => {
        return(<Button style={style} size={item}>{`${item} Button`}</Button>);
      })
    cy.mount((<>{list}</>));
    cy.compareSnapshot('size');

  });
})