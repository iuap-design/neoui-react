import classnames from 'classnames';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Animate from '../../wui-animate/src';
import {Warning, prefix} from "../../wui-core/src";
import createChainedFunction from '../../wui-core/src/createChainedFunction';
import {WebUI} from "../../wui-core/src/index";
import addEventListener from '../../wui-overlay/src/utils/addEventListener';
import {AddEventLReturn} from '../../wui-overlay/src/utils/IUtils';
import ownerDocument from '../../wui-overlay/src/utils/ownerDocument';
import Notice from './Notice';
import {NewInstanceCb, NoticeProps, NotificationProps} from './iNotification';
import { OrNull } from '../../wui-core/src/utils/type';

const {isShouldUpdate} = Warning;
let seed = 0;
const now = Date.now();
let maxCount: number | undefined;

function getUuid() {
    return `uNotification_${now}_${seed++}`;
}

const defaultProps = {
    animation: 'fade',
    keyboard: true,
    position: 'topRight',
    // show: false,
    clsPrefix: "",
    transitionName: "",
    transition: true,
    destroyWithKey: false,
    onEscapeKeyUp: () => {
    }
}

class BaseNotification extends Component<NotificationProps, {notices: NoticeProps[]}> {
    constructor(props: NotificationProps) {
        super(props);
        this.state = {
            notices: []
        };
    }
    public _onDocumentKeyupListener: OrNull<AddEventLReturn> = null;

    public componentDidMount() {
        // 给document绑定keyup事件
        let doc = ownerDocument(this);
        this._onDocumentKeyupListener =
			addEventListener(doc, 'keyup', this.handleDocumentKeyUp);
    }
    public handleDocumentKeyUp = (e: React.KeyboardEvent) => {
	    if (this.props.keyboard && e.keyCode === 27 && this.state.notices.length) {
	        this.setState(previousState => {
	            previousState.notices.shift()
	            return {
	                notices: previousState.notices,
	            };
	        });
	        if (this.props.onEscapeKeyUp) {
	            this.props.onEscapeKeyUp(e);
	        }
	    }
    }
    componentWillUnmount() {
        this._onDocumentKeyupListener!.remove();
        this._onDocumentKeyupListener = null;
    }

    getTransitionName() {
        const props = this.props;
        let transitionName = props.transitionName;
        if (!transitionName && props.animation) {
            transitionName = `${props.clsPrefix}-${props.animation}`;
        }
        return transitionName;
    }

    add = (notice: NoticeProps) => {
        const maxcount = this.props.maxCount || maxCount;
        const key = notice.key = notice.key || getUuid();
        this.setState(previousState => {
            let notices = previousState.notices;
            if (maxcount && (maxcount == notices.length)) {
                notices = notices.slice(1)
            }
            if (!notices.filter(v => v.key === key).length) {
                return {
                    notices: notices.concat(notice),
                };
            }
        });
    }
    remove = (key: string | number) => {
        this.setState(previousState => {
            return {
                notices: previousState.notices.filter(notice => notice.key !== key),
            };
        });
    }
    isKeyInNotices = (key: string | number) => {
        return this.state.notices.some(notice => notice.key !== null && notice.key !== undefined && notice.key === key)
    }
    handleClose(key: string) {
        let that = this
        if (key && that.state.notices.length > 0) {
            let newArr = that.state.notices
            // console.log(newArr.findIndex(item => item.key === key))
            let keyArr = newArr.map(res => res.key)
            if (keyArr.includes(key)) {
                newArr.splice(newArr.findIndex(item => item.key === key), 1)
            }
            that.setState({
                notices: newArr
            })
        }
    }

    clear = () => {
        let that = this
        that.setState({
            notices: []
        })
    }

}

@WebUI({name: "notification", defaultProps})
class Notification extends BaseNotification {

    static defaultProps = defaultProps;
    static clear: () => void;
    static handleClose: (key: string) => void;
    static add: (notice: NoticeProps) => void;
    static newInstance: (notice: NotificationProps, callback: NewInstanceCb, isMessage?: boolean) => void;
    static success: (notice: NoticeProps) => void;
    static info: (notice: NoticeProps) => void;
    static warning: (notice: NoticeProps) => void;
    static warn: (notice: NoticeProps) => void;
    static error: (notice: NoticeProps) => void;
    static open: (notice: NoticeProps) => void;
    static close: (key: string) => void;
    static destroy: () => void;
    // _onDocumentKeyupListener: OrNull<AddEventLReturn> = null;
    constructor(props: NotificationProps) {
        super(props);
        // this.state = {
        //     notices: []
        // };
        // this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        // Notification.remove = this.remove.bind(this);
        Notification.clear = this.clear.bind(this);
        Notification.add = this.add.bind(this);
        Notification.handleClose = this.handleClose.bind(this);

    }
    renderContent = (noticeNodes: React.JSX.Element[]) => {
        const transitionName = this.getTransitionName();
        if (this.props.transition) {
	        return <Animate transitionName={transitionName}>{noticeNodes}</Animate>
        }
        return noticeNodes
    }
    render() {
	    const {
	        clsPrefix,
	        className,
	        position,
	        placement,
	        fieldid,
	        style,
	    } = this.props;
	    isShouldUpdate("Notification", this.props);
	    const noticeNodes = this.state.notices.map((notice) => {
	        const onClose = createChainedFunction(this.remove.bind(this, notice.key), notice.onClose);
	        const text = notice.content ? notice.content : notice.description;
	        return (<Notice
	            key={text as string}
	            clsPrefix={clsPrefix}
	            {...notice}
	            onClose={onClose}
	        >
	            {text}
	        </Notice>);
	    });
	    const classes = {
	        [clsPrefix as string]: 1,
	        [className ?? ""]: !!className,
	    };
	    if (placement || position) {
	        classes[`${clsPrefix}-${placement || position}`] = !!(placement || position);
	    }

	    return (
	        <div className={classnames(classes)} fieldid={fieldid || this.state.notices?.[0]?.fieldid} style={style}>
                {this.renderContent(noticeNodes)}
	        </div>
	    );
    }
}

class NotificationM extends BaseNotification {
    constructor(props: NotificationProps) {
        super(props);
    }

    renderContent = (noticeNodes: React.JSX.Element[]) => {
        const transitionName = this.getTransitionName();
        if (this.props.transition) {
	        return <Animate transitionName={transitionName}>{noticeNodes}</Animate>
        }
        return noticeNodes
    }
    render() {
	    const {
	        clsPrefix,
	        className,
	        position,
	        placement,
	        fieldid,
	        style,
	    } = this.props;
	    isShouldUpdate("Notification", this.props);
	    const noticeNodes = this.state.notices.map((notice) => {
	        const onClose = createChainedFunction(this.remove.bind(this, notice.key), notice.onClose);
	        const text = notice.content ? notice.content : notice.description;
	        return (<Notice
	            key={text as string}
	            clsPrefix={clsPrefix}
	            {...notice}
	            onClose={onClose}
	        >
	            {text}
	        </Notice>);
	    });
	    const classes = {
	        [clsPrefix as string]: 1,
	        [className ?? ""]: !!className,
	    };
	    if (placement || position) {
	        classes[`${clsPrefix}-${placement || position}`] = !!(placement || position);
	    }

	    return (
	        <div className={classnames(classes)} fieldid={fieldid || this.state.notices?.[0]?.fieldid} style={style}>
                {this.renderContent(noticeNodes)}
	        </div>
	    );
    }
}
export { NotificationM }

Notification.newInstance = function newNotificationInstance(props = {}, callback, isMessage) {
    maxCount = props.maxCount
    if (typeof callback !== 'function') {
        // eslint-disable-next-line no-console
        console.error('You must introduce callback as the second parameter of Notification.newInstance().')
        return
    }
    const {getPopupContainer, container: propsContainer, getContainer, ...others} = props
    let container = getPopupContainer || propsContainer || getContainer || document.body;
    if (typeof container == 'function') {
        container = (container as (node?: HTMLElement | undefined) => HTMLElement)()
    }

    const div = document.createElement('div');
    container.appendChild(div);

    let called = false;

    function ref(notification: Notification) {
        if (called) {
            return;
        }
        called = true;
        callback({
            notice(noticeProps) {
                notification.add(noticeProps);
            },
            removeNotice(key) {
                notification.remove(key);
            },
            component: notification,
            destroy() {
                const notices = notification.state.notices;
                if (notices.every(notice => !notice.destroyWithKey)) {
                    ReactDOM.unmountComponentAtNode(div);
                    try {
                        (container as HTMLElement).removeChild(div); // QDJCJS-25253 修复message挂载在页签内，刷新后实例仍存在，导致不再显示新消息的问题
                    } catch (e) {
                        // Do nothing
                    }
                    return false;
                }
                notices.forEach((notice, index) => {
                    if (!notice.destroyWithKey) {
                        const messageDom = div.querySelectorAll(`.${prefix}-message-notice`)[index]
                        ReactDOM.unmountComponentAtNode(messageDom);
                        div.children[0].removeChild(messageDom);
                    }

                });
                return true
            },
            isKeyInNotices(key) {
                return notification.isKeyInNotices(key)
            }
        });
    }
    const renderDom = isMessage ? <NotificationM {...others} ref={ref}/> : <Notification {...others} ref={ref}/>;
    ReactDOM.render(renderDom, div);

};
Notification.success = function(properties) {
    Notification.add(Object.assign(properties, {color: 'success'}))
}
Notification.info = function(properties) {
    Notification.add(Object.assign(properties, {color: 'info'}))
}
Notification.warning = function(properties) {
    Notification.add(Object.assign(properties, {color: 'warning'}))
}
Notification.warn = function(properties) {
    Notification.add(Object.assign(properties, {color: 'warning'}))
}
Notification.error = function(properties) {
    Notification.add(Object.assign(properties, {color: 'danger'}))
}
Notification.open = function(properties) {
    Notification.add(properties)
}
Notification.close = function(properties) {
    Notification.handleClose(properties)
}
Notification.destroy = function() {
    Notification.clear()
}

export default Notification;
