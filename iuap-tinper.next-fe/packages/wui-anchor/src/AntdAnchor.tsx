import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Affix from '../../wui-affix/src'
import Icon from '../../wui-icon/src';
import {createChainedFunction} from '../../wui-core/src';
import {getNid, WebUI} from "../../wui-core/src/index"
import { AntdAnchorProps, AntAnchorState } from './iAnchor'
import AntdAnchorLink from './AntdAnchorLink';

// const propTypes = {
//     getContainer: PropTypes.func, // 指定滚动的容器
//     affix: PropTypes.bool, // 固定模式
//     offsetTop: PropTypes.number, // 距离窗口顶部达到指定偏移量后触发
//     showInkInFixed: PropTypes.bool, // affix={false} 时是否显示小圆点
//     onChange: PropTypes.func, // 监听锚点链接改变
//     onClick: PropTypes.func, // click 事件的回调
//     style: PropTypes.oneOfType([
//         PropTypes.object,
//         PropTypes.string
//     ]),
//     fieldid: PropTypes.string,
//     activeKey: PropTypes.string
// };
const defaultProps = {
    // getContainer: () => window,
    prefixCls: 'wui-anchor',
    affix: true,
    offsetTop: 0,
    showInkInFixed: false,
    onChange: null,
    onClick: null,
    collapsable: false
};

@WebUI({name: "anchor", defaultProps})
class AntdAnchor extends Component<AntdAnchorProps, AntAnchorState> {
	hrefArr: string[]
	isScroll: boolean
	onscrollTo?: () => void;
	wrapperRef!: React.RefObject<HTMLDivElement>
	outBox: any
	containerRef: any
	spaceDiv: any
	constructor(props: AntdAnchorProps) {
	    super(props)
	    this.state = {
	        activeKey: props.activeKey,
	        isFix: false
	    }
	    // this.wrapperRef = React.createRef();
	    this.handleSelect = this.handleSelect.bind(this);
	    this.hrefArr = [];
	    this.isScroll = true;
	}

	componentDidMount() {
	    let {children, activeKey, items, collapsable} = this.props
	    // React.Children.map(children, (child: React.ReactElement, index) => {
	    //     this.hrefArr.push(child.props.href)
	    //     if (index === 0) {
	    //         this.setState({
	    //             activeKey: activeKey || child!.props.href
	    //         })
	    //     }
	    // })
	    if (items && items.length > 0) {
	        this.setState({
	            activeKey: activeKey || items[0]?.href
	        })
	        items.map((item: {key: string, href: string, title: string}) => {
	            this.hrefArr.push(item.href)
	        })
	    } else {
	        React.Children.map(children, (child: React.ReactElement, index) => {
	            this.hrefArr.push(child.props.href)
	            if (index === 0) {
	                this.setState({
	                    activeKey: activeKey || child.props.href
	                })
	            }
	        })
	    }
	    if (this.props?.getContainer === undefined) {
	        document.addEventListener('scroll', this.scrollHand)
	    } else {
	        this.props?.getContainer()?.addEventListener('scroll', this.scrollHand)
	    }
	    if (collapsable) {
	        let outBoxHeight = this.outBox?.getBoundingClientRect().height
	        let containerHeight = this.containerRef?.getBoundingClientRect().height
	        this.spaceDiv.style.cssText = `height: ${outBoxHeight - containerHeight - 16 - 50.4}` + 'px'
	    }
	}

	UNSAFE_componentWillReceiveProps(nextProps: Readonly<AntdAnchorProps>): void {
	    if ('activeKey' in nextProps && this.props.activeKey !== nextProps.activeKey) {
	        this.setState({
	            activeKey: nextProps.activeKey
	        })
	        document.getElementById(nextProps?.activeKey as string)?.scrollIntoView(true)
	    }
	}

	componentWillUnmount() {
	    // document.removeEventListener('scroll', this.scrollHand)
	    if (this.props?.getContainer === undefined) {
	        document.removeEventListener('scroll', this.scrollHand)
	    } else {
	        this.props?.getContainer()?.removeEventListener('scroll', this.scrollHand)
	    }
	}

	scrollHand = () => {
	    if (this.isScroll) {
	        this.hrefArr.forEach((item) => {
	            if (this.props.getContainer === undefined) {
	                if (-document.getElementById(item)!?.getBoundingClientRect().height < document.getElementById(item)!?.getBoundingClientRect().y && document.getElementById(item)!?.getBoundingClientRect().y <= 0) {
	                    this.setState({
	                        activeKey: item
	                    })
	                }
	            } else {
	                if (typeof this.props?.getContainer === 'function') {
	                    // if (this.props.getContainer().getBoundingClientRect().y - document.getElementById(item)!.getBoundingClientRect().y <= document.getElementById(item)!.getBoundingClientRect().y && document.getElementById(item)!.getBoundingClientRect().y <= this.props.getContainer().getBoundingClientRect().y) {
	                    // 滚动触发锚点，存在container时，目标元素y值小于滚动容器y值时触发 测试
	                    if (document.getElementById(item)!?.getBoundingClientRect().y <= this.props.getContainer()?.getBoundingClientRect().y) {
	                        this.setState({
	                            activeKey: item
	                        })
	                    }
	                }
	            }

	        })
	    }
	    setTimeout(() => {
	        this.isScroll = true
	    }, 10);

	}
	// componentDidUpdate () {
	//     this.updateInk();
	// }
	// updateInk = () => {
	//     const { prefixCls, wrapperRef } = this;
	//     const anchorNode = wrapperRef.current;
	//     const linkNode = anchorNode?.getElementsByClassName(`${prefixCls}-link-title-active`)[0];

	//     if (linkNode) {
	//       this.inkNode.style.top = `${(linkNode).offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
	//     }
	// };
	// saveInkNode = (node) => {
	//     this.inkNode = node;
	// };
	// onscrollTo = () => {
	//     const { prefixCls, wrapperRef } = this;
	//     const anchorNode = wrapperRef.current;
	//     const linkNode = anchorNode?.getElementsByClassName(`${prefixCls}-link-title-active`)[0];

	//     if (linkNode) {
	//       this.inkNode.style.top = `${(linkNode).offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
	//     }
	// }
	handleSelect(val: Record<string, any>) {
	    this.setState({activeKey: val.href});
	    this.isScroll = false;
	    // let { title, href } = val
	    if (this.props.onClick) {
	        this.props.onClick(val)
	    }
	    if (this.props.onChange) {
	        this.props.onChange(val.href)
	    }
	    // const { prefixCls, wrapperRef } = this;
	    // const anchorNode = wrapperRef.current;
	    // const linkNode = document.getElementsByClassName(`${prefixCls}-link-title-active`)[0];
	    // if (linkNode) {
	    //     this.inkNode.style.top = `${(linkNode).offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
	    //   }
	}
	handleItems = () => {
	    let { items, children, fieldid } = this.props
	    let { activeKey } = this.state
	    let linkArr: any[] = []
	    if (items && items?.length > 0) {
	        items.map((item: {key: string, href: string, title: string}) => {
	            let linkItem = <AntdAnchorLink
	                // onscrollTo={this.onscrollTo}
	                // eventKey={item.href}
	                expanded={item.href === activeKey}
	                fieldid={fieldid}
	                onSelect={this.handleSelect}
	                href={item.href}
	                title={item.title}
	                key={item.key}
	            />
	            linkArr.push(linkItem)
	        })
	    } else {
	        React.Children.map(children, (child: React.ReactElement) => {
	            let linkHref = child.props.href
	            let childProps = {
	                onscrollTo: this.onscrollTo,
	                eventKey: linkHref,
	                expanded: linkHref === activeKey,
	                onSelect: createChainedFunction(
	                    this.handleSelect, child.props.onSelect
	                ),
	                fieldid
	            }
	            linkArr.push(React.cloneElement(child, childProps))
	            // return React.cloneElement(child, childProps);
	        })
	    }
	    return linkArr
	}
	fixHandle = () => {
	    let { onCollapsable } = this.props
	    this.setState({isFix: !this.state.isFix})
	    onCollapsable && onCollapsable(!this.state.isFix)
	}
	toTopHandle = () => {
	    let { items, children } = this.props
	    if (items && items?.length > 0) {
	        this.setState({
	            activeKey: items[0]?.href
	        })
	        // this.anchorLinkRef.current?.handleClick({href: items[0]?.href, title: items[0]?.title}, e)
	        document.getElementById(items[0]?.href)?.scrollIntoView(true)
	    } else {
	        this.setState({
	            activeKey: children ? children![0]?.props?.href : ''
	        })
	        // this.anchorLinkRef.current?.handleClick({href: children![0]?.props?.href, title: children![0]?.props?.title}, e)
	        document.getElementById(children![0]?.props?.href)?.scrollIntoView(true)
	    }
	}

	render() {
	    let {
	        // children,
	        style,
	        className = '',
	        prefixCls,
	        affix,
	        offsetTop,
	        getContainer,
	        showInkInFixed,
	        fieldid,
	        collapsable
	    } = this.props
	    // let {activeKey} = this.state;
	    let {isFix} = this.state;
	    const wrapperClass = classNames({
	        [`${prefixCls}-wrapper`]: true,
	        [`${className}`]: className,
	        [`${prefixCls}-collapsable`]: collapsable,
	        [`${prefixCls}-collapsabled`]: isFix
	    });
	    const collapsableClass = classNames({
	        [`${prefixCls}-collapsable-footer`]: true,
	    })
	    const wrapperStyle = {
	        maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
	        ...style,
	    };
	    const anchorClass = classNames(prefixCls, {
	        fixed: !affix && !showInkInFixed,
	    });
	    // const inkClass = classNames(`${prefixCls}-ink-ball`, {
	    //     visible: '',
	    // });
	    let adapterNid = getNid(this.props) // 适配nid、uitype
	    const anchorContent = (
	        <div ref={this.wrapperRef} className={wrapperClass} style={wrapperStyle}>
	            <div className={anchorClass} ref={el => this.containerRef = el}>
	                <div className={`${prefixCls}-ink`}>
	                    {/* <span className={inkClass} ref={this.saveInkNode} /> */}
	                </div>
	                {/* {children} */}
	                {
	                    // React.Children.map(children, (child: React.ReactElement) => {
	                    //     let linkHref = child.props.href
	                    //     let childProps = {
	                    //         onscrollTo: this.onscrollTo,
	                    //         eventKey: linkHref,
	                    //         expanded: linkHref === activeKey,
	                    //         onSelect: createChainedFunction(
	                    //             this.handleSelect, child.props.onSelect
	                    //         ),
	                    //         fieldid
	                    //     }
	                    //     return React.cloneElement(child, childProps);
	                    // })
	                    this.handleItems()
	                }
	            </div>
	            { collapsable && (<div ref={el => this.spaceDiv = el}></div>)}
	            {
	                collapsable && (<div className={collapsableClass}>
	                    {isFix ? <Icon type="uf-dingzhu_xiao" onClick={this.fixHandle}></Icon> : <Icon type="uf-budingzhu_xiao" onClick={this.fixHandle}></Icon>}
	                    <Icon onClick={this.toTopHandle} type="uf-top-up" />
	                </div>)
	            }
	        </div>
	    );
	    return (
	        <div {...adapterNid} fieldid={fieldid} className={`${prefixCls}-wrapper-outer`} ref={el => this.outBox = el}>
	            {!affix ? (
	                anchorContent
	            ) : (
	                <Affix offsetTop={offsetTop} target={getContainer}>
	                    {anchorContent}
	                </Affix>
	            )}
	        </div>
	    )
	}
}

// AntdAnchor.propTypes = propTypes;
export default AntdAnchor
