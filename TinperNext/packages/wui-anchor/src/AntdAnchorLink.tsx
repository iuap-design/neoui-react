import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {WebUI, getNid} from "../../wui-core/src/index"
import { AnchorLinkProps, AnchorLinkState } from './iAnchor'
import Icon from '../../wui-icon/src'

// const propTypes = {
//     href: PropTypes.string,
//     target: PropTypes.string,
//     title: PropTypes.node,
//     onSelect: PropTypes.func,
//     expanded: PropTypes.bool,
//     fieldid: PropTypes.string
// };
const defaultProps = {
    prefixCls: 'wui-anchor',
    href: '',
    target: '',
    title: null
};

@WebUI({name: "anchor", defaultProps})
class AntdAnchorLink extends Component<AnchorLinkProps, AnchorLinkState> {
    constructor(props: AnchorLinkProps) {
        super(props)
    }

    handleClick(value: {href: string, title: string}, e: React.MouseEvent) {
        e.preventDefault()
        if (!value.href) {
            return
        }
        // let { onscrollTo } = this.props
        // document.querySelector('#' + value.href).scrollIntoView(true)
        setTimeout(() => {
            document.getElementById(value.href)?.scrollIntoView(true)
        }, 100)
        this.setState({
            active: true
        })
        // onscrollTo()
        this.props.onSelect!(value, e);
    }

    rendericon = () => {
        let { prefixCls, expanded, isdirection, activeIcon } = this.props
        if (isdirection) {
            return (
                <div className={`${prefixCls}-line-dotted-box`}>
                    <div className={`${prefixCls}-line-dotted`}></div>
                    {expanded ? activeIcon ? activeIcon : <Icon type="uf-yuandian" /> : null}
                </div>
            )
        }
    }

    renderAntdAnchorLink() {
        const {prefixCls, href, title, children, className, target, expanded, fieldid} = this.props;
        const wrapperClassName = classNames(
            `${prefixCls}-link`,
            {
                [`${prefixCls}-link-active`]: expanded,
            },
            className,
        );
        const titleClassName = classNames(`${prefixCls}-link-title`, {
            [`${prefixCls}-link-title-active`]: expanded,
        });
        let adapterNid = getNid(this.props) // 适配nid、uitype
        return (
            <div className={wrapperClassName} {...adapterNid}>
                {/* <div className={`${prefixCls}-line-dotted`}></div> */}
                {this.rendericon()}
                <a
                    className={titleClassName}
                    href={href}
                    title={typeof title === 'string' ? title : ''}
                    target={target}
                    onClick={this.handleClick.bind(this, {href, title})}
                    fieldid={fieldid ? fieldid + '-anchorLink-' + href : undefined}
                >
                    {title}
                </a>
                {children}
            </div>
        );
    }

    render() {
        return (
            this.renderAntdAnchorLink()
        )
    }
}

// AntdAnchorLink.propTypes = propTypes;
export default AntdAnchorLink
