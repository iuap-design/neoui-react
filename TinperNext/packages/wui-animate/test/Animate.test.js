import {shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import Animate from '../src/Animate';
import { prefix } from '../../wui-core/src/updatePrefix';
xdescribe('Enzyme Shallow', function() {
    it('Animate should be exist', function() {
        let animate = shallow(<Animate/>);
        expect(animate.hasClass(`${prefix}-animate`)).toEqual(true);
    })
})
