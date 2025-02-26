import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {responsiveArray, responsiveObserve, ScreenMap} from "../../wui-core/src/LayoutUtils";
import Empty from '../../wui-empty/src';

import {Row} from '../../wui-layout/src';
import Pagination from '../../wui-pagination/src';
import {ConfigContext} from "../../wui-provider/src/context";
import Spin from '../../wui-spin/src';
import Item from './Item';
import { ListProps, ListContextProps } from './iList';
import {setComponentSize} from "../../wui-core/src/componentStyle"
import {getNid} from "../../wui-core/src/index"
import { useConfigContext } from '../../wui-provider/src/context';

// export const ListGridType = {
//     gutter: PropTypes.number,
//     column: PropTypes.number,
//     xs: PropTypes.number,
//     sm: PropTypes.number,
//     md: PropTypes.number,
//     lg: PropTypes.number,
//     xl: PropTypes.number,
//     xxl: PropTypes.number,
// }

// export const propTypes = {
//     bordered: PropTypes.bool,
//     className: PropTypes.string,
//     style: PropTypes.object,
//     children: PropTypes.node,
//     dataSource: PropTypes.array,
//     extra: PropTypes.node,
//     grid: PropTypes.instanceOf(ListGridType),
//     id: PropTypes.string,
//     itemLayout: PropTypes.oneOf(['horizontal', 'vertical']),
//     loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
//     loadMore: PropTypes.node,
//     pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
//     prefixCls: PropTypes.string,
//     rowKey: PropTypes.func,
//     renderItem: PropTypes.func,
//     size: PropTypes.oneOf(['small', 'default', 'large']),
//     split: PropTypes.bool,
//     header: PropTypes.node,
//     footer: PropTypes.node,
//     fieldid: PropTypes.string,
// }

export const ListContext = React.createContext<ListContextProps>({});

export const ListConsumer = ListContext.Consumer;

function useBreakpoint() {
    const [screens, setScreens] = React.useState<ScreenMap>({});

    React.useEffect(() => {
        const token = responsiveObserve.subscribe(supportScreens => {
            setScreens(supportScreens);
        });

        return () => responsiveObserve.unsubscribe(token);
    }, []);

    return screens;
}

function List<T>({
				  pagination = false,
				  bordered = false,
				  split = true,
				  className,
				  children,
				  itemLayout = 'horizontal',
				  loadMore,
				  grid,
				  dataSource = [],
				  size,
				  header,
				  footer,
				  loading = false,
				  rowKey, // 当 renderItem 自定义渲染列表项有效时，自定义每一行的 key 的获取方式
				  renderItem,
    dir,
    emptyText,
				  ...rest
			  }: ListProps<T>) {
    // 默认加载展示容器
    bordered = typeof bordered === 'boolean' ? bordered : false;
    const listRef = React.useRef<HTMLDivElement>(null)
    const paginationObj = pagination && typeof pagination === 'object' ? pagination : undefined;
    const {dir: rtldirection} = dir ? {dir} : useConfigContext();
    const [paginationCurrent, setPaginationCurrent] = React.useState(
        paginationObj?.defaultCurrent || 1,
    );
    const [paginationSize, setPaginationSize] = React.useState(paginationObj?.defaultPageSize || 10);

    const {getPrefixCls} = React.useContext(ConfigContext);

    const keys: { [index: number]: React.Key } = {};
    const prefixCls = getPrefixCls('list');

    const triggerPaginationEvent = (eventName: 'onChange' | 'onPageSizeChange') => (page: number, pageSize: number) => {
        setPaginationCurrent(page);
        setPaginationSize(pageSize);
        if (pagination && pagination[eventName]) {
            pagination[eventName](page, pageSize);
        }
    };

    const onPaginationChange = triggerPaginationEvent('onChange');

    const onPaginationShowSizeChange = triggerPaginationEvent('onPageSizeChange');

    // renderItem 自定义渲染列表
    const renderInnerItem = (item: any, index: number) => {
        if (!renderItem) return null;

        let key;

        if (typeof rowKey === 'function') {
            key = rowKey(item);
        } else if (typeof rowKey === 'string') {
            key = item[rowKey];
        } else {
            key = item.key;
        }

        if (!key) {
            key = `list-item-${index}`;
        }

        keys[index] = key;

        return renderItem(item, index);
    };

    const isSomethingAfterLastItem = () => !!(loadMore || pagination || footer);

    // loadding 属性处理
    let loadingProp = loading;
    if (typeof loadingProp === 'boolean') {
        loadingProp = {
            spinning: loadingProp,
        };
    }
    const isLoading = loadingProp && loadingProp.spinning;

    // large => lg
    // small => sm
    let sizeCls = setComponentSize(size);
    // switch (size) {
    //     case 'large':
    //         sizeCls = 'lg';
    //         break;
    //     case 'small':
    //         sizeCls = 'sm';
    //         break;
    //     default:
    //         break;
    // }

    const classString = classNames(
        prefixCls,
        {
            [`${prefixCls}-vertical`]: itemLayout === 'vertical',
            [`${prefixCls}-${dir}`]: rtldirection === 'rtl',
            [`${prefixCls}-${sizeCls}`]: !!sizeCls,
            [`${prefixCls}-split`]: split,
            [`${prefixCls}-bordered`]: bordered,
            [`${prefixCls}-loading`]: isLoading,
            [`${prefixCls}-grid`]: !!grid,
            [`${prefixCls}-something-after-last-item`]: isSomethingAfterLastItem(),
        },
        className,
    );

    const paginationProps = {
        total: dataSource.length || 0,
        current: paginationCurrent,
        pageSize: paginationSize,
        ...paginationObj,
    };

    const paginationContent = pagination ? (
        <div className={`${prefixCls}-pagination`}>
            <Pagination
                {...paginationProps}
                onChange={onPaginationChange}
                onPageSizeChange={onPaginationShowSizeChange}
            />
        </div>
    ) : null;

    // 第一页数据
    let splitDataSource = [...dataSource];
    if (pagination) {
        if (dataSource.length > (paginationProps.current - 1) * Number(paginationProps.pageSize)) {
            splitDataSource = [...dataSource].splice(
                (paginationProps.current - 1) * Number(paginationProps.pageSize),
                Number(paginationProps.pageSize),
            );
        }
    }

    const screens = useBreakpoint();
    const currentBreakpoint = React.useMemo(() => {
        for (let i = 0; i < responsiveArray.length; i += 1) {
            const breakpoint = responsiveArray[i];
            if (screens[breakpoint]) {
                return breakpoint;
            }
        }
        return undefined;
    }, [screens]);

    const colStyle = React.useMemo(() => {
        if (!grid) {
            return undefined;
        }
        // 获取当前columnCount（如果设置媒体查询 获取当前媒体查询的配置）
        const columnCount =
			currentBreakpoint && grid[currentBreakpoint] ? grid[currentBreakpoint] : grid.column;
        if (columnCount) {
            return {
                width: `${100 / columnCount}%`,
                maxWidth: `${100 / columnCount}%`,
            };
        }
    }, [grid?.column, currentBreakpoint]);

    // List child 渲染类型处理，包含loading, 默认, grid, empty, loading
    let childrenContent = (isLoading && <div style={{minHeight: 53}}/>) as React.ReactNode;
    if (splitDataSource.length > 0) {
        const items = splitDataSource.map((item, index) => renderInnerItem(item, index));

        const childrenList = React.Children.map(items, (child, index) => (
            <div key={keys[index]} style={colStyle}>
                {child}
            </div>
        ));
        childrenContent = grid ? (
            <Row gutter={grid.gutter}>{childrenList}</Row>
        ) : (
            <ul className={`${prefixCls}-items`}>{items}</ul>
        );
    } else if (!children && !isLoading) {
        childrenContent = emptyText !== undefined ? emptyText : <Empty/>;
    }

    const paginationPosition = paginationProps.position || 'bottom';
    let adapterNid = getNid(rest)

    return (
        <ListContext.Provider value={{grid, itemLayout}}>
            <div
                ref={listRef}
                className={classString}
                {...rest}
                {...adapterNid}
            >
                {(paginationPosition === 'top' || paginationPosition === 'both') && paginationContent}
                {header && <div className={`${prefixCls}-header`}>{header}</div>}
                <Spin
                    getPopupContainer={(triggerNode: HTMLElement) => {
                        return listRef && listRef.current ? listRef.current : triggerNode
                    }}
                    {...loadingProp}
                />
                {childrenContent}
                {children}
                {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
                {loadMore ||
					((paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent)}
            </div>
        </ListContext.Provider>
    );
}

// List.propTypes = propTypes;

List.Item = Item;

export default List;
