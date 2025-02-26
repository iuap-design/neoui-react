import classnames from "classnames";
// import { getComponentLocale } from '../../wui-locale/src/tool';
import omit from 'omit.js';
// import cookie from 'react-cookies';
// import PropTypes from "prop-types";
import React from "react";
import {WebUI, cssUtil, prefix, getNid} from "../../wui-core/src/index";
import Icon from '../../wui-icon/src';
import Input from '../../wui-input/src/index';
import {getLangInfo} from "../../wui-locale/src/tool";
import {WithConfigConsumer} from "../../wui-provider/src/context";
import Select from '../../wui-select/src/index';
import i18n from './i18n.js';
import PaginationButton from "./PaginationButton";
import { PaginationProps, PaginationState, PaginationButtonAdapterPublic, PaginationButtonAdapter } from './iPagination';

const Option = Select.Option;

// export const propTypes = {
//     /**
// 	 * 当前激活状态页
// 	 */
//     current: PropTypes.number,
//     /**
// 	 * 指定分页数量
// 	 */
//     pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     /**
// 	 * 默认分页数量
// 	 */
//     defaultPageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     /**
// 	 * 当前激活状态页（旧）
// 	 */
//     activePage: PropTypes.number,
//     /**
// 	 * 总页数
// 	 */
//     items: PropTypes.number,
//     /**
// 	 * 显示按钮从1到maxButton的按钮数
// 	 */
//     maxButtons: PropTypes.number,

//     /**
// 	 * 当为true,不管切换到多少页都显示第一页和最后一页的按钮
// 	 */
//     boundaryLinks: PropTypes.bool,

//     /**
// 	 * 当为true,显示省略号，否则
// 	 *
// 	 */
//     ellipsis: PropTypes.bool,

//     /**
// 	 *  当为true,显示点击到第一页的按钮
// 	 */
//     first: PropTypes.bool,

//     /**
// 	 *  当为true,显示点击到最后一页的按钮
// 	 */
//     last: PropTypes.bool,

//     /**
// 	 * 当为true,显示前一页按钮
// 	 */
//     prev: PropTypes.bool,

//     /**
// 	 * 当为true,显示下一页按钮
// 	 */
//     next: PropTypes.bool,

//     /**
// 	 * 暴露给用户的切换页的方法,页码和pageSize 切换均会触发
// 	 * onChange（新 antd）
// 	 * onSelect（旧）
// 	 */
//     onSelect: PropTypes.func,
//     onChange: PropTypes.func,
//     /**
// 	 * You can use a custom element for the buttons
// 	 */
//     buttonComponentClass: PropTypes.oneOfType([
//         PropTypes.element,
//         PropTypes.string
//     ]),
//     /**
// 	 * 每页多少条的选择
// 	 * dataNumSelect 旧
// 	 * pageSizeOptions（新 antd）
// 	 */
//     dataNumSelect: PropTypes.array,
//     pageSizeOptions: PropTypes.array,
//     /**
// 	 * 每页多少条选择哪一个
// 	 */
//     dataNum: PropTypes.number,
//     /**
// 	 * 页大小切换
// 	 * onPageSizeChange(antd)
// 	 * onDataNumSelect(旧)
// 	 */
//     onDataNumSelect: PropTypes.func,
//     onPageSizeChange: PropTypes.func,
//     /**
// 	 * 显示跳页
// 	 * showQuickJumper(antd)
// 	 * showJump(旧)
// 	 */
//     showQuickJumper: PropTypes.bool,
//     showJump: PropTypes.bool,
//     /**
// 	 * 显示总共条数
// 	 */
//     total: PropTypes.number,
//     /**
// 	 *  pagiantion不可点
// 	 */
//     disabled: PropTypes.bool,
//     /**
// 	 *  渲染确认按钮的dom
// 	 */
//     confirmBtn: PropTypes.func,

//     /**
// 	 * 通过cookie来确定分页的size,需设定唯一的key值
// 	 */
//     // sizeWithCookie: PropTypes.string,

//     /**
// 	 * 默认的当前页数
// 	 */
//     defaultActivePage: PropTypes.number,
//     /**
// 	 * 默认的每页条数
// 	 */
//     defaultDataNum: PropTypes.number,
//     /**
// 	 * 只有一页时是否隐藏分页器
// 	 */
//     hideOnSinglePage: PropTypes.bool,
//     /**
// 	 * 当 size 未指定时，根据屏幕宽度自动调整尺寸
// 	 */
//     // responsive: PropTypes.bool,
//     /**
// 	 * 通是否展示pageSize切换器
// 	 */
//     showSizeChanger: PropTypes.bool,
//     /**
// 	 * 用于自定义页码的结构
// 	 */
//     itemRender: PropTypes.func,
//     /**
// 	 * 是否显示原生 tooltip 页码提示
// 	 */
//     showTitle: PropTypes.bool,
//     /**
// 	 * 用于自定义页码的结构
// 	 */
//     showTotal: PropTypes.func,
//     /**
// 	 * 用于自定义页码的结构
// 	 */
//     simple: PropTypes.bool,
//     /**
// 	 * 分页按钮大小
// 	 */
//     size: PropTypes.string,
//     locale: PropTypes.string,
//     noBorder: PropTypes.bool,
//     gap: PropTypes.bool,
//     /**
// 	 * sizeChange 下拉框下拉方向控制
// 	 * 设置align 对象,具体参考dropdown placement.js
// 	 * */
//     dropdownAlign: PropTypes.object,
//     style: PropTypes.object,
//     id: PropTypes.string,
//     pageSizeInput: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
// };
const sizeChangerPropsMap: string[] = ['dropdownClassName', 'dropdownStyle', 'fieldid', 'id', 'listHeight', 'placement', 'dropdownAlign', 'suffixIcon', 'getPopupContainer']

const getCache = (key: string) => {
    return JSON.parse(window.localStorage.getItem(key) || '{}'); // 缓存的分页信息
};

export const defaultProps: PaginationProps = {
    defaultActivePage: 1,
    defaultPageSize: 10,
    maxButtons: 5,
    boundaryLinks: true,
    ellipsis: true,
    first: true,
    last: true,
    prev: true,
    next: true,
    showQuickJumper: true,
    total: 0,
    disabled: false,
    // sizeWithCookie: '',
    hideOnSinglePage: false,
    // responsive:false,
    showTitle: true,
    showSizeChanger: false,
    gap: true,
    noBorder: true,
    locale: 'zh-cn',
    size: 'sm',
    pageSizeInput: false,
    pageSizeOptions: [
        '10',
        '20',
        '30',
        '50',
        '100',
        '200',
        '500',
        '1000',
    ],
};
type PageButtonMapType = 'first' | 'prev' | 'center' | 'next' | 'last';

@WithConfigConsumer()
@WebUI({name: "pagination", defaultProps})
class Pagination extends React.Component<PaginationProps, PaginationState> {
	maxListHeight: number;
	pageButtonMap: ({ type: PageButtonMapType; children?: React.ReactElement; isSimple: boolean; title?: string; })[];
	selectDom: HTMLElement | null;

	static defaultProps = defaultProps;
	static getCache: (key: string) => any;

	constructor(props: PaginationProps) {
	    super(props);
	    let pageSize = this.getCache()?.pageSize || (props.pageSize ?? props.defaultPageSize) as number;
	    let activePage = (props.activePage ?? props.defaultActivePage) as number;
	    // select 下拉框默认高度
	    this.maxListHeight = 256;
	    this.state = {
	        activePage: activePage, // 当前的页码
	        pageSize: pageSize,
	        items: props.items ? props.items : props.total ? Math.ceil(props.total / pageSize) : 1,
	        jumpPageState: props.simple ? activePage : null,
	        // 分页大小下拉框是否展开，兼容select enter 操作影响其展开收起
	        selectOpen: false,
	        listHeight: this.maxListHeight,
	        selectFocus: false,
	        loading: props.total === Infinity, // total为Infinity时，分页处于加载状态
	    }

	    // 分页按钮枚举类型
	    this.pageButtonMap = [
	        {type: 'first', children: <Icon type={props.dir === 'rtl' ? "uf-2arrow-right" : "uf-2arrow-left"}></Icon>, isSimple: false, title: '返回首页'},
	        {type: 'prev', children: <Icon type={props.dir === 'rtl' ? "uf-arrow-right" : "uf-arrow-left"}></Icon>, isSimple: true, title: '上一页'},
	        {type: 'center', isSimple: true},
	        {type: 'next', children: <Icon type={props.dir === 'rtl' ? "uf-arrow-left" : "uf-arrow-right"}></Icon>, isSimple: true, title: '下一页'},
	        {type: 'last', children: <Icon type={props.dir === 'rtl' ? "uf-2arrow-left" : "uf-2arrow-right"}></Icon>, isSimple: false, title: '跳至尾页'},
	    ];

	    this.selectDom = null;
	}

	componentDidMount() {
	    // window.addEventListener('resize', this.setListHeight);
	    this.cachePageInfo();
	}

	UNSAFE_componentWillReceiveProps(nextProps: PaginationProps) {
	    let {activePage, defaultActivePage, total, simple, pageSize, defaultPageSize, items} = nextProps;

	    if (activePage && this.state.activePage !== activePage) {
	        this.setState({
	            activePage: activePage,
	        })
	    }
	    if (!isNaN(pageSize as number) && this.state.pageSize !== pageSize) {
	        this.setState({
	            pageSize: pageSize as number,
	            items: items ? items : (Math.ceil(total! / (pageSize as number)) || 1)
	        })
	    }
	    if (simple && this.state.jumpPageState !== activePage) {
	        this.setState({
	            jumpPageState: activePage || defaultActivePage,
	        })
	    }

	    if ('items' in nextProps && this.props.items !== items) {
	        let newItems = items === 0 ? 1 : items;
	        this.setState({
	            items: newItems!,
	        })
	    }

	    if ('total' in nextProps && this.props.total !== total) {
	        const items = Math.ceil(total / ((pageSize || defaultPageSize) as number)) || 1; // 页数
	        this.setState({
	            items,
	            loading: total === Infinity,
	            activePage: activePage || (this.state.activePage > items ? 1 : this.state.activePage), // 解决total改变后,activePage和jumpPageState超出页数的问题
	            jumpPageState: Number(this.state.jumpPageState) > items ? null : this.state.jumpPageState,
	        })
	    }
	}

	componentDidUpdate() {
	    this.cachePageInfo();
	}

	// componentWillUnmount() {
	//     window.removeEventListener('resize', this.setListHeight);
	// }

	getCache = () => {
	    const { cacheId } = this.props;
	    if (cacheId && typeof cacheId === 'string') {
	        return getCache(cacheId)
	    }
	}

	cachePageInfo = () => {
	    const { cacheId } = this.props;
	    const { pageSize } = this.state;
	    if (cacheId && typeof cacheId === 'string') {
	        const cacheInfo = getCache(cacheId);
	        if (pageSize && pageSize !== cacheInfo.pageSize) {
	            window.localStorage.setItem(cacheId, JSON.stringify({pageSize}))
	        }
	    }
	}

	// 记录跳转页码jumpPageState
	setPageJump = (value: string | number) => {
	    // let value = e.target.value;
	    // 20181129跳转内容可以清空
	    if (value !== '' && (isNaN(Number(value)) || value > this.state.items || value <= 0)) {
	        return false;
	    }
	    this.setState({
	        jumpPageState: Number(value)
	    })

	}

	/**
	 * 确认跳页
	 */
	handleEnsurePageJump = () => {
	    const {simple, activePage} = this.props
	    const {jumpPageState, pageSize} = this.state;
	    const {onChange} = this.props;
	    if (!jumpPageState) return;
	    // 非simple 格式的输入框内容清空
	    if (!simple) {
	        this.setState({
	            jumpPageState: null,
	        });
	    }
	    // activePage完全受控，外部传了activePage，不走内部切换页逻辑
	    if (activePage === undefined) {
	        this.setState({
	            activePage: jumpPageState,
	        });
	    }
	    onChange && typeof onChange === 'function' && onChange(jumpPageState, pageSize)
	}

	/**
	 * 分页按钮选择
	 */
	onPageBtnSelect = (eventKey: number, pageSize: number, event: React.MouseEvent<HTMLElement>) => {
	    const {onChange, activePage} = this.props;
	    if (activePage === undefined) {
	        this.setState({activePage: eventKey});
	    }
	    onChange && onChange(eventKey, pageSize, event)
	}

	/**
     * 分页大小输入框键盘操作
     */

	handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>) => {
	    const { pageSizeOptions = [] } = this.props;
	    const { selectOpen } = this.state;
	    // pageSizeOptions.includes(e.target.value) && selectOpen兼容分页下拉框展示的时候且输入下拉框包含的值的时候触发两次问题
	    if (e && e.key === 'Enter' && !(pageSizeOptions.includes(e.target.value) && selectOpen)) {
	        this.dataNumSelect(e.target.value)
	    }
	}

    /**
     * 分页大小框点击，控制下拉框展开收起,当下拉展开selectFocus为true
     */
    handleSelectClick = () => {
	    this.setState({selectOpen: !this.state.selectOpen, selectFocus: !this.state.selectOpen});
    }

    /**
     * 分页大小框失焦，控制下拉框收起
     */
    handleSelectBlur = () => {
        const { pageSize, blurIsValid } = this.state;
        if (this.props.pageSizeInput && blurIsValid) {
            this.setState({selectOpen: false, selectFocus: false});
            this.dataNumSelect(pageSize);
            return;
        }
        this.setState({selectOpen: false, selectFocus: false})

    }

    handleSelectChange = (value: string | number) => {
        // 禁止输入非法字符&小数
        if (isNaN(Number(value)) || Math.floor(Number(value)) !== Number(value) || value.toString().match(/\D/g)) {
            return;
        }
        if (this.props.pageSize === undefined) {
            this.setState({pageSize: Number(value)});
        }
        this.setState({selectFocus: false, blurIsValid: true});
    }

    handleSelectFocus = () => {
        if (this.props.pageSizeInput) {
            this.setState({selectFocus: true})
        }
    }

	getPopupContainer = (dom: HTMLElement) => {
	    this.selectDom = dom;
	    // this.setListHeight();
	    return cssUtil.parentsUntil(dom);
	}

	// setListHeight = () => {
	//     if (this.selectDom) {
	//         const rect = this.selectDom.getBoundingClientRect();
	//         const bottomDistance = document.body.clientHeight - rect.bottom;
	//         const topDistance = rect.top;
	//         const listHeight = Math.max(bottomDistance, topDistance);
	//         // 兼容bug LYJM-64103 工作台设置zoom 导致下拉弹层无法自适应计算问题
	//         if (bottomDistance - 27 < this.maxListHeight && bottomDistance < topDistance) {
	//             this.setState({placement: 'topLeft'})
	//         }
	//         if (listHeight - 27 < this.maxListHeight) {
	//             this.setState({listHeight: listHeight - 27});
	//             return;
	//         }
	//         this.setState({listHeight: this.maxListHeight})
	//     }
	// }

	/**
	 * 每页多少条的选择
	 * @param value
	 */
	dataNumSelect = (value: number | string) => {
	    const {onPageSizeChange, total, pageSizeOptions, pageSizeInput} = this.props;
	    let {activePage, jumpPageState} = this.state;
	    let pageSize = Number(value) || pageSizeOptions[0] as number;
	    // 对数组已经排序，最后一位就是最大值
	    let maxPageSize = pageSizeOptions[pageSizeOptions.length - 1] as number;
	    if (pageSizeInput && typeof pageSizeInput === 'object') {
	        maxPageSize = pageSizeInput.max || maxPageSize;
	    }
	    if (pageSize <= 0) pageSize = pageSizeOptions[0] as number;
	    if (pageSize > maxPageSize) pageSize = maxPageSize;

	    const newItems = Math.ceil(total / pageSize); // 调整pageSize后，新的总页数
	    if (total) {
	        this.setState({
	            items: isNaN(pageSize) ? 1 : newItems
	        })
	        if (activePage > newItems) {
	            activePage = newItems
	            if (this.props.activePage === undefined) {
	                this.setState({activePage})
	            }
	        }
	    }
	    // QDJCJS-11445 在调整pageSize后, 应清空跳页的输入框中不合法的数字
	    if (jumpPageState !== null && jumpPageState > newItems) {
	        this.setState({
	            jumpPageState: null
	        })
	    }
	    if (this.props.pageSize === undefined) {
	        this.setState({pageSize})
	    }
	    this.setState({selectOpen: false, blurIsValid: false})
	    const res = onPageSizeChange && typeof onPageSizeChange === 'function' && onPageSizeChange(activePage, pageSize);
	    if (res) { // QDJCJS-23659 修复分页大小调整后，用户回调同样的pageSize，导致页码错误的问题
	        const { pageSize, activePage } = res;
	        if (pageSize) {
	            const items = Math.ceil(total! / (pageSize as number)) || 1
	            this.setState({
	                pageSize,
	                items,
	                activePage: activePage || (this.state.activePage > items ? 1 : this.state.activePage)
	            })
	        }
	    }
	}

	/**
	 * 不同类型的PaginationButton定义渲染
	 * @param type 类型
	 * @param children 渲染内容
	 * @param display 是否渲染出来
	 * @param params 其他参数
	 * @returns {Array}
	 */
	getPaginationButtonAdapter = ({children, type, display = true, ...params}: PaginationButtonAdapter): React.ReactNode => {
	    // const { buttonProps, type, children, title} = params;
	    // const { clsPrefix, id } = this.props;
	    const {activePage, items, loading} = this.state;
	    let itemProps = {...params, type}
	    switch (type) {
	    case 'ellipsis':
	        itemProps = {...itemProps, disabled: true, className: `${this.props.clsPrefix}-item-ellipsis`};
	        children = (
	            <span aria-label="More">
	                {this.props.ellipsis === true ? "\u2026" : this.props.ellipsis}
	            </span>
	        );
	        display = display && !loading;
	        break;
	    case 'first':
	        itemProps = {...itemProps, eventKey: 1, disabled: activePage === 1};
	        break;
	    case 'prev':
	        itemProps = {...itemProps, eventKey: activePage - 1, disabled: activePage === 1};
	        break;
	    case 'next':
	        itemProps = {...itemProps, eventKey: activePage + 1, disabled: activePage >= items};
	        break;
	    case 'last':
	        itemProps = {...itemProps, eventKey: items, disabled: loading || activePage >= items};
	        break;
	    case "page": {
	        const {pagenumber} = itemProps;
	        children = pagenumber;
	        itemProps = {
	            ...omit(itemProps, ["pagenumber"]),
	            eventKey: pagenumber,
	            active: activePage === pagenumber,
	            title: pagenumber?.toString(),
	            key: pagenumber
	        };
	        display = display && (!loading || pagenumber === activePage);
	        break;
	    }
	    default:
	        break;
	    }
	    return (
	        display ? <PaginationButton {...itemProps}>{children || ''}</PaginationButton> : null
	    )
	}

	/**
	 * 渲染page的页码按钮
	 * @param buttonProps
	 * @returns {Array}
	 */
	renderPageButtons(buttonProps: PaginationButtonAdapterPublic) {
	    const {activePage, items, loading} = this.state;
	    const {maxButtons, boundaryLinks, ellipsis, clsPrefix, locale} = this.props;
	    let pageButtons = [];

	    let startPage;
	    let endPage;
	    let hasHiddenPagesAfter;

	    if (maxButtons) {
	        // 根据max很当前activepage计算出应隐藏activeButton之前的页数
	        let hiddenPagesBefore = activePage - parseInt(`${maxButtons / 2}`, 10);
	        startPage = hiddenPagesBefore >= 2 ? hiddenPagesBefore : 1;
	        // 计算出是否存在隐藏activeButton之后的页数
	        hasHiddenPagesAfter = startPage + maxButtons < items + 1;

	        if (!hasHiddenPagesAfter) {
	            endPage = items;
	            startPage = items - maxButtons + 1;
	            if (startPage < 1) {
	                startPage = 1;
	            }
	        } else {
	            endPage = startPage + maxButtons - 1;
	        }
	    } else {
	        startPage = 1;
	        endPage = items;
	    }
	    // 将所有的button循环渲染出来
	    for (let pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
	        pageButtons.push(
	            this.getPaginationButtonAdapter({
	                ...buttonProps,
	                type: "page",
	                pagenumber: pagenumber
	            })
	        );
	    }
	    if (loading) {
	        const local = getLangInfo(locale, i18n, 'pagination');
	        pageButtons.push(
	            this.getPaginationButtonAdapter({
	                ...buttonProps,
	                type: "loading",
	                children: <i className="uf-circle-loading" />,
	                title: local.langMap.loading || '加载中...',
	                disabled: true,
	                simple: true,
	                key: "loading",
	                className: `${clsPrefix}-loading`,
	            })
	        );
	    }
	    // 如果boundaryLinks和eclipsis且startPage!=1 需要加上before More Button
	    if (boundaryLinks && ellipsis && startPage !== 1) {
	        if (startPage > 2) {
	            pageButtons.unshift(
	                this.getPaginationButtonAdapter({
	                    type: "ellipsis",
	                    key: "ellipsisFirst",
	                    componentClass: buttonProps.componentClass,
	                    iconBtn: false,
	                })
	            );
	        }
	        // 加上最小边界 Button
	        pageButtons.unshift(
	            this.getPaginationButtonAdapter({
	                ...buttonProps,
	                type: "page",
	                pagenumber: 1,
	            })
	        );
	    }
	    // 如果maxButtons和eclipsis且hasHiddenPagesAfter 需加上after More Button
	    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
	        if (!boundaryLinks || (boundaryLinks && (items > 1 + endPage))) {
	            pageButtons.push(
	                this.getPaginationButtonAdapter({
	                    type: "ellipsis",
	                    key: "ellipsisLast",
	                    componentClass: buttonProps.componentClass,
	                    iconBtn: false,
	                })
	            );
	        }
	        // 如果最后一个页数按钮不等于总页数 且 边界为true 需加上最大边界按钮
	        if (boundaryLinks && endPage !== items) {
	            pageButtons.push(
	                this.getPaginationButtonAdapter({
	                    ...buttonProps,
	                    type: "page",
	                    pagenumber: items,
	                })
	            );
	        }
	    }

	    return pageButtons;
	}

	/**
	 * 渲染page的所有按钮
	 * @param buttonProps
	 * @param local
	 * @returns {Array}
	 */
	renderPageList = (buttonProps: PaginationButtonAdapterPublic, local: any): Array<React.ReactNode> => {
	    const {total, clsPrefix, simple, id, fieldid, size, dir, onKeyDown} = this.props;
	    const {jumpPageState, pageSize} = this.state;
	    return this.pageButtonMap.map(item => {
	        if (!item.isSimple && simple) return null;
	        if (item.type === 'center') {
	            return simple ? (typeof simple !== 'boolean' && !simple?.showQuickJumper) ? null
	                : (<div key="simple-center" className="page_jump page_jump_simple">
	                    <Input
	                        className="page_jump_value page_jump_value_simple"
	                        size={size === 'lg' ? 'lg' : 'xs'} // pagination只有两个size：sm=22和lg=40，与表单组件统一尺寸不一致，需特殊处理
	                        value={jumpPageState || ''}
	                        onPressEnter={this.handleEnsurePageJump}
	                        onKeyDown={onKeyDown}
	                        onBlur={this.handleEnsurePageJump}
	                        onChange={this.setPageJump}
	                        align="center"
	                    />
	                    <span>/ {Math.ceil(total / pageSize)}</span>
	                </div>
	            ) : this.renderPageButtons({...buttonProps, iconBtn: false})
	        }


	        return this.getPaginationButtonAdapter({
	            ...buttonProps,
	            display: this.props[item.type],
	            type: item.type,
	            children: item.children,
	            simple: simple,
	            key: item.type,
	            className: simple ? `${clsPrefix}-${item.type}-simple ${clsPrefix}-${item.type}-simple-${dir}` : `${clsPrefix}-${item.type}`,
	            title: local.langMap[item.type] || item.title,
	            id: id && `${id}-${item.type}`,
	            fieldid: fieldid && `${fieldid}-${item.type}`
	        })
	    })
	}

	render() {
	    const {
	        buttonComponentClass,
	        noBorder,
	        className,
	        style,
	        clsPrefix,
	        size,
	        gap,
	        pageSizeOptions,
	        itemRender,
	        showQuickJumper,
	        total,
	        disabled,
	        confirmBtn,
	        showTotal,
	        showTitle,
	        hideOnSinglePage,
	        showSizeChanger,
	        locale,
	        simple,
	        dropdownAlign,
	        id,
	        fieldid,
	        pageSizeInput,
	        sizeChangerProps = {},
	        cacheId,
	        onKeyDown,
	        dir: direction,
	        ...others
	    } = this.props;
	    const local = getLangInfo(locale, i18n, 'pagination');

	    const {jumpPageState, items, pageSize, activePage, selectOpen, selectFocus, loading} = this.state;

	    // sizeChangerProps 属性过滤，未配置属性不可渲染
	    let newSizeChangerProps: any = {};
	    for (let key in sizeChangerProps) {
	        if (sizeChangerPropsMap.includes(key)) newSizeChangerProps[key] = sizeChangerProps[key as keyof typeof sizeChangerProps];
	    }

	    const btnDom = confirmBtn ? confirmBtn({...this.props}) : null;

	    const classNames = classnames(`${clsPrefix}-list`, {
	        [`${clsPrefix}-no-border`]: noBorder,
	        [`${clsPrefix}-${size}`]: size,
	        [`${clsPrefix}-gap`]: !noBorder && gap,
	        [`${clsPrefix}-with-jumpbtn`]: !!btnDom,
	    });
	    const wrapperClass = classnames(clsPrefix, className, {
	        [`${clsPrefix}-simple`]: !!simple,
	        [`${clsPrefix}-disabled`]: disabled,
	        [`${clsPrefix}-rtl`]: direction === 'rtl',
	    });
	    /**
		 *  页按钮属性
		 *  onSelect:暴露在外层交互动作，也是与父组件Pagination的交流接口
		 *  componentClass: 用户定义的按钮dom元素类型
		 *  showTitle: 用户自定义定义title
		 */
	    const buttonProps: PaginationButtonAdapterPublic = {
	        onChange: this.onPageBtnSelect,
	        pageSize,
	        itemRender,
	        componentClass: buttonComponentClass,
	        iconBtn: true,
	        showTitle: showTitle,
	    };
	    const jumpBtn = btnDom ? (
	        <div id={id && `${id}-jump-btn`} fieldid={fieldid && `${fieldid}-jump-btn`} className="page_jump_btn" onClick={this.handleEnsurePageJump}>
	            {btnDom}
	        </div>
	    ) : null;

	    if (hideOnSinglePage && items === 1) return null; // hideOnSinglePage为true时,只有一页不显示分页器

	    const liChildren = this.renderPageList(
	        buttonProps,
	        local,
	    );
	    let adapterNid = getNid(this.props)
	    return (
	        <div id={id} fieldid={fieldid} style={style} className={wrapperClass} {...omit(others, ["activePage", "defaultActivePage", "pageSize", "defaultPageSize", "defaultDataNum", "boundaryLinks", "next", "prev", "last", "first", "ellipsis", "maxButtons", "onPageSizeChange", "onChange", "onSelect"])} {...adapterNid}>
	            {disabled && <div className={`${clsPrefix}-disabled-mask`}/>}
	            <ul className={classNames}>
	                {liChildren}
	            </ul>
	            {
	                total !== null && !simple ? (
	                    <div id={id && `${id}-total`} fieldid={fieldid && `${fieldid}-total`} className={`${clsPrefix}-total`}>
	                        {
	                            loading ? <span>{local.langMap.loading || '加载中...'}</span> :
	                            showTotal ? showTotal(total, [total === 0 ? 0 : (activePage - 1) * pageSize + 1, activePage * pageSize > total ? total : activePage * pageSize]) :
	                                <>{local.langMap.total || '共'}<span>{total}</span>{local.langMap.items || '条'}</>
	                        }
	                    </div>
	                ) : null
	            }

	            {
	                showSizeChanger || (typeof simple !== 'boolean' && simple?.showSizeChanger) ? (
	                    <div className={`data_per_select`}>
	                        <Select
	                            id={id && `${id}-size-changer`}
	                            fieldid={fieldid && `${fieldid}-size-changer`}
	                            mode={pageSizeInput ? "combobox" : undefined}
	                            dropdownAlign={dropdownAlign}
	                            getPopupContainer={this.getPopupContainer}
	                            value={selectFocus ? null : pageSize}
	                            open={selectOpen}
	                            onClick={this.handleSelectClick}
	                            onInputKeyDown={this.handleInputKeyDown}
	                            onBlur={this.handleSelectBlur}
	                            onFocus={this.handleSelectFocus}
	                            onSelect={this.dataNumSelect}
	                            onChange={this.handleSelectChange}
	                            listHeight={true}
	                            virtual={false}
	                            placeholder={selectFocus ? pageSize : null}
	                            size={size === 'lg' ? 'lg' : 'xs'} // pagination只有两个size：sm=22和lg=40，与表单组件统一尺寸不一致，需特殊处理
	                            dropdownClassName={`${clsPrefix}-select-dropdown`}
	                            {...newSizeChangerProps}
	                        >
	                            {pageSizeOptions.length > 0 &&
									pageSizeOptions.map((item, i) => {
									    return <Option key={i} value={item} className={selectFocus && item == pageSize ? `${prefix}-select-item-option-selected` : undefined} >{item}</Option>
									})}
	                        </Select>
	                        <span>{local.langMap.items}</span>
	                    </div>
	                ) : null
	            }
	            {
	                showQuickJumper && !simple ? (
	                    <div className="page_jump">
	                        <span>{local.langMap.goto}</span>
	                        <Input
	                            className="page_jump_value" // 此处用于自定义输入框css样式，无需传入size
	                            size={size === 'lg' ? 'lg' : 'xs'} // pagination只有两个size：sm=22和lg=40，与表单组件统一尺寸不一致，需特殊处理
	                            // autoComplete='off'
	                            value={jumpPageState || ''}
	                            onKeyDown={onKeyDown}
	                            onPressEnter={!jumpBtn ? this.handleEnsurePageJump : undefined}
	                            onBlur={!jumpBtn ? this.handleEnsurePageJump : undefined}
	                            onChange={this.setPageJump}
	                            id={id && `${id}-jump`}
	                            fieldid={fieldid && `${fieldid}-jump`}
	                        />
	                        <span>{local.langMap.page || '页'}</span>
	                        {jumpBtn}
	                    </div>
	                ) : null
	            }

	        </div>
	    );
	}
}

// Pagination.propTypes = propTypes;
// Pagination.contextTypes = {
//     beeLocale: PropTypes.object
// };
Pagination.getCache = getCache;
export default Pagination;
