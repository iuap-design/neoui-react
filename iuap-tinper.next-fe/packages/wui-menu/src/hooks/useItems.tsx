import { ItemGroup } from 'rc-menu';
import * as React from 'react';
import type {ItemType} from '../iMenu';
import MenuDivider from '../MenuDivider';
import MenuItem from '../MenuItem';
import SubMenu from '../SubMenu';

function convertItemsToNodes(list: ItemType[]) {
    return (list || [])
        .map((opt, index) => {
            if (opt && typeof opt === 'object') {
                const { label, children, key, type, ...restProps } = opt as any;
                const mergedKey = key ?? `tmp-${index}`;
                // MenuItemGroup & SubMenuItem
                if (children || type === 'group') {
                    if (type === 'group') {
                        // Group
                        return (
                            <ItemGroup key={mergedKey} {...restProps} title={label}>
                                {convertItemsToNodes(children)}
                            </ItemGroup>
                        );
                    }

                    // Sub Menu
                    return (
                        <SubMenu key={mergedKey} {...restProps} title={label}>
                            {convertItemsToNodes(children)}
                        </SubMenu>
                    );
                }

                // MenuItem & Divider
                if (type === 'divider') {
                    return <MenuDivider key={mergedKey} {...restProps} />;
                }

                return (
                    <MenuItem key={mergedKey} {...restProps}>
                        {label}
                    </MenuItem>
                );
            }

            return null;
        })
        .filter((opt) => opt);
}

export default function useItems(items?: ItemType[]) {
    return React.useMemo(() => {
        if (!items) {
            return items;
        }

        return convertItemsToNodes(items);
    }, [items]);
}
