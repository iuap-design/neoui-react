/** InputGroup.tsx */
import {mount, shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import Button from '../../wui-button/src';
import {prefix} from '../../wui-core/src/updatePrefix';
import Input from '../../wui-input/src';

import InputGroup from '../src/index';

const prefixInputGroup = `${prefix}-input-group`;
describe('Enzyme Shallow', () => {
    it('InputGroup should be exist', () => {
        let inputgroup = shallow(<InputGroup/>);
        expect(inputgroup.hasClass(`${prefixInputGroup}`)).toEqual(true);
    })
})
describe('component: InputGroup, <test prop:: simple>', () => {
    it('InputGroup should have class simple', () => {
        let inputgroup = shallow(<InputGroup
            simple={true}>
            <InputGroup.Button>
                <Button>https://</Button>
            </InputGroup.Button>
            <Input type='text'/>
            <InputGroup.Addon>.com</InputGroup.Addon>
        </InputGroup>);
        expect(inputgroup.hasClass('simple')).toEqual(true);
    })
    it('InputGroup should be exist', () => {
        let inputgroup = shallow(<InputGroup>
            <InputGroup.Button>
                <Button>https://</Button>
            </InputGroup.Button>
            <Input type='text'/>
            <InputGroup.Addon>.com</InputGroup.Addon>
        </InputGroup>);
        expect(inputgroup.hasClass('simple')).toEqual(false);
        expect(inputgroup.find(`.${prefixInputGroup}`).childAt(2).text()).toBe('.com');
    })
})

describe('InputGroup的附属组件', () => {
    it('InputGroupButton 作为 InputGroup的附属组件Button', () => {
        let inputgroupbutton = mount(<InputGroup.Button/>);
        expect(inputgroupbutton.find('span').first().hasClass(`${prefixInputGroup}-btn`)).toEqual(true);
    })
    it('InputGroupAddon 作为 InputGroup的附属组件Addon', () => {
        let inputgroupaddon = mount(<InputGroup.Addon/>);
        expect(inputgroupaddon.find('span').first().hasClass(`${prefixInputGroup}-addon`)).toEqual(true);
    })
})
