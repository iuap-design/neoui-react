/** index.tsx */
import React from "react";
import { attrsTest, testCustomStyle, testCustomeText } from '../../../next-ui-library/test/common/index';
import { prefix } from '../../wui-core/src/updatePrefix';
import Divider from "../src/index";
import { mount } from '../../../next-ui-library/test/common/mount';

const prefixDivider = `${prefix}-divider`;

describe('component: Divider', () => {
    ['left', 'right', 'center'].forEach(item => {
        it(`it should be orientation ${item}, <test prop:: orientation>`, () => {
            const divider = mount(<Divider>Text</Divider>);
            divider.setProps({ orientation: item });
            expect(divider.find(`.${prefixDivider}`).hasClass(`${prefixDivider}-with-text-${item}`)).toEqual(true)
        })
    });
});
['horizontal', 'vertical'].forEach(item => {
    attrsTest({
        title: 'component: Divider, <test prop:: type>',
        Component: Divider,
        attrs: {
            type: item
        },
        selector: `.${prefixDivider}`,
        classnames: [`${prefixDivider}-${item}`]
    });
});
attrsTest({
    title: 'component: Divider, <test prop:: className>',
    Component: Divider,
    attrs: {
        className: "name-of-divider"
    },
    selector: `.${prefixDivider}`,
    classnames: ['name-of-divider']
})
attrsTest({
    title: 'component: Divider, <test prop:: dashed>',
    Component: Divider,
    attrs: {
        dashed: true
    },
    selector: `.${prefixDivider}`,
    classnames: [`${prefixDivider}-dashed`]
})
testCustomeText({
    title: 'Comment: Divider, <test prop:: children>',
    Component: Divider,
    attrs: {
        children: <>1</>
    },
    selector: `.${prefixDivider}-inner-text`,
    text: '1'
})
testCustomStyle({
    title: 'component: Divider, <test prop:: style>',
    Component: Divider,
    attrs: {
        style: { 'border-color': 'yellow' }
    },
    selector: `.${prefixDivider}`,
    verifyStyle: { 'border-color': "yellow" }
})
