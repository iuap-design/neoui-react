// /**
//  * This source code is quoted from rc-tabs.
//  * homepage: https://github.com/react-component/tabs
//  */
// /* eslint-disable react/prefer-stateless-function */
// import React from 'react';
// import SaveRef from './SaveRef';
// import ScrollableTabBarNode from './ScrollableTabBarNode';
// import TabBarRootNode from './TabBarRootNode';
// import TabBarTabsNode from './TabBarTabsNode';

// export default class ScrollableTabBar extends React.Component {
//     render() {
//         return (
//             <SaveRef>
//                 {(saveRef, getRef) => (
//                     <TabBarRootNode saveRef={saveRef} {...this.props}>
//                         <ScrollableTabBarNode saveRef={saveRef} getRef={getRef} {...this.props}>
//                             <TabBarTabsNode saveRef={saveRef} {...this.props} />
//                         </ScrollableTabBarNode>
//                     </TabBarRootNode>
//                 )}
//             </SaveRef>
//         );
//     }
// }

