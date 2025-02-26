/* eslint-disable react/prop-types */
import { Anchor, Clipboard, Collapse, Icon, Spin, Tooltip } from "@tinper/next-ui";
import axios from 'axios'
import process from 'process';
import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import noData from "./static/noData.svg";
import { handleReportButtonClick, querySelectorAll } from './utils';
import DetailTabs from './components/Tabs';
import Highlight, { defaultProps } from "prism-react-renderer";

const { Panel } = Collapse;
let tabsList = [
	{ name: 'JavaScript', value: 'jsx' },
	{ name: 'TypeScript', value: 'tsx' },
]

if (process.env.NODE_ENV === 'development') {
	require("@tinper/styles")
	tabsList = [{ name: 'TypeScript', value: 'tsx' }]
}

const debounce = (fn, delay = 500) => {
	let timer = null;
	return function () {
		if (timer) {
			clearTimeout(timer);
			timer = null
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		}, delay)
	}
}

// const browserType = myBrowser();
class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			democode: '',
			scsscode: '',
			activeKey: tabsList[0].value,
			loading: this.props.lazyLoad
		};
	}

	componentDidMount() {
		this.lazyLoad(this.props.id)
		this.getDemocode()
	}

	lazyLoad = (id) => {
		const callback = (entries) => {
			entries.forEach(e => {
				if (e.isIntersecting) {
					let ele = e.target;
					this.setState({ loading: false },
						() => observer.unobserve(ele)
					);
				}
			})
		}
		const observer = new IntersectionObserver(debounce(callback), { rootMargin: "1000px" });
		observer.observe(document.getElementById(id));
	}

	getDemocode = async () => {
		const { fileName, component, type, iframe, demoCode } = this.props;
		const { activeKey } = this.state;

		let res;
		if (iframe && demoCode) {
			res = await axios.get(`${GROBAL_CONTEXT}/demos/packages/${component}/demo/${demoCode}.${activeKey}`)
		} else {
			res = await axios.get(`${GROBAL_CONTEXT}/demos/packages/${component}/demo/demo-${type}/${fileName}.${activeKey}`)
		}
		this.setState({
			democode: res?.data || ''
		})
	}

	handleClick = async () => {
		/* eslint-disable react/prop-types */
		const { component, type, title } = this.props;
		if (!this.state.open) {
			handleReportButtonClick({
				"entry_mode": 'menu_left',
				"button_id": 'tn_show_code',
				'button_name': '显示代码',
				'first_parent_name': title,
				'second_parent_name': type === 'bip' ? 'bip示例' : '开发示例',
				'third_parent_name': component.replace('wui-', ''),
				'fourth_parent_name': '组件'
			})

			if (this.state.democode.length === 0) {
				await this.getDemocode()
			}
		}
		this.setState({ open: !this.state.open });
	};
	fCloseDrawer = () => {
		this.setState({
			open: false,
		});
	};

	handleCopyClick = (copyType) => {
		const { component, type, title } = this.props;
		handleReportButtonClick({
			'entry_mode': 'menu_left',
			'button_id': `tn_copy_code`,
			'button_name': `${copyType}复制代码点击`,
			'first_parent_name': title,
			'second_parent_name': type === 'bip' ? 'bip示例' : '开发示例',
			'third_parent_name': component.replace('wui-', ''),
			'fourth_parent_name': '组件'
		})
	}

	onTabChange = (activeKey) => {
		const { component, type, title } = this.props;
		this.setState({
			activeKey
		}, () => this.getDemocode());
		handleReportButtonClick({
			"entry_mode": 'menu_left',
			"button_id": 'tn_change_code',
			'button_name': `${activeKey}代码类型切换`,
			'first_parent_name': title,
			'second_parent_name': type === 'bip' ? 'bip示例' : '开发示例',
			'third_parent_name': component.replace('wui-', ''),
			'fourth_parent_name': '组件'
		})
	}

	render() {
		const { title, example, desc, id, hasScss } = this.props;
		const { open, democode, scsscode, activeKey, loading } = this.state;
		return (
			<div id={id} className="demo">
				<p className="demo-title">{title}</p>
				<p className="demo-desc">{desc}</p>
				<div className="demo-example">
					{
						loading
							? <div className="empty" style={{ height: 100 }} >
								<Spin getPopupContainer={() => document.getElementById(id)} spinning={true} />
							</div>
							: example
					}
				</div>
				<div className="demo-see">
					<a className={open ? "demo-see-btn active" : "demo-see-btn"}>
						<Tooltip overlay={open ? "收起代码" : "展开代码"} placement="top">
							<div className={`uf-tree-open ${open ? 'opened' : ''}`} onClick={this.handleClick} >
								<svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" class="arco-icon arco-icon-code"><path d="M16.734 12.686 5.42 24l11.314 11.314m14.521-22.628L42.57 24 31.255 35.314M27.2 6.28l-6.251 35.453"></path></svg>
							</div>
						</Tooltip>
						<div className="uf-tree-copy">
							<Clipboard className="uf-tree-copy-btn" action="copy" text={democode} />
						</div>
					</a>
				</div>
				<Panel bodyClassName="code-panel" collapsible expanded={open}>
					<div className="demo-drawerc">
						<DetailTabs
							onChange={this.onTabChange}
							activeKey={activeKey}
							tabsList={hasScss ? [...tabsList, { name: 'SCSS', value: 'scss' }] : tabsList}
						/>
						<div className="demo-code-copy">
							{activeKey.replace('x', '').toUpperCase()}代码&nbsp;
							<span onClick={() => this.handleCopyClick(activeKey.replace('x', ''))}>
								<Clipboard action="copy" text={democode} />
							</span>
						</div>
						<Highlight {...defaultProps} code={democode.trim()} language={activeKey} theme={undefined}>
							{({ className, style, tokens, getLineProps, getTokenProps }) => (
								<pre className={className} style={style}>
									{tokens.map((line, i) => (
										<div {...getLineProps({ line, key: i })}>
											{line.map((token, key) => (
												<span {...getTokenProps({ token, key })} />
											))}
										</div>
									))}
								</pre>
							)}
						</Highlight>
					</div>
				</Panel>
			</div>
		);
	}
}

class DemoGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false
		}
	}

	componentDidMount() {
		const { location } = this.props;
		const searchArr = !!location.search ? location.search.split('?')[1].split('&') : [];
		const search = {};
		searchArr.forEach(item => {
			const arr = item.split('=')
			search[arr[0]] = arr[1]
		});
		if (!!search.id) {
			if (!!search.id) {
				this.AnchorClick(null, search.id)
			}
		} else {
			window.scrollTo(0, 0)
		}
	}

	AnchorClick(e, href) {
		if (e) e.preventDefault();
		if (href) {
			const ele = document.getElementById(href);
			if (ele) {
				// ele.scrollIntoView({behavior: "smooth", block: "center"});
				const offset = top.location !== self.location ? 50 : 300;
				window.scroll({
					top: ele.getBoundingClientRect().top + window.scrollY - offset,
					behavior: "smooth",
				});
			}
		}
	}

	activeHandle = (_v1, _v2, _v3) => {
		let tempDom = document.querySelector('#my-awesome-nav');

		if (tempDom && tempDom.querySelector('.active').getBoundingClientRect().top - tempDom.getBoundingClientRect().top > tempDom.offsetHeight - 20) {
			tempDom.querySelector('.active').scrollIntoView(false)
		}
		if (tempDom && tempDom.querySelector('.active').getBoundingClientRect().top < tempDom.getBoundingClientRect().top) {
			tempDom.querySelector('.active').scrollIntoView()
		}
	}
	render() {
		const {
			match: { params },
			componentKey,
		} = this.props;
		const { collapsed } = this.state;

		const DemoArray = this.props.DemoArray?.filter?.((item) => params?.type === item?.type);
		console.log("DemoArray", DemoArray);
		let heightEm = DemoArray.length * 30 - 8;
		return (
			<div className="wui-component-content">
				{!window.location.hash.includes("demo") ? (
					<>
						<div className={`demo-box ${collapsed ? 'collapsed' : ''}`}>
							{DemoArray.length > 0 ? (
								DemoArray.map((child, index) => {
									return (
										<Demo
											id={`${child.fileName}`}
											key={`${componentKey}-${child.fileName}`}
											{...child}
											component={componentKey}
											lazyLoad={DemoArray.length > 10 && index > 4}
										/>
									);
								})
							) : (
								<div className="empty">
									<img src={noData} />
									<p>暂无数据</p>
								</div>
							)}
						</div>
						{DemoArray.length > 0 && (
							<Anchor
								className="demo-anchor"
								selector="#my-awesome-nav a"
								offset={top.location !== self.location ? 50 : 300}
								activeHandle={this.activeHandle}
								style={{ display: collapsed ? "none" : "block" }}
							>
								<ul id="my-awesome-nav">
									<div className='nav-head'>
										<span>本页目录</span>
										<Icon type="uf-xiangyou" onClick={() => this.setState({ collapsed: true })} />
									</div>
									<em style={{ height: heightEm + 'px' }} />
									{DemoArray.map((child) => {
										return (
											<li
												key={child.fileName}
												onClick={(e) => this.AnchorClick(e, child.fileName)}
											>
												<a href={`#${child.fileName}`}>{child.title}</a>
											</li>
										);
									})}
								</ul>
							</Anchor>
						)}
						{collapsed &&
							<div className='expand-button' onClick={() => this.setState({ collapsed: false })} >
								<Icon type="uf-xiangzuo" onClick={() => this.setState({ collapsed: true })} />
							</div>
						}
					</>
				) : (
					<div className="demo-box">
						<Switch>
							{DemoArray.map((child) => {
								return (
									<Route
										exact
										key={child.fileName}
										path={`/${componentKey}/${params.type}/${child.fileName}`}
										component={() => child.example}
									/>
								);
							})}
						</Switch>
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(DemoGroup);
