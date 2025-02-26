/**
 * This source code is quoted from rc-upload.
 * homepage: https://github.com/react-component/upload
 */
import omit from "omit.js"
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {WebUI} from "../../wui-core/src/index"
import AjaxUpload from './AjaxUploader';
// import IframeUpload from './IframeUploader';

import { UploadProps, UploadState } from './iUpload'
function empty() {
}

// const propTypes = {
//     component: PropTypes.string,
//     style: PropTypes.object,
//     clsPrefix: PropTypes.string,
//     action: PropTypes.string,
//     name: PropTypes.string,
//     multipart: PropTypes.bool,
//     onError: PropTypes.func,
//     onSuccess: PropTypes.func,
//     onProgress: PropTypes.func,
//     onStart: PropTypes.func,
//     data: PropTypes.oneOfType([
//         PropTypes.object,
//         PropTypes.func,
//     ]),
//     headers: PropTypes.object,
//     accept: PropTypes.string,
//     multiple: PropTypes.bool,
//     disabled: PropTypes.bool,
//     beforeUpload: PropTypes.func,
//     customRequest: PropTypes.func,
//     onReady: PropTypes.func,
//     withCredentials: PropTypes.bool,
//     supportServerRender: PropTypes.bool,
// }
const defaultProps = {
    component: 'span',
    data: {},
    headers: {},
    name: 'file',
    multipart: false,
    onProgress: empty,
    onReady: empty,
    onStart: empty,
    onError: empty,
    onSuccess: empty,
    supportServerRender: false,
    multiple: false,
    beforeUpload: null,
    customRequest: null,
    withCredentials: false,
}

@WebUI({name: "upload", defaultProps})
class Upload extends Component<UploadProps, UploadState> {

    constructor(props: UploadProps) {
        super(props);
        this.state = {
            Component: null,
        };
        this.getComponent = this.getComponent.bind(this);
        this.abort = this.abort.bind(this);
    }

    componentDidMount() {
        if (this.props.supportServerRender) {
            /* eslint react/no-did-mount-set-state:0 */
            this.setState({
                Component: this.getComponent(),
            }, this.props.onReady);
        }
    }

    getComponent() {
        // return typeof FormData !== 'undefined' ? AjaxUpload : IframeUpload;
        return AjaxUpload
    }

    inner: any
    abort(file: any) {
        this.inner.abort(file);
    }

    render() {
        if (this.props.supportServerRender) {
            const {Component} = this.state;
            if (Component) {
                return <Component {...omit(this.props, ["preventDefaultPreview", "enterDragger", "leaveDragger", "removeText", "downloadText", "fieldid"])}
								  ref={(el: HTMLElement) => (this.inner = el)}/>;
            }
            return null;
        }
        const Component = this.getComponent();
        return <Component {...omit(this.props, ["preventDefaultPreview", "enterDragger", "leaveDragger", "removeText", "downloadText", "fieldid"])}
						  ref={el => (this.inner = el)}/>;
    }
}

// Upload.propTypes = propTypes;
export default Upload;
