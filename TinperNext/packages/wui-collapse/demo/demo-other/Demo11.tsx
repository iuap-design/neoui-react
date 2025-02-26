/**
 *
 * @title collapse fieldid示例
 * @description fieldid属性，添加父子元素上。
 * @type other
 */

import {Collapse} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo11 extends Component {
    render() {
        return (
            <div>
                <Collapse ghost={false} fieldid={'collapse'} id={'collapseid'}>
                    <Panel header="Panel 1" key="1" showArrow={true} forceRender={false}>Panel 1 content</Panel>
                    <Panel header="Panel 2" key="2" showArrow={true} forceRender={true}>Panel 2 content</Panel>
                </Collapse>
            </div>

        )
    }
}


export default Demo11;
