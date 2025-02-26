/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
// import addDOMEventListener from 'add-dom-event-listener';
// import ReactDOM from 'react-dom';
//
// export default function addEventListenerWrap(target, eventType, cb) {
//     /* eslint camelcase: 2 */
//     const callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
//         ReactDOM.unstable_batchedUpdates(cb, e);
//     } : cb;
//     return addDOMEventListener(target, eventType, callback);
// }

import addEventListener from 'rc-util/lib/Dom/addEventListener';
export default addEventListener;
