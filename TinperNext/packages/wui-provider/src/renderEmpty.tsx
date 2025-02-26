// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import {ConfigConsumer} from './context';
import Empty from '../../wui-empty/src';

// const Empty = () => {
//     return (
//         <div>empty</div>
//     )
// }
const renderEmpty = (componentName?: string): React.ReactNode => (
    <ConfigConsumer>
        {() => {
            // const prefix = getPrefixCls('empty');

            switch (componentName) {
                case 'Table':
                case 'List':
                case 'Select':
                case 'TreeSelect':
                case 'Cascader':
                case 'Transfer':
                case 'Mentions':
                    return <Empty />;
                default:
                    return <Empty />;
            }
        }}
    </ConfigConsumer>
);

export default renderEmpty;
