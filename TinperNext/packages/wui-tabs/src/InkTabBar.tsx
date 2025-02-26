/**
 * This source code is quoted from rc-tabs.
 * homepage: https://github.com/react-component/tabs
 */

// import PropTypes from 'prop-types';
// import React from 'react';
// import InkTabBarNode from './InkTabBarNode';
// import SaveRef from './SaveRef';
// import TabBarRootNode from './TabBarRootNode';
// import TabBarTabsNode from './TabBarTabsNode';
// import { InkTabBarProps } from './iTabs'

// const defaultProps = {
//     onTabClick: () => {
//     },
// }

// export default class InkTabBar extends React.Component<InkTabBarProps> {
//     static defaultProps = defaultProps
//     render() {
//         return (
//             <SaveRef>
//                 {(saveRef, getRef: (name: string) => HTMLElement) => (
//                     <TabBarRootNode saveRef={saveRef} {...this.props}>
//                         <TabBarTabsNode onTabClick={this.props.onTabClick} saveRef={saveRef} {...this.props} />
//                         <InkTabBarNode saveRef={saveRef} getRef={getRef} {...this.props} />
//                     </TabBarRootNode>
//                 )}
//             </SaveRef>
//         );
//     }
// }

// InkTabBar.propTypes = {
//     onTabClick: PropTypes.func,
// };

// InkTabBar.defaultProps = {
//     onTabClick: () => {
//     },
// };
