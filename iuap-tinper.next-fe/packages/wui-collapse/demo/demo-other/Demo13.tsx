/**
 *
 * @title 一二级折叠
 * @description type增加lineFirstLevel、lineSecondLevel类型。
 * @type other
 */

import {Collapse} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo13 extends Component<{}, {activeKey: string}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeKey: '1'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(activeKey: string) {
        this.setState({activeKey});
    }

    render() {
        return (
            <div>
                <Collapse defaultActiveKey={this.state.activeKey} ghost={false} onChange={this.handleChange} type={'lineFirstLevel'}>
                    <Panel header="Panel 1" key="1" showArrow={true}>
                        <Collapse defaultActiveKey={'11'} ghost={false} type={'lineSecondLevel'}>
                            <Panel header="Panel 11" key="11" showArrow={true}>Panel 11
                                content</Panel>
                            <Panel header="Panel 22" key="22" showArrow={true}>Panel 22 content</Panel>
                        </Collapse>
                    </Panel>
                    <Panel header="Panel 2" key="2" showArrow={true}>Panel 2 content</Panel>
                </Collapse>
            </div>
        )
    }
}

export default Demo13;
