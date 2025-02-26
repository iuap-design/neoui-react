/**
 *
 * @title 可折叠的展示板
 * @description 设置展示板Panel的collapsible属性设置可折叠
 *
 */

import {Button, Collapse} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo3 extends Component<{}, {open: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            open: true
        };
    }

    render() {
        return (
            <div>
                <Button colors="primary" onClick={() => this.setState({open: !this.state.open})}>
					click
                </Button>
                <Panel collapsible expanded={this.state.open}>
					”来玩躲猫猫啊~~“
                </Panel>
            </div>
        )
    }
}

export default Demo3;
