// /**
//  * This source code is quoted from rc-util.
//  * homepage: https://github.com/react-component/util
//  */
// function createChainedFunction(...funcs) {
//   return funcs
//     .filter(f => f != null)
//     .reduce((acc, f) => {
//       if (typeof f !== 'function') {
//         throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
//       }
//
//       if (acc === null) {
//         return f;
//       }
//
//       return function chainedFunction(...args) {
//         acc.apply(this, args);
//         f.apply(this, args);
//       };
//     }, null);
// }
// export default createChainedFunction;
import createChainedFunction from 'rc-util/lib/createChainedFunction';

export default createChainedFunction;
