import classNames from 'classnames';
// import PropTypes from 'prop-types';
import omit from 'rc-util/lib/omit';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Icon from '../../wui-icon/src';
import {ConfigContext} from "../../wui-provider/src/context";
import { defaultResponsiveMap as dimensionMaxMap } from '../../wui-core/src/LayoutUtils';

import {LayoutContext} from './Layout';
import { SiderContextProps, SiderProps } from './iLayout';


const isNumeric = (value: number) => !isNaN(parseFloat(`${value}`)) && isFinite(value);

// const dimensionMaxMap = {
//     // xs: '768px',
//     // sm: '992px',
//     // md: '767.98px',
//     // lg: '991.98px',
//     // xl: '1199.98px',
//     // xxl: '1599.98px',
//     'xs': '(max-width: 768px)',
//     'sm': '(min-width: 768px)',
//     'md': '(min-width: 992px)',
//     'lg': '(min-width: 1200px)',
// };

export const SiderContext = React.createContext<SiderContextProps>({});


// const SiderProps = {
//     prefixCls: PropTypes.string,
//     collapsible: PropTypes.bool,
//     collapsed: PropTypes.bool,
//     defaultCollapsed: PropTypes.bool,
//     reverseArrow: PropTypes.bool,
//     onCollapse: PropTypes.func,
//     zeroWidthTriggerStyle: PropTypes.object,
//     trigger: PropTypes.element,
//     width: PropTypes.string || PropTypes.number,
//     collapsedWidth: PropTypes.string || PropTypes.number,
//     breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
//     theme: PropTypes.oneOf(['light', 'dark']),
//     onBreakpoint: PropTypes.func,
//     style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     fieldid: PropTypes.string,
// }

const generateId = (() => {
    let i = 0;
    return (prefix = '') => {
        i += 1;
        return `${prefix}${i}`;
    };
})();

const Sider = React.forwardRef<HTMLElement, SiderProps>((
    {
        prefixCls: customizePrefixCls,
        className,
        trigger,
        children,
        defaultCollapsed = false,
        theme = 'light',
        style = {},
        collapsible = false,
        reverseArrow = false,
        width = 200,
        collapsedWidth = 80,
        zeroWidthTriggerStyle = {},
        breakpoint,
        onCollapse,
        onBreakpoint,
        ...props
    }: SiderProps,
    ref,
) => {
    const {siderHook} = useContext(LayoutContext);

    const [collapsed, setCollapsed] = useState(
        'collapsed' in props ? props.collapsed : defaultCollapsed,
    );
    const [below, setBelow] = useState(false);

    useEffect(() => {
        if ('collapsed' in props) {
            setCollapsed(props.collapsed);
        }
    }, [props.collapsed]);

    const handleSetCollapsed = (value: boolean, type: string) => {
        if (!('collapsed' in props)) {
            setCollapsed(value);
        }
        onCollapse && onCollapse(value, type);
    };

    // ========================= Responsive =========================
    const responsiveHandlerRef = useRef<(mql: MediaQueryListEvent | MediaQueryList) => void>();
    responsiveHandlerRef.current = (mql) => {
        setBelow(mql.matches);
        onBreakpoint && onBreakpoint(mql.matches);

        if (collapsed !== mql.matches) {
            handleSetCollapsed(mql.matches, 'responsive');
        }
    };

    useEffect(() => {
        function responsiveHandler(mql: MediaQueryListEvent | MediaQueryList) {
            return responsiveHandlerRef.current && responsiveHandlerRef.current(mql);
        }

        let mql: MediaQueryList;
        if (typeof window !== 'undefined') {
            const {matchMedia} = window;
            if (!!matchMedia && breakpoint && breakpoint in dimensionMaxMap) {
                mql = matchMedia(dimensionMaxMap[breakpoint]);
                try {
                    mql.addEventListener('change', responsiveHandler);
                } catch (error) {
                    mql.addListener(responsiveHandler);
                }
                responsiveHandler(mql);
            }
        }
        return () => {
            try {
                mql && mql.removeEventListener('change', responsiveHandler);
            } catch (error) {
                mql && mql.removeListener(responsiveHandler);
            }
        };
    }, []);

    useEffect(() => {
        const uniqueId = generateId('u-sider-');
        siderHook.addSider(uniqueId);
        return () => siderHook.removeSider(uniqueId);
    }, []);

    const toggle = () => {
        handleSetCollapsed(!collapsed, 'clickTrigger');
    };

    const {getPrefixCls} = useContext(ConfigContext);

    const renderSider = () => {
        const prefixCls = getPrefixCls('layout-sider', customizePrefixCls);
        const divProps = omit(props, ['collapsed']);
        const status = collapsed ? 'collapsed' : 'expanded';
        const rawWidth = collapsed ? collapsedWidth : width;
        // use "px" as fallback unit for width
        const siderWidth = isNumeric(Number(rawWidth)) ? `${rawWidth}px` : String(rawWidth);
        const iconObj = {
            expanded: reverseArrow ? <Icon type="uf-arrow-right"/> : <Icon type="uf-arrow-left"/>,
            collapsed: reverseArrow ? <Icon type="uf-arrow-left"/> : <Icon type="uf-arrow-right"/>,
            'zeroWidth-expanded': reverseArrow ? <Icon type="uf-youjiantou_shuang" /> : <Icon type="uf-daoshouye" />,
            'zeroWidth-collapsed': reverseArrow ? <Icon type="uf-daoshouye" /> : <Icon type="uf-youjiantou_shuang" />,
        };
        // special trigger when collapsedWidth == 0
        const zeroWidthTrigger =
				parseFloat(String(collapsedWidth || 0)) === 0 ? (
				    <span
				        onClick={toggle}
				        className={classNames(
				            `${prefixCls}-zero-width-trigger`,
				            `${prefixCls}-zero-width-trigger-${reverseArrow ? 'right' : 'left'}`,
                            `${prefixCls}-zero-width-trigger-${status}`,
				        )}
				        style={zeroWidthTriggerStyle}
				    >
				        {trigger || iconObj[`zeroWidth-${status}`]}
				    </span>
				) : null;

        const defaultTrigger = iconObj[status];
        const triggerDom =
				trigger !== null
				    ? zeroWidthTrigger || (
				        <div
				            className={`${prefixCls}-trigger`}
				            onClick={toggle}
				            style={{width: siderWidth}}
				        >
				            {trigger || defaultTrigger}
				        </div>
				    )
				    : null;
        const divStyle = {
            ...style,
            flex: `0 0 ${siderWidth}`,
            maxWidth: siderWidth, // Fix width transition bug in IE11
            minWidth: siderWidth, // https://github.com/ant-design/ant-design/issues/6349
            width: siderWidth,
        };
        const siderCls = classNames(
            prefixCls,
                `${prefixCls}-${theme}`,
                {
                    [`${prefixCls}-collapsed`]: !!collapsed,
                    [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
                    [`${prefixCls}-below`]: !!below,
                    [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0,
                },
                className,
        );
        return (
            <aside className={siderCls} {...divProps} style={divStyle} ref={ref}>
                <div className={`${prefixCls}-children`}>{children}</div>
                {collapsible || (below && zeroWidthTrigger) ? triggerDom : null}
            </aside>
        );
    };

    return (
        <SiderContext.Provider
            value={{
                siderCollapsed: collapsed,
                collapsedWidth,
            }}
        >
            {renderSider()}
        </SiderContext.Provider>
    );
})

Sider.displayName = 'Sider';
// Sider.propTypes = SiderProps
export default Sider;
