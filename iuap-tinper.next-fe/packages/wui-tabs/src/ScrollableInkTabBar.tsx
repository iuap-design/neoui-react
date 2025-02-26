/**
 * This source code is quoted from rc-tabs.
 * homepage: https://github.com/react-component/tabs
 */
// import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import InkTabBarNode from './InkTabBarNode';
import SaveRef from './SaveRef';
import ScrollableTabBarNode from './ScrollableTabBarNode';
import TabBarRootNode from './TabBarRootNode';
import TabBarTabsNode from './TabBarTabsNode';
import { ScrollableInkTabBarProps, TabBarTabsNodeProps } from './iTabs'

export default class ScrollableInkTabBar extends React.Component<ScrollableInkTabBarProps> {
    componentDidMount() {
        ReactDOM.findDOMNode(this)?.addEventListener('DNDclick', (e: any) => {
            if (e && e.detail && e.detail.key) {
                this.props.onTabClick?.call(this, e.detail.key)
            }
        });
    }

    componentWillUnmount() {
        ReactDOM.findDOMNode(this)?.removeEventListener('DNDclick', (e: any) => {
            if (e && e.detail && e.detail.key) {
                this.props.onTabClick?.call(this, e.detail.key)
            }
        });
    }

    render() {
        const {children: renderTabBarNode, ...restProps} = this.props;
        return (
            <SaveRef>
                {(saveRef, getRef: (name: string) => HTMLElement) => (
                    <TabBarRootNode saveRef={saveRef} {...restProps}>
                        <ScrollableTabBarNode saveRef={saveRef} getRef={getRef} {...restProps}>
                            <TabBarTabsNode saveRef={saveRef} renderTabBarNode={renderTabBarNode as TabBarTabsNodeProps['renderTabBarNode']} {...restProps} />
                            <InkTabBarNode saveRef={saveRef} getRef={getRef} {...restProps} />
                        </ScrollableTabBarNode>
                    </TabBarRootNode>
                )}
            </SaveRef>
        );
    }
}

// ScrollableInkTabBar.propTypes = {
//     children: PropTypes.func,
//     onTabClick: PropTypes.func,
// };
