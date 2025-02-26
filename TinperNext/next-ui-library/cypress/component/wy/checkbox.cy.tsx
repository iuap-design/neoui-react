import React from 'react';

import {Checkbox} from '../../../../packages';

describe('checkbox.cy.tsx', () => {
    
    it(`it should type`, {
        viewportWidth: 1920,
        viewportHeight: 300,
      }, () => {
        cy.mount(
            <div className="demo-checkbox">
	            <Checkbox style={{ lineHeight: '60px' }} disabled title="1" className="test">
					Checkbox
	            </Checkbox>
	            <Checkbox style={{ lineHeight: '30px' }} defaultChecked={true} className="test">
                    defaultChecked
	            </Checkbox>
	            <Checkbox style={{ lineHeight: '5px' }} checked={true} className="test">
					Checked
	            </Checkbox>

	        </div>);
        cy.compareSnapshot(`checkbox`)
        cy.get('input').eq(1).click();
        cy.compareSnapshot(`click_checkbox`)

    })
    it(`it should type`, {
        viewportWidth: 1920,
        viewportHeight: 300,
      }, () => {
        const options = [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
        ];
        const optionsWithDisabled = [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange', disabled: false },
        ];
        const plainOptions = ['Apple', 'Pear', 'Orange'];
        const onChange = (checkedValues: any) => {
            console.log('checked = ', checkedValues);
        }
    
        cy.mount(
            <div className="demo-checkbox">
                <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange}/>

                <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange}/>

                <Checkbox.Group options={optionsWithDisabled} disabled defaultValue={['Apple']} onChange={onChange} name="sun"/>
            </div>);
        cy.compareSnapshot(`checkbox-group`)
    })
})