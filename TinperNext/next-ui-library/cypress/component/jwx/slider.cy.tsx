import React from 'react';
import Slider from '../../../../packages/wui-slider/src';

Cypress.config({
  viewportWidth: 600,
  viewportHeight: 600,
})

const defaultValue = 20;
const divStyle = {marginTop: 100, marginLeft: 20, marginRight: 20}
const style: any = { float: 'left', height: 400, marginTop: 30, marginLeft: 50, width: 100 };
const marks = {
  0: <strong>0°C</strong>,
  26: '26°C',
  47: '47°C',
  100: {
      style: {
          color: 'red',
      },
      label: <strong>100°C</strong>
  }
};

describe('slider.cy.tsx-default', () => {
  it('should mount', () => {

    cy.mount((<div style={divStyle}><Slider defaultValue={defaultValue} /></div>));
    cy.compareSnapshot('default');

    // cy.mount((<div style={divStyle}><Slider min={0} max={20} defaultValue={[3, 10]} range/></div>));
    // cy.compareSnapshot('default-range');

  });
})

describe('slider.cy.tsx-disabled', () => {
  it('should mount', () => {

    cy.mount((<div style={divStyle}>
      <Slider disabled defaultValue={defaultValue} /><br /><br />
      <Slider allowClear defaultValue={defaultValue} /><br /><br />
      <Slider min={0} marks={marks} defaultValue={defaultValue} /><br /><br /><br /><br />
      <Slider min={0} max={100} defaultValue={defaultValue} tipFormatter={value => `${value}%`} tooltipVisible getTooltipPopupContainer={dom => dom}/><br /><br />
      <Slider min={0} max={100} defaultValue={defaultValue} tipFormatter={value => `${value}%`} tooltipVisible getTooltipPopupContainer={dom => dom} tooltipPlacement='bottom'/><br /><br /><br /><br />
      <Slider allowCross={false} defaultValue={[0, 20]} range/>
    </div>));
    cy.compareSnapshot('disabled');

  });
})

describe('slider.cy.tsx-vertical', () => {
  it('should mount', () => {

    cy.mount((<>
    <div style={style}>
      <Slider vertical defaultValue={defaultValue} />
    </div>
    <div style={style}>
      <Slider vertical defaultValue={defaultValue} allowClear />
    </div>
    <div style={style}>
      <Slider vertical min={0} marks={marks} defaultValue={defaultValue} />
    </div>
    <div style={style}>
      <Slider vertical min={0} marks={marks} defaultValue={[20, 40]} range />
    </div>
    </>));
    cy.compareSnapshot('vertical');

  });
})

describe('slider.cy.tsx-marks', () => {
  it('should mount', () => {

  });
})

describe('slider.cy.tsx-tooltipVisible', () => {
  it('should mount', () => {


  });
})