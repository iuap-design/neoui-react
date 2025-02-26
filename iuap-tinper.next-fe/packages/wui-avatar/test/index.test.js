/** Avatar.tsx */
import { mount } from '../../../next-ui-library/test/common/mount'
import React from 'react';
import { attrsTest, testCustomStyle, testCustomeText } from '../../../next-ui-library/test/common/index';
import { prefix } from '../../wui-core/src/updatePrefix'
import Icon from '../../wui-icon/src/index';
import Avatar from '../src/index';

const prefixAvatar = `${prefix}-avatar`;

['circle', 'square'].forEach(item => {
    attrsTest({
        title: 'component: Avatar, <test prop:: shape>',
        Component: Avatar,
        attrs: {
            shape: item
        },
        selector: `.${prefixAvatar}`,
        classnames: [`${prefixAvatar}-${item}`]
    })
});
attrsTest({
    title: 'component: Avatar, <test prop:: className>',
    Component: Avatar,
    attrs: {
        className: "group-of-avatar"
    },
    selector: `.${prefixAvatar}`,
    classnames: ["group-of-avatar"]
});
attrsTest({
    title: 'component: Avatar, <test prop:: icon>',
    Component: Avatar,
    attrs: {
        icon: <Icon type="uf-caven" />
    },
    selector: `.${prefix}-icon`,
    classnames: ["uf-caven"]
});
Object.entries({ lg: 'large', sm: 'small' }).forEach((item) => {
    attrsTest({
        title: 'component: Avatar, <test prop:: size>',
        Component: Avatar,
        attrs: {
            size: item[1]
        },
        selector: `.${prefixAvatar}`,
        classnames: [`${prefixAvatar}-${item[0]}`]
    })
});
testCustomStyle({
    title: 'component: Avatar, <test prop:: style>',
    Component: Avatar,
    attrs: {
        style: { 'color': "red" }
    },
    selector: `.${prefixAvatar}`,
    verifyStyle: { 'color': "red" }
});
testCustomeText({
    title: 'Comment: Avatar, <test prop:: children>',
    Component: Avatar,
    attrs: {
        children: '1'
    },
    selector: `.${prefixAvatar} .${prefixAvatar}-string`,
    text: '1'
})
describe('component: Avatar', () => {
    it('Avatar should be have this src, <test prop:: src>', () => {
        let avatar = mount(<Avatar src="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg" />);
        expect(avatar.find(`.${prefixAvatar}-image`).find('img').props().src).toEqual("https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg");
    });
    it('Avatar should be this gap, <test prop:: gap>', () => {
        let avatar = mount(<Avatar gap={0.5} />);
        expect(avatar.find(`.${prefixAvatar}-string`).getDOMNode().style.transform).toEqual('scale(1) translateX(-50%)');
    });
    it('Avatar should be alt tupian, <test prop:: alt>', () => {
        let avatar = mount(<Avatar src="https://imgbaidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg"
            alt={'tupian'} />);
        expect(avatar.find('img').getDOMNode().alt).toEqual('tupian');
    });
    it('Avatar should be draggable, <test prop:: draggable>', () => {
        let avatar = mount(<Avatar src="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg"
            draggable={true} />);
        expect(avatar.find(`.${prefixAvatar}`).find('img').getDOMNode().draggable).toEqual(true);
    });
    it('Avatar should be srcSet, <test prop:: srcSet>', () => {
        let avatar = mount(<Avatar src="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg"
            srcSet="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg" />);
        expect(avatar.find(`.${prefixAvatar}`).find('img').prop('srcSet')).toEqual("https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg");
    });
    it('custom size', () => {
        let avatar = mount(<Avatar size={64} icon={<Icon type="uf-caven" />} />)
        expect(avatar.find('span').props().style.width).toEqual('64px')
        expect(avatar.find('span').props().style.height).toEqual('64px')
        expect(avatar.find('span').props().style['line-height']).toEqual('64px')
        expect(avatar.find('span').props().style['font-size']).toEqual('32px')
    })
    it('Default is displayed when size is object && should have fieldid, <test prop:: fieldid>', () => {
        let avatar = mount(<Avatar size={['lg', 'sm']} icon={<Icon type="uf-caven" />} />)
        expect(avatar.find('span').hasClass(`${prefixAvatar}-large`)).toEqual(false)
        expect(avatar.find('span').hasClass(`${prefixAvatar}-small`)).toEqual(false)
        expect(avatar.find(`.${prefixAvatar}`).prop('fieldid')).toEqual(undefined)
        avatar.setProps({ size: 'default', fieldid: 'fieldid-id' })
        expect(avatar.find('span').hasClass(`${prefixAvatar}-large`)).toEqual(false)
        expect(avatar.find('span').hasClass(`${prefixAvatar}-small`)).toEqual(false)
        expect(avatar.find(`.${prefixAvatar}`).prop('fieldid')).toEqual('fieldid-id')
    })
    // onError has been tested in cypress
    it('<test prop:: onError>', () => { })
})
