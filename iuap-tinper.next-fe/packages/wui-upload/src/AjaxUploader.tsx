/**
 * This source code is quoted from rc-upload.
 * homepage: https://github.com/react-component/upload
 */
import classNames from 'classnames';
import omit from "omit.js"
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import defaultRequest from './request.js';
import getUid from './uid.js';
import attrAccept from './attr-accept';
import traverseFileTree from './traverseFileTree';

import { AjaxUploaderProps, AjaxUploaderState, DefaultListArr } from './iUpload'
// export const propTypes = {
//     component: PropTypes.string,
//     style: PropTypes.object,
//     clsPrefix: PropTypes.string,
//     className: PropTypes.string,
//     multiple: PropTypes.bool,
//     disabled: PropTypes.bool,
//     accept: PropTypes.string,
//     listType: PropTypes.string,
//     fileList: PropTypes.array,
//     children: PropTypes.any,
//     onStart: PropTypes.func,
//     data: PropTypes.oneOfType([
//         PropTypes.object,
//         PropTypes.func,
//     ]),
//     headers: PropTypes.object,
//     defaultFileList: PropTypes.any,
//     beforeUpload: PropTypes.func,
//     customRequest: PropTypes.func,
//     withCredentials: PropTypes.bool,
//     mergeFiles: PropTypes.bool,
//     supportServerRender: PropTypes.bool,
//     action: PropTypes.string,
//     name: PropTypes.string,
//     onProgress: PropTypes.func,
//     onSuccess: PropTypes.func,
//     onError: PropTypes.func,
//     onChange: PropTypes.func,
//     size: PropTypes.number,
//     showUploadList: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
//     directory: PropTypes.any
// }

class AjaxUploader extends Component<AjaxUploaderProps, AjaxUploaderState> {
    constructor(props: AjaxUploaderProps) {
        super(props);
        this.reqs = {};
        this.state = {
            uid: getUid(),
        };
    }
    reqs: Record<string, any>;
    mounted: any;
    file: any;

    componentWillUnmount() {
        this.mounted = false;
        this.abort();
    }

    componentDidMount() {
        this.mounted = true;
    }

    onChange = (e: any)=> {
        const files = e.target.files;
        this.uploadFiles(files);
        this.reset();
    }

    onClick = ()=> {
        const el = this.file;
        if (!el) {
            return;
        }
        el.click();
        let cloneInput = this.file.cloneNode(true)
        document.body.appendChild(cloneInput)
    }

    onKeyDown = (e: React.KeyboardEvent<HTMLElement>)=> {
        if (e.key === 'Enter') {
            this.onClick();
        }
    }

    onFileDrop = (e: any)=> {
        if (e.type === 'dragover') {
            e.preventDefault();
            return;
        }

        if (this.props.directory) {
            traverseFileTree(Array.prototype.slice.call(e.dataTransfer.items), this.uploadFiles, function(_file: any) {
                return attrAccept(_file, '*');
            });
        } else {
            const files = e.dataTransfer.files;
            this.uploadFiles(files);
        }
        e.preventDefault();
    }

    uploadFiles = (files: DefaultListArr[])=> {
        const postFiles = Array.prototype.slice.call(files);
        const len = postFiles.length;
        const {mergeFiles} = this.props
        if (mergeFiles) {
            const file = {filesArray: postFiles, uid: getUid()}
            this.upload(file, postFiles)
        } else {
            for (let i = 0; i < len; i++) {
                const file = postFiles[i];
                file.uid = getUid();
                this.upload(file, postFiles);
            }
        }
    }

    upload = (file: DefaultListArr, fileList: DefaultListArr[])=> {
        const {props} = this;
        if (!props.beforeUpload) {
            // always async in case use react state to keep fileList
            return setTimeout(() => this.post(file), 0);
        }

        const before: any = props.beforeUpload(file, fileList);
        if (before && before.then) {
            before.then((processedFile: any) => {
                const processedFileType = Object.prototype.toString.call(processedFile);
                if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                    this.post(processedFile);
                } else {
                    this.post(file);
                }
            });
        } else if (before !== false) {
            setTimeout(() => this.post(file), 0);
        }
    }

    post = (file: DefaultListArr)=> {
        // if (!this.mounted) {
        //     return;
        // }
        const {props} = this;
        let {data, xsrf, action} = props;
        const {onStart} = props;
        if (typeof data === 'function') {
            data = data(file);
        }
        const {uid} = file;
        const request = props.customRequest || defaultRequest;
        let headerData = props.headers
        let xsrfSt = (window as any)?.tnsSdk?.readXscfToken()
        let headerKeyObj = (window as any)?.tnsSdk?.generateUriToken?.(action) || {}
        // if (window.top!.location!.origin == window.location!.origin) { // 不跨域的情况去掉withCredentials校验
        //     if (xsrf && xsrfSt != null) {
        //         Object.assign(headerData!, {'X-XSRF-TOKEN': xsrfSt})
        //     }
        // } else {
        //     if (xsrf && withCredentials && xsrfSt != null) {
        //         Object.assign(headerData!, {'X-XSRF-TOKEN': xsrfSt})
        //     }
        // }
        if (xsrf && xsrfSt != null) {
            Object.assign(headerData!, {'X-XSRF-TOKEN': xsrfSt}, headerKeyObj)
        }
        this.reqs[uid] = request({
            action: props.action,
            filename: props.name,
            file: file.filesArray || file,
            data,
            headers: headerData,
            withCredentials: props.withCredentials,
            onProgress: (e: any) => {
                props.onProgress?.(e, file);
            },
            onSuccess: (ret: any) => {
                delete this.reqs[uid];
                props.onSuccess?.(ret, file);
            },
            onError: (err: any, ret: any) => {
                delete this.reqs[uid];
                props.onError?.(err, ret, file);
            },
        });
        onStart?.(file);
    }

    reset = ()=> {
        this.setState({
            uid: getUid(),
        });
    }

    abort = (file?: any)=> {
        const {reqs} = this;
        if (file) {
            let uid = file;
            if (file && file.uid) {
                uid = file.uid;
            }
            if (reqs[uid] && reqs[uid].abort) {
                reqs[uid].abort();
            }
            delete reqs[uid];
        } else {
            Object.keys(reqs).forEach((uid) => {
                if (reqs[uid] && reqs[uid].abort) {
                    reqs[uid].abort();
                }
                delete reqs[uid];
            });
        }
    }

    render() {
        const {
            component: Tag, clsPrefix, className, disabled, style, multiple, accept, children, directory,
            ...others
        } = this.props;
        const cls = classNames({
            // [clsPrefix]: true,
            [`${clsPrefix}-inner`]: true,
            [`${clsPrefix}-disabled`]: disabled,
            [`${className}`]: className,
        });
        const events = disabled ? {} : {
            onClick: this.onClick,
            onKeyDown: this.onKeyDown,
            onDrop: this.onFileDrop,
            onDragOver: this.onFileDrop,
            tabIndex: '0',
        };
        return (
            <Tag
                {...events}
                className={cls}
                role="button"
                style={style}
                // {...others}
                {...omit(others, ["onRemove", "onPreview", "onDownload", "type", "multipart", "onReady", "onChange", "name",
                    "action", "headers", "data", "listType", "fileList", "size", "defaultFileList", "beforeUpload", "showUploadList",
                    "supportServerRender", "onStart", "onSuccess", "customRequest", "withCredentials", "mergeFiles", "xsrf"])}
            >
                {
                    directory ? (<input
                        type="file"
                        // ref="file"
                        // @ts-ignore webkitdirectory属性校验
                        webkitdirectory='true'
                        ref={el => (this.file = el)}
                        key={this.state.uid}
                        style={{display: 'none'}}
                        accept={accept}
                        multiple={multiple}
                        onChange={this.onChange}
                    />) : (<input
                        type="file"
                        // ref="file"
                        ref={el => (this.file = el)}
                        key={this.state.uid}
                        style={{display: 'none'}}
                        accept={accept}
                        multiple={multiple}
                        onChange={this.onChange}
                    />)
                }
                {children}
            </Tag>
        )
    }
}

// AjaxUploader.propTypes = propTypes;
export default AjaxUploader;
