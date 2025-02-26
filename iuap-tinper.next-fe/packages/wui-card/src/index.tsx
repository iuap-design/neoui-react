import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import omit from 'rc-util/lib/omit';
import * as React from 'react';
import {Col, Row} from '../../wui-layout/src';
import {ConfigContext} from "../../wui-provider/src/context";
import Grid from './Grid';
import { CardProps } from './iCard';
import {setComponentSize} from "../../wui-core/src/componentStyle"
import {getNid} from "../../wui-core/src/index"


function getAction(actions: React.ReactNode[]) {
    const actionList = actions.map((action, index) => (
        <li style={{width: `${100 / actions.length}%`}} key={`action-${index}`}>
            <span>{action}</span>
        </li>
    ));
    return actionList;
}


// const propTypes = {
//     title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
//     extra: PropTypes.element,
//     bordered: PropTypes.bool,
//     headStyle: PropTypes.object,
//     bodyStyle: PropTypes.object,
//     style: PropTypes.object,
//     loading: PropTypes.bool,
//     hoverable: PropTypes.bool,
//     children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
//     id: PropTypes.string,
//     className: PropTypes.string,
//     size: PropTypes.oneOf(['default', 'small']),
//     type: PropTypes.oneOf(['inner']),
//     actions: PropTypes.node,
//     fieldid: PropTypes.string,
// }

const defaultProps: CardProps = {
    headStyle: {},
    bodyStyle: {},
    style: {},
    title: "",
    loading: false,
    bordered: true,
    size: 'default',
    hoverable: false,
}

export interface CardInterface extends React.FC<CardProps> {
    Grid: typeof Grid;
}

const InternalCard: React.FC<CardProps> = ({
    className,
    extra,
    headStyle = {},
    bodyStyle = {},
    title,
    loading = false,
    bordered = true,
    size = 'default',
    type,
    actions,
    children = [],
    hoverable = false,
    ...others
}) => {
    bordered = typeof bordered === 'boolean' ? bordered : true;
    const {getPrefixCls} = React.useContext(ConfigContext);
    // const size = React.useContext(SizeContext);

    // const onTabChange = (key) => {
    //   props.onTabChange && props.onTabChange(key);
    // };

    const isContainGrid = () => {
        let containGrid;
        React.Children.forEach(children, (element: JSX.Element) => {
            if (element && element.type && element.type === Grid) {
                containGrid = true;
            }
        });
        return containGrid;
    };

    const prefixCls = getPrefixCls('card');

    const loadingBlockStyle =
		bodyStyle.padding === 0 || bodyStyle.padding === '0px' ? {padding: 24} : undefined;

    const block = <div className={`${prefixCls}-loading-block`}/>;

    const loadingBlock = (
        <div className={`${prefixCls}-loading-content`} style={loadingBlockStyle}>
            <Row gutter={8}>
                <Col span={22}>{block}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={8}>{block}</Col>
                <Col span={15}>{block}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={6}>{block}</Col>
                <Col span={18}>{block}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={13}>{block}</Col>
                <Col span={9}>{block}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={4}>{block}</Col>
                <Col span={3}>{block}</Col>
                <Col span={16}>{block}</Col>
            </Row>
        </div>
    );


    let head;
    if (title || extra) {
        head = (
            <div className={`${prefixCls}-head`} style={headStyle}>
                <div className={`${prefixCls}-head-wrapper`}>
                    {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
                    {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
                </div>
            </div>
        );
    }
    const body: React.ReactNode = (
        <div className={`${prefixCls}-body`} style={bodyStyle}>
            {loading ? loadingBlock : children}
        </div>
    );
    const actionDom =
		actions && actions.length ? (
		    <ul className={`${prefixCls}-actions`}>{getAction(actions)}</ul>
		) : null;
    const mergedSize = setComponentSize(size) === 'sm' ? 'small' : setComponentSize(size);
    const classString = classNames(
        prefixCls,
        {
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-bordered`]: bordered,
            [`${prefixCls}-hoverable`]: hoverable,
            [`${prefixCls}-contain-grid`]: isContainGrid(),
            [`${prefixCls}-${mergedSize}`]: mergedSize,
            [`${prefixCls}-type-${type}`]: !!type,
        },
        className,
    );
    let adapterNid = getNid(others)

    return (
        <div {...others} className={classString} {...adapterNid}>
            {head}
            {body}
            {actionDom}
        </div>
    );
};

// Card.propTypes = propTypes;
InternalCard.defaultProps = defaultProps;
const Card = InternalCard as CardInterface;
Card.Grid = Grid;
// Card.Meta = Meta;

export default Card;
