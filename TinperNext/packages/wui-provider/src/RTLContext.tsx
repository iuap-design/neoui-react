import * as React from 'react';
import { RTLContextProps } from './iProvider'


const RTLContext = React.createContext<string | undefined>(undefined);

// eslint-disable-next-line react/prop-types
export const RTLContextProvider: React.FC<RTLContextProps> = ({children, dir}) => (
    <RTLContext.Consumer>
        {originDirection => (
            <RTLContext.Provider value={dir || originDirection}>{children}</RTLContext.Provider>
        )}
    </RTLContext.Consumer>
);

export const useRtl = () => React.useContext(RTLContext);

export default RTLContext;
