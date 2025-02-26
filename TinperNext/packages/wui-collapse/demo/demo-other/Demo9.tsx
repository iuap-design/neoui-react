/**
 *
 * @title destroyInactivePanel属性
 * @description destroyInactivePanel属性，销毁折叠隐藏的面板。
 * @type other
 */

import {Collapse} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo9 extends Component<{}, {activeKey: string}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeKey: '1'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(activeKey: string) {
        console.log(activeKey)
        this.setState({activeKey});
    }

    render() {
        return (
            <div>

                <Collapse defaultActiveKey={this.state.activeKey} ghost={false} onChange={this.handleChange}
						  destroyInactivePanel={true}>
                    <Panel header="Panel 1" key="1" showArrow={true} forceRender={false}>Panel 1 content</Panel>
                    <Panel header="Panel 2" key="2" showArrow={true}>Panel 2 content</Panel>
                </Collapse>

            </div>
        )
    }
}

export default Demo9;
