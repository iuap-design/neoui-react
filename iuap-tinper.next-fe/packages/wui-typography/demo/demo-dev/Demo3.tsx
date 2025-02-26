/**
 *
 * @title Typography 其他属性
 * @description 示例包含Typography.Paragraph disabled
 *
 */

import React from 'react';
import {
    Typography
} from '@tinper/next-ui';
const defaultText = `A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process. A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process.`;
const defaultConfig: any = {
    rows: 1,
    ellipsisStr: '...',
    // showPopover: false,
    // expandable: true,
    // defaultExpanded: false,
};

const Demo3 = () => {
    // const onExpand = (isExpand: boolean) => {
    //     console.log('isExpand', isExpand)
    // }
    return (
        <div>
            <Typography.Paragraph
                blockquote={true}
                fieldid={'test'}
                ellipsis={{
                    ...defaultConfig,
                    cssEllipsis: true,
                }}
            >
                {defaultText}
            </Typography.Paragraph>
        </div>
    );
};

export default Demo3;