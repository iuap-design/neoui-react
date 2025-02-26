import React, { PropsWithChildren } from 'react';
import { isObject } from './util';
import { OperationsProps, EllipsisConfig } from './iTypography';


export default function Operations(props: PropsWithChildren<OperationsProps>) {
    const {
        ellipsis,
        expanding,
        onClickExpand,
        forceShowExpand,
        isEllipsis,
        local,
        prefixCls,
        disabled,
        fieldid,
    } = props;


    const ellipsisConfig = isObject(ellipsis) ? ellipsis as EllipsisConfig : {};

    const expandNodes = Array.isArray(ellipsisConfig.expandNodes)
        ? ellipsisConfig.expandNodes
        : [local.langMap.fold, local.langMap.unfold];


    const onKeyDown = (e: React.KeyboardEvent<Element>) => {
        const keyCode = e.keyCode || e.which;
        if (keyCode == 13) {
            onClickExpand && onClickExpand(e)
        }
    }
    // console.log('isEllipsis', forceShowExpand || (ellipsisConfig.expandable && isEllipsis))
    const ellipsisElement =
    forceShowExpand || (ellipsisConfig.expandable && isEllipsis) ? (
        <a
            className={`${prefixCls}-operation-expand`}
            onClick={onClickExpand}
            tabIndex={0}
            onKeyDown={onKeyDown}
            disabled={disabled}
            fieldid={fieldid && `${fieldid}-expand`}
        >
            {expanding ? expandNodes[0] : expandNodes[1]}
        </a>
    ) : null;

    return (
        <>
            {ellipsisElement}
        </>
    );
}
