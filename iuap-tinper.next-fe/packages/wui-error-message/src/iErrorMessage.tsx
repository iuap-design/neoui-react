import React from 'react';
import { MessageProps } from '../../wui-message/src/iMessage';
import {ProviderLocale} from '../../wui-provider/src/iProvider';

export interface ErrorMessageProps extends Omit<MessageProps, 'content'> {
    title?: React.ReactNode;
    message?: React.ReactNode;
    content?: React.ReactNode;
    detailMsg?: React.ReactNode;
    footer?: React.ReactNode | ((node: React.ReactNode) => React.ReactNode);
    isCopy?: boolean;
    defaultShowContent?: boolean;
    errorInfo?: {code?: string; href?: string, displayCode?: string}; // displayCode 同 code
    traceId?: string;
    isReport?: boolean;
    uploadable?: 0 | 1;
    onReportClick?: () => Promise<Object>;
    onUploadClick?: () => Promise<Object>;
    level?: number;
    locale?: ProviderLocale;
    // contentMaxHeight?: number; // 改为高度自适应
    // isErrorcode?: boolean; // 不对外抛出，警告类不展示
}
