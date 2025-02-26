import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {WebUI} from "../../wui-core/src/index";
import {
    detectFlexGapSupported,
    responsiveArray as DEVICE_SIZES,
    responsiveObserve,
    ScreenMap
} from "../../wui-core/src/LayoutUtils";
import RowContext from "./RowContext";
import { RowProps, RowState } from './iLayout';

// const propTypes = {
//     componentClass: PropTypes.oneOfType([
//         PropTypes.element,
//         PropTypes.string
//     ]),
//     grid: PropTypes.oneOf([12, 24]),
//     direction: PropTypes.string,
//     screens: PropTypes.string,
//     gutter: PropTypes.oneOfType([
//         PropTypes.number,
//         PropTypes.object,
//         PropTypes.array,
//     ]),
//     wrap: PropTypes.bool,
//     align: PropTypes.oneOf(['top', 'middle', 'bottom']),
//     justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
//     style: PropTypes.object
// };

const defaultProps: RowProps = {
    componentClass: 'div',
    grid: 24,
    wrap: true,
    gutter: 0,
};

@WebUI({name: "row", defaultProps})
class Row extends Component<RowProps, RowState> {
    static defaultProps: RowProps = defaultProps;
    token: number | null;
    // responsiveMap: Record<Breakpoint, string>;
    constructor(props: RowProps) {
        super(props)
        this.state = {
            supportFlexGap: true,
            screens: {
                xs: true,
                sm: true,
                md: true,
                lg: true,
                xl: true,
                xxl: true
            }
        }
        // this.responsiveMap = this.getResponsiveMapBySize();
        this.token = null;
    }

    componentDidMount() {
        this.setState({
            supportFlexGap: detectFlexGapSupported()
        })
        this.token = responsiveObserve.subscribe((screen: ScreenMap) => {
            // const currentGutter = this.props.gutter || 0;
            // 判断gutter内容是否为对象，是则加媒体查询监听，重新设置screens
            // if (
            //     (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
            // 	(Array.isArray(currentGutter) &&
            // 		(typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'))
            // ) {
            //     this.setState({screens: screen})
            // }
            this.setState({screens: screen})
        }, this.props.size);
    }

    componentWillUnmount() {
        if (this.token) {
            responsiveObserve.unsubscribe(this.token, this.props.size)
        }
    }

    /**
     * 根据size属性转换响应对象ResponsiveMap
     * @size {xs: 600, md: 1000, ...}
     * 存在sm 则xs&sm 都以sm 的值为准
     */
    // getResponsiveMapBySize = () => {
    //     const { size } = this.props;
    //     let newResponsiveMap = {'xs': '(max-width: 600px)'};
    //     if (size && Object.keys(size).length > 0) {
    //         let keys = Object.keys(size);
    //         keys.forEach((key, index) => {
    //             if (index === keys.length - 1) {
    //                 newResponsiveMap = {...newResponsiveMap, 'xs': `(max-width: ${size.xs})`}
    //             } else {
    //                 newResponsiveMap = {...newResponsiveMap, [key]: `(min-width: ${size[key]})`}
    //             }
    //         })
    //     }
    //     return {...newResponsiveMap}
    // }

    render() {
        const {supportFlexGap, screens} = this.state;
        const {
            componentClass,
            grid,
            clsPrefix,
            gutter,
            wrap,
            align,
            justify,
            className,
            style,
            ...others
        } = this.props;
        const Component = componentClass || 'div';
        const getGutter = (): [number, number] => {
            const results: [number, number] = [0, 0];
            const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
            normalizedGutter.forEach((g, index) => {
                if (typeof g === 'object') {
                    for (let i = 0; i < DEVICE_SIZES.length; i++) {
                        const breakpoint = DEVICE_SIZES[i];
                        if (screens[breakpoint] && g[breakpoint] !== undefined) {
                            results[index] = g[breakpoint] || 0;
                            break;
                        }
                    }
                } else {
                    results[index] = g || 0;
                }
            });
            return results;
        };
        const gutters = getGutter();
        const classes = classNames(
            clsPrefix,
            {
                [`${clsPrefix}-no-wrap`]: wrap === false,
                [`${clsPrefix}-${justify}`]: justify,
                [`${clsPrefix}-${align}`]: align,
                // [`${clsPrefix}-rtl`]: direction === 'rtl',
            }
        );
        // Add gutter related style
        const rowStyle: React.CSSProperties = {};
        const horizontalGutter = gutters[0] > 0 ? gutters[0] / -2 : undefined;
        const verticalGutter = gutters[1] > 0 ? gutters[1] / -2 : undefined;

        if (horizontalGutter) {
            rowStyle.marginLeft = horizontalGutter;
            rowStyle.marginRight = horizontalGutter;
        }


        if (supportFlexGap) {
            // Set gap direct if flex gap support
            [, rowStyle.rowGap] = gutters;
        } else if (verticalGutter) {
            rowStyle.marginTop = verticalGutter;
            rowStyle.marginBottom = verticalGutter;
        }
        const rowContext = {gutter: gutters, wrap, supportFlexGap}
        const extralClass = grid === 12 ? `${clsPrefix}-${grid}` : ""
        return (
            <RowContext.Provider value={{
                ...rowContext,
                screens
            }}>
                <Component
                    {...others}
                    className={classNames(classes, className, extralClass)}
                    style={{...rowStyle, ...style}}
                >
                    {this.props.children}
                </Component>
            </RowContext.Provider>
        );
    }
}

// Row.displayName = 'Row';

// Row.propTypes = propTypes;

export default Row;
