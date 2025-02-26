import * as React from 'react';
import {BorderContextProps} from './iProvider';
import {BorderType} from '../../wui-core/src/iCore';

const BorderContext = React.createContext(true as BorderType);

// eslint-disable-next-line react/prop-types
export const BorderContextProvider: React.FC<BorderContextProps> = ({children, bordered}) => (
    <BorderContext.Consumer>
        {originBordered => (
            <BorderContext.Provider value={bordered || originBordered}>{children}</BorderContext.Provider>
        )}
    </BorderContext.Consumer>
);

export default BorderContext;
