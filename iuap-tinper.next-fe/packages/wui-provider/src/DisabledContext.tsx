import * as React from 'react';
// import PropTypes from 'prop-types';
import {DisabledContextProps} from './iProvider'

// export type DisabledType = 'small' | 'middle' | 'large' | undefined;

const DisabledContext = React.createContext(false);

// export interface DisabledContextProps {
//   size?: DisabledType;
// }

// eslint-disable-next-line react/prop-types
export const DisabledContextProvider: React.FC<DisabledContextProps> = ({children, disabled}) => (
    <DisabledContext.Consumer>
        {originDisabled => (
            <DisabledContext.Provider value={disabled || originDisabled}>{children}</DisabledContext.Provider>
        )}
    </DisabledContext.Consumer>
);

/* DisabledContextProvider.propTypes = {
    size: PropTypes.string
} */

export default DisabledContext;
