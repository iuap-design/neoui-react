import classnames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';
import {getChildrenText, WebUI, getNid} from "../../wui-core/src";
import {BadgeProps} from "./iBadge"
import Ribbon from './Ribbon';
import {setComponentSize} from "../../wui-core/src/componentStyle"
import { WithConfigConsumer } from '../../wui-provider/src/context';

/**
 *  badge 默认显示内容1
 */


/* const propTypes = {
    /!**
	 * @title 颜色
	 *!/
    colors: PropTypes.oneOf(['primary', 'dark', 'success', 'info', 'warning', 'danger', 'default']),
    /!**
	 * @title 边角显示内容
	 *!/
    dataBadge: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    /!**
	 * @title 显示位置
	 * *!/
    dataBadgePlacement: PropTypes.oneOf(['top', 'bottom']),
    /!**
	 * @title 不展示数字，只有一个小红点
	 * *!/
    dot: PropTypes.bool,
    /!**
	 * @title 自定义小圆点的颜色
	 * *!/
    color: PropTypes.string,
    /!**
	 * @title 显示数值
	 * *!/
    count: PropTypes.node,
    /!**
	 * @title 展示封顶的数字值
	 * *!/
    overflowCount: PropTypes.number,
    /!**
	 * @title 当数值为 0 时，是否展示
	 * *!/
    showZero: PropTypes.bool,
    /!**
	 * @title 设置 Badge 显示状态
	 * *!/
    status: PropTypes.oneOf(['processing', 'error', 'success', 'warning', 'default', 'dark']),
    /!**
	 * @title 在设置了 count 的前提下有效，设置小圆点的大小
	 * *!/
    size: PropTypes.oneOf(['small', 'sm', 'default']),
    /!**
	 * @title 在设置了 status 的前提下有效，设置状态点的文本
	 * *!/
    text: PropTypes.node,
    /!**
	 * @title 设置鼠标放在状态点上时显示的文字
	 * *!/
    title: PropTypes.string,
    /!**
	 * @title 设置状态点的位置偏移
	 * *!/
    offset: PropTypes.array,
    /!**
     * @title 设置fieldid
     * *!/
    fieldid: PropTypes.string
};*/


const defaultProps = {
    colors: 'primary',
    dataBadgePlacement: 'top',
    dot: false,
    showZero: false,
    dataBadge: null,
    count: null,
    overflowCount: 99,
    size: 'default',
    title: null,
    status: null,
    text: null,
    color: null,
    fieldid: undefined
};
const colorsMap = {
    primary: 'primary',
    default: 'primary',
    secondary: 'secondary',
    accent: 'accent',
    success: 'success',
    info: 'info',
    processing: 'info',
    warning: 'warning',
    danger: 'danger',
    error: 'danger',
    dark: 'dark',
    light: 'light'
}
// const sizeMap = {
//     sm: 'sm',
//     small: 'sm',
//     default: undefined,
// }
@WithConfigConsumer({name: "badge"})
@WebUI({name: "badge", defaultProps})
class Badge extends React.Component<BadgeProps> {
    static Ribbon: typeof Ribbon;

    constructor(props: BadgeProps) {
        super(props);
    }

    render() {
        let {
            colors,
            className,
            children,
            clsPrefix,
            dataBadge,
            dataBadgePlacement,
            showZero,
            count,
            overflowCount,
            dot,
            color,
            title,
            status,
            offset,
            text,
            size,
            ...others
        } = this.props;

        let numberedDisplayCount;
        count = (count as number) - 0 == count ? (count as number) - 0 : count;
        let countHack = count ?? dataBadge;
        if (typeof countHack === 'number' && typeof overflowCount === 'number') {
            numberedDisplayCount = countHack > overflowCount ? `${overflowCount}+` : countHack;
        }
        const isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0;
        const hasStatus = (status !== null && status !== undefined) || (color !== null && color !== undefined);
        const showAsDot = (dot && !isZero) || hasStatus || (!countHack && countHack !== 0 && countHack !== null);
        const mergedCount = showAsDot ? '' : numberedDisplayCount;
        const isEmpty = mergedCount === null || mergedCount === undefined || mergedCount === '';
        const titleNode = (title || title === '') ? getChildrenText(title).join('') : (typeof countHack === 'string' || typeof countHack === 'number' ? countHack : undefined);
        const isConsumer = React.isValidElement(countHack);
        const isHidden = (isEmpty || (isZero && !showZero)) && !showAsDot && !isConsumer;
        const displayNode = isConsumer ? countHack : numberedDisplayCount;
        const textNode = showAsDot && text && !isHidden ? (
            <span className={`${clsPrefix}-status-text`}>{text}</span>) : undefined;


        let clsObj: {[key: string]: boolean} = {};
        if (className) {
            clsObj[className] = true;
        }
        /**
		 *  以u-badge起头的颜色类判断
		 */
        let colorHack = status || colors;
        if (colorsMap[colorHack!]) {
            clsObj[`${clsPrefix}-${colorsMap[colorHack!]}`] = true;
        } else { // 默认为primary
            clsObj[`${clsPrefix}-primary`] = true;
        }

        if (countHack || isZero || showAsDot) {
            clsObj[`data-badge`] = true;
        }
        if (dataBadgePlacement) {
            clsObj[`data-badge-${dataBadgePlacement}`] = true;
        }
        clsObj[`${clsPrefix}-custom-component`] = isConsumer;
        clsObj[`${clsPrefix}-status`] = hasStatus;
        clsObj[`${clsPrefix}-not-a-wrapper`] = !children;
        let classNames = classnames(clsPrefix, clsObj);

        let childClsObj: {[key: string]: boolean} = {}
        let childIdObj:Pick<BadgeProps, 'fieldid'> = {};
        childIdObj.fieldid = this.props.fieldid ? `${this.props.fieldid}_data_icon` : undefined;
        childClsObj[`${clsPrefix}-dot`] = showAsDot && !textNode; // <Badge dot><a href="#" className="badge-example" /></Badge>
        childClsObj[`${clsPrefix}-status-dot`] = showAsDot && !!textNode; // <Badge status="success" text="success" />
        childClsObj[`${clsPrefix}-${setComponentSize(size!)}`] = !!setComponentSize(size!) && !showAsDot;
        let childClassNames = classnames('data-icon', childClsObj);
        let childStyle = {
            background: color,
            [this.props.dir === 'rtl' ? "left" : "right"]: offset && -offset[0],
            marginTop: offset && offset[1],
        }
        let adapterNid = getNid(this.props)

        return (
            <span className={classNames} {...others} {...adapterNid}>
                <span>{children}{!isHidden && (<span title={showAsDot ? '' : (titleNode as string)} style={childStyle} {...childIdObj}
											 className={childClassNames}>{showAsDot ? '' : displayNode as number}</span>)}{textNode}</span>
                {/* {!dataBadge && (<span className="badge-single">{children}</span>)}*/}
            </span>
        );
    }
}

// Badge.propTypes = propTypes;

Badge.Ribbon = Ribbon;
export default Badge;
