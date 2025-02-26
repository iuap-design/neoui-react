// import PropTypes from 'prop-types';
import * as React from 'react';
import { AvatarSize } from './iAvatar';

// const propTypes = {
//     size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// }
// export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;

const SizeContext = React.createContext<AvatarSize>('default');

interface SizeContextProps {
    size?: AvatarSize;
    children?: React.ReactNode;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({children, size}) => (
    <SizeContext.Consumer>
        {originSize => (
            <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>
        )}
    </SizeContext.Consumer>
);
// SizeContextProvider.propTypes = propTypes;
export default SizeContext;
