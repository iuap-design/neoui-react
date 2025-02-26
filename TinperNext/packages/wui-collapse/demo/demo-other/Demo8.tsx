/**
 *
 * @title expendIcon 属性
 * @description expendIcon属性，自定义切换图标。
 * @type other
 */

import {Collapse, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo8 extends Component<{}, {activeKey: string}> {
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
						  expandIcon={(props: any) => {
							  console.log("aaa--->", props)
							  return <Icon type="uf uf-qq" rotate={props.isActive ? 90 : 0}/>
						  }}>
                    <Panel header="Panel 1" key="1" showArrow={true}>Panel 1 content</Panel>
                    <Panel header="Panel 2" key="2" showArrow={true}>Panel 2 content</Panel>
                </Collapse>

            </div>
        )
    }
}

export default Demo8;
