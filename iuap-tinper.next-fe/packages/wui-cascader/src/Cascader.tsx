// import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';
// import Rcascader from './rc/index';
// import PropTypes from 'prop-types';
import RcCascader from 'rc-cascader';
// import omit from 'rc-util/lib/omit';
import KeyCode from 'rc-util/lib/KeyCode';
import React, {Component} from 'react';
import {cssUtil, getNid, WebUI, setComponentClass} from "../../wui-core/src/index"
import Empty from '../../wui-empty/src'
import Icon from '../../wui-icon/src'
import Input from '../../wui-input/src';
import Tabs from '../../wui-tabs/src';
import addEventListener from '../../wui-overlay/src/utils/addEventListener';
import {getLangInfo} from '../../wui-locale/src/tool';
import i18n from './i18n';
import {setComponentSize} from "../../wui-core/src/componentStyle"
import { ConfigContext, WithConfigConsumer} from "../../wui-provider/src/context";
import _cloneDeep from 'clone';

import { CascaderProps, CascaderState, OptionType, CascaderOption, ShowSearchType, FieldNames } from './iCascader.js';
const arrayTreeFilter = (data: CascaderOption[], filterFn: any, options: any) => {
    options = options || {};
    options.childrenKeyName = options.childrenKeyName || "children";
    let children = data || [];
    let result = [];
    let level = 0;
    do {
        let foundItem = children.filter((item) => {
            return filterFn(item, level);
        })[0];
        if (!foundItem) {
            break;
        }
        result.push(foundItem);
        children = foundItem[options.childrenKeyName] || [];
        level += 1;
    } while (children.length > 0);
    return result;
}
const VALUE_SPLIT = '__RC_CASCADER_SPLIT__';
const {TabPane} = Tabs;
const { SHOW_CHILD, SHOW_PARENT } = RcCascader
const defaultProps = {
    prefixCls: 'wui-cascader',
    showSearch: false,
    allowClear: true,
    changeOnSelect: false,
    autoFocus: false,
    suffixIcon: null,
    expandIcon: null,
    size: 'md',
    // getPopupContainer: () => document.body,
    expandTrigger: 'click',
    separator: '/',
    placeholder: '',
    dropdownRender: null,
    fieldNames: {},
    className: '',
    defaultValue: [],
    disabled: false,
    loadData: null,
    // notFoundContent: '',
    options: [],
    popupClassName: '',
    style: {},
    onChange: () => {
    },
    onPopupVisibleChange: () => {
    },
    locale: 'zh-cn',
    multiple: false,
    resultListMatchInputWidth: false
};
const keepFilteredValueField = '__KEEP_FILTERED_OPTION_VALUE';

@WithConfigConsumer()
@WebUI({name: "cascader", defaultProps})
class Cascader extends Component<CascaderProps, CascaderState> {
	static contextType = ConfigContext;
	static SHOW_CHILD: typeof SHOW_CHILD;
	static SHOW_PARENT: typeof SHOW_PARENT;
	constructor(props: CascaderProps) {
	    super(props)
	    const local = getLangInfo(props.locale, i18n, 'cascader');
	    this.state = {
	        value: props.value || props.defaultValue || [],
	        inputValue: '',
	        inputFocused: false,
	        popupVisible: props.popupVisible,
	        prevProps: props,
	        flattenOptions: props.showSearch ? this.flattenTree(props.options, props) : undefined,
	        popupClassName: props.popupClassName,
	        initInputValue: props.inputValue,
	        dropDownCls: false,
	        loadedKeys: [],
	        restData: [],
	        dropdownDom: props.dropdownRender,
	        dropdownMatchSelectWidth: false,
	        isMoreTagClick: false,
	        // tabsArr: [
	        //     {
	        //         tab: '请选择',
	        //         key: '1',
	        //         content: props.options
	        //     }
	        // ],
	        tabsArr: props.tabsItems ? _cloneDeep(props.tabsItems) : [{tab: local.langMap.placeholder, key: '1', content: props.options}],
	        tabsActiveKey: props.tabsItems ? props.tabsItems[1].key : '1',
	        tiledContent: this.tiledDom,
	        deepNum: props.tabsItems ? 1 : 0, // 平铺options项时，当前项深度
	        tiledValue: props.tabsItems ? [props.tabsItems[1].key] : [],
	        tiledSelectedOptions: props.tabsItems ? [{label: [...props.tabsItems][0].tab, value: [...props.tabsItems][1].key, children: [...props.tabsItems][1].content}] : [],
	        options: props.options,
			isClear: false
	    }
	    this.getLabel = this.getLabel.bind(this)
	    this.defaultDisplayRender = this.defaultDisplayRender.bind(this)
	    this.getFilledFieldNames = this.getFilledFieldNames.bind(this)
	    this.handleChange = this.handleChange.bind(this)
	    this.clearSelection = this.clearSelection.bind(this)
	    this.handlePopupVisibleChange = this.handlePopupVisibleChange.bind(this)
	    this.handleInputChange = this.handleInputChange.bind(this)
	    this.handleInputClick = this.handleInputClick.bind(this)
	    this.handleInputBlur = this.handleInputBlur.bind(this)
	    this.saveInput = this.saveInput.bind(this)
	    this.handleInputBox = this.handleInputBox.bind(this)
	    this.generateFilteredOptions = this.generateFilteredOptions.bind(this)
	    this.defaultFilterOption = this.defaultFilterOption.bind(this)
	    this.defaultRenderFilteredOption = this.defaultRenderFilteredOption.bind(this)
	    this.defaultSortFilteredOption = this.defaultSortFilteredOption.bind(this)
	    this.flattenTree = this.flattenTree.bind(this)
	    // this.getOptios = this.getOptios.bind(this)
	}

	input?: HTMLInputElement;
	menuAddEvent: any;
	matchingoptions: any;
	restData: any;

	// eslint-disable-next-line
    UNSAFE_componentWillReceiveProps(nextProps: CascaderProps) {
	    if ('value' in nextProps && nextProps.value instanceof Array && (this.props.value?.length != nextProps.value?.length || JSON.stringify(this.props.value) != JSON.stringify(nextProps.value))) {
	        this.setState({
	            value: nextProps.value
	        })
	    }
	    if ('dropdownRender' in nextProps) {
	        this.setState({
	            dropdownDom: nextProps.dropdownRender
	        })
	    }
	    if ('options' in nextProps && this.props.options?.length !== nextProps.options?.length && !this.state.isClear) {
	        const local = getLangInfo(nextProps.locale, i18n, 'cascader');
	        this.setState({
	            // options: nextProps.options,
	            tabsArr: nextProps.tabsItems ? _cloneDeep(nextProps.tabsItems) : [
	                {
	                    tab: local.langMap.placeholder,
	                    key: '1',
	                    content: nextProps.options
	                }
	            ],
	            flattenOptions: nextProps.showSearch ? this.flattenTree(nextProps.options, nextProps) : undefined,
	            tiledContent: this.tiledDom,
				tabsActiveKey: nextProps.tabsItems ? nextProps.tabsItems[1].key : '1',
	        })
	    }
	    if ('options' in nextProps) {
	        this.setState({
	            options: nextProps.options
	        })
	    }
	    if ('tabsItems' in nextProps && (this.props.tabsItems?.length != nextProps.tabsItems?.length || JSON.stringify(this.props.tabsItems) != JSON.stringify(nextProps.tabsItems))) {
	        // if ('tabsItems' in nextProps) {
	        const local = getLangInfo(nextProps.locale, i18n, 'cascader');
	        this.setState({
	            tabsArr: nextProps.tabsItems ? _cloneDeep(nextProps.tabsItems) : [{tab: local.langMap.placeholder, key: '1', content: nextProps.options}],
	            tabsActiveKey: nextProps.tabsItems ? nextProps.tabsItems[1].key : '1',
	            deepNum: 1,
				tiledValue: nextProps.tabsItems ? [nextProps.tabsItems[1].key] : []
	        })
	    }
	}

	componentDidMount() {
	    this.props?.onRef && this.props.onRef(this)
	}

	componentWillUnmount() {
	    this.menuAddEvent && this.menuAddEvent.remove()
	}

	// 判断cascader是否父元素是modal或drawer，如果是则挂在到modal或drawer上
	getPopupContainerDom = (dom: HTMLElement) => {
	    const {getPopupContainer} = this.props;
	    if (typeof getPopupContainer === 'function') {
	        return getPopupContainer(dom)
	    } else {
	        return cssUtil.parentsUntil(dom);
	    }
	}

	getFilledFieldNames() {
	    const fieldNames = this.props.fieldNames || {};
	    const names = {
	        children: fieldNames.children || 'children',
	        label: fieldNames.label || 'label',
	        value: fieldNames.value || 'value',
	    };
	    return names;
	}

	getEmptyNode(names: any, notFoundContent: string) {
	    return {
	        [names.value]: 'ANT_CASCADER_NOT_FOUND',
	        [names.label]: notFoundContent || (<Empty locale={this.props.locale}/>),
	        disabled: true,
	        isEmptyNode: true,
	    };
	}

	defaultDisplayRender(label: (string | number)[] | OptionType[]) {
	    let {value} = this.state;
	    let {separator, fieldNames} = this.props
	    let labelKey = fieldNames?.label || 'label'
	    // console.log(value)
	    if (value.length > 0) {
	        if (typeof value[0] == 'string') {
	            return label.length > 0 ? label.join(` ${separator} `) : ''
	        } else if (typeof value[0] == 'object') {

	            let filterArr: (string | number)[] = []
	            value.map((item: any) => {
	                filterArr.push(item.label ? item.label : item[labelKey])
	            })
	            // console.log(filterArr)
	            return filterArr.length > 0 ? filterArr.join(` ${separator} `) : ''
	        }
	    } else {
	        return
	    }


	}

	getLabel() {
	    const {options, displayRender = this.defaultDisplayRender, dir} = this.props;
	    const names = this.getFilledFieldNames();
	    const {value} = this.state;
	    const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
	    const selectedOptions = arrayTreeFilter(
	        options as CascaderOption[],
	        (o:CascaderOption, level: number) => o[names.value] === unwrappedValue[level],
	        {childrenKeyName: names.children},
	    );
	    let label = selectedOptions.length ? selectedOptions.map((o: CascaderOption) => o[names.label]) : value;
	    if (dir === 'rtl') {
	        label = Array.isArray(label) ? label.reverse() : label;
	    }
	    return displayRender(label, selectedOptions);
	}

	saveInput(node: HTMLInputElement) {
	    this.input = node;
	}

	setDomFieldid = () => {
	    let {fieldid, prefixCls} = this.props;
	    let arr = document.querySelectorAll(`.${this.state.popupClassName} .${prefixCls}-menus .uf-arrow-right`)
	    arr.forEach((item, index)=>{
	        item.setAttribute('fieldid', fieldid + '_expand_' + index)
	    })
	}

	// 设置fieldid方案
	setFieleid = () => {
	    let {fieldid, prefixCls, popupClassName, expandTrigger} = this.props;
	    if (fieldid) {
	        // 添加fieldid时，设置popupClassName，以方便找到当前级联的下拉dom，给相应的dom内的icon添加唯一fieldid
	        let newFieldid = fieldid.split('|').join('')
	        this.setState({
	            popupClassName: popupClassName || newFieldid
	        })
	        // 因初始化时下拉dom是不存在的，只有点击了级联组件才在body下创建了下拉dom，这里为了一定能找到相应的dom，所以添加了一个定时器
	        setTimeout(()=>{
	            if (expandTrigger == "hover") {
	                let arrLabel = document.querySelectorAll(`.${this.state.popupClassName} .${prefixCls}-menus .${prefixCls}-menu-item`)
	                arrLabel.forEach((node)=>{
	                    // node.addEventListener('mouseover', this.menuMouseoverHandle)
	                    this.menuAddEvent = addEventListener(node, 'mouseover', this.menuMouseoverHandle)
	                })
	            } else {
	                let arrLabel = document.querySelectorAll(`.${this.state.popupClassName} .${prefixCls}-menus .${prefixCls}-menu-item`)
	                arrLabel.forEach((node)=>{
	                    // node.addEventListener('click', this.menuMouseoverHandle)
	                    this.menuAddEvent = addEventListener(node, 'click', this.menuMouseoverHandle)
	                })
	                this.setDomFieldid()
	            }
	        }, 200)
	    }
	}

	menuMouseoverHandle = () => {
	    setTimeout(()=>{
	        this.setDomFieldid()
	    }, 200)
	}

	getSelectedPath = (options: any, val: any) => {
	    let { fieldNames } = this.props
	    let valueKey = fieldNames?.value || 'value'
	    let childKey = fieldNames?.children || 'children'
	    let selectValue: any[] = []
	    const dep = (options: any, val: any) => {
	        if (options?.length === 0) {
	            return
	        }
	        for (let i = 0; i < (options as any)?.length; i++) {
	            // if (val[val?.length - 1] === options[i][valueKey as any]) {
	            //     selectValue = options![i];
	            //     break
	            // }
	            for (let j = 0; j < val?.length; j++) {
	                if (val[j] === options[i][valueKey]) {
	                    selectValue.push(options[i])
	                }
	            }
	            if (options![i][childKey]?.length) {
	                dep(options![i]?.children, val)
	            }
	        }
	    }
	    dep(options, val)
	    return selectValue
	}

	handleChange(value: Array<string>, selectedOptions: CascaderOption[]) {
	    let { showSearch, options } = this.props
	    let copySelectValue: any = this.getSelectedPath(options, value)
	    this.setState({inputValue: '', initInputValue: ''});
	    if (selectedOptions[0]?.__IS_FILTERED_OPTION) {
	        const unwrappedValue =
				selectedOptions[0][keepFilteredValueField] === undefined
				    ? value[0]
				    : selectedOptions[0][keepFilteredValueField];
	        const unwrappedSelectedOptions = selectedOptions[0].path;
	        this.setValue(unwrappedValue, unwrappedSelectedOptions);
	        return;
	    }
	    if (showSearch) {
	        this.setState({
	            dropDownCls: false
	        })
	    }
		this.setState({
			isClear: false
		})
	    this.setValue(value, [...copySelectValue], [...selectedOptions]);
	}

	setValue = (value: Array<string>, selectedOptions?: CascaderOption[], originSelectOptions?: CascaderOption[]) => {
	    // if (!('value' in this.props)) {
	    //   this.setState({ value });
	    // }
	    this.setState({value});
	    const {onChange, multiple} = this.props;
	    if (multiple) {
	        onChange && onChange(value, originSelectOptions);
	    } else {
	        onChange && onChange(value, selectedOptions);
	    }
	};

	handlePopupVisibleChange(popupVisible: boolean, _isClear: any) {
	    if (!('popupVisible' in this.props)) {
	        this.setState(state => ({
	            popupVisible,
	            inputFocused: popupVisible,
	            inputValue: popupVisible ? state.inputValue : '',
	        }));
	    }
	    const {onPopupVisibleChange} = this.props;
	    onPopupVisibleChange?.(popupVisible, _isClear);
	}

	clearSelection(e: React.MouseEvent<HTMLElement>) {
	    const {inputValue} = this.state;
	    e.preventDefault();
	    e.stopPropagation();
	    if (!inputValue) {
	        this.handlePopupVisibleChange(false, 'isClear');
	        setTimeout(() => {
	            this.setValue([]);
	        }, 200);
	    } else {
	        this.setState({inputValue: ''});
	    }
	    this.setState({
	        initInputValue: '',
			isClear: true
	    })
	    if (this.props.dropdownType == 'tiled' || this.props.dropdownType == '') {
	        let {options} = this.state
			let { tabsItems } = this.props
			if (tabsItems && tabsItems?.length > 0) {
				tabsItems.map((item, index) => {
					if (index == 1) {
						item.tab = '请选择'
					}
				})
			}
	        this.setState({
	            tabsArr: tabsItems ? _cloneDeep(tabsItems) : [
	                {
	                    tab: '请选择',
	                    key: '1',
	                    content: options
	                }
	            ],
	            tabsActiveKey: tabsItems ? tabsItems[1].key : '1',
	            deepNum: tabsItems ? 1 : 0,
				isClear: true
	        })
	    }
	}

	handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
	    // SPACE => https://github.com/ant-design/ant-design/issues/16871
	    if (e.keyCode === KeyCode.BACKSPACE || e.keyCode === KeyCode.SPACE) {
	        e.stopPropagation();
	    }
	}

	handleInputChange(e: string) {
	    this.setState({value: []});
	    const {popupVisible} = this.state;
	    const inputValue = e;
	    if (!popupVisible) {
	        this.handlePopupVisibleChange(true, '');
	    }
	    this.setState({inputValue, initInputValue: inputValue, isClear: false});
		// this.setState({inputValue, initInputValue: inputValue});
	    // 可搜索时（showSearch），返回input的输入值及匹配项
	    const {onSearch} = this.props;
	    this.setFocusHandle(inputValue)
	    onSearch && onSearch(inputValue, this.matchingoptions);
	}

	handleInputBox() {
	    let {showSearch} = this.props;
	    if (showSearch) {
	        this.input!.focus()
	    }
	    this.setFieleid()
	}

	getPopupPlacement(direction = 'ltr') {
	    const {popupPlacement} = this.props;
	    if (popupPlacement !== undefined) {
	        return popupPlacement;
	    }
	    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
	}

	handleInputClick(e: React.MouseEvent<HTMLInputElement>) {
	    const {inputFocused, popupVisible} = this.state;
	    // Prevent `Trigger` behaviour.
	    if (inputFocused || popupVisible) {
	        e.stopPropagation();
	    }
	}

	handleInputBlur() {
	    this.setState({
	        inputFocused: false,
	    });
	}

	highlightKeyword(str: string, keyword: string, prefixCls: string | undefined) {
	    return str.split(keyword).map((node, index) =>
	        index === 0
	            ? node
	            : [
	                <span className={`${prefixCls}-menu-item-keyword`} key="seperator">
	                    {keyword}
	                </span>,
	                node,
	            ],
	    );
	}

	defaultFilterOption(inputValue: string, path: CascaderOption[]) {
	    // let path = this.props.options
	    let names = this.getFilledFieldNames();
	    return path.some(option => (typeof option[names.label] === 'string' ? option[names.label] : option?.title)?.indexOf(inputValue) > -1);
	}

	defaultRenderFilteredOption(inputValue: string, path: CascaderOption[]) {
	    let {prefixCls} = this.props
	    let names = this.getFilledFieldNames();
	    return path.map((option, index) => {
	        const label = typeof option[names.label] === 'string' ? option[names.label] : option?.title
	        const node =
				(label).indexOf(inputValue) > -1
				    ? this.highlightKeyword(label, inputValue, prefixCls)
				    : label;
	        return index === 0 ? node : [' / ', node];
	    });
	}

	defaultSortFilteredOption(a: CascaderOption[], b: CascaderOption[], inputValue: string) {
	    // let { inputValue } = this.state
	    let names = this.getFilledFieldNames();

	    function callback(elem: any) {
	        return (typeof elem[names.label] === 'string' ? elem[names.label] : elem?.title).indexOf(inputValue) > -1;
	    }

	    return a.findIndex(callback) - b.findIndex(callback);
	}

	flattenTree(options = this.props.options, props = this.props, ancestor = []) {
	    // let ancestor = []
	    const names = this.getFilledFieldNames();
	    let flattenOptions: CascaderOption[] = [];
	    const childrenName = names.children;
	    (options as Array<any>).forEach(option => {
	        const path = ancestor.concat(option);
	        if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
	            flattenOptions.push(path);
	        }
	        if (option[childrenName]) {
	            flattenOptions = flattenOptions.concat(this.flattenTree(option[childrenName], this.props, path));
	        }
	    });
	    return flattenOptions;
	}

	generateFilteredOptions(_prefixCls: string) {
	    const {showSearch, notFoundContent} = this.props;
	    const names = this.getFilledFieldNames();
	    const {
	        filter = this.defaultFilterOption,
	        render = this.defaultRenderFilteredOption,
	        sort = this.defaultSortFilteredOption,
	        limit = 50,
	    } = showSearch as ShowSearchType;
	    const {flattenOptions = [], inputValue} = this.state;
	    // Limit the filter if needed
	    let filtered = [];
	    // debugger
	    if (limit as number > 0) {
	        filtered = [];
	        let matchCount = 0;

	        // Perf optimization to filter items only below the limit
	        flattenOptions.some((path: any) => {
	            const match = filter(this.state.inputValue, path, names);
	            if (match) {
	                filtered.push(path);
	                matchCount += 1;
	            }
	            return matchCount >= (limit as number);
	        });
	    } else {
	        filtered = flattenOptions.filter((path: any) => filter(this.state.inputValue, path, names as FieldNames));
	    }

	    filtered = filtered.sort((a: CascaderOption[], b: CascaderOption[]) => sort(a, b, inputValue, names));

	    if (filtered.length > 0) {
	        // Fix issue: https://github.com/ant-design/ant-design/issues/26554
	        const field = names.value === names.label ? keepFilteredValueField : names.value;

	        return filtered.map(
	            (path: CascaderOption[]) =>
	                ({
	                    __IS_FILTERED_OPTION: true,
	                    path,
	                    [field]: path.map((o: CascaderOption) => o[names.value]),
	                    [names.label]: render(inputValue as string, path),
	                    disabled: path.some((o: CascaderOption) => !!o.disabled),
	                    isEmptyNode: true,
	                }),
	        );
	    }
	    return [this.getEmptyNode(names, notFoundContent as string)];
	}

	focus() {
	    (this.input as HTMLInputElement).focus();
	}

	blur() {
	    (this.input as HTMLInputElement).blur();
	}

	setFocusHandle = (value: string) => {
	    if (value != '') {
	        this.setState({
	            dropDownCls: true
	        })
	    } else {
	        this.setState({
	            dropDownCls: false
	        })
	    }
	}

	onSearch = (value: string) => {
	    let { onSearch } = this.props
	    this.setFocusHandle(value)
	    onSearch && onSearch(value)
	}
	loadData = (selectedOptions: any) => {
	    let { loadData, fieldNames, dropdownType } = this.props
	    let { loadedKeys } = this.state
	    let currentOptions = selectedOptions[selectedOptions.length - 1]
	    let valueKey = fieldNames?.id || fieldNames?.value || 'value'
	    let lastValueKey = currentOptions[valueKey as string] || currentOptions.value
	    if (!loadedKeys.includes(lastValueKey)) {
	        loadedKeys.push(lastValueKey)
	        this.setState({
	            loadedKeys
	        })
	    } else {
	        return
	    }
	    // let newSelectedOptions = [...selectedOptions].reverse()
	    // selectedOptions.reverse()
	    if (dropdownType == "tiled") {
	        this.setState({
	            tabsActiveKey: currentOptions[valueKey]
	        })
	    }
	    loadData && loadData(selectedOptions)
	}

	onDelete = (deletedValue: Record<string, any>) => {
	    let { value } = this.state
	    this.restData = this.restData?.filter((item: Record<string, any>) => item.value != deletedValue.value)
	    value = (value as Array<Array<string>>).filter((item: Record<string, any>) => deletedValue.valueCells[deletedValue.valueCells.length - 1] != item[item.length - 1])
	    if (this.restData.length === 0) {
	        this.setState({
	            dropdownDom: this.props.dropdownRender,
	            dropdownMatchSelectWidth: false
	        })
	    }
	    this.setState({
	        value
	    })
	}

	getDropDwnNode = () => {
	    let { prefixCls } = this.props
	    let restData = this.restData
	    let dom = null
	    dom = (<div className={`${prefixCls}-auto-tag-overflow`}>
	        {restData?.map((node: any, index: number) => {
	            return (<div key={index}><span className={`${prefixCls}-auto-tag-overflow-item`}>
	                    <span
	                        title={node.label}
	                        className={`${prefixCls}-auto-tag-overflow-item-label`}
	                    >
	                        {node.label || node.children}
	                    </span>
	                    {
	                        !node.disabled &&
									<span className={`${prefixCls}-auto-tag-overflow-item-delete`}>
									    <Icon onClick={() => this.onDelete(node)} type="uf-close" />
									</span>
	                    }
	                </span></div>)
	        }
	        )}
	    </div>)
	    return dom
	}

	onTagMouseDown= (event: React.MouseEvent) => {
	    let { prefixCls } = this.props
	    const baseClassName = `${prefixCls}-selection-overflow-item`;
	    const parent = cssUtil.parent(event.target as HTMLElement, `.${baseClassName}`)
	    if (parent && ((parent as HTMLElement).getAttribute('class') as string).includes(`${baseClassName}-rest`)) {
	        // return setIsMoreTagClick(true)
	        // this.getDropDwnNode()
	        this.setState({
	            dropdownDom: this.getDropDwnNode,
	            dropdownMatchSelectWidth: true,
	            isMoreTagClick: true
	        })
	        return
	    }
	    // setIsMoreTagClick(false)
	    this.setState({
	        dropdownDom: this.props.dropdownRender,
	        dropdownMatchSelectWidth: false,
	        isMoreTagClick: false
	    })
	}
	onRenderRest = (values: Record<string, any>[]) => {
	    let { isMoreTagClick } = this.state
	    if (values?.length && isMoreTagClick) { // 如果剩余的数据为0，且刚才点击的是+n...，关闭渲染剩余数据的开关
	        this.restData = values
	        // this.setState({
	        // 	restData: values
	        // })
	    }
	}

	searchTiledItem = (val: {value: [], path: any, id?: any}) => {
	    let {onChange, fieldNames} = this.props
	    let valueKey = fieldNames?.value || 'value'
	    let labelKey = fieldNames?.label || 'label'
	    let newValue: any = val?.value || val?.id || []
	    let allPath: any = val?.path
	    if (!val?.value) {
	        if (Array.isArray(val?.path)) {
	            val?.path?.forEach((item: Record<string, any>) => {
	                newValue.push(item[valueKey] as never)
	            })
	        } else {
	            newValue = [{value: val[valueKey], label: val[labelKey]}]
	            allPath = [{value: val[valueKey], label: val[labelKey]}]
	        }
	    }
	    this.setState({
	        value: allPath?.length > 0 ? [...allPath] : newValue,
	        popupVisible: false,
	        inputValue: ''
	    })
	    this.setTabsItem(val?.path)
	    onChange && onChange(newValue, allPath)
	}

	setTabsItem = (path: any[]) => {
	    let {fieldNames, options} = this.props
	    // let {deepNum} = this.state
	    let newArr: {key: string, tab: string, content: any}[] = []
	    let labelKey = fieldNames?.label || 'label'
	    let valueKey = fieldNames?.value || 'value'
	    let childrenKey = fieldNames?.children || 'children'
	    let tiledValueCopy: string[] = []
	    // let firstLevelData: any[] = []
	    // options?.forEach(item => {
	    //     firstLevelData.push(item)
	    // })
	    if (path && path?.length > 0) {
	        if (Array.isArray(path)) {
	            path.forEach((item: any, index: number) => {
	                if (index === 0) {
	                    newArr.push({key: '1', tab: item[labelKey], content: options})
	                } else {
	                    newArr.push({key: path[index - 1][valueKey], tab: item[labelKey], content: path[index - 1][childrenKey]})
	                }
	                if (index != path?.length - 1) {
	                    tiledValueCopy.push(item[valueKey])
	                }
	            })
	        }
	    }
	    // let tiledSelectedOptionsCopy = [...path]?.splice(0, path?.length - 1)
	    this.setState({
	        tabsArr: newArr,
	        tabsActiveKey: newArr[newArr.length - 1].key,
	        tiledValue: tiledValueCopy,
	        tiledSelectedOptions: [...path],
	        deepNum: path?.length - 1
	    })
	}

	tiledDom = () => {
	    let {showSearch, prefixCls, dropdownTabsContent, fieldNames, loadDataFlag} = this.props
	    let {tabsArr, tabsActiveKey, inputValue} = this.state
	    let labelKey = fieldNames?.label || 'label'
	    let valueKey = fieldNames?.value || 'value'
	    // let childKey = fieldNames?.children || 'children'
	    let dom = null
	    if (showSearch && inputValue != '') {
	        let searchData = this.generateFilteredOptions('')
	        dom = loadDataFlag ? (<div className={`${prefixCls}-tiled-search-box`} style={{width: `${(this.input as any)?.input?.offsetWidth}px`}}></div>) : (
	            <div className={`${prefixCls}-tiled-search-box`} style={{width: `${(this.input as any)?.input?.offsetWidth}px`}}>
	                {
	                    searchData.map((item: any, index: number) => {
	                        return item?.path && <div className={`${prefixCls}-tiled-search-item`} key={index} onClick={this.searchTiledItem.bind(this, item)}
	                            title={item?.path?.map((labelItem: {label: string}) => {
	                                return labelItem[labelKey]
	                            })}>
	                            {item?.path?.map((labelItem: {label: string}, j: number) => {
	                                return labelItem[labelKey] + `${j + 1 === item.path.length ? '' : ' / '}`
	                            })}
	                        </div>
	                    })
	                }
	            </div>
	        )
	    } else {
	        dom = (
	            <div className={`${prefixCls}-tiled-tabs`}>
	                <Tabs activeKey={tabsActiveKey} onChange={this.onChangeTabs} type="card" moreType="moreTabsArrow">
	                    {tabsArr?.map(item => {
	                        return <TabPane tab={<span>{item.tab}<Icon type="uf-arrow-down" rotate={item.key == tabsActiveKey ? 180 : 0} /></span>} key={item.key}>
	                            {dropdownTabsContent && dropdownTabsContent(item.content)?.dropdownTabsContentTop}
	                            <div className={`${prefixCls}-tiled-items`}>
	                                {dropdownTabsContent ? dropdownTabsContent(item.content)?.dropdownTabsContentBody : item?.content?.map((optionItem: {value: string, label: string}) => {
	                                    return (
	                                        <div className={`${prefixCls}-tiled-item`} key={optionItem[valueKey]} onClick={this.onChangeValue.bind(this, optionItem)} title={optionItem[labelKey]}>{optionItem[labelKey]}</div>
	                                    )
	                                })}
	                            </div>
	                        </TabPane>
	                    })}
	                </Tabs>
	            </div>
	        )
	    }
	    return dom
	}

	onChangeTabs = (val: string) => {
	    let { onChangeTabs } = this.props
	    let { tabsArr } = this.state
	    let deepNum = 0
	    tabsArr?.map((item, index) => {
	        if (item.key === val) {
	            deepNum = index
	        }
	    })
	    this.setState({
	        tabsActiveKey: val,
	        deepNum
	    })
	    onChangeTabs && onChangeTabs(val)
	}

	changeOptions = (options: any, val: any) => {
	    let { fieldNames } = this.props
	    let valueKey = fieldNames?.value || 'value'
	    let childKey = fieldNames?.children || 'children'
	    // let selectValue: any[] = []
	    const dep = (options: any, val: any) => {
	        if (options?.length === 0) {
	            return
	        }
	        for (let i = 0; i < (options as any)?.length; i++) {
	            if (val[valueKey as any] === options[i][valueKey as any]) {
	                // selectValue = options![i];
	                options[i][childKey] = val[childKey]
	                break
	            }
	            // for (let j = 0; j < val?.length; j++) {
	            //     if (val[j] === options[i][valueKey]) {
	            //         selectValue.push(options[i])
	            //     }
	            // }
	            if (options![i][childKey]?.length) {
	                dep(options![i]?.children, val)
	            }
	        }
	    }
	    dep(options, val)
	    return options
	}

	onChangeValue = async(val: {label: string, value: string, children: any, isLeaf?: boolean, isEnd?: any, NoSelected?: boolean}) => {
	    let {onChange, fieldNames, loadData, changeOnSelect, locale} = this.props
	    let {tabsArr = [], deepNum = 0, tiledValue = [], tiledSelectedOptions = [], options} = this.state
	    let labelKey = fieldNames?.label || 'label'
	    let valueKey = fieldNames?.value || 'value'
	    let childKey = fieldNames?.children || 'children'
	    const local = getLangInfo(locale, i18n, 'cascader');
	    // let {changeOnSelect} = this.props
	    let newArr = [...tabsArr]
		// this.setState({
		// 	isClear: false
		// })
	    tabsArr.map((item, index) => {
	        if (deepNum == index) {
	            item.tab = val[labelKey]
	        }
	    })
	    if (loadData) {
	        if ((val && val.isLeaf != undefined && !val.isLeaf) || (val && val.isEnd != undefined && val.isEnd == 0)) {
	            let splitArr = newArr.slice(0, deepNum + 1)
	            let tiledValueCopy = [...tiledValue].slice(0, deepNum)
	            let tiledSelectedOptionsCopy = [...tiledSelectedOptions].slice(0, deepNum)
	            tiledValueCopy.push(val[valueKey])
	            tiledSelectedOptionsCopy.push(val)
	            this.props?.loadData!(tiledSelectedOptionsCopy, (optionsV: any) => {
	                splitArr.push({
	                    tab: local.langMap.placeholder,
	                    key: optionsV[valueKey],
	                    content: optionsV[childKey]
	                })
	                let newData111 = this.changeOptions(options, optionsV)
	                this.setState({
	                    tabsArr: splitArr,
	                    tabsActiveKey: optionsV[valueKey],
	                    // tiledContent: this.tiledDom,
	                    deepNum: deepNum + 1,
	                    tiledValue: tiledValueCopy,
	                    tiledSelectedOptions: tiledSelectedOptionsCopy,
	                    options: newData111
	                })
	            })
	            if (changeOnSelect && !val.NoSelected) {
	                this.setState({
	                    value: tiledValueCopy
	                })
	                onChange && onChange(tiledValueCopy, tiledSelectedOptionsCopy)
	            }
	        } else {
	            let lastData = [...tiledValue]
	            let tiledValueCopy = [...tiledValue]
	            let tiledSelectedOptionsCopy = [...tiledSelectedOptions]
	            let newValueArr = tiledValueCopy?.slice(0, deepNum);
	            let newSelectValueArr = tiledSelectedOptionsCopy?.slice(0, deepNum);
	            let splitArr = newArr.slice(0, deepNum + 1)
	            newValueArr.push(val[valueKey])
	            newSelectValueArr.push(val)
	            lastData.push(val[valueKey])
	            this.setState({
	                popupVisible: false,
	                value: newValueArr,
	                tabsArr: splitArr
	            })
	            onChange && onChange(newValueArr, newSelectValueArr)
	        }
	        this.setState({
	            inputFocused: false
	        })
	    } else {
	        if (val[childKey] && (val[childKey] as []).length > 0) {
	            let splitArr = newArr.slice(0, deepNum + 1)
	            let tiledValueCopy = [...tiledValue].slice(0, deepNum)
	            let tiledSelectedOptionsCopy = [...tiledSelectedOptions].slice(0, deepNum)
	            // if (splitArr.length == 0) {
	            // 	splitArr.push({
	            //         tab: '请选择',
	            //         key: '1',
	            //         content: options
	            //     })
	            // }
	            splitArr.push({
	                tab: local.langMap.placeholder,
	                key: val[valueKey],
	                content: val[childKey]
	            })
	            tiledValueCopy.push(val[valueKey])
	            tiledSelectedOptionsCopy.push(val)
	            this.setState({
	                tabsArr: splitArr,
	                tabsActiveKey: val[valueKey],
	                // tiledContent: this.tiledDom,
	                deepNum: deepNum + 1,
	                tiledValue: tiledValueCopy,
	                tiledSelectedOptions: tiledSelectedOptionsCopy
	            })
	            if (changeOnSelect && !val.NoSelected) {
	                this.setState({
	                    value: tiledValueCopy
	                })
	                onChange && onChange(tiledValueCopy, tiledSelectedOptionsCopy)
	            }
	        } else {
	            let lastData = [...tiledValue]
	            let tiledValueCopy = [...tiledValue]
	            let tiledSelectedOptionsCopy = [...tiledSelectedOptions]
	            let newValueArr = tiledValueCopy?.slice(0, deepNum);
	            let newSelectValueArr = tiledSelectedOptionsCopy?.slice(0, deepNum);
	            let splitArr = newArr.slice(0, deepNum + 1)
	            newValueArr.push(val[valueKey])
	            newSelectValueArr.push(val)
	            lastData.push(val[valueKey])
	            this.setState({
	                popupVisible: false,
	                value: newValueArr,
	                tabsArr: splitArr
	            })
	            onChange && onChange(newValueArr, newSelectValueArr)
	        }
	    }
	}

	/**
	 *
	 * @param fullPathKey 当前节点全部路径的key
	 * @param option 当前节点数据
	 * @param isMergedLeaf 是否为叶子节点
	 */
	onTriggerOpen = (fullPathKey: string, option: any, isMergedLeaf: boolean) => {
	    let { options: oldOptions } = this.state;
	    if (!isMergedLeaf && option.disabled && option.children && option.children.length > 0) {
	        const valuePathArr = fullPathKey.split(VALUE_SPLIT);
	        const loop = (options: any, pathArr: string[], level: number): any => {
	            let currentOptionsIndex = options.findIndex((item: any) => item.value === pathArr[level]);
	            if (currentOptionsIndex !== -1) {
	                // 当前点击展开节点，设置children为disabled
	                if (level === pathArr.length - 1) {
	                    let currentOptions = options[currentOptionsIndex];
	                    currentOptions = {...currentOptions, children: currentOptions.children.map((child: any) => ({...child, disabled: true}))};
	                    return options.splice(currentOptionsIndex, 1, currentOptions);
	                }
	                return loop(options[currentOptionsIndex].children, pathArr, level + 1);
	            }
	        };
	        loop(oldOptions, valuePathArr, 0);

	        this.setState({
	            options: oldOptions ? [...oldOptions] : []
	        })
	    }

	}


	render() {
	    let {
	        prefixCls,
	        style,
	        // clearIcon,
	        // inputIcon,
	        children,
	        showSearch,
	        disabled,
	        allowClear,
	        suffixIcon,
	        className,
	        expandIcon,
	        size,
	        // getPopupContainer,
	        expandTrigger,
	        placeholder,
	        autoFocus,
	        requiredStyle,
	        bordered,
	        align,
	        changeOnSelect,
	        // dropdownRender,
	        fieldNames,
	        notFoundContent,
	        // loadData,
	        // popupClassName,
	        fieldid,
	        multiple,
	        maxTagCount,
	        showCheckedStrategy,
	        maxTagPlaceholder,
	        maxTagTextLength,
	        tagRender,
	        displayRender,
	        locale,
	        dir: direction
	    } = this.props;

	    // ConfigProvider的context配置
	    bordered = bordered ?? (this.context as React.ContextType<typeof ConfigContext>)?.bordered ?? true // 接受provider控制

	    const local = getLangInfo(locale, i18n, 'cascader');
	    const {value, inputValue, popupVisible, inputFocused, initInputValue, dropDownCls} = this.state;

	    const isRtlLayout = direction === 'rtl';
	    const pickerCls = classNames(
	        `${prefixCls}-picker`,
	        {
	            [`${prefixCls}-picker-rtl`]: isRtlLayout,
	            [`${prefixCls}-picker-with-value`]: inputValue,
	            [`${prefixCls}-picker-disabled`]: disabled,
	            //   [`${prefixCls}-picker-${mergedSize}`]: !!mergedSize,
	            [`${prefixCls}-picker-show-search`]: !!showSearch,
	            [`${prefixCls}-picker-focused`]: inputFocused,
	            ...setComponentClass({clsPrefix: `${prefixCls}-picker`, bordered, align, requiredStyle}),
	        },
	        className,
	    );

	    const clearIcon =
			(allowClear && !disabled && value?.length > 0) || inputValue || initInputValue ? (
			    <span className={`${prefixCls}-picker-clear`}>
			        <Icon
			            type='uf-close-c'
			            onClick={this.clearSelection}
			            fieldid = {fieldid ? fieldid + '_close' : undefined}
			        />
			    </span>

			) : null;
	    let inputIcon = suffixIcon ? <span className={`${prefixCls}-picker-arrow`}>{suffixIcon}</span> :
	        <span className={`${prefixCls}-picker-arrow`}><Icon fieldid = {fieldid ? fieldid + '_down' : undefined} type='uf-arrow-down'/></span>;

	    let adapterNid = getNid(this.props) // 适配nid、uitype
	    let _input = (children || (
	        <span style={style} className={pickerCls} onClick={this.handleInputBox} {...adapterNid} fieldid={fieldid}>
	            <span title={(this.getLabel()?.toString())} className={`${prefixCls}-picker-label`}>{this.getLabel()}</span>
	            <Input
	                // {...inputProps}
	                // tabIndex={-1}
	                ref={this.saveInput}
	                // prefixCls={prefixCls}
	                placeholder={value && value.length > 0 ? undefined : placeholder || local.langMap.placeholder}
	                // className={`${prefixCls}-input ${sizeCls}`}
	                size={setComponentSize(size!, {defaultIsMd: true})}
	                bordered={bordered}
	                className={`${prefixCls}-input`}
	                value={this.getLabel() ? '' : initInputValue}
	                // value={inputValue}
	                disabled={disabled}
	                readOnly={!showSearch}
	                // autoComplete={inputProps.autoComplete || 'off'}
	                onClick={showSearch ? this.handleInputClick : undefined}
	                onBlur={showSearch ? this.handleInputBlur : undefined}
	                onKeyDown={this.handleKeyDown}
	                onChange={showSearch ? this.handleInputChange : undefined}
	                autoFocus={autoFocus}
	                fieldid={fieldid ? fieldid + '-input' : undefined}
	            />
	            {clearIcon}
	            {inputIcon}
	        </span>
	    ));
	    let expandIconNode;
	    if (expandIcon) {
	        expandIconNode = expandIcon;
	    } else {
	        expandIconNode = <Icon type='uf-arrow-right' /> ;
	    }
	    // console.log('^&^&^&^&^&^&',this.getOptios())
	    // let {options} = this.props;
	    let options = this.props.dropdownType == 'tiled' ? this.state.options : this.props.options
	    const names = this.getFilledFieldNames();
	    if (options && options.length > 0) {
	        if (inputValue) {
	            options = this.generateFilteredOptions(prefixCls as string);
	        }
	    } else {
	        options = [this.getEmptyNode(names, notFoundContent as string)];
	    }
	    this.matchingoptions = options
	    let dropdownMenuColumnStyle: React.CSSProperties = {};
	    let isNotFound = (options as CascaderOption[]).length === 1 && (options as CascaderOption[])[0].isEmptyNode
	    if (isNotFound) {
	        dropdownMenuColumnStyle.height = 'auto';
	    }
	    let resultListMatchInputWidth = false;
	    if (showSearch && (typeof showSearch === 'object') && showSearch?.matchInputWidth !== undefined) {
	        resultListMatchInputWidth = showSearch.matchInputWidth !== false;
	    }
	    if (resultListMatchInputWidth || ((inputValue || isNotFound) && this.input)) {
	        dropdownMenuColumnStyle.width = (this.input as any)?.input.offsetWidth;
	    }
	    let dropdownMenuStyle: React.CSSProperties = {};
	    if (this.input && this.props.resultListMatchInputWidth) {
	        dropdownMenuStyle.maxWidth = (this.input as any)?.input.offsetWidth;
	        dropdownMenuStyle.overflowX = 'auto';
	    }
	    const rcCascaderPopupClassName = classNames(this.state.popupClassName, {
	        [`${prefixCls}-menu-focus`]: dropDownCls,
	        [`${prefixCls}-menu-multiple`]: multiple,
	        [`${prefixCls}-menu-${direction}`]: direction === 'rtl',
	        [`${prefixCls}-menu-empty`]:
			(options as CascaderOption[]).length === 1 && (options as CascaderOption[])[0].value === 'ANT_CASCADER_NOT_FOUND',
	        [`${prefixCls}-menu-tiled`]: this.props.dropdownType == 'tiled'
	    });
	    const wrapperClassName = classNames(this.props.className, {
	        [`${prefixCls}-${setComponentSize(size!)}`]: setComponentSize(size!),
	        [`${prefixCls}-allow-clear-show`]: multiple && allowClear,
	        [`${prefixCls}-allow-clear-hidden`]: multiple && !allowClear,
	        [`${prefixCls}-border-bottom`]: multiple && bordered && typeof bordered === 'string',
	        [`${prefixCls}-border-show`]: multiple && bordered && typeof bordered === 'boolean',
	        [`${prefixCls}-border-hidden`]: multiple && !bordered,
	        [`${prefixCls}-align-${align}`]: multiple && align,
	    })
	    let loadingIcon = (
	        <span className={`${prefixCls}-menu-item-loading-icon`}>
	            {/* <Icon type="uf-qq" /> */}
	            <div className={`${prefixCls}-spinner-icon`}></div>
	        </span>
	    )

	    let mergedNotFound;
	    if (notFoundContent !== undefined) { // 优先显示传了notFoundContent的内容
	        mergedNotFound = notFoundContent;
	    } else {
	        mergedNotFound = <span>{local.langMap.notFoundContent}</span>;
	    }
	    return (
	        <RcCascader
	            // options={this.props.options}
	            options={options as CascaderOption[]}
	            prefixCls={prefixCls}
	            getPopupContainer={this.getPopupContainerDom}
	            value={value as (string | number)[]}
	            open={popupVisible}
				/* @ts-ignore */
	            onDropdownVisibleChange={this.handlePopupVisibleChange}
	            onChange={this.handleChange}
	            expandIcon={expandIconNode}
	            loadingIcon={loadingIcon}
	            placement={this.getPopupPlacement(direction) as any}
	            disabled={disabled}
	            expandTrigger={expandTrigger}
	            dropdownMenuColumnStyle={dropdownMenuColumnStyle}
	            changeOnSelect={changeOnSelect}
	            dropdownRender={this.props.dropdownType == 'tiled' || (this.state.isClear && (this.props.dropdownType == 'tiled' || this.props.dropdownType == '')) ? this.state.tiledContent : this.state.dropdownDom}
	            fieldNames={fieldNames}
	            loadData={this.loadData}
	            dropdownClassName={rcCascaderPopupClassName}
	            multiple={multiple}
	            checkable={multiple ? (<span className={`${prefixCls}-checkbox-inner`} />) : false}
	            maxTagCount={maxTagCount}
	            maxTagTextLength={maxTagTextLength}
	            clearIcon={clearIcon}
	            inputIcon={inputIcon}
	            allowClear={true}
	            showArrow={true}
	            showCheckedStrategy={showCheckedStrategy}
	            maxTagPlaceholder={maxTagPlaceholder}
	            fieldid={fieldid}
	            showSearch={showSearch}
	            onSearch={this.onSearch}
	            autoFocus={autoFocus}
	            className={wrapperClassName}
	            tagRender={tagRender}
	            displayRender={displayRender}
	            onTriggerOpen={this.onTriggerOpen}
	            style={style}
	            placeholder={placeholder}
	            {...adapterNid}
	            onTagMouseDown={this.onTagMouseDown}
	            onRenderRest={this.onRenderRest}
	            dropdownMatchSelectWidth={this.state.dropdownMatchSelectWidth}
	            notFoundContent={mergedNotFound}
	            dropdownMenuStyle={dropdownMenuStyle}
	            // {...other}
	        >
	            {/* @ts-ignore */}
	            {!multiple && _input as React.ReactElement}
	        </RcCascader>
	    )
	}
}
// Cascader.propTypes = propTypes;
Cascader.SHOW_PARENT = SHOW_PARENT;
Cascader.SHOW_CHILD = SHOW_CHILD;
export default Cascader;
