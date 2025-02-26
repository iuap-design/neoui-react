import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component, CSSProperties} from 'react';
import {WebUI} from "../../wui-core/src/index";
import {
    responsiveArray as DEVICE_SIZES,
    Breakpoint,
    responsiveObserve,
    ScreenMap
} from "../../wui-core/src/LayoutUtils";
import RowContext, {RowContextState} from "./RowContext";
import { ColProps, ColSize, ColPropsKey, ColState } from './iLayout';
import omit from 'omit.js';

// const propTypes = {
//     componentClass: PropTypes.oneOfType([
//         PropTypes.element,
//         PropTypes.string,
//     ]),
//     /**
// 	 * xs显示列数
// 	 */
//     xs: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
//     /**
// 	 * sm显示列数
// 	 */
//     sm: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
//     /**
// 	 * md显示列数
// 	 */
//     md: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
//     /**
// 	 * lg显示列数
// 	 */
//     lg: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
//     /**
// 	 * xs偏移列数
// 	 */
//     xsOffset: PropTypes.number,
//     /**
// 	 * sm偏移列数
// 	 */
//     smOffset: PropTypes.number,
//     /**
// 	 * md偏移列数
// 	 */
//     mdOffset: PropTypes.number,
//     /**
// 	 * lg偏移列数
// 	 */
//     lgOffset: PropTypes.number,
//     /**
// 	 * xs右偏移列数
// 	 */
//     xsPush: PropTypes.number,
//     /**
// 	 * sm右偏移列数
// 	 */
//     smPush: PropTypes.number,
//     /**
// 	 * md右偏移列数
// 	 */
//     mdPush: PropTypes.number,
//     /**
// 	 * lg右偏移列数
// 	 */
//     lgPush: PropTypes.number,
//     /**
// 	 * xs左偏移列数
// 	 */
//     xsPull: PropTypes.number,
//     /**
// 	 * sm左偏移列数
// 	 */
//     smPull: PropTypes.number,
//     /**
// 	 * md左偏移列数
// 	 */
//     mdPull: PropTypes.number,
//     /**
// 	 * lg左偏移列数
// 	 */
//     lgPull: PropTypes.number,
//     /**
// 	 * 显示列数
// 	 */
//     span: PropTypes.number,
//     /**
// 	 * 偏移列数
// 	 */
//     offset: PropTypes.number,
//     /**
// 	 * 左偏移列数
// 	 */
//     pull: PropTypes.number,
//     /**
// 	 * 右偏移列数
// 	 */
//     push: PropTypes.number,
//     style: PropTypes.object,
//     order: PropTypes.number,
//     flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// };

const colPropsKeyArray: ColPropsKey[] = ['xsOffset', 'smOffset', 'mdOffset', 'lgOffset', 'xlOffset', 'xxlOffset', 'xsPush', 'smPush', 'mdPush', 'lgPush', 'xlPush', 'xxlPush', 'xsPull', 'smPull', 'mdPull', 'lgPull', 'xlPull', 'xxlPull']

const defaultProps = {
    componentClass: 'div',
};

function parseFlex(flex: string | number) {
    if (typeof flex === 'number') {
        return `${flex} ${flex} auto`;
    }

    if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
    }

    return flex;
}

// type ColPropsKey = keyof ColProps;

@WebUI({name: "col", defaultProps})
class Col extends Component<ColProps, ColState> {
    static contextType = RowContext;
    token: number | null = null;
    constructor(props: ColProps) {
        super(props);
        this.state = {
            screens: {
                xs: true,
                sm: true,
                md: true,
                lg: true,
                xl: true,
                xxl: true
            }
        };
    }

    componentDidMount() {
        let { screens } = this.context as RowContextState;
        // 未渲染row 组件
        if (!screens) {
            this.token = responsiveObserve.subscribe((screens: ScreenMap) => {
                this.setState({screens})
            });
        }
    }

    componentWillUnmount() {
        if (this.token) {
            responsiveObserve.unsubscribe(this.token)
        }
    }

    render() {
        const {
            componentClass: Component = 'div',
            className,
            order,
            span,
            offset,
            push,
            pull,
            clsPrefix = '',
            flex,
            style,
            ...others
        } = this.props;


        return (
            <RowContext.Consumer>
                {({gutter, supportFlexGap, screens}) => {
                    let tbClass = {[clsPrefix]: true};
                    let tbClassObj = {};
                    screens = screens ?? this.state.screens;
                    /**
                     * 对传入props做样式转化 渲染screens第一个响应值为true的样式
                     * @type {[type]}
                     */
                    for (let i = 0; i < DEVICE_SIZES.length; i++) {
                        const size = DEVICE_SIZES[i];
                        if (screens && screens[size]) {
                            // 处理 'xxl' | 'xl' | 'lg'| 'md'| 'sm'| 'xs'
                            if (this.props[size] && Object.keys(tbClassObj).length === 0) {
                                let sizeProps: ColSize = {};
                                const propSize = this.props[size];
                                if (typeof propSize === 'number') {
                                    sizeProps.span = propSize;
                                } else if (typeof propSize === 'object') {
                                    sizeProps = propSize || {};
                                }
                                // antd
                                tbClassObj = {
                                    [`${clsPrefix}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
                                    [`${clsPrefix}-${size}-order-${sizeProps.order}`]: !!sizeProps.order || sizeProps.order === 0,
                                    [`${clsPrefix}-${size}-offset-${sizeProps.offset}`]: !!sizeProps.offset || sizeProps.offset === 0,
                                    [`${clsPrefix}-${size}-push-${sizeProps.push}`]: !!sizeProps.push || sizeProps.push === 0,
                                    [`${clsPrefix}-${size}-pull-${sizeProps.pull}`]: !!sizeProps.pull || sizeProps.pull === 0,
                                    // [`${clsPrefix}-rtl`]: direction === 'rtl',
                                };
                            }
                            // 处理 xsOffset xsPush xsPull ...
                            const popProp = (propSuffix: 'Offset' | 'Push' | 'Pull', modifier: string) => {
                                let propName: ColPropsKey | Breakpoint = `${size}${propSuffix}`; // xs xsOffset lgsOffset
                                const propValue = others[propName];
                                if (typeof propValue === 'number' && propValue != undefined && propValue != null && !Object.keys(tbClass).find(cls => cls.indexOf(modifier) > 0)) {
                                    tbClass = {
                                        ...tbClass,
                                        [`${clsPrefix}-${size}${modifier}-${propValue}`]: true
                                    };
                                }
                            }

                            popProp('Offset', '-offset');
                            popProp('Push', '-push');
                            popProp('Pull', '-pull');
                        }

                    }

                    const mergedStyle: CSSProperties = {};
                    if (gutter && gutter[0] > 0) {
                        const horizontalGutter = gutter[0] / 2;
                        mergedStyle.paddingLeft = horizontalGutter;
                        mergedStyle.paddingRight = horizontalGutter;
                    }

                    if (gutter && gutter[1] > 0 && !supportFlexGap) {
                        const verticalGutter = gutter[1] / 2;
                        mergedStyle.paddingTop = verticalGutter;
                        mergedStyle.paddingBottom = verticalGutter;
                    }
                    if (flex) {
                        mergedStyle.flex = parseFlex(flex);

                        // Hack for Firefox to avoid size issue
                        // if (flex === 'auto' && wrap === false && !mergedStyle.minWidth) {
                        //   mergedStyle.minWidth = 0;
                        // }
                    }
                    return (
                        <Component
                            className={classNames({
                                [`${clsPrefix}-${span}`]: span !== undefined,
                                [`${clsPrefix}-order-${order}`]: order,
                                [`${clsPrefix}-offset-${offset}`]: offset,
                                [`${clsPrefix}-push-${push}`]: push,
                                [`${clsPrefix}-pull-${pull}`]: pull,
                            }, {...tbClass, ...tbClassObj}, className)}
                            {...omit(others, [...DEVICE_SIZES, ...colPropsKeyArray])}
                            style={{...mergedStyle, ...style}}
                        >
                            {this.props.children}
                        </Component>
                    )
                }}
            </RowContext.Consumer>
        );
    }
}

// Col.propTypes = propTypes;


export default Col;
