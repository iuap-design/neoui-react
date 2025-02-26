/**
 *  @title 可拖拽标签
 *  @description 使用 react-dnd 实现标签可拖拽。
 *
 */

import {Tabs} from '@tinper/next-ui';
import React, {Component} from 'react';
import {DndProvider, DragSource, DropTarget} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const {TabPane} = Tabs;

interface TabNodeProps {
	connectDragSource: any;
	connectDropTarget: any;
	children: React.ReactNode|undefined;
}

// Drag & Drop node
class TabNode extends Component<TabNodeProps> {
    render() {
        const {connectDragSource, connectDropTarget, children} = this.props;
        return connectDragSource(connectDropTarget(children));
    }
}

const cardTarget = {
    drop(props: any, monitor: any) {
        const dragKey = monitor.getItem().index;
        const hoverKey = props.index;

        if (dragKey === hoverKey) {
            return;
        }

        props.moveTabNode(dragKey, hoverKey);
        monitor.getItem().index = hoverKey;
    },
};

const cardSource = {
    beginDrag(props: any) {
        return {
            id: props.id,
            index: props.index,
        };
    },
};

const WrapTabNode = DropTarget('DND_NODE', cardTarget, (connect: any) => ({
    connectDropTarget: connect.dropTarget(),
}))(
    DragSource('DND_NODE', cardSource, (connect: any, monitor: any) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))(TabNode),
);

interface TabsState9 {
	order: any[];
}

class DraggableTabs extends Component<{}, TabsState9> {
	state = {
	    order: [],
	};

	moveTabNode = (dragKey: any, hoverKey: any) => {
	    const newOrder: any[] = this.state.order.slice();
	    const {children} = this.props;

	    React.Children.forEach(children, (c: any) => {
	        if (newOrder.indexOf(c.key) === -1) {
	            newOrder.push(c.key);
	        }
	    });

	    const dragIndex = newOrder.indexOf(dragKey);
	    const hoverIndex = newOrder.indexOf(hoverKey);

	    newOrder.splice(dragIndex, 1);
	    newOrder.splice(hoverIndex, 0, dragKey);

	    this.setState({
	        order: newOrder,
	    });
	};

	renderTabBar = (props: any, DefaultTabBar: any) => (
	    <DefaultTabBar {...props}>
	        {(node: any) => (
	            <WrapTabNode key={node.key} index={node.key} moveTabNode={this.moveTabNode}>
	                {node}
	            </WrapTabNode>
	        )}
	    </DefaultTabBar>
	);

	render() {
	    const {order} = this.state;
	    const {children} = this.props;

	    const tabs: any[] = [];
	    React.Children.forEach(children, c => {
	        tabs.push(c);
	    });

	    const orderTabs = tabs.slice().sort((a, b) => {
	        const orderA = (order as any[]).indexOf(a.key);
	        const orderB = (order as any[]).indexOf(b.key);

	        if (orderA !== -1 && orderB !== -1) {
	            return orderA - orderB;
	        }
	        if (orderA !== -1) {
	            return -1;
	        }
	        if (orderB !== -1) {
	            return 1;
	        }

	        const ia = tabs.indexOf(a);
	        const ib = tabs.indexOf(b);

	        return ia - ib;
	    });
	    return (
	        <DndProvider backend={HTML5Backend}>
	            <Tabs renderTabBar={this.renderTabBar} {...this.props}>
	                {orderTabs}
	            </Tabs>
	        </DndProvider>
	    );
	}
}

class Demo9 extends Component {
    render() {
        return (
            <DraggableTabs>
                <TabPane tab="tab 1" key="1">
					Content of Tab Pane 1
                </TabPane>
                <TabPane tab="tab 2" key="2">
					Content of Tab Pane 2
                </TabPane>
                <TabPane tab="tab 3" key="3">
					Content of Tab Pane 3
                </TabPane>
            </DraggableTabs>
        )
    }
}

export default Demo9;
