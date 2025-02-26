import classnames from 'classnames';
import clipboard from 'copy-to-clipboard';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import Button from '../../wui-button/src';
import {WebUI, getNid} from "../../wui-core/src/index"
import Icon from '../../wui-icon/src';
import Input from '../../wui-input/src';
import {getLangInfo} from '../../wui-locale/src/tool';
import Modal from '../../wui-modal/src';
import Tooltip from '../../wui-tooltip/src';
import i18n from './i18n.js';

// text和target都写的时候，target无效。 text的cut改为copy。
// target可以传css3选择器
import { ClipboardProps, ClipboardState } from './iClipboard.js'
// const propTypes = {
//     action: PropTypes.oneOf(['copy', 'cut', null]),
//     text: PropTypes.string,
//     success: PropTypes.func,
//     error: PropTypes.func,
//     locale: PropTypes.object,
//     target: PropTypes.any,
//     fieldid: PropTypes.string
// };
const defaultProps = {
    action: 'copy',
    text: '',
    target: '',
    success: () => {
    },
    error: () => {
    },
    locale: 'zh-cn'
};

@WebUI({name: "clipboard", defaultProps})
class Clipboard extends Component<ClipboardProps, ClipboardState> {
    constructor(props: ClipboardProps) {
        super(props);
        this.state = {
            currect: false,
            html: '',
            ready: false,
            modalShow: false
        };
    }

	text: any;
	copyHandle = () => {
	    let {action, text, target, success, error, asyncCopy} = this.props;
	    let copyContent = ''
	    if (text) {
	        copyContent = text
	        action = 'copy'
	    } else {
	        if (target) {
	            if (action === 'copy') {
	                if (document.querySelector(target).tagName === 'INPUT' || document.querySelector(target).tagName === 'TEXTAREA') {
	                    copyContent = document.querySelector(target)?.value
	                } else {
	                    copyContent = document.querySelector(target)?.innerText
	                }
	            } else {
	                copyContent = document.querySelector(target)?.value
	                document.querySelector(target).value = ''
	            }
	        }
	    }
	    if (asyncCopy) {
	        asyncCopy(clipboard)
	    } else {
	        try {
	            if (clipboard(copyContent)) {
	                this.setState({
	                    currect: true,
	                    ready: true
	                });
	                if (success instanceof Function) success();
	            } else {
	                this.setState({
	                    modalShow: true,
	                    html: copyContent
	                });
	                // ReactDOM.findDOMNode(this.text)?.select();
	                if (error instanceof Function) error();
	            }
	        } catch (e) {
	            this.setState({
	                modalShow: true,
	                html: copyContent
	            });
	            // ReactDOM.findDOMNode(this.text).select();
	            if (error instanceof Function) error();
	        }
	    }
	}
	blur = () => {
	    this.setState({
	        currect: false,
	        ready: false
	    });
	}
	close = (e?: React.MouseEvent<HTMLElement>) => {
	    e!.stopPropagation()
	    this.setState({
	        modalShow: false
	    });
	}

	render() {
	    let {clsPrefix, action, fieldid, locale, className} = this.props;

	    const local = getLangInfo(locale, i18n, 'clipboard');
	    // let locale = getComponentLocale(this.props, this.context, 'Clipboard', () => i18n);
	    let tootipContent = local.langMap[action];
	    if (this.state.ready) {
	        tootipContent = local.langMap[`${action}Ready`]
	    }
	    let wrapperClass = classnames({
	        [`${clsPrefix}`]: true,
	        [`${className}`]: className
	    })
	    let adapterNid = getNid(this.props)

	    return (
	        <Tooltip className={`${clsPrefix}-tooltip`}
					 overlay={tootipContent}
					 placement="top">
	            <span
	                onClick={this.copyHandle}
	                onMouseOut={this.blur}
	                className={wrapperClass}
	                fieldid={fieldid}
	                {...adapterNid}>
	                {
	                    this.props.children ?
	                        this.props.children :
	                        (
	                            <Icon
	                                className={classnames({
	                                    'uf-correct': this.state.currect,
	                                    'uf-copy': !this.state.currect
	                                })}
	                            />
	                        )
	                }
	                <Modal show={this.state.modalShow} onCancel={this.close}>
	                    <Modal.Header closeButton>
	                        <Modal.Title> Ctrl+C {local.langMap.copyToClipboard} </Modal.Title>
	                    </Modal.Header>
	                    <Modal.Body>
	                        <Input ref={(el: HTMLElement) => this.text = el} type="text" readOnly value={this.state.html}/>
	                    </Modal.Body>
	                    <Modal.Footer>
	                        <Button onClick={this.close}> {local.langMap.close} </Button>
	                    </Modal.Footer>
	                </Modal>
	            </span>
	        </Tooltip>

	    )
	}
}
// Clipboard.propTypes = propTypes;
export default Clipboard;
