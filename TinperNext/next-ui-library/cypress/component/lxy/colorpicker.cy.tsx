import React, { useState } from 'react';

import { ColorPickerProps, ColorPicker } from '../../../../packages';
const ColorPickerDemo = (props: Partial<ColorPickerProps>) => {
  const [value, setValue] = useState('"#E14C46"')
  const handleChange = (v: { class: string; rgba: string; hex: string; }) => {
    console.log("选择的色彩信息 ：", v);
    setValue(v.hex || '')
  }
  return <ColorPicker
    fieldid="demo_pick"
    label="颜色"
    placeholder="请输入十六进制色值"
    value={value}
    onChange={handleChange}
    {...props}
  />
}

const sizeArr: any = ['xs', 'sm', 'md', 'nm', 'lg', 'default', 'small', 'middle', 'large'];
const ColorPickerSizeDemo = (props: any) => {
  let comps: JSX.Element[] = [];
  sizeArr.forEach((size: any) => {
    comps.push(
      <ColorPicker size={size} {...props} />
    );
  });
  return <>{comps}</>;
};

describe('colorpicker.cy.tsx', () => {

  it('should init input', {
    viewportWidth: 300,
    viewportHeight: 300,
  }, () => {
    cy.mount((<ColorPickerDemo />));
    cy.compareSnapshot('init_input')

    cy.mount(<ColorPickerSizeDemo label='颜色' placeholder='请输入十六进制色值' />)
    cy.compareSnapshot(`init_input_size`)

    cy.mount(<ColorPickerSizeDemo label='颜色' placeholder='请输入十六进制色值' bordered='bottom' />)
    cy.compareSnapshot(`init_input_border_bottom`)
  });
  it('should required', {
    viewportWidth: 300,
    viewportHeight: 300,
  }, () => {
    cy.mount((<ColorPickerDemo required />));
    cy.compareSnapshot('required')
  });
  it('should disabled', {
    viewportWidth: 300,
    viewportHeight: 300,
  }, () => {
    cy.mount((<ColorPickerDemo disabled />));
    cy.compareSnapshot('init_disabled')
    // 打开面板
    cy.get('.wui-colorpicker-form-color-demo').eq(0).click();
    cy.wait(200)
    cy.compareSnapshot('click_disabled')

  });

  it('select a color', () => {
    cy.mount((<ColorPickerDemo />));
    // 打开面板
    cy.get('.wui-colorpicker-form-color-demo').eq(0).click();
    cy.wait(200)
    cy.compareSnapshot('open_modal')
    // 换色
    cy.get('.wui-colorpicker-panel-color-plate li').eq(0).click();
    cy.compareSnapshot('select_panel')
    // 修改透明度
    cy.get('.wui-colorpicker-panel-color-info input').eq(0).clear();
    cy.get('.wui-colorpicker-panel-color-info input').eq(0).type('50');
    cy.get('.wui-colorpicker-panel-color-info input').eq(0).blur();
    cy.compareSnapshot('change_alpha')
    // 点击确认按钮
    cy.get('.wui-button-primary').eq(0).click();
    cy.wait(200)
    cy.compareSnapshot('after_select_color')

  });

  ["zh-cn", "zh-tw", "en-us", "vi-vn", "id-id"].forEach(lang => {
    it(`test locale ${lang}`, () => {
      cy.mount(<ColorPicker label='颜色' placeholder='请输入十六进制色值' />);
      cy.get('.wui-colorpicker-form-color-demo').eq(0).click();
      cy.wait(200);
      cy.compareSnapshot(`lang-${lang}`);
    });
  });
})