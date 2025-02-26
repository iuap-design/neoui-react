import classNames from 'classnames';
import RcSelect, {OptGroup, Option, BaseSelectRef} from 'rc-select';
import {ResizableDirection, NumberSize} from 're-resizable';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import {cssUtil, Warning, isPlainObject, getChildrenText, setComponentSize, setComponentClass, getNid, requestAnimationFrame} from "../../wui-core/src";
import Icon from "../../wui-icon/src"
import Checkbox from '../../wui-checkbox/src';
import {getLangInfo} from '../../wui-locale/src/tool';
import {ConfigContext} from "../../wui-provider/src/context";
import SizeContext from "../../wui-provider/src/SizeContext";
import i18n from './i18n';
import AutoTagSelect from "./AutoTagSelect";
import {
    SelectProps,
    SelectValue,
    OptionValue,
    DefaultOptionType,
    RawValue,
    LabeledValue,
    DisplayValueType
} from './iSelect';
import {useResizeDropdownRender} from "./hooks/select";
import _cloneDeep from 'clone';

const isArray = Array.isArray
const isFunction = function(value: any) {
    return typeof value === 'function'
}
const INFINITY = 1 / 0
function toString(value: any): string {
    if (value == null) {
        return ''
    }
    if (typeof value === 'string') {
        return value
    }
    if (Array.isArray(value)) {
        return `${value.map((other) => other == null ? other : toString(other))}`
    }
    if (typeof value === 'symbol' || ((typeof value === 'object' && value != null && Object.prototype.toString.call(value) == '[object Symbol]'))) {
        return value.toString()
    }
    const result = `${value}`
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

const {isShouldUpdate} = Warning;
const defaultClearIcon = <Icon type="uf-close-c"/>
const defaultMenuItemSelectedIcon = <Checkbox antd/>
const defaultSuffixIcon = <Icon type="uf-arrow-down"/>
const defaultRemoveIcon = <Icon type="uf-close"/>

const InternalSelect = <VT extends SelectValue = SelectValue>(
    {
        prefixCls: customizePrefixCls,
        requiredStyle,
        align: customAlign,
        bordered: customBordered,
        className,
        getPopupContainer,
        dropdownClassName,
        onDropdownVisibleChange,
        getSelectAttrs,
        listHeight = 320,
        listItemHeight = 32,
        size: customizeSize,
        notFoundContent,
        combobox,
        dropdownMatchSelectWidth,
        virtual,
        dir: dirProp,
        onInputKeyDown,
        onKeyDown,
        options,
        onChange,
        onSelect,
        onDeselect,
        data,
        id,
        multiple,
        tags,
        open,
        defaultOpen,
        defaultValue,
        children,
        fieldid,
        maxTagCount,
        supportWrite,
        resizable = false,
        dropdownRender,
        onResizeStart,
        onResize,
        onResizeStop,
        ...props
    }: SelectProps<VT>,
    ref?: React.Ref<BaseSelectRef>,
) => {
    const context = React.useContext(ConfigContext)
    const innerRef = React.useRef<BaseSelectRef>(null);
    let [optionList, setOptionList] = React.useState(options || data);
    let [clearIcon, setClearIcon] = React.useState((props.clearIcon || defaultClearIcon) as React.ReactNode)
    let [menuItemSelectedIcon, setMenuItemSelectedIcon] = React.useState((props.menuItemSelectedIcon || defaultMenuItemSelectedIcon) as React.ReactNode)
    let [suffixIcon, setSuffixIcon] = React.useState(props.suffixIcon || defaultSuffixIcon)
    let [openState, setOpenState] = React.useState(!!defaultOpen || !!open) // 默认值是初始的open值
    let [attrsSet, setAttrsSet] = React.useState(false)
    let [childrenArr, setChildrenArr] = React.useState(children)
    let [defaultVal, setDefaultVal] = React.useState<SelectValue | null>(defaultValue)
    let [value, setValue] = React.useState<SelectValue | null>(typeof props.value === 'undefined' ? defaultValue : props.value) // Select的value状态
    let [selectDom, setSelectDom] = React.useState<HTMLElement | null>(null)
    let [listHeightState, setListHeightState] = React.useState<number>(typeof listHeight === 'boolean' ? 320 : listHeight);
    let removeIcon = props.removeIcon || defaultRemoveIcon // 不会在state中
    const [popupContainer, setPopupContainer] = React.useState<HTMLElement>();
    const {
        getPrefixCls,
    } = context;
    const size = React.useContext(SizeContext);
    const locale = props.locale || context.locale || 'zh-cn';
    const disabledProp = {disabled: props.disabled || context.disabled || false}
    const local = getLangInfo(locale, i18n, 'select');
    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const direction = dirProp || context.dir; // modal 和 drawer 是其父元素渲染到，父元素节点下面
    const getPopupContainerDom = (dom: HTMLElement) => {
        const container = getPopupContainer;
        let _popupContainer = null;
        if (typeof container === 'function') {
            _popupContainer = container(dom)
        } else {
            _popupContainer = cssUtil.parentsUntil(dom)
        }
        setPopupContainer(_popupContainer)
        return _popupContainer;
    }

    const mode = React.useMemo(() => { // 调整一下位置。放到前面，便于设置fieldid方法使用
        const {mode: m} = props;
        if (tags) {
            return 'tags'
        }
        if (multiple) {
            return 'multiple'
        }
        if (combobox) { // combobox属性依然支持，并且这样传combobox功能可以用
            return 'combobox'
        }
        return m;
    }, [props.mode, multiple, tags, combobox]);

    const isMultiple = mode === 'multiple' || mode === 'tags';

    React.useEffect(() => {
        if (fieldid) {
            if (!selectDom) { // 获取这个Select的外层dom结构
                const selectDoms = document.querySelectorAll(`.${prefixCls}`) // 获取页面上的wui-select
                if (selectDoms?.length) {
                    for (let i = 0; i < selectDoms.length; i++) {
                        if (selectDoms[i] && selectDoms[i]?.getAttribute('fieldid') === fieldid) { // 找到了这个select
                            setSelectDom(selectDoms[i] as HTMLElement) // 获得了组件的外层容器
                            break;
                        }
                    }
                }
            } else { // 得到了这个Select的dom结构，进行fieldid的设置
                if (isMultiple) {
                    const tags = (selectDom as HTMLElement)?.querySelectorAll(`.${prefixCls}-selection-overflow-item:not(.${prefixCls}-selection-overflow-item-suffix)`) // 占位的空tag不加fieldid
                    for (let i = 0; i < tags.length; i++) {
                        tags[i] && tags[i].setAttribute('fieldid', `${fieldid}_tag_${i}`) // 获取到所有的多选已选结果，设置fieldid
                    }
                    const removeIcons = (selectDom as HTMLElement)?.querySelectorAll(`.${prefixCls}-selection-item-remove`)
                    for (let i = 0; i < removeIcons.length; i++) {
                        removeIcons[i] && removeIcons[i].setAttribute('fieldid', `${fieldid}_remove_${i}`) // 获取到所有的多选已选结果的删除图标，设置fieldid
                    }
                }
            }
        }
    }, [selectDom, value, fieldid]) // fieldid，获取到的外层元素，以及Select的value，这三种发生变化的时候，设置内部结构的fieldid

    React.useEffect(() => {
        let childrenArr: React.ReactNode[] | React.ReactNode = children
        if (childrenArr) { // 如果是传了自己构造的子节点
            if (!isArray(childrenArr)) {
                childrenArr = [childrenArr] // 如果只有一个子节点，把它变成数组
            }
            if ((childrenArr as React.ReactNode[]).some((child: React.ReactNode) => Array.isArray(child))) { // 如果子节点里，还有数组，再处理一级
                let res: React.ReactNode[] = [];
                (childrenArr as React.ReactNode[]).forEach((child: React.ReactNode) => {
                    if (Array.isArray(child)) {
                        res = res.concat(child)
                    } else {
                        res.push(child)
                    }
                })
                childrenArr = res
            }
            const children = (childrenArr as React.ReactNode[]).filter((child: React.ReactNode) => React.isValidElement(child)).map((child: React.ReactElement, index: number) => { // 过滤掉非组件的子元素
                let res = child
                const value = child.props.value;
                const title = child.props.title ? getChildrenText(child.props.title).join('') : undefined;// 多语span兼容
                if (value && isArray(value)) { // 如果value是数组，变成string类型，设置data-is-array
                    res = React.cloneElement(child, {
                        'data-is-array': true,
                        value: toString(value)
                    })
                }
                if (!('value' in child.props) && child.key) { // 如果是旧的写法，不传value，只传了key。将value设置成key
                    res = React.cloneElement(child, {
                        value: child.key,
                        key: child.key
                    })
                }
                if (!id && !fieldid) { // 如果没有id或者fieldid，直接返回Option
                    res = React.cloneElement(res, {title})
                    return res
                }
                const childId = child.props.id
                let idProp = {}
                let fieldidProp = {}
                let dataIdProp = {}
                if (id) {
                    idProp = { id: `${id}_option_${index}` }
                }
                if (fieldid) {
                    fieldidProp = { fieldid: `${fieldid}_option_${index}` }
                }
                if (childId) { // 如果用户在Option中自己传了id，标记一下，onChange的时候返回这个id，而不是测试传的那个id
                    dataIdProp = {
                        'data-id': childId
                    }
                }
                // 多语span兼容
                res = React.cloneElement(res, {...idProp, ...fieldidProp, ...dataIdProp, title})
                return res
            })
            setChildrenArr(children)
        }
    }, [children, id, fieldid]) // 外部传来的子节点, id, fieldid发生变化时，进行Option的处理

    // ===================== Attibutes =====================
    React.useEffect(() => {
        const tinperProps = {
            multiple,
            data,
            onKeyDown,
            tags,
            supportWrite,
            combobox
        }
        isShouldUpdate("Select", tinperProps);
    }, [])

    React.useEffect(() => { // 如果id或者数据发生变化，根据格式重新计算数据中的id，以及value的处理
        let optionList = _cloneDeep(options || data) as LabeledValue[];
        // let optionList = options || data;
        if (optionList) {
            optionList = optionList.map((option, index) => {
                if (option.id) { // 如果用户传了id，那么使用data-id保存一下，onChange的时候使用
                    option['data-id'] = option.id
                }
                if (id) {
                    option.id = `${id}_option_${index}`;
                }
                if (fieldid) {
                    option.fieldid = `${fieldid}_option_${index}`
                }
                const val = option.value
                const key = option.key
                if (val && isArray(val)) { // 只有数组需要处理
                    option['data-is-array'] = true
                    option.value = toString(val)
                }
                if (!('value' in option) && key) { // 没有传value的情况
                    option.value = key as string
                    option.key = key
                }
                return option
            })
            setOptionList(optionList)
        }
    }, [options, data, id, fieldid])

    // ===================== Empty =====================
    let mergedNotFound;
    if (notFoundContent !== undefined) { // 优先显示传了notFoundContent的内容
        mergedNotFound = notFoundContent;
    } else if (mode === 'combobox') {
        mergedNotFound = null;
    } else {
        mergedNotFound = <span>{local.langMap.notFoundContent}</span>;
    }

    // ===================== Icons =====================
    let {
        showArrow
    } = props

    React.useEffect(() => {
        if (dropdownClassName && getSelectAttrs && isFunction(getSelectAttrs) && openState && !attrsSet) {
            const dropdown = document.getElementsByClassName(dropdownClassName)
            if (dropdown.length) {
                const dropdownWrapper = dropdown[0] // 默认使用getSelectAttrs的同时，传了一个特殊的类名，类似于id
                const attrs = getSelectAttrs()
                if (isPlainObject(attrs)) {
                    const keys = Object.keys(attrs)
                    keys.forEach(key => {
                        dropdownWrapper.setAttribute(
                            key, attrs[key]
                        )
                    })
                    setAttrsSet(true) // 这个操作只在第一次渲染dropdown的时候进行
                }
            }
        }
        // 在三方包上面做了修改，兼容treeSelect等使用rc-select的组件
        // if (openState) { // 打开了下拉框，禁止modal-body上的键盘行为
        //     const modalBody = document.querySelector(`.${prefix}-modal-body`)
        //     if (modalBody) { // 有modalBody的时候，注册事件
        //         const handler = addEventListener(modalBody, 'keyup', (e: React.KeyboardEvent)=> {
        //             e.stopPropagation()
        //         });
        //         setEventHandler(handler)
        //     }
        // } else {
        //     if (eventHandler) { // 关闭下拉框，取消禁止modal-body的键盘行为
        //         setTimeout(() => {
        //             eventHandler && (eventHandler as AddEventLReturn).remove()
        //             setEventHandler(null)
        //         }, 150);
        //     }
        // }
    }, [openState])

    const handleDropdownVisibleChange = React.useCallback((open: boolean) => {
        setOpenState(open)
        if (onDropdownVisibleChange) {
            onDropdownVisibleChange(open)
        }
    }, [onDropdownVisibleChange])

    const handleAfterPopupVisibleChange = React.useCallback((visible: boolean) => {
        if (visible && typeof listHeight === 'boolean' && listHeight) {
            const rootNode = innerRef.current?.getSelectDOMNode() as HTMLElement;
            requestAnimationFrame(() => {
                const rect = rootNode?.getBoundingClientRect();
                const containerRect = popupContainer?.getBoundingClientRect();
                let maxHeight = 320;
                if (containerRect) {
                    if ('placement' in props) {
                        maxHeight = props.placement?.indexOf('bottom') !== -1 ? containerRect.bottom - rect.bottom - 40 : rect.top - containerRect.top - 40
                    } else {
                        maxHeight = Math.max(containerRect.bottom - rect.bottom, rect.top - containerRect.top) - 40
                    }
                    setListHeightState(maxHeight)
                }

            })
        }
    }, [listHeight, popupContainer])

    const handleChange = React.useCallback((value: SelectValue | VT, option : DefaultOptionType) => {
        let newValue: SelectValue = value
        let newOption: OptionValue = option
        if (!newValue && !newValue) { // 点击clear清除的时候，不处理
            return onChange?.(newValue as VT, newOption)
        }
        if (!isMultiple) { // 单选和combobox的情况下
            if (newOption['data-is-array']) {
                newValue = (newValue as string).split(',')
                delete newOption['data-is-array']
                newOption = {
                    ...newOption,
                    value
                }
            }
        } else { // 多选的情况下
            for (let i = 0; i < (newValue as (RawValue[] | LabeledValue[])).length; i++) {
                if (newOption[i]?.['data-is-array']) {
                    newValue[i] = [newValue[i].split(',')]
                    delete newOption[i]['data-is-array']
                    newOption[i] = {
                        ...newOption[i],
                        value: newValue[i]
                    }
                }
            }
        }
        if (option['data-id']) { // 如果用户自己在Option中传了id，那么在回调的时候，使用这个id放到数据中。
            newOption.id = option['data-id']
        }
        onChange?.(newValue as VT, newOption)
    }, [onChange, isMultiple])

    const handleSelect = React.useCallback((value: SelectValue, option = {}) => {
        let newOption: OptionValue = option
        if (newOption['data-is-array']) {
            value = (value as string).split(',')
            delete newOption['data-is-array']
            newOption = {
                ...newOption,
                value
            }
        }
        if (option['data-id']) { // onSelect事件也要有这个处理
            newOption.id = option['data-id']
        }
        onSelect?.(value as (RawValue | LabeledValue) & VT, newOption)
    }, [onSelect])

    const handleDeselect = React.useCallback((value: SelectValue, option = {}) => {
        if (option['data-is-array']) {
            value = (value as string).split(',')
            delete option['data-is-array']
        }
        onDeselect?.(value as (RawValue | LabeledValue) & VT, option)
    }, [onDeselect])

    React.useEffect(() => {
        if (!defaultVal) return
        if (isMultiple) { // 多选的话，遍历每一个默认值
            if (!isArray(defaultVal)) { // 如果传了默认值，但不是个数组
                defaultVal = [defaultVal] as SelectValue
            }
            for (let i = 0; i < (defaultVal as RawValue[]).length; i++) {
                if (isArray((defaultVal as RawValue[])[i])) {
                    (defaultVal as RawValue[])[i] = toString((defaultVal as RawValue[])[i])
                }
            }
            setDefaultVal(defaultVal)
        } else {
            if (isArray(defaultVal)) { // 如果不是多选，而且默认值是个数组
                setDefaultVal(toString(defaultVal)) // 将这个值变成字符串，单选没有传数组的
            }
        }
    }, []) // 默认值只处理第一次

    React.useEffect(() => { // 处理id和fieldid
        ['id', 'fieldid'].forEach(item => {
            const idValue = item === 'id' ? id : fieldid
            if (idValue) {
                suffixIcon = React.cloneElement(suffixIcon as React.ReactElement, {
                    [item]: `${idValue}_suffix`
                })
                setSuffixIcon(suffixIcon)
                menuItemSelectedIcon = React.cloneElement(menuItemSelectedIcon as React.ReactElement, {
                    [item]: `${idValue}_item_selected`
                })
                setMenuItemSelectedIcon(menuItemSelectedIcon)
                clearIcon = React.cloneElement(clearIcon as React.ReactElement, {
                    [item]: `${idValue}_clear`
                })
                setClearIcon(clearIcon)
            }
        })
    }, [id, fieldid])

    // 处理更换suffixIcon不渲染问题
    React.useEffect(()=>{
        let {suffixIcon} = props;
        suffixIcon && setSuffixIcon(suffixIcon)
    }, [props.suffixIcon])

    // ===================== 处理resize =====================
    const onResizeHandle = React.useCallback((event: MouseEvent | TouchEvent, direction: ResizableDirection, elementRef: HTMLDivElement, delta: NumberSize) => {
        // 在横向拖拽过程中，虚拟列表高度不做处理
        if (resizable !== "horizontal") {
            setListHeightState(elementRef.offsetHeight)
        }
        typeof onResize === "function" && onResize(event, direction, elementRef, delta);
    }, [onResize]);

    const onResizeStopHandle = React.useCallback((event: MouseEvent | TouchEvent, direction: ResizableDirection, elementRef: HTMLDivElement, delta: NumberSize) => {
        // 在横向拖拽过程中，虚拟列表高度不做处理
        if (resizable !== "horizontal") {
            setListHeightState(elementRef.offsetHeight)
        }
        typeof onResizeStop === "function" && onResizeStop(event, direction, elementRef, delta);
    }, [onResizeStop]);

    const resizableDropdown = useResizeDropdownRender({
        clsPrefix: prefixCls,
        selectRef: innerRef,
        resizable,
        getPopupContainer,
        dropdownRender,
        onResizeStart: onResizeStart,
        onResize: onResizeHandle,
        onResizeStop: onResizeStopHandle
    });

    const selectProps = omit(props, ['suffixIcon', 'itemIcon']);
    const rcSelectRtlDropDownClassName = classNames(dropdownClassName, {
        [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
        [`${prefixCls}-dropdown--multiple`]: !!isMultiple
    });

    const align = customAlign ?? context.align;
    const bordered = customBordered ?? context.bordered ?? true;
    const mergedSize = customizeSize || size || 'md';
    const mergedClassName = classNames(
        `${prefixCls}-${setComponentSize(mergedSize, {defaultIsMd: true})}`,
        {
            [`${prefixCls}-rtl`]: direction === 'rtl',
            ...setComponentClass({clsPrefix: prefixCls, bordered, align, requiredStyle}),
            // [`${prefixCls}-borderless`]: !bordered,
        },
        className,
    );

    const showArrowProps = showArrow === undefined ? true : showArrow
    const extral = {
        mode,
        onInputKeyDown: onInputKeyDown || onKeyDown,
        options: optionList,
        showArrow: showArrowProps
    }
    const idProp = id ? {id} : {}
    const fieldidProp = fieldid ? {fieldid} : {}
    React.useEffect(() => { // 受控的select，每次都随传来的value更新state
        if ('value' in props) {
            let value = props.value
            if (mode === 'combobox' && (props.optionLabelProp === 'children' || !props.optionLabelProp) && childrenArr) { // 在combobox模式下，如果传入value，optionLabelProp为children的Select，用于展示选中值的内部value使用children来设置
                const child = (childrenArr as React.ReactNode[]).find((child: React.ReactElement) => child?.props?.value === props.value) || {}
                const val = (child as any)?.props?.children // children当作value, 同时children 只能是非对象模式
                if (val && typeof val !== 'object') {
                    value = val
                }
            }
            // 如果值为null，则默认为没有值,注：此处认为null为不合法的值
            if (value === null) value = undefined;
            setValue(value)
        }
    })
    const changeHandler = (value: SelectValue, option: DefaultOptionType) => {
        let val = value
        if (mode === 'combobox') {
            if ((props.optionLabelProp === 'children' || !props.optionLabelProp) && option && typeof option.children !== 'object') { // 设置了值为children或者没设置的optionLabelProp，同时children 只能是非对象模式
                if (option && option.children) {
                    setValue(option.children as string)
                    return onChange ? handleChange(val, option) : null
                }
            }
        }
        setValue(val)
        onChange ? handleChange(val, option) : null
    }


    // 多选隐藏标签支持用户自定义&默认渲染最大值99
    const MaxTagPlaceholderHandler = (omittedValues: DisplayValueType[]) => {
        if (props.maxTagPlaceholder) return typeof props.maxTagPlaceholder === 'function' ? props.maxTagPlaceholder(omittedValues) : props.maxTagPlaceholder;
        if (omittedValues.length > 99) return `99 +`;
        return <span>{`+ ${omittedValues.length}`}</span>;
    }

    const setInputCopyValue = (item: any) => {
        let copyValue = '';
        // 默认模式且非检索模式，item.label为ReactElement不可复制(需保留span 的样式)
        if (!mode && !props.showSearch && item && item.label) { // string | number | bool | ReactElement
            if (typeof item.label !== 'object') { // string | number | bool
                copyValue = item.label.toString();
            }
            if (typeof item.label === 'object' && !React.isValidElement(item.label)
            && Array.isArray(item.label) && !item.label.find((el: any) => React.isValidElement(el))) { // 文本数组['text1', 'text2]
                item.label.forEach((el: string | number) => {
                    copyValue = copyValue + el.toString();
                })
            }
        }
        return copyValue;
    }

    React.useImperativeHandle(ref, () => {
        return {
            handleDeselect,
            ...(innerRef.current as BaseSelectRef)
        }
    });
    const childrenProp = childrenArr ? { children: childrenArr } : {}
    const defaultValueProp = defaultVal ? { defaultValue: defaultVal } : {}
    const selectHandler = onSelect ? { onSelect: handleSelect } : {}
    const deselectHandler = onDeselect ? { onDeselect: handleDeselect } : {}
    const optionLabelPropObj = mode === 'combobox' ? {
        optionLabelProp: props.optionLabelProp || 'children'
    } : {} // 其它模式的Select没有这个属性的默认值也不要传
    let adapterNid = getNid(props)
    return (
        <RcSelect
            ref={innerRef}
            virtual={virtual}
            {...omit(selectProps, ["dropdownMenuStyle", "dataIndex", "filterDropdown", "filterDropdownType", "filterDropdownIncludeKeys", "scrollToEnd", "onFilterChange", "onFilterClear"])}
            listItemHeight={listItemHeight}
            prefixCls={prefixCls}
            inputIcon={suffixIcon}
            menuItemSelectedIcon={isMultiple ? menuItemSelectedIcon : null}
            removeIcon={removeIcon}
            clearIcon={clearIcon}
            notFoundContent={mergedNotFound}
            className={mergedClassName}
            open={open}
            defaultOpen={defaultOpen}
            getPopupContainer={getPopupContainerDom}
            onDropdownVisibleChange={handleDropdownVisibleChange}
            // @ts-ignore
            afterPopupVisibleChange={handleAfterPopupVisibleChange}
            dropdownClassName={rcSelectRtlDropDownClassName}
            onChange={changeHandler}
            maxTagPlaceholder={MaxTagPlaceholderHandler} // ue 设计要求去除省略号
            {...extral}
            {...idProp}
            {...fieldidProp}
            {...childrenProp}
            {...defaultValueProp}
            {...optionLabelPropObj}
            {...selectHandler}
            {...deselectHandler}
            {...disabledProp}
            value={value}
            direction={direction}
            // rtl={direction === 'rtl'}
            maxTagCount={maxTagCount as number | 'responsive'}
            setInputCopyValue={setInputCopyValue}
            dropdownMatchSelectWidth={resizable ? false : dropdownMatchSelectWidth}
            dropdownRender={resizable ? resizableDropdown : dropdownRender}
            listHeight={listHeightState}
            {...adapterNid}
        />
    );
};

const SelectRef = React.forwardRef(InternalSelect)

const Select = SelectRef;

type SelectType = typeof Select;

interface SelectInterface extends SelectType {
    Option: typeof Option;
    OptGroup: typeof OptGroup;
}

const SelectWrapper = React.forwardRef(<VT extends SelectValue = SelectValue>(props:SelectProps<VT>, ref?: React.Ref<BaseSelectRef>) => {
    if (props.maxTagCount === 'auto') {
        return <AutoTagSelect {...props} ref={ref} />
    } else {
        return <Select {...props} ref={ref} />
    }
}) as SelectInterface


SelectWrapper.Option = Option;
SelectWrapper.OptGroup = OptGroup;
// SelectWrapper.propTypes = {
//     maxTagCount: PropTypes.any
// }

export { Select };
export default SelectWrapper;
