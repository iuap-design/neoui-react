/**
 *
 * @title 默认的展示板
 * @description 默认的展示板由header,body和footer组成。
 * @type bip
 */

import {Collapse} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo1 extends Component {
    render() {
        return (
            <div>
                <Panel header="Panel header" footer='Panel footer' fieldid={'collapse'}>
					Panel content
                </Panel>
            </div>

        )
    }
}


export default Demo1;
