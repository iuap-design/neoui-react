import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import {WebUI, getNid} from "../../wui-core/src/index"
import splitObject from './splitObject';
import TimelineItem from './TimelineItem';
import TimelineItemGroup from './TimelineItemGroup';
import {prefix} from "../../wui-core/src/index";
import {TimelineProps} from './iTimeline'
import { WithConfigConsumer } from '../../wui-provider/src/context';

/* const propTypes = {
    pending: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.node
    ]),
    fieldid: PropTypes.string
} */

const defaultProps = {
    fieldid: undefined
}

// static Item: React.ReactNode;  TimelineProps
@WithConfigConsumer()
@WebUI({name: "timeline", defaultProps})
class Timeline extends React.Component<TimelineProps> {

    static Item: typeof TimelineItem;
    static Group: typeof TimelineItemGroup;

    timelineRef: React.RefObject<HTMLUListElement>;
    hasLabel?: boolean; // 是否有label标签
    hadLabel?: boolean; // 是否存在过label标签
    constructor(props: TimelineProps) {
        super(props);

        this.timelineRef = React.createRef<HTMLUListElement>();
    }
    componentDidMount(): void {
        this.setLabelWidth('mount');
    }

    componentDidUpdate(_prevProps: Readonly<TimelineProps>, _prevState: Readonly<{}>, _snapshot?: any): void {
        this.setLabelWidth('update');
    }

    setLabelWidth = (flag: string) => {
        const {labelWidth, mode, dir} = this.props;
        if (this.hasLabel && typeof labelWidth !== 'number') { // 有label标签，并且没有设置label宽度
            const ulDom = this.timelineRef.current;
            const labelList: NodeListOf<HTMLDivElement> = ulDom!.querySelectorAll(`.${prefix}-timeline-item-label`);
            if (mode === 'alternate') {
                labelList.forEach(dom => {
                    dom.style.removeProperty('width');
                })
                ulDom?.style.removeProperty('margin-left');
                ulDom?.style.removeProperty('margin-right');
                return;
            }
            let maxWidth = 0;
            let paddingWidth = 2;
            labelList.forEach(dom => {
                if (flag === 'update') {
                    dom.style.removeProperty('width');
                }
                let domWidth = dom.offsetWidth;
                maxWidth = maxWidth > domWidth ? maxWidth : domWidth;
            })
            let [min = 92, max = 180] = Array.isArray(labelWidth) ? labelWidth : [];
            if (min > max) {
                [min, max] = [max, min]
            }
            let labelCalcWidth = maxWidth + paddingWidth;
            if (labelCalcWidth < min) {
                labelCalcWidth = min;
            }
            if (labelCalcWidth > max) {
                labelCalcWidth = max;
            }
            let labelDomWidth = labelCalcWidth + 'px';
            labelList.forEach(dom => {
                dom.style.setProperty('width', labelDomWidth);
            })
            if (mode === 'right') {
                ulDom?.style.removeProperty('margin-left')
                ulDom?.style.setProperty(dir === 'rtl' ? 'margin-left' : 'margin-right', labelDomWidth)
            } else {
                ulDom?.style.removeProperty('margin-right')
                ulDom?.style.setProperty(dir === 'rtl' ? 'margin-right' : 'margin-left', labelDomWidth)
            }
        } else if (this.hadLabel && typeof labelWidth !== 'number') {
            const ulDom = this.timelineRef.current;
            ulDom?.style.removeProperty('margin-left');
            ulDom?.style.removeProperty('margin-right');
        }
    }

    isGroup = (ele: ReactElement) => {
        return ele.props.clsPrefix === TimelineItemGroup.defaultProps.clsPrefix
    }

    itemToArr = (ele: ReactElement) => {
        let child = ele.props.children;
        if (!child || typeof child === 'string') return [];
        if (React.isValidElement(child)) {
            child = [child]
        }
        return child;
    }

    flat = (a: Array<ReactElement>) => { // 把timelineGroup数组扁平化
        let c = a.slice(0); // 操作副本
        for (let i = 0; i < c.length; i++) {
            if (this.isGroup(c[i])) {
                let child = this.itemToArr(c[i]);
                c.splice(i, 1, ...child);
                i += child.length - 1;
            }
        }
        return c;
    }

    getPositionCls = (ele: ReactElement<any>, idx: number) => { // 设置item 类名, group组件在自己组件内部设置（reverse需要额外处理）
        if (this.isGroup(ele)) return '';
        const {mode, clsPrefix} = this.props;
        if (mode) {
            if (mode === 'alternate') {
                return idx % 2 === 0 ? `${clsPrefix}-item-left` : `${clsPrefix}-item-right`;
            } else {
                return `${clsPrefix}-item-${mode}`
            }
        }
        return '';
    }

    render() {
        const [{
            clsPrefix, children, pending, className, mode, reverse, pendingDot, labelWidth, style
        }, restProps] = splitObject(this.props,
            ['clsPrefix', 'children', 'pending', 'className', 'mode', 'reverse', 'pendingDot', 'labelWidth', 'style']);
        const pendingNode = typeof pending === 'boolean' ? null : pending;
        const pendingItem = (pending) ? (
            <TimelineItem pending={!!pending} dot={pendingDot}>{pendingNode}</TimelineItem>
        ) : null;

        const childArr = React.Children.toArray(children);
        const timeLineItems = childArr.filter(item => !!item) as any; // 过滤节点
        const flatElement = this.flat(timeLineItems); // 节点扁平化（获取各个节点的属性，及长度）

        if (pendingItem) { // 如果存在pending节点
            flatElement.push(pendingItem as ReactElement);
            timeLineItems.push(pendingItem as ReactElement);
        }

        reverse && timeLineItems.reverse();

        const hasLabelItem = flatElement.some((item: React.ReactElement<any>) => !!item?.props?.label); // 是否存在label标签
        this.hasLabel = hasLabelItem;
        this.hadLabel = this.hadLabel || this.hasLabel;
        const classString = classNames(clsPrefix, {
            [`${clsPrefix}-pending`]: !!pending,
            [`${clsPrefix}-label`]: !!hasLabelItem,
            [`${clsPrefix}-${mode}`]: !!mode,
            [`${clsPrefix}-reverse`]: !!reverse
        }, className);

        // labelWidth
        const wrapStyle: React.CSSProperties = {};
        const labelStyle: React.CSSProperties = {};
        if (hasLabelItem && typeof labelWidth === 'number') {
            if (mode === 'left' || mode === undefined) {
                wrapStyle.marginLeft = labelWidth
                labelStyle.width = labelWidth
            } else if (mode === 'right') {
                wrapStyle.marginRight = labelWidth
                labelStyle.width = labelWidth
            }
        }

        let itemLen = flatElement.length; // item总的长度
        let itemIdx = 0; // 真实的索引位置（包括group组件child长度）
        const items = React.Children.map(timeLineItems, (ele, idx) =>{
            idx = itemIdx;
            let groupAttr = {}
            if (this.isGroup(ele)) { // 如果是group组件添加下列属性
                itemIdx += this.itemToArr(ele).length // group组件加上子元素长度
                groupAttr = {
                    len: itemLen,
                    timeClsPrefix: clsPrefix,
                    reverse,
                    pending,
                    mode
                }
            } else {
                itemIdx += 1;
            }

            return React.cloneElement(ele, {
                last: !reverse && pending ? idx === itemLen - 2 : idx === itemLen - 1,
                timelineFieldId: this.props.fieldid,
                idx,
                className: classNames([
                    ele?.props?.className,
                    this.getPositionCls(ele, idx),
                ]),
                labelStyle,
                ...groupAttr
            })
        });
        let adapterNid = getNid(this.props)

        return (
            <ul {...restProps} className={classString} style={{...style, ...wrapStyle}} ref={this.timelineRef} {...adapterNid}>
                {items}
            </ul>
        );
    }
}

// Timeline.propTypes = propTypes;

export default Timeline;
