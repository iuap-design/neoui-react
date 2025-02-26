/** Group.tsx */
import { mount } from '../../../next-ui-library/test/common/mount'
import React from 'react';
import { prefix } from '../../wui-core/src/updatePrefix'
import Icon from '../../wui-icon/src/index';
import Tooltip from '../../wui-tooltip/src';
import Avatar from '../src/index';

describe('component: Group, <test prop:: className>', function () {
    it(`group should be className avatar-group`, function () {
        let group = mount(<Avatar.Group className="avatar-group" />);
        expect(group.hasClass('avatar-group')).toEqual(true);
    });
})

describe('component: Group', () => {
    it('group should have maxCount children, <test prop:: maxCount>', () => {
        const group = mount(
            <Avatar.Group maxPopoverPlacement="bottom" maxCount={2} fieldid="fieldid-id"
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                <Avatar src="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg" />
                <Avatar>Bobo</Avatar>
                <Avatar style={{ backgroundColor: '#f56a00' }}>Kevin</Avatar>
                <Tooltip title="BIP User" placement="top">
                    <Avatar style={{ backgroundColor: '#18b681' }} icon={<Icon type="uf-caven" />} />
                </Tooltip>
                <Avatar style={{ backgroundColor: '#ffa600' }} icon={<Icon type="uf-lexi" />} />
            </Avatar.Group>
        );
        const a = group.find(`.${prefix}-avatar`).last()
        expect(a.text()).toContain('+3');
    })
    it('@fieldid,"***_avatar-num", <test prop:: fieldid>', () => {
        const group = mount(
            <Avatar.Group maxPopoverPlacement="bottom" maxCount={2} fieldid="fieldid-id"
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                <Avatar src="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg" />
                <Avatar>Bobo</Avatar>
                <Avatar style={{ backgroundColor: '#f56a00' }}>Kevin</Avatar>
                <Tooltip title="BIP User" placement="top">
                    <Avatar style={{ backgroundColor: '#18b681' }} icon={<Icon type="uf-caven" />} />
                </Tooltip>
                <Avatar style={{ backgroundColor: '#ffa600' }} icon={<Icon type="uf-lexi" />} />
            </Avatar.Group>
        );
        expect(group.find(`.${prefix}-avatar`).last().prop('fieldid')).toEqual('fieldid-id_avatar-num');
    })
})

describe('component: Group, <test prop:: children>', function () {
    it('group should be this children', function () {
        let group = mount(
            <Avatar.Group children={<Avatar className={'hello'} />}>
            </Avatar.Group>);
        expect(group.find('span').first().hasClass('hello')).toEqual(true);
    });
})

describe('component: Group, <test prop:: size>', function () {
    it('Group should be large', function () {
        let group = mount(
            <Avatar.Group size='large'>
                <Avatar>Bobo</Avatar>
            </Avatar.Group>);
        expect(group.find(`.${prefix}-avatar`).hasClass(`${prefix}-avatar-lg`)).toEqual(true);
    });
    it('Group should be small', function () {
        let group = mount(
            <Avatar.Group size='small'>
                <Avatar>Bobo</Avatar>
            </Avatar.Group>);
        expect(group.find(`.${prefix}-avatar`).hasClass(`${prefix}-avatar-sm`)).toEqual(true);
    });
    it('Group should be number 64', function () {
        let group = mount(
            <Avatar.Group size={64}>
                <Avatar>Bobo</Avatar>
            </Avatar.Group>);
        expect(group.find(`.${prefix}-avatar`).prop('style').width).toEqual('64px');
    });
});

describe('component: Group, <test prop:: style>', function () {
    it('group should be style color red', function () {
        let group = mount(
            <Avatar.Group style={{ color: 'red' }}>
                <Avatar>Bobo</Avatar>
            </Avatar.Group>);
        expect(group.find(`.${prefix}-avatar-group`).getDOMNode().style.color).toEqual('red');
    });
})

describe('component: Group, <test prop:: maxStyle>', function () {
    it('group more children should be have this style', function () {
        let group = mount(
            <Avatar.Group maxPopoverPlacement="bottom" maxCount={2} maxStyle={{ color: 'red' }}>
                <Avatar src="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg" />
                <Avatar>Bobo</Avatar>
                <Avatar>Kevin</Avatar>
            </Avatar.Group>
        );
        expect(group.find(`.${prefix}-avatar`).at(2).props().style.color).toEqual('red');
    });
})

describe('component: Group, <test prop:: maxPopoverPlacement>', function () {
    it('group more children should be at bottom', function () {
        let group = mount(
            <Avatar.Group maxPopoverPlacement="bottom" maxCount={2} maxStyle={{ color: 'red' }}>
                <Avatar src="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg" />
                <Avatar>Bobo</Avatar>
                <Avatar>Kevin</Avatar>
            </Avatar.Group>
        );
        expect(group.find(`.${prefix}-popover-placement-bottom`)).toBeTruthy();
    });
})

describe('Component: Group', () => {
    ['hover', 'click', 'focus'].forEach(item => {
        it('<test prop:: maxPopoverTrigger>', () => {
            let wrapper = mount(
                <Avatar.Group maxPopoverPlacement="bottom" maxCount={2} maxPopoverTrigger={item}>
                    <Avatar /><Avatar /><Avatar />
                </Avatar.Group>
            );
            expect(wrapper.find(`.${prefix}-avatar-string`).last().text()).toEqual('+1');
        })
    })
})
