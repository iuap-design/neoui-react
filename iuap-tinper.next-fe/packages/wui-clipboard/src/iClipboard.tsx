import type { BaseProps } from '../../wui-core/src/iCore';

export type ActionType = 'copy' | 'cut';

export interface ClipboardProps extends BaseProps {
    action: ActionType;
    text?: string;
    success?: () => void;
    error?: () => void;
    locale?: string;
    target?: any;
    asyncCopy?: any;
    // fieldid?: string;
    // clsPrefix?: string;
}

export interface ClipboardState {
    currect?: boolean;
    html?: string;
    ready?: boolean;
    modalShow?: boolean;
}