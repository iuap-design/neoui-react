import classnames from 'classnames';
import copy from 'copy-to-clipboard';
import omit from "omit.js";
// import PropTypes from 'prop-types';
import React, {cloneElement} from 'react';
import {prefix, WebUI, getNid} from "../../wui-core/src/index"
import Icon from '../../wui-icon/src';
import Message from '../../wui-message/src';

import {Collapse} from '../../wui-transition/src/index.js';

import { PanelProps, PanelState } from './iCollapse'
// const propTypes = {
//     // 是否添加折叠
//     collapsible: PropTypes.any,
//     onSelect: PropTypes.func,
//     // 头部组件
//     header: PropTypes.node,
//     headerStyle: PropTypes.object,
//     id: PropTypes.oneOfType([
//         PropTypes.string, PropTypes.number,
//     ]),
//     headerContent: PropTypes.bool,
//     // footer组件
//     footer: PropTypes.node,
//     footerStyle: PropTypes.object,
//     // 默认是否打开
//     defaultExpanded: PropTypes.bool,
//     // 是否打开
//     expanded: PropTypes.bool,
//     // 每个panel的标记
//     eventKey: PropTypes.any,
//     headerRole: PropTypes.string,
//     panelRole: PropTypes.string,
//     // 颜色
//     colors: PropTypes.oneOf(['primary', 'accent', 'success', 'info', 'warning', 'danger', 'default', 'bordered']),

//     // From Collapse.的扩展动画
//     onEnter: PropTypes.func,
//     onEntering: PropTypes.func,
//     onEntered: PropTypes.func,
//     onExit: PropTypes.func,
//     onExiting: PropTypes.func,
//     onExited: PropTypes.func,
//     // 是否可复制内容
//     copyable: PropTypes.bool,
//     bordered: PropTypes.bool,
//     ghost: PropTypes.bool,
//     showArrow: PropTypes.bool,
//     expandIconPosition: PropTypes.string,
//     extra: PropTypes.string,
//     expandIcon: PropTypes.any,
//     forceRender: PropTypes.bool,
//     destroyInactivePanel: PropTypes.bool,
//     bodyClassName: PropTypes.string,
//     accordion: PropTypes.bool,
//     parentFlag: PropTypes.bool,
//     fieldid: PropTypes.string

// };

const defaultProps = {
    collapsible: '',
    // defaultExpanded: false,
    clsPrefix: "wui-collapse",
    colors: "default",
    bordered: false,
    ghost: false,
    showArrow: true,
    expandIconPosition: 'left',
    copyable: false,
    onEnter: () => {
    },
    onEntering: () => {
    },
    onEntered: () => {
    },
    onExit: () => {
    },
    onExiting: () => {
    },
    onExited: () => {
    },
    header: null,
    footer: null,
    headerStyle: {},
    footerStyle: {},
    eventKey: '',
    onSelect: null,
    expandIcon: null,
    extra: null,
    forceRender: true
};
function getChildrenNode(elem: any) {
    let selectValue: any = null
    const dep = (options: any) => {
        if (!options) {
            return
        }
        // for (let i = 0; i < (options as any)?.length; i++) {
        if (options?.classList?.value?.includes('wui-collapse-header-only-icon')) {
            selectValue = options;
        } else {
            if (options?.parentNode) {
                dep(options?.parentNode)
            }
        }
        // }
    }
    dep(elem)
    return selectValue;
}

@WebUI({name: "collapse", defaultProps})
class Panel extends React.Component<PanelProps, PanelState> {
    constructor(props: PanelProps, context: any) {
        super(props, context);

        this.handleClickTitle = this.handleClickTitle.bind(this);

        this.state = {
            expanded: this.props.defaultExpanded != undefined ? this.props.defaultExpanded : this.props.expanded,
        };
    }

    // eslint-disable-next-line
    UNSAFE_componentWillReceiveProps(nextProps: PanelProps) {
        // 传入expanded时更新
        if (this.props?.parentFlag) {
            if ('expanded' in nextProps && 'parentActiveKey' in nextProps && nextProps?.parentActiveKey != null) {
                this.setState({
                    expanded: nextProps.expanded
                })
            }
        } else {
            if ('expanded' in nextProps) {
                this.setState({
                    expanded: nextProps.expanded
                })
            }
        }
        // if ('expanded' in nextProps && 'parentActiveKey' in nextProps && nextProps?.parentActiveKey != null) {
        //     this.setState({
        //         expanded: nextProps.expanded
        //     })
        // }
    }

    // 头部点击事件
    handleClickTitle(e: any) {
        // 不让事件进入事件池
        e.persist();
        e.selected = true;
        let {collapsible, clsPrefix, type} = this.props
        if (collapsible === 'disabled') {
            return
        } else if (collapsible === 'header') {
            // if (e.target.className === 'collapsible-header' || e.target.className === `${clsPrefix}-heading` || e.target.className === `${clsPrefix}-title` || e.target.className.includes(`${clsPrefix}-header-icon`)) {
            if (e.target.className === `collapsible-header` || e.target.className === `${clsPrefix}-title`) {
                this.expandHandle(e)
            }
        } else if (collapsible === 'icon') {
            // if (e.target.className.includes(`${clsPrefix}-header-icon`)) {
            if (getChildrenNode(e.target)) {
                this.expandHandle(e)
            }
            if (type === 'card' || type === 'list') {
                if (e.target.className.includes(`${clsPrefix}-header-icon`)) {
                    this.expandHandle(e)
                }
            }
        } else {
            this.expandHandle(e)
        }
    }
    expandHandle = (e: any) => {
        if (this.props.onSelect) {
            this.props.onSelect(this.props.eventKey, this.props.expanded as boolean, e);
        }

        // 传入activeKey时受控
        if (this.props.parentFlag && this.props.parentActiveKey) {
            return
        }
        if (e.selected) {
            this.setState({expanded: !this.state.expanded});
        }
    }

    // 渲染panelheader
    renderHeader(collapsible: string, header: React.ReactNode, id: string, role: string, expanded: boolean, clsPrefix: string) {
        const titleClassName = `${clsPrefix}-title`;

        if (!collapsible && collapsible !== '' && collapsible !== 'header' && collapsible !== 'icon') {
            if (!React.isValidElement(header)) {
                return header;
            }

            return cloneElement(header, {
                // @ts-ignore
                className: classnames(header.props.className, titleClassName),
            });
        }

        if (!React.isValidElement(header)) {
            return (
                <h4 role="presentation" className={titleClassName}>
                    {this.renderAnchor(header, id, role, expanded)}
                </h4>
            );
        }
        if (this.props.headerContent) {
            return cloneElement(header, {
                // @ts-ignore
                className: classnames(header.props.className, titleClassName),
            });
        }

        return cloneElement(header, {
            // @ts-ignore
            className: classnames(header.props.className, titleClassName),
            children: this.renderAnchor(header.props.children, id, role, expanded),
        });
    }

    // 如果使用链接，渲染为a标签
    renderAnchor(header: React.ReactNode, id: string, role: string, expanded: boolean) {
        return (
            <a
                role={role}
                href={id && `#${id}`}
                aria-controls={id}
                aria-expanded={expanded}
                aria-selected={expanded}
                className={'collapsible-header'}
                // @ts-ignore
                uiclickable={this.props.uirunmode === 'design' ? 'true' : undefined}
            >
                {header}
            </a>
        );
    }

    // 复制代码，弹出提示信息
    copyDemo(e: any) {
        let panelTarget = e.target.parentNode;
        let clipBoardContent = panelTarget.firstChild.innerText;
        copy(clipBoardContent);
        Message.create({content: '复制成功！', color: 'success', duration: 2});
    }

    // 如果有折叠动画，渲染折叠动画
    renderCollapsibleBody(
        id: string, expanded: boolean, role: string, children: React.ReactElement, clsPrefix: string, copyable: boolean, animationHooks: any, forceRender: boolean, destroyInactivePanel: boolean, collapsible: string, header: React.ReactNode, bodyClassName: string
    ) {
        let adapterNid = getNid(this.props) // 适配nid、uitype
        return (
            <Collapse in={expanded} {...animationHooks}>
                <div
                    id={id}
                    role={role}
                    className={`${clsPrefix}-collapse`}
                    aria-hidden={!expanded}
                    // @ts-ignore
                    nid={adapterNid?.nid ? adapterNid?.nid + "_body" : this.props?.nid}
                    uitype={adapterNid?.uitype}
                >
                    {this.renderBody(children, clsPrefix, copyable, forceRender, expanded, destroyInactivePanel, collapsible, header, bodyClassName)}
                </div>
            </Collapse>
        );
    }

    // 渲染panelbody
    renderBody(rawChildren: React.ReactElement, clsPrefix: string, copyable: boolean, forceRender: boolean, expanded: boolean, destroyInactivePanel: boolean, collapsible: string, _header: any, bodyClassName: string) {
        // let self = this;
        let { type } = this.props
        const children: any[] = [];
        let bodyChildren: any[] = [];

        // const bodyClassName = `${clsPrefix}-body`;
        const bodyClassNameAll = classnames({
            [`${clsPrefix}-body`]: true,
            [`${bodyClassName}`]: bodyClassName,
            [`${clsPrefix}-type-body-${type}`]: type,
        })
        // let destroyInactivePanelFlag = expanded ? null : (collapsible !== 'disabled') ? destroyInactivePanel ? {display: 'none'} : null : {display: 'none'}
        let destroyInactivePanelFlag = (collapsible === 'disabled') ? {display: 'none'} : expanded ? undefined : destroyInactivePanel ? {display: 'none'} : undefined

        // 添加到body的children中
        const maybeAddBody = () => {
            if (!bodyChildren.length) {
                return;
            }
            // 给子组件添加key，为了之后触发事件时使用
            // 面板收起时destroyInactivePanel为true则销毁
            let childrenBodyDom = (!expanded && destroyInactivePanel) ? null : (
                <div key={children.length} className={bodyClassNameAll} style={destroyInactivePanelFlag}>
                    {bodyChildren}
                    {copyable && (
                        <i className={`${clsPrefix}-copy uf uf-files-o`} onClick={this.copyDemo}></i>
                    )}
                </div>)
            let childrenBody = expanded ? childrenBodyDom : (collapsible !== 'disabled') ? forceRender ? childrenBodyDom : null : childrenBodyDom
            children.push(childrenBody);
            bodyChildren = [];
        }

        // 转换为数组，方便复用
        React.Children.toArray(rawChildren).forEach(child => {
            if (React.isValidElement(child) && child.props.fill) {
                maybeAddBody();

                // 将标示fill设置为undefined
                // @ts-ignore
                children.push(cloneElement(child, {fill: undefined}));

                return;
            }
            bodyChildren.push(child);
        });

        maybeAddBody();

        return children;
    }

    render() {
        const {
            collapsible,
            header,
            id,
            footer,
            expanded: propsExpanded,
            footerStyle,
            headerStyle,
            headerRole,
            panelRole,
            className,
            colors,
            children,
            onEnter,
            onEntering,
            onEntered,
            clsPrefix,
            onExit,
            // headerContent,
            onExiting,
            onExited,
            // defaultExpanded,
            eventKey,
            // onSelect,
            copyable,
            bordered,
            ghost,
            showArrow,
            expandIconPosition,
            extra,
            expandIcon,
            forceRender,
            destroyInactivePanel,
            accordion,
            bodyClassName,
            fieldid,
            type,
            ...props
        } = this.props;


        // const expanded = propsExpanded != null ?
        //   propsExpanded : this.state.expanded;
        // const expanded = this.state.expanded;
        let expanded;
        if (accordion) {
            expanded = propsExpanded != null ?
                propsExpanded : this.state.expanded;
        } else {
            expanded = this.state.expanded;
        }

        let classes = {};
        // classes[`${clsPrefix}`] = true;
        // classes[`${clsPrefix}-${colors}`] = true;
        classes = {
            [`${clsPrefix}`]: true,
            [`${clsPrefix}-${colors}`]: true
        }
        if (bordered) {
            // classes[`${clsPrefix}-borderless`] = true;
            Object.assign(classes, {
                [`${clsPrefix}-borderless`]: true
            })
        }
        if (ghost) {
            // classes[`${clsPrefix}-ghost`] = true;
            // classes = {
            //     [`${clsPrefix}-ghost`]: true
            // }
            Object.assign(classes, {
                [`${clsPrefix}-ghost`]: true
            })
        }
        if (showArrow) {
            // classes[`${clsPrefix}-arrow`] = true;
            // classes = {
            //     [`${clsPrefix}-arrow`]: true
            // }
            Object.assign(classes, {
                [`${clsPrefix}-arrow`]: true
            })
        }
        if (expandIconPosition === 'left') {
            // classes[`${clsPrefix}-icon-position-left`] = true;
            // classes = {
            //     [`${clsPrefix}-icon-position-left`]: true
            // }
            Object.assign(classes, {
                [`${clsPrefix}-icon-position-left`]: true
            })
        } else if (expandIconPosition === 'right') {
            // classes[`${clsPrefix}-icon-position-right`] = true;
            // classes = {
            //     [`${clsPrefix}-icon-position-right`]: true
            // }
            Object.assign(classes, {
                [`${clsPrefix}-icon-position-right`]: true
            })
        }
        let showClassName = expanded ? `${prefix}-panel-show` : `${prefix}-panel-hidden`
        // classes[`${showClassName}`] = true;
        // classes = {
        //     [`${showClassName}`]: true
        // }
        Object.assign(classes, {
            [`${showClassName}`]: true
        })
        const headerClass = {
            [`${clsPrefix}-heading`]: true,
            [`${clsPrefix}-type-${type}`]: type
        }

        copyable !== false;
        // const icon = expanded ? 'uf-arrow-down' : 'uf-arrow-right'
        const iconActiveStyle = (collapsible !== 'disabled') ? expanded ? `${clsPrefix}-icon-down` : `${clsPrefix}-icon-right` : `${clsPrefix}-icon-right`
        let collapsibleStyle = (collapsible === 'disabled') ? `${clsPrefix}-item-disabled` : ''
        // classes[`${collapsibleStyle}`] = true;
        // classes = {
        //     [`${collapsibleStyle}`]: true
        // }
        Object.assign(classes, {
            [`${collapsibleStyle}`]: true
        })
        let classIcon = {}
        // classIcon[`${clsPrefix}-header-icon`] = true
        // classIcon[`${iconActiveStyle}`] = true
        classIcon = {
            [`${clsPrefix}-header-icon`]: true,
            [`${clsPrefix}-header-only-icon`]: true,
            [`${iconActiveStyle}`]: true
        }
        let isActive = iconActiveStyle === `${clsPrefix}-icon-right`
        let panelProps = Object.assign({}, this.props)
        Object.assign(panelProps, {isActive})
        // 这里用cloneElement是为了给自定义传进的icon添加className以实现点击交互效果
        const iconDom = expandIcon !== null ? (typeof expandIcon == 'function' ? (cloneElement(expandIcon(panelProps), {
            className: classnames(className, {[`${expandIcon(panelProps)?.props?.className}`]: expandIcon(panelProps)?.props?.className, [`${clsPrefix}-header-only-icon`]: true})
            // @ts-ignore
        })) : (cloneElement(expandIcon, {
            className: classnames(className, classIcon)
            // @ts-ignore
        }))) : (type === 'list' ? <Icon className={`${clsPrefix}-header-icon ${iconActiveStyle}`} type='uf-zuzhankai_huise' uiclickable={props.uirunmode === 'design' ? 'true' : undefined}/>
        // @ts-ignore
            : type === 'card' ? <Icon className={`${clsPrefix}-header-icon ${iconActiveStyle}`} type='uf-zhedie-zhankai' uiclickable={props.uirunmode === 'design' ? 'true' : undefined}/>
            // @ts-ignore
                : <Icon className={`${clsPrefix}-header-icon ${clsPrefix}-header-only-icon ${iconActiveStyle}`} type='uf-arrow-down' uiclickable={props.uirunmode === 'design' ? 'true' : undefined}/>)

        // 当collapsible为header时添加的className
        let collapsibleClassName = `${clsPrefix}-collapsible-header`
        let adapterNid = getNid(this.props)
        let typeLine = (<span className={`${clsPrefix}-header-list`}></span>)
        return (
            <div
                {...omit(props, ["defaultActiveKey", "onSelect", "headerContent", "defaultExpanded", "onChange"])}
                className={classnames(className, classes)}
                id={(collapsible !== 'disabled') ? undefined : id}
                fieldid={fieldid && !this.props?.parentFlag ? fieldid : undefined}
                {...adapterNid}
            >
                {header && (
                    // @ts-ignore
                    <div className={classnames(headerClass)} style={headerStyle} onClick={this.handleClickTitle} fieldid={fieldid ? fieldid + '-panel_' + eventKey || '' : undefined} uiclickable={props.uirunmode === 'design' ? 'true' : undefined}>
                        {/* {showArrow && <i className={`uf ${icon} ${clsPrefix}-header-icon`} />} */}
                        {
                            (type === 'lineFirstLevel' || type === 'lineSecondLevel') ?
                                (
                                    <>
                                        {(collapsible === 'header') ? (<span className={collapsibleClassName}>
                                            {this.renderHeader(
                                                collapsible, header, id as string, headerRole as string, expanded as boolean, clsPrefix as string
                                            )}
                                        </span>) : (this.renderHeader(
                                                collapsible as string, header, id as string, headerRole as string, expanded as boolean, clsPrefix as string
                                        ))}
                                        {showArrow && iconDom}
                                        {extra && (<div className={`${clsPrefix}-extra`}>{extra}</div>)}
                                    </>
                                ) : (
                                    <>
                                        {showArrow && iconDom}
                                        {(collapsible === 'header') ? (<span className={collapsibleClassName}>
                                            {this.renderHeader(
                                                collapsible, header, id as string, headerRole as string, expanded as boolean, clsPrefix as string
                                            )}
                                        </span>) : (this.renderHeader(
                                                collapsible as string, header, id as string, headerRole as string, expanded as boolean, clsPrefix as string
                                        ))}
                                        {type === 'list' && typeLine}
                                        {extra && (<div className={`${clsPrefix}-extra`}>{extra}</div>)}
                                    </>
                                )
                        }
                        {/* {showArrow && iconDom}
                        {(collapsible === 'header') ? (<span className={collapsibleClassName}>
                            {this.renderHeader(
				                collapsible, header, id as string, headerRole as string, expanded as boolean, clsPrefix as string
			                )}
                        </span>) : (this.renderHeader(
                                    collapsible as string, header, id as string, headerRole as string, expanded as boolean, clsPrefix as string
                        ))}
                        {type === 'list' && typeLine}
                        {extra && (<div className={`${clsPrefix}-extra`}>{extra}</div>)} */}
                    </div>
                )}

                {(collapsible !== 'disabled') ?
                    this.renderCollapsibleBody(
                        id as string, expanded as boolean, panelRole as string, children as React.ReactElement, clsPrefix as string, copyable as boolean,
                        {
                            onEnter,
                            onEntering,
                            onEntered,
                            onExit,
                            onExiting,
                            onExited
                        }, forceRender as boolean, destroyInactivePanel as boolean, collapsible as string, header, bodyClassName as string
                    ) :
                    this.renderBody(children as React.ReactElement, clsPrefix as string, copyable as boolean, forceRender as boolean, expanded as boolean, destroyInactivePanel as boolean, collapsible, header, bodyClassName as string)
                }

                {footer && (
                    <div className={`${clsPrefix}-footer`} style={footerStyle}>
                        {footer}
                    </div>
                )}
            </div>
        );
    }
}

// Panel.propTypes = propTypes;

export default Panel;
