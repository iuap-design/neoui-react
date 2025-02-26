// /**
//  * This source code is quoted from rc-util.
//  * homepage: https://github.com/react-component/util
//  */
// import React from 'react';
//
// export default function toArray(children) {
//     const ret = [];
//     React.Children.forEach(children, (c) => {
//         ret.push(c);
//     });
//     return ret;
// }
import toArray from 'rc-util/lib/Children/toArray';
export default toArray;
