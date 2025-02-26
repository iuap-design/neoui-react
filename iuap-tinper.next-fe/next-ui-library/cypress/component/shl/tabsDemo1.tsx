import { Tabs } from '../../../../packages';
import React, {Component} from 'react';

const {TabPane} = Tabs;

class BaseDemo extends Component<any> {
    render() {
        return (
            <Tabs {...this.props}>
                <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
                <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        )
    }
}

export default BaseDemo;