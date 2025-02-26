// /**
//  * This source code is quoted from rc-upload.
//  * homepage: https://github.com/react-component/upload
//  */
// import classNames from 'classnames';
// import omit from "omit.js"
// // import PropTypes from 'prop-types';
// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import warning from 'warning';
// // import {propTypes as uploadPropTypes} from './AjaxUploader'
// import getUid from './uid.js';
// import { AjaxUploaderProps, IframeUploadState, DefaultListArr } from './iUpload'

// const IFRAME_STYLE = {
//     position: 'absolute' as const,
//     top: 0,
//     opacity: 0,
//     filter: 'alpha(opacity=0)',
//     left: 0,
//     zIndex: 9999,
// };

// // const propTypes = {
// //     ...uploadPropTypes,
// //     component: PropTypes.string,
// //     style: PropTypes.object,
// //     disabled: PropTypes.bool,
// //     clsPrefix: PropTypes.string,
// //     className: PropTypes.string,
// //     accept: PropTypes.string,
// //     onStart: PropTypes.func,
// //     multiple: PropTypes.bool,
// //     children: PropTypes.any,
// //     data: PropTypes.oneOfType([
// //         PropTypes.object,
// //         PropTypes.func,
// //     ]),
// //     action: PropTypes.string,
// //     name: PropTypes.string,
// // };

// // diferent from AjaxUpload, can only upload on at one time, serial seriously
// class IframeUploader extends Component<AjaxUploaderProps, IframeUploadState> {


//     constructor(props: AjaxUploaderProps) {
//         super(props);
//         this.file = {};
//         this.state = {
//             uploading: false,
//         };

//         this.onLoad = this.onLoad.bind(this);
//         this.onChange = this.onChange.bind(this);
//         this.getIframeNode = this.getIframeNode.bind(this);
//         this.getIframeDocument = this.getIframeDocument.bind(this);
//         this.getFormNode = this.getFormNode.bind(this);
//         this.getFormInputNode = this.getFormInputNode.bind(this);
//         this.getFormDataNode = this.getFormDataNode.bind(this);
//         this.getFileForMultiple = this.getFileForMultiple.bind(this);
//         this.getIframeHTML = this.getIframeHTML.bind(this);
//         this.initIframeSrc = this.initIframeSrc.bind(this);
//         this.initIframe = this.initIframe.bind(this);
//         this.endUpload = this.endUpload.bind(this);
//         this.startUpload = this.startUpload.bind(this);
//         this.updateIframeWH = this.updateIframeWH.bind(this);
//         this.abort = this.abort.bind(this);
//         this.post = this.post.bind(this);
//     }
//     file: any;
//     iframe: any;
//     domain: any;

//     componentDidMount() {
//         this.updateIframeWH();
//         this.initIframe();
//     }

//     componentDidUpdate() {
//         this.updateIframeWH();
//     }

//     onLoad() {
//         if (!this.state.uploading) {
//             return;
//         }
//         const {props, file} = this;
//         let response;
//         try {
//             const doc = this.getIframeDocument();
//             const script = doc.getElementsByTagName('script')[0];
//             if (script && script.parentNode === doc.body) {
//                 doc.body.removeChild(script);
//             }
//             response = doc.body.innerHTML;
//             props.onSuccess?.(response, file);
//         } catch (err) {
//             warning(false, 'cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
//             response = 'cross-domain';
//             props.onError?.(err, null, file);
//         }
//         this.endUpload();
//     }

//     onChange() {
//         const target = this.getFormInputNode();
//         // ie8/9 don't support FileList Object
//         // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
//         const file = this.file = {
//             uid: getUid(),
//             name: target.value,
//         };
//         this.startUpload();
//         const {props} = this;
//         if (!props.beforeUpload) {
//             return this.post(file);
//         }
//         const before: any = props.beforeUpload(file);
//         if (before && before.then) {
//             before.then(() => {
//                 this.post(file);
//             }, () => {
//                 this.endUpload();
//             });
//         } else if (before !== false) {
//             this.post(file);
//         } else {
//             this.endUpload();
//         }
//     }

//     getIframeNode() {
//         return this.iframe;
//     }

//     getIframeDocument() {
//         return this.getIframeNode().contentDocument;
//     }

//     getFormNode() {
//         return this.getIframeDocument().getElementById('form');
//     }

//     getFormInputNode() {
//         return this.getIframeDocument().getElementById('input');
//     }

//     getFormDataNode() {
//         return this.getIframeDocument().getElementById('data');
//     }

//     getFileForMultiple(file: DefaultListArr) {
//         return this.props.multiple ? [file] : file;
//     }

//     getIframeHTML(domain: any) {
//         let domainScript = '';
//         let domainInput = '';
//         if (domain) {
//             domainScript = `<script>document.domain="${domain}";</script>`;
//             domainInput = `<input name="_documentDomain" value="${domain}" />`;
//         }
//         return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <style>
//     body,html {padding:0;margin:0;border:0;overflow:hidden;}
//     </style>
//     ${domainScript}
//     </head>
//     <body>
//     <form method="post"
//     encType="multipart/form-data"
//     action="${this.props.action}" id="form"
//     style="display:block;height:9999px;position:relative;overflow:hidden;">
//     <input id="input" type="file"
//      name="${this.props.name}"
//      style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>
//     ${domainInput}
//     <span id="data"></span>
//     </form>
//     </body>
//     </html>
//     `;
//     }

//     initIframeSrc() {
//         if (this.domain) {
//             this.getIframeNode().src = `javascript:void((function(){
//         var d = document;
//         d.open();
//         d.domain='${this.domain}';
//         d.write('');
//         d.close();
//       })())`;
//         }
//     }

//     initIframe() {
//         const iframeNode = this.getIframeNode();
//         let win = iframeNode.contentWindow;
//         let doc;
//         this.domain = this.domain || '';
//         this.initIframeSrc();
//         try {
//             doc = win.document;
//         } catch (e) {
//             this.domain = document.domain;
//             this.initIframeSrc();
//             win = iframeNode.contentWindow;
//             doc = win.document;
//         }
//         doc.open('text/html', 'replace');
//         doc.write(this.getIframeHTML(this.domain));
//         doc.close();
//         this.getFormInputNode().onchange = this.onChange;
//     }

//     endUpload() {
//         if (this.state.uploading) {
//             this.file = {};
//             // hack avoid batch
//             // this.state.uploading = false;
//             this.setState({
//                 uploading: false,
//             });
//             this.initIframe();
//         }
//     }

//     startUpload() {
//         if (!this.state.uploading) {
//             // this.state.uploading = true;
//             this.setState({
//                 uploading: true,
//             });
//         }
//     }

//     updateIframeWH() {
//         const rootNode = ReactDOM.findDOMNode(this) as HTMLElement;
//         const iframeNode = this.getIframeNode();
//         iframeNode.style.height = `${rootNode?.offsetHeight}px`;
//         iframeNode.style.width = `${rootNode?.offsetWidth}px`;
//     }

//     abort(file?: any) {
//         if (file) {
//             let uid = file;
//             if (file && file.uid) {
//                 uid = file.uid;
//             }
//             if (uid === this.file.uid) {
//                 this.endUpload();
//             }
//         } else {
//             this.endUpload();
//         }
//     }

//     post(file: DefaultListArr) {
//         const formNode = this.getFormNode();
//         const dataSpan = this.getFormDataNode();
//         let {data} = this.props;
//         const {onStart} = this.props;
//         if (typeof data === 'function') {
//             data = data(file);
//         }
//         const inputs = [];
//         for (const key in data) {
//             if (data && data.hasOwnProperty(key)) {
//                 inputs.push(`<input name="${key}" value="${data[key]}"/>`);
//             }
//         }
//         dataSpan.innerHTML = inputs.join('');
//         formNode.submit();
//         dataSpan.innerHTML = '';
//         onStart?.(file);
//     }

//     render() {
//         const {
//             component: Tag, disabled, className, clsPrefix, children, style,
//             ...others
//         } = this.props;
//         const iframeStyle: React.CSSProperties = {
//             ...IFRAME_STYLE,
//             display: this.state.uploading || disabled ? 'none' : '',
//         };
//         const cls = classNames({
//             [`${clsPrefix}`]: true,
//             [`${clsPrefix}-disabled`]: disabled,
//             [`${className}`]: className,
//         });
//         return (
//             <Tag
//                 className={cls}
//                 style={{position: 'relative', zIndex: 0, ...style}}
//                 // {...others}
//                 {...omit(others, ["type", "multipart", "onReady", "onChange", "name",
//                     "action", "headers", "data", "listType", "fileList", "size", "defaultFileList", "beforeUpload", "showUploadList",
//                     "supportServerRender", "onStart", "onSuccess", "customRequest", "withCredentials"])}
//             >
//                 <iframe
//                     // ref="iframe"
//                     ref={el => (this.iframe = el)}
//                     onLoad={this.onLoad}
//                     style={iframeStyle}
//                     sandbox=""
//                 />
//                 {children}
//             </Tag>
//         )
//     }
// }

// // IframeUploader.propTypes = propTypes;
// export default IframeUploader;
