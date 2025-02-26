import * as React from 'react';
import {AlignContextProps} from './iProvider';
import {AlignType} from '../../wui-core/src/iCore';

const AlignContext = React.createContext('left' as AlignType);

// eslint-disable-next-line react/prop-types
export const AlignContextProvider: React.FC<AlignContextProps> = ({children, align}) => (
    <AlignContext.Consumer>
        {originAlign => (
            <AlignContext.Provider value={align || originAlign}>{children}</AlignContext.Provider>
        )}
    </AlignContext.Consumer>
);

export default AlignContext;
