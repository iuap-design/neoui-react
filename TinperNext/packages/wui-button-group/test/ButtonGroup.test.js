/**ButtonGroup.tsx */
import {shallow, mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import Button from '../../wui-button/src/index';
import {prefix} from '../../wui-core/src/updatePrefix';
import ButtonGroup from '../src/index';
const prefixButton = `${prefix}-button`;
const prefixButtonGroup = `${prefix}-button-group`;
 
describe('verifiy default', function() {
    it('verifiy buttonGroup exist', function() {
        let buttonGroup = shallow(<ButtonGroup/>);
        expect(buttonGroup.hasClass(`${prefixButtonGroup}`)).toEqual(true);
    });
    it('verifiy buttonGroup vertical, <test prop:: vertical>', function() {
        let buttonGroup = shallow(
            <ButtonGroup vertical>
                <Button />
                <Button />
            </ButtonGroup>);
        expect(buttonGroup.hasClass(`${prefixButtonGroup}-vertical`)).toEqual(true);
    });
    it('verifiy buttonGroup block, <test prop:: block>', function() {
        let buttonGroup = shallow(
            <ButtonGroup vertical block>
                <Button />
            </ButtonGroup>);
        expect(buttonGroup.hasClass(`${prefixButtonGroup}-block`)).toEqual(true);
    });
    it('verifiy buttonGroup justified, <test prop:: justified>', function() {
        let buttonGroup = shallow(
            <ButtonGroup justified>
                <Button />
            </ButtonGroup>);
        expect(buttonGroup.hasClass(`${prefixButtonGroup}-justified`)).toEqual(true);
    });
    it('className, <test prop:: className>', function() {
        let buttonGroup = shallow(
            <ButtonGroup className="class-of-button">
                <Button />
            </ButtonGroup>);
        expect(buttonGroup.find(`.${prefixButtonGroup}`).hasClass('class-of-button')).toEqual(true);
    });
    it('separated, <test prop:: separated>', function() {
        let buttonGroup = shallow(
            <ButtonGroup separated>
                <Button />
                <Button />
            </ButtonGroup>);
        expect(buttonGroup.find(`.${prefixButtonGroup}`).hasClass(`${prefixButtonGroup}-separated`)).toEqual(true);
    });
    it('list, <test prop:: list>', () => {
        const list = [
            {
                title: '未读信息',
                colors: 'primary',
                key: 'notRead'
            },
            {
                title: '已读信息',
                colors: 'primary',
                key: 'readed'
            }
        ]
        let buttonGroup = mount(<ButtonGroup list={list}></ButtonGroup>);
        expect(buttonGroup.find(`.${prefixButton}`).at(0).hasClass(`${prefixButton}-primary`)).toEqual(true);
        expect(buttonGroup.find(`.${prefixButton}`).at(1).hasClass(`${prefixButton}-primary`)).toEqual(true);
        expect(buttonGroup.find(`.${prefixButton}-text-wrap`).at(0).text()).toEqual('未读信息');
        expect(buttonGroup.find(`.${prefixButton}-text-wrap`).at(1).text()).toEqual('已读信息');
    });
    it('should have active when click', () => {
        const mockEvent = jest.fn();
        const LIST = [
            {
                title: '未读信息',
                colors: 'primary',
                key: 'notRead',
                onClick: mockEvent
            },
            {
                title: '已读信息',
                colors: 'primary',
                key: 'readed'
            },
        ]
        let wrapper = mount(<ButtonGroup list={LIST}/>);
        expect(wrapper.exists('.active')).toEqual(false);
        wrapper.find('button').at(0).simulate('click');
        expect(mockEvent).toHaveBeenCalled();
        expect(wrapper.find('button').at(0).hasClass('active')).toEqual(true);
        wrapper.find('button').at(1).simulate('click');
        expect(wrapper.find('button').at(1).hasClass('active')).toEqual(true);
    })
});
