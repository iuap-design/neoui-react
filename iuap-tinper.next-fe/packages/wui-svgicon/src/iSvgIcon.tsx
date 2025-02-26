import React from 'react';
import { BaseProps } from '../../wui-core/src/iCore';


export interface SvgIconProps extends BaseProps{
    type?: string;
    component?: React.ElementType,
    viewBox?: string;
    fontFamily?: string;
}