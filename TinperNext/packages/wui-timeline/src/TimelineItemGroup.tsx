import classNames from 'classnames';
import React from 'react';
import {WebUI, getNid} from "../../wui-core/src/index"
import splitObject from './splitObject';
import {TimelineItemGroupProps, TimelineGroupSize} from './iTimeline'

const defaultProps = {
    size: 'small',
    fieldid: undefined
}

const spaceSize = {
    small: 16,
    middle: 24,
    large: 32,
};

function getNumberSize(size: TimelineGroupSize) {
    return typeof size === 'string' ? spaceSize[size] : size || 0;
}

@WebUI({name: "timeline-item-group", defaultProps})
class TimelineItemGroup extends React.Component<TimelineItemGroupProps> {
    static defaultProps: any;

    getPositionCls = (cls: string, idx: number) => { // 设置item 类名
        const {mode} = this.props;
        if (mode) {
            if (mode === 'alternate') {
                return idx % 2 === 0 ? `${cls}-left` : `${cls}-right`;
            } else {
                return `${cls}-${mode}`
            }
        }
        return '';
    }

    render() {
        const [{
            clsPrefix, children, pending, className, idx, timelineFieldId, reverse, len, timeClsPrefix, size, style, labelStyle
        }, restProps] = splitObject(this.props,
            ['clsPrefix', 'children', 'pending', 'className', 'idx', 'timelineFieldId', 'reverse', 'len', 'mode', 'last', 'timeClsPrefix', 'size', 'style', 'labelStyle']);

        const childArr = React.Children.toArray(children);
        const timeLineItems = childArr.filter(item => !!item && typeof item !== 'string') as any; // 过滤节点

        const itemClsPrefix = `${timeClsPrefix}-item`; // item类名

        const groupClassName = classNames([className, clsPrefix]);

        const spaceNum = getNumberSize(size);

        const groupStyle: React.CSSProperties = {...style};
        const tailStyle: React.CSSProperties = {};
        let height = spaceNum;
        if (reverse) {
            timeLineItems.reverse(); // 反转数组
            height = idx === 0 ? 0 : spaceNum; // 第一个group没有padding
            groupStyle.paddingTop = height;
            tailStyle.top = 0;
        } else {
            height = idx + timeLineItems.length === len ? 0 : spaceNum; // 最后一个group没有padding
            groupStyle.paddingBottom = height;
            tailStyle.bottom = 0;
        }
        tailStyle.height = height;

        const items = React.Children.map(timeLineItems, (ele, i) =>{
            i += idx; // item索引需要加上group的索引位置
            return React.cloneElement(ele, {
                last: !reverse && pending ? i === len - 2 : i === len - 1,
                timelineFieldId: timelineFieldId,
                idx: i,
                className: classNames([
                    ele?.props?.className,
                    this.getPositionCls(itemClsPrefix, i),
                ]),
                labelStyle
            })
        });

        const liObj: Pick<TimelineItemGroupProps, 'fieldid'> = {};
        if (this.props.fieldid || timelineFieldId) {
            liObj.fieldid = this.props.fieldid ?? `${timelineFieldId}_timeline_group_${idx}`;
        }
        let adapterNid = getNid(this.props)

        const groupItem = items && items.length !== 0 ? (
            <div {...restProps} className={groupClassName} {...liObj} style={groupStyle} {...adapterNid}>
                {items}
                <div style={tailStyle} className={`${clsPrefix}-tail`}/>
            </div>
        ) : null;

        return groupItem;
    }
}

export default TimelineItemGroup;
