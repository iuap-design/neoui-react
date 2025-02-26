// import PropTypes from 'prop-types';
import Rates from 'rc-rate/lib/index';
import React, {useRef, useEffect, useImperativeHandle, useCallback, useMemo} from 'react';
import {prefix, getNid, formatUtils} from "../../wui-core/src/index"
import Icon from '../../wui-icon/src';
import Tooltip from '../../wui-tooltip/src';
import { globalConfig } from '../../wui-provider/src';
import { useConfigContext } from '../../wui-provider/src/context';
import {RateProps} from './iRate'

function noop() {}

/* const propTypes = {
    count: PropTypes.number,
    value: PropTypes.number,
    index: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
    onHoverChange: PropTypes.func,
    allowHalf: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    style: PropTypes.object,
    character: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    allowClear: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    autoFocus: PropTypes.bool,
    fieldid: PropTypes.string
};*/

const defaultProps = {
    count: 5,
    defaultValue: 0,
    value: undefined,
    onChange: noop,
    onHoverChange: noop,
    allowHalf: false,
    disabled: false,
    character: undefined,
    className: '',
    autoFocus: false,
    prefixCls: `${prefix}-rate`,
    style: {},
    fieldid: undefined
};
const Rate = React.forwardRef<unknown, RateProps>(({character, fieldid, tooltips, ...props}: RateProps, ref) => {

    // const rateRef = useRef<Rates>(null)
    const rateRef = useRef<any>(null)
    let [hoverValue, setHoverValue] = React.useState(0)
    const {dir: rtlDirection = 'ltr'} = props.dir ? {dir: props.dir} : useConfigContext();

    const { decimalSeparator } = useMemo(() =>{
        // format接入工作台首选项等provider配置
        const globalDataFormat = globalConfig().getGlobalDataFormat();
        const {numberFormat} = globalDataFormat;
        if (numberFormat) {
            let diworkFormat = formatUtils.diworkfFormat2Num(numberFormat);
            return {
                decimalSeparator: props.decimalSeparator ?? diworkFormat.decimalSeparator,
            }
        } else {
            return {
                decimalSeparator: props.decimalSeparator ?? '.',
            }
        }
    }, [props.decimalSeparator]);

    useEffect(() => {
        const ulDom = rateRef.current.dom as HTMLUListElement;
        const liArr:HTMLLIElement[] = [].slice.call(ulDom.children); // #QDJCJS-9660 兼容IE
        ulDom.classList[rtlDirection === 'ltr' ? 'remove' : 'add'](`${prefix}-rate-rtl`);
        if (fieldid) {
            ulDom.setAttribute('fieldid', fieldid);
            liArr.length > 0 && liArr.forEach((v:HTMLLIElement, i:number) => {
                v.setAttribute('fieldid', `${fieldid}_rate_${i}`);
            })
        } else if (ulDom.getAttribute('fieldid')) {
            ulDom.removeAttribute('fieldid');
            liArr.length > 0 && liArr.forEach((v:HTMLLIElement, _i:number) => {
                v.removeAttribute('fieldid');
            })
        }
    }, [fieldid])

    useEffect(() => {
        const { value } = props;
        const ulDom = rateRef.current.dom as HTMLUListElement;

        const resetDom = (ele?: HTMLLIElement) => {
            const decimalDom = ele || ulDom.querySelector(`.${prefix}-rate-star-decimal`) || ulDom.querySelector(`.${prefix}-rate-star-half`);
            if (decimalDom) {
                decimalDom.classList.remove(`${prefix}-rate-star-decimal`);
                const divFirst = decimalDom.querySelector(`.${prefix}-rate-star-first`) as HTMLDivElement;
                divFirst.style.width = null as any;
            }
        }

        if (hoverValue) { // hover操作时重置dom
            resetDom();
            return;
        }

        if (!Number.isInteger(value) && !(props.allowHalf && ((value! * 10) % 5 === 0))) { // 判断是否为整数,兼容原来支持的半数显示
            const liArr:HTMLLIElement[] = [].slice.call(ulDom.children);
            if (value! < liArr.length) {
                liArr.length > 0 && liArr.forEach((v:HTMLLIElement, i:number) => {
                    if (value! > i && value! < i + 1) { // 找出需要操作的dom
                        v.classList.add(`${prefix}-rate-star-decimal`)
                        const divFirst = v.querySelector(`.${prefix}-rate-star-first`) as HTMLDivElement;
                        divFirst.style.width = `${Math.round((value! - i) * 100)}%`;
                        if (character === undefined) { // 默认图标特殊处理
                            const iDom = divFirst.children[0];
                            iDom.classList.remove('uf-star-o', 'uf-star-3');
                            iDom.classList.add('uf-star');
                        }
                    } else {
                        resetDom(v)
                    }
                })
            }
        } else {
            resetDom();
        }
    }, [hoverValue, props.value])

    useImperativeHandle(ref, () => {
        return {
            focus: () => rateRef.current?.focus(),
            blur: () => rateRef.current?.blur(),
            ...rateRef.current
        }
    })

    // const ratePrefixCls = `${prefix}-rate`;
    const characterRender = (props: RateProps) => {
        if (character === undefined) { // 默认值为 undefined
            const {index, value, allowHalf} = props;
            const starValue = index! + 1;
            if (allowHalf && value! + 0.5 >= starValue && value! < starValue) {
                return <Icon type="uf-star-3" />
            } else {
                return starValue <= value! ? <Icon type="uf-star"/> : <Icon type="uf-star-o"/>;
            }
        }
        return character;
    }
    const characterNode = typeof character === 'function' ? character : characterRender;

    const hoverChange = useCallback((value: number) => {
        const { onHoverChange, allowHalf } = props;
        const dispalyValue = value ? allowHalf && parseInt(value.toString()) !== value ? value.toString().replace('.', decimalSeparator) : value.toString() : '';
        onHoverChange && onHoverChange(value, dispalyValue);
        setHoverValue(value);
    }, [props.onHoverChange, decimalSeparator]);

    const characterRenderFn = useCallback((node: React.ReactElement, { index }: {index: number}) => {
        if (!tooltips) {
            return node;
        }
        let tips = tooltips[index];
        if (!isNaN(+tips) && tips?.toString()?.indexOf('.') !== -1) {
            tips = tips?.toString().replace('.', decimalSeparator);
        }
        return <Tooltip title={tips}>{node}</Tooltip>;
    }, [tooltips, decimalSeparator]);
    let adapterNid = getNid(props)

    const handleChange = useCallback((value: number) => {
        const { onChange, allowHalf } = props;
        const dispalyValue = value ? allowHalf && parseInt(value.toString()) !== value ? value.toString().replace('.', decimalSeparator) : value.toString() : '';
        onChange && onChange(value, dispalyValue);
    }, [props.onChange, decimalSeparator]);

    return (
        // @ts-ignore onKeyDown 类型定义
        <Rates
            ref={rateRef}
            {...props}
            onChange={handleChange}
            // prefixCls={ratePrefixCls}
            character={characterNode}
            characterRender={characterRenderFn}
            onHoverChange={hoverChange}
            {...adapterNid}
            direction={rtlDirection}
        />
    );
});

Rate.displayName = 'Rate';
// Rate.propTypes = propTypes;
Rate.defaultProps = defaultProps;
export default Rate;
