import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
// import PropTypes from 'prop-types';
import { composeRef } from 'rc-util/lib/ref';
import {ConfigContext} from "../../wui-provider/src/context";
import { LayoutContextProps, BasicPropsWithTagName, GeneratorProps } from './iLayout';
import { fillSpace as fillSpaceFunc, getNid} from "../../wui-core/src/index"
export const LayoutContext = React.createContext<LayoutContextProps>({
    siderHook: {
        addSider: () => null,
        removeSider: () => null,
    },
});
// const propTypes = {
//     tagName: PropTypes.string,
//     hasSider: PropTypes.bool,
//     fieldid: PropTypes.string,
// }

// const propTypesBasic = {
//     tagName: PropTypes.string,
//     hasSider: PropTypes.bool,
//     fieldid: PropTypes.string,
// }

export interface AdapterPropTypes extends BasicPropsWithTagName {
    forwardedRef?: React.Ref<HTMLElement | undefined>;
}

const generator = ({suffixCls, tagName, displayName}: GeneratorProps) => {
    return (BasicComponent: any) => {
        const Adapter = (props: AdapterPropTypes) => {
            const {forwardedRef} = props;
            const {getPrefixCls} = React.useContext(ConfigContext);
            const {prefixCls: customizePrefixCls} = props;
            const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);

            return <BasicComponent prefixCls={prefixCls} tagName={tagName} {...omit(props, ["forwardedRef", "tagName"])}
								   ref={forwardedRef}/>;
        };
        Adapter.displayName = displayName;
        // Adapter.propTypes = adapterPropTypes;
        return React.forwardRef<HTMLElement, AdapterPropTypes>((props, ref) => {
            const innerRef = React.useRef<HTMLElement>();
            const mergedRef = composeRef(ref, innerRef);
            return <Adapter {...props} forwardedRef={mergedRef}/>;
        });
    };
}

// 组件Header, Footer, Content实例
const InternalBasic: React.ForwardRefRenderFunction<HTMLElement, BasicPropsWithTagName> = (props, ref) => {
    const {prefixCls, className, children, tagName = 'div', ...others} = props;
    const classString = classNames(prefixCls, className);
    return React.createElement(tagName, {className: classString, ...others, ref: ref}, children);
};
const Basic = React.forwardRef<HTMLElement, BasicPropsWithTagName>(InternalBasic);
Basic.displayName = 'Basic';
// Basic.propTypes = propTypesBasic;

// 获取父容器元素，填充layout
const setLayoutHeightByfillSpace = (ref : HTMLElement | null) => {
    ref && fillSpaceFunc(ref, undefined, (_element, _parent, _noPaddingMaxW, _noPaddingMaxH) => {
        ref.style.height = _noPaddingMaxH + "px"
    })
}
// 组件layout实例
const InternalBasicLayout: React.ForwardRefRenderFunction<HTMLElement, BasicPropsWithTagName> = (props, ref) => {
    const [siders, setSiders] = React.useState<string[]>([]);

    const {prefixCls, className, children, hasSider, tagName: ComponentTag = 'section', fillSpace, ...others} = props;
    const classString = classNames(
        prefixCls,
        {
            [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : siders.length > 0,
        },
        className,
    );

    React.useEffect(()=>{
        let domRef = null;
        if (ref && "current" in ref && ref.current) {
            domRef = ref?.current;
        }
        fillSpace && setLayoutHeightByfillSpace(domRef)
    }, [ref])
    let adapterNid = getNid(props)

    return (
        <LayoutContext.Provider
            value={{
                siderHook: {
                    addSider: (id: string) => {
                        setSiders(prev => [...prev, id]);
                    },
                    removeSider: (id: string) => {
                        setSiders(prev => prev.filter(currentId => currentId !== id));
                    },
                },
            }}
        >
            <ComponentTag className={classString} {...others} ref={ref} {...adapterNid}>
                {children}
            </ComponentTag>
        </LayoutContext.Provider>
    );
};
const BasicLayout = React.forwardRef<HTMLElement, BasicPropsWithTagName>(InternalBasicLayout);
BasicLayout.displayName = 'BasicLayout';
// BasicLayout.propTypes = propTypes;


const Layout = generator({
    suffixCls: 'layout',
    tagName: 'section',
    displayName: 'LayoutContainer',
})(BasicLayout);

const Header = generator({
    suffixCls: 'layout-header',
    tagName: 'header',
    displayName: 'Header',
})(Basic);

const Footer = generator({
    suffixCls: 'layout-footer',
    tagName: 'footer',
    displayName: 'Footer',
})(Basic);

const Content = generator({
    suffixCls: 'layout-content',
    tagName: 'main',
    displayName: 'Content',
})(Basic);

export {Header, Footer, Content};
export default Layout;
