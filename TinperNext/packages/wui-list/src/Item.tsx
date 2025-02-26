import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {Col} from '../../wui-layout/src';
import {ConfigContext} from "../../wui-provider/src/context";
import {ListContext} from './index';
import { ListItemMetaProps, ListItemProps } from './iList';
import { useConfigContext } from '../../wui-provider/src/context';

// const ListItemPropTypes = {
//     className: PropTypes.string,
//     children: PropTypes.node,
//     prefixCls: PropTypes.string,
//     style: PropTypes.object,
//     extra: PropTypes.node,
//     actions: PropTypes.node,
//     grid: PropTypes.instanceOf(ListGridType),
//     colStyle: PropTypes.object,
// }

// const ItemMetaPropTypes = {
//     avatar: PropTypes.node,
//     className: PropTypes.string,
//     children: PropTypes.node,
//     description: PropTypes.node,
//     prefixCls: PropTypes.string,
//     style: PropTypes.object,
//     title: PropTypes.node,
// }

export const Meta: React.FC<ListItemMetaProps> = ({
    className,
    avatar,
    title,
    description,
    ...others
}) => {
    const {getPrefixCls} = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls('list');
    const classString = classNames(`${prefixCls}-item-meta`, className);

    const content = (
        <div className={`${prefixCls}-item-meta-content`}>
            {title && <h4 className={`${prefixCls}-item-meta-title`}>{title}</h4>}
            {description && <div className={`${prefixCls}-item-meta-description`}>{description}</div>}
        </div>
    );

    return (
        <div {...others} className={classString}>
            {avatar && <div className={`${prefixCls}-item-meta-avatar`}>{avatar}</div>}
            {(title || description) && content}
        </div>
    );
};

// Meta.propTypes = ItemMetaPropTypes;

export interface ListItemType extends React.FC<ListItemProps> {
    Meta: typeof Meta;
}

const InternalItem: React.FC<ListItemProps> = ({
    children,
    actions,
    extra,
    className,
    colStyle,
    dir,
    ...others
}) => {
    const {grid, itemLayout} = React.useContext(ListContext);
    const {getPrefixCls} = React.useContext(ConfigContext);
    const {dir: rtlDirection} = dir ? {dir} : useConfigContext();
    // 判断item内容是否有text并且节点不止一个
    const isItemContainsTextNodeAndNotSingular = () => {
        let result;
        React.Children.forEach(children, (element) => {
            if (typeof element === 'string') {
                result = true;
            }
        });
        return result && React.Children.count(children) > 1;
    };

    const isFlexMode = () => {
        if (itemLayout === 'vertical') {
            return !!extra;
        }
        return !isItemContainsTextNodeAndNotSingular();
    };

    const prefixCls = getPrefixCls('list');
    const actionsContent = actions && actions.length > 0 && (
        <ul className={`${prefixCls}-item-action ${prefixCls}-item-action-${rtlDirection}`} key="actions">
            {actions.map((action, i) => (
                <li key={`${prefixCls}-item-action-${i}`}>
                    {action}
                    {i !== actions.length - 1 && <em className={`${prefixCls}-item-action-split`}/>}
                </li>
            ))}
        </ul>
    );
    const ComponentElement = grid ? 'div' : 'li';
    const itemChildren = (
        <ComponentElement
            {...others} // `li` element `onCopy` prop args is not same as `div`
            className={classNames(
                `${prefixCls}-item`,
                {
                    [`${prefixCls}-item-no-flex`]: !isFlexMode(),
                },
                className,
            )}
        >
            {itemLayout === 'vertical' && extra
                ? [
                    <div className={`${prefixCls}-item-main`} key="content">
                        {children}
                        {actionsContent}
                    </div>,
                    <div className={`${prefixCls}-item-extra`} key="extra">
                        {extra}
                    </div>,
                ]
                : [children, actionsContent, extra && React.cloneElement(extra, {key: 'extra'})]}
        </ComponentElement>
    );

    return grid ? (
        <Col flex={1} style={colStyle}>
            {itemChildren}
        </Col>
    ) : (
        itemChildren
    );
};
const Item = InternalItem as ListItemType;
// Item.propTypes = ListItemPropTypes;
Item.Meta = Meta;

export default Item;
