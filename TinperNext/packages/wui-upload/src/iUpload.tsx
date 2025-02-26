import React, {ReactElement} from 'react'
import type { BaseProps } from '../../wui-core/src/iCore';
export type TypeStr = 'select' | 'drag';
export type UploadListType = 'text' | 'picture' | 'picture-card' | string;
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed' | string;
export declare type BeforeUploadFileType = File | Blob | boolean | string;
// export type defaultListArr = {
//     uid?: number | string;
//     name?: string;
//     status?: string;
//     url?: string;
// }
export interface DefaultListArr<T = any> {
    uid: string | number;
    size?: number;
    name?: string;
    filename?: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    url?: string;
    status?: UploadFileStatus;
    percent?: number;
    thumbUrl?: string;
    originFileObj?: RcFile;
    response?: T;
    error?: any;
    linkProps?: any;
    type?: string;
    xhr?: T;
    preview?: string;
    filesArray?: any[];
}
export type ShowUploadListObj = {
    showPreviewIcon?: boolean;
    showRemoveIcon?: boolean;
    removeIcon?: React.ReactElement;
}
export interface HttpRequestHeader {
    [key: string]: string;
}
export type ProgressProps = {
    strokeWidth?: number;
    strokeColor?: string | {[key: string]: string};
    format?: (percent?: number) => string;
}

export interface RcFile extends File {
    uid: string;
}

export interface EntranceProps extends BaseProps {
    type?: TypeStr;
    name?: string;
    defaultFileList?: DefaultListArr[];
    fileList: DefaultListArr[];
    action?: string;
    data?: Record<string, unknown>;
    headers: Record<string, string>;
    showUploadList?: boolean | ShowUploadListObj;
    multiple?: boolean;
    accept?: string;
    beforeUpload?: (file: DefaultListArr, FileList: DefaultListArr[]) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>;
    onChange?: (e: any) => void;
    listType?: UploadListType;
    // className?: string;
    onPreview?: (file: DefaultListArr) => void;
    onRemove?: (file: DefaultListArr) => void;
    preventDefaultPreview?: boolean;
    supportServerRender?: boolean;
    // style?: React.CSSProperties;
    disabled?: boolean;
    // clsPrefix?: string;
    enterDragger?: (e?: any) => void;
    leaveDragger?: (e?: any) => void;
    mergeFiles?: boolean;
    removeText?: string | ReactElement;
    downloadText?: string | ReactElement;
    onDownload?: ((file: DefaultListArr) => void) | null;
    locale?: string;
    progress?: ProgressProps | null;
    directory?: boolean;
    // fieldid?: string;
    uploadClassName?: string;
    height?: number | string;
    customRequest?: (e?: any) => void;
    xsrf?: boolean;
    iconRender?: () => React.ReactElement;
    itemRender?: (originNode: React.ReactElement,
        file: DefaultListArr,
        fileList: Array<DefaultListArr>,
        actions: {
          download: () => void;
        //   preview: () => void;
          remove: () => void;
        }) => React.ReactNode;
    dragable: boolean;
    onDrag?: (result: object) => void;
    maxCount?: number | undefined;
}

export interface EntranceState {
    fileList: DefaultListArr[];
    dragState?: string;
    previewVisible?: boolean;
    previewImage?: string;
}

export interface DraggerProps {
    height?: number | string;
}

export interface UploadProps extends BaseProps {
    component?: any;
    // style?: React.CSSProperties;
    // clsPrefix?: string;
    action?: string;
    name?: string;
    multipart?: boolean;
    onError?: (error: any, response: any, file: DefaultListArr) => void;
    onSuccess?: (response: any, file: DefaultListArr) => void;
    onProgress?: (e: any, file: DefaultListArr) => void;
    onStart?: (file: DefaultListArr) => void;
    data?: Record<string, unknown>;
    headers?: Record<string, string>;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    beforeUpload?: (file: RcFile, FileList: RcFile[]) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>;
    customRequest?: (e?: any) => void;
    onReady?: () => void;
    withCredentials?: boolean;
    supportServerRender?: boolean;
    preventDefaultPreview?: boolean;
    enterDragger?: () => void;
    leaveDragger?: () => void;
    removeText?: string;
    downloadText?: string;
}

export interface UploadState {
    Component?: any;
}

export interface UploadListProps extends BaseProps {
    listType?: UploadListType;
    onPreview?: (file: DefaultListArr) => void;
    onRemove?: (file: DefaultListArr) => void;
    onDownload?: (file: DefaultListArr) => void;
    items?: any[];
    progressAttr?: {
        strokeWidth?: Number,
        showInfo?: Boolean
    };
    // clsPrefix?: string;
    downloadText?: string;
    removeText?: string;
    showRemoveIcon?: boolean;
    showDownloadIcon?: boolean;
    progress?: Record<string, any> | null;
    showPreviewIcon?: boolean;
    locale?: string;
    // fieldid?: string;
    showUploadList?: boolean | ShowUploadListObj;
    iconRender?: () => React.ReactElement;
    itemRender?: (originNode: React.ReactElement,
        file: DefaultListArr,
        fileList: Array<DefaultListArr>,
        actions: {
          download: () => void;
        //   preview: () => void;
          remove: () => void;
        }) => React.ReactNode;
    dragable: boolean;
    onDrag?: (result: object) => void;
    disabled?: boolean;
}

export interface AjaxUploaderProps extends BaseProps {
    component?: any;
    // style?: React.CSSProperties;
    // clsPrefix?: string;
    // className?: string;
    multiple?: boolean;
    disabled?: boolean;
    accept?: string;
    listType?: string;
    fileList?: DefaultListArr[];
    // children?: any;
    onStart?: (file: DefaultListArr) => void;
    // data?: Record<string, unknown> | ((file: defaultListArr<any>) => Record<string, unknown> | Promise<Record<string, unknown>>);
    data?: any;
    headers?: Record<string, string>;
    defaultFileList?: DefaultListArr[];
    beforeUpload?: (file: DefaultListArr, FileList?: DefaultListArr[]) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>;
    customRequest?: (e?: any) => void;
    withCredentials?: boolean;
    mergeFiles?: boolean;
    supportServerRender?: boolean;
    action?: string;
    name?: string;
    onProgress?: (e: any, file: DefaultListArr) => void;
    onSuccess?: (ret: any, file: DefaultListArr) => void;
    onError?: (err: any, ret: any, file: DefaultListArr) => void;
    onChange?: (e: any) => void;
    size?: number;
    showUploadList?: boolean | ShowUploadListObj;
    directory?: boolean;
    onRemove?: (file: DefaultListArr) => void;
    onPreview?: (file: DefaultListArr) => void;
    onDownload?: (file: DefaultListArr) => void;
    type?: string;
    multipart?: boolean;
    onReady?: () => void;
    xsrf?: boolean;
}

export interface AjaxUploaderState {
    uid?: string;
}

export interface IframeUploadState {
    uploading?: boolean;
}