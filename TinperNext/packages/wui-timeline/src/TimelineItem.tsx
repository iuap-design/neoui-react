import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';
import {WebUI, getNid} from "../../wui-core/src/index"
import splitObject from './splitObject';
import {TimelineItemProps} from './iTimeline';
// Timeline
/* const propTypes = {
    color: PropTypes.string,
    dot: PropTypes.node,
    pending: PropTypes.bool
} */
const defaultProps = {
    color: 'primary',
    last: false,
    pending: false,
    dot: null
};

@WebUI({name: "timeline-item", defaultProps})
class TimelineItem extends React.Component<TimelineItemProps> {

    render() {
        const [{
            clsPrefix, color, last, children, pending, className, dot, idx, timelineFieldId, label, labelStyle
        }, restProps] = splitObject(this.props,
            ['clsPrefix', 'color', 'last', 'children', 'pending', 'className', 'dot', 'idx', 'timelineFieldId', 'label', 'labelStyle']);

        const itemClassName = classNames({
            [`${clsPrefix}`]: true,
            [`${clsPrefix}-last`]: last,
            [`${clsPrefix}-pending`]: pending,
        }, className);

        const dotClassName = classNames({
            [`${clsPrefix}-head`]: true,
            [`${clsPrefix}-head-custom`]: dot,
            [`${clsPrefix}-head-${color}`]: true,
        });

        const liObj: Pick<TimelineItemProps, 'fieldid'> = {};
        if (this.props.fieldid || timelineFieldId) {
            liObj.fieldid = this.props.fieldid ?? `${timelineFieldId}_timeline_${idx}`;
        }
        let adapterNid = getNid(this.props)

        return (
            <li {...restProps} className={itemClassName} {...liObj} {...adapterNid}>
                {label && <div className={`${clsPrefix}-label`} style={{...labelStyle}}>{label}</div>}
                <div className={`${clsPrefix}-tail`}/>
                <div
                    className={dotClassName}
                    style={{borderColor: /blue|red|green/.test(color) ? null : color}}
                >
                    {dot}
                </div>
                <div className={`${clsPrefix}-content`}>
                    {children}
                </div>
            </li>
        );
    }
}

// TimelineItem.propTypes = propTypes;
export default TimelineItem;
