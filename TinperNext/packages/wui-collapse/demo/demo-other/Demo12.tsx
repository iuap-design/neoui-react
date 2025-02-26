/**
 *
 * @title 折叠面板类型
 * @description type属性，设置为list和card两种面板类型。
 * @type other
 */

import {Collapse, Button} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo12 extends Component<{}, {activeKey: string, type: "list" | 'card'}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeKey: '1',
            type: 'list'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(activeKey: string) {
        this.setState({activeKey});
    }

    onChangeType = (type: any) => {
        this.setState({
            type
        })
    }

    render() {
        return (
            <div>
                <div style={{ marginBottom: '20px' }}>
	                <Button onClick={this.onChangeType.bind(this, 'list')} style={{marginRight: '10px'}}>list</Button>
	                <Button onClick={this.onChangeType.bind(this, 'card')} style={{marginRight: '10px'}}>card</Button>
                    <Button onClick={this.onChangeType.bind(this, 'default')}>default</Button>
	            </div>
                <Collapse defaultActiveKey={this.state.activeKey} ghost={false} onChange={this.handleChange} type={this.state.type}>
                    <Panel header="Panel 1" key="1" showArrow={true}>Panel 1
						content</Panel>
                    <Panel header="Panel 2" key="2" showArrow={true}>Panel 2 content</Panel>
                </Collapse>

            </div>
        )
    }
}

export default Demo12;
