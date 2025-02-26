import classNames from 'classnames';
import React from 'react';
import {Draggable, Droppable, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot} from 'react-beautiful-dnd';
import Animate from '../../wui-animate/src';
import Checkbox from '../../wui-checkbox/src';
import {KeyCode} from '../../wui-core/src';
import Icon from '../../wui-icon/src';
import Item from './item';
import PureRenderMixin from './PureRenderMixin';
import Search from './search';
import { TransferListProps, TransferListState, TransferItem,
    RenderItemObj, RenderCheckboxObj, TransferListMixin, TransferListBodyProps, TransferKeyType } from './iTransfer'
import { globalConfig } from '../../wui-provider/src';
// import {propTypes as transferPropTypes} from "./Transfer";

// const propTypes = {
//     ...transferPropTypes,
// }

function noop() {
}

const defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
    fieldid: ''
};

function isRenderResultPlainObject(result: React.ReactElement | RenderItemObj | string | void) { // renderItem可能渲染出组件，组件对象，字符串
    return result && !React.isValidElement(result) &&
		Object.prototype.toString.call(result) === '[object Object]';
}

class TransferList extends React.Component<TransferListProps, TransferListState> {
	static defaultProps = {...defaultProps}
	private timer: ReturnType<typeof setTimeout> | null = null;

	constructor(props: TransferListProps) {
	    super(props);
	    this.state = {
	        mounted: false,
	    };
	}

	componentDidMount() {
	    this.timer = setTimeout(() => {
	        this.setState({
	            mounted: true,
	        });
	    }, 0);
	}

	componentWillUnmount() {
	    this.timer && clearTimeout(this.timer);
	}

	shouldComponentUpdate(...args: TransferListMixin) {
	    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
	}

	matchFilter = (text: string, item: TransferItem) => {
	    // filter：搜索框中的内容
	    // filterOption：用户自定义的搜索过滤方法
	    const {filter = '', filterOption} = this.props;
	    if (filterOption) {
	        return filterOption(filter, item);
	    }
	    return text.indexOf(filter) >= 0;
	}

	/**
	 * 获取Checkbox状态
	 * @param {*} filteredDataSource dataSource中刨去设置为disabled的部分
	 */
	getCheckStatus(filteredDataSource: TransferItem[]) {
	    const {checkedKeys} = this.props;
	    if (checkedKeys && checkedKeys.length === 0) {
	        return 'none'; // 全部未选
	    } else if (checkedKeys && filteredDataSource.length > 0 && filteredDataSource.every(item => checkedKeys.indexOf(item.key) >= 0)) {
	        return 'all'; // 全部已选
	    }
	    return 'part'; // 部分已选
	}

	/**
	 * 点击list item，选中或取消选中
	 * @param selectedItem 选中的item的信息，和dataSource数据源中的item信息一致
	 */
	handleSelect = (selectedItem: TransferItem) => {
	    // checkedKeys：已勾选的Keys数组
	    // result：是否已勾选，true：已勾选  false：未勾选
	    const {checkedKeys} = this.props;
	    const result = checkedKeys?.some((key) => key === selectedItem.key);
	    this.props.handleSelect?.(selectedItem, result);
	}

	handleFilter = (e: string) => {
	    this.props.handleFilter?.(e);
	}

	handleClear = () => {
	    this.props.handleClear?.();
	}

	handleScroll = (e: React.UIEvent<HTMLElement>) => {
	    const {handleScroll} = this.props
	    handleScroll && handleScroll(e)
	}

	renderItem = (item: TransferItem) => {
	    const {render = noop} = this.props;
	    const renderResult: React.ReactElement | RenderItemObj | string | void = render(item);
	    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
	    return {
	        renderedText: isRenderResultPlain ? (renderResult as RenderItemObj).value : typeof renderResult === 'string' ? renderResult : '',
	        renderedEl: isRenderResultPlain ? (renderResult as RenderItemObj).label : renderResult as string,
	    };
	}

	renderCheckbox({prefixCls, filteredDataSource, checked, checkPart, disabled}: RenderCheckboxObj) {
	    let { dataSource } = this.props;
	    // 判断可选列表是否都置灰，同步置灰顶部选择框
	    let isAllDisabled = !(dataSource && dataSource.find(item=> !item?.disabled));
	    const checkAll = (!checkPart) && checked; // 非半选 && 全选
	    prefixCls = "u"
	    const checkboxCls = classNames({
	        [`${prefixCls}-checkbox-indeterminate`]: checkPart,
	        [`${prefixCls}-checkbox-disabled`]: disabled,
	    });
	    return (
	        <Checkbox
	            onChange={() => this.props.handleSelectAll?.(filteredDataSource, checkAll)}
	            className={checkboxCls}
	            checked={checkAll}
	            disabled={disabled || isAllDisabled}
	        />
	    );
	}

	onKeyDown = (event: React.KeyboardEvent, provided: typeof DraggableProvided, snapshot: typeof DraggableStateSnapshot) => {
	    if (provided.dragHandleProps) {
	        (provided.dragHandleProps as any).onKeyDown(event); // onKeyDown似乎已经不在react-beautiful-dnd里了，这个onKeyDown也无法触发。
	    }

	    if (event.defaultPrevented) {
	        return;
	    }

	    if (snapshot.isDragging) {
	        return;
	    }

	    if (event.keyCode !== KeyCode.ENTER) {
	        return;
	    }

	    // 为了选择，我们使用此事件 we are using the event for selection
	    event.preventDefault();

	    // this.performAction(event, item); // 没有这个方法的定义，注释掉
	};

	getDefaultBodyContent = () => {
	    const { dataSource, prefixCls, filter, lazy, checkedKeys = [], draggable,
	        showCheckbox, draggingItemId, id, droppableId, disabled
	    } = this.props;
	    // not disabled items
	    const filteredDataSource: TransferItem[] = [];
	    // all show items
	    const totalDataSource: any[] = [];
	    const showItems = dataSource!.map((item, index) => {
	        if (!item) {
	            return
	        }
	        item = {...item, disabled: disabled || item.disabled }
	        const {renderedText, renderedEl} = this.renderItem(item);
	        if (filter && filter.trim() && typeof renderedText === 'string' && !this.matchFilter(renderedText, item)) {
	            return null;
	        }

	        totalDataSource.push(item);

	        if (!item.disabled) {
	            filteredDataSource.push(item);
	        }
	        const checked = checkedKeys.indexOf(item.key as string) >= 0;
	        return (
	            <Draggable key={item.key as React.Key} index={index} draggableId={`${item.key}`}
						   isDragDisabled={draggable ? item.disabled : !draggable}>
	                {(provided: typeof DraggableProvided, snapshot: typeof DraggableStateSnapshot) => (
	                    <div
	                        ref={provided.innerRef}
	                        {...provided.draggableProps}
	                        {...provided.dragHandleProps}
	                        // onClick={(event) =>this.handleDrag(event, provided, snapshot, item)}
	                        onKeyDown={(event) =>
	                            this.onKeyDown(event, provided, snapshot)
	                        }
	                        // className={classnames({
	                        //     ...getClass(this.props,snapshot.isDragging).drag
	                        //   })}
	                        style={{...provided.draggableProps.style}}>
	                        <Item
	                            // ref={provided.innerRef} //Error: provided.innerRef has not been provided with a HTMLElement
	                            // key={item.key}
	                            item={item}
	                            lazy={lazy}
	                            renderedText={renderedText}
	                            renderedEl={renderedEl}
	                            checked={checked}
	                            checkedKeys={checkedKeys}
	                            prefixCls={prefixCls}
	                            onClick={this.handleSelect}
	                            showCheckbox={showCheckbox as boolean}
	                            isMultiDragSource={draggingItemId === item.key}
	                            draggingItemId={draggingItemId}
	                        />
	                    </div>
	                )}
	            </Draggable>)
	    });
	    const defaultBodyContent = <Droppable droppableId={`droppable${id}`} direction='vertical' isDropDisabled={!draggable}>
	        {(provided: typeof DroppableProvided, snapshot: typeof DroppableStateSnapshot) => (
	            <div onScroll={event => this.handleScroll(event)} ref={provided.innerRef} key={id}
				 className={`${prefixCls}-content`}>
	                <div style={{display: 'none'}}>{provided.placeholder}</div>
	                <Animate
	                    component="ul"
	                    transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''}
	                    transitionLeave={false}
	                >
	                    {showItems}
	                </Animate>
	                <div
	                    className={`${prefixCls}-delete-selected ${snapshot.isDraggingOver && droppableId === 'droppable2' ? 'show' : ''}`}>
	                    <div className={`${prefixCls}-del-btn`}>
	                        <Icon type="uf-arrow-down-2"></Icon>
	                        <span>移除已选</span>
	                    </div>
	                </div>
	            </div>
	        )}
	    </Droppable>
	    return {filteredDataSource, totalDataSource, defaultBodyContent};
	}

	renderBodyContent = (
	    renderList: (props: TransferListBodyProps) => React.ReactNode,
	    props: TransferListBodyProps,
	    defaultListBody: React.ReactNode,
	  ) => {
	    let bodyContent: React.ReactNode = renderList ? renderList(props) : null;
	    const customize: boolean = !!bodyContent;
	    if (!customize) {
		  bodyContent = defaultListBody;
	    }
	    return {
		  customize,
		  bodyContent,
	    };
	  };

	  getSelectAllLabel = (checkedCount: number, totalCount: number, checkedKeys: TransferKeyType[], totalDataSource: any[]) : React.ReactNode => {
	      const { selectAllLabel } = this.props;
		  const {getGlobalDirection} = globalConfig();
		  const direction = getGlobalDirection();
	      if (selectAllLabel) {
		  return typeof selectAllLabel === 'function'
	              ? selectAllLabel({ checkedCount, totalCount, checkedKeys, totalDataSource })
	              : selectAllLabel;
	      }
		  if (direction === 'rtl') {
	          return (
	              <>
	              { `(${totalCount}/` + (checkedCount > 0 ? `${checkedCount})` : '0)') }
	              </>
	          );
	      }
	      return (
	          <>
	              {(checkedCount > 0 ? `(${checkedCount}/` : '(0/') + `${totalCount})`}
	          </>
	      );
	  }


	  render() {
	    const {
	        prefixCls,
	        dataSource,
	        titleText,
	        filter,
	        checkedKeys = [],
	        body = noop,
	        footer = noop,
	        showSearch,
	        style,
	        showCheckbox,
	        draggable,
	        fieldid,
	        renderList,
	        handleSelectAll,
	        direction,
	        disabled = false,
	    } = this.props;
	    let {searchPlaceholder, notFoundContent} = this.props;

	    // Custom Layout
	    const footerDom = footer(Object.assign({}, this.props));
	    const bodyDom = body(Object.assign({}, this.props));

	    const listCls = classNames(prefixCls, {
	        [`${prefixCls}-with-footer`]: !!footerDom,
	        [`${prefixCls}-draggable`]: !!draggable
	    });

	    const {filteredDataSource, totalDataSource, defaultBodyContent} = this.getDefaultBodyContent();

	    const {bodyContent, customize} = this.renderBodyContent(
	        renderList as (props: TransferListBodyProps) => React.ReactNode,
	        {
	            ...this.props,
	            onItemSelect: this.handleSelect,
	            onItemSelectAll: handleSelectAll,
	            direction: direction,
	            dataSource: totalDataSource,
	            checkedKeys: checkedKeys,
	        },
	        defaultBodyContent
	    );

	    // 无用代码
	    // let unit = '';
	    // const antLocale = this.context.antLocale;
	    // if (antLocale && antLocale.Transfer) {
	    //     const transferLocale = antLocale.Transfer;
	    //     unit = dataSource.length > 1 ? transferLocale.itemsUnit : transferLocale.itemUnit;
	    //     searchPlaceholder = searchPlaceholder || transferLocale.searchPlaceholder;
	    //     notFoundContent = notFoundContent || transferLocale.notFoundContent;
	    // }

	    const checkStatus = this.getCheckStatus(filteredDataSource);
	    const outerPrefixCls = (prefixCls as string).replace('-list', '');
	    const fieldidProp = fieldid ? { fieldid } : {}
	    const search = showSearch ? (
	        <div className={`${prefixCls}-body-search-wrapper`}>
	            <Search
	                prefixCls={`${prefixCls}-search`}
	                onChange={this.handleFilter}
	                handleClear={this.handleClear}
	                placeholder={searchPlaceholder}
	                value={filter}
	                disabled={disabled}
	                {...fieldidProp}
	            />
	        </div>
	    ) : null;

	    const listBody = bodyDom || (
	        <div className={showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
	            {search}
	            {bodyContent}
	            <div className={`${prefixCls}-body-not-found ${(!customize ? dataSource!.length == 0 : !bodyContent) ? "show" : ""}`}>
	                {notFoundContent}
	            </div>
	        </div>
	    );

	    const listFooter = footerDom ? (
	        <div className={`${prefixCls}-footer`}>
	            {footerDom}
	        </div>
	    ) : null;

	    const renderedCheckbox = this.renderCheckbox({
	        prefixCls: outerPrefixCls,
	        checked: checkStatus === 'all',
	        checkPart: checkStatus === 'part',
	        filteredDataSource,
	        disabled: disabled,
	    });

	    return (
	        <div className={listCls} style={style}>
	            <div className={`${prefixCls}-header`}>
	                {showCheckbox ? renderedCheckbox : ''}
	                <span className={`${prefixCls}-header-selected`}>
	                    <span className={`${prefixCls}-header-title`}>
	                        {titleText}
	                    </span>
	                    <span className={`${prefixCls}-header-number`}>
	                        {this.getSelectAllLabel(checkedKeys.length, totalDataSource.length, checkedKeys, totalDataSource)}
	                    </span>
	                </span>
	            </div>
	            {listBody}
	            {listFooter}
	        </div>
	    );
	  }
}

// TransferList.propTypes = propTypes;
// TransferList.defaultProps = defaultProps;
export default TransferList;
