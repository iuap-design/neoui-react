import React, {useState, useEffect, PropsWithChildren} from 'react'
import omit from 'omit.js';
import {ConfigContext} from "../../wui-provider/src/context";
import {
    TypographyParagraphProps,
    EllipsisConfig,
} from './iTypography';
import ResizeObserverComponent from './resizeObserver';
import classNames from 'classnames';
// import Popover from '../../wui-popover/src/index';
import Tooltip from '../../wui-tooltip/src';
import { mergedToString } from './util';
import useEllipsis, { MEASURE_STATUS } from './useEllipsis';
import useCssEllipsis from './hooks/useCssEllipsis';
import Operations from './operations';
import {getLangInfo} from "../../wui-locale/src/tool";
import i18n from './i18n.js';


import { isObject } from './util';

type BaseProps = PropsWithChildren<
  TypographyParagraphProps
> & {
  componentType: 'Title' | 'Paragraph' | 'Text'; // 预留类型，为后续扩展
};

function getClassNameAndComponentName(props: BaseProps, prefixCls: string) {
    const { disabled } = props;

    // 暂留，为后续增加多类型文本
    const component = ['span'];
    const className = [];

    // 文字类型'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'，样式暂不支持
    // if (type) {
    //     className.push(`${prefixCls}-${type}`);
    // }
    if (disabled) {
        className.push(`${prefixCls}-disabled`);
    }

    return {
        component,
        className,
    };
}

const defaultProps = {
    ellipsis: true,
    showPopover: false,
}

const Base = (props: BaseProps) => {
    const {
        componentType,
        style,
        className,
        children,
        ellipsis,
        blockquote,
        ...rest
    } = props;
    const {getPrefixCls, locale} = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls('typography');
    const local = getLangInfo(locale, i18n, 'typography');
    const [width, setWidth] = useState(0);

    const { component, className: componentClassName } = getClassNameAndComponentName(
        props,
        prefixCls
    );


    const ellipsisConfig: EllipsisConfig = ellipsis
        ? { rows: 3, ellipsisStr: '...', cssEllipsis: false, direction: 'end', ...(isObject(ellipsis) ? ellipsis : {}) as object }
        : {};

    const EllipsisWrapperTag = ellipsisConfig.wrapper || React.Fragment;
    const [expanding, setExpanding] = useState<boolean>(ellipsisConfig.expanded ?? ellipsisConfig.defaultExpanded ?? false);
    const { simpleEllipsis, ellipsisStyle } = useCssEllipsis(ellipsisConfig);
    const renderMeasureContent = (node: React.ReactNode, isEllipsis: boolean) => {
        const suffix = ellipsisConfig.suffix !== undefined && ellipsisConfig.suffix;
        return (
            <EllipsisWrapperTag>
                {node}
                {suffix}
                {/* 收起按钮一直在尾部，展开根据省略位置渲染 */}
                {expanding ? renderOperations(isEllipsis) : null}
            </EllipsisWrapperTag>
        );
    };

    const { ellipsisNode, isEllipsis, measureStatus } = useEllipsis({
        ...ellipsisConfig,
        children,
        expanding,
        width,
        renderMeasureContent,
        renderOperations,
        simpleEllipsis: simpleEllipsis || expanding,
    });

    const handleResize = (entry: any) => {
        const { contentRect } = entry?.[0];
        if (contentRect) {
            const currentWidth = contentRect.width;
            const resizeStatus = [MEASURE_STATUS.NO_NEED_ELLIPSIS, MEASURE_STATUS.MEASURE_END];
            // 在 table 中，使用了 cssEllipsis 因为 white-space: "nowrap"，宽度会突然变很大
            // 导致再次触发 resize 计算，进入循环。
            // diffTime 应对短时间内多次触发
            if (resizeStatus.includes(measureStatus)) {
                setWidth(currentWidth);
            }
        }
    };

    function renderOperations(isEllipsis?: boolean) {
        return (
            <>
                <Operations
                    {...props}
                    onClickExpand={onClickExpand}
                    expanding={expanding}
                    isEllipsis={isEllipsis}
                    prefixCls={prefixCls}
                    local={local}
                />
            </>
        );
    }

    function onClickExpand(e: any) {
        setExpanding(!expanding);
        props.onClickExpand && props.onClickExpand(e);
        ellipsisConfig.onExpand && ellipsisConfig.onExpand(!expanding, e);
    }

    useEffect(() => {
        ellipsisConfig.onEllipsis && ellipsisConfig.onEllipsis(isEllipsis);
    }, [isEllipsis]);

    function wrap(content: React.JSX.Element, component: any[], _props: BaseProps, innerProps = {}) {
        let currentContent = content;
        component.forEach((c: string, _index: number) => {
            const _innerProps = _index === 0 ? innerProps : {};
            //     const _props =
            // isObject(props.mark) && props.mark.color
            //     ? { style: { backgroundColor: props.mark.color }, ..._innerProps }
            //     : { ..._innerProps };
            currentContent = React.createElement(c, { ..._innerProps }, currentContent);
        });
        return currentContent;
    }

    let TextComponent: React.ElementType;
    if (componentType === 'Paragraph') {
        TextComponent = blockquote ? 'blockquote' : 'div';
    }

    function renderContent() {
        const fullText = mergedToString(React.Children.toArray(children));
        const popoverStyle = {
            width: '70%',
            maxWidth: 'unset',
            maxHeight: '350px',
            overflow: 'auto'
        };
        const showPopover = ellipsisConfig.showPopover;
        const popoverProps = isObject(showPopover)
            ? {...showPopover || {}, overlayStyle: {...popoverStyle, ...showPopover?.overlayStyle}}
            : {overlayStyle: {...popoverStyle}};
        const TooltipComponent = Tooltip;

        const titleProps = isEllipsis && !showPopover && !expanding ? { title: fullText } : {};

        const baseProps = {
            style,
            ...titleProps,
        };

        const addTooltip = isEllipsis && showPopover && !expanding;

        const node = (
            <ResizeObserverComponent onResize={handleResize}>
                <TextComponent
                    className={classNames(prefixCls, componentClassName, className)}
                    {...baseProps}
                    {...omit(rest, [
                        'type',
                        'disabled',
                        'onClickExpand'
                    ])}
                >
                    {simpleEllipsis && measureStatus !== MEASURE_STATUS.INIT && !expanding && isEllipsis
                        ? wrap(
                            // CSS folding style, need to wrap the text separately.
                            renderMeasureContent(<span style={ellipsisStyle}>{children}</span>, isEllipsis),
                            component,
                            props,
                            // The simple-ellipsis class ensures that the ReactNode after the text is displayed correctly (no line breaks)
                            // Need to act on the immediate parent node of the text
                            { className: `${prefixCls}-simple-ellipsis` }
                        )
                        : wrap(ellipsisNode, component, props)}
                </TextComponent>
            </ResizeObserverComponent>
        );

        if (addTooltip) {
            return (
                <TooltipComponent overlay={fullText} {...popoverProps}>
                    <span>{node}</span>
                </TooltipComponent>
            );
        }

        return node;
    }

    return renderContent();
}

Base.defaultProps = defaultProps;

export default Base;
