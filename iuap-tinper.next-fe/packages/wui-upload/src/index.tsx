import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {getChildrenText, getNid, prefix} from "../../wui-core/src/index"
import {getLangInfo} from "../../wui-locale/src/tool";
import i18n from './i18n.js';
import Modal from '../../wui-modal/src'
import {WithConfigConsumer} from "../../wui-provider/src/context";
import getFileItem from './getFileItem';
import RcUpload from './Upload';
import UploadList from './uploadList';

import { EntranceProps, EntranceState, DefaultListArr } from './iUpload'
// import { UploadProps } from './interface';

function T() {
    return true;
}

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file: DefaultListArr) {
    return {
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.filename || file.name,
        size: file.size,
        type: file.type,
        uid: file.uid,
        response: file.response,
        error: file.error,
        percent: 0,
        originFileObj: file,
        status: '',
    };
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
function genPercentAdd() {
    let k = 0.1;
    const i = 0.01;
    const end = 0.98;
    return function(s: number) {
        let start = s;
        if (start >= end) {
            return start;
        }

        start += k;
        k = k - i;
        if (k < 0.001) {
            k = 0.001;
        }
        return start * 100;
    };
}

function Dragger(props: Partial<EntranceProps>) {
    // @ts-ignore
    return <Upload {...props} type="drag" style={{height: props.height}}/>;
}

Dragger.propTypes = {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// const File = {
//     uid: PropTypes.number,
//     size: PropTypes.number,
//     name: PropTypes.string,
//     lastModifiedDate: PropTypes.date,
//     url: PropTypes.string,
//     status: PropTypes.oneOf(['error', 'success', 'done', 'uploading', 'removed']),
//     percent: PropTypes.number,
//     thumbUrl: PropTypes.string,
//     // originFileObj: File
// }

// const UploadChangeParam = {
//     file: File,
//     fileList: PropTypes.array,
//     event: PropTypes.object
// }

// const propTypes = {
//     type: PropTypes.oneOf(['drag', 'select']),
//     name: PropTypes.string,
//     defaultFileList: PropTypes.array,
//     fileList: PropTypes.array,
//     action: PropTypes.string,
//     data: PropTypes.oneOfType([
//         PropTypes.object,
//         PropTypes.func
//     ]),
//     headers: PropTypes.oneOfType([
//         PropTypes.object,
//         PropTypes.string
//     ]),
//     showUploadList: PropTypes.any,
//     multiple: PropTypes.bool,
//     accept: PropTypes.string,
//     beforeUpload: PropTypes.func,
//     onChange: PropTypes.func,
//     listType: PropTypes.oneOf(['text', 'picture', 'picture-card']),
//     className: PropTypes.string,
//     onPreview: PropTypes.func,
//     onRemove: PropTypes.func,
//     preventDefaultPreview: PropTypes.bool,
//     supportServerRender: PropTypes.bool,
//     style: PropTypes.object,
//     disabled: PropTypes.bool,
//     clsPrefix: PropTypes.string,
//     enterDragger: PropTypes.func,
//     leaveDragger: PropTypes.func,
//     mergeFiles: PropTypes.bool,
//     removeText: PropTypes.string,
//     downloadText: PropTypes.string,
//     onDownload: PropTypes.func,
//     locale: PropTypes.string,
//     progress: PropTypes.object,
//     directory: PropTypes.bool,
//     fieldid: PropTypes.string,
//     uploadClassName: PropTypes.string
// }

const defaultProps = {
    clsPrefix: `${prefix}-upload`,
    type: 'select',
    multiple: false, // 是否支持多文件上传 兼容ie10以上
    action: '', // 上传的服务器地址
    data: {}, // 上传所需参数或返回上传参数的方法
    accept: '', // 接受上传的文件类型
    beforeUpload: T, // 上传文件之前的钩子
    showUploadList: true, // 是否展示文件列表, 可设为一个对象，用于单独设定 `showPreviewIcon`、 `showDownloadIcon` 和 `showRemoveIcon`
    listType: 'text', // or pictrue 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
    className: '',
    disabled: false, // 是否禁用，设置为 true 后前端禁止删除已上传文件
    supportServerRender: true, // 服务端渲染时需要打开这个
    preventDefaultPreview: false,
    enterDragger: () => {
    }, // 拖拽上传，当鼠标拖拽文件进入 Dragger 区域时触发
    leaveDragger: () => {
    }, // 拖拽上传，当鼠标拖拽文件离开 Dragger 区域时触发
    defaultFileList: [], // 默认已经上传的文件列表
    // fileList: [], // 已上传的文件列表,多用于onChange事件里
    headers: {}, // 设置上传的请求头部，IE10 以上有效
    name: 'file', // 发到后台的文件参数名
    onChange: () => {
    }, // 当上传状态改变之后执行的回调函数
    onRemove: () => {
    }, // 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除
    mergeFiles: false, // 是否合并上传文件数组
    removeText: '', // 移除文件的文本
    downloadText: '', // 下载文件的文本
    onPreview: () => {
    }, // 点击文件链接或预览图标时的回调
    onDownload: null,
    progress: {},
    directory: false,
    locale: 'zh-cn',
    xsrf: true,
    dragable: false
};

@WithConfigConsumer()
class Upload extends Component<EntranceProps, EntranceState> {
    // recentUploadStatus: boolean | PromiseLike<any>;
    // progressTimer: any;
    // refs: {
    //   [key: string]: any;
    //   upload: any;
    // };
	static Dragger = Dragger
	static defaultProps = defaultProps

	constructor(props: EntranceProps) {
	    super(props);
	    this.state = {
	        fileList: this.props.fileList || this.props.defaultFileList || [],
	        dragState: 'drop',
	        // startFlag: false
	        previewVisible: false,
	    	previewImage: '',
	    };
	    this.lastenter = null;
	}

	lastenter: any;
	customProgress: any;
	progressTimer: any;
	upload: any;
	// state = {
	//     previewVisible: false,
	//     previewImage: '',
	// }

	// beforeUpload=(file,fileList)=>{
	//   this.props.beforeUpload(file,this.state.fileList)
	// }

	onStart = (file: any) => {
	    let targetItem;
	    let nextFileList = this.state.fileList.concat();
	    if (file.length > 0) {
	        targetItem = file.map((f: any) => {
	            const fileObject = fileToObject(f);
	            fileObject.status = 'uploading';
	            return fileObject;
	        });
	        nextFileList = nextFileList.concat(targetItem);
	    } else {
	        targetItem = fileToObject(file);
	        targetItem.status = 'uploading';
	        nextFileList.push(targetItem as DefaultListArr);
	    }
	    // this.setState({
	    //   fileList: nextFileList,
	    //   startFlag: true
	    // })
	    this.onChange({
	        file: targetItem,
	        fileList: nextFileList,
	    });
	    // fix ie progress
	    // if (!(window as any).FormData) {
	    if (!window.FormData) {
	        this.autoUpdateProgress(0, targetItem);
	    }
	    if (this.customProgress && Object.keys(this.customProgress).length === 1) {
	        this.onProgress(this.customProgress, targetItem)
	    }
	}

	autoUpdateProgress(_: any, file: DefaultListArr) {
	    const getPercent = genPercentAdd();
	    let curPercent = 0;
	    this.progressTimer = setInterval(() => {
	        curPercent = getPercent(curPercent);
	        this.onProgress({
	            percent: curPercent,
	        }, file);
	    }, 200);
	}

	// removeFile(file: DefaultListArr) {
	//     let fileList = this.state.fileList;
	//     let targetItem = getFileItem(file, fileList);
	//     let index = fileList.indexOf(targetItem);
	//     if (index !== -1) {
	//         fileList.splice(index, 1);
	//         return fileList;
	//     }
	//     return null;
	// }

	onSuccess = (response: any, file: DefaultListArr) => {
	    this.clearProgressTimer();
	    try {
	        if (typeof response === 'string') {
	            response = JSON.parse(response);
	        }
	    } catch (e) { /* do nothing */
	    }
	    let fileList = this.state.fileList;
	    let targetItem = getFileItem(file, fileList);
	    // removed
	    if (!targetItem) {
	        return;
	    }
	    targetItem.status = 'done';
	    targetItem.response = response;
	    this.onChange({
	        file: targetItem,
	        fileList,
	    });
	}

	onProgress = (e: any, file: DefaultListArr) => {
	    this.customProgress = e
	    let fileList = this.state.fileList;
	    let targetItem = getFileItem(file, fileList);
	    // removed
	    if (!targetItem) {
	        return;
	    }
	    targetItem.percent = e.percent;
	    this.onChange({
	        event: e,
	        file: targetItem,
	        fileList: this.state.fileList,
	    });
	}

	onError = (error: any, response: any, file: DefaultListArr) => {
	    this.clearProgressTimer();
	    let fileList = this.state.fileList;
	    let targetItem = getFileItem(file, fileList);
	    // removed
	    if (!targetItem) {
	        return;
	    }
	    targetItem.error = error;
	    targetItem.response = response;
	    targetItem.status = 'error';
	    this.handleRemove(targetItem);
	}

	handleRemove(file: DefaultListArr) {
	    const {onRemove} = this.props;
	    const {fileList} = this.state;
	    const {status} = file;

		file.status = 'removed'; // eslint-disable-line

	    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then((ret: any) => {
	        // Prevent removing file
	        if (ret === false) {
	            file.status = status;
	            return;
	        }

	        const removedFileList = this.removeFileItem(file, fileList);
	        if (removedFileList) {
	            this.onChange({
	                file,
	                fileList: removedFileList,
	            });
	        }
	    });
	}

	removeFileItem(file: DefaultListArr, fileList: DefaultListArr[]) {
	    const matchKey = file.uid !== undefined ? 'uid' : 'name';
	    const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
	    if (removed.length === fileList.length) {
	        return null;
	    }
	    return removed;
	}

	handleManualRemove = (file: DefaultListArr) => {
	    this.upload.abort(file);
		file.status = 'removed'; // eslint-disable-line
	    this.handleRemove(file);
	}

	onChange = (info: any) => {
	    let {maxCount} = this.props
	    let cloneList = [...info.fileList]
	    if (!('fileList' in this.props)) {
	        if (maxCount === 1) {
	            cloneList = cloneList.slice(-1)
	        } else if (maxCount && maxCount != 1) {
	            cloneList = cloneList.slice(0, maxCount);
	        }
	        this.setState({fileList: cloneList});
	        // this.setState({fileList: info.fileList});
	    }

	    const onChange = this.props.onChange;
	    if (onChange) {
	        onChange(info);
	    }
	}

	// eslint-disable-next-line
	UNSAFE_componentWillReceiveProps(nextProps: EntranceProps) {
	    if ('fileList' in nextProps) {
	        this.setState({
	            fileList: nextProps.fileList || [],
	        });
	    }
	}

	onDragEnter = (e: React.MouseEvent<HTMLElement>) => {
	    this.lastenter = e.target; // 记录最后进入的元素
	    this.setState({
	        dragState: 'dragover'
	    })
	    // this.props.enterDragger()
	    let { enterDragger } = this.props
	    if (enterDragger) {
	        enterDragger()
	    }
	}

	onDragLeave = (e: React.MouseEvent<HTMLElement>) => {
	    // 如果此时退的元素是最后进入的元素，说明是真正退出了`drag-zone`元素
	    if (this.lastenter === e.target) {
	        this.setState({
	            dragState: e.type
	        })
	        e.stopPropagation();
	        e.preventDefault();
	        // this.props.leaveDragger()
	        let { leaveDragger } = this.props
	        if (leaveDragger) {
	            leaveDragger()
	        }
	    }
	}

	onFileDrop = (e: React.MouseEvent<HTMLElement>) => {
	    this.setState({
	        dragState: e.type
	    })
	    // this.props.leaveDragger()
	    let { leaveDragger } = this.props
	    if (leaveDragger) {
	        leaveDragger()
	    }
	}

	clearProgressTimer() {
	    clearInterval(this.progressTimer);
	}

	handlePreview = (file: any) => {
	    const {onPreview, preventDefaultPreview} = this.props;
	    var displayPreview = () => {
	        this.setState({
	            previewImage: file.url || file.thumbUrl,
	            previewVisible: true,
	        });
	    }

	    if (preventDefaultPreview === false) {
	        if (!file.url && !file.thumbUrl) {
	            getBase64(file.originFileObj).then(displayPreview)
	        } else {
	            displayPreview()
	        }
	    }

	    if (onPreview && Object.prototype.toString.call(onPreview) === "[object Function]") {
	        onPreview(file);
	    }


	}
	onDownload = (file: DefaultListArr) => {
	    let {onDownload} = this.props
	    if (typeof onDownload === 'function') {
	        onDownload(file);
	    } else if (file.url) {
	        window.open(file.url);
	    }
	}
	handleCancel = () => this.setState({previewVisible: false})

	render() {
	    const {
	        clsPrefix = '', showUploadList, listType,
	        type, disabled, children, className, removeText, downloadText, locale, progress, fieldid, uploadClassName, iconRender, itemRender, onDrag, dragable
	    } = this.props;
	    const {showRemoveIcon, showDownloadIcon, showPreviewIcon} = showUploadList as {
			showPreviewIcon?: boolean,
			showRemoveIcon?: boolean,
			showDownloadIcon?: boolean
		};
	    const {previewVisible, previewImage} = this.state

	    // QDJCJS-11718 多语改造适配<span></span>
	    let _removeText = getChildrenText(removeText).join('')
	    let _downloadText = getChildrenText(downloadText).join('')

	    let rcUploadProps = Object.assign({}, this.props, {
	        removeText: _removeText,
	        downloadText: _downloadText,
	        onStart: this.onStart,
	        onError: this.onError,
	        onProgress: this.onProgress,
	        onSuccess: this.onSuccess,
	        // beforeUpload:this.beforeUpload
	    });
	    // @ts-ignore
	    delete rcUploadProps.className;
	    // @ts-ignore
	    delete rcUploadProps.uploadClassName;

	    const uploadList = showUploadList ? (
	        <UploadList
	            listType={listType}
	            items={this.state.fileList}
	            onPreview={this.handlePreview}
	            onRemove={this.handleManualRemove}
	            removeText={_removeText}
	            downloadText={_downloadText}
	            showRemoveIcon={!disabled && showRemoveIcon}
	            showDownloadIcon={!disabled && showDownloadIcon}
	            onDownload={this.onDownload}
	            showPreviewIcon={showPreviewIcon}
	            locale={locale}
	            progress={progress}
	            fieldid={fieldid}
	            showUploadList={showUploadList}
	            iconRender = {iconRender}
	            itemRender={itemRender}
	            onDrag={onDrag}
	            dragable={dragable}
	            disabled={disabled}
	        />
	    ) : null;
	    let adapterNid = getNid(this.props) // 适配nid、uitype
	    let rootDomClass = classNames({
	        [`${clsPrefix}-wrapper`]: true,
	        [`${className}`]: className
	    })

	    if (type === 'drag') {
	        const dragCls = classNames(clsPrefix, {
	            [`${clsPrefix}-drag`]: true,
	            [`${clsPrefix}-drag-uploading`]: this.state.fileList.some(file => file.status === 'uploading'),
	            [`${clsPrefix}-drag-hover`]: this.state.dragState === 'dragover',
	            [`${clsPrefix}-disabled`]: disabled,
	            [`${uploadClassName}`]: uploadClassName
	        });
	        return (
	            <span className={rootDomClass} {...adapterNid} fieldid={fieldid}>
	                <div
			  className={dragCls}
			  onDrop={this.onFileDrop}
			  // onDragOver={this.onFileDrop}
			  onDragLeave={this.onDragLeave}
			  onDragEnter={this.onDragEnter}
		  >
	                    <RcUpload {...rcUploadProps} ref={el => (this.upload = el)} className={`${clsPrefix}-btn`}>
	                        <div className={`${clsPrefix}-drag-container`} fieldid={fieldid ? fieldid + "_drag_container" : undefined}>
	                            {children}
	                        </div>
	                    </RcUpload>
	                </div>
	                {uploadList}
	            </span>
	        );
	    }

	    const uploadButtonCls = classNames(clsPrefix, {
	        [`${clsPrefix}-select`]: true,
	        [`${clsPrefix}-select-${listType}`]: true,
	        [`${clsPrefix}-disabled`]: disabled,
	        [`${uploadClassName}`]: uploadClassName
	    });

	    const uploadButton = (
	        <div className={uploadButtonCls} style={{display: children ? '' : 'none'}} fieldid={fieldid} onDrop={this.onFileDrop} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter}>
	            <RcUpload {...rcUploadProps} ref={el => (this.upload = el)}/>
	        </div>
	    );

	    if (listType === 'picture-card') {
	        const local = getLangInfo(locale, i18n, 'upload');
	        return (
	            <div {...adapterNid} className={`${clsPrefix}-wrapper`}>
	                <span className={className}>
	                    {uploadList}
			  {uploadButton}
	                </span>
	                <Modal show={previewVisible} onHide={this.handleCancel} onOk={this.handleCancel} locale={locale}>
	                    <Modal.Header closeButton>
	                        <Modal.Title>{local.langMap.preview}</Modal.Title>
	                    </Modal.Header>
	                    <Modal.Body>
	                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
	                    </Modal.Body>
	                </Modal>
	            </div>

	        );
	    }
	    return (
	        <span className={rootDomClass} {...adapterNid}>
	            {uploadButton}
	            {uploadList}
	        </span>
	    );
	}
}

// Upload.propTypes = propTypes;
// Upload.defaultProps = defaultProps;
interface ComponentUpload extends React.ComponentClass<Partial<EntranceProps>> {
	Dragger: typeof Dragger;
}
Upload.Dragger = Dragger;
export default Upload as ComponentUpload;
