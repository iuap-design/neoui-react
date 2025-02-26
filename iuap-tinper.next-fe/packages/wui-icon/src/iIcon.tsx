import { BaseHtmlProps } from '../../wui-core/src/iCore';

export interface IconProps extends BaseHtmlProps<HTMLElement> {
    type?: string;
    fontName?: string;
    rotate?:number;
}