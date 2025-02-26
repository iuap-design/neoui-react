import Gumshoe from 'gumshoejs';
import omit from "omit.js"
// 兼容ie浏览器
import 'gumshoejs/dist/gumshoe.polyfills.min';
// import PropTypes from 'prop-types';
import React, {Component} from 'react'
import {WebUI} from "../../wui-core/src/index"
import { AnchorProps } from './iAnchor'

// const propTypes = {
//     selector: PropTypes.string.isRequired, // 选择器
//     offset: PropTypes.any, // 偏移量
//     navClass: PropTypes.string, // 当前被激活锚点新增的类名
//     contentClass: PropTypes.string, // 当前被激活的区域
//     nested: PropTypes.bool,
//     nestedClass: PropTypes.string,
//     reflow: PropTypes.bool,
//     event: PropTypes.bool, // 是否添加监听事件
//     activeHandle: PropTypes.func, // 被激活的回调
//     deactiveHandle: PropTypes.func, // 激活后的回调
//     events: PropTypes.bool
// };
const defaultProps = {
    navClass: 'active', // applied to the nav list item
    contentClass: 'active', // applied to the content

    // Nested navigation
    nested: false, // if true, add classes to parents of active link
    nestedClass: 'active', // applied to the parent items

    // Offset & reflow
    offset: 0, // how far from the top of the page to activate a content area
    reflow: false, // if true, listen for reflows

    // Event support
    events: true, // if true, emit custom events
    clsPrefix: 'u-anchor',
    activeHandle: () => {
    },
    deactiveHandle: () => {
    }
};

@WebUI({name: "anchor", defaultProps})
class Anchor extends Component<AnchorProps> {

    anchor: any;
    anchorDOM!: HTMLDivElement | null;
    componentDidMount() {
        let props = this.props;
        this.anchor = new Gumshoe(props.selector, {
            ...props
        })
        if (!this.anchorDOM) return;
        this.anchorDOM.addEventListener('gumshoeActivate', this.gumshoeActivateHandle)
        this.anchorDOM.addEventListener('gumshoeDeactivate', this.gumshoeDeactivateHandle)
    }

    componentDidUpdate() {
        this.anchor && this.anchor.setup()
        this.anchor && this.anchor.detect()
    }

    componentWillUnmount() {
        this.anchor && this.anchor.destroy()
        this.anchorDOM?.removeEventListener('gumshoeActivate', this.gumshoeActivateHandle)
        this.anchorDOM?.removeEventListener('gumshoeDeactivate', this.gumshoeDeactivateHandle)
    }

    gumshoeActivateHandle = (event: any) => {
        let props = this.props;
        // The list item
        let li = event.target;// 列表

        // The link
        let link = event.detail.link;// a标签

        // The content
        let content = event.detail.content;// 内容区域

        props.activeHandle!(li, link, content)
    }

    gumshoeDeactivateHandle = (event: any) => {
        let props = this.props;
        let li = event.target;// 列表

        // The link
        let link = event.detail.link;// a标签

        // The content
        let content = event.detail.content;// 内容区域

        props.deactiveHandle!(li, link, content)
    }

    render() {
        const {
            clsPrefix,
            ...others
        } = this.props;
        return (
            <div className={clsPrefix} ref={ref => {
                this.anchorDOM = ref
            }} {...omit(others, ["navClass", "contentClass", "nested", "nestedClass", "reflow", "events", "activeHandle", "deactiveHandle"])}>
                {this.props.children}
            </div>
        )
    }
}

// Anchor.propTypes = propTypes;
export default Anchor;
