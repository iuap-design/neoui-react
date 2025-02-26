import React, { useState } from 'react';

import {Radio, RadioGroupProps} from '../../../../packages';

describe('radio.cy.tsx', () => {
    const Demo1 = (props: Partial<RadioGroupProps> = {}) => {
        const [selectedValue, setSelectedValue] = useState('3')
        const handleChange: RadioGroupProps['onChange'] = (value, _e) => {
            setSelectedValue(value as any);
        }
        return <Radio.Group name="color" value={selectedValue} onChange={handleChange}  {...props}>
            <Radio style={{fontSize: '12px'}} color="primary" value="1">苹果</Radio>
            <Radio style={{fontSize: '14px'}} color="success" value="2">香蕉</Radio>
            <Radio style={{fontSize: '16px'}} color="info" value="3">葡萄</Radio>
            <Radio style={{fontSize: '18px'}} color="warning" value="4">菠萝</Radio>
            <Radio color="danger" value="5">梨</Radio>
            <Radio disabled color="dark" value="6">石榴</Radio>
        </Radio.Group>
    }
    const Demo2 = (_props: Partial<RadioGroupProps> = {}) => {
        const [selectedValue, setSelectedValue] = useState('orange')
        const [selectedValue2, setSelectedValue2] = useState('apple')
        const handleChange: RadioGroupProps['onChange'] = (value, _e) => {
            setSelectedValue(value as any);
        }
        const handleChange2: RadioGroupProps['onChange'] = (value, _e) => {
            setSelectedValue2(value as any);
        }
        return <div>
        <Radio.Group name="fruit" selectedValue={selectedValue} onChange={handleChange}>
            <Radio.Button value="apple">apple</Radio.Button>
            <Radio.Button value="banana">banana</Radio.Button>
            <Radio.Button value="orange">orange</Radio.Button>
        </Radio.Group>

        <div style={{ marginTop: 16 }}>
            <Radio.Group selectedValue={selectedValue2} onChange={handleChange2}>
                <Radio.Button value="apple">apple</Radio.Button>
                <Radio.Button value="banana" disabled>banana</Radio.Button>
                <Radio.Button value="orange">orange</Radio.Button>
            </Radio.Group>
        </div>

        <div style={{ marginTop: 16 }}>
            <Radio.Group selectedValue="apple" disabled>
                <Radio.Button value="apple">apple</Radio.Button>
                <Radio.Button size='lg' value="banana">banana</Radio.Button>
                <Radio.Button size='sm' value="orange">orange</Radio.Button>
            </Radio.Group>
        </div>
    </div>
    }
    it(`it should type`, {
        viewportWidth: 620,
        viewportHeight: 300,
      }, () => {
        cy.mount(<Demo1 />);
        cy.compareSnapshot(`radio`)
        cy.get('input').eq(0).click();
        cy.compareSnapshot(`radio_click`)

    })
    it(`it should defaultValue`, {
        viewportWidth: 620,
        viewportHeight: 300,
      }, () => {
        cy.mount(<Radio.Group name="color" defaultValue='6' disabled>
            <Radio style={{fontSize: '12px'}} color="primary" value="1">苹果</Radio>
            <Radio style={{fontSize: '14px'}} color="success" value="2">香蕉</Radio>
            <Radio style={{fontSize: '16px'}} color="info" value="3">葡萄</Radio>
            <Radio style={{fontSize: '18px'}} color="warning" value="4">菠萝</Radio>
            <Radio color="danger" value="5">梨</Radio>
            <Radio color="dark" value="6">石榴</Radio>
        </Radio.Group>);
        cy.compareSnapshot(`defaultValue_radio`)
        cy.get('input').eq(0).click({force: true});
        cy.compareSnapshot(`defaultValue_click_disabled_radio`)
    })
    it(`it should readonly`, {
        viewportWidth: 620,
        viewportHeight: 300,
      }, () => {
        cy.mount(<Radio.Group name="color" defaultValue='5' readOnly>
            <Radio style={{fontSize: '12px'}} color="primary" value="1">苹果</Radio>
            <Radio style={{fontSize: '14px'}} color="success" value="2">香蕉</Radio>
            <Radio style={{fontSize: '16px'}} color="info" value="3">葡萄</Radio>
            <Radio style={{fontSize: '18px'}} color="warning" value="4">菠萝</Radio>
            <Radio color="danger" value="5">梨</Radio>
            <Radio color="dark" value="6">石榴</Radio>
        </Radio.Group>);
        cy.compareSnapshot(`readonly`)
        cy.get('input').eq(0).click({force: true});
        cy.compareSnapshot(`readonly_click_radio`)
    })
    it(`it should radio button`, {
        viewportWidth: 620,
        viewportHeight: 300,
      }, () => {
        cy.mount(<Demo2 />);
        cy.compareSnapshot(`radio_button`)
        cy.get('input').eq(0).click({force: true});
        cy.compareSnapshot(`radio_button_click`);
        cy.get('input').eq(8).click({force: true});
        cy.compareSnapshot(`radio_button_click_disabled`);

    })
   
})