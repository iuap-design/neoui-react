import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { WebUI, getNid } from "../../wui-core/src/index";
import Icon from '../../wui-icon/src';
import Tooltip from '../../wui-tooltip/src';
import { TooltipPlacement } from '../../wui-tooltip/src/iTooltip';
import i18n from './i18n.js';
import {getLangInfo} from "../../wui-locale/src/tool";
import {WithConfigConsumer} from "../../wui-provider/src/context";

// import Prefixer from 'inline-style-prefixer';
// import stylePropType from 'react-style-proptype';

import Pane from './SpliterPane';
import Resizer from './SpliterResizer';
import { SpliterProps, SpliterState } from './iLayout';

const defaultProps: SpliterProps = {
    minSize: 50,
    primary: 'first',
    direction: 'vertical',
    allowResize: true,
    defaultMode: 'default',
    resizerable: true,
    // 目前不对外抛出
    step: 5,
};

function unFocus(document: any, window: any) {
    if (document.selection) {
        document.selection.empty();
    } else {
        try {
            window.getSelection().removeAllRanges();
        } catch (e) {}
    }
}
@WithConfigConsumer({name: "spliter"})
@WebUI({name: "spliter", defaultProps})
class Spliter extends React.Component<SpliterProps, SpliterState> {

  static defaultProps = defaultProps;

  pane1: Pane | null;
  pane2: Pane | null;
  spliter: HTMLDivElement | null;
  resizer: Resizer | null;
  local: any;

  constructor(props: SpliterProps) {
      super(props);
      this.state = {
          active: false,
          resized: false,
          position: 0,
          draggedSize: null,
          collapsed: props.collapsed ?? props.defaultCollapsed ?? false,
          mode: props.mode ? props.mode === 'mixed' ? props.defaultMode : props.mode : props.defaultMode,
      };
      this.spliter = null;
      this.pane1 = null;
      this.pane2 = null;
      this.resizer = null;
      this.local = getLangInfo(this.props.locale, i18n, 'layout');
  }

  componentDidMount() {
      this.setSize(this.props, this.state);
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('touchmove', this.onTouchMove);
  }

  UNSAFE_componentWillReceiveProps(props: SpliterProps) {
      this.setSize(props, this.state);
      if (props.mode && props.mode !== this.props.mode) {
          this.setState({
              mode: props.mode === 'mixed' ? props.defaultMode : props.mode,
          });
      }
      if (props.locale && props.locale !== this.props.locale) {
          this.local = getLangInfo(props.locale, i18n, 'layout');
      }

  }

  componentWillUnmount() {
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('touchmove', this.onTouchMove);
  }

    onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.uirunmode == 'design') return // 设计态禁止拖拽
        if (!this.props.resizerable) {
            return
        }
        const eventWithTouches = {
            ...event,
            touches: [{ clientX: event.clientX, clientY: event.clientY }],
        };
        this.onTouchStart(eventWithTouches);
    }

    onTouchStart = (event: any) => {
        const { onDragStarted, direction } = this.props;
        unFocus(document, window);
        // 记录开始位置
        const position =
        direction === 'vertical'
            ? event.touches[0].clientX
            : event.touches[0].clientY;

        if (typeof onDragStarted === 'function') {
            onDragStarted();
        }
        this.setState({
            active: true,
            position,
        });
    }

    onMouseMove = (event: MouseEvent) => {
        const eventWithTouches = Object.assign({}, event, {
            touches: [{ clientX: event.clientX, clientY: event.clientY }],
        });
        this.onTouchMove(eventWithTouches);
    }

    onTouchMove = (event: MouseEvent & { touches: { clientX: number; clientY: number; }[]; }) => {
        const { allowResize, onDragMove, direction, step, dir } = this.props;
        let { minSize, maxSize } = this.props;
        const { active, position } = this.state;
        maxSize = typeof maxSize === "string" ? parseFloat(maxSize) : maxSize;
        minSize = typeof minSize === "string" ? parseFloat(minSize) : minSize;
        if (allowResize && active) {
            unFocus(document, window);
            const isPrimaryFirst = this.props.primary === 'first';
            const ref = isPrimaryFirst ? this.pane1 : this.pane2;
            if (ref) {
                const node = ReactDOM.findDOMNode(ref) as Element;

                if (node.getBoundingClientRect) {
                    const width = node.getBoundingClientRect().width;
                    const height = node.getBoundingClientRect().height;
                    // 当前鼠标移动位置
                    const current =
                    direction === 'vertical'
                        ? event.touches[0].clientX
                        : event.touches[0].clientY;
                    const size = direction === 'vertical' ? width : height;
                    let positionDelta = position! - current;
                    if (step) {
                        if (Math.abs(positionDelta) < step) {
                            return;
                        }
                        // Integer division
                        // eslint-disable-next-line no-bitwise
                        positionDelta = ~~(positionDelta / step) * step;
                    }
                    let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;

                    let newMaxSize = maxSize;
                    if (maxSize !== undefined && maxSize <= 0) {
                        const splPane = this.spliter as HTMLDivElement;
                        if (direction === 'vertical') {
                            newMaxSize = splPane.getBoundingClientRect().width + Number(maxSize);
                        } else {
                            newMaxSize = splPane.getBoundingClientRect().height + Number(maxSize);
                        }
                    }

                    let newSize = direction === 'vertical' && dir === 'rtl' ? size + sizeDelta : size - sizeDelta;
                    const newPosition = position - positionDelta;

                    if (newSize < minSize) {
                        newSize = minSize as number;
                    } else if (newMaxSize !== undefined && newSize > newMaxSize) {
                        newSize = newMaxSize as number;
                    } else {
                        this.setState({
                            position: newPosition,
                            resized: true,
                        });
                    }

                    if (onDragMove) onDragMove(newSize);
                    // 从0拖拽展开状态改变
                    if (newSize > 0 && this.state.resized) {
                        this.setState({
                            collapsed: false
                        })
                    }
                    this.setState({ draggedSize: newSize });
                    ref.setState({ size: newSize });
                }
            }
        }
    }

    onMouseUp = () => {
        const { allowResize, onDragFinished } = this.props;
        const { active, draggedSize } = this.state;
        if (allowResize && active) {
            if (typeof onDragFinished === 'function') {
                onDragFinished(draggedSize!);
            }
            this.setState({ active: false });
        }
    }

    setSize = (props: SpliterProps, state: SpliterState) => {
        const { primary } = props;
        let { collapsed, resized } = this.state;
        // 同步props collapsed
        if ('collapsed' in props && props.collapsed !== undefined && props.collapsed !== state.collapsed) {
            collapsed = props.collapsed;
            this.setState({collapsed: props.collapsed})
        }
        const ref = primary === 'first' ? this.pane1 : this.pane2;
        const otherRef = primary === 'first' ? this.pane2 : this.pane1;
        let newSize;
        if (ref) {
            newSize =
        props.size ??
        (state && state.draggedSize) ??
        props.defaultSize ??
        props.minSize;
            newSize = collapsed ? 0 : newSize;
            ref.setState({
                size: newSize,
            });
            if (props.size !== state.draggedSize) {
                this.setState({
                    draggedSize: newSize,
                });
                // 当拖拽到0时，改变展开状态
                if (newSize == 0 && resized) {
                    this.setState({
                        collapsed: newSize == 0
                    })
                }
            }
        }
        // 将固定模块的size 重置
        if (otherRef) {
            otherRef.setState({
                size: undefined,
            });
        }
    }

    handleChangeCollapsed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: boolean) => {
        e.stopPropagation()
        const { onCollapse } = this.props;
        if (!('collapsed' in this.props)) {
            this.setState({
                collapsed: value
            }, () => {
                // 极值处理，拖拽到0，再打开size为默认宽度
                let {size, defaultSize} = this.props;
                let newProps = {
                    ...this.props,
                    size: size || defaultSize
                }
                this.setSize(newProps, this.state)
            })
        }
        onCollapse && onCollapse(value);
    };

    getTriggerDom = () => {
        const { trigger, primary, direction, clsPrefix, triggerStyle, dir: rtlDirection } = this.props;

        const directionFinal = direction === 'vertical' || typeof direction === undefined || direction === 'horizontal' ? direction : defaultProps.direction;
        const { collapsed, mode } = this.state;
        const reverseArrow = primary === 'second';
        const reversePos = primary === 'second' || rtlDirection === 'rtl';
        const iconObj = {
            verticalExpanded: reverseArrow ? <Icon type={ "uf-triangle-right"} /> : <Icon type={"uf-triangle-left"} />,
            verticalCollapsed: reverseArrow ? <Icon type={ "uf-triangle-left"} /> : <Icon type={ "uf-triangle-right"} />,
            horizontalExpanded: reverseArrow ? <Icon type="uf-zhankai" /> : <Icon type="uf-shouqi" />,
            horizontalCollapsed: reverseArrow ? <Icon type="uf-shouqi" /> : <Icon type="uf-zhankai" />,
        };
        const styleObj = {
            verticalExpanded: reversePos ? {'left': '1px', 'right': 'unset', borderRadius: '0 50% 50% 0'} : {'left': 'unset', 'right': '1px'},
            verticalCollapsed: reversePos ? {'right': '0', 'left': 'unset', borderRadius: '50% 0 0 50%'} : {'left': '0px', 'right': 'unset'},
            horizontalExpanded: reversePos ? {top: '1px', bottom: 'unset', borderRadius: '0 0 50% 50%'} : {top: 'unset', bottom: '1px'},
            horizontalCollapsed: reversePos ? {top: 'unset', bottom: '1px', borderRadius: '50% 50% 0 0'} : {top: '1px', bottom: 'unset'},
        };
        const status = collapsed ? `${directionFinal}Collapsed` : `${directionFinal}Expanded`;
        const defaultTrigger = iconObj[status];
        const style = styleObj[status];
        if (mode === 'on') {
            style.zIndex = 3
        }

        // if (collapsed && direction !== "horizontal") {
        //     if (style.left !== 'unset') {
        //         style.left = "1px"
        //     }
        //     if (style.right !== 'unset') {
        //         style.right = "1px"
        //     }
        // }

        const node = (
            <div
                onClick={(e) => this.handleChangeCollapsed(e, !collapsed)}
                style={{...style, ...triggerStyle}}
                className={classNames(
                    `${clsPrefix}-resizer-trigger`,
                    `${clsPrefix}-resizer-trigger-${collapsed ? 'collapsed' : 'expanded'}`,
                    `${clsPrefix}-resizer-trigger-${collapsed ? 'collapsed' : 'expanded'}-${rtlDirection}`,
                )}
            >
                {
                    typeof (trigger) === 'string' ?
                        <Icon type={trigger} />
                        :
                        (trigger || defaultTrigger)
                }
            </div>
        );
        let placement = {
            vertical: reverseArrow ? collapsed ? 'left' : 'right' : 'left',
            horizontal: 'top',
        }

        // const local = getLangInfo(locale, i18n, 'layout');

        return trigger !== null ? (
            <Tooltip key={String(collapsed)} mouseLeaveDelay={0} overlay={collapsed ? this.local?.langMap.unfold : this.local?.langMap.fold} placement={placement[direction] as TooltipPlacement}>
                {node}
            </Tooltip>
        ) : null;
    }

    getFixeNailDom = () => {
        const { primary, direction, clsPrefix, mode: modeProps, dir } = this.props;
        const { collapsed, mode } = this.state;
        const reverseArrow = primary === 'second';
        const isRTL = dir === 'rtl';
        const styleObj = reverseArrow ? {[isRTL ? "right" : "left"]: 'unset', [isRTL ? "left" : "right"]: '0px', borderRadius: isRTL ? ' 0 50% 50% 0' : '50% 0 0 50%'} : {[isRTL ? "right" : "left"]: '0px', [isRTL ? "left" : "right"]: 'unset', borderRadius: isRTL ? ' 50% 0 0 50%' : '0 50% 50% 0'};
        return modeProps === 'mixed' && !collapsed && direction === 'vertical' ? (
            <Tooltip overlay={mode === 'on' ? (this.local?.langMap.fixed || '固定侧边栏') : (this.local?.langMap.unfix || '取消固定')} placement={reverseArrow ? 'left' : 'right'}>
                <div
                    style={{...styleObj}}
                    onClick={this.handleFixedNailClick}
                    className={classNames(
                    `${clsPrefix}-resizer-fixed`
                    )}
                >
                    {mode === 'on' ? <Icon type="uf-suoding" /> : <Icon type="uf-dingzhu" />}
                </div>
            </Tooltip>
        ) : null;
    }

    handleFixedNailClick = () => {
        const { mode } = this.state;
        this.setState({
            mode: mode === 'on' ? 'default' : 'on'
        })
    }

    render() {
        const {
            allowResize,
            children,
            className,
            clsPrefix,
            defaultSize,
            minSize,
            onResizerClick,
            onResizerDoubleClick,
            // paneClassName,
            // pane1ClassName,
            // pane2ClassName,
            // paneStyle,
            // pane1Style: pane1StyleProps,
            // pane2Style: pane2StyleProps,
            primary,
            resizerClassName,
            resizerStyle,
            size,
            direction,
            collapsible,
            style: styleProps,
            resizerable = true
        } = this.props;

        const { active, collapsed, mode } = this.state;
        // const getGlobalDirection = globalConfig().getGlobalDirection;
        // const rtlDirection = getGlobalDirection();
        const style: React.CSSProperties = {
            display: 'flex',
            flex: 1,
            height: '100%',
            position: 'relative',
            outline: 'none',
            overflow: 'hidden',
            MozUserSelect: 'text',
            WebkitUserSelect: 'text',
            msUserSelect: 'text',
            userSelect: 'text',
            ...(styleProps || {}),
        }

        if (direction === 'vertical') {
            Object.assign(style, {
                flexDirection: mode === 'on' && primary === 'second' ? 'row-reverse' : 'row',
                left: 0,
                right: 0,
            });
        } else if (direction === 'horizontal') {
            Object.assign(style, {
                bottom: 0,
                flexDirection: 'column',
                minHeight: '100%',
                top: 0,
                width: '100%',
            });
        }

        const paneFirstStyle: React.CSSProperties = {
            zIndex: collapsed ? 1 : 2
        }
        const paneSecondStyle: React.CSSProperties = {
            position: 'absolute',
            height: "100%",
            width: "100%",
            zIndex: 1
        }
        const classes = classNames(clsPrefix, {
            [`${clsPrefix}-disabled`]: !allowResize,
            [`${clsPrefix}-collapsed`]: collapsible && !active, // 增加collapsed 动画
        }, className);
        const pane1Classes = classNames(`${clsPrefix}-first`, {
            [`${clsPrefix}-first-hidden`]: collapsed && mode !== 'on' && primary === 'first'
        });
        const pane2Classes = classNames(`${clsPrefix}-second`, {
            [`${clsPrefix}-first-hidden`]: collapsed && mode !== 'on' && primary === 'second'
        });
        const triggerDom = this.getTriggerDom()
        const fixeNailDom = this.getFixeNailDom()
        let adapterNid = getNid(this.props) // 适配nid、uitype

        let resizerRootClassName = classNames({
            [`${clsPrefix}-resizer-primary`]: mode === 'on' && primary === 'second',
        })
        return (
            <div
                className={classes}
                ref={node => {
                    this.spliter = node;
                }}
                style={style}
                {...adapterNid}
            >
                <Pane
                    className={pane1Classes}
                    key="pane1"
                    primary={primary}
                    ref={node => {
                        this.pane1 = node;
                    }}
                    style={mode === 'on' ? (primary === 'first' ? paneFirstStyle : paneSecondStyle) : {}}
                    size={
                        primary === 'first' ? size ?? defaultSize ?? minSize : undefined
                    }
                    direction={direction}
                >
                    {children && children.length > 0 ? children[0] : null }
                </Pane>
                <Resizer
                    onClick={onResizerClick}
                    onDoubleClick={onResizerDoubleClick}
                    onMouseDown={this.onMouseDown}
                    onTouchStart={this.onTouchStart}
                    onTouchEnd={this.onMouseUp}
                    key="resizer"
                    ref={node => {
                        this.resizer = node;
                    }}
                    resizerClassName={resizerClassName}
                    direction={direction}
                    primary={primary}
                    resizerable={resizerable}
                    style={resizerStyle}
                    collapsed={collapsed}
                    trigger={collapsible ? triggerDom : null}
                    fixeNail={collapsible ? fixeNailDom : null}
                    className={resizerRootClassName}
                />
                <Pane
                    className={pane2Classes}
                    style={mode === 'on' ? (primary === 'second' ? paneFirstStyle : paneSecondStyle) : {}}
                    key="pane2"
                    primary={primary}
                    ref={node => {
                        this.pane2 = node;
                    }}
                    size={
                        primary === 'second' ? size ?? defaultSize ?? minSize : undefined
                    }
                    direction={direction}
                >
                    {
                        React.Children.map(children, (child, index) => {
                            if (index === 0) return null;
                            return child
                        })
                    }
                </Pane>
            </div>
        );
    }
}

export default Spliter as React.ComponentClass<Partial<SpliterProps>>;
