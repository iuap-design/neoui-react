import React from 'react';
import Spin from '../../../../packages/wui-spin/src';
import '../../../../packages/wui-spin/test/spin.cy.scss';
import type {SpinType, SpinColor} from '../../../../packages/wui-spin/src/iSpin';
import {Icon} from '../../../../packages/index';

Cypress.config({
  viewportWidth: 500,
  viewportHeight: 900,
}) 

const typeArr:Array<SpinType> = ['default', 'rotate',  'line',  'custom',  'antd'];
const colorsArr:Array<SpinColor> = ['primary', 'success', 'warning'];
const localeArr = ['zh-cn', 'en-us', 'zh-tw', 'vi-vn'];
describe('spin.cy.tsx-default', () => {
  it('should mount', () => {

    cy.mount((<Spin spinning />));
    cy.viewport(200, 200)
    cy.compareSnapshot('default');

  });
})

describe('spin.cy.tsx-SpinType', () => {
  it('should mount SpinType', () => {

    cy.mount((<div>
      {
        typeArr.map((item, i) => {
          const type = item === 'custom' ? (<Icon type="uf-sync-c-o" />) : undefined;
          return (
            <SizeSpin id={`demo${i}`} loadingType={item} indicator={type} />
          )
        })
      }
    </div>));
    cy.wait(300)
    cy.viewport(500, 500)
    cy.compareSnapshot('SpinType');

  });
})

describe('spin.cy.tsx-colors', () => {
  it('should mount colors', () => {

    cy.mount((<div>
      {
        colorsArr.map((item, i) => {
          return (
            <SizeSpin id={`demo${i}-0`} color={item} tip='loading' />
          )
        })
      }
      {
        colorsArr.map((item, i) => {
          return (
            <SizeSpin id={`demo${i}-1`} color={item} loadingType='line' tip='loading' />
          )
        })
      }
      {
        colorsArr.map((item, i) => {
          return (
            <SizeSpin id={`demo${i}-2`} color={item} loadingType='antd' tip='loading' />
          )
        })
      }
      {
        colorsArr.map((item, i) => {
          return (
            <SizeSpin id={`demo${i}-3`} color={item} loadingType='rotate' tip='loading' />
          )
        })
      }
    </div>));
    cy.wait(300)
    cy.viewport(500, 1200)
    cy.compareSnapshot('colors');

  });
})

describe('spin.cy.tsx-locale', () => {
  it('should mount locale', () => {

    cy.mount((<div>
      {
        localeArr.map((item, i) => {
          return (
            <LcSpin id={`demo${i}`} locale={item} />
          )
        })
      }
    </div>));
    cy.viewport(200, 400)
    cy.compareSnapshot('locale');

  });
})

function SizeSpin(props: any) {
  const {id, ...other} = props;
  const getElement = () => {
    return document.querySelector(`#${id}`);
  };
  return (
    <div className="demo5" id={id}>
        <Spin size="sm" getPopupContainer={getElement} spinning {...other}/>
        <Spin getPopupContainer={getElement} spinning {...other}/>
        <Spin size="lg" getPopupContainer={getElement} spinning {...other}/>
    </div>
  )
}

function LcSpin(props: any) {
  const {id, ...other} = props;
  const getElement = () => {
    return document.querySelector(`#${id}`);
  };
  return (
    <div className="demo6" id={id}>
        <Spin getPopupContainer={getElement} spinning {...other}/>
    </div>
  )
}