import {createContext} from 'react';
import { MenuContextProps } from '../iMenu';


const MenuContext = createContext<MenuContextProps>({
    firstLevel: true,
    inlineCollapsed: false,
});

export default MenuContext;
