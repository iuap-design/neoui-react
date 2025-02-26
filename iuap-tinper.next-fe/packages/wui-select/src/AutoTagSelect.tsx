import * as React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
// import { composeRef } from 'rc-util/lib/ref';
import { BaseSelectRef, SelectProps as RcSelectProps} from 'rc-select';
import { Select } from './index';
import Icon from "../../wui-icon/src"
import { cssUtil } from "../../wui-core/src/index"
import { ConfigContext } from "../../wui-provider/src/context";
import { SelectProps, SelectValue, DefaultOptionType, SelectOverflowItem, RawValue, DisplayValueType } from './iSelect'

const getOverflowItem = (props: SelectOverflowItem) => {
    // 下拉内容渲染支持用户自定义
    const { tagRender } = props;
    return (
        typeof tagRender === 'function' ? tagRender({
            label: props.label,
            value: props.value,
            disabled: props.disabled as boolean,
            onClose: () => props.onDelete(props.value, omit(props, ['onDelete', 'className'])),
            closable: true
        }) : (
            <div>
                <span className={`${props.className}`}>
                    <span
                        title={props.label}
                        className={`${props.className}-label`}
                    >
                        {props.label || props.children}
                    </span>
                    {
                        !props.disabled &&
                            <span className={`${props.className}-delete`}>
                                <Icon onClick={() => props.onDelete(props.value, omit(props, ['onDelete', 'className']))} type="uf-close" />
                            </span>
                    }
                </span>
            </div>
        )
    );
};

// OverflowItem.propTypes = {
//     value: PropTypes.any,
//     onDelete: PropTypes.func,
//     label: PropTypes.string
// }

interface RefObject extends BaseSelectRef{
    handleDeselect: SelectOverflowItem['onDelete']
}

const InternalAutoTagSelect = <VT extends SelectValue = SelectValue>(props: SelectProps<VT>, ref: React.Ref<BaseSelectRef>) => {
    // 不支持data-is-array 的情况
    let [value, setValue] = React.useState<SelectValue | null>(typeof props.value === 'undefined' ? props.defaultValue : props.value)
    let [nodes, setNodes] = React.useState<RcSelectProps["options"]>([]) // 剩余的已选节点
    let [allNodes, setAllNodes] = React.useState<RcSelectProps["options"]>([]) // 记录所有的已选节点
    let [isMoreTagClick, setIsMoreTagClick] = React.useState(false) // 是否点击了+n...按钮的状态
    const innerRef = React.useRef<RefObject>(null);
    // const mergeRef = composeRef(innerRef, ref);
    const context = React.useContext(ConfigContext)
    const {
        getPrefixCls
    } = context;

    const prefixCls = getPrefixCls('select', props.prefixCls);

    React.useImperativeHandle(ref, () => {
        return {
            ...(innerRef.current as BaseSelectRef)
        }
    })

    const handleChange: RcSelectProps['onChange'] = React.useCallback((newValue: VT, newNodes: DefaultOptionType[]) => {
        setValue(newValue);
        setAllNodes(newNodes);
        props.onChange && props.onChange(newValue, newNodes)
    }, [props.onChange])

    const handleDelete = React.useCallback((deletedValue: RawValue, option: DisplayValueType) => {
        const omittedValues = nodes!.filter((val: DisplayValueType) => val.value !== deletedValue)
        const isHideDropdown = omittedValues.length === 1;
        const newValue = (value as RawValue[]).filter((val) => val !== deletedValue);
        const newAllNodes = allNodes!.filter((item) => item.value !== deletedValue);
        setNodes(isHideDropdown ? [] : omittedValues);
        setValue(newValue);
        setAllNodes(newAllNodes);
        innerRef.current!.handleDeselect(deletedValue, option);
        // onChange 对外抛出
        props.onChange && props.onChange(newValue as VT, newAllNodes)
    }, [nodes, value, allNodes])

    const dropdownRender = React.useCallback((node: React.ReactElement) => { // node是默认的下拉框中的组件
        if (isMoreTagClick && nodes!.length) {
            return <div className={`${prefixCls}-auto-tag-overflow`}>
                {nodes!.map((node: DisplayValueType) => getOverflowItem({...node, onDelete: handleDelete, className: `${prefixCls}-auto-tag-overflow-item`, tagRender: props.tagRender}))}
            </div>
        }
        if (props.dropdownRender) {
            return props.dropdownRender(node)
        }
        return node
    }, [isMoreTagClick, nodes, props.dropdownRender])

    const handleTagMouseDown = React.useCallback((event: React.MouseEvent) => {
        const baseClassName = `${prefixCls}-selection-overflow-item`;
        const parent = cssUtil.parent(event.target as HTMLElement, `.${baseClassName}`)
        if (parent && ((parent as HTMLElement).getAttribute('class') as string).includes(`${baseClassName}-rest`)) {
            return setIsMoreTagClick(true)
        }
        setIsMoreTagClick(false)
    }, [])

    const handleRenderRest = React.useCallback((values: DisplayValueType[]) => {
        setNodes(values)
        if (!values.length && isMoreTagClick) { // 如果剩余的数据为0，且刚才点击的是+n...，关闭渲染剩余数据的开关
            setIsMoreTagClick(false)
        }
    }, [isMoreTagClick])
    const handleDropdownVisibleChange = React.useCallback((visible: boolean) => {
        if (!visible && isMoreTagClick) {
            setIsMoreTagClick(false) // 当隐藏下拉框的时候，如果刚才点击了+n...，还原成渲染普通的数据条目状态
        }
        props.onDropdownVisibleChange && props.onDropdownVisibleChange(visible)
    }, [isMoreTagClick, props.onDropdownVisibleChange])

    const mode = React.useMemo(() => {
        const {mode: m} = props;
        if (props.multiple || props.supportWrite || m === 'combobox' || !m) { // 传了multiple和combobox的旧写法，单选，combobox的新写法的mode，统一限制为multiple
            return 'multiple'
        }
        return m; // multiple或者tags
    }, [props.mode, props.multiple, props.supportWrite]);

    const mergedDropdownClassName = classNames(
        {
            [`${prefixCls}-auto-tag-dropdown`]: isMoreTagClick && nodes!.length
        },
        props.dropdownClassName,
    );

    React.useEffect(() => {
        if ('value' in props) {
            setValue(props.value) // 受控的Select更新value
        }
    })

    // rc-select responsive模式ie浏览器不支持，采用数字
    const isIE = !!(window as any).ActiveXObject || 'ActiveXObject' in window;
    const maxTagCount = isIE ? 2 : 'responsive';

    return (
        <Select
            {...props}
            onChange={handleChange}
            value={value}
            mode={mode}
            ref={innerRef}
            onRenderRest={(values: DisplayValueType[]) => handleRenderRest(values)}
            onTagMouseDown={(event: React.MouseEvent) => handleTagMouseDown(event)}
            dropdownRender={dropdownRender}
            dropdownClassName={mergedDropdownClassName}
            onDropdownVisibleChange={handleDropdownVisibleChange}
            maxTagCount={maxTagCount}
        />
    );
};

// InternalAutoTagSelect.propTypes = selectPropTypes

const AutoTagSelect = React.forwardRef(InternalAutoTagSelect)

export default AutoTagSelect;
