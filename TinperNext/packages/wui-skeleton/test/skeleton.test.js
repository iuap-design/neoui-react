/**Skeleton.tsx */
import React from 'react';
import { mount } from '../../../next-ui-library/test/common/mount'
import Skeleton from '../src/index';
import SkeletonAvatar from '../src/Avatar'
import SkeletonInput from '../src/Input'
import SkeletonButton from '../src/Button'
import { prefix } from '../../wui-core/src/updatePrefix';
import { attrsTest } from '../../../next-ui-library/test/common/index';
const prefixSkeleton = `${prefix}-skeleton`;

describe('Component: Skeleton', () => {
    attrsTest({
        title: 'component: Skeleton, <test prop:: title>',
        Component: Skeleton,
        attrs: {
            title: true
        },
        selector: `h3`,
        classnames: [`${prefixSkeleton}-title`]
    });
    attrsTest({
        title: 'component: Skeleton, <test prop:: active>',
        Component: Skeleton,
        attrs: {
            active: true
        },
        selector: `.${prefixSkeleton}`,
        classnames: [`${prefixSkeleton}-active`]
    });
    attrsTest({
        title: 'component: Skeleton, <test prop:: round>',
        Component: Skeleton,
        attrs: {
            round: true
        },
        selector: `.${prefixSkeleton}`,
        classnames: [`${prefixSkeleton}-round`]
    });
    it('avatar test, <test prop:: avatar>', () => {
        let wrapper = mount(<Skeleton />)
        expect(wrapper.exists(`.${prefixSkeleton}-avatar`)).toBe(false)
        wrapper.setProps({ avatar: true })
        expect(wrapper.find('span').hasClass(`${prefixSkeleton}-avatar`)).toBe(true)
        expect(wrapper.find('span').hasClass(`${prefixSkeleton}-avatar-circle`)).toEqual(true)
        wrapper.setProps({ avatar: false })
        expect(wrapper.exists(`.${prefixSkeleton}-avatar`)).toBe(false)

        wrapper.setProps({ avatar: true, title: true, paragraph: false })
        expect(wrapper.find('span').hasClass(`${prefixSkeleton}-avatar-square`)).toEqual(true)
    })
    it('loading test, <test prop:: loading>', async () => {
        let wrapper = mount(
            <div className="skeleton-article">
                <Skeleton loading={false}>
                    <div><h4>loading test</h4></div>
                </Skeleton>
            </div>
        )
        expect(wrapper.exists(`.${prefixSkeleton}-title`)).toEqual(false)
        expect(wrapper.exists(`.${prefixSkeleton}-paragraph`)).toEqual(false)
        expect(wrapper.find(`.skeleton-article div`).find('h4').text()).toEqual('loading test')

        wrapper = mount(
            <div className="skeleton-article">
                <Skeleton loading={true}>
                    <div><h4>loading test</h4></div>
                </Skeleton>
            </div>
        )
        expect(wrapper.exists(`.${prefixSkeleton}-title`)).toEqual(true)
        expect(wrapper.exists(`.${prefixSkeleton}-paragraph`)).toEqual(true)
    })
    it('paragraph test, <test prop:: paragraph>', () => {
        let wrapper = mount(<Skeleton />)
        expect(wrapper.exists(`.${prefixSkeleton}-paragraph`)).toBe(true)
        wrapper.setProps({ paragraph: true })
        expect(wrapper.exists(`.${prefixSkeleton}-paragraph`)).toBe(true)
        wrapper.setProps({ paragraph: false })
        expect(wrapper.exists(`.${prefixSkeleton}-paragraph`)).toBe(false)
        wrapper = mount(<Skeleton paragraph={{ rows: 4, width: ['50%', '60%'] }} />)
        expect(wrapper.find('ul li')).toHaveLength(4)
        expect(wrapper.find('ul li').at(0).prop('style').width).toEqual('50%')
        expect(wrapper.find('ul li').at(1).prop('style').width).toEqual('60%')
    })
})
describe('SkeletonAvatarProps', () => {
    attrsTest({
        title: 'component: SkeletonAvatar, <test prop:: active>',
        Component: SkeletonAvatar,
        attrs: {
            active: true
        },
        selector: `.${prefixSkeleton}`,
        classnames: [`${prefixSkeleton}-active`]
    });
    ['circle', 'square'].forEach(item => {
        attrsTest({
            title: 'component: SkeletonAvatar, <test prop:: shape>',
            Component: SkeletonAvatar,
            attrs: {
                shape: item
            },
            selector: `.${prefixSkeleton}-avatar`,
            classnames: [`${prefixSkeleton}-avatar-${item}`]
        })
    })
    it('SkeletonAvatarProps: size', () => {
        let wrapper = mount(<Skeleton.Avatar />);
        wrapper.setProps({ size: 'large' })
        expect(wrapper.find(`.${prefixSkeleton}-avatar`).hasClass(`${prefixSkeleton}-avatar-lg`)).toEqual(true)
        wrapper.setProps({ size: 'small' })
        expect(wrapper.find(`.${prefixSkeleton}-avatar`).hasClass(`${prefixSkeleton}-avatar-sm`)).toEqual(true)
        wrapper.setProps({ size: 10 })
        expect(wrapper.find(`.${prefixSkeleton}-avatar`).prop('style').width).toEqual('10px')
        expect(wrapper.find(`.${prefixSkeleton}-avatar`).prop('style').height).toEqual('10px')
        expect(wrapper.find(`.${prefixSkeleton}-avatar`).prop('style').lineHeight).toEqual('10px')
    })
})
describe('SkeletonInputProps', () => {
    attrsTest({
        title: 'component: SkeletonInput, <test prop:: active>',
        Component: SkeletonInput,
        attrs: {
            active: true
        },
        selector: `.${prefixSkeleton}`,
        classnames: [`${prefixSkeleton}-active`]
    });
    it('SkeletonInputProps: size', () => {
        let wrapper = mount(<Skeleton.Input />);
        wrapper.setProps({ size: 'large' })
        expect(wrapper.find(`.${prefixSkeleton}-input`).hasClass(`${prefixSkeleton}-input-lg`)).toEqual(true)
        wrapper.setProps({ size: 'small' })
        expect(wrapper.find(`.${prefixSkeleton}-input`).hasClass(`${prefixSkeleton}-input-sm`)).toEqual(true)
        wrapper.setProps({ size: 10 })
        expect(wrapper.find(`.${prefixSkeleton}-input`).prop('style').width).toEqual('10px')
        expect(wrapper.find(`.${prefixSkeleton}-input`).prop('style').height).toEqual('10px')
        expect(wrapper.find(`.${prefixSkeleton}-input`).prop('style').lineHeight).toEqual('10px')
    })
})
describe('SkeletonButtonProps', () => {
    attrsTest({
        title: 'component: SkeletonButton, <test prop:: active>',
        Component: SkeletonButton,
        attrs: {
            active: true
        },
        selector: `.${prefixSkeleton}`,
        classnames: [`${prefixSkeleton}-active`]
    });
    attrsTest({
        title: 'component: SkeletonButton, <test prop:: block>',
        Component: SkeletonButton,
        attrs: {
            block: true
        },
        selector: `.${prefixSkeleton}`,
        classnames: [`${prefixSkeleton}-block`]
    });
    ['circle', 'round'].forEach(item => {
        attrsTest({
            title: 'component: SkeletonButton, <test prop:: shape>',
            Component: SkeletonButton,
            attrs: {
                shape: item
            },
            selector: `.${prefixSkeleton}-button`,
            classnames: [`${prefixSkeleton}-button-${item}`]
        })
    })
    it('SkeletonButtonProps: size', () => {
        let wrapper = mount(<Skeleton.Button />);
        wrapper.setProps({ size: 'large' })
        expect(wrapper.find(`.${prefixSkeleton}-button`).hasClass(`${prefixSkeleton}-button-lg`)).toEqual(true)
        wrapper.setProps({ size: 'small' })
        expect(wrapper.find(`.${prefixSkeleton}-button`).hasClass(`${prefixSkeleton}-button-sm`)).toEqual(true)
        wrapper.setProps({ size: 10 })
        expect(wrapper.find(`.${prefixSkeleton}-button`).prop('style').width).toEqual('10px')
        expect(wrapper.find(`.${prefixSkeleton}-button`).prop('style').height).toEqual('10px')
        expect(wrapper.find(`.${prefixSkeleton}-button`).prop('style').lineHeight).toEqual('10px')
    })
})
describe('SkeletonImageProps', () => {
    it('SkeletonImageProps exists', () => {
        let wrapper = mount(<Skeleton.Image />)
        expect(wrapper.exists(`.${prefixSkeleton}-image`)).toEqual(true)
    })
})
