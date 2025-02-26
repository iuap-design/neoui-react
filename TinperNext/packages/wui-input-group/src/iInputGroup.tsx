import * as React from 'react';
import { AlignType, BorderType } from '../../wui-core/src/iCore';

export interface InputGroupProps extends React.HTMLAttributes<HTMLSpanElement> {
    simple?: boolean;
    align?: AlignType;
    bordered?: BorderType;
}

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
    addonType?: string
}
