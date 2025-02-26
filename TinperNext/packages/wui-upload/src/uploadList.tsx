import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Animate from '../../wui-animate/src';
import {WebUI} from "../../wui-core/src/index"
import Icon from '../../wui-icon/src';
// import { getComponentLocale } from '../../wui-locale/src/tool';
import {getLangInfo} from "../../wui-locale/src/tool";
import ProgressBar from '../../wui-progress/src';
import i18n from './i18n.js';
// import { UploadListProps } from './interface';
import { UploadListProps, DefaultListArr } from './iUpload'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = (file: any, callback: (v: any)=>void) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
};

// const propTypes = {
//     listType: PropTypes.oneOf(['text', 'picture', 'picture-card']),
//     onPreview: PropTypes.func,
//     onRemove: PropTypes.func,
//     onDownload: PropTypes.func,
//     items: PropTypes.array,
//     progressAttr: PropTypes.object,
//     clsPrefix: PropTypes.string,
//     downloadText: PropTypes.string,
//     removeText: PropTypes.string,
//     showRemoveIcon: PropTypes.bool,
//     showDownloadIcon: PropTypes.bool,
//     progress: PropTypes.any,
//     showPreviewIcon: PropTypes.bool,
//     locale: PropTypes.any,
//     fieldid: PropTypes.string
// }

const defaultProps = {
    listType: 'text', // or picture
    progressAttr: {
        strokeWidth: 3,
        showInfo: false,
    },
    clsPrefix: 'u-upload',
    showRemoveIcon: false,
    showDownloadIcon: false,
    showPreviewIcon: true,
};

@WebUI({name: "upload", defaultProps})
class UploadList extends Component<UploadListProps> {
	file?: DefaultListArr

	handleClose = (file: DefaultListArr) => {
	    const onRemove = this.props.onRemove;
	    if (onRemove) {
	        let newFile = this.file || file
	        onRemove(newFile);
	    }
	}
	handleDownLoad = (file: DefaultListArr) => {
	    let {onDownload} = this.props
	    if (onDownload) {
	        onDownload(file);
	    }
	}

	handlePreview = (file: DefaultListArr, e: React.MouseEvent<HTMLElement>) => {
	    const {onPreview} = this.props;
	    if (!onPreview) {
	        return;
	    }
	    e.preventDefault();
	    return onPreview(file);
	}

	componentDidUpdate() {
	    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
	        return;
	    }
	    (this.props.items || []).forEach(file => {
	        if (typeof document === 'undefined' ||
				typeof window === 'undefined' ||
				// !(window as any).FileReader || !(window as any).File ||
				!window.FileReader || !window.File ||
				!(file.originFileObj instanceof File) ||
				file.thumbUrl !== undefined) {
	            return;
	        }
	        /*eslint-disable */
			file.thumbUrl = '';
			/* eslint-enable */
	        previewFile(file.originFileObj, (_previewDataUrl: string) => {
	            /*eslint-disable */
				// file.thumbUrl = _previewDataUrl;
				/* eslint-enable */
	            this.forceUpdate();
	        });
	    });
	}

	extname = (url: string = '') => {
	    const temp = url.split('/');
	    const filename = temp[temp.length - 1];
	    const filenameWithoutSuffix = filename.split(/#|\?/)[0];
	    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
	  };
	isImageFileType = (type: string): boolean => type.indexOf('image/') === 0;

	isImageUrl = (file: any): boolean => {
	    if (file.type) {
		  return this.isImageFileType(file.type);
	    }
	    const url: string = (file.thumbUrl || file.url) as string;
	    const extension = this.extname(url);
	    if (
		  /^data:image\//.test(url) ||
		  /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
	    ) {
		  return true;
	    }
	    if (/^data:/.test(url)) {
		  // other file types of base64
		  return false;
	    }
	    if (extension) {
		  // other file types which have extension
		  return false;
	    }
	    return true;
	  };

	onDragEnd = (result: object) => {
	    let { onDrag } = this.props
	    if (onDrag) {
	        onDrag(result)
	    }
	}

	render() {
	    const {
	        clsPrefix,
	        items = [],
	        listType,
	        showRemoveIcon,
	        showDownloadIcon,
	        showPreviewIcon,
	        progress,
	        locale,
	        fieldid,
	        showUploadList,
	        iconRender,
	        itemRender,
	        dragable,
	        disabled
	    } = this.props;
	    // const local = getComponentLocale(this.props, this.context, 'Upload', () => i18n);
	    const local = getLangInfo(locale, i18n, 'upload');
	    const list = items.map((file, index) => {
	        let progressNode: any;
	        let icon = <Icon type="uf-link"/>;

	        if (listType === 'picture' || listType === 'picture-card') {
	            if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
	                if (listType === 'picture-card') {
	                    icon = iconRender ? iconRender() : (file.thumbUrl || file.url) ? <a className={`${clsPrefix}-list-item-thumbnail`} target="_blank">{file?.thumbUrl && file?.url ? <img src={file.thumbUrl || file.url} alt={file.name}/> : null}</a> : this.isImageUrl(file) ? <Icon type="uf-picture" /> : <div
	                        className={`${clsPrefix}-list-item-uploading-text`}>{local.langMap.fileLoading}</div>;
	                } else {
	                    icon = iconRender ? iconRender() : (file.thumbUrl || file.url) ? <a className={`${clsPrefix}-list-item-thumbnail`} target="_blank"><img src={file.thumbUrl || file.url} alt={file.name}/></a> : this.isImageUrl(file) ? <Icon type="uf-picture" /> : <Icon className={`${clsPrefix}-list-item-thumbnail`} type="uf-file-o-2"/>;
	                }
	            } else {
	                // console.log('----file----', file)
	                icon = (
	                    <a
	                        className={`${clsPrefix}-list-item-thumbnail`}
	                        onClick={e => this.handlePreview(file, e)}
	                        href={file.url || file.thumbUrl}
	                        target="_blank"
	                        rel="noopener noreferrer"
	                    >
	                        {iconRender ? iconRender() : file.thumbUrl || file.url ? <img src={file.thumbUrl || file.url} alt={file.name}/> : <Icon type="uf-picture" />}
	                        {/* <img src={file.thumbUrl || file.url} alt={file.name}/> */}
	                    </a>
	                );
	            }
	        } else {
	            icon = iconRender ? iconRender() : icon
	        }

	        if (file.status === 'uploading') {
	            if (progress === null) {
	                progressNode = null
	            } else {
	                progressNode = (
	                    <ProgressBar size="sm" percent={parseInt(file.percent) == 100 ? 99.99 : file.percent} strokeWidth={progress?.strokeWidth}
									 strokeColor={progress?.strokeColor} format={progress?.format}/>
	                );
	            }
	        } else if (file.status === 'done') {
	            progressNode = (
	                <ProgressBar size="sm" percent={100} strokeWidth={progress?.strokeWidth}
								 strokeColor={progress?.strokeColor} format={progress?.format}/>
	            );
	            progressNode = null
	        }
	        const infoUploadingClass = classNames({
	            [`${clsPrefix}-list-item`]: true,
	            [`${clsPrefix}-list-item-${file.status}`]: true,
	        });
	        const preview = file.url ? (
	            <a
	                href={file.url}
	                target="_blank"
	                rel="noopener noreferrer"
	                className={`${clsPrefix}-list-item-name`}
	                onClick={e => this.handlePreview(file, e)}
	                title={file.name}
	            >
	                {file.name}
	            </a>
	        ) : (
	            <span
	                className={`${clsPrefix}-list-item-name`}
	                onClick={e => this.handlePreview(file, e)}
	                title={file.name}
	            >
	                {file.name}
	            </span>
	        );
	        const style: React.CSSProperties | undefined = (file.url || file.thumbUrl) ? undefined : {
	            pointerEvents: 'none',
	            opacity: 0.5,
	        };
	        const previewIcon = showPreviewIcon ? (
	            <span
	                // href={file.url || file.thumbUrl}
	                // target="_blank"
	                // rel="noopener noreferrer"
	                className={`${clsPrefix}-eye-o`}
	                style={style}
	                onClick={e => this.handlePreview(file, e)}
	            >
	                <Icon fieldid={fieldid ? fieldid + "-preview" : undefined} title={local.langMap.toview} type="uf-eye-o"/>
	            </span>
	        ) : null;
	        let newRemoveIcon = null
	        if (showUploadList && typeof showUploadList != "boolean" && showUploadList.removeIcon && typeof showUploadList.removeIcon != "string") {
	            this.file = file // 存储file，自定义时点击事件使用的参数
	            newRemoveIcon = React.cloneElement(showUploadList.removeIcon, {
	                title: this.props.removeText || local.langMap.remove,
	                onClick: this.handleClose,
	                className: `${clsPrefix}-customize-del-icon`
	            })
	        }
	        const removeIcon = showRemoveIcon ? (
	            newRemoveIcon ? newRemoveIcon :
	            <Icon type="uf-del" title={this.props.removeText || local.langMap.remove} fieldid={fieldid ? fieldid + "-del" : undefined}
					  onClick={() => this.handleClose(file)}/>
	        ) : null;
	        const downloadIcon = showDownloadIcon ? (
	            <Icon type="uf-download" title={this.props.downloadText || local.langMap.down} fieldid={fieldid ? fieldid + "-download" : undefined}
					  onClick={() => this.handleDownLoad(file)}/>
	        ) : null;
	        const removeIconClose = !showRemoveIcon ? (disabled ? null :
	            <Icon type="uf-close" title={this.props.removeText || local.langMap.remove} fieldid={fieldid ? fieldid + "-close" : undefined}
					  onClick={() => this.handleClose(file)}/>
	        ) : null;
	        const actions = (listType === 'picture-card' && file.status !== 'uploading') ? (
	            <span className={`${clsPrefix}-list-item-actions ${clsPrefix}-list-item-mask`}>
	                {previewIcon}
	                {removeIcon}
	            </span>
	        ) : (
	            <span className={`${clsPrefix}-list-item-actions`}>
	                {removeIcon}
	                {file.status === 'done' && downloadIcon}
	                {removeIconClose}
	            </span>
	        );
	        let iconNum = 'one'
	        if (showDownloadIcon) {
	            iconNum = 'two'
	        }
	        let cls = classNames({
	            [`${clsPrefix}-list-item-info`]: true,
	            [`${clsPrefix}-list-item-icon-num-${iconNum}`]: iconNum === 'two',
	        })

	        let item = (
	            dragable ? <Draggable key={file.uid + "_" + index} index={index} draggableId={file.uid + "_" + index}>
	                {(provided: any) => (
	                    // <div key={`${index}`} ref={provided.innerRef}
	                    //     {...provided.draggableProps}
	                    //     {...provided.dragHandleProps}
	                    //     // style={getItemStyle(
	                    //     //     snapshot.isDragging,
	                    //     //     provided.draggableProps.style
	                    //     // )}
	                    //     style={{...provided.draggableProps.style}}
	                    // >
	                        <div className={infoUploadingClass} key={file.uid + "_" + index} ref={provided.innerRef} {...provided.draggableProps}
	                        {...provided.dragHandleProps}>
	                            <div className={cls}>
	                                {icon}
	                                {preview}
	                                {actions}
	                            </div>
	                            {progressNode}
	                        </div>
	                        // {provided.placeholder}
	                    // </div>
	                )}
	            </Draggable> : (
	                <div className={infoUploadingClass} key={file.uid}>
	                    <div className={cls}>
	                        {icon}
	                        {preview}
	                        {actions}
	                    </div>
	                    {progressNode}
	                </div>
	            )
	        )

	        // console.log('itemRender=======', itemRender(item, file), file)
	        let listItemNode = itemRender ? itemRender(item, file, items, {
	            download: this.handleDownLoad.bind(null, file),
	            // preview: this.handlePreview.bind(null,file),
	            remove: this.handleClose.bind(null, file),
			  }) : item

	        // return (
	        //     <div className={infoUploadingClass} key={file.uid}>
	        //         <div className={`${clsPrefix}-list-item-info`}>
	        //             {icon}
	        //             {preview}
	        //             {actions}
	        //         </div>
	        //         {progressNode}
	        //     </div>
	        // );
	        return listItemNode
	    });
	    const listClassNames = classNames({
	        [`${clsPrefix}-list`]: true,
	        [`${clsPrefix}-list-${listType}`]: true,
	    });
	    return (
	        <Animate
	            transitionName={`${clsPrefix}-margin-top`}
	            component="div"
	            className={listClassNames}
	        >
	            {
	                dragable ? <DragDropContext onDragEnd={this.onDragEnd}>
	                    <Droppable droppableId="droppable" direction={listType === 'picture-card' ? 'horizontal' : 'vertical'}>
	                        {(provided: any) => (
	                            <div ref={provided.innerRef}
	                                {...provided.droppableProps}
	                                className={`${clsPrefix}-drag-box`}>
	                                {list}
	                                {provided.placeholder}
	                            </div>
	                        )}
	                    </Droppable>
	                </DragDropContext> : list
	            }
	            {/* {list} */}
	        </Animate>
	    );
	}
}

// UploadList.propTypes = propTypes;
export default UploadList;
