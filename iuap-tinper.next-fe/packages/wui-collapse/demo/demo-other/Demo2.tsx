/**
 *
 * @title 手风琴效果的展示板组
 * @description 使用PanelGroup组件的accordion属性设置手风琴效果
 *
 */

import {Collapse} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo2 extends Component<{}, {activeKey: string}> {
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

                <Collapse defaultActiveKey={this.state.activeKey} accordion bordered={true} ghost={false}
						  onChange={this.handleChange}>
                    <Panel header="Panel 1" key="1" showArrow={true}>Panel 1 content</Panel>
                    <Panel header="Panel 2" key="2" showArrow={true}>Panel 2 content</Panel>
                </Collapse>

            </div>
        )
    }
}

export default Demo2;
