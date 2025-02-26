/** Icon.tsx */
import React from 'react';
import Icon from '../src/index';
import {attrsTest} from '../../../next-ui-library/test/common/index';
import {prefix} from '../../wui-core/src/updatePrefix';
import { mount} from '../../../next-ui-library/test/common/mount'

const prefixIcon = `${prefix}-icon`;
const typeArr = ['uf-loadingstate', 'uf-danchuangtuozhuaijiaobiao', 'uf-star-3', 'uf-wechat', 'uf-histogram-arrow-up'];

describe('Component: Icon', () => {
    attrsTest({
        title: 'component: Icon, <test prop:: className>',
        Component: Icon,
        attrs: {
            className: 'test-class',
            type: "uf-loadingstate"
        },
        selector: `.${prefixIcon}`,
        classnames: ["test-class"]
    });
    attrsTest({
        title: 'component: Icon, <test prop:: fontName>',
        Component: Icon,
        attrs: {
            className: 'uf'
        },
        selector: `.${prefixIcon}`,
        classnames: ["uf"]
    });
    typeArr.forEach(item => {
        attrsTest({
            title: 'component: Icon, <test prop:: type>',
            Component: Icon,
            attrs: {
                type: item
            },
            selector: `.${prefixIcon}`,
            classnames: [item]
        });
    });
    it('rotate && style test, <test prop:: rotate>, <test prop:: style>', () => {
        let wrapper = mount(<Icon type="uf-xiayitiao-copy" style={{fontSize: '36px'}} rotate={90}></Icon>);
        expect(wrapper.find(`.${prefixIcon}`).prop('style').fontSize).toEqual('36px');
        expect(wrapper.find(`.${prefixIcon}`).prop('style').transform).toEqual('rotate(90deg)');
        expect(wrapper.find(`.${prefixIcon}`).prop('rotate')).toEqual('90');
    })
})
