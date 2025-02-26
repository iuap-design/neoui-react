/*
 * @Author: Mr.mjc
 * @Date: 2022-06-27 19:02:37
 * @LastEditors: Mr.mjc
 * @LastEditTime: 2022-07-28 19:12:16
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/ExpandIcon.tsx
 */
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import shallowequal from 'shallowequal';
import { ExpandIconProps } from './iExpandIcon';
import { DefaultRecordType } from './interface';

// const propTypes = {
//     record: PropTypes.object,
//     clsPrefix: PropTypes.string,
//     expandable: PropTypes.any,
//     isShowExpandIcon: PropTypes.any,
//     expandedIcon: PropTypes.any,
//     collapsedIcon: PropTypes.any,
//     expandIcon: PropTypes.func,
//     expanded: PropTypes.bool,
//     needIndentSpaced: PropTypes.bool,
//     onExpand: PropTypes.func,
//     fixedIndex: PropTypes.number,
//     fieldid: PropTypes.string,
//     oldMode: PropTypes.bool,
// };

class ExpandIcon extends Component<ExpandIconProps<DefaultRecordType>> {
    constructor(props:ExpandIconProps<DefaultRecordType>) {
        super(props);
    }

    shouldComponentUpdate(nextProps:ExpandIconProps<DefaultRecordType>) {
        return !shallowequal(nextProps, this.props);
    }

	onExpand = (status: boolean, record?: DefaultRecordType, fixedIndex?: number, e?: React.MouseEvent<HTMLElement>) => {
	    const {onExpand} = this.props;
	    e && e.stopPropagation();
	    onExpand && onExpand(status, record, fixedIndex, e);
	};

	render() {
	    const {
	        expandable,
	        clsPrefix,
	        onExpand,
	        needIndentSpaced,
	        expanded,
	        record,
	        // index,
	        isShowExpandIcon,
	        expandedIcon,
	        collapsedIcon,
	        expandIcon,
	        fixedIndex,
	        fieldid,
	        oldMode
	    } = this.props;
	    if (expandable && isShowExpandIcon) {
	        const expandClassName = expanded ? 'expanded' : 'collapsed';
	        let fieldidAttr = fieldid ? { fieldid: 'switch_icon' } : {}
	        let className = `${clsPrefix}-expand-icon ${clsPrefix}-${expandClassName}`;
	        let currentIcon: React.ReactNode;
	        if (expanded && (expandedIcon || expandIcon)) {
	            if (typeof expandIcon === 'function') {
	                currentIcon = expandIcon({expanded, onExpand, record})
	            } else {
	                currentIcon = expandedIcon as JSX.Element;
	            }
	        } else if (!expanded && (collapsedIcon || expandIcon)) {
	            if (typeof expandIcon === 'function') {
	                currentIcon = expandIcon({expanded, onExpand, record})
	            } else {
	                currentIcon = collapsedIcon as JSX.Element;
	            }
	        } else {
	            currentIcon = <span
	                className={className}
	                {...fieldidAttr}
	            />;
	        }
	        return (<span onClick={(e) => this.onExpand(!expanded, record, fixedIndex, e)}
						  className='expand-icon-con'>{currentIcon}</span>);
	    } else if ((needIndentSpaced && !isShowExpandIcon) || oldMode) {
	        return <span className={`${clsPrefix}-expand-icon ${clsPrefix}-spaced`}/>;
	    }
	    return null;
	}
}

// ExpandIcon.propTypes = propTypes;

export default ExpandIcon;
