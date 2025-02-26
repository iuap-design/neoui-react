/**
 *
 * @title panel面板forceRender属性
 * @description forceRender属性，被隐藏时是否渲染 DOM 结构。
 * @type other
 */

import {Collapse} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo10 extends Component {
    render() {
        return (
            <div>
                <Collapse ghost={false}>
                    <Panel header="Panel 1" key="1" showArrow={true} forceRender={false}>Panel 1 content</Panel>
                    <Panel header="Panel 2" key="2" showArrow={true} forceRender={true}>Panel 2 content</Panel>
                </Collapse>
            </div>

        )
    }
}


export default Demo10;
