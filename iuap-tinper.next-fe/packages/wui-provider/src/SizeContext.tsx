import * as React from 'react';
// import PropTypes from 'prop-types';
import {SizeContextProps} from './iProvider'

// export type SizeType = 'small' | 'middle' | 'large' | undefined;

const SizeContext = React.createContext(undefined);

// export interface SizeContextProps {
//   size?: SizeType;
// }
export const sizeMap = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    nm: 'nm',
    xg: 'xg',
    lg: 'lg',
    small: 'sm',
    middle: 'md',
    large: 'lg',
}
// eslint-disable-next-line react/prop-types
export const SizeContextProvider: React.FC<SizeContextProps> = ({children, size}) => (
    <SizeContext.Consumer>
        {originSize => (
            <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>
        )}
    </SizeContext.Consumer>
);

/* SizeContextProvider.propTypes = {
    size: PropTypes.string
} */

export default SizeContext;
