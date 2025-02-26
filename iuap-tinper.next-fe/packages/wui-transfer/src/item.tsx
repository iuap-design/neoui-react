import classNames from 'classnames';
import React from 'react';
import Lazyload from 'react-lazy-load';
import Checkbox from '../../wui-checkbox/src';
import PureRenderMixin from './PureRenderMixin';

import { TransferItemMixin, TransferItemProps, TransferItemStates } from './iTransfer'

// import {propTypes as transferPropTypes} from "./Transfer";

// const propTypes = {
//     ...transferPropTypes,
// }

class Item extends React.Component<TransferItemProps, TransferItemStates> {
    shouldComponentUpdate(...args: TransferItemMixin) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    // matchFilter = (text) => {
    //   const { filter, filterOption, item } = this.props;
    //   if (filterOption) {
    //     return filterOption(filter, item);
    //   }
    //   return text.indexOf(filter) >= 0;
    // }
    render() {
        const {
            item,
            lazy,
            checked,
            prefixCls,
            onClick,
            renderedText,
            renderedEl,
            showCheckbox,
            checkedKeys,
            isMultiDragSource,
            draggingItemId
        } = this.props;
        if (!item) return null;
        const isAttachedDraggingItem = checked && !isMultiDragSource && draggingItemId
        const className = classNames({
            [`${prefixCls}-content-item`]: true,
            [`${prefixCls}-content-item-disabled`]: item.disabled || isAttachedDraggingItem,
            [`${prefixCls}-content-item-selected`]: checked && !isAttachedDraggingItem
        });

        const lazyProps = Object.assign({
            height: 32,
            offset: 500,
            throttle: 0,
            debounce: false,
        }, lazy);

        let lazyFlag = true;
        if (lazy && lazy.container == "modal") {
            lazyFlag = false
        }
        if (!lazyFlag) {
            return (
                <li
                    className={className}
                    title={renderedText}
                    onClick={(item.disabled || !onClick) ? undefined : () => onClick(item)}
                >
                    <Checkbox checked={checked} disabled={item.disabled}
							  onClick={(item.disabled || !onClick) ? undefined : () => onClick(item)}/>
                    <span>{renderedEl}</span>
                </li>
            )
        } else {
            return (
                <Lazyload {...lazyProps}>
                    <li
                        className={className}
                        title={renderedText}
                        onClick={(item.disabled || !onClick) ? undefined : () => onClick(item)}
                    >
                        {
                            showCheckbox ?
                                <Checkbox
                                    checked={checked && !isAttachedDraggingItem}
                                    disabled={item.disabled || !!isAttachedDraggingItem}
                                    onClick={(item.disabled || !onClick) ? undefined : () => onClick(item)}
                                /> : ''
                        }
                        <span>{renderedEl}</span>
                        {(isMultiDragSource && (checkedKeys as string[]).length > 1) &&
							<span className="multi-drag-count">{(checkedKeys as string[]).length}</span>}
                    </li>
                </Lazyload>
            );
        }

    }
}

// Item.propTypes = propTypes;
export default Item;
